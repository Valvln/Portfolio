# Contract: Content Schema (Astro Content Collections)

**Feature**: `001-portfolio-showcase` | **Date**: 2026-07-16

Questo è il contratto tra i **dati** (file di contenuto versionati) e la
**presentazione** (componenti Astro/React), come richiesto dal Principio
"Data-First Design" e da FR-012. Ogni file di contenuto DEVE validare questo
schema a build-time: un file non conforme DEVE far fallire la build, non deve
mai raggiungere silenziosamente la UI in uno stato incompleto.

Questo documento descrive la *forma* del contratto (campi, tipi, vincoli); non è
codice di implementazione — la definizione Zod concreta viene creata durante
`/speckit-implement` in `src/content/config.ts`.

## Collection `projects`

```text
schema projects:
  title:          string, required, non-empty
  description:    string, required, non-empty
  tags:           array<enum("sql","ml","viz", ...future values)>, required, min 1 item
  githubUrl:       string (URL), optional*
  linkedinUrl:     string (URL), optional*
  pdfPresentation: object, optional
    file:  string (path relativo a un asset PDF esistente), required se pdfPresentation presente
    label: string, optional
  order:           number, optional

  * vincolo incrociato: almeno uno tra githubUrl e linkedinUrl DEVE essere presente
```

**Garanzie del contratto**:
- Un progetto senza `pdfPresentation` non genera mai un'azione di
  visualizzazione/download vuota o non funzionante (FR-009) — è responsabilità
  del componente `ProjectCard`/`PdfViewer` verificare la presenza del campo
  prima di renderizzare l'azione, non filtrare a monte.
- Un progetto con `tags: ["ml", "viz"]` DEVE comparire in entrambi i filtri
  corrispondenti nella Project Grid.
- `githubUrl`/`linkedinUrl`, quando presenti, DEVONO essere URL assoluti validi
  (apertura in nuova scheda, FR-006).

## Collection `about` (singleton)

```text
schema about:
  summary:       string, required, non-empty
  skills:        array<string>, required, min 1 item
  contactEmail:  string (email), optional*
  linkedinUrl:   string (URL), optional*

  * vincolo incrociato: almeno uno tra contactEmail e linkedinUrl DEVE essere presente
```

## Consumo lato presentazione (interfaccia attesa dai componenti)

I componenti Astro/React che leggono queste collection (`ProjectGrid`,
`ProjectCard`, `TagFilter`, `PdfViewer`, `AboutSection`) DEVONO trattare questi
campi come sola lettura e non contenere logica di derivazione dei dati
(parsing, calcolo tag, ecc.) al proprio interno: qualunque trasformazione
(es. normalizzazione tag, ordinamento) avviene in un layer di accesso ai dati
condiviso (es. funzione `getProjects()` sopra `getCollection('projects')`),
così che in futuro sostituire la fonte statica con un'API (Principio II) implichi
modificare solo quel layer, non i componenti.

## Evoluzione futura (non in scope v1)

Questo contratto è progettato per restare valido anche se in futuro i dati
venissero serviti da un endpoint API invece che da file statici: la forma
dei campi (`title`, `tags`, `githubUrl`, ...) è la stessa che un endpoint
`GET /api/projects` dovrebbe restituire, evitando una rottura di contratto per i
componenti di presentazione.
