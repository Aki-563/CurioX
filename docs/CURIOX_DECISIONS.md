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
