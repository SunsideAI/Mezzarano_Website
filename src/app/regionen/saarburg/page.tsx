import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Home, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react'
import SchemaMarkup, { generateFAQSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Immobilienmakler Saarburg | Sandro Mezzarano | Wüstenrot Immobilien',
  description: 'Ihr Immobilienexperte in Saarburg. Sandro Mezzarano von Wüstenrot Immobilien berät Sie kompetent beim Kauf, Verkauf und der Vermietung von Immobilien an der Saar.',
  keywords: 'Immobilienmakler Saarburg, Haus kaufen Saarburg, Wohnung mieten Saarburg, Wüstenrot Immobilien, Immobilienbewertung Saarburg',
  openGraph: {
    title: 'Immobilienmakler Saarburg | Wüstenrot Immobilien',
    description: 'Sandro Mezzarano - Ihr lokaler Immobilienexperte für Saarburg und Umgebung.',
    type: 'website',
    locale: 'de_DE',
  },
}

const highlights = [
  {
    icon: Home,
    title: 'Lokale Expertise',
    description: 'Tiefgreifende Kenntnis des Saarburger Immobilienmarktes und der Region.'
  },
  {
    icon: TrendingUp,
    title: 'Faire Bewertung',
    description: 'Kostenlose und marktgerechte Immobilienbewertung für Verkäufer in Saarburg.'
  },
  {
    icon: Users,
    title: 'Persönlicher Service',
    description: 'Individuelle Betreuung von der ersten Beratung bis zum erfolgreichen Abschluss.'
  },
]

const faqItems = [
  {
    question: 'Was kostet ein Immobilienmakler in Saarburg?',
    answer: 'Bei Wüstenrot Immobilien erhalten Sie eine kostenlose Erstberatung. Die Maklerprovision wird nur im Erfolgsfall fällig und ist marktüblich gestaffelt. Für Verkäufer bieten wir zudem eine kostenlose Immobilienbewertung an.'
  },
  {
    question: 'Wie sind die Immobilienpreise in Saarburg?',
    answer: 'Saarburg bietet ein attraktives Preis-Leistungs-Verhältnis. Die Preise für Einfamilienhäuser liegen je nach Lage und Ausstattung zwischen 200.000 und 500.000 Euro. Die malerische Altstadt und die Nähe zur Saar machen die Region besonders beliebt.'
  },
  {
    question: 'Warum ist Saarburg ein guter Standort für Immobilien?',
    answer: 'Saarburg besticht durch die historische Altstadt mit dem berühmten Wasserfall, die idyllische Lage an der Saar und die gute Anbindung nach Trier und Luxemburg. Die hohe Lebensqualität und moderate Preise machen die Stadt attraktiv für Familien und Pendler.'
  },
  {
    question: 'Welche Ortsteile betreuen Sie im Raum Saarburg?',
    answer: 'Neben der Kernstadt Saarburg betreue ich Immobilien in allen umliegenden Gemeinden wie Serrig, Kastel-Staadt, Freudenburg, Merzkirchen und der gesamten Verbandsgemeinde Saarburg-Kell.'
  },
]

export default function SaarburgPage() {
  const faqSchema = generateFAQSchema(faqItems)

  return (
    <>
      <SchemaMarkup data={faqSchema} />

      {/* Hero Section */}
      <section className="bg-secondary-900 py-16 md:py-24 min-h-[50vh] flex items-center">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div data-aos="fade-right">
              <div className="flex items-center gap-2 text-primary-400 mb-4">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Saarburg & Umgebung</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ihr Immobilienmakler in Saarburg
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Sandro Mezzarano – Ihr lokaler Wüstenrot Immobilienexperte für den Kauf,
                Verkauf und die Vermietung von Immobilien in Saarburg und an der Saar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt" className="btn-primary">
                  Kostenlose Beratung anfragen
                </Link>
                <Link href="/immobilien?ort=Saarburg" className="btn-outline">
                  Immobilien in Saarburg
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative" data-aos="fade-left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/djqviyb2c/image/upload/w_800,q_85,f_auto/v1770805375/Saarburg_elmn8i.png"
                  alt="Saarburg - Historische Altstadt an der Saar"
                  fill
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA0MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIGZpbGw9IiM0YjU1NjMiLz48cmVjdCB5PSIxNSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMWYyOTM3Ii8+PC9zdmc+"
                />
              </div>
              {/* Decorative element */}
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
            <span>Büro in Hermeskeil – 20 Min. von Saarburg</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              Immobilien in Saarburg – Charme an der Saar
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                <strong>Saarburg</strong> ist ein malerisches Städtchen an der Saar, das mit seiner
                historischen Altstadt und dem berühmten Wasserfall mitten im Ort zu den schönsten
                Kleinstädten der Region gehört. Die romantische Lage zwischen Weinbergen und Fluss
                macht Saarburg zu einem begehrten Wohnort.
              </p>
              <p>
                Der Immobilienmarkt in Saarburg zeichnet sich durch attraktive Altbauten in der
                historischen Altstadt sowie moderne Neubauprojekte in den Randlagen aus. Die gute
                Verkehrsanbindung nach Trier (ca. 20 Min.) und Luxemburg macht die Stadt besonders
                für Pendler interessant.
              </p>
              <p>
                Als Ihr lokaler Wüstenrot Immobilienpartner unterstütze ich Sie beim Kauf oder
                Verkauf Ihrer Immobilie in Saarburg mit fundierter Marktkenntnis und persönlicher Betreuung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Ihre Vorteile mit Wüstenrot Immobilien Saarburg
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
      <section className="py-10 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Umfassende Immobilienservices in Saarburg
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
            Immobilien in der Region Saarburg
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
            Neben Saarburg betreue ich auch Immobilien in den umliegenden Ortschaften
            und Gemeinden der Verbandsgemeinde Saarburg-Kell.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Serrig',
              'Kastel-Staadt',
              'Freudenburg',
              'Merzkirchen',
              'Taben-Rodt',
              'Irsch',
              'Beurig',
              'Kell am See',
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
            Häufige Fragen zu Immobilien in Saarburg
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
            Bereit für Ihr Immobilienprojekt in Saarburg?
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
