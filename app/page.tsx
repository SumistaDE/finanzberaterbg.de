import Link from 'next/link'
import { formatPrice, mode, products } from '@/lib/products'

export function SitePage() {
  return <main className="shop-shell"><header className="shop-header"><Link href="/" className="shop-logo">NIMBUS<span>.</span></Link><div className="mode-badge">{mode}</div></header><section className="shop-hero"><p className="kicker">OBJECTS FOR BETTER DAYS</p><h1>Useful things.<br /><i>Beautifully made.</i></h1><p>Thoughtful tools for work, rest, and everything in between.</p></section><section className="catalog" aria-label="Products">{products.map((product) => <article className="product-card" key={product.id}><div className="product-art"><span>{product.emoji}</span></div><div className="product-meta"><div><h2>{product.name}</h2><p>{product.tagline}</p></div><strong>{formatPrice(product.price)}</strong></div><Link className="buy-link" href={`/product/${product.id}`}>View &amp; buy <span>↗</span></Link></article>)}</section><footer className="shop-footer"><span>Nimbus Store / 2026</span><span>Secure checkout with Mollie</span></footer></main>
}

export default SitePage
