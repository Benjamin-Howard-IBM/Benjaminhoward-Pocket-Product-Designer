## PAGE GROUP: Research Guidance

This page group covers the Methodology Overview (S8) and three fully fleshed Method Detail pages (S9): User Interviews, Moderated Usability Testing, and Surveys. All content is sourced verbatim from `skill/research/resources/research-methodologies.md`.

---

## PAGE: Research Guidance - Methodology Overview

**Route:** /research-guidance
**Carbon UI Shell:** Header visible. SideNav visible. Top nav "Research Guidance" highlighted.

### SideNav Items

Carbon SideNav, White bg, 256px wide, right border Gray-20:
- Section label: "Research Guidance" — 12px SemiBold Gray-70 uppercase
- SideNavItem: "Overview" (active)
- SideNavItem: "Discovery & Generative"
- SideNavItem: "Structure & IA"
- SideNavItem: "Evaluative"
- SideNavItem: "Quantitative & Behavioral"
- SideNavItem: "Triangulation"
- SideNavItem: "Method Cheat Sheet"

### Zone 1: Page Header

Breadcrumb: "Home" / "Research Guidance" (current)

H2: "Research Methodologies" — 28px SemiBold Gray-100

Body (2 sentences): "A working catalog of research methods organized so you can pick the lowest-effort method that answers the real question. Each method lists what it is, when to use it, pros, cons, tradeoffs, typical effort, and the output it produces." — 16px Gray-70

---

### Zone 2: Method Selection Axes Diagram

White Tile, 1px Gray-20 border, 24px padding, margin-bottom 32px.

Label: "HOW TO CHOOSE A METHOD" — 11px SemiBold Gray-70 uppercase

Body text: "Two axes from the NN/g method taxonomy help position any method:" — 14px Gray-70

Two-column list (col-span 6 each) inside the tile:
- Left: "Attitudinal vs. Behavioral: what people say vs. what people do."
- Right: "Qualitative vs. Quantitative: why and how to fix (direct observation) vs. how many and how much (indirect measurement)."

A 2x2 grid diagram rendered as a simple CSS table or SVG inside the tile:
- Rows: Attitudinal (top) / Behavioral (bottom)
- Columns: Qualitative (left) / Quantitative (right)
- Cell contents in 13px Gray-70:
  - Attitudinal / Qualitative: "interviews, focus groups, concept tests"
  - Attitudinal / Quantitative: "surveys, desirability scales, card sorting (quant)"
  - Behavioral / Qualitative: "usability testing (moderated), field studies, diary studies"
  - Behavioral / Quantitative: "analytics, A/B testing, unmoderated benchmark testing, tree testing, clickstream"

Below the grid, 5 selection rules as Carbon UnorderedList, 14px Gray-100:
- Match the method to the decision and the main uncertainty, not to a process phase.
- Triangulate: combine at least one attitudinal and one behavioral method to offset blind spots.
- Prefer behavioral evidence over self-report when the two disagree.
- Use qualitative methods to learn what to fix and why; use quantitative methods to size a problem or prove a change.
- Smaller, more frequent studies usually beat one large study.

---

### Zone 3: Method Category Cards

Section heading: "Browse by Category" — 20px SemiBold Gray-100, 32px margin-top

6 Carbon ClickableTile cards in a 3-column grid (col-span 5 each, with col-span 16 fallback small):
White bg, 1px Gray-20 border, 24px padding, 8px border-radius. Hover: Gray-10 bg, Blue-60 3px left border.

**Card 1 — Discovery & Generative:**
- Icon: Carbon "Search" icon 24px Blue-60
- Title: "Discovery & Generative" 18px SemiBold Gray-100
- Description: "Learn goals, context, mental models, and pain points. Methods: User Interviews, Contextual Inquiry, Diary Studies, Focus Groups, Surveys." 14px Gray-70
- Click → scrolls to / anchors to Discovery section on this page or S9: User Interviews

**Card 2 — Structure & IA:**
- Icon: Carbon "TreeView" icon 24px Blue-60
- Title: "Structure & IA"
- Description: "Design and validate information architecture, navigation, taxonomy, and labeling. Methods: Card Sorting, Tree Testing." 14px Gray-70

**Card 3 — Evaluative:**
- Icon: Carbon "Task" icon 24px Blue-60
- Title: "Evaluative"
- Description: "Diagnose whether users can complete real tasks and why designs fail. Methods: Moderated Usability Testing, Unmoderated Usability Testing, Heuristic Evaluation, Cognitive Walkthrough." 14px Gray-70
- Click → S9: Moderated Usability Testing

**Card 4 — Quantitative & Behavioral:**
- Icon: Carbon "Analytics" icon 24px Blue-60
- Title: "Quantitative & Behavioral"
- Description: "Size problems, prove changes, and measure real behavior at scale. Methods: Analytics Review, A/B Testing, Benchmarking." 14px Gray-70

**Card 5 — Triangulation:**
- Icon: Carbon "DataVis_2" icon 24px Blue-60
- Title: "Triangulation & Mixed Methods"
- Description: "Combine methods to offset individual blind spots and raise confidence in high-stakes decisions." 14px Gray-70

**Card 6 — Method Cheat Sheet:**
- Icon: Carbon "Table" icon 24px Blue-60
- Title: "Method Cheat Sheet"
- Description: "Quick-reference table: match your research need to the right method in seconds." 14px Gray-70
- Click → scrolls to Zone 4 below

---

### Zone 4: Method Cheat Sheet Table

Section heading: "Quick Selection Cheat Sheet" — 20px SemiBold Gray-100, 40px margin-top
Sub-heading: "Match your research question to the right method." — 14px Gray-70

Carbon DataTable (no selection, with dividers). Columns: "If you need to..." | "Strong candidates" | "Avoid relying on"

10 data rows (verbatim from source file):
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

---

### Zone 5: Effort vs. Confidence Guide

White Tile, 1px Gray-20 border, 24px padding, 3-column layout inside:

**Column 1 — Fast and lower certainty:**
- Carbon Tag (Green) "Low Effort"
- List: heuristic eval, cognitive walkthrough, unmoderated tests, surveys, analytics review

**Column 2 — Medium:**
- Carbon Tag (Teal) "Medium Effort"
- List: moderated usability testing, interviews, card sorting, tree testing, benchmarking

**Column 3 — Slow and higher certainty:**
- Carbon Tag (Purple) "High Effort"
- List: contextual inquiry, diary studies, A/B testing at scale, full triangulation

---

## PAGE: Method Detail — User Interviews

**Route:** /research-guidance/user-interviews
**Carbon UI Shell:** Header. SideNav: "Discovery & Generative" active.

### Zone 1: Breadcrumb + Header

Breadcrumb: "Home" / "Research Guidance" / "User Interviews"

H2: "User Interviews" — 28px SemiBold Gray-100

Tag row:
- Carbon Tag (Gray): "Discovery & Generative"
- Carbon Tag (Green): "Low-Medium Effort"
- Carbon Tag (Blue): "Qualitative"
- Carbon Tag (Teal): "Attitudinal"

Carbon Button (ghost) top-right: "← Back to Overview" → Methodology Overview

---

### Zone 2: What It Is + When to Use (White Tile, 24px padding, col-span 8)

Label: "WHAT IT IS" — 11px SemiBold Gray-70 uppercase
Body: "One-on-one, semi-structured conversation to learn goals, context, mental models, pain points, and language." — 15px Gray-100, line-height 1.6

Label: "WHEN TO USE" — same label style, 24px margin-top
Carbon UnorderedList, 14px Gray-100:
- Early discovery; when you need the "why" behind behavior
- To build personas, JTBD, and journey inputs
- When you need the user's vocabulary for a new problem space

---

### Zone 3: Details Accordion (col-span 8)

Carbon Accordion, 4 items, all closed by default:

**Item 1 — Pros:**
Carbon UnorderedList, 14px Gray-100:
- Rich depth and nuance; flexible follow-up
- Fast to start; builds empathy and stakeholder buy-in
- Surfaces vocabulary users actually use

**Item 2 — Cons:**
Carbon UnorderedList, 14px Gray-100:
- Self-reported: people misremember and rationalize
- Small samples; interviewer and recall bias
- Not generalizable; time-intensive to analyze

**Item 3 — Tradeoffs:**
Body text 14px Gray-100: "Depth over breadth; what people say over what they do. Pair with observation or analytics to confirm behavioral claims."

**Item 4 — Typical Output:**
Carbon UnorderedList, 14px Gray-100:
- Themes, quotes, needs, and mental models
- Hypotheses to test with behavioral methods
- Vocabulary and language inputs for IA and content design

---

### Zone 4: Sidebar (col-span 4, right)

White Tile, 1px Gray-20 border, 24px padding.

Label: "EFFORT" — 11px SemiBold Gray-70 uppercase
Carbon Tag (Green): "Low-Medium"
Body: "Low-medium setup; medium analysis (transcription, coding)." 13px Gray-70

Label: "RELATED TEMPLATES" — same label style, 24px margin-top
Carbon StructuredList (borderless):
- "Discussion Guide" → Template Detail: Discussion Guide
- "Research Plan" → Template Detail: Research Plan
- "Research Findings Report" → Template Detail: Research Findings Report

Label: "RELATED METHODS" — same label style, 24px margin-top
Carbon Tag (clickable, Gray): "Contextual Inquiry"
Carbon Tag (clickable, Gray): "Surveys"
Carbon Tag (clickable, Gray): "Diary Studies"

---

### Zone 5: Common Pitfalls (col-span 8, below main)

White Tile, 1px Gray-20 border, 24px padding.
Label: "COMMON PITFALLS" — 11px SemiBold Gray-70 uppercase
Carbon UnorderedList, 14px Gray-100:
- Choosing this method for behavior questions (it answers attitude questions)
- Running too few sessions and over-generalizing findings
- Skipping a pilot; not accounting for moderator bias
- Treating self-reported behavior as ground truth without behavioral corroboration

---

## PAGE: Method Detail — Moderated Usability Testing

**Route:** /research-guidance/moderated-usability-testing
**Carbon UI Shell:** Header. SideNav: "Evaluative" active.

### Zone 1: Breadcrumb + Header

Breadcrumb: "Home" / "Research Guidance" / "Moderated Usability Testing"

H2: "Moderated Usability Testing" — 28px SemiBold Gray-100

Tag row:
- Carbon Tag (Gray): "Evaluative"
- Carbon Tag (Teal): "Medium Effort"
- Carbon Tag (Blue): "Qualitative"
- Carbon Tag (Purple): "Behavioral"

Carbon Button (ghost) top-right: "← Back to Overview"

---

### Zone 2: What It Is + When to Use

Label: "WHAT IT IS"
Body: "A facilitator gives tasks and observes one participant at a time (in person or remote), probing think-aloud. Works at any fidelity from paper to live product."

Label: "WHEN TO USE"
Carbon UnorderedList:
- Evaluating whether people can complete real tasks
- Diagnosing why a design fails; getting the "why" behind failures
- Any fidelity from paper prototype to live product
- Any stage after you have something to show a participant

---

### Zone 3: Details Accordion

**Pros:**
- Finds the majority of severe issues with about 5 users per segment
- Explains the "why" behind failures; flexible probing
- Works at any design fidelity

**Cons:**
- Small samples are not quantitatively projectable
- Facilitator bias is a real risk without trained moderation
- Lab use is somewhat artificial; scheduling overhead

**Tradeoffs:**
"Diagnostic depth over statistical proof. Qualitative findings are not generalizable. Pair with unmoderated testing or analytics to scale validation."

**Typical Output:**
- Prioritized usability issues with severity ratings (Critical, Major, Minor)
- Observed behaviors and failure patterns
- Direct quotes and moments of confusion for stakeholder presentations
- Specific fix recommendations mapped to task failures

---

### Zone 4: Sidebar

Effort tag: Carbon Tag (Teal) "Medium"
Effort body: "Medium effort: facilitation requires trained moderation; analysis requires session review and synthesis."

Related Templates:
- Usability Test Script
- Research Findings Report
- Research Plan

Related Methods:
- Carbon Tag: "Unmoderated Usability Testing"
- Carbon Tag: "Heuristic Evaluation"
- Carbon Tag: "Analytics Review"

---

### Zone 5: Common Pitfalls

Carbon UnorderedList:
- Running more than 5 participants per segment before synthesizing — diminishing returns above 5 for qualitative issues
- Asking leading questions or helping participants during tasks
- Testing too many tasks in one session (max 5–6 core tasks in 60 min)
- Not piloting the script; task wording often breaks in the first real session

---

## PAGE: Method Detail — Surveys

**Route:** /research-guidance/surveys
**Carbon UI Shell:** Header. SideNav: "Discovery & Generative" active.

### Zone 1: Breadcrumb + Header

Breadcrumb: "Home" / "Research Guidance" / "Surveys"

H2: "Surveys" — 28px SemiBold Gray-100

Tag row:
- Carbon Tag (Gray): "Discovery & Generative"
- Carbon Tag (Green): "Low-Medium Effort"
- Carbon Tag (Blue): "Quantitative"
- Carbon Tag (Teal): "Attitudinal"

Carbon Button (ghost) top-right: "← Back to Overview"

---

### Zone 2: What It Is + When to Use

Label: "WHAT IT IS"
Body: "A structured questionnaire distributed to many respondents. Can be attitudinal (satisfaction, opinions) or descriptive (demographics, frequency of behavior)."

Label: "WHEN TO USE"
Carbon UnorderedList:
- When you need scale to quantify attitudes or segment sizes
- To validate qualitative findings at volume
- For tracking satisfaction or NPS over time
- When you need demographic or frequency data across a large population

---

### Zone 3: Details Accordion

**Pros:**
- Cheap at scale; statistically projectable with good sampling
- Fast to field; good for tracking over time
- Reaches participants you cannot recruit for sessions

**Cons:**
- Self-reported; question wording bias is a serious risk
- No follow-up; cannot probe unexpected answers
- Low response rates and non-response bias
- Poor at answering "why" — explains what and how many, not the reason

**Tradeoffs:**
"Breadth over depth. Precision depends entirely on sampling quality and question design. Do not use to replace qualitative research; use to size what qualitative finds."

**Typical Output:**
- Distributions, segment sizes
- Satisfaction/NPS scores
- Trend data across time periods
- Quantified validation of qualitative hypotheses

---

### Zone 4: Sidebar

Effort tag: Carbon Tag (Green) "Low-Medium"
Effort body: "Medium design effort for good question writing; low-medium fielding effort once the instrument is built."

Related Templates:
- Research Plan
- Research Findings Report
- Participant Screener

Related Methods:
- Carbon Tag: "User Interviews"
- Carbon Tag: "Analytics Review"
- Carbon Tag: "Benchmarking"

---

### Zone 5: Common Pitfalls

Carbon UnorderedList:
- Leading or double-barreled questions that bias responses
- Asking about behavior rather than measuring it (self-report is unreliable for behavior)
- Distributing to a convenience sample and treating results as representative
- Running one survey instead of pairing with a qualitative method to explain the numbers
- Measuring vanity metrics instead of decision-relevant outcomes
