'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, FileCheck, Check, ArrowRight, Phone, X, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react'

const energieausweisTypes = [
  {
    id: 'verbrauch-wohn',
    title: 'Verbrauchsausweis',
    subtitle: 'Wohngebäude',
    description: 'Basiert auf Energieverbräuchen Ihres Gebäudes',
    price: 59,
    features: [
      { icon: Clock, text: '10 Minuten Erstellungszeit' },
      { icon: FileCheck, text: 'Heizkostenabrechnung von 3 Jahren gebraucht' },
      { icon: Check, text: 'Auslieferung innerhalb 48 Stunden' },
      { icon: Check, text: 'GEG-konform – 10 Jahre gültig' },
    ],
  },
  {
    id: 'bedarf-wohn',
    title: 'Bedarfsausweis',
    subtitle: 'Wohngebäude',
    description: 'Basiert auf der Beschaffenheit Ihres Gebäudes',
    price: 99,
    popular: true,
    features: [
      { icon: Clock, text: '30 Minuten Erstellungszeit' },
      { icon: FileCheck, text: 'Angaben zu Gebäudeflächen nötig' },
      { icon: Check, text: 'Auslieferung innerhalb 48 Stunden' },
      { icon: Check, text: 'GEG-konform – 10 Jahre gültig' },
    ],
  },
  {
    id: 'verbrauch-gewerbe',
    title: 'Verbrauchsausweis',
    subtitle: 'Nichtwohngebäude',
    description: 'Basiert auf Energieverbräuchen Ihres Gebäudes',
    price: 79,
    features: [
      { icon: Clock, text: '10 Minuten Erstellungszeit' },
      { icon: FileCheck, text: 'Heizkostenabrechnung von 3 Jahren gebraucht' },
      { icon: Check, text: 'Auslieferung innerhalb 48 Stunden' },
      { icon: Check, text: 'GEG-konform – 10 Jahre gültig' },
    ],
  },
]

const faqItems = [
  {
    question: 'Welchen Energieausweis brauche ich?',
    answer: 'Für Wohngebäude mit mehr als 4 Wohneinheiten und einem Bauantrag nach dem 1. November 1977 reicht ein Verbrauchsausweis. Für kleinere oder ältere Gebäude ist ein Bedarfsausweis Pflicht. Bei Unsicherheit beraten wir Sie gerne kostenlos.',
  },
  {
    question: 'Wie lange ist der Energieausweis gültig?',
    answer: 'Ein Energieausweis ist 10 Jahre ab Ausstellungsdatum gültig. Nach Ablauf muss ein neuer Ausweis erstellt werden.',
  },
  {
    question: 'Wann brauche ich einen Energieausweis?',
    answer: 'Ein Energieausweis ist Pflicht bei Verkauf, Vermietung oder Verpachtung einer Immobilie. Er muss spätestens bei der Besichtigung vorgelegt werden.',
  },
  {
    question: 'Was passiert nach der Bestellung?',
    answer: 'Nach Ihrer Bestellung erhalten Sie einen Fragebogen per E-Mail. Nach Rücksendung der ausgefüllten Unterlagen erstellen wir Ihren Energieausweis innerhalb von 48 Stunden.',
  },
]

export default function EnergieausweisPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSelectType = (typeId: string) => {
    setSelectedType(typeId)
    setShowModal(true)
    setSubmitStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const selectedProduct = energieausweisTypes.find(t => t.id === selectedType)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: `Energieausweis Anfrage: ${selectedProduct?.title} ${selectedProduct?.subtitle}`,
          message: `Produkt: ${selectedProduct?.title} ${selectedProduct?.subtitle}\nPreis: ${selectedProduct?.price} € inkl. MwSt.\n\n${formData.message || 'Keine zusätzliche Nachricht'}`,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', address: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-secondary-900">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" data-aos="fade-up">
            Online-Energieausweis
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Schnell, einfach und günstig – Ihr Energieausweis ab 59 € inkl. MwSt. GEG-konform und 10 Jahre gültig.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-white/80" data-aos="fade-up" data-aos-delay="200">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary-400" />
              Auslieferung in 48h
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary-400" />
              GEG-konform
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary-400" />
              10 Jahre gültig
            </span>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-8 bg-primary-50 border-b border-primary-100">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-2 text-primary-700">
              <HelpCircle className="h-5 w-5" />
              <span className="font-medium">Welchen Online-Energieausweis benötigen Sie?</span>
            </div>
            <Link href="/kontakt" className="text-primary-600 hover:text-primary-700 underline">
              Gerne übernehmen wir die Erstellung Ihres Energieausweises.
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {energieausweisTypes.map((type, index) => (
              <div
                key={type.id}
                className={`relative rounded-2xl overflow-hidden shadow-lg ${type.popular ? 'ring-2 ring-primary-500' : ''}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {type.popular && (
                  <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Empfohlen
                  </div>
                )}
                {/* Orange Header */}
                <div className="bg-primary-500 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{type.title}</h3>
                  <p className="text-white/90 font-medium mb-2">{type.subtitle}</p>
                  <p className="text-white/80 text-sm mb-4">{type.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{type.price} Euro</span>
                  </div>
                  <p className="text-white/80 text-sm">inkl. MwSt.</p>
                </div>

                {/* Features */}
                <div className="bg-white p-6">
                  <ul className="space-y-4 mb-6">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3 text-gray-700">
                        <feature.icon className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectType(type.id)}
                    className="w-full btn-primary justify-center"
                  >
                    Jetzt erstellen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title mb-6 text-center" data-aos="fade-up">
              Welche Informationen benötigen Sie zur Erstellung des Online-Energieausweises?
            </h2>
            <p className="text-gray-600 text-center mb-8" data-aos="fade-up" data-aos-delay="100">
              Je nach Art des Online-Energieausweises müssen spezifische Angaben zu Ihrer Immobilie gemacht werden. Nach Ihrer Bestellung senden wir Ihnen einen entsprechenden Fragebogen zu.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-gray-900 mb-3">Für den Verbrauchsausweis:</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    Heizkostenabrechnungen der letzten 3 Jahre
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    Baujahr des Gebäudes
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    Wohnfläche
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    Art der Heizung
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-gray-900 mb-3">Für den Bedarfsausweis:</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    Angaben zur Gebäudehülle (Dämmung, Fenster)
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    Gebäudeflächen und Raumhöhen
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    Heizungsanlage und Warmwasserbereitung
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    Baujahr und durchgeführte Sanierungen
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title mb-8 text-center" data-aos="fade-up">
              Häufig gestellte Fragen
            </h2>
            <div className="space-y-4" data-aos="fade-up" data-aos-delay="100">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{item.question}</span>
                    <ArrowRight className={`h-5 w-5 text-gray-500 transition-transform ${openFaq === index ? 'rotate-90' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-gray-600">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-primary-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" data-aos="fade-up">
            Fragen zum Energieausweis?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Wir beraten Sie gerne kostenlos und unverbindlich.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
            <Link href="/kontakt" className="btn-primary bg-white text-primary-500 hover:bg-gray-100">
              Kostenlose Beratung
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a href="tel:01776542977" className="btn-outline border-white text-white hover:bg-white hover:text-primary-500">
              <Phone className="h-5 w-5 mr-2" />
              0177 6542977
            </a>
          </div>
        </div>
      </section>

      {/* Back to Energieberatung */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom text-center">
          <Link href="/energieberatung" className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2">
            <ArrowRight className="h-4 w-4 rotate-180" />
            Zurück zur Energieberatung
          </Link>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" data-aos="zoom-in">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Energieausweis anfragen</h3>
                <p className="text-gray-600 text-sm">
                  {energieausweisTypes.find(t => t.id === selectedType)?.title}{' '}
                  {energieausweisTypes.find(t => t.id === selectedType)?.subtitle} –{' '}
                  {energieausweisTypes.find(t => t.id === selectedType)?.price} € inkl. MwSt.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Anfrage erfolgreich gesendet!</h4>
                  <p className="text-gray-600 mb-6">
                    Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn-primary"
                  >
                    Schließen
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Max Mustermann"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="max@beispiel.de"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0177 1234567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse der Immobilie *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Musterstraße 1, 54411 Hermeskeil"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nachricht (optional)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Haben Sie weitere Fragen oder Anmerkungen?"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <span>Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.</span>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Wird gesendet...' : 'Anfrage absenden'}
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Mit dem Absenden stimmen Sie unserer{' '}
                    <Link href="/datenschutz" className="text-primary-600 hover:underline">
                      Datenschutzerklärung
                    </Link>{' '}
                    zu.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
