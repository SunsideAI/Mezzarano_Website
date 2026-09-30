import { marked } from 'marked'
import {
  MapPin, TrendingUp, Home, Users, Calculator, Award, Ruler,
  HelpingHand, FileText, Search, ScrollText, KeyRound, Building2,
} from 'lucide-react'
import {
  parseFirstTable,
  parseH3Groups,
  stripMdInlineForCell,
  splitKennzahlValue,
  parseSchrittHeading,
} from '@/lib/regionSectionParsers'

// ─── Section pattern matchers ───────────────────────────────────────────

export function isAufEinenBlick(h: string) { return /auf einen blick/i.test(h) }
export function isBodenrichtwerte(h: string) { return /^bodenrichtwerte\b/i.test(h) }
export function isStadtteile(h: string) {
  return /(stadtteile|orte)\s+(und\s+ortsgemeinden|.*im überblick)/i.test(h) || /ortsgemeinden.*überblick/i.test(h)
}
export function isAblaufMitMakler(h: string) {
  return /(verkaufen).*(ablauf|schritte)/i.test(h)
}
export function isWarumLokal(h: string) {
  return /^warum\s+ein\s+lokaler\s+immobilienmakler/i.test(h)
}

function renderMd(md: string): string {
  return marked.parse(md, { async: false, gfm: true, breaks: false }) as string
}

// ─── 1. "Auf einen Blick" — Kennzahl-Karten ────────────────────────────

export function AufEinenBlickRenderer({ heading, body }: { heading: string; body: string }) {
  const table = parseFirstTable(body)
  // Content before the table (intro paragraph)
  const introMd = table ? body.split(/^\|/m)[0].trim() : body.trim()
  // Content after the table
  const afterMd = table ? body.split(/(^\|.*\n?)+/m).slice(-1)[0]?.trim() || '' : ''

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-wuestennacht mb-4 text-center">{heading}</h2>
          {introMd && (
            <div
              className="prose-blog max-w-3xl mx-auto text-center mb-10"
              dangerouslySetInnerHTML={{ __html: renderMd(introMd) }}
            />
          )}

          {table && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {table.rows.map((row, idx) => {
                const kennzahl = stripMdInlineForCell(row[0] || '')
                const { primary, secondary } = splitKennzahlValue(row[1] || '')
                const quelle = stripMdInlineForCell(row[2] || '')
                return (
                  <div
                    key={idx}
                    className="bg-warmgrau rounded-fenster p-5 border-l-4 border-wuestenrot"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-wuestennacht-light mb-2">
                      {kennzahl}
                    </div>
                    <div className="text-xl font-bold text-wuestennacht leading-tight">
                      {primary}
                    </div>
                    {secondary && (
                      <div className="text-sm text-wuestennacht-light mt-1">{secondary}</div>
                    )}
                    {quelle && (
                      <div className="text-[11px] text-wuestennacht-light mt-3 opacity-70">{quelle}</div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {afterMd && afterMd !== introMd && (
            <div
              className="prose-blog max-w-3xl mx-auto mt-8"
              dangerouslySetInnerHTML={{ __html: renderMd(afterMd) }}
            />
          )}
        </div>
      </div>
    </section>
  )
}

// ─── 2. "Bodenrichtwerte" — Preis-Karten aus der ersten Tabelle ────────

export function BodenrichtwerteRenderer({ heading, body }: { heading: string; body: string }) {
  const table = parseFirstTable(body)
  const introMd = table ? body.split(/^\|/m)[0].trim() : body.trim()

  // Body after the extracted table (may contain more prose + a 2nd table)
  let afterMd = ''
  if (table) {
    // Find where the first table ends: last consecutive line starting with '|'
    const lines = body.split('\n')
    let tableEnd = -1
    let inTable = false
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('|')) {
        inTable = true
        tableEnd = i
      } else if (inTable && !lines[i].trim().startsWith('|')) {
        break
      }
    }
    if (tableEnd >= 0) afterMd = lines.slice(tableEnd + 1).join('\n').trim()
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-wuestenrot mb-3">
              <Ruler className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Bodenrichtwerte</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-wuestennacht">{heading}</h2>
          </div>
          {introMd && (
            <div
              className="prose-blog max-w-3xl mx-auto mb-10"
              dangerouslySetInnerHTML={{ __html: renderMd(introMd) }}
            />
          )}

          {table && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {table.rows.map((row, idx) => {
                const ort = stripMdInlineForCell(row[0] || '')
                const durchschnitt = stripMdInlineForCell(row[1] || '')
                const spanne = stripMdInlineForCell(row[2] || '')
                const stichtag = stripMdInlineForCell(row[3] || '')
                return (
                  <div key={idx} className="bg-white rounded-fenster p-6 shadow-md border-t-4 border-wuestenrot">
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-wuestenrot flex-shrink-0 mt-1" />
                      <div className="font-bold text-wuestennacht leading-tight">{ort}</div>
                    </div>
                    <div className="text-2xl font-bold text-wuestenrot">{durchschnitt}</div>
                    {spanne && spanne !== '–' && (
                      <div className="text-sm text-wuestennacht-light mt-1">Spanne: {spanne}</div>
                    )}
                    {stichtag && (
                      <div className="text-xs text-wuestennacht-light mt-3 opacity-70">Stichtag: {stichtag}</div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {afterMd && (
            <div
              className="prose-blog max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: renderMd(afterMd) }}
            />
          )}
        </div>
      </div>
    </section>
  )
}

// ─── 3. "Stadtteile / Ortsgemeinden" — Karten-Grid pro Ort ─────────────

export function StadtteileRenderer({ heading, body }: { heading: string; body: string }) {
  const { intro, groups } = parseH3Groups(body)

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-wuestenrot mb-3">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Stadtteile & Orte</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-wuestennacht">{heading}</h2>
          </div>

          {intro && (
            <div
              className="prose-blog max-w-3xl mx-auto mb-10"
              dangerouslySetInnerHTML={{ __html: renderMd(intro) }}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((g, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-fenster p-6 hover:bg-warmgrau transition-colors border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-wuestenrot flex-shrink-0" />
                  <h3 className="text-xl font-bold text-wuestennacht">{g.title}</h3>
                </div>
                <div
                  className="prose-blog prose-sm"
                  dangerouslySetInnerHTML={{ __html: renderMd(g.body) }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 4. "Ablauf mit Makler" — Numerierte Timeline ──────────────────────

export function AblaufRenderer({ heading, body }: { heading: string; body: string }) {
  const { intro, groups } = parseH3Groups(body)

  // Map groups to steps; fall back to sequential numbering if not "Schritt N:" format
  const steps = groups.map((g, idx) => {
    const parsed = parseSchrittHeading(g.title)
    return {
      num: parsed?.num ?? idx + 1,
      title: parsed?.title ?? g.title,
      body: g.body,
    }
  })

  return (
    <section className="py-12 md:py-16 bg-wuestennacht text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-wuestenrot mb-3">
              <HelpingHand className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Ablauf mit Makler</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
          </div>

          {intro && (
            <div
              className="prose-blog prose-on-dark max-w-3xl mx-auto mb-12"
              dangerouslySetInnerHTML={{ __html: renderMd(intro) }}
            />
          )}

          <ol className="space-y-6">
            {steps.map((s) => (
              <li key={s.num} className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-wuestenrot text-white font-bold text-lg md:text-xl flex items-center justify-center">
                    {s.num}
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{s.title}</h3>
                  <div
                    className="prose-blog prose-on-dark [&_p]:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: renderMd(s.body) }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

// ─── 5. "Warum lokaler Makler" — Icon-Grid mit Vorteilen ────────────────

// Simple icon mapping by keyword in H3 titles
function iconForVorteil(title: string) {
  const t = title.toLowerCase()
  if (/jahr|erfahrung/i.test(t)) return Award
  if (/erreich|vor ort|büro|buero/i.test(t)) return MapPin
  if (/netzwerk|handwerk|partner/i.test(t)) return Users
  if (/wüstenrot|marke/i.test(t)) return TrendingUp
  if (/finanzier/i.test(t)) return Calculator
  if (/beratung|persönlich|persoenlich/i.test(t)) return HelpingHand
  if (/wissen|markt|region/i.test(t)) return Home
  if (/dokument|unterlagen|notar/i.test(t)) return FileText
  if (/such/i.test(t)) return Search
  if (/vertrag/i.test(t)) return ScrollText
  if (/schlüssel|schluessel|übergabe|uebergabe/i.test(t)) return KeyRound
  return Award
}

export function WarumLokalRenderer({ heading, body }: { heading: string; body: string }) {
  const { intro, groups } = parseH3Groups(body)

  return (
    <section className="py-12 md:py-16 bg-warmgrau">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-wuestenrot mb-3">
              <Award className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Ihre Vorteile</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-wuestennacht">{heading}</h2>
          </div>

          {intro && (
            <div
              className="prose-blog max-w-3xl mx-auto mb-10"
              dangerouslySetInnerHTML={{ __html: renderMd(intro) }}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((g, i) => {
              const Icon = iconForVorteil(g.title)
              return (
                <div key={i} className="bg-white rounded-fenster p-6 shadow-md">
                  <div className="w-12 h-12 bg-wuestenrot/10 rounded-fenster flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-wuestenrot" />
                  </div>
                  <h3 className="text-lg font-bold text-wuestennacht mb-3">{g.title}</h3>
                  <div
                    className="prose-blog prose-sm text-wuestennacht-light"
                    dangerouslySetInnerHTML={{ __html: renderMd(g.body) }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
