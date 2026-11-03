# Octopus Web

Homepage and Product Detail Page (PDP) demo for the *Octopus* consumer electronics brand, built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS 4**, with automated test suites and Lighthouse audits scoring **≥ 92 in every category** (Performance, Best Practices and CLS at or near perfect).

| | |
|---|---|
| **Live Demo (Vercel)** | <https://octopus-web-steel.vercel.app> |
| **GitHub Repository** | <https://github.com/Carigeet/octopus-web> |

- **Homepage**: Hero, Best sellers carousel, Kitchen / Hair care / Home security / Accessories sections, category grid, and store locator banner.
- **PDP** (`/products/[slug]`): buy box with colour swatch selector, feature bento grid, technical specifications accordion, manual PDF download, and cross-sell carousel.
- Responsive viewports: **Desktop ≥ 1200px**, **Tablet 768–1199px**, **Mobile < 768px**.

---

## 1. Overview & Quick Setup

**Prerequisites:** Node.js **≥ 20.9** (Next.js 16 requirement) and npm.

```bash
npm install
npm run build      # production build
npm run start      # serve locally on http://localhost:3000
```

Development server: `npm run dev` (`http://localhost:3000`).

### Testing

| Command | Description |
|---|---|
| `npm test` | **19 component tests** via Vitest + React Testing Library (jsdom), ~2 s. No browser or build required. |
| `npm run test:e2e` | **Playwright** end-to-end tests on *Desktop Chrome* and *Mobile Pixel 7*. Builds and serves the production app on port 3100 automatically. |
| `npm run test:all` | Runs the component and E2E suites sequentially. |
| `npm run typecheck` · `npm run lint` | Runs `tsc --noEmit` and ESLint. |

> **First E2E run:** install the Playwright browser with `npx playwright install chromium`.
> `test:e2e` reuses a server already listening on port 3100 if there is one (CI always starts a fresh instance).

**Coverage:**
- `ProductAccordion` (8 tests): closed by default, click expand/collapse, multiple open sections, `aria-expanded` / `aria-controls` / `role="region"` wiring, **Enter** and **Space** keys, tab order.
- `Carousel` (9 tests): single-slide scroll, arrow buttons disabled at both track boundaries, keyboard navigation (←/→), state sync after touch swipes.
- `Header` (2 tests): mobile drawer opens with `aria-expanded`, closes on **Escape** and returns focus to the trigger.
- **E2E** (`e2e/countertop-blender.spec.ts`): Homepage → "Learn more" on the Countertop Blender card → PDP render → colour swatch → "Technical specifications" accordion.

---

## 2. Lighthouse Audit Results

**Lighthouse 13.5.0** audit run on a local production build (`npm run build && npm run start`, `http://localhost:3000`) on November 3, 2026. The full PDF reports (in Italian) are in [`reports/`](./reports).

| Target page | Performance | Accessibility | Best Practices | SEO | CLS |
|---|:---:|:---:|:---:|:---:|:---:|
| Homepage – Desktop | **100** | 96 | **100** | 92 | **0** |
| Homepage – Mobile | **96** | 96 | **100** | 92 | **0** |
| PDP (Countertop Blender) – Desktop | **100** | 96 | **100** | **100** | **0** |
| PDP (Countertop Blender) – Mobile | **96** | 96 | **100** | **100** | **0** |

The brief's targets (Mobile Performance ≥ 90, Accessibility ≥ 90) are met. The audits ran on the local production build, **not** on the Vercel deployment.

### Why Accessibility is 96, not 100

The only failing audit is **colour contrast**. The flagged elements come from the **brand colour tokens in the Figma design spec**:
- footer link labels (`text-white/85` on a `#D01A1F` background);
- the `#E51A24` category tag on Best seller cards (Homepage only).

I kept these tokens unchanged for design fidelity: changing them is a product design decision, not an engineering defect. The fix is straightforward if design approves it: solid white text in the footer and a slightly darker red for the category tag.

### Why Homepage SEO is 92

Lighthouse flags the **19 "Learn more" card links** under "Links do not have descriptive text". Most of them have a descriptive `aria-label` (e.g. *"Learn more about Octopus Kettle 1.7 L"*), but the audit evaluates the visible link text. The PDP has no repeated calls to action and scores 100. See the Future Roadmap.


---

## 3. Architectural & Engineering Decisions

### Data-driven architecture
- Catalogue data, features, colours, technical specifications and categories live in `src/data/products.json` and `src/data/categories.json`, typed by the interfaces in `src/types/product.ts`. Access goes through `src/lib/products.ts`.
- Adding a product means adding one schema-valid JSON object: product cards, the PDP, accordion panels, metadata and the static route are all generated from it.
- Editorial section copy (hero, section headers, store banner, footer) stays in the presentation components, as it is not part of the product catalogue.

### Dynamic routing, SSG and metadata
- `src/app/products/[slug]/page.tsx` uses **`generateStaticParams`** (11 product pages pre-rendered at build time) and **`generateMetadata`**: per-product title, description, canonical, **OpenGraph** and **Twitter card**, with `noindex` for unknown slugs.
- `src/app/layout.tsx` is the **single source of truth** for root metadata: `metadataBase`, `title.template` (`%s | Octopus`), and the default OpenGraph/Twitter image (1600×900).
- Next.js 16 with the `cacheComponents` and `partialPrefetching` flags enabled.

### Desktop layout alignment
- One shared content axis: **`xl:max-w-[1106px] xl:mx-auto`** on the header, Best sellers, Kitchen, Hair care, Home security, Accessories, Explore categories, store banner and footer. Background layers (hero, banners) stay full-bleed while their inner content sits on the axis.
- Verified by measuring element bounding boxes at 1200 / 1440 / 1920 px: left and right edges match (at 1440 px: x = 167 → 1273 for every section).
- Inner offsets (such as the 80px left padding of card copy) live **inside the cards**, never on page-level containers.

### Core Web Vitals and image loading
- **CLS = 0**: every `next/image` using `fill` sits in a parent with fixed dimensions or aspect ratio, and has `sizes` matched to the breakpoints.
- **`preload`** (the Next.js 16 API that supersedes `priority`) is used **only** on the Homepage hero and the PDP buy box image. The production HTML has exactly one preloaded image per page; every other image is native `loading="lazy"`.
- **No icon library at runtime**: icons are inline SVGs.

### Accessibility (WCAG AA)
- Strict heading hierarchy **`h1` → `h2` → `h3`** with no skipped levels; on the PDP two **`.sr-only` `h2`** headings keep the outline intact for sections without a visible title.
- Carousel: `role="region"`, with the slide track as a focusable **`role="group"`** that responds to ←/→; arrow buttons have `aria-label`s and are `disabled` at the boundaries.
- Accordion: `aria-expanded`, `aria-controls`, and `role="region"` panels linked via `aria-labelledby`; **Enter** and **Space** through native buttons.
- Mobile drawer: `role="dialog"`, `aria-modal`, focus trap, **Escape** to close with focus returned to the trigger, and `aria-expanded` on the trigger.
- Visible focus rings everywhere (`focus-visible:ring-2`) and `prefers-reduced-motion` support.

### Directory structure
```
src/
  app/                 root layout, home, products/[slug] (SSG + metadata)
  components/
    common/ home/ layout/ pdp/ shared/   (co-located tests: *.test.tsx)
  data/                products.json, categories.json
  lib/                 data access
  types/               TypeScript contracts
e2e/                   Playwright specs
reports/               Lighthouse PDF audits
```


---

## 4. AI Tooling & Engineering Log

### Dual-agent workflow

The project was built with two AI coding agents, each used for the kind of work it suited, under continuous human direction and review:

1. **Google Antigravity (Gemini 4 Carbon)** – early-stage work:
   - workspace scaffolding and high-level task orchestration;
   - GUI review loops: browser-assisted visual checks of components on mobile, tablet and desktop;
   - first-pass layout: Tailwind responsive mapping and baseline DOM structure.
2. **Claude Code / Cline** – later-stage, narrower work:
   - surgical debugging and refactoring;
   - authoring the test suites (Vitest + React Testing Library, Playwright E2E);
   - Core Web Vitals work: image loading (`preload`/lazy), `sizes`, CLS, and the Next.js 16 `priority` → `preload` deprecation fix;
   - throwaway Playwright scripts that measure the bounding box of every DOM element across viewports and compare two production builds (about 4,400 elements per comparison).

**What stayed human-driven:** domain modelling, the data contracts, design trade-offs (e.g. keeping the Figma brand colours despite the contrast audit), the choice of which scores to accept, and root-cause judgement. Neither agent was trusted without verification: every change was checked with `npm test`, `tsc --noEmit`, `npm run build` and, for layout, with measurements at multiple viewports.

**Where the tools fell short** (kept here on purpose):
- The desktop layout regression (item 1 below) came from a CSS breakpoint token defined in the first phase. A later review compared class names, found them unchanged, and reported *no regression* until measuring real element geometry exposed it. A source diff cannot see a bug that sits in the order of the generated CSS.
- Both phases needed guardrails: a measurable check (bounding boxes, test runs) before accepting any "done".

### Engineering interventions & bug fixes

| # | Issue | Root cause & resolution |
|---|---|---|
| 1 | **Desktop layout zig-zag**: misaligned section edges, Kettle card at 746px instead of 1106px, section titles capped at 736px. | **Breakpoint unit collision in `globals.css`.** `--breakpoint-xl` was defined in `px`, while Tailwind's default `sm`/`md`/`lg` are in `rem`. Tailwind orders media queries by unit, so `md:` rules were emitted **after** `xl:` and overrode them at ≥ 1200px (`md:max-w-[746px]` beat `xl:max-w-[1106px]`). Class names matched the previous commit, so a source diff showed nothing. **Fix:** all breakpoint tokens in `px`; then aligned the leftover fixed widths (`1048px` → `1106px`, `xl:w-[540px]` → `xl:w-full`) and `SectionHeader`. |
| 2 | **Heading hierarchy**: `h2` → `h4` skip in the PDP cross-sell cards. | `h4` → `h3`. Measured box unchanged. |
| 3 | **Duplicated root metadata** in `page.tsx` and `layout.tsx`. | Single owner: `layout.tsx`. |
| 4 | **`priority` deprecated in Next.js 16.** | Migrated to `preload`, kept only on the above-the-fold images; removed the redundant `priority={false}` props and the preload on the first carousel slide. |
| 5 | **Unneeded test plugin.** | Removed `vite-tsconfig-paths`: Vitest 4 resolves `tsconfig.json` aliases natively with `resolve.tsconfigPaths: true`. |
| 6 | **Wrong site URL in metadata.** | `metadataBase`, canonical and OpenGraph used a placeholder domain; now `https://octopus-web-steel.vercel.app`. |

**How item 1 was verified:** bounding-box snapshots at 390, 480, 767, 768, 810, 1024, 1199, 1200, 1440 and 1920 px, before and after the fix. Below 1200px the geometry is identical (the only difference is the `h4` → `h3` tag).

### Dependency housekeeping
All icons are **inline SVGs**; no `lucide-react` component is imported. The package is **still declared in `package.json`** (unused, so it adds nothing to the bundle). Removing it is an open cleanup task: `npm uninstall lucide-react`.

### Side effects of the breakpoint fix
The `globals.css` fix applies site-wide. On desktop it also changed the **PDP layout** (e.g. the product box went from 476px to 618px wide) and widened the Best seller cards from 1048px to 1106px (the active slide now sits on the axis and the next one peeks in from the right). Both follow the unified axis; compare them against the design spec.


---

## 5. Trade-offs & Future Roadmap

### Testing: jsdom emulation vs. real gestures
- **Component tests (jsdom):** jsdom has no layout engine. `Carousel.test.tsx` simulates `scrollLeft`, `scrollWidth` and `clientWidth` to verify that scroll and touch events update the arrow buttons' disabled state. It does **not** assert real swipe dynamics, which rely on the browser's native `overflow-x` and `scroll-snap`. The suite is fast (~2 s) and deterministic, but cannot validate momentum or snapping.
- **End-to-end (Playwright):** covers the main flow (Home → PDP → colour variant → specifications accordion) on desktop and mobile. It does **not** yet exercise swipe on a touch device. Next step: touch emulation (`hasTouch: true`) plus an automated `axe-core` pass.

### Known constraints
- The "Download manual" link is built from the product slug (`/downloads/octopus-<slug>-manual.pdf`), but only one PDF exists (Countertop Blender), so other products would return 404. This needs an explicit `manualUrl` field in `products.json`.
- The anchors `#store-locator`, `#contact-us` and `#policies-terms` are placeholders without a destination.
- Lighthouse scores come from a local production build; run them against the Vercel deployment too.

### Future roadmap
- **Headless CMS (Contentful / Sanity):** replace `src/lib/products.ts` with a CMS client, keeping the contracts in `src/types/product.ts`. Revalidate on demand through a webhook calling `revalidateTag('products', 'max')` (Next.js 16 requires the second *profile* argument); with `cacheComponents` on, use `'use cache'` and `cacheTag`.
- **Internationalisation with `next-intl`:** a `[locale]` route segment, message catalogues for editorial copy, localised CMS fields, and `alternates.languages` in `generateMetadata`.
- **SEO:** add the product name as screen-reader text inside the "Learn more" links to bring the Homepage to 100; add `sitemap.ts` and `Product` JSON-LD on the PDP.
- **Design-system alignment:** agree contrast-safe values for the footer and category-tag tokens with design to reach 100 on Accessibility.
- **CI/CD:** GitHub Actions running `typecheck`, `lint`, `npm test`, Playwright E2E and Lighthouse CI budgets.
- **Cleanup:** `npm uninstall lucide-react` and delete the legacy `src/types/products.ts` (nothing imports it).

