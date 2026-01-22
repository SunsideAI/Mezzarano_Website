import Image from 'next/image'
import Link from 'next/link'
import { Award, Users, Target, Heart, CheckCircle, Mail, Phone, Linkedin } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Präzision',
    description: 'Wir analysieren den Markt genau und finden für Sie das perfekte Objekt.',
  },
  {
    icon: Heart,
    title: 'Leidenschaft',
    description: 'Immobilien sind unsere Leidenschaft. Das spüren Sie in jedem Gespräch.',
  },
  {
    icon: Users,
    title: 'Persönlichkeit',
    description: 'Jeder Kunde ist einzigartig. Unsere Beratung ist es auch.',
  },
  {
    icon: Award,
    title: 'Exzellenz',
    description: 'Höchste Qualitätsstandards in allem, was wir tun.',
  },
]

const team = [
  {
    name: 'Marco Mezzarano',
    role: 'Geschäftsführer',
    description: 'Über 25 Jahre Erfahrung in der Immobilienbranche. Spezialisiert auf Luxusimmobilien.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    name: 'Sandra Weber',
    role: 'Leitung Verkauf',
    description: 'Expertin für Wohnimmobilien in Berlin und Brandenburg mit 15 Jahren Erfahrung.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    name: 'Max Schmidt',
    role: 'Senior Berater',
    description: 'Spezialisiert auf Gewerbeimmobilien und Investmentberatung.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Lisa Hoffmann',
    role: 'Kundenbetreuung',
    description: 'Ihr erster Ansprechpartner für alle Fragen rund um unsere Immobilien.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
]

const milestones = [
  { year: '2003', title: 'Gründung', description: 'Marco Mezzarano gründet das Unternehmen in Berlin.' },
  { year: '2008', title: 'Expansion', description: 'Eröffnung der zweiten Niederlassung in Potsdam.' },
  { year: '2015', title: 'Auszeichnung', description: 'Ausgezeichnet als Top-Immobilienmakler Berlin.' },
  { year: '2020', title: '50 Mitarbeiter', description: 'Das Team wächst auf über 50 Experten.' },
  { year: '2023', title: '1.500 Objekte', description: 'Meilenstein: 1.500 erfolgreich vermittelte Immobilien.' },
]

export default function UeberUnsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-primary-900">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Über Mezzarano Immobilien
            </h1>
            <p className="text-xl text-gray-300">
              Seit über 20 Jahren Ihr vertrauenswürdiger Partner für erstklassige Immobilien
              in Berlin und Umgebung.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Mezzarano Büro"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold-500 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-5xl font-bold">20+</div>
                  <div className="text-sm">Jahre Erfahrung</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="section-title mb-6">Unsere Geschichte</h2>
              <p className="text-gray-600 mb-6">
                Was 2003 als kleines Maklerbüro in Berlin-Charlottenburg begann, ist heute eines
                der führenden Immobilienunternehmen der Region. Gründer Marco Mezzarano brachte
                seine Leidenschaft für Architektur und sein Gespür für Menschen zusammen, um
                ein Unternehmen zu schaffen, das anders ist.
              </p>
              <p className="text-gray-600 mb-6">
                Unser Erfolgsgeheimnis? Wir hören zu. Wir verstehen, dass hinter jeder
                Immobiliensuche eine persönliche Geschichte steckt. Ob Sie Ihr erstes Eigenheim
                kaufen, in eine Kapitalanlage investieren oder das perfekte Büro für Ihr
                Unternehmen suchen – wir begleiten Sie mit Kompetenz und Herzblut.
              </p>
              <ul className="space-y-3">
                {['Über 1.500 vermittelte Immobilien', 'Präsenz in Berlin und Brandenburg', 'Team aus 50+ Experten', 'Mitglied im IVD'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary-700 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Unsere Werte</h2>
            <p className="section-subtitle mx-auto">
              Diese Prinzipien leiten uns bei allem, was wir tun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white p-8 rounded-xl text-center group hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-700 transition-colors">
                  <value.icon className="h-8 w-8 text-primary-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Unsere Meilensteine</h2>
            <p className="section-subtitle mx-auto">
              Eine Erfolgsgeschichte, die stetig wächst
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg inline-block">
                      <div className="text-3xl font-bold text-primary-700 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary-700 rounded-full hidden md:block relative z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Unser Team</h2>
            <p className="section-subtitle mx-auto">
              Lernen Sie die Menschen kennen, die Mezzarano ausmachen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl overflow-hidden shadow-lg group"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-primary-700 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@mezzarano.de`}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-700 hover:text-white transition-colors text-gray-600"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href="tel:+491234567890"
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-700 hover:text-white transition-colors text-gray-600"
                    >
                      <Phone className="h-5 w-5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-700 hover:text-white transition-colors text-gray-600"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-900">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
            Werden Sie Teil unserer Erfolgsgeschichte
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ob als Kunde oder als Teil unseres Teams – wir freuen uns auf Sie!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-gold">
              Kontakt aufnehmen
            </Link>
            <Link href="/karriere" className="btn-secondary border-white text-white hover:bg-white/10">
              Karriere bei Mezzarano
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
