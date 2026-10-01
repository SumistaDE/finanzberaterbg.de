// Service catalog. Prices are decimal strings so they map 1:1 to Mollie's amount format.
// Each service carries German (primary) and Bulgarian copy.

export const CURRENCY = process.env.CURRENCY || 'EUR'

export type Product = {
  id: string
  slug: string
  price: string
  name: string
  nameBg: string
  tagline: string
  taglineBg: string
  description: string
  descriptionBg: string
  features: string[]
  featuresBg: string[]
  provider: string
  // Only services that ship a PDF have a manual; others get a plain confirmation email.
  manualPath?: string
  manualLabel?: string
  accent: string
}

export const products: Product[] = [
  {
    id: 'tarifanalyse-optimierung',
    slug: 'tarifanalyse-optimierung',
    price: '49.00',
    name: 'Tarifanalyse und Optimierung',
    nameBg: 'Тарифен анализ и оптимизация',
    tagline:
      'Optimieren Sie Ihre Vertraege und sparen Sie 30 % Ihrer jaehrlichen Kosten!',
    taglineBg:
      'Оптимизирайте договорите си и спестете 30% от годишните си разходи!',
    description:
      'Bereitgestellt von Finanzberaterbg.de - Optimierung Ihres Energievertrags fuer 2 Jahre.',
    descriptionBg:
      'Предоставена от Finanzberaterbg.de - оптимизиране на енергийния договор за 2 години.',
    features: [
      'Analyse Ihrer aktuellen Strom- und Gasvertraege',
      'Optimierung des Energievertrags fuer 2 Jahre',
      'Einsparpotenzial von bis zu 30 % pro Jahr',
      'Unabhaengige Empfehlung ohne Fachchinesisch',
      'Begleitung bis zum abgeschlossenen Anbieterwechsel',
    ],
    featuresBg: [
      'Анализ на текущите Ви договори за ток и газ',
      'Оптимизиране на енергийния договор за 2 години',
      'Спестяване до 30% от годишните разходи',
      'Независима препоръка без сложен жаргон',
      'Съдействие до завършване на смяната на доставчик',
    ],
    provider: 'Finanzberaterbg.de',
    accent: '#c8f45b',
  },
  {
    id: 'tarifanalyse-smart-meter',
    slug: 'tarifanalyse-smart-meter',
    price: '198.00',
    name: 'Tarifanalyse mit Optimierung, Planung und Smart-Meter-Vermittlung',
    nameBg: 'Тарифен анализ с оптимизация, планиране и посредничество за Smart-Meter',
    tagline: 'Analyse, Optimierung und Echtzeit-Monitoring in einem Paket',
    taglineBg: 'Анализ, оптимизация и мониторинг в реално време в един пакет',
    description:
      'Wir analysieren Ihre Strom- und Gasvertraege, optimieren Ihre Tarife und vermitteln ein Smart-Meter-Geraet, das am Hauptzaehler montiert wird und Ihren Verbrauch in Echtzeit anzeigt.',
    descriptionBg:
      'Анализираме договорите Ви за ток и газ, оптимизираме тарифите и осигуряваме Smart-Meter устройство, което се монтира на главния бушон и показва потреблението в реално време.',
    features: [
      'Vollstaendige Tarifanalyse Ihrer Strom- und Gasvertraege',
      'Optimierung und Neuplanung mit Einsparpotenzial bis zu 30 %',
      'Vermittlung und Lieferung eines Smart-Meter-Geraets',
      'Montage an der Hauptsicherung des Stromzaehlers',
      'Echtzeit-Monitoring und Kontrolle des Verbrauchs',
      'Handbuch als PDF, nach dem Kauf automatisch per E-Mail',
    ],
    featuresBg: [
      'Пълен тарифен анализ на договорите Ви за ток и газ',
      'Оптимизация и ново планиране със спестяване до 30%',
      'Посредничество и доставка на Smart-Meter устройство',
      'Монтаж на главния бушон на електромера',
      'Мониторинг и контрол на потреблението в реално време',
      'Наръчник като PDF, изпратен автоматично след покупка',
    ],
    provider: 'Tarifberater24',
    manualPath: '/downloads/tarifberater24-handbuch.pdf',
    manualLabel: 'Handbuch zur Tarifanalyse & Smart-Meter (PDF)',
    accent: '#c8f45b',
  },
]

export function getProduct(slug: string): Product | null {
  return products.find((p) => p.slug === slug) || null
}
