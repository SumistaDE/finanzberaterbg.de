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
  manualFile?: string
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
      'Individueller Optimierungsplan, nach dem Kauf per E-Mail',
    ],
    featuresBg: [
      'Пълен тарифен анализ на договорите Ви за ток и газ',
      'Оптимизация и ново планиране със спестяване до 30%',
      'Посредничество и доставка на Smart-Meter устройство',
      'Монтаж на главния бушон на електромера',
      'Мониторинг и контрол на потреблението в реално време',
      'Индивидуален план за оптимизация, изпратен по имейл след покупка',
    ],
    provider: 'Tarifberater24',
    accent: '#c8f45b',
  },
  {
    id: 'naruchnik-teil-1',
    slug: 'naruchnik-teil-1',
    price: '98.00',
    name: 'Handbuch "Weniger zahlen fuer Strom und Gas" - Teil 1',
    nameBg: 'Наръчник „Плащай по-малко за ток и газ" — Част 1',
    tagline: 'Die Rechnung lesen und Tarife richtig vergleichen',
    taglineBg: 'Как да четеш сметката и да сравняваш тарифите правилно',
    description:
      'Teil 1 des praktischen Handbuchs fuer Bulgaren in Deutschland: die Bestandteile Ihrer Rechnung verstehen und Tarife systematisch vergleichen.',
    descriptionBg:
      'Част 1 от практичния наръчник за българи в Германия: как да разбирате съставките на сметката си и как систематично да сравнявате тарифите.',
    features: [
      'Einfuehrung: so nutzen Sie das Handbuch',
      'Kapitel 01: die eigene Rechnung lesen',
      'Kapitel 02: Tarife vergleichen, Schritt fuer Schritt',
      'Verstaendlich auf Bulgarisch, mit konkreten Beispielen',
    ],
    featuresBg: [
      'Въведение: как да използвате наръчника',
      'Глава 01: Как да четеш сметката си',
      'Глава 02: Как да сравняваш тарифи',
      'Разбираемо обяснено, с конкретни примери',
    ],
    provider: 'Tarifberater24',
    manualFile: 'naruchnik-tok-gaz-teil-1.pdf',
    manualLabel: 'Naruchnik Teil 1 (PDF)',
    accent: '#c8f45b',
  },
  {
    id: 'naruchnik-teil-2',
    slug: 'naruchnik-teil-2',
    price: '98.00',
    name: 'Handbuch "Weniger zahlen fuer Strom und Gas" - Teil 2',
    nameBg: 'Наръчник „Плащай по-малко за ток и газ" — Част 2',
    tagline: 'Vertrag, Boni und Fallen - Strom und Heizung',
    taglineBg: 'Договорът, бонусите и капаните — ток и отопление',
    description:
      'Teil 2 des Handbuchs: worauf Sie vor der Unterschrift achten, wie Sie Boni und Fallen durchschauen und wo Strom und Heizung am meisten kosten.',
    descriptionBg:
      'Част 2 от наръчника: на какво да обърнете внимание преди подпис, как да разчетете бонусите и капаните и къде токът и отоплението струват най-много.',
    features: [
      'Kapitel 03: der Vertrag - was Sie pruefen sollten',
      'Kapitel 04: Boni und Fallen erkennen',
      'Kapitel 05: Strom zu Hause - Verbrauch und Sparpotenzial',
      'Kapitel 06: Heizung und Gas - der groesste Sparhebel',
    ],
    featuresBg: [
      'Глава 03: Договорът — какво да провериш',
      'Глава 04: Бонуси и капани',
      'Глава 05: Токът у дома — потребление и икономия',
      'Глава 06: Отопление и газ — най-големият резервоар за икономия',
    ],
    provider: 'Tarifberater24',
    manualFile: 'naruchnik-tok-gaz-teil-2.pdf',
    manualLabel: 'Naruchnik Teil 2 (PDF)',
    accent: '#c8f45b',
  },
  {
    id: 'naruchnik-teil-3',
    slug: 'naruchnik-teil-3',
    price: '98.00',
    name: 'Handbuch "Weniger zahlen fuer Strom und Gas" - Teil 3',
    nameBg: 'Наръчник „Плащай по-малко за ток и газ" — Част 3',
    tagline: 'Berechnungen, Aktionsplan und typische Fehler',
    taglineBg: 'Изчисления, план за действие и типични грешки',
    description:
      'Teil 3 des Handbuchs: Beispielrechnungen, ein 12-Monats-Plan, die 10 haeufigsten Fehler und schnelle Antworten auf die wichtigsten Fragen.',
    descriptionBg:
      'Част 3 от наръчника: примерни изчисления, 12-месечен план за действие, 10-те най-чести грешки и бързи отговори на важните въпроси.',
    features: [
      'Kapitel 07: Beispielrechnungen',
      'Kapitel 08: 12-Monats-Aktionsplan',
      'Kapitel 09: die 10 typischen Fehler',
      'Kapitel 10: schnelle Antworten auf haeufige Fragen',
    ],
    featuresBg: [
      'Глава 07: Примерни изчисления',
      'Глава 08: 12-месечен план за действие',
      'Глава 09: 10 типични грешки',
      'Глава 10: Бързи отговори',
    ],
    provider: 'Tarifberater24',
    manualFile: 'naruchnik-tok-gaz-teil-3.pdf',
    manualLabel: 'Naruchnik Teil 3 (PDF)',
    accent: '#c8f45b',
  },
  {
    id: 'naruchnik-komplett',
    slug: 'naruchnik-komplett',
    price: '294.00',
    name: 'Handbuch "Weniger zahlen fuer Strom und Gas" - Komplettset (alle 3 Teile)',
    nameBg: 'Наръчник „Плащай по-малко за ток и газ" — Пълен комплект (3 части)',
    tagline: 'Alle drei Teile auf einmal - der vollstaendige Praxisleitfaden',
    taglineBg: 'И трите части наведнъж — пълното практическо ръководство',
    description:
      'Der vollstaendige Praxisleitfaden fuer Bulgaren in Deutschland: Rechnungen verstehen, Tarife vergleichen, Vertraege pruefen, Boni durchschauen und dauerhaft sparen.',
    descriptionBg:
      'Пълното практическо ръководство за българи в Германия: разбиране на сметките, сравняване на тарифи, проверка на договори, разчитане на бонуси и трайно спестяване.',
    features: [
      'Alle 10 Kapitel in einem Dokument (14 Seiten)',
      'Teil 1: Rechnung lesen und Tarife vergleichen',
      'Teil 2: Vertrag, Boni, Fallen, Strom und Heizung',
      'Teil 3: Berechnungen, Aktionsplan und typische Fehler',
    ],
    featuresBg: [
      'Всичките 10 глави в един документ (14 страници)',
      'Част 1: Сметката и сравняване на тарифи',
      'Част 2: Договор, бонуси, капани, ток и отопление',
      'Част 3: Изчисления, план за действие и грешки',
    ],
    provider: 'Tarifberater24',
    manualFile: 'naruchnik-tok-gaz-germania.pdf',
    manualLabel: 'Naruchnik Komplett (PDF)',
    accent: '#c8f45b',
  },
]

export function getProduct(slug: string): Product | null {
  return products.find((p) => p.slug === slug) || null
}
