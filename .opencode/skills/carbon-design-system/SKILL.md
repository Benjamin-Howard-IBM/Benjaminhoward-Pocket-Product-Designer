---
name: carbon-design-system
description: IBM Carbon Design System reference. Use when designing or building UI with Carbon, @carbon/react, Carbon Web Components, the 2x Grid, Carbon tokens, or Carbon's 39 components, accessibility guidelines, and contribution patterns.
---

# Carbon Design System

Use this skill when a task involves IBM's Carbon Design System: choosing Carbon components, applying the 2x Grid, using Carbon design tokens, meeting Carbon's accessibility bar, or writing PDRs/stories/showcases that should be implemented with `@carbon/react` or Carbon Web Components.

This is a reference skill. It mirrors the structure of `helios-design-system` but documents Carbon. Load the numbered docs in this folder for detail:

- `01-Overview-and-Getting-Started.md` - what Carbon is, packages, installation, framework support
- `02-Design-Foundations.md` - 2x Grid, spacing, color/tokens, type, motion, breakpoints
- `03-Components-Catalog.md` - all 39 components with purpose and use cases
- `04-Guidelines-and-Patterns.md` - accessibility guidelines, AI label, contribution and workflow patterns
- `claude.md` - engineer quick reference (install, tokens, common component snippets)
- `README.md` - index, quick reference, pair-design checklist

## When to use

Use this skill when the user asks to:

- Design or review UI that should follow Carbon
- Pick the right Carbon component for a use case
- Apply the 2x Grid, Carbon spacing, or Carbon tokens
- Implement with `@carbon/react` or Carbon Web Components
- Check work against Carbon accessibility guidelines
- Write PDRs, Storybook stories, or showcases grounded in Carbon

Do not use this skill for HashiCorp Helios work (use `helios-design-system`), pure visual craft outside a system (`impeccable`), or method selection (`design-method-finder`).

## Source of truth

- Primary docs: https://carbondesignsystem.com
- Components: https://carbondesignsystem.com/components/overview/components/
- 2x Grid: https://carbondesignsystem.com/elements/2x-grid/overview/
- Accessibility: https://carbondesignsystem.com/guidelines/accessibility/overview/
- GitHub: https://github.com/carbon-design-system/carbon

Carbon is open source and governed by IBM. Keep designs aligned to current v11 guidance; verify component status (stable, feature-flagged, with-AI-label) on the live site before committing to implementation detail.

## Pipeline integration

When writing PDRs that specify UI, prefer Carbon components over custom implementations:

- Use `Button`, `DataTable`, `TextInput`, `Modal`, etc. from `@carbon/react`
- Reference Carbon tokens for color, spacing, and type
- Lay out on the 2x Grid (16 columns, 16px padding, 32px gutters)
- Link component docs from https://carbondesignsystem.com/components/overview/components/
