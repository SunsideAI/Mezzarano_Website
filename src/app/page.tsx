import Link from 'next/link'
import Image from 'next/image'
import { Home, Key, TrendingUp, Users, Award, CheckCircle, ArrowRight, Star, Phone } from 'lucide-react'
import PropertyCard from '@/components/PropertyCard'
import AirtablePropertyCard from '@/components/AirtablePropertyCard'
import { getFeaturedProperties } from '@/data/properties'
import HeroSlider from '@/components/HeroSlider'
import RegionsGrid from '@/components/RegionsGrid'
import { fetchProperties, AirtableProperty } from '@/lib/airtable'

// Force dynamic rendering to fetch fresh Airtable data
export const dynamic = 'force-dynamic'
export const revalidate = 0

const services = [
  {
    icon: Home,
    title: 'Immobilien kaufen',
    description: 'Finden Sie Ihr Traumhaus aus unserem exklusiven Portfolio an Häusern, Wohnungen und Villen.',
  },
  {
    icon: Key,
    title: 'Immobilien verkaufen',
    description: 'Professionelle Vermarktung Ihrer Immobilie zum bestmöglichen Preis.',
  },
  {
    icon: TrendingUp,
    title: 'Immobilienbewertung',
    description: 'Kostenlose und marktgerechte Wertermittlung für Ihre Immobilie.',
  },
  {
    icon: Users,
    title: 'Persönliche Beratung',
    description: 'Individuelle Betreuung von der ersten Anfrage bis zum erfolgreichen Abschluss.',
  },
]

const stats = [
  { value: '16+', label: 'Jahre Erfahrung' },
  { value: '200+', label: 'Vermittelte Objekte' },
  { value: '100%', label: 'Persönliche Betreuung' },
  { value: '6+', label: 'Regionen betreut' },
]

const testimonials = [
  {
    name: 'Familie Schneider',
    location: 'Hermeskeil',
    text: 'Herr Mezzarano hat uns kompetent beim Hauskauf beraten. Seine Ortskenntnis im Hochwald ist unschlagbar!',
    rating: 5,
  },
  {
    name: 'Thomas Weber',
    location: 'Trier',
    text: 'Schnelle Vermittlung meiner Eigentumswohnung zu einem hervorragenden Preis. Absolute Empfehlung!',
    rating: 5,
  },
  {
    name: 'Petra Hoffmann',
    location: 'Schweich',
    text: 'Kompetent, zuverlässig und immer erreichbar. So stelle ich mir Immobilienservice vor.',
    rating: 5,
  },
]

export default async function HomePage() {
  // Fetch from Airtable, fall back to static data
  let airtableProperties: AirtableProperty[] = []
  try {
    airtableProperties = await fetchProperties({ show_all: true })
  } catch (error) {
    console.error('Failed to fetch Airtable properties:', error)
  }

  const staticFeaturedProperties = getFeaturedProperties()
  const hasAirtableData = airtableProperties.length > 0

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Services Section */}
      <section className="py-20 bg-warmgrau">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title mb-4">Unsere Leistungen</h2>
            <p className="section-subtitle mx-auto">
              Umfassende Dienstleistungen rund um Immobilien –
              persönlich, professionell und mit Leidenschaft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-white p-8 rounded-fenster shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-14 h-14 bg-wuestenrot-25 rounded-muenze flex items-center justify-center mb-6 group-hover:bg-wuestenrot transition-colors duration-300">
                  <service.icon className="h-7 w-7 text-wuestenrot group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-wuestennacht mb-3 font-ww-bold">
                  {service.title}
                </h3>
                <p className="text-wuestennacht-light">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12" data-aos="fade-up">
            <div>
              <h2 className="section-title mb-2">Aktuelle Immobilien</h2>
              <p className="text-wuestennacht-light">
                {hasAirtableData ? 'Live aus unserem Angebot' : 'Entdecken Sie unsere Top-Angebote'}
              </p>
            </div>
            <Link href="/immobilien" className="btn-secondary group ripple">
              Alle Immobilien
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {hasAirtableData ? (
              airtableProperties.slice(0, 4).map((property, index) => (
                <div key={property.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <AirtablePropertyCard property={property} priority={index < 2} />
                </div>
              ))
            ) : (
              staticFeaturedProperties.map((property, index) => (
                <div key={property.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <PropertyCard property={property} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-wuestennacht text-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-ww-bold">
                Ihr lokaler <span className="text-wuestenrot">Wüstenrot</span> Immobilienpartner
              </h2>
              <p className="text-white/80 mb-6 text-lg font-ww-regular">
                Als Ihr Wüstenrot Immobilienexperte in Hermeskeil biete ich Ihnen persönliche
                Beratung mit umfassender Marktkenntnis. Mein Erfolg basiert auf Vertrauen,
                Kompetenz und individuellem Service für jeden Kunden.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Umfassende Marktkenntnis in der Region',
                  'Transparente Prozesse von Anfang bis Ende',
                  'Persönliche Betreuung – kein Call-Center',
                  'Wüstenrot Finanzierungsnetzwerk',
                ].map((item, index) => (
                  <li key={item} className="flex items-center gap-3" style={{ animationDelay: `${index * 100}ms` }}>
                    <CheckCircle className="h-5 w-5 text-wuestenrot flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/ueber-uns" className="btn-primary btn-shine group">
                Mehr über mich
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6" data-aos="fade-left">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-fenster p-6 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <div className="text-4xl font-bold text-wuestenrot mb-2 font-ww-bold">
                    {stat.value}
                  </div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="section-title mb-4">Unsere Regionen</h2>
            <p className="section-subtitle mx-auto">
              Aktiv in Hermeskeil, Trier, an der Mosel und im gesamten Hochwald
            </p>
          </div>

          <RegionsGrid />
        </div>
      </section>

      {/* Trust Section - Makler Portrait & Auszeichnungen */}
      <section className="py-20 bg-gradient-to-b from-white to-warmgrau">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="section-title mb-4">Ihr Ansprechpartner</h2>
            <p className="section-subtitle mx-auto">
              Kompetenz und Vertrauen aus einer Hand
            </p>
          </div>

          {/* Portrait Card */}
          <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-white rounded-fenster shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-2/5 relative">
                  <div className="aspect-[3/4] md:aspect-auto md:h-full relative">
                    <Image
                      src="https://res.cloudinary.com/djqviyb2c/image/upload/w_600,q_80/v1770806323/Lebenskunst-Photography_-078_-_Sandro_-_11.09.2025_-_Business_fotografie-_Trier-13__2_r18b6c.jpg"
                      alt="Sandro Mezzarano - Ihr Immobilienmakler"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                {/* Content */}
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-wuestennacht mb-2 font-ww-bold">
                    Sandro Mezzarano
                  </h3>
                  <p className="text-wuestenrot font-semibold mb-4 font-ww-bold">
                    Wüstenrot Immobilienberater
                  </p>
                  <p className="text-wuestennacht-light mb-4 leading-relaxed font-ww-regular">
                    Mit über 16 Jahren Erfahrung in der Immobilienbranche bin ich Ihr verlässlicher Partner
                    für alle Fragen rund um Kauf, Verkauf und Bewertung von Immobilien in der Region
                    Trier-Saarburg und im Hochwald.
                  </p>
                  <p className="text-wuestennacht-light leading-relaxed font-ww-regular">
                    Persönliche Beratung, transparente Prozesse und die Stärke eines großen Netzwerks –
                    dafür stehe ich mit meinem Namen.
                  </p>
                  <div className="mt-6">
                    <Link href="/ueber-uns" className="text-wuestenrot font-semibold hover:text-wuestenrot-hover inline-flex items-center gap-2 group font-ww-bold">
                      Mehr erfahren
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Awards - Simple Logo Bar */}
          <div className="mt-12 pt-12 border-t border-warmgrau" data-aos="fade-up" data-aos-delay="200">
            <p className="text-center text-wuestennacht-hover text-sm mb-6">
              Ausgezeichnet für höchste Beratungsqualität
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <Image
                src="https://res.cloudinary.com/djqviyb2c/image/upload/w_300,q_80/v1770805619/Focus_Money_H%C3%B6chste_Kompetenz_WUESTENROT_IMMOBILIEN_2025_gnwd3c.jpg"
                alt="Focus Money - Höchste Kompetenz 2025"
                width={100}
                height={130}
                className="object-contain opacity-90"
              />
              <Image
                src="https://res.cloudinary.com/djqviyb2c/image/upload/w_300,q_80/v1770805619/Handelsblatt_Exzellente_Kundenberatung_WUESTENROT_IMMOBILIEN_2025_z9rek4.jpg"
                alt="Handelsblatt - Exzellente Kundenberatung 2025"
                width={100}
                height={130}
                className="object-contain opacity-90"
              />
              <Image
                src="https://res.cloudinary.com/djqviyb2c/image/upload/w_300,q_80/v1770805619/LOGO_Fachmakler_Geb%C3%A4udemodernisierung_p0gwkj.png"
                alt="Fachmakler Gebäudemodernisierung"
                width={100}
                height={130}
                className="object-contain opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="section-title mb-4">Was Kunden sagen</h2>
            <p className="section-subtitle mx-auto">
              Ihre Zufriedenheit ist mein größter Erfolg
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-warmgrau p-6 rounded-fenster border border-warmgrau relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Quote Icon */}
                <div className="absolute -top-3 left-6">
                  <div className="bg-wuestenrot text-white w-8 h-8 rounded-muenze flex items-center justify-center text-xl font-serif">
                    &ldquo;
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-wuestennacht-light mb-4 leading-relaxed font-ww-regular">
                    {testimonial.text}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/50">
                    <div>
                      <div className="font-semibold text-wuestennacht font-ww-bold">{testimonial.name}</div>
                      <div className="text-sm text-wuestennacht-hover">{testimonial.location}</div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-wuestenrot text-wuestenrot" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Google Reviews Link */}
          <div className="text-center mt-10" data-aos="fade-up">
            <a
              href="https://www.google.com/maps/place/W%C3%BCstenrot+Immobilien+Sandro+Mezzarano"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-wuestennacht-light hover:text-wuestenrot transition-colors"
            >
              <span>Mehr Bewertungen auf Google</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-wuestenrot">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-ww-bold">
            Bereit, Ihre Traumimmobilie zu finden?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-ww-regular">
            Kontaktieren Sie mich noch heute für eine unverbindliche Beratung.
            Ich stehe Ihnen persönlich zur Verfügung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary bg-white text-wuestenrot hover:bg-warmgrau group">
              Jetzt Kontakt aufnehmen
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="tel:01776542977" className="btn-outline">
              <Phone className="mr-2 h-5 w-5" />
              0177 6542977
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
