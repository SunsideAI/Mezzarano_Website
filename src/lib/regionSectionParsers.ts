/**
 * Parsers for well-known region-page section shapes.
 * Given the markdown body of a section, extract structured data.
 */

export interface ParsedTable {
  headers: string[]
  rows: string[][]
}

export interface H3Group {
  title: string
  body: string
}

/**
 * Parse the first pipe-delimited markdown table in the given text.
 * Returns null if no valid table is found.
 */
export function parseFirstTable(md: string): ParsedTable | null {
  const lines = md.split('\n')
  for (let i = 0; i < lines.length - 1; i++) {
    const header = lines[i].trim()
    const sep = lines[i + 1]?.trim() || ''
    if (!header.startsWith('|') || !sep.startsWith('|')) continue
    if (!/^\|(\s*:?-{2,}:?\s*\|)+\s*$/.test(sep)) continue

    const cells = (row: string) =>
      row
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((c) => c.trim())

    const headers = cells(header)
    const rows: string[][] = []
    for (let j = i + 2; j < lines.length; j++) {
      const line = lines[j].trim()
      if (!line.startsWith('|')) break
      rows.push(cells(line))
    }
    return { headers, rows }
  }
  return null
}

/**
 * Extract H3 groups from a section body.
 * Everything before the first H3 becomes the "intro" (returned separately).
 */
export function parseH3Groups(md: string): { intro: string; groups: H3Group[] } {
  const lines = md.split('\n')
  let intro = ''
  const groups: H3Group[] = []
  let current: H3Group | null = null

  for (const line of lines) {
    const h3 = line.match(/^###\s+(.+?)\s*$/)
    if (h3) {
      if (current) groups.push(current)
      current = { title: h3[1], body: '' }
    } else if (current) {
      current.body += line + '\n'
    } else {
      intro += line + '\n'
    }
  }
  if (current) groups.push(current)
  return { intro: intro.trim(), groups: groups.map((g) => ({ ...g, body: g.body.trim() })) }
}

/**
 * Strip inline markdown link/citation syntax from a cell — keep only display text.
 * Handles [text](url), [[n]](url) → [n], and simple **bold** stripping.
 * Uses a two-step [[...]] then [...] replacement so we don't get double-bracketed output.
 */
export function stripMdInlineForCell(s: string): string {
  return s
    .replace(/\[\[([^\]]+)\]\]\([^)]+\)/g, '[$1]')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim()
}

/**
 * Try to split a Kennzahl value into a big number + a unit/qualifier.
 * "85 €/m²" → { primary: "85 €/m²", secondary: "" }
 * "1.765–2.198 €/m² je nach Portal" → { primary: "1.765–2.198 €/m²", secondary: "je nach Portal" }
 * "5,0 %" → { primary: "5,0 %", secondary: "" }  (decimal comma NOT a split point)
 * "6.501, 31.12.2025" → { primary: "6.501", secondary: "31.12.2025" }
 *
 * Rule: split on ",;—" only when followed by a WORD (letter) — not by a digit
 * (so we never break decimal numbers like "5,0"). Additionally split on " je …".
 */
export function splitKennzahlValue(v: string): { primary: string; secondary: string } {
  const clean = stripMdInlineForCell(v)
  // 1. " je …" qualifier (highest priority)
  const jeMatch = clean.match(/^(.+?)\s+(je\s+.+)$/)
  if (jeMatch) return { primary: jeMatch[1].trim(), secondary: jeMatch[2].trim() }
  // 2. Punctuation split only if next char is a letter (so we don't break "5,0 %")
  const punctMatch = clean.match(/^(.+?)(?:\s*[,;—]\s+)(?=[A-Za-zÄÖÜäöüß])(.+)$/)
  if (punctMatch) return { primary: punctMatch[1].trim(), secondary: punctMatch[2].trim() }
  return { primary: clean, secondary: '' }
}

/**
 * Extract step number from a heading like "Schritt 3: Unterlagen zusammenstellen".
 * Returns { num, title } if matched, else null.
 */
export function parseSchrittHeading(h: string): { num: number; title: string } | null {
  const m = h.match(/^Schritt\s+(\d+)\s*[:\-]\s*(.+)$/i)
  if (!m) return null
  return { num: parseInt(m[1], 10), title: m[2].trim() }
}
