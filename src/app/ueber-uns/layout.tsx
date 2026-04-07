import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über Sandro Mezzarano | Ihr Wüstenrot Immobilienmakler',
  description: 'Lernen Sie Sandro Mezzarano kennen - Ihr erfahrener Wüstenrot Immobilienmakler in Hermeskeil, Trier und Mosel. Persönliche Beratung, lokale Expertise, 10+ Jahre Erfahrung.',
  keywords: [
    'Sandro Mezzarano',
    'Wüstenrot Makler',
    'Immobilienmakler Hermeskeil',
    'Immobilienberater Trier',
  ],
  openGraph: {
    title: 'Sandro Mezzarano | Wüstenrot Immobilienberater',
    description: 'Ihr persönlicher Immobilienpartner in Hermeskeil und der Region Trier-Mosel.',
  },
}

export default function UeberUnsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
