import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Car, Building, CheckCircle } from 'lucide-react'
import RegionMarkdownContent from '@/components/RegionMarkdownContent'

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

const gemeinden = [
  'Schweich', 'Longuich', 'Mehring', 'Leiwen', 'Detzem',
  'Fell', 'Bekond', 'Föhren', 'Naurath', 'Kenn'
]

export default function SchweichPage() {
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
                  Trier-Saarburg
                </span>
              </div>

              {/* Headline with White Bars - keine Abstände zwischen Balken */}
              <h1 className="mb-8">
                <span className="flex flex-col items-start gap-0">
                  <span className="inline-block w-fit bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none lowercase text-wuestennacht">
                    ihr immobilienmakler
                  </span>
                  <span className="inline-block w-fit bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none lowercase text-wuestennacht">
                    in schweich
                  </span>
                  <span className="inline-block w-fit bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none text-wuestenrot">
                    wüstenrot
                  </span>
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Schweich an der Mosel – Ihr idealer Wohnort zwischen Trier und Luxemburg.
                Sandro Mezzarano von Wüstenrot Immobilien berät Sie beim Kauf und Verkauf.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 bg-wuestenrot text-white font-bold hover:bg-red-700 transition-colors rounded-[24px]">
                  Beratung anfragen
                </Link>
                <Link href="/immobilien?ort=Schweich" className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-wuestennacht transition-colors rounded-[24px]">
                  Immobilien in Schweich
                </Link>
              </div>
            </div>
            {/* Image */}
            <div className="relative" data-aos="fade-left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/regionen/Schweich.jpg"
                  alt="Schweich an der Mosel"
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

      {/* Ausführlicher SEO-Content aus src/content/regionen/schweich.md */}
      <RegionMarkdownContent slug="schweich" />

                  {/* Vorteile für Pendler */}
      <section className="py-10 md:py-16 bg-white">
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
      <section className="py-10 md:py-16 bg-secondary-900 text-white">
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

            {/* Weitere Regionen */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">
            Auch aktiv in der Region
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/regionen/trier" className="px-6 py-3 bg-gray-100 rounded-[24px] hover:bg-gray-200 transition-colors text-secondary-700">
              Trier
            </Link>
            <Link href="/regionen/hermeskeil" className="px-6 py-3 bg-gray-100 rounded-[24px] hover:bg-gray-200 transition-colors text-secondary-700">
              Hermeskeil
            </Link>
            <Link href="/regionen/bernkastel-kues" className="px-6 py-3 bg-gray-100 rounded-[24px] hover:bg-gray-200 transition-colors text-secondary-700">
              Bernkastel-Kues
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-16 bg-primary-500">
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
