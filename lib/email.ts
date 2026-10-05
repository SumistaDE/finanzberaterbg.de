// Sends the customer their document after a successful payment.
// Uses Resend (https://resend.com) over plain fetch, so no extra dependency.
//
// Required env vars to actually send mail:
//   RESEND_API_KEY - your Resend API key
//   MAIL_FROM      - verified sender, e.g. "Finanzberater BG <info@finanzberaterbg.de>"
//   BASE_URL       - public base URL, used for the re-download link in the email
//
// If they are missing we log and skip, so payments still work without mail configured.
// The PDF is attached straight from the private folder, so it is never public.

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Product } from './products'

export async function sendManualEmail(params: {
  to: string
  paymentId: string
  product: Product
}): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  const { to, paymentId, product } = params
  const apiKey = process.env.RESEND_API_KEY
  // Fall back to the site's own contact address so mail never appears to come
  // from the unrelated tarifberater24.de domain.
  const from = process.env.MAIL_FROM || 'Finanzberater BG <info@finanzberaterbg.de>'
  const baseUrl = (process.env.BASE_URL || '').replace(/\/$/, '')

  if (!apiKey || !from) {
    console.warn(
      '[email] RESEND_API_KEY or MAIL_FROM not set - skipping email for',
      to,
    )
    return { sent: false, skipped: true }
  }

  const hasDoc = Boolean(product.manualFile)
  const downloadUrl = hasDoc
    ? `${baseUrl}/api/download?payment=${encodeURIComponent(paymentId)}`
    : null
  const subject = hasDoc
    ? `Ihr Dokument: ${product.name}`
    : `Ihre Bestellung: ${product.name}`

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#17251f;line-height:1.6">
      <h2 style="margin:0 0 12px">Vielen Dank fuer Ihren Kauf!</h2>
      <p>Ihre Zahlung fuer <strong>${product.name}</strong> ist bei uns eingegangen
      (Referenz: ${paymentId}).</p>
      ${
        downloadUrl
          ? `<p>Im Anhang finden Sie Ihr Dokument als PDF. Sie koennen es jederzeit
      hier erneut herunterladen:<br/><a href="${downloadUrl}">${downloadUrl}</a></p>`
          : `<p>Wir haben Ihre Bestellung erhalten und melden uns in Kuerze mit den
      naechsten Schritten. Sie muessen nichts weiter tun.</p>`
      }
      <p>Bei Fragen erreichen Sie uns von Montag bis Freitag, 9:00-18:00 Uhr,
      unter info@finanzberaterbg.de.</p>
      <p>Ihr Finanzberater BG Team</p>
    </div>`

  const body: Record<string, unknown> = { from, to, subject, html }

  if (product.manualFile) {
    try {
      const filePath = path.join(
        process.cwd(),
        'private',
        'downloads',
        product.manualFile,
      )
      const buf = await readFile(filePath)
      body.attachments = [
        { filename: product.manualFile, content: buf.toString('base64') },
      ]
    } catch (err) {
      console.error('[email] could not read attachment:', err)
      // Send the mail without the attachment rather than failing the purchase.
    }
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
    console.log('[email] sent to', to, 'for payment', paymentId)
    return { sent: true }
  } catch (err) {
    console.error('[email] send failed:', err)
    return { sent: false, error: (err as Error).message }
  }
}
