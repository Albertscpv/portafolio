# Portfolio — Christopher Monge Marín

Personal portfolio built as a deep-space instrument panel: a live star field, a
strict typographic grid, and three surface languages — **neumorphism**,
**glassmorphism** and **liquid** — used as real materials rather than decoration.

**Stack:** React 18 · TypeScript · Vite · TailwindCSS · Motion · Lenis

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script             | What it does                                   |
| ------------------ | ---------------------------------------------- |
| `npm run dev`      | Vite dev server with HMR                       |
| `npm run build`    | Type-check, then build to `dist/`              |
| `npm run preview`  | Serve the production build locally             |
| `npm run lint`     | ESLint, zero warnings tolerated                |
| `npm run typecheck`| TypeScript only                                |

## Structure

```
src/
├── data/          All copy and content — edit here, never in components
│   ├── site.ts        Name, roles, socials, nav
│   ├── experience.ts  Work timeline
│   ├── skills.ts      Skill groups + the AI-method section
│   ├── designs.ts     Gallery pieces
│   └── lab.ts         Specs and code snippets for the three surface styles
├── hooks/         usePointerVars, useSmoothScroll, useGithubRepos
├── components/
│   ├── background/    Star canvas, nebulae, cursor aura
│   ├── ui/            GlassPanel, NeuSurface, LiquidButton, Magnetic, Reveal…
│   ├── layout/        NavBar, Footer, page transitions, scroll progress
│   ├── sections/      Home page sections
│   └── lab/           Interactive demos for the Lab page
└── pages/         One file per route
```

**All copy lives in `src/data/`.** Changing what the site says never means
touching a component.

## Routes

| Path        | Page                                                        |
| ----------- | ----------------------------------------------------------- |
| `/`         | Hero, abstract, skills, AI method, surface teasers, CTA      |
| `/projects` | Repositories pulled live from the GitHub API, filterable     |
| `/work`     | Experience timeline with a scroll-linked progress rail       |
| `/designs`  | Gallery with a shared-element lightbox (arrows + `Esc`)      |
| `/lab`      | Live, documented demos of the three surface languages        |
| `/contact`  | Brief form, social handles, availability                     |

## The three surface languages

Each one simulates a different material, and each fails differently. `/lab`
demonstrates all three live, next to the exact CSS running them.

- **Neumorphism** — one sheet of material, extruded or pressed. Element and
  container must share a background color; one light source, top-left. Fails on
  contrast, so every control also carries a real border or accent on focus.
- **Glassmorphism** — `backdrop-filter: blur() saturate()`, a translucent tint,
  and a lit top edge. Needs motion behind it to read as glass. Expensive: it
  repaints every scroll frame, so it stays on a handful of surfaces.
- **Liquid** — an SVG metaball filter (`feGaussianBlur` + an `feColorMatrix`
  alpha crush) plus springs instead of durations, so highlights lag and settle.

## Performance and accessibility notes

- The star field is one `<canvas>` on a single `requestAnimationFrame` loop.
  Density scales with viewport area, it pauses on `visibilitychange`, and
  device pixel ratio is capped at 2.
- Pointer-driven effects write CSS custom properties outside React, so moving
  the mouse never triggers a re-render.
- GitHub responses are cached in `localStorage` for 30 minutes — the
  unauthenticated API allows 60 requests per hour per IP.
- `prefers-reduced-motion` is honoured everywhere: springs stop, smooth scroll
  is never installed, the star field renders one still frame, and the layout is
  unchanged.
- Keyboard: skip link, visible focus rings, `Esc` and arrow keys in the
  lightbox, `aria-expanded` on the mobile menu.

## Credits

Type is [Satoshi](https://www.fontshare.com/fonts/satoshi) by Deni Anggara
(Indian Type Foundry), included under `public/Satoshi_Complete/`.
