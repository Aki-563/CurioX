# CurioX progress

CURRENT_PHASE: 11
NEXT_ACTION: User reviews local UI and supplies pending product artwork/facts and official logo/legal inputs. D036 source changes pushed to origin main; no website deployment authorised.
Updated: 2026-11-14 (Asia/Calcutta)

D034 DONE: desktop Products hover opens a viewport-wide panel with container-aligned product links; 14px arrows and optional24px supplied-logo slots. Mobile accordion preserved. Check52 zero diagnostics, production/review builds and static audit pass; navigation+motion36/36 pass42.9s across3engines. Header axe0 violations and no overflow at1024/1440/1920/390; desktop/mobile screenshots inspected in ignored test-artifacts/mega-products/. Final formatting/diff checks recorded in phase11. No new dependencies or remote actions.

D033 DONE: menu control now uses dark-violet surface, subtle border and violet icon in both states; raised hover state. Production build/format pass; browser computed-style check confirms colors and6.326:1 icon contrast. Mobile screenshot inspected; test-artifacts/dark-toggle/ ignored. No geometry/script/remote changes; phase11 D033 report.

D032 DONE, 2026-11-14: direction-aware220ms header slide;12px directional threshold past96px top region; passive frame-throttled handler, open-menu/keyboard guards and reduced-motion support. Check52 zero diagnostics; production/review builds, static audit/format/diff checks pass. Navigation+motion33/33 pass34.4s across3engines, including D031 alignment and actual wheel scrolling. Local scroll-header screenshots/metrics confirm full hiding down and visible return up on mobile/desktop. Initial fixture mismatch and reveal-test race corrected; details in phase11 D032 amendment. No remote changes.

D031 DONE, 2026-11-14: removed repeated dropdown heading and matched logo/toggle geometry closed/open/expanded/reclosed. Open top row64px plus9px viewport padding matches closed inset/bar border. Zero-duration reduced-motion transitions prevent transient Chromium layout shift. Check52 zero diagnostics, production/review builds, static audit/format/diff checks pass. Navigation15/15 pass across3engines including coordinate regression at320/390/820/1023; expanded-menu axe/forced-colors6/6 pass. Screenshots and final metrics: test-artifacts/menu-alignment/ (ignored). Details/initial caught failure: reports/phase-11 D031. No remote changes.

D030 DONE, 2026-11-14:8px glass header,450ms once-only blur/fade/12px rise with75ms stagger (4px desktop/2px mobile), native Products disclosure and Antigravity-inspired full-viewport menu below1024px. Wordmark is Home; Products/About/Contact are header items. Full menu has scroll lock, inert background, focus containment/restore, Escape/resize cleanup and native no-JS fallback. Check52 files zero diagnostics, production/review builds, static audit and targeted formatting/diff checks pass. E2E114/114 pass2.6m across3engines, axe zero tested-rule violations. Six selected clean Home Lighthouse runs all categories100; mobile/desktop median LCP907/385ms, CLS0,TBT0. Runtime JS conservative gzip8096bytes desktop/2635mobile. Evidence: reports/phase-11 D030, docs/CURIOX_PERFORMANCE.md and ignored test-artifacts/glass-navigation/. Mobile/tablet/desktop/menu/dropdown captures inspected. No added dependencies or remote changes.

D029 DONE, 2026-11-14: public reference motion/scroll/blur audit saved with observed parameters, active-vs-prefetched distinction, relative cost estimates and proposed lightweight CurioX choices. No new effects applied at analysis-first gate. Fixed footer gap via full-viewport flex shell. Check51 zero diagnostics; production/review builds, static audit and targeted format/diff checks pass. Responsive/navigation30/30 pass47.8s across3engines, including new five-route/three-viewport footer regression. Contact desktop/mobile captures inspected; footer reaches1080 bottom at1920x1080. Evidence and limitations: reports/phase-11 D029 amendment; test-artifacts/artcraft-analysis/ ignored. No remote changes.

D028 simplification DONE, 2026-11-14: Home is now short intro + Products/Smriti + email contact; About and Contact use plain English. Removed long narrative sections, graphic/captions, hero/footer slogans and Our approach header CTA; reduced unused CSS. Check51 files zero diagnostics, production/review builds, static audit and targeted formatting pass. Full E2E99/99 pass (2.3m) across Chromium/Firefox/WebKit; axe zero tested-rule violations; responsive/keyboard/anchors/CSP checks pass. 16 screenshots at test-artifacts/simple-site/{home,about,contact,products}-{320,390,768,1440}.png; zero overflow in independent capture metrics, mobile/desktop inspected. Home main37 words, About32. See phase-11 D028 amendment for recovered tooling failures and exact scope. No lockfile/dependency-version change or remote publication.

Products implementation (D027), 2026-11-14: DONE — `/products/` with one informational Smriti card, shared navigation/sitemap/metadata and updated route/test inventories. Check (51 files, zero diagnostics), production/review builds, static audit, targeted formatting and diff whitespace checks all exit0. Full E2E 99/99 pass across Chromium/Firefox/WebKit (1.7m); Products axe has zero tested-rule violations and responsive sweep passes. Screenshots at test-artifacts/products/products-{320,768,1440}.png; mobile/desktop inspected. Existing user dev server preserved at http://127.0.0.1:4321/products/. No new dependencies or remote changes. Details: reports/phase-11.md D027 amendment. Artwork/optional facts remain pending, not blockers for the approved minimal page.

Simplification review, 2026-11-14: D025/D026 and docs/CURIOX_SIMPLIFICATION_PLAN.md record proposed cuts and a Products listing starting with Smriti. Removed only the explicitly rejected shared header slogan and unused CSS. Check/build/build:review/static audit exit0; targeted format check exit0; final navigation suite 6/6 pass across Chromium/Firefox/WebKit after browser installation. Desktop/mobile screenshots inspected at 1440/320; no overflow. Details and initial tooling failures: reports/phase-11.md amendment. Larger redesign/card facts remain pending review/user input; original phase completions remain historical.

Dependency setup, 2026-11-14: user requested dependency installation only. In D:\CurioX\CurioX, Node v24.21.0 / pnpm 12.18.0; `pnpm install --frozen-lockfile` exit0, 364 packages installed, lockfile unchanged. `pnpm check` exit0: 48 files, zero errors/warnings/hints. Next action remains the user review and content decisions above; no phase was reopened.

The original master plan text is preserved with a dated approved scope addendum for D025/D026. Historical bootstrap root was D:\CurioX with no source or Git repository; current checkout is D:\CurioX\CurioX. All phases/tasks below retain exact IDs. Task descriptions identify remaining work; DONE rows reference evidence in phase reports.

## Phase status

| Phase | Status | Evidence / blocker |
|---|---|---|
| 00 | DONE | 8/8 tasks DONE; reports/phase-00.md |
| 01 | DONE | 10/10 tasks DONE; reports/phase-01.md |
| 02 | DONE | 11/11 tasks DONE; reports/phase-02.md |
| 03 | DONE | 8/8 tasks DONE; reports/phase-03.md |
| 04 | DONE | 20/20 tasks DONE; reports/phase-04.md |
| 05 | BLOCKED | 11/12 tasks DONE; reports/phase-05.md |
| 06 | DONE | 8/8 tasks DONE; reports/phase-06.md |
| 07 | DONE | 9/10 tasks DONE; 1 optional skipped with reason; reports/phase-07.md |
| 08 | DONE | 9/9 tasks DONE; reports/phase-08.md |
| 09 | DONE | 8/8 tasks DONE; reports/phase-09.md |
| 10 | DONE | 11/11 tasks DONE; reports/phase-10.md |
| 11 | DONE | 10/10 tasks DONE; reports/phase-11.md |
| 12 | NOT_STARTED | 0/9 tasks DONE; NOT AUTHORISED |
| 13 | NOT_STARTED | 0/6 tasks DONE; NOT AUTHORISED |

## Verification

Final local gate, 2026-11-13:
- Forced frozen-lockfile reinstall exit0 (364 packages re-added); check exit0,48 files, zero diagnostics.
- Final lint/format:check exit0; first helper-format failure fixed.
- build/build:review, static audit/CSP hash/secret scan/contrast exit0.
- Playwright full suite exit0:90passed,0skipped/unexpected/flaky,72.742s; three engines.
- 75 final captures; representative all-engine/mobile/tablet/desktop views visually inspected.
- 18 final Lighthouse runs: all categories100, mobile median LCP0.910–0.913s,CLS0,maxTBT35ms.
- Dependency audit exit0,zero advisories. Release hashes match measured build; original/copied master hashes match.
- 123/125 tasks DONE,1optional reveal skip,1legal-content blocker; see phase11/readiness.
- Actual NVDA/VoiceOver,physical devices,browser-menu zoom,Cloudflare edge NOT_TESTED; limits in QA matrix.


## Tasks

| Phase | Task IDs | Status | Last verified | Evidence | Blocker |
|---|---|---|---|---|---|
| 00 | P00.01 | DONE | 2026-11-13 | [phase-00](reports/phase-00.md) | — |
| 00 | P00.02 | DONE | 2026-11-13 | [phase-00](reports/phase-00.md) | — |
| 00 | P00.03 | DONE | 2026-11-13 | [phase-00](reports/phase-00.md) | — |
| 00 | P00.04 | DONE | 2026-11-13 | [phase-00](reports/phase-00.md) | — |
| 00 | P00.05 | DONE | 2026-11-13 | [phase-00](reports/phase-00.md) | — |
| 00 | P00.06 | DONE | 2026-11-13 | [phase-00](reports/phase-00.md) | — |
| 00 | P00.07 | DONE | 2026-11-13 | [phase-00](reports/phase-00.md) | — |
| 00 | P00.08 | DONE | 2026-11-13 | [phase-00](reports/phase-00.md) | — |
| 01 | P01.01 | DONE | 2026-11-13 | [phase-01](reports/phase-01.md) | — |
| 01 | P01.02 | DONE | 2026-11-13 | [phase-01](reports/phase-01.md) | — |
| 01 | P01.03 | DONE | 2026-11-13 | [phase-01](reports/phase-01.md) | — |
| 01 | P01.04 | DONE | 2026-11-13 | [phase-01](reports/phase-01.md) | — |
| 01 | P01.05 | DONE | 2026-11-13 | [phase-01](reports/phase-01.md) | — |
| 01 | P01.06 | DONE | 2026-11-13 | [phase-01](reports/phase-01.md) | — |
| 01 | P01.07 | DONE | 2026-11-13 | [phase-01](reports/phase-01.md) | — |
| 01 | P01.08 | DONE | 2026-11-13 | [phase-01](reports/phase-01.md) | — |
| 01 | P01.09 | DONE | 2026-11-13 | [phase-01](reports/phase-01.md) | — |
| 01 | P01.10 | DONE | 2026-11-13 | [phase-01](reports/phase-01.md) | — |
| 02 | P02.01 | DONE | 2026-11-13 | [phase-02](reports/phase-02.md) | — |
| 02 | P02.02 | DONE | 2026-11-13 | [phase-02](reports/phase-02.md) | — |
| 02 | P02.03 | DONE | 2026-11-13 | [phase-02](reports/phase-02.md) | — |
| 02 | P02.04 | DONE | 2026-11-13 | [phase-02](reports/phase-02.md) | — |
| 02 | P02.05 | DONE | 2026-11-13 | [phase-02](reports/phase-02.md) | — |
| 02 | P02.06 | DONE | 2026-11-13 | [phase-02](reports/phase-02.md) | — |
| 02 | P02.07 | DONE | 2026-11-13 | [phase-02](reports/phase-02.md) | — |
| 02 | P02.08 | DONE | 2026-11-13 | [phase-02](reports/phase-02.md) | — |
| 02 | P02.09 | DONE | 2026-11-13 | [phase-02](reports/phase-02.md) | — |
| 02 | P02.10 | DONE | 2026-11-13 | [phase-02](reports/phase-02.md) | — |
| 02 | P02.11 | DONE | 2026-11-13 | [phase-02](reports/phase-02.md) | — |
| 03 | P03.01 | DONE | 2026-11-13 | [phase-03](reports/phase-03.md) | — |
| 03 | P03.02 | DONE | 2026-11-13 | [phase-03](reports/phase-03.md) | — |
| 03 | P03.03 | DONE | 2026-11-13 | [phase-03](reports/phase-03.md) | — |
| 03 | P03.04 | DONE | 2026-11-13 | [phase-03](reports/phase-03.md) | — |
| 03 | P03.05 | DONE | 2026-11-13 | [phase-03](reports/phase-03.md) | — |
| 03 | P03.06 | DONE | 2026-11-13 | [phase-03](reports/phase-03.md) | — |
| 03 | P03.07 | DONE | 2026-11-13 | [phase-03](reports/phase-03.md) | — |
| 03 | P03.08 | DONE | 2026-11-13 | [phase-03](reports/phase-03.md) | — |
| 04 | P04.01 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.02 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.03 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.04 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.05 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.06 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.07 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.08 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.09 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.10 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.11 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.12 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.13 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.14 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.15 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.16 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.17 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.18 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.19 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 04 | P04.20 | DONE | 2026-11-13 | [phase-04](reports/phase-04.md) | — |
| 05 | P05.01 | DONE | 2026-11-13 | [phase-05](reports/phase-05.md) | — |
| 05 | P05.02 | DONE | 2026-11-13 | [phase-05](reports/phase-05.md) | — |
| 05 | P05.03 | DONE | 2026-11-13 | [phase-05](reports/phase-05.md) | — |
| 05 | P05.04 | DONE | 2026-11-13 | [phase-05](reports/phase-05.md) | — |
| 05 | P05.05 | DONE | 2026-11-13 | [phase-05](reports/phase-05.md) | — |
| 05 | P05.06 | DONE | 2026-11-13 | [phase-05](reports/phase-05.md) | — |
| 05 | P05.07 | DONE | 2026-11-13 | [phase-05](reports/phase-05.md) | — |
| 05 | P05.08 | DONE | 2026-11-13 | [phase-05](reports/phase-05.md) | — |
| 05 | P05.09 | DONE | 2026-11-13 | [phase-05](reports/phase-05.md) | — |
| 05 | P05.10 | BLOCKED | 2026-11-13 | [phase-05](reports/phase-05.md) | USER INPUT — see report |
| 05 | P05.11 | DONE | 2026-11-13 | [phase-05](reports/phase-05.md) | — |
| 05 | P05.12 | DONE | 2026-11-13 | [phase-05](reports/phase-05.md) | — |
| 06 | P06.01 | DONE | 2026-11-13 | [phase-06](reports/phase-06.md) | — |
| 06 | P06.02 | DONE | 2026-11-13 | [phase-06](reports/phase-06.md) | — |
| 06 | P06.03 | DONE | 2026-11-13 | [phase-06](reports/phase-06.md) | — |
| 06 | P06.04 | DONE | 2026-11-13 | [phase-06](reports/phase-06.md) | — |
| 06 | P06.05 | DONE | 2026-11-13 | [phase-06](reports/phase-06.md) | — |
| 06 | P06.06 | DONE | 2026-11-13 | [phase-06](reports/phase-06.md) | — |
| 06 | P06.07 | DONE | 2026-11-13 | [phase-06](reports/phase-06.md) | — |
| 06 | P06.08 | DONE | 2026-11-13 | [phase-06](reports/phase-06.md) | — |
| 07 | P07.01 | DONE | 2026-11-13 | [phase-07](reports/phase-07.md) | — |
| 07 | P07.02 | DONE | 2026-11-13 | [phase-07](reports/phase-07.md) | — |
| 07 | P07.03 | SKIPPED_WITH_REASON | 2026-11-13 | [phase-07](reports/phase-07.md) | — |
| 07 | P07.04 | DONE | 2026-11-13 | [phase-07](reports/phase-07.md) | — |
| 07 | P07.05 | DONE | 2026-11-13 | [phase-07](reports/phase-07.md) | — |
| 07 | P07.06 | DONE | 2026-11-13 | [phase-07](reports/phase-07.md) | — |
| 07 | P07.07 | DONE | 2026-11-13 | [phase-07](reports/phase-07.md) | — |
| 07 | P07.08 | DONE | 2026-11-13 | [phase-07](reports/phase-07.md) | — |
| 07 | P07.09 | DONE | 2026-11-13 | [phase-07](reports/phase-07.md) | — |
| 07 | P07.10 | DONE | 2026-11-13 | [phase-07](reports/phase-07.md) | — |
| 08 | P08.01 | DONE | 2026-11-13 | [phase-08](reports/phase-08.md) | — |
| 08 | P08.02 | DONE | 2026-11-13 | [phase-08](reports/phase-08.md) | — |
| 08 | P08.03 | DONE | 2026-11-13 | [phase-08](reports/phase-08.md) | — |
| 08 | P08.04 | DONE | 2026-11-13 | [phase-08](reports/phase-08.md) | — |
| 08 | P08.05 | DONE | 2026-11-13 | [phase-08](reports/phase-08.md) | — |
| 08 | P08.06 | DONE | 2026-11-13 | [phase-08](reports/phase-08.md) | — |
| 08 | P08.07 | DONE | 2026-11-13 | [phase-08](reports/phase-08.md) | — |
| 08 | P08.08 | DONE | 2026-11-13 | [phase-08](reports/phase-08.md) | — |
| 08 | P08.09 | DONE | 2026-11-13 | [phase-08](reports/phase-08.md) | — |
| 09 | P09.01 | DONE | 2026-11-13 | [phase-09](reports/phase-09.md) | — |
| 09 | P09.02 | DONE | 2026-11-13 | [phase-09](reports/phase-09.md) | — |
| 09 | P09.03 | DONE | 2026-11-13 | [phase-09](reports/phase-09.md) | — |
| 09 | P09.04 | DONE | 2026-11-13 | [phase-09](reports/phase-09.md) | — |
| 09 | P09.05 | DONE | 2026-11-13 | [phase-09](reports/phase-09.md) | — |
| 09 | P09.06 | DONE | 2026-11-13 | [phase-09](reports/phase-09.md) | — |
| 09 | P09.07 | DONE | 2026-11-13 | [phase-09](reports/phase-09.md) | — |
| 09 | P09.08 | DONE | 2026-11-13 | [phase-09](reports/phase-09.md) | — |
| 10 | P10.01 | DONE | 2026-11-13 | [phase-10](reports/phase-10.md) | — |
| 10 | P10.02 | DONE | 2026-11-13 | [phase-10](reports/phase-10.md) | — |
| 10 | P10.03 | DONE | 2026-11-13 | [phase-10](reports/phase-10.md) | — |
| 10 | P10.04 | DONE | 2026-11-13 | [phase-10](reports/phase-10.md) | — |
| 10 | P10.05 | DONE | 2026-11-13 | [phase-10](reports/phase-10.md) | — |
| 10 | P10.06 | DONE | 2026-11-13 | [phase-10](reports/phase-10.md) | — |
| 10 | P10.07 | DONE | 2026-11-13 | [phase-10](reports/phase-10.md) | — |
| 10 | P10.08 | DONE | 2026-11-13 | [phase-10](reports/phase-10.md) | — |
| 10 | P10.09 | DONE | 2026-11-13 | [phase-10](reports/phase-10.md) | — |
| 10 | P10.10 | DONE | 2026-11-13 | [phase-10](reports/phase-10.md) | — |
| 10 | P10.11 | DONE | 2026-11-13 | [phase-10](reports/phase-10.md) | — |
| 11 | P11.01 | DONE | 2026-11-13 | [phase-11](reports/phase-11.md) | — |
| 11 | P11.02 | DONE | 2026-11-13 | [phase-11](reports/phase-11.md) | — |
| 11 | P11.03 | DONE | 2026-11-13 | [phase-11](reports/phase-11.md) | — |
| 11 | P11.04 | DONE | 2026-11-13 | [phase-11](reports/phase-11.md) | — |
| 11 | P11.05 | DONE | 2026-11-13 | [phase-11](reports/phase-11.md) | — |
| 11 | P11.06 | DONE | 2026-11-13 | [phase-11](reports/phase-11.md) | — |
| 11 | P11.07 | DONE | 2026-11-13 | [phase-11](reports/phase-11.md) | — |
| 11 | P11.08 | DONE | 2026-11-13 | [phase-11](reports/phase-11.md) | — |
| 11 | P11.09 | DONE | 2026-11-13 | [phase-11](reports/phase-11.md) | — |
| 11 | P11.10 | DONE | 2026-11-13 | [phase-11](reports/phase-11.md) | — |
| 12 | P12.01 | NOT_STARTED | — | Inspect Cloudflare account/site and relevant DNS in read-only mode with user permission. Preserve existing email/MX/SPF/DKIM/DMARC and unrelated records. | NOT AUTHORISED |
| 12 | P12.02 | NOT_STARTED | — | Confirm Pages Git integration or allowed deployment method, Node and pnpm build environment, output `dist`, build command, environment and branch settings. | NOT AUTHORISED |
| 12 | P12.03 | NOT_STARTED | — | Create an approved preview deployment only after user consent. Confirm preview `noindex` response headers, correct redirects and no private data exposure. | NOT AUTHORISED |
| 12 | P12.04 | NOT_STARTED | — | Run preview smoke tests and sample Lighthouse checks against the deployed URL; verify assets, headers, SSL, 404, social share metadata. | NOT AUTHORISED |
| 12 | P12.05 | NOT_STARTED | — | Present preview results and ask **separate** approval for production/domain binding. | NOT AUTHORISED |
| 12 | P12.06 | NOT_STARTED | — | Verify correct domain target (`curiox.in`, and www strategy), existing DNS snapshot, zero impact on email/other services. Do not overwrite unrelated records. | NOT AUTHORISED |
| 12 | P12.07 | NOT_STARTED | — | Bind production custom domain and required DNS settings only with explicit user authorization; validate HTTPS, redirects and canonical host. | NOT AUTHORISED |
| 12 | P12.08 | NOT_STARTED | — | Confirm production assets, navigation, sitemap, robots and noindex exclusions; run production smoke/performance tests. | NOT AUTHORISED |
| 12 | P12.09 | NOT_STARTED | — | Record deployment version, change log, DNS diff, rollback instructions, URLs and remaining follow-ups. | NOT AUTHORISED |
| 13 | P13.01 | NOT_STARTED | — | With approval, verify domain in Google Search Console and submit sitemap; keep facts/metadata accurate. | NOT AUTHORISED |
| 13 | P13.02 | NOT_STARTED | — | Choose privacy-conscious analytics only with approved policy/cookie treatment; track visitor origin, performance, page engagement as lawfully configured; do not inject unwanted trackers. | NOT AUTHORISED |
| 13 | P13.03 | NOT_STARTED | — | Capture real-world CWV/INP after sufficient traffic, especially mobile data; compare against initial lab budgets. | NOT AUTHORISED |
| 13 | P13.04 | NOT_STARTED | — | Add a reusable product schema/template only when a product is ready. Once user provides Smriti context, design `/products/smriti`, accurate screenshots, app store links and validated SEO structured data. | NOT AUTHORISED |
| 13 | P13.05 | NOT_STARTED | — | Consider `/products`, `/insights`, additional products, CMS or server functions only when justified by actual content and use cases. | NOT AUTHORISED |
| 13 | P13.06 | NOT_STARTED | — | Maintain a regression/testing workflow and reviewed dependency updates. Do not run recurring remote work without separately configured automation and consent. | NOT AUTHORISED |

## Git publication follow-up — 2026-11-13

User authorised initial commit and push to Aki-563/CurioX on main (D024). Repository initialised at the existing project root; origin configured; remote preflight found no existing refs. Source/docs publication is independent of blocked legal content and does not start Phase12. See reports/git-publication.md; actual commit/upstream verification is in Git state and local test-artifacts/git-publication.json after the operation. Previous phase statements about no Git operations are historical to their original verification gate.

D035 DONE:200ms ease-in-out desktop dropdown open/hover-close; decorative dropdown arrows removed. Reduced-motion/mobile/native keyboard preserved. Check52 zero diagnostics, production/review build/static audit/format/diff pass. Navigation24/24 pass33.4s across3engines; header axe0 and no overflow at4widths. Evidence and continuity recovery notes in phase11 D035.

## D037 Smriti product page - 2026-11-22

DONE 2026-11-22 (D037/D038). `/products/smriti/` and `/products/smriti/privacy/` built. Evidence: astro check 0 errors/0 warnings; static audit PASS (7 routes, 5 sitemap URLs); Playwright 144/144 pass on chromium/firefox/webkit; no overflow 320–1920px. Axe test now waits for time-based reveal animations before scanning (it was racing them). Next action: user review; commit/push needs new authorisation.

## D039 site review - 2026-11-22

DONE. Rounded icons; layout/size/image fixes per D039. Evidence: astro check 0 errors; static audit PASS; Playwright 144/144; sweep of 7 pages x 6 widths (320–2560) shows no overflow, tiny text, small targets, broken links or console errors; Lighthouse mobile 99–100 in all categories on all pages (CLS 0, TBT 0). Next action: user review; commit/push needs new authorisation.

## D041 logo kit and CURIOX casing - 2026-11-22

DONE. Evidence: 77 supplied files match manifest SHA-256; favicon.svg byte-identical to the chosen transparent symbol; `astro check` 0 errors/0 warnings; build + build:review OK; `audit:static` PASS (8 routes, 6 sitemap URLs, brand kit assets); Playwright 153/153 pass on chromium/firefox/webkit; no horizontal overflow at 320/1440 on /, /brand/, /products/smriti/. Next action: user review of header/footer logo size and /brand/; commit/push needs new authorisation.

## D042 plain titles and logo link preview - 2026-11-22

DONE. Evidence: `astro check` 0/0; build + build:review OK; `audit:static` PASS with new title/phrase guards; Playwright 153/153 on chromium/firefox/webkit; social-preview.png 1200×630 inspected. Next action: user review; commit/push needs new authorisation.

## Cleanup - 2026-11-22

User asked to remove unwanted test and other files. Removed ignored local output (`test-artifacts/` ~61 MB incl. earlier phase screenshots/Lighthouse runs, `test-results/`, `dist/`, `dist-review/`), unused `CuriosityGraphic.astro` (only the old social image used it), unused generated `curiox-symbol-inline.svg`, unlinked overview PNGs from `public/brand/` (masters kept in `src/assets/brand/`), and two empty `src/` folders. `brand-assets.mjs` no longer regenerates the removed files; kit ZIP now 910 KB. Evidence files cited in older phase reports no longer exist locally; rerun tests/scripts to regenerate. Verification after cleanup: check 0/0, both builds, static audit PASS, Playwright 153/153.

## Single copy of logo files - 2026-11-22

User asked why `public/brand` exists when everything is in assets. Logo files are now stored once in `src/assets/brand/` (PDFs moved there; README, manifest and complete PDF synced to the user's updated 32-version kit). `public/brand/` is git-ignored and rebuilt by `scripts/brand-assets.mjs`, which `dev`, `build` and `build:review` now run first. Pending changes 237 → 174. Verification: check 0/0, builds, static audit PASS, Playwright 153/153.

D043 DONE: commit a52d293 pushed to origin main (45d8d4b..a52d293), no force push; local and origin in sync. Added .gitattributes so logo masters (77 files, verified against manifest SHA-256 in the index) and binary assets are stored byte-exact. No deployment, DNS or account change.

## Cloudflare build fix - 2026-11-22

Cloudflare Pages build of a52d293 failed: `spawnSync zip ENOENT` (build image has no `zip`). `brand-assets.mjs` now writes the kit ZIP with a small built-in Node zlib writer (no external tool, no new dependency, deterministic bytes). Verified: two runs give identical ZIP; Windows Expand-Archive extracts 87 files byte-identical to the masters; fresh clone + clean install + `pnpm build` succeeds and static audit passes.
