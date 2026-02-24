import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Phone, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Mezzarano Immobilien',
  description: 'Datenschutzerklärung von Mezzarano Immobilien - Informationen zum Umgang mit Ihren personenbezogenen Daten.',
}

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-secondary-900 flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary-400 mb-4">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Datenschutz</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Datenschutzerklärung</h1>
            <p className="text-xl text-gray-300 mb-8">
              Informationen zum Umgang mit Ihren personenbezogenen Daten gemäß DSGVO auf der Website von Mezzarano Immobilien.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/kontakt" className="btn-primary">
                Kontakt aufnehmen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="tel:01776542977" className="btn-outline border-white text-white hover:bg-white hover:text-secondary-900">
                <Phone className="h-5 w-5 mr-2" />
                0177 6542977
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">

            <div className="prose prose-lg max-w-none">

              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Datenschutz auf einen Blick</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Allgemeine Hinweise</h3>
              <p className="text-gray-700 mb-6">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Datenerfassung auf dieser Website</h3>
              <p className="text-gray-700 mb-4">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p className="text-gray-700 mb-6">
                Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. Verantwortlicher</h2>
              <p className="text-gray-700 mb-6">
                Verantwortlicher für die Datenverarbeitung auf dieser Website ist:<br /><br />
                <strong>Sandro Mezzarano</strong><br />
                Wüstenrot Immobilienberater<br />
                Saarstraße 1<br />
                54411 Hermeskeil<br /><br />
                Telefon: 0177 6542977<br />
                E-Mail: sandro.mezzarano@wuestenrot.de
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. Datenerfassung auf dieser Website</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Cookies</h3>
              <p className="text-gray-700 mb-6">
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Server-Log-Dateien</h3>
              <p className="text-gray-700 mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Kontaktformular</h3>
              <p className="text-gray-700 mb-6">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Anfrage per E-Mail, Telefon oder Telefax</h3>
              <p className="text-gray-700 mb-6">
                Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">4. Externe Dienste</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Cloudinary</h3>
              <p className="text-gray-700 mb-6">
                Wir nutzen den Dienst Cloudinary zur Speicherung und Auslieferung von Bildern. Anbieter ist Cloudinary Ltd., 3400 Central Expressway, Suite 110, Santa Clara, CA 95051, USA. Bei der Nutzung dieser Website werden Bilder von Cloudinary-Servern geladen. Dabei kann Ihre IP-Adresse an Cloudinary übermittelt werden.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Airtable</h3>
              <p className="text-gray-700 mb-6">
                Für die Verwaltung unserer Immobilienangebote nutzen wir Airtable. Anbieter ist Formagrid Inc. (dba Airtable), 799 Market Street, Floor 8, San Francisco, California 94103, USA. Die Immobiliendaten werden über deren API abgerufen.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">5. Ihre Rechte</h2>
              <p className="text-gray-700 mb-4">
                Sie haben jederzeit das Recht:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
                <li>Berichtigung unrichtiger personenbezogener Daten zu verlangen</li>
                <li>Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
                <li>Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen</li>
                <li>Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen</li>
                <li>Datenübertragbarkeit zu verlangen</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Beschwerderecht bei der Aufsichtsbehörde</h3>
              <p className="text-gray-700 mb-6">
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren. Zuständige Aufsichtsbehörde ist:<br /><br />
                Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz<br />
                Hintere Bleiche 34<br />
                55116 Mainz<br />
                Telefon: 06131 8920-0<br />
                E-Mail: poststelle@datenschutz.rlp.de
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">6. SSL- bzw. TLS-Verschlüsselung</h2>
              <p className="text-gray-700 mb-6">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">7. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p className="text-gray-700 mb-6">
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Januar 2026. Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
              </p>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
