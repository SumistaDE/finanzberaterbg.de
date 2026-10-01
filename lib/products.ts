// Product / service catalog.
// Prices are decimal strings so they map 1:1 to Mollie's amount format.

export const CURRENCY = process.env.CURRENCY || 'EUR'

export type Product = {
  id: string
  slug: string
  name: string
  price: string
  tagline: string
  description: string
  features: string[]
  manualPath: string
  manualLabel: string
  accent: string
}

export const products: Product[] = [
  {
    id: 'tarifanalyse-smart-meter',
    slug: 'tarifanalyse-smart-meter',
    name: 'Tarifanalyse mit Optimierung, Planung und Smart-Meter-Vermittlung',
    price: '198.00',
    tagline: 'Analyse, Optimierung und Echtzeit-Monitoring in einem Paket',
    description:
      'Wir analysieren Ihre Strom- und Gasvertraege, optimieren Ihre Tarife und vermitteln ein Smart-Meter-Geraet, das am Hauptzaehler montiert wird und Ihren Verbrauch in Echtzeit anzeigt.',
    features: [
      'Vollstaendige Tarifanalyse Ihrer Strom- und Gasvertraege',
      'Optimierung und Neuplanung mit Einsparpotenzial bis zu 30 %',
      'Vermittlung und Lieferung eines Smart-Meter-Geraets',
      'Montage an der Hauptsicherung des Stromzaehlers',
      'Echtzeit-Monitoring und Kontrolle des Verbrauchs',
      'Handbuch als PDF, nach dem Kauf automatisch per E-Mail',
    ],
    manualPath: '/downloads/tarifberater24-handbuch.pdf',
    manualLabel: 'Handbuch zur Tarifanalyse & Smart-Meter (PDF)',
    accent: '#c8f45b',
  },
]

export function getProduct(slug: string): Product | null {
  return products.find((p) => p.slug === slug) || null
}
