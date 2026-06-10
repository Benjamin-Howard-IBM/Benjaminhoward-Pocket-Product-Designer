# Carbon Design System Reference

Carbon is IBM's open-source design system, providing design tokens, the 2x Grid, icons, and components published to npm.

Official documentation: https://carbondesignsystem.com

---

## Quick Reference

### Packages

- **@carbon/react** - React components + Sass styles (primary)
- **@carbon/web-components** - framework-agnostic custom elements (official)
- **@carbon/styles** - tokens, color, type, spacing, motion, grid (Sass)
- **@carbon/grid** - 2x Grid Sass utilities
- **@carbon/icons-react** - icon components
- **@carbon/pictograms-react** - pictogram components

### Installation

```bash
# React (includes styles + tokens)
npm install @carbon/react

# Web Components
npm install @carbon/web-components

# Icons only
npm install @carbon/icons-react
```

---

## React Setup

### 1. Install

```bash
npm install @carbon/react
```

### 2. Import Styles (Sass)

In your Sass entry point:

```scss
@use '@carbon/react';
```

This brings in tokens, grid, type, motion, and component styles. You can configure the theme and which layers to emit via Sass options.

### 3. Choose a Theme

```jsx
import { Theme } from '@carbon/react';

<Theme theme="g100">
  <App />
</Theme>
```

Themes: `white`, `g10`, `g90`, `g100`.

### 4. Use Components

```jsx
import { Button } from '@carbon/react';

<Button kind="primary">Save</Button>
```

---

## 2x Grid

```jsx
import { Grid, Column } from '@carbon/react';

<Grid>
  <Column sm={4} md={4} lg={8}>Left</Column>
  <Column sm={4} md={4} lg={8}>Right</Column>
</Grid>
```

- 16 columns, 8px mini-unit, 32px gutters (wide), 16px padding
- Breakpoints: `sm` 320 / `md` 672 / `lg` 1056 / `xlg` 1312 / `max` 1584
- Grid modes: wide (default), narrow (16px gutters), condensed (1px)

Sass alternative:

```scss
@use '@carbon/grid';
```

---

## Icons

```jsx
import { Add, TrashCan } from '@carbon/icons-react';

<Add size={20} />
```

Sizes: 16, 20, 24, 32. Provide an accessible label when an icon conveys meaning on its own.

---

## Design Tokens

### Sass

```scss
@use '@carbon/react';

.my-element {
  color: theme.$text-primary;
  background: theme.$background;
  padding: var(--cds-spacing-05); // 16px
}
```

### Type

```scss
@use '@carbon/type';

.heading {
  @include type.type-style('heading-03');
}
```

### Common token groups

- **Spacing**: `$spacing-01` (2px) ... `$spacing-13` (160px)
- **Color**: `$background`, `$layer-01/02/03`, `$text-primary/secondary/helper/on-color`, `$link-primary`, `$focus`, `$support-error/success/warning/info`, `$border-subtle/strong`
- **Type**: `body-01/02`, `heading-01..07`, `display-01..04`, `code-01/02`, `label-01/02`
- **Motion**: `@carbon/motion` durations + `productive`/`expressive` easing

Rule: reference tokens for color, spacing, type, and motion. Avoid hardcoded values.

---

## Browser Support

Current and recent versions of Chrome, Firefox, Safari, and Edge. Check the live docs for the exact matrix per release.

---

## Reference Architecture

This design system reference integrates with the pocket-product-designer-bootstrap pipeline:

- **Stage 4-5 (PDRs)** - specify Carbon components when defining interface elements
- **Stage 6 (Storybook)** - import `@carbon/react` components in stories (wrap in `Theme`/`Grid`)
- **Stage 7 (Showcase)** - use Carbon tokens and components in showcase builds

When writing PDRs that specify UI, prefer Carbon components over custom implementations:
- Use `Button`, `DataTable`, `TextInput`, `Modal` from `@carbon/react`
- Lay out on the 2x Grid
- Reference Carbon tokens for color, spacing, type
- Link component docs: https://carbondesignsystem.com/components/overview/components/

---

## Common Patterns

### Button with Icon

```jsx
import { Button } from '@carbon/react';
import { Save } from '@carbon/icons-react';

<Button kind="primary" renderIcon={Save}>Save</Button>
```

### Text Input

```jsx
import { TextInput } from '@carbon/react';

<TextInput
  id="username"
  labelText="Username"
  helperText="Your unique identifier"
  invalidText="This field is required"
/>
```

### Notification (inline)

```jsx
import { InlineNotification } from '@carbon/react';

<InlineNotification
  kind="success"
  title="Saved"
  subtitle="Changes saved successfully"
/>
```

### Modal

```jsx
import { Modal } from '@carbon/react';

<Modal
  open={open}
  modalHeading="Confirm action"
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  danger
  onRequestClose={close}
  onRequestSubmit={confirm}
>
  Are you sure you want to proceed?
</Modal>
```

---

## Quick Links

- **Component docs**: https://carbondesignsystem.com/components/overview/components/
- **Tokens / elements**: https://carbondesignsystem.com/elements/color/overview/
- **2x Grid**: https://carbondesignsystem.com/elements/2x-grid/overview/
- **Icons**: https://carbondesignsystem.com/elements/icons/library/
- **Accessibility**: https://carbondesignsystem.com/guidelines/accessibility/overview/
- **GitHub**: https://github.com/carbon-design-system/carbon
