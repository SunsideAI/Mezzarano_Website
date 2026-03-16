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

            {/* Stellenwert des Datenschutzes */}
            <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Stellenwert des Datenschutzes</h2>
            <p className="text-wuestennacht-light mb-4">
              Der Schutz Ihrer Privatsphäre ist von höchster Bedeutung. Daher halten wir selbstverständlich alle gesetzlichen Bestimmungen zum Datenschutz ein und möchten Sie wissen lassen, wann wir welche Daten speichern und wie wir diese verwenden.
            </p>
            <p className="text-wuestennacht-light mb-4">
              Besonders der Schutz personenbezogener Daten, wie Name und Adresse, ist uns sehr wichtig. Gleiches gilt für den Umgang mit den Informationen, die Sie uns anvertrauen, und für die Daten, die bei der Internetnutzung protokolliert werden.
            </p>
            <p className="text-wuestennacht-light mb-8">
              Mit dieser Datenschutzerklärung klären wir, als Diensteanbieter der unter dieser Domain aufrufbaren Webseite, Sie über die Art, den Umfang und den Zweck der Erhebung und Verwendung Ihrer personenbezogenen Daten auf, die bei Ihrem Besuch der Website und der Nutzung anderer Kanäle relevant werden.
            </p>

            {/* Verantwortlicher */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Wer ist für die Datenverarbeitung verantwortlich und an wen kann ich mich wenden?</h2>
              <p className="text-wuestennacht-light mb-4">
                Verantwortlich für die Datenverarbeitung ist:
              </p>
              <div className="mb-6">
                <p className="text-wuestennacht font-semibold">Sandro Mezzarano</p>
                <p className="text-wuestennacht-light">
                  Saarstraße 1<br />
                  54411 Hermeskeil, Deutschland
                </p>
                <p className="text-wuestennacht-light mt-2">
                  Telefon: 0177 6542977<br />
                  E-Mail: sandro.mezzarano@wuestenrot.de
                </p>
              </div>
            </div>

            {/* Welche Daten erheben wir */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Welche Daten erheben wir auf unseren Webseiten?</h2>
              <p className="text-wuestennacht-light">
                Bei Ihrem Besuch werden Nutzungsdaten gespeichert, wie etwa Ihre IP-Adresse, die Webseite, von der aus Sie zu uns gefunden haben, die Webseiten, die Sie bei uns besuchen, sowie das Datum und die Dauer Ihres Besuchs. Alle diese Daten werden ausschließlich zu statistischen Zwecken ausgewertet. Die Auswertung erfolgt auch mithilfe von Cookies (weitere Informationen im Reiter „Cookie Einstellungen"). Personenbezogene Nutzerprofile erstellen wir nicht.
              </p>
            </div>

            {/* Zweck und Rechtsgrundlage */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Wofür verarbeiten wir Ihre Daten (Zweck der Verarbeitung) und auf welcher Rechtsgrundlage?</h2>
              <p className="text-wuestennacht-light mb-4">
                Die Daten, die durch den Besuch unserer Webseite bzw. die Nutzung der angebotenen Kontaktmöglichkeiten entstehen, verarbeiten wir im Einklang mit den Bestimmungen der EU-Datenschutz-Grundverordnung (DSGVO) und dem Bundesdatenschutzgesetz (BDSG). Je nach Anliegen, zu dem Sie uns über die Webseite kontaktieren, gibt es dafür unterschiedliche Rechtsgrundlagen.
              </p>
              <p className="text-wuestennacht-light mb-4">
                <strong>Art. 6 Abs. 1 lit. a DSGVO</strong> dient uns als Rechtsgrundlage für Verarbeitungsvorgänge, bei denen wir eine Einwilligung für einen bestimmten Verarbeitungszweck einholen. Eine erteilte Einwilligung kann jederzeit widerrufen werden.
              </p>
              <p className="text-wuestennacht-light mb-4">
                Ist die Verarbeitung personenbezogener Daten zur Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, erforderlich, so beruht die Verarbeitung auf <strong>Art. 6 Abs. 1 lit. b DSGVO</strong>. Gleiches gilt für Verarbeitungsvorgänge, die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind, etwa in Fällen von Anfragen zu unseren Produkten oder Leistungen.
              </p>
              <p className="text-wuestennacht-light mb-4">
                Unterliegen wir einer rechtlichen Verpflichtung, durch welche eine Verarbeitung von personenbezogenen Daten erforderlich wird, wie beispielsweise zur Erfüllung steuerlicher Pflichten, so basiert die Verarbeitung auf <strong>Art. 6 Abs. 1 lit. c DSGVO</strong>.
              </p>
              <p className="text-wuestennacht-light">
                Letztlich könnten Verarbeitungsvorgänge auf <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> beruhen. Auf dieser Rechtsgrundlage basieren Verarbeitungsvorgänge, die von keiner der vorgenannten Rechtsgrundlagen erfasst werden, wenn die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich ist, sofern die Interessen, Grundrechte und Grundfreiheiten des Betroffenen nicht überwiegen.
              </p>
            </div>

            {/* Speicherdauer */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Wie lange speichern wir Ihre Daten?</h2>
              <p className="text-wuestennacht-light mb-4">
                Wir speichern Ihre personenbezogenen Daten, die bei der Nutzung unserer Webseite entstehen, solange dies für die oben genannten Zwecke erforderlich ist. Darüber hinaus unterliegen wir verschiedenen rechtlichen Nachweis- und Aufbewahrungspflichten, die unter anderem im Handelsgesetzbuch, in Steuergesetzen und der Abgabenordnung geregelt sind. Die Speicherfristen betragen danach in der Regel bis zu zehn Jahre. Außerdem kann es vorkommen, dass personenbezogene Daten für die Zeit aufbewahrt werden, in der Ansprüche gegen uns geltend gemacht werden können (gesetzliche Verjährungsfrist von drei oder bis zu dreißig Jahren). Nach Ablauf der Speicherdauer werden über ein automatisiertes Verfahren die personenbezogenen Daten gelöscht.
              </p>
              <p className="text-wuestennacht-light mb-4">
                So bleibt beispielsweise Ihre E-Mail-Adresse in unserem Newsletter-Verteiler so lange gespeichert, bis Sie uns mitteilen, dass Sie keinen Newsletter mehr wünschen.
              </p>
              <p className="text-wuestennacht-light">
                Im Falle der Speicherung der Daten in Logfiles ist dies nach spätestens sieben Tagen der Fall. Eine darüber hinausgehende Speicherung ist möglich. In diesem Fall werden die IP-Adressen der Nutzer gelöscht oder verfremdet, sodass eine Zuordnung des aufrufenden Clients nicht mehr möglich ist.
              </p>
            </div>

            {/* Verwendung der Daten */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Wie verwenden wir Ihre Daten?</h2>
              <p className="text-wuestennacht-light mb-4">
                Wir verwenden Ihre personenbezogenen Daten eigenständig. Dabei beachten wir die Grundsätze der Zweckbindung und Datenminimierung.
              </p>
              <p className="text-wuestennacht-light mb-4">
                Wir wissen Ihr Vertrauen zu schätzen und wenden äußerste Sorgfalt an, um Ihre persönlichen Angaben zu schützen.
              </p>
              <p className="text-wuestennacht-light">
                Falls Sie nicht möchten, dass wir Ihre Daten für Werbung oder Befragungen nutzen, teilen Sie uns dies bitte einfach mit. Wir werden Ihre Daten dann nicht für diese Zwecke nutzen.
              </p>
            </div>

            {/* Weitergabe an Dritte */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Wer bekommt Daten zu Ihrer Person?</h2>
              <p className="text-wuestennacht-light mb-4">
                Wir geben Ihre personenbezogenen Daten nur an Dritte weiter, wenn dies zur Erfüllung unserer eigenen Geschäftszwecke erforderlich ist, Sie Ihre Einwilligung hierfür erteilt haben oder wir gesetzlich oder aufgrund einer gerichtlichen oder behördlichen Anordnung dazu verpflichtet sind.
              </p>
              <p className="text-wuestennacht-light">
                Wenn wir im Rahmen der Datenverarbeitung mit externen Dienstleistern zusammenarbeiten, erfolgt dies in der Regel auf Basis einer sogenannten Auftragsverarbeitung, bei der wir für die Datenverarbeitung verantwortlich bleiben. Wir prüfen jeden dieser Dienstleister vorher auf die von ihm zum Datenschutz und zur Datensicherheit getroffenen Maßnahmen und stellen so die gesetzlich vorgesehenen vertraglichen Regelungen zum Schutz der personenbezogenen Daten sicher.
              </p>
            </div>

            {/* Drittland */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Werden Daten in ein Drittland oder an eine internationale Organisation übermittelt?</h2>
              <p className="text-wuestennacht-light">
                Eine Datenübermittlung an Stellen in Drittstaaten (Staaten außerhalb des Europäischen Wirtschaftsraums – EWR) findet nur statt, soweit dies zur Ausführung Ihrer Aufträge erforderlich, gesetzlich vorgeschrieben ist (zum Beispiel steuerrechtliche Meldepflichten) oder Sie uns Ihre Einwilligung erteilt haben. Sollten wir darüber hinaus personenbezogene Daten an Dienstleister außerhalb des EWR übermitteln, erfolgt die Übermittlung nur, soweit dem Drittland durch die EU-Kommission ein angemessenes Datenschutzniveau bestätigt wurde oder andere angemessene Datenschutzgarantien (zum Beispiel verbindliche unternehmensinterne Datenschutzvorschriften oder EU-Standardvertragsklauseln) vorhanden sind.
              </p>
            </div>

            {/* Automatisierte Entscheidungsfindung */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Inwieweit gibt es eine automatisierte Entscheidungsfindung im Einzelfall?</h2>
              <p className="text-wuestennacht-light">
                Sofern wir im Einzelfall rein automatisierte Verarbeitungsprozesse zur Herbeiführung einer Entscheidung – einschließlich Profiling – nutzen, werden wir darüber bei der jeweiligen Anwendung informieren.
              </p>
            </div>

            {/* Pflicht zur Bereitstellung */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Besteht für mich eine Pflicht zur Bereitstellung von Daten?</h2>
              <p className="text-wuestennacht-light">
                Im Rahmen unserer Geschäftsbeziehung müssen Sie nur diejenigen personenbezogenen Daten bereitstellen, die für die Begründung, Durchführung und Beendigung einer Geschäftsbeziehung erforderlich sind oder zu deren Erhebung wir gesetzlich verpflichtet sind. Ohne diese Daten werden wir in der Regel den Abschluss des Vertrags oder die Ausführung des Auftrags ablehnen müssen oder einen bestehenden Vertrag nicht mehr durchführen können und gegebenenfalls beenden müssen.
              </p>
            </div>

            {/* Datenschutzrechte */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Welche Datenschutzrechte habe ich?</h2>
              <p className="text-wuestennacht-light mb-4">
                Sie haben das Recht auf Auskunft nach Art. 15 DSGVO, das Recht auf Berichtigung nach Art. 16 DSGVO, das Recht auf Löschung nach Art. 17 DSGVO, das Recht auf Einschränkung der Verarbeitung nach Art. 18 DSGVO sowie das Recht auf Datenübertragbarkeit aus Art. 20 DSGVO. Beim Auskunftsrecht und beim Löschungsrecht gelten die Einschränkungen nach §§ 34 und 35 BDSG. Darüber hinaus besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde (Art. 77 DSGVO i. V. m. § 19 BDSG).
              </p>
            </div>

            {/* Widerspruchsrecht */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO</h2>
              <p className="text-wuestennacht-light mb-4">
                <strong>1)</strong> Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 lit. e) DSGVO (Datenverarbeitung im öffentlichen Interesse) und Art. 6 Abs. 1 lit. f) DSGVO (Datenverarbeitung auf der Grundlage einer Interessenabwägung) erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmung gestütztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.
              </p>
              <p className="text-wuestennacht-light mb-4">
                Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
              </p>
              <p className="text-wuestennacht-light mb-4">
                <strong>2)</strong> In Einzelfällen verarbeiten wir Ihre personenbezogenen Daten, um Direktwerbung zu betreiben. Sie haben das Recht, jederzeit Widerspruch (ohne Nennung von Gründen) gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.
              </p>
              <p className="text-wuestennacht-light">
                Widersprechen Sie der Verarbeitung für Zwecke der Direktwerbung, so werden wir Ihre personenbezogenen Daten nicht mehr für diese Zwecke verarbeiten. Bitte richten Sie den Widerspruch an die oben genannten Kontaktdaten.
              </p>
            </div>

            {/* Widerrufsrecht */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Ihr Recht auf Widerruf einer Einwilligung</h2>
              <p className="text-wuestennacht-light">
                Eine erteilte Einwilligung kann jederzeit widerrufen werden. Dies gilt auch für den Widerruf von Einwilligungserklärungen, die vor der Geltung der Datenschutz-Grundverordnung, also vor dem 25. Mai 2018, uns gegenüber erteilt worden sind. Bitte beachten Sie, dass der Widerruf erst für die Zukunft wirkt. Verarbeitungen, die vor dem Widerruf erfolgt sind, sind davon nicht betroffen.
              </p>
            </div>

            {/* Beschwerderecht */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Ihr Beschwerderecht bei der zuständigen Datenschutzaufsichtsbehörde</h2>
              <p className="text-wuestennacht-light mb-4">
                Die zuständige Datenschutzaufsichtsbehörde ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz:
              </p>
              <div className="mb-4">
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
              <p className="text-wuestennacht-light">
                Sie können sich jedoch auch an die Datenschutzaufsichtsbehörde wenden, die Ihrem Wohnsitz am nächsten liegt.
              </p>
            </div>

            {/* Individuelle Kommunikation */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Wie erfolgt die individuelle Kommunikation mit Ihnen?</h2>
              <p className="text-wuestennacht-light mb-4">
                Unsere Webseite enthält Angaben, die eine schnelle elektronische Kontaktaufnahme zu unserem Unternehmen sowie eine unmittelbare Kommunikation mit uns ermöglichen. So bieten wir Ihnen bei Fragen jeglicher Art die Möglichkeit an, mit uns über auf der Website bereitgestellte Interaktionspunkte Kontakt aufzunehmen.
              </p>
              <p className="text-wuestennacht-light mb-4">
                Im Zeitpunkt der Absendung der Nachricht werden zudem folgende Daten gespeichert: IP-Adresse des Nutzers, Datum und Uhrzeit, Vor- und Nachname, Anschrift (Straße, PLZ, Ort), Telefonnummer, E-Mail-Adresse, Suchauftrag (Informationen zur gesuchten Immobilie) sowie Objektanfrage (das angefragte Objekt).
              </p>
              <p className="text-wuestennacht-light">
                Rechtsgrundlage für die Verarbeitung der Daten, die im Zuge des Absendevorgangs übermittelt werden, ist Art. 6 Abs. 1 lit. f DSGVO. Zielt der Kontakt auf den Abschluss eines Vertrags ab, so ist zusätzliche Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. b DSGVO.
              </p>
            </div>

            {/* Kontaktformular */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Kontaktformular</h2>
              <p className="text-wuestennacht-light mb-4">
                Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, mit uns über auf der Website bereitgestellte Formulare Kontakt aufzunehmen. Über die erforderlichen Angaben, um Ihre Anfrage zu bearbeiten, weisen wir Sie in dem jeweiligen Formular hin. Weitere Angaben können freiwillig getätigt werden.
              </p>
              <p className="text-wuestennacht-light">
                Die sonstigen während des Absendevorgangs verarbeiteten personenbezogenen Daten dienen dazu, einen Missbrauch des Kontaktformulars zu verhindern und die Sicherheit unserer informationstechnischen Systeme sicherzustellen.
              </p>
            </div>

            {/* E-Mail */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">E-Mail</h2>
              <p className="text-wuestennacht-light">
                Alternativ ist eine Kontaktaufnahme über die bereitgestellte E-Mail-Adresse möglich. In diesem Fall werden Ihre mit der E-Mail übermittelten personenbezogenen Daten gespeichert. Es erfolgt in diesem Zusammenhang keine Weitergabe der Daten an Dritte. Die Daten werden ausschließlich für die Verarbeitung der Kommunikation mit Ihnen verwendet.
              </p>
            </div>

            {/* QR-Code */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">QR-Code</h2>
              <p className="text-wuestennacht-light">
                Der Umfang der Verarbeitung personenbezogener Daten bezieht sich auf die von Ihnen mittels Scannens des QR-Codes erhobenen Daten. Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten ergibt sich aus Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Der Zweck der Datenverarbeitung liegt in der Möglichkeit, mittels Scannens des QR-Codes die damit verbundenen Angebote zu nutzen. Die im Rahmen der Nutzung des Scannens des QR-Codes anfallenden Nutzungsdaten werden von uns nur zur Erfüllung der Funktion des Scannens des QR-Codes bzw. zur Aufrechterhaltung der Funktionalität erhoben, gespeichert und verarbeitet. Die QR-Codes weisen keinerlei Tracking-Mechanismus auf. Im QR-Code sind nur exakt die Daten (hier: unsere Web-Adresse) gespeichert, die von uns eingegeben wurden. Eine Verwendung zu anderen Zwecken oder eine Datenweitergabe an Dritte erfolgt nicht.
              </p>
            </div>

            {/* Chatbots */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Einsatz von Chatbots</h2>
              <p className="text-wuestennacht-light mb-4">
                Wir setzen Chatbots ein, um mit Ihnen zu kommunizieren. Chatbots sind in der Lage, ohne menschliche Hilfe auf Ihre Fragen und sonstigen Eingaben zu reagieren. Hierzu analysieren die Chatbots neben Ihren Eingaben weitere Daten, um passende Antworten zu geben (z. B. Namen, E-Mail-Adressen und sonstige Kontaktdaten, Kundennummern und sonstige Identifikatoren, Bestellungen und Chatverläufe). Ferner können über den Chatbot Ihre IP-Adresse, Logdateien, Standortinformationen und andere Metadaten erfasst werden. Diese Daten werden auf den Servern des Chatbot-Anbieters gespeichert.
              </p>
              <p className="text-wuestennacht-light mb-4">
                Auf Grundlage der erfassten Daten können Nutzerprofile erstellt werden. Außerdem können die Daten zur Ausspielung interessengerechter Werbung genutzt werden, sofern die übrigen rechtlichen Voraussetzungen (insbesondere eine Einwilligung) hierfür vorliegen. Dazu können die Chatbots mit Analyse- und Werbetools verknüpft werden.
              </p>
              <p className="text-wuestennacht-light mb-4">
                Die erfassten Daten können außerdem dazu genutzt werden, um unsere Chatbots und ihr Antwortverhalten zu verbessern (maschinelles Lernen).
              </p>
              <p className="text-wuestennacht-light mb-4">
                Die von Ihnen im Rahmen der Kommunikation eingegebenen Daten verbleiben bei uns bzw. dem Chatbotbetreiber, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
              </p>
              <p className="text-wuestennacht-light mb-6">
                Rechtsgrundlage für den Einsatz von Chatbots ist Art. 6 Abs. 1 lit. b DSGVO, sofern der Chatbot zur Vertragsanbahnung oder im Rahmen der Vertragserfüllung eingesetzt wird. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar. In allen anderen Fällen erfolgt der Einsatz auf Grundlage unseres berechtigten Interesses an einer möglichst effektiven Kundenkommunikation (Art. 6 Abs. 1 lit. f DSGVO).
              </p>

              <h3 className="text-lg font-semibold text-wuestennacht mb-3">Wir setzen folgende Chatbots ein:</h3>
              <h4 className="text-base font-semibold text-wuestennacht mb-2">Voiceflow</h4>
              <p className="text-wuestennacht-light mb-4">
                Anbieter ist Voiceflow, Inc., 1055 Bay Street Suite 2012, Toronto, ON, Canada, M5S 3A3 (nachfolgend „Voiceflow").
              </p>
              <p className="text-wuestennacht-light mb-4">
                Voiceflow verarbeitet im Rahmen der Interaktion mit Ihnen alle eingegebenen Daten und leitet diese an unsere internen Chatsysteme weiter.
              </p>
              <p className="text-wuestennacht-light mb-2">
                Die Datenschutzerklärung von Voiceflow finden Sie hier:{' '}
                <a href="https://www.voiceflow.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-wuestenrot hover:underline break-all">
                  https://www.voiceflow.com/legal/privacy/
                </a>
              </p>
              <p className="text-wuestennacht-light">
                Voiceflow folgt allen Prozessen und Richtlinien zur Einhaltung der DSGVO und ist ISO 27001-konform. Weitere Informationen zur DSGVO-Konformität sind abrufbar unter:{' '}
                <a href="https://www.voiceflow.com/legal/gdpr/" target="_blank" rel="noopener noreferrer" className="text-wuestenrot hover:underline break-all">
                  https://www.voiceflow.com/legal/gdpr/
                </a>
              </p>
            </div>

            {/* Datensicherheit */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Was tun wir für die Datensicherheit?</h2>
              <p className="text-wuestennacht-light mb-4">
                Wir verwenden das SSL-Verfahren (Secure Sockets Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. Ob eine einzelne Seite unseres Internetauftritts verschlüsselt übertragen wird, erkennen Sie am geschlossenen Schlüssel- beziehungsweise Schloss-Symbol in der Statusleiste Ihres Browsers.
              </p>
              <p className="text-wuestennacht-light">
                Außerdem setzen wir technische und organisatorische Maßnahmen ein, um Ihre Daten gegen Manipulation, Verlust, Zerstörung oder unbefugten Zugriff zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.
              </p>
            </div>

            {/* Links */}
            <div className="border-t border-gray-300 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Links auf andere Internetseiten</h2>
              <p className="text-wuestennacht-light">
                Wir wollen auf unseren Websites nur hochqualitative und sichere Links auf andere Websites setzen, bemerken aber manchmal nicht sofort, wenn sich verlinkte Inhalte verändern. Sollte Ihnen auffallen, dass Links auf unserer Website auf Internetseiten verweisen, deren Inhalte gegen geltendes Recht verstoßen, informieren Sie uns bitte über die E-Mail-Adresse{' '}
                <a href="mailto:sandro.mezzarano@wuestenrot.de" className="text-wuestenrot hover:underline">
                  sandro.mezzarano@wuestenrot.de
                </a>
                . Wir werden diese Links dann umgehend aus unserem Internetauftritt entfernen.
              </p>
            </div>

            {/* Aktualität */}
            <div className="border-t border-gray-300 pt-8 mt-8 mb-4">
              <h2 className="text-2xl font-semibold text-wuestennacht mb-6">Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p className="text-wuestennacht-light">
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand März 2026. Durch die Weiterentwicklung unserer Webseite und Angebote darüber oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit hier von Ihnen abgerufen und ausgedruckt werden.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
