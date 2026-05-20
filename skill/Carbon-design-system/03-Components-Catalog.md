# Carbon Components Catalog

Carbon's component library is published in React (`@carbon/react`) and Web Components (`@carbon/web-components`). The most up-to-date interactive reference is the React Storybook: https://react.carbondesignsystem.com/.

This catalog groups components by purpose for design and PDR work.

---

## UI Shell and Navigation

### UI Shell
**Purpose**: The framing chrome for a product. Composed of `Header`, `HeaderName`, `HeaderNavigation`, `HeaderMenu`, `HeaderMenuItem`, `HeaderGlobalBar`, `HeaderGlobalAction`, `SideNav`, `SideNavItems`, and `HeaderPanel`.
**Use cases**: Global navigation, product switcher, user menus, side nav for sections.

### Breadcrumb
**Purpose**: Secondary navigation that shows the user's current location in a hierarchy.
**Use cases**: Multi-level apps, deep page structures, return paths.

### Tabs
**Purpose**: Switch between related views in the same context without a navigation event.
**Variants**: Default, Container, Contained with icons.
**Use cases**: Settings sections, dashboards, profiles.

### Pagination
**Purpose**: Page through paginated data with explicit page number control and items-per-page.
**Use cases**: Data tables, search results, long lists.

### PaginationNav
**Purpose**: Lightweight numeric pagination without items-per-page control.
**Use cases**: Article browsing, image galleries.

### ProgressIndicator
**Purpose**: Show progress through a sequence of steps.
**Variants**: Vertical, Horizontal.
**Use cases**: Multistep forms, wizards, onboarding.

### Link
**Purpose**: Navigate to a new location (page, anchor, external resource).
**Use cases**: Inline text links, standalone links, links with launch icon for new tab targets.

### OverflowMenu
**Purpose**: Reveal a list of secondary actions from an icon trigger.
**Use cases**: Row-level actions in tables, contextual actions in cards.

---

## Feedback and Status

### Notification
**Purpose**: Communicate information about the system state or user actions.

**Variants**:
- **Inline**: Embedded in the layout; not dismissible by default. Use for context-specific feedback.
- **Toast**: Floats over the UI; auto-dismisses. Use for transient confirmations.
- **Actionable**: Inline or toast with an action button. Use when the user can act on the message.

**Severity**: Informational, Success, Warning, Error.

### InlineLoading
**Purpose**: Indicate progress for a single inline action.
**Use cases**: Button-triggered async actions, inline saves.

### Loading
**Purpose**: Indicate the page or a section is loading.
**Variants**: Default (spinner), Small.

### Tag
**Purpose**: Categorize, label, or filter content.
**Variants**: Read-only, Dismissable, Selectable, Operational, Filter.
**Use cases**: Status, categories, applied filters, taxonomy.

### Tooltip
**Purpose**: Provide additional context for a UI element on hover or focus.
**Use cases**: Icon-only buttons (required), unfamiliar labels.

### Toggletip
**Purpose**: Click-triggered popover with persistent content.
**Use cases**: Informational helpers that need scannable content or links.

### Popover
**Purpose**: Primitive for floating content layered above the UI.
**Use cases**: Custom menus, contextual editors.

---

## Interaction and Input

### Button
**Purpose**: Trigger an action.

**Variants**:
- **Primary**: Principal call to action. One per screen except in temporary flows.
- **Secondary**: Paired with a Primary; performs the negative action (Cancel, Back). Never used alone.
- **Tertiary**: Less prominent; works alone or in groups. Use for page headers when content has its own primary action.
- **Ghost**: Least prominence; works flush against a container or grouped with elements.
- **Danger**: Destructive actions. Three styles: Danger primary, Danger tertiary, Danger ghost.

**Sizes**: Extra small, Small, Medium, Large (productive), Large (expressive), Extra large, 2XL.

**Rules**:
- Use `{verb} + {noun}` for labels (Add user, Delete project). Exceptions: Done, Close, Cancel, Add, Delete.
- Sentence case for all labels.
- Left-align labels even in wide buttons.
- Icons go to the right of the label; 16 px icon by default, 20 px in expressive size.
- Icon-only buttons require a tooltip.
- Danger cannot be used as icon-only.
- Do not mix sizes within a button group.

### ButtonSet
**Purpose**: Group related buttons with consistent spacing and alignment.

### IconButton
**Purpose**: Single-icon button with a required tooltip. Variants match Button.

### Modal
**Purpose**: Blocking dialog for critical input or confirmation.
**Variants**: Default modal, Passive modal, Danger modal, ComposedModal (for custom composition).
**Sizes**: Extra small, Small, Medium, Large.

### ComposedModal
**Purpose**: Compose `ModalHeader`, `ModalBody`, and `ModalFooter` for custom layouts.

### ContentSwitcher
**Purpose**: Switch between two or more views inside the same container with low visual weight.
**Use cases**: Filter views, lightweight tabs in confined spaces.

### Copy
**Purpose**: One-click clipboard copy for code, IDs, or values.

### Dropdown
**Purpose**: Select one item from a list of options.
**Variants**: Default, Inline.

### ComboBox
**Purpose**: Dropdown with type-ahead filtering. Use when there are many options.

### MultiSelect
**Purpose**: Select multiple items from a list with type-ahead filtering. Use when there are 5+ options.
**Variants**: Default, Filterable.

### MenuButton
**Purpose**: Single button that reveals a menu of related actions when there are more than three.
**Use cases**: Replace dense button groups, toolbar action collapsing.

### Menu
**Purpose**: Lower-level menu primitive for custom triggers.

---

## Form Components

All form components follow the [Forms pattern](./04-Design-Patterns.md). Default field height is **40 px** for product UI.

### TextInput
**Purpose**: Free-form short text entry.
**Use cases**: Names, emails, IDs, search queries.

### PasswordInput
**Purpose**: Masked text entry with show/hide control.
**Use cases**: Passwords, PINs, SSNs.

### TextArea
**Purpose**: Multi-line free-form text.
**Use cases**: Comments, descriptions, support requests.

### NumberInput
**Purpose**: Increment/decrement numeric entry.
**Use cases**: Quantities, counts.

### Checkbox
**Purpose**: Multiple selections from a list, or a single binary opt-in.
**Use cases**: Agree to terms, select-all-that-apply, single setting.

### RadioButton / RadioButtonGroup
**Purpose**: Single selection from 2-5 mutually exclusive options.
**Use cases**: Plan type, shipping method, format choice.

### Toggle
**Purpose**: Binary on/off setting, usually applied immediately.
**Use cases**: Feature flags, show/hide a section.

### Select
**Purpose**: Single selection from a longer list via native `<select>`.
**Variants**: Default, Inline.
**Use cases**: Country picker, simple lists.

### FluidForm / FormGroup
**Purpose**: Composition wrappers for full-bleed and grouped form sections.

### Search
**Purpose**: Specialized text input for search queries with clear button.
**Variants**: Default, Expandable.

### FileUploader
**Purpose**: Upload one or many files.
**Variants**: Single file (button), Drag and drop area.

### DatePicker
**Purpose**: Pick a single date or a date range from a calendar.
**Variants**: Simple, Single, Range.

### TimePicker
**Purpose**: Pick a time in hours and minutes, optional AM/PM and timezone.

### Slider
**Purpose**: Pick one number from a numeric range.
**Use cases**: Volume, percentage, threshold setting.

---

## Content Display

### DataTable
**Purpose**: Display structured tabular data with optional sorting, filtering, batch selection, row expansion, and inline edit.
**Features**: Sort, Search, Filter, Selection (single or batch), Expansion, Sticky header, Pagination integration, Skeleton.
**Sizes**: Compact, Short, Medium, Tall.

### StructuredList
**Purpose**: Lightweight, table-like display for read-only structured data.
**Use cases**: Comparison rows, summaries, term/definition lists.

### Tile
**Purpose**: Container for grouped content.
**Variants**: Default, Clickable, Selectable, Expandable, Multi-select tile, Radio tile.

### Accordion
**Purpose**: Vertically stacked toggles that reveal hidden content.
**Use cases**: FAQs, grouped settings, progressive disclosure.

### CodeSnippet
**Purpose**: Display copyable code.
**Variants**: Inline, Single line, Multi line.

### ProgressBar
**Purpose**: Show determinate or indeterminate progress.
**Use cases**: Uploads, long-running jobs.

### Skeleton States
**Purpose**: Placeholder shapes during loading. Available per component (DataTable, Tile, Text, etc.).

---

## Layout

### Grid / Row / Column
**Purpose**: Implement the 2x Grid in React via CSS Grid.
**Variants**: Wide, Narrow, Condensed, Full width, Subgrid.

### FlexGrid (legacy)
**Purpose**: Flexbox-based grid retained for backward compatibility. New work should prefer Grid.

### Stack
**Purpose**: Vertical or horizontal flow with consistent spacing.
**Props**: `gap`, `orientation`.

### Layer
**Purpose**: Apply Carbon's layering model. Wraps content to shift its layer tokens one step.

### AspectRatio
**Purpose**: Lock content to a Carbon aspect ratio (1:1, 2:1, 2:3, 3:2, 4:3, 16:9).

### Theme
**Purpose**: Apply a Carbon theme to a subtree (`white`, `g10`, `g90`, `g100`). Use for inline theming.

---

## Carbon for IBM Products

Some components in this catalog reference `@carbon/ibm-products` (Cards, Tearsheet, Sidepanel, EmptyState, Toolbar, AboutModal). Those live outside the core `@carbon/react` package and are documented separately at https://pages.github.ibm.com/carbon/ibm-products/.
