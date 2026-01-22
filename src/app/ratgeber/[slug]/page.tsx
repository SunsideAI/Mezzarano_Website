import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Linkedin, Twitter, Mail } from 'lucide-react'
import { getPostBySlug, getAllSlugs, getRelatedPosts } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'
import SchemaMarkup from '@/components/SchemaMarkup'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return { title: 'Artikel nicht gefunden' }
  }

  return {
    title: `${post.title} | Mezzarano Immobilien`,
    description: post.description,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.pubDate,
      authors: [post.author],
      tags: post.tags,
    }
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug, post.category, 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const shareUrl = `https://mezzarano-immobilien.de/ratgeber/${params.slug}`

  // Schema.org Article markup
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mezzarano Immobilien',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mezzarano-immobilien.de/logo.png'
      }
    },
    datePublished: post.pubDate,
    dateModified: post.pubDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': shareUrl
    }
  }

  return (
    <>
      <SchemaMarkup data={articleSchema} />

      <article className="min-h-screen bg-secondary-50">
        {/* Header */}
        <header className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 py-16">
          <div className="container-custom">
            <Link
              href="/ratgeber"
              className="inline-flex items-center text-secondary-300 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Zurück zum Ratgeber
            </Link>

            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="badge bg-primary-500 text-white">
                  {post.category}
                </span>
                {post.featured && (
                  <span className="badge bg-accent-500 text-white">
                    Empfohlen
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {post.title}
              </h1>

              <p className="text-xl text-secondary-300 mb-8">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-secondary-400">
                <span className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {formatDate(post.pubDate)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {post.readingTime} Min. Lesezeit
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <div
                  className="prose-blog"
                  dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(post.content) }}
                />

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-secondary-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="h-5 w-5 text-secondary-400" />
                      <span className="font-medium text-secondary-700">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Link
                          key={tag}
                          href={`/ratgeber?tag=${encodeURIComponent(tag)}`}
                          className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-secondary-200 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share */}
                <div className="mt-8 pt-8 border-t border-secondary-200">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-secondary-700">
                      <Share2 className="h-5 w-5" />
                      Artikel teilen:
                    </span>
                    <div className="flex gap-3">
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors text-secondary-600"
                        aria-label="Auf LinkedIn teilen"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors text-secondary-600"
                        aria-label="Auf X teilen"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a
                        href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
                        className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors text-secondary-600"
                        aria-label="Per E-Mail teilen"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                {/* CTA Box */}
                <div className="bg-primary-500 text-white rounded-2xl p-8">
                  <h3 className="font-serif text-2xl font-bold mb-4">
                    Kostenlose Beratung
                  </h3>
                  <p className="text-white/90 mb-6">
                    Haben Sie Fragen zu diesem Thema? Herr Mezzarano berät Sie gerne persönlich.
                  </p>
                  <Link href="/kontakt" className="btn-primary bg-white text-primary-500 hover:bg-secondary-100 w-full justify-center">
                    Jetzt Termin vereinbaren
                  </Link>
                </div>

                {/* Author Box */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-semibold text-secondary-900 mb-4">Über den Autor</h4>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-500">M</span>
                    </div>
                    <div>
                      <p className="font-semibold text-secondary-900">{post.author}</p>
                      <p className="text-sm text-secondary-500">Wüstenrot Immobilienberater</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="section-title mb-8">Weitere Artikel</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(post => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  )
}

// Simple Markdown to HTML converter
function convertMarkdownToHtml(markdown: string): string {
  let html = markdown

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Bold and Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2">$1</a>')

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>')

  // Paragraphs
  html = html.replace(/\n\n/gim, '</p><p>')
  html = '<p>' + html + '</p>'

  // Clean up
  html = html.replace(/<p><h/g, '<h')
  html = html.replace(/<\/h(\d)><\/p>/g, '</h$1>')
  html = html.replace(/<p><ul>/g, '<ul>')
  html = html.replace(/<\/ul><\/p>/g, '</ul>')
  html = html.replace(/<p><\/p>/g, '')

  return html
}
