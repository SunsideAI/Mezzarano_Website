/**
 * onOffice API Client
 *
 * Handles authentication (HMAC v2) and requests to onOffice enterprise CRM.
 * Documentation: https://apidoc.onoffice.de
 */

import crypto from 'crypto'

// API Configuration
const ONOFFICE_API_URL = 'https://api.onoffice.de/api/stable/api.php'

// Action IDs
const ACTION_ID = {
  READ: 'urn:onoffice-de-ns:smart:2.5:smartml:action:read',
  CREATE: 'urn:onoffice-de-ns:smart:2.5:smartml:action:create',
  MODIFY: 'urn:onoffice-de-ns:smart:2.5:smartml:action:modify',
  DELETE: 'urn:onoffice-de-ns:smart:2.5:smartml:action:delete',
  GET: 'urn:onoffice-de-ns:smart:2.5:smartml:action:get',
  DO: 'urn:onoffice-de-ns:smart:2.5:smartml:action:do',
} as const

// Resource Types
const RESOURCE_TYPE = {
  ESTATE: 'estate',
  ESTATE_PICTURES: 'estatepictures',
  ADDRESS: 'address',
  SEARCH_CRITERIA: 'searchcriteria',
  AGENTS_LOG: 'agentslog',
  TASK: 'task',
  APPOINTMENT: 'appointment',
  RELATION: 'relation',
} as const

type ActionId = typeof ACTION_ID[keyof typeof ACTION_ID]
type ResourceType = typeof RESOURCE_TYPE[keyof typeof RESOURCE_TYPE]

interface OnOfficeConfig {
  token: string
  secret: string
}

interface OnOfficeAction {
  actionid: ActionId
  resourcetype: ResourceType
  resourceid?: string | number
  identifier?: string
  parameters?: Record<string, unknown>
}

interface OnOfficeResponse {
  status: {
    code: number
    message: string
  }
  response: {
    results: Array<{
      actionid: string
      resourcetype: string
      data: {
        meta: {
          cntabsolute: number
        }
        records: Array<{
          id: number
          type: string
          elements: Record<string, unknown>
        }>
      }
      status: {
        errorcode: number
        message: string
      }
    }>
  }
}

/**
 * Generate HMAC v2 signature for onOffice API
 */
function generateHMAC(
  timestamp: number,
  token: string,
  resourcetype: string,
  actionid: string,
  secret: string
): string {
  const message = `${timestamp}${token}${resourcetype}${actionid}`
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(message)
  return hmac.digest('base64')
}

/**
 * Create onOffice API client
 */
export function createOnOfficeClient(config?: OnOfficeConfig) {
  const tokenValue = config?.token || process.env.ONOFFICE_TOKEN
  const secretValue = config?.secret || process.env.ONOFFICE_SECRET

  if (!tokenValue || !secretValue) {
    throw new Error('onOffice API credentials not configured. Set ONOFFICE_TOKEN and ONOFFICE_SECRET environment variables.')
  }

  const token: string = tokenValue
  const secret: string = secretValue

  /**
   * Execute API request
   */
  async function request(actions: OnOfficeAction[]): Promise<OnOfficeResponse> {
    const timestamp = Math.floor(Date.now() / 1000)

    const formattedActions = actions.map((action, index) => ({
      actionid: action.actionid,
      resourceid: action.resourceid || '',
      resourcetype: action.resourcetype,
      identifier: action.identifier || `action_${index}`,
      timestamp,
      hmac: generateHMAC(timestamp, token, action.resourcetype, action.actionid, secret),
      hmac_version: '2',
      parameters: action.parameters || {},
    }))

    const payload = {
      token,
      request: {
        actions: formattedActions,
      },
    }

    const response = await fetch(ONOFFICE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`onOffice API request failed: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  return {
    request,
    ACTION_ID,
    RESOURCE_TYPE,
  }
}

// ─── Lead/Contact Types ─────────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  inquiryType?: string
  message: string
  source?: string
}

export interface SearchProfileData {
  // Contact Info
  vorname: string
  nachname: string
  email: string
  telefon?: string

  // Search Criteria
  art: 'kaufen' | 'mieten'
  typ: 'haus' | 'wohnung' | 'grundstueck' | 'gewerbe'
  regionen: string[]
  ortFreitext?: string
  zimmer?: string
  wohnflaecheMin?: number
  wohnflaecheMax?: number
  grundstueckMin?: number
  grundstueckMax?: number
  nutzflaecheMin?: number
  nutzflaecheMax?: number
  budgetMax?: number
  features?: string[]
  anmerkungen?: string
}

// ─── Helper Functions ────────────────────────────────────────────────────────

/**
 * Map inquiry type to onOffice Herkunft value
 */
function mapInquiryType(type?: string): string {
  const mapping: Record<string, string> = {
    kaufberatung: 'Kaufinteresse',
    verkaufsberatung: 'Verkaufsinteresse',
    mietberatung: 'Mietinteresse',
    bewertung: 'Bewertungsanfrage',
    allgemein: 'Website Anfrage',
  }
  return mapping[type || ''] || 'Website Anfrage'
}

/**
 * Map property type to onOffice objektart value
 */
function mapPropertyType(type: string): string {
  const mapping: Record<string, string> = {
    haus: 'haus',
    wohnung: 'wohnung',
    grundstueck: 'grundstueck',
    gewerbe: 'gewerbe',
  }
  return mapping[type] || 'haus'
}

/**
 * Map transaction type to onOffice vermarktungsart
 */
function mapTransactionType(art: string): string {
  return art === 'mieten' ? 'miete' : 'kauf'
}

// ─── API Functions ──────────────────────────────────────────────────────────

/**
 * Create a new contact/address in onOffice
 */
export async function createContact(data: ContactFormData): Promise<{ success: boolean; addressId?: number; error?: string }> {
  try {
    const client = createOnOfficeClient()

    // Split name into first and last name
    const nameParts = data.name.trim().split(/\s+/)
    const vorname = nameParts[0] || ''
    const nachname = nameParts.slice(1).join(' ') || vorname

    const response = await client.request([
      {
        actionid: client.ACTION_ID.CREATE,
        resourcetype: client.RESOURCE_TYPE.ADDRESS,
        parameters: {
          Vorname: vorname,
          Name: nachname,
          Email: data.email,
          Telefon1: data.phone || '',
          Bemerkung: `[${data.inquiryType || 'Allgemein'}] ${data.message}`,
          Status: 1, // Active
        },
      },
    ])

    const result = response.response.results[0]

    if (result.status.errorcode === 0 && result.data.records.length > 0) {
      const addressId = result.data.records[0].id

      // Create activity log entry
      await client.request([
        {
          actionid: client.ACTION_ID.CREATE,
          resourcetype: client.RESOURCE_TYPE.AGENTS_LOG,
          parameters: {
            Typ: 'Webformular',
            Bemerkung: `Website-Kontaktanfrage (${data.inquiryType || 'allgemein'}):\n\n${data.message}`,
            Adresse: addressId,
            Quelle: data.source || 'Website Kontaktformular',
          },
        },
      ])

      return { success: true, addressId }
    }

    return { success: false, error: result.status.message }
  } catch (error) {
    console.error('onOffice createContact error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/**
 * Create a new search profile (address + search criteria) in onOffice
 */
export async function createSearchProfile(data: SearchProfileData): Promise<{ success: boolean; addressId?: number; searchCriteriaId?: number; error?: string }> {
  try {
    const client = createOnOfficeClient()

    // Step 1: Create or find address
    const addressResponse = await client.request([
      {
        actionid: client.ACTION_ID.CREATE,
        resourcetype: client.RESOURCE_TYPE.ADDRESS,
        identifier: 'create_address',
        parameters: {
          Vorname: data.vorname,
          Name: data.nachname,
          Email: data.email,
          Telefon1: data.telefon || '',
          Bemerkung: 'Suchprofil ueber Website erstellt',
          Status: 1,
        },
      },
    ])

    const addressResult = addressResponse.response.results[0]

    if (addressResult.status.errorcode !== 0) {
      return { success: false, error: addressResult.status.message }
    }

    const addressId = addressResult.data.records[0]?.id
    if (!addressId) {
      return { success: false, error: 'Failed to create address' }
    }

    // Step 2: Create search criteria linked to address
    const regionen = [...data.regionen]
    if (data.ortFreitext) {
      regionen.push(data.ortFreitext)
    }

    const searchCriteriaData: Record<string, unknown> = {
      vermarktungsart: mapTransactionType(data.art),
      objektart: mapPropertyType(data.typ),
      regionaler_zusatz: regionen.join(', '),
      kaufpreis_bis: data.budgetMax || 0,
    }

    // Add type-specific fields
    if (data.typ === 'haus' || data.typ === 'wohnung') {
      if (data.zimmer && data.zimmer !== 'egal') {
        searchCriteriaData.anzahl_zimmer_von = parseInt(data.zimmer.replace('+', ''))
      }
      if (data.wohnflaecheMin) searchCriteriaData.wohnflaeche_von = data.wohnflaecheMin
      if (data.wohnflaecheMax) searchCriteriaData.wohnflaeche_bis = data.wohnflaecheMax
    }

    if (data.typ === 'haus' || data.typ === 'grundstueck') {
      if (data.grundstueckMin) searchCriteriaData.grundstuecksflaeche_von = data.grundstueckMin
      if (data.grundstueckMax) searchCriteriaData.grundstuecksflaeche_bis = data.grundstueckMax
    }

    if (data.typ === 'gewerbe') {
      if (data.nutzflaecheMin) searchCriteriaData.nutzflaeche_von = data.nutzflaecheMin
      if (data.nutzflaecheMax) searchCriteriaData.nutzflaeche_bis = data.nutzflaecheMax
    }

    const searchCriteriaResponse = await client.request([
      {
        actionid: client.ACTION_ID.CREATE,
        resourcetype: client.RESOURCE_TYPE.SEARCH_CRITERIA,
        identifier: 'create_searchcriteria',
        parameters: {
          addressid: addressId,
          ...searchCriteriaData,
        },
      },
    ])

    const searchResult = searchCriteriaResponse.response.results[0]

    if (searchResult.status.errorcode !== 0) {
      // Address was created but search criteria failed
      return {
        success: false,
        addressId,
        error: `Search criteria error: ${searchResult.status.message}`
      }
    }

    const searchCriteriaId = searchResult.data.records[0]?.id

    // Step 3: Create activity log with full details
    const featuresText = data.features?.length ? `\nAusstattung: ${data.features.join(', ')}` : ''
    const anmerkungenText = data.anmerkungen ? `\nAnmerkungen: ${data.anmerkungen}` : ''

    await client.request([
      {
        actionid: client.ACTION_ID.CREATE,
        resourcetype: client.RESOURCE_TYPE.AGENTS_LOG,
        parameters: {
          Typ: 'Webformular',
          Bemerkung: `Neues Suchprofil über Website:\n\nArt: ${data.art === 'kaufen' ? 'Kaufen' : 'Mieten'}\nTyp: ${data.typ}\nRegion: ${regionen.join(', ')}\nBudget: max. ${data.budgetMax?.toLocaleString('de-DE')} EUR${featuresText}${anmerkungenText}`,
          Adresse: addressId,
          Quelle: 'Website Suchprofil',
        },
      },
    ])

    return { success: true, addressId, searchCriteriaId }
  } catch (error) {
    console.error('onOffice createSearchProfile error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/**
 * Check if onOffice API is configured
 */
export function isOnOfficeConfigured(): boolean {
  return !!(process.env.ONOFFICE_TOKEN && process.env.ONOFFICE_SECRET)
}

// ─── Estate/Property Types ──────────────────────────────────────────────────

export interface OnOfficeProperty {
  // Core identifiers
  id: number
  expose_id: string
  objektnr_extern?: string
  objektnr_intern?: string

  // Title & Description
  titel: string
  objekttitel?: string
  objektbeschreibung?: string
  lage?: string
  ausstattung_beschr?: string
  spiegel_bemerkung?: string

  // Location
  strasse?: string
  hausnummer?: string
  plz?: string
  ort?: string
  land?: string
  region?: string
  bundesland?: string
  flur?: string
  flurstk?: string
  gemarkung?: string
  breitengrad?: number
  laengengrad?: number

  // Classification
  nutzungsart?: string           // Wohnen, Gewerbe, etc.
  objektart?: string             // haus, wohnung, etc.
  vermarktungsart?: string       // kauf, miete
  objekttyp?: string             // Einfamilienhaus, Mehrfamilienhaus, etc.
  status?: number                // 1=Aktiv, 2=Inaktiv, 0=Archiviert

  // Homepage Status
  homepage_status?: string              // ind_2910_Feld_ObjKategorie194 (ind_Schl_5603 = Online)
  online_vermarktungsstatus?: string    // WI-Homepage Status (mw_website_online = Online)

  // Pricing
  kaufpreis?: number
  kaltmiete?: number
  warmmiete?: number
  nebenkosten?: number
  heizkosten?: number
  kaution?: string
  courtage?: string
  courtage_hinweis?: string
  provisionspflichtig?: boolean
  provision?: string
  mietpreis_pro_qm?: number
  kaufpreis_pro_qm?: number
  nettokaltmiete?: number
  pauschalmiete?: number
  erbpacht?: number
  hausgeld?: number
  abstand?: number
  preis_zeitraum_von?: string
  preis_zeitraum_bis?: string
  mwst_satz?: number
  mwst_gesamt?: number
  freitext_preis?: string

  // Areas & Sizes
  wohnflaeche?: number
  nutzflaeche?: number
  gesamtflaeche?: number
  grundstuecksflaeche?: number
  verkaufsflaeche?: number
  lagerflaeche?: number
  bueroflaeche?: number
  gastroflaeche?: number
  sonstflaeche?: number
  balkon_terrasse_flaeche?: number
  fensterfront?: number
  verwaltungsflaeche?: number
  teilbar_ab?: number
  gartenflaeche?: number
  kellerflaeche?: number
  dachbodenflaeche?: number

  // Rooms & Structure
  anzahl_zimmer?: number
  anzahl_schlafzimmer?: number
  anzahl_badezimmer?: number
  anzahl_sep_wc?: number
  anzahl_balkone?: number
  anzahl_terrassen?: number
  anzahl_loggien?: number
  anzahl_wohneinheiten?: number
  anzahl_gewerbeeinheiten?: number
  etage?: number
  anzahl_etagen?: number
  etagenzahl?: number
  wohnungsnr?: string

  // Parking
  anzahl_garagen?: number
  anzahl_stellplaetze?: number
  anzahl_carport?: number
  stellplatzmiete?: number
  stellplatzpreis?: number

  // Building details
  baujahr?: number
  letzte_modernisierung?: string
  zustand?: string
  alter?: string
  bebaubar_mit?: string
  bauart?: string
  ausbaustufe?: string
  dachform?: string
  bodenbelag?: string
  erschliessung?: string
  erschliessung_umfang?: string
  grundstueckzustand?: string

  // Heating & Energy
  heizungsart?: string
  befeuerung?: string
  energieausweis?: string
  energieausweistyp?: string
  energieverbrauchskennwert?: string
  energieeffizienzklasse?: string
  endenergiebedarf?: string
  primaerenergietraeger?: string
  stromverbrauch?: string
  waermelieferung?: string
  baujahr_heizung?: number
  energiepass_gueltig_bis?: string

  // Features (booleans)
  keller?: boolean
  dachboden?: boolean
  fahrstuhl?: boolean
  rollstuhlgerecht?: boolean
  tiefgarage?: boolean
  swimmingpool?: boolean
  sauna?: boolean
  wintergarten?: boolean
  gaestewc?: boolean
  kamin?: boolean
  klimaanlage?: boolean
  gartennutzung?: boolean
  einbaukueche?: boolean
  moebiliert?: boolean
  seniorengerecht?: boolean
  barrierefrei?: boolean
  denkmalschutzobjekt?: boolean
  haustiere?: boolean
  als_ferienwohnung?: boolean
  gewerbliche_nutzung?: boolean

  // Additional info
  verfuegbar_ab?: string
  max_mietdauer?: string
  min_mietdauer?: string
  objektzustand?: string
  qualitaet_ausstattung?: string
  anzahl_betten?: number
  vermietbare_flaeche?: number
  kueche?: string
  bad?: string
  boden?: string
  verkehrswert?: number
  mieteinnahmen_ist?: number
  mieteinnahmen_soll?: number
  rendite?: number
  x_fache?: number

  // Dates
  stand_vom?: string
  aktiv_bis?: string
  angelegt_am?: string
  geaendert_am?: string

  // Images (will be fetched separately)
  bilder: string[]
  titelbild?: string
}

// German labels for property types
const OBJEKTART_LABELS: Record<string, string> = {
  'haus': 'Haus',
  'wohnung': 'Wohnung',
  'grundstueck': 'Grundstück',
  'buero_praxen': 'Büro/Praxen',
  'einzelhandel': 'Einzelhandel',
  'gastgewerbe': 'Gastronomie/Hotel',
  'hallen_lager_prod': 'Halle/Lager/Produktion',
  'land_forstwirtschaft': 'Land-/Forstwirtschaft',
  'parken': 'Parken',
  'sonstige': 'Sonstige',
  'freizeitimmobilie_gewerblich': 'Freizeitimmobilie',
  'zinshaus_renditeobjekt': 'Zinshaus/Renditeobjekt',
}

const OBJEKTTYP_LABELS: Record<string, string> = {
  'einfamilienhaus': 'Einfamilienhaus',
  'mehrfamilienhaus': 'Mehrfamilienhaus',
  'doppelhaushaelfte': 'Doppelhaushälfte',
  'reihenhaus': 'Reihenhaus',
  'reihenmittelhaus': 'Reihenmittelhaus',
  'reiheneckhaus': 'Reiheneckhaus',
  'reihenendhaus': 'Reihenendhaus',
  'zweifamilienhaus': 'Zweifamilienhaus',
  'villa': 'Villa',
  'stadthaus': 'Stadthaus',
  'bungalow': 'Bungalow',
  'landhaus': 'Landhaus',
  'bauernhaus': 'Bauernhaus',
  'etagenwohnung': 'Etagenwohnung',
  'erdgeschosswohnung': 'Erdgeschosswohnung',
  'dachgeschoss': 'Dachgeschosswohnung',
  'maisonette': 'Maisonette',
  'loft': 'Loft/Studio',
  'penthouse': 'Penthouse',
  'apartment': 'Apartment',
  'souterrain': 'Souterrain',
}

const ZUSTAND_LABELS: Record<string, string> = {
  'erstbezug': 'Erstbezug',
  'neuwertig': 'Neuwertig',
  'modernisiert': 'Modernisiert',
  'gepflegt': 'Gepflegt',
  'renovierungsbeduerftig': 'Renovierungsbedürftig',
  'sanierungsbeduerftig': 'Sanierungsbedürftig',
  'abrissobjekt': 'Abrissreif',
  'nach_vereinbarung': 'Nach Vereinbarung',
}

const HEIZUNGSART_LABELS: Record<string, string> = {
  'zentralheizung': 'Zentralheizung',
  'etagenheizung': 'Etagenheizung',
  'ofenheizung': 'Ofenheizung',
  'fernwaerme': 'Fernwärme',
  'fussbodenheizung': 'Fußbodenheizung',
  'blockheizkraftwerk': 'Blockheizkraftwerk',
  'waermepumpe': 'Wärmepumpe',
  'solar': 'Solar',
  'pellets': 'Pelletheizung',
}

const BEFEUERUNG_LABELS: Record<string, string> = {
  'oel': 'Öl',
  'gas': 'Gas',
  'elektro': 'Elektro',
  'alternativ': 'Alternativ',
  'solar': 'Solar',
  'erdwaerme': 'Erdwärme',
  'luftwaerme': 'Luftwärmepumpe',
  'fernwaerme': 'Fernwärme',
  'pellets': 'Pellets',
  'kohle': 'Kohle',
  'holz': 'Holz',
  'fluessiggas': 'Flüssiggas',
}

export function getObjektartLabel(objektart?: string): string {
  if (!objektart) return 'Immobilie'
  return OBJEKTART_LABELS[objektart.toLowerCase()] || objektart
}

export function getObjekttypLabel(objekttyp?: string): string {
  if (!objekttyp) return ''
  return OBJEKTTYP_LABELS[objekttyp.toLowerCase()] || objekttyp
}

export function getZustandLabel(zustand?: string): string {
  if (!zustand) return ''
  return ZUSTAND_LABELS[zustand.toLowerCase()] || zustand
}

export function getHeizungsartLabel(heizungsart?: string): string {
  if (!heizungsart) return ''
  return HEIZUNGSART_LABELS[heizungsart.toLowerCase()] || heizungsart
}

export function getBefeuerungLabel(befeuerung?: string): string {
  if (!befeuerung) return ''
  return BEFEUERUNG_LABELS[befeuerung.toLowerCase()] || befeuerung
}

// Fields to request from onOffice API
// WICHTIG: Nur Felder verwenden die in ONOFFICE_API_REFERENZ.md dokumentiert sind!
const ESTATE_FIELDS = [
  // Identifikation (Doku Abschnitt 10)
  'Id', 'objektnr_extern', 'objekttitel',
  // Beschreibungen
  'objektbeschreibung', 'ausstatt_beschr', 'lage', 'sonstige_angaben',
  // Klassifizierung
  'objektart', 'objekttyp', 'vermarktungsart', 'nutzungsart', 'status',
  // Adresse
  'strasse', 'hausnummer', 'plz', 'ort', 'bundesland', 'land',
  'breitengrad', 'laengengrad',
  // Preise Kauf
  'kaufpreis', 'preisAufAnfrage',
  // Preise Miete
  'kaltmiete', 'warmmiete', 'nebenkosten', 'heizkosten', 'kaution', 'hausgeld',
  // Provision
  'aussen_courtage', 'provisionsfrei',
  // Flaechen
  'wohnflaeche', 'nutzflaeche', 'grundstuecksflaeche', 'gesamtflaeche',
  'balkon_terrasse_flaeche',
  // Zimmer
  'anzahl_zimmer', 'anzahl_schlafzimmer', 'anzahl_badezimmer',
  'anzahl_balkone', 'anzahl_terrassen', 'etage', 'etagen_zahl',
  // Parking
  'anzahl_stellplaetze',
  // Gebaeude
  'baujahr', 'zustand', 'ausstattungsqualitaet',
  // Energie
  'energieausweistyp', 'energyClass', 'endenergiebedarf', 'energieverbrauchskennwert',
  'heizungsart', 'befeuerung', 'energietraeger',
  // Features (Boolean)
  'balkon', 'terrasse', 'gartennutzung', 'kamin', 'sauna', 'swimmingpool',
  'wintergarten', 'gaesteWc', 'barrierefrei', 'fahrstuhl',
  'klimatisiert', 'denkmalgeschuetzt', 'vermietet', 'provisionsfrei',
  'unterkellert',
  // Status
  'verkauft', 'reserviert', 'veroeffentlichen',
  'top_angebot', 'neu', 'referenz',
  // Mezzarano Custom Homepage-Status
  'ind_2910_Feld_ObjKategorie194',
  // Verfuegbarkeit
  'verfuegbar_ab',
  // Datum
  'erstellt_am', 'geaendert_am',
]

// Transform onOffice API record to our Property type
function transformEstateRecord(record: { id: number; elements: Record<string, unknown> }): OnOfficeProperty {
  const e = record.elements

  // Helper to get string value
  const str = (key: string): string | undefined => {
    const val = e[key]
    return val !== null && val !== undefined && val !== '' ? String(val) : undefined
  }

  // Helper to get number value
  const num = (key: string): number | undefined => {
    const val = e[key]
    if (val === null || val === undefined || val === '') return undefined
    const n = typeof val === 'number' ? val : parseFloat(String(val).replace(',', '.'))
    return isNaN(n) ? undefined : n
  }

  // Helper to get boolean value
  const bool = (key: string): boolean | undefined => {
    const val = e[key]
    if (val === null || val === undefined) return undefined
    if (typeof val === 'boolean') return val
    if (typeof val === 'string') return val.toLowerCase() === 'ja' || val === '1' || val.toLowerCase() === 'true'
    if (typeof val === 'number') return val === 1
    return undefined
  }

  const vermarktungsart = str('vermarktungsart')?.toLowerCase()
  const isRent = vermarktungsart === 'miete'

  return {
    id: record.id,
    expose_id: str('objektnr_extern') || String(record.id),
    objektnr_extern: str('objektnr_extern'),
    objektnr_intern: str('objektnr_intern'),

    titel: str('objekttitel') || 'Immobilie',
    objekttitel: str('objekttitel'),
    objektbeschreibung: str('objektbeschreibung'),
    lage: str('lage'),
    ausstattung_beschr: str('ausstatt_beschr') || str('sonstige_angaben'),

    strasse: str('strasse'),
    hausnummer: str('hausnummer'),
    plz: str('plz'),
    ort: str('ort'),
    land: str('land'),
    region: str('regionaler_zusatz'),
    bundesland: str('bundesland'),
    breitengrad: num('breitengrad'),
    laengengrad: num('laengengrad'),
    flur: str('flur'),
    flurstk: str('flurstk'),
    gemarkung: str('gemarkung'),

    nutzungsart: str('nutzungsart'),
    objektart: str('objektart'),
    vermarktungsart: vermarktungsart,
    objekttyp: str('objekttyp'),
    status: num('status'),

    // Homepage Status
    homepage_status: str('ind_2910_Feld_ObjKategorie194'),
    online_vermarktungsstatus: str('online_vermarktungsstatus'),

    kaufpreis: num('kaufpreis'),
    kaltmiete: num('kaltmiete'),
    warmmiete: num('warmmiete'),
    nebenkosten: num('nebenkosten'),
    heizkosten: num('heizkosten'),
    kaution: str('kaution'),
    courtage: str('aussen_courtage'),
    courtage_hinweis: str('courtage_hinweis'),
    provisionspflichtig: bool('provisionspflichtig'),
    provision: str('innen_courtage'),
    mietpreis_pro_qm: num('mietpreis_pro_qm'),
    kaufpreis_pro_qm: num('kaufpreis_pro_qm'),
    nettokaltmiete: num('nettokaltmiete'),
    pauschalmiete: num('pauschalmiete'),
    erbpacht: num('erbpacht'),
    hausgeld: num('hausgeld'),
    abstand: num('abstand'),
    freitext_preis: str('freitext_preis'),
    mwst_satz: num('mwst_satz'),
    mwst_gesamt: num('mwst_gesamt'),

    wohnflaeche: num('wohnflaeche'),
    nutzflaeche: num('nutzflaeche'),
    gesamtflaeche: num('gesamtflaeche'),
    grundstuecksflaeche: num('grundstuecksflaeche'),
    verkaufsflaeche: num('verkaufsflaeche'),
    lagerflaeche: num('lagerflaeche'),
    bueroflaeche: num('bueroflaeche'),
    gastroflaeche: num('gastroflaeche'),
    balkon_terrasse_flaeche: num('balkon_terrasse_flaeche'),
    gartenflaeche: num('gartenflaeche'),
    kellerflaeche: num('kellerflaeche'),
    teilbar_ab: num('teilbar_ab'),

    anzahl_zimmer: num('anzahl_zimmer'),
    anzahl_schlafzimmer: num('anzahl_schlafzimmer'),
    anzahl_badezimmer: num('anzahl_badezimmer'),
    anzahl_sep_wc: num('anzahl_sep_wc'),
    anzahl_balkone: num('anzahl_balkone'),
    anzahl_terrassen: num('anzahl_terrassen'),
    anzahl_loggien: num('anzahl_loggien'),
    anzahl_wohneinheiten: num('anzahl_wohneinheiten'),
    anzahl_gewerbeeinheiten: num('anzahl_gewerbeeinheiten'),
    etage: num('etage'),
    anzahl_etagen: num('anzahl_etagen') || num('etagenzahl'),
    etagenzahl: num('etagenzahl'),
    wohnungsnr: str('wohnungsnr'),

    anzahl_garagen: num('anzahl_garagen'),
    anzahl_stellplaetze: num('anzahl_stellplaetze'),
    anzahl_carport: num('anzahl_carport'),
    stellplatzmiete: num('stellplatzmiete'),
    stellplatzpreis: num('stellplatzpreis'),

    baujahr: num('baujahr'),
    letzte_modernisierung: str('letzte_modernisierung'),
    zustand: str('zustand'),
    alter: str('alter'),
    bebaubar_mit: str('bebaubar_mit'),
    bauart: str('bauart'),
    ausbaustufe: str('ausbaustufe'),
    dachform: str('dachform'),
    bodenbelag: str('bodenbelag'),
    erschliessung: str('erschliessung'),

    heizungsart: str('heizungsart'),
    befeuerung: str('befeuerung'),
    energieausweistyp: str('energieausweistyp'),
    energieverbrauchskennwert: str('energieverbrauchskennwert'),
    endenergiebedarf: str('endenergiebedarf'),
    energieeffizienzklasse: str('energieeffizienzklasse'),
    primaerenergietraeger: str('primaerenergietraeger'),
    baujahr_heizung: num('baujahr_heizung'),
    energiepass_gueltig_bis: str('energiepass_gueltig_bis'),
    stromverbrauch: str('stromverbrauch'),
    waermelieferung: str('waermelieferung'),

    keller: bool('keller') || bool('unterkellert'),
    dachboden: bool('dachboden'),
    fahrstuhl: bool('fahrstuhl'),
    rollstuhlgerecht: bool('rollstuhlgerecht'),
    tiefgarage: bool('tiefgarage'),
    swimmingpool: bool('swimmingpool'),
    sauna: bool('sauna'),
    wintergarten: bool('wintergarten'),
    gaestewc: bool('gaesteWc') || bool('gaestewc'),
    kamin: bool('kamin'),
    klimaanlage: bool('klimatisiert') || bool('klimaanlage'),
    gartennutzung: bool('gartennutzung'),
    einbaukueche: bool('einbaukueche'),
    moebiliert: bool('moebiliert'),
    seniorengerecht: bool('seniorengerecht'),
    barrierefrei: bool('barrierefrei'),
    denkmalschutzobjekt: bool('denkmalschutzobjekt') || bool('denkmalgeschuetzt'),
    haustiere: bool('haustiere'),
    als_ferienwohnung: bool('als_ferien') || bool('als_ferienwohnung'),
    gewerbliche_nutzung: bool('gewerbliche_nutzung'),

    verfuegbar_ab: str('verfuegbar_ab'),
    max_mietdauer: str('max_mietdauer'),
    min_mietdauer: str('min_mietdauer'),
    objektzustand: str('objektzustand'),
    qualitaet_ausstattung: undefined,
    anzahl_betten: num('anzahl_betten'),
    kueche: str('kueche'),
    bad: str('bad'),
    boden: str('boden'),
    verkehrswert: num('verkehrswert'),
    mieteinnahmen_ist: num('mieteinnahmen_ist'),
    mieteinnahmen_soll: num('mieteinnahmen_soll'),
    rendite: num('rendite'),
    x_fache: num('x_fache'),

    stand_vom: str('stand_vom'),
    aktiv_bis: str('aktiv_bis'),
    angelegt_am: str('erstellt_am'),
    geaendert_am: str('geaendert_am'),

    bilder: [],
    titelbild: undefined,
  }
}

// ─── Estate API Functions ───────────────────────────────────────────────────

export interface EstateFilter {
  vermarktungsart?: 'kauf' | 'miete'
  objektart?: string
  ort?: string
  plz?: string
  preis_max?: number
  preis_min?: number
  wohnflaeche_min?: number
  zimmer_min?: number
  status?: number  // 1=Active, 0=Archived
}

/**
 * Fetch estates/properties from onOffice CRM
 */
export async function fetchEstates(filters?: EstateFilter, options?: { limit?: number; offset?: number }): Promise<{ properties: OnOfficeProperty[]; total: number }> {
  try {
    const client = createOnOfficeClient()
    const limit = options?.limit || 100
    const offset = options?.offset || 0

    // Build filter object for onOffice
    const filter: Record<string, Array<{ op: string; val: string | number }>> = {}

    // Default: only active estates
    // HINWEIS: veroeffentlichen-Filter entfernt - Mezzarano nutzt Custom-Feld ind_2910_Feld_ObjKategorie194
    // Das Filtern nach Homepage-Status sollte in der Anwendungslogik erfolgen
    filter.status = [{ op: '=', val: 1 }]

    if (filters?.vermarktungsart) {
      filter.vermarktungsart = [{ op: '=', val: filters.vermarktungsart }]
    }
    if (filters?.objektart) {
      filter.objektart = [{ op: '=', val: filters.objektart }]
    }
    if (filters?.ort) {
      filter.ort = [{ op: 'like', val: `%${filters.ort}%` }]
    }
    if (filters?.plz) {
      filter.plz = [{ op: '=', val: filters.plz }]
    }
    if (filters?.preis_max) {
      // Filter on kaufpreis or kaltmiete depending on vermarktungsart
      if (filters.vermarktungsart === 'miete') {
        filter.kaltmiete = [{ op: '<=', val: filters.preis_max }]
      } else {
        filter.kaufpreis = [{ op: '<=', val: filters.preis_max }]
      }
    }
    if (filters?.preis_min) {
      if (filters.vermarktungsart === 'miete') {
        filter.kaltmiete = [{ op: '>=', val: filters.preis_min }]
      } else {
        filter.kaufpreis = [{ op: '>=', val: filters.preis_min }]
      }
    }
    if (filters?.wohnflaeche_min) {
      filter.wohnflaeche = [{ op: '>=', val: filters.wohnflaeche_min }]
    }
    if (filters?.zimmer_min) {
      filter.anzahl_zimmer = [{ op: '>=', val: filters.zimmer_min }]
    }

    const response = await client.request([
      {
        actionid: client.ACTION_ID.READ,
        resourcetype: client.RESOURCE_TYPE.ESTATE,
        identifier: 'fetch_estates',
        parameters: {
          data: ESTATE_FIELDS,
          listlimit: limit,
          listoffset: offset,
          filter,
          sortby: { geaendert_am: 'DESC' },
        },
      },
    ])

    const result = response.response.results[0]

    if (result.status.errorcode !== 0) {
      console.error('onOffice fetchEstates error:', result.status.message)
      return { properties: [], total: 0 }
    }

    const total = result.data.meta.cntabsolute
    const properties = result.data.records.map(transformEstateRecord)

    return { properties, total }
  } catch (error) {
    console.error('onOffice fetchEstates error:', error)
    return { properties: [], total: 0 }
  }
}

/**
 * Fetch a single estate by its ID
 */
export async function fetchEstateById(estateId: number): Promise<OnOfficeProperty | null> {
  try {
    const client = createOnOfficeClient()

    const response = await client.request([
      {
        actionid: client.ACTION_ID.READ,
        resourcetype: client.RESOURCE_TYPE.ESTATE,
        resourceid: estateId,
        identifier: 'fetch_estate_by_id',
        parameters: {
          data: ESTATE_FIELDS,
        },
      },
    ])

    const result = response.response.results[0]

    if (result.status.errorcode !== 0 || result.data.records.length === 0) {
      return null
    }

    return transformEstateRecord(result.data.records[0])
  } catch (error) {
    console.error('onOffice fetchEstateById error:', error)
    return null
  }
}

/**
 * Fetch estate by external object number (expose_id)
 */
export async function fetchEstateByExposeId(exposeId: string): Promise<OnOfficeProperty | null> {
  try {
    const client = createOnOfficeClient()

    const response = await client.request([
      {
        actionid: client.ACTION_ID.READ,
        resourcetype: client.RESOURCE_TYPE.ESTATE,
        identifier: 'fetch_estate_by_expose_id',
        parameters: {
          data: ESTATE_FIELDS,
          filter: {
            objektnr_extern: [{ op: '=', val: exposeId }],
          },
          listlimit: 1,
        },
      },
    ])

    const result = response.response.results[0]

    if (result.status.errorcode !== 0 || result.data.records.length === 0) {
      // Try by internal ID as fallback
      const numericId = parseInt(exposeId)
      if (!isNaN(numericId)) {
        return fetchEstateById(numericId)
      }
      return null
    }

    return transformEstateRecord(result.data.records[0])
  } catch (error) {
    console.error('onOffice fetchEstateByExposeId error:', error)
    return null
  }
}

/**
 * Fetch images for an estate (Homepage-published images)
 * Uses estatepictures resourcetype as per onOffice API documentation
 */
export async function fetchEstateImages(estateId: number): Promise<string[]> {
  try {
    const client = createOnOfficeClient()

    const response = await client.request([
      {
        actionid: client.ACTION_ID.GET,
        resourcetype: client.RESOURCE_TYPE.ESTATE_PICTURES,
        resourceid: '',
        identifier: 'fetch_estate_images',
        parameters: {
          estateids: [estateId],
          categories: ['Titelbild', 'Foto', 'Foto_gross', 'Grundriss', 'Lageplan', 'Panorama'],
          size: 'original',
        },
      },
    ])

    const result = response.response.results[0]

    if (result.status.errorcode !== 0) {
      console.error('onOffice fetchEstateImages error:', result.status.message)
      return []
    }

    // Extract image URLs from the response
    // Response structure: records[].elements is array or single object with url field
    const images: string[] = []
    const records = result.data.records || []

    for (const record of records) {
      const elements = record.elements
      if (Array.isArray(elements)) {
        for (const el of elements as Array<{ url?: string; originalurl?: string }>) {
          if (el.url) images.push(String(el.url))
          else if (el.originalurl) images.push(String(el.originalurl))
        }
      } else if (elements) {
        const el = elements as { url?: string; originalurl?: string }
        if (el.url) images.push(String(el.url))
        else if (el.originalurl) images.push(String(el.originalurl))
      }
    }

    return images
  } catch (error) {
    console.error('onOffice fetchEstateImages error:', error)
    return []
  }
}

/**
 * Fetch estate with images (combines estate data with images)
 */
export async function fetchEstateWithImages(estateId: number): Promise<OnOfficeProperty | null> {
  const [estate, images] = await Promise.all([
    fetchEstateById(estateId),
    fetchEstateImages(estateId),
  ])

  if (!estate) return null

  estate.bilder = images
  estate.titelbild = images[0]

  return estate
}

/**
 * Fetch estate by expose ID with images
 */
export async function fetchEstateByExposeIdWithImages(exposeId: string): Promise<OnOfficeProperty | null> {
  const estate = await fetchEstateByExposeId(exposeId)
  if (!estate) return null

  const images = await fetchEstateImages(estate.id)
  estate.bilder = images
  estate.titelbild = images[0]

  return estate
}

export { ACTION_ID, RESOURCE_TYPE }
