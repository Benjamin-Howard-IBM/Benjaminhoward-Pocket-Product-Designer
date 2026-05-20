# Overview and Getting Started

Carbon is IBM's open source design system for products and digital experiences. With the IBM Design Language as its foundation, Carbon provides working code, design tools, human interface guidelines, and a community of contributors.

## What Carbon Is

Carbon is a collection of pre-built, reusable assets: components, patterns, guidance, and code. It allows teams to build consistent digital experiences faster by reusing well-tested building blocks instead of rebuilding basic elements.

The system is named after the element carbon, which builds complex structures from simpler compounds. The motif mirrors how individual styles and components combine to form complete interfaces.

Carbon is funded and built by IBM but is open source. Anyone can use it and contribute back.

## Guiding Principles

1. **Carbon is open.** A distributed effort, guided by the principles of the open source movement. Users are also makers.
2. **Carbon is inclusive.** Designed and built to be accessible to all, regardless of ability or situation.
3. **Carbon is modular and flexible.** Components are designed to work in any combination.
4. **Carbon puts the user first.** Built on rigorous research into users' needs.
5. **Carbon builds consistency.** Based on the IBM Design Language, every element is designed to work together.

## Framework Support

Carbon supports multiple code implementations. Frameworks and their primary maintainers:

| Framework        | Package                                   | Maintainer        |
|------------------|-------------------------------------------|-------------------|
| Elements         | `@carbon/styles`, `@carbon/colors`, etc.  | Carbon team       |
| React            | `@carbon/react`                           | Carbon team       |
| Web Components   | `@carbon/web-components`                  | Carbon team       |
| Angular          | `carbon-components-angular`               | Community         |
| Vue              | `@carbon/vue`                             | Community         |
| Svelte           | `carbon-components-svelte`                | Community         |

If a different framework is in use, components can still be built from Elements following the "other frameworks" guidance.

## Installation (React)

Carbon React is the primary framework for product UI work. It requires a build pipeline (Next.js, Vite, Parcel, Webpack, etc.).

```bash
# npm
npm install --save @carbon/react

# yarn
yarn add @carbon/react
```

Ensure peer dependencies are installed (React and React DOM at a compatible version).

### Importing a Component

```jsx
import { Button } from '@carbon/react';

function MyComponent() {
  return <Button>Save</Button>;
}
```

### Importing Styles (Sass)

Bring in all Carbon styles from a root or global stylesheet:

```scss
@use '@carbon/react';
```

Or import styles for a single component to keep bundle size small:

```scss
@use '@carbon/react/scss/components/button';
```

### Icons

`@carbon/react` ships icon components via the `@carbon/react/icons` entrypoint.

```jsx
import { Add } from '@carbon/react/icons';

function MyComponent() {
  return <Add />;
}
```

Full icon list: https://carbondesignsystem.com/elements/icons/library/

## Web Components Alternative

For framework-agnostic embedding or non-React stacks:

```bash
npm install --save @carbon/web-components
```

Web Components are maintained by the Carbon team and are kept feature-parity with React where possible.

## Package Structure

Carbon is organized as a monorepo. The packages most product teams use:

| Package                  | Contains                                              |
|--------------------------|-------------------------------------------------------|
| `@carbon/react`          | React components, includes styles and icon entrypoint |
| `@carbon/web-components` | Web Components implementation                         |
| `@carbon/styles`         | Sass styles, themes, and tokens                       |
| `@carbon/colors`         | Color palettes                                        |
| `@carbon/type`           | Type tokens, IBM Plex helpers                         |
| `@carbon/grid`           | 2x Grid Sass and CSS                                  |
| `@carbon/motion`         | Easing curves and duration tokens                     |
| `@carbon/themes`         | Theme tokens (White, Gray 10, Gray 90, Gray 100)      |
| `@carbon/icons-react`    | Standalone React icon library                         |
| `@carbon/layout`         | Spacing, breakpoints, mini unit helpers               |

## Development Loop

Carbon recommends Storybook for component development.

```bash
yarn storybook
# then open http://localhost:9000/
```

Stories live in `*.stories.js` files alongside each component.

## Storybook (React)

The React Storybook is the most up-to-date component reference:

https://react.carbondesignsystem.com/

API documentation appears under each component's "Docs" tab.

## Tutorial

Carbon publishes a tutorial that builds a small app with React and Next.js:

https://carbondesignsystem.com/developing/react-tutorial/overview/

## Browser Support

- Chrome (last 2 versions)
- Safari (last 2 versions)
- Firefox (last 2 versions)
- Edge (last 2 versions)

## Contributing

Carbon engages the community primarily through GitHub. File issues or feedback at https://github.com/carbon-design-system/carbon. Contributed components and patterns include a list of maintainers; the Carbon team triages maintenance requests that do not have a maintainer.
