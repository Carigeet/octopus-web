# Octopus Web

Demo del Technical Test **ZURU – Product Engineer (Web)**: homepage e Product Detail Page (PDP) del brand *Octopus*, costruite con **Next.js 16 (App Router)**, **React 19**, **TypeScript** e **Tailwind CSS 4**, con test automatizzati e audit Lighthouse ≥ 96 su tutte le categorie.

| | |
|---|---|
| **Live Demo (Vercel)** | <https://octopus-web-steel.vercel.app> |
| **Repo GitHub** | <https://github.com/Carigeet/octopus-web> |

- **Homepage**: hero, carosello Best sellers, sezioni Kitchen / Hair care / Home security / Accessories, categorie, store locator.
- **PDP** (`/products/[slug]`): buy box con selettore colore, bento delle feature, accordion delle specifiche, download del manuale, carosello cross-sell.
- Breakpoint: **Desktop ≥ 1200px**, **Tablet 768–1199px**, **Mobile < 768px**.

---

## 1. Overview & setup rapido

**Requisiti:** Node.js **≥ 20.9** (requisito di Next 16) e npm.

```bash
npm install
npm run build      # build di produzione
npm run start      # serve su http://localhost:3000
```

Sviluppo: `npm run dev` (`http://localhost:3000`).

### Test

| Comando | Cosa fa |
|---|---|
| `npm test` | **19 component test** con Vitest + React Testing Library (jsdom), ~2 s. Nessun browser né build richiesti. |
| `npm run test:e2e` | **Playwright** su *Desktop Chrome* e *Mobile Pixel 7*. Costruisce e avvia da solo la build di produzione (porta 3100). |
| `npm run test:all` | Component test + E2E in sequenza. |
| `npm run typecheck` · `npm run lint` | `tsc --noEmit` ed ESLint. |

> **Prima esecuzione E2E:** serve il browser di Playwright: `npx playwright install chromium`.
> `test:e2e` riusa un server già attivo sulla porta 3100, se presente (in CI ne avvia sempre uno nuovo).

**Cosa coprono:**
- `ProductAccordion` (8 test): chiuso di default, apertura/chiusura al click, sezioni multiple, `aria-expanded` / `aria-controls` / `role="region"`, tasti **Enter** e **Space**, Tab.
- `Carousel` (9 test): scorrimento di una slide, frecce disabilitate a inizio e fine corsa, tastiera (←/→), sincronizzazione dopo swipe touch.
- `Header` (2 test): il drawer mobile si apre con `aria-expanded`, si chiude con **Escape** riportando il focus sul trigger.
- **E2E** (`e2e/countertop-blender.spec.ts`): Home → "Learn more" sulla card del Countertop Blender → render della PDP → selettore colore → espansione di "Technical specifications".

---

## 2. Lighthouse

Audit **Lighthouse 13.5.0** sulla **build di produzione locale** (`npm run build && npm run start`, `http://localhost:3000`), eseguito il 3 novembre 2026. I report completi (PDF, in italiano) sono in [`reports/`](./reports).

| Pagina | Performance | Accessibility | Best Practices | SEO | CLS |
|---|:---:|:---:|:---:|:---:|:---:|
| Homepage – Desktop | **100** | 96 | **100** | 92 | **0** |
| Homepage – Mobile | **96** | 96 | **100** | 92 | **0** |
| PDP (Countertop Blender) – Desktop | **100** | 96 | **100** | **100** | **0** |
| PDP (Countertop Blender) – Mobile | **96** | 96 | **100** | **100** | **0** |

Target del brief (Performance Mobile ≥ 90, Accessibility ≥ 90) rispettati. Gli audit sono su build locale, **non** sul deploy Vercel.

### Perché Accessibility è 96 e non 100

L'**unico audit fallito è il contrasto colori**. Gli elementi segnalati sono i **token colore del brand presi dal design spec Figma**:
- i link del footer (`text-white/85` su `#D01A1F`);
- il tag categoria `#E51A24` sulle card Best sellers (solo Homepage).

Li ho **mantenuti invariati per fedeltà al design**: cambiarli è una decisione di design, non un bug tecnico. Il fix è semplice se il design lo concede: testo bianco pieno nel footer e un rosso leggermente più scuro per il tag.

### Perché la SEO della Homepage è 92

Per i **19 link "Learn more"** delle card Lighthouse segnala "I link non contengono testo descrittivo". Quasi tutti hanno un `aria-label` descrittivo (es. *"Learn more about Octopus Kettle 1.7 L"*), ma l'audit valuta il testo visibile. La PDP non ha questi link e ottiene 100. Vedi *Sviluppi futuri*.

---

## 3. Scelte architetturali

### Architettura data-driven
- Catalogo, feature, colori, specifiche e categorie vivono in `src/data/products.json` e `src/data/categories.json`, tipizzati da `src/types/product.ts`; l'accesso passa da `src/lib/products.ts`.
- Aggiungere un prodotto significa aggiungere un oggetto al JSON: card, PDP, accordion, metadati e route statica si generano da soli.
- Restano nei componenti i **testi editoriali di sezione** (hero, titoli e sottotitoli di sezione, store banner, footer): non fanno parte del catalogo.

### Routing dinamico, SSG e metadati
- `src/app/products/[slug]/page.tsx` usa **`generateStaticParams`** (11 prodotti pre-renderizzati) e **`generateMetadata`**: title, description, canonical, **OpenGraph** e **Twitter card** per prodotto, `noindex` se lo slug non esiste.
- `src/app/layout.tsx` è l'**unica fonte** dei metadati della Home: `metadataBase`, `title.template` (`%s | Octopus`), OG e Twitter con immagine 1600×900.
- Next 16 con `cacheComponents` e `partialPrefetching` abilitati.

### Allineamento layout Desktop
- Un solo asse per il contenuto: **`xl:max-w-[1106px] xl:mx-auto`** su navbar, Best sellers, Kitchen, Hair care, Home security, Accessories, Explore categories, store banner e footer. Gli sfondi (hero, Hair care, store) restano a tutta larghezza; il contenuto interno è sull'asse.
- Verificato misurando le bounding box a 1200 / 1440 / 1920 px: bordo sinistro e destro coincidono (a 1440 px: x = 167 → 1273 per tutte le sezioni).
- I padding interni (es. gli `80px` a sinistra del testo) stanno **dentro le card**, mai sui container di pagina.

### Core Web Vitals e caricamento immagini
- **CLS = 0**: ogni `next/image` con `fill` sta in un wrapper con dimensioni o aspect ratio bloccati e ha `sizes` coerenti con i breakpoint.
- **`preload`** (API di Next 16, che depreca `priority`) **solo** sull'hero e sulla buy box della PDP. Nell'HTML di produzione ogni pagina ha esattamente un'immagine con preload, e tutte le altre sono `loading="lazy"` nativo.
- Le icone sono **SVG inline**: nessuna libreria di icone nel bundle.

### Accessibilità (WCAG AA)
- Gerarchia heading **`h1` → `h2` → `h3`** senza salti; sulla PDP due `h2` **`.sr-only`** introducono le sezioni senza titolo visibile.
- Carosello: `role="region"`, track con **`role="group"`** focusabile e navigabile con ←/→; frecce con `aria-label` e `disabled` a inizio e fine corsa.
- Accordion: `aria-expanded`, `aria-controls`, pannello `role="region"` con `aria-labelledby`; **Enter** e **Space** tramite pulsanti nativi.
- Drawer mobile: `role="dialog"`, `aria-modal`, focus trap, chiusura con **Escape** e focus riportato al trigger, `aria-expanded` sul pulsante.
- Focus ring visibili ovunque (`focus-visible:ring-2`) e rispetto di `prefers-reduced-motion`.

### Struttura
```
src/
  app/                 layout, home, products/[slug] (SSG + metadata)
  components/
    common/ home/ layout/ pdp/ shared/   (test accanto al componente: *.test.tsx)
  data/                products.json, categories.json
  lib/                 accesso ai dati
  types/               contratti TypeScript
e2e/                   test Playwright
reports/               audit Lighthouse (PDF)
```

---

## 4. AI tooling e changelog degli interventi

### Come ho usato l'AI
Ho usato un assistente AI di coding (**Cline**) come strumento di produttività, sotto la mia direzione e revisione. In concreto:

- **Prototipazione rapida delle classi Tailwind** per i tre breakpoint, partendo dai valori del design spec.
- **Generazione dei test**: scaffolding di Vitest/React Testing Library (`ProductAccordion`, `Carousel`, `Header`) e dello spec Playwright, poi eseguiti e corretti a mano.
- **Audit e misure**: script usa-e-getta (Playwright) per misurare le bounding box di ogni elemento, confrontare due build e controllare gli attributi di caricamento delle immagini.
- **Analisi dei report Lighthouse** per individuare gli audit falliti.

**Cosa non ha deciso l'AI:** requisiti, design spec, priorità, e quali punteggi accettare (es. il contrasto del brand). Ogni modifica è stata verificata con `npm test`, `tsc --noEmit`, `npm run build` e, per il layout, con misure su più viewport. Il codice generato va comunque letto: l'AI ha anche sbagliato (vedi sotto, il confronto con `HEAD`).

### Debugging reale e correzioni

| # | Problema | Causa e fix |
|---|---|---|
| 1 | **Layout "a zig-zag" su Desktop**: sezioni su assi diversi, card Kettle a 746px invece di 1106px, titoli di sezione a 736px. | **Conflitto di unità nei breakpoint di `globals.css`.** `--breakpoint-xl` era in `px`, mentre `sm`/`md`/`lg` di default in Tailwind sono in `rem`. Tailwind ordina le media query anche per unità, quindi `md:` e `lg:` venivano emessi **dopo** `xl:` e lo sovrascrivevano a ≥ 1200px (`md:max-w-[746px]` batteva `xl:max-w-[1106px]`). Fix: tutti i breakpoint in `px`. Poi ho uniformato le larghezze fisse residue (`1048px` → `1106px`, `xl:w-[540px]` → `xl:w-full`) e il `SectionHeader`. |
| 2 | **Semantica heading**: salto da `h2` a `h4` nelle card cross-sell della PDP. | `h4` → `h3`. Il rettangolo misurato resta identico. |
| 3 | **Metadati Home duplicati** (`page.tsx` e `layout.tsx` in conflitto). | Unica fonte nel layout. |
| 4 | **`priority` deprecato in Next 16.** | Sostituito con `preload`, tenuto solo su hero e buy box PDP; rimossi i `priority={false}` ridondanti e `priority` sulla prima slide del carosello. |
| 5 | **Plugin di test superfluo.** | `vite-tsconfig-paths` (installato all'inizio) rimosso: Vitest 4 risolve gli alias di `tsconfig.json` con `resolve.tsconfigPaths: true`. |

**Metodo di verifica del punto 1:** snapshot delle bounding box di ogni elemento a 390, 480, 767, 768, 810, 1024, 1199, 1200, 1440 e 1920 px, prima e dopo la modifica ai breakpoint. Sotto i 1200px la geometria è identica (unica differenza: il tag `h4`→`h3`).

### Icone e dipendenze
Tutte le icone sono **SVG inline**: nessun componente di `lucide-react` è importato. La dipendenza però è **ancora dichiarata in `package.json`** (inutilizzata, non pesa sul bundle perché non viene importata). Rimuoverla è una pulizia in sospeso: `npm uninstall lucide-react`.

### Effetti collaterali noti della correzione ai breakpoint
La correzione di `globals.css` vale per tutto il sito. A Desktop ha cambiato anche la **geometria della PDP** (es. il box prodotto passa da 476px a 618px di larghezza) e le card Best sellers passano da 1048px a 1106px (la prima slide è sull'asse, la seconda è visibile solo in parte). Le ho considerate coerenti con l'asse unico, ma vanno confrontate con il design spec.

---

## 5. Trade-off e sviluppi futuri

### Test: simulazione vs interazione reale
- **Component test (jsdom)**: jsdom non ha un motore di layout. Nel test del `Carousel` simulo `scrollLeft`/`scrollWidth`/`clientWidth` e lo scroll risultante da uno swipe: verifico che gli eventi touch e lo scroll aggiornino lo stato disabilitato delle frecce, **non** il gesto di swipe vero (che è nativo: `overflow-x` + `scroll-snap`). Il test è veloce (~2 s) e deterministico, ma non può validare scroll-snap o inerzia.
- **E2E (Playwright)**: oggi copre il flusso Home → PDP → colore → accordion, su Desktop e Mobile. **Non copre ancora swipe e carosello su un touch device reale**: è il passo successivo (Playwright con `hasTouch` e gesto reale, più una scansione axe).

### Limiti noti
- Il link "Download manuale" è generato dallo slug (`/downloads/octopus-<slug>-manual.pdf`) ma esiste **un solo PDF** (Countertop Blender): per gli altri prodotti il link darebbe 404. Servirebbe un campo `manualUrl` in `products.json`.
- Le ancore `#store-locator`, `#contact-us` e `#policies-terms` (store banner e footer) sono segnaposto senza destinazione.
- I punteggi Lighthouse sono su build locale: da ripetere sul deploy Vercel.

### Sviluppi futuri
- **Headless CMS** (Contentful / Sanity): sostituire `src/lib/products.ts` con un client del CMS, mantenendo invariati i contratti in `src/types/product.ts`. Taggare le fetch e invalidare con un webhook che chiama `revalidateTag('products', 'max')` (in Next 16 il secondo argomento, il *profile*, è richiesto). Con `cacheComponents` attivo, usare `'use cache'` + `cacheTag`.
- **i18n** con **`next-intl`**: segmento `[locale]`, messaggi per i testi editoriali, campi localizzati nel CMS, `alternates.languages` in `generateMetadata`.
- **SEO**: rendere descrittivo il testo visibile dei link "Learn more" (es. nome del prodotto in un `sr-only` interno al link) per portare la Home a SEO 100; aggiungere `sitemap.ts` e dati strutturati `Product` (JSON-LD) sulla PDP.
- **Accessibilità**: allineare con il team di design i token di contrasto (footer e tag categoria) per arrivare a 100.
- **CI**: GitHub Actions con `typecheck`, `lint`, `npm test`, E2E e Lighthouse CI con soglie.
- **Pulizia**: rimuovere `lucide-react` e `src/types/products.ts` se confermato inutilizzato.

