# Implementation Plan: Traduzione in inglese dell'interfaccia

**Branch**: `003-english-ui-translation` | **Date**: 2026-08-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification da `specs/003-english-ui-translation/spec.md`

## Summary

La feature sostituisce con testo inglese tutte le etichette di interfaccia ancora italiane —
24 stringhe distinte su 32 occorrenze — porta la lingua dichiarata del documento da `it` a `en` e
rinomina l'ancora della sezione progetti da `#progetti` a `#projects`.

L'approccio è interamente nel livello di presentazione: cambia il testo letterale di otto
componenti e pagine, più un singolo campo di metadati nei cinque contenuti di progetto. Nessuna
dipendenza nuova, nessun modulo nuovo, nessun livello di internazionalizzazione: il sito è
monolingua per decisione presa a monte, quindi le stringhe restano inline dove già si trovano
(research R1). Layout, palette, tipografia e animazioni non vengono toccati.

Due punti governano l'ordine e il rischio dell'implementazione. Primo: `<html lang="en">` è
l'**ultima** modifica applicata, perché dichiarare inglese su etichette ancora italiane
peggiorerebbe la pronuncia degli screen reader rispetto allo stato attuale — ogni stato intermedio
del branch deve restare non peggiore di `main` (research R4). Secondo: la rinomina dell'ancora
coinvolge **quattro** riferimenti, non uno, e tre di questi formano l'associazione
`aria-labelledby` che dà il nome accessibile alla sezione; aggiornarne solo una parte produce una
regressione invisibile a build, `astro check` e ispezione a vista (research R2). È il rischio
principale della feature ed è la ragione per cui la validazione include un controllo esplicito
dell'associazione.

La verifica combina uno sweep meccanico sul sorgente — tarato e provato contro il codice attuale,
dove restituisce 32 righe che devono scendere a 3 — con i controlli manuali Playwright/axe già in
uso nel progetto.

## Technical Context

| Voce | Valore |
|---|---|
| **Linguaggio / framework** | Astro 7 con componenti `.astro` a stile scoped; due isole React (`TagFilter.tsx`, `PdfViewer.tsx` + `PdfDocument.tsx`) |
| **Dipendenze nuove** | Nessuna |
| **Storage** | N/A — nessun dato persistito. Lo schema Zod in `src/content.config.ts` resta invariato; cambiano solo cinque valori del campo `pdfPresentation.label` |
| **Testing** | Scenari di `quickstart.md` eseguiti a mano: sweep `grep` sul sorgente, `npm run build`, `npx astro check`, Playwright + `@axe-core/playwright`. Nessuna suite versionata (research R8) |
| **Piattaforma target** | Sito statico (`output: 'static'`), browser moderni, viewport da 320px |
| **Tipo di progetto** | Applicazione web frontend-only, progetto Astro singolo |
| **Vincoli** | `lang` modificato per ultimo (FR-025); nessuno scorrimento orizzontale ≥320px; nessuna regressione axe; diff di **una sola riga** su ciascuno dei cinque contenuti di progetto; `src/content/about/about.md` non toccato |
| **Scala** | 8 file sorgente + 5 file di contenuto; due route interessate (`/`, `/about`) |

Nessun `NEEDS CLARIFICATION`: le tre ambiguità della spec sono state risolte dall'utente il
2026-08-07 e codificate in FR-023, FR-024 e nelle Assumptions.

## Constitution Check

Verifica contro `.specify/memory/constitution.md` v1.0.0. Gate prima della Fase 0, ri-verificato
dopo la Fase 1.

| Principio | Esito | Valutazione |
|---|---|---|
| **I. Data-First Design** | ✅ PASS | I dati di progetto non vengono toccati: schema Zod invariato, `src/lib/projects.ts` e `src/lib/about.ts` invariati, e dei cinque file di contenuto cambia il solo `pdfPresentation.label` — un'etichetta di interfaccia, non un elemento del case study (problema, dataset, metodologia, risultati, metriche restano intatti). Il vincolo «diff di una sola riga per file» in `quickstart.md` scenario 0 rende la conformità **verificabile**, non solo dichiarata. |
| **II. Scalabilità Architetturale** | ✅ PASS | Nessun accoppiamento nuovo fra dati e presentazione. La scelta di non introdurre un modulo centralizzato di stringhe (R1) è stata valutata **contro** questo principio e non lo viola: le etichette di interfaccia sono presentazione per definizione e restano nel livello corretto. La separazione contenuto/presentazione/logica resta quella della 001, e la 004 potrà tradurre i contenuti senza toccare un solo componente. |
| **III. Professionalità Creativa** | ✅ PASS | Un sito con la prima schermata inglese e la scheda del browser italiana comunica esattamente la mancanza di cura che questo principio vuole evitare: la feature la elimina. L'accessibilità — requisito «non negoziabile» degli Standard Tecnologici — è presidiata attivamente: nome accessibile della sezione verificato (INV-04), collegamento di salto e navigazione da tastiera ricontrollati (scenario 2), scansione axe ai tre viewport (INV-13). Cura tipografica mantenuta anche nei dettagli: i caporali `« »` diventano virgolette inglesi `“ ”` invece di ripiegare su virgolette dritte (R7). |

**Un punto di attrito da dichiarare, non da nascondere.** La decisione FR-024 — `lang="en"` senza
marcare i blocchi ancora italiani — produce, fino alla spec 004, una pronuncia sintetica errata su
descrizioni dei progetti e sintesi About. Rispetto agli Standard Tecnologici («l'accessibilità è un
requisito non negoziabile, non un'aggiunta opzionale») è una **regressione temporanea e circoscritta**
su testo che oggi viene letto correttamente.

Non è però una violazione da giustificare in Complexity Tracking, per tre ragioni: è una scelta
esplicita dell'utente presa a valle della raccomandazione contraria; non introduce complessità
architetturale, che è l'oggetto di quella sezione; ed è **reversibile con poche righe** nei
componenti di presentazione. La soluzione di riserva — marcare `lang="it"` sui blocchi residui — è
registrata in R4 e nel TODO locale con la relativa soglia di attivazione. La 004 chiude il punto.

Nessuna violazione architetturale da giustificare: la sezione **Complexity Tracking** è omessa.

## Project Structure

### Documentation (this feature)

```text
specs/003-english-ui-translation/
├── plan.md                 # Questo file
├── spec.md                 # Input — 30 requisiti funzionali, 8 criteri di successo
├── research.md             # Fase 0 — decisioni tecniche R1-R8 e alternative
├── quickstart.md           # Fase 1 — 9 scenari di validazione end-to-end
├── contracts/
│   └── ui-contract.md      # Fase 1 — tabella completa Da→A, identificatori, 13 invarianti
├── checklists/
│   └── requirements.md     # Spec quality checklist (16/16, validata in specify)
└── tasks.md                # Fase 2 — output di /speckit-tasks, non creato qui
```

Nessun `data-model.md`. La spec contiene una sezione *Key Entities*, ma le tre entità che elenca —
*Etichetta di interfaccia*, *Contenuto di progetto o profilo*, *Ancora di sezione* — sono
**categorie concettuali** che servono a tracciare il confine di scope con la spec 004, non entità
persistite. Lo schema dati reale (`src/content.config.ts`) non cambia di una riga: non c'è modello
da documentare, e un file di sole diciture «invariato» aggiungerebbe rumore senza informazione.
Stessa scelta e stessa motivazione della 002.

### Source Code (repository root)

```text
src/
├── layouts/
│   └── BaseLayout.astro              # MODIFICATO — skip link, aria-label nav, piè di pagina, lang (per ultimo)
├── pages/
│   ├── index.astro                   # MODIFICATO — title, description
│   └── about.astro                   # MODIFICATO — title, description
├── components/
│   ├── landing/
│   │   └── Hero.astro                # MODIFICATO — solo href della CTA (#progetti → #projects)
│   ├── projects/
│   │   ├── ProjectGrid.astro         # MODIFICATO — h2, 3 identificatori, valore di riserva label
│   │   ├── ProjectCard.astro         # MODIFICATO — aria-label tag, 2× testo screen reader
│   │   └── TagFilter.tsx             # MODIFICATO — etichetta "All", aria-label del gruppo
│   ├── pdf/
│   │   ├── PdfViewer.tsx             # MODIFICATO — chiusura, download, nome file, caricamento
│   │   └── PdfDocument.tsx           # MODIFICATO — errore, caricamento, paginazione
│   └── about/
│       └── AboutSection.astro        # MODIFICATO — Skills, Contact, oggetto mail, screen reader
├── content/
│   ├── projects/*.md  (5 file)       # MODIFICATO — solo pdfPresentation.label, 1 riga ciascuno
│   └── about/about.md                # INVARIATO — spec 004
├── lib/                              # INVARIATO — nessuna logica di accesso ai dati toccata
├── styles/global.css                 # INVARIATO — nessun token, nessun colore, nessuna spaziatura
└── content.config.ts                 # INVARIATO — schema Zod immutato
```

**Structure Decision**: la modifica attraversa otto file sorgente ma resta confinata al livello di
presentazione — in ciascuno cambia testo letterale, mai struttura, stile o logica. L'unica
eccezione al confine con la spec 004 è il campo `pdfPresentation.label` nei cinque contenuti di
progetto, circoscritta a una riga per file e verificabile con `git diff --stat`. Gli stili restano
scoped nei rispettivi componenti come nel resto del progetto: `global.css` non viene aperto.

## Phase 0 — Research

Completata: vedi [research.md](./research.md). Sintesi delle otto decisioni:

- **R1** — stringhe inline nei componenti, nessun modulo centralizzato né livello i18n: il sito è
  monolingua e le etichette di interfaccia sono già nel livello architetturale corretto.
- **R2** — la rinomina dell'ancora tocca **quattro** riferimenti, tre dei quali formano
  l'associazione `aria-labelledby`: aggiornarli a metà è una regressione di accessibilità
  silenziosa. È il rischio principale della feature.
- **R3** — l'etichetta PDF va tradotta in **due** punti: i cinque frontmatter e il valore di riserva
  in `ProjectGrid.astro`, che non è codice morto perché `label` è `.optional()` nello schema.
- **R4** — `lang="en"` è l'ultima modifica applicata; l'ordine è una proprietà di sicurezza del
  rilascio, non una preferenza.
- **R5** — il messaggio di caricamento è duplicato in due componenti: si allineano, non si
  rifattorizzano (sarebbe il modulo centralizzato scartato in R1, introdotto di straforo).
- **R6** — copy di titoli e descrizioni con il nome proprio in testa e lunghezze entro le soglie di
  troncamento dei motori di ricerca; `Data Scientist Junior` è calco dall'italiano e diventa
  `Junior Data Scientist`.
- **R7** — i caporali `« »` diventano virgolette tipografiche inglesi `“ ”`, non virgolette dritte.
- **R8** — verifica in due livelli: sweep meccanico sul sorgente più controlli manuali
  Playwright/axe. Il pattern dello sweep è stato **provato contro il codice attuale** e corretto:
  la prima versione mancava quattro stringhe.

## Phase 1 — Design & contracts

- **[contracts/ui-contract.md](./contracts/ui-contract.md)** — il contratto dell'interfaccia: la
  tabella completa `Da → A` delle 24 stringhe distinte su 32 occorrenze, file per file, con gli
  identificatori da rinominare, la struttura DOM attesa, 13 invarianti verificabili e l'elenco
  esplicito di ciò che **resta legittimamente italiano** fino alla spec 004.
- **[quickstart.md](./quickstart.md)** — nove scenari di validazione che coprono gli otto criteri di
  successo, con la tabella di copertura in coda. Lo scenario 0 è lo sweep meccanico, il più rapido
  e quello a rendimento maggiore per una feature di traduzione.
- **`data-model.md`** — non prodotto, per il motivo esposto in Project Structure.

**Constitution re-check dopo la Fase 1**: invariato, tutti e tre i principi restano ✅ PASS. Il
design non ha introdotto dipendenze, moduli, logica nei componenti o accoppiamenti fra dati e
presentazione. Il contratto UI ha anzi **rafforzato** la tutela del Principio III rispetto alla
sola spec, rendendo esplicite come invarianti verificabili l'associazione `aria-labelledby`
(INV-04), il collegamento di salto (INV-05) e il nome accessibile della navigazione (INV-06) — che
la spec richiedeva a parole ma non ancorava a un controllo eseguibile. Il punto di attrito su
FR-024 resta quello dichiarato nel Constitution Check, invariato dopo il design.

## Note residue (fuori scope, tracciate)

- **Contenuti ancora italiani** — a fine feature, descrizioni delle card, sintesi ed elenco
  competenze di About restano in italiano sotto un documento dichiarato `lang="en"`. Conseguenza
  voluta del confine di scope e della decisione FR-024. Chiude con la **spec 004**, la cui priorità
  è stata alzata proprio per questo.
- **Duplicazione del messaggio di caricamento** — resta in due componenti (R5). Da valutare se e
  quando il comportamento del viewer PDF verrà rivisto (punto 2 del TODO locale).
- **Assenza di suite di test versionata** — gli scenari di `quickstart.md` sono già in forma quasi
  eseguibile, come quelli della 002. Il punto 4 del TODO locale traccia la spec dedicata.
- **`.prettierignore` mancante** — `npm run format` riscriverebbe anche gli artefatti di spec.
  Punto 7 del TODO locale; non toccato qui per non mescolare infrastruttura e traduzione.
