'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

type CookieConsent = 'pending' | 'accepted' | 'rejected'

export default function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent>('pending')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent')
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored)
    } else {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setConsent('accepted')
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setConsent('rejected')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="container-custom">
        <div className="bg-wuestennacht border border-wuestennacht-light rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Icon & Text */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-wuestenrot rounded-full flex items-center justify-center">
                  <Cookie className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Cookie-Einstellungen</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
                Einige Cookies sind für den Betrieb der Website notwendig, während andere uns helfen,
                die Website zu verbessern. Weitere Informationen finden Sie in unserer{' '}
                <Link href="/datenschutz" className="text-wuestenrot hover:underline">
                  Datenschutzerklärung
                </Link>.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <button
                onClick={handleReject}
                className="px-6 py-3 border-2 border-gray-500 text-gray-300 font-semibold rounded-none hover:border-white hover:text-white transition-colors"
              >
                Nur notwendige
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-3 bg-wuestenrot text-white font-semibold rounded-none hover:bg-wuestenrot-hover transition-colors"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
