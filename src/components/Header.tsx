'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail, MapPin, ChevronDown, ArrowRight } from 'lucide-react'
import { WuestenrotLogoCompact } from './WuestenrotLogo'

type NavItem = {
  name: string
  href?: string
  children?: { name: string; href: string }[]
}

const navigation: NavItem[] = [
  { name: 'Startseite', href: '/' },
  { name: 'Immobilien', href: '/immobilien' },
  { name: 'Verkaufen', href: '/verkaufen' },
  { name: 'Kaufen', href: '/kaufen' },
  { name: 'Finanzierung', href: '/finanzierung' },
  { name: 'Bewerten', href: '/bewerten' },
  {
    name: 'Wissen',
    children: [
      { name: 'Erklärvideos', href: '/erklaervideos' },
      { name: 'Ratgeber', href: '/ratgeber' },
      { name: 'Über mich', href: '/ueber-uns' },
    ]
  },
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
  const [wissenOpen, setWissenOpen] = useState(false)
  const [mobileWissenOpen, setMobileWissenOpen] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setWissenOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setWissenOpen(false)
    }, 300) // 300ms delay before closing
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar - Wüstenrot Styleguide: wüstennacht */}
      <div className="bg-wuestennacht text-white py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${contact.phone1.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-wuestenrot-light transition-colors">
              <Phone className="h-4 w-4" />
              <span>{contact.phone1}</span>
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-wuestenrot-light transition-colors">
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
          {/* Logo - Styleguide: wüstenrot in Kleinschreibung */}
          <Link href="/" className="flex items-center gap-3">
            <WuestenrotLogoCompact />
            <div>
              <span className="font-bold text-lg text-wuestennacht leading-tight block lowercase">wüstenrot</span>
              <span className="text-xs text-wuestennacht-light tracking-wider uppercase">Immobilien</span>
            </div>
          </Link>

          {/* Desktop navigation - Styleguide: wüstenrot Hover */}
          <div className="hidden lg:flex items-center gap-5">
            {navigation.map((item) => (
              item.children ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="text-wuestennacht hover:text-wuestenrot font-medium transition-colors py-2 relative group flex items-center gap-1"
                  >
                    {item.name}
                    <ChevronDown className={`h-4 w-4 transition-transform ${wissenOpen ? 'rotate-180' : ''}`} />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wuestenrot group-hover:w-full transition-all duration-300" />
                  </button>
                  {wissenOpen && (
                    <div className="absolute top-full left-0 pt-2 -ml-4">
                      <div className="bg-white rounded-fenster shadow-lg border border-warmgrau py-2 min-w-[180px] animate-fade-in">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-3 text-wuestennacht hover:text-wuestenrot hover:bg-warmgrau transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href!}
                  className="text-wuestennacht hover:text-wuestenrot font-medium transition-colors py-2 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wuestenrot group-hover:w-full transition-all duration-300" />
                </Link>
              )
            ))}
            {/* CTA Button mit Pfeil-Icon (Styleguide) */}
            <Link href="/kontakt" className="btn-primary ml-2">
              Beratung anfragen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-wuestennacht hover:text-wuestenrot transition-colors"
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

        {/* Mobile navigation - Styleguide Farben */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-warmgrau animate-fade-in">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                item.children ? (
                  <div key={item.name}>
                    <button
                      onClick={() => setMobileWissenOpen(!mobileWissenOpen)}
                      className="flex items-center justify-between w-full text-wuestennacht hover:text-wuestenrot font-medium py-3 px-2 rounded-fenster hover:bg-warmgrau transition-colors"
                    >
                      {item.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileWissenOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileWissenOpen && (
                      <div className="ml-4 border-l-2 border-wuestenrot pl-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block text-wuestennacht-light hover:text-wuestenrot font-medium py-2 px-2 rounded-fenster hover:bg-warmgrau transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href!}
                    className="block text-wuestennacht hover:text-wuestenrot font-medium py-3 px-2 rounded-fenster hover:bg-warmgrau transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Link
                href="/kontakt"
                className="btn-primary mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Beratung anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile contact info */}
            <div className="mt-6 pt-6 border-t border-warmgrau space-y-3 text-sm text-wuestennacht-light">
              <a href={`tel:${contact.phone1.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-wuestenrot transition-colors">
                <Phone className="h-4 w-4" />
                <span>{contact.phone1}</span>
              </a>
              <a href={`tel:${contact.phone2.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-wuestenrot transition-colors">
                <Phone className="h-4 w-4" />
                <span>{contact.phone2}</span>
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-wuestenrot transition-colors">
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
