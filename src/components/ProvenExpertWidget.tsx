'use client'

import Script from 'next/script'

export default function ProvenExpertWidget() {
  return (
    <>
      {/* ProvenExpert Bewertungssiegel - Links positioniert, versteckt auf Mobile */}
      <a
        id="ProvenExpert_widget_container"
        href="https://www.provenexpert.com/mezzarano-sandro/?utm_source=Widget&utm_medium=Widget&utm_campaign=Widget"
        title="Kundenbewertungen & Erfahrungen zu Mezzarano Sandro. Mehr Infos anzeigen."
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:block"
        style={{
          textDecoration: 'none',
          transition: 'none',
          zIndex: 9999,
          position: 'fixed',
          lineHeight: 0,
          left: 0,
          bottom: 20,
        }}
      >
        <img
          src="https://images.provenexpert.com/9b/a8/af4104cbc649ed6d9563682a8ecd/widget_portrait_180_de_0.png"
          alt="Erfahrungen & Bewertungen zu Mezzarano Sandro"
          width={180}
          height={216}
          style={{ border: 0 }}
        />
        <span
          id="ProvenExpert_slider_feedback"
          style={{
            position: 'absolute',
            padding: '38px 0 48px 0',
            top: 0,
            right: -180,
          }}
        />
      </a>
      <Script
        src="//www.provenexpert.com/slider_mezzarano-sandro.js?sk=p_180"
        strategy="lazyOnload"
      />
    </>
  )
}
