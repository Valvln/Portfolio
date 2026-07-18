<!--
Sync Impact Report
- Version change: [TEMPLATE] → 1.0.0 (initial ratification)
- Modified principles: N/A (first adoption)
- Added principles:
  - I. Data-First Design
  - II. Scalabilità Architetturale
  - III. Professionalità Creativa
- Added sections: Standard Tecnologici e Vincoli; Workflow di Sviluppo e Qualità; Governance
- Removed sections: template placeholder slots for Principles IV-V (not needed — project defines exactly 3 core principles)
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (Constitution Check gate is derived dynamically from this file; no hardcoded principle references to update)
  - ✅ .specify/templates/spec-template.md (no hardcoded principle references found)
  - ✅ .specify/templates/tasks-template.md (no hardcoded principle references found)
  - ✅ .claude/skills/speckit-*/SKILL.md (generic, no project-specific or agent-specific stale references found)
- Follow-up TODOs: none
-->

# Portfolio Data Scientist Junior Constitution

## Core Principles

### I. Data-First Design
I dati dei progetti — case study, dataset, metodologia, risultati, metriche — sono il
contenuto centrale del portfolio, non un accessorio del design. Ogni progetto pubblicato
DEVE presentare: il problema affrontato, la fonte/dataset utilizzato, la metodologia
applicata, i risultati quantificabili e le metriche di validazione. I componenti UI
DEVONO essere progettati per esporre e valorizzare i dati (grafici, tabelle, metriche
chiave) prima di qualsiasi elemento puramente decorativo. I contenuti di progetto
DEVONO essere modellati come dati strutturati (es. Markdown/MDX con frontmatter, JSON)
e non come testo libero, così da restare riutilizzabili, ordinabili e filtrabili.

Rationale: un portfolio di Data Scientist deve dimostrare competenza attraverso
l'evidenza (dati, metodo, risultati), non solo attraverso l'estetica. Trattare i dati
di progetto come contenuto strutturato e separato dalla presentazione permette inoltre
di riutilizzarli in futuro (dashboard, ricerca, API) senza riscrivere i contenuti.

### II. Scalabilità Architetturale
L'architettura DEVE permettere di partire come sito statico ed evolvere in futuro verso
una web app complessa (backend, autenticazione, dashboard interattive, API) senza
richiedere una riscrittura completa. Le scelte tecniche DEVONO mantenere separati
contenuto (dati di progetto), presentazione (componenti UI) e logica (rendering/
routing/accesso ai dati), evitando accoppiamenti che impedirebbero l'introduzione
futura di un livello server. Ogni funzionalità implementata in modo "statico" (es.
contenuti letti da file locali) DEVE poter essere sostituita in futuro da una fonte
dinamica (es. API/database) modificando un solo livello di accesso ai dati, senza
toccare la logica di presentazione.

Rationale: il portfolio nasce come sito statico per rapidità e basso costo, ma è
esplicitamente concepito come punto di partenza di un progetto più ampio. Bloccare
scelte architetturali che impediscano la crescita (es. logica di business incorporata
nei componenti di presentazione) comporterebbe costi di riscrittura evitabili.

### III. Professionalità Creativa
Il design DEVE unire l'impatto visivo e la cura estetica tipici di Canva (gerarchia
visiva chiara, palette coerente, tipografia curata, micro-interazioni) con il rigore
tecnico e la pulizia tipici di un repository GitHub ben curato (codice leggibile,
convenzioni coerenti, documentazione chiara, assenza di elementi non funzionanti).
Nessuna scelta estetica DEVE compromettere performance, accessibilità o manutenibilità
del codice. Ogni componente visivo introdotto DEVE avere una motivazione funzionale
(comunicare un dato, guidare l'attenzione, rafforzare la credibilità) e non essere
puramente decorativo.

Rationale: il pubblico di riferimento (recruiter e hiring manager tecnici) valuta sia
la presentazione sia la competenza tecnica sottostante; un portfolio esteticamente
debole o tecnicamente trascurato comunica la stessa mancanza di cura professionale.

## Standard Tecnologici e Vincoli

- Lo stack tecnologico iniziale è libero, purché rispetti la separazione dati/
  presentazione/logica richiesta dal Principio II.
- I contenuti dei progetti DEVONO essere versionati come dati strutturati (Markdown/MDX
  con frontmatter, JSON o formato equivalente), leggibili sia da una build statica sia
  da una futura API.
- Immagini e asset visivi DEVONO essere ottimizzati per il web (performance, Core Web
  Vitals) senza rinunciare alla qualità visiva richiesta dal Principio III.
- L'accessibilità (contrasto, semantica HTML, navigazione da tastiera) è un requisito
  non negoziabile, non un'aggiunta opzionale.

## Workflow di Sviluppo e Qualità

- Ogni nuova funzionalità o progetto pubblicato DEVE essere verificato contro i tre
  principi cardine prima del merge/deploy.
- Le modifiche che introducono accoppiamento tra dati e presentazione (violazione del
  Principio II) richiedono una giustificazione esplicita in Complexity Tracking nel
  piano di implementazione.
- Le revisioni di design DEVONO valutare congiuntamente impatto visivo e pulizia del
  codice risultante (Principio III), non solo l'uno o l'altro aspetto.

## Governance

Questa costituzione ha priorità su ogni altra pratica o convenzione informale del
progetto. Ogni modifica ai principi richiede: (1) documentazione esplicita della
motivazione, (2) incremento di versione secondo semantic versioning (MAJOR per rimozioni
o ridefinizioni incompatibili, MINOR per nuovi principi o sezioni, PATCH per chiarimenti
non semantici), (3) aggiornamento dei template dipendenti (plan, spec, tasks) se
impattati dalla modifica. Ogni piano e revisione DEVE verificare la conformità ai
principi tramite il Constitution Check; la complessità aggiuntiva non giustificata dai
principi DEVE essere motivata esplicitamente o rimossa.

**Version**: 1.0.0 | **Ratified**: 2026-07-16 | **Last Amended**: 2026-07-16
