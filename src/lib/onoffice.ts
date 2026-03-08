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
          data: {
            Vorname: vorname,
            Name: nachname,
            Email: data.email,
            Telefon1: data.phone || '',
            HerkunftKontakt: [mapInquiryType(data.inquiryType)],
            Bemerkung: data.message,
            newsletter: false,
            Status: 1, // Active
          },
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
            data: {
              Typ: 'Webformular',
              Bemerkung: `Website-Kontaktanfrage (${data.inquiryType || 'allgemein'}):\n\n${data.message}`,
              Adresse: addressId,
              Quelle: data.source || 'Website Kontaktformular',
            },
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
          data: {
            Vorname: data.vorname,
            Name: data.nachname,
            Email: data.email,
            Telefon1: data.telefon || '',
            HerkunftKontakt: ['Suchprofil Website'],
            Status: 1,
          },
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
          data: searchCriteriaData,
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
          data: {
            Typ: 'Webformular',
            Bemerkung: `Neues Suchprofil über Website:\n\nArt: ${data.art === 'kaufen' ? 'Kaufen' : 'Mieten'}\nTyp: ${data.typ}\nRegion: ${regionen.join(', ')}\nBudget: max. ${data.budgetMax?.toLocaleString('de-DE')} EUR${featuresText}${anmerkungenText}`,
            Adresse: addressId,
            Quelle: 'Website Suchprofil',
          },
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

export { ACTION_ID, RESOURCE_TYPE }
