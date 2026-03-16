import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Home, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react'
import SchemaMarkup, { generateFAQSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Immobilienmakler Hochwald | Sandro Mezzarano | Wüstenrot Immobilien',
  description: 'Ihr Immobilienexperte im Hochwald. Sandro Mezzarano von Wüstenrot Immobilien berät Sie kompetent beim Kauf, Verkauf und der Vermietung von Immobilien in der Hochwald-Region.',
  keywords: 'Immobilienmakler Hochwald, Haus kaufen Hochwald, Wohnung mieten Hochwald, Wüstenrot Immobilien, Immobilienbewertung Hunsrück',
  openGraph: {
    title: 'Immobilienmakler Hochwald | Wüstenrot Immobilien',
    description: 'Sandro Mezzarano - Ihr lokaler Immobilienexperte für den Hochwald und Hunsrück.',
    type: 'website',
    locale: 'de_DE',
  },
}

const highlights = [
  {
    icon: Home,
    title: 'Lokale Expertise',
    description: 'Tiefgreifende Kenntnis des Hochwald-Immobilienmarktes als Einheimischer.'
  },
  {
    icon: TrendingUp,
    title: 'Faire Bewertung',
    description: 'Kostenlose und marktgerechte Immobilienbewertung für Verkäufer im Hochwald.'
  },
  {
    icon: Users,
    title: 'Persönlicher Service',
    description: 'Individuelle Betreuung von der ersten Beratung bis zum erfolgreichen Abschluss.'
  },
]

const faqItems = [
  {
    question: 'Was kostet ein Immobilienmakler im Hochwald?',
    answer: 'Bei Wüstenrot Immobilien erhalten Sie eine kostenlose Erstberatung. Die Maklerprovision wird nur im Erfolgsfall fällig und ist marktüblich gestaffelt. Für Verkäufer bieten wir zudem eine kostenlose Immobilienbewertung an.'
  },
  {
    question: 'Wie sind die Immobilienpreise im Hochwald?',
    answer: 'Der Hochwald bietet hervorragende Preis-Leistungs-Verhältnisse. Einfamilienhäuser mit Garten sind je nach Lage und Ausstattung bereits ab 150.000 Euro erhältlich. Die ruhige Lage im Naturpark macht die Region besonders für Naturliebhaber und Familien attraktiv.'
  },
  {
    question: 'Warum ist der Hochwald ein guter Standort für Immobilien?',
    answer: 'Der Hochwald bietet hohe Lebensqualität durch unberührte Natur, günstige Immobilienpreise und eine gute Anbindung nach Trier (ca. 30 Min.). Die Region ist ideal für Familien, die Natur und Ruhe suchen, aber dennoch die Nähe zur Stadt schätzen.'
  },
  {
    question: 'Welche Orte betreuen Sie im Hochwald?',
    answer: 'Als Einheimischer betreue ich den gesamten Hochwald: Hermeskeil, Kell am See, Reinsfeld, Grimburg, Züsch, Neuhütten, Bescheid, Geisfeld, Beuren und alle weiteren Gemeinden der Verbandsgemeinde Hermeskeil und Umgebung.'
  },
]

export default function HochwaldPage() {
  const faqSchema = generateFAQSchema(faqItems)

  return (
    <>
      <SchemaMarkup data={faqSchema} />

      {/* Hero Section with Wüstenrot Layout-Prinzipien */}
      <section className="bg-wuestennacht min-h-[400px] md:min-h-[520px] flex items-center py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div data-aos="fade-right">
              {/* Tagline Badge */}
              <div className="mb-6">
                <span className="inline-block bg-wuestenrot text-white font-bold text-sm px-4 py-1.5">
                  Hochwald & Hunsrück
                </span>
              </div>

              {/* Headline with White Bars - w-fit für exakte Textbreite */}
              <h1 className="mb-8">
                <span className="flex flex-col items-start gap-3">
                  <span className="inline-block w-fit bg-white px-5 py-2 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight lowercase text-wuestennacht">
                    ihr immobilienmakler
                  </span>
                  <span className="inline-block w-fit bg-white px-5 py-2 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight lowercase text-wuestennacht">
                    im hochwald
                  </span>
                  <span className="inline-block w-fit bg-white px-5 py-2 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-wuestenrot">
                    wüstenrot
                  </span>
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Sandro Mezzarano – Ihr lokaler Wüstenrot Immobilienexperte für den Kauf,
                Verkauf und die Vermietung von Immobilien im Hochwald und Hunsrück.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 bg-wuestenrot text-white font-bold hover:bg-red-700 transition-colors">
                  Kostenlose Beratung anfragen
                </Link>
                <Link href="/immobilien?ort=Hochwald" className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-wuestennacht transition-colors">
                  Immobilien im Hochwald
                </Link>
              </div>
            </div>
            {/* Image */}
            <div className="relative" data-aos="fade-left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/djqviyb2c/image/upload/w_800,q_85,f_auto/v1770805355/Wald_pxfoka.png"
                  alt="Immobilien im Hochwald"
                  fill
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA0MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIGZpbGw9IiM0YjU1NjMiLz48cmVjdCB5PSIxNSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMWYyOTM3Ii8+PC9zdmc+"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-500 rounded-2xl -z-10 hidden md:block" />
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
      <section className="py-10 md:py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              Immobilien im Hochwald – Natur pur vor den Toren Triers
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                Der Hochwald ist ein Höhenzug im Hunsrück und gehört zu den
                waldreichsten und natürlichsten Regionen in Rheinland-Pfalz. Als Teil des
                Naturparks Saar-Hunsrück bietet die Region eine einzigartige Kombination aus
                unberührter Natur und guter Erreichbarkeit der Stadt Trier.
              </p>
              <p>
                Der Immobilienmarkt im Hochwald zeichnet sich durch attraktive Preise aus.
                Hier finden Sie großzügige Grundstücke, renovierungsbedürftige Häuser mit
                Potenzial sowie moderne Neubauten – oft zu Preisen, die in stadtnahen Lagen
                undenkbar wären.
              </p>
              <p>
                Als gebürtiger Hermeskeiler kenne ich den Hochwald wie meine Westentasche.
                Diese lokale Verwurzelung macht mich zu Ihrem idealen Partner für
                Immobiliengeschäfte in der Region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Ihre Vorteile mit Wüstenrot Immobilien im Hochwald
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div key={item.title} className="bg-white p-8 rounded-xl shadow-lg smooth-hover" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">{item.title}</h3>
                <p className="text-secondary-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Umfassende Immobilienservices im Hochwald
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
      <section className="py-10 md:py-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center" data-aos="fade-up">
            Immobilien in der Hochwald-Region
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
            Als Einheimischer betreue ich Immobilien im gesamten Hochwald
            und den angrenzenden Gemeinden.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Hermeskeil',
              'Kell am See',
              'Reinsfeld',
              'Grimburg',
              'Züsch',
              'Neuhütten',
              'Bescheid',
              'Geisfeld',
            ].map((ort, index) => (
              <Link
                key={ort}
                href={ort === 'Hermeskeil' ? '/regionen/hermeskeil' : '/immobilien'}
                className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-colors smooth-hover"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <span className="text-white">{ort}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/regionen/hermeskeil" className="btn-primary">
              Mehr zu Hermeskeil
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Häufige Fragen zu Immobilien im Hochwald
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
      <section className="py-10 md:py-16 bg-primary-500">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-white mb-6">
            Bereit für Ihr Immobilienprojekt im Hochwald?
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
