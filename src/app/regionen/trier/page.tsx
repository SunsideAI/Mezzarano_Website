import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Home, TrendingUp, Building2, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Immobilienmakler Trier | Sandro Mezzarano | Wüstenrot Immobilien',
  description: 'Immobilienmakler Trier - Sandro Mezzarano von Wüstenrot Immobilien. Kompetente Beratung für Kauf, Verkauf und Vermietung von Immobilien in Trier und Umgebung.',
  keywords: 'Immobilienmakler Trier, Haus kaufen Trier, Wohnung mieten Trier, Wüstenrot Immobilien, Immobilienbewertung Trier, Makler Trier-Saarburg',
  openGraph: {
    title: 'Immobilienmakler Trier | Wüstenrot Immobilien',
    description: 'Ihr lokaler Immobilienexperte für Trier und Trier-Saarburg.',
    type: 'website',
    locale: 'de_DE',
  },
}

const stadtteile = [
  'Trier-Mitte', 'Trier-Süd', 'Trier-Nord', 'Trier-West', 'Trier-Ost',
  'Olewig', 'Tarforst', 'Feyen-Weismark', 'Heiligkreuz', 'Zewen',
  'Euren', 'Pfalzel', 'Ehrang-Quint', 'Ruwer', 'Kürenz'
]

const faqItems = [
  {
    question: 'Wie hoch sind die Immobilienpreise in Trier?',
    answer: 'Die Immobilienpreise in Trier variieren stark nach Lage. Im Stadtzentrum und beliebten Stadtteilen wie Olewig oder Tarforst liegen die Quadratmeterpreise für Wohnungen bei 2.500-4.000 €, während Einfamilienhäuser je nach Ausstattung zwischen 400.000 € und über 1 Million € kosten können. Im Umland sind die Preise deutlich moderater.'
  },
  {
    question: 'Ist Trier ein guter Standort für Immobilien?',
    answer: 'Trier als älteste Stadt Deutschlands bietet eine hohe Lebensqualität mit guter Infrastruktur, Universität, kulturellem Angebot und schöner Lage an der Mosel. Die stabile Nachfrage durch Studierende, Berufstätige und die Nähe zu Luxemburg macht Trier zu einem attraktiven Immobilienstandort.'
  },
  {
    question: 'Welche Stadtteile in Trier sind besonders gefragt?',
    answer: 'Besonders beliebt sind Olewig (weinbaugeprägt, ruhig), Tarforst (universitätsnah), die Innenstadt (zentral, historisch) und Feyen-Weismark (familienfreundlich). Für Pendler nach Luxemburg sind auch Stadtteile mit guter Autobahnanbindung attraktiv.'
  },
  {
    question: 'Bieten Sie auch Immobilien im Trierer Umland an?',
    answer: 'Ja, neben Trier betreue ich auch Immobilien im gesamten Landkreis Trier-Saarburg sowie in der Region Hochwald. Mein Büro in Hermeskeil liegt zentral zwischen Trier und dem Hochwald, sodass ich beide Regionen optimal bedienen kann.'
  },
]

export default function TrierPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/djqviyb2c/image/upload/w_1920,q_80/v1769251684/Bildschirmfoto_2026-01-24_um_11.47.56_ozajy1.png"
            alt="Immobilien in Trier"
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
              <span className="font-medium">Trier & Trier-Saarburg</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" data-aos="fade-up" data-aos-delay="100">
              Ihr Immobilienmakler für Trier
            </h1>
            <p className="text-xl text-gray-200 mb-8" data-aos="fade-up" data-aos-delay="200">
              Sandro Mezzarano von Wüstenrot Immobilien – Ihr Experte für den Immobilienmarkt
              in Trier und dem Landkreis Trier-Saarburg. Kompetent, persönlich, erfolgreich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="300">
              <Link href="/kontakt" className="btn-primary">
                Kostenlose Beratung anfragen
              </Link>
              <Link href="/immobilien?ort=Trier" className="btn-secondary border-white text-white hover:bg-white/10">
                Immobilien in Trier
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
            <span>Büro in Hermeskeil – 25 Min. von Trier</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              Immobilienmarkt Trier – Tradition trifft Moderne
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                <strong>Trier</strong>, die älteste Stadt Deutschlands, vereint römisches Erbe mit modernem
                Stadtleben. Als Oberzentrum der Region bietet Trier exzellente Infrastruktur, eine renommierte
                Universität, vielfältige Kulturangebote und eine traumhafte Lage an der Mosel.
              </p>
              <p>
                Der Trierer Immobilienmarkt profitiert von der stabilen Nachfrage durch Studierende, Berufstätige
                und die Nähe zum Wirtschaftsstandort Luxemburg. Ob Sie eine Eigentumswohnung in der historischen
                Innenstadt suchen, ein Einfamilienhaus in den grünen Stadtteilen oder eine Kapitalanlage in
                Universitätsnähe – ich unterstütze Sie mit lokaler Marktkenntnis.
              </p>
              <p>
                Als Wüstenrot Immobilienpartner biete ich Ihnen nicht nur Maklerdienste, sondern auch die
                Vermittlung attraktiver Finanzierungslösungen aus einer Hand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stadtteile */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center" data-aos="fade-up">
            Immobilien in allen Trierer Stadtteilen
          </h2>
          <p className="text-secondary-600 text-center max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
            Ich kenne die Besonderheiten jedes Trierer Stadtteils und finde die passende
            Immobilie für Ihre individuellen Anforderungen.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {stadtteile.map((stadtteil, index) => (
              <div
                key={stadtteil}
                className="bg-white rounded-lg p-4 text-center shadow-sm smooth-hover"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <span className="text-secondary-700 text-sm">{stadtteil}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Meine Leistungen für Trier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl smooth-hover" data-aos="fade-up">
              <Home className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-bold text-secondary-900 mb-3">Immobilien kaufen</h3>
              <p className="text-secondary-600 mb-4">
                Profitieren Sie von meiner Marktkenntnis bei der Suche nach Ihrer Traumimmobilie in Trier.
              </p>
              <ul className="space-y-2 text-secondary-700 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  Bedarfsanalyse
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  Objektvorauswahl
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  Besichtigungsbegleitung
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl smooth-hover" data-aos="fade-up" data-aos-delay="100">
              <TrendingUp className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-bold text-secondary-900 mb-3">Immobilien verkaufen</h3>
              <p className="text-secondary-600 mb-4">
                Ich verkaufe Ihre Immobilie in Trier zum bestmöglichen Preis – diskret oder mit voller Vermarktung.
              </p>
              <ul className="space-y-2 text-secondary-700 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  Kostenlose Bewertung
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  Professionelles Exposé
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  Bonitätsprüfung Käufer
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl smooth-hover" data-aos="fade-up" data-aos-delay="200">
              <Building2 className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-bold text-secondary-900 mb-3">Kapitalanlage</h3>
              <p className="text-secondary-600 mb-4">
                Renditestarke Anlageimmobilien in Trier – ideal für Investoren und Vermieter.
              </p>
              <ul className="space-y-2 text-secondary-700 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  Renditeberechnung
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  Studentenwohnungen
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  Mehrfamilienhäuser
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Network */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center" data-aos="fade-up">
            Auch aktiv im Landkreis Trier-Saarburg
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
            Neben der Stadt Trier betreue ich Immobilien im gesamten Landkreis und
            angrenzenden Regionen.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Konz',
              'Schweich',
              'Saarburg',
              'Hermeskeil',
              'Kell am See',
              'Longuich',
              'Fell',
              'Waldrach',
            ].map((ort, index) => (
              <Link
                key={ort}
                href={ort === 'Hermeskeil' ? '/regionen/hermeskeil' : ort === 'Schweich' ? '/regionen/schweich' : '/immobilien'}
                className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-colors"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <span className="text-white">{ort}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center" data-aos="fade-up">
            Häufige Fragen zum Immobilienmarkt Trier
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
            Immobilie in Trier kaufen oder verkaufen?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie mich für eine persönliche Beratung – kostenlos und unverbindlich.
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
