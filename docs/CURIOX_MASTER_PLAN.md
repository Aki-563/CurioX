# CurioX — Codex Master Implementation Plan

**Document ID:** CURIOX-IMP-001  
**Version:** 3.0 — 13 November 2026  
**Purpose:** Persistent, self-contained design, engineering, delivery, and verification contract for a Codex coding agent  
**Target domain:** `https://curiox.in`  
**Launch platform:** Cloudflare Pages (static deployment)  
**Current user authorization:** The user may authorize **local development** by pasting this document into a coding agent. **No deployment, Git push, DNS modifications, domain connection, external account changes, or publication** are authorized by this document. Those require separate explicit permission.

> **IMPORTANT AGENT BOOTSTRAP RULE:** If the text of this document is pasted directly into Codex, **before any project implementation**, save a complete copy as `<project-root>/docs/CURIOX_MASTER_PLAN.md`. Do not reduce it to a summary or omit phases. Also create `<project-root>/AGENTS.md`, `<project-root>/docs/CURIOX_PROGRESS.md`, and `<project-root>/docs/CURIOX_DECISIONS.md` following §2. Then reread these on each new session and before each phase. If this document already exists, reconcile it instead of overwriting later user decisions. Never treat chat memory alone as the source of truth.

---

## 0. Executive brief and nonnegotiable requirements

### 0.1 What CurioX is

- **Brand:** `CurioX` — exactly this capitalization in user-visible content; never `Curiox`, `Curio-X`, or `CURIOX` as normal brand spelling. All caps are allowed only as intentional decorative labels, with accessible name `CurioX`.
- **Business:** Curiosity-driven technology and software company exploring emerging technologies and building useful software.
- **Audience:** Students, developers, general/everyday users, and small businesses. Do not present CurioX as only an AI company or only a SaaS vendor.
- **Mission:** Make useful technology more approachable and **affordable**. Use `Affordable`, not `Free`, for pricing positioning unless specific later user-approved content requires otherwise.
- **Product relationship:** `Smriti` is a future product of CurioX. Correct spelling is **Smriti**, not Smrithi. **DO NOT build or publish `/products/smriti` in this phase.** Do not fabricate its functionality, pricing, features, screenshots, or Play Store links. Do not build an empty `/products` page to create navigation clutter.
- **Language:** English only in Phase 1; architecture should allow future localisation without speculative i18n machinery.
- **Logo:** The official logo is forthcoming. Use a simple accessible text-only `CurioX` wordmark that can be swapped later. Do **not** invent or generate a permanent corporate logo.
- **Tagline:** Exact final tagline is NOT approved. It **must contain the exact phrase `Curious Minds`** when selected. The temporary working headline/tagline may be `Curious Minds. Build What's Next.` but must be clearly tagged `PROVISIONAL` in content configuration, never represented as legally or brand approved.
- **Design references:** Apple India, NVIDIA India, Fnatic, OnePlus India, The Verge. Derive principles, not copyrighted layout/assets.
- **Visual feel:** Premium, bold, modern, editorial, technological, precise, slightly rugged; not grunge-heavy or gaming-specific.
- **Shape language:** All buttons use `border-radius: 0`, and primary cards/panels should generally also be rectangular. Grid lines, separators, generous space, large crisp typography and angular motifs are encouraged.
- **Core colour:** Electric violet `#9351F3`, serving the role NVIDIA's green serves in its design, but CurioX-specific.
- **Approved fonts:** Space Grotesk for display, Inter for UI/body. Use properly licensed locally hosted WOFF2 fonts.
- **Hosting target:** Cloudflare Pages, static pre-rendered site; no runtime server required for initial corporate site.
- **Smooth scrolling:** Lenis, **only where it improves experience**; prefer native scrolling for touch-primary/mobile and `prefers-reduced-motion` users. No scroll-jacking.
- **Performance:** Static HTML, minimal JS, responsive all screen widths 320px and above, highly responsive touch interactions, strong SEO and accessibility.

### 0.2 Scope limits

**In scope:** Home `/`, About `/about`, Contact `/contact` (functional only with verified contact details; otherwise build and hold as blocked), 404, shared site shell, visuals, navigation, reusable design system, static output, technical SEO, testing, accessibility, performance, deployment documentation.

**Conditional:** Privacy/legal page only when real approved policy text and business details exist. If missing, document as a production blocker rather than invent legal language. Insights/blog only in future phase with actual approved content, not filler. Sitemap should include only approved publishable pages. Analytics and Search Console connection are separate approvals.

**Out of scope:** Smriti page, product catalog, user accounts, API backend, payments, CMS, search infrastructure, newsletter collection, tracking pixels, 3D frameworks, AI chatbot, dynamic contact endpoint, internationalisation, databases and speculative product cards.

### 0.3 Visual inheritance, not imitation

- **Apple:** high signal-to-noise, refined spacing, visual hierarchy.
- **NVIDIA:** one recognisable brand accent, credible engineering presentation.
- **Fnatic:** bold high-contrast shapes, angular visual confidence, expressive display typography.
- **OnePlus:** purposeful product-story pacing, immersive but disciplined sections.
- **The Verge:** editorial voice, distinctive composition, commanding headlines.
- **CurioX result:** a calm premium technology site with flashes of expressive, rugged geometry. Never reproduce logos, brand photography, source code, proprietary font files, or close reproductions of page compositions.

---

## 1. Agent behavior, autonomy, safety and stop conditions

1. **Inspect before modifying.** Determine current working directory and project root. If the repo contains unrelated work, stop and report instead of overwriting. Do not create a nested `curiox/` inside an already opened CurioX project.
2. **Self-document first.** Create the persistent Markdown context system specified in §2 before scaffolding code. Keep the document verbatim or fully equivalent, preserving all approved requirements and detailed phases.
3. **Local execution authorization:** When explicitly launched with an instruction to implement, proceed sequentially through **Phases 0–11** in the local project, updating progress after each phase. Within those boundaries, ordinary file edits, dependency installation, local builds and local tests are permitted. A user may override this with a phase-limited instruction; the narrower instruction wins.
4. **Never externalize:** No Git push, commit, PR, domain/DNS change, Cloudflare login/API use, published preview, production deployment, Search Console verification, email sending, paid service signup or external file upload without distinct explicit approval. Do not silently use connected credentials.
5. **Approval-gated phase:** Phase 12 (Cloudflare staging and production) is instructions-only until the user authorizes it. Even after staging permission, production/domain publishing needs separate permission.
6. **Human input blockers:** If the next action needs a final logo, tagline, verified contact details, legal text, access to an external account, licensed asset or business facts, mark it **BLOCKED—USER INPUT**. Continue independent local tasks where practical; never invent the missing fact.
7. **No fake success:** Do not create a working-looking but nonfunctional contact form. Do not report tests passed if not run, and do not claim a Cloudflare result while offline.
8. **Version discipline:** Verify up-to-date compatibility and versions from official docs/package metadata where possible; pin resolved versions via lockfile. If external lookup fails, note assumptions. Don't claim speculative software versions or benchmark results.
9. **Testing is not optional:** After every material phase, typecheck, build, test and visually inspect as applicable. Fix failures within scope before proceeding. If blocked, record evidence and continue only nondependent work.
10. **State continuity:** Read AGENTS.md, this plan, progress and decisions at the start of each new Codex session; never rely on earlier chat to reconstruct the state.
11. **Resumable operation:** Only mark a task `DONE` after its acceptance criteria pass and evidence is recorded. Keep idempotent setup and don't redo verified work unless requirements changed.
12. **User-facing final report:** At the end of local development, report created/modified files, test commands and results, desktop/mobile screenshots, measured performance, accessibility findings, remaining blockers and exact steps requiring approval.
13. **No irreversible cleanup:** No bulk deletion, force push, secret rotation or unrelated refactoring. Do not run destructive commands against unknown repositories.

### 1.1 Stop conditions

Stop immediately before any remote/external action; when relevant repository ownership is ambiguous; when a command threatens unrelated data; or when a design decision fundamentally conflicts with a recorded requirement. For noncritical unresolved copy/content, implement a locally testable placeholder only when unmistakably marked as provisional, and do not publish it.

### 1.2 Definition of completed local project

Phases 0–11 are locally complete when required pages render, the site is entirely static, assets load, interactions work, tests pass, performance/accessibility evidence exists, the official logo/tagline/contact/legal dependencies are listed, and a release candidate is prepared **without deployment**. Launch readiness is separate from local completion.

---

## 2. Persistent Codex context system — MUST CREATE FIRST

### 2.1 Required files

At the actual repository root, create/maintain:

```text
AGENTS.md
README.md
package.json
pnpm-lock.yaml
astro.config.mjs
src/...
public/...
tests/...
docs/
  CURIOX_MASTER_PLAN.md       <-- this entire specification; authoritative requirements
  CURIOX_PROGRESS.md          <-- per-task/phase status and next action
  CURIOX_DECISIONS.md         <-- approved choices vs assumptions; append-only decisions
  CURIOX_DESIGN_SYSTEM.md     <-- detailed tokens, components, typography, interaction states
  CURIOX_ARCHITECTURE.md      <-- directory map, decisions, build/deploy approach
  CURIOX_PERFORMANCE.md       <-- test methodology, budgets, baseline and results
  CURIOX_QA_MATRIX.md         <-- actual viewport/browser/accessibility results
  reports/
    phase-00.md ... phase-11.md
```

Create supporting files only when appropriate; avoid empty directories and filler documentation. `AGENTS.md`, master plan, progress and decisions are mandatory.

### 2.2 Mandatory root `AGENTS.md` policy

Create a concise AGENTS.md containing these directives:

- `docs/CURIOX_MASTER_PLAN.md` is the authoritative project specification. Read before planning/editing.
- Read `docs/CURIOX_PROGRESS.md` to identify the first unfinished, unblocked phase and avoid repeating completed work.
- Read `docs/CURIOX_DECISIONS.md` to preserve approved user choices and avoid reversals.
- Before changing scope, reconcile requested change with the master plan and log the approved delta.
- Proceed locally through authorised phases and verify each before marking done. Never fabricate test results.
- Never perform deployment, DNS updates, Git pushes/commits, external calls requiring account access, or use of credentials without explicit user consent.
- Exact brand spelling CurioX; first product Smriti; product page deferred; official logo pending; tagline must contain Curious Minds but final version pending; Space Grotesk + Inter; electric violet; 0-radius buttons; static-first site.
- Each phase ends with updated progress, decisions if any, phase report and a precise resume pointer.
- Where plans disagree, explicit newer user instructions win; record the change and preserve the decision history.

### 2.3 Format for `docs/CURIOX_PROGRESS.md`

Use a table with columns `Phase | Task IDs | Status | Last verified | Evidence | Blocker`. Valid statuses: `NOT_STARTED`, `IN_PROGRESS`, `BLOCKED`, `DONE`, `SKIPPED_WITH_REASON` (only for legitimately optional tasks; user requested no fabricated skipped work). Track a single `CURRENT_PHASE` and `NEXT_ACTION` near the top. Track the most recent verification commands with exit results. Keep the progress file short enough to scan on every restart; detailed output lives in reports.

### 2.4 Format for `docs/CURIOX_DECISIONS.md`

Each decision includes date, decision ID, question, chosen outcome, reason, alternatives considered, status (`APPROVED`, `PROVISIONAL`, `OPEN`), and phase impact. Never quietly turn an open decision into approved. Initial entries:

- `D001 APPROVED` CurioX capital X.
- `D002 APPROVED` Smriti name; product page deferred.
- `D003 APPROVED` dark palette and primary `#9351F3`.
- `D004 APPROVED` Space Grotesk + Inter.
- `D005 APPROVED` zero-radius buttons.
- `D006 APPROVED` Affordable language.
- `D007 APPROVED` Cloudflare Pages as target.
- `D008 APPROVED` English-only Phase 1.
- `D009 OPEN` exact `Curious Minds` tagline.
- `D010 OPEN` official logo asset.
- `D011 OPEN` verified contact details and form mechanics.
- `D012 OPEN` business/legal disclosures and policy copy.
- `D013 PROVISIONAL` Astro static architecture and implementation versions, verify at preflight.

### 2.5 Phase report schema

For each phase, create `docs/reports/phase-NN.md` containing: objective, exact task IDs, files touched, notable implementation details, commands with observed exit codes, visual evidence file paths, accessibility findings, performance values if measured, decisions, unresolved issues, and `DONE/BLOCKED` verdict. Capture screenshots locally in a clearly named test-artifact folder; don't commit large binaries by default.

### 2.6 Session bootstrap (every new Codex run)

1. Identify repo root and inspect git status **without mutation**.
2. Read AGENTS.md, `docs/CURIOX_MASTER_PLAN.md`, `docs/CURIOX_PROGRESS.md`, `docs/CURIOX_DECISIONS.md`, and the last phase report.
3. Summarize current phase, existing work, required tests, current blockers and next action.
4. Proceed only within current user authorization.
5. Update the files before stopping. If context is running long, prioritize preserving a precise resume pointer and test evidence on disk.

---

## 3. Design tokens, technical baseline and quality budgets

### 3.1 Supplied palette tokens (source-derived)

Use the supplied `neon_recovery_website_palette(1).css` as the palette source. It contains rounded component styles; **keep its colour values but replace button/panel rounding to match CurioX**. Do not blindly copy its sample `.btn-primary` `border-radius: 12px`, `.card` `16px` or form `10px` values.

```css
:root {
  --color-bg: #050409;
  --color-bg-alt: #0E0A18;
  --color-surface: #171126;
  --color-surface-raised: #251A3A;
  --color-border: #392951;
  --color-primary: #9351F3;
  --color-primary-hover: #B77AFF;
  --color-primary-button: #7E3FDA;
  --color-primary-button-hover: #8543E0;
  --color-secondary: #E594F4;
  --color-secondary-soft: #F3C8FA;
  --color-text: #F8F4FF;
  --color-text-muted: #BDB3D0;
  --color-text-subtle: #8B829C;
  --color-on-primary: #FFFFFF;
  --color-link: #B77AFF;
  --color-success: #59DBB1;
  --color-warning: #FFD080;
  --color-error: #FF7D9D;
  --radius-button: 0px;
  --radius-card: 0px;
}
```

Perform an automated WCAG contrast audit of actual pairs. Preliminary calculation: `#9351F3` with white text is approximately **4.46:1**, marginally below the 4.5:1 requirement for normal text, while `#7E3FDA` with white is approximately **5.82:1**. Therefore, keep `#9351F3` as the accent but prefer the darker button token for small white button labels. Verify all ratios and rendered states in the build. If a text/background pair fails applicable contrast, choose a compliant **tonal adjustment within the violet family** and log the deviation (or use compliant foreground); do not silently compromise accessibility to preserve a hex. Hover and focus states must also pass.

### 3.2 Typography and scale

- Display: Space Grotesk 600/700. UI: Inter 400/500/600. Self-host legally sourced WOFF2, subsets only where useful; no remote font CDN at runtime.
- Suggested fluid H1 `clamp(2.4rem, 6.5vw, 6.5rem)` with refined breakpoints and line-height 0.95–1.10. Avoid cutting ascenders/descenders; verify actual font rendering.
- H2 approximately `clamp(2rem, 4vw, 4.5rem)`; H3 approximately `clamp(1.3rem, 2.2vw, 2rem)`; body 16–18px; utility 12–14px when accessible.
- Body measure generally 60–75 characters and line-height about 1.5–1.7; display headings may be significantly tighter. Avoid extreme negative tracking on mobile.
- Use a fluid spacing system based on 4/8/12/16/24/32/48/64/96/128px with responsive `clamp` tokens; no arbitrary values per section without justification.

### 3.3 Layout and responsiveness

- Mobile-first, down to **320px**. Desktop max content width approximately 1360–1440px; controlled responsive gutters.
- Test 320, 360, 375, 390, 430, 480, 640, 768, 820, 1024, 1280, 1440, 1920, 2560px, plus 200% zoom, alternate heights, portrait/landscape and touch input.
- Use CSS grid + flex, intrinsic sizing, `minmax`, `min-width: 0`, container queries where meaningful; no horizontal overflow. Test dynamic font scaling and long words.
- Accessible controls, visible focus, working skip link, `prefers-reduced-motion`, descriptive link labels, keyboard-operated menus.

### 3.4 Performance targets (engineering budgets, not guarantees)

- Target Lighthouse **Performance ≥95**, Accessibility ≥95, Best Practices ≥95, SEO ≥95 on representative pages in controlled repeated tests; report actual scores.
- CWV good field thresholds (75th percentile): **LCP ≤2.5s**, **INP ≤200ms**, **CLS ≤0.1**. INP cannot be claimed as a real-user measurement before field data exists; use lab interaction traces as a proxy and label appropriately.
- Proposed initial compressed JS transfer budget **≤40KB** for primary page, including optional Lenis on a desktop eligible profile. If above, measure and justify rather than silently lowering target.
- Proposed above-fold total transfer **≤350KB** under representative first-load assumptions, subject to real content and font constraints.
- Minimise TBT; aim ≤150ms lab on agreed throttled profile, report actual.
- Correct responsive images, font subsetting, CSS-first motion, semantic HTML, zero unnecessary hydration, deferred enhancements, no heavyweight runtime.

### 3.5 Technical stack (verify before install)

- Astro **7.x stable compatible** as of execution, with static prerendering. TypeScript strict. pnpm and lockfile. Prefer native modern CSS over Tailwind unless a compelling documented reason emerges; avoid unnecessary CSS framework dependencies.
- Astro components, SVG assets and small vanilla TS scripts for mobile navigation/motion. Content Collections only when actual structured content benefits, not by default for three pages.
- Lenis package only after native baseline works, conditionally on non-touch pointer and motion preference; use official recommended CSS, one RAF strategy, proper cleanup, `anchors:true` as relevant.
- Playwright E2E and screenshots; axe-core automated checks; Vitest if pure functions exist; Lighthouse CI or local Lighthouse measurement; formatting/lint tools with restrained configuration.
- Cloudflare Pages static output `dist`; no SSR adapter or Functions unless separately approved later. Verify build script, output mode, Node/pnpm versions supported by current toolchain.

---

## 4. Execution overview and dependencies

| Phase | Name | Depends on | Main gate |
|---|---|---|---|
| 00 | Discovery and preflight | None | Verified environment and risk report |
| 01 | Persistent context and Astro foundation | 00 | Clean reproducible static build |
| 02 | Brand tokens, fonts, design primitives | 01 | Component gallery and contrast checks |
| 03 | Site shell, header, navigation, footer | 02 | Usable navigation at all sizes |
| 04 | Homepage — complete premium visual narrative | 03 | Desktop/mobile visual review |
| 05 | About, Contact and 404 | 03, 04 | Real content and no fake contact functionality |
| 06 | Responsive refinement | 04, 05 | No overflow and readable 320px+ |
| 07 | Motion, Lenis and interaction polish | 06 | Reduced-motion/touch/keyboard verified |
| 08 | Technical SEO and social metadata | 05 | Valid canonical, sitemap, schema and indexing controls |
| 09 | Accessibility engineering | 07, 08 | WCAG 2.2 AA target and manual test record |
| 10 | Performance and security hardening | 07–09 | Measured budgets and documented exceptions |
| 11 | Cross-browser QA, release candidate and handoff | 00–10 | Local RC with evidence and blockers |
| 12 | Cloudflare staging, domain and production launch | Separate explicit consent | Preview approval THEN production approval |
| 13 | Post-launch analytics, SEO and future product expansion | Published site + separate consent | Valid real-user data and approved product scope |

**Autonomy model:** Run phases **00–11 sequentially in the local project** if the initiating user request explicitly authorises local implementation. Update progress after each verified checkpoint. Stop if a critical approval is needed. Phase 12 and 13 are **future instructions only** until separately approved. Do not automatically resume remote stages after local completion.

---

## PHASE 00 — Read-only repo discovery and preflight

**Goal:** Determine environment, requirements, risks and practical build approach without changing anything.

**Tasks:**
- [ ] `P00.01` Identify working directory and repo root; check for unrelated source or uncommitted changes; do not delete/overwrite.
- [ ] `P00.02` Inventory Node, pnpm, Git, browser/test tools and OS; check Node compatibility with current Astro.
- [ ] `P00.03` Review attached CSS palette; record exact colour tokens and rounded styles that must be overridden.
- [ ] `P00.04` Verify official Astro, Cloudflare Pages, Lenis, TypeScript and Playwright documentation/package metadata; distinguish confirmed versions from assumptions.
- [ ] `P00.05` Inspect available logo/font/media files; log missing official logo and taglines as pending; do not source proprietary font binaries.
- [ ] `P00.06` Identify canonical site URL, navigation routes, content requirements, contact/legal blockers and shipping constraints.
- [ ] `P00.07` Record strategy for static Pages vs Workers; no unnecessary SSR adapter. Record reason Rust/WASM is unnecessary for a static marketing site.
- [ ] `P00.08` Write a short preflight report summarising environment, dependency choices, risks, and plan to proceed. If document creation is not yet authorised, present report without editing files.

**Acceptance:** Explicit repo root established; no unrelated files changed; constraints captured; supported stack recommended. **Evidence:** Environment outputs (sanitised), version list, risk log. **Blocking:** Unknown repo ownership, inability to safely modify current directory.

## PHASE 01 — Save context system and scaffold the static project

**Goal:** Make the execution repeatable for long agent runs and establish a clean buildable project.

**Tasks:**
- [ ] `P01.01` Copy entire master spec to `docs/CURIOX_MASTER_PLAN.md` exactly or fully equivalently. Preserve original content and user decisions.
- [ ] `P01.02` Create root `AGENTS.md` containing mandatory read-on-start policy; `docs/CURIOX_PROGRESS.md` with every phase and task status; `docs/CURIOX_DECISIONS.md` with initial decisions; `docs/reports/phase-00.md`.
- [ ] `P01.03` Scaffold Astro in existing project root if safe. Use TypeScript strict, static output, no SSR adapter, no unapproved UI framework.
- [ ] `P01.04` Pin compatible package manager/Node requirements, lockfile and useful scripts (`dev`, `build`, `preview`, `check`, `lint`, `format:check`, `test`, `test:e2e` as installed).
- [ ] `P01.05` Configure alias paths sparingly; create `src/config/site.ts` for domain/brand/tagline status, `src/config/navigation.ts`, `src/config/seo.ts`, basic `src/layouts/BaseLayout.astro`.
- [ ] `P01.06` Create simple `src/pages/index.astro`, `about.astro`, `contact.astro`, `404.astro` skeletons; no fabricated content. Handle actual static 404 conventions for the target deployment.
- [ ] `P01.07` Create base styles and placeholder text wordmark only; set `lang=en`, document title and viewport metadata.
- [ ] `P01.08` Document `README.md` setup, commands and repo structure. Create `.gitignore` for build caches, node_modules, generated tests, `.env*` secrets and screenshots where appropriate.
- [ ] `P01.09` Run clean install/build/typecheck; inspect generated `dist` and confirm actual HTML files and no forced SSR runtime.
- [ ] `P01.10` Record exact commands/results in `docs/reports/phase-01.md` and progress log.

**Acceptance:** `pnpm install`, `pnpm check`, `pnpm build`, and `pnpm preview` work (or recorded equivalent commands); `dist/` contains static pages; persistent planning files exist; every task resumable. **Do not commit or push.**

## PHASE 02 — Design tokens, typography and component system

**Goal:** Establish a consistent, sharp-edged, premium design library before page-specific layout work.

**Tasks:**
- [ ] `P02.01` Implement tokens in `src/styles/tokens.css` from §3.1; semantic aliases for foreground/background/border and states.
- [ ] `P02.02` Add coherent reset/base styles, box sizing, image sizing, accessible focus and selection styles. Explicitly no universal `outline: none`.
- [ ] `P02.03` Source properly licensed Space Grotesk and Inter WOFF2, self-host and declare font-face with suitable fallbacks. Use only needed glyph subsets and weights; verify redistribution/embedding terms.
- [ ] `P02.04` Implement semantic responsive type scale (display/H1/H2/H3/body/eyebrow/utility), line heights and max text measures.
- [ ] `P02.05` Implement spacing, layout container, section gap, column/grid, rule/divider, visually hidden helper and section marker styles.
- [ ] `P02.06` Build `<Button>`/`<ButtonLink>` pattern with real anchor/button semantics; primary/secondary/quiet modes; 0 radius; hover, focus-visible, active, disabled states; appropriate target size.
- [ ] `P02.07` Build accessible Badge (not clickable by default), Card, SectionHeading, EditorialLabel, Icon, ExternalLink and TextWordmark as needed. Avoid making every minor visual a component.
- [ ] `P02.08` Build small local component gallery for internal review, excluded from public sitemap and release routes.
- [ ] `P02.09` Contrast-test white-on-violet and purple-on-dark including hover/focus; document any accessible tonal adjustments. Audit selection and muted text too.
- [ ] `P02.10` Screenshot component gallery at 320, 375, 768 and 1440 widths, check wrapping and focus states.
- [ ] `P02.11` Update design system documentation and phase report.

**Acceptance:** All components respond correctly without JS where possible, fonts load locally, no visible rounds on buttons, contrast issues addressed, no overflow or unnecessary dependencies. **Note:** `#7E3FDA` with white must be explicitly contrast checked; don't assume it passes WCAG normal-text thresholds.

## PHASE 03 — Site shell, responsive header and footer

**Goal:** Create professional, fully functional global layout primitives.

**Tasks:**
- [ ] `P03.01` Base layout with canonical metadata hooks, `<html lang="en">`, skip-to-content link, semantic main landmark and footer.
- [ ] `P03.02` Implement desktop header with text-only `CurioX` wordmark; Home (logo link), About, Contact, and only meaningful functional CTA. Do not show Products/Insights links to absent routes.
- [ ] `P03.03` Add mobile menu toggle with real button, accessible expanded state, labelled navigation region, close button, Escape handling, focus restoration and outside-click behavior if it improves UX.
- [ ] `P03.04` Choose nonintrusive sticky header only if it keeps the page usable; test anchor offsets, reduced available height and 320px header fit.
- [ ] `P03.05` Implement footer: wordmark, one-sentence positioning, navigation, verified social/contact links only, no invented business/address details, approved legal links only.
- [ ] `P03.06` Ensure graceful baseline navigation if JS fails; if mobile menu needs JS, offer a sensible no-JS path (e.g. always visible links in a `<noscript>` fallback or native details pattern).
- [ ] `P03.07` Test keyboard sequence, screen reader names, close/reopen behaviour, focus, click targets and browser history.
- [ ] `P03.08` Capture desktop and mobile header/footer screenshots and report.

**Acceptance:** No broken routes, no off-screen controls, no horizontal overflow, mobile menu works via touch+keyboard, correct ARIA and focus behavior, header has no fake CTA.

## PHASE 04 — Homepage: full CurioX visual narrative

**Goal:** Produce a polished, original, visually memorable homepage with understandable brand positioning.

**Structure and task details:**

### 04A. Hero
- [ ] `P04.01` Above-fold composition: small eyebrow, oversized two/three-line display headline using provisional `Curious Minds. Build What's Next.` or concise `Curiosity drives what we build.` as working copy; brand introduction; meaningful CTA to About or approved Contact; no fabricated product promises.
- [ ] `P04.02` Angular original X-inspired vector/CSS graphic: grid markers, thin rules, depth via gradients sparingly; not a trademark logo; clean mobile fallback. Optimize SVG path count and accessibility (`aria-hidden` if decorative).
- [ ] `P04.03` Desktop layout editorial and asymmetric; mobile stack with headline visible and CTA never below unnecessary visual content. Rework headline for 320px without breaking words.
- [ ] `P04.04` Define hero LCP strategy: text should render without JS; decorative visuals must not block; no video or heavy canvas.

### 04B. Philosophy
- [ ] `P04.05` Explain curiosity, continuous learning and useful technology with 1 compelling heading, <=2 short body paragraphs, subtle grid labels.
- [ ] `P04.06` Combine editorial whitespace with sharp separators, not generic four-card dashboard UI.

### 04C. Core principles
- [ ] `P04.07` `Explore`, `Build`, `Make Accessible`: visually coordinated three-part feature section with concise outcome-oriented language; unique but consistent layout; reflow single column on narrow screens.
- [ ] `P04.08` Use decorative markers (01/02/03) and lightweight icons only where additive.

### 04D. Affordable software philosophy
- [ ] `P04.09` Introduce `Affordable` badge in a purposeful section; messaging reflects aspiration/positioning without false universal price promises.
- [ ] `P04.10` Strong visual inversion or violet panel allowed, but preserve contrast and avoid overusing violet backgrounds.

### 04E. Audience value
- [ ] `P04.11` Distinct information tailored to students, developers, everyday users, small businesses. No unsupported detailed features: focus on needs, approachability and future solutions.
- [ ] `P04.12` Responsive editorial grid, not four identical generic SaaS cards unless final visual review prefers it.

### 04F. Technology curiosity
- [ ] `P04.13` An honest section about keeping up with emerging tools and AI developments. Avoid pretending that unannounced products or research initiatives exist.
- [ ] `P04.14` Optional light technical diagram/editorial label system; no live API/news feed in Phase 1.

### 04G. Closing CTA
- [ ] `P04.15` Strong statement with a real destination, preferably About (until contact details approved), visually distinctive transition and clear keyboard/touch interaction.
- [ ] `P04.16` Footer continuation should feel natural and polished.

### 04H. Content and visual review
- [ ] `P04.17` Review every line for truthful brand claims, English grammar, natural SEO phrasing, CurioX capitalisation, approved Affordable language, provisional tagline flag.
- [ ] `P04.18` Screenshot full homepage at 320, 390, 768, 1440 and 1920px; compare against stated design identity, not pixel-copied reference layouts.
- [ ] `P04.19` Measure LCP element and early JS. Ensure no content waits on animation to become visible.
- [ ] `P04.20` Document visuals and test evidence. Flag major aesthetic uncertainty as review item; continue nondependent tasks if no blocker.

**Acceptance:** Premium original design; readable brand purpose in first viewport; no fake products or empty sections; CTA functional; sharp edges; no overflow at 320; text LCP visible without JS; clean section pacing.

## PHASE 05 — About, Contact, 404 and content validation

**Goal:** Complete essential corporate routes without invented business information.

**About tasks:**
- [ ] `P05.01` About hero: a unique opening explaining CurioX's curiosity-driven approach and purpose.
- [ ] `P05.02` Sections: purpose, technology philosophy, build principles, the four audiences, future ambition without unverifiable roadmap claims.
- [ ] `P05.03` Unique page visuals and composition; avoid simply duplicating homepage blocks.
- [ ] `P05.04` Real cross-links back to Home or Contact.

**Contact tasks:**
- [ ] `P05.05` Prepare the Contact route with accessible page structure, explanatory copy, and space for an approved email/other verified contact method.
- [ ] `P05.06` If contact details are absent, do not fabricate email, phone, office address or social links. Maintain `BLOCKED—USER INPUT` release status for public contact functionality.
- [ ] `P05.07` Do not show a fake working form. A form requires a verified submission backend, error/success states, privacy compliance and separate external-integration approval.
- [ ] `P05.08` If verified email later provided, use a correct `mailto:` plus clear text; test link and accessibility.

**404 and legal tasks:**
- [ ] `P05.09` Custom 404 with correct messaging, path back home and correct deployment HTTP status expectation.
- [ ] `P05.10` If business/legal copy is not approved, record `LEGAL CONTENT PENDING`. Do not publish invented policies; do not create an indexed dummy privacy page.
- [ ] `P05.11` Review meta descriptions/headings, correct business terminology and all internal links.
- [ ] `P05.12` Screenshots at mobile/tablet/desktop and phase report.

**Acceptance:** Home/About/404 content complete and truthful. Contact remains blocked for public launch if real contact method missing. No placeholder contact forms or dead links; unapproved legal content not generated.

## PHASE 06 — Responsive refinement across devices

**Goal:** Ensure CurioX feels designed for each form factor, not simply shrunk.

**Tasks:**
- [ ] `P06.01` Audit all routes at widths `[320,360,375,390,430,480,640,768,820,1024,1280,1440,1920,2560]` and multiple viewport heights.
- [ ] `P06.02` Fix actual overflows in grid children, `100vw` sections, SVG viewboxes, oversized typography, pseudo-elements, long links and navigation.
- [ ] `P06.03` Check header/footer menus at narrow widths and large text settings.
- [ ] `P06.04` Audit portrait/landscape and 200% browser zoom; maintain coherent heading wrapping, button text and ordering.
- [ ] `P06.05` Touch target dimensions and spacing; prevent accidental neighbour taps.
- [ ] `P06.06` Use container queries if component-based adaptation demonstrably helps; don't add arbitrary breakpoints for every device model.
- [ ] `P06.07` Check 1920–2560px for visually stretched blocks; constrain text measures and content width.
- [ ] `P06.08` Run automated viewport screenshot sequence; inspect/compare visual output manually; record any exclusions if tooling unavailable.

**Acceptance:** No clipped elements or unwanted horizontal scroll across stated widths, readable at 320px, usable tap targets, correct layout hierarchy and no disruptive reflow.

## PHASE 07 — Motion, Lenis, and immediate interaction feedback

**Goal:** Convey polish without degrading input response, scrolling, content discoverability or accessibility.

**Tasks:**
- [ ] `P07.01` Establish native-scrolling baseline and measured interaction performance before integrating any library.
- [ ] `P07.02` Implement CSS transitions for buttons/links/cards, typical 120–200ms and clear pressed state; avoid transformations that cause layout changes.
- [ ] `P07.03` Add tasteful reveal effects to secondary content using CSS/IntersectionObserver where necessary. **Never hide content permanently when JS is unavailable**; avoid animation on LCP hero text.
- [ ] `P07.04` Install `lenis` (current compatible version), add official recommended stylesheet and one animation-frame strategy (e.g. `autoRaf: true`, no duplicate RAF).
- [ ] `P07.05` Load/init Lenis conditionally on fine pointer/non-touch devices when user motion preference permits. Respect reduced motion; dispose instances on navigation/change where applicable.
- [ ] `P07.06` Maintain native touch scrolling by default; avoid `syncTouch` on mobile unless explicitly proven stable across target devices.
- [ ] `P07.07` Test anchors, hash navigation, browser back/forward, sticky header offsets, nested scrollers, menu open/close, focus movement, scroll restore.
- [ ] `P07.08` Compare enabled/disabled Lenis scroll smoothness, CPU/main-thread cost, CLS and interaction responsiveness on real or simulated devices. If it worsens metrics, disable it on affected profiles; explain tradeoff.
- [ ] `P07.09` Verify `prefers-reduced-motion`, no-JS content visibility, Chrome/Firefox/Safari behavior.
- [ ] `P07.10` Document choices and evidence.

**Acceptance:** No scroll-jacking; no stuck page/anchors, no duplicate RAF loops, immediate touch response, reduced-motion works, enhancement remains optional.

## PHASE 08 — Technical SEO, metadata and crawl safety

**Goal:** Deliver indexable, semantically correct public pages and safely non-indexable preview routes.

**Tasks:**
- [ ] `P08.01` Unique title, description and canonical for each approved page. Central config values; ensure `https://curiox.in` and chosen trailing-slash style are consistent.
- [ ] `P08.02` Correct `<html lang="en">`, H1 per page, logical heading hierarchy, nav landmarks, meaningful link text.
- [ ] `P08.03` Open Graph and X/Twitter preview tags with a locally owned design asset; don't claim logo exists. Provide dimensions and absolute URLs.
- [ ] `P08.04` `Organization` and `WebSite` JSON-LD grounded only in verified CurioX facts; no fake addresses, social profiles, ratings or products.
- [ ] `P08.05` Auto-generate XML sitemap only for approved, public pages. `robots.txt` references sitemap. Avoid unapproved legal/contact routes until launch-ready and avoid future Smriti routes.
- [ ] `P08.06` Correct static 404 behavior; confirm canonical URLs for all routes in built HTML.
- [ ] `P08.07` Cloudflare Pages preview noindex strategy: plan host-specific `X-Robots-Tag: noindex` rules for pages.dev or branch previews in `_headers` as supported, without applying noindex to production domain. Validate matching/precedence; **do not deploy**.
- [ ] `P08.08` Audit no duplicate titles, broken internal links, missing images, malformed JSON-LD or undesired indexing.
- [ ] `P08.09` Provide SEO inventory and phase report, noting Search Console verification is deferred to separate permission.

**Acceptance:** Accurate metadata in static output, schema validates, sitemap public-only, preview indexing plan documented, no fabricated structured data.

## PHASE 09 — Accessibility and semantic quality

**Goal:** Aim for WCAG 2.2 AA across all implemented routes.

**Tasks:**
- [ ] `P09.01` Run axe-core on all pages and key menu states; fix critical/serious issues.
- [ ] `P09.02` Keyboard-only walkthrough: skip link, focus order, menu toggle, Escape, restored focus, CTAs, external links.
- [ ] `P09.03` Check screen reader semantics with NVDA/VoiceOver where available; document limitations if unavailable.
- [ ] `P09.04` Test text/graphical contrast, including violet button, muted text, focus rings and interactive state contrast.
- [ ] `P09.05` Check meaningful alt text vs decorative SVG hiding, landmark structure, heading order, link names.
- [ ] `P09.06` Test text zoom to 200%, narrow viewport, high-contrast preferences and motion reduction.
- [ ] `P09.07` Ensure no autoplay distraction, unnecessary parallax or animation causing vestibular problems.
- [ ] `P09.08` Update QA matrix with test date, browser, viewport, method, issues and resolution evidence.

**Acceptance:** Zero known critical/serious automated violations, manual checks documented, remaining AA gaps explicitly listed (not hidden). All controls usable independently of a mouse.

## PHASE 10 — Performance, bundle, cache and security engineering

**Goal:** Meet or approach defined performance budgets with measured proof and sensible static-site security.

**Tasks:**
- [ ] `P10.01` Set up repeatable Lighthouse/Playwright performance procedure: same hardware/network profiles, ≥3 runs per key page/profile, compare medians and variability. Label lab vs field.
- [ ] `P10.02` Record Lighthouse Performance/Accessibility/Best Practices/SEO, LCP/CLS/TBT and JS transfer for Home, About and Contact (if publishable).
- [ ] `P10.03` Inspect waterfall, font preload, SVG assets, image encodings, resource priority, unused CSS/JS, long tasks.
- [ ] `P10.04` Remove unused dependencies/components/code; split enhancement JS; prevent hydration and third-party blocking scripts.
- [ ] `P10.05` Optimise asset formats, responsive sizing, below-fold loading and explicit dimensions. Confirm hero's actual LCP resource is prioritised.
- [ ] `P10.06` Optimize local fonts, caching and fallback; measure CLS from font swaps.
- [ ] `P10.07` Review Lenis/animations with performance profile; disable or simplify costly effects.
- [ ] `P10.08` Prepare `public/_headers` for appropriate security headers (e.g. no sniff, frame guard/CSP, referrer/permissions policy) and fingerprinted asset caching; avoid conflicting Cache-Control rules; verify Pages syntax against docs.
- [ ] `P10.09` Audit dependencies/security and make sure no secrets enter static output. Avoid `unsafe-inline` CSP unless a justified tested configuration requires it. Ensure inlined Astro scripts/styles work under final CSP.
- [ ] `P10.10` Confirm HTTP status expectations and correct compression assumptions for preview server; do not misrepresent local server measurements as actual Cloudflare CDN metrics.
- [ ] `P10.11` Produce performance report: before/after, exact commands, raw summary, budget deviations and remaining issues.

**Acceptance:** No avoidable critical bottlenecks; measured, repeatable results; justified budget exceptions; correct static asset/security config. INP in field stays a future measurement and must not be invented.

## PHASE 11 — Cross-browser regression, local release candidate and handoff

**Goal:** Create a thoroughly tested local release candidate and clear human decision package.

**Tasks:**
- [ ] `P11.01` Run clean install, typecheck, formatting/lint, unit tests (if useful), Playwright E2E, axe checks and production build.
- [ ] `P11.02` E2E coverage: nav to each public route, mobile open/close menu, no broken links, 404 behavior, keyboard focus, reduced-motion, no-JS fallback, console errors.
- [ ] `P11.03` Cross-browser checks in Chromium, Firefox, WebKit/Safari where available. Log unavailable real-device coverage as a limitation.
- [ ] `P11.04` Full-page screenshots at 320, 390, 768, 1440 and 1920 for main routes; inspect visual regressions. Store local screenshot paths.
- [ ] `P11.05` Check static `dist/` metadata, robots, sitemap, _headers, fonts and assets. Exclude unpublished product/legal placeholder routes.
- [ ] `P11.06` Run final content truthfulness/capitalisation check: CurioX, Smriti only if appropriately referenced, Curious Minds placeholder, Affordable language, no fake business details.
- [ ] `P11.07` Produce `docs/CURIOX_RELEASE_READINESS.md`: completed features, exact known blockers (logo/tagline/contact/legal), results, deployment prerequisites, known risks and rollback steps.
- [ ] `P11.08` Update `README.md` with local development, build/preview/test commands; include Cloudflare Pages *planned* settings (`dist`, framework Astro, actual pnpm build command).
- [ ] `P11.09` Request user review of visual captures and the pending content decisions. Do not change design decisions or publish while awaiting review.
- [ ] `P11.10` Final progress status: 00–11 DONE or clearly BLOCKED by missing user inputs; next action = user review/deployment approval, **not deployment itself**.

**Acceptance:** Locally runnable/reproducible release candidate, transparent reports and documented blockers, no remote modifications.

## PHASE 12 — Cloudflare staging and production (DO NOT EXECUTE without approval)

**Prerequisites:** Explicit approval to use Cloudflare Pages, specific repository, branch strategy and access scope; user-approved final logo/tagline/contact/legal information; vetted release candidate.

**Subphase 12A — approved staging only:**
- [ ] `P12.01` Inspect Cloudflare account/site and relevant DNS in read-only mode with user permission. Preserve existing email/MX/SPF/DKIM/DMARC and unrelated records.
- [ ] `P12.02` Confirm Pages Git integration or allowed deployment method, Node and pnpm build environment, output `dist`, build command, environment and branch settings.
- [ ] `P12.03` Create an approved preview deployment only after user consent. Confirm preview `noindex` response headers, correct redirects and no private data exposure.
- [ ] `P12.04` Run preview smoke tests and sample Lighthouse checks against the deployed URL; verify assets, headers, SSL, 404, social share metadata.
- [ ] `P12.05` Present preview results and ask **separate** approval for production/domain binding.

**Subphase 12B — approved production only:**
- [ ] `P12.06` Verify correct domain target (`curiox.in`, and www strategy), existing DNS snapshot, zero impact on email/other services. Do not overwrite unrelated records.
- [ ] `P12.07` Bind production custom domain and required DNS settings only with explicit user authorization; validate HTTPS, redirects and canonical host.
- [ ] `P12.08` Confirm production assets, navigation, sitemap, robots and noindex exclusions; run production smoke/performance tests.
- [ ] `P12.09` Record deployment version, change log, DNS diff, rollback instructions, URLs and remaining follow-ups.

**Do not self-authorize deployment just because local tests passed.**

## PHASE 13 — Postlaunch, monitoring, future Smriti (FUTURE; NOT INITIAL SCOPE)

- [ ] `P13.01` With approval, verify domain in Google Search Console and submit sitemap; keep facts/metadata accurate.
- [ ] `P13.02` Choose privacy-conscious analytics only with approved policy/cookie treatment; track visitor origin, performance, page engagement as lawfully configured; do not inject unwanted trackers.
- [ ] `P13.03` Capture real-world CWV/INP after sufficient traffic, especially mobile data; compare against initial lab budgets.
- [ ] `P13.04` Add a reusable product schema/template only when a product is ready. Once user provides Smriti context, design `/products/smriti`, accurate screenshots, app store links and validated SEO structured data.
- [ ] `P13.05` Consider `/products`, `/insights`, additional products, CMS or server functions only when justified by actual content and use cases.
- [ ] `P13.06` Maintain a regression/testing workflow and reviewed dependency updates. Do not run recurring remote work without separately configured automation and consent.

---

## 5. Suggested project file structure (evolve minimally)

```text
<project-root>/
├── AGENTS.md
├── README.md
├── package.json
├── pnpm-lock.yaml
├── astro.config.mjs
├── tsconfig.json
├── public/
│   ├── favicon.svg                 # temporary generic icon, not official logo
│   ├── robots.txt
│   ├── _headers                    # when appropriately prepared/tested
│   └── fonts/                     # legally sourced local WOFF2
├── src/
│   ├── assets/                    # local SVG/image assets
│   ├── components/
│   │   ├── layout/                # Header, Footer
│   │   ├── navigation/            # Mobile menu
│   │   ├── sections/              # Hero, Philosophy, Principles, Audience, etc.
│   │   ├── ui/                    # ButtonLink, Badge, SectionHeading, etc.
│   │   └── seo/                   # SEO metadata/schema helpers
│   ├── config/                    # site.ts, navigation.ts, seo.ts
│   ├── layouts/                   # BaseLayout.astro
│   ├── pages/                     # index, about, contact, 404
│   ├── scripts/                   # only when browser interaction is necessary
│   └── styles/                    # tokens, reset, global, utilities
├── tests/
│   ├── e2e/
│   ├── accessibility/
│   └── unit/                     # only when meaningful pure logic exists
└── docs/
    ├── CURIOX_MASTER_PLAN.md
    ├── CURIOX_PROGRESS.md
    ├── CURIOX_DECISIONS.md
    ├── CURIOX_DESIGN_SYSTEM.md
    ├── CURIOX_ARCHITECTURE.md
    ├── CURIOX_PERFORMANCE.md
    ├── CURIOX_QA_MATRIX.md
    ├── CURIOX_RELEASE_READINESS.md
    └── reports/
        ├── phase-00.md
        └── ... phase-11.md
```

Avoid needless abstractions and empty directories. Do not create legal/product/blog pages until their content requirements are real.

---

## 6. Test matrix and evidence contract

| Test | Method | When | Pass evidence |
|---|---|---|---|
| Static output | Astro production build | Phase 01 onward | `dist/` files and build log |
| Type safety | `astro check` / TS strict | Every code phase | Exit success, no relevant errors |
| Styles | Format/lint + manual review | Phases 02–11 | No invalid CSS, 0 radius for buttons |
| Functionality | Playwright E2E | Phases 03–11 | Passing routes/menu/links tests |
| Mobile 320px | Browser/Playwright screenshot | Phases 02–11 | No overflow/obscuration, usable taps |
| Responsive sweep | Viewport test set | Phases 04/06/11 | Tested widths/results table |
| Accessibility auto | axe-core | Phases 02,09,11 | Zero critical/serious findings |
| Accessibility manual | Keyboard/zoom/screen reader where available | 03,09,11 | Audited interaction record |
| SEO | HTML/sitemap/schema inspection | 08,11 | Unique titles/canonicals, valid data |
| Performance | repeated Lighthouse + network | 04 baseline; 10; 11 | Recorded settings, scores, medians |
| Browser matrix | Chromium/Firefox/WebKit | 06,09,11 | Results + known browser limitations |
| No-JS baseline | Browser disable JS | 03,04,07,11 | Content visible, navigation viable |
| Preview isolation | Header/status verification | Phase 12 only with consent | Noindex on previews; production indexable |

**Evidence rule:** If a command cannot run due to unavailable tools, mark `NOT_TESTED (reason)` and provide a reproducible command. Never report it as passed. Screenshots are not substitutes for accessible interaction tests, and Lighthouse is not a substitute for real-user INP.

---

## 7. Release blockers and design approval checklist

**Open user-dependent items:**

1. Final exact `Curious Minds` tagline.
2. Official CurioX logo and approved favicon/social preview treatment.
3. Verified email/phone/social/contact mechanism.
4. Approved privacy/legal/business disclosures where required.
5. Final visual approval on real desktop and 320px/mobile screenshots.
6. Exact Cloudflare account/project/repo/branch choices.
7. Separate approval for staging; separate approval for production/domain DNS changes.

**Never silently turn these into facts.** Local visual placeholders must be clearly labelled/provisional and excluded from launch if they render as incomplete.

**Launch-check items:**

- [ ] Wordmark/brand spelling accurate; correct title and all official assets approved.
- [ ] Design tokens and typography correct; all buttons square-edged.
- [ ] Home/About complete and truthful; Contact functional with approved details.
- [ ] Proper legal pages where applicable; no dead routes or empty product/insights pages.
- [ ] 320–2560px tested and screenshot review approved.
- [ ] Touch, keyboard, screen-reader/reduced-motion tests passed or gaps explained.
- [ ] Actual performance results documented; no high-severity issues.
- [ ] Metadata, canonical URLs, sitemap, robots, noindex preview logic correct.
- [ ] Static security/caching headers reviewed.
- [ ] Local RC approved and Cloudflare preview independently approved.
- [ ] Production deployment and DNS modifications separately authorized.

---

## 8. Suggested Codex mode and effort

**Preferred default:** GPT-6.1 Sol at **High** reasoning, if available in your Codex model selector. Use Medium for straightforward scaffolding, copy adjustments and routine fixes. Use GPT-6 Astra at High for architectural evaluation, difficult debugging and independent final review when available. Extra High should be reserved for unexpectedly challenging cross-cutting issues, not every phase. Follow the user's actual plan/availability in Codex; do not invent model options.

**Working style:** One phase at a time with tests, but continue automatically to the next **local** phase when authorized and previous gate passes. Keep each phase report concise with exact evidence and a resume pointer. If context is compacted, resume from files, not assumptions.

---

## 9. Ready-to-execute instructions (the agent must follow this section)

1. Read this complete document. If it arrived as pasted text rather than a repository file, save it as `docs/CURIOX_MASTER_PLAN.md` **before implementing source code**.
2. Generate the concise root `AGENTS.md`, progress file and decisions log as specified. Ensure `AGENTS.md` explicitly requires reading the master plan and progress every new Codex session.
3. Run Phase 00 discovery and document outcomes; if repo is safe and user has authorised local coding in the initiating instruction, proceed with Phases 01–11 **sequentially**, verifying each and recording results.
4. Treat any user-requested earlier stop/phase restriction as higher priority than this document's automatic-local-continuation provision.
5. Never deploy, push, commit, change DNS, connect Cloudflare or use external service accounts without distinct explicit user approval. Phase 12 and Phase 13 remain planning-only.
6. On each phase transition: update `CURIOX_PROGRESS.md`, append any material decisions, save `phase-NN.md`, reread the next phase and its prerequisites, then work within scope.
7. At the end, provide a clear summary of what is actually built/tested versus what remains blocked by user input, with exact local preview commands and screenshot paths.

### Mandatory first assistant response when this prompt is launched in Codex

> I will first save the persistent CurioX specification and agent instruction files in the project, inspect the local environment, and then execute the approved local phases in order. I will track evidence and progress in Markdown so work can resume across sessions. I will not deploy, push, connect Cloudflare or change DNS. Any missing official brand/contact/legal content will be recorded as a blocker rather than invented.

---

## 10. Official reference documentation (verify current status at execution)

- Codex project instructions and plans: https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex
- Codex long-horizon execution: https://developers.openai.com/blog/run-long-horizon-tasks-with-codex
- Astro: https://docs.astro.build/
- Astro 7 overview: https://astro.build/blog/astro-7/
- Cloudflare Pages / Astro: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- Cloudflare Pages `_headers`: https://developers.cloudflare.com/pages/configuration/headers/
- Lenis official repo: https://github.com/darkroomengineering/lenis
- Core Web Vitals: https://web.dev/articles/vitals
- Sitemap requirements: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

**End of master plan.**
