# Tasks: Header and hero redesign

**Feature**: `002-header-hero-redesign` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)
**Size**: `normal` — lista completa per fasi, una fase per user story

**Tests**: nessun file di test versionato viene creato. La validazione passa dagli scenari di
[quickstart.md](./quickstart.md), eseguiti con Playwright e `@axe-core/playwright` già installati
(decisione R7 in [research.md](./research.md), coerente con la pratica della feature 001).

**File sorgente coinvolti**: soltanto `src/components/landing/Hero.astro` e
`src/layouts/BaseLayout.astro`.

---

## Phase 1: Setup

Prerequisito condiviso: fissare il riferimento contro cui misurare la non regressione.

**Wave 1 — task singolo:**

- [x] **T001** Registrare la baseline pre-modifica: eseguire `npm run build && npm run preview`, poi una scansione `@axe-core/playwright` su `/` e `/about`, annotando il numero di violazioni come riferimento per SC-007 · nessun file modificato

**⟶ Attendere T001, poi:**

---

## Phase 2: Foundational

Ristrutturazione del contenitore della hero. **Blocca US1 e US3**, che vivono entrambe dentro
questo contenitore; non blocca US2, che sta in un altro file.

**Wave 1 — task singolo:**

- [x] **T002** Rendere `.hero__inner` centrato e ampliato: `text-align: center`, `margin-inline: auto` e larghezza massima maggiore dell'attuale `42rem` per accogliere la riga 3 del titolo senza andare a capo male — applicato sul genitore del wrapper `Reveal` come da decisione R3 (FR-007, FR-011) · `src/components/landing/Hero.astro`

**⟶ Attendere T002, poi:**

---

## Phase 3: User Story 1 — Blocco titolo hero (Priority: P1) 🎯 MVP

**Goal**: il visitatore vede il nuovo blocco titolo a tre righe con gerarchia decrescente,
allineato al centro, senza più la riga identitaria sopra il titolo.

**Independent Test**: aprire `/` e verificare ordine, testo, dimensioni decrescenti, stacco e
allineamento delle tre righe, e l'assenza della vecchia riga sopra il titolo.

### Implementation

**Wave 1 — task singolo (markup):**

- [x] **T003** [US1] Rimuovere l'elemento `p.hero__eyebrow` dal markup e la sua regola di stile, e sostituire il contenuto di `h1.hero__title` con tre `<span>` a blocco contenenti, nell'ordine, `The path`, `from noise to harmony` e `Machine Learning, SQL and Data Visualization applied to real life.` — un solo `h1` nella pagina, come da decisione R1 (FR-003, FR-004, FR-008) · `src/components/landing/Hero.astro`

**⟶ Attendere T003, poi (stesso file, dipende dal markup appena introdotto):**

**Wave 2 — task singolo (stili):**

- [x] **T004** [US1] Applicare la scala tipografica: `font-size` fluida dichiarata una sola volta sull'`h1`, righe 2 e 3 derivate in `em` (≈`0.72em` e `0.30em`) con `max()` di pavimento sulla riga 3, più stacco verticale prima della riga 3 da un token di `global.css` superiore alla distanza fra riga 1 e riga 2 — decisioni R2 e R4 (FR-005, FR-006) · `src/components/landing/Hero.astro`

**⟶ Attendere T004, poi:**

**Wave 3 — validazione:**

- [x] **T005** [US1] Eseguire lo Scenario 1 di `quickstart.md` sui tre viewport di riferimento **e sulle larghezze intermedie 480/600/900/1100px**, verificando che la decrescenza delle tre righe non si inverta a nessuna larghezza (I-1…I-6, SC-003, SC-006) · nessun file modificato

**Checkpoint**: la User Story 1 è pienamente funzionale e testabile in autonomia — il blocco titolo è completo anche se intestazione, sottotitolo e pulsante sono ancora quelli vecchi.

---

## Phase 4: User Story 2 — Intestazione del sito (Priority: P2)

**Goal**: su ogni pagina il visitatore legge l'intestazione con nome e natura del sito, leggibile
anche su schermi stretti.

**Independent Test**: aprire `/` e `/about` e verificare testo del brand, destinazione del
collegamento e convivenza con i collegamenti di navigazione a 320px.

> **Nota di ordinamento**: questa fase tocca `src/layouts/BaseLayout.astro`, un file diverso da
> tutte le altre fasi. È quindi **indipendente da Phase 2, 3 e 5** e può essere svolta in qualsiasi
> momento dopo T001, anche in parallelo alla User Story 1.

### Implementation

**Wave 1 — task singolo (contenuto):**

- [x] **T006** [US2] Sostituire il testo di `a.site-nav__brand` con la stringa verbatim `Valerio Quaranta - A Data Science Hub` — trattino semplice, non trattino lungo — mantenendo `href="/"` e la raggiungibilità da tastiera (FR-001, FR-002) · `src/layouts/BaseLayout.astro`

**⟶ Attendere T006, poi (stesso file):**

**Wave 2 — task singolo (adattamento):**

- [x] **T007** [US2] Rendere la barra di navigazione tollerante alla stringa più lunga: `flex-wrap: wrap` su `.site-nav` con spaziatura verticale fra le righe, e dimensione fluida sul brand che scende leggermente su viewport stretti — nessun troncamento, come da decisione R5 (FR-017, FR-018) · `src/layouts/BaseLayout.astro`

**⟶ Attendere T007, poi:**

**Wave 3 — validazione:**

- [x] **T008** [US2] Eseguire lo Scenario 2 di `quickstart.md` su `/` e `/about` ai tre viewport più 320px, verificando anche l'anello di focus su brand e collegamenti (I-7, I-8) · nessun file modificato

**Checkpoint**: la User Story 2 è pienamente funzionale e testabile in autonomia su tutte le pagine del sito.

---

## Phase 5: User Story 3 — Sottotitolo e pulsante (Priority: P3)

**Goal**: sotto il blocco titolo, a distanza maggiore di prima, il visitatore trova sottotitolo e
pulsante in inglese, centrati.

**Independent Test**: aprire `/` e verificare lingua, ordine, allineamento e distanza di sottotitolo
e pulsante, e che il pulsante porti alla sezione progetti.

### Implementation

**Wave 1 — task singolo (contenuto):**

- [x] **T009** [US3] Tradurre il sottotitolo in `An end-to-end project portfolio — from data extraction to modeling, all the way to communicating results.` e il testo del pulsante in `View Projects`, **lasciando invariato** `href="#progetti"` (FR-009, FR-012, FR-014) · `src/components/landing/Hero.astro`

**⟶ Attendere T009, poi (stesso file):**

**Wave 2 — task singolo (spaziatura):**

- [x] **T010** [US3] Portare la distanza fra blocco titolo e sottotitolo da `--space-sm` (1rem, valore attuale) ad almeno `--space-lg`, dare al sottotitolo una larghezza massima propria più stretta del blocco titolo e centrarla, e assicurare che il pulsante resti centrato immediatamente sotto il sottotitolo — decisione R4 (FR-010, FR-011, FR-013) · `src/components/landing/Hero.astro`

**⟶ Attendere T010, poi:**

**Wave 3 — validazione:**

- [x] **T011** [US3] Eseguire lo Scenario 3 di `quickstart.md` sui tre viewport, misurando che la distanza titolo → sottotitolo sia strettamente maggiore di 16px e verificando che il pulsante porti `#progetti` nel viewport (I-9…I-12, SC-004, SC-008) · nessun file modificato

**Checkpoint**: tutte e tre le user story sono complete; la prima schermata è interamente in inglese.

---

## Phase 6: Polish & Validazione dei criteri di successo

Controlli trasversali sul codice finito. Sono tutti di sola lettura su file diversi o su nessun
file, quindi **indipendenti fra loro**.

**Wave 1 — indipendenti (validazioni distinte, nessuna modifica ai sorgenti):**

- [x] **T012** [P] Eseguire lo Scenario 4 di `quickstart.md`: prima schermata completa a 1280×800 senza scorrere, assenza di scorrimento orizzontale da 320px a 1920px, gerarchia leggibile con zoom al 200%, nessun errore in console (I-13, SC-002, SC-005) · nessun file modificato
- [x] **T013** [P] Eseguire lo Scenario 5 di `quickstart.md`: scansione axe su `/` e `/about` confrontata con la baseline di T001, titolo annunciato come heading unico nell'albero di accessibilità, assenza di nodi di testo vuoti dovuti allo stacco (I-14, SC-007, FR-008, FR-018) · nessun file modificato
- [x] **T014** [P] Eseguire lo Scenario 6 di `quickstart.md`: verificare che `git diff --name-only` sui sorgenti elenchi soltanto `src/layouts/BaseLayout.astro` e `src/components/landing/Hero.astro`, che navigazione, progetti, About e piè di pagina siano invariati, e che `npm run lint` e `npm run build` completino senza errori (I-15, I-16, SC-001, SC-009) · nessun file modificato

**⟶ Attendere la Wave 1, poi:**

**Wave 2 — task singolo:**

- [x] **T015** Ri-verificare la conformità ai tre principi costituzionali sul risultato reale (Constitution Check di `plan.md`), con attenzione al Principio III: nessuna regressione di contrasto, di navigazione da tastiera o di semantica introdotta dalle modifiche · nessun file modificato

---

## Dependencies & Execution Order

### Dipendenze fra fasi

```text
Phase 1 (Setup)
   │
   ├─────────────────────────────┐
   ↓                             ↓
Phase 2 (Foundational)      Phase 4 (US2 — BaseLayout.astro)
   ↓                             │
Phase 3 (US1 — P1, MVP)          │
   ↓                             │
Phase 5 (US3 — P3)               │
   └─────────────┬───────────────┘
                 ↓
        Phase 6 (Polish)
```

**Il ramo di destra è reale, non teorico**: la User Story 2 tocca soltanto
`src/layouts/BaseLayout.astro`, mentre Foundational, US1 e US3 toccano soltanto
`src/components/landing/Hero.astro`. I due rami non condividono alcun file e possono procedere
in qualsiasi ordine dopo T001.

### Waves per fase

| Fase | Wave 1 | Wave 2 | Wave 3 |
|---|---|---|---|
| 1 — Setup | T001 | — | — |
| 2 — Foundational | T002 | — | — |
| 3 — US1 | T003 (markup) | T004 (stili) | T005 (validazione) |
| 4 — US2 | T006 (contenuto) | T007 (adattamento) | T008 (validazione) |
| 5 — US3 | T009 (contenuto) | T010 (spaziatura) | T011 (validazione) |
| 6 — Polish | T012 · T013 · T014 `[P]` | T015 | — |

Dentro le fasi 2, 3 e 5 le wave sono di un solo task perché insistono tutte sullo stesso file
(`Hero.astro`): la sequenzialità è una conseguenza onesta della struttura, non una scelta
prudenziale. L'unica parallelizzazione genuina è la Wave 1 della Phase 6, dove le tre validazioni
sono di sola lettura e indipendenti fra loro.

### Percorso MVP

Phase 1 → Phase 2 → Phase 3. A quel punto il blocco titolo — l'elemento che cambia la percezione
del portfolio — è completo e dimostrabile, anche se intestazione, sottotitolo e pulsante sono
ancora nella versione precedente.

### Copertura dei requisiti

| Requisito | Task |
|---|---|
| FR-001, FR-002 | T006, T008 |
| FR-003, FR-004 | T003, T005 |
| FR-005, FR-006 | T004, T005 |
| FR-007 | T002, T005 |
| FR-008 | T003, T005, T013 |
| FR-009, FR-012, FR-014 | T009, T011 |
| FR-010, FR-013 | T010, T011 |
| FR-011 | T002, T010, T011 |
| FR-015, FR-016 | T014 |
| FR-017 | T007, T012 |
| FR-018 | T007, T013, T015 |
