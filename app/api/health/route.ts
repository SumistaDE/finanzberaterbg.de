import { NextResponse } from 'next/server'
import { isTestMode } from '@/lib/mollie'

export const runtime = 'nodejs'

// Diagnostic endpoint: reports which environment variables the running
// deployment can see, without ever exposing their values. Handy to confirm
// that Vercel env vars are set for the right environment (Production/Preview).
export async function GET() {
  const baseUrl = (process.env.BASE_URL || '').replace(/\/$/, '')

  return NextResponse.json({
    env: {
      MOLLIE_API_KEY: Boolean(process.env.MOLLIE_API_KEY),
      MOLLIE_MODE: process.env.MOLLIE_API_KEY
        ? isTestMode()
          ? 'test'
          : 'live'
        : null,
      BASE_URL: baseUrl || null,
      RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY),
      MAIL_FROM: Boolean(process.env.MAIL_FROM),
      CURRENCY: process.env.CURRENCY || 'EUR',
    },
    runtime: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
  })
}
