import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Home, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react'
import SchemaMarkup, { generateFAQSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Immobilienmakler Konz | Sandro Mezzarano | Wüstenrot Immobilien',
  description: 'Ihr Immobilienexperte in Konz. Sandro Mezzarano von Wüstenrot Immobilien berät Sie kompetent beim Kauf, Verkauf und der Vermietung von Immobilien am Zusammenfluss von Saar und Mosel.',
  keywords: 'Immobilienmakler Konz, Haus kaufen Konz, Wohnung mieten Konz, Wüstenrot Immobilien, Immobilienbewertung Konz',
  openGraph: {
    title: 'Immobilienmakler Konz | Wüstenrot Immobilien',
    description: 'Sandro Mezzarano - Ihr lokaler Immobilienexperte für Konz und Umgebung.',
    type: 'website',
    locale: 'de_DE',
  },
}

const highlights = [
  {
    icon: Home,
    title: 'Lokale Expertise',
    description: 'Tiefgreifende Kenntnis des Konzer Immobilienmarktes und der Region.'
  },
  {
    icon: TrendingUp,
    title: 'Faire Bewertung',
    description: 'Kostenlose und marktgerechte Immobilienbewertung für Verkäufer in Konz.'
  },
  {
    icon: Users,
    title: 'Persönlicher Service',
    description: 'Individuelle Betreuung von der ersten Beratung bis zum erfolgreichen Abschluss.'
  },
]

const faqItems = [
  {
    question: 'Was kostet ein Immobilienmakler in Konz?',
    answer: 'Bei Wüstenrot Immobilien erhalten Sie eine kostenlose Erstberatung. Die Maklerprovision wird nur im Erfolgsfall fällig und ist marktüblich gestaffelt. Für Verkäufer bieten wir zudem eine kostenlose Immobilienbewertung an.'
  },
  {
    question: 'Wie sind die Immobilienpreise in Konz?',
    answer: 'Konz liegt preislich zwischen Trier und dem ländlicheren Umland. Einfamilienhäuser kosten je nach Lage zwischen 280.000 und 600.000 Euro. Die Nähe zu Trier und Luxemburg sowie die schöne Lage an Saar und Mosel machen Konz zu einem gefragten Wohnort.'
  },
  {
    question: 'Warum ist Konz ein guter Standort für Immobilien?',
    answer: 'Konz liegt einzigartig am Zusammenfluss von Saar und Mosel, nur wenige Kilometer von Trier entfernt. Die Stadt bietet gute Infrastruktur, Schulen und Einkaufsmöglichkeiten bei gleichzeitig moderateren Preisen als in Trier. Ideal für Pendler nach Trier und Luxemburg.'
  },
  {
    question: 'Welche Stadtteile betreuen Sie im Raum Konz?',
    answer: 'Neben der Kernstadt Konz betreue ich Immobilien in allen Stadtteilen wie Könen, Oberemmel, Niedermennig, Karthaus sowie in der gesamten Verbandsgemeinde Konz mit Ortschaften wie Wasserliesch, Nittel und Wellen.'
  },
]

export default function KonzPage() {
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
                  Konz & Obermosel
                </span>
              </div>

              {/* Headline with White Bars - w-fit für exakte Textbreite */}
              <h1 className="mb-8">
                <span className="flex flex-col items-start gap-3">
                  <span className="inline-block w-fit bg-white px-5 py-2 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight lowercase text-wuestennacht">
                    ihr immobilienmakler
                  </span>
                  <span className="inline-block w-fit bg-white px-5 py-2 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight lowercase text-wuestennacht">
                    in konz
                  </span>
                  <span className="inline-block w-fit bg-white px-5 py-2 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-wuestenrot">
                    wüstenrot
                  </span>
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Sandro Mezzarano – Ihr lokaler Wüstenrot Immobilienexperte für den Kauf,
                Verkauf und die Vermietung von Immobilien in Konz an Saar und Mosel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 bg-wuestenrot text-white font-bold hover:bg-red-700 transition-colors">
                  Kostenlose Beratung anfragen
                </Link>
                <Link href="/immobilien?ort=Konz" className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-wuestennacht transition-colors">
                  Immobilien in Konz
                </Link>
              </div>
            </div>
            {/* Image */}
            <div className="relative" data-aos="fade-left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/djqviyb2c/image/upload/w_800,q_85,f_auto/v1770805357/Konz_eqrxqw.png"
                  alt="Immobilien in Konz"
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
            <span>Büro in Hermeskeil – 25 Min. von Konz</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              Immobilien in Konz – Leben an zwei Flüssen
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                Konz liegt einzigartig am Zusammenfluss von Saar und Mosel und
                ist damit ein Tor zu beiden Flusstälern. Die Stadt verbindet die Nähe zur
                Großstadt Trier (ca. 10 km) mit der Ruhe des Moseltals und bietet eine
                ausgezeichnete Lebensqualität.
              </p>
              <p>
                Der Immobilienmarkt in Konz ist geprägt von einer Mischung aus gemütlichen
                Weinorten, historischen Gebäuden und modernen Neubaugebieten. Die hervorragende
                Anbindung nach Trier und Luxemburg macht Konz besonders für Berufspendler attraktiv.
              </p>
              <p>
                Als Ihr lokaler Wüstenrot Immobilienpartner unterstütze ich Sie beim Kauf oder
                Verkauf Ihrer Immobilie in Konz mit fundierter Marktkenntnis und persönlicher Betreuung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Ihre Vorteile mit Wüstenrot Immobilien Konz
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
                Umfassende Immobilienservices in Konz
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
            Immobilien in der Region Konz
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
            Neben Konz betreue ich auch Immobilien in den umliegenden Ortschaften
            und Gemeinden entlang von Saar und Mosel.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Wasserliesch',
              'Nittel',
              'Wellen',
              'Temmels',
              'Wincheringen',
              'Pellingen',
              'Könen',
              'Oberemmel',
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
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Häufige Fragen zu Immobilien in Konz
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
            Bereit für Ihr Immobilienprojekt in Konz?
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
