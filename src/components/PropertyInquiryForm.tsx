'use client'

import { useState } from 'react'

interface PropertyInquiryFormProps {
  propertyId: string
  propertyTitle: string
  isRent?: boolean
}

interface FormState {
  vorname: string
  nachname: string
  strasse: string
  plz: string
  ort: string
  email: string
  phone: string
  message: string
}

export default function PropertyInquiryForm({ propertyId, propertyTitle, isRent }: PropertyInquiryFormProps) {
  const defaultMessage = `Ich interessiere mich für "${propertyTitle}" und bitte um weitere Informationen.`
  const [formData, setFormData] = useState<FormState>({
    vorname: '',
    nachname: '',
    strasse: '',
    plz: '',
    ort: '',
    email: '',
    phone: '',
    message: defaultMessage,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vorname: formData.vorname,
          nachname: formData.nachname,
          name: `${formData.vorname} ${formData.nachname}`.trim(),
          email: formData.email,
          phone: formData.phone,
          strasse: formData.strasse,
          plz: formData.plz,
          ort: formData.ort,
          message: formData.message,
          inquiryType: 'immobilie',
          propertyId,
          propertyTitle,
          kategorie: isRent ? 'miete' : 'kauf',
          source: `Immobilien-Anfrage: ${propertyTitle}`,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setFormData({
          vorname: '',
          nachname: '',
          strasse: '',
          plz: '',
          ort: '',
          email: '',
          phone: '',
          message: defaultMessage,
        })
      } else {
        setStatus('error')
        setErrorMessage(result.error || 'Ein Fehler ist aufgetreten.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Verbindungsfehler. Bitte versuchen Sie es später erneut.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-4xl mb-3">✓</div>
        <h4 className="text-lg font-semibold text-green-800 mb-2">Anfrage gesendet!</h4>
        <p className="text-green-700 text-sm">
          Vielen Dank für Ihr Interesse. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-green-600 hover:text-green-800 underline"
        >
          Weitere Anfrage senden
        </button>
      </div>
    )
  }

  const inputCls =
    'w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vorname *</label>
          <input
            type="text"
            name="vorname"
            required
            autoComplete="given-name"
            value={formData.vorname}
            onChange={handleChange}
            disabled={status === 'loading'}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nachname *</label>
          <input
            type="text"
            name="nachname"
            required
            autoComplete="family-name"
            value={formData.nachname}
            onChange={handleChange}
            disabled={status === 'loading'}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Straße &amp; Hausnr. *</label>
        <input
          type="text"
          name="strasse"
          required
          autoComplete="street-address"
          value={formData.strasse}
          onChange={handleChange}
          disabled={status === 'loading'}
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">PLZ *</label>
          <input
            type="text"
            name="plz"
            required
            inputMode="numeric"
            pattern="\d{5}"
            autoComplete="postal-code"
            value={formData.plz}
            onChange={handleChange}
            disabled={status === 'loading'}
            className={inputCls}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ort *</label>
          <input
            type="text"
            name="ort"
            required
            autoComplete="address-level2"
            value={formData.ort}
            onChange={handleChange}
            disabled={status === 'loading'}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail *</label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'loading'}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            disabled={status === 'loading'}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nachricht</label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'loading'}
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Wird gesendet...' : 'Anfrage senden'}
      </button>
    </form>
  )
}
