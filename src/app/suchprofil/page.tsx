'use client'

import { useState } from 'react'
import { Check, ChevronRight, ChevronLeft, Home, Building2, Warehouse, Layers, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// ─── Types ──────────────────────────────────────────────────────────────────

type DealType = 'kauf' | 'miete' | ''
type Category = 'haus' | 'wohnung' | 'gewerbe' | 'grundstueck' | ''
type Anrede = 'herr' | 'frau' | 'keine' | ''

interface FormData {
  // Step 1
  dealType: DealType
  category: Category

  // Step 2 – conditional by category
  wohnflaeche_min: string
  wohnflaeche_max: string
  grundstueck_min: string
  grundstueck_max: string
  nutzflaeche_min: string
  nutzflaeche_max: string
  zimmer: string
  lage_plz: string
  lage_ort: string
  preis_min: string
  preis_max: string

  // Step 3
  features: string[]
  sonstigeWuensche: string

  // Step 4
  anrede: Anrede
  vorname: string
  nachname: string
  email: string
  telefon: string
  strasse: string
  hausnummer: string
  plz: string
  ort: string
  datenschutz: boolean
}

// ─── Feature sets per category ──────────────────────────────────────────────

const FEATURES: Record<string, { id: string; label: string }[]> = {
  wohnung: [
    { id: 'balkon_terrasse', label: 'Balkon / Terrasse' },
    { id: 'aufzug', label: 'Aufzug' },
    { id: 'einbaukueche', label: 'Einbauküche' },
    { id: 'barrierefrei', label: 'Barrierefrei' },
    { id: 'tiefgarage_stellplatz', label: 'Tiefgarage / Stellplatz' },
    { id: 'keller', label: 'Keller / Abstellraum' },
    { id: 'gaeste_wc', label: 'Gäste-WC' },
    { id: 'fussbodenheizung', label: 'Fußbodenheizung' },
  ],
  haus: [
    { id: 'garten', label: 'Garten' },
    { id: 'terrasse', label: 'Terrasse / Balkon' },
    { id: 'garage_carport', label: 'Garage / Carport' },
    { id: 'keller', label: 'Keller' },
    { id: 'pool_sauna', label: 'Pool / Sauna' },
    { id: 'einliegerwohnung', label: 'Einliegerwohnung' },
    { id: 'barrierefrei', label: 'Barrierefrei' },
    { id: 'photovoltaik', label: 'Photovoltaik / Wärmepumpe' },
  ],
  gewerbe: [
    { id: 'klimaanlage', label: 'Klimaanlage' },
    { id: 'aufzug', label: 'Aufzug' },
    { id: 'stellplaetze', label: 'Tiefgarage / Stellplätze' },
    { id: 'glasfaser', label: 'Glasfaseranschluss' },
    { id: 'empfang', label: 'Empfangsbereich' },
    { id: 'konferenzraum', label: 'Konferenzraum' },
    { id: 'barrierefrei', label: 'Barrierefrei' },
    { id: 'lager', label: 'Lager-/Nebenflächen' },
  ],
  grundstueck: [
    { id: 'erschlossen', label: 'Voll erschlossen' },
    { id: 'bebauungsplan', label: 'Bebauungsplan vorhanden' },
    { id: 'hanglage', label: 'Hanglage' },
    { id: 'ecklage', label: 'Ecklage' },
    { id: 'altbestand', label: 'Altbestand vorhanden' },
    { id: 'wohnbauland', label: 'Wohnbauland' },
  ],
}

// ─── Category tiles config ───────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'haus' as Category,
    label: 'Haus',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
    description: 'Einfamilienhaus, Doppelhaus, Villa',
  },
  {
    id: 'wohnung' as Category,
    label: 'Wohnung',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    description: 'Eigentumswohnung, Penthouse, Apartment',
  },
  {
    id: 'grundstueck' as Category,
    label: 'Grundstück',
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    description: 'Baugrundstück, Ackerland, Gewerbegrundstück',
  },
  {
    id: 'gewerbe' as Category,
    label: 'Gewerbe',
    icon: Warehouse,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    description: 'Büro, Einzelhandel, Lager, Produktion',
  },
]

// ─── Initial form state ──────────────────────────────────────────────────────

const INITIAL: FormData = {
  dealType: '',
  category: '',
  wohnflaeche_min: '',
  wohnflaeche_max: '',
  grundstueck_min: '',
  grundstueck_max: '',
  nutzflaeche_min: '',
  nutzflaeche_max: '',
  zimmer: '',
  lage_plz: '',
  lage_ort: '',
  preis_min: '',
  preis_max: '',
  features: [],
  sonstigeWuensche: '',
  anrede: '',
  vorname: '',
  nachname: '',
  email: '',
  telefon: '',
  strasse: '',
  hausnummer: '',
  plz: '',
  ort: '',
  datenschutz: false,
}

// ─── Step indicator ──────────────────────────────────────────────────────────

const STEPS = [
  { number: 1, label: 'Objektart' },
  { number: 2, label: 'Details' },
  { number: 3, label: 'Ausstattung' },
  { number: 4, label: 'Kontakt' },
]

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, idx) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                current > step.number
                  ? 'bg-primary-700 text-white'
                  : current === step.number
                  ? 'bg-primary-700 text-white ring-4 ring-primary-100'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {current > step.number ? <Check className="h-5 w-5" /> : step.number}
            </div>
            <span
              className={`text-xs mt-1.5 font-medium hidden sm:block ${
                current >= step.number ? 'text-primary-700' : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-12 sm:w-20 mx-1 mt-0 sm:-mt-5 transition-colors ${
                current > step.number ? 'bg-primary-700' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Step 1: Objektart & Vermarktungsart ─────────────────────────────────────

function Step1({
  data,
  onChange,
  onNext,
}: {
  data: FormData
  onChange: (updates: Partial<FormData>) => void
  onNext: () => void
}) {
  const canNext = data.dealType !== '' && data.category !== ''

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">Was suchen Sie?</h2>
      <p className="text-gray-500 mb-8">Wählen Sie Objektart und Vermarktungsart.</p>

      {/* Deal type */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Vermarktungsart
        </label>
        <div className="flex gap-3">
          {[
            { value: 'kauf', label: 'Kaufen' },
            { value: 'miete', label: 'Mieten' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => onChange({ dealType: opt.value as DealType })}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold border-2 transition-all ${
                data.dealType === opt.value
                  ? 'border-primary-700 bg-primary-700 text-white shadow-md'
                  : 'border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category tiles */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Objektart
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon
            const selected = data.category === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => onChange({ category: cat.id, features: [] })}
                className={`relative rounded-xl overflow-hidden border-2 transition-all group ${
                  selected
                    ? 'border-primary-700 shadow-lg'
                    : 'border-transparent hover:border-primary-300'
                }`}
              >
                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 transition-opacity ${
                    selected ? 'bg-primary-900/50' : 'bg-gray-900/30 group-hover:bg-gray-900/20'
                  }`} />
                  {selected && (
                    <div className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary-700" />
                    </div>
                  )}
                </div>
                {/* Label */}
                <div className={`p-3 text-left ${selected ? 'bg-primary-50' : 'bg-white'}`}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Icon className={`h-4 w-4 ${selected ? 'text-primary-700' : 'text-gray-500'}`} />
                    <span className={`font-semibold text-sm ${selected ? 'text-primary-700' : 'text-gray-900'}`}>
                      {cat.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">{cat.description}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!canNext}
          className="flex items-center gap-2 bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-800 transition-colors"
        >
          Weiter
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

// ─── Step 2: Größe, Lage & Preis ─────────────────────────────────────────────

function Step2({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: FormData
  onChange: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}) {
  const cat = data.category
  const isKauf = data.dealType === 'kauf'

  const priceLabel = cat === 'gewerbe'
    ? (isKauf ? 'Kaufpreis (€)' : 'Miete (€/Monat)')
    : (isKauf ? 'Kaufpreis (€)' : 'Kaltmiete (€/Monat)')

  const InputRow = ({
    label,
    fromVal,
    fromKey,
    toVal,
    toKey,
    unit,
    placeholder,
  }: {
    label: string
    fromVal: string
    fromKey: keyof FormData
    toVal: string
    toKey: keyof FormData
    unit: string
    placeholder?: string
  }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <div className="relative">
            <input
              type="number"
              value={fromVal}
              onChange={e => onChange({ [fromKey]: e.target.value } as Partial<FormData>)}
              placeholder={placeholder ?? 'von'}
              min={0}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">{unit}</span>
          </div>
        </div>
        <span className="text-gray-400 text-sm flex-shrink-0">–</span>
        <div className="flex-1">
          <div className="relative">
            <input
              type="number"
              value={toVal}
              onChange={e => onChange({ [toKey]: e.target.value } as Partial<FormData>)}
              placeholder="bis"
              min={0}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">{unit}</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">Größe, Lage & Preis</h2>
      <p className="text-gray-500 mb-8">Geben Sie Ihre Wünsche an – alle Felder sind optional.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Wohnfläche – Wohnung, Haus */}
        {(cat === 'wohnung' || cat === 'haus') && (
          <InputRow
            label="Wohnfläche"
            fromVal={data.wohnflaeche_min}
            fromKey="wohnflaeche_min"
            toVal={data.wohnflaeche_max}
            toKey="wohnflaeche_max"
            unit="m²"
          />
        )}

        {/* Grundstücksfläche – Haus, Grundstück */}
        {(cat === 'haus' || cat === 'grundstueck') && (
          <InputRow
            label="Grundstücksfläche"
            fromVal={data.grundstueck_min}
            fromKey="grundstueck_min"
            toVal={data.grundstueck_max}
            toKey="grundstueck_max"
            unit="m²"
          />
        )}

        {/* Nutzfläche – Gewerbe */}
        {cat === 'gewerbe' && (
          <InputRow
            label="Nutzfläche"
            fromVal={data.nutzflaeche_min}
            fromKey="nutzflaeche_min"
            toVal={data.nutzflaeche_max}
            toKey="nutzflaeche_max"
            unit="m²"
          />
        )}

        {/* Zimmer – Wohnung, Haus */}
        {(cat === 'wohnung' || cat === 'haus') && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Zimmer (Mindestanzahl)</label>
            <div className="flex gap-2">
              {['egal', '1', '2', '3', '4', '5+'].map(z => (
                <button
                  key={z}
                  onClick={() => onChange({ zimmer: z === 'egal' ? '' : z })}
                  className={`flex-1 py-2.5 rounded-lg border font-medium text-sm transition-colors ${
                    (z === 'egal' && data.zimmer === '') || data.zimmer === z
                      ? 'border-primary-700 bg-primary-700 text-white'
                      : 'border-gray-200 text-gray-700 hover:border-primary-300'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Preis */}
        <InputRow
          label={priceLabel}
          fromVal={data.preis_min}
          fromKey="preis_min"
          toVal={data.preis_max}
          toKey="preis_max"
          unit="€"
          placeholder="von"
        />
      </div>

      {/* Lage */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Lage / Region</label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={data.lage_plz}
            onChange={e => onChange({ lage_plz: e.target.value })}
            placeholder="Postleitzahl"
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <input
            type="text"
            value={data.lage_ort}
            onChange={e => onChange({ lage_ort: e.target.value })}
            placeholder="Ort (z. B. Heilbronn)"
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Zurück
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-800 transition-colors"
        >
          Weiter
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

// ─── Step 3: Ausstattung & Wünsche ──────────────────────────────────────────

function Step3({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: FormData
  onChange: (updates: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}) {
  const features = FEATURES[data.category] ?? []

  const toggleFeature = (id: string) => {
    const current = data.features
    const next = current.includes(id) ? current.filter(f => f !== id) : [...current, id]
    onChange({ features: next })
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">Ausstattung & Wünsche</h2>
      <p className="text-gray-500 mb-8">Wählen Sie, was Ihnen wichtig ist – Mehrfachauswahl möglich.</p>

      {features.length > 0 && (
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Ausstattungsmerkmale
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {features.map(feat => {
              const active = data.features.includes(feat.id)
              return (
                <button
                  key={feat.id}
                  onClick={() => toggleFeature(feat.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                    active
                      ? 'border-primary-700 bg-primary-50 text-primary-700'
                      : 'border-gray-200 text-gray-700 hover:border-primary-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors ${
                    active ? 'border-primary-700 bg-primary-700' : 'border-gray-300'
                  }`}>
                    {active && <Check className="h-3 w-3 text-white" />}
                  </div>
                  {feat.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Free text */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Sonstige Wünsche & Anmerkungen
        </label>
        <textarea
          value={data.sonstigeWuensche}
          onChange={e => onChange({ sonstigeWuensche: e.target.value })}
          rows={4}
          placeholder="Beschreiben Sie hier weitere Wünsche, besondere Anforderungen oder sonstige Hinweise..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Zurück
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-800 transition-colors"
        >
          Weiter
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

// ─── Step 4: Kontaktdaten ────────────────────────────────────────────────────

function Step4({
  data,
  onChange,
  onBack,
  onSubmit,
  submitting,
}: {
  data: FormData
  onChange: (updates: Partial<FormData>) => void
  onBack: () => void
  onSubmit: () => void
  submitting: boolean
}) {
  const canSubmit =
    data.vorname.trim() !== '' &&
    data.nachname.trim() !== '' &&
    data.email.trim() !== '' &&
    data.plz.trim() !== '' &&
    data.ort.trim() !== '' &&
    data.datenschutz

  const Field = ({
    label,
    required,
    children,
  }: {
    label: string
    required?: boolean
    children: React.ReactNode
  }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-primary-700 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent'

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">Ihre Kontaktdaten</h2>
      <p className="text-gray-500 mb-8">Damit wir Sie kontaktieren können, wenn ein passendes Objekt verfügbar ist.</p>

      {/* Anrede */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Anrede</label>
        <div className="flex gap-3">
          {[
            { value: 'herr', label: 'Herr' },
            { value: 'frau', label: 'Frau' },
            { value: 'keine', label: 'Keine Angabe' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => onChange({ anrede: opt.value as Anrede })}
              className={`px-5 py-2.5 rounded-lg border-2 font-medium text-sm transition-colors ${
                data.anrede === opt.value
                  ? 'border-primary-700 bg-primary-700 text-white'
                  : 'border-gray-200 text-gray-700 hover:border-primary-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <Field label="Vorname" required>
          <input
            type="text"
            value={data.vorname}
            onChange={e => onChange({ vorname: e.target.value })}
            placeholder="Max"
            className={inputClass}
          />
        </Field>
        <Field label="Nachname" required>
          <input
            type="text"
            value={data.nachname}
            onChange={e => onChange({ nachname: e.target.value })}
            placeholder="Mustermann"
            className={inputClass}
          />
        </Field>
        <Field label="E-Mail-Adresse" required>
          <input
            type="email"
            value={data.email}
            onChange={e => onChange({ email: e.target.value })}
            placeholder="max@beispiel.de"
            className={inputClass}
          />
        </Field>
        <Field label="Telefon">
          <input
            type="tel"
            value={data.telefon}
            onChange={e => onChange({ telefon: e.target.value })}
            placeholder="+49 7131 ..."
            className={inputClass}
          />
        </Field>
      </div>

      {/* Address */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">Ihre Adresse (optional)</p>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="col-span-2">
            <input
              type="text"
              value={data.strasse}
              onChange={e => onChange({ strasse: e.target.value })}
              placeholder="Straße"
              className={inputClass}
            />
          </div>
          <input
            type="text"
            value={data.hausnummer}
            onChange={e => onChange({ hausnummer: e.target.value })}
            placeholder="Nr."
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field label="" required>
            <input
              type="text"
              value={data.plz}
              onChange={e => onChange({ plz: e.target.value })}
              placeholder="PLZ *"
              className={inputClass}
            />
          </Field>
          <div className="col-span-2">
            <input
              type="text"
              value={data.ort}
              onChange={e => onChange({ ort: e.target.value })}
              placeholder="Ort *"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Datenschutz */}
      <div className="mb-8">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div
            onClick={() => onChange({ datenschutz: !data.datenschutz })}
            className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
              data.datenschutz ? 'border-primary-700 bg-primary-700' : 'border-gray-300 group-hover:border-primary-400'
            }`}
          >
            {data.datenschutz && <Check className="h-3 w-3 text-white" />}
          </div>
          <span className="text-sm text-gray-600">
            Ich habe die{' '}
            <Link href="/datenschutz" className="text-primary-700 underline hover:text-primary-800">
              Datenschutzerklärung
            </Link>{' '}
            gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.{' '}
            <span className="text-primary-700">*</span>
          </span>
        </label>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Zurück
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit || submitting}
          className="flex items-center gap-2 bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-800 transition-colors"
        >
          {submitting ? 'Wird gesendet...' : 'Suchprofil anlegen'}
          {!submitting && <ArrowRight className="h-5 w-5" />}
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Mit * markierte Felder sind Pflichtfelder.
      </p>
    </div>
  )
}

// ─── Success screen ──────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="h-10 w-10 text-green-600" />
      </div>
      <h2 className="font-serif text-3xl font-bold text-gray-900 mb-3">
        Suchprofil angelegt!
      </h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
        Vielen Dank! Wir haben Ihr Suchprofil erhalten und melden uns umgehend, sobald ein passendes Objekt für Sie verfügbar ist.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/immobilien"
          className="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-800 transition-colors"
        >
          Aktuelle Immobilien ansehen
        </Link>
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          Persönlich Kontakt aufnehmen
        </Link>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function SuchprofilPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const update = (updates: Partial<FormData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    // Simulate sending (replace with real API call)
    await new Promise(resolve => setTimeout(resolve, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  const categoryLabel = CATEGORIES.find(c => c.id === data.category)?.label ?? ''

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-primary-900 py-14">
        <div className="container-custom">
          <div className="max-w-2xl">
            <p className="text-primary-300 text-sm font-medium uppercase tracking-wider mb-2">
              Kostenloser Service
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
              Suchprofil anlegen
            </h1>
            <p className="text-xl text-gray-300">
              Beschreiben Sie Ihre Wunschimmobilie – wir informieren Sie als Erstes, wenn etwas Passendes verfügbar ist.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {submitted ? (
                <SuccessScreen />
              ) : (
                <>
                  <StepIndicator current={step} />

                  {/* Breadcrumb summary */}
                  {step > 1 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {data.dealType && (
                        <span className="inline-flex items-center gap-1 text-xs bg-primary-50 text-primary-700 border border-primary-200 rounded-full px-3 py-1 font-medium">
                          {data.dealType === 'kauf' ? 'Kaufen' : 'Mieten'}
                        </span>
                      )}
                      {categoryLabel && (
                        <span className="inline-flex items-center gap-1 text-xs bg-primary-50 text-primary-700 border border-primary-200 rounded-full px-3 py-1 font-medium">
                          {categoryLabel}
                        </span>
                      )}
                    </div>
                  )}

                  {step === 1 && (
                    <Step1 data={data} onChange={update} onNext={() => setStep(2)} />
                  )}
                  {step === 2 && (
                    <Step2 data={data} onChange={update} onNext={() => setStep(3)} onBack={() => setStep(1)} />
                  )}
                  {step === 3 && (
                    <Step3 data={data} onChange={update} onNext={() => setStep(4)} onBack={() => setStep(2)} />
                  )}
                  {step === 4 && (
                    <Step4
                      data={data}
                      onChange={update}
                      onBack={() => setStep(3)}
                      onSubmit={handleSubmit}
                      submitting={submitting}
                    />
                  )}
                </>
              )}
            </div>

            {/* Trust signals */}
            {!submitted && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                {[
                  { title: 'Kostenlos', desc: 'Das Anlegen eines Suchprofils ist für Sie kostenlos und unverbindlich.' },
                  { title: 'Diskret', desc: 'Ihre Daten werden ausschließlich für die Objektvermittlung genutzt.' },
                  { title: 'Persönlich', desc: 'Ein Makler aus unserem Team meldet sich direkt bei Ihnen.' },
                ].map(item => (
                  <div key={item.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="h-4 w-4 text-primary-700" />
                    </div>
                    <p className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
