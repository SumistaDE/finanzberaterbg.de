'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/products'

type Lang = 'de' | 'bg'

const copy = {
  de: {
    nav: ['Dienstleistungen', 'Vorteile', 'Kontakt'],
    login: 'Anmelden',
    toggle: 'BG',
    back: 'Zurueck',
    eyebrow: 'DIENSTLEISTUNG',
    price: 'Einmalig',
    buy: 'Jetzt kaufen',
    emailLabel: 'Ihre E-Mail-Adresse',
    emailPlaceholder: 'name@beispiel.de',
    included: 'Enthalten',
    provider: 'Anbieter',
    manualNote:
      'Nach dem Kauf senden wir Ihnen das Handbuch automatisch per E-Mail zu.',
    orderNote: 'Nach dem Kauf senden wir Ihnen eine Bestellbestaetigung per E-Mail.',
    bundleLink: 'Alle 3 Teile als Komplettset (294 EUR)',
    secure: 'Sichere Zahlung ueber Mollie',
    errorEmail: 'Bitte geben Sie eine gueltige E-Mail-Adresse ein.',
    errorPayment:
      'Die Zahlung konnte nicht gestartet werden. Bitte versuchen Sie es erneut.',
  },
  bg: {
    nav: ['Услуги', 'Предимства', 'Контакт'],
    login: 'Вход',
    toggle: 'DE',
    back: 'Назад',
    eyebrow: 'УСЛУГА',
    price: 'Еднократно',
    buy: 'Купи сега',
    emailLabel: 'Вашият имейл адрес',
    emailPlaceholder: 'name@example.com',
    included: 'Включено',
    provider: 'Доставчик',
    manualNote:
      'След покупката изпращаме наръчника автоматично на Вашия имейл.',
    orderNote: 'След покупката изпращаме потвърждение на поръчката на Вашия имейл.',
    bundleLink: 'И трите части като комплект (294 €)',
    secure: 'Сигурно плащане чрез Mollie',
    errorEmail: 'Моля, въведете валиден имейл адрес.',
    errorPayment: 'Плащането не можа да стартира. Моля, опитайте отново.',
  },
}

export function ProductPage({
  product,
  error,
}: {
  product: Product
  error?: string
}) {
  const [lang, setLang] = useState<Lang>('de')
  const t = copy[lang]

  const name = lang === 'de' ? product.name : product.nameBg
  const tagline = lang === 'de' ? product.tagline : product.taglineBg
  const description = lang === 'de' ? product.description : product.descriptionBg
  const features = lang === 'de' ? product.features : product.featuresBg
  const priceLabel = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(product.price))

  return (
    <>
      <header className="site-header">
        <div className="container nav-inner">
          <Link href="/" className="brand">
            <span className="brand-mark">f</span>
            <span>
              Finanzberater<span className="brand-accent"> BG</span>
            </span>
          </Link>
          <nav className="desktop-nav">
            <Link href="/">{t.back}</Link>
            <Link href="/#kontakt">{t.nav[2]}</Link>
            <button
              className="language-switch"
              onClick={() => setLang(lang === 'de' ? 'bg' : 'de')}
            >
              {lang.toUpperCase()} <span>/</span> {t.toggle}
            </button>
          </nav>
        </div>
      </header>

      <main className="subpage">
        <div className="container">
          <p className="eyebrow">{t.eyebrow}</p>
          <div className="product-layout">
            <div className="product-main">
              <h1>{name}</h1>
              <p className="product-tagline">{tagline}</p>
              <p className="product-lead">{description}</p>

              <h2 className="product-subhead">{t.included}</h2>
              <ul className="product-features">
                {features.map((f) => (
                  <li key={f}>
                    <span className="tick">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <p className="product-provider">
                {t.provider}: <strong>{product.provider}</strong>
              </p>
            </div>

            <aside className="product-buy">
              <div className="buy-card">
                <p className="buy-price-label">{t.price}</p>
                <p className="buy-price">{priceLabel}</p>

                {error === 'email' && <p className="buy-error">{t.errorEmail}</p>}
                {error === 'payment' && <p className="buy-error">{t.errorPayment}</p>}

                <form method="POST" action="/api/checkout" className="buy-form">
                  <input type="hidden" name="slug" value={product.slug} />
                  <label htmlFor="email">{t.emailLabel}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    autoComplete="email"
                  />
                  <button type="submit" className="button button-dark full">
                    {t.buy} <span>↗</span>
                  </button>
                </form>

                <p className="buy-note">
                  {product.manualFile ? t.manualNote : t.orderNote}
                </p>
                <p className="buy-secure">🔒 {t.secure}</p>

                {product.slug.startsWith('naruchnik-teil-') && (
                  <p className="buy-bundle">
                    <Link href="/produkt/naruchnik-komplett">
                      {t.bundleLink} <span>↗</span>
                    </Link>
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-bottom">
          <span>© 2024 Finanzberater BG</span>
          <span>Made for better decisions.</span>
        </div>
      </footer>
    </>
  )
}

export default ProductPage
