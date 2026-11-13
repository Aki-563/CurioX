# Phase 10 — Performance and security

Verdict: DONE
Date: 2026-11-13 (Asia/Calcutta)
Objective: Repeatable budget evidence and tested static security/cache output.
Tasks: P10.01–P10.11 (11 tasks).

Files: public/_headers, scripts/{headers,build,build-review,serve-release,network-audit,static-audit}.mjs; package.json, src/styles/{home,pages}.css (removed obsolete provisional/contact-preview classes); src/scripts/navigation.ts (Escape fix); tests/e2e/security.spec.ts; playwright.config.ts; architecture/performance docs, QA/decisions/context/report. Prettier formatted authored source/docs while authoritative master/source and generated progress were excluded; SHA256 master unchanged.

Commands/results:

- pnpm audit --json exit0: zero advisories, all severities0; test-artifacts/dependency-audit.json.
- pnpm format, check, build, build:review, format:check exit0. Check46files zero errors/warnings/hints; release four pages, review five plus robots/sitemap. Both build wrappers generate exact inline SHA256 CSP hashes.
- security.spec all3engines exit0,3passed4.7s. Actual local responses enforce strict CSP with zero site violations/errors; fonts/dynamic script/menu work; immutable asset/one-day font headers; unknown/review paths404; prepared project/branch noindex host matching emulated, production path no noindex.
- CURIOX_PERF_URL=http://127.0.0.1:4322 node scripts/performance.mjs 10-final --runs=3 exit0:18 completed runs, every category100 in every run. Median LCP Home mobile912.69ms/desktop272.29ms; About911.69/262.46; Contact910.04/258.57. CLS0 all; mobile TBT medians28/7/0ms, max35ms; desktop0. Transfer84,261–92,777bytes. Exact min/max/settings/raw in performance doc and lighthouse-10-final.
- node scripts/network-audit.mjs exit0: conservative compressed executable JS7169bytes desktop/1708mobile or reduced; raw inline834bytes; font total70,544bytes. No third-party runtime requests. Trusted EventTiming sample click24ms/Escape16ms, not field INP.
- static-audit exit0 for four HTML pages, accurate canonicals/titles/schema/public-only sitemap, fonts/licences/social dimensions, safe header patterns; extended independent hash/secret scan rerun at gate.

Failures fixed: initial strict-CSP WebKit test exposed mouse-open Menu lacking focus; Escape listener moved to document with open-state guard, closes/restores focus in all engines. Interrupted first benchmark to correct source (partial files under lighthouse-10 excluded). Local QA server initially retained old hashes after rebuild; changed tool to reread header source per request, final tests pass. Strict policy was preserved; no unsafe-inline workaround.

Budget tradeoffs: fonts are unhashed and intentionally one-day cached, so Lighthouse has a non-scoring cache-lifetime opportunity. Small render-blocking CSS is intentional static styling. All numeric budgets pass. No avoided critical bottleneck; Lenis remains optional with measured small script cost and no touch/reduced dynamic JS. No video/raster hero or hidden reveal; H1 is LCP. Font-swap CLS0. BP96 baseline favicon404 resolved by explicit generic favicon. Early preview compression wording corrected: observed HTML/larger CSS/JS gzip, WOFF2 identity; no Cloudflare claim.

Security: self-only resources, two exact inline hashes (navigation and JSON-LD), no inline styles/unsafe-inline/eval, nosniff/frame guard/referrer/permissions policy. Single Cache-Control rule per asset class. Static build secret-pattern checks and anonymous public advisory audit; no credentials/accounts used. No actual edge validation/deployment. INP field data unavailable.

Visual evidence: Phase06 captures plus Phase09 forced-colors/semantic artifacts remain applicable; layout unchanged except small email wrapping refinement. Final cross-browser captures/QA in11. Outstanding D010 official assets, D012 legal text, visual review. Resume Phase11 clean reproducibility and local RC handoff.
