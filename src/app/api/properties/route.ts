import { NextRequest, NextResponse } from 'next/server'
import { fetchEstates, fetchEstateImages, isOnOfficeConfigured, OnOfficeProperty } from '@/lib/onoffice'
import { fetchProperties as fetchAirtableProperties, AirtableProperty } from '@/lib/airtable'
import { properties as staticProperties, Property } from '@/data/properties'

// Convert static property to AirtableProperty format
function normalizeStaticProperty(prop: Property): AirtableProperty {
  return {
    id: prop.id,
    expose_id: `DEMO-${prop.id}`,
    titel: prop.title,
    beschreibung: prop.description,
    kategorie: prop.type === 'kauf' ? 'Kauf' : 'Miete',
    preis: prop.price,
    ort: prop.location,
    kurz_adresse: prop.address,
    adresse_komplett: prop.address,
    wohnflaeche: prop.area,
    zimmer: prop.bedrooms,
    badezimmer: prop.bathrooms,
    baujahr: prop.yearBuilt,
    cover: prop.images[0],
    bilder: prop.images,
    objekt_typ: prop.category,
    rs_typ: prop.category.toUpperCase(),
    marketing_typ: prop.type === 'kauf' ? 'BUY' : 'RENT',
    status: 'Verfügbar',
  }
}

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
    kurz_adresse: [prop.plz, prop.ort].filter(Boolean).join(' ') || undefined,
    adresse_komplett: [prop.plz, prop.ort].filter(Boolean).join(' ') || undefined,
    strasse: undefined,
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

  // Log data source status
  if (!hasOnOffice && !hasAirtable) {
    console.log('No external data sources configured, will use static fallback')
  }

  // Primary: onOffice CRM (Cloudinary for Airtable images expired)
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

      if (onOfficeProps.length > 0) {
        const propertiesWithImages = await Promise.all(
          onOfficeProps.map(async (prop) => {
            try {
              const images = await fetchEstateImages(prop.id)
              return {
                ...prop,
                bilder: images.length > 0 ? images : prop.bilder,
                titelbild: images[0] || prop.titelbild,
              }
            } catch (error) {
              console.error(`Failed to fetch images for estate ${prop.id}:`, error)
              return prop
            }
          })
        )

        // Filter out incomplete properties (no images, no real description, no price)
        const completeProperties = propertiesWithImages.filter(prop => {
          const hasImages = prop.bilder && prop.bilder.length > 0
          const hasTitle = prop.titel && prop.titel !== 'Immobilie'
          const hasPrice = (prop.kaufpreis && prop.kaufpreis > 0) || (prop.kaltmiete && prop.kaltmiete > 0)
          return hasImages && hasTitle && hasPrice
        })

        const properties = completeProperties.map(normalizeOnOfficeProperty)
        return NextResponse.json({
          properties,
          count: properties.length,
          total,
          source: 'onoffice'
        })
      }

      console.log('onOffice returned 0 properties, trying Airtable fallback...')
    } catch (error) {
      console.error('onOffice API Error:', error)
    }
  }

  // Fallback: Airtable
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

  // Ultimate fallback: static properties
  console.log('Using static properties as fallback...')
  const normalizedStatic = staticProperties.map(normalizeStaticProperty)
  return NextResponse.json({
    properties: normalizedStatic,
    count: normalizedStatic.length,
    source: 'static-fallback'
  })
}
