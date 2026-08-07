# Feature Specification: Traduzione in inglese dell'interfaccia

**Feature Branch**: `003-english-ui-translation`

**Created**: 2026-08-07

**Status**: Draft

**Input**: User description: "Traduzione in inglese dell'interfaccia del sito (spec 003 — solo UI, i contenuti dei progetti e About restano a una spec successiva). La spec 002 ha già tradotto intestazione e sezione hero della home; il resto del sito è ancora in italiano, quindi oggi la prima schermata è inglese ma la scheda del browser è italiana. Include il passaggio di `<html lang>` da `it` a `en` e la rinomina dell'ancora `#progetti` in `#projects`. Fuori scope: i contenuti di `src/content/projects/*.md` e `src/content/about/about.md` (spec 004). Nessun redesign. Decisione già presa: sito monolingua inglese, niente selettore di lingua."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - L'impalcatura del sito parla una lingua sola (Priority: P1)

Un visitatore atterra sulla home e prosegue nella navigazione. Dopo il blocco hero — già in inglese dalla spec 002 — trova la sezione dei progetti intitolata "Projects", non "Progetti". Il collegamento di salto per la tastiera, l'etichetta accessibile della barra di navigazione e il piè di pagina sono anch'essi in inglese. Il pulsante di chiamata all'azione dell'hero continua a portarlo alla sezione progetti, che ora vive su un'ancora in inglese coerente con il resto degli identificatori.

**Why this priority**: è l'incoerenza più visibile lasciata aperta dalla spec 002. Un visitatore che scorre la home passa in due schermate da un titolo inglese a un titolo di sezione italiano: da sola questa storia elimina lo stacco percepito più forte, anche se controlli e metadati restassero invariati.

**Independent Test**: aprire la home, scorrere fino alla sezione progetti e verificare che il titolo sia "Projects"; attivare la chiamata all'azione dell'hero e verificare che porti alla sezione; premere Tab dall'inizio della pagina e verificare che il primo elemento focalizzabile mostri il collegamento di salto in inglese; ispezionare il piè di pagina.

**Acceptance Scenarios**:

1. **Given** un visitatore sulla home, **When** scorre fino alla sezione dei progetti, **Then** il titolo della sezione è "Projects".
2. **Given** un visitatore sulla home, **When** attiva il pulsante "View Projects" dell'hero, **Then** la vista si porta sulla sezione dei progetti, senza collegamenti interrotti.
3. **Given** un visitatore che naviga da tastiera su qualsiasi pagina, **When** preme Tab dall'inizio del documento, **Then** il primo elemento focalizzabile è un collegamento di salto etichettato "Skip to main content", e attivarlo porta il focus al contenuto principale.
4. **Given** un utente di screen reader su qualsiasi pagina, **When** raggiunge la barra di navigazione principale, **Then** questa viene annunciata con un'etichetta in inglese ("Main navigation").
5. **Given** un visitatore su qualsiasi pagina, **When** raggiunge il piè di pagina, **Then** legge un testo interamente in inglese, con l'anno corrente invariato.
6. **Given** un visitatore su qualsiasi pagina del sito, **When** ne ispeziona intestazione, navigazione, titoli di sezione e piè di pagina, **Then** nessuna di queste etichette è in italiano.

---

### User Story 2 - I controlli dei progetti sono utilizzabili da un pubblico anglofono (Priority: P2)

Nella sezione progetti il visitatore filtra le schede per tecnologia usando un gruppo di pulsanti il cui primo elemento è "All", non "Tutti". Sulle schede, i collegamenti a GitHub e LinkedIn dichiarano in inglese che si aprono in una nuova scheda, e il gruppo dei tag tecnologici è annunciato in inglese. Dove è disponibile una presentazione, il visitatore trova pulsanti in inglese per aprirla, chiuderla e scaricarla, e — se la apre — messaggi di caricamento, errore e navigazione tra le pagine anch'essi in inglese.

**Why this priority**: sono gli unici elementi interattivi del sito. Un pubblico anglofono può leggere una pagina in lingua mista, ma un controllo etichettato in una lingua che non conosce blocca l'azione. Vale P2 e non P1 perché il visitatore incontra questi controlli solo dopo aver scorso oltre la prima schermata.

**Independent Test**: aprire la sezione progetti, leggere le etichette dei pulsanti di filtro, aprire e chiudere una presentazione PDF e navigarne le pagine, verificando che ogni etichetta, messaggio di stato e testo per screen reader sia in inglese.

**Acceptance Scenarios**:

1. **Given** il filtro dei progetti visibile, **When** il visitatore ne legge i pulsanti, **Then** il primo pulsante — quello che mostra tutti i progetti — è etichettato "All", e gli altri conservano le sigle tecniche già neutre (SQL, ML, Viz, Python).
2. **Given** un utente di screen reader sul filtro dei progetti, **When** vi entra, **Then** il gruppo è annunciato con un'etichetta in inglese.
3. **Given** una scheda progetto con collegamenti esterni, **When** un utente di screen reader ne raggiunge il collegamento GitHub o LinkedIn, **Then** l'annuncio dichiara in inglese che il collegamento si apre in una nuova scheda.
4. **Given** una scheda progetto con presentazione, **When** il visitatore ne legge i pulsanti a presentazione chiusa, **Then** trova un pulsante di apertura e uno di download entrambi in inglese.
5. **Given** una presentazione aperta, **When** il visitatore legge il pulsante che la richiude, **Then** questo è in inglese.
6. **Given** una presentazione in corso di caricamento, **When** viene annunciato lo stato, **Then** il messaggio è in inglese e cita il titolo del progetto.
7. **Given** una presentazione con più pagine, **When** il visitatore ne legge i controlli di navigazione, **Then** i pulsanti precedente/successiva e l'indicatore di pagina sono in inglese.
8. **Given** una presentazione che non riesce a caricare, **When** viene mostrato l'errore, **Then** il messaggio è in inglese.
9. **Given** un visitatore che scarica una presentazione, **When** il file viene salvato, **Then** il nome proposto non contiene parole italiane nei casi in cui è il sito a generarlo.

---

### User Story 3 - Scheda del browser, condivisioni e ricerca sono in inglese (Priority: P3)

Il visitatore apre la home o la pagina About: la scheda del browser mostra un titolo in inglese. Se condivide il collegamento su LinkedIn o lo salva nei preferiti, l'anteprima e il nome salvato sono in inglese. Un recruiter che trova il sito da un motore di ricerca legge una descrizione in inglese. Sulla pagina About, anche le intestazioni delle sezioni — competenze e contatti — sono in inglese, e un messaggio di posta avviato dal sito ha un oggetto precompilato in inglese.

**Why this priority**: è la storia che chiude il difetto citato nell'input ("la prima schermata è inglese ma la scheda del browser è italiana") e ha il raggio d'azione più ampio, perché tocca anteprime di condivisione e risultati di ricerca. Vale P3 perché non è visibile nel corpo della pagina: un visitatore già arrivato sul sito può completare ogni azione anche senza questa storia.

**Independent Test**: aprire home e About e leggere il titolo nella scheda del browser; ispezionare i metadati di descrizione e di anteprima social di entrambe le pagine; leggere le intestazioni di sezione della pagina About; attivare il collegamento di contatto e verificare l'oggetto precompilato.

**Acceptance Scenarios**:

1. **Given** un visitatore che apre la home, **When** legge la scheda del browser, **Then** il titolo è interamente in inglese.
2. **Given** un visitatore che apre la pagina About, **When** legge la scheda del browser, **Then** il titolo è interamente in inglese.
3. **Given** una qualsiasi pagina del sito, **When** se ne ispeziona la descrizione usata da motori di ricerca e anteprime di condivisione, **Then** è in inglese e descrive la pagina in modo pertinente.
4. **Given** una qualsiasi pagina del sito, **When** se ne ispezionano i metadati di anteprima social, **Then** riportano lo stesso titolo e la stessa descrizione in inglese della pagina, senza residui italiani.
5. **Given** un visitatore sulla pagina About, **When** ne legge le intestazioni di sezione, **Then** sono in inglese.
6. **Given** un visitatore sulla pagina About, **When** attiva il collegamento di contatto via posta elettronica, **Then** l'oggetto precompilato del messaggio è in inglese.

---

### User Story 4 - Il sito dichiara correttamente la propria lingua (Priority: P4)

Uno screen reader o un servizio di traduzione automatica apre una pagina del sito e ne rileva la lingua dichiarata: inglese. La pronuncia sintetica applicata alle etichette di interfaccia è quella corretta, e i motori di ricerca indicizzano il sito come contenuto in lingua inglese.

**Why this priority**: è l'ultimo anello e dipende da tutti gli altri. Dichiarare l'inglese su un'interfaccia ancora italiana peggiorerebbe la situazione attuale, perché applicherebbe una pronuncia sbagliata a testo che oggi viene letto correttamente. Va quindi consegnata solo dopo le storie P1–P3, e vale come storia separata proprio per rendere esplicito quel vincolo di ordine.

**Independent Test**: ispezionare la lingua dichiarata dal documento su home e About e verificare che sia inglese; verificare con uno screen reader che le etichette di interfaccia siano pronunciate in inglese.

**Acceptance Scenarios**:

1. **Given** una qualsiasi pagina del sito, **When** se ne ispeziona la lingua dichiarata a livello di documento, **Then** è inglese.
2. **Given** uno screen reader su una qualsiasi pagina, **When** legge le etichette di navigazione e i titoli di sezione, **Then** applica la pronuncia inglese.
3. **Given** che i contenuti dei progetti e della sezione About restano in italiano fino alla spec 004, **When** uno screen reader raggiunge uno di quei blocchi di testo, **Then** li legge con pronuncia inglese: nessuna marcatura di lingua per blocco viene introdotta, ed è un compromesso accettato che si chiude con la spec 004.

---

### Edge Cases

- **Collegamenti esterni all'ancora vecchia**: un collegamento condiviso in precedenza che punta a `#progetti` non troverà più la destinazione dopo la rinomina. L'ancora non è mai stata pubblicizzata al di fuori del sito e la pagina si apre comunque in cima: si accetta la rottura senza introdurre alias o redirect.
- **Etichetta della presentazione definita nei contenuti**: il testo del pulsante che apre una presentazione arriva dai metadati del progetto anziché dall'interfaccia. Va tradotto insieme all'interfaccia (FR-023), altrimenti resterebbe l'unico controllo italiano del sito; il valore di riserva definito nel componente (FR-014) va tradotto comunque, perché entra in gioco per ogni progetto futuro che ometta il campo.
- **Testo di interfaccia più lungo dopo la traduzione**: un'etichetta inglese più lunga dell'italiana non deve mandare a capo in modo scomposto né far comparire scorrimento orizzontale sugli schermi stretti (320px).
- **Anno del piè di pagina**: l'anno è calcolato dinamicamente e non va toccato dalla traduzione.
- **Etichette già neutre**: sigle e nomi propri (SQL, ML, Viz, Python, GitHub, LinkedIn, PDF, About, Home) non vanno "tradotti": restano identici.
- **Pagina di errore e stati vuoti**: se il sito espone una pagina non-trovata o uno stato "nessun progetto per questo filtro", vale la stessa regola delle altre etichette di interfaccia.

## Requirements *(mandatory)*

### Functional Requirements

#### Impalcatura del sito (US1)

- **FR-001**: Il collegamento di salto al contenuto principale MUST essere in inglese ("Skip to main content").
- **FR-002**: L'etichetta accessibile della barra di navigazione principale MUST essere in inglese ("Main navigation").
- **FR-003**: Il testo del piè di pagina MUST essere in inglese, conservando il simbolo di copyright e l'anno calcolato dinamicamente.
- **FR-004**: I collegamenti di navigazione "Home" e "About" MUST restare invariati, essendo già validi in inglese.
- **FR-005**: L'intestazione con nome e natura del sito, definita dalla spec 002, MUST restare invariata.
- **FR-006**: Il titolo della sezione dei progetti MUST essere "Projects".
- **FR-007**: L'identificatore della sezione dei progetti MUST essere `projects` anziché `progetti`, e ogni identificatore correlato usato per l'etichettatura accessibile della sezione MUST essere rinominato di conseguenza.
- **FR-008**: Il collegamento della chiamata all'azione dell'hero MUST puntare alla nuova ancora `#projects` e MUST continuare a portare alla sezione dei progetti.
- **FR-009**: Il sistema MUST NOT lasciare alcun riferimento all'ancora `#progetti` nel codice sorgente del sito.

#### Controlli dei progetti (US2)

- **FR-010**: Il pulsante di filtro che mostra tutti i progetti MUST essere etichettato "All".
- **FR-011**: L'etichetta accessibile del gruppo di pulsanti di filtro MUST essere in inglese.
- **FR-012**: L'etichetta accessibile del gruppo di tag tecnologici sulle schede progetto MUST essere in inglese.
- **FR-013**: Il testo riservato agli screen reader che avverte dell'apertura in una nuova scheda MUST essere in inglese, su tutte le sue occorrenze (schede progetto e pagina About).
- **FR-014**: Il pulsante che apre una presentazione MUST usare un'etichetta in inglese quando l'etichetta non è fornita dal contenuto del progetto.
- **FR-015**: Il pulsante che richiude una presentazione aperta MUST essere in inglese.
- **FR-016**: Il pulsante di download della presentazione MUST essere in inglese.
- **FR-017**: Il nome file proposto in download, quando è il sito a generarlo come valore di riserva, MUST NOT contenere parole italiane.
- **FR-018**: Il messaggio di stato mostrato durante il caricamento di una presentazione MUST essere in inglese e MUST continuare a citare il titolo del progetto.
- **FR-019**: Il messaggio di errore mostrato quando una presentazione non può essere caricata MUST essere in inglese.
- **FR-020**: I controlli di navigazione tra le pagine di una presentazione — pulsante precedente, pulsante successiva e indicatore di posizione — MUST essere in inglese.

#### Metadati e pagina About (US3)

- **FR-021**: Titolo e descrizione della home e della pagina About MUST essere in inglese; la descrizione MUST restare pertinente al contenuto della pagina e adatta a comparire nei risultati di ricerca.
- **FR-022**: Le intestazioni di sezione della pagina About (competenze e contatti) e l'oggetto precompilato del messaggio di posta avviato dal sito MUST essere in inglese.

#### Confine con i contenuti (US2/US3)

- **FR-023**: L'etichetta del pulsante di apertura della presentazione dichiarata nei metadati dei contenuti di progetto MUST essere tradotta in inglese in questa feature, su tutte e cinque le sue occorrenze. È l'unica eccezione consentita al confine con la spec 004: è un'etichetta di interfaccia che risiede nei metadati, non contenuto editoriale. La modifica MUST limitarsi a quel campo, senza toccare titolo, descrizione o corpo dei case study.

#### Dichiarazione di lingua (US4)

- **FR-024**: La lingua dichiarata a livello di documento MUST essere l'inglese su tutte le pagine. I blocchi di testo che restano in italiano fino alla spec 004 — descrizioni dei progetti, sintesi ed elenco competenze della pagina About — MUST NOT ricevere una marcatura di lingua propria: il disallineamento tra lingua dichiarata e lingua di quei blocchi è uno stato intermedio accettato consapevolmente e si chiude con la spec 004.
- **FR-025**: La modifica della lingua dichiarata MUST essere applicata solo dopo che le etichette di interfaccia di FR-001…FR-023 sono state tradotte.

#### Vincoli trasversali

- **FR-026**: Il sistema MUST NOT introdurre un selettore di lingua, routing per lingua, contenuti duplicati per lingua o metadati di lingue alternative: il sito resta monolingua.
- **FR-027**: Il sistema MUST NOT modificare layout, palette, tipografia, spaziature o animazioni: questa feature sostituisce testo e identificatori.
- **FR-028**: Il sistema MUST NOT modificare il corpo dei contenuti in `src/content/projects/*.md` e `src/content/about/about.md` (titoli, descrizioni, sintesi, elenco competenze), riservati alla spec 004. Unica eccezione: il campo dell'etichetta di presentazione previsto da FR-023.
- **FR-029**: Ogni etichetta tradotta MUST restare leggibile senza troncamenti né scorrimento orizzontale della pagina fino a una larghezza di viewport di 320px.
- **FR-030**: Sigle, nomi propri e marchi già validi in inglese (SQL, ML, Viz, Python, GitHub, LinkedIn, PDF, Home, About) MUST restare invariati.

### Key Entities

- **Etichetta di interfaccia**: una stringa di testo generata dal sito e non proveniente dai contenuti dei progetti o della pagina About. Comprende testo visibile, testo riservato agli screen reader, etichette accessibili, messaggi di stato ed errore, titoli e descrizioni di pagina. È l'unità di lavoro di questa feature.
- **Contenuto di progetto o profilo**: testo redatto e versionato come dato strutturato nelle raccolte di contenuti. Fuori scope, con l'unica eccezione definita in FR-023.
- **Ancora di sezione**: identificatore usato per il collegamento interno alla sezione dei progetti e per la sua etichettatura accessibile. Va rinominato in modo coordinato ovunque compaia.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero etichette di interfaccia in italiano su tutte le pagine del sito: una rassegna manuale di home e About — testo visibile, testo per screen reader, titoli delle schede del browser, messaggi di stato ed errore — non rileva alcuna occorrenza italiana al di fuori dei contenuti riservati alla spec 004.
- **SC-002**: Un visitatore anglofono completa senza incontrare testo italiano il percorso principale del sito: apertura della home, uso del filtro dei progetti, apertura e chiusura di una presentazione, download della presentazione, visita della pagina About.
- **SC-003**: Il 100% dei collegamenti interni e delle ancore resta funzionante dopo la rinomina: nessun collegamento della chiamata all'azione o della navigazione porta a una destinazione inesistente.
- **SC-004**: Il titolo mostrato nella scheda del browser è in inglese su entrambe le pagine, così come la descrizione usata nei risultati di ricerca e nelle anteprime di condivisione.
- **SC-005**: La lingua dichiarata dalle pagine è l'inglese e coincide con la lingua effettiva delle etichette di interfaccia.
- **SC-006**: Nessuna regressione di accessibilità: la navigazione da tastiera, il collegamento di salto e le etichette annunciate dagli screen reader funzionano come prima della modifica, con verifica automatica priva di violazioni nuove.
- **SC-007**: Nessuna regressione visiva: a 320px, 768px e 1280px non compare scorrimento orizzontale della pagina e nessuna etichetta risulta troncata o sovrapposta.
- **SC-008**: Il confine con la spec 004 è rispettato: nei file di contenuto dei progetti l'unica modifica è il campo dell'etichetta di presentazione, e il file di contenuto della pagina About non risulta modificato affatto.

## Assumptions

- **Monolingua inglese**: decisione già presa a monte e non riaperta da questa spec. Non esistono quindi requisiti di routing per lingua, `hreflang`, contenuti duplicati o selettore di lingua.
- **Ambito "interfaccia" esteso ai componenti non elencati nell'input** (confermato il 2026-08-07): l'input elenca i file principali, ma la stessa regola si applica a ogni etichetta generata dal sito. Sono quindi inclusi anche i componenti non nominati esplicitamente che contengono etichette di interfaccia italiane — in particolare i controlli di navigazione fra le pagine del PDF, i suoi messaggi di caricamento ed errore, e le intestazioni di sezione con l'oggetto della mail di contatto nella pagina About. Escluderli lascerebbe italiana una parte visibile dell'interfaccia e mancherebbe l'obiettivo dichiarato della feature.
- **Le intestazioni "Competenze" e "Contatti" della pagina About sono interfaccia, non contenuto**: sono etichette definite nel componente di presentazione, non nel file di contenuto del profilo. Rientrano quindi nella 003; i valori che riempiono quelle sezioni (sintesi ed elenco competenze) restano alla 004.
- **L'ancora `#progetti` non ha diffusione esterna**: nessun redirect o alias viene predisposto per la vecchia ancora.
- **Il piè di pagina conserva la propria struttura**: cambia solo la formulazione testuale; anno dinamico e simbolo di copyright restano.
- **Nessuna suite di test esistente asserisce le stringhe italiane**: le directory di test del progetto sono vuote, quindi la traduzione non rompe test esistenti. Le verifiche di questa feature saranno nuove.
- **Ordine di consegna vincolato**: la dichiarazione di lingua (US4) va applicata per ultima, dopo la traduzione delle etichette. È un vincolo di sequenza, non solo una priorità.
- **La spec 004 resta necessaria**: al termine della 003 il sito ha un'interfaccia interamente inglese ma contenuti di progetto e profilo ancora italiani. È uno stato intermedio accettato e dichiarato, non un difetto della 003.
- **Disallineamento di pronuncia accettato fino alla 004** (decisione del 2026-08-07): dichiarando l'inglese senza marcare i blocchi ancora italiani, per la durata dell'intervallo tra la 003 e la 004 gli screen reader leggono descrizioni dei progetti e sintesi About con fonetica inglese. La scelta privilegia una modifica minima e reversibile; il costo è circoscritto nel tempo e si annulla con la 004, che va quindi tenuta a breve distanza. La marcatura per blocco resta la soluzione di riserva se la 004 dovesse slittare a lungo.
- **Eccezione di confine circoscritta a un solo campo** (decisione del 2026-08-07): la 003 tocca i file dei contenuti di progetto solo per l'etichetta di presentazione. Ogni altra modifica a quei file appartiene alla 004.

## Dependencies

- **Spec 002 (header e hero)**: completata e in produzione. La 003 chiude due code lasciate aperte di proposito dalla 002 (metadati della home e rinomina dell'ancora) e non modifica il testo dell'intestazione né del blocco hero.
- **Spec 004 (traduzione dei contenuti)**: dipendente da questa, non viceversa. La decisione presa in FR-024 ne determina la priorità: più a lungo la 004 slitta, più a lungo dura l'eventuale disallineamento tra lingua dichiarata e lingua dei contenuti.

## Out of Scope

- Traduzione del corpo dei contenuti dei cinque case study e della sezione About (spec 004).
- Qualsiasi redesign: layout, palette, tipografia, spaziature, animazioni.
- Selettore di lingua, versione bilingue, routing per lingua, metadati di lingue alternative.
- Traduzione della documentazione di repository (`README.md`), dei commenti di codice e degli artefatti di spec: non fanno parte dell'interfaccia vista dal visitatore.
- Nuove funzionalità, nuove sezioni o nuove pagine.
