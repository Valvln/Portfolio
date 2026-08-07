# Tasks: Traduzione in inglese dell'interfaccia

**Feature**: `003-english-ui-translation` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)
**Size**: `normal` — lista completa per fasi, una fase per user story

**Tests**: nessun file di test versionato viene creato. La validazione passa dagli scenari di
[quickstart.md](./quickstart.md), eseguiti con Playwright e `@axe-core/playwright` già installati
(decisione R8 in [research.md](./research.md), coerente con la pratica delle feature 001 e 002).

**Fonte delle stringhe**: ogni task di traduzione fa riferimento a
[contracts/ui-contract.md](./contracts/ui-contract.md), che contiene la tabella `Da → A` verbatim.
Le stringhe **non vanno riformulate** in fase di implementazione: se una traduzione non convince,
si aggiorna prima il contratto.

**File coinvolti**: 8 file sorgente in `src/` più i 5 contenuti di progetto, questi ultimi
limitati a **una riga ciascuno**.

---

## Vincolo d'ordine non negoziabile

`<html lang="en">` (T017) è l'**ultima** modifica funzionale della feature, dopo T002…T016.
Applicarla prima significa dichiarare inglese su etichette ancora italiane: gli screen reader
applicherebbero la fonetica sbagliata a testo che oggi leggono correttamente, rendendo il branch
**peggiore di `main`** invece che parzialmente migliore (FR-025, research R4).

Non è una preferenza di ordinamento: è la ragione per cui US4 è una fase separata.

---

## Phase 1: Setup

Fissare i due riferimenti contro cui si misura l'avanzamento e la non regressione.

**Wave 1 — task singolo:**

- [x] **T001** Registrare la baseline pre-modifica: eseguire lo sweep dello scenario 0 di `quickstart.md` e annotare il conteggio (atteso **32 righe** su `main`), poi `npm run build && npm run preview` e una scansione `@axe-core/playwright` su `/` e `/about`, annotando il numero di violazioni come riferimento per SC-006 · nessun file modificato

**⟶ Attendere T001, poi:**

---

## Phase 2: Foundational

**Nessun task.** Questa feature non ha prerequisiti bloccanti: non introduce moduli, dipendenze o
strutture condivise, e ogni user story insiste su file propri. L'unico accoppiamento reale — la
rinomina coordinata dell'ancora — vive **dentro** US1 (T003 → T004) e non blocca le altre storie.

La fase resta nell'elenco per non alterare la numerazione delle successive rispetto al template.

---

## Phase 3: User Story 1 — Impalcatura del sito (Priority: P1) 🎯 MVP

**Goal**: navigazione, titolo di sezione, collegamento di salto e piè di pagina parlano inglese, e
l'ancora dei progetti è coerente con il resto degli identificatori.

**Independent Test**: aprire `/`, verificare che il titolo di sezione sia `Projects`, che la CTA
dell'hero vi porti, e che `Tab` dall'inizio del documento riveli `Skip to main content`.

### Implementation

**Wave 1 — due file indipendenti:**

- [x] **T002** [P] [US1] Tradurre le tre stringhe dell'impalcatura secondo §1 del contratto UI: collegamento di salto → `Skip to main content`, `aria-label` della `<nav>` → `Main navigation`, testo del piè di pagina → `Junior Data Scientist Portfolio`. Lasciare invariati brand, collegamenti `Home`/`About`, simbolo `©` e anno dinamico. **Non toccare `<html lang>`**, che è T017 (FR-001, FR-002, FR-003, FR-004, FR-005) · `src/layouts/BaseLayout.astro`

- [x] **T003** [P] [US1] Tradurre il titolo di sezione in `Projects` e rinominare **tutti e tre** gli identificatori nello stesso passaggio — `id` della `<section>` da `progetti` a `projects`, `aria-labelledby` della `<section>` e `id` dell'`<h2>` da `progetti-heading` a `projects-heading`. Rinominarne solo una parte fa perdere alla sezione il nome accessibile senza errori di build (research R2) (FR-006, FR-007) · `src/components/projects/ProjectGrid.astro`

**⟶ Attendere T003 (l'`href` deve puntare a un `id` che esiste già), poi:**

**Wave 2 — task singolo:**

- [x] **T004** [US1] Aggiornare l'`href` della CTA dell'hero da `#progetti` a `#projects`. **Nient'altro in questo file**: titolo a tre righe, sottotitolo, testo del pulsante e stili scoped sono copy pinnato dalla spec 002 (FR-008, FR-009) · `src/components/landing/Hero.astro`

**⟶ Attendere T004, poi:**

**Wave 3 — validazione:**

- [x] **T005** [US1] Eseguire gli scenari 1 e 2 di `quickstart.md`: ancora e CTA funzionanti, `#progetti` inesistente, `aria-labelledby` che risolve a un elemento con testo `Projects` (INV-04, il controllo che intercetta la regressione silenziosa), collegamento di salto e navigazione da tastiera su `/` e `/about` · nessun file modificato

**⟶ Attendere T005, poi:**

---

## Phase 4: User Story 2 — Controlli dei progetti (Priority: P2)

**Goal**: filtro, card e viewer PDF sono utilizzabili da un pubblico anglofono, dai pulsanti fino
ai messaggi di stato e di errore.

**Independent Test**: filtrare i progetti, aprire e chiudere una presentazione, navigarne le
pagine e scaricarla, senza incontrare testo italiano.

### Implementation

**Wave 1 — sei file indipendenti, tutti parallelizzabili:**

- [x] **T006** [P] [US2] Tradurre secondo §6 del contratto UI: `aria-label` del gruppo tag → `Technology tags`, e **entrambe** le occorrenze di `(apre in una nuova scheda)` → `(opens in a new tab)` (GitHub e LinkedIn). Lasciare invariate le etichette `SQL`, `ML`, `Viz`, `Python` e i nomi `GitHub`/`LinkedIn` (FR-012, FR-013, FR-030) · `src/components/projects/ProjectCard.astro`

- [x] **T007** [P] [US2] Tradurre secondo §7 del contratto UI: etichetta `Tutti` → `All` e `aria-label` del gruppo → `Filter projects by tag`. **Non toccare i cinque `value`** (`all`, `sql`, `ml`, `viz`, `python`): sono chiavi di dato confrontate con `data-tags` renderizzato da `ProjectCard`, e modificarle rompe il filtro (FR-010, FR-011, FR-030) · `src/components/projects/TagFilter.tsx`

- [x] **T008** [P] [US2] Tradurre le quattro stringhe di §8 del contratto UI: `Close presentation`, `Download PDF`, nome file di riserva `presentation.pdf`, e il messaggio di caricamento `Loading presentation “{projectTitle}”…` con **virgolette tipografiche** `“ ”` al posto dei caporali, inserite come carattere letterale e non come entità HTML (research R7) (FR-015, FR-016, FR-017, FR-018) · `src/components/pdf/PdfViewer.tsx`

- [x] **T009** [P] [US2] Tradurre le cinque stringhe di §9 del contratto UI: messaggio di caricamento **identico** a quello di T008, `Could not load the presentation: {loadError}`, `← Previous`, `Page {pageNumber} of {numPages}`, `Next →`. Frecce e valori interpolati restano dove sono. Il messaggio di caricamento è duplicato per costruzione: allinearlo, non estrarlo in costante condivisa (research R5) (FR-018, FR-019, FR-020) · `src/components/pdf/PdfDocument.tsx`

- [x] **T010** [P] [US2] Tradurre `pdfPresentation.label` da `Visualizza presentazione` a `View presentation` nei cinque contenuti di progetto. **Una sola riga di diff per file**: `title`, `description`, `tags`, `file`, URL e corpo restano intatti — è l'unica eccezione consentita al confine con la spec 004 (FR-023, FR-028) · `src/content/projects/{diabetes-ml,education-impact,sql-renewables,travel-sge,water-safety-ai}.md`

- [x] **T011** [P] [US2] Tradurre il valore di riserva dell'etichetta PDF da `'Visualizza presentazione'` a `'View presentation'`. Non è codice morto: `label` è `.optional()` nello schema Zod, quindi il valore entra in gioco per ogni progetto futuro che ometta il campo (research R3) (FR-014) · `src/components/projects/ProjectGrid.astro`

**⟶ Attendere T006…T011, poi:**

**Wave 2 — validazione:**

- [x] **T012** [US2] Eseguire gli scenari 3 e 4 di `quickstart.md`: filtro `All` funzionante e ancora capace di filtrare, etichette accessibili in inglese, ciclo completo del viewer PDF (apertura, caricamento, paginazione, download, chiusura) e percorso di errore · nessun file modificato

**⟶ Attendere T012, poi:**

---

## Phase 5: User Story 3 — Metadati e pagina About (Priority: P3)

**Goal**: scheda del browser, anteprime di condivisione, risultati di ricerca e intestazioni della
pagina About sono in inglese.

**Independent Test**: aprire `/` e `/about`, leggere i titoli nella scheda del browser e le
intestazioni di sezione di About, e attivare il collegamento di contatto.

### Implementation

**Wave 1 — tre file indipendenti:**

- [x] **T013** [P] [US3] Sostituire `title` e `description` della home con i valori verbatim di §2 del contratto UI. Il trattino del `title` è un **trattino lungo** `—` circondato da spazi (FR-021) · `src/pages/index.astro`

- [x] **T014** [P] [US3] Sostituire `title` e `description` della pagina About con i valori verbatim di §3 del contratto UI (FR-021) · `src/pages/about.astro`

- [x] **T015** [P] [US3] Tradurre secondo §10 del contratto UI: intestazioni `Skills` e `Contact`, oggetto della mail `Portfolio contact` (tradurre il testo sorgente, non la forma già codificata da `encodeURIComponent`) e `(opens in a new tab)`. Lasciare invariati l'`<h1>` `About`, le emoji, l'indirizzo email e l'URL LinkedIn. **`summary` e `skills` arrivano dalla content collection e non vanno toccati** (FR-013, FR-022, FR-028) · `src/components/about/AboutSection.astro`

**⟶ Attendere T013…T015, poi:**

**Wave 2 — validazione:**

- [x] **T016** [US3] Eseguire gli scenari 5 e 6 di `quickstart.md`: intestazioni di About, oggetto della mail, titoli nella scheda del browser e coerenza fra `title`/`description` e i corrispondenti metadati Open Graph su entrambe le pagine · nessun file modificato

**⟶ Attendere T016, poi:**

---

## Phase 6: User Story 4 — Dichiarazione di lingua (Priority: P4)

**Goal**: il documento dichiara l'inglese, coerentemente con le etichette ormai tradotte.

**Independent Test**: verificare `document.documentElement.lang === 'en'` su entrambe le pagine e
che nessun altro elemento porti un attributo `lang` proprio.

### ⚠️ Gate d'ingresso

**Non iniziare T017 se T002…T016 non sono tutti completati e validati.** È il vincolo dichiarato in
apertura: è l'unica fase il cui ordine relativo non è negoziabile.

### Implementation

**Wave 1 — task singolo:**

- [x] **T017** [US4] Portare `<html lang="it">` a `<html lang="en">`. **Non aggiungere alcun attributo `lang` ai blocchi di contenuto ancora italiani** — descrizioni delle card, sintesi ed elenco competenze di About: la decisione FR-024 è di non marcarli, e aggiungerli «per sicurezza» contraddirebbe la spec (FR-024, FR-025) · `src/layouts/BaseLayout.astro`

**⟶ Attendere T017, poi:**

**Wave 2 — validazione:**

- [x] **T018** [US4] Eseguire lo scenario 7 di `quickstart.md`: `lang` uguale a `en` su entrambe le pagine, `document.querySelectorAll('[lang]').length === 1` (verifica che nessuna marcatura per blocco sia stata introdotta), e passaggio con VoiceOver sull'intestazione e sui titoli di sezione · nessun file modificato

**⟶ Attendere T018, poi:**

---

## Phase 7: Polish & verifiche trasversali

**Wave 1 — tre controlli indipendenti, di sola lettura:**

- [x] **T019** [P] Eseguire lo sweep finale dello scenario 0 di `quickstart.md`. **Atteso: esattamente 3 righe**, e devono essere i tre commenti documentati (`Hero.astro` ~54, `PdfDocument.tsx` ~19, `PdfViewer.tsx` ~5). Qualsiasi quarta riga è una stringa dimenticata. Verificare inoltre che non sia stato introdotto alcun modulo di stringhe o dipendenza di internazionalizzazione (SC-001, FR-009, FR-026) · nessun file modificato

- [x] **T020** [P] Verificare il confine con la spec 004: `git diff --stat src/content/` deve mostrare **cinque** file modificati con **5 inserimenti e 5 rimozioni** in totale, e `src/content/about/about.md` deve essere assente dal diff (SC-008, FR-028) · nessun file modificato

- [x] **T021** [P] Eseguire `npm run build` e `npx astro check`: entrambi devono completare senza errori né avvisi nuovi rispetto alla baseline di T001 (FR-027) · nessun file modificato

**⟶ Attendere T019…T021, poi:**

**Wave 2 — task singolo:**

- [x] **T022** Eseguire lo scenario 8 di `quickstart.md` ai viewport 375×812, 768×1024 e 1280×800, più un controllo a 320px: assenza di scorrimento orizzontale, nessuna etichetta troncata o sovrapposta, e scansione axe su `/` e `/about` senza violazioni nuove rispetto alla baseline di T001 (SC-006, SC-007, FR-027, FR-029) · nessun file modificato

---

## Dipendenze

```text
        Phase 1 (T001 baseline)
                 │
        Phase 3 — US1 (P1) 🎯 MVP
        T002 [P] ─┐
        T003 [P] ─┤
                  └→ T004 → T005
                 │
        Phase 4 — US2 (P2)
        T006 [P] T007 [P] T008 [P] T009 [P] T010 [P] T011 [P]
                  └────────────→ T012
                 │
        Phase 5 — US3 (P3)
        T013 [P] T014 [P] T015 [P]
                  └────────────→ T016
                 │
        ═══════ GATE: T002…T016 completi ═══════
                 │
        Phase 6 — US4 (P4)
        T017 → T018
                 │
        Phase 7 — Polish
        T019 [P] T020 [P] T021 [P] → T022
```

**Le fasi 4 e 5 non dipendono dalla 3.** Toccano file interamente distinti e potrebbero procedere
in qualsiasi ordine dopo T001. L'ordine qui riflette la **priorità di valore** delle user story,
non un vincolo tecnico. L'unica dipendenza tecnica reale dell'intera feature è T003 → T004
(l'`href` deve puntare a un `id` esistente); l'unico vincolo di sequenza imposto dall'esterno è il
gate di ingresso alla Phase 6.

**Un solo file compare in due fasi**: `ProjectGrid.astro` è toccato da T003 (US1, titolo e
identificatori) e da T011 (US2, valore di riserva dell'etichetta). Sono modifiche a righe diverse e
T003 è completata da una fase precedente, quindi T011 resta legittimamente `[P]` con il resto della
sua wave. Se le fasi 3 e 4 venissero eseguite in parallelo, T011 andrebbe serializzata dopo T003.

### Waves per fase

| Fase | Wave 1 | Wave 2 | Wave 3 |
|---|---|---|---|
| 1 — Setup | T001 | — | — |
| 2 — Foundational | *(nessun task)* | — | — |
| 3 — US1 | T002 · T003 `[P]` | T004 | T005 |
| 4 — US2 | T006 · T007 · T008 · T009 · T010 · T011 `[P]` | T012 | — |
| 5 — US3 | T013 · T014 · T015 `[P]` | T016 | — |
| 6 — US4 | T017 | T018 | — |
| 7 — Polish | T019 · T020 · T021 `[P]` | T022 | — |

A differenza della 002 — dove quasi tutte le wave erano di un solo task perché insistevano sullo
stesso file — qui la parallelizzazione è **reale e ampia**: 14 dei 22 task sono `[P]`, perché una
traduzione tocca molti file senza creare dipendenze fra loro. La Wave 1 della Phase 4 è la più
larga, con sei task indipendenti.

### Percorso MVP

Phase 1 → Phase 3. A quel punto l'impalcatura del sito — navigazione, titolo di sezione, collegamento
di salto, piè di pagina e ancora — è interamente inglese e dimostrabile, anche se filtro, viewer PDF,
metadati e pagina About sono ancora nella versione precedente.

**Attenzione**: l'MVP **non** include T017. Fermarsi all'MVP significa fermarsi con `lang="it"`
ancora dichiarato, che è lo stato corretto per un rilascio parziale — non un lavoro incompleto da
«completare» anticipando la Phase 6.

### Copertura dei requisiti

| Requisito | Task |
|---|---|
| FR-001, FR-002, FR-003 | T002, T005 |
| FR-004, FR-005 | T002 |
| FR-006, FR-007 | T003, T005 |
| FR-008 | T004, T005 |
| FR-009 | T004, T005, T019 |
| FR-010, FR-011 | T007, T012 |
| FR-012 | T006, T012 |
| FR-013 | T006, T015 |
| FR-014 | T011, T012 |
| FR-015, FR-016, FR-017 | T008, T012 |
| FR-018 | T008, T009, T012 |
| FR-019, FR-020 | T009, T012 |
| FR-021 | T013, T014, T016 |
| FR-022 | T015, T016 |
| FR-023 | T010, T020 |
| FR-024 | T017, T018 |
| FR-025 | gate Phase 6, T017 |
| FR-026 | T019 |
| FR-027 | T021, T022 |
| FR-028 | T010, T015, T020 |
| FR-029 | T022 |
| FR-030 | T006, T007 |

| Criterio di successo | Task |
|---|---|
| SC-001 | T019 |
| SC-002 | T012, T016 |
| SC-003 | T005 |
| SC-004 | T016 |
| SC-005 | T018 |
| SC-006 | T005, T022 |
| SC-007 | T022 |
| SC-008 | T020 |
