# ArtCraft Apps motion and blur audit

Implementation follow-up D030 (2026-11-14): user subsequently approved glass header, blur-to-clear and staggered reveals, plus Antigravity-inspired full-screen mobile navigation. These now exist locally, using native CSS/IntersectionObserver/Web Animations and existing Lenis; no GSAP added. The proposed status below describes the earlier analysis gate, not the current implementation. Details and fresh QA are in the D030 phase-11 amendment.

Date: 2026-11-14 (Asia/Calcutta). Target: https://getartcraft.com/apps. Scope: public delivered HTML/CSS/JS, desktop scrolling/card hover, mobile menu and reduced-motion profiles. Findings use ordinary Playwright and served-asset inspection, not REA evidence records. No accounts, private endpoints or remote modifications involved.

## Main finding

Two distinct blurs create the look: content becomes sharp using `filter`; translucent panels blur what is behind them using `backdrop-filter`. The delivered page uses Next.js/React, Tailwind-style CSS utilities, GSAP + ScrollTrigger and Lenis. Lenis1.3.23 is exposed by the inspected runtime. CurioX does not need that entire stack to reproduce a small part of the visual style.

Cost labels below are relative engineering estimates, not measured CPU/GPU/battery percentages. Area, pixel density, device, browser and simultaneous effects determine actual cost. Transform/opacity generally have cheaper rendering paths than animated blur. Primary references: https://web.dev/articles/animations-guide and https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter.

## Observed effects

| Effect | What the served site does | Relative cost |
| --- | --- | --- |
| Main glass header | Sticky49px header including border;95% background opacity and8px backdrop blur at desktop/mobile widths. Text stays sharp while content behind it blurs. | Medium during scrolling, but constrained to a narrow band. No JS needed for blur itself. |
| Sticky section strip |12px backdrop blur with60% background opacity, below main header. | Medium; adds another filtered band. Unnecessary for CurioX's short page. |
| Blur/fade/slide reveal | GSAP ScrollTrigger:8px blur, opacity0/hidden,y28px to sharp/visible/y0 over0.9s with power3.out. Starts at85% viewport height for individual elements,88% for grouped items. Runs once and clears animation styles. | Medium; higher temporary load when multiple large cards reveal together. Blur is the costly part. |
| Reveal stagger | Group item horizontal position adds up to0.18s delay. Current DOM:32 reveal elements, two groups containing18 lineup items and6 principles. | Low scheduling cost, combined with medium reveal cost. |
| Rules/ticks drawing in | Four label groups, each one rule and two ticks. Rule scaleX grows over0.7s; ticks scale/fade over0.35s with0.06s stagger. Label also blurs in. | Low for small transforms; label blur adds some cost. |
| Header entrance | Shared nav code fades/slides children from y-6 over0.5s with0.08s stagger, coordinated with intro timing. Input can fast-forward; reduced motion skips it. | Low for small elements, plus JS timing. |
| Smooth scrolling | Lenis lerp0.12, anchor support, GSAP ticker driving RAF and ScrollTrigger updated on scroll. | Low–medium ongoing JS work. CurioX already has conditional Lenis; another scroll system is unnecessary. |
| Card image hover | Screenshot scales to1.03 with500ms CSS transition, confirmed by computed hover style. | Low for a few images; large textures still use memory. |
| Icon/arrow hover | App icon lifts4px over300ms; arrow shifts2px right/up over150ms. Static icon drop shadow stays constant. | Low. Only use actionable hover cues where a real link exists. |
| Floating side labels | Desktop section names move/rotate/resize letter by letter along curves. Ticker updates positions, colors, hit regions and blurred masks. Masked backdrop layers use9px blur. | High relative to other page effects: many per-frame style updates plus filtering/masks. |
| Interactive edge ruler | Ticks react to scroll velocity; pointer/drag zoom changes ruler geometry. Percentage digits roll vertically using280ms CSS transitions. | Medium–high as a complete system. Digits alone are low cost; continuous ruler/tick/zoom work is heavier. |

The side navigation and ruler have the least practical value for CurioX's short pages. A small header blur and occasional content reveal provide most of the desired feel with much less machinery.

## Runtime confirmation and limitations

- Desktop card samples during entry: blur5.2229px/opacity0.3471, blur2.0202px/opacity0.7475, nearly sharp, then filter/transform removed. These intermediate samples confirm behavior; they are not a performance benchmark.
- Hover sample: screenshot scale1.03; icon translate0/-4px; arrow translate2/-2px.
- Reduced-motion profile:0 blurred reveal nodes, visible card without transform, no initialized Lenis version. Header still has8px backdrop blur. Shared CSS collapses transition/animation durations. Static blur is not itself motion.
- Mobile profile: glass header and Lenis initialize; physical touch inertia was not tested. At y650 the first card was still below the taller mobile hero, so its hidden state there is not a failed reveal. Desktop letter/ruler mode is gated by pointer/hover/width checks; no claim that full desktop choreography runs on mobile.
- Zero canvas/video elements mounted on the sampled desktop Apps page. Downloaded/prefetched chunks contain Three/WebGL and other-page components; their presence does not prove active3D/video on `/apps`. A global marquee keyframe exists in CSS but was not observed active here. Excluded both from the active-effect inventory.
- `document.getAnimations()` captured ruler CSS transitions. GSAP uses ticker-driven style updates, so that API alone does not inventory its reveals; computed-style samples and delivered code confirm them.
- No controlled A/B, CPU/GPU trace, battery test, physical-device benchmark, field INP or Lighthouse score was collected for the reference. Relative cost judgments are inference supported by implementation details and browser rendering guidance. Whole-site behavior remains outside scope.

## Recommendation for CurioX — proposed, not applied yet

1. Dark translucent header,6–8px fixed backdrop blur, mostly opaque readable fill and opaque fallback. Avoid animating its blur radius on every scroll frame.
2. One short reveal for secondary product content:350–450ms,4px blur to0,8–12px rise and opacity transition. Hero/title/email should remain readable immediately. Reduced motion should show content directly; JS failure must not hide content. Prefer opacity/translation without blur on constrained mobile devices.
3. Keep hover/focus color feedback. Add image zoom only after artwork and a real product destination exist; current informational Smriti card should not imply a nonexistent action.
4. Retain CurioX's current eligible-desktop Lenis/native-mobile policy. Native CSS plus a small IntersectionObserver can implement a reveal without adding GSAP.
5. Omit side letter choreography, draggable ruler, stacked glass strips and large moving blur layers.

The user asked to see the inventory first. New header/reveal effects remain proposals in this review; only the independently requested footer positioning defect is fixed.

## Footer fix and checks

Cause: short pages used natural content height, leaving empty screen below the footer. `src/styles/global.css` now gives body a minimum viewport height and column flex layout, allows main to expand and keeps header/footer from shrinking. Footer remains in normal flow after long content. It does not cover content.

At1920×1080, Contact footer bottom/document height both1080. Desktop/mobile screenshots inspected at `test-artifacts/artcraft-analysis/curiox-footer-fixed-{desktop,mobile}.png`. Regression checks cover five routes at320×780,1440×1200,1920×1080 in Chromium/Firefox/WebKit. Check/build/review build/static audit/format checks pass; responsive+navigation suite30/30 pass in47.8s.

## Evidence

Local ignored `test-artifacts/artcraft-analysis/`: response/rendered HTML; `runtime.json` with served asset URLs and scroll samples; `profiles.json` with desktop/mobile/reduced/hover observations; `snippets.json`; readable `.pretty.txt` code; top/scroll/hover/mobile-menu screenshots; repeatable `inspect.mjs`, `profiles.mjs`, `final-probe.mjs`. Initial profile probe matched both the shortcut and lineup app class; corrected it to the reveal-marked card and reran successfully.

Relevant public delivered assets (filenames can change):

- https://getartcraft.com/_next/static/chunks/0t89dutxv-24j.js — nav/Lenis/side labels/ruler. Local `18c8c5e46d88.js.pretty.txt`: Lenis around3815, letter loop around4430, blur masks around4647/4710, ruler ticker around5138, digit nodes around5382.
- https://getartcraft.com/_next/static/chunks/3he8n8f_1k891.js — shared reveal module, local `b9c7cb1a5464.js.pretty.txt`.
- https://getartcraft.com/_next/static/chunks/2ox-wnci8lexv.css — blur utilities, ruler-digit transitions and reduced-motion CSS.

Reference code is retained only as ignored analysis evidence; no ArtCraft source/assets were copied into CurioX.
