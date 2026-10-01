// Server-only helpers around the Mollie REST API.
// Never import this from a client component: it reads MOLLIE_API_KEY.

const MOLLIE_API = 'https://api.mollie.com/v2'

export type MolliePayment = {
  id: string
  status: string
  method?: string | null
  paidAt?: string | null
  amount?: { value: string; currency: string }
  metadata?: Record<string, unknown> | null
  redirectUrl?: string | null
  _links?: { checkout?: { href: string } }
}

export class MollieError extends Error {
  status: number
  details: unknown
  constructor(message: string, status = 500, details?: unknown) {
    super(message)
    this.name = 'MollieError'
    this.status = status
    this.details = details
  }
}

export function isTestMode(): boolean {
  return (process.env.MOLLIE_API_KEY || '').startsWith('test_')
}

function apiKey(): string {
  const key = process.env.MOLLIE_API_KEY
  if (!key) {
    throw new MollieError('MOLLIE_API_KEY is not configured on the server.', 500)
  }
  return key
}

async function request<T>(
  method: string,
  path: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(MOLLIE_API + path, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })

  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
    const message =
      (data && (data.detail || data.title)) ||
      `Mollie request failed with status ${res.status}`
    throw new MollieError(message, res.status, data)
  }
  return data as T
}

export function createPayment(params: {
  amountValue: string
  currency: string
  description: string
  redirectUrl: string
  webhookUrl?: string
  metadata?: Record<string, unknown>
}): Promise<MolliePayment> {
  const body: Record<string, unknown> = {
    amount: { currency: params.currency, value: params.amountValue },
    description: params.description,
    redirectUrl: params.redirectUrl,
    metadata: params.metadata,
  }
  if (params.webhookUrl) body.webhookUrl = params.webhookUrl
  return request<MolliePayment>('POST', '/payments', body)
}

export function getPayment(id: string): Promise<MolliePayment> {
  return request<MolliePayment>('GET', `/payments/${id}`)
}

export function updatePayment(
  id: string,
  fields: { redirectUrl?: string; metadata?: Record<string, unknown> },
): Promise<MolliePayment> {
  return request<MolliePayment>('PATCH', `/payments/${id}`, fields)
}
