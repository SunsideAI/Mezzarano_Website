'use client'

import { useState } from 'react'
import { Calculator, ArrowRight, Home, CheckCircle, Phone, Mail, User, Clock } from 'lucide-react'

interface ZinsbindungOption {
  jahre: number
  zins: number
  empfohlen?: boolean
}

const zinsbindungOptions: ZinsbindungOption[] = [
  { jahre: 5, zins: 3.2 },
  { jahre: 10, zins: 3.4, empfohlen: true },
  { jahre: 15, zins: 3.6 },
  { jahre: 20, zins: 3.8 },
]

interface FinancingCalculatorProps {
  onSubmit?: (data: { name: string; email: string; phone: string; rate: number; kaufpreis: number }) => void
}

export default function FinancingCalculator({ onSubmit }: FinancingCalculatorProps) {
  const [step, setStep] = useState(1)
  const [selectedZinsbindung, setSelectedZinsbindung] = useState<ZinsbindungOption>(zinsbindungOptions[1])
  const [monatlicheRate, setMonatlicheRate] = useState(800)
  const [eigenkapital, setEigenkapital] = useState(25000)

  // Contact form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Calculation
  const jahreszins = selectedZinsbindung.zins / 100
  const tilgung = 0.02
  const gesamtzins = jahreszins + tilgung

  const moeglichesDarlehen = Math.round((monatlicheRate * 12) / gesamtzins)
  const moeglichesKaufpreis = moeglichesDarlehen + eigenkapital

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE').format(value) + ' €'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const message = `Finanzierungsanfrage:\n\nGewuenschte monatliche Rate: ${formatCurrency(monatlicheRate)}\nEigenkapital: ${formatCurrency(eigenkapital)}\nMoeglicher Kaufpreis: ${formatCurrency(moeglichesKaufpreis)}\nDarlehen: ${formatCurrency(moeglichesDarlehen)}\nZinsbindung: ${selectedZinsbindung.jahre} Jahre (${selectedZinsbindung.zins.toFixed(1).replace('.', ',')}%)`

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          inquiryType: 'finanzierung',
          source: 'Finanzierungsrechner',
        }),
      })

      const result = await response.json()

      if (result.success) {
        if (onSubmit) {
          onSubmit({ name, email, phone, rate: monatlicheRate, kaufpreis: moeglichesKaufpreis })
        }
        setIsSubmitted(true)
      } else {
        setErrorMessage(result.error || 'Ein Fehler ist aufgetreten.')
      }
    } catch {
      setErrorMessage('Verbindungsfehler. Bitte versuchen Sie es spaeter erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left: Zinsbindung Selection */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
          Aktuelle Zinsen
        </h2>
        <p className="text-secondary-600 mb-8 leading-relaxed">
          Die Zinsen für Baufinanzierungen sind aktuell wieder attraktiver. Sichern Sie sich jetzt
          günstige Konditionen für Ihr Vorhaben. Als Ihr Wüstenrot-Partner vergleiche ich für Sie
          über 400 Anbieter und finde die beste Lösung.
        </p>

        <div className="space-y-3">
          {zinsbindungOptions.map((option) => (
            <button
              key={option.jahre}
              onClick={() => setSelectedZinsbindung(option)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedZinsbindung.jahre === option.jahre
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className={`h-5 w-5 ${
                  selectedZinsbindung.jahre === option.jahre ? 'text-primary-500' : 'text-gray-400'
                }`} />
                <span className="font-medium text-secondary-900">
                  {option.jahre} Jahre Zinsbindung
                </span>
                {option.empfohlen && (
                  <span className="bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Empfohlen
                  </span>
                )}
              </div>
              <span className={`text-lg font-bold ${
                selectedZinsbindung.jahre === option.jahre ? 'text-primary-500' : 'text-primary-600'
              }`}>
                ab {option.zins.toFixed(1).replace('.', ',')}%
              </span>
            </button>
          ))}
        </div>

        <p className="text-sm text-secondary-500 mt-6">
          * Beispielhafte Zinssätze, abhängig von Bonität und Beleihungsauslauf.
          Stand: Februar 2026. Unverbindlich.
        </p>
      </div>

      {/* Right: Calculator */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Progress indicator */}
        <div className="px-6 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > 1 ? <CheckCircle className="h-4 w-4" /> : '1'}
            </div>
            <span className={`text-sm font-medium ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              Budget berechnen
            </span>
          </div>
          <div className="flex-1 h-px bg-gray-200 mx-2">
            <div className={`h-full bg-primary-500 transition-all duration-500 ${
              step >= 2 ? 'w-full' : 'w-0'
            }`} />
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {isSubmitted ? <CheckCircle className="h-4 w-4" /> : '2'}
            </div>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              Angebot anfordern
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          {step === 1 && (
            <>
              <div className="flex items-center gap-3 mb-6 pt-2">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary-900">Schnell-Check</h3>
                  <p className="text-secondary-500 text-sm">Was kann ich mir leisten?</p>
                </div>
              </div>

              {/* Monatliche Rate */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-secondary-600 flex items-center gap-2">
                    <span className="text-secondary-400">€</span>
                    Monatliche Rate
                  </span>
                  <span className="text-xl font-bold text-primary-500">
                    {formatCurrency(monatlicheRate)}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="4000"
                  step="50"
                  value={monatlicheRate}
                  onChange={(e) => setMonatlicheRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-primary-500
                    [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${((monatlicheRate - 500) / 3500) * 100}%, #e5e7eb ${((monatlicheRate - 500) / 3500) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-secondary-400 mt-1">
                  <span>500 €</span>
                  <span>4.000 €</span>
                </div>
              </div>

              {/* Eigenkapital */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-secondary-600 flex items-center gap-2">
                    <span className="text-secondary-400">%</span>
                    Eigenkapital
                  </span>
                  <span className="text-xl font-bold text-primary-500">
                    {formatCurrency(eigenkapital)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  value={eigenkapital}
                  onChange={(e) => setEigenkapital(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-primary-500
                    [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${(eigenkapital / 200000) * 100}%, #e5e7eb ${(eigenkapital / 200000) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-secondary-400 mt-1">
                  <span>0 €</span>
                  <span>200.000 €</span>
                </div>
              </div>

              {/* Result */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-5 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Home className="h-4 w-4 text-white/80" />
                  <span className="text-white/90 text-sm">Ihr möglicher Kaufpreis</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {formatCurrency(moeglichesKaufpreis)}
                </div>
                <div className="text-sm text-white/80">
                  Darlehen: {formatCurrency(moeglichesDarlehen)} + Eigenkapital: {formatCurrency(eigenkapital)}
                </div>
              </div>

              <p className="text-xs text-secondary-400 mb-4">
                * Beispielrechnung bei {selectedZinsbindung.jahre} Jahren Zinsbindung,
                {' '}{selectedZinsbindung.zins.toFixed(1).replace('.', ',')}% Zins, 2% Tilgung.
                Die tatsächlichen Konditionen hängen von Ihrer Bonität ab.
              </p>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3.5 px-6 rounded-xl
                  transition-all duration-300 flex items-center justify-center gap-2 group"
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

              <div className="mb-5">
                <h3 className="text-lg font-bold text-secondary-900 mb-1">Fast geschafft!</h3>
                <p className="text-secondary-500 text-sm">
                  Hinterlassen Sie Ihre Kontaktdaten für Ihr persönliches Angebot.
                </p>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <div className="flex justify-between items-center text-sm">
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
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="block text-sm text-secondary-600 mb-1.5">
                    <User className="h-4 w-4 inline mr-1.5 text-secondary-400" />
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Max Mustermann"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-secondary-900
                      placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-600 mb-1.5">
                    <Mail className="h-4 w-4 inline mr-1.5 text-secondary-400" />
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="max@beispiel.de"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-secondary-900
                      placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-secondary-600 mb-1.5">
                    <Phone className="h-4 w-4 inline mr-1.5 text-secondary-400" />
                    Telefon (optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0177 1234567"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-secondary-900
                      placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white
                    font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
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
                  Mit dem Absenden stimmen Sie der Datenschutzerklärung zu.
                </p>
              </form>
            </>
          )}

          {isSubmitted && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Vielen Dank!</h3>
              <p className="text-secondary-500 text-sm mb-4">
                Ich melde mich innerhalb von 24 Stunden mit Ihrem persönlichen Angebot.
              </p>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-secondary-400 mb-1">Ihre Anfrage</div>
                <div className="font-medium text-secondary-900">{name}</div>
                <div className="text-primary-600 font-bold">{formatCurrency(moeglichesKaufpreis)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
