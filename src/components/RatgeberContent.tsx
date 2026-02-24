'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Search, BookOpen, TrendingUp } from 'lucide-react'
import BlogCard from '@/components/BlogCard'

interface BlogPostMeta {
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

interface Category {
  name: string
  count: number
}

interface Props {
  allPosts: BlogPostMeta[]
  categories: Category[]
  featuredPost: BlogPostMeta | null
}

export default function RatgeberContent({ allPosts, categories, featuredPost }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Handle category selection without scroll jumping
  const handleCategoryClick = useCallback((category: string | null) => {
    // Temporarily disable smooth scroll
    const html = document.documentElement
    const originalScrollBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'

    // Save current scroll position
    const scrollY = window.scrollY

    // Update category
    setSelectedCategory(category)

    // Restore scroll position immediately
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY)
      // Restore smooth scroll after a short delay
      setTimeout(() => {
        html.style.scrollBehavior = originalScrollBehavior
      }, 100)
    })
  }, [])

  // Filter posts by category and search query
  const filteredPosts = useMemo(() => {
    let posts = allPosts

    // Filter by category
    if (selectedCategory) {
      posts = posts.filter(post => post.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return posts
  }, [allPosts, selectedCategory, searchQuery])

  // Get featured post for display
  const displayFeaturedPost = useMemo(() => {
    if (selectedCategory || searchQuery) return null
    return featuredPost
  }, [selectedCategory, searchQuery, featuredPost])

  // Posts to display in grid (exclude featured if shown separately)
  const displayPosts = useMemo(() => {
    if (displayFeaturedPost) {
      return filteredPosts.filter(post => post.slug !== displayFeaturedPost.slug).slice(0, 6)
    }
    return filteredPosts.slice(0, 6)
  }, [filteredPosts, displayFeaturedPost])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary-900 py-16 md:py-24 min-h-[400px] md:min-h-[500px] flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary-400 mb-4" data-aos="fade-up">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Wissen & Expertise</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100">
              Immobilien-Ratgeber
            </h1>
            <p className="text-xl text-gray-300 mb-8" data-aos="fade-up" data-aos-delay="200">
              Expertenwissen rund um Immobilien in Hermeskeil, Trier, an der Mosel und im Hochwald.
              Tipps zum Kauf, Verkauf, zur Finanzierung und aktuelle Marktanalysen.
            </p>

            {/* Search Box */}
            <div className="relative max-w-xl" data-aos="fade-up" data-aos-delay="300">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
              <input
                type="search"
                placeholder="Artikel durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary-800 border border-secondary-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b sticky top-20 z-30">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                !selectedCategory
                  ? 'bg-primary-500 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              Alle Artikel
            </button>
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.name
                    ? 'bg-primary-500 text-white'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post (only show if no filter and we have featured post) */}
      {displayFeaturedPost && (
        <section className="py-12">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-primary-500 mb-6" data-aos="fade-up">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">Aktueller Artikel</span>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <BlogCard post={displayFeaturedPost} featured />
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="section-title mb-8" data-aos="fade-up">
            {selectedCategory
              ? `${selectedCategory} (${filteredPosts.length})`
              : searchQuery
                ? `Suchergebnisse (${filteredPosts.length})`
                : 'Alle Artikel'
            }
          </h2>

          {displayPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.map((post, index) => (
                <div key={post.slug} data-aos="fade-up" data-aos-delay={index * 100}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl">
              <BookOpen className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                {selectedCategory
                  ? `Keine Artikel in "${selectedCategory}"`
                  : searchQuery
                    ? `Keine Ergebnisse für "${searchQuery}"`
                    : 'Noch keine Artikel vorhanden'
                }
              </h3>
              <p className="text-secondary-500">
                {selectedCategory || searchQuery
                  ? 'Versuchen Sie eine andere Suche oder schauen Sie sich andere Kategorien an.'
                  : 'Bald finden Sie hier informative Artikel rund um Immobilien.'
                }
              </p>
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null)
                    setSearchQuery('')
                  }}
                  className="btn-primary mt-6"
                >
                  Alle Artikel anzeigen
                </button>
              )}
            </div>
          )}

          {filteredPosts.length > 6 && (
            <div className="text-center mt-12">
              <button className="btn-secondary">
                Weitere Artikel laden
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-10 md:py-16 bg-primary-500">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-white mb-4">
            Immer informiert bleiben
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Erhalten Sie regelmäßig Tipps und aktuelle Marktberichte direkt in Ihr Postfach.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ihre E-Mail-Adresse"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button type="submit" className="btn-primary bg-secondary-900 hover:bg-secondary-800">
              Anmelden
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
