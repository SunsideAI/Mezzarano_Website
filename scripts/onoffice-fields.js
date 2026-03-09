#!/usr/bin/env node
/**
 * Fetch available fields from onOffice API
 *
 * Usage:
 *   node scripts/onoffice-fields.js
 *   node scripts/onoffice-fields.js --json > fields.json
 *   node scripts/onoffice-fields.js estate    (only estate fields)
 *   node scripts/onoffice-fields.js address   (only address fields)
 */

const crypto = require('crypto')

const ONOFFICE_API_URL = 'https://api.onoffice.de/api/stable/api.php'

const TOKEN = process.env.ONOFFICE_TOKEN || 'b035fdc742fd891a570142df46775fc4'
const SECRET = process.env.ONOFFICE_SECRET || '650d69a88044953fd0062cd07b1b6911a3f993c8ae174c729788c4baf7d83236'

function generateHMAC(timestamp, token, resourcetype, actionid, secret) {
  const message = `${timestamp}${token}${resourcetype}${actionid}`
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(message)
  return hmac.digest('base64')
}

async function fetchFields(modules = ['estate', 'address']) {
  const timestamp = Math.floor(Date.now() / 1000)
  const actionid = 'urn:onoffice-de-ns:smart:2.5:smartml:action:get'
  const resourcetype = 'fields'

  const hmac = generateHMAC(timestamp, TOKEN, resourcetype, actionid, SECRET)

  const payload = {
    token: TOKEN,
    request: {
      actions: [{
        actionid,
        resourceid: '',
        resourcetype,
        identifier: 'get_fields',
        timestamp,
        hmac,
        hmac_version: '2',
        parameters: {
          modules,
          labels: true,
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
      return null
    }

    const actionResult = result.response?.results?.[0]

    if (actionResult?.status?.errorcode !== 0) {
      console.error('Action Error:', actionResult?.status?.message)
      return null
    }

    return actionResult.data?.records?.[0]?.elements || {}

  } catch (error) {
    console.error('Error:', error.message)
    return null
  }
}

async function main() {
  const args = process.argv.slice(2)
  const jsonOutput = args.includes('--json')
  const rawOutput = args.includes('--raw')
  const jsonIndex = args.indexOf('--json')
  if (jsonIndex > -1) args.splice(jsonIndex, 1)
  const rawIndex = args.indexOf('--raw')
  if (rawIndex > -1) args.splice(rawIndex, 1)

  // Determine which modules to fetch
  let modules = ['estate']
  if (args.length > 0 && !args[0].startsWith('-')) {
    modules = [args[0]]
  }

  if (!jsonOutput && !rawOutput) {
    console.log('=== onOffice Field Explorer ===\n')
    console.log('Token:', TOKEN.substring(0, 8) + '...')
    console.log('Modules:', modules.join(', '))
    console.log('')
  }

  const fields = await fetchFields(modules)

  if (!fields) {
    console.error('Failed to fetch fields')
    process.exit(1)
  }

  // Raw output for debugging
  if (rawOutput || jsonOutput) {
    console.log(JSON.stringify(fields, null, 2))
    return
  }

  // Display fields by module
  for (const [module, moduleFields] of Object.entries(fields)) {
    // Skip non-object entries
    if (!moduleFields || typeof moduleFields !== 'object') {
      console.log(`Skipping ${module}: not an object`)
      continue
    }

    console.log('='.repeat(80))
    console.log(`MODULE: ${module.toUpperCase()}`)
    console.log('='.repeat(80))

    const fieldEntries = Object.entries(moduleFields)
    console.log(`\nTotal fields: ${fieldEntries.length}\n`)

    // Group by type if available
    const byType = {}

    for (const [fieldName, fieldInfo] of fieldEntries) {
      // Skip null/undefined entries
      if (!fieldInfo || typeof fieldInfo !== 'object') {
        continue
      }
      const type = fieldInfo.type || 'unknown'
      if (!byType[type]) byType[type] = []
      byType[type].push({ name: fieldName, ...fieldInfo })
    }

    // Print grouped
    for (const [type, typeFields] of Object.entries(byType).sort()) {
      console.log(`\n--- ${type.toUpperCase()} (${typeFields.length}) ---`)

      for (const field of typeFields.sort((a, b) => String(a.name).localeCompare(String(b.name)))) {
        const label = field.label || ''
        const permittedValues = field.permittedvalues
          ? ` [${Object.keys(field.permittedvalues).slice(0, 5).join(', ')}${Object.keys(field.permittedvalues).length > 5 ? '...' : ''}]`
          : ''

        console.log(`  ${field.name}`)
        if (label) console.log(`    Label: ${label}`)
        if (permittedValues) console.log(`    Values:${permittedValues}`)
      }
    }

    // Print simple list for this module
    const validFields = fieldEntries
      .filter(([_, info]) => info && typeof info === 'object')
      .map(([name]) => name)
      .sort()

    if (validFields.length > 0) {
      console.log(`\n--- COPY-PASTE LIST for ${module} (${validFields.length} fields) ---`)
      console.log(`const ${module.toUpperCase()}_FIELDS = [`)
      for (const field of validFields) {
        console.log(`  '${field}',`)
      }
      console.log(']')
    }

    console.log('')
  }
}

main()
