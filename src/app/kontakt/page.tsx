'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    lines: ['Musterstraße 123', '12345 Berlin'],
    link: 'https://maps.google.com',
  },
  {
    icon: Phone,
    title: 'Telefon',
    lines: ['+49 123 456 7890', '+49 123 456 7891'],
    link: 'tel:+491234567890',
  },
  {
    icon: Mail,
    title: 'E-Mail',
    lines: ['info@mezzarano.de', 'beratung@mezzarano.de'],
    link: 'mailto:info@mezzarano.de',
  },
  {
    icon: Clock,
    title: 'Öffnungszeiten',
    lines: ['Mo - Fr: 9:00 - 18:00', 'Sa: 10:00 - 14:00'],
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
      {/* Hero */}
      <section className="bg-primary-900 py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Kontaktieren Sie uns
            </h1>
            <p className="text-xl text-gray-300">
              Wir sind für Sie da. Kontaktieren Sie uns für eine persönliche Beratung
              oder besuchen Sie uns in unserem Büro.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-white p-6 rounded-xl shadow-lg text-center group hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-700 transition-colors">
                  <info.icon className="h-7 w-7 text-primary-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                {info.lines.map((line, index) => (
                  <p key={index} className="text-gray-600 text-sm">
                    {info.link && index === 0 ? (
                      <a href={info.link} className="hover:text-primary-700 transition-colors">
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
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="h-8 w-8 text-primary-700" />
                <h2 className="section-title">Schreiben Sie uns</h2>
              </div>
              <p className="text-gray-600 mb-8">
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
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Ihr vollständiger Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="ihre@email.de"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+49 123 456 7890"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                        Art der Anfrage
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formState.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Ihre Nachricht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
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
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      Ich habe die{' '}
                      <a href="/datenschutz" className="text-primary-700 hover:underline">
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
                        <Send className="h-5 w-5 mr-2" />
                        Nachricht senden
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map and Additional Info */}
            <div>
              <h2 className="section-title mb-6">Besuchen Sie uns</h2>
              <p className="text-gray-600 mb-8">
                Unser Büro befindet sich im Herzen von Berlin. Wir freuen uns auf Ihren Besuch!
              </p>

              {/* Map Placeholder */}
              <div className="bg-gray-200 h-80 rounded-xl mb-8 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Karte wird geladen...</p>
                </div>
              </div>

              {/* Parking & Transport Info */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Anfahrt</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-700">Mit öffentlichen Verkehrsmitteln:</h4>
                    <p className="text-gray-600">
                      U-Bahn: Linie U2, Station Musterplatz (5 Min. Fußweg)<br />
                      Bus: Linien 100, 200, Haltestelle Musterstraße
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Mit dem Auto:</h4>
                    <p className="text-gray-600">
                      Parkplätze stehen in unserem Hof zur Verfügung.<br />
                      Bitte bei Ankunft im Büro melden.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
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
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
