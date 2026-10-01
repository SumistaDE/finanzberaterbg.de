'use client'

import { useState } from 'react'
import Link from 'next/link'

const services = [
  { number: '01', title: 'Energiecheck', text: 'Wir analysieren Ihre aktuellen Verträge und finden konkrete Einsparpotenziale.' },
  { number: '02', title: 'Tarifoptimierung', text: 'Unabhängige Vergleiche für Strom, Gas und Wärme – passend zu Ihrem Bedarf.' },
  { number: '03', title: 'Laufende Betreuung', text: 'Wir behalten den Markt im Blick und kümmern uns um Ihre nächste Optimierung.' },
]

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <div className="container nav-inner">
      <Link href="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">t</span><span>Tarifberater<span className="brand-accent">24</span></span></Link>
      <nav className={`desktop-nav ${open ? 'is-open' : ''}`} aria-label="Hauptnavigation">
        <Link href="/dienstleistungen" onClick={() => setOpen(false)}>Dienstleistungen</Link>
        <Link href="/#vorteile" onClick={() => setOpen(false)}>Vorteile</Link>
        <Link href="/#kontakt" onClick={() => setOpen(false)}>Kontakt</Link>
        <Link href="/login" className="nav-login" onClick={() => setOpen(false)}>Anmelden</Link>
      </nav>
      <button className="menu-button" aria-label="Menü öffnen" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
    </div>
  </header>
}

function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div><Link href="/" className="brand footer-brand"><span className="brand-mark">t</span><span>Tarifberater<span className="brand-accent">24</span></span></Link><p>Ihre Energie. Ihre Entscheidung.<br />Wir machen sie einfacher.</p></div><div><h3>Navigation</h3><Link href="/dienstleistungen">Dienstleistungen</Link><Link href="/login">Anmelden</Link></div><div><h3>Rechtliches</h3><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><Link href="/agb">AGB</Link></div><div><h3>Kontakt</h3><a href="mailto:info@tarifberater24.de">info@tarifberater24.de</a><span>Mo–Fr, 9:00–18:00 Uhr</span></div></div><div className="container footer-bottom"><span>© 2024 Tarifberater24</span><span>Made for better decisions.</span></div></footer>
}

function Home() {
  return <><Header /><main><section className="hero"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">ENERGIE NEU GEDACHT</p><h1>Mehr aus Ihrer<br /><em>Energie.</em></h1><p className="hero-text">Wir helfen Ihnen, Energiekosten zu verstehen, zu optimieren und dauerhaft zu senken. Persönlich. Unabhängig. Transparent.</p><div className="hero-actions"><Link href="/dienstleistungen" className="button button-dark">Potenzial entdecken <span>↗</span></Link><Link href="#vorteile" className="text-link">Mehr erfahren <span>↓</span></Link></div></div><div className="hero-art" aria-label="Abstrakte Darstellung von Energieeffizienz"><div className="art-ring ring-one" /><div className="art-ring ring-two" /><div className="art-core"><span>24</span><small>ENERGIE</small></div><div className="art-label label-top">EINFACH</div><div className="art-label label-bottom">WIRKSAM</div></div></div></section><section className="trust"><div className="container trust-inner"><span>Vertrauen, das sich auszahlt</span><div><b>100%</b><small>unabhängig</small></div><div><b>24/7</b><small>für Sie da</small></div><div><b>∞</b><small>Potenzial</small></div></div></section><section className="section" id="vorteile"><div className="container"><div className="section-intro"><p className="eyebrow">UNSER ANSATZ</p><h2>Energie verstehen.<br /><em>Vorteile nutzen.</em></h2><p>Komplexe Energiethemen werden bei uns zu klaren Entscheidungen. Damit Sie sich auf das konzentrieren können, was wirklich zählt.</p></div><div className="feature-grid"><div className="feature-card feature-main"><span className="card-number">01</span><div><h3>Klarheit statt<br />Kleingedrucktes.</h3><p>Wir übersetzen Tarife und Zahlen in verständliche Empfehlungen – ohne Fachchinesisch.</p></div><span className="card-arrow">↗</span></div><div className="feature-card feature-light"><span className="card-number">02</span><div><h3>Unabhängig<br />beraten.</h3><p>Unsere Empfehlung richtet sich nach Ihnen, nicht nach einem Anbieter.</p></div><span className="card-arrow">↗</span></div><div className="feature-card feature-outline"><span className="card-number">03</span><div><h3>Langfristig<br />gedacht.</h3><p>Wir bleiben an Ihrer Seite und machen Optimierung zur Routine.</p></div><span className="card-arrow">↗</span></div></div></div></section><section className="cta" id="kontakt"><div className="container cta-inner"><p className="eyebrow">BEREIT FÜR DEN NÄCHSTEN SCHRITT?</p><h2>Ihre Energie kann<br /><em>mehr.</em></h2><Link href="/dienstleistungen" className="button button-light">Jetzt starten <span>↗</span></Link></div></section></main><Footer /></>
}

function Services() { return <><Header /><main className="subpage"><div className="container sub-hero"><p className="eyebrow">UNSERE DIENSTLEISTUNGEN</p><h1>Energie, die<br /><em>sich rechnet.</em></h1><p>Wir machen Ihre Energieversorgung transparent, effizient und zukunftssicher.</p></div><div className="container service-list">{services.map((service) => <article className="service-row" key={service.number}><span>{service.number}</span><h2>{service.title}</h2><p>{service.text}</p><span className="row-arrow">↗</span></article>)}</div></main><Footer /></> }

function Login() { const [loading, setLoading] = useState(false); return <><Header /><main className="login-page"><div className="login-card"><p className="eyebrow">WILLKOMMEN ZURÜCK</p><h1>Schön, dass Sie<br /><em>wieder da sind.</em></h1><form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 800) }}><label>E-Mail-Adresse<input type="email" placeholder="ihre@email.de" required /></label><label>Passwort<input type="password" placeholder="••••••••" required /></label><div className="form-meta"><label className="check"><input type="checkbox" /> <span>Angemeldet bleiben</span></label><a href="#forgot">Passwort vergessen?</a></div><button className="button button-dark full" disabled={loading}>{loading ? 'Wird geladen …' : 'Anmelden'} <span>↗</span></button></form><p className="register">Noch kein Konto? <a href="#register">Jetzt registrieren</a></p></div></main><Footer /></> }

function Legal({ title, label }: { title: string; label: string }) { return <><Header /><main className="legal-page"><div className="container legal-content"><p className="eyebrow">{label}</p><h1>{title}</h1><p className="updated">Stand: Oktober 2024</p><h2>Angaben gemäß § 5 TMG</h2><p>Tarifberater24<br />Musterstraße 24<br />10115 Berlin<br /><br />E-Mail: info@tarifberater24.de</p><h2>Verantwortlich für den Inhalt</h2><p>Tarifberater24 steht für transparente und unabhängige Beratung rund um Ihre Energieversorgung. Die nachfolgenden Informationen dienen der vollständigen und verständlichen Darstellung unserer Leistungen.</p><h2>Kontakt</h2><p>Bei Fragen zu unseren Leistungen oder diesen Informationen erreichen Sie uns jederzeit unter der oben genannten E-Mail-Adresse.</p></div></main><Footer /></> }

export function SitePage({ path = '/' }: { path?: string }) { if (path === '/dienstleistungen') return <Services />; if (path === '/login') return <Login />; if (path === '/impressum') return <Legal title="Impressum" label="RECHTLICHE HINWEISE" />; if (path === '/datenschutz') return <Legal title="Datenschutz" label="IHRE PRIVATSPHÄRE" />; if (path === '/agb') return <Legal title="Allgemeine Geschäftsbedingungen" label="UNSERE BEDINGUNGEN" />; return <Home /> }

export default function Page() { return <SitePage /> }
