import { NextRequest, NextResponse } from 'next/server'
import { fetchEstates, isOnOfficeConfigured, OnOfficeProperty } from '@/lib/onoffice'
import { fetchProperties as fetchAirtableProperties, AirtableProperty } from '@/lib/airtable'

// Convert onOffice property to a format compatible with existing components
function normalizeOnOfficeProperty(prop: OnOfficeProperty): AirtableProperty {
  const isRent = prop.vermarktungsart === 'miete'

  return {
    id: String(prop.id),
    expose_id: prop.expose_id,
    titel: prop.titel,
    beschreibung: prop.objektbeschreibung,
    url: undefined,

    // Location
    kurz_adresse: [prop.strasse, prop.hausnummer].filter(Boolean).join(' ') || undefined,
    adresse_komplett: [prop.strasse, prop.hausnummer, prop.plz, prop.ort].filter(Boolean).join(', ') || undefined,
    strasse: prop.strasse,
    haus_nummer: prop.hausnummer,
    plz: prop.plz,
    ort: prop.ort,
    region: prop.region,

    // Classification
    kategorie: isRent ? 'Miete' : 'Kauf',
    unterkategorie: prop.objekttyp,
    objekt_typ: prop.nutzungsart,
    rs_typ: prop.objektart?.toUpperCase(),
    marketing_typ: isRent ? 'RENT' : 'BUY',
    status: prop.status === 1 ? 'Verfügbar' : 'Archiviert',

    // Financials
    preis: isRent ? prop.kaltmiete : prop.kaufpreis,
    preis_text: undefined,
    wohnflaeche: prop.wohnflaeche,
    grundstueck: prop.grundstuecksflaeche,

    // Features
    zimmer: prop.anzahl_zimmer,
    schlafzimmer: prop.anzahl_schlafzimmer,
    badezimmer: prop.anzahl_badezimmer,
    balkone: prop.anzahl_balkone,
    terrassen: prop.anzahl_terrassen,
    etagen: prop.anzahl_etagen,
    garagen: prop.anzahl_garagen,
    stellplaetze: prop.anzahl_stellplaetze,
    baujahr: prop.baujahr,
    heizung: prop.heizungsart,

    // Content
    objektbeschreibung: prop.objektbeschreibung,
    lage: prop.lage,
    ausstattung: prop.ausstattung_beschr,
    energieausweis: prop.energieausweistyp,
    energieeffizienzklasse: prop.energieeffizienzklasse,

    // Images
    bilder: prop.bilder,
    cover: prop.titelbild,
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  // Check for onOffice credentials first (preferred source)
  const hasOnOffice = isOnOfficeConfigured()

  // Check for Airtable credentials (fallback)
  const hasAirtable = !!(
    (process.env.AIRTABLE_BASE_ID || process.env.AT_BASE) &&
    (process.env.AIRTABLE_TABLE_ID || process.env.AT_TABLE) &&
    (process.env.AIRTABLE_API_KEY || process.env.AT_TOKEN)
  )

  if (!hasOnOffice && !hasAirtable) {
    return NextResponse.json({
      error: 'No property data source configured',
      properties: [],
      debug: {
        hasOnOffice,
        hasAirtable,
      }
    })
  }

  // Try onOffice first
  if (hasOnOffice) {
    try {
      const kategorie = searchParams.get('kategorie')
      const filters = {
        vermarktungsart: kategorie === 'Miete' ? 'miete' as const : kategorie === 'Kauf' ? 'kauf' as const : undefined,
        objektart: searchParams.get('rs_typ')?.toLowerCase() || undefined,
        ort: searchParams.get('ort') || undefined,
        preis_max: searchParams.get('preis_max') ? parseInt(searchParams.get('preis_max')!) : undefined,
        wohnflaeche_min: searchParams.get('flaeche_min') ? parseInt(searchParams.get('flaeche_min')!) : undefined,
        zimmer_min: searchParams.get('zimmer_min') ? parseInt(searchParams.get('zimmer_min')!) : undefined,
      }

      const { properties: onOfficeProps, total } = await fetchEstates(filters)

      // Normalize to AirtableProperty format for compatibility
      const properties = onOfficeProps.map(normalizeOnOfficeProperty)

      return NextResponse.json({
        properties,
        count: properties.length,
        total,
        source: 'onoffice'
      })
    } catch (error) {
      console.error('onOffice API Error:', error)
      // Fall through to Airtable if onOffice fails
    }
  }

  // Fallback to Airtable
  if (hasAirtable) {
    try {
      const filters = {
        ort: searchParams.get('ort') || undefined,
        kategorie: searchParams.get('kategorie') || undefined,
        rs_typ: searchParams.get('rs_typ') || undefined,
        zimmer_min: searchParams.get('zimmer_min') ? parseInt(searchParams.get('zimmer_min')!) : undefined,
        flaeche_min: searchParams.get('flaeche_min') ? parseInt(searchParams.get('flaeche_min')!) : undefined,
        preis_max: searchParams.get('preis_max') ? parseInt(searchParams.get('preis_max')!) : undefined,
        show_all: true,
      }

      const properties = await fetchAirtableProperties(filters)
      return NextResponse.json({
        properties,
        count: properties.length,
        source: 'airtable'
      })
    } catch (error) {
      console.error('Airtable API Error:', error)
      return NextResponse.json({
        error: 'Failed to fetch properties',
        message: error instanceof Error ? error.message : 'Unknown error',
        properties: []
      }, { status: 500 })
    }
  }

  return NextResponse.json({
    error: 'No data source available',
    properties: []
  }, { status: 500 })
}
