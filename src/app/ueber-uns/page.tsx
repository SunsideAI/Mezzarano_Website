import Image from 'next/image'
import Link from 'next/link'
import { Award, Users, Target, Heart, CheckCircle, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Präzision',
    description: 'Genaue Marktanalyse und passgenaue Objektauswahl für Ihre Bedürfnisse.',
  },
  {
    icon: Heart,
    title: 'Leidenschaft',
    description: 'Immobilien sind meine Leidenschaft. Das spüren Sie in jedem Gespräch.',
  },
  {
    icon: Users,
    title: 'Persönlichkeit',
    description: 'Jeder Kunde ist einzigartig. Meine Beratung ist es auch.',
  },
  {
    icon: Award,
    title: 'Expertise',
    description: 'Lokale Marktkenntnis kombiniert mit Wüstenrot Netzwerk.',
  },
]

const services = [
  'Professionelle Immobilienbewertung',
  'Vermarktung Ihrer Immobilie',
  'Käufersuche und -betreuung',
  'Begleitung bis zum Notar',
  'Finanzierungsberatung durch Wüstenrot',
  'Umfassende Marktkenntnis der Region',
]

export default function UeberUnsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-secondary-900 min-h-[50vh] flex items-center">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-aos="fade-up">
              Über mich
            </h1>
            <p className="text-xl text-gray-300" data-aos="fade-up" data-aos-delay="100">
              Ihr persönlicher Wüstenrot Immobilienpartner in Hermeskeil und der Region Trier-Mosel.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative" data-aos="fade-right">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/djqviyb2c/image/upload/w_800,q_80/v1769254175/Mezzarano-bearb-1024x758_vgqhbw.jpg"
                  alt="Sandro Mezzarano - Wüstenrot Immobilien"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary-500 rounded-2xl flex items-center justify-center shadow-xl counter-animate">
                <div className="text-center text-white">
                  <div className="text-5xl font-bold">10+</div>
                  <div className="text-sm">Jahre Erfahrung</div>
                </div>
              </div>
            </div>

            <div data-aos="fade-left">
              <h2 className="section-title mb-6">Sandro Mezzarano</h2>
              <p className="text-primary-500 font-semibold mb-4">Wüstenrot Immobilienberater</p>
              <p className="text-gray-600 mb-6">
                Als Ihr Wüstenrot Immobilienpartner in Hermeskeil verbinde ich persönliche Betreuung
                mit der Stärke eines renommierten Finanzdienstleisters. Mein Ziel ist es, Sie
                kompetent und vertrauensvoll bei allen Immobilienangelegenheiten zu begleiten.
              </p>
              <p className="text-gray-600 mb-6">
                Die Region Hermeskeil, Trier und das Moseltal kenne ich wie meine Westentasche.
                Diese lokale Expertise kombiniere ich mit dem bundesweiten Wüstenrot-Netzwerk,
                um Ihnen den bestmöglichen Service zu bieten – von der Bewertung bis zur Finanzierung.
              </p>
              <ul className="space-y-3">
                {services.map((item, index) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title mb-4">Meine Werte</h2>
            <p className="section-subtitle mx-auto">
              Diese Prinzipien leiten mich bei jedem Kundenkontakt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white p-8 rounded-xl text-center group hover:shadow-xl transition-all smooth-hover"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500 transition-colors">
                  <value.icon className="h-8 w-8 text-primary-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Wüstenrot */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="section-title mb-6">Warum Wüstenrot?</h2>
              <p className="text-gray-600 mb-6">
                Wüstenrot ist seit über 100 Jahren einer der führenden Finanzdienstleister in Deutschland.
                Als Partner profitieren Sie von dieser Erfahrung und einem umfassenden Netzwerk.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Starke Marke</h4>
                    <p className="text-gray-600 text-sm">Vertrauen durch über 100 Jahre Erfahrung</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Finanzierungsnetzwerk</h4>
                    <p className="text-gray-600 text-sm">Direkte Anbindung an Finanzierungsexperten</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Bundesweite Reichweite</h4>
                    <p className="text-gray-600 text-sm">Zugang zu überregionalen Käufern und Verkäufern</p>
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="bg-secondary-900 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-6">Kontaktieren Sie mich</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Telefon</p>
                      <a href="tel:01776542977" className="text-lg hover:text-primary-400 transition-colors">0177 6542977</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">E-Mail</p>
                      <a href="mailto:sandro.mezzarano@wuestenrot.de" className="hover:text-primary-400 transition-colors">sandro.mezzarano@wuestenrot.de</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Adresse</p>
                      <p>Saarstraße 1, 54411 Hermeskeil</p>
                    </div>
                  </div>
                </div>
                <Link href="/kontakt" className="btn-primary w-full justify-center group">
                  Beratungstermin vereinbaren
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Lassen Sie uns gemeinsam Ihre Immobilienziele erreichen
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ob Kauf, Verkauf oder Bewertung – ich bin persönlich für Sie da.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary bg-white text-primary-500 hover:bg-gray-100">
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
