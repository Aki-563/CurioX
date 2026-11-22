# CURIOX

Local-only static Astro corporate site. Read AGENTS.md and docs/CURIOX_MASTER_PLAN.md first. No deployment is authorised.

Latest UI (D030): glass header, short staggered blur-to-clear reveals, and an Antigravity-inspired full-screen mobile/tablet menu. Products expands to Smriti and the full listing. Home is available through the wordmark. Reduced motion and no-JS fallbacks are supported. Test screenshots: `test-artifacts/glass-navigation/` (ignored).

Current design (D028): short Home introduction, Smriti in an on-page Products section, and an email contact row. About and Contact use short, plain English. The header/footer are reduced to essential navigation; no Our approach button or repeated slogans. `/products/` remains available as a separate listing. New screenshots: `test-artifacts/simple-site/` (local and ignored).

Requires Node 24.16+ (24.x). pnpm12.18.0 is pinned. The commands below work without a global pnpm installation.

```powershell
npx --yes pnpm@12.18.0 install --frozen-lockfile
npx --yes pnpm@12.18.0 dev
```

Open the printed local URL (normally http://127.0.0.1:4321). Stop with Ctrl+C. Home, Products, About and Contact are implemented. Open `/products/` for the simple Smriti card; add approved details and future cover/logo paths in `src/config/products.ts`. Approved tagline: **Curious Minds. Creating Tomorrow.** Contact uses the approved interim email **akileshprimary@gmail.com** via a direct mailto link. No form/backend or tracking.

Build and preview release output:

```powershell
npx --yes pnpm@12.18.0 check
npx --yes pnpm@12.18.0 build
npx --yes pnpm@12.18.0 preview
# Or test actual prepared security headers and gzip at http://127.0.0.1:4322:
npx --yes pnpm@12.18.0 preview:secure
```

Use one preview command at a time per port. Astro preview does not enforce Cloudflare _headers; the secure preview is a local QA tool. Both bind only to127.0.0.1. No runtime server is required for the site.

Full local checks (build both outputs first; Playwright starts/reuses review4321 and secure4322):

```powershell
npx --yes pnpm@12.18.0 exec playwright install chromium firefox webkit
npx --yes pnpm@12.18.0 build:review
npx --yes pnpm@12.18.0 build
npx --yes pnpm@12.18.0 check
npx --yes pnpm@12.18.0 lint
npx --yes pnpm@12.18.0 format:check
npx --yes pnpm@12.18.0 test:e2e
npx --yes pnpm@12.18.0 test:contrast
npx --yes pnpm@12.18.0 audit:static
node scripts/capture.mjs 11
```

`lint` is the restrained Prettier format guard; `check` provides Astro/TypeScript diagnostics. No speculative unit-test suite; application behaviour is covered by E2E. Gallery `/review/components/` exists only in dev/review output. dist-review is never a publication artifact. The Products listing is included; individual product detail pages, blog and dummy legal routes remain deferred.

Performance repeat (run secure preview in another terminal; keep other browser workloads idle):

```powershell
$env:CURIOX_PERF_URL = 'http://127.0.0.1:4322'
node scripts/performance.mjs 10-final --runs=3
```

Source: src/pages, layouts, components, styles, scripts and config. Project memory: AGENTS.md and docs/CURIOX_{MASTER_PLAN,PROGRESS,DECISIONS}.md. [Architecture](docs/CURIOX_ARCHITECTURE.md), [design system](docs/CURIOX_DESIGN_SYSTEM.md), [QA](docs/CURIOX_QA_MATRIX.md), [performance](docs/CURIOX_PERFORMANCE.md), [SEO](docs/CURIOX_SEO.md), [release readiness](docs/CURIOX_RELEASE_READINESS.md). Local screenshot/report artifacts: test-artifacts/ (ignored), phase reports: docs/reports/phase-00.md through phase-11.md. The original master plan is preserved with dated approved scope addenda (D025?D027).

Static output: dist. Build automatically derives exact inline-script CSP hashes into dist/_headers; keep it with matching HTML. public/_headers is the strict source baseline. Fonts are locally served OFL-licensed WOFF2 with licence files. Text wordmark/social art/generic favicon remain provisional asset treatment until official logo approval. Legal content still pending. No credentials required for local work.

Planned Cloudflare Pages settings only: framework Astro; build `pnpm build`; output `dist`; Node24.16.x; pnpm12.18.0; no SSR adapter. Actual Cloudflare account/project/DNS decisions, staged edge checks and website publication require separate approval. Phases12–13 were not executed. The user separately authorised initial Git publication to [Aki-563/CurioX](https://github.com/Aki-563/CurioX) on `main` (D024); no hosting integration is authorised by that instruction.
