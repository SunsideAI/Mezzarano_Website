import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SchemaMarkup, { generateLocalBusinessSchema } from '@/components/SchemaMarkup'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata: Metadata = {
  title: 'Sandro Mezzarano | Wüstenrot Immobilien Hermeskeil',
  description: 'Sandro Mezzarano - Ihr Wüstenrot Immobilien-Experte in Hermeskeil. Professionelle Beratung für Kauf, Verkauf und Vermietung von Immobilien in der Region Trier.',
  keywords: 'Immobilien Hermeskeil, Wüstenrot, Immobilienmakler Trier, Haus kaufen Hermeskeil, Wohnung mieten, Sandro Mezzarano',
  openGraph: {
    title: 'Sandro Mezzarano | Wüstenrot Immobilien',
    description: 'Ihr Immobilien-Experte in Hermeskeil und Umgebung',
    type: 'website',
    locale: 'de_DE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <SchemaMarkup data={generateLocalBusinessSchema()} />
      </head>
      <body className="font-sans antialiased">
        <ScrollAnimations />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
