# CurioX architecture

Static Astro7.4.11, strict TypeScript6.0.3, native CSS; Node24.16.x and pnpm12.18.0 with pinned lockfile. No SSR adapter, runtime server, hydrated UI framework, CSS framework, CMS, accounts, analytics, API, Rust/WASM or product infrastructure.

## Source map

- src/pages: Home, About, approved-email Contact,404, static robots/sitemap endpoints. Conditional review/[component].astro emits gallery only for dev/review builds.
- src/layouts/BaseLayout.astro: shared semantic shell, locally hosted fonts, SEO and small motion bootstrap.
- src/components: layout Header/Footer; UI wordmark/button/badge/icon/section heading; original decorative CuriosityGraphic; SEO Metadata.
- src/config: site.ts stores exact brand/domain/approved tagline/interim email and unresolved logo/legal state. navigation.ts drives public links/sitemap. seo.ts stores per-route titles/descriptions. English content, no speculative i18n.
- src/styles: tokens, global/reset/primitives, Home, secondary pages. External fingerprinted CSS, no inline styles. Gallery Card uses CSS primitive rather than unnecessary component.
- src/scripts: navigation disclosure with no-JS visible links, global Escape, outside close/focus restoration/breakpoint reset. Explicit tabindex0 preserves natural order and fixes observed Windows WebKit Tab skipping. Motion eligibility lazy-loads Lenis with one autoRaf; native anchors/history/focus; cleanup on page/preference changes. Touch/reduced profiles keep native input.
- public: two licensed local Latin variable WOFF2 fonts and OFL copyright/licences, temporary generic favicon, original social PNG, security/cache/preview header source.
- tests/e2e: functionality, layout, a11y, motion, SEO and response-header/CSP checks in three engines.
- scripts: build/context/capture/static audit, repeatable Lighthouse, LCP/font/wheel diagnostics and loopback-only secure QA server. These scripts are development tools, not published runtime.

## Build contracts

pnpm build emits dist: four HTML routes, robots/sitemap and assets. The build then hashes exact inline navigation/JSON-LD bytes into dist/_headers. No unsafe-inline or inline styles. public/_headers is the strict baseline; generated output adds only necessary SHA256 hashes. Never mix built HTML and header files from different builds.

pnpm build:review emits dist-review plus noindex gallery. Never publish review output. Contact was initially held but is now included after D019 email approval. No dummy legal/products routes. Legal text and official asset approval still hold launch.

Astro preview serves the site conveniently but does not enforce Pages _headers. pnpm preview:secure serves dist at127.0.0.1:4322 with prepared headers and explicit gzip. It rereads headers to prevent stale CSP after rebuild. This is local response testing, not Cloudflare CDN emulation. E2E config starts both review4321 and secure4322 if absent; build both outputs first.

Primary load: static text, original inline SVG, CSS, two fonts, tiny inline navigation and external motion eligibility. Lenis JS is dynamic only for eligible fine/hover non-touch≥1024px. No hydration or content-hidden animation. Sitemap derives approved navigation. JSON-LD contains only verified name/URL/approved email/slogan.

## Planned hosting only

Cloudflare Pages static, build pnpm build, output dist, no adapter/Functions/Workers. Preview noindex covers project.pages.dev and version.project.pages.dev separately; production curiox.in not matched. Hash CSP, nosniff, frame guard, referrer/permissions policy, immutable fingerprinted assets and one-day unhashed fonts are prepared. Actual edge matching/compression/SSL/404/host behaviour and rollback require separately authorised staging. No account, remote repo, branch or DNS accessed; no commit/push/publication.
