# Quickstart: Portfolio Data Scientist – Showcase Competenze

**Feature**: `001-portfolio-showcase` | **Date**: 2026-07-16

Guida per validare end-to-end che l'implementazione soddisfi le User Story della
spec ([spec.md](./spec.md)). Non contiene codice di implementazione: presuppone
che i task di `/speckit-tasks` → `/speckit-implement` abbiano già prodotto il
progetto Astro descritto in [plan.md](./plan.md).

## Prerequisiti

- Node.js 20 LTS+ e un package manager (npm/pnpm)
- Repository clonato sul branch `001-portfolio-showcase`
- 5 file progetto validi in `src/content/projects/` (vedi
  [contracts/content-schema.md](./contracts/content-schema.md))
- Almeno un progetto con `pdfPresentation` valorizzato, per testare US3

## Setup

```bash
npm install
npm run dev
```

Il sito di sviluppo deve avviarsi senza errori di validazione dello schema
content collections (un errore di build qui indica un file progetto non
conforme al contratto).

## Scenario 1 — Recruiter valuta le competenze tramite i progetti (US1, P1)

1. Apri la home page e naviga alla Project Grid.
2. **Verifica**: sono visibili esattamente 5 progetti, ciascuno con titolo,
   descrizione, almeno un tag (SQL/ML/Viz) e almeno un link esterno.
3. Seleziona il filtro tag "ML".
4. **Verifica**: solo i progetti con tag `ml` restano visibili/evidenziati.
5. Seleziona un link GitHub o LinkedIn di un progetto.
6. **Verifica**: si apre in una nuova scheda; la scheda del portfolio resta
   invariata.

Esito atteso ↔ SC-001, SC-002.

## Scenario 2 — Visitatore comprende la proposta di valore (US2, P2)

1. Apri la home page senza scrollare.
2. **Verifica**: nome/ruolo del candidato, sintesi della proposta di valore e
   una call-to-action verso i progetti sono visibili "above the fold" su
   desktop, tablet e mobile (nessun breakpoint privilegiato — vedi FR-013).

## Scenario 3 — Recruiter approfondisce una presentazione Canva (US3, P3)

1. Apri un progetto con `pdfPresentation` valorizzato.
2. Seleziona l'azione di visualizzazione.
3. **Verifica**: il PDF si apre in un viewer integrato nella pagina (nessun
   redirect a un servizio esterno).
4. Seleziona l'azione di download.
5. **Verifica**: il file PDF completo viene scaricato e si apre correttamente
   con un lettore PDF esterno.
6. Apri un progetto senza `pdfPresentation`.
7. **Verifica**: nessuna azione di visualizzazione/download è mostrata (nessun
   elemento vuoto o rotto) — conferma FR-009.

> **Nota (2026-07-19)**: con i contenuti reali tutti e 5 i progetti hanno una
> presentazione, quindi i passi 6–7 non sono attualmente esercitabili sui
> contenuti di produzione. FR-009 resta garantito dal rendering condizionale
> (`project.pdfPresentation &&` in ProjectGrid/ProjectCard): per ri-testarlo
> basta rimuovere temporaneamente `pdfPresentation` da un progetto in dev.

Esito atteso ↔ SC-003.

## Scenario 4 — Recruiter valuta il profilo in About (US4, P4)

1. Dalla home page, raggiungi la sezione/pagina About in una sola interazione.
2. **Verifica**: sintesi professionale, elenco competenze e almeno un canale di
   contatto sono visibili senza ulteriore navigazione.
3. Seleziona il canale di contatto.
4. **Verifica**: si apre correttamente (client email precompilato o profilo
   LinkedIn).

Esito atteso ↔ SC-004.

## Verifica trasversale — Reattività e performance

1. Ripeti gli Scenari 1–4 su tre viewport: mobile (~375px), tablet (~768px),
   desktop (~1280px).
2. **Verifica**: nessun contenuto tagliato, nessun link irraggiungibile, nessuna
   azione (filtro, viewer PDF, contatto) non funzionante su alcuno dei tre.

Esito atteso ↔ SC-005, FR-013.

3. Esegui un audit Lighthouse (Performance + SEO) sulla home page in build di
   produzione.
4. **Verifica**: Performance ≥ 95, SEO = 100 (target da `plan.md` §Technical
   Context).

## Deploy di verifica

```bash
npm run build
```

Collega il repository a Vercel (import del progetto, framework rilevato
automaticamente come Astro) e verifica che la preview deployment generata sulla
Pull Request replichi tutti gli scenari sopra.
