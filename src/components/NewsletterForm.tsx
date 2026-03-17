'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setMessage(result.message || 'Vielen Dank für Ihre Anmeldung!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(result.error || 'Ein Fehler ist aufgetreten.')
      }
    } catch {
      setStatus('error')
      setMessage('Verbindungsfehler. Bitte versuchen Sie es später erneut.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white/10 rounded-lg p-4 max-w-md mx-auto">
        <p className="text-white font-medium">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <div className="flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ihre E-Mail-Adresse"
          required
          disabled={status === 'loading'}
          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
        />
        {status === 'error' && (
          <p className="text-white/90 text-sm mt-2 text-left">{message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary bg-secondary-900 hover:bg-secondary-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Wird gesendet...' : 'Anmelden'}
      </button>
    </form>
  )
}
