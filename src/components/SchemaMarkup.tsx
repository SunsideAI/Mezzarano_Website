interface SchemaMarkupProps {
  data: Record<string, unknown>
}

export default function SchemaMarkup({ data }: SchemaMarkupProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Sandro Mezzarano's business info
const businessInfo = {
  name: 'Sandro Mezzarano',
  legalName: 'Sandro Mezzarano - Wüstenrot Immobilien',
  description: 'Ihr Wüstenrot Immobilien-Experte in Hermeskeil. Professionelle Beratung für Kauf, Verkauf und Vermietung von Immobilien in der Region Trier.',
  url: 'https://mezzarano-immobilien.de',
  telephone: '+49 177 6542977',
  email: 'sandro.mezzarano@wuestenrot.de',
  address: {
    street: 'Saarstraße 1',
    city: 'Hermeskeil',
    postalCode: '54411',
    region: 'Rheinland-Pfalz',
    country: 'DE'
  },
  geo: {
    latitude: 49.6558,
    longitude: 6.9428
  }
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: businessInfo.legalName,
    description: businessInfo.description,
    url: businessInfo.url,
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.street,
      addressLocality: businessInfo.address.city,
      postalCode: businessInfo.address.postalCode,
      addressRegion: businessInfo.address.region,
      addressCountry: businessInfo.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude
    },
    areaServed: [
      { '@type': 'City', name: 'Hermeskeil' },
      { '@type': 'City', name: 'Trier' },
      { '@type': 'City', name: 'Bernkastel-Kues' },
      { '@type': 'City', name: 'Schweich' }
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: 'Wüstenrot Immobilien GmbH',
      url: 'https://www.wuestenrot-immobilien.de'
    }
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

export function generatePropertySchema(property: {
  name: string
  description: string
  price: number
  currency?: string
  address: string
  city: string
  bedrooms?: number
  area?: number
  image?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.name,
    description: property.description,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: property.currency || 'EUR'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.city,
      addressCountry: 'DE'
    },
    ...(property.bedrooms && { numberOfRooms: property.bedrooms }),
    ...(property.area && {
      floorSize: {
        '@type': 'QuantitativeValue',
        value: property.area,
        unitCode: 'MTK'
      }
    }),
    ...(property.image && { image: property.image }),
    url: property.url
  }
}
