'use client'

import { useState } from 'react'
import Link from 'next/link'
import { products } from '@/lib/products'

type Lang = 'de' | 'bg'

function formatPrice(value: string) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value))
}

const copy = {
  de: {
    nav: ['Dienstleistungen', 'Vorteile', 'Kontakt'],
    login: 'Anmelden',
    toggle: 'BG',
    eyebrow: 'UNSERE LEISTUNGEN',
    title: <>Was wir fuer <em>Sie</em> tun.</>,
    intro:
      'Waehlen Sie eine Leistung. Jede wird von unseren Experten persoenlich begleitet.',
    view: 'Details ansehen',
    priceLabel: 'Einmalig',
    footerLead: <>Ihre Energie. Ihre Entscheidung.</>,
    navigation: 'Navigation',
    contact: 'Kontakt',
    weekdays: 'Mo–Fr, 9:00–18:00 Uhr',
    home: 'Startseite',
  },
  bg: {
    nav: ['Услуги', 'Предимства', 'Контакт'],
    login: 'Вход',
    toggle: 'DE',
    eyebrow: 'НАШИТЕ УСЛУГИ',
    title: <>Какво правим <em>за Вас.</em></>,
    intro:
      'Изберете услуга. Всяка се съпровожда лично от нашите експерти.',
    view: 'Вижте детайли',
    priceLabel: 'Еднократно',
    footerLead: <>Вашата енергия. Вашето решение.</>,
    navigation: 'Навигация',
    contact: 'Контакт',
    weekdays: 'Пн–Пт, 9:00–18:00 ч.',
    home: 'Начало',
  },
}

export function ServicesPage() {
  const [lang, setLang] = useState<Lang>('de')
  const t = copy[lang]

  return (
    <>
      <header className="site-header">
        <div className="container nav-inner">
          <Link href="/" className="brand">
            <span className="brand-mark">t</span>
            <span>
              Tarifberater<span className="brand-accent">24</span>
            </span>
          </Link>
          <nav className="desktop-nav">
            <Link href="/">{t.home}</Link>
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
          <div className="sub-hero">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
          </div>

          <div className="service-list">
            {products.map((product, i) => (
              <Link
                key={product.id}
                href={`/produkt/${product.slug}`}
                className="service-row"
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h2>{lang === 'de' ? product.name : product.nameBg}</h2>
                <p>{lang === 'de' ? product.tagline : product.taglineBg}</p>
                <span className="service-price">
                  {formatPrice(product.price)}
                  <small>{t.priceLabel}</small>
                </span>
                <span className="row-arrow">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-bottom">
          <span>© 2024 Tarifberater24</span>
          <span>Made for better decisions.</span>
        </div>
      </footer>
    </>
  )
}

export default ServicesPage
