# Checklist di Go-Live: Portfolio Data Scientist – Showcase Competenze

**Feature**: `001-portfolio-showcase` | **Generata**: 2026-07-18

Checklist finale prima del lancio pubblico, basata sull'implementazione
verificata dei 44 task di [tasks.md](./tasks.md) (T001–T044). Ogni voce
indica se è **bloccante** (da fare prima del lancio) o **consigliata**
(miglioria successiva).

## 🔴 Bloccanti — sicurezza

- [ ] **Aggiornare Astro dalla 5.18.2 alla 7.1.1** (o successiva). `npm audit`
  ha rilevato 5 vulnerabilità (4 high, 1 low) nella versione attuale,
  incluse più CVE di tipo XSS e un SSRF via header `Host` sulle pagine di
  errore prerenderizzate, oltre a una vulnerabilità nell'adapter
  `@astrojs/vercel` (path override non autenticato). È un aggiornamento
  **major** (breaking change dichiarato da npm): va pianificato con
  ri-test completo (build, typecheck, tutti gli scenari di
  `quickstart.md`), non applicato "al volo". Non eseguito automaticamente
  in questa sessione proprio per questo motivo.
- [ ] Rieseguire `npm audit` dopo l'aggiornamento e confermare 0
  vulnerabilità high/critical residue.

## 🔴 Bloccanti — contenuti reali (placeholder da sostituire)

Il sito è stato implementato con contenuti plausibili ma segnaposto, per
poter validare davvero ogni componente. **Nessuno di questi va in
produzione così com'è**:

- [ ] `src/components/landing/Hero.astro`: sostituire "Nome Cognome" con il
  nome reale.
- [ ] `src/content/about/about.md`: sostituire `contactEmail`
  (`nome.cognome@example.com`) con l'email reale; verificare `linkedinUrl`
  punti al profilo reale; rivedere `summary` e `skills` perché riflettano
  il percorso effettivo.
- [ ] I 5 file in `src/content/projects/project-*.md` sono progetti
  d'esempio plausibili (churn prediction, dashboard vendite, sentiment
  analysis, pipeline ETL, clustering) con `githubUrl` che punta a
  `github.com/your-username/...` — **link non funzionanti**, da sostituire
  con i repository reali (o rimuovere/sostituire il progetto se non
  corrisponde a un lavoro effettivo).
- [ ] `linkedinUrl` nei progetti punta a `linkedin.com/in/your-profile/` —
  sostituire con il profilo reale.
- [ ] **Principio costituzionale "Data-First Design"**: le descrizioni
  progetto attuali non includono ancora risultati quantificabili né
  metriche di validazione (es. "AUC 0.89", "+12% precisione vs baseline"),
  richiesti esplicitamente dal principio. Aggiungerli per ciascun progetto
  reale.
- [ ] `public/pdf/review-sentiment-analysis.pdf` è un PDF segnaposto
  generato via script (una pagina di solo testo) — sostituire con l'export
  reale della presentazione Canva. Decidere anche se altri progetti oltre
  al terzo debbano avere una presentazione (`pdfPresentation` nello schema
  è opzionale per-progetto).
- [ ] `astro.config.mjs`: `site: 'https://example-portfolio.vercel.app'` è
  un placeholder — aggiornare con il dominio reale una volta noto (impatta
  URL canonici e tag Open Graph).

## 🔴 Bloccante — deploy

- [ ] **Collegare il repository a Vercel** (T044, non eseguibile
  autonomamente: richiede l'accesso al tuo account). Passi:
  1. Push del repository su GitHub/GitLab/Bitbucket.
  2. Su vercel.com → "Add New Project" → importa il repository (Astro
     viene rilevato automaticamente, adapter `@astrojs/vercel` già
     configurato in `astro.config.mjs`).
  3. Deploy: build/output già verificati localmente (`npm run build`
     completa senza errori).
  4. Ripetere gli scenari di [quickstart.md](./quickstart.md) sulla
     preview URL generata da Vercel prima di promuovere in produzione.
- [ ] Configurare il dominio personalizzato (se previsto) e aggiornare
  `site` in `astro.config.mjs` di conseguenza.

## 🟡 Consigliate — SEO

- [ ] Aggiungere un'immagine `og:image` (attualmente assente): i social
  preview del link condiviso mostreranno solo testo.
- [ ] Aggiungere un `sitemap.xml` (integrazione `@astrojs/sitemap`, non
  installata in questa iterazione) e un `robots.txt` in `public/`.
- [ ] Personalizzare `title`/`description` per pagina se in futuro si
  aggiungono pagine di dettaglio progetto.

## ✅ Verificato in questa sessione (nessuna azione richiesta)

- **Performance**: Lighthouse Home 99/100, About 100/100 (soglia
  `plan.md`: ≥95) — build di produzione, non dev server.
- **SEO**: Lighthouse 100/100 su entrambe le pagine.
- **Best Practices**: Lighthouse 100/100 su entrambe le pagine.
- **Accessibilità**: Lighthouse 100/100 e 0 violazioni axe-core su entrambe
  le pagine. Corretto un difetto reale di contrasto colore (tag, testo,
  link — rapporti 2.5–3.64:1, ora tutti ≥4.5:1) e rimosso un tema dark
  parzialmente implementato che risultava illeggibile (contrasto 2.74:1)
  perché mai ritarato: il sito ha ora un solo tema chiaro, interamente
  verificato. Se si desidera reintrodurre il dark mode in futuro, ogni
  colore (`--color-primary`, `--color-tag-*`) andrà ritarato e riverificato
  per lo sfondo scuro, non solo copiato dal tema chiaro.
- **Bundle JavaScript**: l'isola PDF (`react-pdf`, ~550 KB) è caricata solo
  al click su "Visualizza presentazione" (code-splitting via
  `React.lazy`), non ad ogni visita della home — verificato che 0 richieste
  di rete partano prima del click.
- **Funzionalità** (browser reale, non solo revisione codice): tutti e 4 gli
  user story validati con Playwright — Project Grid con filtro tag,
  landing above-the-fold, viewer/download PDF con azioni assenti quando
  non pertinenti, navigazione About in 1 click con contatto funzionante.
  Nessun errore in console del browser in nessuno scenario.
- **Reattività**: nessun overflow orizzontale e contenuti/azioni
  funzionanti su viewport reali 375×812 (mobile), 768×1024 (tablet),
  1280×800 (desktop).
- **Codice**: `npx astro check` (TypeScript) 0 errori; `npm run lint`
  (ESLint + `eslint-plugin-astro`) 0 errori dopo aver corretto la
  configurazione iniziale (mancava il parser TypeScript); formattazione
  uniformata con Prettier.
- **Costituzione di progetto**: Principio II (Scalabilità Architetturale) e
  III (Professionalità Creativa) pienamente rispettati nell'implementazione
  reale; Principio I (Data-First Design) rispettato nella struttura dati,
  con la nota sui contenuti segnaposto sopra.

## Note per il futuro (non bloccanti)

- Nessuna suite di test automatizzati è stata creata (scelta esplicita:
  non richiesta in `tasks.md`). La validazione di questa sessione è stata
  fatta con script Playwright/axe-core temporanei, non conservati nel
  repository. Se si desidera una rete di sicurezza per le modifiche
  future, vale la pena introdurre `tests/e2e/` con Playwright, coerente
  con quanto già previsto (ma non reso obbligatorio) in `plan.md`.
- Ottimizzazioni performance minori disponibili ma non necessarie ora
  (Home già a 99/100): ~22 KiB di JavaScript non utilizzato e ~150ms di
  richieste render-blocking segnalati da Lighthouse come margine di
  miglioramento, non come difetto.
