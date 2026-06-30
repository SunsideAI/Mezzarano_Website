import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/blog'
import { fetchEstates, isOnOfficeConfigured } from '@/lib/onoffice'
import { fetchProperties as fetchAirtableProperties } from '@/lib/airtable'
import { properties as staticProperties } from '@/data/properties'

const siteUrl = 'https://mezzarano-wuestenrot-immobilien.de'

export const revalidate = 3600

async function getPropertyExposeIds(): Promise<string[]> {
  if (isOnOfficeConfigured()) {
    try {
      const { properties } = await fetchEstates(undefined, { limit: 500 })
      const ids = properties.map(p => p.expose_id).filter(Boolean)
      if (ids.length > 0) return ids
    } catch (err) {
      console.warn('Sitemap: onOffice fetch failed, falling back to Airtable', err)
    }
  }

  try {
    const airtable = await fetchAirtableProperties({ show_all: true })
    const ids = airtable.map(p => p.expose_id).filter(Boolean)
    if (ids.length > 0) return ids
  } catch (err) {
    console.warn('Sitemap: Airtable fetch failed, falling back to static properties', err)
  }

  return staticProperties.map(p => `DEMO-${p.id}`)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = getAllSlugs()
  const exposeIds = await getPropertyExposeIds()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/immobilien`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ueber-uns`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ratgeber`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Region pages
    {
      url: `${siteUrl}/regionen/hermeskeil`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/regionen/trier`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/regionen/schweich`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/regionen/bernkastel-kues`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/regionen/saarburg`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/regionen/konz`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/regionen/bitburg`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/regionen/wittlich`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/regionen/hochwald`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Service pages
    {
      url: `${siteUrl}/kaufen`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/verkaufen`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/bewerten`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/finanzierung`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/energieberatung`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/energieberatung/energieausweis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/suchprofil`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/erklaervideos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Legal pages
    {
      url: `${siteUrl}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Blog posts
  const blogPosts: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/ratgeber/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Property detail pages (uses expose_id, not numeric id)
  const propertyPages: MetadataRoute.Sitemap = exposeIds.map((exposeId) => ({
    url: `${siteUrl}/immobilie/${encodeURIComponent(exposeId)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...blogPosts, ...propertyPages]
}
