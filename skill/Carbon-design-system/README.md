# Carbon Design System Reference

This folder contains organized reference documentation for the Carbon Design System, IBM's open source design system for products and digital experiences.

## Official Resources

- **Website**: https://carbondesignsystem.com/
- **What is Carbon**: https://carbondesignsystem.com/all-about-carbon/what-is-carbon/
- **Components (React Storybook)**: https://react.carbondesignsystem.com/
- **Patterns**: https://carbondesignsystem.com/patterns/forms-pattern/
- **Elements (Color, Type, Grid, Motion, Themes, Icons)**: https://carbondesignsystem.com/elements/color/overview/
- **Get started (React)**: https://carbondesignsystem.com/developing/frameworks/react/
- **GitHub**: https://github.com/carbon-design-system/carbon
- **Figma kits**: https://carbondesignsystem.com/designing/kits/figma/

## Contents

### 1. [Overview and Getting Started](./01-Overview-and-Getting-Started.md)
- What Carbon is and its purpose
- Guiding principles (Open, Inclusive, Modular, User-first, Consistent)
- React install (`npm install --save @carbon/react`)
- Framework support (React and Web Components from Carbon team; Angular, Vue, Svelte community)
- Setup steps, Sass entry, icons entry, peer dependencies
- Package structure

### 2. [Design Foundations](./02-Design-Foundations.md)
Eight foundational areas:
- **Color** - Themes (White, Gray 10, Gray 90, Gray 100), tokens, layering model, interaction states
- **Typography** - IBM Plex Sans/Serif/Mono, productive vs expressive type sets, scale formula
- **2x Grid** - 8 px mini unit, fluid/fixed/hybrid grids, breakpoints, gutters, margins
- **Spacing** - Mini-unit-based fixed scale (8, 16, 24, 32, 48, 64, 80)
- **Motion** - Productive vs expressive easing, six duration tokens
- **Themes** - Light (White, Gray 10) and dark (Gray 90, Gray 100), layering rules
- **Icons** - Carbon icon library at 16/20/24/32 px, default vs filled
- **Accessibility** - WCAG 2.1 AA, focus, contrast ratios, IBM Accessibility checklist

### 3. [Components Catalog](./03-Components-Catalog.md)
Complete component reference organized by category:
- **UI Shell and Navigation**: UI Shell (Header, HeaderMenu, SideNav, HeaderPanel), Breadcrumb, Tabs, Pagination, PaginationNav, ProgressIndicator, Link, OverflowMenu
- **Feedback and Status**: Notification (Inline, Toast, Actionable), InlineLoading, Loading, Tag, Tooltip, Toggletip, Popover
- **Interaction and Input**: Button (Primary, Secondary, Tertiary, Ghost, Danger), Button Set, IconButton, Modal, ComposedModal, ContentSwitcher, Copy, Dropdown, ComboBox, MultiSelect, MenuButton
- **Form Components**: TextInput, PasswordInput, TextArea, NumberInput, Checkbox, RadioButton, RadioButtonGroup, Toggle, Select, FluidForm, FormGroup, Search, FileUploader, DatePicker, TimePicker, Slider
- **Content Display**: DataTable, StructuredList, Tile (Clickable, Selectable, Expandable), Accordion, CodeSnippet, ProgressBar, Skeleton states
- **Layout**: Grid, Column, FlexGrid, Stack, Layer, AspectRatio, Theme

### 4. [Design Patterns](./04-Design-Patterns.md)
Documented Carbon patterns:
1. **Forms** - Anatomy, labels, required vs optional, validation, multistep
2. **Dialogs** - When to use, button alignment, focus
3. **Notifications** - Inline, toast, actionable; severity
4. **Empty states** - First use, no data, no permission, error
5. **Filtering** - Inline filter, filter panel, tag-based
6. **Login / Sign-in** - Single-column form, fluid buttons, error handling
7. **Status indicators** - Tags, badges, semantic colors
8. **Disabled vs read-only vs hidden** - When to use which
9. **Dashboards** - Layout, widget composition, density
10. **Global header** - Screen regions and panel behavior

---

## Quick Reference

### Installation

```bash
# React components (Carbon-maintained)
npm install --save @carbon/react

# Web Components (Carbon-maintained)
npm install --save @carbon/web-components

# Elements only (tokens, colors, grid, type, motion, themes)
npm install --save @carbon/styles
```

Ensure the [peerDependencies](https://github.com/carbon-design-system/carbon) for `@carbon/react` are installed.

### Button Quick Reference

**Variants**: Primary, Secondary, Tertiary, Ghost, Danger (Primary, Tertiary, Ghost)
**Sizes**: Extra small, Small, Medium, Large (productive), Large (expressive), Extra large, 2XL
**Icon position**: Right of the label (LTR); centered for icon-only

**Rule**: Use Button for actions, Link for navigation. Only one Primary button per screen (except temporary flows).

### Theme Quick Reference

| Theme   | Background hex | Type      |
|---------|----------------|-----------|
| White   | `#ffffff`      | Light     |
| Gray 10 | `#f4f4f4`      | Light     |
| Gray 90 | `#262626`      | Dark      |
| Gray 100| `#161616`      | Dark      |

Layering model:
- Light: White and Gray 10 alternate as layers stack.
- Dark: Each added layer becomes one step lighter.

### Form Component Selection

| Input Type           | Component       | Use When                                       |
|----------------------|-----------------|------------------------------------------------|
| Short text           | TextInput       | Names, emails, IDs                             |
| Hidden text          | PasswordInput   | Passwords, PINs, SSNs                          |
| Long text            | TextArea        | Comments, descriptions, feedback               |
| Single from many     | RadioButton     | 2-5 mutually exclusive options                 |
| Many from many       | Checkbox        | Multiple selections, agree to terms            |
| Binary state         | Toggle          | Enable/disable a setting                       |
| Single from a list   | Dropdown / Select | 5+ mutually exclusive options                |
| Single with search   | ComboBox        | Long list with type-ahead                      |
| Many from a list     | MultiSelect     | Long list, multiple selections                 |
| File                 | FileUploader    | Upload one or many files                       |
| Numeric              | NumberInput     | Quantities, counts                             |
| Numeric in a range   | Slider          | Volume, percentage, scrubbing                  |
| Date or date range   | DatePicker      | Scheduling                                     |
| Time                 | TimePicker      | Scheduling                                     |

---

## For Pair Design Sessions

### Preparation Checklist
- [ ] Review component catalog for available components
- [ ] Check relevant design patterns
- [ ] Review design foundations (spacing, color, typography, motion)
- [ ] Have the Carbon site or Figma kit open for reference
- [ ] Identify the theme (White, Gray 10, Gray 90, Gray 100)
- [ ] Note any product-specific customizations needed

### Common Discussion Topics
1. **Component selection**: Which Carbon component fits the use case?
2. **Pattern application**: Does a Carbon pattern exist for this problem?
3. **Accessibility**: Focus, keyboard, contrast, labels
4. **Responsive behavior**: How does it adapt across the five standard breakpoints?
5. **States**: Default, hover, active, focus, selected, disabled, loading, error
6. **Edge cases**: Empty states, long text, many items, errors

### Key Questions to Ask
- What action is the user trying to accomplish?
- Is this navigation (Link) or an action (Button)?
- What is the hierarchy of importance? (Primary, Secondary, Tertiary, Ghost)
- Who needs to access this? (Accessibility considerations)
- How does this scale? (Responsive, many items, long text)
- What are the error and empty states?
- How do we provide feedback (Inline, Toast, Actionable)?

---

## Design System Principles

### 1. Open
Carbon is built and maintained in the open. Users are also its makers, and the community is encouraged to contribute.

### 2. Inclusive
Carbon is designed and built to be accessible to all, regardless of ability or situation. WCAG 2.1 AA is the target.

### 3. Modular and flexible
Components are designed to work seamlessly with each other, in whichever combination suits the needs of the user.

### 4. User-first
Decisions are grounded in rigorous research into users' needs and desires.

### 5. Consistent
Every element and component is designed from the ground up to work together. Based on the IBM Design Language.

---

## Browser Support

Carbon supports the last two versions of:
- Chrome
- Safari
- Firefox
- Edge

---

## Common Workflows

### Starting a New Feature
1. Pick a theme (White, Gray 10, Gray 90, Gray 100)
2. Review patterns for similar problems (forms, dialogs, notifications)
3. Select appropriate components from `@carbon/react`
4. Apply tokens for color, type, spacing, motion
5. Consider all states (empty, loading, error, selected, disabled, focus)
6. Test keyboard navigation and screen reader output
7. Validate against the five standard breakpoints (Small 320, Medium 672, Large 1056, X-Large 1312, Max 1584)

### Reviewing a Design
1. Check component usage against the Carbon catalog
2. Verify pattern adherence (forms, notifications, empty states)
3. Validate accessibility (focus, contrast, labels, motion)
4. Check spacing and typography against type and grid tokens
5. Review all interactive states
6. Consider edge cases

### Implementing a Design
1. Install `@carbon/react`
2. Import components and styles (`@use '@carbon/react';`)
3. Apply tokens (`var(--cds-background)`, `$layer`, `$text-primary`)
4. Implement accessibility features (labels, helper text, ARIA)
5. Handle all states (hover, active, focus, selected, disabled, loading)
6. Test keyboard navigation
7. Validate responsive behavior at every breakpoint

---

**Last Updated**: May 2026

This is a reference summary. Always refer to the official Carbon documentation for the most current information and detailed implementation guidelines.
