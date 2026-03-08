/**
 * Test script for onOffice API connection
 * Usage: node scripts/test-onoffice.js
 */

const crypto = require('crypto')

const ONOFFICE_API_URL = 'https://api.onoffice.de/api/stable/api.php'

const TOKEN = 'b035fdc742fd891a570142df46775fc4'
const SECRET = '650d69a88044953fd0062cd07b1b6911a3f993c8ae174c729788c4baf7d83236'

function generateHMAC(timestamp, token, resourcetype, actionid, secret) {
  const message = `${timestamp}${token}${resourcetype}${actionid}`
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(message)
  return hmac.digest('base64')
}

async function testConnection() {
  console.log('=== onOffice API Test ===\n')

  const timestamp = Math.floor(Date.now() / 1000)
  const actionid = 'urn:onoffice-de-ns:smart:2.5:smartml:action:get'
  const resourcetype = 'fields'

  console.log('1. Testing API connection with fields query...\n')

  const hmac = generateHMAC(timestamp, TOKEN, resourcetype, actionid, SECRET)

  const payload = {
    token: TOKEN,
    request: {
      actions: [
        {
          actionid,
          resourceid: '',
          resourcetype,
          identifier: 'test_connection',
          timestamp,
          hmac,
          hmac_version: '2',
          parameters: {
            modules: ['address'],
            labels: true
          }
        }
      ]
    }
  }

  try {
    const response = await fetch(ONOFFICE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (result.status?.code === 200) {
      console.log('✓ API Connection successful!\n')
      console.log('Status:', result.status.message)

      const actionResult = result.response?.results?.[0]
      if (actionResult) {
        console.log('Action Status:', actionResult.status?.message)
        console.log('Error Code:', actionResult.status?.errorcode)

        if (actionResult.status?.errorcode === 0) {
          console.log('\n✓ Authentication working correctly!')
          const fieldCount = Object.keys(actionResult.data?.records?.[0]?.elements || {}).length
          console.log(`Found ${fieldCount} address fields in onOffice.\n`)
        }
      }
    } else {
      console.log('✗ API Error:', result.status?.message)
    }

    return result
  } catch (error) {
    console.error('✗ Connection Error:', error.message)
    return null
  }
}

async function testCreateContact() {
  console.log('\n2. Testing contact creation...\n')

  const timestamp = Math.floor(Date.now() / 1000)
  const actionid = 'urn:onoffice-de-ns:smart:2.5:smartml:action:create'
  const resourcetype = 'address'

  const hmac = generateHMAC(timestamp, TOKEN, resourcetype, actionid, SECRET)

  const payload = {
    token: TOKEN,
    request: {
      actions: [
        {
          actionid,
          resourceid: '',
          resourcetype,
          identifier: 'test_create_contact',
          timestamp,
          hmac,
          hmac_version: '2',
          parameters: {
            data: {
              Vorname: 'Test',
              Name: 'Website-Integration',
              Email: 'test@mezzarano-website.de',
              Telefon1: '0177 1234567',
              HerkunftKontakt: ['Website Anfrage'],
              Bemerkung: 'Dies ist ein Testdatensatz der Website-Integration. Kann geloescht werden.',
              Status: 1
            }
          }
        }
      ]
    }
  }

  try {
    const response = await fetch(ONOFFICE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    const actionResult = result.response?.results?.[0]

    if (actionResult?.status?.errorcode === 0) {
      const addressId = actionResult.data?.records?.[0]?.id
      console.log('✓ Test contact created successfully!')
      console.log('  Address ID:', addressId)
      console.log('  Name: Test Website-Integration')
      console.log('  Email: test@mezzarano-website.de')
      console.log('\n  → Dieser Testdatensatz kann in onOffice geloescht werden.')
      return addressId
    } else {
      console.log('✗ Contact creation failed:', actionResult?.status?.message)
      console.log('  Error code:', actionResult?.status?.errorcode)
      return null
    }
  } catch (error) {
    console.error('✗ Error:', error.message)
    return null
  }
}

async function main() {
  console.log('Timestamp:', Math.floor(Date.now() / 1000))
  console.log('Token:', TOKEN.substring(0, 8) + '...')
  console.log('')

  // Test 1: Connection
  const connectionResult = await testConnection()

  if (connectionResult?.status?.code === 200) {
    // Test 2: Create contact
    await testCreateContact()
  }

  console.log('\n=== Test Complete ===')
}

main()
