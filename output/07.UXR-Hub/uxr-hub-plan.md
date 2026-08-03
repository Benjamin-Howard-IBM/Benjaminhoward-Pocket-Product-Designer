# Product Design UXR Hub - Figma Make Prototype Plan

## Top-Level Overview

**Goal:** Produce a single, well-structured Figma Make prompt that renders a fully navigable functional prototype of an internal UXR Hub website for the IBM design org.

**Problem being solved:** UX research is happening across IBM design teams but it is siloed and undiscoverable. Designers reinvent foundational research because they cannot see what others have already learned. Additionally, there is no shared standards layer for how to conduct research or how to use AI research tooling (Bob).

**Scope:** The prompt is the deliverable. Everything in this plan is preparation work that feeds a single composed Figma Make prompt. The prototype must be fully navigable with dummy data pre-loaded AND include a walkable submission flow.

**Design system:** Carbon Design System. Light theme (Gray-10 background). Use named Carbon components where they map cleanly (UI Shell, Search, DataTable, Tag, FileUploader, Form, Breadcrumb, etc.). Use Carbon visual language (IBM Plex, Gray-10 background, Gray-100 text, Blue-60 interactive, 8px grid, 2x Grid layout) where no direct component equivalent exists.

**Out of scope:**
- AI summarizer (deferred to V2)
- Real backend or API wiring (prototype only)
- Content writing for Research Guidance (placeholder structure with realistic labels)
- Any MCSP project work

---

## Site Map

```
Home (Landing)
├── Artifact Repository
│   ├── Browse / Search / Filter
│   ├── Artifact Detail View
│   └── Submit Research (form flow)
├── Templates
│   ├── Template Library (browse)
│   └── Template Detail / Download
├── Research Guidance
│   ├── Methodology Overview
│   └── Individual Method Pages (Foundational, Evaluative, Generative, etc.)
└── Bob AI Setup
    ├── What is Bob
    ├── Install & Access
    └── UXR Skills & Example Prompts
```

---

## Sub-Tasks

---

### Sub-Task 1: Define the Information Architecture and Carbon Component Mapping

**Intent:** Before writing a single line of the Figma Make prompt, map every screen to its Carbon components and layout zones. This prevents ambiguity in the prompt and ensures the output is a real Carbon UI, not a generic web page.

**Expected Outcomes:**
- A screen inventory listing every page/state in the prototype
- Each screen annotated with: Carbon components used, layout zone descriptions, dummy data requirements
- Interaction notes (what clicking what does what)

**Todo List:**
1. List all screens: Home, Repo Browse, Artifact Detail, Submit Research (multi-step), Templates, Template Detail, Methodology Overview, Method Detail, Bob Setup (3 sub-pages)
2. For each screen, identify the Carbon components: UI Shell (Header + SideNav), Content Switcher, DataTable, Search, Tag, Tile, FileUploader, Form inputs, Breadcrumb, Button variants, Modal, Notification, ProgressIndicator
3. Define dummy data set: 8-10 artifact entries with realistic metadata (title, researcher, product area, research type, date, tags, summary snippet)
4. Define the submission form fields: Title, Summary, Date, Key Contributors, Product Area (dropdown), Research Type (dropdown), Tags (multi-select), Figma Link (URL field), Upload Research Script (file), Upload Insights Deck (file)
5. Map navigation states: active nav item per page, breadcrumb paths, back navigation

**Relevant Context:**
- Carbon UI Shell docs: top navigation + side navigation pattern
- Carbon DataTable: for artifact list with sort/filter
- Carbon Tag: for research type and product area labels on cards
- PPD templates folder: `templates/` - research plan template exists here

**Status:** [ ] pending

---

### Sub-Task 2: Write the Home Page Section of the Figma Make Prompt

**Intent:** The home page has dual purpose - orient a first-time visitor with a brief hero, then immediately drop into utility with recent research, quick search, and clear entry points to all four sections.

**Expected Outcomes:**
- Prompt section that produces a Carbon-styled landing page
- Hero zone: site name (UXR Hub), one-sentence value proposition, 4 entry-point cards
- Utility zone: search bar (Carbon Search), 3 most recent artifact tiles, section shortcuts

**Todo List:**
1. Write hero copy: site name, tagline ("Find it. Learn from it. Build on it."), brief description (2 sentences max)
2. Define 4 entry-point cards using Carbon Clickable Tile: Artifact Repository, Templates, Research Guidance, Bob AI Setup - each with icon, label, and one-line description
3. Define "Recent Research" section: 3 dummy artifact tiles with title, researcher name, product area tag, research type tag, date
4. Define Carbon UI Shell header: site name left, primary nav links (Repository, Templates, Guidance, Bob Setup), right-side user avatar
5. Write the Figma Make prompt section for this page including layout (2x Grid, full-width hero, 4-column cards, 3-column recent tiles)

**Relevant Context:**
- Carbon Clickable Tile for entry-point cards
- Carbon Search component (large variant) for the search bar
- Carbon Tag (Blue for research type, Green for product area)
- IBM Plex Sans for body, IBM Plex Sans SemiBold for headings

**Status:** [ ] pending

---

### Sub-Task 3: Write the Artifact Repository Section of the Figma Make Prompt

**Intent:** This is the primary value section. Designers must be able to browse all artifacts, filter by type/area/date, search by keyword, view an artifact detail, and walk through the submission flow.

**Expected Outcomes:**
- Prompt section producing: Browse view, Artifact Detail view, Submit Research multi-step form
- 8-10 dummy artifact entries visible in browse
- Submission flow shows all form fields across steps with a progress indicator

**Todo List:**
1. Define browse view layout: Carbon Search at top, filter row (Carbon Dropdown for Research Type, Product Area, Date Range), Carbon DataTable or Card Grid toggle for results
2. Define 8-10 dummy artifacts covering: at least 3 product areas, at least 4 research types (Foundational Discovery, Usability Study, Survey, Generative), varied dates (last 6 months)
3. Define Artifact Detail view: title, researcher, date, product area tag, research type tag, tags list, summary paragraph, Figma link (external link button), downloadable files (Research Script, Insights Deck), "Related Research" section (2-3 linked artifacts)
4. Define Submit Research flow: Step 1 (Basic Info - Title, Date, Product Area, Research Type, Contributors), Step 2 (Details - Summary, Tags), Step 3 (Attachments - Figma URL, file uploads), Step 4 (Review + Submit confirmation)
5. Define empty state (no results found) and success state (submission confirmed notification)
6. Write the Figma Make prompt section for all three views

**Relevant Context:**
- Carbon ProgressIndicator for multi-step submission
- Carbon FileUploader for script/deck attachments
- Carbon MultiSelect for tags
- Carbon DataTable with toolbar for browse view
- Carbon InlineNotification (success) for submission confirmation

**Status:** [ ] pending

---

### Sub-Task 4: Write the Templates Section of the Figma Make Prompt

**Intent:** Surface existing PPD templates and create a browsable library with realistic placeholder slots for future additions.

**Expected Outcomes:**
- Prompt section producing a Template Library browse page and a Template Detail page
- At minimum the Research Plan template is represented with its real structure
- Placeholder tiles for 4-5 additional template types designers would commonly need

**Todo List:**
1. Read and reference `skill/research/resources/sample-research-plan.md` - this is the real research plan template. Surface its 11-section structure (Problem, Research Objective, Decision Scope, Methodology, Key Research Questions, Hypotheses, Screening Criteria, Recruiting, Outputs, Timeline, Risks) in the Template Detail view.
2. Define template library grid: Carbon Tile cards, each showing template name, type (Planning, Synthesis, Reporting, Facilitation), description, and download/view button
3. Define additional placeholder templates beyond the research plan: Discussion Guide, Usability Test Script, Research Findings Report, Participant Screener, Affinity Map
4. Define Template Detail view: title, description, when to use it, preview of the section headers, download button (Carbon Button primary), "Related Templates" sidebar
5. Write the Figma Make prompt section for the template library and detail view

**Relevant Context:**
- `skill/research/resources/sample-research-plan.md` - 11-section research plan template (real content, use verbatim section structure)
- Carbon Tile (clickable) for template cards
- Carbon StructuredList for template metadata

**Status:** [ ] pending

---

### Sub-Task 5: Write the Research Guidance Section of the Figma Make Prompt

**Intent:** Provide a readable methodology reference that helps designers understand what type of research to conduct, when, and how. Content is sourced directly from the real methodologies reference file - not placeholder.

**Expected Outcomes:**
- Prompt section producing a Methodology Overview page and 3 fully fleshed-out Method Detail pages
- Overview includes 6 method category cards and a quick-selection cheat sheet DataTable
- Each method detail page has: when to use, pros/cons, tradeoffs, effort level, typical output, related methods

**Todo List:**
1. Define methodology overview page: intro paragraph, 6 method category cards (Discovery & Generative, Structure & IA, Evaluative, Quantitative & Behavioral, Triangulation, Cheat Sheet) using Carbon Tile with icon, name, one-line description. Source from `skill/research/resources/research-methodologies.md`.
2. Define Method Detail page structure: hero with method name and when to use, pros/cons (Carbon StructuredList), tradeoffs, effort level (Carbon Tag: Low/Medium/High), typical output, related methods. All content sourced verbatim from the methodologies file.
3. Create fully fleshed-out Method Detail pages for: User Interviews, Moderated Usability Testing, and Surveys. All other methods appear as card-level summaries on the overview page.
4. Include the quick selection cheat sheet from the source file as a Carbon DataTable on the overview page.
5. Write the Figma Make prompt section for the overview and all detail pages

**Relevant Context:**
- `skill/research/resources/research-methodologies.md` - 15+ named methods across 6 categories, all with what/when/pros/cons/tradeoffs/effort/output. Use verbatim.
- Carbon Accordion for expandable pros/cons/tradeoffs on method detail pages
- Carbon Tag (Gray) for effort level labels (Low, Medium, High)
- Carbon Link for cross-references to templates

**Status:** [ ] pending

---

### Sub-Task 6: Write the Bob AI Setup Section of the Figma Make Prompt

**Intent:** Surface the existence of Bob as an AI research assistant for designers. This section is intentionally lightweight for V1 - the goal is awareness and discoverability, not a complete onboarding flow. Content will be refined in a later iteration.

**Expected Outcomes:**
- Prompt section producing a single Bob Setup page that communicates: what Bob is, that it has UXR-relevant skills, and that setup instructions exist
- The page should feel like a "coming soon" resource with enough structure to show the concept to stakeholders
- No deep technical content required for V1

**Todo List:**
1. Define a single Bob Setup page with: a brief hero description of Bob, 2-3 placeholder skill cards using Carbon Tile (name + one-line description), and a "Get Access" call-to-action Carbon Button
2. Keep content high-level - the goal is to show the concept exists, not to fully document it
3. Write the Figma Make prompt section for this page

**Relevant Context:**
- Carbon Tile for skill cards
- Carbon Button (primary) for the access CTA
- This section will be refined in V2 with real skill documentation and example prompts

**Status:** [ ] pending

---

### Sub-Task 7: Compose and Finalize the Complete Figma Make Prompt

**Intent:** Combine all section prompts into a single, coherent, well-ordered Figma Make prompt. The prompt must be self-contained - Figma Make should be able to execute it without additional context.

**Expected Outcomes:**
- A single prompt document saved to `output/07.UXR-Hub/figma-make-prompt.md`
- The prompt produces a fully navigable prototype with: working navigation between all pages, dummy data visible in repo browse, submission flow walkable, all four sections accessible
- The prompt specifies Carbon design system, IBM Plex font, Gray-10 background, and correct 2x Grid usage

**Todo List:**
1. Define the global prompt preamble: site name (Product Design UXR Hub), purpose, Carbon DS specification, light theme, font (IBM Plex Sans), color tokens (Gray-10 background, Gray-100 text, Blue-60 interactive), 2x Grid layout
2. Assemble all section prompts from Sub-Tasks 2-6 in page order: Home, Repository (Browse + Detail + Submit), Templates (Library + Detail), Research Guidance (Overview + Method Detail), Bob Setup (3 sub-pages)
3. Define navigation wiring: which elements link to which pages, back navigation, breadcrumb behavior
4. Define dummy data inline in the prompt as a structured reference block Figma Make can use
5. Review the full prompt for consistency - component names, color references, interaction descriptions
6. Save the final prompt to `output/07.UXR-Hub/figma-make-prompt.md`

**Relevant Context:**
- All outputs from Sub-Tasks 1-6
- Figma Make accepts natural language prompts with component specifications and page-level descriptions
- The prompt should be specific enough that a developer could build the real backend from it

**Status:** [ ] pending

---

## Confirmed Decisions

- Site name: **Product Design UXR Hub**
- Theme: **Carbon light theme, Gray-10 background**
- The four sections map to four top-level nav items in the Carbon UI Shell.
- Methodology content sourced verbatim from `skill/research/resources/research-methodologies.md` (15+ methods, real content)
- Research Plan template sourced verbatim from `skill/research/resources/sample-research-plan.md` (11 sections, real content)
- *Assuming* Figma Make can reference Carbon components by name and will render them with reasonable fidelity.
- *Assuming* dummy artifact data can be invented for the prototype (no real research data required).
