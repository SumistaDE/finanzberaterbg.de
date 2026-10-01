import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { createOrder } from '@/lib/db'
import { getProduct } from '@/lib/products'

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || ''
    const body = contentType.includes('application/json') ? await request.json() as { productId?: string } : Object.fromEntries((await request.formData()).entries()) as { productId?: string }
    const product = body.productId ? getProduct(String(body.productId)) : undefined
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    const baseUrl = process.env.BASE_URL || new URL(request.url).origin
    const orderId = randomUUID()
    const paymentResponse = await fetch('https://api.mollie.com/v2/payments', { method: 'POST', headers: { Authorization: `Bearer ${process.env.MOLLIE_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: { currency: process.env.CURRENCY || 'EUR', value: product.price }, description: product.name, redirectUrl: `${baseUrl}/return?order=${orderId}`, webhookUrl: `${baseUrl}/api/webhook`, metadata: { orderId } }) })
    if (!paymentResponse.ok) throw new Error('Mollie payment creation failed')
    const payment = await paymentResponse.json()
    await createOrder({ id: orderId, productId: product.id, amount: product.price, currency: process.env.CURRENCY || 'EUR', paymentId: payment.id })
    return NextResponse.redirect(payment._links.checkout.href)
  } catch { return NextResponse.json({ error: 'Unable to start checkout. Please try again.' }, { status: 500 }) }
}
