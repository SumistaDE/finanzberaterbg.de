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
              Inhaber: Svetlozarov Gitsov
              <br />
              Rechtsform: Gewerbe
              <br />
              Hospitalstr. 30
              <br />
              66798 Wallerfangen
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
              Telefon:{' '}
              <a href="tel:+4915750171967">+49 1575 0171967</a>
            </>
          ),
        },
        {
          heading: 'Umsatzsteuer',
          body: (
            <>
              Als Kleinunternehmer im Sinne des § 19 UStG wird keine Umsatzsteuer
              berechnet und daher nicht ausgewiesen. Eine Umsatzsteuer-Identifikationsnummer
              liegt nicht vor.
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
              Собственик: Светлозаров Гицов
              <br />
              Правна форма: Gewerbe (регистрирана търговска дейност)
              <br />
              Hospitalstr. 30
              <br />
              66798 Wallerfangen
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
              Телефон:{' '}
              <a href="tel:+4915750171967">+49 1575 0171967</a>
            </>
          ),
        },
        {
          heading: 'ДДС',
          body: (
            <>
              Като малък предприемач по § 19 от германския закон за ДДС (UStG) не се
              начислява ДДС и затова не се посочва. Идентификационен номер по ДДС не е
              наличен.
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
          heading: 'Hosting und Server-Logfiles',
          body: (
            <>
              Diese Website wird bei Vercel Inc. (440 N Barranca Ave #4133, Covina, CA
              91723, USA) gehostet. Beim Aufruf verarbeitet der Server automatisch
              technische Zugriffsdaten (IP-Adresse, Datum und Uhrzeit, aufgerufene
              Seite, Browsertyp, Betriebssystem). Diese Daten sind fuer den sicheren und
              stabilen Betrieb erforderlich (Art. 6 Abs. 1 lit. f DSGVO) und werden
              nicht mit anderen Datenquellen zusammengefuehrt.
            </>
          ),
        },
        {
          heading: 'Cookies und Reichweitenmessung',
          body: (
            <>
              Wir setzen keine Marketing- oder Tracking-Cookies ein. Zur anonymen
              Reichweitenmessung nutzen wir Vercel Analytics, das ohne Cookies arbeitet
              und keine Besucher ueber Websites hinweg verfolgt; die Auswertung erfolgt
              aggregiert und anonymisiert (Art. 6 Abs. 1 lit. f DSGVO - Interesse an der
              Verbesserung unseres Angebots). Sie koennen die Ausfuehrung von
              Analyseskripten in Ihrem Browser jederzeit blockieren.
            </>
          ),
        },
        {
          heading: 'Rechtsgrundlagen',
          body: (
            <>
              Wir verarbeiten Ihre Daten zur Vertragserfuellung (Art. 6 Abs. 1 lit. b
              DSGVO), zur Erfuellung gesetzlicher Pflichten (Art. 6 Abs. 1 lit. c DSGVO,
              z. B. Aufbewahrungsfristen) sowie auf Grundlage unseres berechtigten
              Interesses am sicheren Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO).
            </>
          ),
        },
        {
          heading: 'Datensicherheit',
          body: (
            <>
              Diese Website nutzt aus Sicherheitsgruenden eine TLS/SSL-Verschluesselung.
              Zahlungsdaten werden ausschliesslich auf den Seiten des Zahlungsdienstes
              eingegeben und von uns nicht gespeichert.
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
          heading: 'Хостинг и сървърни логове',
          body: (
            <>
              Този сайт се хоства при Vercel Inc. (440 N Barranca Ave #4133, Covina, CA
              91723, САЩ). При посещение сървърът автоматично обработва технически данни
              за достъп (IP адрес, дата и час, отворена страница, тип браузър,
              операционна система). Тези данни са необходими за сигурната и стабилна
              работа (чл. 6, ал. 1, б. „е" от GDPR) и не се обединяват с други
              източници.
            </>
          ),
        },
        {
          heading: 'Бисквитки и измерване на посещаемостта',
          body: (
            <>
              Не използваме маркетингови или проследяващи бисквитки. За анонимно
              измерване на посещаемостта използваме Vercel Analytics, който работи без
              бисквитки и не проследява посетителите между сайтове; анализът е обобщен
              и анонимизиран (чл. 6, ал. 1, б. „е" от GDPR — интерес от подобряване на
              предлагането ни). Можете по всяко време да блокирате изпълнението на
              аналитични скриптове в браузъра си.
            </>
          ),
        },
        {
          heading: 'Правни основания',
          body: (
            <>
              Обработваме данните Ви за изпълнение на договора (чл. 6, ал. 1, б. „б" от
              GDPR), за изпълнение на законови задължения (чл. 6, ал. 1, б. „в" от
              GDPR, напр. срокове за съхранение), както и на основание на законния ни
              интерес от сигурна работа на сайта (чл. 6, ал. 1, б. „е" от GDPR).
            </>
          ),
        },
        {
          heading: 'Сигурност на данните',
          body: (
            <>
              Този сайт използва TLS/SSL криптиране с цел сигурност. Данните за
              плащане се въвеждат единствено на страниците на платежната услуга и не се
              съхраняват от нас.
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
              Kreditkarte, iDEAL, Wero oder Bankueberweisung. Der Betrag ist sofort
              faellig. Vor Abschluss der Zahlung bestaetigen Sie die AGB und den
              Verzicht auf das Widerrufsrecht fuer digitale Inhalte.
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
              Verbraucher haben ein 14-taegiges Widerrufsrecht. Bei digitalen Inhalten
              erlischt es, sobald wir mit der Ausfuehrung begonnen haben und Sie dem
              vor der Zahlung ausdruecklich zugestimmt und bestaetigt haben, dass Sie
              dadurch Ihr Widerrufsrecht verlieren. Einzelheiten, Folgen und das
              Muster-Widerrufsformular finden Sie in unserer{' '}
              <a href="/widerruf">Widerrufsbelehrung</a>.
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
              Всички цени са крайни, в евро. Плащането се извършва чрез Mollie с
              кредитна карта, iDEAL, Wero или банков превод. Сумата е дължима
              незабавно. Преди приключване на плащането потвърждавате Общите условия и
              отказа от правото на отказ за цифрово съдържание.
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
              Потребителите имат 14-дневно право на отказ. При цифрово съдържание то
              отпада, след като започнем изпълнението и Вие преди плащането изрично
              сте се съгласили и сте потвърдили, че с това губите правото си на отказ.
              Подробности, последици и образец на формуляр за отказ ще намерите в
              нашата <a href="/widerruf">страница за правото на отказ</a>.
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
  widerruf: {
    title: { de: 'Widerrufsbelehrung', bg: 'Право на отказ' },
    sections: {
      de: [
        {
          heading: 'Widerrufsrecht',
          body: (
            <>
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gruenden
              diesen Vertrag zu widerrufen. Die Widerrufsfrist betraegt vierzehn Tage
              ab dem Tag des Vertragsabschlusses. Um Ihr Widerrufsrecht auszueben,
              wenden Sie sich an Tarifberater24 (Marke: Finanzberater BG),
              Hospitalstr. 30, 66798 Wallerfangen, Deutschland, E-Mail:{' '}
              <a href="mailto:info@finanzberaterbg.de">info@finanzberaterbg.de</a>,
              Telefon: <a href="tel:+4915750171967">+49 1575 0171967</a>, mit einer
              eindeutigen Erklaerung (z. B. einem Brief oder einer E-Mail). Zur
              Fristwahrung genuegt es, dass Sie die Mitteilung vor Ablauf der
              Widerrufsfrist absenden.
            </>
          ),
        },
        {
          heading: 'Folgen des Widerrufs',
          body: (
            <>
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die
              wir von Ihnen erhalten haben, unverzueglich und spaetestens binnen
              vierzehn Tagen ab dem Tag zurueckzuzahlen, an dem die Mitteilung ueber
              Ihren Widerruf bei uns eingegangen ist. Fuer die Rueckzahlung verwenden
              wir dasselbe Zahlungsmittel, das Sie bei der urspruenglichen Zahlung
              eingesetzt haben.
            </>
          ),
        },
        {
          heading: 'Vorzeitiges Erloeschen des Widerrufsrechts bei digitalen Inhalten',
          body: (
            <>
              Bei einem Vertrag ueber die Lieferung von digitalen Inhalten (z. B. dem
              Handbuch als PDF) erlischt das Widerrufsrecht, wenn wir mit der
              Ausfuehrung begonnen haben, nachdem Sie ausdruecklich zugestimmt haben
              und Sie Ihre Kenntnis davon bestaetigt haben, dass Sie durch Ihre
              Zustimmung mit Beginn der Ausfuehrung des Vertrags Ihr Widerrufsrecht
              verlieren. Diese Zustimmung geben Sie vor Abschluss der Zahlung auf der
              Produktseite ab.
            </>
          ),
        },
        {
          heading: 'Muster-Widerrufsformular',
          body: (
            <>
              (Wenn Sie den Vertrag widerrufen wollen, koennen Sie dieses Formular
              ausfuellen und zuruecksenden.) An Tarifberater24 (Finanzberater BG),
              Hospitalstr. 30, 66798 Wallerfangen, E-Mail:{' '}
              <a href="mailto:info@finanzberaterbg.de">info@finanzberaterbg.de</a>.
              Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag
              ueber den Kauf der folgenden Leistung: ______. Bestellt am: ______.
              Name des/der Verbraucher(s): ______. Anschrift des/der
              Verbraucher(s): ______. Datum, Unterschrift (nur bei Mitteilung auf
              Papier): ______.
            </>
          ),
        },
      ],
      bg: [
        {
          heading: 'Право на отказ',
          body: (
            <>
              Имате право да се откажете от този договор в срок от четиринадесет дни
              без да посочвате причина. Срокът за отказ е четиринадесет дни от деня
              на сключване на договора. За да упражните правото си на отказ, се
              свържете с Tarifberater24 (марка: Finanzberater BG), Hospitalstr. 30,
              66798 Wallerfangen, Германия, имейл:{' '}
              <a href="mailto:info@finanzberaterbg.de">info@finanzberaterbg.de</a>,
              телефон: <a href="tel:+4915750171967">+49 1575 0171967</a>, с ясно
              изявление (напр. писмо или имейл). За спазване на срока е достатъчно да
              изпратите съобщението преди изтичане на срока за отказ.
            </>
          ),
        },
        {
          heading: 'Последствия от отказа',
          body: (
            <>
              Ако се откажете от този договор, ще Ви възстановим всички получени от
              Вас плащания незабавно и не по-късно от четиринадесет дни от деня, в
              който получим съобщението за Вашия отказ. За възстановяването използваме
              същото средство за плащане, което сте използвали при първоначалното
              плащане.
            </>
          ),
        },
        {
          heading: 'Предсрочно отпадане на правото на отказ при цифрово съдържание',
          body: (
            <>
              При договор за доставка на цифрово съдържание (напр. наръчника като
              PDF) правото на отказ отпада, когато започнем изпълнението, след като
              Вие изрично сте се съгласили и сте потвърдили, че знаете, че с
              съгласието си губите правото си на отказ. Това съгласие давате преди
              приключване на плащането на продуктовата страница.
            </>
          ),
        },
        {
          heading: 'Образец на формуляр за отказ',
          body: (
            <>
              (Ако желаете да се откажете от договора, можете да попълните този
              формуляр и да го изпратите.) До Tarifberater24 (Finanzberater BG),
              Hospitalstr. 30, 66798 Wallerfangen, имейл:{' '}
              <a href="mailto:info@finanzberaterbg.de">info@finanzberaterbg.de</a>. С
              настоящото се отказвам от сключения договор за покупка на следната
              услуга: ______. Поръчано на: ______. Име на потребителя: ______. Адрес
              на потребителя: ______. Дата, подпис (само при уведомяване на хартия):
              ______.
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
