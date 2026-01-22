import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import type { BlogPostMeta } from '@/lib/blog'

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
    return (
      <article className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-full min-h-[300px]">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <span className="text-6xl font-serif font-bold text-white/20">M</span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="badge badge-primary">
                {post.category}
              </span>
            </div>
          </div>

          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-sm text-secondary-500 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.pubDate)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime} Min. Lesezeit
              </span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary-900 mb-4 group-hover:text-primary-500 transition-colors">
              <Link href={`/ratgeber/${post.slug}`}>
                {post.title}
              </Link>
            </h2>

            <p className="text-secondary-600 mb-6 line-clamp-3">
              {post.description}
            </p>

            <Link
              href={`/ratgeber/${post.slug}`}
              className="inline-flex items-center text-primary-500 font-semibold hover:text-primary-600 transition-colors"
            >
              Artikel lesen
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 card-hover">
      <div className="relative h-48">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <span className="text-4xl font-serif font-bold text-white/20">M</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="badge badge-primary text-xs">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-secondary-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.pubDate)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} Min.
          </span>
        </div>

        <h3 className="font-serif text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
          <Link href={`/ratgeber/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
          {post.description}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs text-secondary-500 flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/ratgeber/${post.slug}`}
          className="inline-flex items-center text-primary-500 font-medium text-sm hover:text-primary-600 transition-colors"
        >
          Weiterlesen
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}
