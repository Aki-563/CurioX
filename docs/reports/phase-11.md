# Phase 11 — Local release candidate and handoff

Verdict: DONE
Date: 2026-11-13 (Asia/Calcutta)
Objective: Verified local RC, actual screenshots and clear remaining human decisions.
Tasks: P11.01–P11.10 (10 tasks; user visual review requested in final handoff, no publication). Phase05 legal-content task remains blocked; that is separate from completed local QA/handoff.

Files: README, tests/e2e/site.spec.ts (console/error/asset checks), scripts/capture.mjs (all3engines), release-readiness/source-inventory/screenshot docs, QA/progress/report. No application-source change after final performance build. Rebuilt release hashes match measured build exactly.

Observed commands/results (prefix npx --yes pnpm@12.18.0):

- install --frozen-lockfile --force exit0,364packages re-added,3.5s. Managed dependencies only; source/lock untouched.
- check exit0:48files,0errors/0warnings/0hints. No useful isolated pure application functions; no redundant unit suite fabricated.
- lint/format:check initially exit1 on network-audit helper; reformatted it, both final guards exit0.
- build:review exit0 five pages+robots/sitemap; build exit0 four pages+endpoints; generated CSP hashes2; static-audit exit0 for route/metadata/schema/asset/hash/secret checks.
- test:e2e exit0:90passed72.742s,0skipped/0unexpected/0flaky. Actual Chromium/Firefox/WebKit on Windows; all functional/a11y/responsive/motion/SEO/security tests included. No browser console error on public pages, no failed assets.
- node scripts/capture.mjs 11 --all-browsers exit0:75screenshots, all four routes+hero at320/390/768/1440/1920. Representative full-resolution desktop/mobile/Firefox/WebKit captures inspected; final email no longer leaves a trailing single-letter line at320. No unexpected layout/font/CTA regression observed.
- contrast script exit0,11pairs pass; actual button normal5.816/hover5.417/pressed7.661/focus5.816. Axe zero tested-rule violations in final suite.
- SHA256 comparison exit0: final dist byte-for-byte identical to all measured performance-build files. Source/copy master hash unchanged. Final artifact/counter/format checks recorded in progress after document completion.

Evidence: test-artifacts/e2e-results.json; phase-11/{home,about,contact,404,hero}-{320,390,768,1440,1920}.png; firefox/ and webkit/ subfolders with same names; semantics/; forced-colors-_.png; button-contrast-_.json; static-audit.json; final-build-manifest.json. Screenshot index provides direct links. Screenshots are local and ignored.

Performance evidence carried forward without unnecessary repeat because exact dist hashes match:18completed Lighthouse runs, every category100; mobile median LCP0.910–0.913s, CLS0, maxTBT35ms; desktopJS conservative gzip7169bytes, mobile1708. See performance doc for all medians/ranges/settings and compression limitations. No field INP or actual CDN measurements.

Truthfulness audit: exact CurioX casing, final approved Curious Minds tagline, approved interim email, Affordable positioning; no Smriti/products route/features, unsupported company metrics/address/social profiles, fake form or dummy legal content. Logo/social/favicon treatment explicitly provisional in docs, not claimed official. Sitemap only3public content routes;404/review non-indexable and review absent release output.

Limits: no physical devices, actual NVDA/VoiceOver narration or browser-menu zoom; effective200% reflow/text resizing/emulated touch pass. Local `_headers` enforcement/matching test does not replace future approved Cloudflare checks. Mail client sending not exercised. No known critical/serious automated or functional defect remains. Official assets/legal/visual approval hold launch.

Final status:123/125local tasks DONE,1optional skip(P07.03),1BLOCKED—USER INPUT(P05.10).11local phases DONE;05partial/blocked. User review of screenshots and missing official logo/legal copy is next.12/13 remain NOT_STARTED and NOT AUTHORISED. No deployment, staging, Git commit/push, external account access, credentials or DNS changes. Local QA servers stopped for handoff; restart instructions in README.

Final handoff verification: check48files zero diagnostics; lint/format/static audit exit0. Ports4321 and4322 confirmed stopped. Inventory90created files including27application source files;19release files;75final screenshots. Optional empty setup directories retained after cleanup command was rejected; handoff files generated without deletion. No unrelated files modified.


## 2026-11-14 continuity recovery

This file was absent at the start of D035. Restored the committed historical baseline without overwriting an existing file. Later D025-D034 approvals and verification remain in CURIOX_MASTER_PLAN.md and CURIOX_PROGRESS.md; this restoration does not claim recovery of the missing uncommitted report wording.

## 2026-11-14 - Products hover easing (D035)

Scope: Header.astro removes dropdown decorative arrows; navigation.ts adds200ms ease-in-out opacity/8px translation on desktop opening and hover departure closing; navigation.css eases link colors. Rapid reentry/focus cancels pending animation, immediate dismissal/lifecycle cancels it, reduced-motion skips/cancels, mobile native accordion unchanged. Navigation regression verifies opening/closing easing and reduced motion; desktop-width test now asserts arrow absence.

Observed check exit0:52files zero diagnostics; build/build:review/static audit exit0; targeted formatting and git diff whitespace pass. Screenshot/axe probe exit0 at1024/1440/1920/390: no overflow, zero header tested-rule violations; current desktop screenshot inspected, no dropdown arrows. Evidence test-artifacts/mega-products/ (ignored). No new performance claims/full suite rerun. Local user dev4321 preserved; no remote work.

Tooling: formatter initially missing; frozen forced dev dependency relink restored364 packages without package/lockfile change. Four documentation files were already absent at start; restored only absent files from committed baseline, explicitly noting unrecovered uncommitted wording and preserving later approvals from master/progress. First animation test expected numeric opacity while browsers serialize strings; normalized. Subsequent test missed a200ms closing animation under cross-browser scheduling; test now pauses at animation creation for deterministic inspection. These are test harness corrections, not claimed application defects. Final browser result appended below.

Final D035 verdict: DONE. Navigation24/24 passed33.4s across Chromium/Firefox/WebKit, including ease-in/out/reduced motion, arrow absence, fullwidth hover, desktop keyboard/outside/Escape and mobile geometry/focus/scroll checks. Next: user reviews http://127.0.0.1:4321/. Optional product artwork/facts and official logo/legal inputs pending.

D036: User authorises commit/push of current D025-D035 changes to existing origin main. Fetched origin/main successfully; before commit HEAD and origin/main both d4b6bb4, divergence0/0. Existing D035 validation remains the current code evidence; no code changes in this publication step. Generated artifacts/dependencies remain ignored. Website deployment remains unauthorised.
