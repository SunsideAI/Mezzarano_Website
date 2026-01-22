export interface Property {
  id: string
  title: string
  description: string
  type: 'kauf' | 'miete'
  price: number
  location: string
  address: string
  bedrooms: number
  bathrooms: number
  area: number
  yearBuilt: number
  features: string[]
  images: string[]
  featured: boolean
  category: 'wohnung' | 'haus' | 'villa' | 'gewerbe'
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Charmantes Einfamilienhaus in Hermeskeil',
    description: 'Gepflegtes Einfamilienhaus mit großem Garten in ruhiger Lage. Ideal für Familien, die das Leben im Grünen schätzen.',
    type: 'kauf',
    price: 289000,
    location: 'Hermeskeil',
    address: 'Hochwaldallee 15, 54411 Hermeskeil',
    bedrooms: 5,
    bathrooms: 2,
    area: 145,
    yearBuilt: 1995,
    features: ['Garten', 'Garage', 'Keller', 'Terrasse', 'Einbauküche'],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    featured: true,
    category: 'haus',
  },
  {
    id: '2',
    title: 'Stilvolle Eigentumswohnung in Trier',
    description: 'Moderne 3-Zimmer-Wohnung in beliebter Lage von Trier-Süd. Hochwertige Ausstattung und Balkon mit Blick ins Grüne.',
    type: 'kauf',
    price: 245000,
    location: 'Trier-Süd',
    address: 'Saarstraße 45, 54290 Trier',
    bedrooms: 3,
    bathrooms: 1,
    area: 85,
    yearBuilt: 2018,
    features: ['Balkon', 'Einbauküche', 'Tiefgarage', 'Fußbodenheizung', 'Aufzug'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    ],
    featured: true,
    category: 'wohnung',
  },
  {
    id: '3',
    title: 'Historisches Fachwerkhaus in Bernkastel-Kues',
    description: 'Liebevoll restauriertes Fachwerkhaus im historischen Ortskern. Einzigartiges Wohnen mit Moselblick und modernem Komfort.',
    type: 'kauf',
    price: 375000,
    location: 'Bernkastel-Kues',
    address: 'Marktplatz 8, 54470 Bernkastel-Kues',
    bedrooms: 4,
    bathrooms: 2,
    area: 160,
    yearBuilt: 1750,
    features: ['Moselblick', 'Denkmalschutz', 'Terrasse', 'Weinkeller', 'Fachwerk'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
    ],
    featured: true,
    category: 'haus',
  },
  {
    id: '4',
    title: 'Modernes Reihenhaus in Schweich',
    description: 'Neuwertiges Reihenhaus mit Garten in familienfreundlicher Lage. Perfekt für Pendler nach Trier oder Luxemburg.',
    type: 'kauf',
    price: 345000,
    location: 'Schweich',
    address: 'Römerweg 12, 54338 Schweich',
    bedrooms: 4,
    bathrooms: 2,
    area: 125,
    yearBuilt: 2020,
    features: ['Garten', 'Carport', 'Fußbodenheizung', 'Gäste-WC', 'Smart Home'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    ],
    featured: true,
    category: 'haus',
  },
  {
    id: '5',
    title: 'Gemütliche Mietwohnung in Hermeskeil',
    description: 'Helle 3-Zimmer-Wohnung im Zentrum von Hermeskeil. Alle Einkaufsmöglichkeiten fußläufig erreichbar.',
    type: 'miete',
    price: 650,
    location: 'Hermeskeil',
    address: 'Bahnhofstraße 22, 54411 Hermeskeil',
    bedrooms: 3,
    bathrooms: 1,
    area: 75,
    yearBuilt: 2005,
    features: ['Balkon', 'Einbauküche', 'Keller', 'Zentrale Lage'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    ],
    featured: false,
    category: 'wohnung',
  },
  {
    id: '6',
    title: 'Gewerbeimmobilie in Trier-Nord',
    description: 'Vielseitig nutzbare Gewerbefläche mit guter Verkehrsanbindung. Ideal für Büro, Praxis oder Einzelhandel.',
    type: 'miete',
    price: 1800,
    location: 'Trier-Nord',
    address: 'Paulinstraße 55, 54292 Trier',
    bedrooms: 0,
    bathrooms: 2,
    area: 150,
    yearBuilt: 2010,
    features: ['Klimaanlage', 'Parkplätze', 'Barrierefreier Zugang', 'Glasfaser'],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    ],
    featured: false,
    category: 'gewerbe',
  },
  {
    id: '7',
    title: 'Baugrundstück mit Moselblick',
    description: 'Erschlossenes Baugrundstück in Hanglag mit traumhaftem Blick auf die Mosel. Bebauungsplan für Einfamilienhaus vorhanden.',
    type: 'kauf',
    price: 125000,
    location: 'Leiwen',
    address: 'Weinbergstraße, 54340 Leiwen',
    bedrooms: 0,
    bathrooms: 0,
    area: 680,
    yearBuilt: 0,
    features: ['Moselblick', 'Erschlossen', 'Südhang', 'Ruhige Lage'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
    featured: false,
    category: 'haus',
  },
  {
    id: '8',
    title: 'Renovierte Altbauwohnung in Trier',
    description: 'Stilvoll renovierte Altbauwohnung mit hohen Decken und Stuckdecken. Im beliebten Viertel Trier-Mitte.',
    type: 'miete',
    price: 950,
    location: 'Trier-Mitte',
    address: 'Fleischstraße 18, 54290 Trier',
    bedrooms: 2,
    bathrooms: 1,
    area: 78,
    yearBuilt: 1910,
    features: ['Altbau', 'Stuckdecken', 'Dielenboden', 'Zentral'],
    images: [
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    featured: false,
    category: 'wohnung',
  },
]

export function getFeaturedProperties(): Property[] {
  return properties.filter(p => p.featured)
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find(p => p.id === id)
}

export function filterProperties(filters: {
  type?: 'kauf' | 'miete'
  category?: string
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
  bedrooms?: number
  location?: string
}): Property[] {
  return properties.filter(property => {
    if (filters.type && property.type !== filters.type) return false
    if (filters.category && property.category !== filters.category) return false
    if (filters.minPrice && property.price < filters.minPrice) return false
    if (filters.maxPrice && property.price > filters.maxPrice) return false
    if (filters.minArea && property.area < filters.minArea) return false
    if (filters.maxArea && property.area > filters.maxArea) return false
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    return true
  })
}
