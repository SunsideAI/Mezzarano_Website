import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | Mezzarano Immobilien',
  description: 'Impressum und rechtliche Angaben von Sandro Mezzarano – Handelsvertreter der Wüstenrot Immobilien GmbH in Hermeskeil.',
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
            <div className="mb-10">
              <p className="text-wuestennacht font-semibold text-lg">Sandro Mezzarano</p>
              <p className="text-wuestennacht-light">
                Handelsvertreter der Wüstenrot Immobilien GmbH, Kornwestheim
              </p>
              <p className="text-wuestennacht-light mt-4">
                Saarstraße 1<br />
                54411 Hermeskeil
              </p>
              <p className="text-wuestennacht-light mt-4">
                Telefon: <a href="tel:01776542977" className="text-wuestenrot hover:underline">0177 6542977</a><br />
                Telefon: <a href="tel:065039523963" className="text-wuestenrot hover:underline">06503 9523963</a><br />
                E-Mail: <a href="mailto:sandro.mezzarano@wuestenrot.de" className="text-wuestenrot hover:underline">sandro.mezzarano@wuestenrot.de</a>
              </p>
              <p className="text-wuestennacht-light mt-4">
                Gewerbeerlaubnis nach § 34c Gewerbeordnung erteilt
              </p>
            </div>

            {/* Zuständige Aufsichtsbehörde */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-xl font-semibold text-wuestennacht mb-4">Zuständige Aufsichtsbehörde</h2>
              <p className="text-wuestennacht-light">
                Kreisverwaltung Trier-Saarburg<br />
                Willy-Brandt-Platz 1<br />
                54290 Trier
              </p>
            </div>

            {/* Zuständige Kammer */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-xl font-semibold text-wuestennacht mb-4">Zuständige Kammer</h2>
              <p className="text-wuestennacht-light">
                IHK Trier
              </p>
            </div>

            {/* Redaktionell Verantwortlicher */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-xl font-semibold text-wuestennacht mb-4">Redaktionell Verantwortlicher</h2>
              <p className="text-wuestennacht-light">
                Sandro Mezzarano, Saarstraße 1, 54411 Hermeskeil
              </p>
            </div>

            {/* Rechtshinweise */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-xl font-semibold text-wuestennacht mb-4">Rechtshinweise</h2>
              <p className="text-wuestennacht-light">
                Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            {/* EU-Streitschlichtung */}
            <div className="border-t border-gray-300 pt-8 mt-8 mb-4">
              <h2 className="text-xl font-semibold text-wuestennacht mb-4">EU-Streitschlichtung</h2>
              <p className="text-wuestennacht-light mb-2">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              </p>
              <p className="text-wuestennacht-light mb-4">
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wuestenrot hover:underline break-all"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-wuestennacht-light">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
