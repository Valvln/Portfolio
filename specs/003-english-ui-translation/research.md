# Research — Traduzione in inglese dell'interfaccia

Fase 0 del piano. Otto decisioni, ciascuna con motivazione e alternative scartate.

La spec non contiene marcatori `NEEDS CLARIFICATION`: le tre ambiguità emerse in fase di specify
sono state risolte dall'utente il 2026-08-07 e codificate in FR-023, FR-024 e nelle Assumptions.
La ricerca qui sotto parte da quelle decisioni e affronta il **come**.

---

## R1 — Le stringhe restano inline nei componenti, nessun modulo centralizzato

**Decisione**: sostituire le stringhe dove già si trovano — nei componenti `.astro` e `.tsx` —
senza introdurre un modulo `src/lib/ui-strings.ts` né alcun livello di internazionalizzazione.

**Motivazione**: il sito è monolingua per decisione presa a monte e codificata in FR-026. Un
dizionario centralizzato serve a due scopi — scegliere una lingua a runtime, oppure riusare la
stessa stringa in più punti — e il primo non si applica qui. Il secondo solo in parte: delle 24
stringhe distinte da tradurre, tre compaiono più volte (`Visualizza presentazione` ×6,
`(apre in una nuova scheda)` ×3, il messaggio di caricamento ×2, vedi R5), e per nessuna delle tre
l'indirezione risolve più di quanto costi — due sono già distribuite su file di contenuto o
componenti indipendenti fra loro. Il Principio II della costituzione chiede di separare **contenuto** dei progetti,
presentazione e logica: le etichette di interfaccia sono presentazione per definizione, quindi
stanno già nel livello corretto. Introdurre un livello di traduzione sarebbe complessità non
giustificata dai principi, che la Governance impone di rimuovere o motivare esplicitamente.

**Alternative scartate**:

- **Modulo `ui-strings.ts` con export nominali** — renderebbe la 004 e ogni futura revisione del
  copy un'unica modifica localizzata. Scartata perché sposta le etichette lontano dal markup che
  le usa, peggiorando la leggibilità di componenti oggi autoesplicativi, in cambio di un beneficio
  che si realizza solo se arriva una seconda lingua — esplicitamente esclusa.
- **`astro-i18n` o equivalente** — architettura completa (routing, cataloghi, `hreflang`) per un
  sito che ha deciso di non essere bilingue. Violerebbe FR-026 alla lettera.

---

## R2 — La rinomina dell'ancora tocca quattro riferimenti, non uno

**Decisione**: `#progetti` → `#projects` è un cambiamento coordinato su **quattro** punti, non
sulla sola `href` della CTA:

| File | Riferimento | Da | A |
|---|---|---|---|
| `ProjectGrid.astro` | `id` della `<section>` | `progetti` | `projects` |
| `ProjectGrid.astro` | `aria-labelledby` della `<section>` | `progetti-heading` | `projects-heading` |
| `ProjectGrid.astro` | `id` dell'`<h2>` | `progetti-heading` | `projects-heading` |
| `Hero.astro` | `href` della CTA | `#progetti` | `#projects` |

**Motivazione**: l'input dell'utente nominava la coppia `id` di sezione + `href` della CTA. La
lettura del sorgente mostra però che la sezione è etichettata per gli screen reader tramite
`aria-labelledby="progetti-heading"`, che punta all'`id` dell'`h2`. Sono identificatori distinti da
quello della sezione e vanno rinominati insieme: aggiornarne solo una parte spezza l'associazione e
la sezione perde il proprio nome accessibile — una **regressione di accessibilità silenziosa**, che
non produce errori di build e non è visibile a occhio. È il rischio principale di questa feature.

**Verifica**: dopo la modifica, nessuna occorrenza della stringa `progetti` deve sopravvivere nel
sorgente del sito (vedi R8). Il controllo copre entrambe le coppie in un colpo solo.

**Alternative scartate**:

- **Mantenere un'ancora alias `#progetti` vuota per compatibilità** — la spec dichiara in Edge Cases
  che l'ancora non ha diffusione esterna e la rottura è accettata. Un elemento aggiuntivo con il
  solo scopo di preservare un collegamento mai pubblicizzato è peso morto.
- **Rinominare solo `id` e `href`, lasciando gli identificatori dell'etichetta accessibile** —
  funzionerebbe, ma lascerebbe `progetti-heading` in un sorgente altrimenti interamente inglese, in
  contrasto con SC-001 e con lo spirito di FR-009.

---

## R3 — L'etichetta PDF va tradotta in due punti: frontmatter e valore di riserva

**Decisione**: tradurre sia le cinque occorrenze di `label: 'Visualizza presentazione'` nel
frontmatter dei case study, sia il valore di riserva `?? 'Visualizza presentazione'` in
`ProjectGrid.astro`. Entrambi diventano `View presentation`.

**Motivazione**: `label` è dichiarato `.optional()` nello schema Zod di `src/content.config.ts`,
quindi il valore di riserva nel componente **non è codice morto**: entra in gioco per qualsiasi
progetto futuro che ometta il campo. Tradurre solo il frontmatter lascerebbe una trappola in
attesa — il primo case study aggiunto senza `label` mostrerebbe un pulsante italiano su un sito
inglese, molto dopo che la 003 è stata chiusa e nessuno la sta più guardando. FR-023 copre il
frontmatter, FR-014 il valore di riserva: sono requisiti distinti proprio perché sono due punti
distinti.

**Alternative scartate**:

- **Rimuovere `label` dai cinque frontmatter e affidarsi solo al valore di riserva** — è
  architettonicamente più pulito (le etichette di interfaccia smettono di vivere nei contenuti) ed
  era una delle opzioni offerte all'utente. Scartata su sua scelta esplicita: mantenere il campo
  conserva la possibilità di personalizzare l'etichetta per singolo progetto.
- **Rendere `label` obbligatorio nello schema** — eliminerebbe la questione del valore di riserva,
  ma è una modifica al contratto dati (`contracts/content-schema.md` della 001) per un problema di
  traduzione. Fuori scope e sproporzionata.

---

## R4 — `lang="en"` è l'ultima modifica, ed è verificabile che lo sia

**Decisione**: la modifica di `<html lang>` è l'ultimo passo dell'implementazione, dopo tutte le
sostituzioni di stringhe. Il vincolo è codificato in FR-025 e va reso esplicito nell'ordinamento
dei task, non affidato alla memoria di chi implementa.

**Motivazione**: dichiarare `en` su etichette ancora italiane è **peggio dello stato attuale**, non
un miglioramento parziale: gli screen reader applicherebbero la fonetica inglese a testo che oggi
leggono correttamente. L'ordine non è una preferenza estetica ma una proprietà di sicurezza del
percorso di rilascio — ogni stato intermedio del branch deve essere non peggiore di `main`.

**Conseguenza accettata**: a fine feature, `lang="en"` convive con le descrizioni dei progetti e la
sintesi About ancora italiane, senza marcatura per blocco (FR-024, decisione dell'utente). È un
compromesso consapevole limitato all'intervallo fino alla spec 004, non una svista.

**Alternative scartate**:

- **Marcare i blocchi residui con `lang="it"`** — è la soluzione corretta secondo WCAG 3.1.2 ed era
  l'opzione raccomandata. Scartata su scelta esplicita dell'utente a favore della modifica minima.
  Resta la soluzione di riserva se la 004 dovesse slittare a lungo.
- **Rinviare `lang="en"` alla 004** — lascerebbe la 003 senza il suo requisito più visibile
  (la scheda del browser dichiarata italiana su un sito inglese).

---

## R5 — Il messaggio di caricamento è duplicato: si allinea, non si rifattorizza

**Decisione**: la stringa `Caricamento presentazione «{titolo}» in corso…` compare **identica** in
`PdfViewer.tsx` (come `fallback` del `Suspense`) e in `PdfDocument.tsx` (come `loading` del
`Document`). Entrambe vanno tradotte con lo **stesso** testo inglese. Nessuna estrazione in
costante condivisa.

**Motivazione**: la duplicazione è preesistente e intenzionale nella struttura attuale — i due
messaggi coprono due attese diverse (scaricamento del bundle, poi analisi del PDF) che l'utente
percepisce come una sola. Estrarre una costante condivisa significherebbe creare un modulo nuovo o
esportare da uno dei due componenti, cioè esattamente il modulo centralizzato che R1 ha scartato,
introdotto di straforo per una sola stringa. FR-027 vincola questa feature alla sostituzione di
testo: un rifattorizzo strutturale, per quanto piccolo, esce dallo scope dichiarato.

**Rischio da presidiare**: tradurne una e dimenticare l'altra produce due messaggi diversi per la
stessa attesa. Il controllo di R8 lo intercetta, perché cerca la stringa italiana ovunque.

**Alternativa scartata**: **costante condivisa in un modulo `pdf/strings.ts`** — corretta in
astratto, ma è debito da aprire con una spec propria se e quando il viewer verrà rivisto
(punto 2 del TODO locale), non da infilare in una traduzione.

---

## R6 — Copy inglese di titoli e descrizioni: nome proprio davanti, lunghezze da SERP

**Decisione**:

| Pagina | Elemento | Valore |
|---|---|---|
| `/` | `title` | `Valerio Quaranta — Junior Data Scientist Portfolio` (50 caratteri) |
| `/` | `description` | `A portfolio of real-world data science projects: SQL, machine learning and data visualization, from data extraction to communicating results.` (139 caratteri) |
| `/about` | `title` | `About — Valerio Quaranta, Junior Data Scientist` (46 caratteri) |
| `/about` | `description` | `Professional background, technical skills and contact details of Valerio Quaranta, junior data scientist.` (104 caratteri) |

**Motivazione**: il titolo attuale della home (`Data Scientist Junior — Portfolio`) è oltre che
italiano anche **anonimo**: non contiene il nome, quindi non intercetta la ricerca più probabile da
parte di un recruiter che ha già visto il CV. Mettere il nome in testa lo risolve senza perdere le
parole chiave di ruolo. Entrambi i titoli restano sotto i ~60 caratteri e le descrizioni sotto i
~160, le soglie oltre le quali i motori troncano il testo nei risultati. La descrizione della home
ricalca la struttura dell'originale italiano (elenco di ambiti + arco end-to-end), quella di About
sostituisce il generico «del candidato» con il nome, coerentemente con la scelta sul titolo.

`Data Scientist Junior` è calco dall'italiano: in inglese l'ordine corretto è
**`Junior Data Scientist`**. Vale anche per il piè di pagina (`Junior Data Scientist Portfolio`).

**Alternative scartate**:

- **Riusare il testo del brand `Valerio Quaranta - A Data Science Hub` come `title`** — coerente con
  l'intestazione, ma «A Data Science Hub» è una formula identitaria, non una parola chiave: nei
  risultati di ricerca lavora peggio di «Junior Data Scientist Portfolio».
- **Titoli identici sulle due pagine** — la voce «`title`/`description` per pagina» del TODO locale
  chiedeva esattamente di differenziarli; FR-021 lo impone («pertinente al contenuto della pagina»).

---

## R7 — Le virgolette caporali diventano virgolette inglesi

**Decisione**: nel messaggio di caricamento, `«{titolo}»` diventa `“{titolo}”` (virgolette doppie
tipografiche), non `"{titolo}"` (virgolette dritte) né caporali conservate.

**Motivazione**: i caporali `« »` sono convenzione tipografica italiana e francese; lasciarli in una
frase inglese è un residuo di localizzazione tanto quanto una parola non tradotta, solo meno
evidente. Le virgolette dritte `" "` sono ripiego da macchina da scrivere, fuori posto in testo
curato — e il progetto usa già trattini lunghi e altri segni tipografici corretti altrove
(Principio III: cura tipografica).

**Attenzione all'implementazione**: la stringa vive dentro JSX. Le virgolette tipografiche vanno
inserite come carattere letterale nel testo, non come entità HTML, perché JSX non interpreta le
entità nel contenuto testuale come farebbe l'HTML.

---

## R8 — Verifica in due livelli: sweep meccanico prima, controlli manuali poi

**Decisione**: la verifica combina un **controllo meccanico** sul sorgente e i **controlli manuali**
già in uso nel progetto:

1. **Sweep dei residui italiani** — ricerca sul sorgente di `src/` per termini indicatori. Il
   comando completo è in [quickstart.md](./quickstart.md) scenario 0, già tarato e provato sullo
   stato attuale: restituisce **32 righe** su `main` e deve scendere a **3** (soli commenti).

   Il pattern è stato corretto in fase di ricerca dopo una prova sul sorgente: la prima versione,
   costruita sulle parole più ovvie, **mancava quattro stringhe** — il testo del piè di pagina e i
   due `title` di pagina (nessuno dei quali contiene una parola italiana riconoscibile: sono il
   calco `Data Scientist Junior`) e l'oggetto della mail `Contatto dal portfolio`, che sfuggiva
   perché il pattern cercava `contatti` al plurale. Sono state aggiunte le chiavi
   `data scientist junior`, `sintesi professionale` e la radice `contatt`. È il motivo per cui uno
   sweep va **provato prima** contro il codice non ancora modificato: uno sweep che non trova nulla
   perché cerca la cosa sbagliata è indistinguibile da uno sweep che passa.
2. **`npm run build` + `npx astro check`** — intercettano un `aria-labelledby` rimasto orfano solo
   in parte; non lo garantiscono, per questo serve anche il punto 3.
3. **Playwright + `@axe-core/playwright`** ai tre viewport di riferimento (375×812, 768×1024,
   1280×800), come già fatto per 001 e 002: navigazione da tastiera, collegamento di salto, ancora
   della CTA, assenza di scorrimento orizzontale, nessuna violazione axe nuova.

**Motivazione**: per una feature di traduzione lo sweep meccanico è la verifica ad alto rendimento —
copre in un comando tutte e 24 le stringhe su tutti i file, incluso il caso di R5 (stringa duplicata
tradotta a metà) che un controllo a vista sfugge facilmente. I controlli manuali restano necessari
per ciò che il testo non cattura: l'associazione `aria-labelledby`, il funzionamento dell'ancora e
l'assenza di regressioni di layout.

**Nessuna suite versionata**: coerente con R7 della 002 e con la convenzione in uso. Le directory
`tests/` sono vuote e non versionate; colmare quel vuoto è il punto 4 del TODO locale, da fare come
spec propria e non infilata qui.

**Alternativa scartata**: **regola ESLint o lint di testo che vieti caratteri/parole italiane** —
efficace come rete permanente, ma è infrastruttura di qualità che appartiene al punto 4 del TODO,
non a questa feature.

---

## Nota su ciò che la ricerca ha escluso dal rischio

- **Layout**: le etichette inglesi sono qui **più corte** delle italiane in tutti i casi rilevanti
  (`Vai al contenuto principale` 27 → `Skip to main content` 20; `Navigazione principale` 22 →
  `Main navigation` 15; `Chiudi presentazione` 20 → `Close presentation` 18). Il rischio di
  regressione a 320px previsto da FR-029 è quindi basso, ma il controllo resta in quickstart perché
  il costo è nullo e l'assunzione va confermata, non data per buona.
- **Nome del file scaricato**: i cinque PDF in `public/pdf/` hanno già nomi inglesi
  (`sql-renewables.pdf`, `diabetes-ml.pdf`, …) e `fileUrl` contiene sempre `/`, quindi il valore di
  riserva `'presentazione.pdf'` in `PdfViewer.tsx` **non è raggiungibile** nella configurazione
  attuale. Va comunque tradotto (FR-017): è correttezza del sorgente, non un difetto visibile oggi.
  Nessun rinominamento di file in `public/` è necessario.
