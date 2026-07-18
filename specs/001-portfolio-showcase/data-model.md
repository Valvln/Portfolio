# Data Model: Portfolio Data Scientist – Showcase Competenze

**Feature**: `001-portfolio-showcase` | **Date**: 2026-07-16

Le entità seguenti derivano dalla sezione *Key Entities* di [spec.md](./spec.md)
e sono implementate come **Astro Content Collections** (file esterni + schema
Zod validato a build-time), coerentemente con FR-012 e il Principio "Data-First
Design" della costituzione. Lo schema formale (contratto) è in
[contracts/content-schema.md](./contracts/content-schema.md).

## Entità

### Progetto (`projects` collection)

Rappresenta un case study del portfolio. Un'istanza per ciascuno dei 5 progetti
richiesti in v1.

| Campo | Tipo | Obbligatorio | Note / Regole di validazione |
|---|---|---|---|
| `title` | string | Sì | Titolo del progetto, univoco all'interno della collection |
| `slug` | string | Sì (derivato dal filename) | Identificatore univoco, usato come chiave di ordinamento/routing interno |
| `description` | string | Sì | Descrizione sintetica (FR-003); lunghezza consigliata 1–3 frasi |
| `tags` | array di enum (`sql`, `ml`, `viz`) | Sì, min 1 elemento | Deve contenere almeno le categorie SQL/ML/Viz (FR-004); estendibile con nuovi valori senza rompere lo schema esistente |
| `githubUrl` | string (URL) | Condizionale | Richiesto se `linkedinUrl` assente — almeno un link esterno per progetto (FR-003, Assumption spec.md) |
| `linkedinUrl` | string (URL) | Condizionale | Richiesto se `githubUrl` assente |
| `pdfPresentation` | riferimento a entità **Presentazione** | No | Assente = nessuna azione di visualizzazione/download mostrata (FR-009) |
| `order` | number | No | Ordinamento esplicito nella Project Grid (default: ordine alfabetico su `title`) |

**Regole**:
- Esattamente 5 entry attive in v1 (Assumption in spec.md); lo schema non
  impone un limite rigido per restare estendibile (Principio II).
- Almeno uno tra `githubUrl` e `linkedinUrl` DEVE essere presente (regola di
  validazione a livello di schema/refine, non solo convenzione).
- Un progetto con più tag compare in tutti i filtri corrispondenti (Edge Case
  spec.md).

### Presentazione — PDF (`pdfPresentation` embedded field)

Rappresenta il materiale Canva collegato a un progetto. Modellata come
sotto-oggetto del Progetto (non collection separata: relazione 1:1, ciclo di
vita legato al progetto).

| Campo | Tipo | Obbligatorio | Note |
|---|---|---|---|
| `file` | string (path asset) | Sì (se `pdfPresentation` presente) | Percorso del PDF statico esportato da Canva, in `src/assets/pdf/` |
| `label` | string | No | Testo del pulsante/azione (default: "Visualizza presentazione") |

**Regole**:
- Se `pdfPresentation` è assente sul progetto, nessuna UI di embed/download deve
  essere renderizzata per quel progetto (FR-009).
- Quando presente, il sistema DEVE esporre sia l'azione di visualizzazione
  in-page (embed) sia quella di download (FR-007) — non alternative tra loro.

### Profilo — About (`about` collection, singleton)

Rappresenta le informazioni professionali del candidato non legate a un singolo
progetto. Collection a entry singola (una sola voce attiva).

| Campo | Tipo | Obbligatorio | Note |
|---|---|---|---|
| `summary` | string (markdown breve) | Sì | Sintesi professionale (FR-010) |
| `skills` | array di string | Sì, min 1 elemento | Elenco competenze/tecnologie mostrate nella sezione About |
| `contactEmail` | string (email) | Condizionale | Richiesto se `linkedinUrl` assente — almeno un canale di contatto (FR-010) |
| `linkedinUrl` | string (URL) | Condizionale | Richiesto se `contactEmail` assente |

## Relazioni

```text
Progetto (1) ── (0..1) Presentazione PDF     [embedded, non collection separata]
Profilo (About) ── nessuna relazione diretta con Progetto (contenuto indipendente)
```

## Stati e ciclo di vita

Contenuto interamente statico e versionato: non esistono transizioni di stato a
runtime in v1 (nessun workflow di pubblicazione/bozza). Un progetto è "visibile"
se e solo se il suo file esiste nella collection `projects` al momento della
build — coerente con l'assenza di CMS/backend dichiarata nelle Assumptions della
spec.

## Volumi e scala

5 entry in `projects` in v1; schema pensato per restare valido con un numero
maggiore di progetti in futuro senza modifiche strutturali (Principio II,
Edge Case spec.md).
