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
      <section className="py-24 bg-wuestennacht">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-wuestenrot-light mb-4" data-aos="fade-up">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Immobilie verkaufen</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-ww-bold font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100">
              Ihr Immobilienverkauf in besten Händen
            </h1>
            <p className="text-xl text-white/70 mb-8" data-aos="fade-up" data-aos-delay="200">
              Als Ihr Wüstenrot-Partner in Hermeskeil begleite ich Sie persönlich durch den gesamten Verkaufsprozess - von der ersten Bewertung bis zur Schlüsselübergabe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="300">
              <Link href="/kontakt" className="btn-primary">
                Kostenlose Bewertung anfragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="tel:01776542977" className="btn-outline border-white text-white hover:bg-white hover:text-wuestennacht">
                <Phone className="h-5 w-5 mr-2" />
                0177 6542977
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-warmgrau">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title font-ww-bold mb-4">Ihre Vorteile beim Verkauf mit mir</h2>
            <p className="section-subtitle mx-auto">
              Profitieren Sie von meiner Erfahrung und dem starken Wüstenrot-Netzwerk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white p-8 rounded-fenster text-center group hover:shadow-xl transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-wuestenrot-25 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-wuestenrot transition-colors">
                  <benefit.icon className="h-8 w-8 text-wuestenrot group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-ww-bold font-bold text-wuestennacht mb-3">{benefit.title}</h3>
                <p className="text-wuestennacht-light">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title font-ww-bold mb-4">So verkaufen wir Ihre Immobilie</h2>
            <p className="section-subtitle mx-auto">
              Ein transparenter Prozess für Ihren erfolgreichen Immobilienverkauf
            </p>
          </div>

          <div className="space-y-6">
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
                  <div className="bg-white p-8 rounded-fenster shadow-lg border border-warmgrau">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-wuestennacht rounded-fenster flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{step.step}</span>
                      </div>
                      <div className="w-12 h-12 bg-wuestenrot rounded-fenster flex items-center justify-center">
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-ww-bold font-bold text-wuestennacht mb-3">{step.title}</h3>
                    <p className="text-wuestennacht-light">{step.description}</p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2">
                  <div className={`h-1 bg-gradient-to-r ${
                    index % 2 === 0 ? 'from-wuestenrot to-transparent' : 'from-transparent to-wuestenrot'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-wuestennacht text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-ww-bold font-bold mb-6">
                Warum Sie mit mir verkaufen sollten
              </h2>
              <p className="text-white/70 mb-8">
                Als Ihr lokaler Wüstenrot-Immobilienberater kenne ich den Markt in Hermeskeil, Trier und der Moselregion wie kaum ein anderer. Diese Expertise kombiniere ich mit persönlicher Betreuung und einem starken Netzwerk.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sellingPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-wuestenrot flex-shrink-0" />
                    <span className="text-white/70">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-fenster">
                <h3 className="text-2xl font-ww-bold font-bold mb-6">Kostenlose Immobilienbewertung</h3>
                <p className="text-white/70 mb-6">
                  Erfahren Sie den aktuellen Marktwert Ihrer Immobilie - unverbindlich und kostenfrei.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-wuestenrot" />
                    <span>Termin innerhalb von 48 Stunden</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-wuestenrot" />
                    <span>Fundierte Marktanalyse</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-wuestenrot" />
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
      <section className="py-20 bg-gradient-to-br from-wuestenrot to-wuestenrot-hover">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-ww-bold font-bold text-white mb-6">
            Bereit, Ihre Immobilie zu verkaufen?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam den besten Preis für Ihre Immobilie erzielen. Ich freue mich auf Ihren Anruf!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary bg-white text-wuestenrot hover:bg-warmgrau">
              Kontakt aufnehmen
            </Link>
            <a href="tel:01776542977" className="btn-outline-dark">
              <Phone className="h-5 w-5 mr-2" />
              0177 6542977
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
