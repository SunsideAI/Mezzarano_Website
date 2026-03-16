/**
 * Email Notification Service
 *
 * Uses Resend to send lead notification emails to the team.
 * Recipients (Test-Modus): contact@sunsideai.de
 */

import { Resend } from 'resend'

// Lazy initialization of Resend client
let resendClient: Resend | null = null

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

// Email recipients for lead notifications
// TODO: Für Produktion wieder hinzufügen: 'sandro.mezzarano@wuestenrot.de'
const NOTIFICATION_RECIPIENTS = [
  'contact@sunsideai.de',
]

// Sender email (must be verified in Resend)
const SENDER_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@mezzarano-immobilien.de'
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

function getContactEmailHtml(data: ContactLeadData): string {
  const inquiryTypeLabels: Record<string, string> = {
    kaufberatung: 'Kaufberatung',
    verkaufsberatung: 'Verkaufsberatung',
    mietberatung: 'Mietberatung',
    bewertung: 'Immobilienbewertung',
    allgemein: 'Allgemeine Anfrage',
    immobilie: 'Immobilien-Anfrage',
  }

  const inquiryLabel = data.inquiryType ? inquiryTypeLabels[data.inquiryType] || data.inquiryType : 'Allgemeine Anfrage'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Kontaktanfrage</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #E30613; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Neue Kontaktanfrage</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">${inquiryLabel}</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px;">Kontaktdaten</h2>

              <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background-color: #f8fafc; border-radius: 4px; padding: 12px;">
                    <strong style="color: #64748b;">Name:</strong><br>
                    <span style="color: #1e293b; font-size: 16px;">${data.name}</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="background-color: #f8fafc; border-radius: 4px; padding: 12px;">
                    <strong style="color: #64748b;">E-Mail:</strong><br>
                    <a href="mailto:${data.email}" style="color: #E30613; font-size: 16px; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="background-color: #f8fafc; border-radius: 4px; padding: 12px;">
                    <strong style="color: #64748b;">Telefon:</strong><br>
                    <a href="tel:${data.phone}" style="color: #E30613; font-size: 16px; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
                ` : ''}
              </table>

              ${data.propertyTitle ? `
              <h2 style="color: #1e293b; margin: 20px 0 10px 0; font-size: 18px;">Immobilie</h2>
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                <strong style="color: #92400e;">${data.propertyTitle}</strong>
                ${data.propertyId ? `<br><span style="color: #a16207; font-size: 14px;">ID: ${data.propertyId}</span>` : ''}
              </div>
              ` : ''}

              <h2 style="color: #1e293b; margin: 20px 0 10px 0; font-size: 18px;">Nachricht</h2>
              <div style="background-color: #f8fafc; border-radius: 4px; padding: 15px;">
                <p style="color: #1e293b; margin: 0; white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
              </div>

              <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">
                Quelle: ${data.source || 'Website Kontaktformular'}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 20px; text-align: center;">
              <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                Diese E-Mail wurde automatisch von der Mezzarano Immobilien Website gesendet.
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

function getSearchProfileEmailHtml(data: SearchProfileLeadData): string {
  const typLabels: Record<string, string> = {
    haus: 'Haus',
    wohnung: 'Wohnung',
    grundstueck: 'Grundstueck',
    gewerbe: 'Gewerbe',
  }

  const formatCurrency = (value?: number) => {
    if (!value) return '-'
    return value >= 1000000
      ? `${(value / 1000000).toLocaleString('de-DE', { maximumFractionDigits: 1 })} Mio. Euro`
      : `${value.toLocaleString('de-DE')} Euro`
  }

  const formatArea = (value?: number) => {
    if (!value) return '-'
    return `${value.toLocaleString('de-DE')} m2`
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neues Suchprofil</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #E30613; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Neues Suchprofil</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">
                ${data.art === 'kaufen' ? 'Kaufinteressent' : 'Mietinteressent'} - ${typLabels[data.typ] || data.typ}
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px;">Kontaktdaten</h2>

              <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background-color: #f8fafc; border-radius: 4px; padding: 12px;">
                    <strong style="color: #64748b;">Name:</strong><br>
                    <span style="color: #1e293b; font-size: 16px;">${data.vorname} ${data.nachname}</span>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="background-color: #f8fafc; border-radius: 4px; padding: 12px;">
                    <strong style="color: #64748b;">E-Mail:</strong><br>
                    <a href="mailto:${data.email}" style="color: #E30613; font-size: 16px; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                ${data.telefon ? `
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="background-color: #f8fafc; border-radius: 4px; padding: 12px;">
                    <strong style="color: #64748b;">Telefon:</strong><br>
                    <a href="tel:${data.telefon}" style="color: #E30613; font-size: 16px; text-decoration: none;">${data.telefon}</a>
                  </td>
                </tr>
                ` : ''}
              </table>

              <h2 style="color: #1e293b; margin: 20px 0 10px 0; font-size: 18px;">Suchkriterien</h2>
              <table width="100%" cellpadding="10" cellspacing="0" style="background-color: #f0fdf4; border-radius: 8px; margin-bottom: 20px;">
                <tr>
                  <td width="50%" style="border-bottom: 1px solid #dcfce7;">
                    <strong style="color: #166534;">Art:</strong><br>
                    <span style="color: #15803d;">${data.art === 'kaufen' ? 'Kaufen' : 'Mieten'}</span>
                  </td>
                  <td width="50%" style="border-bottom: 1px solid #dcfce7;">
                    <strong style="color: #166534;">Typ:</strong><br>
                    <span style="color: #15803d;">${typLabels[data.typ] || data.typ}</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="border-bottom: 1px solid #dcfce7;">
                    <strong style="color: #166534;">Region:</strong><br>
                    <span style="color: #15803d;">${[...data.regionen, data.ortFreitext].filter(Boolean).join(', ') || '-'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="border-bottom: 1px solid #dcfce7;">
                    <strong style="color: #166534;">Budget (max.):</strong><br>
                    <span style="color: #15803d;">${formatCurrency(data.budgetMax)}</span>
                  </td>
                  <td style="border-bottom: 1px solid #dcfce7;">
                    <strong style="color: #166534;">Zimmer:</strong><br>
                    <span style="color: #15803d;">${data.zimmer === 'egal' ? 'Egal' : data.zimmer ? `ab ${data.zimmer}` : '-'}</span>
                  </td>
                </tr>
                ${(data.typ === 'haus' || data.typ === 'wohnung') ? `
                <tr>
                  <td colspan="2" style="border-bottom: 1px solid #dcfce7;">
                    <strong style="color: #166534;">Wohnflaeche:</strong><br>
                    <span style="color: #15803d;">${formatArea(data.wohnflaecheMin)} - ${formatArea(data.wohnflaecheMax)}</span>
                  </td>
                </tr>
                ` : ''}
                ${(data.typ === 'haus' || data.typ === 'grundstueck') ? `
                <tr>
                  <td colspan="2" style="border-bottom: 1px solid #dcfce7;">
                    <strong style="color: #166534;">Grundstuecksflaeche:</strong><br>
                    <span style="color: #15803d;">${formatArea(data.grundstueckMin)} - ${formatArea(data.grundstueckMax)}</span>
                  </td>
                </tr>
                ` : ''}
                ${data.typ === 'gewerbe' ? `
                <tr>
                  <td colspan="2" style="border-bottom: 1px solid #dcfce7;">
                    <strong style="color: #166534;">Nutzflaeche:</strong><br>
                    <span style="color: #15803d;">${formatArea(data.nutzflaecheMin)} - ${formatArea(data.nutzflaecheMax)}</span>
                  </td>
                </tr>
                ` : ''}
                ${data.features && data.features.length > 0 ? `
                <tr>
                  <td colspan="2">
                    <strong style="color: #166534;">Ausstattung:</strong><br>
                    <span style="color: #15803d;">${data.features.join(', ')}</span>
                  </td>
                </tr>
                ` : ''}
              </table>

              ${data.anmerkungen ? `
              <h2 style="color: #1e293b; margin: 20px 0 10px 0; font-size: 18px;">Anmerkungen</h2>
              <div style="background-color: #f8fafc; border-radius: 4px; padding: 15px;">
                <p style="color: #1e293b; margin: 0; white-space: pre-wrap; line-height: 1.6;">${data.anmerkungen}</p>
              </div>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 20px; text-align: center;">
              <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                Diese E-Mail wurde automatisch von der Mezzarano Immobilien Website gesendet.
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

function getNewsletterEmailHtml(data: NewsletterLeadData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Newsletter-Anmeldung</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #E30613; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Neue Newsletter-Anmeldung</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <div style="background-color: #f8fafc; border-radius: 4px; padding: 20px; text-align: center;">
                <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">E-Mail-Adresse:</p>
                <a href="mailto:${data.email}" style="color: #E30613; font-size: 20px; text-decoration: none; font-weight: bold;">${data.email}</a>
              </div>

              <p style="color: #94a3b8; font-size: 12px; margin-top: 20px; text-align: center;">
                Der Kontakt wurde automatisch in onOffice angelegt.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 20px; text-align: center;">
              <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                Diese E-Mail wurde automatisch von der Mezzarano Immobilien Website gesendet.
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
  }

  const inquiryLabel = data.inquiryType ? inquiryTypeLabels[data.inquiryType] || data.inquiryType : 'Kontaktanfrage'

  try {
    const resend = getResendClient()
    if (!resend) {
      console.warn('Resend client not initialized - skipping email')
      return { success: true }
    }

    const { error } = await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: NOTIFICATION_RECIPIENTS,
      subject: `Neue ${inquiryLabel} von ${data.name}`,
      html: getContactEmailHtml(data),
      replyTo: data.email,
    })

    if (error) {
      console.error('Failed to send contact notification email:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending contact notification email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
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

  try {
    const resend = getResendClient()
    if (!resend) {
      console.warn('Resend client not initialized - skipping email')
      return { success: true }
    }

    const { error } = await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: NOTIFICATION_RECIPIENTS,
      subject: `Neues Suchprofil: ${data.vorname} ${data.nachname} sucht ${typLabels[data.typ] || data.typ} zum ${data.art === 'kaufen' ? 'Kauf' : 'Mieten'}`,
      html: getSearchProfileEmailHtml(data),
      replyTo: data.email,
    })

    if (error) {
      console.error('Failed to send search profile notification email:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending search profile notification email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/**
 * Send notification email for newsletter subscription
 */
export async function sendNewsletterNotification(data: NewsletterLeadData): Promise<{ success: boolean; error?: string }> {
  if (!isEmailConfigured()) {
    console.warn('Email notifications not configured - skipping newsletter notification')
    return { success: true }
  }

  try {
    const resend = getResendClient()
    if (!resend) {
      console.warn('Resend client not initialized - skipping email')
      return { success: true }
    }

    const { error } = await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: NOTIFICATION_RECIPIENTS,
      subject: `Neue Newsletter-Anmeldung: ${data.email}`,
      html: getNewsletterEmailHtml(data),
      replyTo: data.email,
    })

    if (error) {
      console.error('Failed to send newsletter notification email:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending newsletter notification email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
