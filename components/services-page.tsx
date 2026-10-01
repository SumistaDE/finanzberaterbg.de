'use client'

import Link from 'next/link'
import { products } from '@/lib/products'
import { Footer, Header } from '@/components/site-chrome'
import { useLang } from '@/lib/i18n'

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
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <>
      <Header />

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

      <Footer />
    </>
  )
}

export default ServicesPage
