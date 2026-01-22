import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, ExternalLink } from 'lucide-react'

const footerLinks = {
  unternehmen: [
    { name: 'Über uns', href: '/ueber-uns' },
    { name: 'Team', href: '/ueber-uns#team' },
    { name: 'Ratgeber', href: '/ratgeber' },
    { name: 'Karriere', href: '/karriere' },
  ],
  leistungen: [
    { name: 'Immobilien kaufen', href: '/immobilien?type=kauf' },
    { name: 'Immobilien mieten', href: '/immobilien?type=miete' },
    { name: 'Immobilienbewertung', href: '/leistungen/bewertung' },
    { name: 'Finanzierung', href: '/leistungen/finanzierung' },
    { name: 'Verkaufsberatung', href: '/leistungen/verkauf' },
  ],
  regionen: [
    { name: 'Heilbronn', href: '/regionen/heilbronn' },
    { name: 'Weinsberg', href: '/regionen/weinsberg' },
    { name: 'Neckarsulm', href: '/regionen/neckarsulm' },
    { name: 'Bad Wimpfen', href: '/regionen/bad-wimpfen' },
    { name: 'Öhringen', href: '/regionen/oehringen' },
  ],
  rechtliches: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB', href: '/agb' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-secondary-300">
      {/* Wüstenrot Partner Banner */}
      <div className="bg-primary-500 py-4">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-500 font-bold text-lg">W</span>
            </div>
            <div className="text-white">
              <span className="font-semibold">Offizieller Wüstenrot Partner</span>
              <span className="block text-sm text-white/80">Finanzierung & Bausparen aus einer Hand</span>
            </div>
          </div>
          <a
            href="https://www.wuestenrot.de"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
          >
            Mehr erfahren
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif font-bold text-2xl">M</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white">Mezzarano</span>
                <span className="block text-xs text-secondary-400 -mt-1 tracking-wider">IMMOBILIEN</span>
              </div>
            </Link>
            <p className="text-secondary-400 mb-6 max-w-sm">
              Ihr Wüstenrot Immobilienberater in der Region Heilbronn. Wir begleiten Sie
              kompetent bei Kauf, Verkauf und Finanzierung Ihrer Immobilie.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="tel:+4971311234567" className="flex items-center gap-3 hover:text-primary-400 transition-colors">
                <Phone className="h-5 w-5 text-primary-500" />
                <span>+49 7131 123 4567</span>
              </a>
              <a href="mailto:info@mezzarano-immobilien.de" className="flex items-center gap-3 hover:text-primary-400 transition-colors">
                <Mail className="h-5 w-5 text-primary-500" />
                <span>info@mezzarano-immobilien.de</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
                <span>Musterstraße 123<br />74072 Heilbronn</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary-500 mt-0.5" />
                <span>Mo - Fr: 9:00 - 18:00<br />Sa: Nach Vereinbarung</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Unternehmen</h3>
            <ul className="space-y-3">
              {footerLinks.unternehmen.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Leistungen</h3>
            <ul className="space-y-3">
              {footerLinks.leistungen.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Regionen</h3>
            <ul className="space-y-3">
              {footerLinks.regionen.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-500">
            &copy; {new Date().getFullYear()} Mezzarano Immobilien. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            {footerLinks.rechtliches.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-secondary-500 hover:text-primary-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
