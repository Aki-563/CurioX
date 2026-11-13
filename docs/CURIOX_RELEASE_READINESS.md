# CurioX local release candidate

2026-11-13 (Asia/Calcutta). Local RC ready for user review. Launch held for official asset/legal/visual approval. Nothing deployed, published, committed, pushed or connected to an external account. Phases12–13 NOT_STARTED/NOT AUTHORISED.

Phases00–04 and06–11 are locally DONE. Phase05 has11/12 tasks done; P05.10 remains BLOCKED—USER INPUT: LEGAL CONTENT PENDING. Across authorised phases:123 DONE,1 optional SKIPPED_WITH_REASON (P07.03 reveal animation unnecessary),1 BLOCKED. All125 task IDs retained in progress and12 phase reports. Unavailable methods documented under evidence rule, never claimed as passed.

## What is built

Home, About, approved-email Contact and custom404. Premium dark/electric-violet editorial system, original angular X decoration (not logo), Space Grotesk+Inter self-hosted OFL WOFF2, square buttons, responsive grid/rules and meaningful links. Text-only wordmark is temporary. Approved final headline **Curious Minds. Creating Tomorrow.** Approved interim mailto **akileshprimary@gmail.com**; no form, fabricated contacts, products or claims.

Astro7.4.11/strict TypeScript6.0.3, pnpm12.18.0, Node24.16.x. Entirely static output, minimal progressive JS, native touch/reduced scrolling, conditional Lenis for eligible desktops; no hydration, analytics, server endpoint or unnecessary UI framework. Design gallery exists only locally/review output. Three public sitemap URLs, unique metadata/canonicals/OG/X and grounded Organization/WebSite schema. Original social graphic/generic favicon are provisional treatments awaiting asset approval.

## Verification

- Forced lockfile reinstall exit0:364 dependency packages re-added from local store, no lock changes. Typecheck exit0:48 files,0errors/0warnings/0hints.
- Final lint/format guard exit0; initial guard caught network-audit helper formatting, corrected and rerun successfully. Both review/release builds exit0; exact output route inventory passes.
- Playwright final90/90 passed,0skipped/0unexpected/0flaky,72.74s. Chromium158, Firefox159, WebKit27.2 on Windows. Functional links/hash destinations/404/menu/history/keyboard/focus/no-JS/reduced/touch/console/assets, accessibility, responsive, SEO and strict-CSP actual-response checks included.
- All14 specified widths320–2560, four routes, three engines:168 combinations;36 additional short-height profiles.200% text sizing and effective200% viewport reflow pass. No root overflow, layout/heading bounds pass,1360px content maximum and≥44px control heights.
- Axe tested A/AA rules:zero violations on four routes320/1440, expanded menu and gallery. Keyboard-only tab order, skip/menu/Escape/focus restoration pass all engines. Actual primary contrast normal5.816,hover5.417,pressed7.661,focus5.816;11static pairs pass. Forced-colors/reduced-motion captures inspected.
- Lighthouse18 final runs (3pages×2profiles×3):all four categories100 in every run. Mobile median LCP Home0.913s/About0.912s/Contact0.910s; desktop0.272/0.262/0.259s. CLS0 all; TBT max35ms. Total transfer84,261–92,777bytes. Conservative executable JS gzip7,169bytes desktop/1,708mobile-reduced. All budgets pass. Local lab only, no field INP/CDN claims.
- Anonymous dependency audit exit0:zero advisories/all severities. No secrets detected by output pattern scan; no credentials used. SHA256 script CSP, no inline styles/unsafe-inline/eval. Actual local security/cache responses pass3engines. Prepared preview-host rules inspected/emulated, real Cloudflare behavior untested.
- Final release output hashes exactly match the measured performance build. See test-artifacts/final-build-manifest.json and performance-build-manifest.json. Authoritative master SHA256 unchanged:3FBF48ED6A8779AE50F2293B2EE315F4942BEA78C17810F9A8E2C1C2CD1E141E.

Detailed evidence: [QA matrix](CURIOX_QA_MATRIX.md), [performance](CURIOX_PERFORMANCE.md), [SEO](CURIOX_SEO.md), [architecture](CURIOX_ARCHITECTURE.md), [phase reports](reports/phase-11.md), [source inventory](CURIOX_FILE_INVENTORY.md), [screenshot index](CURIOX_SCREENSHOTS.md). Raw local artifacts in test-artifacts/ are ignored; not uploaded.

## Review package and remaining inputs

Please review the actual desktop/mobile captures in [screenshot index](CURIOX_SCREENSHOTS.md), particularly Home, About and Contact at320/390 and1440/1920.75 final captures cover four routes+hero at320/390/768/1440/1920 in all3engines. No design approval is inferred from passing tests.

1. D010 OPEN: official CurioX logo and approval/replacement of temporary text-wordmark/favicon/social treatment.
2. D012 OPEN: approved business/legal disclosures and privacy/policy text as applicable. No invented legal page exists; P05.10 remains blocked.
3. Final visual approval on real screenshots. Tagline and interim email are already approved (D018/D019), no reconfirmation needed.
4. Actual NVDA/VoiceOver narration, physical devices and browser-menu200% zoom still untested. NVDA not found in PATH/standard locations, VoiceOver unavailable on Windows, visible-browser provider unavailable. AX semantics, forced colours, effective zoom and emulated touch pass; no WCAG certification claimed.
5. Exact future Cloudflare account/project/repository/branch/host strategy and permissions remain unselected. Distinct staging approval and later distinct production/DNS approval required. Analytics/Search Console future only.

Minor non-blocking tradeoff: unhashed fonts deliberately use one-day cache, so Lighthouse notes a cache-lifetime opportunity despite100score/budgets. No known critical/serious automation issue, broken link or functional defect remains. Mailto availability depends on the visitor's configured mail client; no message sending was tested or authorised.

## Run locally and preserve the candidate

In D:\CurioX: `npx --yes pnpm@12.18.0 dev`, then open printed URL, normally http://127.0.0.1:4321. Stop with Ctrl+C. Full build/preview/test commands in [README](../README.md). For actual local header verification use build then preview:secure (port4322). Servers used by the agent are stopped at handoff; no background service left running.

Keep source+pnpm-lock.yaml and matching dist/_headers+HTML together. The candidate is reproducible locally; no Git repository was supplied or initialised. Before any future deployment, approve content/assets, choose repository/branch/platform scope, rerun relevant checks and staged edge tests, and preserve a checksum-labelled copy of the vetted output. The local snapshot/manifest is not a production backup.

## Future deployment prerequisites and rollback plan (instructions only)

Planned Pages settings: framework Astro, Node24.16.x, pnpm12.18.0, build `pnpm build`, output `dist`, no adapter/Functions. Stage only with explicit authorisation. Validate both preview noindex host patterns, actual response CSP/cache/compression/SSL/404 and canonical host. Report preview results; obtain separate production/domain approval. Preserve email DNS and unrelated records.

Before any approved change, record current deployed version/settings and a read-only DNS snapshot. If a future approved deployment regresses, restore the prior vetted deployment version and verify routes/assets/headers. Revert only explicitly changed DNS records from the snapshot with authorisation; never overwrite unrelated email records. No deployment version or DNS backup is claimed now because no external account was accessed. Resume from current progress; never automatically start12.

## Subsequent authorisation — Git only

On2026-11-13 the user explicitly authorised initial commit/push of this source project to https://github.com/Aki-563/CurioX.git on main. D024 and reports/git-publication.md record this later exception to the original local-only Git restriction. Earlier no-Git statements above describe the original RC handoff. No website deployment, Cloudflare integration, DNS change or Phase12/13 execution is authorised. Confirm the actual commit/push from Git history/upstream state and local test-artifacts/git-publication.json.
