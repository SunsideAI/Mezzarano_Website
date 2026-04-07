import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin, Bed, Bath, Square, Calendar, CheckCircle, Phone, Mail,
  ArrowLeft, Share2, Heart, Printer, Building, Thermometer, Trees,
  Home, Fence, Car, Layers, Euro, Ruler, Zap, Flame, DoorOpen,
  Mountain, Warehouse, Key, FileText, Clock, Shield, Sparkles,
  Accessibility, PawPrint, ChefHat, Sofa, Snowflake, Sun, Droplets
} from 'lucide-react'
import {
  fetchEstateByExposeIdWithImages,
  OnOfficeProperty,
  isOnOfficeConfigured,
  getObjektartLabel,
  getObjekttypLabel,
  getZustandLabel,
  getHeizungsartLabel,
  getBefeuerungLabel
} from '@/lib/onoffice'
import { fetchPropertyByExposeId, AirtableProperty } from '@/lib/airtable'
import ImageGallery from '@/components/ImageGallery'
import PropertyMap from '@/components/PropertyMap'
import PropertyInquiryForm from '@/components/PropertyInquiryForm'

// Contact info for Sandro Mezzarano
const agent = {
  name: 'Sandro Mezzarano',
  title: 'Wüstenrot Immobilienberater',
  phone1: '0177 6542977',
  phone2: '06503 9523963',
  email: 'sandro.mezzarano@wuestenrot.de',
  image: '/images/team/Mezzarano.jpg',
}

// Optimize Cloudinary URL with responsive size
function getOptimizedCloudinaryUrl(url: string, width: number = 1200): string {
  if (!url.includes('res.cloudinary.com')) {
    return url
  }
  if (url.includes('/upload/') && !url.includes('/f_auto') && !url.includes('/w_')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`)
  }
  return url
}

// Format price with German locale
function formatPrice(price: number | undefined, isRent?: boolean): string {
  if (!price) return 'Preis auf Anfrage'
  const formatted = new Intl.NumberFormat('de-DE').format(price)
  return isRent ? `${formatted} €/Monat` : `${formatted} €`
}

// Format area
function formatArea(area: number | undefined): string {
  if (!area) return ''
  return `${new Intl.NumberFormat('de-DE').format(area)} m²`
}

// Component for feature badges
function FeatureBadge({ icon: Icon, label, available }: { icon: React.ElementType; label: string; available?: boolean }) {
  if (available === false || available === undefined) return null
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm">
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </div>
  )
}

// Component for detail rows
function DetailRow({ label, value, icon: Icon }: { label: string; value?: string | number | null; icon?: React.ElementType }) {
  if (value === undefined || value === null || value === '') return null
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
      {Icon && <Icon className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />}
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  )
}

// Render description with intelligent formatting
function renderDescription(text: string) {
  if (!text) return null

  const lines = text.split('\n').filter(line => line.trim())
  const bulletPattern = /^[-•*]\s*|^\d+[.)]\s*/

  // Check if at least 2 lines look like bullet points
  const bulletLines = lines.filter(l => bulletPattern.test(l.trim()))

  if (bulletLines.length >= 2) {
    return (
      <ul className="space-y-3">
        {lines.map((line, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
            <span>{line.replace(bulletPattern, '').trim()}</span>
          </li>
        ))}
      </ul>
    )
  }

  // Otherwise render as paragraphs
  return (
    <div className="space-y-4">
      {lines.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const exposeId = decodeURIComponent(params.id)
  let property: OnOfficeProperty | null = null
  let fallbackProperty: AirtableProperty | null = null
  let source: 'onoffice' | 'airtable' = 'onoffice'

  // Try onOffice first
  if (isOnOfficeConfigured()) {
    property = await fetchEstateByExposeIdWithImages(exposeId)
  }

  // Fallback to Airtable
  if (!property) {
    fallbackProperty = await fetchPropertyByExposeId(exposeId)
    source = 'airtable'
  }

  if (!property && !fallbackProperty) {
    notFound()
  }

  // Use onOffice data or convert Airtable data
  const isRent = property
    ? property.vermarktungsart === 'miete'
    : fallbackProperty?.kategorie === 'Miete'

  const title = property?.titel || fallbackProperty?.titel || 'Immobilie'
  const propertyExposeId = property?.expose_id || fallbackProperty?.expose_id || params.id
  const images = property?.bilder || fallbackProperty?.bilder || []

  // Deduplicate images
  const seenImages = new Set<string>()
  const allImages: string[] = images
    .filter(url => {
      const match = url.match(/\/v\d+\/(.+)$/)
      const identifier = match ? match[1] : url
      if (seenImages.has(identifier)) return false
      seenImages.add(identifier)
      return true
    })
    .map(url => url.includes('res.cloudinary.com') ? getOptimizedCloudinaryUrl(url, 1200) : url)

  // Build address string
  const address = property
    ? [property.strasse, property.hausnummer, property.plz, property.ort].filter(Boolean).join(', ')
    : fallbackProperty?.adresse_komplett || fallbackProperty?.kurz_adresse || `${fallbackProperty?.plz || ''} ${fallbackProperty?.ort || ''}`

  // Get price
  const price = property
    ? (isRent ? property.kaltmiete : property.kaufpreis)
    : fallbackProperty?.preis

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <Link
            href="/immobilien"
            className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Zurück zur Übersicht
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="bg-gray-100 py-6">
        <div className="container-custom">
          <ImageGallery images={allImages} title={title} />
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title and Price */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                    {isRent ? 'Zur Miete' : 'Zum Kauf'}
                  </span>
                  {(property?.objekttyp || property?.objektart || fallbackProperty?.objekt_typ) && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                      {property ? getObjekttypLabel(property.objekttyp) || getObjektartLabel(property.objektart) : fallbackProperty?.objekt_typ}
                    </span>
                  )}
                  {property?.zustand && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                      {getZustandLabel(property.zustand)}
                    </span>
                  )}
                  {property?.status === 1 && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                      Verfügbar
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {title}
                </h1>

                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <MapPin className="h-5 w-5" />
                  <span>{address}</span>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <p className="text-3xl font-bold text-primary-500">
                      {formatPrice(price, isRent)}
                    </p>
                    {isRent && property?.warmmiete && (
                      <p className="text-sm text-gray-500">Warmmiete: {formatPrice(property.warmmiete, true)}</p>
                    )}
                    {!isRent && property?.kaufpreis_pro_qm && (
                      <p className="text-sm text-gray-500">{formatPrice(property.kaufpreis_pro_qm)}/m²</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Teilen">
                      <Share2 className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Favorit">
                      <Heart className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Drucken">
                      <Printer className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Object Number */}
                {(property?.objektnr_extern || propertyExposeId) && (
                  <p className="text-sm text-gray-400 mt-4">
                    Objekt-Nr.: {property?.objektnr_extern || propertyExposeId}
                  </p>
                )}
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-xl shadow-sm">
                {(property?.anzahl_zimmer || fallbackProperty?.zimmer) !== undefined && (property?.anzahl_zimmer || fallbackProperty?.zimmer)! > 0 && (
                  <div className="text-center p-4">
                    <DoorOpen className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{property?.anzahl_zimmer || fallbackProperty?.zimmer}</p>
                    <p className="text-sm text-gray-500">Zimmer</p>
                  </div>
                )}
                {property?.anzahl_schlafzimmer !== undefined && property.anzahl_schlafzimmer > 0 && (
                  <div className="text-center p-4">
                    <Bed className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{property.anzahl_schlafzimmer}</p>
                    <p className="text-sm text-gray-500">Schlafzimmer</p>
                  </div>
                )}
                {(property?.anzahl_badezimmer || fallbackProperty?.badezimmer) !== undefined && (property?.anzahl_badezimmer || fallbackProperty?.badezimmer)! > 0 && (
                  <div className="text-center p-4">
                    <Bath className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{property?.anzahl_badezimmer || fallbackProperty?.badezimmer}</p>
                    <p className="text-sm text-gray-500">Badezimmer</p>
                  </div>
                )}
                {(property?.wohnflaeche || fallbackProperty?.wohnflaeche) !== undefined && (property?.wohnflaeche || fallbackProperty?.wohnflaeche)! > 0 && (
                  <div className="text-center p-4">
                    <Square className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{property?.wohnflaeche || fallbackProperty?.wohnflaeche}</p>
                    <p className="text-sm text-gray-500">m² Wohnfläche</p>
                  </div>
                )}
                {(property?.grundstuecksflaeche || fallbackProperty?.grundstueck) !== undefined && (property?.grundstuecksflaeche || fallbackProperty?.grundstueck)! > 0 && (
                  <div className="text-center p-4">
                    <Fence className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{property?.grundstuecksflaeche || fallbackProperty?.grundstueck}</p>
                    <p className="text-sm text-gray-500">m² Grundstück</p>
                  </div>
                )}
                {(property?.anzahl_etagen || fallbackProperty?.etagen) !== undefined && (property?.anzahl_etagen || fallbackProperty?.etagen)! > 0 && (
                  <div className="text-center p-4">
                    <Layers className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{property?.anzahl_etagen || fallbackProperty?.etagen}</p>
                    <p className="text-sm text-gray-500">Etagen</p>
                  </div>
                )}
                {(property?.baujahr || fallbackProperty?.baujahr) !== undefined && (property?.baujahr || fallbackProperty?.baujahr)! > 0 && (
                  <div className="text-center p-4">
                    <Calendar className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{property?.baujahr || fallbackProperty?.baujahr}</p>
                    <p className="text-sm text-gray-500">Baujahr</p>
                  </div>
                )}
                {property?.etage !== undefined && (
                  <div className="text-center p-4">
                    <Building className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{property.etage}</p>
                    <p className="text-sm text-gray-500">Etage</p>
                  </div>
                )}
                {((property?.anzahl_garagen || fallbackProperty?.garagen) || (property?.anzahl_stellplaetze || fallbackProperty?.stellplaetze)) && (
                  <div className="text-center p-4">
                    <Car className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {(property?.anzahl_garagen || fallbackProperty?.garagen || 0) + (property?.anzahl_stellplaetze || fallbackProperty?.stellplaetze || 0)}
                    </p>
                    <p className="text-sm text-gray-500">Stellplätze</p>
                  </div>
                )}
              </div>

              {/* Costs Section (onOffice only) */}
              {property && (isRent ? (property.kaltmiete || property.nebenkosten || property.heizkosten) : (property.kaufpreis || property.hausgeld || property.courtage)) && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Euro className="h-6 w-6 text-primary-500" />
                    {isRent ? 'Mietkosten' : 'Kaufkosten'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isRent ? (
                      <>
                        <DetailRow label="Kaltmiete" value={formatPrice(property.kaltmiete, true)} icon={Euro} />
                        <DetailRow label="Nebenkosten" value={formatPrice(property.nebenkosten, true)} icon={Euro} />
                        <DetailRow label="Heizkosten" value={formatPrice(property.heizkosten, true)} icon={Flame} />
                        <DetailRow label="Warmmiete" value={formatPrice(property.warmmiete, true)} icon={Euro} />
                        <DetailRow label="Kaution" value={property.kaution} icon={Shield} />
                        {property.stellplatzmiete && <DetailRow label="Stellplatzmiete" value={formatPrice(property.stellplatzmiete, true)} icon={Car} />}
                      </>
                    ) : (
                      <>
                        <DetailRow label="Kaufpreis" value={formatPrice(property.kaufpreis)} icon={Euro} />
                        {property.kaufpreis_pro_qm && <DetailRow label="Preis pro m²" value={formatPrice(property.kaufpreis_pro_qm)} icon={Ruler} />}
                        {property.hausgeld && <DetailRow label="Hausgeld" value={formatPrice(property.hausgeld, true)} icon={Euro} />}
                        {property.courtage && <DetailRow label="Provision" value={property.courtage} icon={FileText} />}
                        {property.courtage_hinweis && <DetailRow label="Provisionshinweis" value={property.courtage_hinweis} icon={FileText} />}
                        {property.erbpacht && <DetailRow label="Erbpacht" value={formatPrice(property.erbpacht, true)} icon={Euro} />}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Areas Section (onOffice only) */}
              {property && (property.wohnflaeche || property.nutzflaeche || property.grundstuecksflaeche || property.balkon_terrasse_flaeche) && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Ruler className="h-6 w-6 text-primary-500" />
                    Flächen
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailRow label="Wohnfläche" value={formatArea(property.wohnflaeche)} icon={Home} />
                    <DetailRow label="Nutzfläche" value={formatArea(property.nutzflaeche)} icon={Warehouse} />
                    <DetailRow label="Grundstücksfläche" value={formatArea(property.grundstuecksflaeche)} icon={Mountain} />
                    <DetailRow label="Gesamtfläche" value={formatArea(property.gesamtflaeche)} icon={Square} />
                    <DetailRow label="Balkon/Terrasse" value={formatArea(property.balkon_terrasse_flaeche)} icon={Sun} />
                    <DetailRow label="Gartenfläche" value={formatArea(property.gartenflaeche)} icon={Trees} />
                    <DetailRow label="Kellerfläche" value={formatArea(property.kellerflaeche)} icon={Warehouse} />
                    {property.teilbar_ab && <DetailRow label="Teilbar ab" value={formatArea(property.teilbar_ab)} icon={Ruler} />}
                  </div>
                </div>
              )}

              {/* Description */}
              {(property?.objektbeschreibung || fallbackProperty?.objektbeschreibung || fallbackProperty?.beschreibung) && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Beschreibung
                  </h2>
                  <div className="text-gray-600 leading-relaxed">
                    {renderDescription(property?.objektbeschreibung || fallbackProperty?.objektbeschreibung || fallbackProperty?.beschreibung || '')}
                  </div>
                </div>
              )}

              {/* Location Description */}
              {(property?.lage || fallbackProperty?.lage) && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Lage
                  </h2>
                  <div className="text-gray-600 leading-relaxed">
                    {renderDescription(property?.lage || fallbackProperty?.lage || '')}
                  </div>
                </div>
              )}

              {/* Equipment Description */}
              {(property?.ausstattung_beschr || fallbackProperty?.ausstattung) && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Ausstattung
                  </h2>
                  <div className="text-gray-600 leading-relaxed">
                    {renderDescription(property?.ausstattung_beschr || fallbackProperty?.ausstattung || '')}
                  </div>
                </div>
              )}

              {/* Features/Amenities (onOffice boolean fields) */}
              {property && (
                property.einbaukueche || property.fahrstuhl || property.keller || property.balkon_terrasse_flaeche ||
                property.gartennutzung || property.kamin || property.sauna || property.swimmingpool ||
                property.klimaanlage || property.barrierefrei || property.gaestewc || property.moebiliert
              ) && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary-500" />
                    Merkmale
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <FeatureBadge icon={ChefHat} label="Einbauküche" available={property.einbaukueche} />
                    <FeatureBadge icon={Building} label="Fahrstuhl" available={property.fahrstuhl} />
                    <FeatureBadge icon={Warehouse} label="Keller" available={property.keller} />
                    <FeatureBadge icon={Sun} label="Balkon/Terrasse" available={(property.anzahl_balkone || 0) > 0 || (property.anzahl_terrassen || 0) > 0} />
                    <FeatureBadge icon={Trees} label="Gartennutzung" available={property.gartennutzung} />
                    <FeatureBadge icon={Flame} label="Kamin" available={property.kamin} />
                    <FeatureBadge icon={Droplets} label="Sauna" available={property.sauna} />
                    <FeatureBadge icon={Droplets} label="Pool" available={property.swimmingpool} />
                    <FeatureBadge icon={Snowflake} label="Klimaanlage" available={property.klimaanlage} />
                    <FeatureBadge icon={Accessibility} label="Barrierefrei" available={property.barrierefrei} />
                    <FeatureBadge icon={Accessibility} label="Seniorengerecht" available={property.seniorengerecht} />
                    <FeatureBadge icon={DoorOpen} label="Gäste-WC" available={property.gaestewc} />
                    <FeatureBadge icon={Sofa} label="Möbliert" available={property.moebiliert} />
                    <FeatureBadge icon={PawPrint} label="Haustiere erlaubt" available={property.haustiere} />
                    <FeatureBadge icon={Sun} label="Wintergarten" available={property.wintergarten} />
                    <FeatureBadge icon={Building} label="Dachboden" available={property.dachboden} />
                    <FeatureBadge icon={Shield} label="Denkmalschutz" available={property.denkmalschutzobjekt} />
                  </div>
                </div>
              )}

              {/* Building Details (onOffice only) */}
              {property && (property.zustand || property.bauart || property.dachform || property.bodenbelag || property.letzte_modernisierung) && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Building className="h-6 w-6 text-primary-500" />
                    Gebäudedetails
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailRow label="Zustand" value={getZustandLabel(property.zustand)} icon={CheckCircle} />
                    <DetailRow label="Bauart" value={property.bauart} icon={Building} />
                    <DetailRow label="Dachform" value={property.dachform} icon={Home} />
                    <DetailRow label="Bodenbelag" value={property.bodenbelag} icon={Layers} />
                    <DetailRow label="Ausbaustufe" value={property.ausbaustufe} icon={Building} />
                    <DetailRow label="Letzte Modernisierung" value={property.letzte_modernisierung} icon={Calendar} />
                    {property.anzahl_wohneinheiten && <DetailRow label="Wohneinheiten" value={property.anzahl_wohneinheiten} icon={Home} />}
                    {property.anzahl_gewerbeeinheiten && <DetailRow label="Gewerbeeinheiten" value={property.anzahl_gewerbeeinheiten} icon={Building} />}
                  </div>
                </div>
              )}

              {/* Energy Info */}
              {(property?.energieausweistyp || property?.energieeffizienzklasse || property?.heizungsart ||
                fallbackProperty?.energieausweis || fallbackProperty?.energieeffizienzklasse || fallbackProperty?.heizung) && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary-500" />
                    Energiedaten
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property ? (
                      <>
                        <DetailRow label="Energieausweistyp" value={property.energieausweistyp} icon={FileText} />
                        <DetailRow label="Energieeffizienzklasse" value={property.energieeffizienzklasse} icon={Zap} />
                        <DetailRow label="Endenergiebedarf" value={property.endenergiebedarf ? `${property.endenergiebedarf} kWh/(m²·a)` : undefined} icon={Zap} />
                        <DetailRow label="Energieverbrauchskennwert" value={property.energieverbrauchskennwert ? `${property.energieverbrauchskennwert} kWh/(m²·a)` : undefined} icon={Zap} />
                        <DetailRow label="Primärenergieträger" value={property.primaerenergietraeger} icon={Flame} />
                        <DetailRow label="Heizungsart" value={getHeizungsartLabel(property.heizungsart)} icon={Thermometer} />
                        <DetailRow label="Befeuerung" value={getBefeuerungLabel(property.befeuerung)} icon={Flame} />
                        <DetailRow label="Baujahr Heizung" value={property.baujahr_heizung} icon={Calendar} />
                        <DetailRow label="Energieausweis gültig bis" value={property.energiepass_gueltig_bis} icon={Calendar} />
                      </>
                    ) : (
                      <>
                        <DetailRow label="Energieausweis" value={fallbackProperty?.energieausweis} icon={FileText} />
                        <DetailRow label="Energieeffizienzklasse" value={fallbackProperty?.energieeffizienzklasse} icon={Zap} />
                        <DetailRow label="Heizung" value={fallbackProperty?.heizung} icon={Thermometer} />
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Investment Info (onOffice only) */}
              {property && (property.mieteinnahmen_ist || property.mieteinnahmen_soll || property.rendite || property.x_fache) && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Euro className="h-6 w-6 text-primary-500" />
                    Kapitalanlage
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailRow label="Mieteinnahmen (Ist)" value={formatPrice(property.mieteinnahmen_ist, true)} icon={Euro} />
                    <DetailRow label="Mieteinnahmen (Soll)" value={formatPrice(property.mieteinnahmen_soll, true)} icon={Euro} />
                    <DetailRow label="Rendite" value={property.rendite ? `${property.rendite}%` : undefined} icon={Zap} />
                    <DetailRow label="X-Fache" value={property.x_fache} icon={Euro} />
                  </div>
                </div>
              )}

              {/* Availability (onOffice only) */}
              {property?.verfuegbar_ab && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="h-6 w-6 text-primary-500" />
                    Verfügbarkeit
                  </h2>
                  <p className="text-gray-600">
                    <span className="font-medium">Verfügbar ab:</span> {property.verfuegbar_ab}
                  </p>
                  {property.min_mietdauer && (
                    <p className="text-gray-600 mt-2">
                      <span className="font-medium">Mindestmietdauer:</span> {property.min_mietdauer}
                    </p>
                  )}
                </div>
              )}

              {/* Map */}
              <PropertyMap
                address={address}
                city={property?.ort || fallbackProperty?.ort || ''}
                plz={property?.plz || fallbackProperty?.plz}
                region={property?.region || fallbackProperty?.region}
                lat={property?.breitengrad}
                lng={property?.laengengrad}
              />

              {/* 3D Virtual Tour Embed */}
              {property?.virtualTourUrl && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <svg className="h-6 w-6 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9" />
                    </svg>
                    3D-Rundgang
                  </h2>
                  <div className="rounded-xl overflow-hidden aspect-video bg-gray-100">
                    <iframe
                      src={property.virtualTourUrl}
                      className="w-full h-full border-0"
                      title={`3D-Rundgang: ${title}`}
                      allowFullScreen
                      loading="lazy"
                      allow="xr-spatial-tracking; gyroscope; accelerometer"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Nutzen Sie die Maus oder Ihr Gerät um sich umzuschauen</p>
                    <a
                      href={property.virtualTourUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 font-medium text-sm hover:text-primary-600 transition-colors"
                    >
                      Im Vollbild öffnen →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Contact Form */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Interesse an dieser Immobilie?
                  </h3>
                  <PropertyInquiryForm
                    propertyId={propertyExposeId}
                    propertyTitle={title}
                  />
                </div>

                {/* 3D Virtual Tour */}
                {property?.virtualTourUrl && (
                  <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 rounded-xl shadow-lg text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold">3D-Rundgang</h3>
                    </div>
                    <p className="text-white/80 text-sm mb-4">
                      Erkunden Sie diese Immobilie virtuell in einer interaktiven 360°-Tour.
                    </p>
                    <a
                      href={property.virtualTourUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full gap-2 bg-white text-primary-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Rundgang starten
                    </a>
                  </div>
                )}

                {/* Booking Link */}
                {property?.bookingUrl && (
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Besichtigung buchen</h3>
                    <p className="text-sm text-gray-500 mb-4">Vereinbaren Sie einen persönlichen Besichtigungstermin.</p>
                    <a
                      href={property.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full gap-2 bg-primary-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <Calendar className="h-5 w-5" />
                      Termin vereinbaren
                    </a>
                  </div>
                )}

                {/* Agent Info */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Ihr Ansprechpartner
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{agent.name}</p>
                      <p className="text-sm text-gray-500">{agent.title}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`tel:${agent.phone1.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>{agent.phone1}</span>
                    </a>
                    <a
                      href={`tel:${agent.phone2.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>{agent.phone2}</span>
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span>{agent.email}</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
