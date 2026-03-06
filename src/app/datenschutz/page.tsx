import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Mezzarano Immobilien',
  description: 'Datenschutzerklärung von Sandro Mezzarano – Informationen zum Umgang mit Ihren personenbezogenen Daten gemäß DSGVO.',
}

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-warmgrau">
      {/* Header */}
      <section className="bg-wuestennacht py-16 md:py-20">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Datenschutzerklärung</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl">

            {/* 1. Datenschutz auf einen Blick */}
            <h2 className="text-2xl font-semibold text-wuestennacht mb-6">1. Datenschutz auf einen Blick</h2>

            <h3 className="text-lg font-semibold text-wuestennacht mb-2">Allgemeine Hinweise</h3>
            <p className="text-wuestennacht-light mb-6">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h3 className="text-lg font-semibold text-wuestennacht mb-2">Datenerfassung auf dieser Website</h3>
            <p className="text-wuestennacht-light mb-3">
              Wer ist verantwortlich für die Datenerfassung auf dieser Website?
            </p>
            <p className="text-wuestennacht-light mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Verantwortlicher" in dieser Datenschutzerklärung entnehmen.
            </p>
            <p className="text-wuestennacht-light mb-3">
              Wie erfassen wir Ihre Daten?
            </p>
            <p className="text-wuestennacht-light mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>
            <p className="text-wuestennacht-light mb-6">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>

            {/* 2. Verantwortlicher */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">2. Verantwortlicher</h2>
              <p className="text-wuestennacht-light mb-6">
                Verantwortlicher für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div className="mb-6">
                <p className="text-wuestennacht font-semibold">Sandro Mezzarano</p>
                <p className="text-wuestennacht-light">
                  Handelsvertreter für die Wüstenrot Immobilien GmbH<br />
                  Saarstraße 1<br />
                  54411 Hermeskeil
                </p>
                <p className="text-wuestennacht-light mt-2">
                  Telefon: 0177 6542977<br />
                  E-Mail: sandro.mezzarano@wuestenrot.de
                </p>
              </div>
              <p className="text-wuestennacht-light">
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
              </p>
            </div>

            {/* 3. Hosting */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">3. Hosting</h2>
              <p className="text-wuestennacht-light mb-4">
                Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
              </p>
              <p className="text-wuestennacht-light">
                Der Einsatz des Hosters erfolgt im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.
              </p>
            </div>

            {/* 4. Datenerfassung auf dieser Website */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">4. Datenerfassung auf dieser Website</h2>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Cookies</h3>
              <p className="text-wuestennacht-light mb-6">
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt. Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs oder zur Bereitstellung bestimmter Funktionen erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert.
              </p>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Server-Log-Dateien</h3>
              <p className="text-wuestennacht-light mb-3">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside text-wuestennacht-light mb-4 space-y-1 ml-2">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-wuestennacht-light mb-6">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
              </p>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Kontaktformular</h3>
              <p className="text-wuestennacht-light mb-6">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
              </p>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Anfrage per E-Mail, Telefon oder Telefax</h3>
              <p className="text-wuestennacht-light mb-6">
                Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO bzw. Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Suchprofil / Immobilien-Suchauftrag</h3>
              <p className="text-wuestennacht-light">
                Wenn Sie auf unserer Website ein Suchprofil für Immobilien anlegen, werden die von Ihnen eingegebenen Daten (Suchkriterien, Name, E-Mail-Adresse, Telefonnummer) gespeichert, um Sie über passende Immobilienangebote informieren zu können. Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen.
              </p>
            </div>

            {/* 5. Externe Dienste */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">5. Externe Dienste und Tools</h2>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Cloudinary (Bildbereitstellung)</h3>
              <p className="text-wuestennacht-light mb-6">
                Wir nutzen den Dienst Cloudinary zur Speicherung und Auslieferung von Bildern. Anbieter ist Cloudinary Ltd., 3400 Central Expressway, Suite 110, Santa Clara, CA 95051, USA. Bei der Nutzung dieser Website werden Bilder von Cloudinary-Servern geladen. Dabei kann Ihre IP-Adresse an Cloudinary übermittelt werden. Die Nutzung erfolgt auf Grundlage unseres berechtigten Interesses an einer effizienten Bereitstellung von Medieninhalten (Art. 6 Abs. 1 lit. f DSGVO).
              </p>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Airtable (Immobilienverwaltung)</h3>
              <p className="text-wuestennacht-light mb-6">
                Für die Verwaltung und Anzeige unserer Immobilienangebote nutzen wir Airtable. Anbieter ist Formagrid Inc. (dba Airtable), 799 Market Street, Floor 8, San Francisco, California 94103, USA. Die Immobiliendaten werden über deren API abgerufen. Dabei können technische Zugriffsdaten (IP-Adresse) an Airtable übermittelt werden. Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Voiceflow (Chat-Assistent)</h3>
              <p className="text-wuestennacht-light mb-6">
                Auf unserer Website setzen wir einen KI-gestützten Chat-Assistenten ein, der über Voiceflow betrieben wird. Anbieter ist Voiceflow Inc., Toronto, Kanada. Wenn Sie den Chat nutzen, werden Ihre Eingaben und technische Daten (IP-Adresse, Browser) an Voiceflow-Server übermittelt, um Ihre Anfrage zu bearbeiten. Die Nutzung erfolgt auf Grundlage Ihrer Einwilligung durch aktive Nutzung des Chat-Widgets (Art. 6 Abs. 1 lit. a DSGVO). Die proaktive Nachricht des Chat-Assistenten dient lediglich als Hinweis; eine Datenübermittlung an Voiceflow erfolgt erst bei aktiver Nutzung des Chats.
              </p>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Google Maps</h3>
              <p className="text-wuestennacht-light mb-6">
                Auf unserer Kontaktseite verwenden wir Google Maps zur Darstellung unseres Standorts. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Beim Laden der Karte werden Daten an Google-Server übertragen, darunter insbesondere Ihre IP-Adresse. Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und einer leichten Auffindbarkeit unseres Standorts (Art. 6 Abs. 1 lit. f DSGVO). Weitere Informationen finden Sie in der Datenschutzerklärung von Google:{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-wuestenrot hover:underline break-all">
                  https://policies.google.com/privacy
                </a>
              </p>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Social-Media-Links</h3>
              <p className="text-wuestennacht-light">
                Auf unserer Website befinden sich Links zu unseren Social-Media-Profilen auf Facebook, Instagram und LinkedIn. Es handelt sich um einfache Verlinkungen, nicht um Social-Media-Plugins. Beim Klick auf einen Link werden Sie auf die jeweilige externe Plattform weitergeleitet. Eine Datenübertragung an die Betreiber der sozialen Netzwerke findet erst statt, wenn Sie den jeweiligen Link aktiv anklicken.
              </p>
            </div>

            {/* 6. Ihre Rechte */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">6. Ihre Rechte</h2>
              <p className="text-wuestennacht-light mb-4">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:
              </p>
              <ul className="list-disc list-inside text-wuestennacht-light mb-6 space-y-2 ml-2">
                <li>Unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO)</li>
                <li>Löschung Ihrer bei uns gespeicherten personenbezogenen Daten (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung Ihrer personenbezogenen Daten (Art. 18 DSGVO)</li>
                <li>Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten (Art. 21 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              </ul>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Widerrufsrecht</h3>
              <p className="text-wuestennacht-light mb-6">
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>

              <h3 className="text-lg font-semibold text-wuestennacht mb-2">Beschwerderecht bei der Aufsichtsbehörde</h3>
              <p className="text-wuestennacht-light">
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde ist:
              </p>
              <div className="mt-3 mb-0">
                <p className="text-wuestennacht-light">
                  Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz<br />
                  Hintere Bleiche 34<br />
                  55116 Mainz<br />
                  Telefon: 06131 8920-0<br />
                  E-Mail:{' '}
                  <a href="mailto:poststelle@datenschutz.rlp.de" className="text-wuestenrot hover:underline">
                    poststelle@datenschutz.rlp.de
                  </a>
                </p>
              </div>
            </div>

            {/* 7. SSL/TLS */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">7. SSL- bzw. TLS-Verschlüsselung</h2>
              <p className="text-wuestennacht-light">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
              </p>
            </div>

            {/* 8. Aktualität */}
            <div className="border-t border-gray-300 pt-8 mt-8 mb-4">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">8. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p className="text-wuestennacht-light">
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand März 2026. Durch die Weiterentwicklung unserer Website und Angebote oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Website abgerufen werden.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
