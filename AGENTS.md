# Pentarix POS marketing site

Rebuild `reference/original.html` as a React + JavaScript (no TypeScript) app. The reference file is the source of truth for copy, layout, colours, timings and animation behaviour. Match it pixel-for-pixel and frame-for-frame.

Later user requests take precedence over reference parity: use the supplied company logo and retain the responsive improvements documented in `docs/RESPONSIVE.md`. The reference still governs copy and animation timings.

## Stack
- Vite + React 18, plain JavaScript (`.jsx` / `.js`)
- Plain CSS with CSS variables (port the reference CSS; do not introduce Tailwind or a UI kit)
- `three` (npm) for the hero 3D scene, pinned to `0.128.0` to match the reference
- No other runtime dependencies or router package. This remains one page; `useSectionRouting` uses the History API for clean section paths (see README).
- Fonts via Google Fonts `<link>` in `index.html`: Bricolage Grotesque, Figtree, JetBrains Mono, Noto Sans Sinhala

## Structure
```
src/
  main.jsx  App.jsx
  assets/       company-logo.svg
  components/
    layout/     Nav, NavLinks, LanguageSwitch, Footer
    shared/     Section, Copy, BrandMark
    hero/       Hero, NetworkScene
    ad/         AdBanner, AdCreative
    flow/       Flow, StoryCartoon, StorySvg, StoryPerson, StoryBasket
    screens/    Screens, ScreenPanel, ScreenBox, DataTable,
                DashboardPane, CashPane, TablePane, TillDemo
    sections/   Why, Features, FeatureCard, FeatureIcon,
                LocalStrip, Plans, PlanCard, Contact
  hooks/        motion, visibility, scroll-spy and animation lifecycle hooks
  animation/
    story/      createStoryRenderer.js (SVG rendering maths)
  scene/        createNetworkScene.js, createScenePrimitives.js, SceneResources.js
  data/         navigation.js, screens.js, till.js, story.js, network.js
  i18n/         LangContext.jsx, en.js, si.js, shared.js
  styles/       tokens.css, base.css and section styles
```

## Conventions
- Clean code, minimal comments, consistent patterns. Comments only where the maths or timing is non-obvious.
- Function components and hooks only. One component per file, named exports except `App`.
- User-facing copy lives in `src/i18n`, never hard-coded in JSX. Use semantic section keys in `en.js` and `si.js`. `shared.js` holds product-demo copy that the reference deliberately leaves English in both languages.
- `src/data` contains locale-independent IDs, amounts, chart data and timing constants; it does not render JSX.
- Reuse the shared Section, Copy and BrandMark components. Repeated cards and example tables have their own components; avoid re-export-only files.
- Every animation loop (`requestAnimationFrame`, `setTimeout`, observers, Three.js renderer/geometries/materials) must be cleaned up on unmount.
- Pause animation loops when offscreen (IntersectionObserver) and honour `prefers-reduced-motion`.
- Keep accessibility from the reference: roles, aria-labels, aria-pressed/selected, focus-visible outlines, keyboard support on step lists.
- Do not use `dangerouslySetInnerHTML` except for the few strings that contain `<em>`; for those, split into parts and render `<em>` in JSX.
- Persist language in `localStorage` key `pos-lang`, wrapped in try/catch.

## Commands
- `npm run dev`, `npm run build`, `npm run preview`
- Before finishing any task: `npm run build` must pass with no warnings you introduced.

## Definition of done
Preserve reference copy, colours and animation timings, with the company logo and approved responsive improvements. Check EN and SI across phone, tablet and desktop widths; navigation and text must fit, touch controls must remain usable, and wide tables/illustrations must scroll within their own panels. See `docs/RESPONSIVE.md` for the validation matrix.
