import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Search, Key, Shield, Heart, Phone, ArrowRight, Home, FileSearch, Calculator, UserCheck, MapPin } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Immobilie kaufen in Hermeskeil, Trier & Mosel | Mezzarano Immobilien',
  description: 'Finden Sie Ihre Traumimmobilie in Hermeskeil, Trier und der Moselregion. Persönliche Beratung, umfassende Objektauswahl und Finanzierungsunterstützung durch Wüstenrot.',
}

const benefits = [
  {
    icon: Search,
    title: 'Gezielte Suche',
    description: 'Ich finde die passende Immobilie nach Ihren individuellen Wünschen und Anforderungen.',
  },
  {
    icon: Calculator,
    title: 'Finanzierungsberatung',
    description: 'Als Wüstenrot-Partner biete ich Ihnen direkte Finanzierungsberatung aus einer Hand.',
  },
  {
    icon: Shield,
    title: 'Sichere Abwicklung',
    description: 'Professionelle Begleitung von der Besichtigung bis zur notariellen Beurkundung.',
  },
  {
    icon: Heart,
    title: 'Persönliche Betreuung',
    description: 'Individuelle Beratung und Unterstützung auch nach dem Kauf.',
  },
]

const processSteps = [
  {
    step: '01',
    icon: FileSearch,
    title: 'Bedarfsanalyse',
    description: 'Gemeinsam ermitteln wir Ihre Wünsche, Anforderungen und finanziellen Möglichkeiten für Ihre Traumimmobilie.',
  },
  {
    step: '02',
    icon: Search,
    title: 'Objektsuche',
    description: 'Ich durchsuche unser Portfolio, Netzwerk und den Markt nach passenden Immobilien für Sie.',
  },
  {
    step: '03',
    icon: Home,
    title: 'Besichtigungen',
    description: 'Professionell organisierte Besichtigungstermine mit allen relevanten Informationen zum Objekt.',
  },
  {
    step: '04',
    icon: Calculator,
    title: 'Finanzierung',
    description: 'Unterstützung bei der Finanzierung durch unser Wüstenrot-Netzwerk mit attraktiven Konditionen.',
  },
  {
    step: '05',
    icon: UserCheck,
    title: 'Kaufabschluss',
    description: 'Begleitung zum Notar, Koordination der Übergabe und Unterstützung bei allen Formalitäten.',
  },
]

const regions = [
  {
    name: 'Hermeskeil',
    description: 'Zentrale Lage im Hochwald mit guter Anbindung',
    link: '/regionen/hermeskeil',
  },
  {
    name: 'Trier',
    description: 'Älteste Stadt Deutschlands mit vielfältigem Angebot',
    link: '/regionen/trier',
  },
  {
    name: 'Schweich',
    description: 'Attraktiver Wohnort an der Mosel',
    link: '/regionen/schweich',
  },
  {
    name: 'Bernkastel-Kues',
    description: 'Malerische Weinstadt mit Charme',
    link: '/regionen/bernkastel-kues',
  },
]

const buyingTips = [
  'Legen Sie Ihr Budget realistisch fest (inkl. Nebenkosten ca. 10-12%)',
  'Prüfen Sie Ihre Finanzierungsmöglichkeiten vorab',
  'Achten Sie auf Energieeffizienz und mögliche Sanierungskosten',
  'Besichtigen Sie zu verschiedenen Tageszeiten',
  'Informieren Sie sich über die Nachbarschaft',
  'Lassen Sie alle Unterlagen vor dem Kauf prüfen',
]

export default function KaufenPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-wuestennacht">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-wuestenrot mb-4" data-aos="fade-up">
              <Key className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Immobilie kaufen</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-ww-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100">
              Finden Sie Ihre Traumimmobilie
            </h1>
            <p className="text-xl text-white/70 mb-8" data-aos="fade-up" data-aos-delay="200">
              Von der ersten Beratung bis zur Schlüsselübergabe - ich begleite Sie auf dem Weg zu Ihrem neuen Zuhause in Hermeskeil, Trier und der Moselregion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="300">
              <Link href="/immobilien" className="btn-primary">
                Aktuelle Angebote ansehen
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
            <h2 className="section-title font-ww-bold mb-4">Ihre Vorteile beim Immobilienkauf</h2>
            <p className="section-subtitle mx-auto">
              Profitieren Sie von persönlicher Beratung und dem Wüstenrot-Finanzierungsnetzwerk
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
                <h3 className="text-xl font-bold font-ww-bold text-wuestennacht mb-3">{benefit.title}</h3>
                <p className="text-wuestennacht-light">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Listings CTA */}
      <section className="py-16 bg-gradient-to-br from-wuestenrot to-wuestenrot-hover">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h2 className="text-2xl md:text-3xl font-bold font-ww-bold mb-2">Aktuelle Immobilienangebote</h2>
              <p className="text-white">Entdecken Sie unser aktuelles Portfolio an Häusern und Wohnungen</p>
            </div>
            <Link href="/immobilien" className="btn-primary bg-white text-wuestenrot hover:bg-warmgrau flex-shrink-0">
              Alle Immobilien ansehen
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title font-ww-bold mb-4">Ihr Weg zur Traumimmobilie</h2>
            <p className="section-subtitle mx-auto">
              Ein strukturierter Prozess für Ihren erfolgreichen Immobilienkauf
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                className="relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-white p-6 rounded-fenster shadow-lg h-full border border-warmgrau">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-wuestennacht rounded-fenster flex items-center justify-center">
                      <span className="text-lg font-bold text-white">{step.step}</span>
                    </div>
                    <div className="w-10 h-10 bg-wuestenrot rounded-fenster flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold font-ww-bold text-wuestennacht mb-2">{step.title}</h3>
                  <p className="text-wuestennacht-light text-sm">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-warmgrau"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-20 bg-warmgrau">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title font-ww-bold mb-4">Unsere Regionen</h2>
            <p className="section-subtitle mx-auto">
              Entdecken Sie attraktive Wohnlagen in der Region Trier-Mosel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((region, index) => (
              <Link
                key={region.name}
                href={region.link}
                className="bg-white p-6 rounded-fenster shadow-lg hover:shadow-xl transition-all group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-wuestenrot" />
                  <h3 className="text-xl font-bold font-ww-bold text-wuestennacht group-hover:text-wuestenrot transition-colors">
                    {region.name}
                  </h3>
                </div>
                <p className="text-wuestennacht-light text-sm">{region.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Buying Tips */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="section-title font-ww-bold mb-6">Tipps für den Immobilienkauf</h2>
              <p className="text-wuestennacht-light mb-8">
                Der Kauf einer Immobilie ist eine wichtige Entscheidung. Mit diesen Tipps sind Sie gut vorbereitet:
              </p>
              <div className="space-y-4">
                {buyingTips.map((tip) => (
                  <div key={tip} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-wuestenrot flex-shrink-0 mt-0.5" />
                    <span className="text-wuestennacht-light">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="bg-wuestennacht p-8 rounded-fenster text-white">
                <h3 className="text-2xl font-bold font-ww-bold mb-6">Finanzierung mit Wüstenrot</h3>
                <p className="text-white/70 mb-6">
                  Als Wüstenrot-Partner biete ich Ihnen eine umfassende Finanzierungsberatung - direkt und unkompliziert.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-wuestenrot" />
                    <span>Attraktive Zinskonditionen</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-wuestenrot" />
                    <span>Individuelle Finanzierungskonzepte</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-wuestenrot" />
                    <span>KfW-Fördermittel inklusive</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-wuestenrot" />
                    <span>Bausparverträge zur Zinssicherung</span>
                  </li>
                </ul>
                <Link href="/kontakt" className="btn-primary w-full justify-center">
                  Finanzierungsberatung anfragen
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
          <h2 className="text-3xl md:text-4xl font-bold font-ww-bold text-white mb-6">
            Auf der Suche nach Ihrer Traumimmobilie?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Lassen Sie mich wissen, was Sie suchen - ich finde das passende Objekt für Sie!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary bg-white text-wuestenrot hover:bg-warmgrau">
              Suchauftrag erstellen
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
