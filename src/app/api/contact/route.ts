import { NextRequest, NextResponse } from 'next/server'
import { createContact, isOnOfficeConfigured, type ContactFormData } from '@/lib/onoffice'
import { sendContactNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract structured fields (new form) with fallbacks for legacy `name` payload
    const vorname: string = body.vorname || ''
    const nachname: string = body.nachname || ''
    const composedName = `${vorname} ${nachname}`.trim()
    const name: string = body.name || composedName
    const email: string = body.email
    const message: string = body.message
    const strasse: string | undefined = body.strasse
    const plz: string | undefined = body.plz
    const ort: string | undefined = body.ort

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, E-Mail und Nachricht sind erforderlich.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      )
    }

    // Build message with property info if present
    const { propertyId, propertyTitle, source: customSource } = body
    let finalMessage = message
    if (propertyId && propertyTitle) {
      finalMessage = `[Immobilie: ${propertyTitle} (${propertyId})]\n\n${message}`
    }

    // Determine source
    const source = customSource || (propertyId ? `Immobilien-Anfrage: ${propertyId}` : 'Website Kontaktformular')

    const notificationPayload = {
      name,
      vorname,
      nachname,
      email,
      phone: body.phone,
      strasse,
      plz,
      ort,
      inquiryType: body.inquiryType,
      message: finalMessage,
      propertyId,
      propertyTitle,
      kategorie: body.kategorie as 'kauf' | 'miete' | undefined,
      source,
    }

    // Check if onOffice is configured
    if (!isOnOfficeConfigured()) {
      console.warn('onOffice API not configured - contact form submission logged only')
      console.log('Contact form submission:', {
        ...notificationPayload,
        timestamp: new Date().toISOString(),
      })

      const emailResult = await sendContactNotification(notificationPayload)
      if (!emailResult.success) {
        console.warn('Email notification failed:', emailResult.error)
      }

      return NextResponse.json({
        success: true,
        message: 'Ihre Anfrage wurde erfolgreich gesendet.',
        mode: 'development',
      })
    }

    // Send to onOffice CRM
    const result = await createContact({
      name,
      vorname,
      nachname,
      email,
      phone: body.phone,
      strasse,
      plz,
      ort,
      inquiryType: body.inquiryType,
      message: finalMessage,
      source,
    })

    if (result.success) {
      const emailResult = await sendContactNotification(notificationPayload)
      if (!emailResult.success) {
        console.warn('Email notification failed:', emailResult.error)
      }

      return NextResponse.json({
        success: true,
        message: 'Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
        addressId: result.addressId,
      })
    } else {
      console.error('onOffice contact creation failed:', result.error)
      return NextResponse.json(
        { success: false, error: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { success: false, error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    )
  }
}
