import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Home, Car, Building, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Immobilienmakler Schweich | Wüstenrot Immobilien Trier-Saarburg',
  description: 'Immobilienmakler Schweich - Sandro Mezzarano von Wüstenrot Immobilien. Ihr Experte für Häuser und Wohnungen in Schweich und der Verbandsgemeinde.',
  keywords: 'Immobilienmakler Schweich, Haus kaufen Schweich, Wohnung mieten Schweich, Wüstenrot Immobilien, Immobilien Verbandsgemeinde Schweich',
  openGraph: {
    title: 'Immobilienmakler Schweich | Wüstenrot Immobilien',
    description: 'Ihr lokaler Immobilienexperte für Schweich und die Verbandsgemeinde an der Mosel.',
    type: 'website',
    locale: 'de_DE',
  },
}

const highlights = [
  {
    icon: Car,
    title: 'Ideale Lage',
    description: 'Perfekte Verkehrsanbindung: 10 Min. nach Trier, 20 Min. nach Luxemburg.'
  },
  {
    icon: Home,
    title: 'Familienfreundlich',
    description: 'Ausgezeichnete Infrastruktur mit Schulen, Kitas und Freizeitmöglichkeiten.'
  },
  {
    icon: Building,
    title: 'Wachstumsregion',
    description: 'Attraktiver Immobilienmarkt durch Nähe zu Luxemburg und Trier.'
  },
]

const gemeinden = [
  'Schweich', 'Longuich', 'Mehring', 'Leiwen', 'Detzem',
  'Fell', 'Bekond', 'Föhren', 'Naurath', 'Kenn'
]

const faqItems = [
  {
    question: 'Warum ist Schweich als Wohnort so beliebt?',
    answer: 'Schweich kombiniert ländliche Idylle mit städtischer Nähe. Die exzellente Verkehrsanbindung (A1, B53) ermöglicht schnelles Pendeln nach Trier (10 Min.) und Luxemburg (20 Min.). Gleichzeitig bietet die Stadt alle wichtigen Einrichtungen, eine lebendige Innenstadt und die Mosel vor der Haustür.'
  },
  {
    question: 'Wie entwickeln sich die Immobilienpreise in Schweich?',
    answer: 'Der Immobilienmarkt in Schweich ist durch die Nähe zu Luxemburg und Trier sehr dynamisch. Die Preise sind in den letzten Jahren gestiegen, bieten aber im Vergleich zu Trier noch ein besseres Preis-Leistungs-Verhältnis. Besonders Neubaugebiete und Objekte mit guter Anbindung sind gefragt.'
  },
  {
    question: 'Gibt es Neubaugebiete in Schweich?',
    answer: 'Ja, Schweich und die umliegenden Gemeinden weisen regelmäßig neue Baugebiete aus. Die Nachfrage ist hoch, daher empfehle ich frühzeitige Kontaktaufnahme, wenn Sie an einem Baugrundstück interessiert sind. Ich informiere Sie gerne über aktuelle und geplante Projekte.'
  },
  {
    question: 'Ist Schweich gut für Pendler nach Luxemburg geeignet?',
    answer: 'Hervorragend. Über die A1 erreichen Sie Luxemburg-Stadt in etwa 25-30 Minuten. Viele Luxemburg-Pendler wählen Schweich und Umgebung als Wohnort, da hier die Immobilienpreise deutlich günstiger sind als in Luxemburg selbst, bei guter Lebensqualität.'
  },
]

export default function SchweichPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/djqviyb2c/image/upload/w_1920,q_80/v1769251685/Bildschirmfoto_2026-01-24_um_11.47.48_jnakga.png"
            alt="Schweich an der Mosel"
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
              <span className="font-medium">Trier-Saarburg</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" data-aos="fade-up" data-aos-delay="100">
              Immobilienmakler Schweich
            </h1>
            <p className="text-xl text-gray-200 mb-8" data-aos="fade-up" data-aos-delay="200">
              Schweich an der Mosel – Ihr idealer Wohnort zwischen Trier und Luxemburg.
              Sandro Mezzarano von Wüstenrot Immobilien berät Sie beim Kauf und Verkauf.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="300">
              <Link href="/kontakt" className="btn-primary">
                Beratung anfragen
              </Link>
              <Link href="/immobilien?ort=Schweich" className="btn-outline">
                Immobilien in Schweich
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
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              Schweich – Wohnen mit Mosel-Flair und Top-Anbindung
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                <strong>Schweich</strong> ist die perfekte Verbindung aus ländlicher Lebensqualität
                und städtischer Erreichbarkeit. Als Verwaltungssitz der Verbandsgemeinde bietet die
                Stadt an der Mosel alle wichtigen Einrichtungen, während Trier und Luxemburg
                schnell erreichbar bleiben.
              </p>
              <p>
                Der Immobilienmarkt in Schweich ist besonders bei Familien und Luxemburg-Pendlern
                gefragt. Die Stadt bietet ein vielfältiges Angebot: von Einfamilienhäusern in
                gewachsenen Wohngebieten über moderne Neubauten bis zu Eigentumswohnungen mit Moselblick.
              </p>
              <p>
                Als Ihr Wüstenrot Immobilienpartner mit Sitz in Hermeskeil unterstütze ich Sie
                bei der Suche nach Ihrer Traumimmobilie in Schweich oder beim Verkauf Ihres Objekts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Warum Schweich?
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

      {/* Vorteile für Pendler */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Ideal für Pendler nach Luxemburg
              </h2>
              <p className="text-secondary-600 mb-6">
                Schweich ist einer der beliebtesten Wohnorte für Luxemburg-Grenzgänger.
                Die Kombination aus günstigen deutschen Immobilienpreisen und kurzer
                Pendelstrecke macht die Region besonders attraktiv.
              </p>
              <ul className="space-y-4">
                {[
                  '25-30 Min. nach Luxemburg-Stadt',
                  'Direkter Autobahnanschluss A1',
                  'Deutlich günstigere Immobilienpreise als in Luxemburg',
                  'Hohe Lebensqualität an der Mosel',
                  'Gute Infrastruktur vor Ort',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-secondary-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden img-zoom" data-aos="fade-left">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                alt="Pendeln nach Luxemburg"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gemeinden */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center" data-aos="fade-up">
            Verbandsgemeinde Schweich an der Römischen Weinstraße
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
            Ich betreue Immobilien in der gesamten Verbandsgemeinde –
            von der Weinstadt bis zum idyllischen Moseldorf.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {gemeinden.map((gemeinde, index) => (
              <div
                key={gemeinde}
                className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-colors smooth-hover"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <span className="text-white text-sm">{gemeinde}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Häufige Fragen zu Immobilien in Schweich
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

      {/* Weitere Regionen */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">
            Auch aktiv in der Region
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/regionen/trier" className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-secondary-700">
              Trier
            </Link>
            <Link href="/regionen/hermeskeil" className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-secondary-700">
              Hermeskeil
            </Link>
            <Link href="/regionen/bernkastel-kues" className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-secondary-700">
              Bernkastel-Kues
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-500">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-white mb-6">
            Immobilie in Schweich gesucht?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie mich für eine persönliche Beratung –
            ich finde die passende Immobilie für Sie.
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
