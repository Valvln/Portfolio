# Phase 0 — Research: Header and hero redesign

Decisioni tecniche prese prima della progettazione. Ogni voce risolve un punto che la
spec ha lasciato deliberatamente aperto (dimensioni, breakpoint, markup) o un vincolo
emerso leggendo il codice esistente.

---

## R1 — Markup del blocco titolo: un solo `h1` con righe interne

**Decision**: il blocco titolo resta un unico `<h1 class="hero__title">` contenente tre
elementi inline-level resi a blocco (`<span>` con `display: block`), uno per riga.

**Rationale**: FR-008 richiede un solo titolo di primo livello nella pagina e la lettura
delle tre righe come titolo unico e coerente. Con tre `<span>` dentro un `h1` lo screen
reader annuncia un unico heading continuo, mentre ogni riga resta un box indipendente a
cui applicare dimensione e spaziatura proprie.

**Alternatives considered**:
- *Tre elementi separati (`h1` + `p` + `p`)* — rifiutata: spezza il titolo in tre
  annunci scollegati e apre la porta a interpretazioni ambigue della gerarchia del
  documento; inoltre FR-004 chiede esplicitamente lo stesso blocco.
- *Un `h1` con `<br>` tra le righe* — rifiutata: `<br>` non crea box selezionabili, quindi
  non consente dimensioni di carattere diverse per riga né margini (FR-005, FR-006).
- *Riga 3 fuori dall'`h1` come sottotitolo* — rifiutata: la riga 3 fa parte del claim
  richiesto dall'utente nello stesso blocco titolo, e il sottotitolo vero esiste già come
  elemento distinto.

---

## R2 — Scala tipografica ancorata al titolo, non tre `clamp()` indipendenti

**Decision**: la dimensione di carattere si dichiara una sola volta sull'`h1` con una
`clamp()`; le righe 2 e 3 la derivano in unità `em` (rapporti indicativi: riga 2 ≈ `0.72em`,
riga 3 ≈ `0.30em`). La riga 3 riceve un pavimento di leggibilità con
`font-size: max(<minimo leggibile>, 0.30em)`.

**Rationale**: FR-005 e SC-003 richiedono dimensioni **strettamente decrescenti su tutti i
viewport testati**. Tre `clamp()` indipendenti, ciascuna con il proprio coefficiente `vw`,
possono incrociarsi a viewport intermedi e invertire la gerarchia in una fascia stretta di
larghezze — un difetto che non si vede provando solo 320/768/1280px. Derivando le righe 2 e
3 in `em` dal titolo, il rapporto è costante per costruzione a **qualsiasi** larghezza: la
gerarchia non può invertirsi. Il `max()` sulla riga 3 evita l'unico effetto collaterale del
rapporto fisso, cioè un testo troppo piccolo quando l'`h1` scende al suo minimo su mobile;
resta comunque sotto la riga 2, che a quel punto vale ancora circa il doppio.

**Alternatives considered**:
- *Tre `clamp()` indipendenti* — rifiutata per il rischio di incrocio descritto sopra.
- *Dimensioni fisse per breakpoint (media query)* — rifiutata: più regole da mantenere e
  salti visibili al passaggio di breakpoint, mentre il resto del progetto usa già `clamp()`
  fluide (`.hero__title` attuale).

---

## R3 — Centratura: allineamento sul contenitore, larghezze diverse per titolo e sottotitolo

**Decision**: `text-align: center` e `margin-inline: auto` si applicano a `.hero__inner`,
che è il **genitore** del wrapper `Reveal`. La larghezza massima del blocco hero sale
dall'attuale `42rem` a un valore più ampio per il titolo, mentre il sottotitolo riceve una
larghezza massima propria, più stretta e centrata.

**Rationale**: FR-007 e FR-011 chiedono testo allineato al centro, non solo blocco centrato.
Applicare l'allineamento su `.hero__inner` fa sì che l'ereditarietà attraversi il wrapper
generato da `astro-reveal` senza dipendere da come quella libreria rende il proprio nodo —
il componente resta corretto anche se la libreria cambia elemento. Le due larghezze diverse
rispondono a esigenze opposte: la riga 3 del titolo è lunga e va a capo male in `42rem`,
mentre un sottotitolo centrato su una riga troppo larga perde leggibilità (misura tipografica
eccessiva).

**Alternatives considered**:
- *`text-align: center` sul singolo `h1` e sul singolo `p`* — rifiutata: duplica la regola su
  ogni elemento e va aggiornata a ogni aggiunta futura nella hero.
- *Larghezza unica per tutto il blocco* — rifiutata: o il titolo si spezza male, o il
  sottotitolo diventa una riga troppo lunga da leggere.

---

## R4 — Spaziatura dai token esistenti, nessun token nuovo

**Decision**: lo stacco tra riga 2 e riga 3 e la distanza aumentata tra blocco titolo e
sottotitolo si ottengono con i token di spaziatura già definiti in `global.css`
(`--space-xs … --space-xl`), salendo di almeno un gradino rispetto al valore attuale. La
distanza titolo → sottotitolo passa dall'attuale `--space-sm` ad almeno `--space-lg`.

**Rationale**: FR-006 e FR-010 sono requisiti **relativi** ("maggiore di prima"), quindi
soddisfarli con la scala esistente è sufficiente e mantiene il ritmo verticale coerente col
resto del sito. Introdurre valori arbitrari fuori scala violerebbe la coerenza del sistema di
design richiesta dal Principio III senza alcun guadagno. Lo stacco è **spaziatura CSS**, non
una riga di testo vuota — decisione confermata dall'utente al gate review-spec, perché una
riga vuota reale verrebbe annunciata dagli assistive technology.

**Alternatives considered**:
- *Nuovi token dedicati alla hero* — rifiutata: espande il sistema di design per un solo
  componente.
- *Riga vuota nel markup* — rifiutata per accessibilità (vedi sopra).

---

## R5 — Intestazione su schermi stretti: la barra va a capo

**Decision**: `.site-nav` acquisisce `flex-wrap: wrap` con una spaziatura verticale tra le
righe, e il testo del brand riceve una dimensione fluida che scende leggermente su viewport
stretti. Nessun troncamento.

**Rationale**: verifica sui numeri reali — il nuovo brand è di 37 caratteri contro i 21 di
"Data Scientist Junior". A 320px il contenitore lascia 272px utili (`--space-md` di padding
per lato); il solo brand ne occupa già circa 280px alla dimensione attuale, e i collegamenti
Home/About ne chiedono altri ~110px sulla stessa riga. Con `justify-content: space-between` e
nessun wrap, i due gruppi si comprimerebbero o si sovrapporrebbero. Il wrap risolve mettendo
brand e collegamenti su due righe, e la riduzione di dimensione recupera il caso limite senza
nascondere testo.

**Alternatives considered**:
- *Troncamento con ellissi* — rifiutata: FR-001 richiede che il testo esatto sia leggibile,
  e un'ellissi lo nasconderebbe proprio dove serve di più.
- *Brand abbreviato su mobile (solo "Valerio Quaranta")* — rifiutata: introdurrebbe due
  testi identitari diversi a seconda del viewport, contro il valore verbatim pinnato.
- *Menu hamburger* — rifiutata: ristruttura la navigazione, esplicitamente fuori scope
  (FR-016).

---

## R6 — Copy inglese di sottotitolo e pulsante

**Decision**: sottotitolo `An end-to-end project portfolio — from data extraction to modeling,
all the way to communicating results.`; pulsante `View Projects`.

**Rationale**: sono le formulazioni proposte dall'utente. La spec le classifica come non
vincolate alla lettera, ma adottarle così com'è evita di sostituire una scelta dell'utente con
una preferenza stilistica senza un guadagno concreto. Il trattino lungo replica la punteggiatura
della versione italiana.

**Alternatives considered**:
- *Riformulazione più breve ("End-to-end data science projects…")* — non adottata: perde
  l'arco completo estrazione → modellazione → comunicazione, che è il contenuto informativo
  del sottotitolo.

---

## R7 — Verifica: scenari eseguiti, non suite committata

**Decision**: la verifica dei criteri di successo avviene eseguendo gli scenari di
`quickstart.md` con Playwright e `@axe-core/playwright` sui tre viewport di riferimento, senza
introdurre file di test versionati né una configurazione Playwright.

**Rationale**: è la convenzione già stabilita dalla feature 001 — `tests/unit`, `tests/component`
ed `tests/e2e` esistono ma sono vuote e non versionate, e le note dei task T040–T042 documentano
verifiche di accessibilità e reattività condotte con Playwright/axe in modo puntuale. Introdurre
qui una configurazione di test e una suite versionata significherebbe aggiungere infrastruttura
di progetto dentro una feature di copy e tipografia, decisione che merita una spec propria.
Le dipendenze necessarie (`@playwright/test`, `@axe-core/playwright`) sono già installate, quindi
l'esecuzione non richiede nulla di nuovo.

**Alternatives considered**:
- *Aggiungere `playwright.config.ts` e uno spec versionato per la hero* — non adottata **ora**:
  è un cambiamento utile al progetto ma di natura diversa da questa feature, e allargherebbe
  l'impronta oltre i file dichiarati in SC-009. Resta la raccomandazione naturale per una spec
  dedicata alla qualità.
- *Sola ispezione visiva* — rifiutata: SC-003, SC-005 e SC-007 sono verificabili in modo
  deterministico e meritano una misura, non un giudizio a occhio.

---

## Nota residua (fuori scope, da tracciare)

Il titolo del documento della home (`src/pages/index.astro`) recita ancora
"Data Scientist Junior — Portfolio" e l'attributo di lingua del documento è `it`. Entrambi
restano invariati in questa feature per rispetto di FR-015 e SC-009, e vanno chiusi nella spec
di traduzione del resto del sito. Segnalati qui perché al termine di questa feature la prima
schermata sarà in inglese mentre la scheda del browser resterà in italiano.
