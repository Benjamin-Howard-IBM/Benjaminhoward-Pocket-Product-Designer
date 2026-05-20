# Carbon Design Patterns

Carbon documents patterns that are harvested from products built with Carbon. Each pattern composes Carbon components to solve a recurring problem. The official list lives at https://carbondesignsystem.com/patterns/.

This file summarizes the patterns most commonly referenced in product design work.

---

## 1. Forms

A group of related input controls that collect data or configure options. Forms may appear as dedicated pages, side panels, or dialogs.

### Anatomy

1. **Labels** above each input. Sentence case. No colons. One to three words.
2. **Text inputs** for free-form entries.
3. **Data inputs** for constrained input (checkboxes, radios, dropdowns, files, dates, toggles).
4. **Help** via tooltip, placeholder, or helper text.
5. **Buttons** for submit and cancel.

### Required vs Optional

Mark only the minority. If most fields are required, label only the optional ones `(optional)`. If most fields are optional, label only the required ones `(required)`. Be consistent across the product, or at minimum across the same form type.

### Validation

- **Client-side**: Validate when the field loses focus. Show inline error and helper text describing the fix.
- **Server-side**: Combine inline notification at the top of the form with inline errors on each affected field.
- Disable the primary action on short forms until requirements are met. Do not disable on long forms where the button and errors are not visible together.
- Disable the primary action after submission to prevent duplicates.

### Longer Forms

- **Progressive disclosure**: Reveal optional fields only when relevant.
- **Accordion forms**: Expose and hide sections of related fields. Avoid in dialogs.
- **Multistep forms**: Spread fields across screens with a vertical or horizontal `ProgressIndicator`.

### Buttons in Forms

| Form context             | Alignment    | Bleed |
|--------------------------|--------------|-------|
| In-page form             | Left         | No    |
| Wizard / multistep       | Right        | No    |
| Dialog or side panel     | Full width   | Yes   |

Do not top-align buttons. The user expects actions at the bottom after reviewing the fields.

Spacing: 32 px between inputs on dedicated pages; 24 px or 16 px in contained forms. 48 px between the last input and the button group.

---

## 2. Dialogs (Modal Pattern)

A blocking dialog used for critical, infrequent input or confirmation.

**When to use**: Critical confirmations, short edits, focused single tasks.
**When not to use**: As a primary navigation surface; for content discovery; for forms with more than five inputs (use a side panel or dedicated page).

**Rules**:
- One primary action, right-aligned in the footer.
- Use `ModalHeader` / `ModalBody` / `ModalFooter` for composed structure.
- Focus moves to the primary action when the dialog opens unless another actionable element exists.
- Pressing `Enter` activates the primary action if focus is on a non-actionable element.
- Pressing `Esc` closes the modal.
- Use the Danger modal variant for destructive confirmations.

---

## 3. Notifications

Communicate information to users about the system or about their actions.

**Variants**:

| Variant     | Behavior                              | Use case                                         |
|-------------|---------------------------------------|--------------------------------------------------|
| Inline      | Embedded; stays until dismissed       | Form-level errors, contextual warnings           |
| Toast       | Floating; auto-dismisses              | Confirmations after an action                    |
| Actionable  | Inline or toast with an action button | When the user can immediately respond            |

**Severity**: Informational, Success, Warning, Error. Each maps to a Carbon `$support-*` token and a status icon.

**Rules**:
- Lead with the most important information.
- Provide a clear path to resolution for warnings and errors.
- Do not use notifications for content that belongs in helper text or labels.
- Limit on-screen toasts to one or two at a time.

---

## 4. Empty States

Communicate that there is no content yet and offer a path forward.

**Variants**:
- **First use**: User has not created anything yet. Provide an explanation and a primary call to action.
- **No data**: A filter or search returned no results. Offer a way to broaden the search.
- **No permission**: User does not have access. Explain who to contact.
- **Error**: Something failed. Offer a retry.

**Rules**:
- Use a Tertiary or Ghost button if the page already has a primary action elsewhere.
- Provide a single, clear message; avoid stacking multiple explanations.
- Include illustrations only when they aid comprehension.

---

## 5. Filtering

Apply constraints to narrow a list, table, or grid.

**Approaches**:
- **Inline filter**: Dropdowns and search above a data table.
- **Filter panel**: Side panel containing grouped filters; useful for many filters.
- **Tag-based applied filters**: Show applied filters as dismissable `Tag` chips above the data.

**Rules**:
- Always show what filters are currently applied.
- Provide a "Clear all" action.
- Persist filter state in the URL when the result list is shareable.
- Show the result count after filtering.

---

## 6. Login and Sign-in

A focused single-column form for authentication.

**Rules**:
- Use a single column.
- Pair fluid input fields with a fluid button.
- Place product or brand identification above the form.
- Provide error handling at the form level (inline notification) plus inline errors on the offending field.
- Offer "Forgot password" as a Link below the password field.
- Avoid social sign-in clutter; group secondary auth methods clearly below the primary path.

---

## 7. Status Indicators

Communicate the state of a system, resource, or item.

**Components**:
- `Tag` with semantic color for status.
- Status icon (Checkmark, Warning, Error, Information, Time, In progress) paired with text.
- `Badge` for counts.

**Rules**:
- Never communicate status with color alone; pair with a label or icon.
- Use Carbon's `$support-*` tokens to keep status semantics consistent.
- Do not invent new statuses without checking the established Carbon status vocabulary.

---

## 8. Disabled vs Read-only vs Hidden

| Treatment   | Meaning                                                       | Visual                                         |
|-------------|---------------------------------------------------------------|------------------------------------------------|
| Disabled    | The action is currently unavailable and may become available  | Faded, not focusable, no hover/focus           |
| Read-only   | The value is visible but cannot be edited                     | Normal contrast, focusable, no edit affordance |
| Hidden      | The user has no business seeing or knowing about this control | Not in the DOM                                 |

Use disabled when permissions, dependencies, or prerequisites block the action temporarily. Use read-only for historic or system-set values that the user can reference. Hide entirely if the user has no authorization or interest.

---

## 9. Dashboards

A composed surface that summarizes the state of a system.

**Rules**:
- Use `Tile` and `ProductiveCard` (`@carbon/ibm-products`) for widgets.
- Establish a clear primary widget; secondary widgets fall under it.
- Use ghost or tertiary buttons inside widgets; reserve primary for the page header or top-level actions.
- Use Carbon's data visualization charts (`@carbon/charts`) with the matching theme.
- Keep density consistent across widgets.

---

## 10. Global Header

The top-level chrome for a product.

**Composition**: UI Shell `Header`, `HeaderName`, `HeaderNavigation`, `HeaderGlobalBar`, `HeaderPanel`, and optional `SideNav`.

**Rules**:
- Persist global navigation across all top-level routes.
- Place product name to the left.
- Use `HeaderGlobalAction` for utility actions (notifications, switcher, profile).
- The header is fluid-width and fixed-height.
- Side nav can be flexible (collapse on hover or click), fixed (always expanded), or floating.

Reference: [Global header pattern](https://carbondesignsystem.com/patterns/global-header).

---

## Pattern Selection Cheatsheet

| Need                                       | Pattern                |
|--------------------------------------------|------------------------|
| Capture user input                         | Forms                  |
| Confirm a critical action                  | Dialog                 |
| Communicate result of an action            | Notification (Toast)   |
| Communicate persistent system state        | Notification (Inline)  |
| Onboard a new user with no content yet     | Empty state (first use)|
| Narrow a long list                         | Filtering              |
| Authenticate the user                      | Login                  |
| Show resource state                        | Status indicator       |
| Block an action without removing it        | Disabled state         |
| Summarize a system                         | Dashboard              |
| Provide top-level navigation               | Global header          |
