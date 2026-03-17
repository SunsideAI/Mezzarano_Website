import { NextRequest, NextResponse } from 'next/server'
import { createOnOfficeClient, isOnOfficeConfigured } from '@/lib/onoffice'
import { sendNewsletterNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'E-Mail-Adresse ist erforderlich.' },
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

    // Check if onOffice is configured
    if (!isOnOfficeConfigured()) {
      console.warn('onOffice API not configured - newsletter subscription logged only')
      console.log('Newsletter subscription:', {
        email,
        timestamp: new Date().toISOString(),
      })

      // Send email notification (await to ensure it completes in serverless)
      const emailResult = await sendNewsletterNotification({ email })
      if (!emailResult.success) {
        console.warn('Email notification failed:', emailResult.error)
      }

      return NextResponse.json({
        success: true,
        message: 'Vielen Dank fuer Ihre Anmeldung!',
        mode: 'development',
      })
    }

    // Create contact in onOffice with newsletter flag
    const client = createOnOfficeClient()

    const response = await client.request([
      {
        actionid: client.ACTION_ID.CREATE,
        resourcetype: client.RESOURCE_TYPE.ADDRESS,
        parameters: {
          Email: email,
          Bemerkung: 'Newsletter-Anmeldung ueber Website',
          newsletter: true,
          Status: 1,
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
            Bemerkung: 'Newsletter-Anmeldung ueber Website',
            Adresse: addressId,
            Quelle: 'Website Newsletter',
          },
        },
      ])

      // Send email notification (await to ensure it completes in serverless)
      const emailResult = await sendNewsletterNotification({ email })
      if (!emailResult.success) {
        console.warn('Email notification failed:', emailResult.error)
      }

      return NextResponse.json({
        success: true,
        message: 'Vielen Dank fuer Ihre Anmeldung! Sie erhalten ab sofort unseren Newsletter.',
        addressId,
      })
    }

    console.error('onOffice newsletter subscription failed:', result.status.message)
    return NextResponse.json(
      { success: false, error: 'Beim Speichern ist ein Fehler aufgetreten. Bitte versuchen Sie es spaeter erneut.' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { success: false, error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    )
  }
}
