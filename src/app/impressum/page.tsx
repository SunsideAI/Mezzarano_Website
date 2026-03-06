import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | Mezzarano Immobilien',
  description: 'Impressum und rechtliche Angaben von Sandro Mezzarano – Wüstenrot Immobilienberater in Hermeskeil.',
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-warmgrau">
      {/* Header */}
      <section className="bg-wuestennacht py-16 md:py-20">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Impressum</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl">

            {/* Angaben gemäß § 5 TMG */}
            <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Angaben gemäß § 5 TMG</h2>

            <div className="mb-8">
              <p className="text-wuestennacht font-semibold">Sandro Mezzarano</p>
              <p className="text-wuestennacht-light">
                Handelsvertreter für die Wüstenrot Immobilien GmbH<br />
                Saarstraße 1<br />
                54411 Hermeskeil
              </p>
            </div>

            <h3 className="text-lg font-semibold text-wuestennacht mb-2">Kontakt</h3>
            <div className="mb-8">
              <p className="text-wuestennacht-light">
                Telefon: <a href="tel:01776542977" className="text-wuestenrot hover:underline">0177 6542977</a><br />
                Telefon: <a href="tel:065039523963" className="text-wuestenrot hover:underline">06503 9523963</a><br />
                E-Mail: <a href="mailto:sandro.mezzarano@wuestenrot.de" className="text-wuestenrot hover:underline">sandro.mezzarano@wuestenrot.de</a>
              </p>
            </div>

            <h3 className="text-lg font-semibold text-wuestennacht mb-2">Berufsbezeichnung und berufsrechtliche Regelungen</h3>
            <div className="mb-8">
              <p className="text-wuestennacht-light">
                Berufsbezeichnung: Immobilienmakler<br />
                Gewerbeerlaubnis nach § 34c Gewerbeordnung erteilt.<br />
                Zuständige Kammer: IHK Trier
              </p>
            </div>

            <h3 className="text-lg font-semibold text-wuestennacht mb-2">Erlaubnis nach § 34c GewO</h3>
            <div className="mb-8">
              <p className="text-wuestennacht-light">
                Die Erlaubnis nach § 34c Gewerbeordnung wurde erteilt durch:<br />
                Kreisverwaltung Trier-Saarburg<br />
                Willy-Brandt-Platz 1<br />
                54290 Trier
              </p>
            </div>

            <h3 className="text-lg font-semibold text-wuestennacht mb-2">Zuständige Aufsichtsbehörde</h3>
            <div className="mb-8">
              <p className="text-wuestennacht-light">
                Kreisverwaltung Trier-Saarburg<br />
                Willy-Brandt-Platz 1<br />
                54290 Trier
              </p>
            </div>

            {/* Wüstenrot Immobilien GmbH */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Wüstenrot Immobilien GmbH</h2>

              <div className="mb-8">
                <p className="text-wuestennacht-light">
                  W&amp;W-Platz 1<br />
                  70806 Kornwestheim, Deutschland
                </p>
              </div>

              <div className="mb-8">
                <p className="text-wuestennacht-light">
                  Telefon: 07141 167562-00<br />
                  Telefax: 07141 1662-17<br />
                  E-Mail: <a href="mailto:info@wuestenrot-immobilien.de" className="text-wuestenrot hover:underline">info@wuestenrot-immobilien.de</a><br />
                  Webseite: <a href="https://www.wuestenrot-immobilien.de" target="_blank" rel="noopener noreferrer" className="text-wuestenrot hover:underline">www.wuestenrot-immobilien.de</a>
                </p>
              </div>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Geschäftsführer</h3>
              <div className="mb-8">
                <p className="text-wuestennacht-light">Jochen Dörner</p>
              </div>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Sitz</h3>
              <div className="mb-8">
                <p className="text-wuestennacht-light">Ludwigsburg</p>
              </div>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Registergericht</h3>
              <div className="mb-8">
                <p className="text-wuestennacht-light">Amtsgericht Stuttgart HRB 720509</p>
              </div>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">USt-IdNr.</h3>
              <div className="mb-8">
                <p className="text-wuestennacht-light">
                  DE 811298753<br />
                  Gewerbeerlaubnis nach § 34c Gewerbeordnung erteilt.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Zuständige Aufsichtsbehörde</h3>
              <div className="mb-8">
                <p className="text-wuestennacht-light">IHK Region Stuttgart</p>
              </div>
            </div>

            {/* Streitschlichtung */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Streitschlichtung</h2>
              <p className="text-wuestennacht-light mb-4">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-wuestenrot hover:underline break-all">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-wuestennacht-light">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            {/* Haftung für Inhalte */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Haftung für Inhalte</h2>
              <p className="text-wuestennacht-light mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="text-wuestennacht-light">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>

            {/* Haftung für Links */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Haftung für Links</h2>
              <p className="text-wuestennacht-light mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
              <p className="text-wuestennacht-light">
                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </div>

            {/* Urheberrecht */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Urheberrecht</h2>
              <p className="text-wuestennacht-light mb-4">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p className="text-wuestennacht-light">
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>

            {/* Bildnachweise */}
            <div className="border-t border-gray-300 pt-8 mt-8 mb-4">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Bildnachweise</h2>
              <p className="text-wuestennacht-light">
                Die auf dieser Website verwendeten Bilder stammen aus eigener Produktion, von der Wüstenrot Immobilien GmbH oder von lizenzierten Bildquellen. Immobilienbilder werden von den jeweiligen Eigentümern zur Verfügung gestellt.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
