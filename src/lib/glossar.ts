import data from '@/data/immobilien-abc.json'

export interface GlossarTerm {
  begriff: string
  untertitel?: string
  definition: string
  slug: string
}

export function slugifyTerm(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

interface RawTerm {
  begriff: string
  untertitel?: string
  definition: string
}

export const GLOSSAR: GlossarTerm[] = (data.terms as RawTerm[])
  .map((t) => ({
    begriff: t.begriff,
    untertitel: t.untertitel,
    definition: t.definition,
    slug: slugifyTerm(t.begriff),
  }))
  .sort((a, b) => a.begriff.localeCompare(b.begriff, 'de'))

export const termBySlug = (slug: string) => GLOSSAR.find((t) => t.slug === slug)

const letterOf = (begriff: string) => begriff[0].toUpperCase()

export const LETTERS = [...new Set(GLOSSAR.map((t) => letterOf(t.begriff)))].sort((a, b) =>
  a.localeCompare(b, 'de'),
)

export function gruppiertNachBuchstabe(): { letter: string; terms: GlossarTerm[] }[] {
  return LETTERS.map((letter) => ({
    letter,
    terms: GLOSSAR.filter((t) => letterOf(t.begriff) === letter),
  }))
}

export function nachbarn(slug: string, count = 8): GlossarTerm[] {
  const i = GLOSSAR.findIndex((t) => t.slug === slug)
  if (i === -1) return []
  const start = Math.max(0, i - Math.floor(count / 2))
  return GLOSSAR.slice(start, start + count + 1).filter((t) => t.slug !== slug)
}
