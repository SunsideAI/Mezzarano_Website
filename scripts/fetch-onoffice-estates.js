#!/usr/bin/env node
/**
 * Fetch all estates from onOffice CRM
 *
 * Usage:
 *   node scripts/fetch-onoffice-estates.js
 *   node scripts/fetch-onoffice-estates.js --json > estates.json
 *   node scripts/fetch-onoffice-estates.js --all   (include archived)
 *
 * Outputs all properties with full details.
 */

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const ONOFFICE_API_URL = 'https://api.onoffice.de/api/stable/api.php'

const TOKEN = process.env.ONOFFICE_TOKEN || 'b035fdc742fd891a570142df46775fc4'
const SECRET = process.env.ONOFFICE_SECRET || '650d69a88044953fd0062cd07b1b6911a3f993c8ae174c729788c4baf7d83236'

// Minimal fields - should always work
const MINIMAL_FIELDS = [
  'Id',
  'objekttitel',
  'objektnr_extern',
  'vermarktungsart',
  'objektart',
  'status',
  'kaufpreis',
  'kaltmiete',
  'plz',
  'ort',
  'wohnflaeche',
  'anzahl_zimmer',
]

// Conservative estate fields - only standard fields that should exist
const ESTATE_FIELDS = [
  // IDs
  'Id',
  'objektnr_extern',

  // Title & Description
  'objekttitel',
  'objektbeschreibung',
  'lage',

  // Classification
  'vermarktungsart',
  'objektart',
  'nutzungsart',
  'status',

  // Location
  'strasse',
  'hausnummer',
  'plz',
  'ort',
  'land',

  // Prices
  'kaufpreis',
  'kaltmiete',
  'warmmiete',
  'nebenkosten',

  // Areas
  'wohnflaeche',
  'nutzflaeche',
  'grundstuecksflaeche',

  // Rooms
  'anzahl_zimmer',
  'anzahl_schlafzimmer',
  'anzahl_badezimmer',
  'anzahl_balkone',
  'anzahl_terrassen',

  // Parking
  'anzahl_garagen',
  'anzahl_stellplaetze',

  // Building
  'baujahr',
  'objektzustand',

  // Energy
  'energieausweistyp',
  'heizungsart',

  // Dates
  'erstellt_am',
  'geaendert_am',
]

function generateHMAC(timestamp, token, resourcetype, actionid, secret) {
  const message = `${timestamp}${token}${resourcetype}${actionid}`
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(message)
  return hmac.digest('base64')
}

async function fetchAllEstates(includeArchived = false, useMinimalFields = false) {
  const allEstates = []
  let offset = 0
  const limit = 100
  let total = 0
  let retryWithMinimal = false

  const actionid = 'urn:onoffice-de-ns:smart:2.5:smartml:action:read'
  const resourcetype = 'estate'

  const fieldsToUse = useMinimalFields ? MINIMAL_FIELDS : ESTATE_FIELDS

  console.error('Fetching estates from onOffice...\n')
  if (useMinimalFields) {
    console.error('(Using minimal field set)\n')
  }

  do {
    const timestamp = Math.floor(Date.now() / 1000)
    const hmac = generateHMAC(timestamp, TOKEN, resourcetype, actionid, SECRET)

    const filter = {}
    if (!includeArchived) {
      filter.status = [{ op: '=', val: 1 }]
    }

    const payload = {
      token: TOKEN,
      request: {
        actions: [{
          actionid,
          resourceid: '',
          resourcetype,
          identifier: 'fetch_all_estates',
          timestamp,
          hmac,
          hmac_version: '2',
          parameters: {
            data: fieldsToUse,
            listlimit: limit,
            listoffset: offset,
            filter: Object.keys(filter).length > 0 ? filter : undefined,
          },
        }],
      },
    }

    try {
      const response = await fetch(ONOFFICE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (result.status?.code !== 200) {
        console.error('API Error:', result.status?.message)

        // If we get "Unknown field" error and haven't tried minimal yet, retry
        if (result.status?.message?.includes('Unknown field') && !useMinimalFields) {
          console.error('\nRetrying with minimal fields...\n')
          return fetchAllEstates(includeArchived, true)
        }
        break
      }

      const actionResult = result.response?.results?.[0]

      if (actionResult?.status?.errorcode !== 0) {
        console.error('Action Error:', actionResult?.status?.message)

        // If we get field error and haven't tried minimal yet, retry
        if (actionResult?.status?.message?.includes('field') && !useMinimalFields) {
          console.error('\nRetrying with minimal fields...\n')
          return fetchAllEstates(includeArchived, true)
        }
        break
      }

      total = actionResult.data?.meta?.cntabsolute || 0
      const records = actionResult.data?.records || []

      for (const record of records) {
        allEstates.push({
          id: record.id,
          ...record.elements,
        })
      }

      console.error(`Fetched ${allEstates.length} / ${total} estates...`)

      offset += limit

    } catch (error) {
      console.error('Error:', error.message)
      break
    }

  } while (offset < total)

  return { estates: allEstates, total }
}

async function main() {
  const args = process.argv.slice(2)
  const jsonOutput = args.includes('--json')
  const includeArchived = args.includes('--all')

  if (!jsonOutput) {
    console.error('=== onOffice Estate Fetcher ===\n')
    console.error('Token:', TOKEN.substring(0, 8) + '...')
    console.error('Include archived:', includeArchived ? 'Yes' : 'No (only status=1)')
    console.error('')
  }

  const { estates, total } = await fetchAllEstates(includeArchived)

  if (jsonOutput) {
    // Output clean JSON to stdout
    console.log(JSON.stringify(estates, null, 2))
  } else {
    console.error(`\n✓ Fetched ${estates.length} estates (total in DB: ${total})\n`)

    if (estates.length === 0) {
      console.log('\n⚠️  Keine Immobilien gefunden!')
      console.log('\nMögliche Ursachen:')
      console.log('- Keine Immobilien im onOffice-Account')
      console.log('- Immobilien haben status != 1 (verwende --all für alle)')
      console.log('- API-Benutzer hat keine Leserechte')
      return
    }

    // Print detailed list
    console.log('='.repeat(80))
    console.log('IMMOBILIEN ÜBERSICHT')
    console.log('='.repeat(80))

    estates.forEach((e, i) => {
      console.log(`\n[${i + 1}] ${e.objekttitel || 'Kein Titel'}`)
      console.log('-'.repeat(60))
      console.log(`ID:         ${e.Id}`)
      console.log(`Expose-Nr:  ${e.objektnr_extern || 'N/A'}`)
      console.log(`Status:     ${e.status} ${e.status === '1' || e.status === 1 ? '(Aktiv)' : '(Inaktiv)'}`)
      console.log(`Typ:        ${e.vermarktungsart} | ${e.objektart} | ${e.objekttyp || '-'}`)
      console.log(`Adresse:    ${e.strasse || ''} ${e.hausnummer || ''}, ${e.plz || ''} ${e.ort || ''}`)

      if (e.vermarktungsart === 'kauf' || e.vermarktungsart === 'Kauf') {
        console.log(`Kaufpreis:  ${e.kaufpreis ? Number(e.kaufpreis).toLocaleString('de-DE') + ' €' : 'N/A'}`)
      } else {
        console.log(`Kaltmiete:  ${e.kaltmiete ? Number(e.kaltmiete).toLocaleString('de-DE') + ' €' : 'N/A'}`)
        console.log(`Warmmiete:  ${e.warmmiete ? Number(e.warmmiete).toLocaleString('de-DE') + ' €' : 'N/A'}`)
      }

      console.log(`Fläche:     ${e.wohnflaeche || '-'} m² Wohnfläche | ${e.grundstuecksflaeche || '-'} m² Grundstück`)
      console.log(`Zimmer:     ${e.anzahl_zimmer || '-'} | Schlafzimmer: ${e.anzahl_schlafzimmer || '-'} | Bäder: ${e.anzahl_badezimmer || '-'}`)
      console.log(`Baujahr:    ${e.baujahr || 'N/A'}`)
      console.log(`Energie:    ${e.energieausweistyp || '-'} | ${e.heizungsart || '-'}`)
      console.log(`Aktualisiert: ${e.geaendert_am || 'N/A'}`)

      if (e.objektbeschreibung) {
        const desc = e.objektbeschreibung.substring(0, 200).replace(/\n/g, ' ')
        console.log(`Beschreibung: ${desc}${e.objektbeschreibung.length > 200 ? '...' : ''}`)
      }
    })

    console.log('\n' + '='.repeat(80))
    console.log(`GESAMT: ${estates.length} Immobilien`)
    console.log('='.repeat(80))

    // Summary by status
    const statusCounts = {}
    estates.forEach(e => {
      const status = e.status || 'unbekannt'
      statusCounts[status] = (statusCounts[status] || 0) + 1
    })
    console.log('\nNach Status:')
    Object.entries(statusCounts).forEach(([status, count]) => {
      const label = status === '1' || status === 1 ? 'Aktiv' : status === '0' || status === 0 ? 'Archiviert' : status
      console.log(`  ${label}: ${count}`)
    })

    // Summary by type
    const typeCounts = {}
    estates.forEach(e => {
      const type = e.vermarktungsart || 'unbekannt'
      typeCounts[type] = (typeCounts[type] || 0) + 1
    })
    console.log('\nNach Vermarktungsart:')
    Object.entries(typeCounts).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`)
    })

    // Save to file option
    console.log('\n💡 Tipp: Für JSON-Export verwenden Sie:')
    console.log('   node scripts/fetch-onoffice-estates.js --json > estates.json')
    console.log('   node scripts/fetch-onoffice-estates.js --all --json > all-estates.json')
  }
}

main()
