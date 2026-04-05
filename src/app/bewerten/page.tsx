import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, BarChart3, Clock, Shield, FileText, Phone, ArrowRight, Home, TrendingUp, Calculator, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Kostenlose Immobilienbewertung in Hermeskeil, Trier & Mosel | Mezzarano',
  description: 'Professionelle und kostenlose Immobilienbewertung in Hermeskeil, Trier und der Moselregion. Erfahren Sie den aktuellen Marktwert Ihrer Immobilie.',
}

const benefits = [
  {
    icon: BarChart3,
    title: 'Fundierte Analyse',
    description: 'Basierend auf aktuellen Marktdaten und vergleichbaren Verkäufen in der Region.',
  },
  {
    icon: Clock,
    title: 'Schnell & Unkompliziert',
    description: 'Terminvereinbarung innerhalb von 48 Stunden, Bewertung vor Ort.',
  },
  {
    icon: Shield,
    title: '100% Kostenlos',
    description: 'Unsere Erstbewertung ist für Sie völlig kostenlos und unverbindlich.',
  },
  {
    icon: FileText,
    title: 'Schriftlich dokumentiert',
    description: 'Sie erhalten ein detailliertes Wertgutachten mit allen relevanten Faktoren.',
  },
]

const valuationFactors = [
  {
    title: 'Lage & Umgebung',
    description: 'Mikro- und Makrolage, Infrastruktur, Nachbarschaft, Verkehrsanbindung',
    icon: MapPin,
  },
  {
    title: 'Objektzustand',
    description: 'Bausubstanz, Modernisierungsstand, Ausstattung, Instandhaltung',
    icon: Home,
  },
  {
    title: 'Marktentwicklung',
    description: 'Aktuelle Preisentwicklung, Nachfrage, vergleichbare Verkäufe',
    icon: TrendingUp,
  },
  {
    title: 'Objektmerkmale',
    description: 'Wohnfläche, Grundstück, Baujahr, Energieeffizienz, Extras',
    icon: Calculator,
  },
]

const valuationTypes = [
  {
    title: 'Verkaufsbewertung',
    description: 'Sie möchten Ihre Immobilie verkaufen und den optimalen Angebotspreis ermitteln.',
    suitable: ['Eigenheimbesitzer', 'Erbengemeinschaften', 'Investoren'],
  },
  {
    title: 'Erbschaft & Schenkung',
    description: 'Wertermittlung für steuerliche Zwecke bei Erbschaft oder Schenkung einer Immobilie.',
    suitable: ['Erben', 'Schenkende', 'Steuerberater'],
  },
  {
    title: 'Scheidung & Trennung',
    description: 'Neutrale Wertermittlung zur fairen Aufteilung des gemeinsamen Immobilienvermögens.',
    suitable: ['Ehepaare', 'Rechtsanwälte', 'Mediatoren'],
  },
  {
    title: 'Finanzierung',
    description: 'Werteinschätzung als Grundlage für Finanzierungsgespräche oder Anschlussfinanzierung.',
    suitable: ['Käufer', 'Eigentümer', 'Banken'],
  },
]

const priceRanges = [
  { region: 'Hermeskeil', house: '1.600 - 2.200', apartment: '1.400 - 1.800' },
  { region: 'Trier Zentrum', house: '2.500 - 3.500', apartment: '2.200 - 3.000' },
  { region: 'Trier Umland', house: '1.800 - 2.500', apartment: '1.600 - 2.200' },
  { region: 'Schweich', house: '2.100 - 2.700', apartment: '1.900 - 2.400' },
  { region: 'Bernkastel-Kues', house: '1.800 - 2.500', apartment: '1.600 - 2.200' },
  { region: 'Hochwald', house: '1.400 - 2.000', apartment: '1.200 - 1.600' },
]

export default function BewertenPage() {
  return (
    <div className="min-h-screen">
      {/* Hero with Wüstenrot Layout-Prinzipien */}
      <section className="relative min-h-[auto] py-12 md:py-0 md:min-h-[600px] bg-wuestennacht flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero/AdobeStock_265469422.jpeg')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-wuestennacht/85" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Tagline - Icon + Text in wuestenrot */}
              <div className="flex items-center gap-2 text-wuestenrot mb-6" data-aos="fade-up">
                <BarChart3 className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Immobilienbewertung
                </span>
              </div>

              {/* Headline with White Bars - keine Abstände zwischen Balken */}
              <h1 className="mb-8" data-aos="fade-up" data-aos-delay="100">
                <span className="flex flex-col items-start gap-0">
                  <span className="inline-block w-fit whitespace-nowrap bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none lowercase text-wuestennacht">
                    was ist ihre
                  </span>
                  <span className="inline-block w-fit whitespace-nowrap bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none lowercase text-wuestennacht">
                    immobilie wert?
                  </span>
                  <span className="inline-block w-fit whitespace-nowrap bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none text-wuestenrot">
                    wüstenrot
                  </span>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl" data-aos="fade-up" data-aos-delay="200">
                Erfahren Sie den aktuellen Marktwert Ihrer Immobilie - kostenlos, unverbindlich und von einem lokalen Experten mit fundierter Marktkenntnis.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4" data-aos="fade-up" data-aos-delay="300">
                <Link href="/kontakt" className="btn-primary">
                  Kostenlose Bewertung anfragen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a href="tel:01776542977" className="btn-outline border-white text-white hover:bg-white hover:text-wuestennacht">
                  <Phone className="h-5 w-5 mr-2" />
                  0177 6542977
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block" data-aos="fade-left">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Jetzt Bewertung starten</h3>
                <ul className="space-y-4 text-white mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-wuestenrot" />
                    <span>Termin innerhalb von 48 Stunden</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-wuestenrot" />
                    <span>Persönliche Vor-Ort-Besichtigung</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-wuestenrot" />
                    <span>Schriftliches Wertgutachten</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-wuestenrot" />
                    <span>100% kostenlos & unverbindlich</span>
                  </li>
                </ul>
                <Link href="/kontakt" className="btn-primary w-full justify-center bg-white text-wuestenrot hover:bg-gray-100">
                  Bewertung anfragen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Bewertungs-Tool */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="section-title mb-4">Schnelle Online-Bewertung</h2>
            <p className="section-subtitle mx-auto">
              Erhalten Sie in wenigen Minuten eine erste Einschätzung zum Wert Ihrer Immobilie
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl bg-white" data-aos="fade-up">
            <iframe
              src="https://wuestenrot-immobilien.de/makler-depot-iframe/?frame_version=wi&api=mw-mezzarano-hermeskeil&id=1699"
              width="100%"
              height="800"
              style={{ border: 0 }}
              title="Wüstenrot Immobilienbewertung - Ermitteln Sie den Wert Ihrer Immobilie"
              loading="lazy"
              allowFullScreen
            />
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Für eine präzise Vor-Ort-Bewertung kontaktieren Sie mich gerne persönlich.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title mb-4">Ihre Vorteile</h2>
            <p className="section-subtitle mx-auto">
              Professionelle Bewertung durch einen lokalen Experten
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white p-8 rounded-xl text-center group hover:shadow-xl transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500 transition-colors">
                  <benefit.icon className="h-8 w-8 text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valuation Factors */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="section-title mb-6">Was beeinflusst den Immobilienwert?</h2>
              <p className="text-gray-600 mb-8">
                Eine fundierte Immobilienbewertung berücksichtigt zahlreiche Faktoren. Als lokaler Experte kenne ich die Besonderheiten der Region Hermeskeil, Trier und Mosel genau.
              </p>
              <div className="space-y-6">
                {valuationFactors.map((factor) => (
                  <div key={factor.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <factor.icon className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{factor.title}</h4>
                      <p className="text-gray-600 text-sm">{factor.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto">
                <Image
                  src="/images/team/Mezzarano.jpg"
                  alt="Sandro Mezzarano - Ihr Immobilienexperte für Bewertungen"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Overview */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title mb-4">Preisübersicht Region Trier-Mosel</h2>
            <p className="section-subtitle mx-auto">
              Durchschnittliche Quadratmeterpreise in Euro (Stand 2024)
            </p>
          </div>

          <div className="overflow-x-auto" data-aos="fade-up">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-secondary-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Region</th>
                  <th className="px-6 py-4 text-left font-semibold">Haus (€/m²)</th>
                  <th className="px-6 py-4 text-left font-semibold">Wohnung (€/m²)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {priceRanges.map((row, index) => (
                  <tr key={row.region} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.region}</td>
                    <td className="px-6 py-4 text-gray-600">{row.house} €</td>
                    <td className="px-6 py-4 text-gray-600">{row.apartment} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            * Richtwerte können je nach Lage, Zustand und Ausstattung abweichen
          </p>
        </div>
      </section>

      {/* Valuation Types */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title mb-4">Bewertungsanlässe</h2>
            <p className="section-subtitle mx-auto">
              Für jeden Anlass die passende Bewertung
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {valuationTypes.map((type, index) => (
              <div
                key={type.title}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.suitable.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-primary-500">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Jetzt kostenlose Bewertung anfragen
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Erfahren Sie den aktuellen Marktwert Ihrer Immobilie - unverbindlich und kostenfrei.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary bg-white text-primary-500 hover:bg-gray-100">
              Bewertung anfragen
            </Link>
            <a href="tel:01776542977" className="btn-outline-dark">
              <Phone className="h-5 w-5 mr-2" />
              0177 6542977
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
