# Quickstart — Validazione di Header and hero redesign

Scenari di validazione end-to-end per i nove criteri di successo della spec. Si eseguono con
Playwright e `@axe-core/playwright`, già installati come dipendenze di sviluppo; non è prevista
una suite di test versionata (vedi [research.md](./research.md) R7).

**Avvio**: `npm run build && npm run preview` (validazione sulla build di produzione, come per la
feature 001), oppure `npm run dev` per i controlli visivi rapidi durante l'implementazione.

**Viewport di riferimento**: 375×812 (mobile), 768×1024 (tablet), 1280×800 (desktop), più 320px e
1920px per i soli controlli di overflow.

---

## Baseline pre-modifica (rilevata dal codice, non da misurare)

Valori attuali che i criteri relativi devono superare:

| Grandezza | Valore attuale | Origine |
|---|---|---|
| Distanza blocco titolo → sottotitolo | `1rem` (16px) — `--space-sm` | `Hero.astro`, `.hero__title { margin: 0 0 var(--space-sm) }` |
| Larghezza massima del blocco hero | `42rem` | `Hero.astro`, `.hero__inner` |
| Violazioni axe su `/` e `/about` | 0 | Feature 001, task T040 |

La distanza titolo → sottotitolo **dopo** la modifica deve essere strettamente maggiore di 16px
su tutti i viewport (obiettivo di progetto: almeno `--space-lg`, 40px).

---

## Scenario 1 — Blocco titolo: copy, gerarchia, allineamento (US1)

Su `/`, per ciascuno dei tre viewport di riferimento:

1. La pagina contiene **esattamente un** elemento `h1` *(I-1, SC-006)*.
2. Dentro quell'`h1` compaiono, nell'ordine: `The path`, `from noise to harmony`,
   `Machine Learning, SQL and Data Visualization applied to real life.` *(I-2)*.
3. La dimensione di carattere calcolata delle tre righe è **strettamente decrescente**
   *(I-3, SC-003)*.
4. La distanza verticale tra riga 2 e riga 3 è maggiore di quella tra riga 1 e riga 2 *(I-4)*.
5. L'allineamento del testo calcolato del blocco è `center` *(I-5)*.
6. La stringa `Valerio Quaranta — Data Scientist Junior` **non compare** nel DOM *(I-6)*.

**Controllo aggiuntivo di robustezza per I-3**: verificare la decrescenza anche su alcune
larghezze intermedie (es. 480, 600, 900, 1100px), non solo sui tre viewport nominali — è
esattamente il caso che la decisione R2 esiste per proteggere.

---

## Scenario 2 — Intestazione su tutte le pagine (US2)

Su `/` e su `/about`, per ciascuno dei tre viewport:

1. Il brand riporta esattamente `Valerio Quaranta - A Data Science Hub` *(I-7, SC-001)*.
2. Il brand è un collegamento a `/` ed è raggiungibile e attivabile da tastiera (Tab fino a
   raggiungerlo, Invio per attivarlo) *(I-8)*.
3. A 375px e a 320px il brand è interamente leggibile e non si sovrappone ai collegamenti
   Home/About: se la barra va a capo, i due gruppi restano su righe distinte e nessun testo
   risulta tagliato *(FR-017)*.
4. L'anello di focus resta visibile su brand e collegamenti *(FR-018)*.

---

## Scenario 3 — Sottotitolo e pulsante (US3)

Su `/`, per ciascuno dei tre viewport:

1. Il sottotitolo è in inglese e comunica il percorso completo estrazione → modellazione →
   comunicazione dei risultati *(FR-009)*.
2. La distanza verticale tra il fondo del blocco titolo e la cima del sottotitolo è **maggiore di
   16px** *(I-9, SC-004)*.
3. L'allineamento del testo calcolato del sottotitolo è `center` *(I-10)*.
4. Il pulsante è l'elemento immediatamente successivo al sottotitolo, ha testo inglese ed è
   centrato *(I-11)*.
5. L'attivazione del pulsante porta alla sezione progetti: la sezione `#progetti` entra nel
   viewport *(I-12, SC-008)*.
6. Il pulsante è attivabile da tastiera con anello di focus visibile *(FR-018)*.

---

## Scenario 4 — Prima schermata e reattività

1. A 1280×800, **senza scorrere**, sono visibili: le tre righe del titolo, il sottotitolo e il
   pulsante *(SC-002)*.
2. Nessuno scorrimento orizzontale del documento da 320px a 1920px: la larghezza di scorrimento
   non supera la larghezza del viewport *(I-13, SC-005)*.
3. Con zoom del browser al 200% a 1280px, la gerarchia tra le tre righe resta percepibile e
   nessun testo risulta tagliato *(spec § Edge Cases)*.
4. Nessun errore in console sui tre viewport.

---

## Scenario 5 — Accessibilità e non regressione

1. Scansione `@axe-core/playwright` su `/` e su `/about`: **0 violazioni**, come la baseline
   *(I-14, SC-007)*.
2. Lettura con screen reader (o ispezione dell'albero di accessibilità): il titolo è annunciato
   come **un unico heading** contenente le tre righe, non come tre elementi scollegati
   *(FR-008)*.
3. Lo stacco tra riga 2 e riga 3 non introduce alcun nodo di testo vuoto annunciato
   *(spec § Edge Cases, decisione confermata al gate review-spec)*.
4. Nessun colore è cambiato: il contrasto resta quello già verificato AA *(FR-018)*.

---

## Scenario 6 — Confine di scope

1. Navigazione, sezione progetti, sezione About e piè di pagina restano invariati e in italiano
   *(I-15)*.
2. `git diff --name-only` sui file sorgente elenca **soltanto** `src/layouts/BaseLayout.astro` e
   `src/components/landing/Hero.astro` *(I-16, SC-009)*.
3. `npm run lint` e `npm run build` completano senza errori.

---

## Nota attesa (non è un difetto)

Al termine della feature il titolo della scheda del browser resta "Data Scientist Junior —
Portfolio" e l'attributo di lingua del documento resta `it`: entrambi sono fuori dallo scope
dichiarato e verranno chiusi nella spec di traduzione del resto del sito. Non vanno segnalati
come regressioni durante questa validazione.
