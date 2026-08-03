# Figma Make Prompt: Product Design UXR Hub

Paste the content below directly into Figma Make. This prompt is self-contained. It defines every page, component, dummy data entry, and navigation interaction for a fully navigable functional prototype.

---

## PROMPT START

Create a multi-page web application prototype called **Product Design UXR Hub**. This is an internal IBM design tool for discovering, submitting, and learning from UX research across the IBM design organization. The prototype must be fully navigable with pre-loaded dummy data and include a walkable research submission flow.

---

## GLOBAL DESIGN SYSTEM

Use the **Carbon Design System** (IBM Carbon) throughout. Apply the **light theme** with the following token mappings:

- Page background: Gray-10 (#f4f4f4)
- Surface / card background: White (#ffffff)
- Primary text: Gray-100 (#161616)
- Secondary text: Gray-70 (#525252)
- Helper text and labels: Gray-60 (#6f6f6f)
- Border: Gray-20 (#e0e0e0)
- Interactive / primary: Blue-60 (#0f62fe)
- Focus ring: Blue-60
- Tag Blue: Blue-60 background at 10% + Blue-60 text
- Tag Green: Green-60 background at 10% + Green-60 text
- Tag Gray: Gray-20 background + Gray-70 text
- Tag Teal: Teal-60 background at 10% + Teal-60 text
- Tag Purple: Purple-60 background at 10% + Purple-60 text

Typography: **IBM Plex Sans** for all text. **IBM Plex Mono** for code/skill names only.
- H1: 42px SemiBold, line-height 1.2
- H2: 28px SemiBold, line-height 1.3
- H3 / Section heading: 20px SemiBold
- Body large: 16px Regular, line-height 1.6
- Body default: 14px Regular, line-height 1.5
- Label / overline: 11px Regular, uppercase, letter-spacing 0.16em, Gray-70
- Helper text: 13px Regular, Gray-70

Layout: **Carbon 2x Grid** — 16-column, 16px gutters, max-width 1584px centered. All pages use this grid.

Spacing: 8px base unit. Common values: 8, 16, 24, 32, 40, 48, 64px.

Global header height: 48px. SideNav width: 256px (where present).

---

## GLOBAL NAVIGATION: Carbon Header (appears on every page)

Render a **Carbon Header** component at the top of every page:
- Left: small gray square icon placeholder (16x16) + site name "Product Design UXR Hub" — IBM Plex Sans SemiBold 14px Gray-100
- Center-right: **Carbon HeaderNavigation** with four **HeaderMenuItem** links: "Repository", "Templates", "Research Guidance", "Bob AI Setup"
- On each page, the corresponding nav item is highlighted (Blue-60 underline, Blue-10 background)
- Far right: Carbon User icon 20px Gray-70 (user avatar placeholder)
- Header background: White, bottom border: 1px Gray-20

---

## DUMMY DATA: Research Artifact Repository

Pre-load the following 10 artifacts. Use this data set wherever artifact listings appear throughout the prototype.

| # | Title | Researcher | Product Area | Research Type | Date | Tags | Summary |
|---|---|---|---|---|---|---|---|
| 1 | FedRAMP Adoption Barriers - Federal Buyer Interviews | Benjamin Howard | MCSP | Foundational Discovery | Jan 15, 2025 | FedRAMP, Federal | Identified FedRAMP certification as the primary blocker preventing federal agency adoption of cloud Vault. |
| 2 | Vault Onboarding Usability Study - Session 1 | Maria Chen | Vault | Usability Study | Feb 3, 2025 | Onboarding, Usability | 5 of 6 participants struggled to locate the namespace configuration step during initial setup. |
| 3 | Cloud Pak Navigation Tree Testing | James Okafor | Cloud Pak | Foundational Discovery | Nov 20, 2024 | Navigation, IA | First-click success rate of 42% on primary admin tasks revealed critical IA mismatch. |
| 4 | Terraform Workflow Survey - Q4 2024 | Sara Snowden | Terraform | Survey | Dec 10, 2024 | Workflows | 68% of respondents run plan/apply cycles more than 10 times daily; 41% report drift detection as top pain point. |
| 5 | PrivateLink Endpoint Deletion - Heuristic Review | Benjamin Howard | MCSP | Heuristic Review | Jan 28, 2025 | PrivateLink, Security | Shared endpoint deletion flow creates a security edge case not communicated to users; severity 2 issue. |
| 6 | Watson Assistant Conversation Design - Generative Study | Priya Nair | Watson | Generative | Oct 5, 2024 | Conversation | Uncovered 3 distinct mental models users apply when building conversation flows; none matched the current UI model. |
| 7 | MCSP Cluster Sizing - Expert Interviews | Benjamin Howard | MCSP | Foundational Discovery | Jan 22, 2025 | Sizing, Capacity | Machine-to-human auth ratios of 100:1 to 500:1 observed across federal segments; current sizing assumptions underestimate load. |
| 8 | Vault Secrets Engine Discoverability - Unmoderated Test | James Okafor | Vault | Usability Study | Feb 18, 2025 | Discoverability | Task success rate of 55% for first-time secrets engine configuration; users expected a wizard flow. |
| 9 | IBM Cloud Pak Accessibility Audit | Maria Chen | Cloud Pak | Heuristic Review | Sep 14, 2024 | Accessibility, WCAG | 14 WCAG 2.1 AA violations identified across the admin dashboard; 3 rated critical severity. |
| 10 | Terraform Provider UX Benchmarking | Priya Nair | Terraform | Survey | Jan 8, 2025 | Benchmarking, Competitive | IBM Terraform provider rated 3.1/5 vs. competitor average of 4.2/5 on ease of initial configuration. |

---

## PAGE 1: Home (Landing Page)

**Route:** /
**Active top nav:** none

**Layout:** 2x Grid, Gray-10 background, no SideNav.

### Hero Section

Full-width band, White background, 64px padding top/bottom. Inside, use a 2x Grid container.

Left 8 columns:
- Overline label: "IBM DESIGN" — 11px Regular, Gray-70, uppercase, letter-spacing 0.16em
- H1: "Product Design UXR Hub" — 42px SemiBold Gray-100, 8px below label
- Body: "A shared repository for UX research across IBM design teams. Find prior research, download templates, learn methodology, and set up AI research tooling — all in one place." — 16px Gray-70, line-height 1.6, 16px below heading
- **Carbon Search** (large variant): placeholder "Search research by topic, product, or researcher..." — full column width, White background, Gray-20 border, 24px below body

Right 8 columns:
- **Carbon Tile** (Gray-10 bg, 1px Gray-20 border, 24px padding, 8px radius): stat block with 3 stats in a 3-column internal grid:
  - "10" — 48px SemiBold Blue-60; "Research Artifacts" — 14px Gray-70
  - "6" — 48px SemiBold Blue-60; "Templates Available" — 14px Gray-70
  - "15+" — 48px SemiBold Blue-60; "Research Methods" — 14px Gray-70

### Entry-Point Section

Section overline: "GET STARTED" — 11px Regular Gray-70 uppercase, 32px margin-top, 16px margin-bottom.

Four **Carbon ClickableTile** components in a 4-column grid (col-span 4 each). Each tile: White bg, 1px Gray-20 border, 24px padding, 8px radius. Hover: Gray-10 bg, Blue-60 3px left border.

Tile 1 — Research Repository:
- Carbon Document icon, 24px Blue-60, top-left
- Title: "Research Repository" — 18px SemiBold Gray-100, 12px below icon
- Description: "Search and browse all UX research artifacts across IBM design teams. Filter by product, type, or date." — 14px Gray-70
- Link text: "Browse research →" — 14px Blue-60, bottom of tile
- Click: navigates to Page 2 (Repository Browse)

Tile 2 — Research Templates:
- Carbon Template icon, 24px Blue-60
- Title: "Research Templates"
- Description: "Download standardized templates for research planning, facilitation, synthesis, and reporting."
- Link text: "Browse templates →"
- Click: navigates to Page 7 (Template Library)

Tile 3 — Research Guidance:
- Carbon Education icon, 24px Blue-60
- Title: "Research Guidance"
- Description: "Learn which research method fits your question. Includes pros, cons, effort levels, and a quick-selection guide."
- Link text: "Explore methods →"
- Click: navigates to Page 10 (Methodology Overview)

Tile 4 — Bob AI Setup:
- Carbon Bot icon, 24px Blue-60
- Title: "Bob AI Setup"
- Description: "Set up Bob, IBM's AI design assistant, with UXR-specific skills to accelerate your research workflows."
- Link text: "Get started →"
- Click: navigates to Page 14 (Bob AI Setup)

### Recently Added Section

Section overline: "RECENTLY ADDED" — 11px Regular Gray-70 uppercase, 40px margin-top, 16px margin-bottom.
"See all research →" link — 14px Blue-60, right-aligned, navigates to Page 2.

Three **Carbon Tile** components, 3-column grid (col-span 4 each), White bg, 1px Gray-20 border, 24px padding, 8px radius. Each is clickable, navigates to its Artifact Detail page (Page 4).

Recent Artifact 1:
- Title: "Vault Secrets Engine Discoverability - Unmoderated Test" — 16px SemiBold Gray-100
- "James Okafor · Feb 18, 2025" — 13px Gray-70
- Tags: Carbon Tag (Blue small) "Usability Study" + Carbon Tag (Green small) "Vault"

Recent Artifact 2:
- Title: "MCSP Cluster Sizing - Expert Interviews" — 16px SemiBold Gray-100
- "Benjamin Howard · Jan 22, 2025" — 13px Gray-70
- Tags: Carbon Tag (Blue small) "Foundational Discovery" + Carbon Tag (Green small) "MCSP"

Recent Artifact 3:
- Title: "Vault Onboarding Usability Study - Session 1" — 16px SemiBold Gray-100
- "Maria Chen · Feb 3, 2025" — 13px Gray-70
- Tags: Carbon Tag (Blue small) "Usability Study" + Carbon Tag (Green small) "Vault"

### Footer

Full-width, White background, 1px Gray-20 top border, 24px padding top/bottom.
- Left: "Product Design UXR Hub" — 13px Gray-70
- Right: "IBM Design" — 13px Gray-70

---

## PAGE 2: Repository - Browse

**Route:** /repository
**Active top nav:** Repository

**Layout:** 2x Grid, Gray-10 bg. Left 3 columns: **Carbon SideNav**. Right 13 columns: page content.

### SideNav

White bg, right border 1px Gray-20, 256px wide.
- Section label: "REPOSITORY" — 12px SemiBold Gray-70 uppercase, 16px padding
- SideNavItem: "All Research" — active (Blue-60 3px left bar, Blue-10 bg)
- SideNavItem: "My Submissions" — inactive
- SideNavItem: "Submit Research" — inactive, navigates to Page 5 (Submit Step 1)

### Page Header

**Carbon Breadcrumb**: "Home" (link to Page 1) / "Repository" (current, Gray-70)
H2: "Research Repository" — 28px SemiBold Gray-100, 24px below breadcrumb
Body: "Browse all UX research contributed by IBM designers." — 16px Gray-70, 8px below heading
Right-aligned in same row: **Carbon Button (primary)** "Submit Research" — navigates to Page 5

### Search + Filters

**Carbon Search** (large, full-width): placeholder "Search by title, researcher, tag, or product area..."

Filter row (horizontal, 16px below search):
- **Carbon Dropdown**: "Research Type" — options: All Types / Foundational Discovery / Usability Study / Generative / Survey / Heuristic Review / Other
- **Carbon Dropdown**: "Product Area" — options: All Products / MCSP / Vault / Terraform / Watson / Cloud Pak / Other
- **Carbon Dropdown**: "Date Range" — options: All Time / Last 30 days / Last 90 days / Last 6 months / Last year
- Right-aligned ghost link: "Clear all filters" — 14px Blue-60

Results count: "Showing 10 results" — 13px Gray-70, 8px below filter row

### View Toggle + Results

**Carbon ContentSwitcher** (right-aligned, above grid): "Card View" (active) | "Table View"

**Card View (default):** 2-column grid, col-span 8 each, 16px gap. Each card is a **Carbon ClickableTile** (White bg, 1px Gray-20 border, 24px padding, 8px radius). Hover: Gray-10 bg, Blue-60 3px left border. Click: navigates to Page 4 (Artifact Detail).

Each card structure:
- Title: 16px SemiBold Gray-100, max 2 lines
- Researcher + Date: "Name · Date" — 13px Gray-70
- Tag row: Carbon Tag (Blue small) Research Type + Carbon Tag (Green small) Product Area + Carbon Tag (Gray small) for each additional tag
- Summary snippet: 14px Gray-70 italic, max 2 lines

Render all 10 dummy artifacts as cards using the data set defined above.

**Table View (alternate):** **Carbon DataTable** with **TableToolbar**. Columns: Title (sortable), Researcher (sortable), Product Area, Research Type, Date (sortable), Tags. Each row clickable → Page 4.

**Empty State** (zero results after filtering): Centered — Carbon Search icon 48px Gray-40 + "No results found" 16px Gray-100 + "Try adjusting your search or clearing your filters." 14px Gray-70 + **Carbon Button (ghost)** "Clear all filters"

### Pagination

**Carbon Pagination**: 10 per page. Label: "1–10 of 10 items".

---

## PAGE 3: (Not a standalone page — Table View is a toggle state within Page 2)

---

## PAGE 4: Artifact Detail

**Route:** /repository/mcsp-cluster-sizing
**Active top nav:** Repository. SideNav: "All Research" active (same SideNav as Page 2).

**Layout:** 2x Grid, SideNav left 3 cols. Content right 13 cols: main 8 cols + sidebar 4 cols (1 col gutter).

### Header

**Carbon Breadcrumb**: "Home" / "Repository" / "MCSP Cluster Sizing - Expert Interviews" (current)
H2: "MCSP Cluster Sizing - Expert Interviews" — 28px SemiBold Gray-100
Tag row: Carbon Tag (Blue) "Foundational Discovery" + Carbon Tag (Green) "MCSP" + Carbon Tag (Gray) "Sizing" + Carbon Tag (Gray) "Capacity" + Carbon Tag (Gray) "FedRAMP"
Top-right: **Carbon Button (ghost)** "← Back to Repository" — navigates to Page 2

### Main Content (col-span 8)

Label: "SUMMARY" — 11px SemiBold Gray-70 uppercase
Body: "This study investigated workload sizing signals for MCSP Vault clusters targeting federal customer segments. Expert interviews with pre-sales engineers and solutions architects revealed machine-to-human authentication ratios of 100:1 to 500:1 — significantly higher than current sizing assumptions. Findings directly inform launch capacity tier decisions D1 and D2." — 16px Gray-100, line-height 1.6

Label: "KEY FINDINGS" — same label style, 32px margin-top
**Carbon UnorderedList**, 14px Gray-100:
- Machine-to-human auth ratios of 100:1 to 500:1 across federal segments; current assumptions underestimate load at peak events.
- Human logins typically 3–5 per account; up to 15 for large mature DoD accounts.
- Namespace usage: 2–3 typical, 12+ for mature accounts. Secrets engines start with KV then SSH.
- FedRAMP certification confirmed as absolute #1 blocker for all federal segments.
- HSM integration near-universal for DoD/IC (FIPS 140-2/3 compliance required).

### Sidebar (col-span 4)

**Carbon Tile** (White bg, 1px Gray-20 border, 24px padding):

Label: "DETAILS" — 11px SemiBold Gray-70 uppercase
**Carbon StructuredList** (borderless):
- Researcher: Benjamin Howard
- Date Conducted: January 22, 2025
- Contributors: Sara Snowden, Tim Silk, Tim Olson
- Product Area: MCSP
- Research Type: Foundational Discovery
- Sessions: 3 expert interviews, 45 min each

Label: "ATTACHMENTS" — same label style, 24px margin-top
- Carbon Document icon (16px Blue-60) + "Research Script.pdf" + "Download" link (14px Blue-60)
- Carbon Presentation icon (16px Blue-60) + "Insights Deck.pdf" + "Download" link (14px Blue-60)

Label: "FIGMA DESIGN" — same label style, 24px margin-top
**Carbon Button (tertiary, full-width)**: "View Figma Design ↗" (placeholder/disabled state — no live link in prototype)

### Related Research

Section heading: "Related Research" — 20px SemiBold Gray-100, 40px margin-top
Two **Carbon ClickableTile** (col-span 6 each, White bg, 1px Gray-20 border):
- "FedRAMP Adoption Barriers - Federal Buyer Interviews" | Benjamin Howard | Tags: Foundational Discovery, MCSP
- "PrivateLink Endpoint Deletion - Heuristic Review" | Benjamin Howard | Tags: Heuristic Review, MCSP
Both click to Page 4 (same Artifact Detail layout, adjust data)

---

## PAGE 5: Submit Research — Step 1: Basic Information

**Route:** /repository/submit
**Active top nav:** Repository. SideNav: "Submit Research" active.

**Layout:** 2x Grid, SideNav left. Form centered in col-span 8 (offset from SideNav).

### Header

**Carbon Breadcrumb**: "Home" / "Repository" / "Submit Research" (current)
H2: "Submit Research" — 28px SemiBold Gray-100
Body: "Share your research with the IBM design community. All submissions are reviewed before appearing in the repository." — 16px Gray-70

### Progress Indicator

**Carbon ProgressIndicator** (horizontal, 4 steps):
- Step 1: "Basic Info" — current (Blue-60 filled circle)
- Step 2: "Details" — incomplete
- Step 3: "Attachments" — incomplete
- Step 4: "Review & Submit" — incomplete

### Form (White Tile, 1px Gray-20 border, 32px padding)

- **Carbon TextInput**: label "Research Title" (required asterisk), placeholder "Enter a descriptive title for your research", helper "Be specific — include the product, method, and focus area."
- **Carbon DatePicker** (single): label "Date Conducted" (required), placeholder "MM/DD/YYYY"
- **Carbon Dropdown**: label "Product Area" (required), options: Select a product area... / MCSP / Vault / Terraform / Watson / Cloud Pak / Other
- **Carbon Dropdown**: label "Research Type" (required), options: Select a type... / Foundational Discovery / Usability Study / Generative / Survey / Heuristic Review / Other
- **Carbon TextInput**: label "Key Contributors", placeholder "Names, comma-separated (e.g., Sara Snowden, Tim Olson)", helper "Include anyone who participated in planning or running the study."

### Actions

Right-aligned button row:
- **Carbon Button (ghost)** "Cancel" — navigates to Page 2
- **Carbon Button (primary)** "Next: Details →" — navigates to Page 6

---

## PAGE 6: Submit Research — Step 2: Details

**Route:** /repository/submit/details
Same breadcrumb and SideNav as Page 5. Progress Indicator: Step 2 current.

### Form (White Tile, 32px padding)

- **Carbon TextArea**: label "Research Summary" (required), rows 6, placeholder "Briefly describe the research goals, methods used, and key findings. 2–4 sentences.", helper "This summary will appear in search results and artifact previews."
- **Carbon MultiSelect**: label "Tags", placeholder "Select or search tags...", options: UX Research / Usability / Discovery / FedRAMP / Onboarding / Navigation / Information Architecture / Performance / Security / Accessibility / Generative / Survey / Benchmarking / Competitive

### Actions

- **Carbon Button (secondary)** "← Back" — navigates to Page 5
- **Carbon Button (primary)** "Next: Attachments →" — navigates to Page 6b (Step 3)

---

## PAGE 6b: Submit Research — Step 3: Attachments

Same breadcrumb and SideNav. Progress Indicator: Step 3 current.

### Form (White Tile, 32px padding)

- **Carbon TextInput**: label "Figma Design Link", placeholder "https://www.figma.com/file/...", helper "Paste the share link to your Figma file (optional)."
- **Carbon FileUploader**: label "Research Script", button "Add file", drag zone "Drag and drop a file here or click to upload", accepted: .pdf .doc .docx .md, helper "Upload your discussion guide, test script, or interview protocol."
- **Carbon FileUploader**: label "Insights Deck / Findings Report", same styling, accepted: .pdf .ppt .pptx, helper "Upload your synthesis deck or findings report."

### Actions

- **Carbon Button (secondary)** "← Back"
- **Carbon Button (primary)** "Next: Review →" — navigates to Page 6c

---

## PAGE 6c: Submit Research — Step 4: Review & Submit

Same breadcrumb and SideNav. Progress Indicator: Step 4 current.

H3: "Review your submission" — 20px SemiBold Gray-100
Body: "Please review the details below before submitting." — 14px Gray-70

White Tile, 32px padding. **Carbon StructuredList** (with dividers) showing pre-filled review data:
- Research Title: "MCSP Cluster Sizing - Expert Interviews"
- Date Conducted: January 22, 2025
- Product Area: MCSP
- Research Type: Foundational Discovery
- Key Contributors: Sara Snowden, Tim Silk, Tim Olson
- Summary: "This study investigated workload sizing signals for MCSP Vault clusters..."
- Tags: Sizing, Capacity, FedRAMP
- Figma Link: https://www.figma.com/file/example
- Research Script: ResearchScript.pdf
- Insights Deck: InsightsDeck.pdf

### Actions

- **Carbon Button (secondary)** "← Edit" — navigates to Page 6b
- **Carbon Button (primary)** "Submit Research" — navigates to Page 6d

---

## PAGE 6d: Submit Research — Success

Centered content, col-span 8 offset 4. No SideNav active state needed.

**Carbon InlineNotification (success, full-width)**: title "Research submitted successfully." subtitle "Your submission will be reviewed and appear in the repository within 24 hours."

32px below notification:
- **Carbon Button (primary)** "Back to Repository" — navigates to Page 2
- **Carbon Button (secondary)** "Submit Another" — navigates to Page 5 (reset form)

---

## PAGE 7: Template Library

**Route:** /templates
**Active top nav:** Templates. No SideNav.

**Layout:** 2x Grid, Gray-10 bg, full content width.

### Header

**Carbon Breadcrumb**: "Home" / "Templates" (current)
H2: "Research Templates" — 28px SemiBold Gray-100
Body: "Download and adapt these templates for your research projects. Each template follows IBM design research standards." — 16px Gray-70

### Category Filter

**Carbon ContentSwitcher**: "All" (active) | "Planning" | "Facilitation" | "Synthesis" | "Reporting"

### Template Grid

4-column grid (col-span 4 each), 16px gap. Each card: **Carbon ClickableTile**, White bg, 1px Gray-20 border, 24px padding, 8px radius. Hover: Gray-10 bg, Blue-60 3px left border.

Card structure: Carbon Tag (Teal small) category + Title 18px SemiBold Gray-100 + Description 14px Gray-70 + "View Template →" 14px Blue-60 bottom

Card 1 — Research Plan: Tag "Planning" | Title "Research Plan" | "End-to-end research plan template. Covers problem statement, objectives, decision scope, methodology selection, hypotheses, screening criteria, recruiting, timeline, and risk documentation." | Click: Page 8

Card 2 — Discussion Guide: Tag "Facilitation" | Title "Discussion Guide" | "Semi-structured interview guide template with intro, warm-up, core probe questions, and closing. Includes think-aloud and follow-up scaffolding." | Click: Page 9a

Card 3 — Usability Test Script: Tag "Facilitation" | Title "Usability Test Script" | "Task-based moderated usability test script. Includes facilitator intro, consent language, task scenarios, think-aloud prompts, and debrief questions." | Click: Page 9b

Card 4 — Research Findings Report: Tag "Reporting" | Title "Research Findings Report" | "Structured findings report with confidence-tagged recommendations, severity ratings, evidence trail, and decision-mapped outputs." | Click: Page 9c

Card 5 — Participant Screener: Tag "Planning" | Title "Participant Screener" | "Recruiting screener template with qualification criteria, must-have requirements, disqualifier rules, and logistics checklist." | Click: Page 9d

Card 6 — Affinity Map: Tag "Synthesis" | Title "Affinity Map" | "Cluster-based synthesis template for organizing and theming qualitative observations into actionable insights." | Click: Page 9e

---

## PAGE 8: Template Detail — Research Plan

**Route:** /templates/research-plan
**Active top nav:** Templates. No SideNav.

### Header

**Carbon Breadcrumb**: "Home" / "Templates" / "Research Plan" (current)
H2: "Research Plan" — 28px SemiBold Gray-100
Carbon Tag (Teal): "Planning"
Top-right: **Carbon Button (ghost)** "← Back to Templates" — navigates to Page 7

### Overview (col-span 8)

White Tile, 1px Gray-20 border, 24px padding:

Label: "ABOUT THIS TEMPLATE"
Body: "A reusable, end-to-end research plan template for IBM design research. Every section maps to a decision someone will make. Keep it decision-grade: every objective should map to a specific decision, and every recommendation should carry a confidence tag." — 15px Gray-100

Label: "WHEN TO USE" — 24px margin-top
**Carbon UnorderedList**, 14px Gray-100:
- At the start of any research engagement to align stakeholders on scope and method
- When you need to justify method choices to a PM or design lead
- Before recruiting participants to ensure screening criteria are decision-grade
- When multiple methods are being combined and triangulation needs to be documented

### Section Preview (col-span 8, below overview or same column)

White Tile, 1px Gray-20 border, 24px padding:

Label: "TEMPLATE SECTIONS"
**Carbon StructuredList** (borderless, condensed), listing all 11 sections:
1. Header — Title, Summary, Created/Updated, Status, Product, Owner, Contributors
2. Problem — State the decision problem: what is unknown, why it matters, and the risk of deciding without evidence
3. Research Objective — One-sentence decision-grade objective + Key Research Objectives list
4. Decision Scope — Specific decisions this research must inform (D1–D5 format)
5. Research Methodology — Mixed-method table (Method, Why, Participants, Platform, Duration, Output) + Triangulation note
6. Key Research Questions — Testable questions the study will answer
7. Hypotheses to Test — Falsifiable statements with rejection thresholds
8. Screening Criteria — Must-haves and disqualifiers for participant recruitment
9. Recruiting and Logistics — Source, incentive, session count, roles, consent/data handling
10. Outputs and Deliverables — Confidence-scored recommendations, evidence trail, readout deck
11. Timeline and Risks — Phase-by-phase timeline + labeled assumptions and risks

### Actions

- **Carbon Button (primary)** "Download Template (.md)"
- **Carbon Button (secondary)** "Copy Template Link"
Helper text: "Template opens in your default markdown editor." — 13px Gray-70

### Related Templates

Section heading: "Related Templates" — 20px SemiBold Gray-100
Two **Carbon ClickableTile** (col-span 6 each):
- "Discussion Guide" | Facilitation | "Semi-structured interview guide with probing question scaffolding." | navigates to Page 9a
- "Participant Screener" | Planning | "Recruiting screener with must-have and disqualifier criteria." | navigates to Page 9d

---

## PAGES 9a–9e: Additional Template Detail Pages

Use the same layout as Page 8 for all remaining templates. Abbreviate as follows:

Page 9a — Discussion Guide (/templates/discussion-guide): Sections: Header / Introduction script / Consent and recording notice / Warm-up questions / Core probe questions / Follow-up prompts / Prototype probe section (optional) / Debrief and close. Related: Research Plan, Usability Test Script.

Page 9b — Usability Test Script (/templates/usability-test-script): Sections: Header / Facilitator intro script / Consent and think-aloud instructions / Warm-up task / Core tasks (4–6 scenarios with success criteria) / Post-task questions / Post-study debrief / Observer notes template. Related: Discussion Guide, Research Findings Report.

Page 9c — Research Findings Report (/templates/research-findings-report): Sections: Header / Executive Summary / Research Objectives and Methods / Participant Overview / Findings by Theme (evidence, severity, confidence tag) / Recommendations / Open Questions / Appendix. Related: Research Plan, Affinity Map.

Page 9d — Participant Screener (/templates/participant-screener): Sections: Header / Study description / Qualification criteria / Disqualifiers / Logistics / Screener questions with routing logic / Confirmation language. Related: Research Plan, Discussion Guide.

Page 9e — Affinity Map (/templates/affinity-map): Sections: Header / Raw observations grid / First-level clusters / Second-level themes / Theme summaries with quotes / Insight statements. Related: Research Findings Report, Discussion Guide.

---

## PAGE 10: Research Guidance — Methodology Overview

**Route:** /research-guidance
**Active top nav:** Research Guidance

**Layout:** 2x Grid. SideNav left 3 cols. Content right 13 cols.

### SideNav

Section label: "RESEARCH GUIDANCE" — 12px SemiBold Gray-70 uppercase
- "Overview" — active
- "Discovery & Generative"
- "Structure & IA"
- "Evaluative"
- "Quantitative & Behavioral"
- "Triangulation"
- "Method Cheat Sheet"

### Header

**Carbon Breadcrumb**: "Home" / "Research Guidance" (current)
H2: "Research Methodologies" — 28px SemiBold Gray-100
Body: "A working catalog of research methods organized so you can pick the lowest-effort method that answers the real question. Each method lists what it is, when to use it, pros, cons, tradeoffs, typical effort, and the output it produces." — 16px Gray-70

### How to Choose a Method Tile

White Tile, 1px Gray-20 border, 24px padding, 32px margin-bottom.

Label: "HOW TO CHOOSE A METHOD"
Body: "Two axes from the NN/g method taxonomy help position any method:" — 14px Gray-70

2x2 grid table inside tile (CSS or SVG, simple bordered cells):
- Header row: blank | "Qualitative (why/how)" | "Quantitative (how many/how much)"
- Row 1: "Attitudinal (what they say)" | "interviews, focus groups, concept tests" | "surveys, desirability scales, card sorting (quant)"
- Row 2: "Behavioral (what they do)" | "usability testing (moderated), field studies, diary studies" | "analytics, A/B testing, unmoderated benchmark testing, tree testing, clickstream"

Below grid, **Carbon UnorderedList** (5 items), 14px Gray-100:
- Match the method to the decision and the main uncertainty, not to a process phase.
- Triangulate: combine at least one attitudinal and one behavioral method to offset blind spots.
- Prefer behavioral evidence over self-report when the two disagree.
- Use qualitative methods to learn what to fix and why; use quantitative methods to size a problem or prove a change.
- Smaller, more frequent studies usually beat one large study.

### Method Category Cards

Section heading: "Browse by Category" — 20px SemiBold Gray-100, 32px margin-top

6 **Carbon ClickableTile** in 3-column grid (col-span 5 each at lg), White bg, 1px Gray-20 border, 24px padding, 8px radius:

Card 1 — Discovery & Generative: Carbon Search icon 24px Blue-60 | "Discovery & Generative" 18px SemiBold | "Learn goals, context, mental models, and pain points. Methods: User Interviews, Contextual Inquiry, Diary Studies, Focus Groups, Surveys." 14px Gray-70 | Click: Page 11 (User Interviews)

Card 2 — Structure & IA: Carbon TreeView icon | "Structure & IA" | "Design and validate information architecture, navigation, taxonomy, and labeling. Methods: Card Sorting, Tree Testing." | No dedicated detail page in V1 (show card only)

Card 3 — Evaluative: Carbon Task icon | "Evaluative" | "Diagnose whether users can complete real tasks and why designs fail. Methods: Moderated Usability Testing, Unmoderated Usability Testing, Heuristic Evaluation, Cognitive Walkthrough." | Click: Page 12 (Moderated Usability Testing)

Card 4 — Quantitative & Behavioral: Carbon Analytics icon | "Quantitative & Behavioral" | "Size problems, prove changes, and measure real behavior at scale. Methods: Analytics Review, A/B Testing, Benchmarking." | No dedicated detail page in V1

Card 5 — Triangulation: Carbon DataVis_2 icon | "Triangulation & Mixed Methods" | "Combine methods to offset individual blind spots and raise confidence in high-stakes decisions." | No dedicated detail page in V1

Card 6 — Method Cheat Sheet: Carbon Table icon | "Method Cheat Sheet" | "Quick-reference table: match your research need to the right method in seconds." | Scrolls to cheat sheet table below

### Quick Selection Cheat Sheet

Section heading: "Quick Selection Cheat Sheet" — 20px SemiBold Gray-100, 40px margin-top
Body: "Match your research question to the right method." — 14px Gray-70

**Carbon DataTable** (no selection, with row dividers). Columns: "If you need to..." | "Strong candidates" | "Avoid relying on"

10 rows:
1. Understand needs and motivations | Interviews, contextual inquiry | Surveys alone, analytics
2. See real behavior in context | Field studies, diary studies, analytics | Focus groups, interviews
3. Decide IA grouping and labels | Card sorting | Tree testing alone
4. Validate navigation/findability | Tree testing | Card sorting alone
5. Diagnose why a design fails | Moderated usability testing | A/B testing, analytics
6. Validate a design quickly at scale | Unmoderated usability testing | Moderated only
7. Size a problem or segment | Analytics, surveys | Interviews
8. Prove a specific change works | A/B testing, benchmarking | Heuristic review
9. Work with no user access | Heuristic eval, cognitive walkthrough, analytics, support tickets | Anything claiming user truth
10. Make a high-stakes, defensible call | Triangulation (mixed methods) | Any single method

### Effort vs. Confidence Guide

White Tile, 1px Gray-20 border, 24px padding, 3-column layout inside:

Column 1 — Low Effort: Carbon Tag (Green small) "Low Effort" | list: heuristic eval, cognitive walkthrough, unmoderated tests, surveys, analytics review
Column 2 — Medium Effort: Carbon Tag (Teal small) "Medium Effort" | list: moderated usability testing, interviews, card sorting, tree testing, benchmarking
Column 3 — High Effort: Carbon Tag (Purple small) "High Effort" | list: contextual inquiry, diary studies, A/B testing at scale, full triangulation

---

## PAGE 11: Method Detail — User Interviews

**Route:** /research-guidance/user-interviews
**Active top nav:** Research Guidance. SideNav: "Discovery & Generative" active.

### Header

**Carbon Breadcrumb**: "Home" / "Research Guidance" / "User Interviews" (current)
H2: "User Interviews" — 28px SemiBold Gray-100
Tags: Carbon Tag (Gray) "Discovery & Generative" + Carbon Tag (Green) "Low-Medium Effort" + Carbon Tag (Blue) "Qualitative" + Carbon Tag (Teal) "Attitudinal"
Top-right: **Carbon Button (ghost)** "← Back to Overview" — navigates to Page 10

### Main Content (col-span 8)

White Tile, 1px Gray-20 border, 24px padding:

Label: "WHAT IT IS"
Body: "One-on-one, semi-structured conversation to learn goals, context, mental models, pain points, and language." — 15px Gray-100

Label: "WHEN TO USE" — 24px margin-top
**Carbon UnorderedList**:
- Early discovery; when you need the "why" behind behavior
- To build personas, JTBD, and journey inputs
- When you need the user's vocabulary for a new problem space

**Carbon Accordion** (4 items, all closed by default), 24px margin-top:

Item 1 — Pros: Rich depth and nuance; flexible follow-up | Fast to start; builds empathy and stakeholder buy-in | Surfaces vocabulary users actually use
Item 2 — Cons: Self-reported: people misremember and rationalize | Small samples; interviewer and recall bias | Not generalizable; time-intensive to analyze
Item 3 — Tradeoffs: "Depth over breadth; what people say over what they do. Pair with observation or analytics to confirm behavioral claims."
Item 4 — Typical Output: Themes, quotes, needs, and mental models | Hypotheses to test with behavioral methods | Vocabulary and language inputs for IA and content design

White Tile (below accordion), 1px Gray-20 border, 24px padding:
Label: "COMMON PITFALLS"
**Carbon UnorderedList**:
- Choosing this method for behavior questions (it answers attitude questions)
- Running too few sessions and over-generalizing findings
- Skipping a pilot; not accounting for moderator bias
- Treating self-reported behavior as ground truth without behavioral corroboration

### Sidebar (col-span 4)

White Tile, 1px Gray-20 border, 24px padding:

Label: "EFFORT"
Carbon Tag (Green): "Low-Medium"
Body: "Low-medium setup; medium analysis (transcription, coding)." — 13px Gray-70

Label: "RELATED TEMPLATES" — 24px margin-top
**Carbon StructuredList** (borderless, with links):
- "Discussion Guide" → Page 9a
- "Research Plan" → Page 8
- "Research Findings Report" → Page 9c

Label: "RELATED METHODS" — 24px margin-top
Carbon Tag (Gray clickable): "Contextual Inquiry"
Carbon Tag (Gray clickable): "Surveys" → Page 13
Carbon Tag (Gray clickable): "Diary Studies"

---

## PAGE 12: Method Detail — Moderated Usability Testing

**Route:** /research-guidance/moderated-usability-testing
**Active top nav:** Research Guidance. SideNav: "Evaluative" active.

Same layout as Page 11.

Header tags: Carbon Tag (Gray) "Evaluative" + Carbon Tag (Teal) "Medium Effort" + Carbon Tag (Blue) "Qualitative" + Carbon Tag (Purple) "Behavioral"

WHAT IT IS: "A facilitator gives tasks and observes one participant at a time (in person or remote), probing think-aloud. Works at any fidelity from paper to live product."

WHEN TO USE: Evaluating whether people can complete real tasks | Diagnosing why a design fails | Any fidelity from paper prototype to live product | Any stage after you have something to show a participant

Accordion — Pros: Finds the majority of severe issues with about 5 users per segment | Explains the "why" behind failures; flexible probing | Works at any design fidelity
Accordion — Cons: Small samples are not quantitatively projectable | Facilitator bias is a real risk without trained moderation | Scheduling overhead
Accordion — Tradeoffs: "Diagnostic depth over statistical proof. Pair with unmoderated testing or analytics to scale validation."
Accordion — Typical Output: Prioritized usability issues with severity ratings (Critical, Major, Minor) | Observed behaviors and failure patterns | Fix recommendations mapped to task failures

Common Pitfalls: Running more than 5 participants per segment before synthesizing | Asking leading questions or helping participants during tasks | Testing too many tasks in one session (max 5–6 core tasks in 60 min) | Not piloting the script

Sidebar: Effort tag (Teal) "Medium". Related Templates: Usability Test Script, Research Findings Report, Research Plan. Related Methods: "Unmoderated Usability Testing", "Heuristic Evaluation", "Analytics Review"

---

## PAGE 13: Method Detail — Surveys

**Route:** /research-guidance/surveys
**Active top nav:** Research Guidance. SideNav: "Discovery & Generative" active.

Same layout as Pages 11–12.

Header tags: Carbon Tag (Gray) "Discovery & Generative" + Carbon Tag (Green) "Low-Medium Effort" + Carbon Tag (Blue) "Quantitative" + Carbon Tag (Teal) "Attitudinal"

WHAT IT IS: "A structured questionnaire distributed to many respondents. Can be attitudinal (satisfaction, opinions) or descriptive (demographics, frequency of behavior)."

WHEN TO USE: When you need scale to quantify attitudes or segment sizes | To validate qualitative findings at volume | For tracking satisfaction or NPS over time | When you need demographic or frequency data

Accordion — Pros: Cheap at scale; statistically projectable with good sampling | Fast to field; good for tracking over time | Reaches participants you cannot recruit for sessions
Accordion — Cons: Self-reported; question wording bias is a serious risk | No follow-up; cannot probe unexpected answers | Poor at answering "why"
Accordion — Tradeoffs: "Breadth over depth. Precision depends entirely on sampling quality and question design. Do not use to replace qualitative research; use to size what qualitative finds."
Accordion — Typical Output: Distributions, segment sizes | Satisfaction/NPS scores | Trend data across time periods | Quantified validation of qualitative hypotheses

Common Pitfalls: Leading or double-barreled questions | Asking about behavior rather than measuring it | Distributing to a convenience sample | Running one survey without pairing with a qualitative method

Sidebar: Effort tag (Green) "Low-Medium". Related Templates: Research Plan, Research Findings Report, Participant Screener. Related Methods: "User Interviews" → Page 11, "Analytics Review", "Benchmarking"

---

## PAGE 14: Bob AI Setup

**Route:** /bob-ai-setup
**Active top nav:** Bob AI Setup. No SideNav.

**Layout:** 2x Grid, Gray-10 bg. Content centered col-span 10 (offset 3).

### Header

**Carbon Breadcrumb**: "Home" / "Bob AI Setup" (current)
H2: "Bob AI for UX Research" — 28px SemiBold Gray-100

### Hero Tile

**Carbon Tile** (Blue-10 #edf5ff bg, Blue-30 1px border, 32px padding, 8px radius, margin-bottom 40px):
Carbon Bot icon, 32px Blue-60, top-left

Body (16px Gray-100, line-height 1.6): "Bob is an AI design and research assistant available to IBM designers. It includes skills specifically designed to accelerate UX research workflows — from summarizing interview transcripts to generating research questions and analyzing product data."

Second paragraph (14px Gray-70): "The skills below are available today. Detailed setup guides and example prompts are coming soon."

### Available Skills Section

Section heading: "Available UXR Skills" — 20px SemiBold Gray-100, 24px margin-bottom

Three **Carbon Tile** (col-span 5 each, White bg, 1px Gray-20 border, 24px padding, 8px radius):

Skill 1 — meeting-transcript:
- Carbon Transcript icon 24px Blue-60
- Title: "meeting-transcript" — IBM Plex Mono SemiBold 15px Gray-100
- Body: "Automatically summarize and structure meeting notes, interview transcripts, and session recordings into actionable findings." — 14px Gray-70
- Carbon Tag (Blue small): "Research Analysis"

Skill 2 — research-question-generator:
- Carbon Query icon 24px Blue-60
- Title: "research-question-generator" — IBM Plex Mono SemiBold 15px Gray-100
- Body: "Transform vague hypotheses and study goals into clear, researchable user research questions using a structured 3-part framework." — 14px Gray-70
- Carbon Tag (Blue small): "Research Planning"

Skill 3 — amplitude:
- Carbon Analytics icon 24px Blue-60
- Title: "amplitude" — IBM Plex Mono SemiBold 15px Gray-100
- Body: "Query product analytics, analyze funnels and retention, and synthesize behavioral data to inform design decisions." — 14px Gray-70
- Carbon Tag (Blue small): "Behavioral Research"

### Get Access CTA

White Tile, 1px Gray-20 border, 40px padding, text-align center, 40px margin-top:
Heading: "Ready to get started?" — 20px SemiBold Gray-100
Body: "Bob is available to IBM designers. Request access through the link below." — 14px Gray-70, 24px margin-bottom
**Carbon Button (primary, centered)**: "Get Access to Bob"
Helper text: "IBM employees only. Access requires an IBM intranet account." — 13px Gray-70

### Coming Soon Notification

**Carbon InlineNotification (info, full-width, 32px margin-top)**:
Title: "More documentation coming soon."
Subtitle: "Detailed setup guides, example prompts, and a full skill reference will be added to this page. Check back regularly or submit a request to be notified."

---

## NAVIGATION WIRING SUMMARY

Wire the following interactions in the prototype so it is fully navigable:

| From | Element | To |
|---|---|---|
| Page 1 (Home) | "Repository" tile click | Page 2 |
| Page 1 | "Templates" tile click | Page 7 |
| Page 1 | "Research Guidance" tile click | Page 10 |
| Page 1 | "Bob AI Setup" tile click | Page 14 |
| Page 1 | Recent artifact 1, 2, or 3 | Page 4 |
| Page 1 | "See all research →" | Page 2 |
| Page 1 | Header nav "Repository" | Page 2 |
| Page 1 | Header nav "Templates" | Page 7 |
| Page 1 | Header nav "Research Guidance" | Page 10 |
| Page 1 | Header nav "Bob AI Setup" | Page 14 |
| Page 2 | Artifact card/row click | Page 4 |
| Page 2 | "Submit Research" button | Page 5 |
| Page 2 | SideNav "Submit Research" | Page 5 |
| Page 4 | "← Back to Repository" | Page 2 |
| Page 4 | Related artifact tiles | Page 4 |
| Page 5 | "Next: Details →" | Page 6 |
| Page 5 | "Cancel" | Page 2 |
| Page 6 | "Next: Attachments →" | Page 6b |
| Page 6 | "← Back" | Page 5 |
| Page 6b | "Next: Review →" | Page 6c |
| Page 6b | "← Back" | Page 6 |
| Page 6c | "Submit Research" | Page 6d |
| Page 6c | "← Edit" | Page 6b |
| Page 6d | "Back to Repository" | Page 2 |
| Page 6d | "Submit Another" | Page 5 |
| Page 7 | Template card 1 | Page 8 |
| Page 7 | Template card 2 | Page 9a |
| Page 7 | Template cards 3–6 | Pages 9b–9e |
| Page 8 | "← Back to Templates" | Page 7 |
| Page 8 | Related template tiles | Pages 9a, 9d |
| Pages 9a–9e | "← Back to Templates" | Page 7 |
| Page 10 | Card 1 (Discovery) | Page 11 |
| Page 10 | Card 3 (Evaluative) | Page 12 |
| Page 10 | "Cheat Sheet" card | Scroll to cheat sheet on Page 10 |
| Page 11 | "← Back to Overview" | Page 10 |
| Page 11 | "Surveys" related method tag | Page 13 |
| Page 11 | Related template links | Pages 8, 9a, 9c |
| Page 12 | "← Back to Overview" | Page 10 |
| Page 12 | Related template links | Pages 9b, 9c, 8 |
| Page 13 | "← Back to Overview" | Page 10 |
| Page 13 | "User Interviews" related method | Page 11 |
| Page 13 | Related template links | Pages 8, 9c, 9d |
| All pages | Header "Repository" | Page 2 |
| All pages | Header "Templates" | Page 7 |
| All pages | Header "Research Guidance" | Page 10 |
| All pages | Header "Bob AI Setup" | Page 14 |
| All pages | Site name in header | Page 1 |

---

## PROMPT END

The above defines 14 named pages (plus toggle states) with full Carbon component specifications, dummy data, and navigation wiring. The prototype should be navigable end-to-end with no dead links within the defined page set.
