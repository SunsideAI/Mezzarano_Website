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

export async function GET(
  request: NextRequest,
  { params }: { params: { recordId: string } }
) {
  const { recordId } = params
  const { searchParams } = new URL(request.url)
  const imageIndex = parseInt(searchParams.get('index') || '0', 10)
  const type = searchParams.get('type') || 'bilder' // 'bilder' or 'cover'

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return NextResponse.json(
      { error: 'Airtable not configured' },
      { status: 500 }
    )
  }

  const cacheKey = `${recordId}-${type}-${imageIndex}`

  // Check cache first
  const cached = imageCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.redirect(cached.url, { status: 302 })
  }

  try {
    // Fetch fresh data from Airtable
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}/${recordId}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      // Don't cache this fetch - we want fresh URLs
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Airtable fetch error:', response.status)
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      )
    }

    const record: AirtableRecord = await response.json()

    // Get the appropriate image array
    const images = type === 'cover'
      ? record.fields.Cover
      : record.fields.Bilder

    if (!images || images.length === 0) {
      // Return a placeholder image
      return NextResponse.redirect(
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
        { status: 302 }
      )
    }

    // Get the specific image
    const image = images[Math.min(imageIndex, images.length - 1)]

    if (!image?.url) {
      return NextResponse.redirect(
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
        { status: 302 }
      )
    }

    // Cache the fresh URL
    imageCache.set(cacheKey, {
      url: image.url,
      timestamp: Date.now(),
    })

    // Redirect to the fresh Airtable URL
    return NextResponse.redirect(image.url, { status: 302 })
  } catch (error) {
    console.error('Image proxy error:', error)
    return NextResponse.redirect(
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      { status: 302 }
    )
  }
}
