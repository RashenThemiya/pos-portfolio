# Codex prompts

Setup: unzip into a new folder, `cd` into it, run `git init`, then start Codex in that folder. Codex reads `AGENTS.md` automatically. Paste the prompts below one at a time, in order. Commit after each phase passes review.

## Phase 0: scaffold
```
Read AGENTS.md and docs/SPEC.md fully, then skim reference/original.html.
Scaffold a Vite + React 18 JavaScript project in this folder following the structure in AGENTS.md.
Install three@0.128.0. Add the Google Fonts links to index.html.
Port the :root tokens, global resets, reduced-motion rule and typography into src/styles/tokens.css and base.css.
Create LangContext with EN/SI toggle persisted to localStorage('pos-lang').
Render an empty App with the sections as placeholders. Run npm run build and fix any errors.
```

## Phase 1: static sections
```
Implement Nav, Why, Features, LocalStrip, Plans, Contact and Footer exactly as in reference/original.html.
Extract all copy (EN and SI) verbatim from the data-si attributes and text nodes into src/i18n and src/data.
Port the matching CSS, including every media query. Include scroll-spy, sticky nav border, mobile menu behaviour and the language switch.
Compare against the reference at 1440, 1024, 768 and 390px in both languages and fix differences.
```

## Phase 2: hero till + screens
```
Implement HeroTill (scripted checkout loop) and the Screens section with 5 tabs, dark window frame and the language-aware caption, per SPEC sections 4 and 8.
Use a single shared TillDemo component for the hero and the Counter tab if the markup is identical.
Timings must match exactly: 1300ms per item, 900ms before payment, 3600ms on the paid banner, 400ms restart. Clean up all timeouts on unmount. Static final state under prefers-reduced-motion.
```

## Phase 3: ad banner
```
Implement AdBanner per SPEC section 5: container-query sizing in cqw, both language versions, cross-fade, staggered entrance keyframes, 10s auto-rotate with progress bar on the active pill, mobile stacked layout under 640px container width.
Switching the site language must switch and restart the ad.
```

## Phase 4: story cartoon
```
Implement Flow with StoryCartoon per SPEC section 6.
Port the SVG markup to JSX and the script to a useStoryAnimation hook that updates SVG nodes through refs (no React state per frame).
Port helpers and every timing constant from render(t) unchanged. Add IntersectionObserver pause, step click/keyboard jumps, progress bars and the mobile scroll wrapper.
Verify by scrubbing t at 2, 5, 8, 12, 16, 20, 22.5 and comparing to the reference.
```

## Phase 5: 3D hero
```
Implement NetworkScene per SPEC section 7 using three@0.128.0 and the hero layout (scrim, copy, live network card).
Port the scene exactly: seeded RNG, tower, 5 branches with walkers, 3 suppliers, roads and lorries, data arcs, sprite labels, promo tags, orbiting camera, fallbacks.
Increment the hero Bills counter on each sales packet arrival.
Dispose every Three.js resource on unmount and pause when offscreen. Confirm no memory growth after mounting and unmounting 10 times.
```

## Phase 6: parity and polish
```
Do a full parity pass against reference/original.html at 1440, 1024, 768 and 390px in EN and SI.
List every visual or timing difference you find, fix them, then run npm run build.
Check: keyboard navigation, focus rings, aria attributes, reduced-motion behaviour, no console errors, Lighthouse accessibility >= 95.
Do not add features that are not in the reference.
```
