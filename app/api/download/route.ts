import { NextResponse, type NextRequest } from 'next/server'
import { getPayment } from '@/lib/mollie'
import { getProduct } from '@/lib/products'

export const runtime = 'nodejs'

// Serves the manual only for a payment that is actually paid.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('payment') || ''
  if (!id) return NextResponse.json({ error: 'Missing payment id' }, { status: 400 })

  try {
    const payment = await getPayment(id)
    if (payment.status !== 'paid' && payment.status !== 'authorized') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 403 })
    }

    const metadata = (payment.metadata || {}) as { productId?: string }
    const product = metadata.productId ? getProduct(metadata.productId) : null
    if (!product) {
      return NextResponse.json({ error: 'Unknown product' }, { status: 404 })
    }

    return NextResponse.redirect(new URL(product.manualPath, req.url), 302)
  } catch (err) {
    console.error('[download] failed:', err)
    return NextResponse.json({ error: 'Could not verify payment' }, { status: 502 })
  }
}
