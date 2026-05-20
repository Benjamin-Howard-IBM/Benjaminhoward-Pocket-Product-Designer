# Carbon Design System Reference

Carbon is IBM's open source design system, providing design tokens, icons, components, and patterns maintained in a monorepo and published to npm.

Official documentation: https://carbondesignsystem.com

---

## Quick Reference

### Packages

- **@carbon/react** - React components, styles, and icon entrypoint
- **@carbon/web-components** - Web Components implementation
- **@carbon/styles** - Sass styles, themes, and tokens (no JS)
- **@carbon/themes** - Theme tokens (White, Gray 10, Gray 90, Gray 100)
- **@carbon/colors** - IBM color palettes
- **@carbon/type** - IBM Plex type tokens
- **@carbon/grid** - 2x Grid Sass and CSS
- **@carbon/motion** - Easing and duration tokens
- **@carbon/layout** - Spacing, breakpoints, mini units
- **@carbon/icons-react** - Standalone React icon library

### Installation

```bash
# React (recommended for product UI)
npm install --save @carbon/react

# Web Components (framework-agnostic)
npm install --save @carbon/web-components

# Elements only (no components)
npm install --save @carbon/styles
```

Ensure the peerDependencies for `@carbon/react` (React and React DOM) are installed.

---

## React Setup

### 1. Install

```bash
npm install --save @carbon/react
```

### 2. Choose Style Import Method

**Option A: Sass (recommended)**

Add to your global stylesheet (for example `app.scss`):

```scss
// Bring in all of Carbon
@use '@carbon/react';
```

Or import only the components you use:

```scss
@use '@carbon/react/scss/components/button';
@use '@carbon/react/scss/components/text-input';
@use '@carbon/react/scss/components/data-table';
```

Tooling: any modern bundler that supports Sass (Vite, Next.js, Webpack with sass-loader, Parcel).

**Option B: Prebuilt CSS**

If you cannot use Sass, import the published CSS from the package directly:

```js
import '@carbon/styles/css/styles.css';
```

### 3. Configure a Theme

Carbon ships four themes. The default is White. To apply a different theme on the document root, set the `data-carbon-theme` attribute or wrap the app in the `Theme` component:

```jsx
import { Theme } from '@carbon/react';

function App() {
  return (
    <Theme theme="g100">
      <YourApp />
    </Theme>
  );
}
```

Theme values: `white`, `g10`, `g90`, `g100`.

### 4. Use Components

```jsx
import { Button, TextInput, InlineNotification } from '@carbon/react';

function MyComponent() {
  return (
    <>
      <TextInput id="email" labelText="Email" placeholder="you@ibm.com" />
      <Button>Save</Button>
      <InlineNotification kind="success" title="Saved" subtitle="Your changes are live." />
    </>
  );
}
```

---

## Icons

### React

Icons are available via the `@carbon/react/icons` entrypoint or the standalone `@carbon/icons-react` package.

```jsx
import { Add, ArrowRight, Save, TrashCan } from '@carbon/react/icons';

<Button renderIcon={Add}>Create</Button>
<Add size={16} />
<ArrowRight size={20} />
```

Sizes: 16 (default), 20, 24, 32.

Full icon catalog: https://carbondesignsystem.com/elements/icons/library/

### Web Components

```html
<script type="module">
  import '@carbon/icons/lib/add/16.js';
</script>

<cds-icon-add size="16"></cds-icon-add>
```

### Animated Loading Icon

Use the `Loading` component or `InlineLoading` rather than animating an icon directly.

```jsx
import { Loading, InlineLoading } from '@carbon/react';

<Loading withOverlay={false} small />
<InlineLoading status="active" description="Saving..." />
```

---

## Design Tokens

### CSS Custom Properties

Carbon emits CSS custom properties prefixed with `--cds-`. Common ones:

```css
.my-element {
  background: var(--cds-background);
  color: var(--cds-text-primary);
  border: 1px solid var(--cds-border-subtle-01);
  padding: var(--cds-spacing-05); /* 16 px */
}
```

### Sass Tokens

When using Sass, reference tokens by name:

```scss
@use '@carbon/styles/scss/theme' as *;
@use '@carbon/styles/scss/spacing' as *;

.my-element {
  background: $background;
  color: $text-primary;
  border: 1px solid $border-subtle-01;
  padding: $spacing-05;
}
```

### Common Spacing Tokens

| Token         | Value |
|---------------|-------|
| `$spacing-01` | 2 px  |
| `$spacing-02` | 4 px  |
| `$spacing-03` | 8 px  |
| `$spacing-04` | 12 px |
| `$spacing-05` | 16 px |
| `$spacing-06` | 24 px |
| `$spacing-07` | 32 px |
| `$spacing-08` | 40 px |
| `$spacing-09` | 48 px |
| `$spacing-10` | 64 px |
| `$spacing-11` | 80 px |
| `$spacing-12` | 96 px |
| `$spacing-13` | 160 px|

### Theme Switching

```jsx
import { Theme } from '@carbon/react';

<Theme theme="white">
  <PageContent />
</Theme>

<Theme theme="g100">
  <DarkSection />
</Theme>
```

Inline theming: wrap a region with `Theme` to flip themes without affecting siblings.

---

## Internationalization

Carbon components ship with English strings as defaults. Each component exposes label props (`iconDescription`, `closeButtonLabel`, `ariaLabel`, etc.) so apps can pass translated strings from their own i18n layer (react-intl, i18next, Lingui, FormatJS).

```jsx
<Modal
  modalHeading={t('confirm.title')}
  primaryButtonText={t('confirm.action')}
  secondaryButtonText={t('cancel')}
/>
```

For right-to-left (RTL) languages, set `dir="rtl"` on the root element. Carbon mirrors interactive elements automatically.

---

## Browser Support

- Chrome: last 2 versions
- Safari: last 2 versions
- Firefox: last 2 versions
- Microsoft Edge: last 2 versions

---

## Editor Setup

### VSCode Extensions

1. **Sass** - syntax highlighting and IntelliSense for `.scss` files.
2. **ESLint** - applies Carbon's recommended rules.
3. **Prettier** - keeps formatting consistent.

---

## Reference Architecture

This Carbon reference integrates with the pocket-product-designer-bootstrap pipeline:

- **Stage 4-5 (PDRs)** - When specifying UI in a PDR, prefer named Carbon components and tokens over custom implementations.
- **Stage 6 (Storybook)** - Import Carbon components into stories for low-fidelity wireframes and prototypes.
- **Stage 7 (Showcase)** - Use Carbon tokens and components in the showcase build for review-ready artifacts.

When writing PDRs that specify UI, prefer Carbon components:

- Use `Button` instead of generic buttons.
- Use `TextInput`, `Dropdown`, `ComboBox`, `Checkbox`, `RadioButton`, `Toggle` for form input.
- Use `DataTable` for tabular data.
- Use `Modal` or `ComposedModal` for dialogs.
- Use `InlineNotification`, `ToastNotification`, `ActionableNotification` for system feedback.
- Reference Carbon tokens for color, spacing, type, motion.
- Link to component docs at https://carbondesignsystem.com/components/ and the React Storybook at https://react.carbondesignsystem.com/.

---

## Common Patterns

### Button with Icon

```jsx
import { Button } from '@carbon/react';
import { Save } from '@carbon/react/icons';

<Button renderIcon={Save}>Save changes</Button>
```

### Form Input with Helper and Error

```jsx
import { TextInput } from '@carbon/react';

<TextInput
  id="username"
  labelText="Username"
  helperText="Your unique identifier"
  invalid={hasError}
  invalidText="Username is required"
/>
```

### Inline Notification

```jsx
import { InlineNotification } from '@carbon/react';

<InlineNotification
  kind="success"
  title="Changes saved"
  subtitle="Your project settings are up to date."
/>
```

### Modal

```jsx
import { Modal } from '@carbon/react';

<Modal
  open={open}
  onRequestClose={() => setOpen(false)}
  modalHeading="Delete project"
  primaryButtonText="Delete"
  secondaryButtonText="Cancel"
  danger
>
  This action cannot be undone.
</Modal>
```

### DataTable

```jsx
import {
  DataTable,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '@carbon/react';

<DataTable rows={rows} headers={headers}>
  {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
    <Table {...getTableProps()}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow {...getRowProps({ row })}>
            {row.cells.map((cell) => (
              <TableCell key={cell.id}>{cell.value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )}
</DataTable>
```

---

## Quick Links

- **Component docs**: https://carbondesignsystem.com/components/button/usage/
- **React Storybook**: https://react.carbondesignsystem.com/
- **Design tokens (color)**: https://carbondesignsystem.com/elements/color/tokens/
- **Icons catalog**: https://carbondesignsystem.com/elements/icons/library/
- **Figma library**: https://carbondesignsystem.com/designing/kits/figma/
- **GitHub**: https://github.com/carbon-design-system/carbon
- **Motion Generator**: https://ibm.github.io/motion/
