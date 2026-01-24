/**
 * Airtable Integration for Mezzarano Immobilien
 * Fetches property data from Airtable (populated by scraper)
 */

export interface AirtableProperty {
  id: string
  expose_id: string
  titel: string
  beschreibung?: string
  url?: string

  // Location
  kurz_adresse?: string
  adresse_komplett?: string
  strasse?: string
  haus_nummer?: string
  plz?: string
  ort?: string
  region?: string

  // Classification
  kategorie?: string  // Kauf | Miete
  unterkategorie?: string
  objekt_typ?: string // LIVING, COMMERCIAL, etc.
  rs_typ?: string     // HOUSE, APARTMENT, etc.
  marketing_typ?: string
  status?: string     // Verfügbar, verkauft, etc.

  // Financials & Size
  preis?: number
  preis_text?: string
  wohnflaeche?: number
  grundstueck?: number

  // Features
  zimmer?: number
  balkone?: number
  terrassen?: number
  baujahr?: number
  heizung?: string

  // Content
  objektbeschreibung?: string
  lage?: string
  ausstattung?: string
  energieausweis?: string
  energieeffizienzklasse?: string

  // Images
  bilder: string[]
  cover?: string
}

// German labels for property types
const RS_TYPE_LABELS: Record<string, string> = {
  'HOUSE': 'Haus',
  'APARTMENT': 'Wohnung',
  'APARTMENT_BUILDING': 'Mehrfamilienhaus',
  'OFFICE': 'Büro',
  'STORE': 'Laden/Geschäft',
  'GASTRONOMY': 'Gastronomie',
  'INDUSTRY': 'Industrie/Gewerbe',
  'LAND': 'Grundstück',
  'GARAGE': 'Garage/Stellplatz',
  'LIVING_BUSINESS_HOUSE': 'Wohn-/Geschäftshaus',
  'SPECIAL_ESTATE': 'Spezialimmobilie',
  'INVESTMENT': 'Kapitalanlage',
  'TRADE_SITE': 'Gewerbegrundstück'
}

const OBJEKT_TYPE_LABELS: Record<string, string> = {
  'LIVING': 'Wohnen',
  'COMMERCIAL': 'Gewerbe',
  'INVESTMENT': 'Kapitalanlage',
  'GASTRONOMY': 'Gastronomie',
  'INDUSTRY': 'Industrie',
  'AGRICULTURE': 'Landwirtschaft',
  'TRADE': 'Handel',
  'SHORT_TERM_ACCOMMODATION': 'Ferienimmobilie'
}

export function getRsTypeLabel(rsType?: string): string {
  if (!rsType) return 'Immobilie'
  return RS_TYPE_LABELS[rsType] || rsType
}

export function getObjektTypeLabel(objektType?: string): string {
  if (!objektType) return ''
  return OBJEKT_TYPE_LABELS[objektType] || objektType
}

// Parse German number formats
function parseGermanNumber(value: unknown): number | undefined {
  if (typeof value === 'number') return value
  if (typeof value !== 'string') return undefined

  // Remove currency symbols and units
  let cleaned = value.replace(/[€$m²\s]/gi, '')
  // German: 500.000,00 -> 500000.00
  cleaned = cleaned.replace(/\./g, '').replace(',', '.')

  const num = parseFloat(cleaned)
  return isNaN(num) ? undefined : num
}

// Transform Airtable record to our Property type
function transformRecord(record: any): AirtableProperty {
  const fields = record.fields || record

  // Resolve images with priority:
  // 1. cloudinary_urls (permanent, best option)
  // 2. bild_url (stable external URL from ImmobilienScout24 etc.)
  // 3. bilder (may contain multiple stable URLs)
  // 4. bilder_attachments (Airtable uploads - expire after ~2 hours!)
  let bilder: string[] = []

  // Priority 1: Use cloudinary_urls (permanent storage, best option)
  if (fields.cloudinary_urls && typeof fields.cloudinary_urls === 'string') {
    bilder = fields.cloudinary_urls.split('\n').filter(Boolean)
  }
  // Priority 2: Use bild_url (stable external URL)
  else if (fields.bild_url && typeof fields.bild_url === 'string') {
    bilder = [fields.bild_url]
  }
  // Priority 3: Use bilder field (may contain multiple URLs, newline-separated)
  else if (fields.bilder && typeof fields.bilder === 'string') {
    bilder = fields.bilder.split('\n').filter(Boolean)
  }
  // Priority 4: Last resort - use bilder_attachments (these expire after ~2 hours!)
  else if (fields.bilder_attachments && Array.isArray(fields.bilder_attachments)) {
    bilder = fields.bilder_attachments
      .map((att: any) => att.url)
      .filter(Boolean)
  }

  return {
    id: record.id || fields.id,
    expose_id: fields.expose_id || '',
    titel: fields.title || fields.titel || 'Immobilie',
    beschreibung: fields.beschreibung,
    url: fields.url,

    // Location
    kurz_adresse: fields.kurz_adresse,
    adresse_komplett: fields.adresse_komplett,
    strasse: fields.straße || fields.strasse,
    haus_nummer: fields.haus_nummer,
    plz: fields.plz,
    ort: fields.ort,
    region: fields.region,

    // Classification
    kategorie: fields.kategorie,
    unterkategorie: fields.unterkategorie,
    objekt_typ: fields.objekt_typ,
    rs_typ: fields.rs_typ,
    marketing_typ: fields.marketing_typ || (fields.kategorie === 'Miete' ? 'RENT' : 'BUY'),
    status: fields.status || 'Verfügbar',

    // Financials & Size
    preis: parseGermanNumber(fields.preis),
    preis_text: fields.preis_text || (fields.preis ? `${parseGermanNumber(fields.preis)?.toLocaleString('de-DE')} €` : undefined),
    wohnflaeche: parseGermanNumber(fields.wohnfläche || fields.wohnflaeche),
    grundstueck: parseGermanNumber(fields.grundstücksfläche || fields.grundstueckflaeche),

    // Features
    zimmer: parseGermanNumber(fields.zimmer),
    balkone: parseGermanNumber(fields.balkone),
    terrassen: parseGermanNumber(fields.terrassen),
    baujahr: parseGermanNumber(fields.baujahr),
    heizung: fields.heizung,

    // Content
    objektbeschreibung: fields.objektbeschreibung,
    lage: fields.lage,
    ausstattung: fields.ausstattung,
    energieausweis: fields.energieausweis,
    energieeffizienzklasse: fields.energieeffizienzklasse,

    // Images
    bilder,
    cover: bilder[0]
  }
}

// Build Airtable filter formula
function buildFilterFormula(filters: {
  ort?: string
  kategorie?: string
  rs_typ?: string
  zimmer_min?: number
  flaeche_min?: number
  preis_max?: number
  show_all?: boolean
}): string {
  const conditions: string[] = []

  // Note: Removed default status filter to show all properties

  if (filters.ort) {
    conditions.push(`FIND("${filters.ort}", {ort})`)
  }
  if (filters.kategorie) {
    conditions.push(`{kategorie}="${filters.kategorie}"`)
  }
  if (filters.rs_typ) {
    conditions.push(`{rs_typ}="${filters.rs_typ}"`)
  }
  if (filters.zimmer_min) {
    conditions.push(`{zimmer}>=${filters.zimmer_min}`)
  }
  if (filters.flaeche_min) {
    conditions.push(`{wohnfläche}>=${filters.flaeche_min}`)
  }
  if (filters.preis_max) {
    conditions.push(`{preis}<=${filters.preis_max}`)
  }

  if (conditions.length === 0) return ''
  if (conditions.length === 1) return conditions[0]
  return `AND(${conditions.join(', ')})`
}

/**
 * Fetch properties from Airtable
 */
export async function fetchProperties(filters?: {
  ort?: string
  kategorie?: string
  rs_typ?: string
  zimmer_min?: number
  flaeche_min?: number
  preis_max?: number
  show_all?: boolean
}): Promise<AirtableProperty[]> {
  const baseId = process.env.AIRTABLE_BASE_ID || process.env.AT_BASE
  const tableId = process.env.AIRTABLE_TABLE_ID || process.env.AT_TABLE
  const token = process.env.AIRTABLE_API_KEY || process.env.AT_TOKEN

  if (!baseId || !tableId || !token) {
    console.warn('Airtable credentials not configured, returning empty array')
    return []
  }

  const url = new URL(`https://api.airtable.com/v0/${baseId}/${tableId}`)
  url.searchParams.set('pageSize', '100')

  const formula = buildFilterFormula(filters || {})
  if (formula) {
    url.searchParams.set('filterByFormula', formula)
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      console.error('Airtable API error:', response.status, response.statusText)
      return []
    }

    const data = await response.json()
    return (data.records || []).map(transformRecord)
  } catch (error) {
    console.error('Failed to fetch from Airtable:', error)
    return []
  }
}

/**
 * Fetch a single property by ID
 */
export async function fetchPropertyById(id: string): Promise<AirtableProperty | null> {
  const baseId = process.env.AIRTABLE_BASE_ID || process.env.AT_BASE
  const tableId = process.env.AIRTABLE_TABLE_ID || process.env.AT_TABLE
  const token = process.env.AIRTABLE_API_KEY || process.env.AT_TOKEN

  if (!baseId || !tableId || !token) {
    return null
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        next: { revalidate: 300 }
      }
    )

    if (!response.ok) return null

    const record = await response.json()
    return transformRecord(record)
  } catch (error) {
    console.error('Failed to fetch property:', error)
    return null
  }
}

/**
 * Fetch property by expose_id
 */
export async function fetchPropertyByExposeId(exposeId: string): Promise<AirtableProperty | null> {
  const baseId = process.env.AIRTABLE_BASE_ID || process.env.AT_BASE
  const tableId = process.env.AIRTABLE_TABLE_ID || process.env.AT_TABLE
  const token = process.env.AIRTABLE_API_KEY || process.env.AT_TOKEN

  if (!baseId || !tableId || !token) {
    return null
  }

  const url = new URL(`https://api.airtable.com/v0/${baseId}/${tableId}`)
  url.searchParams.set('filterByFormula', `{expose_id}="${exposeId}"`)
  url.searchParams.set('maxRecords', '1')

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 300 }
    })

    if (!response.ok) return null

    const data = await response.json()
    if (!data.records || data.records.length === 0) return null

    return transformRecord(data.records[0])
  } catch (error) {
    console.error('Failed to fetch property by expose_id:', error)
    return null
  }
}
