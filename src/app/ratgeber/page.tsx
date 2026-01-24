import Link from 'next/link'
import { Search, BookOpen, TrendingUp } from 'lucide-react'
import BlogCard from '@/components/BlogCard'
import { getAllPosts, getAllCategories, getFeaturedPosts } from '@/lib/blog'

export const metadata = {
  title: 'Ratgeber | Mezzarano Immobilien - Tipps & Wissen',
  description: 'Ihr Immobilien-Ratgeber für Trier, Mosel und Hochwald. Expertenwissen zu Kauf, Verkauf, Finanzierung und aktuellen Markttrends.',
  keywords: 'Immobilien Ratgeber, Trier, Mosel, Hochwald, Tipps, Finanzierung, Immobilienverkauf, Immobilienkauf'
}

export default function RatgeberPage() {
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts(1)
  const categories = getAllCategories()
  const recentPosts = allPosts.slice(0, 6)

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-primary-500 py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-white/80 mb-4" data-aos="fade-up">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Wissen & Expertise</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100">
              Immobilien-Ratgeber
            </h1>
            <p className="text-xl text-white/90 mb-8" data-aos="fade-up" data-aos-delay="200">
              Expertenwissen rund um Immobilien in der Region Trier, Mosel und Hochwald.
              Tipps zum Kauf, Verkauf, zur Finanzierung und aktuelle Marktanalysen.
            </p>

            {/* Search Box */}
            <div className="relative max-w-xl" data-aos="fade-up" data-aos-delay="300">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-700" />
              <input
                type="search"
                placeholder="Artikel durchsuchen..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border-0 text-secondary-900 placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b sticky top-20 z-30">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 -mb-2">
            <Link
              href="/ratgeber"
              className="px-4 py-2 rounded-full bg-primary-500 text-white font-medium whitespace-nowrap"
            >
              Alle Artikel
            </Link>
            {categories.map(cat => (
              <Link
                key={cat.name}
                href={`/ratgeber?kategorie=${encodeURIComponent(cat.name)}`}
                className="px-4 py-2 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap hover:bg-secondary-200 transition-colors"
              >
                {cat.name} ({cat.count})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPosts.length > 0 && (
        <section className="py-12">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-primary-500 mb-6" data-aos="fade-up">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">Aktueller Artikel</span>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
                <BlogCard post={featuredPosts[0]} featured />
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="section-title mb-8" data-aos="fade-up">Alle Artikel</h2>

          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <div key={post.slug} data-aos="fade-up" data-aos-delay={index * 100}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl">
              <BookOpen className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                Noch keine Artikel vorhanden
              </h3>
              <p className="text-secondary-500">
                Bald finden Sie hier informative Artikel rund um Immobilien.
              </p>
            </div>
          )}

          {allPosts.length > 6 && (
            <div className="text-center mt-12">
              <button className="btn-secondary">
                Weitere Artikel laden
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary-500">
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
    </div>
  )
}
