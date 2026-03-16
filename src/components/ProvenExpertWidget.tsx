'use client'

import Script from 'next/script'

export default function ProvenExpertWidget() {
  return (
    <div className="mt-8 flex justify-center" data-aos="fade-up" data-aos-delay="300">
      <div id="pewl" />
      <Script
        src="https://www.provenexpert.com/widget/landing_mezzarano-sandro.js?feedback=1&avatar=0&competence=1&language=de-de&style=white"
        strategy="lazyOnload"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://www.provenexpert.com/css/widget_landing.css"
        media="screen,print"
      />
    </div>
  )
}
