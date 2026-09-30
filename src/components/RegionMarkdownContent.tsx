import { marked } from 'marked'
import { getRegionContent } from '@/lib/regionen'

interface Props {
  slug: string
}

/**
 * Renders the long-form regional SEO content from src/content/regionen/<slug>.md
 * into a well-typeset section. Returns null if the slug has no markdown file,
 * so existing region pages can drop this in safely.
 */
export default function RegionMarkdownContent({ slug }: Props) {
  const region = getRegionContent(slug)
  if (!region) return null

  const html = marked.parse(region.content, { async: false, gfm: true, breaks: false }) as string

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </section>
  )
}
