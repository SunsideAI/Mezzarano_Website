import Link from 'next/link'
import Image from 'next/image'
import { MapPin, TrendingUp, Home, Users, Building, ArrowRight, CheckCircle, Phone } from 'lucide-react'
import SchemaMarkup, { generateLocalBusinessSchema, generateFAQSchema } from '@/components/SchemaMarkup'
import FAQSection from '@/components/FAQSection'

export const metadata = {
  title: 'Immobilien Heilbronn | Mezzarano - Ihr lokaler Immobilienexperte',
  description: 'Immobilien in Heilbronn kaufen, verkaufen oder mieten. Ihr Wüstenrot Immobilienberater mit lokaler Expertise. Kostenlose Bewertung & persönliche Beratung.',
  keywords: 'Immobilien Heilbronn, Haus kaufen Heilbronn, Wohnung mieten Heilbronn, Immobilienmakler Heilbronn, Wüstenrot'
}

const stats = [
  { value: '125.000+', label: 'Einwohner' },
  { value: '3.500 €', label: 'Ø Preis/m² Wohnung' },
  { value: '450.000 €', label: 'Ø Hauspreis' },
  { value: '+4,2%', label: 'Preisentwicklung/Jahr' },
]

const stadtteile = [
  { name: 'Innenstadt', preisSpanne: '3.500 - 4.500 €/m²', trend: 'stabil' },
  { name: 'Böckingen', preisSpanne: '3.000 - 3.800 €/m²', trend: 'steigend' },
  { name: 'Sontheim', preisSpanne: '3.200 - 4.000 €/m²', trend: 'steigend' },
  { name: 'Neckargartach', preisSpanne: '2.900 - 3.600 €/m²', trend: 'stabil' },
  { name: 'Frankenbach', preisSpanne: '2.800 - 3.400 €/m²', trend: 'steigend' },
  { name: 'Klingenberg', preisSpanne: '3.100 - 3.800 €/m²', trend: 'stabil' },
]

const faqs = [
  {
    question: 'Wie entwickeln sich die Immobilienpreise in Heilbronn?',
    answer: 'Die Immobilienpreise in Heilbronn zeigen eine stabile bis leicht steigende Tendenz. In den letzten Jahren stiegen die Preise durchschnittlich um 3-5% jährlich. Besonders gefragt sind zentrale Lagen und Stadtteile mit guter Infrastruktur.'
  },
  {
    question: 'Welche Stadtteile in Heilbronn sind besonders empfehlenswert?',
    answer: 'Für Familien sind Sontheim und Frankenbach beliebt, da sie ruhig und grün sind. Böckingen bietet ein gutes Preis-Leistungs-Verhältnis. Die Innenstadt und der Neckarbogen sind ideal für urbanes Wohnen mit kurzen Wegen.'
  },
  {
    question: 'Was kostet eine Immobilienbewertung in Heilbronn?',
    answer: 'Bei Mezzarano Immobilien erhalten Sie eine kostenlose Erstbewertung Ihrer Immobilie. Für ein ausführliches Gutachten arbeiten wir mit zertifizierten Sachverständigen zusammen.'
  },
  {
    question: 'Wie lange dauert der Immobilienverkauf in Heilbronn durchschnittlich?',
    answer: 'Mit professioneller Vermarktung dauert der Verkauf einer Immobilie in Heilbronn durchschnittlich 3-6 Monate. Gut gepflegte Objekte in beliebten Lagen werden oft schneller verkauft.'
  },
  {
    question: 'Bieten Sie auch Unterstützung bei der Finanzierung?',
    answer: 'Ja, als Wüstenrot Partner bieten wir umfassende Finanzierungsberatung inkl. Bausparverträge und KfW-Fördermittel. So erhalten Sie Immobilie und Finanzierung aus einer Hand.'
  },
]

export default function HeilbronnPage() {
  return (
    <>
      <SchemaMarkup data={generateLocalBusinessSchema()} />
      <SchemaMarkup data={generateFAQSchema(faqs)} />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 text-primary-400 mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">Region Heilbronn</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Immobilien in Heilbronn
                </h1>
                <p className="text-xl text-secondary-300 mb-8">
                  Ihr Wüstenrot Immobilienberater mit lokaler Expertise. Wir kennen den Markt
                  und finden die perfekte Immobilie für Sie – ob zum Kauf, Verkauf oder zur Miete.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/kontakt" className="btn-primary">
                    Kostenlose Beratung
                  </Link>
                  <Link href="/immobilien?location=heilbronn" className="btn-outline">
                    Immobilien ansehen
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                  >
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-secondary-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Heilbronn */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="section-title mb-6">
                  Heilbronn – Lebensqualität im Wirtschaftszentrum
                </h2>
                <p className="text-secondary-600 mb-6">
                  Heilbronn ist das pulsierende Zentrum der Region Heilbronn-Franken. Mit über 125.000
                  Einwohnern bietet die Stadt eine einzigartige Mischung aus wirtschaftlicher Stärke,
                  kulturellem Angebot und hoher Lebensqualität.
                </p>
                <p className="text-secondary-600 mb-6">
                  Die Bundesgartenschau 2019 hat das Stadtbild nachhaltig geprägt. Der Neckarbogen ist
                  zu einem modernen Wohnquartier geworden, die Experimenta zieht Besucher aus ganz
                  Deutschland an.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    'Starker Arbeitsmarkt mit Audi, Schwarz-Gruppe u.a.',
                    'Hervorragende Verkehrsanbindung (A6, A81, Bahn)',
                    'Hochschule und innovative Forschungseinrichtungen',
                    'Vielfältiges Kulturangebot und Weinregion',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span className="text-secondary-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/ueber-uns" className="inline-flex items-center text-primary-500 font-semibold hover:text-primary-600">
                  Mehr über uns
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                    alt="Heilbronn Stadtansicht"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary-500 text-white p-6 rounded-xl shadow-xl">
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm">Jahre Erfahrung<br />in Heilbronn</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stadtteile */}
        <section className="py-20 bg-secondary-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Immobilienpreise nach Stadtteil</h2>
              <p className="section-subtitle mx-auto">
                Aktuelle Durchschnittspreise für Eigentumswohnungen in Heilbronn
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stadtteile.map((stadtteil) => (
                <div key={stadtteil.name} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-serif text-xl font-bold text-secondary-900">
                      {stadtteil.name}
                    </h3>
                    <span className={`badge ${
                      stadtteil.trend === 'steigend' ? 'badge-primary' : 'badge-secondary'
                    }`}>
                      {stadtteil.trend === 'steigend' ? (
                        <><TrendingUp className="h-3 w-3 mr-1" /> Steigend</>
                      ) : (
                        'Stabil'
                      )}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-primary-500 mb-2">
                    {stadtteil.preisSpanne}
                  </p>
                  <p className="text-sm text-secondary-500">
                    Durchschnittliche Quadratmeterpreise
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-secondary-500 mt-8 text-sm">
              * Preise sind Richtwerte und können je nach Lage, Zustand und Ausstattung variieren.
              Stand: Januar 2024
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Unsere Leistungen in Heilbronn</h2>
              <p className="section-subtitle mx-auto">
                Full-Service für Ihre Immobilie – von der Bewertung bis zur Finanzierung
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500 transition-colors">
                  <Home className="h-8 w-8 text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-xl font-bold text-secondary-900 mb-3">
                  Immobilien kaufen
                </h3>
                <p className="text-secondary-600 mb-4">
                  Finden Sie Ihr Traumobjekt in Heilbronn. Wir begleiten Sie von der Suche bis zum Notartermin.
                </p>
                <Link href="/immobilien?type=kauf&location=heilbronn" className="text-primary-500 font-semibold hover:text-primary-600">
                  Angebote ansehen →
                </Link>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500 transition-colors">
                  <Building className="h-8 w-8 text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-xl font-bold text-secondary-900 mb-3">
                  Immobilie verkaufen
                </h3>
                <p className="text-secondary-600 mb-4">
                  Professionelle Vermarktung und Bestpreis für Ihre Immobilie. Kostenlose Bewertung inklusive.
                </p>
                <Link href="/leistungen/verkauf" className="text-primary-500 font-semibold hover:text-primary-600">
                  Mehr erfahren →
                </Link>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500 transition-colors">
                  <Users className="h-8 w-8 text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-xl font-bold text-secondary-900 mb-3">
                  Finanzierung
                </h3>
                <p className="text-secondary-600 mb-4">
                  Als Wüstenrot Partner bieten wir attraktive Finanzierungskonditionen und Bausparlösungen.
                </p>
                <Link href="/leistungen/finanzierung" className="text-primary-500 font-semibold hover:text-primary-600">
                  Beratung anfragen →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          title="Häufige Fragen zu Immobilien in Heilbronn"
          faqs={faqs}
        />

        {/* CTA */}
        <section className="py-20 bg-primary-500">
          <div className="container-custom text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
              Ihr Immobilienexperte in Heilbronn
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Ob Kauf, Verkauf oder Finanzierung – Herr Mezzarano berät Sie persönlich
              und kompetent zu allen Fragen rund um Immobilien in Heilbronn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt" className="btn-primary bg-white text-primary-500 hover:bg-secondary-100">
                Beratungstermin vereinbaren
              </Link>
              <a href="tel:+4971311234567" className="btn-outline flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" />
                +49 7131 123 4567
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
