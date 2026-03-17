/**
 * Email Notification Service
 *
 * Uses Resend REST API to send lead notification emails to the team.
 * Recipients (Test-Modus): contact@sunsideai.de
 */

// Resend API endpoint
const RESEND_API_URL = 'https://api.resend.com/emails'

interface ResendEmailPayload {
  from: string
  to: string[]
  subject: string
  html: string
  reply_to?: string
}

interface ResendApiResponse {
  id?: string
  error?: {
    message: string
    name: string
  }
}

/**
 * Send email via Resend REST API (more reliable in serverless environments)
 * Includes timeout and retry logic for network resilience
 */
async function sendViaResendApi(payload: ResendEmailPayload, retries = 2): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured')
    return { success: true } // Silently skip if not configured
  }

  let lastError: string = 'Unknown error'

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Create AbortController with 10 second timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data: ResendApiResponse = await response.json()

      if (!response.ok || data.error) {
        const errorMessage = data.error?.message || `HTTP ${response.status}`
        console.error('Resend API error:', errorMessage)
        return { success: false, error: errorMessage }
      }

      console.log('Email sent successfully via Resend API, id:', data.id)
      return { success: true }
    } catch (error) {
      const isAbortError = error instanceof Error && error.name === 'AbortError'
      const isNetworkError = error instanceof Error && (
        error.message.includes('ETIMEDOUT') ||
        error.message.includes('fetch failed') ||
        error.message.includes('network')
      )

      lastError = isAbortError ? 'Request timeout' : (error instanceof Error ? error.message : 'Network error')
      console.error(`Resend API attempt ${attempt + 1}/${retries + 1} failed:`, lastError)

      // Only retry on timeout/network errors
      if ((isAbortError || isNetworkError) && attempt < retries) {
        // Exponential backoff: 1s, 2s
        const delay = Math.pow(2, attempt) * 1000
        console.log(`Retrying in ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }

      // Don't retry for other errors
      break
    }
  }

  console.error('Resend API all attempts failed:', lastError)
  return { success: false, error: lastError }
}

// Email recipients for lead notifications
// TODO: Für Produktion wieder hinzufügen: 'sandro.mezzarano@wuestenrot.de'
const NOTIFICATION_RECIPIENTS = [
  'contact@sunsideai.de',
]

// Sender email (must be verified in Resend)
const SENDER_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@sunsideai.de'
const SENDER_NAME = 'Mezzarano Immobilien Website'

/**
 * Check if email notifications are configured
 */
export function isEmailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY
}

// ─── Email Types ─────────────────────────────────────────────────────────────

export interface ContactLeadData {
  name: string
  email: string
  phone?: string
  inquiryType?: string
  message: string
  propertyId?: string
  propertyTitle?: string
  source?: string
}

export interface SearchProfileLeadData {
  vorname: string
  nachname: string
  email: string
  telefon?: string
  art: 'kaufen' | 'mieten'
  typ: string
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

export interface NewsletterLeadData {
  email: string
}

// ─── Email Templates ─────────────────────────────────────────────────────────

// Wüstenrot Brand Colors
const WUESTENROT = '#f84914'
const WUESTENNACHT = '#141414'
const WARMGRAU = '#eeeeee'

// Wüstenrot W Logo as inline SVG (works in all email clients)
const WUESTENROT_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" width="40" height="40"><rect width="42" height="42" fill="#FFFFFF"/><path fill="#f84914" d="M0,0v42h42V0H0z M20.4,33.3l1.9,2.1c-0.6,1-1.5,1-1.5,1s-1.3,0.1-1.5-1.2C19.2,34.4,19.9,33.8,20.4,33.3z M20,30.4c0-0.5,0.2-1,0.8-1.1c0.5-0.1,0.9,0.3,1,0.7c0.2,0.9-0.9,1.5-0.9,1.5S20,31.1,20,30.4z M36,36.3h-4.8L29,26.9L27,36.3h-1.7l-1.2-1.3c0,0,0.6-1.1,0.8-2.3h-1.3c-0.1,0.6-0.5,1.2-0.5,1.2l-1.4-1.5c0,0,1.7-1,1.3-2.6c-0.2-1-1.2-2-2.6-1.7c-1.2,0.2-2.1,1.4-1.8,2.8c0.2,0.8,0.9,1.4,0.9,1.4s-2.2,1.3-1.9,3.4c0,0.2,0.1,0.5,0.3,0.7h-3.2l-2.2-9.5L10.6,36.3H5.8L2.3,22.3h4.3l2,9.6l2.2-9.6h3.8l2.2,9.6l2-9.6H23l2,9.6l2.2-9.6H31l2.2,9.6l2-9.6h4.3L36,36.3z"/></svg>`

// Common email wrapper with Wüstenrot branding
function getEmailWrapper(title: string, subtitle: string, content: string, timestamp: string): string {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: ${WARMGRAU}; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: ${WARMGRAU}; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; overflow: hidden;">

          <!-- Header with Logo -->
          <tr>
            <td style="background-color: ${WUESTENNACHT}; padding: 20px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48" valign="middle">
                    ${WUESTENROT_LOGO_SVG}
                  </td>
                  <td style="padding-left: 16px;" valign="middle">
                    <span style="font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">wüstenrot</span>
                    <span style="font-size: 14px; font-weight: 400; color: #888888; margin-left: 4px;">immobilien</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Orange Title Bar -->
          <tr>
            <td style="background-color: ${WUESTENROT}; padding: 24px 32px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">${title}</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0 0; font-size: 15px; font-weight: 400;">${subtitle}</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: ${WUESTENNACHT}; padding: 24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="color: #ffffff; margin: 0 0 2px 0; font-size: 14px; font-weight: 600;">Sandro Mezzarano</p>
                    <p style="color: #888888; margin: 0; font-size: 12px;">Wüstenrot Immobilien · Hermeskeil</p>
                  </td>
                  <td align="right" valign="top">
                    <p style="color: #888888; margin: 0; font-size: 11px;">${timestamp}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

function getContactEmailHtml(data: ContactLeadData): string {
  const inquiryTypeLabels: Record<string, string> = {
    kaufberatung: 'Kaufberatung',
    verkaufsberatung: 'Verkaufsberatung',
    mietberatung: 'Mietberatung',
    bewertung: 'Immobilienbewertung',
    allgemein: 'Allgemeine Anfrage',
    immobilie: 'Immobilien-Anfrage',
    energieausweis: 'Energieausweis-Bestellung',
    finanzierung: 'Finanzierungsanfrage',
  }

  const inquiryLabel = data.inquiryType ? inquiryTypeLabels[data.inquiryType] || data.inquiryType : 'Allgemeine Anfrage'
  const timestamp = new Date().toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' })

  const content = `
    <!-- Contact Info -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td style="padding-bottom: 16px; border-bottom: 1px solid #eeeeee;">
          <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
          <p style="color: ${WUESTENNACHT}; margin: 0; font-size: 18px; font-weight: 600;">${data.name}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 16px 0; border-bottom: 1px solid #eeeeee;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%">
                <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">E-Mail</p>
                <a href="mailto:${data.email}" style="color: ${WUESTENROT}; font-size: 15px; text-decoration: none; font-weight: 500;">${data.email}</a>
              </td>
              ${data.phone ? `
              <td width="50%">
                <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Telefon</p>
                <a href="tel:${data.phone}" style="color: ${WUESTENROT}; font-size: 15px; text-decoration: none; font-weight: 500;">${data.phone}</a>
              </td>
              ` : ''}
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${data.propertyTitle ? `
    <!-- Property Info -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: ${WARMGRAU}; margin-bottom: 24px;">
      <tr>
        <td style="padding: 16px; border-left: 4px solid ${WUESTENROT};">
          <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Interessiert an</p>
          <p style="color: ${WUESTENNACHT}; margin: 0; font-size: 16px; font-weight: 600;">${data.propertyTitle}</p>
          ${data.propertyId ? `<p style="color: #888888; margin: 4px 0 0 0; font-size: 13px;">ID: ${data.propertyId}</p>` : ''}
        </td>
      </tr>
    </table>
    ` : ''}

    <!-- Message -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td>
          <p style="color: #888888; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Nachricht</p>
          <p style="color: ${WUESTENNACHT}; margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </td>
      </tr>
    </table>

    <!-- Actions -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a href="mailto:${data.email}" style="display: inline-block; background-color: ${WUESTENROT}; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 24px;">Antworten</a>
          ${data.phone ? `<a href="tel:${data.phone}" style="display: inline-block; background-color: ${WUESTENNACHT}; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 24px; margin-left: 8px;">Anrufen</a>` : ''}
        </td>
      </tr>
    </table>

    <!-- Source -->
    <p style="color: #aaaaaa; margin: 24px 0 0 0; font-size: 12px;">
      Quelle: ${data.source || 'Website Kontaktformular'}
    </p>
  `

  return getEmailWrapper('Neue Kontaktanfrage', inquiryLabel, content, timestamp)
}

function getSearchProfileEmailHtml(data: SearchProfileLeadData): string {
  const typLabels: Record<string, string> = {
    haus: 'Haus',
    wohnung: 'Wohnung',
    grundstueck: 'Grundstück',
    gewerbe: 'Gewerbe',
  }

  const formatCurrency = (value?: number) => {
    if (!value) return '-'
    return value >= 1000000
      ? `${(value / 1000000).toLocaleString('de-DE', { maximumFractionDigits: 1 })} Mio. €`
      : `${value.toLocaleString('de-DE')} €`
  }

  const formatArea = (value?: number) => {
    if (!value) return '-'
    return `${value.toLocaleString('de-DE')} m²`
  }

  const timestamp = new Date().toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' })
  const subtitle = `${data.art === 'kaufen' ? 'Kaufinteressent' : 'Mietinteressent'} · ${typLabels[data.typ] || data.typ}`

  const content = `
    <!-- Contact Info -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td style="padding-bottom: 16px; border-bottom: 1px solid #eeeeee;">
          <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
          <p style="color: ${WUESTENNACHT}; margin: 0; font-size: 18px; font-weight: 600;">${data.vorname} ${data.nachname}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 16px 0; border-bottom: 1px solid #eeeeee;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%">
                <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">E-Mail</p>
                <a href="mailto:${data.email}" style="color: ${WUESTENROT}; font-size: 15px; text-decoration: none; font-weight: 500;">${data.email}</a>
              </td>
              ${data.telefon ? `
              <td width="50%">
                <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Telefon</p>
                <a href="tel:${data.telefon}" style="color: ${WUESTENROT}; font-size: 15px; text-decoration: none; font-weight: 500;">${data.telefon}</a>
              </td>
              ` : ''}
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Search Summary -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: ${WARMGRAU}; margin-bottom: 24px;">
      <tr>
        <td style="padding: 16px; border-left: 4px solid ${WUESTENROT};">
          <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Sucht</p>
          <p style="color: ${WUESTENNACHT}; margin: 0; font-size: 18px; font-weight: 700;">${typLabels[data.typ] || data.typ} zum ${data.art === 'kaufen' ? 'Kauf' : 'Mieten'}</p>
        </td>
      </tr>
    </table>

    <!-- Search Criteria -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td width="50%" style="padding: 12px 12px 12px 0; border-bottom: 1px solid #eeeeee;">
          <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Budget (max.)</p>
          <p style="color: ${WUESTENNACHT}; margin: 0; font-size: 16px; font-weight: 600;">${formatCurrency(data.budgetMax)}</p>
        </td>
        <td width="50%" style="padding: 12px 0 12px 12px; border-bottom: 1px solid #eeeeee;">
          <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Zimmer</p>
          <p style="color: ${WUESTENNACHT}; margin: 0; font-size: 16px; font-weight: 600;">${data.zimmer === 'egal' ? 'Egal' : data.zimmer ? `ab ${data.zimmer}` : '-'}</p>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
          <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Region</p>
          <p style="color: ${WUESTENNACHT}; margin: 0; font-size: 15px;">${[...data.regionen, data.ortFreitext].filter(Boolean).join(', ') || '-'}</p>
        </td>
      </tr>
      ${(data.typ === 'haus' || data.typ === 'wohnung') ? `
      <tr>
        <td colspan="2" style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
          <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Wohnfläche</p>
          <p style="color: ${WUESTENNACHT}; margin: 0; font-size: 15px;">${formatArea(data.wohnflaecheMin)} – ${formatArea(data.wohnflaecheMax)}</p>
        </td>
      </tr>
      ` : ''}
      ${(data.typ === 'haus' || data.typ === 'grundstueck') ? `
      <tr>
        <td colspan="2" style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
          <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Grundstück</p>
          <p style="color: ${WUESTENNACHT}; margin: 0; font-size: 15px;">${formatArea(data.grundstueckMin)} – ${formatArea(data.grundstueckMax)}</p>
        </td>
      </tr>
      ` : ''}
      ${data.typ === 'gewerbe' ? `
      <tr>
        <td colspan="2" style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
          <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Nutzfläche</p>
          <p style="color: ${WUESTENNACHT}; margin: 0; font-size: 15px;">${formatArea(data.nutzflaecheMin)} – ${formatArea(data.nutzflaecheMax)}</p>
        </td>
      </tr>
      ` : ''}
      ${data.features && data.features.length > 0 ? `
      <tr>
        <td colspan="2" style="padding: 12px 0;">
          <p style="color: #888888; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Gewünschte Ausstattung</p>
          <p style="color: ${WUESTENNACHT}; margin: 0; font-size: 14px;">${data.features.join(', ')}</p>
        </td>
      </tr>
      ` : ''}
    </table>

    ${data.anmerkungen ? `
    <!-- Notes -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td>
          <p style="color: #888888; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Anmerkungen</p>
          <p style="color: ${WUESTENNACHT}; margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.anmerkungen}</p>
        </td>
      </tr>
    </table>
    ` : ''}

    <!-- Actions -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a href="mailto:${data.email}" style="display: inline-block; background-color: ${WUESTENROT}; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 24px;">Antworten</a>
          ${data.telefon ? `<a href="tel:${data.telefon}" style="display: inline-block; background-color: ${WUESTENNACHT}; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 24px; margin-left: 8px;">Anrufen</a>` : ''}
        </td>
      </tr>
    </table>
  `

  return getEmailWrapper('Neues Suchprofil', subtitle, content, timestamp)
}

function getNewsletterEmailHtml(data: NewsletterLeadData): string {
  const timestamp = new Date().toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' })

  const content = `
    <!-- Newsletter Info -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td style="padding-bottom: 16px; border-bottom: 1px solid #eeeeee;">
          <p style="color: #888888; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">E-Mail-Adresse</p>
          <a href="mailto:${data.email}" style="color: ${WUESTENROT}; font-size: 18px; text-decoration: none; font-weight: 600;">${data.email}</a>
        </td>
      </tr>
    </table>

    <!-- Action -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a href="mailto:${data.email}" style="display: inline-block; background-color: ${WUESTENROT}; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 24px;">E-Mail senden</a>
        </td>
      </tr>
    </table>
  `

  return getEmailWrapper('Newsletter-Anmeldung', 'Neuer Abonnent', content, timestamp)
}

// ─── Email Sending Functions ─────────────────────────────────────────────────

/**
 * Send notification email for contact form submission
 */
export async function sendContactNotification(data: ContactLeadData): Promise<{ success: boolean; error?: string }> {
  if (!isEmailConfigured()) {
    console.warn('Email notifications not configured - skipping contact notification')
    return { success: true }
  }

  const inquiryTypeLabels: Record<string, string> = {
    kaufberatung: 'Kaufberatung',
    verkaufsberatung: 'Verkaufsberatung',
    mietberatung: 'Mietberatung',
    bewertung: 'Immobilienbewertung',
    allgemein: 'Allgemeine Anfrage',
    immobilie: 'Immobilien-Anfrage',
    energieausweis: 'Energieausweis-Bestellung',
    finanzierung: 'Finanzierungsanfrage',
  }

  const inquiryLabel = data.inquiryType ? inquiryTypeLabels[data.inquiryType] || data.inquiryType : 'Kontaktanfrage'

  return sendViaResendApi({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: NOTIFICATION_RECIPIENTS,
    subject: `Neue ${inquiryLabel} von ${data.name}`,
    html: getContactEmailHtml(data),
    reply_to: data.email,
  })
}

/**
 * Send notification email for search profile submission
 */
export async function sendSearchProfileNotification(data: SearchProfileLeadData): Promise<{ success: boolean; error?: string }> {
  if (!isEmailConfigured()) {
    console.warn('Email notifications not configured - skipping search profile notification')
    return { success: true }
  }

  const typLabels: Record<string, string> = {
    haus: 'Haus',
    wohnung: 'Wohnung',
    grundstueck: 'Grundstueck',
    gewerbe: 'Gewerbe',
  }

  return sendViaResendApi({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: NOTIFICATION_RECIPIENTS,
    subject: `Neues Suchprofil: ${data.vorname} ${data.nachname} sucht ${typLabels[data.typ] || data.typ} zum ${data.art === 'kaufen' ? 'Kauf' : 'Mieten'}`,
    html: getSearchProfileEmailHtml(data),
    reply_to: data.email,
  })
}

/**
 * Send notification email for newsletter subscription
 */
export async function sendNewsletterNotification(data: NewsletterLeadData): Promise<{ success: boolean; error?: string }> {
  if (!isEmailConfigured()) {
    console.warn('Email notifications not configured - skipping newsletter notification')
    return { success: true }
  }

  return sendViaResendApi({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: NOTIFICATION_RECIPIENTS,
    subject: `Neue Newsletter-Anmeldung: ${data.email}`,
    html: getNewsletterEmailHtml(data),
    reply_to: data.email,
  })
}
