import { NextRequest, NextResponse } from 'next/server'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || process.env.AT_TOKEN
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || process.env.AT_BASE
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID || process.env.AT_TABLE || 'Objekte'

export async function GET(request: NextRequest) {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
    return NextResponse.json({
      error: 'Airtable credentials not configured',
      hasApiKey: !!AIRTABLE_API_KEY,
      hasBaseId: !!AIRTABLE_BASE_ID,
      hasTableId: !!AIRTABLE_TABLE_ID,
    })
  }

  try {
    // Fetch first record to see field structure
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_ID)}?maxRecords=1`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json({
        error: 'Airtable API error',
        status: response.status,
        statusText: response.statusText,
      })
    }

    const data = await response.json()

    if (!data.records || data.records.length === 0) {
      return NextResponse.json({
        error: 'No records found in table',
      })
    }

    const record = data.records[0]
    const fields = record.fields

    // Analyze field types
    const fieldAnalysis: Record<string, { type: string; sample: unknown; isAttachment: boolean }> = {}

    for (const [key, value] of Object.entries(fields)) {
      let type = typeof value
      let isAttachment = false
      let sample: unknown = value

      if (Array.isArray(value)) {
        type = 'array'
        if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
          if ('url' in value[0]) {
            type = 'attachment_array'
            isAttachment = true
            sample = {
              count: value.length,
              firstItem: value[0],
            }
          } else {
            sample = { count: value.length, firstItem: value[0] }
          }
        } else {
          sample = { count: value.length, items: value.slice(0, 3) }
        }
      } else if (typeof value === 'string' && value.length > 100) {
        sample = value.substring(0, 100) + '...'
      }

      fieldAnalysis[key] = { type, sample, isAttachment }
    }

    // Find image fields
    const imageFields = Object.entries(fieldAnalysis)
      .filter(([_, info]) => info.isAttachment)
      .map(([name]) => name)

    return NextResponse.json({
      success: true,
      recordId: record.id,
      allFieldNames: Object.keys(fields),
      imageFields,
      fieldAnalysis,
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to fetch from Airtable',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
