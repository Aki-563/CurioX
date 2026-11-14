# CurioX design system

Implementation, 2026-11-13; provisional visual treatment pending user review. Brand requirements remain approved as recorded in D001–D008.

Tokens: src/styles/tokens.css copies all master §3.1 colours. #050409 background; #0E0A18 alternating ground; #171126 surfaces; #392951 decorative borders; #9351F3 accent. Normal-text primary buttons use #7E3FDA with white; hover #8543E0. Bright violet #B77AFF for dark-ground links. Border token is decorative, never the sole interactive boundary. Secondary controls use #8B829C borders. Focus #F3C8FA. Selection uses dark text on pale violet. No colour adjustment required for tested actual pairs.

Typography: Space Grotesk variable 300–700, display 600/700. Inter variable 100–900, body/UI 400/500/600. Only normal Latin WOFF2 files served locally from public/fonts; original OFL-1.1 copyright/licences included. Fontsource packages pinned at 5.3.0. No runtime font CDN. swap ensures text availability. Display clamp 42–108px, H2 32–64px, H3 22.4–32px, body 16–18px; labels 13px. H1 1.03 line-height; body 1.65. Heading tracking tightens desktop editorial typography without clipping; mobile rendering verified in gallery captures.

Spacing: 4,8,12,16,24,32,48,64,96,128px; section clamp 64–128px. Gutter clamp 20–80px. Max content 1360px. Mobile-first grid, two-column at 768px. Content measures ≤67ch.

Components: TextWordmark (text only), Icon (decorative, hidden), ButtonLink (real anchor, primary/secondary/quiet, optional external new-tab announcement + noopener), Badge (noninteractive), SectionHeading with editorial index. Card is CSS primitive, not unnecessary abstraction. All buttons/panels 0px radius. Native button styling includes disabled/pressed state. Minimum button height 52px; focus-visible 2px with 5px offset.

Local gallery /review/components/ is generated only in dev or review build. Default release build does not emit it or Contact. Review output dist-review; release output dist. Gallery screenshots test-artifacts/phase-02/gallery-{320,375,768,1440}.png.

Contrast computed by scripts/contrast.mjs: button 5.816, hover 5.417, body 18.852, muted body 10.238, muted surface 9.193, subtle 5.615, link 7.046, selection 14.063, focus against button 4.003. Decorative accent with white normal text is avoided. Dark text on accent 4.585. Values are ratios to 1, raw data test-artifacts/contrast.json.

Motion: state transitions 160ms; reduced-motion override; no content hidden awaiting animation. Native motion baseline precedes conditional Lenis evaluation in Phase 07.


## 2026-11-14 continuity recovery

This file was absent at the start of D035. Restored the committed historical baseline without overwriting an existing file. Later D025-D034 approvals and verification remain in CURIOX_MASTER_PLAN.md and CURIOX_PROGRESS.md; this restoration does not claim recovery of the missing uncommitted report wording.

## 2026-11-14 - D035 current navigation

Current header dropdown is viewport-wide on desktop, container-aligned inside, with supplied-logo slots24px and no decorative link arrows.200ms ease-in-out opacity/8px translation on desktop open/hover close; reduced-motion instantaneous. Mobile full-screen tap accordion and dark toggle remain.
