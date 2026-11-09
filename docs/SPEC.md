# Pentarix POS site: build spec

Line numbers refer to `reference/original.html` (CSS 8-380, HTML 383-775, JS 777-1272). When this spec and the reference disagree, the reference wins.

## 1. Design tokens (reference lines 11-24)
Light page with dark "till screen" islands.
- Light: `--ink #fff`, `--panel #f3f4f8`, `--line #e2e5ec`, `--fg #111827`, `--muted #5a6476`, `--orange #f25c05`, `--ok #0e9a68`, `--bad #e0384d`
- Dark: `--d-ink #0b1120`, `--d-panel #111a2c`, `--d-line #22304a`, `--d-fg #e8ecf4`, `--d-muted #93a0b8`, `--d-orange #ff6b0f`, `--d-ok #22c38e`
- Fonts: display = Bricolage Grotesque (500/700/800) with Noto Sans Sinhala fallback; body = Figtree; mono = JetBrains Mono. Sinhala weights 500/600/800/900.
- Container `.wrap` max 1280px, side padding `max(20px, safe-area)`.
- Section padding 76px vertical; `.band` sections use `--panel` background.
- Global: `scroll-behavior:smooth`, reduced-motion kills all animation/transition. `section[id]` scroll-margin-top 84px.
- Safe-area handling: `body::before` fixed strip, sticky nav at `top: env(safe-area-inset-top)`.

## 2. i18n
- Languages `en` and `si`. Every element with `data-si` in the reference has an SI string; build `en.js` / `si.js` keyed by id, extracted from the reference.
- Toggle in nav (`EN` / `සිං`), `aria-pressed`, persisted to `localStorage('pos-lang')`, sets `document.documentElement.lang`.
- Sinhala overrides (lines 360-367): headings `letter-spacing:0; line-height:1.3`; hero h1 `clamp(30px,3.6vw,50px)`; section h2 `clamp(26px,3vw,38px)`; cta h2 `clamp(28px,3.8vw,46px)`; body line-height 1.75; nav link font 14px, gap 18px.
- Switching language also: switches the ad banner to the same language and restarts it; updates the Screens caption title/text and URL bar.
- Strings containing `<em>` (hero h1, CTA h2) render the highlighted part in orange.

## 3. Sections, in order
1. **Nav** (sticky, blurred white 90%): logo (orange triangle SVG + "PENTARIX" small + "POS" orange), centre links Why POS / How it works / Features / Screens / Plans with animated orange underline and scroll-spy (active when section top < 140px), right side language switch + "Book a demo" CTA (hidden under 440px) + hamburger under 880px. Border appears after scrollY > 20. Mobile menu: toggles open, icon swaps between hamburger and X path, closes on link click and Escape, `aria-expanded` kept in sync.
2. **Hero** (dark, min-height 660px, padding 120/72): full-bleed 3D scene behind, left-to-right dark scrim, left column copy (eyebrow, h1, lede, 2 CTAs, 3 tick-chip facts), right column "Live network view" card (green live dot, 4 stats: 5 Branches, 15 Counters, 3 Suppliers, live Bills counter starting 1,284; 3-item colour legend). Under 900px the layout stacks, scrim becomes vertical, stats become 2 columns.
3. **Promo ad banner**: 16:9 container-query-scaled ad with SI and EN versions (section 5).
4. **Why** (6 before/after pairs, header row hidden under 640px).
5. **Flow / "From the supplier's lorry to head office"** (`#flow`, band): the 2D story cartoon with 5 clickable step tabs (section 6).
6. **Features** (`#features`): 12 groups in a 3-col grid (2 under 980px, 1 under 600px), each with icon tile, h3, 4-5 bullets (bold fragments), then the "Accepted at the counter" payment-pill strip.
7. **Screens** (`#screens`, band): 5 tabs (Counter screen, Branch dashboard, Cash session, Promotions, Stock & batches) inside a dark window frame with 3 dots and a mono URL bar; caption (title + paragraph) below changes per tab and per language.
8. **Local strip**: 4 columns with top rule: rupees/notes, weighed goods, replaces credit book, Sinhala + English.
9. **Plans** (`#plans`, band): Single shop, Supermarket (orange border, "Most popular" tag), Multi-branch, plus note line. CTA buttons link to `#contact`.
10. **Contact CTA** (`#contact`): h2 with orange em, website `pentarixlabs.com`, phone `070 723 3731`, two buttons.
11. **Footer**.

## 4. Hero till demo (lines 810-870) - component `HeroTill` / Screens "Counter screen" pane
Scripted loop with these exact items:
| code | name | sub | amount | promo |
|---|---|---|---|---|
| 4791034071203 | Milk powder 400g | 1 × 1,190.00 | 1190 | |
| 4792173000318 | Laundry soap 110g | 3 × 95.00 | 285 | Buy 2 get 1, -95 |
| 2100450023500 | Samba rice · weighed | 2.350 kg × 240.00 | 564 | |
| 4791111102217 | Cream crackers 490g | 2 × 260.00 | 520 | |

Timeline: step 0 clears list, totals 0.00, payment pills off, "paid" banner hidden. Each item step: show barcode in scan bar, restart the orange beam sweep (0.6s), append line with 0.45s slide-in + orange flash, update Subtotal / Promotions / Total (2 decimals, `en-US`), wait 1300ms. After last item: clear code, highlight Cash + Card pills, wait 900ms. Then show the green "Paid: Cash 2,000.00 + Card 464.00 / INV-K02-04187" banner, wait 3600ms. Restart after 400ms. Under reduced motion: render the final state statically. Implement with a `useEffect` timeout chain and clean up on unmount. The loop should only be mounted/active when the Counter tab is visible.

## 5. Ad banner (lines 99-165, 515-566)
- Two stacked ads (SI default, EN), cross-fade 0.7s, auto-rotate every 10s, language pills underneath with a 2px orange progress bar animating across the active pill over the same duration. Clicking a pill switches and restarts the timer. Disabled auto-rotate under reduced motion.
- Everything is sized in `cqw` units (container queries), 16:9 desktop, stacked card layout below 640px container width (problem → answer vertical, arrows rotate 90°, footer becomes curved bottom block with logo first).
- Staggered entrance when an ad becomes active (class `play`): head up (0.1s), sub up (0.3s), column labels fade (0.5s), five Q rows slide in from left at `0.6s + i*0.22s`, arrows fade then nudge forever, answers slide from right at `0.8s + i*0.22s`, check badges pop (scale 0 → 1.3 → 1) at `1.1s + i*0.22s`, close line up at 2s, footer logo spins in at 2.2s.
- Footer: curved light strip (`clip-path: ellipse`), website left, logo centre, phone right.
- Copy for both languages is in the reference; extract it verbatim.

## 6. Story cartoon (lines 568-575 markup + 1131-1271 script)
Inline SVG `viewBox="0 30 1200 410"`. Port the markup as JSX and the script as a `useStoryAnimation` hook driving refs (no per-frame React state; mutate SVG attributes via refs for performance). Time `T=24s`, loops, only advances while in view.
- Stage boundaries (STAGES): `[0,5,9,14,19,24]` for the 5 steps; STILL frames when clicking in reduced motion: `[4.7,8.5,13.5,16.8,22.9]`.
- Step list under the SVG (5 columns, stacked under 900px): active step highlighted, a top progress bar `--p` fills across its stage, clicking or Enter/Space jumps `t` to `STAGES[s]+0.01`.
- Under 640px the SVG is 900px wide inside a horizontally scrollable wrapper.
- Sequence: lorry loads boxes at supplier → drives to store (1.8-3s) → unloads 3 boxes into store-room stack and stock counter jumps 48→168 with "GRN #2041 · 120 items received" pill (4.2-6.6s) → stocker walks back and forth carrying boxes, shelf fills from 6 to 22 products (5-8.6s) → 3 customers enter at staggered offsets, pick items, walk to counters (9-14s) → scanners beam, monitors turn amber, promo pills ("3 for 2 · −95", "Biscuits −10%", "SAVE5 · −5%"), payment icons (card, cash, CREDIT), receipt paper grows, monitors turn green, "Paid ✓" pills (14-19s) → packets fly along curves to head office from this store and Galle/Negombo, HQ bars grow, `LKR 2,410,600` counts up by 52,960, "Synced · 3 branches" and "Low stock · Milk powder" pills (19-21.6s) → purchase-order packet flies back to supplier, supplier glows purple, "PO #318 received" pill (21.4-23.6s) → fade out and loop.
- All easing helpers (`cl`, `seg`, `ease`, `back`, `lerp`, quadratic bezier `qp`) and the exact timing constants in `render(t)` must be ported unchanged.
- Hidden `data-scene` cards (lines 600-650) are unused in the reference; do not render them.

## 7. Hero 3D network (lines 920-1130) - `NetworkScene`
Three.js r128, WebGL renderer (antialias, alpha, pixel ratio ≤ 1.75, PCF soft shadows, sRGB output), fog `0x0b1120` 70-150, hemisphere + directional light with 2048 shadow map, ground plane + grid.
- Head office tower (box with 9 emissive blue floor stripes, orange floating orb that bobs, pulsing blue halo ring).
- 5 branches on an ellipse (Colombo 07, Kandy, Galle, Negombo, Kurunegala) with coloured roof, awning stripes, glass front, 3 green counter lights, halo rings, 4 walking customers each that scale in/out.
- 3 supplier warehouses (Dairy supplier, Rice mill, FMCG wholesaler) with pitched roof, door, crates, purple glow ring on delivery.
- Curved tube roads from each supplier to its 2 nearest branches with dashed centre lines and shuttling lorries (ping-pong).
- Data arcs: orange sales packets branch → HQ (increment the hero Bills counter and pulse halos on arrival), green stock/price packets HQ → branch, purple purchase orders HQ → supplier.
- Sprite labels drawn from canvas textures (rebuild on `document.fonts.ready`), plus 3 floating orange promo tags (Buy 2 get 1, −10% today, Code SAVE5) that fade in and out.
- Camera: slow sine orbit (`angle = -0.35 + sin(t*0.05)*0.55`), offset so the scene sits right of the hero copy on wide screens, higher and further on portrait. Labels fade near the left edge on wide screens.
- Seeded RNG (`s*16807 % 2147483647`, seed 11) for deterministic layout.
- Fallbacks: if WebGL fails, add `.nogl` radial-gradient background. Respect reduced motion (static pose, time frozen at 8s). Pause when offscreen. Dispose geometries, materials, textures and renderer on unmount; disconnect the ResizeObserver.
- The Bills counter is shared state: expose `onBill()` from `NetworkScene` or use a small context so `Hero` updates the number.

## 8. Screens panes (lines 659-736)
Use the exact tables and numbers in the reference: KPI row (186,420 / 214 / 871.12 / 3), 7-bar weekly chart (58,64,52,70,76,88,93%, last bar green), payment mix bar (58/27/11/4), denomination table (total 111,060.00, variance −250.00), session summary, promotions table (5 rows with Active/Ended/Paused chips), expiring batches table (4 rows). Tabs use `role=tablist/tab/tabpanel`, `aria-selected`, `hidden` on inactive panes.
Add a subtle entrance for the dashboard bars (grow from 0 height on first show) only if it does not alter the static look; otherwise keep static as in the reference.

## 9. Responsive breakpoints to preserve
1060, 980, 900, 880, 860, 640, 600, 520, 440. Check each in the reference CSS.

## 10. Non-goals
No backend, no forms, no analytics, no router, no TypeScript.
