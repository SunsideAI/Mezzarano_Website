import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, ExternalLink } from 'lucide-react'
import { WuestenrotLogoCompact } from './WuestenrotLogo'

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

const footerLinks = {
  immobilien: [
    { name: 'Alle Immobilien', href: '/immobilien' },
    { name: 'Häuser kaufen', href: '/immobilien?kategorie=Kauf&rs_typ=HOUSE' },
    { name: 'Wohnungen kaufen', href: '/immobilien?kategorie=Kauf&rs_typ=APARTMENT' },
    { name: 'Mieten', href: '/immobilien?kategorie=Miete' },
  ],
  leistungen: [
    { name: 'Immobilie verkaufen', href: '/verkaufen' },
    { name: 'Immobilie kaufen', href: '/kaufen' },
    { name: 'Immobilienbewertung', href: '/bewerten' },
    { name: 'Finanzierung', href: '/finanzierung' },
  ],
  regionen: [
    { name: 'Hermeskeil', href: '/regionen/hermeskeil' },
    { name: 'Trier', href: '/regionen/trier' },
    { name: 'Bernkastel-Kues', href: '/regionen/bernkastel-kues' },
    { name: 'Schweich', href: '/regionen/schweich' },
  ],
  rechtliches: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
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
              <span className="font-semibold">Wüstenrot Immobilien Partner</span>
              <span className="block text-sm text-white/80">Ihre Immobilie in guten Händen</span>
            </div>
          </div>
          <a
            href="https://www.wuestenrot-immobilien.de"
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
              <WuestenrotLogoCompact />
              <div>
                <span className="font-semibold text-lg text-white leading-tight block">wüstenrot</span>
                <span className="text-xs text-secondary-400 tracking-wider uppercase">Immobilien</span>
              </div>
            </Link>

            {/* Agent Info */}
            <div className="mb-6">
              <h3 className="text-white font-semibold text-lg mb-1">{contact.name}</h3>
              <p className="text-secondary-400 text-sm">{contact.title}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href={`tel:${contact.phone1.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-primary-400 transition-colors">
                <Phone className="h-5 w-5 text-primary-500" />
                <span>{contact.phone1}</span>
              </a>
              <a href={`tel:${contact.phone2.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-primary-400 transition-colors">
                <Phone className="h-5 w-5 text-primary-500" />
                <span>{contact.phone2}</span>
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-primary-400 transition-colors">
                <Mail className="h-5 w-5 text-primary-500" />
                <span>{contact.email}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
                <span>{contact.street}<br />{contact.city}</span>
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
            <h3 className="text-white font-semibold mb-6">Immobilien</h3>
            <ul className="space-y-3">
              {footerLinks.immobilien.map((link) => (
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
            &copy; {new Date().getFullYear()} {contact.name} - Wüstenrot Immobilien. Alle Rechte vorbehalten.
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
