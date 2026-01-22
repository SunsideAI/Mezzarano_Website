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
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Moselregion Bernkastel-Kues"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 to-secondary-900/60" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary-400 mb-4">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Moselregion</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Immobilien in Bernkastel-Kues
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Traumhafte Immobilien an der Mosel – von der historischen Fachwerk-Altstadt
              bis zu Häusern mit Weinbergsblick. Ihr Wüstenrot Partner für die Moselregion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/kontakt" className="btn-primary">
                Beratung anfragen
              </Link>
              <Link href="/immobilien" className="btn-secondary border-white text-white hover:bg-white/10">
                Mosel-Immobilien entdecken
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
            <span>Sandro Mezzarano | Hermeskeil</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              Immobilien an der Mosel – Einzigartig schön
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                <strong>Bernkastel-Kues</strong> ist das Herz der Mittelmosel und einer der malerischsten
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
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
            Warum Immobilien an der Mosel?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
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

      {/* Property Types */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
            Immobilientypen an der Mosel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-secondary-900 mb-3">Fachwerkhäuser</h3>
              <p className="text-secondary-600 text-sm">
                Historische Häuser in den Altstädten von Bernkastel, Traben-Trarbach und anderen Weinorten –
                teilweise denkmalgeschützt mit besonderen Fördermöglichkeiten.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-secondary-900 mb-3">Häuser mit Moselblick</h3>
              <p className="text-secondary-600 text-sm">
                Einfamilienhäuser in Hanglagen mit Panoramablick auf den Fluss und die Weinberge –
                besonders gefragt und wertstabil.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-secondary-900 mb-3">Ferienimmobilien</h3>
              <p className="text-secondary-600 text-sm">
                Ferienwohnungen und -häuser als Kapitalanlage mit Vermietungspotenzial in der
                beliebten Tourismusregion.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
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
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Orte an der Mosel
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
            Ich betreue Immobilien entlang der gesamten Mittelmosel –
            von Bernkastel-Kues bis Traben-Trarbach.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {orte.map((ort) => (
              <div
                key={ort}
                className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-colors"
              >
                <span className="text-white text-sm">{ort}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
            Häufige Fragen zu Mosel-Immobilien
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
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
        <div className="container-custom text-center">
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
            <a href="tel:01776542977" className="btn-secondary border-white text-white hover:bg-white/10">
              <Phone className="h-5 w-5 mr-2" />
              0177 6542977
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
