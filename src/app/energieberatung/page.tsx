import Link from 'next/link'
import { Home, CheckCircle, PiggyBank, Phone as PhoneIcon, Leaf, FileText, ClipboardCheck, HardHat, ArrowRight, Phone, Shield, TrendingUp, Zap } from 'lucide-react'
import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Energieberatung für Ihr Zuhause | Wüstenrot Energieberatung | Mezzarano',
  description: 'Professionelle Energieberatung in Hermeskeil, Trier und der Moselregion. BAFA-zertifiziert, Fördermittelberatung, iSFP Sanierungsfahrplan. Kostenlose Erstberatung.',
}

const benefits = [
  {
    icon: Home,
    title: 'Individuell',
    description: 'Von der Beratung über die Planung bis zum Antrag – alles aus einer Hand.',
  },
  {
    icon: CheckCircle,
    title: 'Energieberater',
    description: 'BAFA-zertifiziert, unabhängig und deutschlandweit tätig.',
  },
  {
    icon: PiggyBank,
    title: 'Fördermittel',
    description: 'Förderungen optimal nutzen & Energiekosten nachhaltig senken.',
  },
  {
    icon: PhoneIcon,
    title: 'Einstiegsberatung',
    description: 'Kostenlos, unverbindlich und ohne Risiko.',
  },
]

const services = [
  {
    icon: ClipboardCheck,
    title: 'Individueller Sanierungsfahrplan (iSFP)',
    description: 'Der iSFP zeigt Ihnen Schritt für Schritt, wie Sie Ihre Immobilie energetisch optimieren können. Mit einem iSFP erhalten Sie bis zu 5% zusätzliche Förderung auf Einzelmaßnahmen.',
    highlight: 'Bis zu 80% Förderung',
  },
  {
    icon: FileText,
    title: 'Energieausweis',
    description: 'Verbrauchsausweis oder Bedarfsausweis für Wohn- und Nichtwohngebäude. GEG-konform, 10 Jahre gültig, Auslieferung innerhalb von 48 Stunden.',
    highlight: 'Ab 59 € inkl. MwSt.',
    link: '/energieberatung/energieausweis',
  },
  {
    icon: PiggyBank,
    title: 'Fördermittelberatung',
    description: 'Wir kennen alle aktuellen Förderprogramme von BAFA, KfW und regionalen Anbietern. So sichern Sie sich die maximale Förderung für Ihre Sanierung.',
    highlight: 'Maximale Förderung',
  },
  {
    icon: Leaf,
    title: 'Vor-Ort-Energieberatung',
    description: 'Unsere Energieberater analysieren Ihre Immobilie vor Ort und identifizieren Einsparpotenziale bei Heizung, Dämmung und Fenstern.',
    highlight: 'Persönliche Beratung',
  },
  {
    icon: HardHat,
    title: 'Baubegleitung',
    description: 'Professionelle Begleitung Ihrer energetischen Sanierung. Wir überwachen die fachgerechte Umsetzung und sichern Ihre Fördermittel.',
    highlight: 'Qualitätssicherung',
  },
]

const reasons = [
  {
    icon: TrendingUp,
    title: 'Wertsteigerung',
    description: 'Eine gute Energieeffizienzklasse steigert den Wert Ihrer Immobilie deutlich.',
  },
  {
    icon: PiggyBank,
    title: 'Kosten sparen',
    description: 'Reduzieren Sie Ihre Energiekosten um bis zu 80% durch gezielte Maßnahmen.',
  },
  {
    icon: Leaf,
    title: 'Umwelt schützen',
    description: 'Senken Sie Ihren CO₂-Fußabdruck und leisten Sie einen Beitrag zum Klimaschutz.',
  },
  {
    icon: Shield,
    title: 'Zukunftssicher',
    description: 'Erfüllen Sie schon heute die Anforderungen von morgen und vermeiden Sie Sanierungsstau.',
  },
]

export default function EnergieberatungPage() {
  return (
    <div className="min-h-screen">
      {/* Hero with Wüstenrot Layout-Prinzipien */}
      <PageHero
        tagline="Wüstenrot Energieberatung"
        icon={Zap}
        lines={[
          { text: 'energieberatung' },
          { text: 'für ihr zuhause' },
        ]}
        subheadline="Als zertifizierter Energieberater unterstütze ich Sie dabei, Ihre Immobilie zukunftssicher zu machen – mit individueller Beratung und umfassender Fördermittelberatung."
        primaryCta={{
          text: 'Kostenlose Anfrage starten',
          href: '/kontakt',
        }}
      />

      {/* Benefits */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title mb-4">Ihre Vorteile bei der Wüstenrot Energieberatung</h2>
            <p className="section-subtitle mx-auto">
              Professionelle Unterstützung auf dem Weg zur energieeffizienten Immobilie
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

      {/* Services */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title mb-4">Unsere Leistungen</h2>
            <p className="section-subtitle mx-auto">
              Von der Erstberatung bis zur Umsetzung – wir begleiten Sie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors">
                  <service.icon className="h-7 w-7 text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                  {service.highlight}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {service.link && (
                  <Link href={service.link} className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center gap-1">
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Energy Consulting */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title mb-4">Warum Energieberatung?</h2>
            <p className="section-subtitle mx-auto">
              Investitionen in Energieeffizienz zahlen sich mehrfach aus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <reason.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Energieausweis Teaser */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Online-Energieausweis
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Schnell, einfach und günstig – Ihr Energieausweis ab 59 € inkl. MwSt. GEG-konform und 10 Jahre gültig.
              </p>
              <ul className="space-y-3 text-white mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                  <span>Verbrauchsausweis ab 59 €</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                  <span>Bedarfsausweis ab 99 €</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                  <span>Auslieferung innerhalb 48 Stunden</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                  <span>10 Minuten Erstellungszeit</span>
                </li>
              </ul>
              <Link href="/energieberatung/energieausweis" className="btn-primary bg-white text-primary-500 hover:bg-gray-100">
                Energieausweis erstellen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="hidden lg:flex justify-center" data-aos="fade-left">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl max-w-sm">
                <div className="text-center">
                  <FileText className="h-20 w-20 text-white mx-auto mb-4" />
                  <p className="text-white text-lg font-medium mb-2">Energieausweis</p>
                  <p className="text-white/80 text-sm">GEG-konform · 10 Jahre gültig</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-secondary-900">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Jetzt kostenlose Beratung anfragen
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Lassen Sie sich unverbindlich beraten und erfahren Sie, wie Sie Ihre Immobilie energetisch optimieren und von Fördermitteln profitieren können.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary">
              Kostenlose Beratung anfragen
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a href="tel:01776542977" className="btn-outline border-white text-white hover:bg-white hover:text-secondary-900">
              <Phone className="h-5 w-5 mr-2" />
              0177 6542977
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
