import { NextResponse } from 'next/server'
import { isOnOfficeConfigured, fetchEstates } from '@/lib/onoffice'

export async function GET() {
  const hasToken = !!process.env.ONOFFICE_TOKEN
  const hasSecret = !!process.env.ONOFFICE_SECRET
  const isConfigured = isOnOfficeConfigured()

  // Debug info
  const debug = {
    timestamp: new Date().toISOString(),
    config: {
      hasToken,
      hasSecret,
      tokenLength: process.env.ONOFFICE_TOKEN?.length || 0,
      secretLength: process.env.ONOFFICE_SECRET?.length || 0,
      isConfigured,
    },
    test: null as any,
    error: null as string | null,
  }

  // Try to fetch if configured
  if (isConfigured) {
    try {
      const result = await fetchEstates({}, { limit: 3 })
      debug.test = {
        success: true,
        total: result.total,
        count: result.properties.length,
        sample: result.properties.slice(0, 2).map(p => ({
          id: p.id,
          titel: p.titel,
          ort: p.ort,
          vermarktungsart: p.vermarktungsart,
        })),
      }
    } catch (error) {
      debug.error = error instanceof Error ? error.message : 'Unknown error'
      debug.test = { success: false }
    }
  } else {
    debug.error = 'onOffice not configured - missing ONOFFICE_TOKEN or ONOFFICE_SECRET'
  }

  return NextResponse.json(debug)
}
