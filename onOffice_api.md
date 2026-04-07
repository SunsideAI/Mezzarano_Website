# onOffice API – Technische Referenzdokumentation

> Stand: März 2026 | Quelle: [apidoc.onoffice.de](https://apidoc.onoffice.de)

---

## 1. Übersicht & Verfügbarkeit

Die onOffice API ermöglicht lesenden und schreibenden Zugriff auf alle großen Module von onOffice enterprise (Immobilien, Adressen, Aufgaben, Kalender). Sie dient der Anbindung externer Anwendungen und bildet die technische Grundlage des gesamten onOffice Marketplace.

- **Verfügbarkeit:** Kostenpflichtiges Modul, nur für enterprise-Kunden
- **Support:** [apisupport@onoffice.de](mailto:apisupport@onoffice.de)
- **SDK (GitHub):** https://github.com/onOfficeGmbH/sdk
- **Online API-Client (Test):** https://tools.onofficeweb.com/api-client/
- **Vollständige Dokumentation:** https://apidoc.onoffice.de

---

## 2. API-Endpunkte

### Basis-URLs

| Version | URL |
|---------|-----|
| **Stable** (monatlich, empfohlen) | `https://api.onoffice.de/api/stable/api.php` |
| **Latest** (2x/Woche) | `https://api.onoffice.de/api/latest/api.php` |

### Versionierung

- `stable` wird monatlich am **ersten Dienstag** des Monats aktualisiert → empfohlen für Produktivsysteme
- `latest` wird **2x wöchentlich** aktualisiert und wird am ersten Dienstag des Folgemonats zu `stable`
- **Live-Clients** werden automatisch auf `stable` umgeleitet, **Beta-Clients** auf `latest`
- Alle Requests erfolgen per **HTTP POST**

---

## 3. Authentifizierung

### API-Benutzer anlegen

Pfad in onOffice enterprise: **Extras → Einstellungen → Benutzer → API-Benutzer**

- Nach Anlage werden **Token** (32 Zeichen) und **Secret** (64 Zeichen) generiert
- Das Secret wird **nur einmal** angezeigt – sofort sichern!
- Bei Kompromittierung: Token und Secret sofort neu generieren und Code anpassen
- Benutzerrechte sind granular einstellbar (Lesen/Schreiben/Löschen pro Modul)
- Das API-Modul ist kostenpflichtig; bei vollem Benutzerlimit Account Manager kontaktieren

### HMAC-Authentifizierung (Version 2 empfohlen)

Jeder Request muss einen gültigen **HMAC-Hash** und **Timestamp** enthalten. HMAC v2 (`hmac_sha256`) wird dringend empfohlen.

**Berechnung HMAC v2:**

```
timestamp + token + resourcetype + actionid
→ SHA256-HMAC (Secret als Key)
→ Base64-encodierter Binärstring
```

**PHP-Beispiel:**

```php
<?php
$secret = 'dein_secret';

$fields = [
    'timestamp'    => time(),
    'token'        => 'dein_token',
    'resourcetype' => 'estate',
    'actionid'     => 'urn:onoffice-de-ns:smart:2.5:smartml:action:read',
];

$hmac = base64_encode(hash_hmac('sha256', implode('', $fields), $secret, true));
```

**JavaScript-Beispiel:**

```js
async function importSecretKey(rawKey) {
    const encoder = new TextEncoder();
    return window.crypto.subtle.importKey(
        'raw', encoder.encode(rawKey),
        { name: 'HMAC', hash: 'SHA-256' },
        false, ['sign']
    );
}

const params = {
    timestamp:    123456789,
    token:        'dein_token',
    resourcetype: 'estate',
    actionid:     'urn:onoffice-de-ns:smart:2.5:smartml:action:read',
};

const message = params.timestamp + params.token + params.resourcetype + params.actionid;

importSecretKey('dein_secret')
    .then(key => window.crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message)))
    .then(signed => btoa(String.fromCharCode(...new Uint8Array(signed))))
    .then(signature => console.log(signature));
```

**Timestamp-Hinweise:**

- Unix-Timestamp (Sekunden seit 01.01.1970 UTC), z.B. PHP `time()`
- Gültigkeitsfenster: **±120 Sekunden**
- Fehler `timestamp invalid` → Serverzeit prüfen (Zeitzone, Sommer-/Winterzeit)
- Empfohlene PHP-Version: 5.5+, `curl` muss installiert sein

---

## 4. Request-Struktur

### JSON-Aufbau

```json
{
  "token": "dein_token",
  "request": {
    "actions": [
      {
        "actionid":     "urn:onoffice-de-ns:smart:2.5:smartml:action:read",
        "resourceid":   "",
        "resourcetype": "estate",
        "identifier":   "meine_abfrage",
        "timestamp":    1700000000,
        "hmac":         "BASE64_HMAC_HIER",
        "hmac_version": "2",
        "parameters": {
          "data":       ["Id", "kaufpreis", "objekttitel"],
          "listlimit":  20,
          "listoffset": 0,
          "filter": {}
        }
      }
    ]
  }
}
```

### Parameter-Übersicht

| Parameter | Typ | Beschreibung |
|-----------|-----|--------------|
| `token` | String (32) | API-Token des API-Benutzers |
| `actionid` | String (URN) | Typ des API-Calls (read/create/modify/...) |
| `resourcetype` | String | Modul (z.B. `estate`, `address`, `agentslog`) |
| `resourceid` | Integer | Datensatz-ID – leer für Listenabfragen |
| `identifier` | String | Frei wählbare ID zur Identifikation des Requests |
| `timestamp` | Integer | Unix-Timestamp (±120 Sek. Toleranz) |
| `hmac` | String | Base64 SHA256-Hash (HMAC v2 empfohlen) |
| `hmac_version` | String | `"2"` für neue HMAC-Methode |
| `parameters.data` | Array | Feldnamen die gelesen/gesetzt werden sollen |
| `parameters.listlimit` | Integer | Datensätze pro Seite (Default: 20, Max: 500) |
| `parameters.listoffset` | Integer | Offset für Paginierung (0-basiert) |
| `parameters.filter` | Object | Filterbedingungen |
| `extendedclaim` | String | **Pflicht im Marketplace-Kontext** (apiClaim zurückgeben) |

---

## 5. Action IDs

Die Kombination aus `actionid` und `resourcetype` identifiziert jeden API-Call eindeutig.

**URN-Präfix:** `urn:onoffice-de-ns:smart:2.5:smartml:action:`

| Action ID (Kurzform) | Voller Wert | Beschreibung |
|----------------------|-------------|--------------|
| `read` | `...action:read` | Datensatz lesen |
| `create` | `...action:create` | Datensatz anlegen |
| `modify` | `...action:modify` | Datensatz bearbeiten |
| `delete` | `...action:delete` | Datensatz löschen |
| `get` | `...action:get` | Informationen abfragen |
| `do` | `...action:do` | Aktionen ausführen |

**PHP SDK Konstanten:**

```php
onOfficeSDK::ACTION_ID_READ   = 'urn:onoffice-de-ns:smart:2.5:smartml:action:read';
onOfficeSDK::ACTION_ID_CREATE = 'urn:onoffice-de-ns:smart:2.5:smartml:action:create';
onOfficeSDK::ACTION_ID_MODIFY = 'urn:onoffice-de-ns:smart:2.5:smartml:action:modify';
onOfficeSDK::ACTION_ID_GET    = 'urn:onoffice-de-ns:smart:2.5:smartml:action:get';
onOfficeSDK::ACTION_ID_DO     = 'urn:onoffice-de-ns:smart:2.5:smartml:action:do';
onOfficeSDK::ACTION_ID_DELETE = 'urn:onoffice-de-ns:smart:2.5:smartml:action:delete';
```

---

## 6. Module & verfügbare API-Calls

### Immobilien (Estates) — `resourcetype: estate`

| Call | Beschreibung |
|------|-------------|
| Read Estates | Immobilien lesen (mit Filter, listlimit, listoffset) |
| Create Estates | Neue Immobilie anlegen |
| Modify Estates | Immobilien-Felder bearbeiten |
| Do – PDF-Exposé | PDF-Exposé generieren |
| Get – Estate files | Dateien einer Immobilie abrufen |
| Get – Homepage-Bilder | Auf Homepage veröffentlichte Bilder abrufen |
| Modify – Estate Files | Metadaten von Immobiliendateien bearbeiten |
| Delete – Estate Files | Immobiliendateien löschen |
| Get – Estate Filter | Verfügbare Filter abrufen |
| Create – Working List | Arbeitsliste anlegen |
| Get – Selling Price Offer | Kaufpreisangebot abrufen |
| Do – Selling Price Offer | Kaufpreisangebot ausführen |
| Get – Estate Tracking | Tracking-Details abrufen |
| Do – Tracking Account | Tracking-Konto erstellen |
| Get – Estate Categories | Objektkategorien abrufen |
| Get – Quick Search | Schnellsuche (Adresse, Eigentümer, ext. Nr.) |
| Get – Immomatching | Mieter-/Käuferfinder |
| Get – Statistics Widgets | Statistik-Widgets abrufen |

### Adressen (Addresses) — `resourcetype: address`

| Call | Beschreibung |
|------|-------------|
| Read Addresses | Adressen lesen |
| Create Addresses | Neue Adresse anlegen |
| Modify Addresses | Adressfelder bearbeiten |
| Get – Search Addresses | Adresssuche |
| Get – Address files | Adressdateien abrufen |
| Get – Download Address files | Adressdateien herunterladen |
| Delete – Address Files | Adressdateien löschen |
| Get – Address Filter | Verfügbare Filter abrufen |
| Create – Working List | Arbeitsliste anlegen |
| Get – Completion Fields | Vervollständigungsfelder abrufen |
| Do – Send Completion | Adressvervollständigung versenden |
| Do – Newsletter Registration | Newsletter-Anmeldung |
| Get – Select Values | Einzel-/Mehrfachauswahlwerte abrufen |

### Suchkriterien — `resourcetype: searchcriteria`

- Get, Create, Modify, Delete Suchkriterien
- Get – Suchkriterienfelder
- Get – Suche nach passenden Suchkriterien

### Maklerbuch / Aktivitäten — `resourcetype: agentslog`

- Read, Create, Modify Agents log / Activities
- Delete – Agents log Files

### Termine (Appointments) — `resourcetype: appointment`

- Get, Create, Modify, Delete Appointments
- Read Appointments *(deprecated)*
- Do – Terminbestätigung versenden
- Get – Kalenderressourcen
- Get – Termindateien
- Get – Terminkonfliktprüfung

### Aufgaben (Tasks) — `resourcetype: task`

- Read, Create, Modify Tasks
- Delete – Task Files

### Relationen — `resourcetype: relation`

- Get, Create, Modify, Delete Relations
- Relations-Diagramm in der Dokumentation verfügbar

### Dateien & Templates

- Do – Dateiupload (für Estates, Addresses, Tasks, Agentslog)
- Get – Email-/PDF-Exposé-Vorlagen
- Get – Standard-Anhänge (Default Attachments)

### E-Mail

- Do – Send Email
- Get – Email Links *(deprecated)*
- Get – Email Info
- Do – Email Links erstellen
- Get – Mail-Signatur
- Get – E-Mail-Template-Ordner

### Einstellungen (Settings)

- Read – Grundeinstellungen, Impressum
- Get – Gruppen, Benutzer (Liste), User Rights
- Read – Benutzer, Benutzerfoto
- Get – Feldkonfiguration
- Get – Multiselect-Konfiguration
- Get – Aktionsarten und -typen
- Get – Regionen, Regionen-Live-Suche
- Do – Access Control (Datensatzrechte-Stempel)

### Sonstiges (Miscellaneous)

- Read – Zuletzt gesehene Datensätze
- Get – Makro-Auflösung (Estates, Addresses, Appointments, Agentslog)
- Read – Log-Einträge
- Get – Umfragen (Survey)
- Modify – Zeiterfassung (Timetracking)
- Get – Detail-Link-URLs (Estates, Addresses, Aktivitäten)

### Marketplace

- Do – Unlock marketplace provider
- Get – Marketplace invoice recipient
- Do – Cancel subscription
- Do – Generate subsequent payment link
- Do – Refund transaction
- Do – Execute Webhooks

---

## 7. Wichtige Parameter & Feldnamen

### Feldnamen abfragen

- Alle Felder aus **Extras → Einstellungen → Administration → Tab „Eingabefelder"** sind gültig
- Spalte **„field"** liefert den API-Feldnamen – **Groß-/Kleinschreibung beachten!**
- Via API: `actionid: get`, `resourcetype: fields` (Field Configuration Call)
- Für geänderte Adressen filtern: Feld `Aenderung`
- Für geänderte Immobilien filtern: Feld `geaendert_am`

### Einfach- & Mehrfachauswahl-Felder

```json
// Singleselect – einen Wert setzen
"nutzungsart": "Wohnen"

// Singleselect – zurücksetzen
"nutzungsart": ""

// Multiselect – mehrere Werte
"HerkunftKontakt": ["Suchmaschine", "Newsletter"]

// Multiselect – zurücksetzen
"HerkunftKontakt": []
```

> **Hinweis:** Multiselect-Werte werden beim Read-Call mit Pipes ausgegeben (z.B. `|Wert1||Wert2|`). Beim Create/Modify müssen Werte einzeln ohne Pipes übergeben werden.

Werte einsehen: **Extras → Einstellungen → Administration → Tabs „Singleselect" / „Multiselect"**

### Status-Werte

| Modul | Status | API-Wert |
|-------|--------|----------|
| Adressen | Aktiv | `1` |
| Adressen | Archiviert | `0` |
| Immobilien | Aktiv | `1` |
| Immobilien | Inaktiv / Pending | `2` |
| Immobilien | Archiviert | `0` |

> **Hinweis Adressen:** Datensatznummer (ID für API) ≠ Kundennummer – nicht verwechseln!

### JSON-Datentypen

| Typ | Notation |
|-----|----------|
| Null | `null` |
| Boolean | `true` / `false` (keine Anführungszeichen) |
| Zahl | Sequenz aus `0–9`, optional `-`, `.`, Exponent `e`/`E` |
| String | Doppelte Anführungszeichen `"..."`, Unicode-Zeichen erlaubt |
| Array | `[...]` – kommasepariert, geordnet |
| Object | `{...}` – kommasepariert, ungeordnet, Schlüssel eindeutig halten |

---

## 8. Limits & Paginierung

| Parameter | Wert |
|-----------|------|
| Hartes Datensatz-Limit pro Request | **500** |
| `listlimit` Default | 20 |
| `listlimit` Maximum | 500 |
| `listoffset` | Startposition (0-basiert) |

**Caching:**
- Read- und Get-Calls sind cacheable (Response-Parameter `cacheable: true`)
- Das SDK cached diese automatisch, wenn ein Cache-Objekt übergeben wird
- Eigenes Cache-Interface: `onOfficeSDKCache` (GitHub SDK)
- Beispielimplementierung (DB-Cache): onOffice WordPress-Plugin

---

## 9. Relationen

Relationen verknüpfen Datensätze verschiedener Module miteinander. Sie werden **nicht** über Estate- oder Address-Calls gesetzt, sondern über separate Relations-Calls.

- Verfügbar für: Adressen, Immobilien, Aufgaben, Kalender, Projekte, Maklerbuch
- Relationstypen: Mieter, Käufer, Eigentümer, Kontaktperson, Objekteinheiten u.v.m.
- Calls: `Create`, `Modify`, `Delete`, `Get` Relations
- Relations-Diagramm verfügbar unter: https://apidoc.onoffice.de/api-calls-sorted-by-module/relations/relations-diagram/

---

## 10. Marketplace-Integration

Der gesamte onOffice Marketplace basiert auf der API. Externe Dienstleister können Services direkt in onOffice enterprise einbinden.

### Ablauf

1. Kunde aktiviert den Service im Marketplace → **API-Benutzer wird automatisch erstellt**
2. Bei jedem Service-Aufruf durch den Kunden wird ein **`apiClaim`-Parameter** übermittelt
3. Dieser `apiClaim` muss bei allen weiteren API-Calls als **`extendedclaim`** zurückgegeben werden
4. Die Benutzerrechte des Kunden begrenzen, was der API-Benutzer lesen/schreiben darf
5. `extendedclaim` ist im Marketplace-Kontext ein **Pflichtparameter**

```json
{
  "actionid": "urn:onoffice-de-ns:smart:2.5:smartml:action:read",
  "resourcetype": "estate",
  "extendedclaim": "DER_APICLAIM_DES_KUNDEN",
  ...
}
```

> **Wichtig:** Immer den `apiClaim` aus dem **neuesten** Service-Aufruf verwenden. Die Gültigkeit wird zukünftig zeitlich begrenzt.

---

## 11. Benutzerrechte & Sicherheit

**Rechte einstellen:** Extras → Einstellungen → Benutzer → API-Benutzer → Tab Rechte

- „Nur Eigene"-Rechte reichen für den API-Benutzer meist **nicht** aus
- Recht „Kann nur auf Website veröffentlichte Objekte sehen" → Objekte müssen explizit veröffentlicht sein unter: Objekte → Marketing → Eigene Website: Veröffentlichen
- **Schreib- und Löschrechte** nur vergeben, wenn zwingend notwendig
- API-Benutzer sind auch in Datensatzrechten selektierbar (weitere Aktionen → Datensatzrechte)
- Bei Datensatzrechten: Rechte des API-Benutzers über „Alle"-Checkbox gesteuert

---

## 12. Sonderthemen

### Multi-Objekt-Modul / Immobilienkomplexe

Verwaltung von Immobilienkomplexen (z.B. Mehrfamilienhäuser mit Einheiten).
Dokumentation: https://apidoc.onoffice.de/multi-object-module-real-estate-investments/

### Mehrsprachige Immobilien

API-Unterstützung für mehrsprachige Objektdaten.
Dokumentation: https://apidoc.onoffice.de/multilingual-estates/

### UUID-Identifikation

Datensätze können alternativ über UUIDs (statt numerischer ID) identifiziert werden.
Dokumentation: https://apidoc.onoffice.de/identification-of-data-sets-via-uuid/

### API Release News / Changelog

Monatliche Updates unter: https://apidoc.onoffice.de/changelog/

---

## 13. Tools, SDK & Support

### Entwickler-Tools

| Tool | Link |
|------|------|
| PHP SDK | https://github.com/onOfficeGmbH/sdk |
| CLI-Tool | https://github.com/onOfficeGmbH/api-client-cli |
| GUI-Tool | https://github.com/onOfficeGmbH/api-client-gui |
| Online API-Client (Vue.js) | https://tools.onofficeweb.com/api-client/ |
| WordPress-Plugin (Cache-Beispiel) | https://github.com/onOfficeGmbH/oo-wp-plugin |

### Support-Kontakte

| Thema | Kontakt |
|-------|---------|
| API-Support | [apisupport@onoffice.de](mailto:apisupport@onoffice.de) |
| Marketplace-Entwicklung | [marketplace-dev@onoffice.de](mailto:marketplace-dev@onoffice.de) |
| API-Dokumentation | https://apidoc.onoffice.de |
| Marketplace-Dokumentation | https://www.marketplacedoc.onoffice.de/ |
| Enterprise-Hilfe (Singleselect etc.) | https://de.enterprisehilfe.onoffice.com |

---

*Erstellt: März 2026 | Quelle: apidoc.onoffice.de*
