## PAGE GROUP: Artifact Repository

This page group covers three views: Browse/Search (S2), Artifact Detail (S4), and Submit Research multi-step form (S5a–S5e).

---

## PAGE: Repository - Browse / Search

**Route:** /repository
**Carbon UI Shell:** Header visible. SideNav visible with items: "All Research" (active), "My Submissions", "Submit Research". Top nav "Repository" highlighted.

### Layout

2x Grid, Gray-10 background. Content column: col-span 13 offset by 3 (SideNav occupies left 3 columns).

---

### Zone 1: SideNav

Carbon SideNav component, fixed left, 256px wide, White background, right border Gray-20.
- Site section heading: "Repository" — 12px SemiBold Gray-70, uppercase, 16px padding
- SideNavItem: "All Research" (active — Blue-60 left bar, Blue-10 background)
- SideNavItem: "My Submissions"
- SideNavItem: "Submit Research" → links to S5a

---

### Zone 2: Page Header Row

Breadcrumb: Carbon Breadcrumb — "Home" / "Repository" (current, Gray-70 no link)
Heading: H2 "Research Repository" — IBM Plex Sans SemiBold 28px, Gray-100, 24px below breadcrumb
Sub-heading: "Browse all UX research contributed by IBM designers." — 16px Gray-70

Right-aligned in the same header row: Carbon Button (primary) "Submit Research" → links to Submit Step 1.

---

### Zone 3: Search and Filters

Carbon Search component (large, full-width): placeholder "Search by title, researcher, tag, or product area..."

Below search, a filter row with 3 Carbon Dropdown components + a clear-all link, all on one horizontal line:
- Dropdown 1: "Research Type" — options: All Types, Foundational Discovery, Usability Study, Generative, Survey, Heuristic Review, Other
- Dropdown 2: "Product Area" — options: All Products, MCSP, Vault, Terraform, Watson, Cloud Pak, Other
- Dropdown 3: "Date Range" — options: All Time, Last 30 days, Last 90 days, Last 6 months, Last year
- Ghost text link "Clear all filters" — 14px Blue-60, right-aligned

Results count below filters: "Showing 10 results" — 13px Gray-70

---

### Zone 4: View Toggle + Results

Carbon ContentSwitcher (right-aligned, above results grid): "Card View" (active) | "Table View"

**Card View (default):**
Two-column grid (col-span 8 each). Each artifact is a Carbon ClickableTile: White background, 1px Gray-20 border, 24px padding, 8px border-radius. Hover: Gray-10 bg, Blue-60 3px left border.

Each artifact card contains:
- Title: 16px SemiBold Gray-100 (max 2 lines, truncate with ellipsis)
- Researcher + Date: 13px Gray-70, separated by " · "
- Tag row: Carbon Tag (Blue, small) for Research Type + Carbon Tag (Green, small) for Product Area + up to 2 Carbon Tag (Gray, small) for additional tags
- Summary snippet: 14px Gray-70, max 2 lines, italic

**Render all 10 dummy artifacts as card tiles using the data set below:**

1. Title: "FedRAMP Adoption Barriers - Federal Buyer Interviews" | Researcher: Benjamin Howard | Date: Jan 15, 2025 | Research Type: Foundational Discovery | Product Area: MCSP | Tags: FedRAMP, Federal | Summary: "Identified FedRAMP certification as the primary blocker preventing federal agency adoption of cloud Vault."
2. Title: "Vault Onboarding Usability Study - Session 1" | Researcher: Maria Chen | Date: Feb 3, 2025 | Research Type: Usability Study | Product Area: Vault | Tags: Onboarding, Usability | Summary: "5 of 6 participants struggled to locate the namespace configuration step during initial setup."
3. Title: "Cloud Pak Navigation Tree Testing" | Researcher: James Okafor | Date: Nov 20, 2024 | Research Type: Foundational Discovery | Product Area: Cloud Pak | Tags: Navigation, IA | Summary: "First-click success rate of 42% on primary admin tasks revealed critical IA mismatch."
4. Title: "Terraform Workflow Survey - Q4 2024" | Researcher: Sara Snowden | Date: Dec 10, 2024 | Research Type: Survey | Product Area: Terraform | Tags: Workflows | Summary: "68% of respondents run plan/apply cycles more than 10 times daily; 41% report drift detection as top pain point."
5. Title: "PrivateLink Endpoint Deletion - Heuristic Review" | Researcher: Benjamin Howard | Date: Jan 28, 2025 | Research Type: Heuristic Review | Product Area: MCSP | Tags: PrivateLink, Security | Summary: "Shared endpoint deletion flow creates a security edge case not communicated to users; severity 2 issue."
6. Title: "Watson Assistant Conversation Design - Generative Study" | Researcher: Priya Nair | Date: Oct 5, 2024 | Research Type: Generative | Product Area: Watson | Tags: Conversation | Summary: "Uncovered 3 distinct mental models users apply when building conversation flows; none matched the current UI model."
7. Title: "MCSP Cluster Sizing - Expert Interviews" | Researcher: Benjamin Howard | Date: Jan 22, 2025 | Research Type: Foundational Discovery | Product Area: MCSP | Tags: Sizing, Capacity | Summary: "Machine-to-human auth ratios of 100:1 to 500:1 observed across federal segments; current sizing assumptions underestimate load."
8. Title: "Vault Secrets Engine Discoverability - Unmoderated Test" | Researcher: James Okafor | Date: Feb 18, 2025 | Research Type: Usability Study | Product Area: Vault | Tags: Discoverability | Summary: "Task success rate of 55% for first-time secrets engine configuration; users expected a wizard flow."
9. Title: "IBM Cloud Pak Accessibility Audit" | Researcher: Maria Chen | Date: Sep 14, 2024 | Research Type: Heuristic Review | Product Area: Cloud Pak | Tags: Accessibility, WCAG | Summary: "14 WCAG 2.1 AA violations identified across the admin dashboard; 3 rated critical severity."
10. Title: "Terraform Provider UX Benchmarking" | Researcher: Priya Nair | Date: Jan 8, 2025 | Research Type: Survey | Product Area: Terraform | Tags: Benchmarking, Competitive | Summary: "IBM Terraform provider rated 3.1/5 vs. competitor average of 4.2/5 on ease of initial configuration."

**Table View (alternate state, activated by ContentSwitcher):**
Carbon DataTable with TableToolbar. Columns: Title (sortable), Researcher (sortable), Product Area, Research Type, Date (sortable), Tags. Each row clickable → Artifact Detail. Show all 10 artifacts.

**Empty State (shown when filters produce no results):**
Centered in results area: Carbon "Search" icon 48px Gray-40 + heading "No results found" 16px Gray-100 + body "Try adjusting your search or clearing your filters." 14px Gray-70 + Carbon Button (ghost) "Clear all filters"

---

### Zone 5: Pagination

Carbon Pagination component: 10 items per page. Show "1–10 of 10 items".

---

## PAGE: Artifact Detail View

**Route:** /repository/[artifact-slug]
**Example:** Uses artifact #7 "MCSP Cluster Sizing - Expert Interviews" as the rendered example.
**Carbon UI Shell:** Header visible. SideNav same as Browse page. "All Research" active.

### Layout

2x Grid. SideNav left 3 cols. Content 13 cols: main content 8 cols + sidebar 4 cols (1 col gutter).

---

### Zone 1: Breadcrumb + Page Header

Carbon Breadcrumb: "Home" / "Repository" / "MCSP Cluster Sizing - Expert Interviews" (current)

H2: "MCSP Cluster Sizing - Expert Interviews" — 28px SemiBold Gray-100

Tag row below heading:
- Carbon Tag (Blue): "Foundational Discovery"
- Carbon Tag (Green): "MCSP"
- Carbon Tag (Gray): "Sizing"
- Carbon Tag (Gray): "Capacity"
- Carbon Tag (Gray): "FedRAMP"

Carbon Button (ghost) top-right: "← Back to Repository" → Repository Browse page

---

### Zone 2: Main Content (col-span 8)

**Summary section:**
Label "SUMMARY" — 11px SemiBold Gray-70 uppercase, 8px letter-spacing
Body text: "This study investigated workload sizing signals for MCSP Vault clusters targeting federal customer segments. Expert interviews with pre-sales engineers and solutions architects revealed machine-to-human authentication ratios of 100:1 to 500:1 — significantly higher than current sizing assumptions. Findings directly inform launch capacity tier decisions D1 and D2."
— 16px Gray-100, line-height 1.6

**Key Findings section:**
Label "KEY FINDINGS" — same label style
Carbon UnorderedList (disc bullets), 14px Gray-100:
- Machine-to-human auth ratios of 100:1 to 500:1 across federal segments; current assumptions underestimate load at peak events.
- Human logins typically 3–5 per account; up to 15 for large mature DoD accounts.
- Namespace usage: 2–3 typical, 12+ for mature accounts. Secrets engines start with KV then SSH.
- FedRAMP certification confirmed as absolute #1 blocker for all federal segments.
- HSM integration near-universal for DoD/IC (FIPS 140-2/3 compliance required).

---

### Zone 3: Sidebar (col-span 4)

White Tile, 1px Gray-20 border, 24px padding.

**Metadata (Carbon StructuredList, borderless):**
- Researcher: Benjamin Howard
- Date Conducted: January 22, 2025
- Key Contributors: Sara Snowden, Tim Silk, Tim Olson
- Product Area: MCSP
- Research Type: Foundational Discovery
- Sessions: 3 expert interviews, 45 min each

**Attachments section (below StructuredList):**
Label "ATTACHMENTS" — 11px SemiBold Gray-70 uppercase
- Carbon icon (Document, 16px Blue-60) + "Research Script.pdf" + "Download" link (14px Blue-60)
- Carbon icon (Presentation, 16px Blue-60) + "Insights Deck.pdf" + "Download" link (14px Blue-60)

**Figma Design section:**
Label "FIGMA DESIGN" — 11px SemiBold Gray-70 uppercase
Carbon Button (tertiary, full-width): "View Figma Design ↗" (external link icon, disabled/placeholder state)

---

### Zone 4: Related Research

Section heading: "Related Research" — 20px SemiBold Gray-100, 40px margin-top

Two Carbon ClickableTile (6-col each, White bg, 1px Gray-20 border):
- Tile 1: "FedRAMP Adoption Barriers - Federal Buyer Interviews" | Benjamin Howard | Tag: Foundational Discovery | Tag: MCSP
- Tile 2: "PrivateLink Endpoint Deletion - Heuristic Review" | Benjamin Howard | Tag: Heuristic Review | Tag: MCSP

---

## PAGE GROUP: Submit Research (Multi-Step Form)

**Route:** /repository/submit
**Carbon UI Shell:** Header visible. SideNav: "Submit Research" active.

---

## PAGE: Submit - Step 1: Basic Information

**Layout:** 2x Grid, SideNav left. Form content centered in col-span 8 (offset 4 from left of content area).

### Zone 1: Page Header

Breadcrumb: "Home" / "Repository" / "Submit Research"
H2: "Submit Research" — 28px SemiBold Gray-100
Body: "Share your research with the IBM design community. All submissions are reviewed before appearing in the repository." — 16px Gray-70

### Zone 2: Progress Indicator

Carbon ProgressIndicator (horizontal, 4 steps):
- Step 1: "Basic Info" — current (Blue-60 circle, filled)
- Step 2: "Details" — incomplete (Gray circle)
- Step 3: "Attachments" — incomplete
- Step 4: "Review & Submit" — incomplete

### Zone 3: Form Fields

All fields inside a White Tile, 1px Gray-20 border, 32px padding.

- Carbon TextInput: label "Research Title" (required), placeholder "Enter a descriptive title for your research", helper text "Be specific — include the product, method, and focus area."
- Carbon DatePicker (single): label "Date Conducted" (required), placeholder "MM/DD/YYYY"
- Carbon Dropdown: label "Product Area" (required), options: Select a product area... / MCSP / Vault / Terraform / Watson / Cloud Pak / Other
- Carbon Dropdown: label "Research Type" (required), options: Select a type... / Foundational Discovery / Usability Study / Generative / Survey / Heuristic Review / Other
- Carbon TextInput: label "Key Contributors", placeholder "Names, comma-separated (e.g., Sara Snowden, Tim Olson)", helper text "Include anyone who participated in planning or running the study."

### Zone 4: Form Actions

Right-aligned button row:
- Carbon Button (ghost): "Cancel" → Repository Browse
- Carbon Button (primary): "Next: Details →" → Submit Step 2

---

## PAGE: Submit - Step 2: Details

### Zone 1–2: Same breadcrumb and progress indicator as Step 1, Step 2 now current.

### Zone 3: Form Fields

White Tile, 32px padding.

- Carbon TextArea: label "Research Summary" (required), rows 6, placeholder "Briefly describe the research goals, methods used, and key findings. 2–4 sentences.", helper text "This summary will appear in search results and artifact previews."
- Carbon MultiSelect: label "Tags", placeholder "Select or search tags...", options: UX Research / Usability / Discovery / FedRAMP / Onboarding / Navigation / Information Architecture / Performance / Security / Accessibility / Generative / Survey / Benchmarking / Competitive

### Zone 4: Form Actions

Right-aligned:
- Carbon Button (secondary): "← Back"
- Carbon Button (primary): "Next: Attachments →"

---

## PAGE: Submit - Step 3: Attachments

### Zone 1–2: Same breadcrumb and progress indicator, Step 3 current.

### Zone 3: Form Fields

White Tile, 32px padding.

- Carbon TextInput: label "Figma Design Link", placeholder "https://www.figma.com/file/...", helper text "Paste the share link to your Figma file (optional)."
- Carbon FileUploader: label "Research Script", button text "Add file", drag-drop zone text "Drag and drop a file here or click to upload", accepted file types: .pdf, .doc, .docx, .md, helper text "Upload your discussion guide, test script, or interview protocol."
- Carbon FileUploader: label "Insights Deck / Findings Report", same file uploader styling, accepted types: .pdf, .ppt, .pptx, helper text "Upload your synthesis deck or findings report."

### Zone 4: Form Actions

Right-aligned:
- Carbon Button (secondary): "← Back"
- Carbon Button (primary): "Next: Review →"

---

## PAGE: Submit - Step 4: Review & Submit

### Zone 1–2: Breadcrumb and progress indicator, Step 4 current.

### Zone 3: Review Panel

Heading: "Review your submission" — 20px SemiBold Gray-100
Body: "Please review the details below before submitting." — 14px Gray-70

White Tile, 32px padding. Carbon StructuredList (with dividers) showing all submitted values:
- Research Title: "MCSP Cluster Sizing - Expert Interviews"
- Date Conducted: January 22, 2025
- Product Area: MCSP
- Research Type: Foundational Discovery
- Key Contributors: Sara Snowden, Tim Silk, Tim Olson
- Summary: "This study investigated workload sizing signals for MCSP Vault clusters..."
- Tags: Sizing, Capacity, FedRAMP
- Figma Link: https://www.figma.com/file/example
- Research Script: ResearchScript.pdf (attached)
- Insights Deck: InsightsDeck.pdf (attached)

### Zone 4: Form Actions

Right-aligned:
- Carbon Button (secondary): "← Edit"
- Carbon Button (primary): "Submit Research"

---

## PAGE: Submit - Success State

### Layout

Centered content, col-span 8 offset 4.

Carbon InlineNotification (success, full-width): title "Research submitted successfully." subtitle "Your submission will be reviewed and appear in the repository within 24 hours."

Below notification, 32px gap, centered:
- Carbon Button (primary): "Back to Repository" → Repository Browse
- Carbon Button (secondary): "Submit Another" → Submit Step 1 (reset form)
