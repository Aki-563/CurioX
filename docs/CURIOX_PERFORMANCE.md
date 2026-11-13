# CurioX performance evidence

2026-11-13; all results local lab on this Windows/Node24 host. No field INP, CDN caching, public traffic or Cloudflare results exist.

Budgets: Lighthouse categories ≥95, LCP≤2.5s, CLS≤0.1, TBT≤150ms, compressed JS≤40KB, initial above-fold transfer≤350KB. INP≤200ms is a future field target, not a lab certification.

## Final Phase10 results

Command: `$env:CURIOX_PERF_URL='http://127.0.0.1:4322'; node scripts/performance.mjs 10-final --runs=3`. Exit0.18 runs:3pages×2profiles×3runs, same local Windows hardware/Chromium158/Lighthouse13.6.0; other browser tests idle. Cold storage/reset by Lighthouse. Actual prepared CSP/gzip server, no Cloudflare CDN. Every run scored100 Performance/Accessibility/Best Practices/SEO, no run warnings.

| Page/profile    | Median LCP ms (min–max) | Median TBT ms (min–max) | CLS | Lighthouse total transfer bytes |
| --------------- | ----------------------- | ----------------------- | --- | ------------------------------- |
| Home mobile     | 912.69 (911.29–980.60)  | 28 (0–35)               | 0   | 86543                           |
| Home desktop    | 272.29 (249.72–274.11)  | 0                       | 0   | 92777                           |
| About mobile    | 911.69 (910.97–912.54)  | 7 (0–22)                | 0   | 85129                           |
| About desktop   | 262.46 (261.74–333.22)  | 0                       | 0   | 91363                           |
| Contact mobile  | 910.04 (909.48–910.35)  | 0                       | 0   | 84261                           |
| Contact desktop | 258.57 (248.25–261.41)  | 0                       | 0   | 90495                           |

All engineering budgets pass. Raw individual audits/settings/environment and medians/ranges: test-artifacts/lighthouse-10-final/*.json, summary.json. The earlier test-artifacts/lighthouse-10 attempt was interrupted when a WebKit Escape bug required source correction; partial results (including a contention-related first-run TBT outlier) are excluded from the final data. No selectively omitted completed final run.

External JS raw/gzip: eligibility2629/1279 bytes; dynamic Lenis18955/5461 bytes. Inline navigation834 raw,429 gzip-equivalent. Conservative whole-page executable JS gzip7169 bytes (7.00KiB), mobile/reduced1708 bytes because dynamic Lenis is not requested. Inline gzip equivalent is a conservative separate compression estimate; actual inline bytes share document compression. JSON-LD is402bytes of data, not executable code. Two variable Latin fonts22288+48256bytes,70,544 total, no remote requests or hydration. Shared Lenis CSS457 raw bytes (small and loaded on all profiles by Astro CSS hoisting).

Network audit: actual home load transfer82,524bytes mobile/reduced and88,285desktop from ResourceTiming accounting. Lighthouse request accounting is separately shown above. Browser response headers confirm Astro preview gzip for HTML/larger CSS/JS; small Lenis CSS and WOFF2 identity. Secure QA server explicitly gzip-compresses text; PNG/WOFF2 remain identity. Correction to baseline terminology: early “uncompressed preview” wording was wrong; baseline numbers were encoded local measurements. No CDN/brotli measurement claimed.

Lab trusted interaction EventTiming: sampled menu click24ms/Escape16ms mobile and anchor click24ms desktop/reduced. Threshold16ms; a few samples, not field INP or a percentile. Frame/wheel comparison in phase07 remains illustrative. H1 is actual LCP; no animation delay. Font swaps observed CLS0. Network inspection: CSS/fonts begin promptly from head preloads; original SVG has explicit dimensions; no raster/media above fold; social PNG is metadata-only. No blocking third-party scripts. No avoidable critical bottleneck identified. Small CSS dependency/render-blocking opportunities remain normal static CSS; budgets pass.

Security/cache: generated exact script hashes, self-only external sources, no inline styles/unsafe-inline, frame guard, nosniff, referrer/permissions policy. Cache rule only /_astro/* one-year immutable; unhashed fonts one day; no overlapping Cache-Control. Actual local response/CSP tests pass3engines, no violations/errors. Preview host matching emulated locally; actual Pages matching/status/SSL remains untested until authorised12. pnpm audit exit0 zero advisories/all severities. Static secret-pattern/output inventory checks pass. Raw csp-dist.json, dependency-audit.json, network-audit.json and static-audit.json.

Baseline (Phase04): scripts/performance.mjs 04 --home --runs=1. Lighthouse13.6.0, Playwright Chromium158.0.8127.18 via isolated chrome-launcher. Default Lighthouse mobile simulated throttling; desktop explicit 40ms RTT,10Mbps,1x CPU,1440×900. One run/profile, no median reliability claim yet. Mobile100/100/96/100, LCP905ms; desktop100/100/96/100,LCP245ms. Both CLS0,TBT0,transfer81551 encoded local bytes. Raw test-artifacts/lighthouse-04; script stores actual Lighthouse settings/environment. Base http://127.0.0.1:4321. BP96 was a missing favicon.ico request; explicit generic favicon resolved it in final build. Early/final builds differ in approved headline, Contact, metadata and motion; not a controlled optimisation-only comparison.

scripts/baseline.mjs 04: unthrottled page trace after fonts ready. H1 is LCP, mobile568ms/desktop88ms; CLS0; zero long tasks observed; navigation inline JS827 bytes before compression. 74723 bytes subresources (fonts and CSS), excludes HTML and inline script. Raw test-artifacts/baseline-04.json.

No images/video/canvas/hydrated framework. Inline original SVG is decorative; headline renders in static HTML. Two Latin variable WOFF2 locally served, font-display:swap and preload. Phase10 will repeat ≥3 runs per Home/About/profile, record median/range, inspect waterfall and security/cache configuration.
