import { NextResponse, type NextRequest } from 'next/server'
import { getPayment } from '@/lib/mollie'
import { getProduct } from '@/lib/products'
import { sendManualEmail } from '@/lib/email'

export const runtime = 'nodejs'

// Called by the thank-you page to confirm the real payment status and to trigger
// the manual email in case the webhook has not arrived yet (webhooks can be slower
// than the customer redirect). Sending twice is harmless for a manual.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('payment') || ''
  if (!id) return NextResponse.json({ error: 'Missing payment id' }, { status: 400 })

  try {
    const payment = await getPayment(id)
    const metadata = (payment.metadata || {}) as {
      email?: string
      productId?: string
    }

    if (
      (payment.status === 'paid' || payment.status === 'authorized') &&
      metadata.email
    ) {
      const product = metadata.productId ? getProduct(metadata.productId) : null
      if (product) {
        await sendManualEmail({
          to: metadata.email,
          paymentId: payment.id,
          product,
        })
      }
    }

    return NextResponse.json({
      id: payment.id,
      status: payment.status,
      method: payment.method || null,
      amount: payment.amount || null,
      paidAt: payment.paidAt || null,
      email: metadata.email || null,
      productId: metadata.productId || null,
    })
  } catch (err) {
    console.error('[order-status] failed:', err)
    return NextResponse.json({ error: 'Could not load payment' }, { status: 502 })
  }
}
