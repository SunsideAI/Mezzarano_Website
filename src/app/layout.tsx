import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SchemaMarkup, { generateLocalBusinessSchema } from '@/components/SchemaMarkup'
import ScrollAnimations from '@/components/ScrollAnimations'
import VoiceflowChat from '@/components/VoiceflowChat'

const siteUrl = 'https://mezzarano-immobilien.de'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f84914', // wüstenrot
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sandro Mezzarano | Immobilienmakler Hermeskeil, Trier & Mosel',
    template: '%s | Mezzarano Immobilien',
  },
  description: 'Sandro Mezzarano - Ihr Wüstenrot Immobilienmakler in Hermeskeil, Trier, Mosel & Hochwald. Professionelle Immobilienbewertung, Verkauf & Kauf. Jetzt kostenlos beraten lassen!',
  keywords: [
    'Immobilienmakler Hermeskeil',
    'Immobilienmakler Trier',
    'Immobilien Mosel',
    'Haus verkaufen Hermeskeil',
    'Wohnung kaufen Trier',
    'Immobilienbewertung kostenlos',
    'Wüstenrot Immobilien',
    'Sandro Mezzarano',
    'Makler Hochwald',
    'Immobilien Schweich',
    'Immobilien Bernkastel-Kues',
  ],
  authors: [{ name: 'Sandro Mezzarano' }],
  creator: 'Sandro Mezzarano',
  publisher: 'Mezzarano Immobilien',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: siteUrl,
    siteName: 'Mezzarano Immobilien',
    title: 'Sandro Mezzarano | Ihr Immobilienmakler in Hermeskeil, Trier & Mosel',
    description: 'Professionelle Immobilienberatung in der Region Trier-Mosel. Kostenlose Bewertung, persönliche Betreuung, Wüstenrot Finanzierungspartner.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Sandro Mezzarano - Immobilienmakler Hermeskeil',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandro Mezzarano | Immobilienmakler Hermeskeil & Trier',
    description: 'Ihr Wüstenrot Immobilienexperte für die Region Trier-Mosel. Kostenlose Immobilienbewertung!',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Preconnect for faster image loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.airtable.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://api.airtable.com" />
        {/* Prefetch API data for faster page loads */}
        <link rel="prefetch" href="/api/properties" as="fetch" crossOrigin="anonymous" />
        <SchemaMarkup data={generateLocalBusinessSchema()} />
      </head>
      <body className="font-ww antialiased bg-wohnraum text-wuestennacht">
        <ScrollAnimations />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <VoiceflowChat />
      </body>
    </html>
  )
}
