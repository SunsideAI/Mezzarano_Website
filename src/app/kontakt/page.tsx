'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare, ArrowRight } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    lines: ['Saarstraße 1', '54411 Hermeskeil'],
    link: 'https://maps.google.com/?q=Saarstraße+1+54411+Hermeskeil',
  },
  {
    icon: Phone,
    title: 'Telefon',
    lines: ['0177 6542977', '06503 9523963'],
    link: 'tel:01776542977',
  },
  {
    icon: Mail,
    title: 'E-Mail',
    lines: ['sandro.mezzarano@wuestenrot.de'],
    link: 'mailto:sandro.mezzarano@wuestenrot.de',
  },
  {
    icon: Clock,
    title: 'Erreichbarkeit',
    lines: ['Mo - Fr: 9:00 - 18:00', 'Termine nach Vereinbarung'],
  },
]

const inquiryTypes = [
  { value: 'kaufberatung', label: 'Kaufberatung' },
  { value: 'verkaufsberatung', label: 'Verkaufsberatung' },
  { value: 'mietberatung', label: 'Mietberatung' },
  { value: 'bewertung', label: 'Immobilienbewertung' },
  { value: 'allgemein', label: 'Allgemeine Anfrage' },
]

export default function KontaktPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen">
      {/* Hero - Styleguide: wüstennacht */}
      <section className="bg-wuestennacht py-24 min-h-[400px] flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-headline" data-aos="fade-up">
              kontaktieren sie mich
            </h1>
            <p className="text-xl text-gray-300" data-aos="fade-up" data-aos-delay="100">
              Ich bin persönlich für Sie da. Kontaktieren Sie mich für eine unverbindliche Beratung
              rund um Ihre Immobilie.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards - Fenster-Form */}
      <section className="py-12 bg-warmgrau">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className="bg-white p-6 rounded-fenster shadow-lg text-center group hover:shadow-xl transition-shadow smooth-hover"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-14 h-14 bg-wuestenrot-25 rounded-muenze flex items-center justify-center mx-auto mb-4 group-hover:bg-wuestenrot transition-colors">
                  <info.icon className="h-7 w-7 text-wuestenrot group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-wuestennacht mb-2">{info.title}</h3>
                {info.lines.map((line, index) => (
                  <p key={index} className="text-wuestennacht-light text-sm">
                    {info.link && index === 0 ? (
                      <a href={info.link} className="hover:text-wuestenrot transition-colors">
                        {line}
                      </a>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div data-aos="fade-right">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="h-8 w-8 text-wuestenrot" />
                <h2 className="section-title">Schreiben Sie mir</h2>
              </div>
              <p className="text-wuestennacht-light mb-8">
                Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen.
              </p>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Vielen Dank für Ihre Nachricht!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormState({
                        name: '',
                        email: '',
                        phone: '',
                        inquiryType: '',
                        message: '',
                      })
                    }}
                    className="btn-secondary"
                  >
                    Neue Anfrage senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Ihr vollständiger Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="form-label">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="ihre@email.de"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="form-label">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="+49 123 456 7890"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiryType" className="form-label">
                        Art der Anfrage
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formState.inquiryType}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">Bitte auswählen</option>
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label">
                      Ihre Nachricht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formState.message}
                      onChange={handleChange}
                      className="form-textarea"
                      placeholder="Wie können wir Ihnen helfen?"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="mt-1"
                    />
                    <label htmlFor="privacy" className="text-sm text-wuestennacht-light">
                      Ich habe die{' '}
                      <a href="/datenschutz" className="text-wuestenrot hover:underline">
                        Datenschutzerklärung
                      </a>{' '}
                      gelesen und stimme der Verarbeitung meiner Daten zu.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Wird gesendet...'
                    ) : (
                      <>
                        Nachricht senden
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map and Additional Info */}
            <div data-aos="fade-left">
              <h2 className="section-title mb-6">Besuchen Sie mich</h2>
              <p className="text-wuestennacht-light mb-8">
                Mein Büro befindet sich in Hermeskeil. Ich freue mich auf Ihren Besuch oder einen Termin vor Ort!
              </p>

              {/* Map Embed - Google Maps - Fenster-Form */}
              <div className="h-80 rounded-fenster mb-8 overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2571.5!2d6.9414!3d49.6565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4795b8c5a5a5a5a5%3A0x0!2sSaarstra%C3%9Fe%201%2C%2054411%20Hermeskeil!5e0!3m2!1sde!2sde!4v1706000000000!5m2!1sde!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Standort Mezzarano Immobilien - Saarstraße 1, 54411 Hermeskeil"
                ></iframe>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Saarstraße+1,+54411+Hermeskeil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-wuestenrot hover:text-wuestenrot-hover font-bold mb-8"
              >
                <MapPin className="h-4 w-4" />
                In Google Maps öffnen
              </a>

              {/* Parking & Transport Info - warmgrau Box */}
              <div className="bg-warmgrau p-6 rounded-fenster">
                <h3 className="font-bold text-wuestennacht mb-4">Anfahrt</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-bold text-wuestennacht">Mit dem Auto:</h4>
                    <p className="text-wuestennacht-light">
                      Über die B52 erreichen Sie Hermeskeil aus Richtung Trier oder Saarbrücken.<br />
                      Kostenlose Parkmöglichkeiten direkt vor dem Büro.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-wuestennacht">Aus Trier:</h4>
                    <p className="text-wuestennacht-light">
                      Ca. 30 Minuten Fahrtzeit über die B52 Richtung Hermeskeil.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-wuestennacht">Termin vereinbaren:</h4>
                    <p className="text-wuestennacht-light">
                      Für eine persönliche Beratung vereinbaren Sie gerne einen Termin.<br />
                      Hausbesuche in der gesamten Region sind möglich.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - warmgrau */}
      <section className="py-20 bg-warmgrau">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="section-title mb-4">Häufig gestellte Fragen</h2>
            <p className="section-subtitle mx-auto">
              Finden Sie hier Antworten auf die häufigsten Fragen
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'Wie schnell erhalte ich eine Antwort auf meine Anfrage?',
                a: 'Wir bemühen uns, alle Anfragen innerhalb von 24 Stunden zu beantworten. Bei dringenden Anliegen erreichen Sie uns auch telefonisch.',
              },
              {
                q: 'Bieten Sie auch Wochenendbesichtigungen an?',
                a: 'Ja, nach Vereinbarung bieten wir auch Besichtigungstermine am Samstag an.',
              },
              {
                q: 'Ist die Erstberatung kostenfrei?',
                a: 'Ja, die Erstberatung ist bei uns immer kostenfrei und unverbindlich.',
              },
              {
                q: 'Welche Unterlagen benötige ich für eine Immobilienbewertung?',
                a: 'Für eine fundierte Bewertung benötigen wir Grundrisse, Energieausweis, Grundbuchauszug und Informationen zur Ausstattung.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-fenster shadow-sm smooth-hover" data-aos="fade-up" data-aos-delay={index * 100}>
                <h3 className="font-bold text-wuestennacht mb-2">{faq.q}</h3>
                <p className="text-wuestennacht-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
