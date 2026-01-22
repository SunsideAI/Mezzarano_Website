import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  pubDate: string
  category: string
  author: string
  image?: string
  featured: boolean
  tags: string[]
  content: string
  readingTime: number
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  pubDate: string
  category: string
  author: string
  image?: string
  featured: boolean
  tags: string[]
  readingTime: number
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))

  const posts = files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const filePath = path.join(BLOG_DIR, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      pubDate: data.pubDate || new Date().toISOString(),
      category: data.category || 'Allgemein',
      author: data.author || 'Mezzarano Immobilien',
      image: data.image,
      featured: data.featured || false,
      tags: data.tags || [],
      readingTime: calculateReadingTime(content)
    }
  })

  // Sort by date, newest first
  posts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    pubDate: data.pubDate || new Date().toISOString(),
    category: data.category || 'Allgemein',
    author: data.author || 'Mezzarano Immobilien',
    image: data.image,
    featured: data.featured || false,
    tags: data.tags || [],
    content,
    readingTime: calculateReadingTime(content)
  }
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter(post => post.category === category)
}

export function getFeaturedPosts(limit: number = 3): BlogPostMeta[] {
  const posts = getAllPosts()
  const featured = posts.filter(p => p.featured)

  if (featured.length >= limit) {
    return featured.slice(0, limit)
  }

  // Fill with recent posts if not enough featured
  const remaining = posts.filter(p => !p.featured).slice(0, limit - featured.length)
  return [...featured, ...remaining]
}

export function getRelatedPosts(slug: string, category: string, limit: number = 3): BlogPostMeta[] {
  return getAllPosts()
    .filter(post => post.slug !== slug && post.category === category)
    .slice(0, limit)
}

export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPosts()
  const categoryMap = new Map<string, number>()

  posts.forEach(post => {
    const count = categoryMap.get(post.category) || 0
    categoryMap.set(post.category, count + 1)
  })

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()

  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })

  return Array.from(tags).sort()
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}
