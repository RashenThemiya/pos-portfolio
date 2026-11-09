# Source restructuring

The existing website's appearance, copy, timing constants, accessibility fixes
and resource cleanup behavior are preserved. The new folder map and maintenance
guide are in the root README and AGENTS.md.

## Changes

- Grouped components into layout, shared, hero, ad, flow, screens and static
  sections. App remains a short, explicit list of page sections.
- Added reusable Section and BrandMark components, shared navigation links and
  language buttons, FeatureCard and PlanCard components.
- Replaced repeated product-screen markup with ScreenPanel, ScreenBox and
  DataTable. Dashboard and cash layouts have dedicated components; promotions
  and stock share the same table pane.
- Replaced JSX-returning data factories and hard-coded card indexes with ordinary
  content arrays and keyed rendering. Data modules now hold only IDs, timings,
  values and other locale-independent configuration.
- Replaced numbered translation keys with semantic section objects. Product-demo
  text that is intentionally English in both reference languages lives once in
  i18n/shared.js. Rich fragments retain the exact words and spaces.
- Extracted repeated story people and shopping baskets into SVG components.
  Shelf products, counter geometry and head-office bars render from arrays while
  retaining the same SVG hierarchy and animation refs.
- Split the story renderer from its React lifecycle hook. The original rendering
  expressions and timing constants remain unchanged.
- Extracted the Three.js material, label, ring, person and lorry constructors
  into one scene-owned primitive factory. RNG order and disposal ownership stay
  intact.
- Extracted scroll-spy from navigation. Stabilized language actions/provider
  values without changing same-language ad replay or persistence.

## Removed obsolete source files

These eleven files were superseded rather than kept as compatibility wrappers:

- data/features.jsx, data/local.jsx, data/plans.jsx, data/why.jsx
- data/features.js, data/local.js, data/plans.js, data/why.js
- components/HeroTill.jsx (Screens uses TillDemo directly)
- components/ScreenExamples.jsx (replaced by reusable panes/tables)
- hooks/useRaf.js (unused)

Other component paths were moved into their feature folders. Original reference
HTML, specifications and validation evidence were retained. Dependencies,
lockfile, stylesheet order, CSS breakpoints and runtime dependency set remain
unchanged.

## Measured reduction

| Measure | Before | After |
| --- | ---: | ---: |
| Source size, including CSS and dictionaries | 193,402 bytes | 157,567 bytes |
| JSX element declarations in source | 1,061 | 515 |
| Translation source, including shared demo copy | 56,409 bytes | 42,411 bytes |
| Main production JavaScript | 263.96 kB | 226.46 kB |

Source size is about 18.5% smaller; the main application bundle is about 14.2%
smaller. There are more focused component files, with less duplicated markup.
Source reduction is not achieved by minifying code or removing site content.

## Regression checks

- Full assembled page at 1440, 1024, 768 and 390px, EN and SI: identical section
  positions, sizes, normalized visible copy and total page height; no page
  overflow or application console errors. Browser/WebGL raster variation is
  treated separately from DOM/layout changes, as in the original parity pass.
- Five screen panes at all eight combinations: all 40 layouts match.
- Checkout delays, totals, restart, offscreen pause, reduced motion and cleanup:
  pass.
- Seven story scrubs at all eight combinations: all 56 SVG attribute/layout
  comparisons match. Ref-only rendering, keyboard jumps, looping, reduced motion
  and cleanup also pass.
- Eight complete Three.js scene snapshots and hero layouts match. Sales bills,
  fallback, offscreen pause and ten mount/unmount resource-release cycles pass.
- Keyboard navigation, focus rings, sticky border, scroll-spy, hidden panels,
  language/ad ARIA state and language persistence pass at all eight combinations.
- Import graph: no unreachable source files and no unused imports. Language
  dictionaries have matching content schemas; rich formatting may differ by
  language as it does in the reference.

Local regression scripts and their reports remain under ignored .qa/. Their
imports were updated to the new component paths.

The isolated ad rerun passes: 10s rotation, fade and stagger timings, same-pill
replay, site-language resets, pause/resume, reduced motion and timeout cleanup.
The first concurrent run exceeded the harness's 200ms post-click animation
sampling tolerance under load; no application timing change was needed.

Final npm run build: passes without warnings. No runtime dependencies were added.
