# Carbon Design Foundations

Carbon's foundations apply across every component and pattern. They are the layer that determines how a Carbon interface looks and feels.

## 1. Color

Carbon uses **tokens and themes** to manage color. Tokens are role-based; themes assign values to those roles.

### Themes

| Theme    | Type  | `$background` value |
|----------|-------|---------------------|
| White    | Light | `#ffffff`           |
| Gray 10  | Light | `#f4f4f4`           |
| Gray 90  | Dark  | `#262626`           |
| Gray 100 | Dark  | `#161616`           |

A theme is a collection of colors designed to create a specific aesthetic. Themes control which value gets assigned to a token. Roles cannot change between themes; only values do.

### Layering Model

The layering model defines how colors stack to create depth and spatial associations.

- **Light themes**: Layers alternate between White and Gray 10 with each added layer.
- **Dark themes**: Layers become one step lighter with each added layer (Gray 100 → Gray 90 → Gray 80 → Gray 70).

Avoid midtones (Gray 30–60) for layer backgrounds. Do not apply components darker than the background unless you are intentionally using a high-contrast moment.

### Token Groups

Core tokens are grouped by the UI element they apply to:

| Token group | Applied to                                                |
|-------------|-----------------------------------------------------------|
| Background  | Page or primary backgrounds                               |
| Layer       | Stacked backgrounds (includes layering tokens)            |
| Field       | Form and input backgrounds (includes layering tokens)     |
| Border      | Dividers, rules, borders (includes layering tokens)       |
| Text        | Type and type styles                                      |
| Link        | Standalone and inline links                               |
| Icon        | Icons and pictograms                                      |
| Support     | Notification elements and status indicators               |
| Focus       | Focus states                                              |
| Skeleton    | Skeleton states                                           |

Stand-alone tokens include `$overlay`, `$highlight`, `$interactive`.

### Token Naming

Format: `${element}-{role}-{state?}`

Examples:
- `$background`, `$background-hover`
- `$text-primary`, `$text-secondary`, `$text-disabled`
- `$border-subtle`, `$border-strong`
- `$support-error`, `$support-success`, `$support-warning`, `$support-info`
- `$button-primary`, `$button-primary-active`, `$button-primary-hover`

### Interaction States

Carbon defines five interaction states. Token suffixes:

| State     | Suffix      | Logic                                                                  |
|-----------|-------------|------------------------------------------------------------------------|
| Hover     | `-hover`    | Half step between adjacent grade steps                                 |
| Active    | `-active`   | Two full steps lighter (100–70) or darker (60–10)                      |
| Selected  | `-selected` | One full step lighter (100–70) or darker (60–10)                       |
| Focus     | n/a         | Single `$focus` color per theme; 2 px border; 3:1 contrast required    |
| Disabled  | `-disabled` | Gray family only; not subject to WCAG contrast standards               |

`$focus` is Blue 60 in light themes and White in dark themes. Use `$focus-inverse` for high-contrast moments and `$focus-inset` to ensure 3:1 contrast against the element behind it.

## 2. Typography

Carbon uses **IBM Plex**, an open-source typeface in three families:

- IBM Plex Sans (UI default)
- IBM Plex Serif (editorial)
- IBM Plex Mono (code)

Font stacks:

```css
font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
font-family: 'IBM Plex Serif', 'Georgia', Times, serif;
font-family: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', Courier, monospace;
```

### Productive vs Expressive Type Sets

| Set        | Used for                                  | Token suffix |
|------------|-------------------------------------------|--------------|
| Productive | Product UI, dense content, task focus     | `-01`        |
| Expressive | Editorial, marketing, long-form reading   | `-02`        |

Productive headings are fixed sizes. Expressive headings are responsive and change size at breakpoints.

### Weights

Use IBM Plex **Light (300)**, **Regular (400)**, and **SemiBold (600)** for digital experiences. SemiBold is ideal for section headers; do not use SemiBold for long text. Italic styles are reserved for emphasis (titles of works, technical terms, device names, captions).

### Scale Formula

The IBM type scale uses a single formula assuming y₀ = 12 px:

```
Xn = Xn-1 + {INT[(n-2)/4] + 1} * 2
```

Common steps (rem / px):

| rem    | px |
|--------|----|
| 0.75   | 12 |
| 0.875  | 14 |
| 1      | 16 |
| 1.125  | 18 |
| 1.25   | 20 |
| 1.5    | 24 |
| 1.75   | 28 |
| 2      | 32 |
| 2.25   | 36 |
| 2.625  | 42 |
| 3      | 48 |

## 3. 2x Grid

The **2x Grid** is the geometric foundation of Carbon. Its core concept: divide or multiply by two to form a visual rhythm.

### Mini Unit

The base unit is an **8 px square**. Multiples of mini units compose column widths, row heights, margins, and padding.

### Grid Behaviors

- **Fluid grid**: divides space by twos; column count is constant within a breakpoint; column width scales with screen size.
- **Fixed grid**: tiles fixed-size boxes; column count grows with viewport width.
- **Hybrid**: different scaling per dimension (header is fluid width, fixed height).

### Standard Breakpoints

| Breakpoint | Value (px / rem) | Columns | Padding | Margin |
|------------|------------------|---------|---------|--------|
| Small      | 320 / 20         | 4       | 16 px   | 0      |
| Medium     | 672 / 42         | 8       | 16 px   | 16 px  |
| Large      | 1056 / 66        | 16      | 16 px   | 16 px  |
| X-Large    | 1312 / 82        | 16      | 16 px   | 16 px  |
| Max        | 1584 / 99        | 16      | 16 px   | 24 px  |

Padding is always **16 px** at all standard breakpoints. Always align type to the edge of box padding.

### Gutters

Gutters can be absent (gutterless) or present (32 px total: 16 px padding on each side of the column). Apply gutters when content benefits from separation.

## 4. Spacing (Sizing Scale)

Fixed sizing scale, expressed in mini units:

| Size (px) | Mini units |
|-----------|------------|
| 8         | 1x         |
| 16        | 2x         |
| 24        | 3x         |
| 32        | 4x         |
| 48        | 6x         |
| 64        | 8x         |
| 80        | 10x        |

Apply this scale to icon sizes, tile sizes, and vertical margin spacing. For fluid grids, the column width itself is the base unit.

### Aspect Ratios

When sizing boxes, constrain to one of: **1:1, 2:1, 2:3, 3:2, 4:3, 16:9** in either portrait or landscape orientation.

## 5. Motion

Carbon defines two motion styles:

- **Productive motion**: efficient, responsive, subtle. Used for component microinteractions (button states, dropdowns, table sorts).
- **Expressive motion**: enthusiastic, vibrant, highly visible. Used for significant moments (page transitions, primary action confirmations, notifications).

### Easing Curves

| Curve     | Productive                          | Expressive                          |
|-----------|-------------------------------------|-------------------------------------|
| Standard  | `cubic-bezier(0.2, 0, 0.38, 0.9)`   | `cubic-bezier(0.4, 0.14, 0.3, 1)`   |
| Entrance  | `cubic-bezier(0, 0, 0.38, 0.9)`     | `cubic-bezier(0, 0, 0.3, 1)`        |
| Exit      | `cubic-bezier(0.2, 0, 1, 0.9)`      | `cubic-bezier(0.4, 0.14, 1, 1)`     |

Use **standard** when an element is visible from start to end (expanding tile, table row sort).
Use **entrance** when an element enters the view (modal, toast appearing, dropdown opening).
Use **exit** when an element leaves the view permanently. Use standard easing for elements that leave but stay nearby (side panel).

### Duration Tokens

| Token                | Use case                                              | Value |
|----------------------|-------------------------------------------------------|-------|
| `duration-fast-01`   | Micro-interactions: button, toggle                    | 70 ms |
| `duration-fast-02`   | Micro-interactions: fade                              | 110 ms|
| `duration-moderate-01` | Small expansion, short distance movements           | 150 ms|
| `duration-moderate-02` | Expansion, system communication, toast              | 240 ms|
| `duration-slow-01`   | Large expansion, important system notifications       | 400 ms|
| `duration-slow-02`   | Background dimming                                    | 700 ms|

Duration should be dynamic based on size: larger movement gets longer duration. Use the [IBM Motion Generator](https://ibm.github.io/motion/) for custom values.

## 6. Themes

Carbon ships four themes. Pick one as the base for the application and use inline theming when high-contrast moments are needed (a dark UI Shell on a light page).

| Theme    | Layer rule                                            |
|----------|-------------------------------------------------------|
| White    | Background White; first layer Gray 10; alternate.     |
| Gray 10  | Background Gray 10; first layer White; alternate.     |
| Gray 90  | Background Gray 90; each layer one step lighter.      |
| Gray 100 | Background Gray 100; each layer one step lighter.     |

Use `inverse` tokens (such as the tooltip's) for built-in high-contrast moments. Use inline theming when a section needs to flip themes within the page.

## 7. Icons

Carbon icons are framework-agnostic SVGs available through `@carbon/icons-react` or via the `@carbon/react/icons` entrypoint.

### Sizes

- 16 px (default in buttons, inputs, small contexts)
- 20 px (large expressive buttons)
- 24 px (callouts, larger affordances)
- 32 px (header, dashboards)

### Rules

- Default icon variations should be used everywhere except status icons.
- Universal action icons (Add, Edit, Copy, Trash can, Subtract alt, Export, Upload, Download, Play, Pause, Stop outline, Restart) should not be reused for unrelated actions.
- Icon color must match the label color in a button.
- 8 px spacing between label and icon in ghost buttons.
- Filled variants are reserved (most are status icons); do not substitute filled for default.

## 8. Accessibility

Carbon targets **WCAG 2.1 AA**. Accessibility testing status is published per component on the Carbon site.

### Contrast Ratios

- Small text (below 24 px): **4.5:1** minimum.
- Large text (24 px and above): **3:1** minimum.
- Graphical elements (data viz, icons that carry meaning): **3:1** minimum.
- Focus rings: **3:1** against adjacent colors.

The IBM palette has 12 grades. The minimum step count between two grades to hit each ratio is documented in the Carbon Color overview.

### Focus

Focus is required on all interactive elements. Carbon's default focus is a 2 px border in `$focus` (Blue 60 in light themes, White in dark themes). Use `$focus-inset` when needed to maintain 3:1 against the element behind.

### Keyboard

All interactive components must be reachable and operable with the keyboard. Tab order should follow visual order. Trigger buttons with `Enter` or `Space`. Carbon documents keyboard interactions on each component's "Accessibility" tab.

### Resources

- [IBM Accessibility requirements](https://www.ibm.com/able/requirements/requirements/)
- [IBM Accessibility toolkit](https://www.ibm.com/able/)
- [W3C WCAG 2.1](https://www.w3.org/TR/WCAG21/)
