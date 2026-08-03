# Product Design UXR Hub - IA & Carbon Component Map

Reference document for Sub-Tasks 2-7. Every screen, component, dummy data entry, and navigation state is defined here. The Figma Make prompt draws from this file directly.

---

## Global Shell

| Zone | Carbon Component | Notes |
|---|---|---|
| Top header bar | `Header` (Carbon UI Shell) | Site name "Product Design UXR Hub" left-aligned, primary nav links center/right, user avatar icon right |
| Primary nav links | `HeaderNavigation` + `HeaderMenuItem` | Repository, Templates, Research Guidance, Bob AI Setup |
| Active nav indicator | `HeaderMenuItem` (current) | Underline/highlight on active section |
| Side navigation (inner pages) | `SideNav` + `SideNavItems` | Used on Repository, Research Guidance, Bob Setup for sub-page navigation |
| Page content area | Carbon 2x Grid (`Grid` + `Column`) | Max-width container, Gray-10 background |
| Footer | Custom row | Site name, "IBM Design" attribution, thin top border Gray-20 |

**Color tokens:**
- Background: `$ui-background` / Gray-10 (#f4f4f4)
- Surface: `$ui-01` / White (#ffffff) for cards/panels
- Text primary: `$text-01` / Gray-100 (#161616)
- Text secondary: `$text-02` / Gray-70 (#525252)
- Interactive: `$interactive-01` / Blue-60 (#0f62fe)
- Border: `$ui-03` / Gray-20 (#e0e0e0)

**Font:** IBM Plex Sans. Headings: SemiBold. Body: Regular. Code: IBM Plex Mono.

---

## Screen Inventory

### S1: Home (Landing Page)

| Zone | Carbon Component | Content |
|---|---|---|
| Hero section | Full-width `Tile` or plain div, Gray-10 bg | Site name H1, tagline, 2-sentence description, search bar |
| Hero search | `Search` (large variant) | Placeholder: "Search research by topic, product, or researcher..." |
| Entry-point cards | 4x `ClickableTile` in `Grid` (3-col each at lg) | Repository, Templates, Research Guidance, Bob AI Setup - each with icon + label + one-line description |
| Recent Research section | Section heading + 3x `Tile` in `Grid` (4-col each) | 3 most recent dummy artifacts: title, researcher, product area Tag, research type Tag, date |
| Section label | `$label-01` typography | "RECENTLY ADDED" |

**Navigation from S1:**
- Clicking Repository card → S2 (Repo Browse)
- Clicking Templates card → S6 (Template Library)
- Clicking Research Guidance card → S8 (Methodology Overview)
- Clicking Bob AI Setup card → S10 (Bob Setup)
- Clicking a recent artifact tile → S4 (Artifact Detail)
- Typing in search + Enter → S2 (Repo Browse, pre-filtered)

**Breadcrumb:** None (root page)

---

### S2: Repository - Browse / Search

| Zone | Carbon Component | Content |
|---|---|---|
| Page heading | H2 | "Research Repository" |
| Search bar | `Search` (large) | Placeholder: "Search by title, researcher, tag, or product area" |
| Filter row | `Dropdown` x3 + `DatePicker` (optional) | Research Type, Product Area, Date Range |
| Results count | `$helper-text-01` | "Showing 10 of 10 results" |
| View toggle | `ContentSwitcher` | "Card View" / "Table View" |
| Results - Card View | Grid of `ClickableTile` (6-col each, 2-per-row) | Each card: title, researcher, date, product area Tag, research type Tag, summary snippet |
| Results - Table View | `DataTable` with `TableToolbar` | Columns: Title, Researcher, Product Area, Research Type, Date, Tags |
| Submit button | `Button` (primary) top-right | "Submit Research" → S5 |
| Empty state | `Tile` centered | Icon + "No results found. Try adjusting your filters." + Clear filters link |
| Pagination | `Pagination` | 10 per page |

**Navigation from S2:**
- Clicking artifact card/row → S4 (Artifact Detail)
- Clicking "Submit Research" → S5 (Submit Step 1)

**Breadcrumb:** Home > Repository

**Side nav items:** All Research, My Submissions, Submit Research

---

### S3: (Reserved - no standalone page needed; table/card are toggle views within S2)

---

### S4: Artifact Detail View

| Zone | Carbon Component | Content |
|---|---|---|
| Breadcrumb | `Breadcrumb` | Home > Repository > [Artifact Title] |
| Page heading | H2 | Artifact title |
| Meta row | `Tag` x2-4 | Product Area (Green), Research Type (Blue), tags (Gray) |
| Detail grid | `Grid` 8-col main + 4-col sidebar | Main: summary, description. Sidebar: metadata |
| Metadata sidebar | `StructuredList` | Researcher, Date, Contributors, Product Area, Research Type |
| Figma link | `Button` (tertiary) + external icon | "View Figma Design" → opens external link |
| Attachments | `StructuredList` + download icons | Research Script (PDF), Insights Deck (PDF/PPT) |
| Related Research | 2x `ClickableTile` (6-col each) | Title + researcher + research type Tag |
| Back button | `Button` (ghost) | "← Back to Repository" → S2 |

**Navigation from S4:**
- Back → S2
- Related research tile → S4 (different artifact)
- Figma link → external (no prototype nav)

**Breadcrumb:** Home > Repository > [Title]

---

### S5: Submit Research - Multi-Step Form

**4-step flow using `ProgressIndicator` at top**

#### S5a: Step 1 - Basic Information

| Field | Carbon Component | Options/Placeholder |
|---|---|---|
| Progress indicator | `ProgressIndicator` (4 steps) | Step 1 active: "Basic Info", Step 2: "Details", Step 3: "Attachments", Step 4: "Review" |
| Title | `TextInput` | Placeholder: "Enter a descriptive title for your research" |
| Date Conducted | `DatePicker` (single) | MM/DD/YYYY |
| Product Area | `Dropdown` | MCSP, Vault, Terraform, Watson, Cloud Pak, Other |
| Research Type | `Dropdown` | Foundational Discovery, Usability Study, Generative, Survey, Heuristic Review, Other |
| Key Contributors | `TextInput` | Placeholder: "Names, comma-separated" |
| Next button | `Button` (primary) | "Next: Details →" → S5b |
| Cancel | `Button` (ghost) | "Cancel" → S2 |

#### S5b: Step 2 - Details

| Field | Carbon Component | Options/Placeholder |
|---|---|---|
| Progress indicator | `ProgressIndicator` | Step 2 active |
| Summary | `TextArea` | Placeholder: "Briefly describe the research goals, methods, and key findings (2-4 sentences)" |
| Tags | `MultiSelect` | UX Research, Usability, Discovery, FedRAMP, Onboarding, Navigation, Information Architecture, Performance, Security, Accessibility |
| Back / Next | `Button` (secondary + primary) | "← Back" → S5a, "Next: Attachments →" → S5c |

#### S5c: Step 3 - Attachments

| Field | Carbon Component | Notes |
|---|---|---|
| Progress indicator | `ProgressIndicator` | Step 3 active |
| Figma Link | `TextInput` | Placeholder: "https://www.figma.com/..." |
| Upload Research Script | `FileUploader` | Label: "Research Script", accepts .pdf .doc .docx .md |
| Upload Insights Deck | `FileUploader` | Label: "Insights Deck / Findings Report", accepts .pdf .ppt .pptx |
| Back / Next | `Button` (secondary + primary) | "← Back" → S5b, "Next: Review →" → S5d |

#### S5d: Step 4 - Review & Submit

| Zone | Carbon Component | Content |
|---|---|---|
| Progress indicator | `ProgressIndicator` | Step 4 active |
| Review panel | `Tile` with `StructuredList` inside | All submitted fields listed for confirmation |
| Submit button | `Button` (primary) | "Submit Research" → S5e (success) |
| Back | `Button` (secondary) | "← Edit" → S5c |

#### S5e: Submission Success

| Zone | Carbon Component | Content |
|---|---|---|
| Success notification | `InlineNotification` (success) | "Research submitted successfully. It will appear in the repository within 24 hours." |
| Return CTA | `Button` (primary) | "Back to Repository" → S2 |
| Submit another | `Button` (secondary) | "Submit Another" → S5a (reset form) |

---

### S6: Template Library

| Zone | Carbon Component | Content |
|---|---|---|
| Page heading | H2 | "Research Templates" |
| Sub-heading | `$body-long-01` | "Download and adapt these templates for your research projects." |
| Filter row | `ContentSwitcher` | "All", "Planning", "Synthesis", "Reporting", "Facilitation" |
| Template cards | Grid of `ClickableTile` (4-col each, 3-per-row) | 6 template cards |
| Each card | `ClickableTile` | Template name, type Tag, one-line description, "View Template →" |

**6 template cards:**
1. Research Plan - Planning - "End-to-end plan template covering objectives, methods, and decision scope"
2. Discussion Guide - Facilitation - "Semi-structured interview guide with probing question scaffolding"
3. Usability Test Script - Facilitation - "Task-based moderated usability test script with think-aloud prompts"
4. Research Findings Report - Reporting - "Structured findings report with confidence tagging and recommendations"
5. Participant Screener - Planning - "Recruiting screener with must-have and disqualifier criteria"
6. Affinity Map - Synthesis - "Cluster-based synthesis template for qualitative data analysis"

**Navigation from S6:**
- Clicking any card → S7 (Template Detail)

**Breadcrumb:** Home > Templates

---

### S7: Template Detail

| Zone | Carbon Component | Content |
|---|---|---|
| Breadcrumb | `Breadcrumb` | Home > Templates > [Template Name] |
| Page heading | H2 | Template name |
| Type tag | `Tag` (Blue) | Template category (Planning / Facilitation / etc.) |
| Description | `$body-long-01` | 2-3 sentence description |
| "When to use" | `Tile` with heading | Bulleted guidance on appropriate use cases |
| Section preview | `StructuredList` | Lists the section headers of the template (for Research Plan: all 11 sections) |
| Download button | `Button` (primary) | "Download Template" |
| View in browser | `Button` (secondary) | "View Full Template" → expands accordion or modal |
| Related Templates | 2x `ClickableTile` (6-col each) | Suggested related templates |
| Back | `Button` (ghost) | "← Back to Templates" → S6 |

**Research Plan template section list (verbatim from source):**
1. Header (Title, Summary, Created/Updated, Status, Product, Owner, Contributors)
2. Problem
3. Research Objective + Key Research Objectives
4. Decision Scope (D1-D5)
5. Research Methodology (method table + triangulation note)
6. Key Research Questions
7. Hypotheses to Test
8. Screening Criteria
9. Recruiting and Logistics
10. Outputs and Deliverables
11. Timeline + Risks and Assumptions

---

### S8: Research Guidance - Methodology Overview

| Zone | Carbon Component | Content |
|---|---|---|
| Page heading | H2 | "Research Methodologies" |
| Intro paragraph | `$body-long-01` | 2 sentences: what this section covers, reference to NN/g attitudinal/behavioral axes |
| Method axis diagram | `Tile` with ASCII/SVG grid | Qualitative vs Quantitative × Attitudinal vs Behavioral 2x2 |
| Category cards | 6x `ClickableTile` (4-col each) | Discovery & Generative, Structure & IA, Evaluative, Quantitative & Behavioral, Triangulation, Method Cheat Sheet |
| Quick Selection Table | `DataTable` | Columns: "If you need to...", "Strong candidates", "Avoid relying on" - 10 rows from source file |

**Side nav items:** Overview, Discovery & Generative, Structure & IA, Evaluative, Quantitative & Behavioral, Triangulation, Cheat Sheet

**Navigation from S8:**
- Category card → S9 (Method Detail, scrolled to that category)

**Breadcrumb:** Home > Research Guidance

---

### S9: Research Guidance - Method Detail

Three fully fleshed pages: User Interviews, Moderated Usability Testing, Surveys. All other methods show as S8 card-level only.

| Zone | Carbon Component | Content |
|---|---|---|
| Breadcrumb | `Breadcrumb` | Home > Research Guidance > [Method Name] |
| Page heading | H2 | Method name |
| Category tag | `Tag` (Gray) | Category (e.g., "Discovery & Generative") |
| Effort tag | `Tag` (colored by effort) | Low (Green), Medium (Teal), High (Purple) |
| "What it is" | `$body-long-01` paragraph | Verbatim from source |
| "When to use" | `Tile` + bullet list | Verbatim from source |
| Details accordion | `Accordion` with 4 items | Pros, Cons, Tradeoffs, Typical Output - each verbatim from source |
| Related templates | `StructuredList` with links | Linked template names (e.g., Discussion Guide for Interviews) |
| Related methods | 2x `Tag` (clickable) | Sibling method names |
| Back | `Button` (ghost) | "← Back to Overview" → S8 |

---

### S10: Bob AI Setup

| Zone | Carbon Component | Content |
|---|---|---|
| Page heading | H2 | "Bob AI for UX Research" |
| Hero description | `Tile` (Blue-10 tint) | Brief: "Bob is an AI design and research assistant available to IBM designers. It includes skills specifically designed to accelerate UX research workflows." |
| Skill cards | 3x `Tile` (4-col each) | meeting-transcript, research-question-generator, amplitude (name + one-line description each) |
| "Get Access" CTA | `Button` (primary) | "Get Access to Bob" (placeholder link) |
| "Coming Soon" note | `InlineNotification` (info) | "Detailed setup guides and example prompts coming soon." |

**Breadcrumb:** Home > Bob AI Setup

---

## Dummy Artifact Data Set (10 entries)

| # | Title | Researcher | Product Area | Research Type | Date | Tags | Summary Snippet |
|---|---|---|---|---|---|---|---|
| 1 | FedRAMP Adoption Barriers - Federal Buyer Interviews | Benjamin Howard | MCSP | Foundational Discovery | 2025-01-15 | FedRAMP, Federal, Discovery | Identified FedRAMP certification as the primary blocker preventing federal agency adoption of cloud Vault. |
| 2 | Vault Onboarding Usability Study - Session 1 | Maria Chen | Vault | Usability Study | 2025-02-03 | Onboarding, Usability, Vault | 5 of 6 participants struggled to locate the namespace configuration step during initial setup. |
| 3 | Cloud Pak Navigation Tree Testing | James Okafor | Cloud Pak | Foundational Discovery | 2024-11-20 | Navigation, IA, Tree Testing | First-click success rate of 42% on primary admin tasks revealed critical IA mismatch. |
| 4 | Terraform Workflow Survey - Q4 2024 | Sara Snowden | Terraform | Survey | 2024-12-10 | Survey, Terraform, Workflows | 68% of respondents run plan/apply cycles more than 10 times daily; 41% report drift detection as top pain point. |
| 5 | PrivateLink Endpoint Deletion - Heuristic Review | Benjamin Howard | MCSP | Heuristic Review | 2025-01-28 | PrivateLink, Heuristic, Security | Shared endpoint deletion flow creates a security edge case not communicated to users; severity 2 issue. |
| 6 | Watson Assistant Conversation Design - Generative Study | Priya Nair | Watson | Generative | 2024-10-05 | Generative, Watson, Conversation | Uncovered 3 distinct mental models users apply when building conversation flows; none matched the current UI model. |
| 7 | MCSP Cluster Sizing - Expert Interviews | Benjamin Howard | MCSP | Foundational Discovery | 2025-01-22 | Sizing, FedRAMP, Expert, Capacity | Machine-to-human auth ratios of 100:1 to 500:1 observed across federal segments; current sizing assumptions underestimate load. |
| 8 | Vault Secrets Engine Discoverability - Unmoderated Test | James Okafor | Vault | Usability Study | 2025-02-18 | Vault, Usability, Discoverability | Task success rate of 55% for first-time secrets engine configuration; users expected a wizard flow. |
| 9 | IBM Cloud Pak Accessibility Audit | Maria Chen | Cloud Pak | Heuristic Review | 2024-09-14 | Accessibility, WCAG, Cloud Pak | 14 WCAG 2.1 AA violations identified across the admin dashboard; 3 rated critical severity. |
| 10 | Terraform Provider UX Benchmarking | Priya Nair | Terraform | Survey | 2025-01-08 | Benchmarking, Terraform, Competitive | IBM Terraform provider rated 3.1/5 vs. competitor average of 4.2/5 on "ease of initial configuration." |

---

## Navigation State Map

| Current Page | Active Top Nav | Active Side Nav | Breadcrumb Path |
|---|---|---|---|
| Home | None highlighted | — | (none) |
| Repo Browse | Repository | All Research | Home > Repository |
| Artifact Detail | Repository | All Research | Home > Repository > [Title] |
| Submit Step 1-4 | Repository | Submit Research | Home > Repository > Submit Research |
| Template Library | Templates | — | Home > Templates |
| Template Detail | Templates | — | Home > Templates > [Name] |
| Methodology Overview | Research Guidance | Overview | Home > Research Guidance |
| Method Detail | Research Guidance | [Method Name] | Home > Research Guidance > [Method] |
| Bob Setup | Bob AI Setup | — | Home > Bob AI Setup |

---

## Interaction Wiring Summary

| Element | Page | Action | Destination |
|---|---|---|---|
| "Repository" entry card | Home | Click | Repo Browse (S2) |
| "Templates" entry card | Home | Click | Template Library (S6) |
| "Research Guidance" entry card | Home | Click | Methodology Overview (S8) |
| "Bob AI Setup" entry card | Home | Click | Bob Setup (S10) |
| Recent artifact tile | Home | Click | Artifact Detail (S4) |
| Hero search bar | Home | Submit | Repo Browse (S2, pre-filtered) |
| Artifact card/row | Repo Browse | Click | Artifact Detail (S4) |
| "Submit Research" button | Repo Browse | Click | Submit Step 1 (S5a) |
| "Next" button | Submit Step 1-3 | Click | Next step |
| "Back" button | Submit Step 2-4 | Click | Previous step |
| "Submit Research" button | Submit Step 4 | Click | Success state (S5e) |
| "Back to Repository" | Submit Success | Click | Repo Browse (S2) |
| Template card | Template Library | Click | Template Detail (S7) |
| "← Back to Templates" | Template Detail | Click | Template Library (S6) |
| Method category card | Methodology Overview | Click | Method Detail (S9) |
| "← Back to Overview" | Method Detail | Click | Methodology Overview (S8) |
| Side nav links | Any inner page | Click | Target section/page |
| Top nav links | Any page | Click | Section root page |
