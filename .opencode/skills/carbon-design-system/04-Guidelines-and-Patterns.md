# Carbon Guidelines and Patterns

Carbon's cross-cutting guidance covers accessibility, content, and contribution. This document focuses on the accessibility guidelines (Carbon's most detailed cross-component standard) and the workflow patterns for using Carbon in this repo's pipeline.

---

## Accessibility

Carbon targets **WCAG 2.1 Level AA**. Accessibility is built into components but must be preserved when composing them.

### 1. Overview

- Accessibility is a baseline requirement, not an add-on.
- Carbon components ship with correct roles, names, states, and keyboard support.
- Teams remain responsible for content, structure, and composition.

### 2. Color and Contrast

- **Text contrast**: 4.5:1 minimum for normal text.
- **Large text / non-text**: 3:1 minimum for large text, icons, borders, and focus indicators.
- Never use color as the only means of conveying information; pair with text or icons.
- Theme tokens are tuned to meet contrast; verify when overriding.

### 3. Keyboard

- All interactive components are operable by keyboard.
- Standard interaction model: `Tab` moves between controls, `Enter`/`Space` activate, arrow keys move within composites (menus, tabs, radio groups, sliders, trees).
- Maintain a logical focus order that matches visual order.
- Focus must remain visible (the `focus` token).

### 4. For Developers

- Preserve semantic HTML and ARIA provided by components; do not strip roles/labels.
- Provide accessible names for icon-only controls.
- Manage focus on dynamic UI (modals trap focus; restore focus on close).
- Test with keyboard and a screen reader, not just visually.

---

## Content Guidelines

- Use clear, concise, action-oriented labels.
- Sentence case for most UI text; keep button labels short and verb-led.
- Write specific, helpful error messages that say what is wrong and how to fix it.
- Keep terminology consistent across the product.

---

## Common Composition Patterns

Carbon patterns are built by composing components and foundations:

- **Form** = Form + Text/Number Input + Select/Dropdown + Checkbox/Radio + Button (with inline validation and helper text).
- **Filterable table** = Data Table + Search + Dropdown/Tag + Pagination + batch actions toolbar.
- **Page layout** = UI Shell + 2x Grid (`Grid`/`Column`) + tokens for spacing.
- **Confirmation** = Modal (danger variant for destructive actions) + Button.
- **Status feedback** = Notification (inline/toast/actionable) + supportive tokens.
- **AI experience** = AI Label on supported components + explanatory Popover/Toggletip.

### Validation guidance

- Validate on blur or submit; show errors near the relevant field.
- Use color + icon + text for errors (the `support-error` token), never color alone.
- Preserve user input on error.

### Destructive actions

- Use the Danger button kind and, for high-impact actions, a danger Modal to confirm.
- State the consequence clearly before confirmation.

---

## Contribution

Carbon is open source and community-governed by IBM.

- Request components and patterns, file issues, and contribute via the Carbon GitHub repos.
- Shared additions go through Carbon's contribution and design-review process.
- Prefer existing components and patterns before building custom; contribute reusable solutions back.

GitHub: https://github.com/carbon-design-system/carbon

---

## Pipeline Integration (this repo)

When using Carbon inside the pocket-product-designer pipeline:

- **PDRs (Stage 4-5)**: specify Carbon components by name and reference tokens and the 2x Grid instead of custom UI.
- **Storybook (Stage 6)**: import `@carbon/react` components in stories; wrap in `Theme` and `Grid` as needed.
- **Showcase (Stage 7)**: build with Carbon tokens and components; keep contrast and focus intact.

Keep low-fidelity work gray until direction is approved; Carbon's gray themes (Gray 10/90/100) support neutral, low-commitment mockups before high-fidelity color.
