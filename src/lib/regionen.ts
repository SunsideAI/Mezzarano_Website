import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const REGIONS_DIR = path.join(process.cwd(), 'src', 'content', 'regionen')

export interface RegionContent {
  slug: string
  title: string
  description: string
  region?: string
  kreis?: string
  content: string
}

export function getRegionContent(slug: string): RegionContent | null {
  const filePath = path.join(REGIONS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    region: data.region,
    kreis: data.kreis,
    content,
  }
}

export function getAllRegionSlugs(): string[] {
  if (!fs.existsSync(REGIONS_DIR)) return []
  return fs.readdirSync(REGIONS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}
