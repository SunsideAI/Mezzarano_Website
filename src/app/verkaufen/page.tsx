import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, TrendingUp, Clock, Shield, Users, Phone, ArrowRight, Home, FileText, UserCheck, Camera, BarChart3 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Immobilie verkaufen in Hermeskeil, Trier & Mosel | Mezzarano Immobilien',
  description: 'Professioneller Immobilienverkauf in der Region Hermeskeil, Trier und Mosel. Kostenlose Bewertung, optimale Vermarktung und persönliche Betreuung bis zum Notar.',
}

const benefits = [
  {
    icon: BarChart3,
    title: 'Kostenlose Bewertung',
    description: 'Professionelle Marktpreiseinschätzung Ihrer Immobilie ohne Kosten und Verpflichtung.',
  },
  {
    icon: Camera,
    title: 'Professionelle Vermarktung',
    description: 'Hochwertige Fotos, aussagekräftige Exposés und Präsenz auf allen wichtigen Portalen.',
  },
  {
    icon: Users,
    title: 'Qualifizierte Käufer',
    description: 'Gezielte Ansprache solventer Interessenten durch unser Wüstenrot-Netzwerk.',
  },
  {
    icon: Shield,
    title: 'Rechtssicherheit',
    description: 'Professionelle Vertragsgestaltung und Begleitung bis zum Notartermin.',
  },
]

const processSteps = [
  {
    step: '01',
    icon: Home,
    title: 'Kostenlose Erstberatung',
    description: 'Wir besichtigen Ihre Immobilie, analysieren den lokalen Markt und erstellen eine fundierte Wertermittlung.',
  },
  {
    step: '02',
    icon: FileText,
    title: 'Verkaufsvorbereitung',
    description: 'Professionelle Fotos, Erstellung des Exposés, Beschaffung aller notwendigen Unterlagen wie Energieausweis.',
  },
  {
    step: '03',
    icon: TrendingUp,
    title: 'Aktive Vermarktung',
    description: 'Präsentation auf führenden Immobilienportalen, in unserem Netzwerk und durch gezielte Direktansprache.',
  },
  {
    step: '04',
    icon: Users,
    title: 'Besichtigungen & Verhandlung',
    description: 'Professionelle Durchführung aller Besichtigungen und Preisverhandlungen in Ihrem Interesse.',
  },
  {
    step: '05',
    icon: UserCheck,
    title: 'Erfolgreicher Abschluss',
    description: 'Begleitung zum Notar, Koordination der Übergabe und Unterstützung bei allen Formalitäten.',
  },
]

const sellingPoints = [
  'Über 10 Jahre Erfahrung in der Region',
  'Wüstenrot-Partner mit starkem Netzwerk',
  'Lokale Marktkenntnis in Hermeskeil, Trier & Mosel',
  'Persönliche Betreuung von A bis Z',
  'Finanzierungsberatung für Käufer inklusive',
  'Transparente Kommunikation',
  'Keine versteckten Kosten',
  'Erfolgsabhängige Provision',
]

export default function VerkaufenPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-semibold mb-6" data-aos="fade-up">
                Immobilie verkaufen
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100">
                Ihr Immobilienverkauf in besten Händen
              </h1>
              <p className="text-xl text-gray-300 mb-8" data-aos="fade-up" data-aos-delay="200">
                Als Ihr Wüstenrot-Partner in Hermeskeil begleite ich Sie persönlich durch den gesamten Verkaufsprozess - von der ersten Bewertung bis zur Schlüsselübergabe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="300">
                <Link href="/kontakt" className="btn-primary">
                  Kostenlose Bewertung anfragen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a href="tel:01776542977" className="btn-outline border-white text-white hover:bg-white hover:text-secondary-900">
                  <Phone className="h-5 w-5 mr-2" />
                  0177 6542977
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block" data-aos="fade-left">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/djqviyb2c/image/upload/w_800,q_80/v1769254175/Mezzarano-bearb-1024x758_vgqhbw.jpg"
                  alt="Sandro Mezzarano - Immobilienverkauf"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title mb-4">Ihre Vorteile beim Verkauf mit mir</h2>
            <p className="section-subtitle mx-auto">
              Profitieren Sie von meiner Erfahrung und dem starken Wüstenrot-Netzwerk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white p-8 rounded-xl text-center group hover:shadow-xl transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500 transition-colors">
                  <benefit.icon className="h-8 w-8 text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title mb-4">So verkaufen wir Ihre Immobilie</h2>
            <p className="section-subtitle mx-auto">
              Ein transparenter Prozess für Ihren erfolgreichen Immobilienverkauf
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-full md:w-1/2">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl font-bold text-primary-100">{step.step}</span>
                      <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2">
                  <div className={`h-1 bg-gradient-to-r ${
                    index % 2 === 0 ? 'from-primary-500 to-transparent' : 'from-transparent to-primary-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Warum Sie mit mir verkaufen sollten
              </h2>
              <p className="text-gray-300 mb-8">
                Als Ihr lokaler Wüstenrot-Immobilienberater kenne ich den Markt in Hermeskeil, Trier und der Moselregion wie kaum ein anderer. Diese Expertise kombiniere ich mit persönlicher Betreuung und einem starken Netzwerk.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sellingPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Kostenlose Immobilienbewertung</h3>
                <p className="text-gray-300 mb-6">
                  Erfahren Sie den aktuellen Marktwert Ihrer Immobilie - unverbindlich und kostenfrei.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary-500" />
                    <span>Termin innerhalb von 48 Stunden</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-primary-500" />
                    <span>Fundierte Marktanalyse</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary-500" />
                    <span>Schriftliches Wertgutachten</span>
                  </li>
                </ul>
                <Link href="/kontakt" className="btn-primary w-full justify-center">
                  Jetzt Bewertung anfragen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bereit, Ihre Immobilie zu verkaufen?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam den besten Preis für Ihre Immobilie erzielen. Ich freue mich auf Ihren Anruf!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-outline border-white text-white hover:bg-white hover:text-primary-500">
              Kontakt aufnehmen
            </Link>
            <a href="tel:01776542977" className="btn-primary bg-white text-primary-500 hover:bg-gray-100">
              <Phone className="h-5 w-5 mr-2" />
              0177 6542977
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
