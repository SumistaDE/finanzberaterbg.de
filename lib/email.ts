// Sends the customer the PDF manual after a successful payment.
// Uses Resend (https://resend.com) over plain fetch, so no extra dependency.
//
// Required env vars to actually send mail:
//   RESEND_API_KEY   - your Resend API key
//   MAIL_FROM        - verified sender, e.g. "Tarifberater24 <info@tarifberater24.de>"
//   BASE_URL         - public base URL, used to attach the PDF by URL
//
// If they are missing we log and skip, so payments still work without mail configured.

import type { Product } from './products'

export async function sendManualEmail(params: {
  to: string
  paymentId: string
  product: Product
}): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  const { to, paymentId, product } = params
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.MAIL_FROM
  const baseUrl = (process.env.BASE_URL || '').replace(/\/$/, '')

  if (!apiKey || !from) {
    console.warn(
      '[email] RESEND_API_KEY or MAIL_FROM not set - skipping manual email for',
      to,
    )
    return { sent: false, skipped: true }
  }

  const pdfUrl = product.manualPath ? `${baseUrl}${product.manualPath}` : null
  const subject = pdfUrl
    ? `Ihr Handbuch: ${product.name}`
    : `Ihre Bestellung: ${product.name}`
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#17251f;line-height:1.6">
      <h2 style="margin:0 0 12px">Vielen Dank fuer Ihren Kauf!</h2>
      <p>Ihre Zahlung fuer <strong>${product.name}</strong> ist bei uns eingegangen
      (Referenz: ${paymentId}).</p>
      ${
        pdfUrl
          ? `<p>Im Anhang finden Sie Ihr vollstaendiges Handbuch als PDF. Es begleitet Sie
      Schritt fuer Schritt durch die Tarifanalyse, die Optimierung Ihrer Vertraege und
      die Inbetriebnahme Ihres Smart-Meter-Geraets.</p>
      <p>Sie koennen das Handbuch jederzeit hier erneut herunterladen:<br/>
      <a href="${pdfUrl}">${pdfUrl}</a></p>`
          : `<p>Wir haben Ihre Bestellung erhalten und melden uns in Kuerze mit den
      naechsten Schritten. Sie muessen nichts weiter tun.</p>`
      }
      <p>Bei Fragen erreichen Sie uns von Montag bis Freitag, 9:00-18:00 Uhr,
      unter info@tarifberater24.de.</p>
      <p>Ihr Tarifberater24 Team</p>
    </div>`

  const body: Record<string, unknown> = { from, to, subject, html }
  if (pdfUrl) {
    body.attachments = [
      { filename: 'Tarifberater24-Handbuch.pdf', path: pdfUrl },
    ]
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error('[email] Resend error:', res.status, detail)
      return { sent: false, error: `Resend ${res.status}` }
    }
    console.log('[email] manual sent to', to, 'for payment', paymentId)
    return { sent: true }
  } catch (err) {
    console.error('[email] send failed:', err)
    return { sent: false, error: (err as Error).message }
  }
}
