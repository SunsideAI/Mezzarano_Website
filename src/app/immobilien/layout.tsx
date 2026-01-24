import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Immobilien kaufen & mieten in Hermeskeil, Trier & Mosel',
  description: 'Aktuelle Immobilienangebote in Hermeskeil, Trier, Schweich und Mosel. Häuser, Wohnungen und Grundstücke zum Kauf und zur Miete. Jetzt Traumimmobilie finden!',
  keywords: [
    'Immobilien Hermeskeil',
    'Haus kaufen Trier',
    'Wohnung mieten Mosel',
    'Immobilien Schweich',
    'Grundstück Hochwald',
  ],
  openGraph: {
    title: 'Immobilien in Hermeskeil, Trier & Mosel | Mezzarano',
    description: 'Finden Sie Ihr Traumhaus in der Region Trier-Mosel. Aktuelle Angebote von Ihrem Wüstenrot Partner.',
  },
}

export default function ImmobilienLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
