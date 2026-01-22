import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react'

const footerLinks = {
  unternehmen: [
    { name: 'Über uns', href: '/ueber-uns' },
    { name: 'Team', href: '/ueber-uns#team' },
    { name: 'Karriere', href: '/karriere' },
    { name: 'Presse', href: '/presse' },
  ],
  services: [
    { name: 'Immobilien kaufen', href: '/immobilien?type=kauf' },
    { name: 'Immobilien mieten', href: '/immobilien?type=miete' },
    { name: 'Immobilienbewertung', href: '/bewertung' },
    { name: 'Beratung', href: '/kontakt' },
  ],
  rechtliches: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB', href: '/agb' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">M</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white">Mezzarano</span>
                <span className="block text-xs text-gray-400 -mt-1">IMMOBILIEN</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              Ihr vertrauenswürdiger Partner für Immobilien. Seit über 20 Jahren
              begleiten wir Sie bei allen Fragen rund um Kauf, Verkauf und Vermietung.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Unternehmen</h3>
            <ul className="space-y-3">
              {footerLinks.unternehmen.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+491234567890" className="flex items-start gap-3 hover:text-gold-400 transition-colors">
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>+49 123 456 7890</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@mezzarano.de" className="flex items-start gap-3 hover:text-gold-400 transition-colors">
                  <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>info@mezzarano.de</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Musterstraße 123<br />12345 Berlin</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Mo - Fr: 9:00 - 18:00<br />Sa: 10:00 - 14:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mezzarano Immobilien. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-sm">
            {footerLinks.rechtliches.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-500 hover:text-gold-400 transition-colors"
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
