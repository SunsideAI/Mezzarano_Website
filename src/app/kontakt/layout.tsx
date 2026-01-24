import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt | Kostenlose Immobilienberatung Hermeskeil & Trier',
  description: 'Kontaktieren Sie Sandro Mezzarano für eine kostenlose Immobilienberatung in Hermeskeil, Trier und Mosel. Telefon: 0177 6542977. Persönliche Betreuung garantiert!',
  keywords: [
    'Immobilienmakler Kontakt',
    'Beratung Hermeskeil',
    'Immobilienberatung Trier',
    'kostenlose Bewertung',
  ],
  openGraph: {
    title: 'Kontakt | Sandro Mezzarano Immobilien',
    description: 'Kostenlose und unverbindliche Immobilienberatung. Rufen Sie an: 0177 6542977',
  },
}

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
