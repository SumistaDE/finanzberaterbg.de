import { NextResponse, type NextRequest } from 'next/server'
import { getPayment } from '@/lib/mollie'
import { getProduct } from '@/lib/products'
import { sendManualEmail } from '@/lib/email'

export const runtime = 'nodejs'

// Mollie calls this URL with application/x-www-form-urlencoded body: id=tr_...
// We re-fetch the payment to get the authoritative status, then email the manual
// once the payment is paid. Answering 200 quickly stops Mollie from retrying.
export async function POST(req: NextRequest) {
  let paymentId = ''
  try {
    const form = await req.formData()
    paymentId = String(form.get('id') || '')
  } catch {
    return new NextResponse('Bad request', { status: 400 })
  }

  if (!paymentId) return new NextResponse('Missing id', { status: 400 })

  try {
    const payment = await getPayment(paymentId)

    if (payment.status === 'paid' || payment.status === 'authorized') {
      const metadata = (payment.metadata || {}) as {
        email?: string
        productId?: string
      }
      const product = metadata.productId ? getProduct(metadata.productId) : null
      if (metadata.email && product) {
        await sendManualEmail({
          to: metadata.email,
          paymentId: payment.id,
          product,
        })
      }
    }

    console.log('[webhook]', paymentId, '->', payment.status)
    return new NextResponse('OK', { status: 200 })
  } catch (err) {
    console.error('[webhook] failed:', err)
    // Non-200 tells Mollie to retry later.
    return new NextResponse('Error', { status: 500 })
  }
}
