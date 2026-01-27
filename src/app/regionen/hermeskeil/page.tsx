import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Home, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react'
import SchemaMarkup, { generateFAQSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Immobilienmakler Hermeskeil | Sandro Mezzarano | Wüstenrot Immobilien',
  description: 'Ihr Immobilienexperte in Hermeskeil. Sandro Mezzarano von Wüstenrot Immobilien berät Sie kompetent beim Kauf, Verkauf und der Vermietung von Immobilien im Hochwald.',
  keywords: 'Immobilienmakler Hermeskeil, Haus kaufen Hermeskeil, Wohnung mieten Hermeskeil, Wüstenrot Immobilien, Immobilienbewertung Hochwald',
  openGraph: {
    title: 'Immobilienmakler Hermeskeil | Wüstenrot Immobilien',
    description: 'Sandro Mezzarano - Ihr lokaler Immobilienexperte für Hermeskeil und den Hochwald.',
    type: 'website',
    locale: 'de_DE',
  },
}

const highlights = [
  {
    icon: Home,
    title: 'Lokale Expertise',
    description: 'Tiefgreifende Kenntnis des Hermeskeiler Immobilienmarktes und der Hochwald-Region.'
  },
  {
    icon: TrendingUp,
    title: 'Faire Bewertung',
    description: 'Kostenlose und marktgerechte Immobilienbewertung für Verkäufer in Hermeskeil.'
  },
  {
    icon: Users,
    title: 'Persönlicher Service',
    description: 'Individuelle Betreuung von der ersten Beratung bis zum erfolgreichen Abschluss.'
  },
]

const faqItems = [
  {
    question: 'Was kostet ein Immobilienmakler in Hermeskeil?',
    answer: 'Bei Wüstenrot Immobilien Hermeskeil erhalten Sie eine kostenlose Erstberatung. Die Maklerprovision wird nur im Erfolgsfall fällig und ist marktüblich gestaffelt. Für Verkäufer bieten wir zudem eine kostenlose Immobilienbewertung an.'
  },
  {
    question: 'Wie lange dauert der Verkauf einer Immobilie in Hermeskeil?',
    answer: 'Die Verkaufsdauer hängt von verschiedenen Faktoren ab: Objektart, Zustand, Lage und Preisgestaltung. Im Durchschnitt vermitteln wir Immobilien in Hermeskeil innerhalb von 3-6 Monaten erfolgreich. Gut bewertete und fair bepreiste Objekte finden oft schneller einen Käufer.'
  },
  {
    question: 'Welche Unterlagen benötige ich für den Immobilienverkauf?',
    answer: 'Für den Verkauf benötigen wir: Grundbuchauszug, Energieausweis, Flurkarte, Wohnflächenberechnung, Baupläne (falls vorhanden) und aktuelle Nebenkostenabrechnungen. Wir unterstützen Sie gerne bei der Beschaffung fehlender Dokumente.'
  },
  {
    question: 'Wie wird der Wert meiner Immobilie in Hermeskeil ermittelt?',
    answer: 'Unsere Immobilienbewertung basiert auf einer Kombination aus Vergleichswertverfahren, Sachwertverfahren und aktueller Marktanalyse. Wir berücksichtigen Lage, Zustand, Ausstattung und die lokale Marktsituation im Hochwald.'
  },
]

export default function HermeskeilPage() {
  const faqSchema = generateFAQSchema(faqItems)

  return (
    <>
      <SchemaMarkup data={faqSchema} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/djqviyb2c/image/upload/w_1920,q_80/v1769251685/Bildschirmfoto_2026-01-24_um_11.47.29_a8ccel.png"
            alt="Immobilien in Hermeskeil"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 to-secondary-900/60" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary-400 mb-4" data-aos="fade-up">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Hermeskeil & Hochwald</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" data-aos="fade-up" data-aos-delay="100">
              Ihr Immobilienmakler in Hermeskeil
            </h1>
            <p className="text-xl text-gray-200 mb-8" data-aos="fade-up" data-aos-delay="200">
              Sandro Mezzarano – Ihr lokaler Wüstenrot Immobilienexperte für den Kauf,
              Verkauf und die Vermietung von Immobilien in Hermeskeil und der gesamten Hochwald-Region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="300">
              <Link href="/kontakt" className="btn-primary">
                Kostenlose Beratung anfragen
              </Link>
              <Link href="/immobilien?ort=Hermeskeil" className="btn-outline">
                Immobilien in Hermeskeil
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Bar */}
      <section className="bg-primary-500 text-white py-4">
        <div className="container-custom flex flex-wrap justify-center gap-6 md:gap-12 text-sm md:text-base">
          <a href="tel:01776542977" className="flex items-center gap-2 hover:text-primary-100 transition-colors">
            <Phone className="h-4 w-4" />
            <span>0177 6542977</span>
          </a>
          <a href="mailto:sandro.mezzarano@wuestenrot.de" className="flex items-center gap-2 hover:text-primary-100 transition-colors">
            <Mail className="h-4 w-4" />
            <span>sandro.mezzarano@wuestenrot.de</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Saarstraße 1, 54411 Hermeskeil</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              Immobilien in Hermeskeil – Ihre lokale Expertise
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                <strong>Hermeskeil</strong>, das Tor zum Hochwald, bietet eine attraktive Mischung aus
                ländlicher Idylle und guter Infrastruktur. Als Mittelzentrum der Region verfügt die Stadt
                über alle wichtigen Einrichtungen des täglichen Bedarfs, Schulen, Ärzte und eine gute
                Verkehrsanbindung nach Trier und in den Hunsrück.
              </p>
              <p>
                Der Immobilienmarkt in Hermeskeil zeichnet sich durch ein ausgewogenes Preis-Leistungs-Verhältnis
                aus. Ob Sie ein Einfamilienhaus mit Garten suchen, eine moderne Eigentumswohnung oder ein
                Grundstück für Ihren Neubau – als Ihr lokaler Wüstenrot Immobilienpartner kenne ich den
                Markt und finde die passende Immobilie für Sie.
              </p>
              <p>
                Für Verkäufer biete ich eine kostenlose Immobilienbewertung und entwickle eine individuelle
                Vermarktungsstrategie, um Ihre Immobilie zum bestmöglichen Preis zu verkaufen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Ihre Vorteile mit Wüstenrot Immobilien Hermeskeil
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div key={item.title} className="bg-white p-8 rounded-xl shadow-lg smooth-hover" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">{item.title}</h3>
                <p className="text-secondary-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Umfassende Immobilienservices in Hermeskeil
              </h2>
              <ul className="space-y-4">
                {[
                  'Kostenlose Immobilienbewertung',
                  'Professionelle Vermarktung mit Exposé und Fotos',
                  'Besichtigungen und Verhandlungsführung',
                  'Begleitung bis zum Notartermin',
                  'Vermittlung von Finanzierungen über Wüstenrot',
                  'Beratung bei Erbimmobilien und Scheidungen',
                ].map((service) => (
                  <li key={service} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-secondary-700">{service}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/kontakt" className="btn-primary">
                  Jetzt Beratungstermin vereinbaren
                </Link>
              </div>
            </div>
            <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden img-zoom" data-aos="fade-left">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Immobilienberatung"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Region Overview */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center" data-aos="fade-up">
            Immobilien in der Hochwald-Region
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
            Neben Hermeskeil betreue ich auch Immobilien in den umliegenden Ortschaften
            und Gemeinden der Verbandsgemeinde Hermeskeil.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Kell am See',
              'Reinsfeld',
              'Grimburg',
              'Beuren',
              'Züsch',
              'Neuhütten',
              'Bescheid',
              'Geisfeld',
            ].map((ort, index) => (
              <div key={ort} className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-colors smooth-hover" data-aos="fade-up" data-aos-delay={index * 50}>
                <span className="text-white">{ort}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/regionen/trier" className="btn-primary">
              Auch aktiv in Trier
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Häufige Fragen zu Immobilien in Hermeskeil
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md smooth-hover" data-aos="fade-up" data-aos-delay={index * 100}>
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-secondary-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-500">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-white mb-6">
            Bereit für Ihr Immobilienprojekt in Hermeskeil?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie mich für eine unverbindliche Beratung.
            Als Ihr lokaler Wüstenrot Partner bin ich gerne für Sie da.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Kontakt aufnehmen
            </Link>
            <a href="tel:01776542977" className="btn-outline-dark">
              <Phone className="h-5 w-5 mr-2" />
              0177 6542977
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
