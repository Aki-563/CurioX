# Phase 04 — Homepage narrative

Verdict: DONE
Date: 2026-11-13 (Asia/Calcutta)
Objective: Original premium editorial homepage, truthful positioning and measurable baseline.
Tasks: P04.01–P04.20 (20 tasks).

Files: src/pages/index.astro, src/components/sections/CuriosityGraphic.astro, src/styles/home.css, scripts/{capture,baseline,performance}.mjs, tests/e2e/accessibility.spec.ts, performance doc, context/report.

Implementation: oversized three-line provisional Curious Minds headline; CTA before decorative artwork on mobile; original inline angular X ribbon/grid SVG hidden from accessibility tree (decoration, not corporate logo). Philosophy, Explore/Build/Make Accessible, violet inverted Affordable section, editorial audience rows, honest technology/AI curiosity and real About CTA. No products, stock imagery, fake metrics or capabilities. Provisional status exists in site config, H1 data attribute and visible label. H1 remains visible without scripts and is actual measured LCP.

Checks: npx --yes pnpm@12.18.0 check exit 0 (29 files, zero diagnostics); build:review exit 0; test:e2e --project=chromium exit 0 (13 passed, includes all four routes at 320/1440 + expanded menu axe, no violations); node scripts/capture.mjs 04 exit 0; node scripts/baseline.mjs 04 exit 0; node scripts/performance.mjs 04 --home --runs=1 exit 0 after runner correction. First Lighthouse attempt failed on browser connection to fixed port; switched to official chrome-launcher dependency and isolated ephemeral port.

Visual evidence: test-artifacts/phase-04/home-{320,390,768,1440,1920}.png; hero-{same widths}.png. Inspected full page desktop/mobile and full-resolution hero at 1440/320. Sharp, restrained violet identity; CTA visible before mobile decoration; no root overflow in current checks. Wider viewport sweep follows Phase 06. Human final visual approval remains pending.

Baseline Lighthouse (single run/profile, not final repeated benchmark), Chromium 158 on local Windows/Astro preview: mobile P100/A100/BP96/SEO100, LCP 904.98ms, CLS0, TBT0; desktop P100/A100/BP96/SEO100, LCP244.71ms, CLS0, TBT0. Transfer81551 measured encoded local bytes (Phase10 confirmed preview gzip; earlier uncompressed wording corrected). Raw test-artifacts/lighthouse-04/*.json. Immediate unthrottled trace: H1 LCP568ms mobile /88ms desktop, CLS0, no long tasks observed, inline navigation827 bytes, external script0 bytes, subresource74723 bytes. These are lab observations, not field CWV/INP or Cloudflare measurements. Full repeated procedure in Phase 10.

No brand approvals inferred. Final tagline/logo/contact/legal remain open. Resume: Phase 05 truthful About/Contact preview/404 and content review.

Later approved delta: D018 during Phase06 replaces the working headline with final “Curious Minds. Creating Tomorrow.” See Phase05 update and final captures/performance for current evidence. Baseline above retains original measured build; it is not mislabelled as final headline measurements.
