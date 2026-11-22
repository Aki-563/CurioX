# CurioX decisions

Date for initial entries: 2026-11-13 (Asia/Calcutta). Source: supplied authoritative master plan. No open choice is approved by implementation.

Current state: D009 is resolved by approved D018 final tagline; D011 is resolved for direct email by approved interim D019. D010 official logo/asset treatment and D012 legal/business text remain OPEN. Initial rows below are preserved history, not the current unresolved list.

2026-11-13 D023 PROVISIONAL — Question: static security/caching? Outcome: self-only CSP with build-derived exact SHA256 hashes (no unsafe-inline/eval), external CSS, frame guard/nosniff/referrer/permissions headers; /_astro one-year immutable, unhashed fonts one day. Reason: actual3engine CSP tests and static budgets pass while allowing honest asset updates. Alternatives: permissive inline policy/unhashed immutable assets rejected. Impact10–12. Actual Cloudflare matching still requires approved staging.

| ID   | Status      | Question / chosen outcome                             | Reason                              | Alternatives considered              | Phase impact                 |
| ---- | ----------- | ----------------------------------------------------- | ----------------------------------- | ------------------------------------ | ---------------------------- |
| D001 | APPROVED    | Brand spelling CurioX                                 | Explicit specification              | Other casing rejected                | All                          |
| D002 | APPROVED    | Smriti; product page deferred                         | No approved product scope           | Speculative page rejected            | 01–13                        |
| D003 | APPROVED    | Dark palette, #9351F3 accent                          | Supplied tokens                     | Other brand colours rejected         | 02–11                        |
| D004 | APPROVED    | Space Grotesk + Inter                                 | Explicit typography                 | System-only fallback for failure     | 02–11                        |
| D005 | APPROVED    | Zero-radius buttons                                   | Sharp identity                      | Rounded controls rejected            | 02–11                        |
| D006 | APPROVED    | Affordable positioning                                | Mission, no universal pricing claim | Free rejected                        | 04–11                        |
| D007 | APPROVED    | Cloudflare Pages target only                          | Static delivery                     | Workers unnecessary                  | 10–12                        |
| D008 | APPROVED    | English only                                          | Current scope                       | Speculative i18n rejected            | 01–11                        |
| D009 | OPEN        | Final exact Curious Minds tagline                     | User decision missing               | Provisional working headline allowed | 04,11; launch blocked        |
| D010 | OPEN        | Official logo/favicon/social treatment                | Asset missing                       | Accessible text wordmark provisional | 02,08,11; launch blocked     |
| D011 | OPEN        | Verified contact details/mechanism                    | No contacts supplied                | Fake email/form rejected             | 05,08,11; BLOCKED—USER INPUT |
| D012 | OPEN        | Business/legal disclosures/policy                     | Approved text absent                | Invented legal copy rejected         | 05,11; BLOCKED—USER INPUT    |
| D013 | PROVISIONAL | Static Astro/strict TS; versions pending verification | Plan requests version verification  | SSR/UI framework unnecessary         | 00–11                        |

Append dated decisions below; preserve original entries.

## 2026-11-13 — Implementation preflight

- D014 PROVISIONAL — Question: compatible toolchain? Outcome: Astro 7.4.11, pnpm 12.18.0, TypeScript 6.0.3, Node 24.16.0, pinned lock. Reason: public registry metadata and actual successful install/check/build. Alternative: TS 7 rejected because @astrojs/check peer supports only 5/6. Impact: 01–11. Does not change approved architecture or claim future updates approved.
- D015 PROVISIONAL — Question: contact without verified details? Outcome: local noindex preview only; exclude it from release output and navigation until D011 resolved. Reason: honest reviewable structure without fictitious functionality. Alternative: fake email/form rejected. Impact: 03,05,08,11. D011 remains OPEN.
- D016 PROVISIONAL — Question: palette file absent? Outcome: use the verbatim complete palette embedded in master §3.1. Reason: no separate CSS supplied, sufficient approved tokens exist. Alternative: inventing palette rejected. Impact: 02–11.

- D017 PROVISIONAL (2026-11-13) — Question: shell navigation while Contact blocked? Outcome: Home/About only, plus real About/#approach CTA; contact preview accessible only locally by URL. Reason: avoid unfinished public navigation. Alternative: publishing placeholder contact rejected. Impact: 03,05,08,11.

## 2026-11-13 — Explicit user content approval

- D018 APPROVED — Question: final tagline (resolves D009)? Outcome: “Curious Minds. Creating Tomorrow.” Exact user response. Replaces provisional “Curious Minds. Build What's Next.” No alternative selected. Impact: Home/config/metadata/11; tagline blocker resolved.
- D019 APPROVED (INTERIM) — Question: verified contact method (resolves D011 for mailto)? Outcome: user explicitly instructed “use akileshprimary@gmail.com for now”. Direct mailto plus visible address; no form/backend. Reason: approved functional contact without external integration. Alternative: contact preview superseded. Impact: navigation, Contact public route, sitemap/SEO,05/11. Email can be revised later; no email sent or account accessed. D015/D017 superseded for Contact only. Logo/legal remain OPEN.

- D020 PROVISIONAL (2026-11-13) — Question: desktop motion? Outcome: conditionally load Lenis1.3.27 on fine/hover non-touch≥1024px; oneautoRaf, native anchors/focus/history, cleanup on preferences/page lifecycle. Reason: sampled gradual wheel progression at small script cost; no touch/reduced JS. Alternatives: global Lenis/reveal effects rejected; native opt-out retained. Impact07–11. No reveal needed, P07.03 optional skip documented.
- D021 PROVISIONAL (2026-11-13) — Question: WebKit Windows Tab skips links? Outcome: explicit tabindex0 on anchors, no positive indices or reordered focus. Reason: observed native Tab/Alt+Tab skip; isolated reproduction and actual cross-engine tests pass after explicit0. Alternative: hiding failed keyboard check rejected. Impact03/07/09/11.

- D022 PROVISIONAL (2026-11-13) — Question: social/favicon before official logo? Outcome: original1200×630 typography/ribbon social PNG and generic square-grid favicon for local review. No logo schema field. Reason: reviewable social tags without inventing official logo. Alternative: external assets/permanent invented mark rejected. Impact08/11. D010 still OPEN pending final assets/treatment approval.

## 2026-11-13 — Initial Git publication authorisation

- D024 APPROVED — Question: may this local project be committed and pushed? Outcome: user explicitly requested git init, initial commit named first commit, main branch and push -u to https://github.com/Aki-563/CurioX.git. Reason: direct new user instruction supersedes earlier Git restriction for this publication. Preserve the completed README and commit the project source/docs/lockfile/licensed assets/tests, excluding generated artifacts and secrets. Alternatives: README-only boilerplate would omit the implemented project; force-push/history replacement is not authorised. Impact: repository handoff only; Phases12–13, Cloudflare, DNS and website deployment remain unauthorised.


## 2026-11-14 continuity recovery

This file was absent at the start of D035. Restored the committed historical baseline without overwriting an existing file. Later D025-D034 approvals and verification remain in CURIOX_MASTER_PLAN.md and CURIOX_PROGRESS.md; this restoration does not claim recovery of the missing uncommitted report wording.


## D025-D034 approved scope continuity

 — 2026-11-14 (D025/D026)

The user's newer instruction requests a significantly simpler site and a Products listing inspired by https://getartcraft.com/apps. Remove the header phrase “Technology. With curiosity.” now. Further section deletions are recommendations for review, not approved implementation choices. See `docs/CURIOX_SIMPLIFICATION_PLAN.md` for the reviewed inventory and proposed structure.

The Products listing is now within local planning scope, superseding the original blanket catalog deferral for that purpose. Smriti is the first named product; the user will supply its cover image and logo later. Product functionality, description, release status and destination remain unprovided: BLOCKED—USER INPUT for factual card content. Do not invent those details or add an empty indexed page, fake CTA or unsupported individual product route. `/products/smriti` remains deferred. This delta does not authorise executing other Phase 13 tasks or any remote/publication work.

### Implementation approval — 2026-11-14 (D027)

User explicitly approved building `/products/` now with a simple Smriti card, followed by artwork later. This supersedes the planning-only restriction above: implement an informational text-first card containing the approved name, with no invented purpose/status/link; add the route to navigation, metadata, sitemap and verification inventories. Missing optional details do not block this authorised minimal local page. All other bulk section deletions remain recommendations; no individual Smriti route or remote changes are authorised.

### Simplification implementation — 2026-11-14 (D028)

The user now explicitly authorises replacing the quoted long Home narrative with a Products section, simplifying About, removing the header Our approach button, cutting repeated slogans and using very simple English across the site. This supersedes the original multi-section requirements in Phases04/05 and the prior recommendations-only restriction. Home: approved tagline and short factual introduction, Products/Smriti section, compact email contact. About: concise company introduction, easy-to-use/affordable mission and one audience sentence. Shared footer and Contact are reduced to useful information/actions. Keep the separate Products route, exact brand/tagline, approved email, palette, fonts and square buttons. Remove only styles made unused by these edits; preserve unrelated work. Validate responsive layout, product heading hierarchy, anchors, navigation, accessibility and static output. No product facts/assets, deployment or remote changes are invented or authorised.

### Reference motion inventory and footer correction - 2026-11-14 (D029)

User requests analysis/listing of the public ArtCraft Apps animations and blur effects before adding them. Findings and relative (not benchmarked) costs are recorded in docs/CURIOX_MOTION_REFERENCE_AUDIT.md. Header/reveal changes remain proposals at this gate. Fix the reported short-page footer gap locally using a full-viewport flex column shell and expanding main; preserve normal footer flow and existing motion behavior. No new runtime dependency or remote action is authorised.

### Approved glass/menu/reveal implementation - 2026-11-14 (D030)

The user now authorises transparent glass header, blur-to-clear and staggered reveals from the prior inventory. Mobile/smaller navigation should follow Antigravity's compact top bar, close toggle, divided rows and expandable Products, adapted to CurioX and filling the entire viewport when open. This overrides D029's analysis-first gate and the old navigation style. Menu toggle/inset bar may use the reference's pill/rounded treatment as a specific exception to square controls; other buttons/cards remain square. Use actual CurioX routes/product names, preserve missing-fact constraints and native no-JS/reduced-motion accessibility, trap focus/inert background only while the mobile panel is open, and retain bottom footer behavior. No publication or new product detail route authorised.

### Header alignment correction - 2026-11-14 (D031)

User requests removing the repeated Products heading and matching closed/open mobile logo and menu-toggle placement. Keep one disclosure heading and preserve the same control geometry through closed/open/Products-expanded states. Open menu remains full screen. This refines D030's top-row geometry; no other scope or publication change.

### Scroll-aware header - 2026-11-14 (D032)

User explicitly requests the header slide upward out of view during scrolling, referring to Google Antigravity. Implement direction-aware hiding on downward scroll and return on upward scroll/top, preserving visible keyboard focus and active mobile/Products menus. Keep D031 control alignment and D030 glass/reveal behavior. Honour reduced motion; use a small passive, frame-throttled handler without new dependencies. Local development only.

### Dark menu control - 2026-11-14 (D033)

Use existing dark-violet surface/border and violet icon tokens for the mobile menu/close control instead of its white background. Preserve size, position, shape, focus treatment and behavior. Local color-only refinement.

### Full-width Products hover panel - 2026-11-14 (D034)

Desktop fine-pointer Products hover opens a full-viewport-width panel below the header, with container-aligned product links and smaller14px arrows/optional24px supplied-logo slots. Keep native keyboard/touch activation, outside/Escape dismissal, mobile full-screen accordion, uniform control geometry and scroll-header behavior. This supersedes the narrow desktop dropdown in D030. No new product facts/assets or remote scope.


## D035 APPROVED - 2026-11-14

User requests ease-in-out on Products hover and removal of the arrow shown beside Smriti. Remove decorative arrows from the header dropdown; add200ms opacity/8px translation ease-in-out opening and hover departure closing. Reduced motion skips animations; keyboard/Escape/outside/lifecycle cleanup stays immediate. Mobile remains a tap accordion. Reason: explicit user request. Impact: local03/11 only, no dependency or remote changes.

## D036 APPROVED - 2026-11-14

User explicitly authorises committing the current site changes and pushing to main on https://github.com/Aki-563/CurioX.git. Scope includes the simplification, Products listing, header/menu/motion refinements, tests and supporting documentation from D025-D035. This authorises source publication only; website deployment, DNS and external account changes remain excluded.

## D037 APPROVED - 2026-11-22

User requests a Smriti marketing page reached from the Products section, inspired by Apple product pages, coloured with Smriti's own accent and following the Smriti app UI, with a Google Play "Get it on" badge linking to `https://play.google.com/store/apps/details?id=com.connectingdots.smriti`. User approved using Play Store screenshots and anything from the Smriti repo (`D:\Smriti`), and requires full responsiveness down to 320px. This supersedes D027's deferral of individual Smriti pages and brings forward the `/products/smriti` part of P13.04 as local source work only.

- Route `/products/smriti/`; Products card, header dropdown and sitemap link to it.
- Scoped `.smriti` theme from Smriti `ThemeContext`: true black `#000`/`#1A1A1A`, light `#FFF`/`#F7F7F8`, ink `#0F172A`, accent `#0787FE` (dark) and `#0068D1` (light). Rounded corners apply only inside this page, matching the app; CurioX header/footer and square-button rule elsewhere are unchanged.
- Facts are limited to the Smriti Play listing description and `D:\Smriti\docs\SMRITI_COMPLETE_GUIDE.md`. No ratings, download counts or release claims.
- Assets: 8 Play Store screenshots cropped to the phone screen (`src/assets/smriti/*.png`), the repo app icon and 12 month covers; official Google Play badge stored unmodified at `public/badges/google-play-badge.png` with Google's trademark notice on the page.
- Motion reuses the existing reveal script; one optional CSS scroll-driven fan spread on the hero, disabled for reduced motion and unsupported browsers.
- No deployment, DNS, account or remote change is authorised by this decision.

## D038 APPROVED - 2026-11-22

User supplied the Smriti privacy policy (`https://sites.google.com/view/smriti-privacy-policy/home`, last updated 7 November 2026) and asked to use it, and asked for a thinner phone bezel with no other changes. Policy is reproduced verbatim at `/products/smriti/privacy/`, linked from the Smriti Privacy section and footnote, kept out of the sitemap (existing rule). Phone frame now uses a fixed `clamp(3px, 0.45vw, 6px)` border instead of percentage padding, which resolved against the parent width and looked thick.

D038 update (2026-11-22): user will remove the Google Sites copy, so the "Also published at" source link was removed; `/products/smriti/privacy/` is now the only published copy.

## D039 APPROVED - 2026-11-22

User asked for rounded product icons everywhere and a rigorous whole-site review (quality, wording, SEO, performance, responsiveness, richness, UI/layout/spacing) with bug fixes. Done with the design-critique framework plus a Playwright sweep (7 pages x 6 widths), Lighthouse, axe and the existing suite.

Fixes: app-icon rounding (22.5%) on Products card and header menu; About/Contact content now aligns with the header logo (`.simple-page` caps children, not the container); card eyebrow 11px → 12px; internal links use → instead of the external-link ↗; Smriti month covers request correct sizes on desktop (were blurry); Google Play badge resized 646 → 460px (unchanged artwork); only the centre hero phone gets high fetch priority; Smriti product card gains a cover captured from the Smriti hero (`public/products/smriti-cover*.webp`, 640w/1200w srcset).

## D040 APPROVED - 2026-11-22

On Smriti pages (`/products/smriti/` and its privacy page) the shared CurioX header, mobile menu, Products dropdown and footer use Smriti's accent blue and neutral black palette instead of CurioX violet, via token overrides on `body.smriti-page` in `smriti.css` and a per-page `theme-color` (#000). The wordmark "X" follows the accent and is blue there. Other pages are unchanged. Also fixed: My Library rail clipped the top of the phones on mobile (horizontal scroller clips vertically) — added vertical padding. Accessibility tests now share a `settle()` helper that waits for transitions/animations before axe scans (mobile-menu check was racing its fade-in on WebKit).


## D041 APPROVED - 2026-11-22

User supplied the final CURIOX logo collection (`Downloads\Logos\final-logos`, 19 versions on backgrounds plus 13 transparent versions, each SVG/PDF, transparent also PNG) and asked to use it across the site the way NVIDIA uses its logo, with a brand logo kit page. User also asked that the name be written **CURIOX** (all capitals) everywhere, that the favicon be `transparent/svg/symbol/curiox-symbol-purple-transparent.svg`, and that the CURIOX lettering be smaller in the header, footer and wherever the lockup appears.

- Assets: masters copied unchanged to `src/assets/brand/` (`svg/`, `transparent/`, manifests, README, OFL); all 77 files verified against the supplied SHA-256 manifests. Download kit in `public/brand/` (PDFs, overviews, SVG/transparent copies, `curiox-logo-kit.zip`).
- `scripts/brand-assets.mjs` derives web files from the masters without editing geometry: tightly cropped inline lockup/symbol (symbol uses `--logo-symbol`, lettering uses currentColor), favicon.svg (verbatim copy of the chosen file), favicon.ico (16/32/48, transparent), opaque white-on-#9351F3 apple-touch/192/512 icons for the web manifest, and the ZIP.
- Web lockup lettering is scaled to 78% about its left edge and the symbol centre (user request); the downloadable kit files keep the approved full-size lockup.
- Header and footer use the lockup (`Logo.astro` replaces `TextWordmark.astro`); Smriti pages use the approved white-on-black treatment instead of recolouring the mark blue (refines D040).
- New `/brand/` page (footer link "Brand", in sitemap): downloads, all 32 versions with per-file links, colours, wordmark note and usage rules taken from the kit README. Organization schema gains `logo`; social preview regenerated with the lockup; CSP gains `manifest-src self`.
- Trademark clearance is unverified (kit README); the site makes no trademark claim. No deployment, DNS or account change.

## D042 APPROVED - 2026-11-22

User asked for plain browser-tab titles: no "—"/"|" separators and no "CURIOX" in titles. Titles are now: Curious Minds. Creating Tomorrow. (home), Products, Smriti, Smriti Privacy Policy, About, Contact, Brand, Page not found. "Starting with Smriti" is removed everywhere (it was only in the home and Products meta descriptions). The link-preview image (`public/social-preview.png`, og/twitter image) is now `src/assets/brand/svg/symbol/curiox-symbol-purple-on-white.svg` rendered at 200px, centred on a white 1200×630 card; image alt "CURIOX logo". `og:site_name` stays CURIOX. The static audit enforces plain titles and the removed phrase. Social apps cache link previews, so old previews may persist until the deployed site changes and the cache refreshes. No deployment authorised.

## D043 APPROVED - 2026-11-22

User explicitly authorises committing the current changes and pushing to `main` on https://github.com/Aki-563/CurioX.git. Scope: D037–D042 work (Smriti page and privacy policy, site review fixes, Smriti theming, logo kit and Brand page, CURIOX casing, plain titles, link preview, cleanup and single-copy logo assets). Source publication only; no website deployment, DNS or account change.
