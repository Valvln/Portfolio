# Quickstart — Validazione della traduzione dell'interfaccia

Scenari eseguibili che dimostrano il funzionamento della feature end-to-end. Coprono gli otto
criteri di successo della spec e le tredici invarianti di
[contracts/ui-contract.md](./contracts/ui-contract.md).

Non c'è suite versionata: i controlli si eseguono a mano, come per le feature 001 e 002
(research R8). Le dipendenze necessarie sono già installate.

---

## Prerequisiti

```bash
npm install          # se non già fatto
npm run build        # deve completare senza errori
npm run preview      # serve la build statica, di norma su http://localhost:4321
```

Tenere aperto un secondo terminale per lo sweep dei residui, che lavora sul sorgente e non
richiede il server attivo.

---

## Scenario 0 — Sweep dei residui italiani *(il più rapido, eseguirlo per primo)*

Copre **SC-001**, **INV-11**, e intercetta il rischio di R5 (stringa duplicata tradotta a metà).

```bash
grep -rniE 'progetti|presentazione|caricamento|impossibile|tutti|competenze|contatt|navigazione|vai al contenuto|scarica|precedente|successiva|pagina [0-9{]|apre in una nuova scheda|tag tecnologici|filtra|data scientist junior|sintesi professionale' \
  src/layouts src/pages src/components
```

**Atteso a fine feature**: esattamente **3 risultati**, tutti commenti (elencati sotto).

**Riferimento prima di iniziare**: sullo stato attuale di `main` lo stesso comando restituisce
**32 righe** — 29 stringhe da tradurre più i 3 commenti. È il contatore di avanzamento
dell'implementazione: deve scendere a 3, non a 0.

**I 3 falsi positivi ammessi** — sono commenti in italiano, la cui traduzione è esplicitamente
fuori scope. Vanno riconosciuti, non «corretti»:

| File | Riga | Perché innocuo |
|---|---|---|
| `src/components/landing/Hero.astro` | ~54 | commento: «…a `--space-lg`: il sottotitolo…» contiene *precedente* |
| `src/components/pdf/PdfDocument.tsx` | ~19 | commento sul lazy-splitting: contiene *scaricato* e *presentazione* |
| `src/components/pdf/PdfViewer.tsx` | ~5 | commento sul bundle: contiene *scaricato* |

Qualsiasi **quarta** riga è una stringa dimenticata: confrontarla con il contratto UI.

**Attenzione al pattern**: `contatt` (non `contatti`) intercetta anche `Contatto dal portfolio`;
`data scientist junior` intercetta il piè di pagina e i due `title`, che nessun'altra parola chiave
raggiunge. Non accorciare l'espressione senza ricontrollare la copertura.

Sweep separato sui contenuti, che devono cambiare **di una sola riga ciascuno**:

```bash
git diff --stat src/content/projects/
grep -rn 'Visualizza presentazione' src/          # atteso: nessun risultato
```

**Atteso**: cinque file modificati, `5 insertions(+), 5 deletions(-)` in totale, e
`src/content/about/about.md` assente dal diff (**SC-008**).

---

## Scenario 1 — L'ancora e la CTA (SC-003)

1. Aprire `http://localhost:4321/`.
2. Scorrere fino alla sezione dei progetti: il titolo è **`Projects`** *(INV-02)*.
3. Tornare in cima e attivare il pulsante **`View Projects`**.
4. **Atteso**: la vista si porta sulla sezione progetti e l'URL diventa `…/#projects`
   *(INV-03)*.
5. In console del browser:

   ```js
   document.querySelector('#progetti')            // atteso: null
   document.querySelector('#projects')            // atteso: l'elemento <section>
   const s = document.querySelector('#projects');
   document.getElementById(s.getAttribute('aria-labelledby'))?.textContent  // atteso: "Projects"
   ```

   L'ultima riga è il controllo di **INV-04**: se restituisce `undefined`, l'`aria-labelledby` è
   orfano — la regressione silenziosa descritta in research R2.

---

## Scenario 2 — Navigazione da tastiera e intestazione (SC-006)

1. Aprire `/`, cliccare sulla barra degli indirizzi, poi premere `Tab` per entrare nella pagina.
2. **Atteso**: il primo elemento focalizzabile è il collegamento di salto, visibile, con testo
   **`Skip to main content`** *(INV-05)*.
3. Premere `Invio`: il focus si sposta sul contenuto principale.
4. In console: `document.querySelector('nav').getAttribute('aria-label')` → **`Main navigation`**
   *(INV-06)*.
5. Continuare con `Tab` attraverso brand, `Home`, `About`, CTA e pulsanti del filtro: tutti
   raggiungibili, focus sempre visibile, nessuna trappola.
6. Ripetere i punti 1–3 su `/about`.

---

## Scenario 3 — Filtro e card dei progetti (SC-002)

1. Su `/`, osservare la fila di pulsanti sopra la griglia.
2. **Atteso**: il primo pulsante è **`All`**, attivo al caricamento (`aria-pressed="true"`), seguito
   da `SQL`, `ML`, `Viz`, `Python` *(INV-08)*.
3. Attivare `SQL`: restano visibili solo le card con quel tag. Tornare su `All`: tornano tutte.
   Il filtro deve continuare a funzionare — è il controllo che le chiavi interne non sono state
   tradotte per errore.
4. In console:

   ```js
   document.querySelector('[role=group]').getAttribute('aria-label')  // "Filter projects by tag"
   document.querySelector('.project-card__tags').getAttribute('aria-label')  // "Technology tags"
   [...document.querySelectorAll('.visually-hidden')].map(e => e.textContent)
   // atteso: solo occorrenze di "(opens in a new tab)"
   ```

---

## Scenario 4 — Viewer PDF, ciclo completo (SC-002)

1. Su `/`, individuare una card con presentazione.
2. **Atteso**: due pulsanti, **`View presentation`** e **`Download PDF`** *(INV-09)*.
3. Attivare `View presentation`.
4. **Atteso durante il caricamento**: il messaggio **`Loading presentation “<titolo>”…`**, con
   virgolette tipografiche e non caporali. Il titolo del progetto resta quello originale, non
   tradotto.
5. **Atteso a caricamento avvenuto**: il pulsante diventa **`Close presentation`** con
   `aria-expanded="true"` *(INV-10)*.
6. Se il PDF ha più pagine: i controlli sono **`← Previous`**, **`Page 1 of N`**, **`Next →`**.
   Navigare avanti e indietro e verificare che l'indicatore si aggiorni.
7. Attivare `Download PDF`: il file scaricato si chiama `<slug>.pdf` (es. `diabetes-ml.pdf`), mai
   `presentazione.pdf`.
8. Attivare `Close presentation`: il pannello si richiude.

**Percorso di errore** (opzionale, per **INV** sul messaggio 18): in DevTools → Network, bloccare
la richiesta del file `.pdf` e riaprire la presentazione. Atteso:
**`Could not load the presentation: …`**.

---

## Scenario 5 — Pagina About (SC-002)

1. Aprire `/about`.
2. **Atteso**: l'`<h1>` è `About`; le due intestazioni di sezione sono **`Skills`** e
   **`Contact`**.
3. Passare il mouse sul collegamento email e leggere l'URL nella barra di stato.
   **Atteso**: `subject=Portfolio%20contact`.
4. **Atteso**: sintesi ed elenco competenze sono **ancora in italiano**. È corretto: sono contenuto
   della spec 004, non un residuo dimenticato.

---

## Scenario 6 — Metadati di pagina (SC-004)

Per ciascuna delle due pagine:

1. Leggere il titolo nella scheda del browser.
   - `/` → **`Valerio Quaranta — Junior Data Scientist Portfolio`**
   - `/about` → **`About — Valerio Quaranta, Junior Data Scientist`**
2. In console, verificare che i metadati social ereditino gli stessi valori:

   ```js
   document.title
   document.querySelector('meta[name=description]').content
   document.querySelector('meta[property="og:title"]').content
   document.querySelector('meta[property="og:description"]').content
   ```

   **Atteso**: `og:title` coincide con `document.title`, `og:description` con la `description`,
   e nessuno dei quattro contiene testo italiano.

---

## Scenario 7 — Lingua dichiarata (SC-005)

Da eseguire **dopo** tutti gli altri, perché è l'ultima modifica applicata (FR-025).

1. Su `/` e su `/about`, in console: `document.documentElement.lang` → **`en`** *(INV-01)*.
2. Verificare che **nessun** elemento porti un attributo `lang` proprio:

   ```js
   document.querySelectorAll('[lang]').length   // atteso: 1 (solo <html>)
   ```

   È il controllo che la decisione FR-024 è stata rispettata: nessuna marcatura per blocco.
3. Con VoiceOver (`Cmd+F5` su macOS), percorrere l'intestazione e i titoli di sezione:
   la pronuncia è inglese.
4. **Comportamento atteso e accettato**: proseguendo sulle descrizioni delle card, VoiceOver legge
   testo italiano con fonetica inglese. È il compromesso documentato in FR-024, non un difetto —
   si chiude con la spec 004.

---

## Scenario 8 — Nessuna regressione visiva e di accessibilità (SC-006, SC-007)

Ai tre viewport di riferimento — **375×812**, **768×1024**, **1280×800** — su `/` e `/about`:

1. Assenza di scorrimento orizzontale *(INV-12)*:

   ```js
   document.documentElement.scrollWidth <= document.documentElement.clientWidth  // atteso: true
   ```

2. Nessuna etichetta troncata o sovrapposta: intestazione, pulsanti del filtro e pulsanti del
   viewer PDF restano leggibili per intero. Controllo aggiuntivo a **320px**, il minimo dichiarato
   da FR-029.
3. Scansione axe su entrambe le pagine *(INV-13)*:

   ```bash
   npx playwright test    # se la suite verrà versionata (punto 4 del TODO locale)
   ```

   In assenza di suite, eseguire `@axe-core/playwright` da script estemporaneo oppure l'estensione
   axe DevTools sul browser. **Atteso**: nessuna violazione nuova rispetto a `main`.

---

## Riepilogo copertura

| Criterio | Scenari |
|---|---|
| SC-001 — zero etichette italiane | 0 |
| SC-002 — percorso principale senza testo italiano | 3, 4, 5 |
| SC-003 — collegamenti e ancore funzionanti | 1 |
| SC-004 — titolo e descrizione in inglese | 6 |
| SC-005 — lingua dichiarata coerente | 7 |
| SC-006 — nessuna regressione di accessibilità | 2, 8 |
| SC-007 — nessuna regressione visiva | 8 |
| SC-008 — confine con la spec 004 rispettato | 0 |
