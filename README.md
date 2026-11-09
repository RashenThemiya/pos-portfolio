# Project structure and maintenance

This is a Vite + React 18 JavaScript single-page site. Three.js remains pinned
to 0.128.0. There are no additional runtime dependencies.

## Run locally

- Install dependencies: `npm install`
- Development: `npm run dev`
- Production build: `npm run build`
- Preview that build: `npm run preview`

## Where changes belong

| Location | Purpose |
| --- | --- |
| `src/App.jsx` | Page section order. |
| `src/components/layout` | Navigation, language buttons and footer. |
| `src/components/shared` | Section shell, safe rich copy and brand SVG. |
| `src/components/sections` | Static content sections and reusable feature/plan cards. |
| `src/components/screens` | Product tabs, shared panel/box/table components and till demo. |
| `src/components/flow` | Story SVG and reusable person/basket geometry. |
| `src/components/hero`, `ad` | Hero/3D wrapper and promotional creatives. |
| `src/hooks` | React state and lifecycle: visibility, motion, scroll-spy and timers. |
| `src/animation/story` | SVG animation renderer; updates refs without React state per frame. |
| `src/scene` | Three.js scene controller, reusable primitives and resource ownership. |
| `src/data` | IDs, chart values, monetary amounts and timing constants. No JSX. |
| `src/i18n` | Language provider and structured dictionaries. |
| `src/styles` | Existing tokens, selectors, breakpoints and animations. |

Both language dictionaries have the same semantic shape. For example,
`plans.items` supplies PlanCard content and `features.groups` supplies FeatureCard
content. Shared product-demo text stays English in both languages because the
reference does; it is stored once in `i18n/shared.js`. Translate a demo by
explicitly overriding its shared section in the relevant language dictionary.

Copy supports strings and rich fragments such as
`{ tag: 'em', children: ['Highlighted words'] }`. Keep intentional spaces in
those fragments: they preserve the reference typography without injecting HTML.

The shared components keep the existing DOM hierarchy and CSS classes. Avoid
adding wrapper elements around the SVG or screen panels: animation refs and
layout comparisons depend on their current structure. The till mounts only in
the active Counter panel; other example panes retain the reference hidden-panel
behavior. Animation hooks own scheduling; renderers own drawing and disposal.

The Three.js controller loads dynamically. Its primitive factory uses the same
seeded RNG and resource tracker, so all geometries, materials, labels and
textures still belong to one disposable scene. Keep creation order stable when
editing it because RNG consumption affects the reference layout.

## Reference and validation

- `reference/original.html`: original visual/timing source; preserved.
- `docs/SPEC.md`: behavior and responsive requirements.
- `docs/PARITY.md` and `docs/VALIDATION.md`: original parity and lifecycle audits.
- `docs/REFACTOR.md`: this restructuring, removals and regression results.

`node_modules`, `dist` and local `.qa` artifacts remain ignored. The local QA
scripts and font cache are development evidence, not files loaded by the site.

## Section routes

Section links use clean paths: /why, /flow, /features, /screens, /plans and
/contact; the logo links to /. These remain sections of the same page.
useSectionRouting handles scrolling and browser history without adding a router
dependency. Old hash links such as /#plans are normalized to /plans.

Development and Vite preview provide SPA fallback. On a production static host,
configure these section paths to serve index.html with HTTP 200, retaining the
requested URL. For example, an Nginx location can use `try_files $uri $uri/ /index.html;`.
Do not redirect all routes to /, because that discards the selected section.

## GitHub Pages

`.github/workflows/deploy.yml` builds and deploys on every push to `master`.
It sets `BASE_PATH=/<repo-name>/` so assets and section links resolve under the
project URL, and copies `index.html` to each section folder (plus `404.html`) so
deep links such as `/pos-portfolio/plans` load the page. Local dev and builds
keep the root base `/`. In the repo settings, set Pages → Source to
"GitHub Actions".
