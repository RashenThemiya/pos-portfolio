# Full parity and accessibility pass

Compared the assembled React page with `reference/original.html` in Chrome at
1440, 1024, 768 and 390 CSS pixels, in English and Sinhala. No sections were
removed for the full-page comparison. Both pages used the same cached Google
Font files, viewport, device scale and reduced-motion setting, giving stable
animation poses. Normal-motion behavior was checked separately.

## Differences found and fixed

| Finding | Fix | Visual effect |
| --- | --- | --- |
| The reference root's safe-area top/bottom padding was missing. | Restored the `env(safe-area-inset-*)` padding. | Matches the reference on devices with safe-area insets; no change at the eight desktop-emulated sizes. |
| Escape could leave focus in the now-hidden mobile navigation. | Return focus to the menu button when closing with Escape. | Only the keyboard focus indicator changes. |
| Mobile story and example tables could not reliably receive keyboard focus for horizontal scrolling. | Added focus targets and inset orange focus rings to the existing scroll wrappers. | Only visible while keyboard-focused. |
| Screen example headings skipped from h2 to h5. | Use h3 headings with explicitly preserved font, spacing and line height. | No change; all 40 tab/width/language layouts match. |
| The logo's explicit accessible label did not match its visible brand text in Lighthouse. | Let the visible brand supply the link's accessible name. | No change. |
| The inactive cross-faded ad remained exposed to assistive technology. | Set `aria-hidden` on the inactive creative. | No change to the cross-fade or its timing. |

No further layout, visible-copy, typography or normal-motion timing discrepancies
were found. No features or runtime dependencies were added.

## Full-page geometry

Reference and application have identical section positions, widths, heights,
normalized visible text and total page height at every tested combination.
Neither page comparison produced horizontal document overflow. Application
console errors and uncaught exceptions: **zero**.

| Width | EN height, both pages | SI height, both pages |
| --- | --- | --- |
| 1440 | 7282px | 7689px |
| 1024 | 7589px | 7841px |
| 768 | 8814px | 9158px |
| 390 | 12722px | 13376px |

Full screenshots and element measurements are retained locally in
`.qa/parity/`; `layouts.json` includes both complete section measurements.
Raster comparisons distinguish browser/WebGL antialiasing from layout or CSS
changes; the pages are not claimed to be byte-identical across every screenshot.

## Interaction, timing and reduced motion

- All five screen tabs match the reference at all eight combinations (40 states).
  Arrow keys wrap; Home/End work; `aria-selected`, tab stops, `aria-controls`,
  panel labelling and hidden panels remain synchronized.
- Checkout delays are exactly 1300ms per item, 900ms before payment, 3600ms paid,
  then 400ms before restarting. Totals, payment state and restart pass.
- Ads retain the 10,000ms rotation, 700ms fade and reference stagger delays.
  Selecting a pill or site language restarts the ad; reduced motion stops rotation.
- Story timing helpers and render constants retain their earlier seven-frame
  reference comparison at t=2, 5, 8, 12, 16, 20 and 22.5 seconds. Keyboard jumps,
  24-second loop and ref-only rendering were rechecked.
- Animation pauses offscreen and resumes without accumulating hidden time.
  Reduced-motion final poses, live preference changes and cleanup pass. These
  behaviors retain the earlier task requirements, including stopping the ad's
  pseudo-element progress animation under reduced motion.
- Keyboard navigation, mobile Escape focus return, scrollable story/tables,
  story Enter/Space activation, language changes and persistence pass at all
  eight combinations.
- Network bills, offscreen pause, reduced-motion pose and fallbacks pass.
  Ten mount/unmount cycles release GPU resources, native handles, canvas,
  animation frames and observers. Production scene loading and language switching
  also pass.

## Accessibility and build

Lighthouse 12.8.2 accessibility snapshots run against the production preview,
with the real page loaded and fonts ready. This mode also audits selected screen
panes after interaction. Reports are saved as JSON and HTML under `.qa/parity/`.

The reference's orange text has contrast failures (notably plan fit lines and
small ad footer text). The supplied palette is preserved for visual parity;
Lighthouse scores are not a claim of complete WCAG conformance.

`npm run build` passes without warnings. QA tooling is installed locally without
adding it to the application's dependency manifest.

Final raster comparison: the 768px and 390px screenshots are pixel-identical
in both languages. At 1440px and 1024px, only 43/131 and 124/375 RGB channel
samples respectively differ (EN/SI), each by exactly 1 out of 255, confined to
the WebGL hero. The rest of each complete screenshot is pixel-identical.
These are renderer rounding differences; matching scene data and CSS are
preserved rather than changing the reference appearance.

Final Lighthouse results: **24 accessibility snapshots, all 96-97/100**.
The default Counter pane scores 96 at all eight width/language combinations.
All five panes were additionally audited at 1440px and 390px in both languages:
Counter and Dashboard score 96; Cash, Promotions and Stock score 97. The only
remaining automated audit failure is the reference palette's color contrast.
The logo-name mismatch and heading-order audit now pass. No audit exclusions
or score overrides were used.

Reproduction (local QA tools and font cache required):

- `node .qa/full-parity.mjs` and `python .qa/parity-pixels.py`
- `node .qa/keyboard-parity.mjs`
- `node .qa/check-screens.mjs`
- `node .qa/check-ad.mjs --timing-only`
- `node .qa/check-story.mjs --behaviour-only`
- `node .qa/check-network.mjs --behaviour-only`
- `node .qa/lighthouse-parity.mjs` (production preview on port 4173)
- `node .qa/check-network-production.mjs`
- `npm run build`
