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

// Pre-built schema generators

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Mezzarano Immobilien',
    description: 'Ihr Wüstenrot Immobilienberater in Heilbronn. Professionelle Beratung für Kauf, Verkauf und Finanzierung von Immobilien.',
    url: 'https://mezzarano-immobilien.de',
    telephone: '+49 7131 123456',
    email: 'info@mezzarano-immobilien.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Musterstraße 123',
      addressLocality: 'Heilbronn',
      postalCode: '74072',
      addressRegion: 'Baden-Württemberg',
      addressCountry: 'DE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.1427,
      longitude: 9.2109
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00'
      }
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Heilbronn'
      },
      {
        '@type': 'City',
        name: 'Weinsberg'
      },
      {
        '@type': 'City',
        name: 'Neckarsulm'
      },
      {
        '@type': 'City',
        name: 'Bad Wimpfen'
      }
    ],
    sameAs: [
      'https://www.facebook.com/mezzarano',
      'https://www.linkedin.com/company/mezzarano',
      'https://www.instagram.com/mezzarano'
    ],
    priceRange: '€€€'
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
  currency: string
  address: string
  city: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
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
      priceCurrency: property.currency
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.city,
      addressCountry: 'DE'
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area,
      unitCode: 'MTK'
    },
    image: property.image,
    url: property.url
  }
}
