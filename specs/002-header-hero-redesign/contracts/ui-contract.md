# UI Contract — Header and hero redesign

Il contratto dell'interfaccia visibile: le stringhe che devono comparire alla lettera, la
struttura DOM attesa e i riferimenti su cui gli scenari di validazione si agganciano.

Le stringhe della sezione **Copy vincolato** sono state pinnate dall'utente nella spec
(§ Verbatim Constraints): vanno riprodotte **esattamente**, senza cambi di maiuscole,
punteggiatura o tipo di trattino.

---

## Route interessate

| Route | Cosa cambia |
|---|---|
| `/` | Intestazione + intera sezione hero |
| `/about` | Solo l'intestazione (componente condiviso) |

---

## Copy vincolato (verbatim)

### Intestazione

| Elemento | Valore |
|---|---|
| Testo del brand | `Valerio Quaranta - A Data Science Hub` |
| Testo sostituito | `Data Scientist Junior` |
| Destinazione del collegamento | `/` |

Il separatore del brand è un **trattino semplice** (`-`) circondato da spazi, come scritto
dall'utente — non un trattino lungo.

### Blocco titolo hero

| Riga | Valore | Dimensione relativa |
|---|---|---|
| 1 | `The path` | maggiore |
| 2 | `from noise to harmony` | leggermente inferiore alla riga 1 |
| 3 | `Machine Learning, SQL and Data Visualization applied to real life.` | inferiore alla riga 2 |

La riga 3 termina con un punto; le righe 1 e 2 no. La riga 2 inizia con la minuscola: è la
continuazione sintattica della riga 1, non una frase nuova.

### Testo rimosso

| Elemento | Valore |
|---|---|
| Riga sopra il titolo (eliminata) | `Valerio Quaranta — Data Scientist Junior` |

Deve sparire dal DOM, non essere semplicemente nascosta.

### Sottotitolo e pulsante

| Elemento | Valore | Vincolo |
|---|---|---|
| Sottotitolo | `An end-to-end project portfolio — from data extraction to modeling, all the way to communicating results.` | Testo adottato; una riformulazione inglese di significato equivalente è ammessa (spec § Assumptions) |
| Testo del pulsante | `View Projects` | Testo adottato; un equivalente inglese è ammesso |
| Destinazione del pulsante | `#progetti` | **Invariata** — l'ancora esistente non va rinominata in questa feature |

---

## Struttura DOM attesa

### Intestazione (`src/layouts/BaseLayout.astro`)

```text
header.site-header
└── nav.site-nav[aria-label]
    ├── a.site-nav__brand[href="/"]        → "Valerio Quaranta - A Data Science Hub"
    └── ul.site-nav__links                 → invariata (Home, About)
```

La navigazione deve poter andare a capo su viewport stretti senza sovrapposizioni. I nomi
delle classi e l'attributo di etichettatura della navigazione restano quelli attuali.

### Sezione hero (`src/components/landing/Hero.astro`)

```text
section.hero
└── div.hero__inner                        → allineamento centrato, centratura orizzontale
    └── Reveal
        ├── h1.hero__title                 → UNICO h1 della pagina
        │   ├── span (riga 1)
        │   ├── span (riga 2)
        │   └── span (riga 3)              → preceduta dallo stacco verticale maggiore
        ├── p.hero__subtitle               → distanza dal titolo aumentata
        └── a.hero__cta[href="#progetti"]  → immediatamente successivo al sottotitolo
```

L'elemento `p.hero__eyebrow` non esiste più.

---

## Invarianti verificabili

Punti su cui gli scenari di `quickstart.md` si agganciano; ognuno è deterministico.

| # | Invariante | Requisito coperto |
|---|---|---|
| I-1 | La pagina `/` contiene esattamente **un** elemento `h1` | FR-008, SC-006 |
| I-2 | Le tre stringhe del titolo compaiono nel DOM nell'ordine dichiarato, dentro lo stesso `h1` | FR-004 |
| I-3 | La dimensione di carattere calcolata è strettamente decrescente: riga 1 > riga 2 > riga 3 | FR-005, SC-003 |
| I-4 | La distanza verticale tra riga 2 e riga 3 è maggiore di quella tra riga 1 e riga 2 | FR-006 |
| I-5 | L'allineamento del testo calcolato del blocco titolo è `center` | FR-007 |
| I-6 | La stringa `Valerio Quaranta — Data Scientist Junior` non compare in nessun punto del DOM di `/` | FR-003 |
| I-7 | Il brand dell'intestazione corrisponde alla stringa verbatim su `/` e su `/about` | FR-001 |
| I-8 | Il brand è un collegamento a `/`, attivabile da tastiera | FR-002 |
| I-9 | La distanza verticale tra il fondo del blocco titolo e la cima del sottotitolo è maggiore del valore precedente alla modifica | FR-010, SC-004 |
| I-10 | L'allineamento del testo calcolato del sottotitolo è `center` | FR-011 |
| I-11 | Il pulsante è l'elemento immediatamente successivo al sottotitolo, con testo inglese e allineato al centro | FR-012, FR-013 |
| I-12 | L'attivazione del pulsante porta alla sezione `#progetti` | FR-014, SC-008 |
| I-13 | La larghezza dello scorrimento del documento non supera la larghezza del viewport, da 320px a 1920px | FR-017, SC-005 |
| I-14 | La scansione axe su `/` e `/about` non riporta violazioni nuove rispetto alla baseline (0 violazioni) | FR-018, SC-007 |
| I-15 | Nessun testo di navigazione, progetti, About o piè di pagina risulta modificato | FR-015, SC-001 |
| I-16 | Solo `BaseLayout.astro` e `Hero.astro` risultano modificati nel diff sorgente | FR-016, SC-009 |
