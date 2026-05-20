# Carbon Design System: Skill Init

This file is the entry point for agents using the Carbon Design System reference. It explains how to pick the right Carbon component, token, or pattern when producing PDRs, wireframes, Storybook stories, or showcase HTML.

## When to Reach for Carbon

Use Carbon when the work targets an IBM product surface, or when the user has explicitly asked for Carbon-styled output. For other systems, route to:

- **HashiCorp surfaces**: use `skill/helios-design-system/`.
- **Unstyled low-fidelity wireframes**: use ASCII wireframes from `skill/product-designer/resources/wireframing.md`. Keep them gray and unbranded until direction is approved.

Do not mix Carbon and Helios tokens in the same artifact. Pick one system per surface.

## Files in This Skill

- `README.md` - High-level overview and quick reference.
- `01-Overview-and-Getting-Started.md` - What Carbon is, install, framework support.
- `02-Design-Foundations.md` - Color, type, grid, spacing, motion, themes, icons, accessibility.
- `03-Components-Catalog.md` - Component reference grouped by purpose.
- `04-Design-Patterns.md` - Composed patterns (forms, dialogs, notifications, empty states, dashboards, etc.).
- `CLAUDE.md` - Implementation handbook with React setup and code snippets.

## Component Selection Cheatsheet

| Goal                                       | Carbon component                     |
|--------------------------------------------|--------------------------------------|
| Trigger an action                          | `Button` (Primary / Secondary / Tertiary / Ghost / Danger) |
| Trigger a destructive action               | `Button` `kind="danger"`             |
| Navigate to another page                   | `Link`                               |
| Top-level app chrome                       | UI Shell (`Header`, `SideNav`)       |
| Section navigation                         | `Tabs` or `SideNav`                  |
| Multistep flow                             | `ProgressIndicator`                  |
| Single-line text entry                     | `TextInput`                          |
| Masked text entry                          | `PasswordInput`                      |
| Multi-line text entry                      | `TextArea`                           |
| Numeric entry                              | `NumberInput`                        |
| Date picking                               | `DatePicker`                         |
| Time picking                               | `TimePicker`                         |
| Range selection                            | `Slider`                             |
| One of 2-5 options                         | `RadioButton` / `RadioButtonGroup`   |
| Many of many                               | `Checkbox`                           |
| Binary setting                             | `Toggle`                             |
| One from a long list                       | `Dropdown` or `ComboBox`             |
| Many from a long list                      | `MultiSelect`                        |
| File upload                                | `FileUploader`                       |
| Tabular data                               | `DataTable`                          |
| Read-only structured display               | `StructuredList`                     |
| Group of related content                   | `Tile` (Default / Clickable / Selectable / Expandable) |
| Reveal/hide section                        | `Accordion`                          |
| Display code                               | `CodeSnippet`                        |
| Progress feedback                          | `ProgressBar`, `Loading`, `InlineLoading` |
| Loading placeholder                        | Component skeleton variant           |
| Inline message                             | `InlineNotification`                 |
| Floating message                           | `ToastNotification`                  |
| Inline message with action                 | `ActionableNotification`             |
| Label, status, category                    | `Tag`                                |
| Hover/focus context                        | `Tooltip`                            |
| Click-triggered popover                    | `Toggletip`                          |
| Confirmation or short edit                 | `Modal`                              |
| Custom-composed dialog                     | `ComposedModal`                      |
| Switch between two or three views          | `ContentSwitcher`                    |

## Token Cheatsheet

### Color

| Use                          | Token                       |
|------------------------------|-----------------------------|
| Page background              | `$background`               |
| Card or panel background     | `$layer-01` / `$layer-02`   |
| Input background             | `$field-01` / `$field-02`   |
| Primary text                 | `$text-primary`             |
| Secondary text               | `$text-secondary`           |
| Helper text                  | `$text-helper`              |
| Disabled text                | `$text-disabled`            |
| Subtle border                | `$border-subtle-01`         |
| Strong border                | `$border-strong-01`         |
| Focus ring                   | `$focus`                    |
| Error                        | `$support-error`            |
| Warning                      | `$support-warning`          |
| Success                      | `$support-success`          |
| Information                  | `$support-info`             |

### Spacing

| Token         | Value | Common use                          |
|---------------|-------|-------------------------------------|
| `$spacing-03` | 8 px  | Tight icon-to-label                 |
| `$spacing-05` | 16 px | Standard padding inside components  |
| `$spacing-06` | 24 px | Between fields in contained forms   |
| `$spacing-07` | 32 px | Between fields on dedicated pages   |
| `$spacing-09` | 48 px | Between last input and button group |

### Motion

| Token                  | Value  | Use                                    |
|------------------------|--------|----------------------------------------|
| `duration-fast-01`     | 70 ms  | Button states, toggle                  |
| `duration-fast-02`     | 110 ms | Fade                                   |
| `duration-moderate-01` | 150 ms | Small expansion                        |
| `duration-moderate-02` | 240 ms | Toast, communication                   |
| `duration-slow-01`     | 400 ms | Large expansion                        |
| `duration-slow-02`     | 700 ms | Background dimming                     |

## Implementation Snippets

### Theme Wrap

```jsx
import { Theme } from '@carbon/react';

<Theme theme="white">
  <App />
</Theme>
```

### Form Section

```jsx
import { FormGroup, Stack, TextInput, Dropdown, Button } from '@carbon/react';

<FormGroup legendText="Project details">
  <Stack gap={7}>
    <TextInput id="name" labelText="Name" />
    <TextInput id="owner" labelText="Owner" />
    <Dropdown id="env" titleText="Environment" items={['Dev', 'Stage', 'Prod']} />
    <Button>Create project</Button>
  </Stack>
</FormGroup>
```

### Confirmation Modal

```jsx
import { Modal } from '@carbon/react';

<Modal
  open={open}
  modalHeading="Delete workspace"
  danger
  primaryButtonText="Delete"
  secondaryButtonText="Cancel"
  onRequestClose={close}
  onRequestSubmit={handleDelete}
>
  This will permanently remove all data. This action cannot be undone.
</Modal>
```

### Empty State (Tertiary CTA)

```jsx
import { Button } from '@carbon/react';
import { Add } from '@carbon/react/icons';

<div className="empty-state">
  <h3>No projects yet</h3>
  <p>Create your first project to get started.</p>
  <Button kind="tertiary" renderIcon={Add}>Create project</Button>
</div>
```

## Verification Checklist Before Handoff

Use this list before declaring a Carbon-styled artifact ready for review.

- [ ] Theme is declared and consistent throughout (`white`, `g10`, `g90`, or `g100`).
- [ ] Components come from `@carbon/react` (not invented).
- [ ] Tokens are referenced (no hex codes).
- [ ] Only one Primary button per screen, except in documented temporary flows.
- [ ] Buttons use sentence case and `{verb} + {noun}` labels.
- [ ] All form fields have a visible label, helper text where useful, and inline validation.
- [ ] Required vs optional treatment is consistent across the product.
- [ ] All interactive elements have a visible focus state with 3:1 contrast.
- [ ] Color is not the only carrier of meaning; status uses icon + label.
- [ ] Layout uses Carbon breakpoints (320, 672, 1056, 1312, 1584).
- [ ] Icons come from the Carbon icon library at supported sizes (16, 20, 24, 32).
- [ ] Skeleton or loading state is defined.
- [ ] Empty state, error state, and success state are defined.
- [ ] Keyboard navigation order matches visual order.

## Writing Rules Applied to Carbon Artifacts

Follow the PPD writing rules at all times.

- No significance narration.
- No setup-then-payoff.
- No motivational sign-offs.
- No dramatic restatement.
- No superlatives that sell.
- Avoid unicode em dash; use a regular hyphen.

Test: does this sentence change what someone would do after reading? If not, cut it.
