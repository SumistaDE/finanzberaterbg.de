'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type OrderStatus = {
  id: string
  status: string
  method: string | null
  amount: { value: string; currency: string } | null
  paidAt: string | null
  email: string | null
}

const copy = {
  de: {
    loadingTitle: 'Wir pruefen Ihre Zahlung ...',
    loadingText: 'Einen Moment bitte, wir bestaetigen den Status bei Mollie.',
    paidTitle: 'Vielen Dank fuer Ihre Zahlung!',
    paidText:
      'Ihre Zahlung ist bestaetigt. Das Handbuch als PDF haben wir Ihnen soeben per E-Mail geschickt.',
    pendingTitle: 'Die Zahlung wird noch verarbeitet',
    pendingText:
      'Sobald Mollie die Zahlung bestaetigt, senden wir Ihnen das Handbuch automatisch per E-Mail zu. Sie koennen diese Seite spaeter erneut aufrufen.',
    failedTitle: 'Die Zahlung wurde nicht abgeschlossen',
    failedText: 'Sie koennen es erneut versuchen.',
    ref: 'Referenz',
    method: 'Zahlungsart',
    amount: 'Betrag',
    download: 'Handbuch als PDF herunterladen',
    downloadHint: 'Der Download ist nur nach bestaetigter Zahlung verfuegbar.',
    back: 'Zurueck zur Startseite',
    retry: 'Erneut versuchen',
  },
}

function statusLabel(status: string, t: typeof copy.de) {
  if (status === 'paid' || status === 'authorized') return t.paidTitle
  if (status === 'failed' || status === 'canceled' || status === 'expired')
    return t.failedTitle
  return t.pendingTitle
}

function ThankYou() {
  const params = useSearchParams()
  const paymentId = params.get('payment') || ''
  const t = copy.de
  const [order, setOrder] = useState<OrderStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!paymentId || paymentId === 'pending') {
      setLoading(false)
      return
    }
    let active = true
    fetch(`/api/order-status?payment=${encodeURIComponent(paymentId)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad status'))))
      .then((data) => {
        if (active) setOrder(data)
      })
      .catch(() => {
        if (active) setError(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [paymentId])

  const status = order?.status || (paymentId ? 'open' : 'unknown')
  const isPaid = status === 'paid' || status === 'authorized'
  const title = loading ? t.loadingTitle : statusLabel(status, t)
  const text = loading
    ? t.loadingText
    : isPaid
      ? t.paidText
      : status === 'failed' || status === 'canceled' || status === 'expired'
        ? t.failedText
        : t.pendingText

  return (
    <section className="thankyou">
      <div className="container thankyou-inner">
        <div className={`thankyou-card ${isPaid ? 'is-paid' : ''}`}>
          <div className="thankyou-icon">{isPaid ? '✓' : loading ? '⏳' : '•'}</div>
          <h1>{title}</h1>
          <p className="thankyou-text">{text}</p>

          {error && <p className="buy-error">{t.failedText}</p>}

          {order && (
            <dl className="thankyou-meta">
              <div>
                <dt>{t.ref}</dt>
                <dd>{order.id}</dd>
              </div>
              {order.method && (
                <div>
                  <dt>{t.method}</dt>
                  <dd>{order.method}</dd>
                </div>
              )}
              {order.amount && (
                <div>
                  <dt>{t.amount}</dt>
                  <dd>
                    {new Intl.NumberFormat('de-DE', {
                      style: 'currency',
                      currency: order.amount.currency,
                    }).format(Number(order.amount.value))}
                  </dd>
                </div>
              )}
            </dl>
          )}

          {isPaid ? (
            <div className="thankyou-actions">
              <a
                className="button button-dark"
                href={`/api/download?payment=${encodeURIComponent(order?.id || paymentId)}`}
              >
                {t.download} <span>↓</span>
              </a>
              <p className="thankyou-hint">{t.downloadHint}</p>
            </div>
          ) : (
            <div className="thankyou-actions">
              <Link className="button button-dark" href="/produkt/tarifanalyse-smart-meter">
                {t.retry}
              </Link>
            </div>
          )}

          <Link className="text-link" href="/">
            {t.back} <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ThankYou />
    </Suspense>
  )
}
