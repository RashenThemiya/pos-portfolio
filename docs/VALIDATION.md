# Navigation and static section validation

Validated Nav, Why, Features, LocalStrip, Plans, Contact and Footer against
`reference/original.html` in Chrome at 1440, 1024, 768 and 390px, in EN and SI.

The comparison uses the reference Google Fonts, cached locally for QA, and reduced
motion to obtain stable screenshots. Unimplemented sections are removed from both
pages during comparison so the completed sections have comparable positions.

- All 56 section comparisons have identical visible text, dimensions and descendant geometry/styles.
- 55 screenshots are pixel-identical. The 1440px EN Features screenshot differs at
  three pixels in the promotions SVG icon; the SVG geometry and styles are identical.
- Language selection updates `html.lang`, button `aria-pressed` and `pos-lang`,
  and persists after reload.
- Mobile menu opening, Escape dismissal and link dismissal pass at 768 and 390px.
- Sticky navigation border and scroll-spy pass at all four widths in both languages.
- No browser errors or horizontal overflow were observed.

Feature bullets, payment labels, plan inclusions and footer copy retain English
in SI mode where the reference supplies no `data-si` translation.

Local QA screenshots, font cache, raw results and the comparison script are in
`.qa/` (ignored by Git).

## Checkout demo and product screens

Validated all five screen tabs at 1440, 1024, 768 and 390px, in EN and SI.
All 40 Screens screenshots are pixel-identical to the reference with reduced
motion enabled. Visible text, pane geometry, captions and URL bars also match.

The normal-motion checkout was checked through a full restart, including the
scheduled timeout sequence `1300, 1300, 1300, 1300, 900, 3600, 400, 1300`.
Item totals are `1,190.00`, `1,380.00`, `1,944.00` and `2,464.00`; the final
promotion amount is `-95.00`.

- Only the active Counter tab mounts the shared `TillDemo` through `HeroTill`.
- Leaving Counter clears its pending timeout and unmounts the demo.
- Scrolling offscreen pauses the timeout and preserves its remaining delay.
- Reduced motion shows all four items, Cash/Card highlights and the paid banner
  without a timer; changing the media preference live also passes.
- Arrow keys, Home and End move focus and select tabs. Each tab controls its
  corresponding panel; exactly one panel is visible.
- Language changes update the caption while preserving the selected tab.
- No browser errors or horizontal overflow were observed.

Screenshots, comparison results and the recorded checkout sequence are in
`.qa/screens/`; the browser validation script is `.qa/check-screens.mjs`.

## Promotional ad banner

Compared both ad creatives under both site languages at 1440, 1024, 768 and
390px (16 combinations). Visible copy, dimensions, typography and element
positions match the reference. Screenshots were also inspected; small font and
gradient rasterization differences remain in some images.

- The 640px container breakpoint is checked independently of viewport width:
  a 640px container stacks the rows, while 641px uses the desktop grid.
- Auto-rotation schedules exactly `10000ms`; the progress pill uses the same
  duration. Cross-fade duration is `0.7s`.
- Entrance delays match the reference: heading `0.1s`, subtitle `0.3s`, column
  labels `0.5s`, questions from `0.6s` in `0.22s` increments, answers from
  `0.8s`, badges from `1.1s`, closing line `2s`, logo `2.2s`.
- Clicking either pill restarts its entrance and progress, including clicking
  the already selected pill. Keyboard focus stays on the pill.
- Selecting either site language switches and restarts the ad, including
  reselecting the current site language after changing the ad manually.
- Offscreen ads pause their timer and keyframes; resuming preserves the
  remaining interval. Unmounting clears the pending timeout.
- Reduced motion disables auto-rotation and entrances and keeps a static full
  progress line. Manual language controls remain usable. Live preference
  changes were also checked.
- No browser errors or horizontal overflow were observed.

Screenshots, layout results and timing records are in `.qa/ad/`; the browser
validation script is `.qa/check-ad.mjs`.

## Flow and story cartoon

Scrubbed `t = 2, 5, 8, 12, 16, 20, 22.5` at 1440, 1024, 768 and 390px
in EN and SI (56 comparisons). Every SVG element's attributes and text, step
highlight/progress, section dimensions and visible copy match the reference.
52 screenshots are pixel-identical; the other four have differences of at most
one RGB level from rasterization.

The complete scene, including the nodes originally created by the script, is
JSX. `useStoryAnimation` updates existing SVG nodes through refs. The easing
helpers, customer state function and `render(t)` expressions were checked
against the source; the currency prefix is extracted into i18n.

- Profiled normal playback without any React commits during animation frames.
- Verified the 24-second loop and normal step jumps to `STAGES[s] + 0.01`.
- Reduced motion starts at `16.8s`; click, Enter and Space use the exact still
  frames `[4.7, 8.5, 13.5, 16.8, 22.9]` without scheduling RAF callbacks.
- Offscreen playback stops requesting frames and preserves its time. Resuming
  does not include elapsed offscreen time.
- Live reduced-motion changes stop/resume playback, and language changes
  preserve the selected pose and dynamic values.
- Unmounting cancels RAF and disconnects the observer, including in StrictMode.
- The mobile SVG remains 900px wide inside a working horizontal scroll wrapper,
  with no document-level overflow.
- The unused hidden scene cards are not rendered. No browser errors were observed.

`Flow` and `StoryCartoon` accept an optional `animationRef` exposing `seek(t)`,
`jumpToStep(index)` and `getTime()` for controlled scrubbing. Local screenshots
and results are in `.qa/story/`; verification uses `.qa/check-story.mjs`.

## Hero and Three.js network

Compared the hero in EN and SI at 1440, 1024, 768 and 390px. Hero copy,
typography and layout match the reference. All 319 scene graph objects, camera
transforms, materials, sprite image dimensions and seeded animation phases
match at the reference's reduced-motion pose. Seven screenshots are
pixel-identical; the 768px SI screenshot has font rasterization differences.

The scene preserves seed 11, the tower and floor stripes, five branches,
20 walkers, three suppliers, six roads/lorries, 18 data packets and 12 sprite
labels/promotion tags. Sales arrivals update React's Bills counter using the
reference's seeded increments. Switching languages preserves the scene and
counter. Normal playback, offscreen pause/resume and the static `8s`
reduced-motion pose pass. WebGL creation failure and live context loss show
the reference radial-gradient fallback.

### Resource and memory audit

The 10-cycle mount/unmount test releases every tracked application geometry,
material, texture and shadow render target. Three.js GPU geometry, texture and
shader-program counts return to zero after every unmount. Native WebGL object
auditing also reports zero remaining handles after context release. Canvases,
RAF callbacks and both observers return to zero; DOM nodes and listener counts
stay unchanged.

The initial collected JS heap increased by 417,748 bytes during runtime warm-up.
An extended 26-cycle audit confirmed that this levels off: the last ten samples
range from 6,206,676 to 6,273,848 bytes. Backing storage stays at 2,984,704 bytes,
DOM nodes at 31, and native listeners at 149 in that run. Heap object queries
confirm zero retained renderers and scenes after unmount. The library's
module-level geometry and empty sampler-texture caches stay constant at 14
and 4 objects respectively; no scene instances accumulate.

Old label maps/materials are disposed before rebuilding. Pending font-ready
callbacks release their scene references on unmount, and a cancelled dynamic
import cannot create a renderer after unmount. Both pending-operation cases
were tested. Disposal includes the r128 shadow program cache, renderer caches,
shadow targets and the WebGL context itself.

Three.js remains pinned to `0.128.0`. The scene loads separately, with its math
modules split into another chunk to keep the production build warning-free.
The production WebGL hero and language switching were checked in preview.

Raw layout, memory and edge-case reports and screenshots are in `.qa/network/`.
The main checks are `.qa/check-network.mjs`, `.qa/memory-network.mjs`,
`.qa/network-edges.mjs` and `.qa/check-network-production.mjs`.
