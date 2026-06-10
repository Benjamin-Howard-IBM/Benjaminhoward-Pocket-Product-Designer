# Carbon Design System Reference

This folder contains organized reference documentation for IBM's Carbon Design System, an open-source system for building consistent, accessible product interfaces.

## Official Resources

- **Website**: https://carbondesignsystem.com
- **Components**: https://carbondesignsystem.com/components/overview/components/
- **2x Grid**: https://carbondesignsystem.com/elements/2x-grid/overview/
- **Accessibility**: https://carbondesignsystem.com/guidelines/accessibility/overview/
- **Developing**: https://carbondesignsystem.com/developing/get-started/
- **Designing**: https://carbondesignsystem.com/designing/get-started/
- **GitHub**: https://github.com/carbon-design-system/carbon

## Contents

### 1. [Overview and Getting Started](./01-Overview-and-Getting-Started.md)
- What Carbon is and its principles (open, inclusive, modular, consistent)
- Packages and installation (`@carbon/react`, `@carbon/web-components`, `@carbon/styles`)
- Framework support (React + Web Components official; Angular/Vue/Svelte community)
- Setup steps and themes

### 2. [Design Foundations](./02-Design-Foundations.md)
- **2x Grid** - 16 columns, 8px mini-unit, breakpoints
- **Spacing** - token scale (spacing-01..13)
- **Color & Themes** - White, Gray 10/90/100, semantic tokens
- **Typography** - IBM Plex, type tokens
- **Motion** - productive/expressive easing, duration tokens
- **Icons & Pictograms**
- **Tokens** - shared design decisions
- **Accessibility** - WCAG 2.1 AA baseline

### 3. [Components Catalog](./03-Components-Catalog.md)
All 39 v11 components organized by category:
- **Navigation & Structure**: Breadcrumb, Tabs, Content Switcher, Pagination, Menu, Menu Buttons, Tree View, Progress Indicator, UI Shell
- **Actions & Inputs**: Button, Checkbox, Radio Button, Toggle, Text Input, Number Input, Select, Dropdown, Search, Slider, Date Picker, File Uploader, Form
- **Content & Data**: Data Table, Structured List, Contained List, List, Tile, Accordion, Tag, Link, Code Snippet, Tooltip, Toggletip, Popover
- **Feedback & Status**: Notification, Modal, Loading, Inline Loading, Progress Bar, AI Label

### 4. [Guidelines and Patterns](./04-Guidelines-and-Patterns.md)
- Accessibility guidelines (overview, color/contrast, keyboard, developers)
- Content guidelines
- Composition patterns (forms, tables, layout, confirmations, AI)
- Contribution and pipeline integration

### Quick references
- [claude.md](./claude.md) - engineer quick reference (install, tokens, component snippets)

---

## Quick Reference

### Installation

```bash
# React (primary)
npm install @carbon/react

# Web Components
npm install @carbon/web-components

# Icons
npm install @carbon/icons-react
```

### Button Quick Reference

**Kinds**: Primary, Secondary, Tertiary, Ghost, Danger
**Sizes**: Small, Medium, Large, Extra-large, 2XL
**Rule**: Use Button for actions, Link for navigation. One primary action per view.

### 2x Grid Quick Reference

- 16 columns, 8px mini-unit, 32px gutters, 16px padding
- Breakpoints: sm 320 (4 col), md 672 (8 col), lg 1056 (16 col), xlg 1312, max 1584
- Use `Grid`/`Column` (React) or `@carbon/grid` (Sass)

### Form Component Selection

| Input Type | Component | Use When |
|------------|-----------|----------|
| Short text | Text Input | Names, emails |
| Numbers | Number Input | Quantities, counts |
| Single choice (native) | Select | Known short list |
| Single/multi choice (styled) | Dropdown | Filterable or multiselect |
| One of many | Radio Button | Mutually exclusive |
| Many of many | Checkbox | Multiple selections |
| Binary instant | Toggle | Enable/disable |
| Date | Date Picker | Dates and ranges |
| File | File Uploader | Uploads |
| Search | Search | Filtering, queries |

---

## For Pair Design Sessions

### Preparation Checklist
- [ ] Review the component catalog for available Carbon components
- [ ] Confirm component status (stable / feature-flagged / AI-label) on the live docs
- [ ] Decide theme(s): White, Gray 10, Gray 90, Gray 100
- [ ] Plan layout on the 2x Grid
- [ ] Note tokens needed for color, spacing, type

### Key Questions
- Is this an action (Button) or navigation (Link)?
- Which Carbon component already solves this?
- What is the column layout at each breakpoint?
- Which theme(s) must this support?
- What are the empty, loading, and error states?
- Does anything need an AI label?

---

## Design System Principles

1. **Open** - open source, used across and beyond IBM
2. **Inclusive** - accessible by default (WCAG 2.1 AA)
3. **Modular** - composable components and tokens
4. **Consistent** - shared foundations create coherent products

---

## Common Workflows

### Starting a New Feature
1. Choose theme and plan the 2x Grid layout
2. Select Carbon components for each need
3. Apply spacing, color, and type tokens
4. Cover empty, loading, and error states
5. Verify keyboard access and contrast

### Reviewing a Design
1. Check component usage against the Carbon catalog
2. Verify grid alignment and spacing tokens
3. Validate contrast (4.5:1 text, 3:1 non-text) and focus visibility
4. Confirm component status and correct variants
5. Review all interactive states and edge cases

---

**Last Updated**: June 2026

This is a reference summary. Always refer to the official Carbon documentation at https://carbondesignsystem.com for the most current components, tokens, and guidance.
