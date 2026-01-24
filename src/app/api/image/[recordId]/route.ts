import { NextRequest, NextResponse } from 'next/server'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || process.env.AT_TOKEN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || process.env.AT_BASE
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID || process.env.AT_TABLE || 'Objekte'

interface AirtableAttachment {
  id: string
  url: string
  filename: string
  type: string
}

interface AirtableRecord {
  id: string
  fields: Record<string, unknown>
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
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_ID)}/${recordId}`

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

    // Log for debugging
    const title = record.fields.title || record.fields.titel || 'Unknown'
    console.log(`Image proxy: Record ${recordId}, Title: "${title}", Index: ${imageIndex}, Type: ${type}`)

    // Get images - prioritize stable external URLs over Airtable attachments (which expire!)
    let imageUrls: string[] = []

    // Priority 1: bild_url (stable external URL from ImmobilienScout24 etc.)
    if (record.fields.bild_url && typeof record.fields.bild_url === 'string') {
      imageUrls = [record.fields.bild_url]
      console.log(`Using bild_url (stable) for "${title}"`)
    }
    // Priority 2: bilder field (may contain multiple URLs)
    else if (record.fields.bilder && typeof record.fields.bilder === 'string') {
      imageUrls = (record.fields.bilder as string).split('\n').filter(Boolean)
      console.log(`Using bilder field (${imageUrls.length} URLs) for "${title}"`)
    }
    // Priority 3: bilder_attachments (Airtable attachments - these expire after ~2 hours!)
    else {
      const attachments = record.fields.bilder_attachments as any[]
      if (attachments && Array.isArray(attachments) && attachments.length > 0) {
        imageUrls = attachments.map((att: any) => att?.url).filter(Boolean)
        console.log(`Using bilder_attachments (expires!) for "${title}": ${imageUrls.length} images`)
      }
    }

    if (imageUrls.length === 0) {
      console.log(`No images found for "${title}", using placeholder`)
      return fetchAndStreamImage(FALLBACK_IMAGE)
    }

    // For 'cover' type, always use first image; for 'bilder', use the specified index
    const targetIndex = type === 'cover' ? 0 : imageIndex
    const imageUrl = imageUrls[Math.min(targetIndex, imageUrls.length - 1)]

    if (!imageUrl) {
      return fetchAndStreamImage(FALLBACK_IMAGE)
    }

    // Cache the fresh URL
    imageCache.set(cacheKey, {
      url: imageUrl,
      timestamp: Date.now(),
    })

    // Fetch and stream the actual image
    return fetchAndStreamImage(imageUrl)
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
