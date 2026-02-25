'use client'

import { useState } from 'react'
import { Calculator, ArrowRight, Euro, Home, Percent, CheckCircle, Phone, Mail, User } from 'lucide-react'

interface FinancingCalculatorProps {
  onSubmit?: (data: { name: string; email: string; phone: string; rate: number; kaufpreis: number }) => void
}

export default function FinancingCalculator({ onSubmit }: FinancingCalculatorProps) {
  // Step 1: Calculator, Step 2: Contact Form
  const [step, setStep] = useState(1)
  const [monatlicheRate, setMonatlicheRate] = useState(1500)
  const [eigenkapital, setEigenkapital] = useState(50000)

  // Contact form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Calculation: Kaufpreis based on monthly rate
  const jahreszins = 0.034 // 3.4%
  const tilgung = 0.02 // 2%
  const gesamtzins = jahreszins + tilgung

  const moeglichesDarlehen = Math.round((monatlicheRate * 12) / gesamtzins)
  const moeglichesKaufpreis = moeglichesDarlehen + eigenkapital

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE').format(value) + ' €'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (onSubmit) {
      onSubmit({ name, email, phone, rate: monatlicheRate, kaufpreis: moeglichesKaufpreis })
    }

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Progress indicator */}
      <div className="bg-gray-50 px-6 py-4 flex items-center gap-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            {step > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
          </div>
          <span className={`text-sm font-medium ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
            Budget berechnen
          </span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-200 rounded mx-2">
          <div className={`h-full bg-primary-500 rounded transition-all duration-500 ${
            step >= 2 ? 'w-full' : 'w-0'
          }`} />
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            {isSubmitted ? <CheckCircle className="h-5 w-5" /> : '2'}
          </div>
          <span className={`text-sm font-medium ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
            Angebot anfordern
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {step === 1 && (
          <>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Calculator className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-secondary-900">Schnell-Check</h3>
                <p className="text-secondary-500 text-sm">Was kann ich mir leisten?</p>
              </div>
            </div>

            {/* Monatliche Rate Slider */}
            <div className="mb-8">
              <label className="flex items-center justify-between mb-3">
                <span className="text-sm text-secondary-600 flex items-center gap-2">
                  <Euro className="h-4 w-4 text-secondary-400" />
                  Monatliche Rate
                </span>
                <span className="text-2xl font-bold text-primary-500">
                  {formatCurrency(monatlicheRate)}
                </span>
              </label>
              <input
                type="range"
                min="500"
                max="4000"
                step="50"
                value={monatlicheRate}
                onChange={(e) => setMonatlicheRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
                  [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-primary-500
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer
                  [&::-webkit-slider-runnable-track]:rounded-full [&::-moz-range-track]:rounded-full"
                style={{
                  background: `linear-gradient(to right, #f97316 0%, #f97316 ${((monatlicheRate - 500) / 3500) * 100}%, #e5e7eb ${((monatlicheRate - 500) / 3500) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-secondary-400 mt-2">
                <span>500 €</span>
                <span>4.000 €</span>
              </div>
            </div>

            {/* Eigenkapital Slider */}
            <div className="mb-8">
              <label className="flex items-center justify-between mb-3">
                <span className="text-sm text-secondary-600 flex items-center gap-2">
                  <Percent className="h-4 w-4 text-secondary-400" />
                  Eigenkapital
                </span>
                <span className="text-2xl font-bold text-primary-500">
                  {formatCurrency(eigenkapital)}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={eigenkapital}
                onChange={(e) => setEigenkapital(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
                  [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-primary-500
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #f97316 0%, #f97316 ${(eigenkapital / 200000) * 100}%, #e5e7eb ${(eigenkapital / 200000) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-secondary-400 mt-2">
                <span>0 €</span>
                <span>200.000 €</span>
              </div>
            </div>

            {/* Result */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-5 mb-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Home className="h-5 w-5 text-white/80" />
                <span className="text-white/90 text-sm font-medium">Ihr möglicher Kaufpreis</span>
              </div>
              <div className="text-4xl font-bold mb-2">
                {formatCurrency(moeglichesKaufpreis)}
              </div>
              <div className="text-sm text-white/80">
                Darlehen: {formatCurrency(moeglichesDarlehen)} + Eigenkapital: {formatCurrency(eigenkapital)}
              </div>
            </div>

            <p className="text-xs text-secondary-400 mb-6">
              * Beispielrechnung bei 10 Jahren Zinsbindung, 3,4% Zins, 2% Tilgung.
              Die tatsächlichen Konditionen hängen von Ihrer Bonität ab.
            </p>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-6 rounded-xl
                transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
            >
              Jetzt individuelles Angebot anfordern
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </>
        )}

        {step === 2 && !isSubmitted && (
          <>
            <button
              onClick={() => setStep(1)}
              className="text-secondary-400 hover:text-secondary-600 text-sm mb-4 flex items-center gap-1 transition-colors"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Zurück zum Rechner
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Fast geschafft!</h3>
              <p className="text-secondary-500 text-sm">
                Hinterlassen Sie Ihre Kontaktdaten und ich melde mich innerhalb von 24 Stunden
                mit Ihrem persönlichen Finanzierungsangebot.
              </p>
            </div>

            {/* Summary */}
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 mb-6">
              <div className="text-sm text-primary-600 font-medium mb-2">Ihre Anfrage</div>
              <div className="flex justify-between items-center text-secondary-900">
                <div>
                  <span className="text-secondary-500">Kaufpreis: </span>
                  <span className="font-bold text-primary-600">{formatCurrency(moeglichesKaufpreis)}</span>
                </div>
                <div>
                  <span className="text-secondary-500">Rate: </span>
                  <span className="font-bold text-primary-600">{formatCurrency(monatlicheRate)}/Monat</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-secondary-600 mb-2 font-medium">
                  <User className="h-4 w-4 inline mr-2 text-secondary-400" />
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Max Mustermann"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-secondary-900
                    placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-secondary-600 mb-2 font-medium">
                  <Mail className="h-4 w-4 inline mr-2 text-secondary-400" />
                  E-Mail *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="max@beispiel.de"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-secondary-900
                    placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-secondary-600 mb-2 font-medium">
                  <Phone className="h-4 w-4 inline mr-2 text-secondary-400" />
                  Telefon (optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0177 1234567"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-secondary-900
                    placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white
                  font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                  group shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    Kostenloses Angebot anfordern
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="text-xs text-secondary-400 text-center">
                Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer Datenschutzerklärung zu.
              </p>
            </form>
          </>
        )}

        {isSubmitted && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-3">Vielen Dank!</h3>
            <p className="text-secondary-500 mb-6">
              Ihre Anfrage ist eingegangen. Ich melde mich innerhalb von 24 Stunden
              mit Ihrem persönlichen Finanzierungsangebot.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="text-sm text-secondary-400 mb-2">Ihre Anfrage</div>
              <div className="flex flex-col gap-1">
                <span className="text-secondary-900 font-medium">{name}</span>
                <span className="text-primary-600 font-bold">{formatCurrency(moeglichesKaufpreis)} Kaufpreis</span>
                <span className="text-secondary-500">{formatCurrency(monatlicheRate)}/Monat</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
