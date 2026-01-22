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
    title: 'Moderne Stadtvilla mit Garten',
    description: 'Exklusive Stadtvilla in ruhiger Lage mit großzügigem Garten, hochwertiger Ausstattung und Smart-Home-System. Perfekt für Familien.',
    type: 'kauf',
    price: 1250000,
    location: 'Berlin-Zehlendorf',
    address: 'Villenviertel 15, 14169 Berlin',
    bedrooms: 6,
    bathrooms: 3,
    area: 320,
    yearBuilt: 2020,
    features: ['Garten', 'Garage', 'Smart Home', 'Fußbodenheizung', 'Terrasse', 'Kamin'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    featured: true,
    category: 'villa',
  },
  {
    id: '2',
    title: 'Penthouse mit Panoramablick',
    description: 'Luxuriöses Penthouse im Herzen der Stadt mit atemberaubendem Blick über die Skyline. Hochwertige Materialien und exklusive Ausstattung.',
    type: 'kauf',
    price: 980000,
    location: 'Berlin-Mitte',
    address: 'Alexanderstraße 88, 10178 Berlin',
    bedrooms: 4,
    bathrooms: 2,
    area: 185,
    yearBuilt: 2019,
    features: ['Dachterrasse', 'Aufzug', 'Tiefgarage', 'Concierge', 'Klimaanlage'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    ],
    featured: true,
    category: 'wohnung',
  },
  {
    id: '3',
    title: 'Charmante Altbauwohnung',
    description: 'Wunderschöne Altbauwohnung mit hohen Decken, Stuck und Dielen. Frisch saniert in begehrter Lage mit hervorragender Anbindung.',
    type: 'miete',
    price: 2200,
    location: 'Berlin-Prenzlauer Berg',
    address: 'Kastanienallee 42, 10435 Berlin',
    bedrooms: 3,
    bathrooms: 1,
    area: 120,
    yearBuilt: 1905,
    features: ['Altbau', 'Balkon', 'Dielen', 'Stuck', 'Einbauküche'],
    images: [
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    featured: false,
    category: 'wohnung',
  },
  {
    id: '4',
    title: 'Familienhaus am Stadtrand',
    description: 'Großzügiges Einfamilienhaus mit Garten in familienfreundlicher Umgebung. Ruhige Lage mit guter Anbindung an die Innenstadt.',
    type: 'kauf',
    price: 650000,
    location: 'Berlin-Spandau',
    address: 'Am Waldrand 23, 13597 Berlin',
    bedrooms: 5,
    bathrooms: 2,
    area: 180,
    yearBuilt: 2015,
    features: ['Garten', 'Carport', 'Keller', 'Gäste-WC', 'Einbauküche'],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    featured: true,
    category: 'haus',
  },
  {
    id: '5',
    title: 'Stilvolle Loft-Wohnung',
    description: 'Einzigartiges Loft in einer ehemaligen Fabrik mit industriellem Charme. Offene Raumgestaltung und große Fensterfronten.',
    type: 'miete',
    price: 1850,
    location: 'Berlin-Kreuzberg',
    address: 'Fabrikstraße 7, 10997 Berlin',
    bedrooms: 2,
    bathrooms: 1,
    area: 95,
    yearBuilt: 1920,
    features: ['Loft', 'Hohe Decken', 'Offene Küche', 'Fahrradraum'],
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    ],
    featured: false,
    category: 'wohnung',
  },
  {
    id: '6',
    title: 'Bürofläche im Businesscenter',
    description: 'Moderne Bürofläche im etablierten Businesscenter. Flexibel teilbar, repräsentativer Empfangsbereich und Konferenzräume vorhanden.',
    type: 'miete',
    price: 4500,
    location: 'Berlin-Charlottenburg',
    address: 'Kurfürstendamm 156, 10709 Berlin',
    bedrooms: 0,
    bathrooms: 2,
    area: 250,
    yearBuilt: 2018,
    features: ['Klimaanlage', 'Aufzug', 'Tiefgarage', 'Konferenzraum', '24h Zugang'],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    ],
    featured: false,
    category: 'gewerbe',
  },
  {
    id: '7',
    title: 'Gemütliche 2-Zimmer-Wohnung',
    description: 'Ideal für Singles oder Paare: Gepflegte 2-Zimmer-Wohnung mit Balkon in zentraler Lage. Sofort bezugsfrei.',
    type: 'miete',
    price: 1100,
    location: 'Berlin-Friedrichshain',
    address: 'Boxhagener Str. 55, 10245 Berlin',
    bedrooms: 2,
    bathrooms: 1,
    area: 55,
    yearBuilt: 1960,
    features: ['Balkon', 'Einbauküche', 'Keller', 'Hausmeister'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    ],
    featured: false,
    category: 'wohnung',
  },
  {
    id: '8',
    title: 'Exklusive Villa am See',
    description: 'Traumhafte Villa mit direktem Seezugang. Luxuriöse Ausstattung, großer Garten und eigener Bootssteg.',
    type: 'kauf',
    price: 2800000,
    location: 'Potsdam',
    address: 'Am Griebnitzsee 12, 14482 Potsdam',
    bedrooms: 7,
    bathrooms: 4,
    area: 450,
    yearBuilt: 2021,
    features: ['Seezugang', 'Bootssteg', 'Pool', 'Sauna', 'Weinkeller', 'Smart Home'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    ],
    featured: true,
    category: 'villa',
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
}): Property[] {
  return properties.filter(property => {
    if (filters.type && property.type !== filters.type) return false
    if (filters.category && property.category !== filters.category) return false
    if (filters.minPrice && property.price < filters.minPrice) return false
    if (filters.maxPrice && property.price > filters.maxPrice) return false
    if (filters.minArea && property.area < filters.minArea) return false
    if (filters.maxArea && property.area > filters.maxArea) return false
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false
    return true
  })
}
