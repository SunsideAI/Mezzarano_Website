import { NextResponse } from 'next/server'
import { isEmailConfigured, sendContactNotification } from '@/lib/email'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sendTest = searchParams.get('send') === 'true'

  const hasApiKey = !!process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@sunsideai.de'
  const isConfigured = isEmailConfigured()

  // Debug info
  const debug = {
    timestamp: new Date().toISOString(),
    config: {
      hasApiKey,
      apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 10) + '...',
      fromEmail,
      isConfigured,
    },
    test: null as { success: boolean; error?: string } | null,
    hint: 'Add ?send=true to actually send a test email',
  }

  // Only send test email if explicitly requested
  if (isConfigured && sendTest) {
    try {
      const result = await sendContactNotification({
        name: 'Debug Test',
        email: 'test@example.com',
        message: 'Dies ist eine Test-E-Mail vom Debug-Endpoint.\n\nGesendet am: ' + new Date().toISOString(),
        source: 'Debug Endpoint',
      })
      debug.test = result
    } catch (error) {
      debug.test = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  return NextResponse.json(debug)
}
