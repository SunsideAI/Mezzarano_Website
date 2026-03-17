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

// Common email wrapper with header and footer
function getEmailWrapper(title: string, subtitle: string, content: string, timestamp: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <!--[if mso]>
  <style type="text/css">
    table { border-collapse: collapse; }
    .button { padding: 12px 24px !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

          <!-- Logo Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">MEZZARANO</span>
                    <span style="font-size: 22px; font-weight: 300; color: #94a3b8; letter-spacing: -0.5px;"> IMMOBILIEN</span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: #E30613; color: #ffffff; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Wuestenrot Partner</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title Section -->
          <tr>
            <td style="background-color: #E30613; padding: 32px 40px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">${title}</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px; font-weight: 400;">${subtitle}</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="color: #64748b; margin: 0 0 4px 0; font-size: 13px; font-weight: 600;">Sandro Mezzarano</p>
                    <p style="color: #94a3b8; margin: 0; font-size: 12px;">Wuestenrot Immobilien Partner</p>
                  </td>
                  <td align="right">
                    <a href="tel:01776542977" style="display: inline-block; color: #64748b; font-size: 12px; text-decoration: none; margin-right: 16px;">0177 6542977</a>
                    <a href="mailto:sandro.mezzarano@wuestenrot.de" style="display: inline-block; color: #64748b; font-size: 12px; text-decoration: none;">E-Mail</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Copyright -->
          <tr>
            <td style="background-color: #1e293b; padding: 16px 40px; text-align: center;">
              <p style="color: #64748b; margin: 0; font-size: 11px;">
                ${timestamp} · mezzarano-immobilien.de
              </p>
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
    <!-- Contact Card -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
      <tr>
        <td style="padding: 24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="48" valign="top">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #E30613 0%, #b91c1c 100%); border-radius: 12px; text-align: center; line-height: 48px;">
                  <span style="color: #ffffff; font-size: 20px;">&#128100;</span>
                </div>
              </td>
              <td style="padding-left: 16px;" valign="top">
                <h3 style="color: #1e293b; margin: 0 0 4px 0; font-size: 18px; font-weight: 600;">${data.name}</h3>
                <p style="color: #64748b; margin: 0; font-size: 14px;">Neuer Lead</p>
              </td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding-right: 12px;">
                  <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">E-Mail</p>
                  <a href="mailto:${data.email}" style="color: #E30613; font-size: 14px; text-decoration: none; font-weight: 500;">${data.email}</a>
                </td>
                ${data.phone ? `
                <td width="50%" style="padding-left: 12px;">
                  <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Telefon</p>
                  <a href="tel:${data.phone}" style="color: #E30613; font-size: 14px; text-decoration: none; font-weight: 500;">${data.phone}</a>
                </td>
                ` : ''}
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </table>

    <!-- Quick Actions -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td align="center">
          <a href="mailto:${data.email}" style="display: inline-block; background-color: #E30613; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin-right: 8px;">Antworten</a>
          ${data.phone ? `<a href="tel:${data.phone}" style="display: inline-block; background-color: #1e293b; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px;">Anrufen</a>` : ''}
        </td>
      </tr>
    </table>

    ${data.propertyTitle ? `
    <!-- Property Info -->
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="40" valign="top">
            <span style="font-size: 24px;">&#127968;</span>
          </td>
          <td style="padding-left: 12px;">
            <p style="color: #92400e; margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Interessiert an</p>
            <p style="color: #78350f; margin: 0; font-size: 16px; font-weight: 600;">${data.propertyTitle}</p>
            ${data.propertyId ? `<p style="color: #a16207; margin: 4px 0 0 0; font-size: 13px;">ID: ${data.propertyId}</p>` : ''}
          </td>
        </tr>
      </table>
    </div>
    ` : ''}

    <!-- Message -->
    <div style="margin-bottom: 16px;">
      <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Nachricht</p>
      <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
        <p style="color: #334155; margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>

    <!-- Source Tag -->
    <p style="color: #94a3b8; margin: 0; font-size: 12px;">
      <span style="display: inline-block; background-color: #f1f5f9; padding: 4px 10px; border-radius: 4px; font-size: 11px;">${data.source || 'Website Kontaktformular'}</span>
    </p>
  `

  return getEmailWrapper('Neue Kontaktanfrage', inquiryLabel, content, timestamp)
}

function getSearchProfileEmailHtml(data: SearchProfileLeadData): string {
  const typLabels: Record<string, string> = {
    haus: 'Haus',
    wohnung: 'Wohnung',
    grundstueck: 'Grundstueck',
    gewerbe: 'Gewerbe',
  }

  const typIcons: Record<string, string> = {
    haus: '&#127968;',
    wohnung: '&#127970;',
    grundstueck: '&#127966;',
    gewerbe: '&#127970;',
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
  const subtitle = `${data.art === 'kaufen' ? 'Kaufinteressent' : 'Mietinteressent'} sucht ${typLabels[data.typ] || data.typ}`

  const content = `
    <!-- Contact Card -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
      <tr>
        <td style="padding: 24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="48" valign="top">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #E30613 0%, #b91c1c 100%); border-radius: 12px; text-align: center; line-height: 48px;">
                  <span style="color: #ffffff; font-size: 20px;">&#128100;</span>
                </div>
              </td>
              <td style="padding-left: 16px;" valign="top">
                <h3 style="color: #1e293b; margin: 0 0 4px 0; font-size: 18px; font-weight: 600;">${data.vorname} ${data.nachname}</h3>
                <p style="color: #64748b; margin: 0; font-size: 14px;">${data.art === 'kaufen' ? 'Kaufinteressent' : 'Mietinteressent'}</p>
              </td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding-right: 12px;">
                  <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">E-Mail</p>
                  <a href="mailto:${data.email}" style="color: #E30613; font-size: 14px; text-decoration: none; font-weight: 500;">${data.email}</a>
                </td>
                ${data.telefon ? `
                <td width="50%" style="padding-left: 12px;">
                  <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Telefon</p>
                  <a href="tel:${data.telefon}" style="color: #E30613; font-size: 14px; text-decoration: none; font-weight: 500;">${data.telefon}</a>
                </td>
                ` : ''}
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </table>

    <!-- Quick Actions -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td align="center">
          <a href="mailto:${data.email}" style="display: inline-block; background-color: #E30613; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin-right: 8px;">Antworten</a>
          ${data.telefon ? `<a href="tel:${data.telefon}" style="display: inline-block; background-color: #1e293b; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px;">Anrufen</a>` : ''}
        </td>
      </tr>
    </table>

    <!-- Search Criteria Header -->
    <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="48" valign="top">
            <span style="font-size: 32px;">${typIcons[data.typ] || '&#127968;'}</span>
          </td>
          <td style="padding-left: 12px;">
            <p style="color: #065f46; margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Sucht</p>
            <p style="color: #047857; margin: 0; font-size: 20px; font-weight: 700;">${typLabels[data.typ] || data.typ} zum ${data.art === 'kaufen' ? 'Kauf' : 'Mieten'}</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Search Criteria Details -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td width="50%" style="padding: 12px; background-color: #f8fafc; border-radius: 8px 0 0 0;">
          <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Budget (max.)</p>
          <p style="color: #1e293b; margin: 0; font-size: 16px; font-weight: 600;">${formatCurrency(data.budgetMax)}</p>
        </td>
        <td width="50%" style="padding: 12px; background-color: #f1f5f9; border-radius: 0 8px 0 0;">
          <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Zimmer</p>
          <p style="color: #1e293b; margin: 0; font-size: 16px; font-weight: 600;">${data.zimmer === 'egal' ? 'Egal' : data.zimmer ? `ab ${data.zimmer}` : '-'}</p>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 12px; background-color: #f1f5f9;">
          <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Region</p>
          <p style="color: #1e293b; margin: 0; font-size: 15px; font-weight: 500;">${[...data.regionen, data.ortFreitext].filter(Boolean).join(', ') || '-'}</p>
        </td>
      </tr>
      ${(data.typ === 'haus' || data.typ === 'wohnung') ? `
      <tr>
        <td colspan="2" style="padding: 12px; background-color: #f8fafc;">
          <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Wohnflaeche</p>
          <p style="color: #1e293b; margin: 0; font-size: 15px; font-weight: 500;">${formatArea(data.wohnflaecheMin)} - ${formatArea(data.wohnflaecheMax)}</p>
        </td>
      </tr>
      ` : ''}
      ${(data.typ === 'haus' || data.typ === 'grundstueck') ? `
      <tr>
        <td colspan="2" style="padding: 12px; background-color: #f1f5f9;">
          <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Grundstueck</p>
          <p style="color: #1e293b; margin: 0; font-size: 15px; font-weight: 500;">${formatArea(data.grundstueckMin)} - ${formatArea(data.grundstueckMax)}</p>
        </td>
      </tr>
      ` : ''}
      ${data.typ === 'gewerbe' ? `
      <tr>
        <td colspan="2" style="padding: 12px; background-color: #f1f5f9;">
          <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Nutzflaeche</p>
          <p style="color: #1e293b; margin: 0; font-size: 15px; font-weight: 500;">${formatArea(data.nutzflaecheMin)} - ${formatArea(data.nutzflaecheMax)}</p>
        </td>
      </tr>
      ` : ''}
      ${data.features && data.features.length > 0 ? `
      <tr>
        <td colspan="2" style="padding: 12px; background-color: #f8fafc; border-radius: 0 0 8px 8px;">
          <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Gewuenschte Ausstattung</p>
          <p style="color: #1e293b; margin: 0; font-size: 14px;">
            ${data.features.map(f => `<span style="display: inline-block; background-color: #e2e8f0; padding: 4px 10px; border-radius: 4px; margin: 2px 4px 2px 0; font-size: 12px;">${f}</span>`).join('')}
          </p>
        </td>
      </tr>
      ` : ''}
    </table>

    ${data.anmerkungen ? `
    <!-- Notes -->
    <div style="margin-bottom: 16px;">
      <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Anmerkungen</p>
      <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
        <p style="color: #334155; margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${data.anmerkungen}</p>
      </div>
    </div>
    ` : ''}
  `

  return getEmailWrapper('Neues Suchprofil', subtitle, content, timestamp)
}

function getNewsletterEmailHtml(data: NewsletterLeadData): string {
  const timestamp = new Date().toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' })

  const content = `
    <!-- Newsletter Subscription Card -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 32px; text-align: center;">
          <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #E30613 0%, #b91c1c 100%); border-radius: 16px; margin: 0 auto 20px; text-align: center; line-height: 64px;">
            <span style="color: #ffffff; font-size: 28px;">&#128233;</span>
          </div>

          <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Neue Anmeldung</p>
          <a href="mailto:${data.email}" style="color: #1e293b; font-size: 20px; text-decoration: none; font-weight: 700;">${data.email}</a>

          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
            <a href="mailto:${data.email}" style="display: inline-block; background-color: #E30613; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 32px; border-radius: 8px;">E-Mail senden</a>
          </div>
        </td>
      </tr>
    </table>

    <!-- Info -->
    <p style="color: #94a3b8; margin: 20px 0 0 0; font-size: 13px; text-align: center;">
      Der Kontakt wurde automatisch in onOffice angelegt.
    </p>
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
