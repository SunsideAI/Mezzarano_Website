import { NextResponse } from 'next/server'
import { isEmailConfigured, sendContactNotification } from '@/lib/email'

export async function GET() {
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
  }

  // Try to send a test email if configured
  if (isConfigured) {
    try {
      const result = await sendContactNotification({
        name: 'Debug Test',
        email: 'test@example.com',
        message: 'Dies ist eine Test-E-Mail vom Debug-Endpoint.',
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
