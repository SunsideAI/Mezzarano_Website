import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Home, Grape, Mountain, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Immobilienmakler Bernkastel-Kues | Wüstenrot Immobilien Mosel',
  description: 'Immobilienmakler Bernkastel-Kues - Sandro Mezzarano von Wüstenrot Immobilien. Spezialisiert auf Häuser und Wohnungen an der Mosel mit Weinbergsblick.',
  keywords: 'Immobilienmakler Bernkastel-Kues, Haus kaufen Mosel, Ferienimmobilie Mosel, Wüstenrot Immobilien, Weingut kaufen, Immobilien Bernkastel',
  openGraph: {
    title: 'Immobilienmakler Bernkastel-Kues | Immobilien an der Mosel',
    description: 'Ihr Experte für Immobilien an der Mosel - von der Stadtwohnung bis zum Weingut.',
    type: 'website',
    locale: 'de_DE',
  },
}

const highlights = [
  {
    icon: Grape,
    title: 'Weinregion Mosel',
    description: 'Spezialisiert auf Immobilien in der weltbekannten Mosel-Weinregion mit einzigartigen Objekten.'
  },
  {
    icon: Mountain,
    title: 'Traumhafte Lagen',
    description: 'Häuser und Wohnungen mit Weinbergsblick und direktem Zugang zur Mosel.'
  },
  {
    icon: Home,
    title: 'Vielfältiges Angebot',
    description: 'Von der Ferienwohnung über das Fachwerkhaus bis zum Weingut – für jeden Anspruch.'
  },
]

const orte = [
  'Bernkastel-Kues', 'Graach', 'Wehlen', 'Zeltingen-Rachtig', 'Ürzig',
  'Traben-Trarbach', 'Kröv', 'Wittlich', 'Mülheim', 'Brauneberg'
]

const faqItems = [
  {
    question: 'Sind Immobilien an der Mosel eine gute Investition?',
    answer: 'Die Moselregion profitiert von stabilem Tourismus und wachsender Beliebtheit als Wohn- und Ferienstandort. Besonders Objekte mit Moselblick oder in den historischen Ortskernen wie Bernkastel-Kues sind wertstabil. Ferienimmobilien können zudem attraktive Mieteinnahmen generieren.'
  },
  {
    question: 'Was kosten Immobilien in Bernkastel-Kues?',
    answer: 'Die Preise variieren stark je nach Lage und Zustand. Renovierte Fachwerkhäuser in der Altstadt beginnen bei ca. 300.000 €, während exklusive Mosellagen mit Weinbergsblick deutlich teurer sind. Eigentumswohnungen sind ab ca. 150.000 € erhältlich.'
  },
  {
    question: 'Gibt es Weingüter zum Verkauf?',
    answer: 'Vereinzelt kommen Weingüter oder ehemalige Winzerhöfe auf den Markt. Diese eignen sich sowohl als Wohnimmobilie mit besonderem Charme als auch für Investoren, die in den Weinbau einsteigen möchten. Sprechen Sie mich für aktuelle Angebote an.'
  },
  {
    question: 'Wie ist die Infrastruktur in Bernkastel-Kues?',
    answer: 'Als Mittelzentrum bietet Bernkastel-Kues alle wichtigen Einrichtungen: Schulen, Ärzte, Einkaufsmöglichkeiten und Krankenhaus. Die Anbindung über die B50 nach Trier (ca. 30 Min.) und zur Autobahn ist gut. Im Sommer verkehren Ausflugsschiffe auf der Mosel.'
  },
]

export default function BernkastelKuesPage() {
  return (
    <>
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
                  Moselregion
                </span>
              </div>

              {/* Headline with White Bars - keine Abstände zwischen Balken */}
              <h1 className="mb-8">
                <span className="flex flex-col items-start gap-0">
                  <span className="inline-block w-fit whitespace-nowrap bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none lowercase text-wuestennacht">
                    ihr immobilienmakler
                  </span>
                  <span className="inline-block w-fit whitespace-nowrap bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none lowercase text-wuestennacht">
                    in bernkastel-kues
                  </span>
                  <span className="inline-block w-fit whitespace-nowrap bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none text-wuestenrot">
                    wüstenrot
                  </span>
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Traumhafte Immobilien an der Mosel – von der historischen Fachwerk-Altstadt
                bis zu Häusern mit Weinbergsblick. Ihr Wüstenrot Partner für die Moselregion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 bg-wuestenrot text-white font-bold hover:bg-red-700 transition-colors">
                  Beratung anfragen
                </Link>
                <Link href="/immobilien" className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-wuestennacht transition-colors">
                  Mosel-Immobilien entdecken
                </Link>
              </div>
            </div>
            {/* Image */}
            <div className="relative" data-aos="fade-left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/regionen/Bernkastel.jpg"
                  alt="Moselregion Bernkastel-Kues"
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
            <span>Sandro Mezzarano | Hermeskeil</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              Immobilien an der Mosel – Einzigartig schön
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                Bernkastel-Kues ist das Herz der Mittelmosel und einer der malerischsten
                Orte Deutschlands. Die historische Fachwerk-Altstadt, die steilen Weinberge und der Fluss
                machen diese Region zu einem begehrten Wohn- und Ferienstandort.
              </p>
              <p>
                Der Immobilienmarkt an der Mosel bietet einzigartige Möglichkeiten: liebevoll restaurierte
                Fachwerkhäuser, moderne Wohnungen mit Moselblick, ehemalige Winzerhöfe und sogar komplette
                Weingüter. Ob als Hauptwohnsitz, Feriendomizil oder Kapitalanlage – die Moselregion
                begeistert durch Charme und Lebensqualität.
              </p>
              <p>
                Als Ihr Wüstenrot Immobilienpartner mit Sitz in Hermeskeil (nur 30 Minuten entfernt)
                kenne ich den lokalen Markt und begleite Sie kompetent bei Kauf oder Verkauf.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Warum Immobilien an der Mosel?
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

      {/* Property Types */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Immobilientypen an der Mosel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border border-gray-200 rounded-xl p-6 smooth-hover" data-aos="fade-up">
              <h3 className="text-lg font-bold text-secondary-900 mb-3">Fachwerkhäuser</h3>
              <p className="text-secondary-600 text-sm">
                Historische Häuser in den Altstädten von Bernkastel, Traben-Trarbach und anderen Weinorten –
                teilweise denkmalgeschützt mit besonderen Fördermöglichkeiten.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 smooth-hover" data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-lg font-bold text-secondary-900 mb-3">Häuser mit Moselblick</h3>
              <p className="text-secondary-600 text-sm">
                Einfamilienhäuser in Hanglagen mit Panoramablick auf den Fluss und die Weinberge –
                besonders gefragt und wertstabil.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 smooth-hover" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-lg font-bold text-secondary-900 mb-3">Ferienimmobilien</h3>
              <p className="text-secondary-600 text-sm">
                Ferienwohnungen und -häuser als Kapitalanlage mit Vermietungspotenzial in der
                beliebten Tourismusregion.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 smooth-hover" data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-lg font-bold text-secondary-900 mb-3">Winzerhöfe & Weingüter</h3>
              <p className="text-secondary-600 text-sm">
                Historische Anwesen mit Charakter, teilweise mit Rebflächen – ideal für Weinliebhaber
                oder als exklusives Wohnprojekt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Orte */}
      <section className="py-10 md:py-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center" data-aos="fade-up">
            Orte an der Mosel
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
            Ich betreue Immobilien entlang der gesamten Mittelmosel –
            von Bernkastel-Kues bis Traben-Trarbach.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {orte.map((ort, index) => (
              <div
                key={ort}
                className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-colors smooth-hover"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <span className="text-white text-sm">{ort}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Häufige Fragen zu Mosel-Immobilien
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
            Ihre Traumimmobilie an der Mosel finden
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Lassen Sie sich von mir persönlich beraten – ich kenne die schönsten
            Immobilien der Region.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Beratung anfragen
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
