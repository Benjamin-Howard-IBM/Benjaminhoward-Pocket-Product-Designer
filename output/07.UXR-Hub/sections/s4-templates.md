## PAGE GROUP: Templates

This page group covers two views: Template Library (S6) and Template Detail (S7).

---

## PAGE: Template Library

**Route:** /templates
**Carbon UI Shell:** Header visible. No SideNav. Top nav "Templates" highlighted.

### Layout

2x Grid, Gray-10 background. Full content width (no SideNav on this page).

---

### Zone 1: Page Header

Breadcrumb: Carbon Breadcrumb — "Home" / "Templates" (current)

H2: "Research Templates" — IBM Plex Sans SemiBold 28px, Gray-100, 24px below breadcrumb

Body: "Download and adapt these templates for your research projects. Each template follows IBM design research standards." — 16px Gray-70, 8px below heading

---

### Zone 2: Category Filter

Carbon ContentSwitcher (left-aligned): "All" (active) | "Planning" | "Facilitation" | "Synthesis" | "Reporting"

16px margin-bottom below switcher.

---

### Zone 3: Template Cards Grid

4-column grid (col-span 4 each at large, col-span 8 at medium, col-span 16 at small). 16px gap between cards.

Each card is a Carbon ClickableTile: White background, 1px Gray-20 border, 24px padding, 8px border-radius. Hover: Gray-10 background, Blue-60 3px left border. Click → Template Detail page for that template.

**Card structure:**
- Top-left: Carbon Tag (small, teal): category name
- Title: 18px SemiBold Gray-100, 12px margin-top
- Description: 14px Gray-70, line-height 1.5, 8px margin-top, max 3 lines
- Bottom row: "View Template →" text link, 14px Blue-60

---

**Template Card 1 — Research Plan:**
- Category Tag: "Planning"
- Title: "Research Plan"
- Description: "End-to-end research plan template. Covers problem statement, objectives, decision scope, methodology selection, hypotheses, screening criteria, recruiting, timeline, and risk documentation."
- Click → Template Detail: Research Plan

**Template Card 2 — Discussion Guide:**
- Category Tag: "Facilitation"
- Title: "Discussion Guide"
- Description: "Semi-structured interview guide template with intro, warm-up, core probe questions, and closing. Includes think-aloud and follow-up scaffolding."
- Click → Template Detail: Discussion Guide

**Template Card 3 — Usability Test Script:**
- Category Tag: "Facilitation"
- Title: "Usability Test Script"
- Description: "Task-based moderated usability test script. Includes facilitator intro, consent language, task scenarios, think-aloud prompts, and debrief questions."
- Click → Template Detail: Usability Test Script

**Template Card 4 — Research Findings Report:**
- Category Tag: "Reporting"
- Title: "Research Findings Report"
- Description: "Structured findings report with confidence-tagged recommendations, severity ratings, evidence trail, and decision-mapped outputs."
- Click → Template Detail: Research Findings Report

**Template Card 5 — Participant Screener:**
- Category Tag: "Planning"
- Title: "Participant Screener"
- Description: "Recruiting screener template with qualification criteria, must-have requirements, disqualifier rules, and logistics checklist."
- Click → Template Detail: Participant Screener

**Template Card 6 — Affinity Map:**
- Category Tag: "Synthesis"
- Title: "Affinity Map"
- Description: "Cluster-based synthesis template for organizing and theming qualitative observations into actionable insights."
- Click → Template Detail: Affinity Map

---

## PAGE: Template Detail — Research Plan

**Route:** /templates/research-plan
**Note:** This is the fully detailed template page. Discussion Guide, Usability Test Script, and others use the same layout structure with appropriate content.

**Carbon UI Shell:** Header visible. No SideNav. Top nav "Templates" highlighted.

### Zone 1: Breadcrumb + Page Header

Carbon Breadcrumb: "Home" / "Templates" / "Research Plan" (current)

H2: "Research Plan" — 28px SemiBold Gray-100

Tag row: Carbon Tag (Teal): "Planning"

Carbon Button (ghost) top-right: "← Back to Templates" → Template Library

---

### Zone 2: Overview (col-span 8 of 16)

**Description (White Tile, 1px Gray-20 border, 24px padding):**

Label: "ABOUT THIS TEMPLATE" — 11px SemiBold Gray-70 uppercase
Body: "A reusable, end-to-end research plan template for IBM design research. Every section maps to a decision someone will make. Keep it decision-grade: every objective should map to a specific decision, and every recommendation should carry a confidence tag."
— 15px Gray-100, line-height 1.6

Label: "WHEN TO USE" — 11px SemiBold Gray-70 uppercase, 24px margin-top
Carbon UnorderedList, 14px Gray-100:
- At the start of any research engagement to align stakeholders on scope and method
- When you need to justify method choices to a PM or design lead
- Before recruiting participants to ensure screening criteria are decision-grade
- When multiple methods are being combined and triangulation needs to be documented

---

### Zone 3: Section Preview (col-span 8, below overview or in sidebar)

**White Tile, 1px Gray-20 border, 24px padding.**

Label: "TEMPLATE SECTIONS" — 11px SemiBold Gray-70 uppercase

Carbon StructuredList (borderless, condensed) listing all 11 sections verbatim:
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

---

### Zone 4: Actions

24px gap below section preview.

- Carbon Button (primary): "Download Template (.md)"
- Carbon Button (secondary): "Copy Template Link"

Helper text below buttons: "Template opens in your default markdown editor. Requires a markdown viewer (Notion, VS Code, or any text editor)." — 13px Gray-70

---

### Zone 5: Related Templates (col-span 16, below main content)

Section heading: "Related Templates" — 20px SemiBold Gray-100

Two Carbon ClickableTile (col-span 6 each, White bg, 1px Gray-20 border):
- Tile 1: "Discussion Guide" | Category: Facilitation | "Semi-structured interview guide with probing question scaffolding."
- Tile 2: "Participant Screener" | Category: Planning | "Recruiting screener with must-have and disqualifier criteria."

---

## PAGE: Template Detail — Discussion Guide (abbreviated)

**Route:** /templates/discussion-guide
Same layout as Research Plan detail.

Section Preview sections:
1. Header — Study title, researcher, date, version
2. Introduction script — How to introduce yourself and the study
3. Consent and recording notice
4. Warm-up questions — 3–5 low-stakes questions to build rapport
5. Core probe questions — 8–12 semi-structured questions mapped to research objectives
6. Follow-up prompts — Laddering, silence, echo, and clarification prompts
7. Concept or prototype probe section (optional)
8. Debrief and close — Thank participant, explain next steps

Related Templates: Research Plan, Usability Test Script

---

## PAGE: Template Detail — Usability Test Script (abbreviated)

**Route:** /templates/usability-test-script
Same layout.

Section Preview sections:
1. Header — Study title, researcher, date, fidelity level
2. Facilitator intro script
3. Consent and think-aloud instructions
4. Warm-up task (1 task)
5. Core tasks (4–6 task scenarios with success criteria and observation checklist per task)
6. Post-task questions (SEQ or custom rating scale)
7. Post-study debrief questions
8. Observer notes template

Related Templates: Discussion Guide, Research Findings Report

---

## PAGE: Template Detail — Research Findings Report (abbreviated)

**Route:** /templates/research-findings-report
Same layout.

Section Preview sections:
1. Header — Study title, researcher, date, confidence rating
2. Executive Summary — Key findings and top recommendations (1 page max)
3. Research Objectives and Methods
4. Participant Overview
5. Findings by Theme — Each finding: description, evidence quotes, severity, confidence tag (High/Medium/Low)
6. Recommendations — Mapped to findings, mapped to design decisions
7. Open Questions and Follow-ups
8. Appendix — Raw notes, recording links, survey data

Related Templates: Research Plan, Affinity Map

---

## PAGE: Template Detail — Participant Screener (abbreviated)

**Route:** /templates/participant-screener
Same layout.

Section Preview sections:
1. Header
2. Study description (what participants will be asked to do)
3. Qualification criteria (must-haves)
4. Disqualifiers
5. Logistics (session length, incentive, platform)
6. Screener questions (with routing logic)
7. Confirmation and scheduling language

Related Templates: Research Plan, Discussion Guide

---

## PAGE: Template Detail — Affinity Map (abbreviated)

**Route:** /templates/affinity-map
Same layout.

Section Preview sections:
1. Header
2. Raw observations capture grid (participant x observation)
3. First-level clusters (similar observations grouped)
4. Second-level themes (clusters grouped by pattern)
5. Theme summaries with supporting evidence quotes
6. Insight statements (actionable, design-decision-mapped)

Related Templates: Research Findings Report, Discussion Guide
