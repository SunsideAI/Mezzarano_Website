import { NextRequest, NextResponse } from 'next/server'
import { fetchProperties } from '@/lib/airtable'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const filters = {
    ort: searchParams.get('ort') || undefined,
    kategorie: searchParams.get('kategorie') || undefined,
    rs_typ: searchParams.get('rs_typ') || undefined,
    zimmer_min: searchParams.get('zimmer_min') ? parseInt(searchParams.get('zimmer_min')!) : undefined,
    flaeche_min: searchParams.get('flaeche_min') ? parseInt(searchParams.get('flaeche_min')!) : undefined,
    preis_max: searchParams.get('preis_max') ? parseInt(searchParams.get('preis_max')!) : undefined,
    show_all: true, // Always show all for now
  }

  // Check if credentials are configured
  const hasCredentials = !!(
    (process.env.AIRTABLE_BASE_ID || process.env.AT_BASE) &&
    (process.env.AIRTABLE_TABLE_ID || process.env.AT_TABLE) &&
    (process.env.AIRTABLE_API_KEY || process.env.AT_TOKEN)
  )

  if (!hasCredentials) {
    return NextResponse.json({
      error: 'Airtable credentials not configured',
      properties: [],
      debug: {
        hasBaseId: !!(process.env.AIRTABLE_BASE_ID || process.env.AT_BASE),
        hasTableId: !!(process.env.AIRTABLE_TABLE_ID || process.env.AT_TABLE),
        hasToken: !!(process.env.AIRTABLE_API_KEY || process.env.AT_TOKEN),
      }
    })
  }

  try {
    const properties = await fetchProperties(filters)
    return NextResponse.json({
      properties,
      count: properties.length,
      source: 'airtable'
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      error: 'Failed to fetch properties',
      message: error instanceof Error ? error.message : 'Unknown error',
      properties: []
    }, { status: 500 })
  }
}
