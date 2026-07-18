# Feature Specification: Portfolio Data Scientist – Showcase Competenze

**Feature Branch**: `001-portfolio-showcase`

**Created**: 2026-07-16

**Status**: Draft

**Input**: User description: "Landing Page d'impatto che riassuma la proposta di valore; Project Grid per 5 progetti con tag (SQL, ML, Viz), descrizione e link a GitHub/LinkedIn; sistema per visualizzare o scaricare presentazioni PDF create con Canva; sezione 'About' ottimizzata per recruiter. Focus: 'Come recruiter, voglio vedere subito le competenze tecniche tramite i progetti reali'"

## Clarifications

### Session 2026-07-16

- Q: Come deve gestire il sito le presentazioni PDF create con Canva? → A: Embed + Download — il sito DEVE offrire sia un viewer PDF integrato in pagina sia un pulsante di download del file completo, quando la presentazione è disponibile.
- Q: Quale approccio di reattività deve guidare la progettazione del sito? → A: Priorità paritaria — nessun breakpoint (mobile, tablet, desktop) è progettato come prioritario rispetto agli altri; l'esperienza deve essere ugualmente curata su tutti e tre.
- Q: Come devono essere strutturati i dati dei 5 progetti nel portfolio? → A: File dati esterno — i contenuti dei progetti (titolo, descrizione, tag, link, riferimento PDF) DEVONO risiedere in file dati strutturati separati dal codice dei componenti UI (es. JSON/YAML/Markdown con frontmatter), non hardcoded nei componenti.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Valutare le competenze tecniche tramite progetti reali (Priority: P1)

Come recruiter o hiring manager tecnico, voglio vedere subito, senza dover cercare, un
insieme di progetti reali del candidato — con tag tecnologici, descrizione e link
verificabili (GitHub/LinkedIn) — così da poter valutare in pochi minuti se le
competenze tecniche corrispondono al ruolo aperto.

**Why this priority**: È la user story esplicitamente indicata come priorità dal
proprietario del prodotto ed è l'azione che determina se il recruiter prosegue la
valutazione del candidato o abbandona la pagina. Senza questa funzionalità il
portfolio non assolve al suo scopo primario.

**Independent Test**: Può essere testata pubblicando la Project Grid con 5 progetti
popolati e verificando che un utente, senza istruzioni aggiuntive, riesca a
identificare tag, descrizione e almeno un link esterno funzionante per ciascun
progetto.

**Acceptance Scenarios**:

1. **Given** un recruiter arriva sulla pagina progetti, **When** la pagina si carica,
   **Then** sono visibili tutti e 5 i progetti con titolo, descrizione sintetica e
   almeno un tag tecnologico (SQL, ML o Viz) ciascuno.
2. **Given** un recruiter osserva un progetto nella grid, **When** seleziona un tag
   (es. "ML"), **Then** vede solo i progetti associati a quel tag.
3. **Given** un recruiter è interessato a un progetto, **When** seleziona il link
   GitHub o LinkedIn associato, **Then** viene indirizzato alla risorsa esterna
   corretta in una nuova scheda, senza perdere la sessione sul portfolio.

---

### User Story 2 - Comprendere la proposta di valore in pochi secondi (Priority: P2)

Come visitatore (recruiter o hiring manager) che apre il portfolio per la prima
volta, voglio capire immediatamente chi è il candidato, quale valore porta e in
quale ambito è specializzato, così da decidere rapidamente se continuare
l'esplorazione del sito.

**Why this priority**: La landing page è il primo punto di contatto: se la proposta
di valore non è chiara, il recruiter potrebbe non arrivare mai alla Project Grid
(User Story 1). È quindi un requisito abilitante di altissima priorità, secondo solo
alla prova concreta delle competenze.

**Independent Test**: Può essere testata mostrando solo la landing page a un
utente e chiedendo, dopo pochi secondi di visione, di riassumere chi è il candidato
e in quale area è specializzato.

**Acceptance Scenarios**:

1. **Given** un visitatore apre la home page, **When** la pagina si carica sopra la
   piega ("above the fold"), **Then** sono visibili nome/ruolo del candidato, una
   sintesi della proposta di valore e una call-to-action verso i progetti.
2. **Given** un visitatore legge la landing page, **When** valuta il contenuto,
   **Then** riesce a identificare l'ambito di specializzazione (Data Science) senza
   dover scorrere oltre la prima sezione.

---

### User Story 3 - Approfondire un progetto tramite le presentazioni Canva (Priority: P3)

Come recruiter interessato a un progetto specifico, voglio poter visualizzare o
scaricare la presentazione PDF creata con Canva relativa a quel progetto, così da
approfondire metodologia e risultati in un formato visivamente curato senza dover
contattare il candidato.

**Why this priority**: Arricchisce la valutazione del recruiter già convinto
dall'User Story 1, ma non è bloccante per il giudizio iniziale: un progetto è
comunque comprensibile tramite descrizione e link anche senza il PDF.

**Independent Test**: Può essere testata aprendo un progetto dotato di
presentazione e verificando che l'utente riesca a visualizzarla in pagina e/o
scaricarla come file PDF.

**Acceptance Scenarios**:

1. **Given** un progetto ha una presentazione Canva associata, **When** il recruiter
   seleziona l'azione "Visualizza presentazione", **Then** il PDF viene mostrato
   all'interno del sito senza richiedere strumenti esterni.
2. **Given** un recruiter vuole conservare la presentazione, **When** seleziona
   "Scarica PDF", **Then** il file viene scaricato integralmente sul suo dispositivo.
3. **Given** un progetto non ha una presentazione associata, **When** il recruiter
   visualizza quel progetto, **Then** l'azione di visualizzazione/download non è
   mostrata (nessun link rotto o vuoto).

---

### User Story 4 - Valutare il profilo complessivo nella sezione About (Priority: P4)

Come recruiter che ha già visto i progetti, voglio una sezione "About" che riassuma
percorso, competenze trasversali e modalità di contatto in modo scorrevole e
professionale, così da completare la valutazione del profilo e sapere come
contattare il candidato.

**Why this priority**: Supporta la decisione finale del recruiter (contattare o
meno il candidato) ma interviene dopo che l'interesse è già stato generato dai
progetti e dalla landing page.

**Independent Test**: Può essere testata mostrando solo la sezione About e
verificando che un recruiter riesca a individuare in meno di 30 secondi: sintesi
professionale, elenco competenze e un canale di contatto.

**Acceptance Scenarios**:

1. **Given** un recruiter apre la sezione About, **When** legge il contenuto,
   **Then** trova una sintesi professionale, un elenco di competenze/tecnologie e
   almeno un canale di contatto (email o LinkedIn) senza dover navigare altrove.
2. **Given** un recruiter vuole contattare il candidato, **When** seleziona il
   canale di contatto nella sezione About, **Then** viene indirizzato correttamente
   (es. client email precompilato o profilo LinkedIn).

---

### Edge Cases

- Cosa succede se un progetto non ha ancora un link GitHub o LinkedIn valido? Il
  link non deve essere mostrato come elemento cliccabile rotto.
- Come si comporta la Project Grid se un progetto ha più di un tag (es. sia "ML"
  che "Viz")? Deve comparire in entrambi i filtri.
- Cosa succede se un recruiter visita da mobile? Landing page, grid, viewer PDF e
  About devono restare fruibili e leggibili anche su schermi piccoli.
- Cosa succede se il file PDF della presentazione è molto pesante o la connessione
  è lenta? Il sistema deve indicare chiaramente che il file è in caricamento/
  download, senza dare l'impressione che la pagina sia bloccata.
- Cosa succede se in futuro i progetti superano il numero di 5? La struttura dati
  e la Project Grid devono poter accogliere nuovi progetti senza modifiche
  strutturali (coerente con il principio di Scalabilità Architetturale).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Il sistema DEVE mostrare una landing page che comunica nome/ruolo del
  candidato e una sintesi della proposta di valore visibile senza scroll
  (above the fold) su ciascuno dei breakpoint desktop, tablet e mobile, con pari
  cura progettuale su tutti e tre (vedi FR-013).
- **FR-002**: La landing page DEVE includere una call-to-action che porti l'utente
  alla Project Grid.
- **FR-003**: Il sistema DEVE presentare una Project Grid contenente esattamente 5
  progetti nella versione iniziale, ciascuno con: titolo, descrizione sintetica, uno
  o più tag tecnologici e almeno un link esterno (GitHub e/o LinkedIn).
- **FR-004**: I tag disponibili per i progetti DEVONO includere almeno le categorie
  "SQL", "ML" e "Viz"; ogni progetto può avere uno o più tag associati.
- **FR-005**: Gli utenti DEVONO poter filtrare o individuare visivamente i progetti
  per tag all'interno della Project Grid.
- **FR-006**: Ogni link a GitHub o LinkedIn associato a un progetto DEVE aprirsi in
  una nuova scheda del browser, lasciando invariata la sessione sul portfolio.
- **FR-007**: Quando un progetto ha una presentazione PDF associata, il sistema
  DEVE offrire **entrambe** le seguenti modalità (non alternative tra loro): un
  viewer PDF integrato in pagina (embed) per la visualizzazione senza lasciare il
  sito, e un pulsante di download del file PDF integrale.
- **FR-008**: Il download del PDF DEVE restituire il file completo e integro,
  utilizzabile offline dal recruiter dopo il download.
- **FR-009**: Se un progetto non ha una presentazione PDF associata, il sistema NON
  DEVE mostrare azioni di visualizzazione/download per quel progetto (nessun
  elemento vuoto o non funzionante).
- **FR-010**: Il sistema DEVE includere una sezione "About" contenente: sintesi
  professionale del candidato, elenco di competenze/tecnologie e almeno un canale
  di contatto diretto (email e/o profilo LinkedIn).
- **FR-011**: La sezione "About" DEVE essere raggiungibile dalla navigazione
  principale del sito in non più di un'interazione (click/tap) dalla landing page.
- **FR-012**: I dati dei progetti (titolo, descrizione, tag, link, riferimento alla
  presentazione PDF) DEVONO risiedere in un file dati strutturato esterno, separato
  dal codice dei componenti di presentazione (es. JSON/YAML/Markdown con
  frontmatter), così da poter essere aggiornati senza modificare la UI —
  coerentemente con il principio "Data-First Design" della costituzione di
  progetto. Lo stesso approccio si applica ai contenuti testuali di landing page e
  About dove ragionevole.
- **FR-013**: Il sistema DEVE restare fruibile (contenuti leggibili, link e azioni
  utilizzabili) sui principali breakpoint desktop, tablet e mobile, senza dare
  priorità progettuale a un breakpoint rispetto agli altri: l'esperienza DEVE
  essere ugualmente curata su tutti e tre.

### Key Entities

- **Progetto**: rappresenta un case study del portfolio. Attributi chiave: titolo,
  descrizione sintetica, uno o più tag (SQL, ML, Viz, estendibili in futuro), link
  GitHub, link LinkedIn (opzionale se non pertinente), presentazione PDF associata
  (opzionale).
- **Presentazione (PDF)**: rappresenta il materiale visivo creato con Canva legato a
  un progetto. Attributi chiave: file PDF sorgente, progetto di riferimento,
  disponibilità per visualizzazione in pagina e per download.
- **Profilo (About)**: rappresenta le informazioni professionali del candidato non
  legate a un singolo progetto. Attributi chiave: sintesi professionale, elenco
  competenze/tecnologie, canali di contatto (email, LinkedIn).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un recruiter che apre il portfolio riesce a individuare almeno 3
  competenze tecniche del candidato entro 60 secondi dall'apertura della pagina,
  guardando solo landing page e Project Grid.
- **SC-002**: Il 100% dei 5 progetti pubblicati mostra correttamente titolo,
  descrizione, almeno un tag e almeno un link esterno funzionante.
- **SC-003**: Un utente riesce a visualizzare o scaricare la presentazione PDF di un
  progetto (quando disponibile) in 2 interazioni o meno a partire dalla Project
  Grid.
- **SC-004**: Un recruiter riesce a individuare un canale di contatto valido nella
  sezione About in meno di 30 secondi, senza dover lasciare il sito.
- **SC-005**: Il portfolio rimane pienamente utilizzabile (nessun contenuto tagliato
  o link non raggiungibile) sui tre principali breakpoint (desktop, tablet,
  mobile) testati.

## Assumptions

- Il numero di progetti nella versione iniziale è fissato a 5, come indicato dal
  proprietario del prodotto; la struttura dati deve comunque restare estendibile a
  un numero maggiore in futuro (principio di Scalabilità Architetturale).
- Le categorie di tag richieste in questa iterazione sono SQL, ML e Viz; l'elenco
  dei tag è considerato estendibile senza modifiche strutturali.
- Le presentazioni PDF sono già create in Canva ed esportate come file PDF statici;
  non è richiesta l'integrazione diretta con l'API di Canva in questa iterazione.
- Non tutti i progetti devono necessariamente avere sia link GitHub sia link
  LinkedIn: è richiesto almeno un link esterno verificabile per progetto.
- Il sito non richiede autenticazione: tutti i contenuti (landing page, progetti,
  presentazioni, About) sono pubblicamente accessibili.
- Non è richiesto un pannello di amministrazione (CMS) in questa iterazione; la
  gestione dei contenuti tramite dati strutturati versionati è considerata
  sufficiente, coerentemente con la costituzione di progetto.
