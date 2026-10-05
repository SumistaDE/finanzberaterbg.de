// Fulfils a paid order exactly once: sends the confirmation/manual email and
// records the delivery in the payment metadata, so the webhook and the
// thank-you page can both call this without the customer getting two emails.

import { getProduct } from './products'
import { sendManualEmail } from './email'
import { getPayment, updatePayment } from './mollie'

const PAID = new Set(['paid', 'authorized'])

export async function fulfilPaidOrder(paymentId: string): Promise<void> {
  const payment = await getPayment(paymentId)
  if (!PAID.has(payment.status)) return

  const metadata = (payment.metadata || {}) as {
    email?: string
    productId?: string
    fulfilledAt?: string
  }
  // Already delivered by the other entry point (webhook vs. thank-you page).
  if (metadata.fulfilledAt) return
  if (!metadata.email || !metadata.productId) return

  const product = getProduct(metadata.productId)
  if (!product) return

  const result = await sendManualEmail({
    to: metadata.email,
    paymentId: payment.id,
    product,
  })

  // Only stamp the order as fulfilled when the email was actually accepted, so a
  // transient Resend failure is retried by the next webhook/status call.
  if (result.sent) {
    await updatePayment(payment.id, {
      metadata: { ...metadata, fulfilledAt: new Date().toISOString() },
    })
  }
}
