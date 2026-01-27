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
    title: 'Moderne Stadtvilla im Neckarbogen',
    description: 'Exklusive Stadtvilla im begehrten Neckarbogen mit großzügigem Garten, hochwertiger Ausstattung und Smart-Home-System. Perfekt für Familien.',
    type: 'kauf',
    price: 895000,
    location: 'Heilbronn-Neckarbogen',
    address: 'Am Floßhafen 15, 74076 Heilbronn',
    bedrooms: 5,
    bathrooms: 3,
    area: 210,
    yearBuilt: 2020,
    features: ['Garten', 'Garage', 'Smart Home', 'Fußbodenheizung', 'Terrasse', 'Photovoltaik'],
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
    title: 'Penthouse mit Blick auf die Weinberge',
    description: 'Luxuriöses Penthouse in Heilbronn mit atemberaubendem Blick auf die Weinberge. Hochwertige Materialien und exklusive Ausstattung.',
    type: 'kauf',
    price: 680000,
    location: 'Heilbronn-Sontheim',
    address: 'Weinbergstraße 88, 74081 Heilbronn',
    bedrooms: 4,
    bathrooms: 2,
    area: 165,
    yearBuilt: 2019,
    features: ['Dachterrasse', 'Aufzug', 'Tiefgarage', 'Klimaanlage', 'Panoramafenster'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    ],
    featured: true,
    category: 'wohnung',
  },
  {
    id: '3',
    title: 'Charmantes Stadthaus in der Altstadt',
    description: 'Liebevoll saniertes Stadthaus in der historischen Altstadt von Heilbronn. Moderne Ausstattung trifft auf historischen Charme.',
    type: 'miete',
    price: 1850,
    location: 'Heilbronn-Innenstadt',
    address: 'Lohtorstraße 42, 74072 Heilbronn',
    bedrooms: 3,
    bathrooms: 1,
    area: 115,
    yearBuilt: 1890,
    features: ['Altbau', 'Balkon', 'Dielen', 'Einbauküche', 'Fußgängerzone'],
    images: [
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    featured: false,
    category: 'wohnung',
  },
  {
    id: '4',
    title: 'Familienhaus mit Garten in Weinsberg',
    description: 'Großzügiges Einfamilienhaus mit Garten in familienfreundlicher Umgebung. Ruhige Lage mit Blick auf die Weinberge.',
    type: 'kauf',
    price: 485000,
    location: 'Weinsberg',
    address: 'Burgbergweg 23, 74189 Weinsberg',
    bedrooms: 5,
    bathrooms: 2,
    area: 165,
    yearBuilt: 2015,
    features: ['Garten', 'Carport', 'Keller', 'Gäste-WC', 'Einbauküche', 'Photovoltaik'],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    featured: true,
    category: 'haus',
  },
  {
    id: '5',
    title: 'Moderne 3-Zimmer-Wohnung',
    description: 'Helle, moderne Wohnung mit Balkon in gepflegter Wohnanlage. Ideal für Paare oder kleine Familien.',
    type: 'miete',
    price: 1250,
    location: 'Heilbronn-Böckingen',
    address: 'Schillerstraße 17, 74080 Heilbronn',
    bedrooms: 3,
    bathrooms: 1,
    area: 85,
    yearBuilt: 2018,
    features: ['Balkon', 'Einbauküche', 'Tiefgarage', 'Fahrradraum', 'Abstellraum'],
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    ],
    featured: false,
    category: 'wohnung',
  },
  {
    id: '6',
    title: 'Gewerbefläche am Europaplatz',
    description: 'Repräsentative Bürofläche im Herzen von Heilbronn. Flexible Raumaufteilung, moderne Ausstattung und beste Verkehrsanbindung.',
    type: 'miete',
    price: 3200,
    location: 'Heilbronn-Innenstadt',
    address: 'Europaplatz 8, 74072 Heilbronn',
    bedrooms: 0,
    bathrooms: 2,
    area: 180,
    yearBuilt: 2017,
    features: ['Klimaanlage', 'Aufzug', 'Tiefgarage', 'Konferenzraum', 'Glasfaser'],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    ],
    featured: false,
    category: 'gewerbe',
  },
  {
    id: '7',
    title: 'Kompakte 2-Zimmer-Wohnung',
    description: 'Ideal für Singles oder Studenten: Gepflegte 2-Zimmer-Wohnung mit Balkon. Nähe zur Hochschule und Innenstadt.',
    type: 'miete',
    price: 780,
    location: 'Heilbronn-Sontheim',
    address: 'Max-Planck-Str. 55, 74081 Heilbronn',
    bedrooms: 2,
    bathrooms: 1,
    area: 52,
    yearBuilt: 1985,
    features: ['Balkon', 'Einbauküche', 'Keller', 'Bushaltestelle'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    ],
    featured: false,
    category: 'wohnung',
  },
  {
    id: '8',
    title: 'Exklusives Landhaus bei Neckarsulm',
    description: 'Traumhaftes Anwesen mit großem Grundstück und unverbaubarem Blick. Hochwertige Ausstattung, Pool und Wellnessbereich.',
    type: 'kauf',
    price: 1450000,
    location: 'Neckarsulm',
    address: 'Am Steinberg 12, 74172 Neckarsulm',
    bedrooms: 6,
    bathrooms: 4,
    area: 320,
    yearBuilt: 2021,
    features: ['Pool', 'Sauna', 'Weinkeller', 'Smart Home', 'Doppelgarage', 'Einliegerwohnung'],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
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
