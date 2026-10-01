'use client'

import Link from 'next/link'
import { Footer, Header } from '@/components/site-chrome'
import { useLang, type Lang } from '@/lib/i18n'

type Section = { heading: string; body: React.ReactNode }

const pages: Record<string, { title: Record<Lang, string>; sections: Record<Lang, Section[]> }> = {
  impressum: {
    title: { de: 'Impressum', bg: 'Импресум' },
    sections: {
      de: [
        {
          heading: 'Angaben gemaess § 5 DDG',
          body: (
            <>
              Tarifberater24
              <br />
              [Rechtsform, z. B. Einzelunternehmen oder GmbH]
              <br />
              [Strasse und Hausnummer ergaenzen]
              <br />
              [PLZ und Ort ergaenzen]
              <br />
              Deutschland
              <br />
              <br />
              Handelsname / Marke: Finanzberater BG (finanzberaterbg.de)
            </>
          ),
        },
        {
          heading: 'Kontakt',
          body: (
            <>
              E-Mail:{' '}
              <a href="mailto:info@finanzberaterbg.de">info@finanzberaterbg.de</a>
              <br />
              Telefon: [Telefonnummer ergaenzen]
            </>
          ),
        },
        {
          heading: 'Vertreten durch',
          body: <>[Vor- und Nachname der vertretungsberechtigten Person ergaenzen]</>,
        },
        {
          heading: 'Umsatzsteuer-ID',
          body: (
            <>
              Umsatzsteuer-Identifikationsnummer gemaess § 27 a Umsatzsteuergesetz:
              <br />
              [USt-IdNr. ergaenzen, falls vorhanden]
            </>
          ),
        },
        {
          heading: 'Verbraucherstreitbeilegung',
          body: (
            <>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </>
          ),
        },
      ],
      bg: [
        {
          heading: 'Данни по § 5 DDG (германски закон)',
          body: (
            <>
              Tarifberater24
              <br />
              [Правна форма — напр. едноличен търговец или GmbH]
              <br />
              [Улица и номер]
              <br />
              [Пощенски код и град]
              <br />
              Германия
              <br />
              <br />
              Търговско име / марка: Finanzberater BG (finanzberaterbg.de)
            </>
          ),
        },
        {
          heading: 'Контакт',
          body: (
            <>
              Имейл:{' '}
              <a href="mailto:info@finanzberaterbg.de">info@finanzberaterbg.de</a>
              <br />
              Телефон: [добавете телефонен номер]
            </>
          ),
        },
        {
          heading: 'Представлявано от',
          body: <>[Име и фамилия на представляващото лице]</>,
        },
        {
          heading: 'ДДС номер',
          body: (
            <>
              Идентификационен номер по ДДС съгласно § 27 a от германския закон за ДДС:
              <br />
              [добавете ДДС номер, ако имате]
            </>
          ),
        },
        {
          heading: 'Извънсъдебно решаване на спорове',
          body: (
            <>
              Не сме задължени и не сме готови да участваме в процедури за решаване на
              спорове пред потребителска арбитражна комисия.
            </>
          ),
        },
      ],
    },
  },
  datenschutz: {
    title: { de: 'Datenschutzerklaerung', bg: 'Декларация за поверителност' },
    sections: {
      de: [
        {
          heading: 'Verantwortlicher',
          body: (
            <>
              Verantwortlich fuer die Datenverarbeitung auf dieser Website ist die
              Tarifberater24 (Marke: Finanzberater BG), erreichbar unter{' '}
              <a href="mailto:info@finanzberaterbg.de">info@finanzberaterbg.de</a>.
            </>
          ),
        },
        {
          heading: 'Welche Daten wir verarbeiten',
          body: (
            <>
              Bei einer Bestellung verarbeiten wir die von Ihnen angegebene
              E-Mail-Adresse sowie die Bestelldaten (Produkt, Betrag, Zeitpunkt), um
              Ihre Bestellung abzuwickeln und Ihnen das gekaufte Dokument zuzusenden.
            </>
          ),
        },
        {
          heading: 'Zahlungsabwicklung durch Mollie',
          body: (
            <>
              Die Zahlung wird ueber den Zahlungsdienstleister Mollie B.V.
              (Keizersgracht 126, 1015 CW Amsterdam, Niederlande) abgewickelt. Ihre
              Zahlungsdaten werden direkt an Mollie uebermittelt und von uns nicht
              gespeichert. Es gilt die Datenschutzerklaerung von Mollie.
            </>
          ),
        },
        {
          heading: 'E-Mail-Versand',
          body: (
            <>
              Fuer den Versand von Bestellbestaetigungen und Dokumenten nutzen wir den
              Dienst Resend. Dabei wird Ihre E-Mail-Adresse an den Dienst uebermittelt.
            </>
          ),
        },
        {
          heading: 'Speicherdauer und Ihre Rechte',
          body: (
            <>
              Wir speichern Ihre Daten nur so lange, wie es fuer die Abwicklung
              erforderlich ist oder gesetzliche Aufbewahrungsfristen es verlangen. Sie
              haben das Recht auf Auskunft, Berichtigung, Loeschung, Einschraenkung der
              Verarbeitung sowie Datenuebertragbarkeit. Wenden Sie sich dazu an{' '}
              <a href="mailto:info@finanzberaterbg.de">info@finanzberaterbg.de</a>.
            </>
          ),
        },
      ],
      bg: [
        {
          heading: 'Администратор на лични данни',
          body: (
            <>
              Администратор на личните данни в този сайт е Tarifberater24 (марка:
              Finanzberater BG), връзка:{' '}
              <a href="mailto:info@finanzberaterbg.de">info@finanzberaterbg.de</a>.
            </>
          ),
        },
        {
          heading: 'Какви данни обработваме',
          body: (
            <>
              При поръчка обработваме посочения от Вас имейл адрес и данните за
              поръчката (продукт, сума, дата и час), за да изпълним поръчката и да Ви
              изпратим закупения документ.
            </>
          ),
        },
        {
          heading: 'Обработка на плащанията чрез Mollie',
          body: (
            <>
              Плащането се обработва чрез доставчика на платежни услуги Mollie B.V.
              (Keizersgracht 126, 1015 CW Amsterdam, Нидерландия). Данните за плащането
              се предават директно на Mollie и не се съхраняват от нас. Прилага се
              декларацията за поверителност на Mollie.
            </>
          ),
        },
        {
          heading: 'Изпращане на имейли',
          body: (
            <>
              За изпращане на потвърждения за поръчка и документи използваме услугата
              Resend. При това Вашият имейл адрес се предава на услугата.
            </>
          ),
        },
        {
          heading: 'Срок на съхранение и Вашите права',
          body: (
            <>
              Съхраняваме данните Ви само толкова, колкото е необходимо за изпълнение
              на поръчката или колкото изискват законовите срокове. Имате право на
              достъп, коригиране, изтриване, ограничаване на обработката и преносимост
              на данните. Свържете се с нас на{' '}
              <a href="mailto:info@finanzberaterbg.de">info@finanzberaterbg.de</a>.
            </>
          ),
        },
      ],
    },
  },
  agb: {
    title: { de: 'Allgemeine Geschaeftsbedingungen', bg: 'Общи условия' },
    sections: {
      de: [
        {
          heading: '1. Geltungsbereich',
          body: (
            <>
              Diese Bedingungen gelten fuer alle Bestellungen von digitalen Inhalten und
              Beratungsleistungen ueber die Website finanzberaterbg.de. Anbieter ist
              Tarifberater24 (Marke: Finanzberater BG).
            </>
          ),
        },
        {
          heading: '2. Vertragsschluss',
          body: (
            <>
              Mit dem Abschluss des Bezahlvorgangs geben Sie ein verbindliches Angebot
              zum Kauf der gewaehlten Leistung ab. Der Vertrag kommt mit der
              Bestellbestaetigung per E-Mail zustande.
            </>
          ),
        },
        {
          heading: '3. Preise und Zahlung',
          body: (
            <>
              Alle Preise sind Endpreise in Euro. Die Zahlung erfolgt ueber Mollie per
              iDEAL, Kreditkarte oder Bankueberweisung. Der Betrag ist sofort faellig.
            </>
          ),
        },
        {
          heading: '4. Bereitstellung digitaler Inhalte',
          body: (
            <>
              Handbuecher werden nach Zahlungseingang unverzueglich per E-Mail als PDF
              bereitgestellt. Beratungsleistungen werden nach Terminvereinbarung
              erbracht.
            </>
          ),
        },
        {
          heading: '5. Widerrufsrecht',
          body: (
            <>
              Bei digitalen Inhalten erlischt das Widerrufsrecht, sobald wir mit der
              Ausfuehrung begonnen haben und Sie dem ausdruecklich zugestimmt haben.
              Bitte pruefen Sie vor der Bestellung, ob die Leistung zu Ihnen passt.
            </>
          ),
        },
        {
          heading: '6. Haftung und Schlussbestimmungen',
          body: (
            <>
              Unsere Empfehlungen erstellen wir nach bestem Wissen, ersetzen jedoch
              keine individuelle Rechts- oder Steuerberatung. Es gilt deutsches Recht.
            </>
          ),
        },
      ],
      bg: [
        {
          heading: '1. Приложно поле',
          body: (
            <>
              Тези условия се прилагат за всички поръчки на цифрово съдържание и
              консултантски услуги чрез сайта finanzberaterbg.de. Доставчик е
              Tarifberater24 (марка: Finanzberater BG).
            </>
          ),
        },
        {
          heading: '2. Сключване на договор',
          body: (
            <>
              С приключване на плащането Вие правите обвързваща оферта за покупка на
              избраната услуга. Договорът се сключва с потвърждението на поръчката по
              имейл.
            </>
          ),
        },
        {
          heading: '3. Цени и плащане',
          body: (
            <>
              Всички цени са крайни, в евро. Плащането се извършва чрез Mollie с iDEAL,
              кредитна карта или банков превод. Сумата е дължима незабавно.
            </>
          ),
        },
        {
          heading: '4. Предоставяне на цифрово съдържание',
          body: (
            <>
              Наръчниците се предоставят като PDF по имейл веднага след получаване на
              плащането. Консултантските услуги се извършват след уговорка за дата.
            </>
          ),
        },
        {
          heading: '5. Право на отказ',
          body: (
            <>
              При цифрово съдържание правото на отказ отпада, след като започнем
              изпълнението и Вие изрично сте се съгласили. Моля, проверете преди
              поръчка дали услугата Ви подхожда.
            </>
          ),
        },
        {
          heading: '6. Отговорност и заключителни разпоредби',
          body: (
            <>
              Препоръките си изготвяме добросъвестно, но те не заменят индивидуална
              правна или данъчна консултация. Прилага се германското право.
            </>
          ),
        },
      ],
    },
  },
}

export function LegalPage({ slug }: { slug: string }) {
  const { lang } = useLang()
  const page = pages[slug]
  if (!page) return null
  const sections = page.sections[lang]

  return (
    <>
      <Header />
      <main className="subpage">
        <div className="container">
          <div className="sub-hero">
            <p className="eyebrow">Finanzberater BG</p>
            <h1>{page.title[lang]}</h1>
          </div>
          <div className="legal-body">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </section>
            ))}
            <p className="legal-note">
              {lang === 'de'
                ? 'Hinweis: Die mit [ ] markierten Angaben sind vor dem produktiven Einsatz zu ergaenzen.'
                : 'Забележка: Данните в [ ] трябва да бъдат попълнени преди публикуване.'}
            </p>
            <Link className="text-link" href="/">
              {lang === 'de' ? 'Zurueck zur Startseite' : 'Начало'}{' '}
              <span>↗</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default LegalPage
