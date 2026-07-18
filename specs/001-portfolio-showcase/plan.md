# Implementation Plan: Portfolio Data Scientist – Showcase Competenze

**Branch**: `001-portfolio-showcase` | **Date**: 2026-07-16 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-portfolio-showcase/spec.md`

## Summary

Portfolio pubblico per Data Scientist Junior orientato al recruiter: landing page
con proposta di valore, Project Grid con 5 progetti (tag SQL/ML/Viz, descrizione,
link GitHub/LinkedIn), sistema di visualizzazione (embed) + download delle
presentazioni PDF create con Canva, e sezione About ottimizzata per recruiter.

Approccio tecnico: sito **Astro** (static output in v1) con isole React per le
parti interattive (viewer PDF, filtro tag), dati dei progetti gestiti come
**Astro Content Collections** validate via Zod (file esterni, non hardcoded),
deploy su **Vercel**. L'architettura è scelta esplicitamente per permettere
un'evoluzione futura verso output `hybrid`/`server` con API routes — senza
riscrittura — quando il portfolio dovesse crescere oltre un sito statico
(Principio costituzionale "Scalabilità Architetturale"). Dettagli e alternative
in [research.md](./research.md).

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20 LTS+

**Primary Dependencies**: Astro 5.x (static/hybrid output), React 18 (isole
interattive), react-pdf (viewer PDF embed su PDF.js), astro-reveal (scroll-reveal
zero-JS in produzione), Motion/motion.dev (micro-interazioni nelle isole, ~8 KB)

**Storage**: File-based — Astro Content Collections (Markdown/JSON con
frontmatter, schema Zod) per progetti, About e testi landing; asset PDF statici
in `src/assets/`. Nessun database in v1.

**Testing**: Vitest (unit/component su isole React e utility di data-fetching
delle collection), Playwright (e2e smoke: caricamento landing, rendering 5
progetti con tag/link, filtro per tag, viewer+download PDF, sezione About)

**Target Platform**: Web pubblico, browser evergreen desktop/tablet/mobile
(nessun requisito di autenticazione o backend in v1)

**Project Type**: Web — singolo progetto Astro (frontend-only in v1, struttura
pronta per API routes future nello stesso progetto)

**Performance Goals**: Lighthouse Performance ≥ 95, SEO = 100; JavaScript
iniziale limitato alle sole isole strettamente necessarie (viewer PDF caricato
solo on-demand via `client:visible`)

**Constraints**: Il sito DEVE poter essere interamente statico in v1 (nessun
server richiesto per funzionare), ma l'architettura (Astro + hosting Vercel)
DEVE permettere di introdurre in futuro rendering `hybrid`/`server` e API
endpoint senza cambiare framework, hosting o riscrivere i componenti di
presentazione — coerentemente con FR-012 e il Principio II della costituzione.

**Scale/Scope**: 5 progetti in v1 (estendibile senza modifiche strutturali ai
componenti o allo schema dati), contenuti in una sola lingua, nessuna
autenticazione, nessun pannello CMS.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Verifica | Esito |
|---|---|---|
| **I. Data-First Design** | I dati di progetto (titolo, descrizione, tag, link, riferimento PDF) sono modellati come Astro Content Collections esterne, validate a build-time via schema Zod (non hardcoded nei componenti, non testo libero). I componenti UI (Project Grid) sono progettati per esporre questi dati (tag, link, metriche del progetto) come contenuto primario. | ✅ PASS |
| **II. Scalabilità Architetturale** | Astro separa nativamente contenuto (content collections), presentazione (componenti `.astro`/isole) e logica di accesso ai dati (funzioni `getCollection`). L'output può passare da `static` a `hybrid`/`server` (adapter Vercel) e si possono aggiungere `src/pages/api/*` nello stesso progetto, senza cambiare framework o hosting. Nessun accoppiamento diretto tra logica di presentazione e fonte dati statica. | ✅ PASS |
| **III. Professionalità Creativa** | Impatto visivo affidato ad astro-reveal (scroll-reveal, zero JS extra in produzione) e Motion (micro-interazioni leggere nelle isole), senza librerie pesanti non giustificate. Codice tipizzato (TypeScript), schema dati validato, struttura a componenti chiara: pulizia tecnica in stile "GitHub" mantenuta insieme alla cura visiva "Canva". Ogni componente animato ha una funzione (guidare l'attenzione su dati/CTA), non è puramente decorativo. | ✅ PASS |
| **Standard Tecnologici e Vincoli** | Contenuti versionati come dati strutturati leggibili anche da una futura API (content collections esportabili); asset PDF e immagini ottimizzati per il web; accessibilità (contrasto, semantica HTML, navigazione da tastiera) trattata come requisito di design, non opzionale. | ✅ PASS |

Nessuna violazione rilevata: **Complexity Tracking non necessario** per questo piano.

*Re-check post Phase 1 (dopo data-model.md e contracts/): confermato — lo schema
dati e i contratti definiti in Fase 1 non introducono eccezioni ai principi
sopra; nessuna nuova voce da aggiungere a Complexity Tracking.*

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-showcase/
├── plan.md              # Questo file (/speckit-plan command output)
├── research.md          # Fase 0 output — decisioni tecniche e alternative
├── data-model.md         # Fase 1 output — entità e schema contenuti
├── quickstart.md         # Fase 1 output — guida di validazione end-to-end
├── contracts/
│   └── content-schema.md # Fase 1 output — contratto dati (schema content collections)
├── checklists/
│   └── requirements.md   # Spec quality checklist (già validata in /speckit-clarify)
└── tasks.md              # Fase 2 output (/speckit-tasks — non creato da /speckit-plan)
```

### Source Code (repository root)

```text
# Web application — Astro single project (frontend-only in v1)
astro.config.mjs
tsconfig.json
package.json

src/
├── content/
│   ├── config.ts            # Schema Zod delle collection (projects, about)
│   └── projects/            # 5 entry progetto (Markdown/JSON con frontmatter)
│       ├── project-1.md
│       ├── project-2.md
│       ├── project-3.md
│       ├── project-4.md
│       └── project-5.md
├── layouts/
│   └── BaseLayout.astro     # Layout condiviso (head SEO, nav, footer)
├── pages/
│   ├── index.astro          # Landing page (US2) + entrypoint Project Grid (US1)
│   └── about.astro           # Sezione About (US4)
├── components/
│   ├── landing/
│   │   └── Hero.astro        # Proposta di valore + CTA (FR-001, FR-002)
│   ├── projects/
│   │   ├── ProjectGrid.astro     # Grid dei 5 progetti (FR-003, FR-004, FR-005)
│   │   ├── ProjectCard.astro     # Card singolo progetto (tag, descrizione, link)
│   │   └── TagFilter.tsx         # Isola React: filtro per tag (client:visible)
│   ├── pdf/
│   │   └── PdfViewer.tsx          # Isola React (react-pdf): embed + download (FR-007, FR-008, FR-009)
│   └── about/
│       └── AboutSection.astro     # Sintesi, competenze, contatti (FR-010, FR-011)
├── assets/
│   └── pdf/                  # Presentazioni PDF statiche esportate da Canva
└── styles/
    └── global.css             # Design system condiviso (palette, tipografia)

public/
└── favicon.svg, robots.txt, ecc.

tests/
├── unit/                     # Vitest: validazione schema content collections
├── component/                 # Vitest: TagFilter, PdfViewer
└── e2e/                        # Playwright: smoke test dei 4 user story
```

**Structure Decision**: Progetto web singolo basato su Astro (non la struttura
"Option 2: Web application" con `backend/` + `frontend/` separati, perché in v1
non esiste alcun backend). La cartella `src/pages/` è già il punto di estensione
naturale per introdurre in futuro `src/pages/api/*` (endpoint) quando si
attiverà l'evoluzione verso una web app più complessa, senza spostare o
riscrivere `src/components/` o `src/content/` — questo è ciò che garantisce la
conformità al Principio II senza dover pre-costruire ora un backend inutilizzato
(YAGNI, coerente anche con la sezione "Workflow di Sviluppo e Qualità" della
costituzione).

## Complexity Tracking

> Nessuna violazione del Constitution Check da giustificare — tabella non
> applicabile per questo piano.
