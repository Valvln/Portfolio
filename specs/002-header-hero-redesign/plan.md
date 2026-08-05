# Implementation Plan: Header and hero redesign

**Branch**: `002-header-hero-redesign` | **Date**: 2026-08-04 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification da `specs/002-header-hero-redesign/spec.md`

## Summary

La feature riscrive in inglese l'intestazione del sito e la sezione hero della home,
sostituendo il titolo attuale con un blocco di tre righe a dimensioni decrescenti allineate
al centro, rimuovendo la riga identitaria sopra il titolo e riposizionando sottotitolo e
pulsante più in basso e centrati.

L'approccio è interamente nel livello di presentazione: cambia il testo e lo stile scoped di
due componenti Astro esistenti, senza toccare contenuti, logica di accesso ai dati o
configurazione di build. Il blocco titolo resta un unico `h1` con tre righe interne, e le
dimensioni delle righe 2 e 3 sono derivate in `em` dal titolo anziché con `clamp()` separate,
così la gerarchia decrescente è garantita per costruzione a ogni larghezza di viewport e non
solo ai breakpoint che verranno provati. La spaziatura usa i token già definiti in
`global.css`: nessun token nuovo, nessun cambio di palette o di famiglia tipografica.

Non è richiesta alcuna dipendenza nuova: `@playwright/test` e `@axe-core/playwright` sono già
installati e servono a eseguire gli scenari di validazione.

## Technical Context

| Voce | Valore |
|---|---|
| **Linguaggio / framework** | Astro 7 con componenti `.astro` a stile scoped; nessun componente React coinvolto |
| **Dipendenze nuove** | Nessuna |
| **Storage** | N/A — nessun dato persistito o letto da questa feature |
| **Testing** | Scenari di `quickstart.md` eseguiti con Playwright + `@axe-core/playwright`, senza suite versionata (vedi research R7) |
| **Piattaforma target** | Sito statico (`output: 'static'`), browser moderni, viewport da 320px |
| **Tipo di progetto** | Applicazione web frontend-only, progetto Astro singolo |
| **Vincoli** | Nessuno scorrimento orizzontale ≥320px; un solo `h1` per pagina; nessuna regressione di contrasto o di navigazione da tastiera; nessun file fuori da header, hero e relativi stili |
| **Scala** | Due componenti, una pagina interessata (`/`) più l'intestazione condivisa su tutte le pagine |

## Constitution Check

Verifica contro `.specify/memory/constitution.md` v1.0.0. Gate prima della Fase 0, ri-verificato
dopo la Fase 1.

| Principio | Esito | Valutazione |
|---|---|---|
| **I. Data-First Design** | ✅ PASS | La feature non tocca i dati di progetto né il loro schema: le content collection, il livello `src/lib/*.ts` e le card restano invariati. Il copy della hero è testo di presentazione dell'autore, non contenuto di progetto, quindi resta legittimamente nel componente. La riga 3 del titolo nomina esplicitamente gli ambiti tecnici (ML, SQL, Data Visualization), rafforzando la cornice che introduce i progetti basati su dati. |
| **II. Scalabilità Architetturale** | ✅ PASS | Nessun accoppiamento nuovo tra dati e presentazione. La modifica è confinata al livello di presentazione e non introduce logica nei componenti. Se in futuro il copy della hero dovesse arrivare da una fonte dinamica, basterebbe sostituire le stringhe con props senza toccare la struttura o gli stili. |
| **III. Professionalità Creativa** | ✅ PASS | È l'obiettivo diretto della feature: gerarchia visiva esplicita, allineamento coerente, ritmo verticale dai token esistenti. Il vincolo di non regressione è tenuto attivo: contrasto invariato (nessun colore cambia), un solo `h1`, intestazione e pulsante restano raggiungibili da tastiera, stacco realizzato come spaziatura e non come riga vuota annunciata dagli screen reader. Nessun elemento puramente decorativo introdotto. |

Nessuna violazione da giustificare: la sezione **Complexity Tracking** è omessa.

## Project Structure

### Documentation (this feature)

```text
specs/002-header-hero-redesign/
├── plan.md                 # Questo file
├── spec.md                 # Input — requisiti e criteri di successo
├── research.md             # Fase 0 — decisioni tecniche R1-R7 e alternative
├── quickstart.md           # Fase 1 — scenari di validazione end-to-end
├── contracts/
│   └── ui-contract.md      # Fase 1 — copy verbatim, struttura DOM e riferimenti verificabili
├── checklists/
│   └── requirements.md     # Spec quality checklist (validata in specify)
└── tasks.md                # Fase 2 — output di /speckit.companion.tasks, non creato qui
```

Nessun `data-model.md`: la feature non introduce né rimodella alcuna entità — non tocca dati,
schema o content collection. La spec stessa omette la sezione Key Entities per lo stesso motivo.
Produrre un documento di sole diciture "N/A" aggiungerebbe rumore senza informazione.

### Source Code (repository root)

```text
src/
├── layouts/
│   └── BaseLayout.astro          # MODIFICATO — testo del brand + wrap della barra di navigazione
├── components/
│   └── landing/
│       └── Hero.astro            # MODIFICATO — markup del blocco titolo, copy, stili scoped
├── pages/
│   └── index.astro               # INVARIATO — title/description restano italiani (fuori scope)
└── styles/
    └── global.css                # INVARIATO — si riusano i token esistenti, nessuno nuovo
```

**Structure Decision**: la modifica interessa due soli file sorgente, entrambi componenti Astro
già esistenti; gli stili restano scoped nei rispettivi componenti come nel resto del progetto,
quindi `global.css` non viene toccato e la superficie di regressione resta limitata alla hero e
all'intestazione.

## Phase 0 — Research

Completata: vedi [research.md](./research.md). Sintesi delle sette decisioni:

- **R1** — blocco titolo come unico `h1` con tre `<span>` a blocco (non `<br>`, non tre elementi separati).
- **R2** — dimensioni delle righe 2 e 3 derivate in `em` dal titolo, con pavimento di leggibilità sulla riga 3: la decrescenza è garantita a **ogni** viewport, non solo a quelli testati.
- **R3** — allineamento e centratura applicati a `.hero__inner`, genitore del wrapper `Reveal`, così l'ereditarietà non dipende dal nodo generato dalla libreria; larghezze massime distinte per titolo e sottotitolo.
- **R4** — spaziatura dai token esistenti, salendo di almeno un gradino; stacco come spaziatura CSS, non riga vuota.
- **R5** — intestazione: la barra va a capo su viewport stretti e il brand riduce leggermente la dimensione; nessun troncamento (il calcolo a 320px mostra che senza wrap brand e collegamenti non coesistono).
- **R6** — copy inglese di sottotitolo e pulsante adottato come proposto dall'utente.
- **R7** — verifica tramite scenari eseguiti con Playwright/axe, senza introdurre suite versionata: è la convenzione già in uso nel progetto.

## Phase 1 — Design & contracts

- **[contracts/ui-contract.md](./contracts/ui-contract.md)** — il contratto dell'interfaccia: le stringhe verbatim pinnate dalla spec riportate alla lettera, la struttura DOM attesa del blocco hero e dell'intestazione, e i riferimenti su cui gli scenari di validazione si agganciano.
- **[quickstart.md](./quickstart.md)** — gli scenari di validazione end-to-end che coprono i nove criteri di successo, con i viewport e i controlli da eseguire.
- **`data-model.md`** — non prodotto, per il motivo esposto in Project Structure.

**Constitution re-check dopo la Fase 1**: invariato, tutti e tre i principi restano ✅ PASS. Il
design finale non ha introdotto nuove dipendenze, logica nei componenti o accoppiamenti tra dati e
presentazione, e il contratto UI vincola esplicitamente i controlli di accessibilità (`h1` unico,
assenza di scorrimento orizzontale, navigazione da tastiera) che tutelano il Principio III.

## Note residue (fuori scope, tracciate)

Al termine della feature la prima schermata sarà in inglese mentre il titolo della scheda del
browser (`src/pages/index.astro`) e l'attributo di lingua del documento resteranno in italiano.
È una conseguenza voluta del confine di scope dichiarato nella spec, non una svista: entrambi
vanno chiusi nella spec successiva sulla traduzione del resto del sito.
