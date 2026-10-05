import { NextResponse, type NextRequest } from 'next/server'
import { CURRENCY, getProduct } from '@/lib/products'
import { createPayment, updatePayment } from '@/lib/mollie'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const slug = String(form.get('slug') || '')
  const email = String(form.get('email') || '').trim().toLowerCase()
  const acceptedTerms = form.get('terms') === 'on'
  const acceptedRevocation = form.get('revocation') === 'on'

  const product = getProduct(slug)
  if (!product) {
    return NextResponse.json({ error: 'Unknown product' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.redirect(
      new URL(`/produkt/${slug}?error=email`, req.url),
      303,
    )
  }
  // § 356(5) BGB: the right of withdrawal for digital content only lapses if the
  // customer expressly consented to immediate performance. Without this proof we
  // must not start the payment.
  if (!acceptedTerms || !acceptedRevocation) {
    return NextResponse.redirect(
      new URL(`/produkt/${slug}?error=consent`, req.url),
      303,
    )
  }

  const origin = (process.env.BASE_URL || new URL(req.url).origin).replace(/\/$/, '')

  // Mollie only accepts a webhook URL it can reach. Localhost is not reachable,
  // so during local development we omit it and rely on the thank-you page's
  // status refresh to confirm the payment and send the manual.
  const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/.test(origin)
  const webhookUrl = isLocal ? undefined : `${origin}/api/webhook`

  try {
    // 1. Create the payment. The amount comes from the server-side catalog only.
    const payment = await createPayment({
      amountValue: product.price,
      currency: CURRENCY,
      description: product.name.slice(0, 255),
      redirectUrl: `${origin}/danke?payment=pending`,
      webhookUrl,
      metadata: {
        productId: product.id,
        email,
        // Recorded as proof that the customer accepted the terms and the loss of
        // the right of withdrawal for this digital product.
        consentTerms: true,
        consentRevocation: true,
        consentAt: new Date().toISOString(),
      },
    })

    // 2. Point the redirect at the real payment id, so the thank-you page can
    //    look the payment up (Mollie does not substitute {id} in the redirect URL).
    await updatePayment(payment.id, {
      redirectUrl: `${origin}/danke?payment=${payment.id}`,
    })

    // 3. Send the customer to the hosted Mollie checkout.
    const checkoutUrl = payment._links?.checkout?.href
    if (!checkoutUrl) {
      return NextResponse.json(
        { error: 'Mollie did not return a checkout URL' },
        { status: 502 },
      )
    }
    return NextResponse.redirect(checkoutUrl, 303)
  } catch (err) {
    console.error('[checkout] failed:', err)
    return NextResponse.redirect(
      new URL(`/produkt/${slug}?error=payment`, req.url),
      303,
    )
  }
}
