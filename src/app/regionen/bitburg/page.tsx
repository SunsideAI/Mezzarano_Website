import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Home, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react'
import SchemaMarkup, { generateFAQSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Immobilienmakler Bitburg | Sandro Mezzarano | Wüstenrot Immobilien',
  description: 'Ihr Immobilienexperte in Bitburg. Sandro Mezzarano von Wüstenrot Immobilien berät Sie kompetent beim Kauf, Verkauf und der Vermietung von Immobilien in der Eifel.',
  keywords: 'Immobilienmakler Bitburg, Haus kaufen Bitburg, Wohnung mieten Bitburg, Wüstenrot Immobilien, Immobilienbewertung Eifel',
  openGraph: {
    title: 'Immobilienmakler Bitburg | Wüstenrot Immobilien',
    description: 'Sandro Mezzarano - Ihr lokaler Immobilienexperte für Bitburg und die Eifel.',
    type: 'website',
    locale: 'de_DE',
  },
}

const highlights = [
  {
    icon: Home,
    title: 'Lokale Expertise',
    description: 'Tiefgreifende Kenntnis des Bitburger Immobilienmarktes und der Eifel-Region.'
  },
  {
    icon: TrendingUp,
    title: 'Faire Bewertung',
    description: 'Kostenlose und marktgerechte Immobilienbewertung für Verkäufer in Bitburg.'
  },
  {
    icon: Users,
    title: 'Persönlicher Service',
    description: 'Individuelle Betreuung von der ersten Beratung bis zum erfolgreichen Abschluss.'
  },
]

const faqItems = [
  {
    question: 'Was kostet ein Immobilienmakler in Bitburg?',
    answer: 'Bei Wüstenrot Immobilien erhalten Sie eine kostenlose Erstberatung. Die Maklerprovision wird nur im Erfolgsfall fällig und ist marktüblich gestaffelt. Für Verkäufer bieten wir zudem eine kostenlose Immobilienbewertung an.'
  },
  {
    question: 'Wie sind die Immobilienpreise in Bitburg?',
    answer: 'Bitburg bietet attraktive Immobilienpreise im Vergleich zu anderen Städten. Einfamilienhäuser sind je nach Lage und Ausstattung zwischen 250.000 und 550.000 Euro erhältlich. Die zentrale Lage in der Eifel und die gute Infrastruktur machen die Stadt beliebt.'
  },
  {
    question: 'Warum ist Bitburg ein guter Standort für Immobilien?',
    answer: 'Bitburg ist das wirtschaftliche Zentrum der Südeifel mit guter Infrastruktur, Schulen und Einkaufsmöglichkeiten. Die Nähe zur Autobahn A60, zum Flugplatz Bitburg-Spangdahlem und die Anbindung nach Trier und Luxemburg machen die Stadt für Familien und Berufstätige attraktiv.'
  },
  {
    question: 'Welche Ortsteile betreuen Sie im Raum Bitburg?',
    answer: 'Neben der Kernstadt Bitburg betreue ich Immobilien in allen umliegenden Gemeinden wie Prüm, Speicher, Kyllburg, Dudeldorf sowie der gesamten Verbandsgemeinde Bitburger Land und Südeifel.'
  },
]

export default function BitburgPage() {
  const faqSchema = generateFAQSchema(faqItems)

  return (
    <>
      <SchemaMarkup data={faqSchema} />

      {/* Hero Section with Wüstenrot Layout-Prinzipien */}
      <section className="relative bg-wuestennacht min-h-[450px] md:min-h-[600px] flex items-center py-12 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div data-aos="fade-right">
              {/* Tagline - Icon + Text in wuestenrot */}
              <div className="flex items-center gap-2 text-wuestenrot mb-6">
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Bitburg & Eifel
                </span>
              </div>

              {/* Headline with White Bars - keine Abstände zwischen Balken */}
              <h1 className="mb-8">
                <span className="flex flex-col items-start gap-0">
                  <span className="inline-block w-fit bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none lowercase text-wuestennacht">
                    ihr immobilienmakler
                  </span>
                  <span className="inline-block w-fit bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none lowercase text-wuestennacht">
                    in bitburg
                  </span>
                  <span className="inline-block w-fit bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none text-wuestenrot">
                    wüstenrot
                  </span>
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Sandro Mezzarano – Ihr lokaler Wüstenrot Immobilienexperte für den Kauf,
                Verkauf und die Vermietung von Immobilien in Bitburg und der Eifel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 bg-wuestenrot text-white font-bold hover:bg-red-700 transition-colors rounded-[24px]">
                  Kostenlose Beratung anfragen
                </Link>
                <Link href="/immobilien?ort=Bitburg" className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-wuestennacht transition-colors rounded-[24px]">
                  Immobilien in Bitburg
                </Link>
              </div>
            </div>
            {/* Image */}
            <div className="relative" data-aos="fade-left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/regionen/Bittburg.png"
                  alt="Immobilien in Bitburg"
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
            <span>Büro in Hermeskeil – 35 Min. von Bitburg</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              Immobilien in Bitburg – Zentrum der Südeifel
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                Bitburg ist die Kreisstadt des Eifelkreises Bitburg-Prüm und
                das wirtschaftliche Zentrum der Südeifel. Die Stadt verbindet ländliche Lebensqualität
                mit guter Infrastruktur und ist bekannt für die Bitburger Brauerei sowie den
                nahegelegenen Flugplatz Spangdahlem.
              </p>
              <p>
                Der Immobilienmarkt in Bitburg bietet ein ausgewogenes Angebot an Einfamilienhäusern,
                Eigentumswohnungen und Grundstücken. Die gute Anbindung über die A60 nach Trier und
                Belgien sowie die Nähe zu Luxemburg machen die Stadt für Pendler besonders attraktiv.
              </p>
              <p>
                Als Ihr lokaler Wüstenrot Immobilienpartner unterstütze ich Sie beim Kauf oder
                Verkauf Ihrer Immobilie in Bitburg mit fundierter Marktkenntnis und persönlicher Betreuung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Ihre Vorteile mit Wüstenrot Immobilien Bitburg
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
                Umfassende Immobilienservices in Bitburg
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
            Immobilien in der Region Bitburg
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
            Neben Bitburg betreue ich auch Immobilien in den umliegenden Ortschaften
            und Gemeinden der Eifel.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Prüm',
              'Speicher',
              'Kyllburg',
              'Dudeldorf',
              'Echternacherbrück',
              'Neuerburg',
              'Waxweiler',
              'Bettingen',
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
            Häufige Fragen zu Immobilien in Bitburg
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
            Bereit für Ihr Immobilienprojekt in Bitburg?
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
