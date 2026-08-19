import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import SchemaMarkup, { generateLocalBusinessSchema } from '@/components/SchemaMarkup'
import ScrollAnimations from '@/components/ScrollAnimations'
import VoiceflowChat from '@/components/VoiceflowChat'

const siteUrl = 'https://mezzarano-wuestenrot-immobilien.de'

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
    // relative to the current route, so every page gets a self-canonical
    // instead of inheriting the homepage URL
    canonical: './',
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
        url: 'https://res.cloudinary.com/djqviyb2c/image/upload/v1773756912/csm_wuestenrot_immobilien-logo_6e50ef3869_ljwzlt.jpg',
        width: 1200,
        height: 630,
        alt: 'Wüstenrot Immobilien - Sandro Mezzarano',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandro Mezzarano | Immobilienmakler Hermeskeil & Trier',
    description: 'Ihr Wüstenrot Immobilienexperte für die Region Trier-Mosel. Kostenlose Immobilienbewertung!',
    images: ['https://res.cloudinary.com/djqviyb2c/image/upload/v1773756912/csm_wuestenrot_immobilien-logo_6e50ef3869_ljwzlt.jpg'],
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
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
        <CookieBanner />
        <VoiceflowChat />
      </body>
    </html>
  )
}
