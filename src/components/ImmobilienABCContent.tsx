'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Search, BookOpen } from 'lucide-react'
import type { GlossarTerm } from '@/lib/glossar'

interface Props {
  letters: string[]
  groups: { letter: string; terms: GlossarTerm[] }[]
  totalTerms: number
}

export default function ImmobilienABCContent({ letters, groups, totalTerms }: Props) {
  const [activeLetter, setActiveLetter] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const m = window.location.hash.match(/^#buchstabe-(.+)$/)
    if (m) setActiveLetter(decodeURIComponent(m[1]))
  }, [])

  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase()
    return groups
      .filter((g) => activeLetter === '' || g.letter === activeLetter)
      .map((g) => ({
        letter: g.letter,
        terms: q
          ? g.terms.filter(
              (t) =>
                t.begriff.toLowerCase().includes(q) ||
                t.untertitel?.toLowerCase().includes(q),
            )
          : g.terms,
      }))
      .filter((g) => g.terms.length > 0)
  }, [groups, activeLetter, search])

  const visibleCount = filteredGroups.reduce((sum, g) => sum + g.terms.length, 0)

  const handleLetter = (letter: string) => {
    setActiveLetter(letter)
    setSearch('')
    const hash = letter ? `#buchstabe-${letter}` : ''
    window.history.replaceState(null, '', window.location.pathname + hash)
  }

  return (
    <>
      {/* Filter bar - sticky */}
      <nav
        className="sticky top-20 md:top-[7.5rem] z-30 bg-white border-b border-gray-200 shadow-sm"
        aria-label="Alphabet-Filter"
      >
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleLetter('')}
              className={`min-w-[40px] h-10 px-3 text-sm font-bold transition-colors border ${
                activeLetter === ''
                  ? 'bg-wuestenrot text-white border-wuestenrot'
                  : 'bg-white text-wuestennacht border-gray-300 hover:border-wuestenrot hover:text-wuestenrot'
              }`}
            >
              Alle
            </button>
            {letters.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => handleLetter(letter)}
                className={`min-w-[40px] h-10 px-3 text-sm font-bold transition-colors border ${
                  activeLetter === letter
                    ? 'bg-wuestenrot text-white border-wuestenrot'
                    : 'bg-white text-wuestennacht border-gray-300 hover:border-wuestenrot hover:text-wuestenrot'
                }`}
              >
                {letter}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Begriff suchen…"
                  className="pl-10 pr-3 h-10 border border-gray-300 focus:border-wuestenrot focus:outline-none text-sm w-56"
                  aria-label="Begriff suchen"
                />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-wider text-wuestennacht-light"
                aria-live="polite"
              >
                {activeLetter || search
                  ? `${visibleCount} von ${totalTerms}`
                  : `${totalTerms} Begriffe`}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Terms grouped by letter */}
      <section className="container-custom py-12">
        {filteredGroups.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-wuestennacht-light">
              Keine Begriffe gefunden{search ? ` für „${search}"` : ''}.
            </p>
          </div>
        ) : (
          filteredGroups.map((g) => (
            <div
              key={g.letter}
              id={`buchstabe-${g.letter}`}
              className="mb-12 scroll-mt-[10rem] md:scroll-mt-[13rem]"
            >
              <h2 className="text-4xl font-bold text-wuestenrot border-b-2 border-gray-200 pb-3 mb-6">
                {g.letter}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 list-none p-0">
                {g.terms.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/immobilien-abc/${t.slug}`}
                      className="flex flex-col gap-1 p-4 border border-gray-200 bg-white hover:bg-warmgrau hover:border-wuestenrot transition-colors no-underline"
                    >
                      <span className="font-bold text-[15px] text-wuestennacht">
                        {t.begriff}
                      </span>
                      {t.untertitel && (
                        <span className="text-xs text-wuestennacht-light leading-relaxed">
                          {t.untertitel}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </>
  )
}
