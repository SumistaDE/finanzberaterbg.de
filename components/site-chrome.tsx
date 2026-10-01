'use client'

import { useState } from 'react'
import Link from 'next/link'
import { common, useLang } from '@/lib/i18n'

export function Header() {
  const { lang, toggle } = useLang()
  const t = common[lang]
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">f</span>
          <span>
            Finanzberater<span className="brand-accent"> BG</span>
          </span>
        </Link>
        <nav className={`desktop-nav ${open ? 'is-open' : ''}`} aria-label="Navigation">
          <Link href="/dienstleistungen">{t.navServices}</Link>
          <Link href="/#vorteile">{t.navBenefits}</Link>
          <Link href="/#kontakt">{t.navContact}</Link>
          <Link href="/login" className="nav-login">
            {t.login}
          </Link>
          <button
            className="language-switch"
            onClick={toggle}
            aria-label={lang === 'bg' ? 'Switch language to German' : 'Смени езика на български'}
          >
            {lang.toUpperCase()} <span>/</span> {t.toggle}
          </button>
        </nav>
        <button
          className="menu-button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export function Footer() {
  const { lang, toggle } = useLang()
  const t = common[lang]

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand footer-brand">
            <span className="brand-mark">f</span>
            <span>
              Finanzberater<span className="brand-accent"> BG</span>
            </span>
          </Link>
          <p>{t.footerLead}</p>
        </div>
        <div>
          <h3>{t.navigation}</h3>
          <Link href="/dienstleistungen">{t.services}</Link>
          <Link href="/login">{t.login}</Link>
        </div>
        <div>
          <h3>{t.legal}</h3>
          <Link href="/impressum">{t.imprint}</Link>
          <Link href="/datenschutz">{t.privacy}</Link>
          <Link href="/agb">{t.terms}</Link>
        </div>
        <div>
          <h3>{t.contact}</h3>
          <a href="mailto:info@finanzberaterbg.de">info@finanzberaterbg.de</a>
          <span>{t.weekdays}</span>
          <button className="language-switch footer-switch" onClick={toggle}>
            {lang.toUpperCase()} <span>/</span> {t.toggle}
          </button>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2024 Finanzberater BG</span>
        <span>Made for better decisions.</span>
      </div>
    </footer>
  )
}
