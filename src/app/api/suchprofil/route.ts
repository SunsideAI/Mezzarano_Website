import { NextRequest, NextResponse } from 'next/server'
import { createSearchProfile, isOnOfficeConfigured, type SearchProfileData } from '@/lib/onoffice'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { vorname, nachname, email, art, typ, regionen, ortFreitext } = body as SearchProfileData

    if (!vorname || !nachname || !email) {
      return NextResponse.json(
        { success: false, error: 'Vorname, Nachname und E-Mail sind erforderlich.' },
        { status: 400 }
      )
    }

    if (!art || !typ) {
      return NextResponse.json(
        { success: false, error: 'Bitte waehlen Sie Kauf/Miete und den Immobilientyp aus.' },
        { status: 400 }
      )
    }

    if ((!regionen || regionen.length === 0) && !ortFreitext) {
      return NextResponse.json(
        { success: false, error: 'Bitte waehlen Sie mindestens eine Region aus.' },
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
      console.warn('onOffice API not configured - search profile submission logged only')
      // In development/test mode, just log the submission
      console.log('Search profile submission:', {
        ...body,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message: 'Ihr Suchprofil wurde erfolgreich angelegt.',
        mode: 'development',
      })
    }

    // Send to onOffice CRM
    const result = await createSearchProfile(body as SearchProfileData)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Ihr Suchprofil wurde erfolgreich angelegt. Wir melden uns, sobald eine passende Immobilie verfuegbar ist.',
        addressId: result.addressId,
        searchCriteriaId: result.searchCriteriaId,
      })
    } else {
      console.error('onOffice search profile creation failed:', result.error)
      return NextResponse.json(
        { success: false, error: 'Beim Speichern ist ein Fehler aufgetreten. Bitte versuchen Sie es spaeter erneut.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Search profile API error:', error)
    return NextResponse.json(
      { success: false, error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    )
  }
}
