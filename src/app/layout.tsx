import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Mezzarano Immobilien | Ihr Partner für Immobilien',
  description: 'Mezzarano Immobilien - Ihr vertrauenswürdiger Partner für den Kauf, Verkauf und die Vermietung von Immobilien. Wir bieten erstklassige Beratung und persönlichen Service.',
  keywords: 'Immobilien, Häuser, Wohnungen, Kaufen, Verkaufen, Mieten, Mezzarano',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
