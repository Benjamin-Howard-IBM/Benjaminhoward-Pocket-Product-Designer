# Carbon Design System: Overview and Getting Started

## What is Carbon?

Carbon is IBM's open-source design system for products and digital experiences. It provides design guidelines, a component library, design tokens, the 2x Grid, and accessibility standards so teams can build consistent, accessible interfaces grounded in the IBM Design Language.

## Purpose and Goals

- Create a consistent user experience across IBM products and beyond
- Provide accessible components that meet WCAG 2.1 AA
- Accelerate design and development with shared, tested building blocks
- Encode the IBM Design Language into reusable tokens and patterns
- Let teams focus on product-specific problems instead of base UI

## Core Principles

Carbon emphasizes:

- **Open**: open source, contributed to and used across and outside IBM
- **Inclusive**: accessible by default, designed for the widest range of people
- **Modular**: composable components and tokens
- **Consistent**: shared foundations create coherent experiences across teams

---

## For Engineers: Getting Started

### Primary Package (React)

```bash
npm install @carbon/react
```

`@carbon/react` includes the React components, Sass styles, and access to Carbon tokens, grid, type, and motion.

### Web Components

```bash
npm install @carbon/web-components
```

Framework-agnostic custom elements, officially supported by the Carbon team.

### Additional / Element Packages

```bash
# Design tokens, color, spacing, type, motion, layout (used under @carbon/react)
npm install @carbon/styles

# 2x Grid utilities (Sass)
npm install @carbon/grid

# Icons
npm install @carbon/icons-react

# Pictograms
npm install @carbon/pictograms-react
```

### Framework Support

| Framework | Status |
|-----------|--------|
| **React** (`@carbon/react`) | Official, primary |
| **Web Components** (`@carbon/web-components`) | Official |
| Angular | Community-maintained (`carbon-components-angular`) |
| Vue | Community-maintained |
| Svelte | Community-maintained (`carbon-components-svelte`) |

In Carbon v11 the older `carbon-components` / `carbon-components-react` packages are consolidated into `@carbon/react` and `@carbon/styles`. Angular and Vue framework doc pages are not part of the v11 site; use the community repos.

### Setup Steps (React)

1. **Install** `@carbon/react`
2. **Import styles** in your Sass entry: `@use '@carbon/react';`
3. **Choose a theme** (White, Gray 10, Gray 90, Gray 100) via the `Theme` component or Sass theme config
4. **Import components** as needed: `import { Button } from '@carbon/react';`
5. **Lay out on the 2x Grid** using `Grid` / `Column` (or `@carbon/grid` Sass)
6. **Use tokens**, not hardcoded values, for color, spacing, and type

### Browser Support

Carbon supports current and recent versions of evergreen browsers (Chrome, Firefox, Safari, Edge). Check the live docs for the exact support matrix per release.

---

## Package Structure

| Package | Purpose |
|---------|---------|
| `@carbon/react` | React component library + styles (primary) |
| `@carbon/web-components` | Framework-agnostic custom elements |
| `@carbon/styles` | Tokens, color, type, spacing, motion, grid (Sass) |
| `@carbon/grid` | 2x Grid Sass utilities |
| `@carbon/icons-react` | Icon components |
| `@carbon/pictograms-react` | Pictogram components |
| `@carbon/elements` | Umbrella package re-exporting element packages |

---

## Resources

- **Documentation**: https://carbondesignsystem.com
- **Get started (developing)**: https://carbondesignsystem.com/developing/get-started/
- **Get started (designing)**: https://carbondesignsystem.com/designing/get-started/
- **Components**: https://carbondesignsystem.com/components/overview/components/
- **2x Grid**: https://carbondesignsystem.com/elements/2x-grid/overview/
- **GitHub**: https://github.com/carbon-design-system/carbon

---

## Contributing

Carbon is open source. Teams can request components and patterns, file issues, and contribute back through the Carbon GitHub repositories. New shared work goes through the Carbon contribution process and design review.
