'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Bell,
  Home,
  Building2,
  TreePine,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────────
type Art  = 'kaufen' | 'mieten' | ''
type Typ  = 'haus' | 'wohnung' | 'grundstueck' | 'gewerbe' | ''

interface Step1Data { art: Art; typ: Typ }
interface Step2Data {
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
interface Step3Data { features: string[]; anmerkungen: string }
interface Step4Data { vorname: string; nachname: string; email: string; telefon: string; datenschutz: boolean }

// ─── Data ──────────────────────────────────────────────────────────────────────
const REGIONEN = [
  'Hermeskeil', 'Trier', 'Schweich', 'Konz', 'Saarburg',
  'Bernkastel-Kues', 'Wittlich', 'Bitburg', 'Hochwald', 'Andere Region',
]

const FEATURES: Record<string, string[]> = {
  haus:        ['Balkon / Terrasse', 'Garten', 'Garage / Stellplatz', 'Einbauküche', 'Keller', 'Barrierefrei', 'Smart Home', 'Fußbodenheizung', 'Sauna', 'Pool'],
  wohnung:     ['Balkon / Terrasse', 'Aufzug', 'Einbauküche', 'Keller', 'Barrierefrei', 'Tiefgarage', 'Haustiere erlaubt', 'Fußbodenheizung', 'Hausmeisterservice'],
  grundstueck: ['Erschlossen', 'Bebaubar', 'Eckgrundstück', 'Hanggrundstück', 'Weitläufig', 'Waldgrundstück', 'Seegrundstück'],
  gewerbe:     ['Parkplätze', 'Lastenaufzug', 'Lagerraum', 'Bürofläche', 'Showroom', 'Gastronomie geeignet', 'Außenfläche'],
}

const TYP_OPTIONS: { key: Typ; label: string; sub: string; Icon: React.FC<{ className?: string }> }[] = [
  { key: 'haus',        label: 'Haus',       sub: 'Ein-/Mehrfamilienhaus, Villa, Bungalow',  Icon: Home },
  { key: 'wohnung',     label: 'Wohnung',    sub: 'Eigentumswohnung, Maisonette, Penthouse', Icon: Building2 },
  { key: 'grundstueck', label: 'Grundstück', sub: 'Bauland, Gartengrundstück, Ackerland',    Icon: TreePine },
  { key: 'gewerbe',     label: 'Gewerbe',    sub: 'Büro, Laden, Halle, Praxis',              Icon: Briefcase },
]

const ZIMMER = ['egal', '1', '2', '3', '4', '5+']
const STEP_LABELS = ['Immobilientyp', 'Kriterien', 'Ausstattung', 'Kontakt']

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtEur(v: number, max: number) {
  if (v >= max) return `ab 2 Mio. €`
  return v >= 1_000_000
    ? `${(v / 1_000_000).toLocaleString('de-DE', { maximumFractionDigits: 1 })} Mio. €`
    : `${v.toLocaleString('de-DE')} €`
}
function fmtM2(v: number, max: number) {
  return v >= max ? `${max.toLocaleString('de-DE')} m²+` : `${v.toLocaleString('de-DE')} m²`
}

// ─── Progress indicator ───────────────────────────────────────────────────────
function StepProgress({ step }: { step: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-start">
        {STEP_LABELS.map((label, idx) => {
          const n = idx + 1
          const done = n < step
          const active = n === step
          return (
            <div key={label} className="flex-1 flex flex-col items-center">
              <div className="flex items-center w-full">
                <div className={`flex-1 h-0.5 ${idx === 0 ? 'invisible' : done || active ? 'bg-primary-500' : 'bg-gray-200'}`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                  done   ? 'bg-primary-500 text-white' :
                  active ? 'bg-primary-500 text-white ring-4 ring-primary-100' :
                           'bg-gray-100 text-gray-400'
                }`}>
                  {done ? <Check className="h-4 w-4" /> : n}
                </div>
                <div className={`flex-1 h-0.5 ${idx === STEP_LABELS.length - 1 ? 'invisible' : done ? 'bg-primary-500' : 'bg-gray-200'}`} />
              </div>
              <span className={`mt-2 text-xs text-center hidden sm:block ${active ? 'text-primary-500 font-semibold' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Range slider ─────────────────────────────────────────────────────────────
function RangeSlider({ label, min, max, step, vMin, vMax, onMin, onMax, fmt }: {
  label: string; min: number; max: number; step: number
  vMin: number; vMax: number; onMin: (v: number) => void; onMax: (v: number) => void
  fmt: (v: number, max: number) => string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-bold text-primary-500">{fmt(vMin, max)} – {fmt(vMax, max)}</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 w-7">Min</span>
          <input type="range" min={min} max={max} step={step} value={vMin}
            onChange={e => onMin(Math.min(+e.target.value, vMax - step))}
            className="flex-1 accent-primary-500" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 w-7">Max</span>
          <input type="range" min={min} max={max} step={step} value={vMax}
            onChange={e => onMax(Math.max(+e.target.value, vMin + step))}
            className="flex-1 accent-primary-500" />
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function SuchprofilPage() {
  const [step,       setStep]       = useState(1)
  const [submitted,  setSubmitted]  = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [s1, setS1] = useState<Step1Data>({ art: '', typ: '' })
  const [s2, setS2] = useState<Step2Data>({
    regionen: [], ortFreitext: '',
    zimmer: 'egal',
    wohnflaecheMin: 0,  wohnflaecheMax: 250,
    grundstueckMin: 0,  grundstueckMax: 1500,
    nutzflaecheMin: 0,  nutzflaecheMax: 400,
    budgetMax: 500_000,
  })
  const [s3, setS3] = useState<Step3Data>({ features: [], anmerkungen: '' })
  const [s4, setS4] = useState<Step4Data>({ vorname: '', nachname: '', email: '', telefon: '', datenschutz: false })

  const typ = s1.typ || 'haus'
  const canNext1  = s1.art !== '' && s1.typ !== ''
  const canNext2  = s2.regionen.length > 0 || s2.ortFreitext.trim() !== ''
  const canSubmit = !!(s4.vorname && s4.nachname && s4.email && s4.datenschutz)

  const toggleRegion  = (r: string) => setS2(p => ({ ...p, regionen:  p.regionen.includes(r)  ? p.regionen.filter(x => x !== r)  : [...p.regionen,  r] }))
  const toggleFeature = (f: string) => setS3(p => ({ ...p, features:  p.features.includes(f)  ? p.features.filter(x => x !== f)  : [...p.features,  f] }))

  const handleSubmit = async () => {
    if (!canSubmit) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitted(true)
    setSubmitting(false)
  }

  // ── Steps ─────────────────────────────────────────────────────────────────
  const renderStep1 = () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Was möchten Sie?</p>
        <div className="grid grid-cols-2 gap-3">
          {(['kaufen', 'mieten'] as const).map(art => (
            <button key={art} onClick={() => setS1(p => ({ ...p, art }))}
              className={`py-4 rounded-xl font-bold text-base transition-all border-2 ${
                s1.art === art
                  ? 'border-primary-500 bg-primary-500 text-white shadow-lg shadow-primary-100'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:text-primary-500'
              }`}>
              {art === 'kaufen' ? 'Kaufen' : 'Mieten'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Art der Immobilie</p>
        <div className="grid grid-cols-2 gap-3">
          {TYP_OPTIONS.map(({ key, label, sub, Icon }) => {
            const sel = s1.typ === key
            return (
              <button key={key} onClick={() => setS1(p => ({ ...p, typ: key }))}
                className={`relative flex flex-col items-start gap-2 p-5 rounded-xl border-2 text-left transition-all group ${
                  sel
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-gray-50'
                }`}>
                {sel && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                )}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  sel ? 'bg-primary-500' : 'bg-gray-100 group-hover:bg-primary-100'
                }`}>
                  <Icon className={`h-5 w-5 ${sel ? 'text-white' : 'text-gray-500 group-hover:text-primary-500'}`} />
                </div>
                <div>
                  <p className={`font-bold text-sm ${sel ? 'text-primary-600' : 'text-gray-900'}`}>{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{sub}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Gewünschte Region</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {REGIONEN.map(r => (
            <button key={r} onClick={() => toggleRegion(r)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                s2.regionen.includes(r)
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400 hover:text-primary-500'
              }`}>
              {r}
            </button>
          ))}
        </div>
        <input type="text" placeholder="Oder Ort / PLZ eingeben…"
          value={s2.ortFreitext}
          onChange={e => setS2(p => ({ ...p, ortFreitext: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
      </div>

      {(typ === 'haus' || typ === 'wohnung') && (
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Mindestanzahl Zimmer</p>
          <div className="flex gap-2 flex-wrap">
            {ZIMMER.map(z => (
              <button key={z} onClick={() => setS2(p => ({ ...p, zimmer: z }))}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                  s2.zimmer === z
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400 hover:text-primary-500'
                }`}>
                {z === 'egal' ? 'Egal' : `${z} Zi.`}
              </button>
            ))}
          </div>
        </div>
      )}

      {(typ === 'haus' || typ === 'wohnung') && (
        <RangeSlider label="Wohnfläche" min={0} max={300} step={10}
          vMin={s2.wohnflaecheMin} vMax={s2.wohnflaecheMax}
          onMin={v => setS2(p => ({ ...p, wohnflaecheMin: v }))}
          onMax={v => setS2(p => ({ ...p, wohnflaecheMax: v }))}
          fmt={fmtM2} />
      )}

      {(typ === 'haus' || typ === 'grundstueck') && (
        <RangeSlider label="Grundstücksfläche" min={0} max={2000} step={50}
          vMin={s2.grundstueckMin} vMax={s2.grundstueckMax}
          onMin={v => setS2(p => ({ ...p, grundstueckMin: v }))}
          onMax={v => setS2(p => ({ ...p, grundstueckMax: v }))}
          fmt={fmtM2} />
      )}

      {typ === 'gewerbe' && (
        <RangeSlider label="Nutzfläche" min={0} max={500} step={20}
          vMin={s2.nutzflaecheMin} vMax={s2.nutzflaecheMax}
          onMin={v => setS2(p => ({ ...p, nutzflaecheMin: v }))}
          onMax={v => setS2(p => ({ ...p, nutzflaecheMax: v }))}
          fmt={fmtM2} />
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Max. Budget</p>
          <span className="text-sm font-bold text-primary-500">{fmtEur(s2.budgetMax, 2_000_000)}</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setS2(p => ({ ...p, budgetMax: Math.max(100_000, p.budgetMax - 50_000) }))}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary-500 hover:text-white font-bold text-xl flex items-center justify-center transition-all flex-shrink-0">
            −
          </button>
          <input type="range" min={100_000} max={2_000_000} step={50_000} value={s2.budgetMax}
            onChange={e => setS2(p => ({ ...p, budgetMax: +e.target.value }))}
            className="flex-1 accent-primary-500" />
          <button onClick={() => setS2(p => ({ ...p, budgetMax: Math.min(2_000_000, p.budgetMax + 50_000) }))}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary-500 hover:text-white font-bold text-xl flex items-center justify-center transition-all flex-shrink-0">
            +
          </button>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => {
    const features = FEATURES[typ] ?? []
    return (
      <div className="space-y-8">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Gewünschte Ausstattung</p>
          <div className="flex flex-wrap gap-2">
            {features.map(f => {
              const sel = s3.features.includes(f)
              return (
                <button key={f} onClick={() => toggleFeature(f)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    sel
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400 hover:text-primary-500'
                  }`}>
                  {sel && <Check className="h-3.5 w-3.5" />}
                  {f}
                </button>
              )
            })}
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-3">
            Weitere Wünsche & Anmerkungen
          </label>
          <textarea rows={4}
            placeholder="z. B. ruhige Lage, südlicher Garten, gute Schulanbindung, Neubau bevorzugt…"
            value={s3.anmerkungen}
            onChange={e => setS3(p => ({ ...p, anmerkungen: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-sm resize-none transition-all" />
        </div>
      </div>
    )
  }

  const renderStep4 = () => {
    const typLabel = TYP_OPTIONS.find(t => t.key === s1.typ)?.label ?? ''
    return (
      <div className="space-y-8">
        {/* Summary */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-1.5 text-sm">
          <p className="font-bold text-gray-900 mb-2">Ihr Suchprofil:</p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Art:</span>{' '}
            {s1.art === 'kaufen' ? 'Kaufen' : 'Mieten'} · {typLabel}
          </p>
          {(s2.regionen.length > 0 || s2.ortFreitext) && (
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Region:</span>{' '}
              {[...s2.regionen, s2.ortFreitext].filter(Boolean).join(', ')}
            </p>
          )}
          {(typ === 'haus' || typ === 'wohnung') && s2.zimmer !== 'egal' && (
            <p className="text-gray-600"><span className="font-semibold text-gray-800">Zimmer:</span> ab {s2.zimmer}</p>
          )}
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Budget:</span> {fmtEur(s2.budgetMax, 2_000_000)}
          </p>
          {s3.features.length > 0 && (
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Ausstattung:</span> {s3.features.join(', ')}
            </p>
          )}
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {([
            { key: 'vorname',  label: 'Vorname *',        type: 'text',  ph: 'Max' },
            { key: 'nachname', label: 'Nachname *',       type: 'text',  ph: 'Mustermann' },
            { key: 'email',    label: 'E-Mail-Adresse *', type: 'email', ph: 'max@beispiel.de' },
            { key: 'telefon',  label: 'Telefonnummer',    type: 'tel',   ph: '+49 177 …' },
          ] as const).map(({ key, label, type, ph }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
              <input type={type} placeholder={ph}
                value={(s4 as any)[key]}
                onChange={e => setS4(p => ({ ...p, [key]: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
            </div>
          ))}
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={s4.datenschutz}
            onChange={e => setS4(p => ({ ...p, datenschutz: e.target.checked }))}
            className="mt-1 accent-primary-500 w-4 h-4 flex-shrink-0" />
          <span className="text-sm text-gray-600">
            Ich habe die{' '}
            <Link href="/datenschutz" className="text-primary-500 hover:underline" target="_blank">Datenschutzerklärung</Link>
            {' '}gelesen und stimme der Verarbeitung meiner Daten zu. *
          </span>
        </label>
      </div>
    )
  }

  const renderSuccess = () => (
    <div className="text-center py-8">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-green-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Suchprofil erfolgreich angelegt!</h3>
      <p className="text-gray-600 mb-2 max-w-sm mx-auto">
        Vielen Dank, <strong>{s4.vorname}</strong>. Ich melde mich persönlich, sobald eine passende Immobilie verfügbar ist.
      </p>
      <p className="text-gray-500 text-sm mb-8">Bestätigung an: <strong>{s4.email}</strong></p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/immobilien" className="btn-primary">
          Aktuelle Immobilien <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/" className="btn-secondary">Zur Startseite</Link>
      </div>
    </div>
  )

  // ── Page ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen">

      {/* Hero – same pattern as kaufen / verkaufen */}
      <section className="py-16 md:py-24 bg-secondary-900 flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary-400 mb-4" data-aos="fade-up">
              <Bell className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Suchprofil</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100">
              Die richtige Immobilie –<br />auch wenn sie noch nicht im Angebot ist
            </h1>
            <p className="text-xl text-gray-300 mb-8" data-aos="fade-up" data-aos-delay="200">
              Legen Sie Ihr persönliches Suchprofil an. Ich melde mich sofort, wenn die passende Immobilie verfügbar wird.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="300">
              <a href="#funnel" className="btn-primary">
                Jetzt Suchprofil anlegen
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href="tel:01776542977" className="btn-outline border-white text-white hover:bg-white hover:text-secondary-900">
                <Phone className="h-5 w-5" />
                0177 6542977
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Funnel */}
      <section id="funnel" className="py-12 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              {submitted ? renderSuccess() : (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 font-medium mb-1">Schritt {step} von 4</p>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {step === 1 && 'Was suchen Sie?'}
                      {step === 2 && 'Größe, Lage & Budget'}
                      {step === 3 && 'Ausstattungswünsche'}
                      {step === 4 && 'Ihre Kontaktdaten'}
                    </h2>
                  </div>

                  <StepProgress step={step} />

                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                  {step === 4 && renderStep4()}

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                    {step > 1 ? (
                      <button onClick={() => setStep(s => s - 1)} className="btn-secondary">
                        <ArrowLeft className="h-4 w-4" /> Zurück
                      </button>
                    ) : (
                      <Link href="/immobilien"
                        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Alle Immobilien
                      </Link>
                    )}

                    {step < 4 ? (
                      <button onClick={() => setStep(s => s + 1)}
                        disabled={step === 1 ? !canNext1 : step === 2 ? !canNext2 : false}
                        className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                        Weiter <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button onClick={handleSubmit}
                        disabled={!canSubmit || submitting}
                        className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed min-w-[180px]">
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Wird gespeichert…
                          </span>
                        ) : (
                          <>Suchprofil anlegen <Check className="h-4 w-4" /></>
                        )}
                      </button>
                    )}
                  </div>

                  {step === 1 && !canNext1 && (
                    <p className="text-xs text-center text-gray-400 mt-4">
                      Bitte wählen Sie Kaufen/Mieten und einen Immobilientyp aus.
                    </p>
                  )}
                  {step === 2 && !canNext2 && (
                    <p className="text-xs text-center text-gray-400 mt-4">
                      Bitte wählen Sie mindestens eine Region oder geben Sie einen Ort ein.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sandro Portrait – identical markup to homepage */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="section-title mb-4">Ihr persönlicher Ansprechpartner</h2>
            <p className="section-subtitle mx-auto">
              Kompetenz und Vertrauen aus einer Hand
            </p>
          </div>

          <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative">
                  <div className="aspect-[3/4] md:aspect-auto md:h-full relative">
                    <Image
                      src="https://res.cloudinary.com/djqviyb2c/image/upload/w_600,q_80/v1770806323/Lebenskunst-Photography_-078_-_Sandro_-_11.09.2025_-_Business_fotografie-_Trier-13__2_r18b6c.jpg"
                      alt="Sandro Mezzarano – Ihr Immobilienmakler"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
                    Sandro Mezzarano
                  </h3>
                  <p className="text-primary-500 font-semibold mb-4">
                    Wüstenrot Immobilienberater
                  </p>
                  <p className="text-secondary-600 mb-4 leading-relaxed">
                    Mit über 16 Jahren Erfahrung in der Immobilienbranche bin ich Ihr verlässlicher Partner
                    für alle Fragen rund um Kauf, Verkauf und Bewertung von Immobilien in der Region
                    Trier-Saarburg und im Hochwald.
                  </p>
                  <p className="text-secondary-600 leading-relaxed">
                    Sobald Ihr Suchprofil angelegt ist, melde ich mich persönlich bei Ihnen –
                    kein Call-Center, kein automatisierter Versand.
                  </p>
                  <div className="mt-6 space-y-2 text-sm">
                    <a href="tel:01776542977" className="flex items-center gap-2 text-secondary-600 hover:text-primary-500 transition-colors">
                      <Phone className="h-4 w-4 text-primary-500" /> 0177 6542977
                    </a>
                    <a href="mailto:sandro.mezzarano@wuestenrot.de" className="flex items-center gap-2 text-secondary-600 hover:text-primary-500 transition-colors">
                      <Mail className="h-4 w-4 text-primary-500" /> sandro.mezzarano@wuestenrot.de
                    </a>
                    <div className="flex items-center gap-2 text-secondary-600">
                      <MapPin className="h-4 w-4 text-primary-500" /> Saarstraße 1, 54411 Hermeskeil
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link href="/ueber-uns" className="text-primary-500 font-semibold hover:text-primary-600 inline-flex items-center gap-2 group">
                      Mehr über mich
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA – same pattern as kaufen / verkaufen */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Lieber direkt sprechen?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rufen Sie mich an oder schreiben Sie mir – ich berate Sie unverbindlich und kostenfrei.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary bg-white text-primary-500 hover:bg-gray-100">
              Kontakt aufnehmen
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a href="tel:01776542977" className="btn-outline-dark">
              <Phone className="h-5 w-5" />
              0177 6542977
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
