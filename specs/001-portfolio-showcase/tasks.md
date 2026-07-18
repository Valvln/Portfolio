---

description: "Task list template for feature implementation"
---

# Tasks: Portfolio Data Scientist – Showcase Competenze

**Input**: Design documents from `/specs/001-portfolio-showcase/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/content-schema.md](./contracts/content-schema.md), [quickstart.md](./quickstart.md)

**Tests**: Non esplicitamente richiesti nella spec/nel prompt di questa sessione — nessun task di test unitario/contract per singola user story è stato generato. La validazione funzionale avviene tramite gli scenari in `quickstart.md` (task T042) e un audit Lighthouse (task T041).

**Organization**: I task sono raggruppati per user story (da spec.md) per permettere implementazione e test indipendenti di ciascuna.

> **Nota di revisione (`/speckit-analyze`, 2026-07-17)**: rispetto alla versione precedente sono stati aggiunti 4 task (T019, T031, T037, T043) per chiudere due gap rilevati dall'analisi di coerenza: verifica responsive per-componente su tutte le user story (non solo Hero) e ri-verifica esplicita della Constitution prima del deploy. Tutti i task successivi a T018 sono stati rinumerati di conseguenza (40 → 44 task totali).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Può essere eseguito in parallelo (file diversi, nessuna dipendenza)
- **[Story]**: A quale user story appartiene il task (US1, US2, US3, US4)
- Ogni task include il percorso file esatto

## Path Conventions

Progetto web singolo basato su Astro (vedi `plan.md` § Project Structure):
`src/`, `public/`, `tests/` alla radice del repository. Nessun `backend/` separato
in questa iterazione (v1 frontend-only, coerente con Principio II).

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inizializzazione del progetto Astro e struttura base

- [X] T001 Creare lo scheletro del progetto Astro (`astro.config.mjs`, `tsconfig.json`, `package.json`) alla radice del repository, per l'output `static` iniziale con adapter Vercel predisposto
- [X] T002 Installare le dipendenze core in `package.json`: `astro`, `@astrojs/react`, `react`, `react-dom`, `@astrojs/vercel` (depends on T001)
- [X] T003 [P] Configurare ESLint + Prettier per file `.astro`/`.ts`/`.tsx` (config alla radice del repository)
- [X] T004 [P] Creare la struttura cartelle base: `src/content/`, `src/layouts/`, `src/pages/`, `src/components/landing/`, `src/components/projects/`, `src/components/pdf/`, `src/components/about/`, `src/assets/pdf/`, `src/styles/`, `public/`, `tests/unit/`, `tests/component/`, `tests/e2e/` per `plan.md` § Project Structure
- [X] T005 [P] Configurare il progetto Vercel (impostazione output/adapter in `astro.config.mjs` e collegamento repository → progetto Vercel) per la strategia di deployment scelta in `research.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infrastruttura dati e layout condivisi che TUTTE le user story richiedono

**⚠️ CRITICAL**: Nessuna user story può iniziare prima del completamento di questa fase

- [X] T006 Definire lo schema della collection `projects` (Zod) in `src/content/config.ts`: `title`, `description`, `tags` (enum `sql`/`ml`/`viz`, min 1), `githubUrl`, `linkedinUrl`, `pdfPresentation` (`file`, `label`), `order`, con vincolo incrociato "almeno uno tra `githubUrl`/`linkedinUrl`" — per `contracts/content-schema.md` (depends on T001)
- [X] T007 Definire lo schema della collection singleton `about` (Zod) in `src/content/config.ts`: `summary`, `skills`, `contactEmail`, `linkedinUrl`, con vincolo incrociato "almeno un canale di contatto" — per `contracts/content-schema.md` (depends on T006, stesso file)
- [X] T008 [P] Implementare il layer di accesso dati `getProjects()` in `src/lib/projects.ts` (wrapper su `getCollection('projects')`, ordinamento per campo `order`/`title`) — livello di indirection richiesto dal Principio "Scalabilità Architetturale" per poter sostituire la fonte statica con un'API senza toccare i componenti
- [X] T009 [P] Implementare il layer di accesso dati `getAbout()` in `src/lib/about.ts` (wrapper su `getCollection('about')`)
- [X] T010 [P] Creare `BaseLayout.astro` in `src/layouts/BaseLayout.astro` con head SEO (title/description dinamici), navigazione principale (Home/About) e footer, condiviso da tutte le pagine
- [X] T011 [P] Definire i design token condivisi (palette, tipografia, spacing) in `src/styles/global.css`, base visiva per il Principio "Professionalità Creativa"

**Checkpoint**: Fondamenta pronte — l'implementazione delle user story può iniziare

---

## Phase 3: User Story 1 - Valutare le competenze tecniche tramite progetti reali (Priority: P1) 🎯 MVP

**Goal**: Il recruiter vede sulla Project Grid i 5 progetti reali con tag, descrizione e link verificabili (GitHub/LinkedIn), e può filtrarli per tag.

**Independent Test**: Aprire la pagina progetti e verificare che tutti e 5 i progetti mostrino titolo, descrizione, tag e almeno un link esterno funzionante; selezionare un tag e verificare che il filtro funzioni; aprire un link esterno e verificare che si apra in una nuova scheda.

### Implementation for User Story 1

- [X] T012 [P] [US1] Creare le 5 entry progetto in `src/content/projects/project-1.md` … `project-5.md` con dati reali (`title`, `description`, `tags`, `githubUrl`/`linkedinUrl`, `order`) conformi allo schema di T006
- [X] T013 [P] [US1] Creare `ProjectCard.astro` in `src/components/projects/ProjectCard.astro` (titolo, descrizione, badge dei tag, link esterni)
- [X] T014 [US1] Creare `ProjectGrid.astro` in `src/components/projects/ProjectGrid.astro`, che usa `getProjects()` (T008) e renderizza un `ProjectCard` per ciascuno dei 5 progetti (depends on T012, T013)
- [X] T015 [P] [US1] Creare l'isola React `TagFilter.tsx` in `src/components/projects/TagFilter.tsx` (hydration `client:visible`, filtro client-side sui tag `sql`/`ml`/`viz`)
- [X] T016 [US1] Integrare `ProjectGrid.astro` e `TagFilter.tsx` in `src/pages/index.astro` (depends on T014, T015)
- [X] T017 [US1] In `ProjectCard.astro`, impostare i link esterni con `target="_blank" rel="noopener noreferrer"` per l'apertura in nuova scheda senza perdere la sessione (FR-006) (depends on T013)
- [X] T018 [US1] In `ProjectCard.astro`, gestire l'assenza di `githubUrl` o `linkedinUrl` senza mostrare link rotti/vuoti (Edge Case spec.md) (depends on T017)
- [X] T019 [US1] Verificare e correggere il layout responsive di `ProjectGrid.astro`/`ProjectCard.astro` sui tre breakpoint (mobile/tablet/desktop), con pari priorità, nessuno privilegiato (FR-013) (depends on T014, T018)

**Checkpoint**: A questo punto la User Story 1 è pienamente funzionale e testabile in autonomia (MVP)

---

## Phase 4: User Story 2 - Comprendere la proposta di valore in pochi secondi (Priority: P2)

**Goal**: Il visitatore capisce, senza scroll, chi è il candidato, la sua proposta di valore e l'ambito di specializzazione, con una CTA verso i progetti.

**Independent Test**: Aprire la home page e verificare che nome/ruolo, sintesi della proposta di valore e CTA siano visibili above-the-fold su desktop, tablet e mobile.

### Implementation for User Story 2

- [X] T020 [P] [US2] Creare `Hero.astro` in `src/components/landing/Hero.astro` (nome/ruolo del candidato, sintesi della proposta di valore, CTA verso la Project Grid) (FR-001, FR-002)
- [X] T021 [US2] Integrare `Hero.astro` in cima a `src/pages/index.astro`, sopra `ProjectGrid` (depends on T020, T016)
- [X] T022 [US2] Applicare le animazioni scroll-reveal `astro-reveal` a `Hero.astro` e `ProjectCard.astro` (zero JS aggiuntivo in produzione) per il Principio "Professionalità Creativa" (depends on T020, T013)
- [X] T023 [US2] Verificare e correggere il layout responsive di `Hero.astro` sui tre breakpoint (mobile/tablet/desktop) con pari priorità, nessuno privilegiato (FR-013) (depends on T022)

**Checkpoint**: User Story 1 e 2 funzionano correttamente insieme

---

## Phase 5: User Story 3 - Approfondire un progetto tramite le presentazioni Canva (Priority: P3)

**Goal**: Il recruiter può visualizzare in pagina (embed) e scaricare la presentazione PDF Canva di un progetto, quando presente; nessuna azione viene mostrata se il progetto non ne ha una.

**Independent Test**: Aprire un progetto con presentazione associata, verificare che il viewer PDF si apra in pagina e che il download restituisca il file completo; aprire un progetto senza presentazione e verificare che nessuna azione di visualizzazione/download sia mostrata.

### Implementation for User Story 3

- [X] T024 [P] [US3] Aggiungere almeno un file PDF di esempio in `public/pdf/` (export statico stile Canva) — deviazione documentata da `src/assets/pdf/`: gli asset scaricabili/servibili as-is via URL stabile vanno in `public/` nella convenzione Astro, mentre `src/assets/` è riservato agli asset processati da Vite (es. immagini ottimizzate)
- [X] T025 [US3] Valorizzare il campo `pdfPresentation` (file + label) su almeno una entry in `src/content/projects/project-3.md`, referenziando l'asset di T024 (depends on T024, T012)
- [X] T026 [P] [US3] Installare e configurare `react-pdf` (incluso il worker PDF.js) come dipendenza in `package.json`
- [X] T027 [US3] Creare l'isola React `PdfViewer.tsx` in `src/components/pdf/PdfViewer.tsx`: viewer embed tramite `react-pdf` + pulsante di download nativo (`<a href download>`) sul file statico (depends on T026). **Nota implementativa** (2 problemi reali trovati e risolti in validazione): (1) `react-pdf`/`pdfjs-dist` usa API browser (`DOMMatrix`) assenti durante il pre-render SSR → l'uso effettivo di `react-pdf` (Document/Page/paginazione/worker) è stato estratto in un modulo separato `src/components/pdf/PdfDocument.tsx`, caricato da `PdfViewer.tsx` con `React.lazy()` solo al click, mantenendo `PdfViewer.tsx` SSR-safe con `client:visible`; (2) senza questo lazy-splitting il bundle isola pesava 552 KB + worker 1 MB caricati ad ogni visita della home (violava il vincolo "on-demand" di `plan.md`) — verificato con build che ora il bundle iniziale è 130 KB e il chunk `react-pdf` (423 KB) parte solo al click (0 richieste prima, 1 dopo, confermato in browser reale)
- [X] T028 [US3] Integrare `PdfViewer.tsx` in `ProjectGrid.astro`/`ProjectCard.astro` (slot dedicato), mostrando le azioni di visualizzazione/download solo quando `pdfPresentation` è presente (FR-009) (depends on T027, T013, T025)
- [X] T029 [US3] Aggiungere un indicatore di caricamento in `PdfViewer.tsx` per file PDF pesanti o connessioni lente (Edge Case spec.md) (depends on T027)
- [X] T030 [US3] Aggiungere micro-interazioni con `Motion` (motion.dev, import `motion/react`) all'apertura/chiusura del viewer in `PdfViewer.tsx`, per il Principio "Professionalità Creativa" (depends on T029)
- [X] T031 [US3] Verificare e correggere il layout responsive di `PdfViewer.tsx` (viewer embed + pulsante download) sui tre breakpoint (mobile/tablet/desktop) (FR-013) (depends on T027, T030)

**Checkpoint**: User Story 1, 2 e 3 funzionano correttamente insieme

---

## Phase 6: User Story 4 - Valutare il profilo complessivo nella sezione About (Priority: P4)

**Goal**: Il recruiter trova in una sola pagina/interazione la sintesi professionale, le competenze e un canale di contatto valido.

**Independent Test**: Raggiungere About in una interazione dalla home; verificare che sintesi, competenze e contatto siano visibili senza ulteriore navigazione e che il contatto sia cliccabile e corretto.

### Implementation for User Story 4

- [X] T032 [P] [US4] Creare l'entry singleton in `src/content/about/about.md` (sintesi professionale, elenco competenze, contatti) conforme allo schema di T007
- [X] T033 [P] [US4] Creare `AboutSection.astro` in `src/components/about/AboutSection.astro` (sintesi, elenco competenze/tecnologie, canale di contatto)
- [X] T034 [US4] Creare `src/pages/about.astro`, che usa `getAbout()` (T009) e renderizza `AboutSection.astro` (depends on T032, T033)
- [X] T035 [US4] Aggiungere il link "About" alla navigazione principale in `BaseLayout.astro`, raggiungibile in una sola interazione dalla home (FR-011) (depends on T010, T034) — nav già predisposta in T010, verificata funzionante con T034 presente
- [X] T036 [US4] Rendere il canale di contatto in `AboutSection.astro` cliccabile (client email precompilato o link LinkedIn) (FR-010) (depends on T034)
- [X] T037 [US4] Verificare e correggere il layout responsive di `AboutSection.astro` sui tre breakpoint (mobile/tablet/desktop) (FR-013) (depends on T033, T036)

**Checkpoint**: Tutte e 4 le user story sono funzionanti, singolarmente e insieme

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Rifiniture che riguardano più user story, allineate a "Standard Tecnologici e Vincoli" della costituzione

- [X] T038 [P] Aggiungere meta tag SEO dinamici (Open Graph, description) in `src/layouts/BaseLayout.astro` per Lighthouse SEO = 100 — aggiunto anche `<link rel="canonical">`
- [X] T039 [P] Ottimizzare immagini e asset PDF per il web (dimensione, formato) senza ridurre la qualità visiva, per i Core Web Vitals — nessuna immagine ancora presente nel sito (nessun asset da ottimizzare in questa iterazione); il PDF placeholder è ~800 byte. Nota per go-live: le immagini reali che verranno aggiunte in futuro andranno servite tramite l'`<Image>` di Astro per l'ottimizzazione automatica
- [X] T040 Eseguire una verifica di accessibilità (contrasto colori, semantica HTML, navigazione da tastiera) su `Hero.astro`, `ProjectGrid.astro`/`ProjectCard.astro`, `PdfViewer.tsx`, `AboutSection.astro` — scansione automatica con axe-core (Playwright): 0 violazioni su `/` e `/about` a riposo. Rilevato e **corretto** un vero difetto di contrasto (palette con rapporti 2.5–3.64:1 sotto la soglia AA 4.5:1 su tag/testo/link); palette aggiornata in `global.css`, 0 violazioni dopo il fix. Individuato anche un frame transitorio a contrasto ridotto durante lo scroll (animazione `astro-reveal` scroll-driven, opacity <1 a metà transizione): non è un difetto della palette (0 violazioni a riposo e con `prefers-reduced-motion`, già rispettato dalla libreria) — documentato come caratteristica nota nella checklist di go-live
- [X] T041 Eseguire un audit Lighthouse sulla build di produzione e verificare Performance ≥ 95 e SEO = 100 (Technical Context in `plan.md`) (depends on T038, T039, T040) — risultati: Home Perf 99/A11y 100/BP 100/SEO 100; About Perf 100/A11y 100/BP 100/SEO 100. Durante l'audit sono stati trovati e risolti 2 problemi reali aggiuntivi: (1) bundle isola PDF da 552 KB caricato ad ogni visita → lazy-splitting (vedi nota T027), sceso a 130 KB iniziali; (2) tema dark (`prefers-color-scheme: dark`) con contrasto insufficiente (2.74:1) sui link primari, mai ritarato per sfondo scuro → rimosso per la v1 (vedi nota in `global.css`), un solo tema chiaro pienamente verificato
- [X] T042 Eseguire gli scenari di validazione in `quickstart.md` (Scenario 1-4 + verifica trasversale reattività) sui tre breakpoint mobile/tablet/desktop (depends on T041) — validato con Playwright su viewport reali 375×812/768×1024/1280×800: nessun overflow orizzontale, Hero sopra la piega, CTA visibile, 5 progetti renderizzati, contatto About visibile, zero errori console su tutti e tre i breakpoint (Scenario 1-4 già validati singolarmente durante le rispettive fasi)
- [X] T043 Ri-verificare la conformità ai 3 principi costituzionali (Constitution Check di `plan.md`: Data-First Design, Scalabilità Architetturale, Professionalità Creativa) sull'implementazione finale, prima del deploy in produzione (depends on T041, T042) — esito: **I. Data-First Design** ✅ (content collections esterne, schema validato a build-time) con **1 nota per il go-live**: le descrizioni progetto attuali sono contenuto segnaposto e non includono ancora risultati quantificabili/metriche di validazione richiesti esplicitamente dal principio — da completare quando si inseriscono i progetti reali (vedi checklist go-live); **II. Scalabilità Architetturale** ✅ (layer `src/lib/*.ts` verificato nel codice reale, non solo nel piano); **III. Professionalità Creativa** ✅, rinforzato dall'audit reale (Lighthouse Accessibility 100/100 su entrambe le pagine dopo i fix di contrasto)
- [ ] T044 Effettuare il deploy di anteprima su Vercel e ripetere gli scenari di `quickstart.md` sulla preview URL (depends on T042, T043) — **NON completato in questa sessione**: richiede l'accesso all'account Vercel dell'utente (collegamento repository, login), un'azione esterna che non posso eseguire autonomamente. Il repository è pronto per il deploy (adapter `@astrojs/vercel` configurato, build di produzione verificata). Passi manuali documentati nella checklist di go-live.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: nessuna dipendenza — può iniziare subito
- **Foundational (Phase 2)**: dipende dal completamento di Setup — BLOCCA tutte le user story
- **User Stories (Phase 3-6)**: dipendono tutte dal completamento di Foundational
  - Possono procedere in parallelo (se più persone disponibili) oppure in ordine di priorità (US1 → US2 → US3 → US4)
- **Polish (Phase 7)**: dipende dal completamento delle user story che si vogliono rilasciare

### User Story Dependencies

- **US1 (P1)**: nessuna dipendenza da altre user story — è l'MVP
- **US2 (P2)**: integra `index.astro` insieme a US1 (stesso file, T021 dopo T016) ma è testabile in autonomia guardando solo la landing
- **US3 (P3)**: estende `ProjectCard.astro` di US1 (T028 dopo T013/T017/T018) ma è testabile in autonomia sul singolo progetto con presentazione
- **US4 (P4)**: indipendente da US1-US3 salvo il link di navigazione condiviso in `BaseLayout.astro` (T035)

### Within Each User Story

- Contenuti/modelli dati prima dei componenti che li consumano
- Componenti Astro statici prima delle isole interattive che li completano
- Integrazione nella pagina dopo che i singoli componenti esistono
- Verifica responsive del componente/i della story come ultimo task della story
- Story completa prima di passare alla priorità successiva

### Parallel Opportunities

- Tutti i task Setup marcati [P] (T003, T004, T005) possono essere eseguiti in parallelo
- Nella fase Foundational, T008, T009, T010, T011 sono paralleli tra loro (dopo T006-T007)
- Una volta completata Foundational, US1/US2/US3/US4 possono essere assegnate a persone diverse in parallelo (con le dipendenze di file indicate sopra)
- All'interno di ciascuna user story, i task marcati [P] toccano file diversi e non hanno dipendenze dirette tra loro

---

## Parallel Example: User Story 1

```bash
# Task marcati [P] eseguibili in parallelo dopo il completamento di Foundational:
Task: "Creare le 5 entry progetto in src/content/projects/project-1.md … project-5.md"
Task: "Creare ProjectCard.astro in src/components/projects/ProjectCard.astro"
Task: "Creare l'isola React TagFilter.tsx in src/components/projects/TagFilter.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completare Phase 1: Setup
2. Completare Phase 2: Foundational (CRITICO — blocca tutte le user story)
3. Completare Phase 3: User Story 1 (Project Grid)
4. **STOP e VALIDARE**: testare la User Story 1 in autonomia (recruiter vede competenze tramite progetti reali)
5. Deploy/demo se pronta (T044, anche solo per US1)

### Incremental Delivery

1. Setup + Foundational → fondamenta pronte
2. Aggiungere US1 → test indipendente → Deploy/Demo (MVP!)
3. Aggiungere US2 (landing/proposta di valore) → test indipendente → Deploy/Demo
4. Aggiungere US3 (PDF Canva) → test indipendente → Deploy/Demo
5. Aggiungere US4 (About) → test indipendente → Deploy/Demo finale
6. Ogni story aggiunge valore senza rompere le precedenti

---

## Notes

- [P] = file diversi, nessuna dipendenza diretta tra i task
- [US#] mappa il task alla user story di spec.md per tracciabilità
- Nessun task di test dedicato generato in questa iterazione (non esplicitamente richiesti); la validazione funzionale passa da `quickstart.md` (T042) e Lighthouse (T041)
- Ogni user story termina con un task di verifica responsive dedicato (T019, T023, T031, T037), per garantire la "priorità paritaria" tra breakpoint richiesta da FR-013 su ciascun componente, non solo in fase di validazione finale
- T043 formalizza la ri-verifica della Constitution richiesta da "Workflow di Sviluppo e Qualità" prima del deploy (T044)
- Effettuare commit dopo ogni task o gruppo logico
- Fermarsi a ogni checkpoint per validare la story in autonomia prima di procedere
- Evitare: task vaghi, conflitti sullo stesso file tra task marcati [P], dipendenze cross-story che romperebbero l'indipendenza
