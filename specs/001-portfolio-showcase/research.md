# Research: Portfolio Data Scientist – Showcase Competenze

**Feature**: `001-portfolio-showcase` | **Date**: 2026-07-16

Questo documento risolve le decisioni tecniche aperte nel Technical Context del
piano (`plan.md`), con relative alternative considerate e motivazione, e verifica
il loro allineamento con la [Constitution](../../.specify/memory/constitution.md).

## 1. Framework frontend: Astro vs Next.js

**Decision**: **Astro** (v5.x) come framework principale, con isole React per i
componenti interattivi (filtro tag, viewer PDF).

**Rationale**:
- Benchmark 2026 mostrano Astro 2–3× più veloce in caricamento e con un payload
  JS drasticamente inferiore rispetto a Next.js su siti content-first comparabili
  (~9 KB vs ~463 KB in un caso testato), grazie al rendering statico di default e
  all'invio di JavaScript solo dove esplicitamente richiesto (hydration
  direttiva/isole).
- I siti Astro raggiungono Lighthouse SEO 100 "by default", senza configurazione
  aggiuntiva — mentre Next.js richiede tuning esplicito per risultati equivalenti.
  Per un portfolio la cui metrica di successo (SC-001) è "un recruiter individua le
  competenze in 60 secondi", performance e SEO di default sono un vantaggio diretto.
- L'architettura a isole permette comunque di usare React (o altro framework UI)
  solo dove serve interattività reale (es. viewer PDF, filtro progetti),
  mantenendo il resto della pagina puro HTML/CSS — coerente con il principio
  "Professionalità Creativa" (impatto visivo senza sacrificare pulizia tecnica).
- **Allineamento con Principio II (Scalabilità Architetturale)**: Astro supporta
  in modo nativo il passaggio da output `static` a `server`/`hybrid` (tramite
  adapter, es. `@astrojs/vercel`) e l'aggiunta di endpoint API sotto
  `src/pages/api/` nello stesso progetto. Questo significa che l'evoluzione da
  sito statico a web app con backend/autenticazione/dashboard NON richiede un
  cambio di framework né una riscrittura, ma solo l'attivazione di funzionalità
  già previste dall'architettura.

**Alternatives considered**:
- **Next.js (App Router)**: framework più "application-oriented", ottimo se il
  portfolio dovesse nascere già come web app dinamica. Scartato per la v1 perché
  il contenuto è prevalentemente statico (5 progetti, About, PDF) e il costo in
  JS/complessità iniziale non è giustificato dai requisiti attuali; resta comunque
  un'opzione di migrazione futura se il progetto evolvesse verso una vera web app
  data-intensive, ma Astro copre già questo scenario tramite i suoi output mode.

**Sources**:
- [Next.js vs. Astro in 2026: A full comparison guide – Vercel](https://vercel.com/i/astro-vs-next-js)
- [Astro vs Next.js 2026: 9KB vs 463KB JS [Tested] – Tech Insider](https://tech-insider.org/astro-vs-nextjs-2026/)
- [Astro vs Next.js SEO for Marketing Websites – Agnite Studio](https://agnitestudio.com/blog/astro-vs-nextjs-seo/)
- [Astro vs Next.js (2026): Real Benchmarks After Building With Both](https://alexbobes.com/programming/astro-vs-nextjs/)

## 2. Strategia di deployment: GitHub Pages vs Vercel

**Decision**: **Vercel** come piattaforma di deploy primaria.

**Rationale**:
- Vercel rileva Astro automaticamente e offre build/adapter zero-config, incluso
  il supporto nativo per passare da output statico a SSR/API quando necessario.
- Ogni push genera un deploy istantaneo e ogni Pull Request ottiene una preview
  URL dedicata: utile per validare visivamente le modifiche (rilevante per il
  principio "Professionalità Creativa") prima del merge.
- **Allineamento con Principio II**: GitHub Pages serve solo output statico
  puro — se in futuro il portfolio evolvesse verso una web app con backend/API/
  autenticazione (come esplicitamente previsto dalla costituzione), servirebbe
  una migrazione di hosting. Vercel elimina questo rischio: lo stesso progetto
  può passare da "static" a "hybrid/server" senza cambiare provider.
- Il piano free tier di Vercel è sufficiente per lo scope attuale (sito statico,
  traffico da portfolio personale), quindi il vantaggio di flessibilità futura
  non comporta un costo iniziale.

**Alternatives considered**:
- **GitHub Pages**: gratuito, semplice, ottimo per siti puramente statici e ben
  integrato con repository GitHub (coerente con l'estetica "GitHub" del principio
  III). Scartato come scelta primaria solo perché forzerebbe una migrazione di
  hosting nel momento in cui il progetto adottasse funzionalità server-side,
  in conflitto con l'intento di crescita senza riscrittura del Principio II.
  Resta comunque un'opzione valida se in futuro si volesse un mirror
  puramente statico del sito.

**Sources**:
- [Deploy your Astro Site to GitHub Pages – Astro Docs](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages vs Vercel for Developer Portfolios (2026) – Readable](https://www.tryreadable.ai/analysis/vercel-vs-github-pages-for-developer-portfolio-deployment)
- [GitHub Pages vs Vercel: Which Is Better for Hosting React and Static Sites? – CraftedTemplate](https://www.craftedtemplate.com/blog/github-pages-vs-vercel)

## 3. Libreria per visualizzazione/download PDF (Canva)

**Decision**: **react-pdf** (wrapper React su PDF.js) montata come isola Astro
per il viewer embed, combinata con un link nativo `<a href="..." download>` per
il download — nessuna libreria dedicata è necessaria per il download, che è una
funzione nativa del browser sul file statico.

**Rationale**:
- FR-007 richiede **entrambe** le modalità (embed + download) come non
  alternative. Per l'embed, `react-pdf`/PDF.js è la soluzione più leggera e
  matura per il caso d'uso "sola visualizzazione", senza le funzionalità
  avanzate (annotazioni, form, print granulare) che il portfolio non richiede.
- Alternative come EmbedPDF (motore WASM/PDFium) offrono rendering più potente
  ma richiedono un setup più pesante, giustificato solo per casi con
  annotazioni/form/workflow — non è il caso di un portfolio che mostra
  presentazioni statiche.
- Il download non richiede libreria: i PDF sono asset statici serviti
  direttamente (coerente con FR-012, dati/asset esterni al codice), quindi un
  link `download` HTML nativo è la soluzione più semplice, performante e
  manutenibile (Principio III: pulizia tecnica, nessuna dipendenza superflua).
- Il viewer viene caricato come isola Astro con hydration `client:visible`, così
  il bundle PDF.js non pesa sul caricamento iniziale della pagina (impatta solo
  se e quando l'utente apre effettivamente una presentazione).

**Alternatives considered**:
- **EmbedPDF (PDFium/WASM)**: rendering più fedele e headless, ma bundle e
  complessità di setup superiori al necessario per il solo caso "visualizza +
  scarica". Scartato per eccesso di funzionalità rispetto allo scope (YAGNI).
- **Syncfusion React PDF Viewer**: libreria enterprise con licenza commerciale
  per uso esteso; scartata per costo e complessità non giustificati da un
  portfolio personale.

**Sources**:
- [Best React PDF Viewer Libraries in 2026 – Syncfusion Blogs](https://www.syncfusion.com/blogs/post/best-react-pdf-viewers)
- [React PDF Viewer – Open Source, Headless & Customizable – EmbedPDF](https://www.embedpdf.com/react-pdf-viewer)
- [react-pdf – npm](https://www.npmjs.com/package/react-pdf)
- [Best JavaScript PDF viewer libraries (2026) – Nutrient](https://www.nutrient.io/blog/top-5-javascript-pdf-viewers/)

## 4. Libreria per animazioni minimali

**Decision**: **astro-reveal** per le animazioni scroll-reveal a livello di
pagina (zero JavaScript in produzione), integrato con **Motion** (motion.dev,
~8 KB) per le micro-interazioni puntuali all'interno delle isole interattive
(es. hover sulle card progetto, transizioni del viewer PDF), dove serve un
controllo più fine.

**Rationale**:
- `astro-reveal` è pensato nativamente per Astro e produce animazioni
  scroll-reveal (fade-in, slide-in) senza spedire JavaScript al client in
  produzione — l'opzione con il minor impatto possibile su performance,
  perfettamente coerente con il principio "Professionalità Creativa" (impatto
  visivo) senza violare gli obiettivi di performance della costituzione.
- Per le isole interattive (dove JS è comunque già presente, es. viewer PDF),
  `Motion` offre un footprint ridotto (~8 KB) e un'API dichiarativa adatta a
  micro-interazioni eleganti senza appesantire il bundle complessivo.
- Evitiamo librerie di animazione pesanti o general-purpose (es. GSAP completo,
  Framer Motion "full") non giustificate dallo scope "minimale" richiesto.

**Alternatives considered**:
- **AOS (Animate On Scroll)**: molto semplice (~13 KB gzip) e ben noto per siti
  marketing/portfolio, ma richiede comunque JS a runtime su ogni pagina;
  scartato a favore di `astro-reveal` che azzera il JS di produzione per lo
  stesso tipo di effetto.
- **AstroAnimate**: libreria modulare Astro-native con pattern più ampi
  (view transitions, micro-interazioni); considerata valida ma più ampia dello
  stretto necessario per il MVP; rimane un'opzione di estensione futura.
- **Trig.js**: ultra-leggero (4 KB) ma meno maturo/documentato; scartato per
  ora a favore di soluzioni più consolidate.

**Sources**:
- [AstroAnimate — Animation Library for Astro](https://www.astroanimate.com/)
- [GitHub – polgubau/astro-reveal](https://github.com/polgubau/astro-reveal)
- [Comparing the best React animation libraries for 2026 – LogRocket Blog](https://blog.logrocket.com/best-react-animation-libraries/)
- [15 Best React Animation Libraries Compared (2026) – Spell UI](https://spell.sh/blog/best-react-animation-libraries)

## 5. Gestione dati progetti (conferma clarify)

**Decision**: Astro **Content Collections** con schema validato tramite Zod
(`src/content/config.ts`), un file per progetto sotto `src/content/projects/`.

**Rationale**: È l'implementazione nativa Astro del requisito FR-012 (dati
esterni, separati dai componenti UI) e del principio "Data-First Design": i dati
sono strutturati, validati a build-time (errori di schema bloccano la build
invece di rompere la UI a runtime) e riutilizzabili da qualunque componente o,
in futuro, da un endpoint API esposto dallo stesso progetto Astro.

**Alternatives considered**: JSON puro senza validazione — scartato perché non
offre validazione a build-time; CMS headless esterno — scartato per lo scope
attuale (Assumption già presente in spec.md: nessun CMS richiesto in v1).

## Summary — Technical Context risolto

| Voce | Valore |
|---|---|
| Language/Version | TypeScript 5.x, Node.js 20 LTS+ |
| Primary Dependencies | Astro 5.x, React 18 (isole), react-pdf, astro-reveal, Motion |
| Storage | File-based: Astro Content Collections (Markdown/JSON + frontmatter validato via Zod) |
| Testing | Vitest (unit/component), Playwright (e2e smoke: link esterni, filtro tag, viewer/download PDF) |
| Target Platform | Web pubblico, browser evergreen desktop/tablet/mobile |
| Project Type | Web (progetto Astro singolo, frontend-only in v1) |
| Performance Goals | Lighthouse Performance ≥ 95, SEO = 100, JS iniziale minimo (solo isole necessarie) |
| Constraints | Renderizzabile interamente in modo statico in v1; architettura pronta per output `hybrid`/`server` e API routes senza riscrittura |
| Scale/Scope | 5 progetti in v1, estendibile senza modifiche strutturali; nessuna autenticazione |

Nessun elemento del Technical Context resta `NEEDS CLARIFICATION`.
