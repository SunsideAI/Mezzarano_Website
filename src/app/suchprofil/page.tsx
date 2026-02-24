'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Home,
  Building2,
  TreePine,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  MapPin,
  Euro,
  BedDouble,
  Square,
  Phone,
  Mail,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
type Art = 'kaufen' | 'mieten' | ''
type Typ = 'haus' | 'wohnung' | 'grundstueck' | 'gewerbe' | ''

interface Step1 {
  art: Art
  typ: Typ
}

interface Step2 {
  regionen: string[]
  ortFreitext: string
  zimmer: string
  wohnflaecheMin: number
  wohnflaecheMax: number
  grundstueckMin: number
  grundstueckMax: number
  nutzflaecheMin: number
  nutzflaecheMax: number
  budgetMax: number
}

interface Step3 {
  features: string[]
  anmerkungen: string
}

interface Step4 {
  vorname: string
  nachname: string
  email: string
  telefon: string
  datenschutz: boolean
}

// ─── Constants ────────────────────────────────────────────────────────────────
const REGIONEN = [
  'Hermeskeil', 'Trier', 'Schweich', 'Konz', 'Saarburg',
  'Bernkastel-Kues', 'Wittlich', 'Bitburg', 'Hochwald', 'Andere Region',
]

const FEATURES_BY_TYP: Record<string, string[]> = {
  haus: ['Balkon / Terrasse', 'Garten', 'Garage / Stellplatz', 'Einbauküche', 'Keller', 'Barrierefrei', 'Smart Home', 'Fußbodenheizung', 'Sauna', 'Pool'],
  wohnung: ['Balkon / Terrasse', 'Aufzug', 'Einbauküche', 'Keller', 'Barrierefrei', 'Tiefgarage', 'Haustiere erlaubt', 'Fußbodenheizung', 'Hausmeisterservice'],
  grundstueck: ['Erschlossen', 'Bebaubar', 'Eckgrundstück', 'Hanggrundstück', 'Weitläufig', 'Waldgrundstück', 'Seegrundstück'],
  gewerbe: ['Parkplätze vorhanden', 'Lastenaufzug', 'Lagerraum', 'Bürofläche', 'Showroom', 'Gastronomie geeignet', 'Außenfläche', 'Bahnhofsnähe'],
}

const ZIMMER_OPTIONS = ['egal', '1', '2', '3', '4', '5+']

const TYP_CONFIG: Record<string, { label: string; icon: React.FC<{ className?: string }>; beschreibung: string }> = {
  haus:        { label: 'Haus',        icon: Home,      beschreibung: 'Ein- oder Mehrfamilienhaus, Villa, Bungalow' },
  wohnung:     { label: 'Wohnung',     icon: Building2, beschreibung: 'Eigentumswohnung, Maisonette, Dachgeschoss' },
  grundstueck: { label: 'Grundstück',  icon: TreePine,  beschreibung: 'Bauland, Gartengrundstück, Ackerland' },
  gewerbe:     { label: 'Gewerbe',     icon: Briefcase, beschreibung: 'Büro, Laden, Halle, Praxis' },
}

// ─── Sando portrait ───────────────────────────────────────────────────────────
function SandroSidebar() {
  return (
    <aside className="hidden lg:flex flex-col items-center bg-wuestennacht text-white rounded-fenster p-8 sticky top-28 self-start">
      <div className="w-32 h-32 rounded-muenze overflow-hidden mb-4 ring-4 ring-wuestenrot/40">
        <Image
          src="https://res.cloudinary.com/djqviyb2c/image/upload/w_300,q_80/v1770806323/Lebenskunst-Photography_-078_-_Sandro_-_11.09.2025_-_Business_fotografie-_Trier-13__2_r18b6c.jpg"
          alt="Sandro Mezzarano"
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="font-bold text-lg text-center leading-tight mb-1">Sandro Mezzarano</p>
      <p className="text-wuestenrot text-sm font-semibold mb-4 text-center">Wüstenrot Immobilienberater</p>
      <p className="text-gray-400 text-sm text-center leading-relaxed mb-6">
        Ich finde für Sie die passende Immobilie – persönlich und mit über 16 Jahren Erfahrung in der Region.
      </p>
      <div className="space-y-3 w-full text-sm">
        <a href="tel:01776542977" className="flex items-center gap-2 text-gray-300 hover:text-wuestenrot transition-colors">
          <Phone className="h-4 w-4 text-wuestenrot flex-shrink-0" />
          0177 6542977
        </a>
        <a href="mailto:sandro.mezzarano@wuestenrot.de" className="flex items-center gap-2 text-gray-300 hover:text-wuestenrot transition-colors break-all">
          <Mail className="h-4 w-4 text-wuestenrot flex-shrink-0" />
          sandro.mezzarano@wuestenrot.de
        </a>
        <div className="flex items-start gap-2 text-gray-300">
          <MapPin className="h-4 w-4 text-wuestenrot flex-shrink-0 mt-0.5" />
          Saarstraße 1, 54411 Hermeskeil
        </div>
      </div>
    </aside>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  const labels = ['Immobilientyp', 'Kriterien', 'Ausstattung', 'Kontakt']
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        {labels.map((label, idx) => {
          const num = idx + 1
          const active = num === step
          const done = num < step
          return (
            <div key={label} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-muenze flex items-center justify-center text-sm font-bold mb-1 transition-all ${
                done ? 'bg-wuestenrot text-white' :
                active ? 'bg-wuestenrot text-white ring-4 ring-wuestenrot/20' :
                'bg-warmgrau text-wuestennacht-light'
              }`}>
                {done ? <Check className="h-4 w-4" /> : num}
              </div>
              <span className={`text-xs hidden sm:block ${active ? 'text-wuestenrot font-semibold' : 'text-wuestennacht-light'}`}>
                {label}
              </span>
              {idx < total - 1 && (
                <div className={`absolute hidden`} /> // spacing handled by flex
              )}
            </div>
          )
        })}
      </div>
      <div className="relative h-2 bg-warmgrau rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-wuestenrot rounded-full transition-all duration-500"
          style={{ width: `${((step - 1) / (total - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}

// ─── Slider component ─────────────────────────────────────────────────────────
function RangeSlider({
  label,
  unit,
  min,
  max,
  step,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
}: {
  label: string
  unit: string
  min: number
  max: number
  step: number
  valueMin: number
  valueMax: number
  onChangeMin: (v: number) => void
  onChangeMax: (v: number) => void
}) {
  const fmt = (v: number) => v >= max ? `${max.toLocaleString('de-DE')}+` : v.toLocaleString('de-DE')
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="form-label mb-0">{label}</label>
        <span className="text-sm font-semibold text-wuestenrot">
          {fmt(valueMin)} – {fmt(valueMax)} {unit}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-xs text-wuestennacht-light w-8">Min</span>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={valueMin}
            onChange={e => {
              const v = parseInt(e.target.value)
              onChangeMin(Math.min(v, valueMax - step))
            }}
            className="flex-1 accent-wuestenrot"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-wuestennacht-light w-8">Max</span>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={valueMax}
            onChange={e => {
              const v = parseInt(e.target.value)
              onChangeMax(Math.max(v, valueMin + step))
            }}
            className="flex-1 accent-wuestenrot"
          />
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function SuchprofilPage() {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [s1, setS1] = useState<Step1>({ art: '', typ: '' })
  const [s2, setS2] = useState<Step2>({
    regionen: [],
    ortFreitext: '',
    zimmer: 'egal',
    wohnflaecheMin: 0,
    wohnflaecheMax: 300,
    grundstueckMin: 0,
    grundstueckMax: 2000,
    nutzflaecheMin: 0,
    nutzflaecheMax: 500,
    budgetMax: 500000,
  })
  const [s3, setS3] = useState<Step3>({ features: [], anmerkungen: '' })
  const [s4, setS4] = useState<Step4>({ vorname: '', nachname: '', email: '', telefon: '', datenschutz: false })

  const canGoNext1 = s1.art !== '' && s1.typ !== ''
  const canGoNext2 = s2.regionen.length > 0 || s2.ortFreitext.trim() !== ''
  const canSubmit = s4.vorname && s4.nachname && s4.email && s4.datenschutz

  const toggleFeature = (f: string) => {
    setS3(prev => ({
      ...prev,
      features: prev.features.includes(f)
        ? prev.features.filter(x => x !== f)
        : [...prev.features, f],
    }))
  }

  const toggleRegion = (r: string) => {
    setS2(prev => ({
      ...prev,
      regionen: prev.regionen.includes(r)
        ? prev.regionen.filter(x => x !== r)
        : [...prev.regionen, r],
    }))
  }

  const handleSubmit = async () => {
    if (!canSubmit) return
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const typ = s1.typ

  // ── Step 1 ──────────────────────────────────────────────────────────────────
  const renderStep1 = () => (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-wuestennacht mb-2">
        Wir finden gemeinsam die passende Immobilie für Sie
      </h2>
      <p className="text-wuestennacht-light mb-8">
        Sagen Sie mir, was Sie suchen – ich melde mich persönlich bei Ihnen.
      </p>

      {/* Kaufen / Mieten */}
      <div className="mb-8">
        <p className="form-label mb-3">Was möchten Sie?</p>
        <div className="flex gap-3">
          {(['kaufen', 'mieten'] as const).map(art => (
            <button
              key={art}
              onClick={() => setS1(p => ({ ...p, art }))}
              className={`flex-1 py-3 px-6 rounded-button font-bold text-sm transition-all capitalize ${
                s1.art === art
                  ? 'bg-wuestenrot text-white shadow-wuestenrot/20 shadow-lg'
                  : 'bg-warmgrau text-wuestennacht hover:bg-wuestenrot/10 hover:text-wuestenrot'
              }`}
            >
              {art === 'kaufen' ? 'Kaufen' : 'Mieten'}
            </button>
          ))}
        </div>
      </div>

      {/* Immobilientyp */}
      <div className="mb-8">
        <p className="form-label mb-3">Welche Art von Immobilie suchen Sie?</p>
        <div className="grid grid-cols-2 gap-4">
          {(Object.entries(TYP_CONFIG) as [Typ, typeof TYP_CONFIG[string]][]).map(([key, conf]) => {
            const Icon = conf.icon
            const selected = s1.typ === key
            return (
              <button
                key={key}
                onClick={() => setS1(p => ({ ...p, typ: key }))}
                className={`relative flex flex-col items-center gap-3 p-5 rounded-fenster border-2 transition-all group text-center ${
                  selected
                    ? 'border-wuestenrot bg-wuestenrot/5 shadow-lg shadow-wuestenrot/10'
                    : 'border-warmgrau bg-white hover:border-wuestenrot/40 hover:bg-wuestenrot/5'
                }`}
              >
                {selected && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-muenze bg-wuestenrot flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                )}
                <div className={`w-12 h-12 rounded-muenze flex items-center justify-center transition-colors ${
                  selected ? 'bg-wuestenrot' : 'bg-warmgrau group-hover:bg-wuestenrot/10'
                }`}>
                  <Icon className={`h-6 w-6 ${selected ? 'text-white' : 'text-wuestennacht group-hover:text-wuestenrot'}`} />
                </div>
                <div>
                  <p className={`font-bold ${selected ? 'text-wuestenrot' : 'text-wuestennacht'}`}>{conf.label}</p>
                  <p className="text-xs text-wuestennacht-light mt-0.5">{conf.beschreibung}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  // ── Step 2 ──────────────────────────────────────────────────────────────────
  const renderStep2 = () => (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-wuestennacht mb-2">
        Größe, Lage und Preis
      </h2>
      <p className="text-wuestennacht-light mb-8">
        Geben Sie Ihre Wunschkriterien an – alle Angaben sind optional.
      </p>

      {/* Region */}
      <div className="mb-6">
        <label className="form-label">Gewünschte Region / Ort</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {REGIONEN.map(r => (
            <button
              key={r}
              onClick={() => toggleRegion(r)}
              className={`px-3 py-1.5 rounded-button text-sm font-medium transition-all ${
                s2.regionen.includes(r)
                  ? 'bg-wuestenrot text-white'
                  : 'bg-warmgrau text-wuestennacht hover:bg-wuestenrot/10 hover:text-wuestenrot'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Oder geben Sie einen Ort / eine PLZ ein..."
          value={s2.ortFreitext}
          onChange={e => setS2(p => ({ ...p, ortFreitext: e.target.value }))}
          className="form-input"
        />
      </div>

      {/* Zimmer – Haus und Wohnung only */}
      {(typ === 'haus' || typ === 'wohnung') && (
        <div className="mb-6">
          <label className="form-label">Mindestanzahl Zimmer</label>
          <div className="flex gap-2 flex-wrap">
            {ZIMMER_OPTIONS.map(z => (
              <button
                key={z}
                onClick={() => setS2(p => ({ ...p, zimmer: z }))}
                className={`w-14 h-10 rounded-button text-sm font-bold transition-all ${
                  s2.zimmer === z
                    ? 'bg-wuestenrot text-white'
                    : 'bg-warmgrau text-wuestennacht hover:bg-wuestenrot/10 hover:text-wuestenrot'
                }`}
              >
                {z === 'egal' ? 'egal' : `${z} Zi.`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Wohnfläche – Haus und Wohnung */}
      {(typ === 'haus' || typ === 'wohnung') && (
        <div className="mb-6">
          <RangeSlider
            label="Wohnfläche"
            unit="m²"
            min={0}
            max={300}
            step={10}
            valueMin={s2.wohnflaecheMin}
            valueMax={s2.wohnflaecheMax}
            onChangeMin={v => setS2(p => ({ ...p, wohnflaecheMin: v }))}
            onChangeMax={v => setS2(p => ({ ...p, wohnflaecheMax: v }))}
          />
        </div>
      )}

      {/* Grundstücksfläche – Haus und Grundstück */}
      {(typ === 'haus' || typ === 'grundstueck') && (
        <div className="mb-6">
          <RangeSlider
            label="Grundstücksfläche"
            unit="m²"
            min={0}
            max={2000}
            step={50}
            valueMin={s2.grundstueckMin}
            valueMax={s2.grundstueckMax}
            onChangeMin={v => setS2(p => ({ ...p, grundstueckMin: v }))}
            onChangeMax={v => setS2(p => ({ ...p, grundstueckMax: v }))}
          />
        </div>
      )}

      {/* Nutzfläche – Gewerbe */}
      {typ === 'gewerbe' && (
        <div className="mb-6">
          <RangeSlider
            label="Nutzfläche"
            unit="m²"
            min={0}
            max={500}
            step={20}
            valueMin={s2.nutzflaecheMin}
            valueMax={s2.nutzflaecheMax}
            onChangeMin={v => setS2(p => ({ ...p, nutzflaecheMin: v }))}
            onChangeMax={v => setS2(p => ({ ...p, nutzflaecheMax: v }))}
          />
        </div>
      )}

      {/* Budget */}
      <div className="mb-6">
        <label className="form-label">
          Maximales Budget
          <span className="ml-2 font-bold text-wuestenrot">
            {s2.budgetMax >= 2000000
              ? 'ab 2 Mio. €'
              : `bis ${s2.budgetMax.toLocaleString('de-DE')} €`}
          </span>
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setS2(p => ({ ...p, budgetMax: Math.max(100000, p.budgetMax - 50000) }))}
            className="w-10 h-10 rounded-muenze bg-warmgrau hover:bg-wuestenrot hover:text-white transition-colors font-bold text-lg flex items-center justify-center"
          >
            −
          </button>
          <input
            type="range"
            min={100000}
            max={2000000}
            step={50000}
            value={s2.budgetMax}
            onChange={e => setS2(p => ({ ...p, budgetMax: parseInt(e.target.value) }))}
            className="flex-1 accent-wuestenrot"
          />
          <button
            onClick={() => setS2(p => ({ ...p, budgetMax: Math.min(2000000, p.budgetMax + 50000) }))}
            className="w-10 h-10 rounded-muenze bg-warmgrau hover:bg-wuestenrot hover:text-white transition-colors font-bold text-lg flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )

  // ── Step 3 ──────────────────────────────────────────────────────────────────
  const renderStep3 = () => {
    const features = FEATURES_BY_TYP[typ || 'haus'] ?? []
    return (
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-wuestennacht mb-2">
          Ausstattung & Wünsche
        </h2>
        <p className="text-wuestennacht-light mb-8">
          Wählen Sie gewünschte Ausstattungsmerkmale aus – mehrere sind möglich.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {features.map(f => {
            const selected = s3.features.includes(f)
            return (
              <button
                key={f}
                onClick={() => toggleFeature(f)}
                className={`flex items-center gap-2 px-4 py-2 rounded-button text-sm font-medium transition-all ${
                  selected
                    ? 'bg-wuestenrot text-white shadow-sm'
                    : 'bg-warmgrau text-wuestennacht hover:bg-wuestenrot/10 hover:text-wuestenrot'
                }`}
              >
                {selected && <Check className="h-3.5 w-3.5" />}
                {f}
              </button>
            )
          })}
        </div>

        <div>
          <label className="form-label">Weitere Wünsche oder Anmerkungen</label>
          <textarea
            rows={4}
            placeholder="z.B. ruhige Lage, südlicher Garten, gute Schulanbindung..."
            value={s3.anmerkungen}
            onChange={e => setS3(p => ({ ...p, anmerkungen: e.target.value }))}
            className="form-textarea"
          />
        </div>
      </div>
    )
  }

  // ── Step 4 ──────────────────────────────────────────────────────────────────
  const renderStep4 = () => (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-wuestennacht mb-2">
        Ihre Kontaktdaten
      </h2>
      <p className="text-wuestennacht-light mb-8">
        Ich melde mich persönlich bei Ihnen, sobald ein passendes Objekt verfügbar ist.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Vorname *</label>
          <input
            type="text"
            placeholder="Ihr Vorname"
            value={s4.vorname}
            onChange={e => setS4(p => ({ ...p, vorname: e.target.value }))}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Nachname *</label>
          <input
            type="text"
            placeholder="Ihr Nachname"
            value={s4.nachname}
            onChange={e => setS4(p => ({ ...p, nachname: e.target.value }))}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">E-Mail-Adresse *</label>
          <input
            type="email"
            placeholder="ihre@email.de"
            value={s4.email}
            onChange={e => setS4(p => ({ ...p, email: e.target.value }))}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Telefonnummer</label>
          <input
            type="tel"
            placeholder="+49 177 …"
            value={s4.telefon}
            onChange={e => setS4(p => ({ ...p, telefon: e.target.value }))}
            className="form-input"
          />
        </div>
      </div>

      {/* Summary box */}
      <div className="mt-6 p-5 bg-warmgrau rounded-fenster text-sm space-y-1.5">
        <p className="font-bold text-wuestennacht mb-2">Ihr Suchprofil auf einen Blick:</p>
        <p className="text-wuestennacht-light">
          <span className="font-semibold text-wuestennacht">Art:</span>{' '}
          {s1.art === 'kaufen' ? 'Kaufen' : 'Mieten'} · {TYP_CONFIG[s1.typ || 'haus']?.label}
        </p>
        {s2.regionen.length > 0 && (
          <p className="text-wuestennacht-light">
            <span className="font-semibold text-wuestennacht">Regionen:</span> {s2.regionen.join(', ')}
            {s2.ortFreitext ? ` + ${s2.ortFreitext}` : ''}
          </p>
        )}
        {(typ === 'haus' || typ === 'wohnung') && s2.zimmer !== 'egal' && (
          <p className="text-wuestennacht-light">
            <span className="font-semibold text-wuestennacht">Zimmer:</span> ab {s2.zimmer}
          </p>
        )}
        <p className="text-wuestennacht-light">
          <span className="font-semibold text-wuestennacht">Budget:</span>{' '}
          {s2.budgetMax >= 2000000 ? 'ab 2 Mio. €' : `bis ${s2.budgetMax.toLocaleString('de-DE')} €`}
        </p>
        {s3.features.length > 0 && (
          <p className="text-wuestennacht-light">
            <span className="font-semibold text-wuestennacht">Ausstattung:</span> {s3.features.join(', ')}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          type="checkbox"
          id="datenschutz"
          checked={s4.datenschutz}
          onChange={e => setS4(p => ({ ...p, datenschutz: e.target.checked }))}
          className="mt-1 accent-wuestenrot"
        />
        <label htmlFor="datenschutz" className="text-sm text-wuestennacht-light">
          Ich habe die{' '}
          <Link href="/datenschutz" className="text-wuestenrot hover:underline" target="_blank">
            Datenschutzerklärung
          </Link>{' '}
          gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meines Suchprofils zu. *
        </label>
      </div>
    </div>
  )

  // ── Success screen ────────────────────────────────────────────────────────────
  const renderSuccess = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 rounded-muenze bg-wuestenwald/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-wuestenwald" />
      </div>
      <h2 className="text-2xl font-bold text-wuestennacht mb-3">
        Ihr Suchprofil wurde angelegt!
      </h2>
      <p className="text-wuestennacht-light mb-2 max-w-md mx-auto">
        Vielen Dank, <strong>{s4.vorname}</strong>. Ich melde mich persönlich bei Ihnen, sobald eine passende Immobilie verfügbar ist.
      </p>
      <p className="text-wuestennacht-light text-sm mb-8 max-w-md mx-auto">
        Sie erhalten in Kürze eine Bestätigungs-E-Mail an <strong>{s4.email}</strong>.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/immobilien" className="btn-primary">
          Aktuelle Immobilien ansehen
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/" className="btn-secondary">
          Zur Startseite
        </Link>
      </div>
    </div>
  )

  // ── Layout ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-warmgrau">
      {/* Hero */}
      <section className="bg-wuestennacht py-16">
        <div className="container-custom">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <span className="mx-2">/</span>
            <Link href="/immobilien" className="hover:text-white transition-colors">Immobilien</Link>
            <span className="mx-2">/</span>
            <span className="text-wuestenrot">Suchprofil</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Suchprofil anlegen
          </h1>
          <p className="text-gray-400 mt-2">
            In 4 Schritten zur persönlichen Immobiliensuche
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-[1fr_300px] gap-8 items-start">
            {/* Form card */}
            <div className="bg-white rounded-fenster shadow-lg p-8 md:p-10">
              {isSubmitted ? (
                renderSuccess()
              ) : (
                <>
                  <ProgressBar step={step} total={4} />

                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                  {step === 4 && renderStep4()}

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-warmgrau">
                    {step > 1 ? (
                      <button
                        onClick={() => setStep(s => s - 1)}
                        className="btn-secondary"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Zurück
                      </button>
                    ) : (
                      <Link href="/immobilien" className="text-wuestennacht-light hover:text-wuestennacht text-sm flex items-center gap-1 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Alle Immobilien
                      </Link>
                    )}

                    {step < 4 ? (
                      <button
                        onClick={() => setStep(s => s + 1)}
                        disabled={step === 1 ? !canGoNext1 : step === 2 ? !canGoNext2 : false}
                        className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Weiter
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={!canSubmit || isSubmitting}
                        className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed min-w-[180px]"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Wird gespeichert…
                          </span>
                        ) : (
                          <>
                            Suchprofil anlegen
                            <Check className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Step hint */}
                  {step === 1 && !canGoNext1 && (
                    <p className="text-xs text-center text-wuestennacht-light mt-3">
                      Bitte wählen Sie Kaufen/Mieten und einen Immobilientyp, um fortzufahren.
                    </p>
                  )}
                  {step === 2 && !canGoNext2 && (
                    <p className="text-xs text-center text-wuestennacht-light mt-3">
                      Bitte wählen Sie mindestens eine Region oder geben Sie einen Ort ein.
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <SandroSidebar />
          </div>
        </div>
      </section>
    </div>
  )
}
