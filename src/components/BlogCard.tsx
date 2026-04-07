import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag, TrendingUp, Home, Key, Building, Lightbulb, BookOpen, FileText, PiggyBank, Scale, MapPin, Users } from 'lucide-react'
import type { BlogPostMeta } from '@/lib/blog'

// Category to icon mapping
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Marktberichte': TrendingUp,
  'Kaufen': Home,
  'Verkaufen': Key,
  'Finanzierung': PiggyBank,
  'Tipps': Lightbulb,
  'Recht': Scale,
  'Region': MapPin,
  'Ratgeber': BookOpen,
  'News': FileText,
  'Über uns': Users,
}

// Get icon component for category
function getCategoryIcon(category: string) {
  return categoryIcons[category] || BookOpen
}

interface BlogCardProps {
  post: BlogPostMeta
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  if (featured) {
    const IconComponent = getCategoryIcon(post.category)

    return (
      <article className="group relative bg-white rounded-fenster shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-full min-h-[300px]">
            {post.image && !post.image.endsWith('.svg') ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-wuestenrot flex items-center justify-center">
                <IconComponent className="h-32 w-32 text-white/30" />
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="badge badge-primary bg-white text-wuestenrot">
                {post.category}
              </span>
            </div>
          </div>

          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-sm text-wuestennacht-light mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.pubDate)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime} Min. Lesezeit
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-wuestennacht mb-4 group-hover:text-wuestenrot transition-colors">
              <Link href={`/ratgeber/${post.slug}`}>
                {post.title}
              </Link>
            </h2>

            <p className="text-wuestennacht-light mb-6 line-clamp-3">
              {post.description}
            </p>

            <Link
              href={`/ratgeber/${post.slug}`}
              className="inline-flex items-center text-wuestenrot font-bold hover:text-wuestenrot-hover transition-colors"
            >
              Artikel lesen
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  const IconComponent = getCategoryIcon(post.category)

  return (
    <article className="group bg-white rounded-fenster shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 card-hover">
      <div className="relative h-48">
        {post.image && !post.image.endsWith('.svg') ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-wuestenrot flex items-center justify-center">
            <IconComponent className="h-20 w-20 text-white/30" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="badge badge-primary bg-white text-wuestenrot text-xs">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-wuestennacht-light mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.pubDate)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} Min.
          </span>
        </div>

        <h3 className="text-xl font-bold text-wuestennacht mb-3 group-hover:text-wuestenrot transition-colors line-clamp-2">
          <Link href={`/ratgeber/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-wuestennacht-light text-sm mb-4 line-clamp-2">
          {post.description}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs text-wuestennacht-light flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/ratgeber/${post.slug}`}
          className="inline-flex items-center text-wuestenrot font-bold text-sm hover:text-wuestenrot-hover transition-colors"
        >
          Weiterlesen
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
