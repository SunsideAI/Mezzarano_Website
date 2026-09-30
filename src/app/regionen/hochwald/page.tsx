import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import SchemaMarkup, { generateFAQSchema } from '@/components/SchemaMarkup'
import RegionMarkdownContent from '@/components/RegionMarkdownContent'

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

export default function HochwaldPage() {  return (
    <>      {/* Hero Section with Wüstenrot Layout-Prinzipien */}
      <section className="relative bg-wuestennacht min-h-[450px] md:min-h-[600px] flex items-center py-12 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div data-aos="fade-right">
              {/* Tagline - Icon + Text in wuestenrot */}
              <div className="flex items-center gap-2 text-wuestenrot mb-6">
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Hochwald & Hunsrück
                </span>
              </div>

              {/* Headline with White Bars - keine Abstände zwischen Balken */}
              <h1 className="mb-8">
                <span className="flex flex-col items-start gap-0">
                  <span className="inline-block w-fit bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none lowercase text-wuestennacht">
                    ihr immobilienmakler
                  </span>
                  <span className="inline-block w-fit bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none lowercase text-wuestennacht">
                    im hochwald
                  </span>
                  <span className="inline-block w-fit bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none text-wuestenrot">
                    wüstenrot
                  </span>
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Sandro Mezzarano – Ihr lokaler Wüstenrot Immobilienexperte für den Kauf,
                Verkauf und die Vermietung von Immobilien im Hochwald und Hunsrück.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 bg-wuestenrot text-white font-bold hover:bg-red-700 transition-colors rounded-[24px]">
                  Kostenlose Beratung anfragen
                </Link>
                <Link href="/immobilien?ort=Hochwald" className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-wuestennacht transition-colors rounded-[24px]">
                  Immobilien im Hochwald
                </Link>
              </div>
            </div>
            {/* Image */}
            <div className="relative" data-aos="fade-left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/regionen/Hermeskeil.jpg"
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

      {/* Ausführlicher SEO-Content aus src/content/regionen/hochwald.md */}
      <RegionMarkdownContent slug="hochwald" />

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
