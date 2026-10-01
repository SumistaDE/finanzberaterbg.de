import Link from 'next/link'
import type { Product } from '@/lib/products'

const copy = {
  de: {
    nav: ['Dienstleistungen', 'Vorteile', 'Kontakt'],
    login: 'Anmelden',
    toggle: 'BG',
    back: 'Zurueck',
    eyebrow: 'PREMIUM LEISTUNG',
    price: 'Einmalig',
    buy: 'Jetzt kaufen',
    emailLabel: 'Ihre E-Mail-Adresse (fuer das Handbuch)',
    emailPlaceholder: 'name@beispiel.de',
    included: 'Enthalten',
    manualNote:
      'Nach dem Kauf senden wir Ihnen das vollstaendige Handbuch als PDF automatisch per E-Mail zu.',
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
    eyebrow: 'ПРЕМИУМ УСЛУГА',
    price: 'Еднократно',
    buy: 'Купи сега',
    emailLabel: 'Вашият имейл (за наръчника)',
    emailPlaceholder: 'name@example.com',
    included: 'Включено',
    manualNote:
      'След покупката изпращаме пълния наръчник като PDF автоматично на Вашия имейл.',
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
  const t = copy.de
  const priceLabel = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(product.price))

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
            <Link href="/">{t.back}</Link>
            <Link href="/#kontakt">{t.nav[2]}</Link>
          </nav>
        </div>
      </header>

      <main className="subpage">
        <div className="container">
          <p className="eyebrow">{t.eyebrow}</p>
          <div className="product-layout">
            <div className="product-main">
              <h1>{product.name}</h1>
              <p className="product-lead">{product.description}</p>

              <h2 className="product-subhead">{t.included}</h2>
              <ul className="product-features">
                {product.features.map((f) => (
                  <li key={f}>
                    <span className="tick">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
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

                <p className="buy-note">{t.manualNote}</p>
                <p className="buy-secure">🔒 {t.secure}</p>
              </div>
            </aside>
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

export default ProductPage
