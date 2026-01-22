'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'

const navigation = [
  { name: 'Startseite', href: '/' },
  { name: 'Immobilien', href: '/immobilien' },
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-900 text-white py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+491234567890" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Phone className="h-4 w-4" />
              <span>+49 123 456 7890</span>
            </a>
            <a href="mailto:info@mezzarano.de" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@mezzarano.de</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Musterstraße 123, 12345 Berlin</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-custom" aria-label="Hauptnavigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl">M</span>
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-gray-900">Mezzarano</span>
              <span className="block text-xs text-gray-500 -mt-1">IMMOBILIEN</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-700 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-700 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link href="/kontakt" className="btn-primary">
              Beratung anfragen
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Menü öffnen</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-700 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="btn-primary mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Beratung anfragen
              </Link>
            </div>

            {/* Mobile contact info */}
            <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
              <a href="tel:+491234567890" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+49 123 456 7890</span>
              </a>
              <a href="mailto:info@mezzarano.de" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@mezzarano.de</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
