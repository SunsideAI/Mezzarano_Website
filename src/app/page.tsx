import Link from 'next/link'
import Image from 'next/image'
import { Home, Key, TrendingUp, Users, Award, CheckCircle, ArrowRight, Star } from 'lucide-react'
import PropertyCard from '@/components/PropertyCard'
import AirtablePropertyCard from '@/components/AirtablePropertyCard'
import { getFeaturedProperties } from '@/data/properties'
import HeroSlider from '@/components/HeroSlider'
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

const regions = [
  {
    name: 'Hermeskeil',
    href: '/regionen/hermeskeil',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_600,q_80/v1769251685/Bildschirmfoto_2026-01-24_um_11.47.29_a8ccel.png'
  },
  {
    name: 'Trier',
    href: '/regionen/trier',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_600,q_80/v1769251684/Bildschirmfoto_2026-01-24_um_11.47.56_ozajy1.png'
  },
  {
    name: 'Bernkastel-Kues',
    href: '/regionen/bernkastel-kues',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_600,q_80/v1769251685/Bildschirmfoto_2026-01-24_um_11.48.04_asqrpt.png'
  },
  {
    name: 'Schweich',
    href: '/regionen/schweich',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_600,q_80/v1769251685/Bildschirmfoto_2026-01-24_um_11.47.48_jnakga.png'
  },
  {
    name: 'Saarburg',
    href: '/regionen/saarburg',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_600,q_80/v1770805375/Saarburg_elmn8i.png'
  },
  {
    name: 'Bitburg',
    href: '/regionen/bitburg',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_600,q_80/v1770805358/Bittburg_tejpzq.png'
  },
  {
    name: 'Konz',
    href: '/regionen/konz',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_600,q_80/v1770805357/Konz_eqrxqw.png'
  },
  {
    name: 'Wittlich',
    href: '/regionen/wittlich',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_600,q_80/v1770805357/Wittlich_c5qqd9.png'
  },
  {
    name: 'Hochwald',
    href: '/regionen/hochwald',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_600,q_80/v1770805355/Wald_pxfoka.png'
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
      <section className="py-20 bg-gray-50">
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
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors duration-300">
                  <service.icon className="h-7 w-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-secondary-600">
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
              <p className="text-secondary-600">
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
      <section className="py-20 bg-secondary-900 text-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ihr lokaler <span className="text-primary-500">Wüstenrot</span> Immobilienpartner
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
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
                    <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
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
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <div className="text-4xl font-bold text-primary-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regions.map((region, index) => (
              <Link
                key={region.name}
                href={region.href}
                className="relative group overflow-hidden rounded-xl aspect-[4/3] img-zoom"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Image
                  src={region.image}
                  alt={`Immobilien in ${region.name} - Mezzarano Immobilien`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">{region.name}</h3>
                  <span className="text-white/70 text-sm flex items-center gap-1 group-hover:text-primary-400 transition-colors">
                    Immobilien entdecken
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title mb-4">Was Kunden sagen</h2>
            <p className="section-subtitle mx-auto">
              Ihre Zufriedenheit ist mein größter Erfolg
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 smooth-hover"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary-500 text-primary-500" />
                  ))}
                </div>
                <p className="text-secondary-600 mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-secondary-900">{testimonial.name}</div>
                  <div className="text-sm text-secondary-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div className="container-custom text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-6" data-aos="fade-up">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            Jetzt kostenlos beraten lassen
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100">
            Bereit, Ihre Traumimmobilie zu finden?
          </h2>
          <p className="text-xl text-secondary-300 mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Kontaktieren Sie mich noch heute für eine unverbindliche Beratung.
            Ich stehe Ihnen persönlich zur Verfügung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="300">
            <Link href="/kontakt" className="btn-primary btn-shine group text-lg px-8 py-4">
              Jetzt Kontakt aufnehmen
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="tel:01776542977" className="btn-outline text-lg px-8 py-4">
              <span className="mr-2">📞</span>
              0177 6542977
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
