import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Erklärvideos',
  description: 'Erklärvideos zu wichtigen Immobilienthemen: Maklerkosten, Widerrufsrecht, Preisermittlung und Profivermietung. Informieren Sie sich bequem per Video.',
  keywords: ['Erklärvideos', 'Immobilien', 'Maklerkosten', 'Widerrufsrecht', 'Preisermittlung', 'Profivermietung', 'Wüstenrot']
}

export default function ErklaervideosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
