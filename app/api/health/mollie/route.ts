import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// TEMPORARY diagnostic: reports whether the Mollie key is accepted, exposing
// only the numeric HTTP status and Mollie's error title. No secrets, no PII.
export async function GET() {
  const key = process.env.MOLLIE_API_KEY || ''
  const out: Record<string, unknown> = {
    keyPresent: Boolean(key),
    keyPrefix: key ? key.slice(0, 5) : null,
    keyLength: key.length,
    mode: process.env.MOLLIE_MODE || null,
  }
  try {
    const res = await fetch('https://api.mollie.com/v2/payments?limit=1', {
      headers: { Authorization: `Bearer ${key}` },
      cache: 'no-store',
    })
    out.mollieStatus = res.status
    const body = await res.text()
    try {
      const j = JSON.parse(body)
      out.mollieTitle = j.title || null
      out.mollieDetail = j.detail || null
    } catch {
      out.mollieBody = body.slice(0, 200)
    }
  } catch (err) {
    out.fetchError = (err as Error).message
  }
  return NextResponse.json(out)
}
