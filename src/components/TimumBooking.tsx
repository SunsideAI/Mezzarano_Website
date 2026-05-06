'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { Calendar } from 'lucide-react'

export default function TimumBooking() {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="section-title mb-4">Termin vereinbaren</h2>
          <p className="section-subtitle mx-auto">
            Buchen Sie jetzt Ihren persönlichen Beratungstermin – kostenlos und unverbindlich
          </p>
        </div>

        <div
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Timum Widget Container */}
          <div id="timumContainer-25be7b95-a536-417f-96d6-5304e687a679" className="min-h-[400px]" />

          {/* Timum Script */}
          <Script
            src="https://www.timum.de/b21b2523-c2c3-4345-9767-34b08af1e30c/25be7b95-a536-417f-96d6-5304e687a679/widget.js"
            type="module"
            strategy="lazyOnload"
          />
        </div>

        <div className="text-center mt-8" data-aos="fade-up" data-aos-delay="200">
          <p className="text-gray-500 text-sm">
            Oder rufen Sie mich direkt an:{' '}
            <a href="tel:01776542977" className="text-wuestenrot hover:underline font-semibold">
              0177 6542977
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
