# Mezzarano Immobilien Website 

Eine moderne, responsive Website für Mezzarano Immobilien - gebaut mit Next.js 14, TypeScript und Tailwind CSS.

## Features

- **Homepage** mit Hero-Bereich, Such-Widget, Featured Properties, Services und Testimonials
- **Immobilien-Seite** mit Filter- und Sortierfunktionen
- **Immobilien-Detailseite** mit Bildergalerie, Features und Kontaktformular
- **Über uns-Seite** mit Firmengeschichte, Team und Meilensteinen
- **Kontakt-Seite** mit Kontaktformular und FAQ
- **Responsive Design** für alle Bildschirmgrößen
- **SEO-optimiert** mit Meta-Tags und semantischem HTML

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Fonts:** Inter & Playfair Display (Google Fonts)

## Installation

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktion build erstellen
npm run build

# Produktion server starten
npm start
```

## Projektstruktur

```
src/
├── app/
│   ├── layout.tsx          # Root Layout mit Header/Footer
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Globale Styles
│   ├── immobilien/
│   │   ├── page.tsx        # Immobilien-Übersicht
│   │   └── [id]/page.tsx   # Immobilien-Detailseite
│   ├── ueber-uns/
│   │   └── page.tsx        # Über uns Seite
│   └── kontakt/
│       └── page.tsx        # Kontakt Seite
├── components/
│   ├── Header.tsx          # Navigation Header
│   ├── Footer.tsx          # Footer
│   └── PropertyCard.tsx    # Immobilien-Karte
└── data/
    └── properties.ts       # Immobilien-Daten
```

## Anpassung

### Firmendetails ändern
- Kontaktinformationen in `Header.tsx` und `Footer.tsx` aktualisieren
- E-Mail und Telefonnummer in den Komponenten anpassen

### Immobilien hinzufügen
- Neue Immobilien in `src/data/properties.ts` hinzufügen
- Bilder können von Unsplash oder eigenem CDN verwendet werden

### Farbschema anpassen
- Farben in `tailwind.config.ts` konfigurieren
- Primary (Blau) und Gold Farben sind vordefiniert

## Lizenz

Privat - Alle Rechte vorbehalten
