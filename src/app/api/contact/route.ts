import { NextRequest, NextResponse } from 'next/server'
import { createContact, isOnOfficeConfigured, type ContactFormData } from '@/lib/onoffice'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, message } = body as ContactFormData

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
        { success: false, error: 'Bitte geben Sie eine gueltige E-Mail-Adresse ein.' },
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

    // Check if onOffice is configured
    if (!isOnOfficeConfigured()) {
      console.warn('onOffice API not configured - contact form submission logged only')
      // In development/test mode, just log the submission
      console.log('Contact form submission:', {
        name,
        email,
        phone: body.phone,
        inquiryType: body.inquiryType,
        propertyId,
        propertyTitle,
        message: finalMessage,
        source,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message: 'Ihre Anfrage wurde erfolgreich gesendet.',
        mode: 'development',
      })
    }

    // Send to onOffice CRM
    const result = await createContact({
      name,
      email,
      phone: body.phone,
      inquiryType: body.inquiryType,
      message: finalMessage,
      source,
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
        addressId: result.addressId,
      })
    } else {
      console.error('onOffice contact creation failed:', result.error)
      return NextResponse.json(
        { success: false, error: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es spaeter erneut.' },
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
