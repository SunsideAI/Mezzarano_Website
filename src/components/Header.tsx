'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from 'lucide-react'

const navigation = [
  { name: 'Startseite', href: '/' },
  { name: 'Immobilien', href: '/immobilien' },
  {
    name: 'Leistungen',
    href: '/leistungen',
    submenu: [
      { name: 'Immobilienbewertung', href: '/leistungen/bewertung' },
      { name: 'Finanzierung', href: '/leistungen/finanzierung' },
      { name: 'Verkaufsberatung', href: '/leistungen/verkauf' },
    ],
  },
  {
    name: 'Wissen',
    href: '/ratgeber',
    submenu: [
      { name: 'Alle Artikel', href: '/ratgeber' },
      { name: 'Ratgeber & Tipps', href: '/ratgeber?kategorie=Tipps+%26+Ratgeber' },
      { name: 'Marktberichte', href: '/ratgeber?kategorie=Marktberichte' },
      { name: 'Erklärvideos', href: '/ratgeber?kategorie=Erklaervideos' },
    ],
  },
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = (name: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setOpenMenu(name)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null)
    }, 150)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar – Wüstenrot Style */}
      <div className="bg-secondary-900 text-white py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+4971311234567" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
              <Phone className="h-4 w-4" />
              <span>+49 7131 123 4567</span>
            </a>
            <a href="mailto:info@mezzarano-immobilien.de" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@mezzarano-immobilien.de</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Heilbronn & Umgebung</span>
            </div>
            <span className="text-secondary-400">|</span>
            <span className="text-primary-400 font-medium">Wüstenrot Partner</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-custom" aria-label="Hauptnavigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-serif font-bold text-2xl">M</span>
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-secondary-900">Mezzarano</span>
              <span className="block text-xs text-secondary-500 -mt-1 tracking-wider">IMMOBILIEN</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                onMouseLeave={() => item.submenu && handleMouseLeave()}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 font-medium transition-colors py-2 ${
                    openMenu === item.name
                      ? 'text-primary-500'
                      : 'text-secondary-700 hover:text-primary-500'
                  }`}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openMenu === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>

                {/* Animated underline */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
                    openMenu === item.name ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />

                {/* Dropdown */}
                {item.submenu && (
                  <div
                    className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                      openMenu === item.name
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white rounded-lg shadow-xl border border-secondary-100 py-2 min-w-[220px]">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2.5 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                          onClick={() => setOpenMenu(null)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link href="/kontakt" className="btn-primary ml-4">
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
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between text-secondary-700 hover:text-primary-500 font-medium py-3 px-2 rounded-lg hover:bg-secondary-50 transition-colors"
                        onClick={() =>
                          setMobileExpanded(mobileExpanded === item.name ? null : item.name)
                        }
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileExpanded === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {mobileExpanded === item.name && (
                        <div className="pl-4 pb-1 space-y-1">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.name}
                              href={subitem.href}
                              className="block text-secondary-600 hover:text-primary-500 py-2 px-2 text-sm rounded-lg hover:bg-secondary-50 transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-secondary-700 hover:text-primary-500 font-medium py-3 px-2 rounded-lg hover:bg-secondary-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              <Link
                href="/kontakt"
                className="btn-primary mt-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Beratung anfragen
              </Link>
            </div>

            {/* Mobile contact info */}
            <div className="mt-6 pt-6 border-t space-y-3 text-sm text-secondary-600">
              <a href="tel:+4971311234567" className="flex items-center gap-2 hover:text-primary-500">
                <Phone className="h-4 w-4" />
                <span>+49 7131 123 4567</span>
              </a>
              <a href="mailto:info@mezzarano-immobilien.de" className="flex items-center gap-2 hover:text-primary-500">
                <Mail className="h-4 w-4" />
                <span>info@mezzarano-immobilien.de</span>
              </a>
              <div className="pt-2 text-primary-500 font-medium">Wüstenrot Partner</div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
