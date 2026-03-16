'use client'

export default function ProvenExpertWidget() {
  return (
    <>
      {/* ProvenExpert Bewertungssiegel - Links unten, versteckt auf Mobile */}
      <a
        href="https://www.provenexpert.com/mezzarano-sandro/?utm_source=Widget&utm_medium=Widget&utm_campaign=Widget"
        title="Kundenbewertungen & Erfahrungen zu Mezzarano Sandro. Mehr Infos anzeigen."
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:block fixed left-4 bottom-4 z-50 hover:scale-105 transition-transform"
      >
        <img
          src="https://images.provenexpert.com/9b/a8/af4104cbc649ed6d9563682a8ecd/widget_portrait_90_de_0.png"
          alt="Erfahrungen & Bewertungen zu Mezzarano Sandro"
          width={90}
          height={108}
          className="rounded shadow-lg w-16 h-auto"
        />
      </a>
    </>
  )
}
