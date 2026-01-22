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
    show_all: searchParams.get('show_all') === 'true',
  }

  try {
    const properties = await fetchProperties(filters)
    return NextResponse.json({ properties, count: properties.length })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch properties', properties: [] }, { status: 500 })
  }
}
