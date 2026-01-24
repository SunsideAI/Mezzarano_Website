import { NextRequest, NextResponse } from 'next/server'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Objekte'

interface AirtableAttachment {
  id: string
  url: string
  filename: string
  type: string
}

interface AirtableRecord {
  id: string
  fields: {
    Bilder?: AirtableAttachment[]
    Cover?: AirtableAttachment[]
    [key: string]: unknown
  }
}

// Cache for image URLs (in-memory, resets on cold start)
const imageCache = new Map<string, { url: string; timestamp: number }>()
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes (Airtable URLs last ~2 hours)

// Fallback image URL
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80'

export async function GET(
  request: NextRequest,
  { params }: { params: { recordId: string } }
) {
  const { recordId } = params
  const { searchParams } = new URL(request.url)
  const imageIndex = parseInt(searchParams.get('index') || '0', 10)
  const type = searchParams.get('type') || 'bilder' // 'bilder' or 'cover'

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    // Return fallback image if Airtable not configured
    return fetchAndStreamImage(FALLBACK_IMAGE)
  }

  const cacheKey = `${recordId}-${type}-${imageIndex}`

  // Check cache first
  const cached = imageCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return fetchAndStreamImage(cached.url)
  }

  try {
    // Fetch fresh data from Airtable
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}/${recordId}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Airtable fetch error:', response.status)
      return fetchAndStreamImage(FALLBACK_IMAGE)
    }

    const record: AirtableRecord = await response.json()

    // Get the appropriate image array
    const images = type === 'cover'
      ? record.fields.Cover
      : record.fields.Bilder

    if (!images || images.length === 0) {
      return fetchAndStreamImage(FALLBACK_IMAGE)
    }

    // Get the specific image
    const image = images[Math.min(imageIndex, images.length - 1)]

    if (!image?.url) {
      return fetchAndStreamImage(FALLBACK_IMAGE)
    }

    // Cache the fresh URL
    imageCache.set(cacheKey, {
      url: image.url,
      timestamp: Date.now(),
    })

    // Fetch and stream the actual image
    return fetchAndStreamImage(image.url)
  } catch (error) {
    console.error('Image proxy error:', error)
    return fetchAndStreamImage(FALLBACK_IMAGE)
  }
}

async function fetchAndStreamImage(imageUrl: string): Promise<NextResponse> {
  try {
    const response = await fetch(imageUrl, {
      headers: {
        'Accept': 'image/*',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`)
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const imageBuffer = await response.arrayBuffer()

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Error streaming image:', error)
    // Return a simple 1x1 transparent pixel as fallback
    const transparentPixel = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    )
    return new NextResponse(transparentPixel, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache',
      },
    })
  }
}
