export const products = [
  { id: 'aurora-headphones', name: 'Aurora Wireless Headphones', price: '89.00', tagline: 'Active noise cancelling, 40h battery', description: 'A quiet, comfortable listening experience with adaptive noise cancellation and a full day of battery life.', emoji: '◉' },
  { id: 'nimbus-keyboard', name: 'Nimbus Mechanical Keyboard', price: '129.50', tagline: 'Hot-swappable, RGB, wireless', description: 'A tactile wireless mechanical keyboard built for focused work and expressive setups.', emoji: '▦' },
  { id: 'lumen-desk-lamp', name: 'Lumen Smart Desk Lamp', price: '59.95', tagline: 'Adjustable colour temperature', description: 'Tune your workspace from warm evening light to crisp daylight with one elegant control.', emoji: '◐' },
  { id: 'vertex-mouse', name: 'Vertex Ergonomic Mouse', price: '44.00', tagline: 'Silent clicks, 8 buttons', description: 'Precise, quiet control shaped for long sessions and effortless productivity.', emoji: '◌' },
] as const
export type Product = (typeof products)[number]
export function getProduct(id: string) { return products.find((product) => product.id === id) }
export function formatPrice(price: string) { return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(Number(price)) }
export const mode = process.env.MOLLIE_API_KEY?.startsWith('live_') ? 'LIVE MODE' : 'TEST MODE'
