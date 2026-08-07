# UI Contract — Traduzione in inglese dell'interfaccia

Il contratto dell'interfaccia dopo la feature: ogni stringa italiana da sostituire, il testo
inglese esatto che deve prenderne il posto, e gli identificatori da rinominare.

**24 stringhe distinte su 32 occorrenze**, più **4 identificatori** e **1 attributo di lingua**.

Le colonne «Da» e «A» sono **verbatim**: vanno riprodotte alla lettera, compresi maiuscole,
punteggiatura, tipo di trattino e virgolette. Dove compare `{…}` si tratta di un valore
interpolato a runtime, che non va tradotto né riformulato.

---

## Route interessate

| Route | Cosa cambia |
|---|---|
| `/` | Intestazione condivisa, sezione progetti, filtro, card, viewer PDF, `title`/`description` |
| `/about` | Intestazione condivisa, intestazioni di sezione, collegamento di contatto, `title`/`description` |

Il blocco hero della home (titolo, sottotitolo, testo della CTA) è già inglese dalla spec 002 e
**non va toccato**: di `Hero.astro` cambia solo l'`href` della CTA.

---

## 1. `src/layouts/BaseLayout.astro`

| # | Elemento | Da | A |
|---|---|---|---|
| 1 | Collegamento di salto | `Vai al contenuto principale` | `Skip to main content` |
| 2 | `aria-label` della `<nav>` | `Navigazione principale` | `Main navigation` |
| 3 | Piè di pagina | `Portfolio Data Scientist Junior` | `Junior Data Scientist Portfolio` |

**Invariati**: testo del brand (`Valerio Quaranta - A Data Science Hub`, pinnato dalla 002),
collegamenti `Home` e `About`, simbolo `©` e anno calcolato dinamicamente. La struttura del piè di
pagina resta `© {anno} — {testo}`: cambia solo il testo.

**Attributo di lingua** — da applicare **per ultimo**, dopo ogni altra modifica di questo contratto
(FR-025, research R4):

| Elemento | Da | A |
|---|---|---|
| `<html lang>` | `it` | `en` |

---

## 2. `src/pages/index.astro`

| # | Elemento | Da | A |
|---|---|---|---|
| 4 | `title` | `Data Scientist Junior — Portfolio` | `Valerio Quaranta — Junior Data Scientist Portfolio` |
| 5 | `description` | `Portfolio di progetti reali di Data Science: SQL, Machine Learning e Data Visualization.` | `A portfolio of real-world data science projects: SQL, machine learning and data visualization, from data extraction to communicating results.` |

Il trattino nel `title` è un **trattino lungo** (`—`) circondato da spazi, come nell'originale.

---

## 3. `src/pages/about.astro`

| # | Elemento | Da | A |
|---|---|---|---|
| 6 | `title` | `About — Data Scientist Junior` | `About — Valerio Quaranta, Junior Data Scientist` |
| 7 | `description` | `Sintesi professionale, competenze e contatti del candidato.` | `Professional background, technical skills and contact details of Valerio Quaranta, junior data scientist.` |

---

## 4. `src/components/projects/ProjectGrid.astro`

| # | Elemento | Da | A |
|---|---|---|---|
| 8 | Titolo di sezione (`<h2>`) | `Progetti` | `Projects` |
| 9 | Valore di riserva dell'etichetta PDF | `Visualizza presentazione` | `View presentation` |

**Identificatori da rinominare** (research R2 — vanno cambiati **tutti e tre insieme**, altrimenti
la sezione perde il proprio nome accessibile senza che build o `astro check` se ne accorgano):

| Attributo | Da | A |
|---|---|---|
| `id` della `<section>` | `progetti` | `projects` |
| `aria-labelledby` della `<section>` | `progetti-heading` | `projects-heading` |
| `id` dell'`<h2>` | `progetti-heading` | `projects-heading` |

---

## 5. `src/components/landing/Hero.astro`

| Attributo | Da | A |
|---|---|---|
| `href` della CTA | `#progetti` | `#projects` |

**Nessun'altra modifica a questo file.** Titolo a tre righe, sottotitolo, testo del pulsante e
stili scoped sono copy e design pinnati dalla spec 002.

---

## 6. `src/components/projects/ProjectCard.astro`

| # | Elemento | Da | A |
|---|---|---|---|
| 10 | `aria-label` del gruppo tag | `Tag tecnologici` | `Technology tags` |
| 11 | Testo per screen reader, collegamento GitHub | `(apre in una nuova scheda)` | `(opens in a new tab)` |
| 11 | Testo per screen reader, collegamento LinkedIn | `(apre in una nuova scheda)` | `(opens in a new tab)` |

**Invariate**: le etichette dei tag (`SQL`, `ML`, `Viz`, `Python`) e i nomi `GitHub` e `LinkedIn`.
Titolo e descrizione della card provengono dalla content collection: **fuori scope, spec 004.**

---

## 7. `src/components/projects/TagFilter.tsx`

| # | Elemento | Da | A |
|---|---|---|---|
| 12 | Etichetta del filtro «tutti» | `Tutti` | `All` |
| 13 | `aria-label` del gruppo di pulsanti | `Filtra progetti per tag` | `Filter projects by tag` |

**Invariati**: il valore interno `'all'` e gli altri quattro valori (`sql`, `ml`, `viz`, `python`),
che sono chiavi di dato e non testo visibile — vanno confrontate con `data-tags` renderizzato da
`ProjectCard`. Toccarle romperebbe il filtro. Invariate anche le etichette `SQL`, `ML`, `Viz`,
`Python`.

---

## 8. `src/components/pdf/PdfViewer.tsx`

| # | Elemento | Da | A |
|---|---|---|---|
| 14 | Pulsante di chiusura | `Chiudi presentazione` | `Close presentation` |
| 15 | Pulsante di download | `Scarica PDF` | `Download PDF` |
| 16 | Nome file di riserva | `presentazione.pdf` | `presentation.pdf` |
| 17 | Messaggio di caricamento | `Caricamento presentazione «{projectTitle}» in corso…` | `Loading presentation “{projectTitle}”…` |

Sulla stringa 17: i caporali `« »` diventano **virgolette doppie tipografiche** `“ ”`, non
virgolette dritte (research R7). I puntini di sospensione restano il carattere singolo `…`.

L'etichetta di apertura arriva dalla prop `label`, che risale al frontmatter del progetto o al
valore di riserva §4 #9: non c'è nulla da tradurre in questo file per il pulsante di apertura.

---

## 9. `src/components/pdf/PdfDocument.tsx`

| # | Elemento | Da | A |
|---|---|---|---|
| 17 | Messaggio di caricamento | `Caricamento presentazione «{projectTitle}» in corso…` | `Loading presentation “{projectTitle}”…` |
| 18 | Messaggio di errore | `Impossibile caricare la presentazione: {loadError}` | `Could not load the presentation: {loadError}` |
| 19 | Pulsante pagina precedente | `← Precedente` | `← Previous` |
| 20 | Pulsante pagina successiva | `Successiva →` | `Next →` |
| 21 | Indicatore di pagina | `Pagina {pageNumber} di {numPages}` | `Page {pageNumber} of {numPages}` |

La stringa 17 è la **stessa** di §8: le due occorrenze devono restare identiche fra loro
(research R5). Le frecce `←` e `→` restano dove sono, prima e dopo il testo rispettivamente.

---

## 10. `src/components/about/AboutSection.astro`

| # | Elemento | Da | A |
|---|---|---|---|
| 22 | Intestazione di sezione | `Competenze` | `Skills` |
| 23 | Intestazione di sezione | `Contatti` | `Contact` |
| 24 | Oggetto precompilato della mail | `Contatto dal portfolio` | `Portfolio contact` |
| 11 | Testo per screen reader, collegamento LinkedIn | `(apre in una nuova scheda)` | `(opens in a new tab)` |

**Invariati**: l'`<h1>` `About`, le emoji `✉️` e `🔗`, l'indirizzo email e l'URL LinkedIn.
`summary` e `skills` provengono dalla content collection: **fuori scope, spec 004.**

L'oggetto della mail è passato per `encodeURIComponent`: va tradotto il testo sorgente, non la
forma codificata.

---

## 11. `src/content/projects/*.md` — unica eccezione al confine con la spec 004

| # | File | Campo | Da | A |
|---|---|---|---|---|
| 9 | `diabetes-ml.md` | `pdfPresentation.label` | `Visualizza presentazione` | `View presentation` |
| 9 | `education-impact.md` | `pdfPresentation.label` | `Visualizza presentazione` | `View presentation` |
| 9 | `sql-renewables.md` | `pdfPresentation.label` | `Visualizza presentazione` | `View presentation` |
| 9 | `travel-sge.md` | `pdfPresentation.label` | `Visualizza presentazione` | `View presentation` |
| 9 | `water-safety-ai.md` | `pdfPresentation.label` | `Visualizza presentazione` | `View presentation` |

**Nient'altro in questi file va toccato** (FR-028): `title`, `description`, `tags`, `file`, gli URL
e il corpo del documento restano invariati e appartengono alla spec 004. Il diff su ciascuno dei
cinque file deve essere di **una sola riga**.

`src/content/about/about.md` **non va toccato affatto**.

---

## Struttura DOM attesa dopo la modifica

Riferimenti su cui si agganciano gli scenari di validazione:

```text
<html lang="en">
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <nav aria-label="Main navigation"> … </nav>
  <main id="main-content">
    <section class="hero">
      … <a class="hero__cta" href="#projects">View Projects</a>
    </section>
    <section id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects</h2>
      <div role="group" aria-label="Filter projects by tag"> … <button>All</button> … </div>
      <article class="project-card">
        <div aria-label="Technology tags"> … </div>
        …
      </article>
    </section>
  </main>
  <footer> © {anno} — Junior Data Scientist Portfolio </footer>
</html>
```

**Invarianti verificabili**:

| # | Invariante |
|---|---|
| INV-01 | `document.documentElement.lang === 'en'` su `/` e `/about` |
| INV-02 | Esiste `#projects`; **non** esiste `#progetti` |
| INV-03 | L'`href` della CTA hero risolve a un elemento presente nel documento |
| INV-04 | `aria-labelledby` della sezione progetti punta a un `id` esistente, e il nome accessibile della sezione è `Projects` |
| INV-05 | Il primo elemento focalizzabile del documento è il collegamento di salto, con testo `Skip to main content` |
| INV-06 | Il nome accessibile della `<nav>` è `Main navigation` |
| INV-07 | Il testo del piè di pagina corrisponde a `© {anno corrente} — Junior Data Scientist Portfolio` |
| INV-08 | Il primo pulsante del filtro ha testo `All` ed è quello con `aria-pressed="true"` al caricamento |
| INV-09 | Ogni card con presentazione mostra un pulsante `View presentation` e uno `Download PDF` |
| INV-10 | Ad apertura, il pulsante diventa `Close presentation` e `aria-expanded="true"` |
| INV-11 | Nessuna stringa italiana censita in questo contratto compare nell'HTML renderizzato di `/` e `/about` |
| INV-12 | Nessuno scorrimento orizzontale del documento a 375, 768 e 1280 px di larghezza |
| INV-13 | Nessuna violazione axe nuova rispetto al ramo `main` su `/` e `/about` |

---

## Fuori contratto — resta italiano fino alla spec 004

Registrato qui perché INV-11 non deve fallire su queste stringhe, che sono **legittimamente**
italiane a fine feature:

- `description` delle cinque card di progetto (dalla content collection)
- `title` delle cinque card di progetto, se in italiano
- `summary` ed elenco `skills` della pagina About
- Corpo dei cinque case study

Su questi blocchi non va aggiunta alcuna marcatura `lang="it"` (FR-024, decisione dell'utente del
2026-08-07).
