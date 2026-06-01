# Data Oilers Landing — Infrastructure Spec

## 1. Current State

- Single monolithic `DataOilers.jsx` (624 lines, all inline styles, v1.0 amber palette)
- No `src/` directory, no component split, no CSS strategy
- `package.json` missing `dev`/`build`/`preview` scripts
- Vite config minimal (just react plugin)
- No linting, no formatting, no aliases
- Master prompt v2 (`dataoilers-master-prompt-v2.md`) defines target design system: aqua/deep-space, 3D isometric, HUD cinematic

---

## 2. Target Project Structure

```
data-oilers-web/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx                    # ReactDOM entry
│   ├── App.jsx                     # Root layout (global styles + section composition)
│   ├── styles/
│   │   ├── tokens.css              # CSS custom properties (colors, fonts, spacing)
│   │   ├── reset.css               # Minimal reset (box-sizing, margin, a cursor)
│   │   └── keyframes.css           # All @keyframes (do-up, iso-rotate, iso-float, etc.)
│   ├── hooks/
│   │   ├── useReveal.js            # IntersectionObserver scroll-reveal
│   │   ├── useCounter.js           # Animated counter
│   │   ├── useMouseParallax.js     # Mouse position normalized for parallax
│   │   └── useScrolled.js          # Boolean: scrollY > threshold
│   ├── components/
│   │   ├── ui/                     # Primitives (design system atoms)
│   │   │   ├── Brackets.jsx        # L-shaped HUD corner brackets
│   │   │   ├── Label.jsx           # Section label (mono, aqua, line prefix)
│   │   │   ├── Title.jsx           # Section title (Barlow Condensed 800)
│   │   │   ├── BtnPrimary.jsx      # Outlined aqua button with glow hover
│   │   │   ├── BtnGhost.jsx        # Text + arrow ghost button
│   │   │   ├── Tag.jsx             # Mono uppercase tag chip
│   │   │   └── HudReadout.jsx      # Telemetry text (SYS/ONLINE, LAT/LON, etc.)
│   │   ├── Nav.jsx                 # Fixed nav with scroll transition
│   │   ├── Hero/
│   │   │   ├── Hero.jsx            # Hero section composition
│   │   │   ├── Starfield.jsx       # 3-layer parallax star canvas
│   │   │   ├── Orbits.jsx          # SVG elliptical orbits with rotating nodes
│   │   │   └── IsometricCore.jsx   # 3D CSS isometric nucleus (rings, cube, pillars)
│   │   ├── MetricsBar.jsx          # HUD metrics strip with animated counters
│   │   ├── Constellation.jsx       # Interactive bezier node network
│   │   ├── Services/
│   │   │   ├── Services.jsx        # Section wrapper
│   │   │   └── ServiceCard.jsx     # Individual card with brackets, code, status
│   │   ├── ProcessIso.jsx          # 3D isometric stacked platforms
│   │   ├── TechStack.jsx           # Infinite marquee
│   │   ├── Contact/
│   │   │   ├── Contact.jsx         # Section wrapper
│   │   │   └── ContactQuestion.jsx # Individual FAQ-style question row
│   │   └── Footer.jsx              # 4-column footer with status bar
│   └── data/
│       ├── services.js             # SVCS array (codes, titles, descriptions, tags)
│       └── tech.js                 # TECHS array for marquee
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## 3. Tooling Setup

### 3.1 package.json scripts

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 3.2 Vite config additions

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' }
  }
});
```

### 3.3 Google Fonts

Load via `<link>` in `index.html` (not JS injection):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;700;800;900&family=JetBrains+Mono:wght@300;400;500&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet">
```

Note: v2 switches from IBM Plex Mono to **JetBrains Mono**.

---

## 4. CSS Strategy

**No Tailwind. No CSS-in-JS. Plain CSS with custom properties.**

Rationale: design system defines exact tokens; CSS variables map 1:1. Inline styles for layout-specific positioning. CSS files for tokens, resets, keyframes.

### 4.1 tokens.css

All CSS custom properties from design system v2 section 1.2. Single source of truth. Components reference via `var(--aqua)` etc.

### 4.2 keyframes.css

All animations from section 1.5: `do-up`, `iso-rotate`, `iso-float`, `core-pulse`, `flow`, `ring-spin`, `twinkle`, `pulse-glow`, `do-mq`.

### 4.3 Component styles

Inline styles for component-specific layout (position, flex, grid, padding). CSS variables for colors/fonts/spacing. No `.module.css` — keeps single-file simplicity per component while tokens stay centralized.

---

## 5. Component Architecture

### 5.1 Primitives (src/components/ui/)

Reusable atoms from design system section 1.6:

| Component | Props | Purpose |
|---|---|---|
| `Brackets` | `size`, `thick`, `color`, `inset` | 4 L-shaped corners (absolute positioned) |
| `Label` | `children` | Section eyebrow: line + mono uppercase aqua text |
| `Title` | `children`, `style` | Section title: Barlow Condensed 800, clamp sizing |
| `BtnPrimary` | `href`, `children`, `onClick` | Outlined aqua, glow + brackets on hover |
| `BtnGhost` | `href`, `children` | Text + animated arrow |
| `Tag` | `children`, `active` | Mono tag chip, border highlights on parent hover |
| `HudReadout` | `children`, `position` | Telemetry label (corner placement) |

### 5.2 Sections

Each section = standalone component, receives no props (data lives in `src/data/` or inline).

Composition order in `App.jsx`:
```
Nav → Hero → MetricsBar → Constellation → Services → ProcessIso → TechStack → Contact → Footer
```

### 5.3 Hooks

| Hook | Signature | Purpose |
|---|---|---|
| `useReveal` | `(threshold?) → [ref, visible]` | IntersectionObserver, fires once |
| `useCounter` | `(target, active) → displayValue` | Animated number counter |
| `useMouseParallax` | `(intensity?) → {x, y}` | Normalized mouse position for parallax |
| `useScrolled` | `(threshold?) → boolean` | Nav scroll state |

---

## 6. Migration Plan (v1 → v2)

### Phase 1: Infrastructure (this spec)
1. Create `src/` directory structure
2. Move entry point to `src/main.jsx`
3. Create CSS files (tokens, reset, keyframes)
4. Update `index.html` (fonts, CSS imports, entry point)
5. Update `package.json` (scripts, type: module)
6. Update `vite.config.js` (alias)
7. Create `App.jsx` shell with global CSS imports
8. Extract hooks to `src/hooks/`
9. Create UI primitives (`Brackets`, `Label`, `Title`, buttons)
10. Create empty section component shells

### Phase 2: Section Implementation
- Build each section component following master prompt v2 spec
- Start with Hero (highest complexity: starfield + orbits + isometric core)
- Move outward: MetricsBar → Constellation → Services → ProcessIso → TechStack → Contact → Footer

### Phase 3: Polish
- Responsive breakpoints (<900px)
- Performance (canvas optimization, will-change, lazy observer cleanup)
- Accessibility (semantic HTML, aria-labels, reduced-motion media query)
- SEO meta tags

---

## 7. Key Design System Changes (v1 → v2)

| Aspect | v1 (current) | v2 (target) |
|---|---|---|
| Primary color | Amber `#FF6B1A` | Aqua `#0FFFA8` |
| Backgrounds | `#07090D` range | `#03060E` range (deeper) |
| Mono font | IBM Plex Mono | JetBrains Mono |
| Hero animation | Pipeline particle canvas | Starfield + orbits + 3D isometric core |
| Buttons | Solid amber fill, clip-path | Outlined aqua, glow hover, brackets |
| Cards | Hover top-bar reveal | Full bracket frame, code headers, status indicator |
| Network viz | N/A | Interactive bezier constellation |
| Process section | Linear flow boxes | 3D isometric stacked platforms (CSS preserve-3d) |
| HUD elements | Minimal | Full telemetry readouts in corners/margins |
| Footer | Simple 3-part | 4-column with status bar |

---

## 8. Technical Constraints

- **Single repo, no SSR** — static SPA via Vite
- **Zero external UI libs** — no Tailwind, MUI, Chakra, Framer Motion
- **Animations** — CSS keyframes + requestAnimationFrame for canvas/SVG
- **React 19** — already installed
- **Deploy target** — static build (`dist/`), host TBD
- **No localStorage/sessionStorage** — per master prompt spec
- **No border-radius > 2px** — except perfect circles (orbits, nodes)

---

## 9. File Priority (build order)

```
HIGH (infrastructure, needed by everything):
  src/styles/tokens.css
  src/styles/reset.css
  src/styles/keyframes.css
  src/main.jsx
  src/App.jsx
  index.html (updated)
  package.json (updated)
  vite.config.js (updated)

HIGH (primitives, needed by sections):
  src/hooks/useReveal.js
  src/hooks/useCounter.js
  src/hooks/useScrolled.js
  src/hooks/useMouseParallax.js
  src/components/ui/Brackets.jsx
  src/components/ui/Label.jsx
  src/components/ui/Title.jsx
  src/components/ui/BtnPrimary.jsx
  src/components/ui/BtnGhost.jsx
  src/components/ui/Tag.jsx
  src/components/ui/HudReadout.jsx

MEDIUM (sections, parallel-buildable):
  src/components/Nav.jsx
  src/components/Hero/*
  src/components/MetricsBar.jsx
  src/components/Constellation.jsx
  src/components/Services/*
  src/components/ProcessIso.jsx
  src/components/TechStack.jsx
  src/components/Contact/*
  src/components/Footer.jsx

LOW (data, trivial):
  src/data/services.js
  src/data/tech.js
```
