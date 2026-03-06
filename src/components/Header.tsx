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
  {
    name: 'Verkaufen',
    children: [
      { name: 'Immobilie verkaufen', href: '/verkaufen' },
      { name: 'Kostenlose Bewertung', href: '/bewerten' },
    ]
  },
  {
    name: 'Kaufen',
    children: [
      { name: 'Immobilie kaufen', href: '/kaufen' },
      { name: 'Immobilienangebote', href: '/immobilien' },
      { name: 'Suchprofil anlegen', href: '/suchprofil' },
    ]
  },
  { name: 'Finanzierung', href: '/finanzierung' },
  {
    name: 'Ratgeber',
    children: [
      { name: 'Erklärvideos', href: '/erklaervideos' },
      { name: 'Ratgeber & Blog', href: '/ratgeber' },
    ]
  },
  {
    name: 'Über mich',
    children: [
      { name: 'Über mich', href: '/ueber-uns' },
      { name: 'Kontakt', href: '/kontakt' },
    ]
  },
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (name: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setOpenDropdown(name)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 300)
  }

  const toggleMobileDropdown = (name: string) => {
    setMobileOpenDropdown(mobileOpenDropdown === name ? null : name)
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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <WuestenrotLogoCompact />
            <div className="-space-y-2">
              <span className="font-bold text-lg text-wuestennacht block">wüstenrot</span>
              <span className="text-lg text-wuestennacht block">Immobilien</span>
            </div>
          </Link>

          {/* Desktop navigation - centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-8">
            {navigation.map((item) => (
              item.children ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="text-wuestennacht hover:text-wuestenrot font-normal transition-colors py-2 relative group flex items-center gap-1"
                  >
                    {item.name}
                    <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wuestenrot group-hover:w-full transition-all duration-300" />
                  </button>
                  {openDropdown === item.name && (
                    <div className="absolute top-full left-0 pt-2 -ml-4">
                      <div className="bg-white rounded-fenster shadow-lg border border-warmgrau py-2 min-w-[180px] animate-fade-in">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-3 text-wuestennacht font-normal hover:text-wuestenrot hover:bg-warmgrau transition-colors"
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
                  className="text-wuestennacht hover:text-wuestenrot font-normal transition-colors py-2 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wuestenrot group-hover:w-full transition-all duration-300" />
                </Link>
              )
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/kontakt" className="hidden lg:flex btn-primary">
            Beratung anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>

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
                      onClick={() => toggleMobileDropdown(item.name)}
                      className="flex items-center justify-between w-full text-wuestennacht hover:text-wuestenrot py-3 px-2 rounded-fenster hover:bg-warmgrau transition-colors"
                    >
                      {item.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpenDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileOpenDropdown === item.name && (
                      <div className="ml-4 border-l-2 border-wuestenrot pl-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block text-wuestennacht-light hover:text-wuestenrot py-2 px-2 rounded-fenster hover:bg-warmgrau transition-colors"
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
                    className="block text-wuestennacht hover:text-wuestenrot py-3 px-2 rounded-fenster hover:bg-warmgrau transition-colors"
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
