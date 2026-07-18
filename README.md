# Portfolio — Data Scientist

Sito portfolio personale costruito con [Astro](https://astro.build) per presentare progetti di data science, background e CV, con visualizzazione PDF integrata.

## Stack

- **Astro** (output statico) + **React** per le isole interattive
- **Vercel** come adapter/hosting
- **astro-reveal** per le animazioni on-scroll (modalità `observer`, accessibile)
- **react-pdf** per la visualizzazione inline del CV/report in PDF
- Content Collections di Astro per le sezioni About e Projects

## Struttura

```
src/
  components/   Componenti Astro/React (landing, about, projects, pdf viewer)
  content/      Contenuti in Markdown (about, projects) validati da schema
  layouts/      Layout condivisi
  lib/          Helper per leggere le content collections
  pages/        Route del sito (index, about)
specs/          Spec, piano e task del progetto (workflow spec-kit)
```

## Sviluppo

```bash
npm install
npm run dev       # dev server
npm run build     # build statica
npm run preview   # anteprima della build
npm run lint       # ESLint
npm run format     # Prettier
```

## Workflow di contribuzione

Il progetto segue una convenzione branch-per-feature basata su spec-kit: vedi [CONTRIBUTING.md](CONTRIBUTING.md).
