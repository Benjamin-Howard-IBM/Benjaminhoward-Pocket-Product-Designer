# Carbon Components Catalog

Carbon v11 ships 39 documented components. Each component page on carbondesignsystem.com has Usage, Style, Code, and Accessibility tabs. Status notes: some components are feature-flagged, and several support an optional AI label.

---

## Navigation & Structure

### Breadcrumb
**Purpose**: Secondary navigation showing the user's location in a hierarchy.
**Use Cases**: Deep page structures, navigation trails.

### Tabs
**Purpose**: Organize related content into separate views within the same context.
**Use Cases**: Settings, categorized content, view switching.

### Content Switcher
**Purpose**: Toggle between mutually exclusive views or modes.
**Use Cases**: Switching display modes, segmented control of content.

### Pagination
**Purpose**: Navigate content split across pages.
**Use Cases**: Data tables, search results, long lists.

### Menu
**Purpose**: A list of actions or options in a floating surface.
**Use Cases**: Context menus, overflow actions. *(Feature-flagged)*

### Menu Buttons
**Purpose**: A button that opens a menu of related actions (menu button / combo button).
**Use Cases**: Grouped primary + secondary actions. *(Feature-flagged)*

### Tree View
**Purpose**: Hierarchical, expandable list navigation.
**Use Cases**: File trees, nested navigation. *(Feature-flagged)*

### Progress Indicator
**Purpose**: Show steps in a multi-step process.
**Use Cases**: Wizards, checkout, onboarding flows.

### UI Shell (Header)
**Purpose**: Global navigation frame (header, side nav, panels) for products.
**Use Cases**: Product-level chrome and navigation.

---

## Actions & Inputs

### Button
**Purpose**: Initiates an action.
**Variants/Kinds**: Primary, Secondary, Tertiary, Ghost, Danger.
**Sizes**: Small, Medium, Large, Extra-large, 2XL (field sizes).
**Icon options**: With icon, icon-only (with accessible label).
**Best Practices**: One primary action per view; use links for navigation, buttons for actions; keep labels concise.

### Checkbox
**Purpose**: Binary or multiple selection from a set.
**Use Cases**: Agreements, multi-select. *(Supports AI label)*

### Radio Button
**Purpose**: Single selection from a mutually exclusive set.
**Use Cases**: Settings, exclusive options. *(Supports AI label)*

### Toggle
**Purpose**: Switch-style binary control with immediate effect.
**Use Cases**: Enable/disable features. *(Feature-flagged)*

### Text Input
**Purpose**: Single-line text entry (includes password variant).
**Use Cases**: Names, emails, short text.

### Number Input
**Purpose**: Numeric entry with steppers.
**Use Cases**: Quantities, counts. *(Supports AI label)*

### Select
**Purpose**: Native dropdown selection from a list.
**Use Cases**: Single-choice from a known list. *(Supports AI label)*

### Dropdown
**Purpose**: Custom dropdown for selecting one option (with multiselect/combobox variants).
**Use Cases**: Styled single/multi selection, filterable lists. *(Supports AI label)*

### Search
**Purpose**: Text input specialized for search queries.
**Use Cases**: Filtering, site/data search.

### Slider
**Purpose**: Select a value from a continuous or stepped range.
**Use Cases**: Volume, thresholds, ranges.

### Date Picker
**Purpose**: Select a single date or date range from a calendar.
**Use Cases**: Scheduling, filters. *(Supports AI label)*

### File Uploader
**Purpose**: Upload files via button or drag-and-drop.
**Use Cases**: Document/image uploads.

### Form
**Purpose**: Structure and group form controls with labels, helper text, and validation.
**Use Cases**: Any data entry flow. *(Supports AI label)*

---

## Content & Data Display

### Data Table
**Purpose**: Display and manage structured data in rows and columns.
**Features**: Sorting, selection, expansion, batch actions, toolbar, pagination, inline edit.
**Use Cases**: Resource lists, admin interfaces. *(Supports AI label)*

### Structured List
**Purpose**: Display simple read-only rows of related data.
**Use Cases**: Lightweight tabular content without full table features.

### Contained List
**Purpose**: List grouped within a container, optionally with actions.
**Use Cases**: Grouped items, settings lists.

### List
**Purpose**: Ordered and unordered lists styled to Carbon.
**Use Cases**: Basic content lists.

### Tile
**Purpose**: Container grouping related content; clickable, selectable, and expandable variants.
**Use Cases**: Dashboard cards, selectable options. *(Feature-flagged)*

### Accordion
**Purpose**: Vertically stacked toggles that show/hide content.
**Use Cases**: FAQs, progressive disclosure.

### Tag
**Purpose**: Concise labels for categorization or metadata; selectable and dismissible variants.
**Use Cases**: Filters, status, keywords.

### Link
**Purpose**: Navigate to another location.
**Use Cases**: Inline navigation, standalone links (with optional icon).

### Code Snippet
**Purpose**: Display and copy code (inline, single-line, multi-line).
**Use Cases**: Documentation, commands, examples.

### Tooltip
**Purpose**: Contextual information on hover/focus of an element.
**Use Cases**: Help text, icon labels.

### Toggletip
**Purpose**: Like a tooltip but triggered by click and can contain interactive content.
**Use Cases**: Definitions or actions revealed on demand.

### Popover
**Purpose**: Floating container anchored to an element, holding rich content.
**Use Cases**: Contextual panels, custom overlays.

---

## Feedback & Status

### Notification
**Purpose**: Communicate status or feedback.
**Variants**: Inline, toast, actionable.
**Use Cases**: Success/error/warning/info messages. *(Feature-flagged)*

### Modal
**Purpose**: Focused overlay that requires interaction or conveys important content.
**Variants**: Standard, passive, danger; also `ComposedModal`.
**Use Cases**: Confirmations, forms, focused tasks. *(Feature-flagged)*

### Loading
**Purpose**: Indicate an indeterminate loading state (spinner).
**Use Cases**: Page/section loading.

### Inline Loading
**Purpose**: Compact loading state with status text, inline with content.
**Use Cases**: Button-adjacent or row-level loading.

### Progress Bar
**Purpose**: Show determinate or indeterminate progress of a task.
**Use Cases**: Uploads, processing.

### AI Label
**Purpose**: Indicate AI-generated or AI-assisted content and reveal explanatory detail.
**Use Cases**: Labeling AI output across supported components.

---

## Component Selection Guide

**Navigation**: UI Shell (global), Breadcrumb (location), Tabs / Content Switcher (views), Pagination (paged data), Tree View (hierarchy).

**Actions**: Button (single action), Menu Buttons (grouped actions), Menu (action lists), Link (navigation).

**Forms**: Text Input / Number Input (entry), Select / Dropdown (choice), Checkbox / Radio Button (selection), Toggle (binary instant), Date Picker, File Uploader, Slider, Search; wrap in Form.

**Data display**: Data Table (rich), Structured List / Contained List / List (simpler), Tile (cards), Accordion (disclosure), Tag (metadata), Code Snippet (code).

**Feedback**: Notification (status), Modal (blocking), Loading / Inline Loading / Progress Bar (progress), Tooltip / Toggletip / Popover (contextual info), AI Label (AI provenance).

---

## Status Legend

- **Feature-flagged**: menu, menu buttons, tree view, toggle, tile, modal (verify current flags on the live docs before relying on new behavior).
- **Supports AI label**: checkbox, radio button, number input, select, dropdown, date picker, form, data table.

Always confirm a component's current status and API on https://carbondesignsystem.com/components/overview/components/ before implementation.
