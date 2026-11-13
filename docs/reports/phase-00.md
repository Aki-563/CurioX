# Phase 00 — Discovery and preflight

Verdict: DONE
Date: 2026-11-13 (Asia/Calcutta)
Objective: Establish a safe root, verified stack and scope constraints.
Tasks: P00.01, P00.02, P00.03, P00.04, P00.05, P00.06, P00.07, P00.08.

Files touched: AGENTS.md, docs/CURIOX_MASTER_PLAN.md, docs/CURIOX_PROGRESS.md, docs/CURIOX_DECISIONS.md, scripts/context.mjs, this report. Source specification unchanged.

Root D:\CurioX originally contained only CURIOX_CODEX_MASTER_PLAN.md. No Git repository, existing source, fonts, media, logo or separate palette CSS. Use exact embedded §3.1 colour tokens; override rounding with 0px. Missing separate CSS is informational because the authoritative plan includes all colour values.

Observed commands: Get-Location/rg --files exit 0; UTF-8 full plan reads exit 0; Copy-Item/Get-FileHash exit 0. Master source and copy SHA256: 3FBF48ED6A8779AE50F2293B2EE315F4942BEA78C17810F9A8E2C1C2CD1E141E. node --version v24.16.0; npm --version 11.13.0; git --version 2.54.0.windows.1 (all exit 0). git status exit 128: no repository. pnpm command unavailable; use npx --yes pnpm@12.18.0. No Git changes attempted.

Public npm metadata queries exit 0: Astro 7.4.11 requires Node >=22.23.4; pnpm 12.18.0; TypeScript 7.0.2; Playwright 1.65.0 (Node >=20); Lenis 1.3.27; Fontsource variable Space Grotesk/Inter 5.3.0, OFL-1.1. Node 24.16.0 satisfies reported engines. Install compatibility will be verified by actual checks; package manager lock pins resolved dependencies.

Official references read: [Astro installation](https://docs.astro.build/en/install-and-setup/), [v7 migration](https://docs.astro.build/en/guides/upgrade-to/v7/), [Cloudflare Astro](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [Pages headers](https://developers.cloudflare.com/pages/configuration/headers/), [Lenis](https://github.com/darkroomengineering/lenis), [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/2/basic-types.html), [Playwright](https://playwright.dev/docs/intro).

Strategy: static Astro output, strict TypeScript, native CSS, vanilla browser scripts. No server adapter, Workers, Rust or WASM: no runtime computation requiring them. Canonical https://curiox.in, trailing slash, Home/About public; Contact local-only until verified. No products/blog/legal filler. No external account access or deployment.

Accessibility/visual/performance: not applicable to preflight; no rendered site exists. Test tools/browsers will be installed locally. Screen-reader/real-device availability remains to be established.

Decisions: D001–D013 recorded. D009–D012 remain OPEN; tagline/logo/contact/legal and visual approval block launch. Resume: Phase 01 static skeleton and clean build.
