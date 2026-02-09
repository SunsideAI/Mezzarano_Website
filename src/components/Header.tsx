'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from 'lucide-react'
import { WuestenrotLogoCompact } from './WuestenrotLogo'

const navigation = [
  { name: 'Startseite', href: '/' },
  { name: 'Immobilien', href: '/immobilien' },
  { name: 'Verkaufen', href: '/verkaufen' },
  { name: 'Kaufen', href: '/kaufen' },
  { name: 'Bewerten', href: '/bewerten' },
  { name: 'Erklärvideos', href: '/erklaervideos' },
  { name: 'Ratgeber', href: '/ratgeber' },
  { name: 'Kontakt', href: '/kontakt' },
]

// Sandro Mezzarano's contact info
const contact = {
  name: 'Sandro Mezzarano',
  title: 'Ihr Immobilien-Experte in Hermeskeil',
  street: 'Saarstraße 1',
  city: '54411 Hermeskeil',
  phone1: '0177 6542977',
  phone2: '06503 9523963',
  email: 'sandro.mezzarano@wuestenrot.de',
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar - Wüstenrot Style */}
      <div className="bg-secondary-900 text-white py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${contact.phone1.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-primary-400 transition-colors">
              <Phone className="h-4 w-4" />
              <span>{contact.phone1}</span>
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-primary-400 transition-colors">
              <Mail className="h-4 w-4" />
              <span>{contact.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{contact.street}, {contact.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-custom" aria-label="Hauptnavigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <WuestenrotLogoCompact />
            <div>
              <span className="font-semibold text-lg text-secondary-900 leading-tight block">wüstenrot</span>
              <span className="text-xs text-secondary-500 tracking-wider uppercase">Immobilien</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-secondary-700 hover:text-primary-500 font-medium transition-colors py-2 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link href="/kontakt" className="btn-primary ml-2">
              Beratung anfragen
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-secondary-700"
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
          <div className="lg:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-secondary-700 hover:text-primary-500 font-medium py-3 px-2 rounded-lg hover:bg-secondary-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="btn-primary mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Beratung anfragen
              </Link>
            </div>

            {/* Mobile contact info */}
            <div className="mt-6 pt-6 border-t space-y-3 text-sm text-secondary-600">
              <a href={`tel:${contact.phone1.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-primary-500">
                <Phone className="h-4 w-4" />
                <span>{contact.phone1}</span>
              </a>
              <a href={`tel:${contact.phone2.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-primary-500">
                <Phone className="h-4 w-4" />
                <span>{contact.phone2}</span>
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-primary-500">
                <Mail className="h-4 w-4" />
                <span>{contact.email}</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{contact.street}, {contact.city}</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
