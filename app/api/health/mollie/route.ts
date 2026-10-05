import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// TEMPORARY diagnostic: reports whether the Mollie key is accepted, exposing
// only the numeric HTTP status and Mollie's error title. No secrets, no PII.
async function probe(method: string, path: string, body?: unknown) {
  const key = process.env.MOLLIE_API_KEY || ''
  const res = await fetch('https://api.mollie.com/v2' + path, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })
  const text = await res.text()
  let parsed: Record<string, unknown> | null = null
  try {
    parsed = JSON.parse(text)
  } catch {
    /* non-JSON */
  }
  return {
    status: res.status,
    title: parsed?.title ?? null,
    detail: parsed?.detail ?? null,
    field: parsed?.field ?? null,
    id: parsed?.id ?? null,
    body: parsed ? null : text.slice(0, 200),
  }
}

export async function GET() {
  const key = process.env.MOLLIE_API_KEY || ''
  const out: Record<string, unknown> = {
    keyPresent: Boolean(key),
    keyPrefix: key ? key.slice(0, 5) : null,
    mode: process.env.MOLLIE_MODE || null,
  }
  out.list = await probe('GET', '/payments?limit=1')
  const origin = (process.env.BASE_URL || 'https://www.finanzberaterbg.de').replace(/\/$/, '')
  // Mirror the exact shape the checkout route sends.
  const created = await probe('POST', '/payments', {
    amount: { currency: 'EUR', value: '198.00' },
    description: 'Tarifanalyse mit Optimierung, Planung und Smart-Meter-Vermittlung',
    redirectUrl: `${origin}/danke?payment=pending`,
    webhookUrl: `${origin}/api/webhook`,
    metadata: {
      productId: 'tarifanalyse-smart-meter',
      email: 'diag@example.com',
      consentTerms: true,
      consentRevocation: true,
      consentAt: new Date().toISOString(),
    },
  })
  out.create = created
  if (created.status === 201 && created.id) {
    out.patch = await probe('PATCH', `/payments/${created.id}`, {
      redirectUrl: `${origin}/danke?payment=${created.id}`,
    })
    // Clean up the diagnostic payment so it never shows up as an open payment.
    out.cleanup = await probe('DELETE', `/payments/${created.id}`)
  }
  return NextResponse.json(out)
}
