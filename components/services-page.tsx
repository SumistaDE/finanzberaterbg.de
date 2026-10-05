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
    eyebrow: 'UNSERE LEISTUNGEN',
    title: <>Was wir fuer <em>Sie</em> tun.</>,
    intro:
      'Waehlen Sie eine Leistung. Jede wird von unseren Experten persoenlich begleitet.',
    view: 'Details ansehen',
    priceLabel: 'Einmalig',
    badgeBeratung: 'Beratung',
    badgeHandbuch: 'Handbuch',
  },
  bg: {
    eyebrow: 'НАШИТЕ УСЛУГИ',
    title: <>Какво правим <em>за Вас.</em></>,
    intro:
      'Изберете услуга. Всяка се съпровожда лично от нашите експерти.',
    view: 'Вижте детайли',
    priceLabel: 'Еднократно',
    badgeBeratung: 'Консултация',
    badgeHandbuch: 'Наръчник',
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
            {products.map((product, i) => {
              const isHandbook = product.slug.startsWith('naruchnik')
              return (
                <Link
                  key={product.id}
                  href={`/produkt/${product.slug}`}
                  className="service-card"
                >
                  <div className="service-card-top">
                    <span className="service-card-index">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="service-card-badge">
                      {isHandbook ? t.badgeHandbuch : t.badgeBeratung}
                    </span>
                  </div>
                  <h2>{lang === 'de' ? product.name : product.nameBg}</h2>
                  <p>{lang === 'de' ? product.tagline : product.taglineBg}</p>
                  <div className="service-card-bottom">
                    <span className="service-price">
                      {formatPrice(product.price)}
                      <small>{t.priceLabel}</small>
                    </span>
                    <span className="service-card-cta">
                      {t.view} <span>↗</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default ServicesPage
