import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | Mezzarano Immobilien',
  description: 'Impressum und rechtliche Angaben von Mezzarano Immobilien - Wüstenrot Immobilienberater in Hermeskeil.',
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="py-16 bg-secondary-900">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Impressum</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Angaben gemäß § 5 TMG</h2>

              <div className="mb-8">
                <p className="text-gray-700">
                  <strong>Sandro Mezzarano</strong><br />
                  Wüstenrot Immobilienberater<br />
                  Saarstraße 1<br />
                  54411 Hermeskeil
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Kontakt</h3>
              <div className="mb-8">
                <p className="text-gray-700">
                  Telefon: <a href="tel:01776542977" className="text-primary-500 hover:text-primary-600">0177 6542977</a><br />
                  E-Mail: <a href="mailto:sandro.mezzarano@wuestenrot.de" className="text-primary-500 hover:text-primary-600">sandro.mezzarano@wuestenrot.de</a>
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Berufsbezeichnung und berufsrechtliche Regelungen</h3>
              <div className="mb-8">
                <p className="text-gray-700">
                  Berufsbezeichnung: Immobilienmakler (IHK)<br />
                  Zuständige Kammer: IHK Trier<br />
                  Verliehen in: Deutschland
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Erlaubnis nach § 34c GewO</h3>
              <div className="mb-8">
                <p className="text-gray-700">
                  Die Erlaubnis nach § 34c Gewerbeordnung wurde erteilt durch:<br />
                  Kreisverwaltung Trier-Saarburg<br />
                  Willy-Brandt-Platz 1<br />
                  54290 Trier
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Wüstenrot-Partnerschaft</h3>
              <div className="mb-8">
                <p className="text-gray-700">
                  Tätig als Handelsvertreter für:<br />
                  Wüstenrot & Württembergische AG<br />
                  Wüstenrotstraße 1<br />
                  71638 Ludwigsburg
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Aufsichtsbehörde</h3>
              <div className="mb-8">
                <p className="text-gray-700">
                  Gewerbeaufsicht der Kreisverwaltung Trier-Saarburg<br />
                  Willy-Brandt-Platz 1<br />
                  54290 Trier
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Streitschlichtung</h3>
              <div className="mb-8">
                <p className="text-gray-700">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 break-all"> https://ec.europa.eu/consumers/odr/</a>
                </p>
                <p className="text-gray-700 mt-4">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Haftung für Inhalte</h3>
              <div className="mb-8">
                <p className="text-gray-700">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="text-gray-700 mt-4">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Haftung für Links</h3>
              <div className="mb-8">
                <p className="text-gray-700">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p className="text-gray-700 mt-4">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Urheberrecht</h3>
              <div className="mb-8">
                <p className="text-gray-700">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p className="text-gray-700 mt-4">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Bildnachweise</h3>
              <div className="mb-8">
                <p className="text-gray-700">
                  Die auf dieser Website verwendeten Bilder stammen aus eigener Produktion oder von lizenzierten Bildquellen. Immobilienbilder werden von den jeweiligen Eigentümern zur Verfügung gestellt.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
