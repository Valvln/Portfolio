# Feature Specification: Header and hero redesign

**Feature Branch**: `002-header-hero-redesign`
**Created**: 2026-08-04
**Status**: Specified
**Input**: Riscrittura in inglese dell'intestazione e della sezione hero della home, con nuovo copy, gerarchia tipografica esplicita e allineamento centrato.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Il visitatore capisce subito la promessa del portfolio (Priority: P1)

Un visitatore arriva sulla home page del portfolio. Nella prima schermata trova un blocco titolo centrato, composto da tre righe di dimensione decrescente: una riga di forte impatto ("The path"), la sua continuazione leggermente più piccola ("from noise to harmony") e, dopo uno stacco verticale, una riga più contenuta che dichiara le competenze applicate. Non vede più la vecchia riga introduttiva sopra il titolo, che duplicava l'identità già presente nell'intestazione. In pochi secondi il visitatore ha una promessa chiara — dal rumore all'armonia — e sa in quali ambiti tecnici quella promessa si concretizza.

**Why this priority**: è il cuore della feature e l'elemento che il visitatore vede per primo. Da solo cambia la percezione del portfolio, anche se sottotitolo, CTA e intestazione restassero invariati.

**Independent Test**: aprire la home e verificare che il blocco titolo mostri le tre righe nell'ordine e nel testo previsti, con dimensioni decrescenti, stacco verticale prima della terza riga, tutto allineato al centro, e che la vecchia riga sopra il titolo non compaia più.

**Acceptance Scenarios**:

1. **Given** un visitatore che apre la home page, **When** la pagina è caricata, **Then** il blocco titolo mostra, nell'ordine, "The path", "from noise to harmony" e "Machine Learning, SQL and Data Visualization applied to real life.".
2. **Given** il blocco titolo visibile, **When** se ne confrontano le tre righe, **Then** la prima riga ha la dimensione di carattere maggiore, la seconda una dimensione leggermente inferiore alla prima e la terza una dimensione inferiore alla seconda.
3. **Given** il blocco titolo visibile, **When** se ne osserva la spaziatura interna, **Then** tra la seconda e la terza riga esiste uno stacco verticale percepibile, maggiore della distanza tra la prima e la seconda riga.
4. **Given** il blocco titolo visibile, **When** se ne osserva l'allineamento, **Then** tutte le righe risultano allineate al centro rispetto al blocco, non solo il blocco risulta centrato nella pagina.
5. **Given** un visitatore che apre la home page, **When** ispeziona l'area sopra il titolo, **Then** la riga "Valerio Quaranta — Data Scientist Junior" non è più presente in nessun punto della sezione hero.

---

### User Story 2 - L'intestazione dichiara identità e natura del sito (Priority: P2)

Su qualsiasi pagina del sito, il visitatore legge in alto a sinistra un'intestazione che unisce il nome della persona e la natura del progetto: "Valerio Quaranta - A Data Science Hub". L'intestazione resta il collegamento alla home, così chi naviga può sempre tornare al punto di partenza.

**Why this priority**: rafforza l'identità su tutte le pagine ed è la sede naturale del nome dopo la rimozione della riga sopra il titolo, ma non è il primo elemento che comunica la proposta di valore.

**Independent Test**: aprire home e pagina About e verificare che l'intestazione in alto a sinistra riporti il nuovo testo e continui a portare alla home quando attivata.

**Acceptance Scenarios**:

1. **Given** un visitatore su qualsiasi pagina del sito, **When** osserva l'intestazione in alto a sinistra, **Then** legge esattamente "Valerio Quaranta - A Data Science Hub".
2. **Given** l'intestazione visibile, **When** il visitatore la attiva (click o tastiera), **Then** viene portato alla home page.
3. **Given** un visitatore su uno schermo stretto, **When** osserva l'intestazione, **Then** il testo resta leggibile e non si sovrappone né spinge fuori dallo schermo i collegamenti di navigazione.

---

### User Story 3 - Sottotitolo e invito all'azione in inglese, coerenti col blocco titolo (Priority: P3)

Sotto il blocco titolo, a una distanza verticale maggiore di quella attuale, il visitatore trova un sottotitolo in inglese che spiega la natura end-to-end dei progetti, e subito sotto un pulsante in inglese che porta alla sezione progetti. Entrambi sono centrati, in continuità visiva con il blocco titolo.

**Why this priority**: completa la coerenza linguistica e visiva della prima schermata, ma il valore informativo principale è già veicolato dal blocco titolo.

**Independent Test**: aprire la home e verificare che sottotitolo e pulsante siano in inglese, centrati, nell'ordine previsto, e che il pulsante porti alla sezione progetti.

**Acceptance Scenarios**:

1. **Given** un visitatore sulla home, **When** legge il testo sotto il blocco titolo, **Then** trova un sottotitolo in inglese che comunica lo stesso significato del testo italiano attuale (portfolio di progetti end-to-end, dall'estrazione dati alla modellazione fino alla comunicazione dei risultati).
2. **Given** il sottotitolo visibile, **When** se ne osserva la posizione, **Then** la distanza verticale dal blocco titolo è maggiore di quella presente prima di questa modifica.
3. **Given** il sottotitolo visibile, **When** se ne osserva l'allineamento, **Then** risulta allineato al centro.
4. **Given** il sottotitolo visibile, **When** si osserva l'elemento immediatamente successivo, **Then** è il pulsante di invito all'azione, centrato e con testo in inglese.
5. **Given** il pulsante visibile, **When** il visitatore lo attiva, **Then** viene portato alla sezione progetti della home, esattamente come prima della modifica.

---

### Edge Cases

- **Schermo molto stretto (≈320px)**: la terza riga del titolo e il sottotitolo vanno a capo su più righe; il testo deve restare centrato e non deve mai produrre scorrimento orizzontale della pagina.
- **Intestazione più lunga di prima**: il nuovo testo dell'intestazione è sensibilmente più lungo di "Data Scientist Junior"; su schermi stretti deve poter convivere con i collegamenti di navigazione senza sovrapposizioni né troncamenti illeggibili.
- **Lettura con screen reader**: le tre righe del titolo devono essere annunciate come un unico titolo principale coerente, non come tre titoli separati o come frammenti scollegati.
- **Zoom del browser al 200%**: la gerarchia tra le tre righe deve restare percepibile e nessun testo deve risultare tagliato.
- **Riga vuota tra seconda e terza riga**: lo stacco deve essere ottenuto come spaziatura, non come contenuto testuale vuoto annunciato dagli assistive technology.
- **Ancora della CTA**: il resto del sito non è tradotto in questa spec, quindi il pulsante in inglese deve continuare a puntare alla sezione progetti esistente senza rompere il collegamento.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: L'intestazione in alto a sinistra DEVE riportare esattamente il testo `Valerio Quaranta - A Data Science Hub`, sostituendo il testo attuale "Data Scientist Junior".
- **FR-002**: L'intestazione DEVE continuare a funzionare come collegamento alla home page, raggiungibile sia con mouse sia da tastiera.
- **FR-003**: La riga "Valerio Quaranta — Data Scientist Junior" posta sopra il titolo hero DEVE essere rimossa completamente dalla sezione hero.
- **FR-004**: Il blocco titolo hero DEVE contenere, in quest'ordine, tre righe di testo: `The path`, `from noise to harmony`, `Machine Learning, SQL and Data Visualization applied to real life.`.
- **FR-005**: Le tre righe DEVONO avere dimensioni di carattere decrescenti: la seconda riga leggermente inferiore alla prima, la terza inferiore alla seconda.
- **FR-006**: Tra la seconda e la terza riga DEVE essere presente uno stacco verticale percepibilmente maggiore della distanza tra la prima e la seconda riga.
- **FR-007**: L'intero blocco titolo DEVE essere allineato al centro (allineamento del testo, non solo posizionamento del blocco nella pagina).
- **FR-008**: Le tre righe DEVONO costituire un unico titolo principale della pagina ai fini di accessibilità e struttura del documento (un solo titolo di primo livello nella pagina).
- **FR-009**: Il sottotitolo DEVE essere in inglese e comunicare lo stesso contenuto informativo del testo italiano attuale ("Portfolio di progetti end-to-end — dall'estrazione dati alla modellazione, fino alla comunicazione dei risultati.").
- **FR-010**: Il sottotitolo DEVE trovarsi a una distanza verticale dal blocco titolo maggiore di quella presente prima di questa modifica.
- **FR-011**: Il sottotitolo DEVE essere allineato al centro.
- **FR-012**: Il pulsante di invito all'azione DEVE riportare un testo in inglese al posto di "Guarda i progetti".
- **FR-013**: Il pulsante DEVE essere collocato immediatamente sotto il sottotitolo e centrato.
- **FR-014**: Il pulsante DEVE continuare a portare alla sezione progetti della home, senza modificare il collegamento esistente.
- **FR-015**: Nessun altro testo del sito (navigazione, sezione progetti, sezione About, piè di pagina) DEVE essere modificato o tradotto in questa feature.
- **FR-016**: Nessuna sezione DEVE essere aggiunta, rimossa o ristrutturata oltre a quanto descritto: la modifica riguarda solo intestazione e contenuto della sezione hero.
- **FR-017**: Intestazione e sezione hero DEVONO restare leggibili e prive di scorrimento orizzontale su viewport da 320px in su.
- **FR-018**: Il livello di contrasto e la navigabilità da tastiera già garantiti DEVONO essere preservati per tutti gli elementi modificati.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Il 100% dei testi visibili in intestazione e sezione hero è in inglese al termine della modifica.
- **SC-002**: Nella prima schermata della home, senza scorrere, il visitatore vede le tre righe del titolo, il sottotitolo e il pulsante su un viewport desktop standard (1280×800).
- **SC-003**: Le dimensioni di carattere delle tre righe del titolo sono strettamente decrescenti (riga 1 > riga 2 > riga 3) su tutti i viewport testati (320px, 768px, 1280px).
- **SC-004**: La distanza verticale tra blocco titolo e sottotitolo è aumentata rispetto alla versione precedente su tutti i viewport testati.
- **SC-005**: Nessuno scorrimento orizzontale della pagina si verifica su viewport da 320px a 1920px.
- **SC-006**: La pagina home contiene esattamente un titolo di primo livello.
- **SC-007**: Il controllo di accessibilità automatizzato sulla home non riporta nuove violazioni rispetto alla versione precedente (zero regressioni).
- **SC-008**: Il collegamento del pulsante alla sezione progetti funziona nel 100% dei casi testati.
- **SC-009**: Nessun file al di fuori di intestazione, sezione hero e relativi stili risulta modificato.

## Assumptions

- **Testo del sottotitolo**: si adotta "An end-to-end project portfolio — from data extraction to modeling, all the way to communicating results."; l'utente ha esplicitamente aperto a variazioni di tono in fase di implementazione, quindi una riformulazione equivalente in inglese è accettabile.
- **Testo del pulsante**: si adotta "View Projects" (esempio fornito dall'utente, non vincolato alla lettera).
- **Struttura del titolo**: le tre righe restano dentro un unico titolo principale, con le righe realizzate come suddivisioni interne; questo preserva la struttura del documento e la lettura da screen reader.
- **Ancora della sezione progetti**: il collegamento esistente verso la sezione progetti non viene rinominato in questa feature; la sua eventuale traduzione appartiene alla spec successiva sul resto del sito.
- **Lingua dichiarata della pagina**: la lingua dichiarata del documento resta invariata in questa feature, perché la maggior parte dei contenuti del sito è ancora in italiano; l'allineamento avverrà nella spec di traduzione completa.
- **Nessun cambio di palette o di font**: la modifica agisce su copy, dimensioni relative, spaziatura e allineamento, non sull'identità cromatica o sulla famiglia tipografica già definite.

## Verbatim Constraints

Valori pinnati dall'utente, da rispettare alla lettera:

- Intestazione: `Valerio Quaranta - A Data Science Hub`
- Titolo hero, riga 1: `The path`
- Titolo hero, riga 2: `from noise to harmony`
- Titolo hero, riga 3: `Machine Learning, SQL and Data Visualization applied to real life.`
- Testo da rimuovere sopra il titolo: `Valerio Quaranta — Data Scientist Junior`
- Testo attualmente da sostituire nell'intestazione: `Data Scientist Junior`
- Sottotitolo italiano da tradurre: `Portfolio di progetti end-to-end — dall'estrazione dati alla modellazione, fino alla comunicazione dei risultati.`
- Testo del pulsante da tradurre: `Guarda i progetti`

## Out of Scope

- Traduzione del resto del sito (navigazione, progetti, piè di pagina) — spec successiva.
- Comportamento di "Visualizza presentazione" / anteprima PDF — spec successiva.
- Contenuto della sezione About — spec futura.
- Redesign strutturale della pagina, nuove sezioni, cambio di palette o di famiglia tipografica.
