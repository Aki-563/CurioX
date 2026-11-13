# Phase 07 — Motion and optional Lenis

Verdict: DONE
Date: 2026-11-13 (Asia/Calcutta)
Objective: Optional desktop wheel polish with intact native input/focus/history.
Tasks: P07.01–P07.10; P07.03 SKIPPED_WITH_REASON: secondary reveal effects are optional (“where necessary”); no need identified. Static content stays visible without reveal/observer code. Other9 DONE.

Files: src/scripts/{motion,smooth-scroll}.ts, BaseLayout.astro, package/lock, scripts/{scroll-profile,baseline,context}.mjs, tests/e2e/{motion,navigation}.spec.ts, tsconfig, AGENTS, all source Astro anchors (explicit tabindex0), pages.css, decisions/context/report. Small contact-email font refinement prevents a trailing single-letter line at320 from observed capture.

Lenis1.3.27 pinned; official stylesheet included. Dynamic JS import only at≥1024px, fine pointer, hover, zero maxTouchPoints and no reduced motion. Native query ?scroll=native permits reproducible comparison. One autoRaf; lerp0.14; syncTouch:false. Native anchor handling deliberately retained (anchors:false) so URL/history/focus and CSS scroll-padding remain browser-owned. hash/popstate sync and pagehide/pageshow/media-change disposal prevent stale instances. Hover/pressed feedback160ms; no LCP/reveal animation or hidden text.

Commands: add lenis exit0; check exit0 final zero errors/warnings/hints36files; build:review exit0. Motion+navigation cross-engine suite exit0 15 passed13s. No-JS three-engine suite exit0 3 passed. scripts/scroll-profile.mjs and baseline.mjs 07-native /07-enhanced exit0.

Failures corrected: conditional Lenis test initially counted its shared CSS as JS download; assertion now accurately checks dynamic JS, CSS is a small shared static asset. Generated dist-review hints excluded from source typecheck. WebKit on Windows skipped native links with Tab and Alt+Tab; reproduced in isolated browser and confirmed explicit tabindex0 makes normal Tab work. Added tabindex0 (never positive values) to all anchors without altering DOM order. Both keyboard cases then pass all engines. [Related upstream discussion](https://github.com/microsoft/playwright/issues/5609) describes platform tabbing preference; observed Windows behavior here differed from Mac Option+Tab suggestion.

Native vs enhanced single local wheel trace (same6×320 input): native positions320,640,960,1280,1600,1920; enhanced200,486,790,1104,1423,1742 then1918 at settle sample. Script task2.00ms vs10.72ms, total task69.04ms vs36.75ms; median frame16.7ms each; frames>50ms1 vs0. This is a small uncontrolled lab sample, not proof of universally lower CPU. Extra interpolation cost~8.7ms over the whole sample is acceptable for optional desktop wheel polish. Touch/reduced profiles keep native and never request dynamic Lenis JS. No scroll snapping/jacking.

Baseline native H1LCP568/84ms (390/1440), enhanced572/88ms; CLS0 and no long tasks in either short load trace. Mobile827 inline bytes+1279 encoded external script bytes; desktop also5461 encoded Lenis bytes; actual response compression/budgets verified in10. Files: test-artifacts/baseline-07-*.json, scroll-profile.json. Phase06 screenshots remain visual baseline because motion introduces no reveal/layout changes; final captures in11.

All engines pass preference cleanup/re-enable, hash/back/top restoration, desktop/mobile menu, skip/focus, synthetic nested native scroller; actual touch and real Safari hardware remain untested. Resume Phase08 SEO and crawl safety. Logo/legal remain open, final tagline/email approved.
