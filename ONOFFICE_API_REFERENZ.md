# onOffice API – Referenzdokumentation für Website-Integration

> Ziel: Immobilien (Objekte / Estates) aus onOffice per API laden und als Übersichts- + Detailseiten auf einer Website darstellen.
> Quelle: https://apidoc.onoffice.de/ + realer Feld-Export aus `onoffice-fields.js --raw`
> Instanz-spezifisch für: Mezzarano / Wüstenrot Immobilien

---

## 1. Grundlagen

### API-URL (einziger Endpoint!)

```
POST https://api.onoffice.de/api/stable/api.php
```

Die onOffice API nutzt **einen einzigen Endpoint** für alle Operationen. Was genau passiert, steuern `actionid` + `resourcetype` im JSON-Body. Es gibt auch eine `latest`-Version (2x wöchentlich aktualisiert), aber `stable` ist für Produktiv empfohlen.

### Authentifizierung (HMAC)

Jeder Request braucht drei Dinge: einen **API Token**, ein **Secret** und einen berechneten **HMAC**. Token und Secret findet man im onOffice enterprise unter `Extras → Einstellungen → Benutzer → API-Benutzer`.

**HMAC v2 Berechnung (empfohlen):**

```typescript
import crypto from "crypto";

function generateHmac(
  timestamp: number,
  token: string,
  resourceType: string,
  actionId: string,
  secret: string
): string {
  const fields = [
    String(timestamp),
    token,
    resourceType,
    actionId,
  ].join("");

  return crypto
    .createHmac("sha256", secret)
    .update(fields)
    .digest("base64");
}
```

### JSON Request-Struktur

```json
{
  "token": "DEIN_API_TOKEN",
  "request": {
    "actions": [
      {
        "actionid": "urn:onoffice-de-ns:smart:2.5:smartml:action:read",
        "resourceid": "",
        "resourcetype": "estate",
        "identifier": "meineAbfrage",
        "timestamp": 1710000000,
        "hmac": "berechneterHMAC==",
        "hmac_version": "2",
        "parameters": { ... }
      }
    ]
  }
}
```

Mehrere Actions können in einem Request gebündelt werden (`actions` ist ein Array).

### Action IDs

| Action | actionid |
|--------|---------|
| Lesen | `urn:onoffice-de-ns:smart:2.5:smartml:action:read` |
| Erstellen | `urn:onoffice-de-ns:smart:2.5:smartml:action:create` |
| Bearbeiten | `urn:onoffice-de-ns:smart:2.5:smartml:action:modify` |
| Löschen | `urn:onoffice-de-ns:smart:2.5:smartml:action:delete` |
| Infos abfragen | `urn:onoffice-de-ns:smart:2.5:smartml:action:get` |
| Aktionen ausführen | `urn:onoffice-de-ns:smart:2.5:smartml:action:do` |

### Response-Struktur

```json
{
  "status": { "code": 200, "errorcode": 0, "message": "OK" },
  "response": {
    "results": [
      {
        "actionid": "...action:read",
        "resourcetype": "estate",
        "identifier": "meineAbfrage",
        "data": {
          "meta": { "cntabsolute": 150 },
          "records": [
            {
              "id": 102,
              "type": "estate",
              "elements": {
                "Id": "102",
                "objekttitel": "Einfamilienhaus in bester Lage",
                "kaufpreis": "450000.00",
                ...
              }
            }
          ]
        },
        "status": { "errorcode": 0, "message": "OK" }
      }
    ]
  }
}
```

Wichtig: `meta.cntabsolute` = Gesamtzahl aller Treffer (für Paginierung). `records[].elements` enthält die Felder.

---

## 2. Immobilien lesen (Listenansicht)

### Endpoint

```
actionid: urn:onoffice-de-ns:smart:2.5:smartml:action:read
resourcetype: estate
```

### Parameter

| Parameter | Typ | Beschreibung |
|-----------|-----|-------------|
| `data` | string[] | **Array der gewünschten Feldnamen** (z.B. `["Id", "kaufpreis", "objekttitel"]`) |
| `filter` | object | Filter-Ausdrücke (siehe unten) |
| `filterid` | integer | ID eines in onOffice gespeicherten Filters |
| `listlimit` | integer | Max. Ergebnisse pro Request (Default: 20, Max: 500) |
| `listoffset` | integer | Offset für Paginierung |
| `sortby` | object | Sortierung: `{"kaufpreis": "ASC"}` |
| `sortorder` | string | `ASC` oder `DESC` (nur wenn sortby ein String ist) |
| `formatoutput` | boolean | `true` → Labels statt Keys bei Select-Feldern + Einheiten bei Zahlen |
| `estatelanguage` | string | Sprache (ISO 3 Zeichen: `DEU`, `ENG`) für mehrsprachige Objekte |
| `addestatelanguage` | boolean | Sprache in Response hinzufügen |
| `georangesearch` | object | Umkreissuche: `{"country":"DEU","zip":"52068","radius":"10"}` |
| `addMobileUrl` | boolean | Mobile-URL in Response |

### Filter-Syntax

```json
{
  "filter": {
    "status": [{"op": "=", "val": 1}],
    "kaufpreis": [{"op": "<", "val": 300000}],
    "objektart": [{"op": "IN", "val": ["haus", "wohnung"]}],
    "geaendert_am": [{"op": "BETWEEN", "val": ["2024-01-01", "2024-12-31"]}]
  }
}
```

Mögliche Operatoren: `=`, `is`, `>`, `<`, `>=`, `<=`, `!=`, `<>`, `between`, `like`, `not like`, `in`, `not in`

### Vermarktungsstatus (Marketing Status)

Die Felder `verkauft` und `reserviert` müssen explizit in `data` angefordert werden:

| verkauft | reserviert | Status |
|:---:|:---:|--------|
| 0 | 0 | **Offen** (aktiv vermarktet) |
| 0 | 1 | **Reserviert** |
| 1 | 0 | **Verkauft / Vermietet** |

### Homepage-Felder ("Eigene Homepage" Kategorie)

Boolean-Felder die steuern, was auf der Website erscheint:

| Feld | Bedeutung |
|------|-----------|
| `veroeffentlichen` | Auf Homepage veröffentlichen ✅ **Hauptfilter!** |
| `exclusive` | Exklusiv-Objekt |
| `top_angebot` | Top-Angebot |
| `preisreduktion` | Preisreduziert |
| `courtage_frei` | Provisionsfrei |
| `showGoogleMap` | Karte anzeigen |
| `referenz` | Referenz-Objekt |
| `objekt_des_tages` | Objekt des Tages |
| `neu` | Neu |

### Beispiel: Alle veröffentlichten Objekte für Website

```json
{
  "actionid": "urn:onoffice-de-ns:smart:2.5:smartml:action:read",
  "resourceid": "",
  "identifier": "websiteListe",
  "resourcetype": "estate",
  "parameters": {
    "data": [
      "Id", "objektnr_extern", "objekttitel", "objektart", "objekttyp",
      "vermarktungsart", "kaufpreis", "kaltmiete", "warmmiete",
      "wohnflaeche", "grundstuecksflaeche", "anzahl_zimmer",
      "ort", "plz", "strasse", "hausnummer",
      "breitengrad", "laengengrad",
      "veroeffentlichen", "reserviert", "verkauft",
      "preisAufAnfrage", "top_angebot", "neu", "referenz"
    ],
    "filter": {
      "veroeffentlichen": [{"op": "=", "val": 1}],
      "status": [{"op": "=", "val": 1}]
    },
    "listlimit": 500,
    "listoffset": 0,
    "sortby": {"kaufpreis": "ASC"}
  }
}
```

---

## 3. Einzelnes Objekt lesen (Detailseite)

Für die Detailseite: `resourceid` auf die Estate-ID setzen.

```json
{
  "actionid": "urn:onoffice-de-ns:smart:2.5:smartml:action:read",
  "resourceid": "102",
  "identifier": "detailseite",
  "resourcetype": "estate",
  "parameters": {
    "data": [
      "Id", "objektnr_extern", "objekttitel", "stichwort",
      "objektart", "objekttyp", "vermarktungsart", "nutzungsart",
      "kaufpreis", "kaltmiete", "warmmiete", "nebenkosten", "heizkosten",
      "kaution", "hausgeld", "preisAufAnfrage", "aussen_courtage", "provisionsfrei",
      "wohnflaeche", "nutzflaeche", "grundstuecksflaeche", "gesamtflaeche",
      "anzahl_zimmer", "anzahl_schlafzimmer", "anzahl_badezimmer", "etage", "etagen_zahl",
      "baujahr", "zustand", "ausstattungsqualitaet",
      "objektbeschreibung", "ausstatt_beschr", "lage", "sonstige_angaben",
      "strasse", "hausnummer", "plz", "ort", "bundesland", "land",
      "breitengrad", "laengengrad",
      "energieausweistyp", "energyClass", "endenergiebedarf", "energieverbrauchskennwert",
      "energietraeger", "heizungsart", "befeuerung",
      "balkon", "terrasse", "gartennutzung", "kamin", "barrierefrei",
      "fahrstuhl", "kueche", "stellplatzart", "anzahl_stellplaetze",
      "verfuegbar_ab", "vermietet",
      "verkauft", "reserviert", "veroeffentlichen",
      "WI360GradLink", "MP_timum_buchungslink"
    ],
    "formatoutput": true
  }
}
```

> **Tipp:** `formatoutput: true` liefert bei Select-Feldern direkt die Labels ("Einfamilienhaus" statt "einfamilienhaus") und bei Zahlen die Einheiten ("450.000,00 €"). Für die Website-Darstellung oft praktisch, für programmatische Verarbeitung die Keys ohne `formatoutput` nutzen.

---

## 4. Bilder laden (Homepage-Bilder)

### Endpoint

```
actionid: urn:onoffice-de-ns:smart:2.5:smartml:action:get
resourcetype: estatepictures
```

Liefert nur Bilder die in onOffice unter `Dateien → Veröffentlichung → Eigene Homepage / API` freigegeben sind.

### Parameter

| Parameter | Typ | Pflicht | Beschreibung |
|-----------|-----|:---:|-------------|
| `estateids` | int[] | ✅ | Array von Estate-IDs |
| `categories` | string[] | ✅ | Bildtypen (siehe unten) |
| `size` | string | | Pixel z.B. `"500x500"` oder `"original"` |
| `language` | string | | ISO 3 Zeichen für mehrsprachige Objekte |

### Bild-Kategorien

| Wert | Beschreibung | Website-Verwendung |
|------|-------------|-------------------|
| `Titelbild` | Titelbild | Hero / Thumbnail |
| `Foto` | Fotos | Galerie |
| `Foto_gross` | Große Fotos | Lightbox |
| `Grundriss` | Grundriss | Grundriss-Tab |
| `Lageplan` | Lageplan | Lage-Tab |
| `Epass_Skala` | Energieausweis-Skala | Energieausweis-Anzeige |
| `Panorama` | Panoramabild | 360°-Ansicht |
| `Film-Link` | Video-Link | Video einbetten |
| `Ogulo-Link` | Ogulo-Tour-Link | 360°-Tour |
| `Link` | Allgemeiner Link | |
| `Expose` | Exposé-PDF | Download-Button |

### Beispiel: Alle Fotos + Grundrisse für ein Objekt

```json
{
  "actionid": "urn:onoffice-de-ns:smart:2.5:smartml:action:get",
  "resourceid": "",
  "identifier": "bilder",
  "resourcetype": "estatepictures",
  "parameters": {
    "estateids": [102],
    "categories": ["Titelbild", "Foto", "Foto_gross", "Grundriss", "Lageplan", "Panorama"],
    "size": "original"
  }
}
```

### Response-Struktur (Bilder)

```json
{
  "records": [
    {
      "id": 431,
      "type": "files",
      "elements": [
        {
          "estateid": "102",
          "type": "Foto",
          "url": "https://image.onoffice.de/smart20/Objekte/.../Foto_431.jpg",
          "title": "Wohnzimmer",
          "text": "",
          "originalname": "foto_001.jpg",
          "modified": 1749193590,
          "estateMainId": "102"
        }
      ]
    }
  ]
}
```

> **Wichtig:** Die Bild-URL ist direkt nutzbar – kein weiterer Auth nötig. Für responsive Images `size` Parameter nutzen (z.B. `"400x300"` für Thumbnails, `"original"` für Lightbox).

---

## 5. Dateien / Dokumente laden

### Endpoint

```
actionid: urn:onoffice-de-ns:smart:2.5:smartml:action:get
resourcetype: file
resourceid: estate
```

### Beispiel

```json
{
  "actionid": "urn:onoffice-de-ns:smart:2.5:smartml:action:get",
  "resourceid": "estate",
  "identifier": "dateien",
  "resourcetype": "file",
  "parameters": {
    "estateid": "102",
    "showispublishedonhomepage": true
  }
}
```

Response enthält `ispublishedonhomepage` (boolean) – nur Dateien mit `true` auf der Website zeigen.

---

## 6. Paginierung

onOffice nutzt Offset-basierte Paginierung:

```
Seite 1: listlimit=25, listoffset=0
Seite 2: listlimit=25, listoffset=25
Seite 3: listlimit=25, listoffset=50
...
```

`meta.cntabsolute` in der Response = Gesamtzahl. Letzte Seite: `listoffset >= cntabsolute`.

---

## 7. Feldkonfiguration dynamisch laden

Statt Felder hardcoden kann man sie auch dynamisch abfragen:

```json
{
  "actionid": "urn:onoffice-de-ns:smart:2.5:smartml:action:get",
  "resourceid": "",
  "identifier": "fields",
  "resourcetype": "fields",
  "parameters": {
    "labels": true,
    "showContent": true,
    "showTable": true,
    "language": "DEU",
    "modules": ["estate"]
  }
}
```

Liefert alle verfügbaren Felder mit Labels, Typen, und permitted Values zurück.

---

## 8. Typische Implementierungs-Architektur

```
┌──────────────────────────────────────────────────┐
│                    WEBSITE                        │
│                                                   │
│  /immobilien          → Übersichtsseite (Liste)   │
│  /immobilien/[id]     → Detailseite               │
│                                                   │
├──────────────────────────────────────────────────┤
│              SERVER / API-ROUTE                   │
│                                                   │
│  HMAC-Berechnung + Token/Secret (nie im Client!)  │
│                                                   │
│  GET /api/estates                                 │
│    → POST onoffice: read estate (veroeffentlichen=1) │
│    → POST onoffice: get estatepictures (Titelbild)│
│    → Response cachen (5-15 min)                   │
│                                                   │
│  GET /api/estates/[id]                            │
│    → POST onoffice: read estate (resourceid=ID)   │
│    → POST onoffice: get estatepictures (alle Typen)│
│    → Response cachen                              │
│                                                   │
│  POST /api/inquiry                                │
│    → POST onoffice: create address                │
│    → POST onoffice: create relation (estate↔address)│
│    → POST onoffice: create agentslog              │
│                                                   │
├──────────────────────────────────────────────────┤
│                   onOffice API                    │
│  POST https://api.onoffice.de/api/stable/api.php │
│  Auth: Token + HMAC v2 in JSON Body              │
└──────────────────────────────────────────────────┘
```

---

## 9. TypeScript API-Client

```typescript
import crypto from "crypto";

const API_URL = "https://api.onoffice.de/api/stable/api.php";
const TOKEN = process.env.ONOFFICE_TOKEN!;
const SECRET = process.env.ONOFFICE_SECRET!;

interface OnOfficeAction {
  actionid: string;
  resourceid: string;
  identifier: string;
  resourcetype: string;
  parameters: Record<string, any>;
}

function buildAction(action: OnOfficeAction) {
  const timestamp = Math.floor(Date.now() / 1000);
  const hmacInput = [
    String(timestamp),
    TOKEN,
    action.resourcetype,
    action.actionid,
  ].join("");

  const hmac = crypto
    .createHmac("sha256", SECRET)
    .update(hmacInput)
    .digest("base64");

  return { ...action, timestamp, hmac, hmac_version: "2" };
}

async function callOnOffice(actions: OnOfficeAction[]) {
  const body = {
    token: TOKEN,
    request: {
      actions: actions.map(buildAction),
    },
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`onOffice API: ${res.status}`);
  const json = await res.json();

  if (json.status?.errorcode !== 0) {
    throw new Error(`onOffice: ${json.status?.message}`);
  }

  return json.response.results;
}

// --- Alle veröffentlichten Objekte laden ---
async function getEstates(options?: {
  limit?: number;
  offset?: number;
  filter?: Record<string, any>;
  sortby?: Record<string, string>;
}) {
  const results = await callOnOffice([
    {
      actionid: "urn:onoffice-de-ns:smart:2.5:smartml:action:read",
      resourceid: "",
      identifier: "estates",
      resourcetype: "estate",
      parameters: {
        data: [
          "Id", "objektnr_extern", "objekttitel", "objektart", "objekttyp",
          "vermarktungsart", "kaufpreis", "kaltmiete", "warmmiete",
          "wohnflaeche", "grundstuecksflaeche", "anzahl_zimmer",
          "ort", "plz", "breitengrad", "laengengrad",
          "veroeffentlichen", "reserviert", "verkauft",
          "preisAufAnfrage", "referenz", "neu", "top_angebot"
        ],
        filter: {
          veroeffentlichen: [{ op: "=", val: 1 }],
          status: [{ op: "=", val: 1 }],
          ...(options?.filter || {}),
        },
        listlimit: options?.limit || 100,
        listoffset: options?.offset || 0,
        sortby: options?.sortby || { kaufpreis: "ASC" },
      },
    },
  ]);

  return results[0]?.data;
}

// --- Einzelnes Objekt laden ---
async function getEstate(id: number | string) {
  const results = await callOnOffice([
    {
      actionid: "urn:onoffice-de-ns:smart:2.5:smartml:action:read",
      resourceid: String(id),
      identifier: "detail",
      resourcetype: "estate",
      parameters: {
        data: [
          "Id", "objektnr_extern", "objekttitel", "stichwort",
          "objektart", "objekttyp", "vermarktungsart", "nutzungsart",
          "kaufpreis", "kaltmiete", "warmmiete", "nebenkosten",
          "heizkosten", "kaution", "hausgeld", "preisAufAnfrage",
          "aussen_courtage", "provisionsfrei",
          "wohnflaeche", "nutzflaeche", "grundstuecksflaeche",
          "gesamtflaeche", "bueroflaeche", "gewerbeflaeche",
          "anzahl_zimmer", "anzahl_schlafzimmer", "anzahl_badezimmer",
          "etage", "etagen_zahl", "baujahr", "zustand",
          "ausstattungsqualitaet",
          "objektbeschreibung", "ausstatt_beschr", "lage", "sonstige_angaben",
          "strasse", "hausnummer", "plz", "ort", "bundesland", "land",
          "breitengrad", "laengengrad",
          "energieausweistyp", "energyClass", "endenergiebedarf",
          "energieverbrauchskennwert", "energietraeger", "heizungsart", "befeuerung",
          "balkon", "terrasse", "gartennutzung", "kamin", "sauna",
          "swimmingpool", "barrierefrei", "fahrstuhl", "kueche",
          "stellplatzart", "anzahl_stellplaetze", "boden",
          "unterkellert", "dachform", "klimatisiert",
          "verfuegbar_ab", "vermietet", "denkmalgeschuetzt",
          "WI360GradLink", "MP_timum_buchungslink",
          "verkauft", "reserviert"
        ],
      },
    },
  ]);

  return results[0]?.data?.records?.[0]?.elements;
}

// --- Bilder eines Objekts laden ---
async function getEstateImages(estateId: number | string) {
  const results = await callOnOffice([
    {
      actionid: "urn:onoffice-de-ns:smart:2.5:smartml:action:get",
      resourceid: "",
      identifier: "images",
      resourcetype: "estatepictures",
      parameters: {
        estateids: [Number(estateId)],
        categories: ["Titelbild", "Foto", "Foto_gross", "Grundriss", "Lageplan", "Panorama"],
        size: "original",
      },
    },
  ]);

  const records = results[0]?.data?.records || [];
  // Flatten: records → flat list of image elements
  return records.flatMap((r: any) =>
    Array.isArray(r.elements) ? r.elements : [r.elements]
  );
}
```

---

## 10. Instanz-spezifische Feldreferenz (Mezzarano)

> Quelle: Realer Export aus `npm run onoffice:fields -- --raw` (Modul: Immobilien / estate)

### Feld-Typen

| type | Beschreibung | Handling |
|------|-------------|----------|
| `varchar` | Kurztext (mit `length`) | String |
| `text` | Langtext (HTML möglich) | String, ggf. HTML sanitizen |
| `integer` | Ganzzahl | Number |
| `float` | Dezimalzahl | `toLocaleString("de-DE")` |
| `boolean` | Ja/Nein | `true`/`false` |
| `singleselect` | Einfachauswahl | Key → Label via permittedvalues |
| `multiselect` | Mehrfachauswahl | Key-Array → Labels mappen |
| `date` | Datum | ISO-String |

### Status-Felder (WICHTIG für Filterung!)

**`status`** – internes onOffice-Statusfeld:
- `1` = Aktiv, `0` = Archiviert, `2` = Inaktiv

**`status2`** – Detaillierter Status (singleselect):
- `aktive_vermarktung`, `passive_vermarktung` → auf Website zeigen
- `reserviert`, `verkauft`, `vermietet` → optional mit Badge
- Alle anderen → NICHT zeigen

**`ind_2910_Feld_ObjKategorie194`** – Homepage-Status (Mezzarano-Custom):
- `ind_Schl_5603` → "Online" ✅
- `ind_Schl_5601` → "Referenz" (optional)
- `ind_Schl_5595` → "Reserviert" (optional mit Badge)
- `ind_Schl_5599` → "Offline" ❌
- `ind_Schl_5581` → "Verkauft" ❌
- `ind_Schl_5589` → "In Vorbereitung" ❌

### Kern-Felder für die Website

**Identifikation:** `Id`, `objektnr_extern`, `objekttitel`, `stichwort`

**Klassifizierung:**
- `objektart`: `haus`, `wohnung`, `grundstueck`, `buero_praxen`, `einzelhandel`, `gastgewerbe`, `hallen_lager_prod`, `parken`, ...
- `objekttyp`: ~130+ Werte (einfamilienhaus, eigentumswohnung, doppelhaushaelfte, penthouse, ...)
- `vermarktungsart`: `kauf`, `miete`, `pacht`, `erbpacht`
- `nutzungsart`: `wohnen`, `gewerbe`, `anlage`, `waz`

**Adresse:** `strasse`, `hausnummer`, `plz`, `ort`, `bundesland`, `land`, `breitengrad`, `laengengrad`

**Preise (Kauf):** `kaufpreis`, `kaufpreis_pro_qm`, `preisAufAnfrage`, `preisAb`
**Preise (Miete):** `kaltmiete`, `warmmiete`, `nebenkosten`, `heizkosten`, `kaution`, `hausgeld`
**Provision:** `aussen_courtage` (Freitext!), `provisionsfrei` (boolean)

**Flächen:** `wohnflaeche`, `nutzflaeche`, `grundstuecksflaeche`, `gesamtflaeche`, `bueroflaeche`, `gewerbeflaeche`, `balkon_terrasse_flaeche`, `kellerflaeche`

**Zimmer:** `anzahl_zimmer`, `anzahl_schlafzimmer`, `anzahl_badezimmer`, `anzahl_balkone`, `anzahl_terrassen`, `etage`, `etagen_zahl`, `anzahl_stellplaetze`

**Beschreibungstexte (für Website):**
- `objektbeschreibung` → Haupttext
- `ausstatt_beschr` → Ausstattung
- `lage` → Lagetext
- `sonstige_angaben` → Sonstiges
- `InterneBemerkung` → ❌ **NIEMALS auf Website!**

**Energieausweis:** `energieausweistyp`, `energyClass` (A+ bis H), `endenergiebedarf`, `energieverbrauchskennwert`, `befeuerung`, `heizungsart`, `energietraeger`, `energieausweis_gueltig_bis`

**Datum:** `baujahr`, `verfuegbar_ab`, `abdatum`, `erstellt_am`, `geaendert_am`

### Boolean-Features (als Tags/Icons darstellen)

`balkon`, `terrasse`, `gartennutzung`, `kamin`, `sauna`, `swimmingpool`, `wintergarten`, `einliegerwohnung`, `gaesteWc`, `abstellraum`, `fahrradraum`, `wasch_trockenraum`, `kabel_sat_tv`, `barrierefrei`, `rollstuhlgerecht`, `seniorengerecht`, `klimatisiert`, `denkmalgeschuetzt`, `vermietet`, `online_neubau`, `betreutes_wohnen`, `wg_geeignet`, `kinderfreundlich`, `provisionsfrei`, `electricCarCharging`, `breitbandanschluss`

### Select-Felder mit vollständigen permitted values

**`zustand`:** `erstbezug`, `erstbezug_nach_sanierung`, `neuwertig`, `modernisiert`, `gepflegt`, `renovierungsbeduerftig`, `sanierungsbeduerftig`, `saniert`, `teil_saniert`, `voll_saniert`, `rohbau`, `abrissobjekt`, ...

**`ausstattungsqualitaet`:** `Einfach`, `Normal`, `Gehoben`, `Luxus`

**`fahrstuhl`** (multi): `personen`, `lasten`, `kein_fahrstuhl`

**`kueche`** (multi): `ebk` (Einbauküche), `offen`, `pantry`

**`stellplatzart`** (multi): `garage`, `tiefgarage`, `carport`, `freiplatz`, `parkhaus`, `duplex`

**`boden`** (multi): `parkett`, `laminat`, `fliesen`, `dielen`, `teppichboden`, `marmor`, `granit`, `estrich`, `pvc`, ...

**`heizungsart`** (multi): `zentral`, `etage`, `fern`, `fussboden`, `gas`, `waermepumpe`, `ofen`, `nachtspeicherheizung`, ...

**`energyClass`:** `A+`, `A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`

**`unterkellert`:** `JA`, `NEIN`, `TEIL`

**`haustiere`:** `0`→Nein, `1`→Ja, `2`→nach Vereinbarung

### Distanz-Felder (float, km)

`distanz_zentrum`, `distanz_fernbahnhof`, `distanz_bus`, `distanz_us_bahn`, `distanz_autobahn`, `distanz_flughafen`, `distanz_einkaufsmoeglichkeiten`, `distanz_kindergarten`, `distanz_grundschule`, `distanz_gymnasium`

### Medien-Links

`WI360GradLink` (Ogulo-Tour), `MP_timum_buchungslink` (Besichtigungstermin), `MPAreaButlerUrlWithAddress` (Infrastruktur-Widget)

### Felder die NIEMALS auf die Website dürfen

`InterneBemerkung`, `benutzer`, `erzielterVerkaufspreis`, `erzielteProvisionInnen`, `erzielteProvisionAussen`, `erzielteProvisionGesamt`, `innen_courtage`, `provision_innen_wert`, `summe_innenprovision`, `summe_aussenprovision`, `provisionsbetrag`, `Tipp_ID`, `leadweitergabe`, `akquise_wahrscheinlichkeit`, `vermittlungswahrscheinlichkeit`, alle `WIODublettencheck*`, alle `WIOProzess*`, `ind_1332_*` (VIP-Passwort), `ind_1334_*` (VIP-Benutzername)

---

## 11. Empfohlene Detailseiten-Struktur

**Hero:** `objekttitel`, Titelbild, Preis-Badge, Status-Badge (Reserviert/Neu/Top)

**Eckdaten-Leiste:** `anzahl_zimmer`, primäre Fläche, `grundstuecksflaeche`, `etage`, `baujahr`, `objekttyp`-Label

**Tab "Beschreibung":** `objektbeschreibung`
**Tab "Ausstattung":** `ausstatt_beschr` + Boolean-Feature-Tags + Select-Labels
**Tab "Lage":** `lage` + Karte + Distanzen
**Tab "Energieausweis":** Energiedaten + Skala-Grafik
**Tab "Preise":** Alle relevanten Preisfelder + Provision

**Sidebar:** Makler-Kontakt, Anfrage-Formular, 360°-Tour-Button, Besichtigungstermin-Link

---

## 12. Checkliste

- [ ] API-User in onOffice anlegen, Token + Secret notieren
- [ ] Token + Secret in `.env` serverseitig speichern (nie im Client!)
- [ ] HMAC v2 Berechnung implementieren
- [ ] Estate-Liste: `filter: {veroeffentlichen: [{op:"=",val:1}], status: [{op:"=",val:1}]}`
- [ ] Detailseite: `resourceid` setzen + alle relevanten Felder in `data`
- [ ] Bilder: `estatepictures` Endpoint mit korrekten `categories`
- [ ] Paginierung: `listlimit` + `listoffset` + `meta.cntabsolute`
- [ ] `formatoutput: true` für Labels oder eigenes Mapping
- [ ] Caching-Strategie (ISR / SWR / 5-15 min TTL)
- [ ] Select-Felder korrekt mappen (Key → Label)
- [ ] Interne Felder ausschließen (Provisionen, Bemerkungen, etc.)
- [ ] SEO: Schema.org RealEstateListing
- [ ] Responsive Bilder via `size`-Parameter
