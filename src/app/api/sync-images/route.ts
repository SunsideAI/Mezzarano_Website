/**
 * API Endpoint to sync images from Airtable to Cloudinary
 *
 * This endpoint:
 * 1. Fetches all records from Airtable
 * 2. For each record without cloudinary_urls, uploads images to Cloudinary
 * 3. Updates Airtable with the permanent Cloudinary URLs
 *
 * Call this manually or via a scheduled job (e.g., Netlify scheduled functions)
 */

import { NextRequest, NextResponse } from 'next/server'
import { uploadMultipleImages } from '@/lib/cloudinary'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || process.env.AT_TOKEN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || process.env.AT_BASE
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID || process.env.AT_TABLE

// Simple auth token for the sync endpoint (required in production)
const SYNC_SECRET = process.env.SYNC_SECRET

interface SyncResult {
  recordId: string
  title: string
  status: 'synced' | 'skipped' | 'error'
  imageCount?: number
  error?: string
}

export async function POST(request: NextRequest) {
  // Check authorization - SYNC_SECRET must be configured
  if (!SYNC_SECRET) {
    return NextResponse.json({ error: 'SYNC_SECRET not configured' }, { status: 500 })
  }
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${SYNC_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if Cloudinary is configured
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
    return NextResponse.json({
      error: 'Cloudinary not configured',
      help: 'Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET'
    }, { status: 500 })
  }

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
    return NextResponse.json({ error: 'Airtable not configured' }, { status: 500 })
  }

  const results: SyncResult[] = []

  try {
    // Fetch all records from Airtable
    const records = await fetchAllAirtableRecords()

    for (const record of records) {
      const result = await syncRecordImages(record)
      results.push(result)
    }

    const synced = results.filter(r => r.status === 'synced').length
    const skipped = results.filter(r => r.status === 'skipped').length
    const errors = results.filter(r => r.status === 'error').length

    return NextResponse.json({
      success: true,
      summary: { total: records.length, synced, skipped, errors },
      results
    })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json({
      error: 'Sync failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET endpoint to check sync status
export async function GET(request: NextRequest) {
  // Check authorization - SYNC_SECRET must be configured
  if (!SYNC_SECRET) {
    return NextResponse.json({ error: 'SYNC_SECRET not configured' }, { status: 500 })
  }
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${SYNC_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
    return NextResponse.json({ error: 'Airtable not configured' }, { status: 500 })
  }

  try {
    const records = await fetchAllAirtableRecords()

    const withCloudinary = records.filter(r => r.fields.cloudinary_urls).length
    const withoutCloudinary = records.filter(r => !r.fields.cloudinary_urls).length
    const withAttachments = records.filter(r =>
      r.fields.bilder_attachments &&
      Array.isArray(r.fields.bilder_attachments) &&
      r.fields.bilder_attachments.length > 0
    ).length

    return NextResponse.json({
      totalRecords: records.length,
      withCloudinaryUrls: withCloudinary,
      needsSync: withoutCloudinary,
      hasAttachments: withAttachments,
      cloudinaryConfigured: !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY)
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to check status',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

async function fetchAllAirtableRecords(): Promise<any[]> {
  const allRecords: any[] = []
  let offset: string | undefined

  do {
    const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`)
    url.searchParams.set('pageSize', '100')
    if (offset) {
      url.searchParams.set('offset', offset)
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`)
    }

    const data = await response.json()
    allRecords.push(...(data.records || []))
    offset = data.offset
  } while (offset)

  return allRecords
}

async function syncRecordImages(record: any): Promise<SyncResult> {
  const title = record.fields.title || record.fields.titel || 'Unknown'

  // Skip if already has Cloudinary URLs
  if (record.fields.cloudinary_urls) {
    return {
      recordId: record.id,
      title,
      status: 'skipped',
    }
  }

  // Get source images (from attachments)
  const attachments = record.fields.bilder_attachments
  if (!attachments || !Array.isArray(attachments) || attachments.length === 0) {
    return {
      recordId: record.id,
      title,
      status: 'skipped',
    }
  }

  const imageUrls = attachments.map((att: any) => att.url).filter(Boolean)

  if (imageUrls.length === 0) {
    return {
      recordId: record.id,
      title,
      status: 'skipped',
    }
  }

  try {
    // Upload images to Cloudinary
    const cloudinaryUrls = await uploadMultipleImages(imageUrls, {
      folder: 'mezzarano/properties',
      propertyId: record.id,
    })

    if (cloudinaryUrls.length === 0) {
      return {
        recordId: record.id,
        title,
        status: 'error',
        error: 'No images uploaded successfully',
      }
    }

    // Update Airtable with Cloudinary URLs
    await updateAirtableRecord(record.id, {
      cloudinary_urls: cloudinaryUrls.join('\n'),
    })

    return {
      recordId: record.id,
      title,
      status: 'synced',
      imageCount: cloudinaryUrls.length,
    }
  } catch (error) {
    return {
      recordId: record.id,
      title,
      status: 'error',
      error: error instanceof Error ? error.message : 'Upload failed',
    }
  }
}

async function updateAirtableRecord(recordId: string, fields: Record<string, any>): Promise<void> {
  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}/${recordId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to update Airtable: ${error}`)
  }
}
