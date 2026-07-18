# Workflow di sviluppo

## Convenzione branch-per-feature (spec-kit)

Questo progetto usa [spec-kit](https://github.com/github/spec-kit) per gestire feature tramite spec numerate in `specs/`. Regola fissa:

- **Non si committa lavoro di feature direttamente su `main`.**
- Ogni spec in `specs/NNN-nome-feature/` ha un branch dedicato con lo stesso nome: `NNN-nome-feature` (es. `001-portfolio-showcase`).
- Ciclo tipico:
  1. `speckit-specify` → crea spec + branch
  2. `speckit-plan` → genera piano tecnico
  3. `speckit-tasks` → genera task list
  4. `speckit-implement` → esegue i task **sul branch della feature**
  5. Pull request verso `main` a lavoro completato
- `main` deve restare sempre deployabile (Vercel builda da `main`).

## Perché

Tenere `main` pulito consente deploy continui senza rischio di rompere il sito in produzione con lavoro a metà.
