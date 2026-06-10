# Carbon Design System: Foundations

## Overview

Carbon's foundations encode the IBM Design Language into reusable, accessible building blocks: the 2x Grid, spacing, color and themes, typography, motion, and tokens. Use tokens and the grid for every styling decision rather than hardcoded values.

---

## 1. The 2x Grid

**Definition**: Carbon's responsive layout grid, built on a base-2 system.

**Key Specs**:
- **Mini-unit**: 8px. All spacing and sizing derive from multiples of 8 (with a 2px sub-step for fine type alignment).
- **Columns**: up to 16 columns.
- **Gutters**: 32px (16px on each side of a column).
- **Margin/padding**: 16px outer padding.
- **Breakpoints**:

| Breakpoint | Min width | Columns | Notes |
|-----------|-----------|---------|-------|
| Small (`sm`) | 320px | 4 | Small phones |
| Medium (`md`) | 672px | 8 | Tablets |
| Large (`lg`) | 1056px | 16 | Small desktops |
| X-Large (`xlg`) | 1312px | 16 | Large desktops |
| Max (`max`) | 1584px | 16 | Very large screens |

**Grid modes**: wide (default 32px gutter), narrow (16px), condensed (1px). Use `Grid`/`Column` in React or `@carbon/grid` Sass.

**Aspect ratio**: Carbon provides aspect-ratio utilities for media within grid columns.

---

## 2. Spacing

**Definition**: A token-based spacing scale built on the 8px mini-unit (with 2px steps at small sizes).

**Scale (tokens `$spacing-01` ... `$spacing-13`)**:
- `spacing-01` = 2px
- `spacing-02` = 4px
- `spacing-03` = 8px
- `spacing-04` = 12px
- `spacing-05` = 16px
- `spacing-06` = 24px
- `spacing-07` = 32px
- `spacing-08` = 40px
- `spacing-09` = 48px
- `spacing-10` = 64px
- `spacing-11` = 80px
- `spacing-12` = 96px
- `spacing-13` = 160px

Use spacing tokens for margins, padding, and gaps. Do not hardcode pixel values.

---

## 3. Color and Themes

**Definition**: Color is delivered through tokens mapped to four built-in themes.

**Themes**:
- **White** - light
- **Gray 10** - light, slightly dimmed
- **Gray 90** - dark
- **Gray 100** - darkest

**Token model**: Color tokens are semantic and role-based, not raw hex values. Categories include:
- **Background**: `background`, `layer-01/02/03`, `field-01/02`
- **Text**: `text-primary`, `text-secondary`, `text-helper`, `text-on-color`, `text-disabled`
- **Interactive**: `interactive`, `link-primary`, `focus`
- **Support**: `support-error`, `support-success`, `support-warning`, `support-info`
- **Border**: `border-subtle`, `border-strong`, `border-interactive`

Switching themes reassigns the same tokens, so token-based UI adapts automatically. Use the `Theme` component (React) to scope a theme.

---

## 4. Typography

**Definition**: The IBM Plex type family applied through a token-based type scale.

**Key Aspects**:
- **Typeface**: IBM Plex Sans (primary), IBM Plex Mono (code), IBM Plex Serif (optional).
- **Type sets / tokens**: productive and expressive styles, e.g. `body-01`, `body-02`, `heading-01`...`heading-07`, `display-01`...`display-04`, `code-01/02`, `label-01/02`, `helper-text-01/02`.
- **Type scale**: defined steps; use `@carbon/type` tokens / Sass mixins (`@include type-style('heading-03')`).
- **Fluid type**: expressive styles can scale across breakpoints.

Use type tokens rather than raw font-size/line-height.

---

## 5. Motion

**Definition**: Motion communicates state changes and guides attention.

**Key Aspects**:
- **Easing**: `productive` (efficient, for frequent actions) and `expressive` (more pronounced, for moments of emphasis).
- **Standard easing curves**: `standard`, `entrance`, `exit`.
- **Duration tokens**: fast-01/02, moderate-01/02, slow-01/02 scaled to the size and importance of the motion.

Use `@carbon/motion` tokens. Keep functional motion subtle; reserve expressive motion for key moments.

---

## 6. Icons and Pictograms

- **Icons**: functional UI glyphs at 16, 20, 24, 32px from `@carbon/icons-react`.
- **Pictograms**: larger illustrative marks from `@carbon/pictograms-react`.
- Use icons for actions and status; pictograms for concepts and empty/marketing states.

---

## 7. Tokens

**Definition**: Named design decisions (color, type, spacing, motion, layout) shared across design and code.

**Purpose**: Centralize decisions so themes and updates propagate automatically.

**Implementation**: Provided through `@carbon/styles` (and re-exported by `@carbon/react`). Consume as Sass tokens/mixins or CSS custom properties.

**Rule**: Reference tokens for all color, spacing, type, and motion. Avoid hardcoded values.

---

## 8. Accessibility (Foundation)

**Principle**: Carbon targets WCAG 2.1 Level AA as a baseline.

**Key Aspects**:
- **Contrast**: 4.5:1 for normal text, 3:1 for large text and non-text UI (icons, borders, focus indicators).
- **Focus**: visible focus indicators on all interactive elements via the `focus` token.
- **Keyboard**: every interactive component is operable by keyboard.
- **Semantics**: correct roles, names, and states; managed in Carbon components but must be preserved when composing.

See `04-Guidelines-and-Patterns.md` for the detailed accessibility guidance.

---

## How Foundations Work Together

- **2x Grid + Spacing** create consistent layout rhythm.
- **Color tokens + Themes** keep UI adaptable and contrast-safe.
- **Type tokens** maintain hierarchy and readability.
- **Motion tokens** keep transitions coherent.
- **Tokens** tie design and code together so changes scale.

---

## For Designers

1. Lay out on the 2x Grid; align to the 8px mini-unit.
2. Use color, type, and spacing tokens, not raw values.
3. Design for at least two themes (one light, one dark) where relevant.
4. Include focus and other interactive states.
5. Verify contrast at 4.5:1 (text) and 3:1 (non-text).

## For Engineers

1. `@use '@carbon/react';` and consume tokens via Sass/CSS variables.
2. Use `Grid`/`Column` for layout.
3. Apply type with `@carbon/type` mixins or tokens.
4. Use motion tokens for transitions.
5. Never strip focus styling; preserve component semantics.
