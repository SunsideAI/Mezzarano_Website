import { getAllPosts, getAllCategories, getFeaturedPosts } from '@/lib/blog'
import RatgeberContent from '@/components/RatgeberContent'

export const metadata = {
  title: 'Ratgeber | Mezzarano Immobilien - Tipps & Wissen',
  description: 'Ihr Immobilien-Ratgeber für Hermeskeil, Trier, Mosel und Hochwald. Expertenwissen zu Kauf, Verkauf, Finanzierung und aktuellen Markttrends.',
  keywords: 'Immobilien Ratgeber, Hermeskeil, Trier, Mosel, Hochwald, Tipps, Finanzierung, Immobilienverkauf, Immobilienkauf'
}

export default function RatgeberPage() {
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const featuredPosts = getFeaturedPosts(1)
  const featuredPost = featuredPosts.length > 0 ? featuredPosts[0] : null

  return (
    <div className="min-h-screen bg-warmgrau">
      <RatgeberContent
        allPosts={allPosts}
        categories={categories}
        featuredPost={featuredPost}
      />
    </div>
  )
}
