import { NextResponse, type NextRequest } from 'next/server'
import { getPayment } from '@/lib/mollie'
import { getProduct } from '@/lib/products'
import { fulfilPaidOrder } from '@/lib/fulfill'

export const runtime = 'nodejs'

// Called by the thank-you page to confirm the real payment status and to deliver
// the manual in case the webhook has not arrived yet (webhooks can be slower than
// the customer redirect). Delivery is idempotent, so this and the webhook cannot
// send two emails for the same payment.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('payment') || ''
  if (!id) return NextResponse.json({ error: 'Missing payment id' }, { status: 400 })

  try {
    const payment = await getPayment(id)
    const metadata = (payment.metadata || {}) as {
      email?: string
      productId?: string
    }

    await fulfilPaidOrder(id)

    const product = metadata.productId ? getProduct(metadata.productId) : null

    return NextResponse.json({
      id: payment.id,
      status: payment.status,
      method: payment.method || null,
      amount: payment.amount || null,
      paidAt: payment.paidAt || null,
      email: metadata.email || null,
      productId: metadata.productId || null,
      hasDownload: Boolean(product?.manualFile),
      // The thank-you page uses this to send the customer back to the right
      // product if they want to retry a failed payment.
      productSlug: product?.slug || null,
    })
  } catch (err) {
    console.error('[order-status] failed:', err)
    return NextResponse.json({ error: 'Could not load payment' }, { status: 502 })
  }
}
