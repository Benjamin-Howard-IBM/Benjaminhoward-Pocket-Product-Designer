# Sample Research Plan (Generic Template)

A reusable, end-to-end research plan template. Replace the bracketed placeholders. The worked example uses a fictional product to show the level of detail expected in each section. Keep it decision-grade: every objective should map to a decision someone will make.

---

## Header

| Field | Value |
|---|---|
| Title | [Research Plan] {Project}: {Focus} |
| Summary | One sentence on what this study will produce and decide. |
| Created / Last updated | {date} / {date} |
| Status | WIP / In-Review / Approved / Obsolete |
| Product | {product} |
| Owner | {name, role} |
| Contributors | {names, roles} |

---

## 1. Problem

State the decision problem in 2-4 sentences: what is unknown, why it matters now, and the risk of deciding without evidence.

> Example: We plan to launch self-serve onboarding for {Product}, but we do not know where first-time users stall or why activation is low. Without validated evidence on the drop-off points and their causes, we risk redesigning the wrong steps and missing the activation target.

## 2. Research objective

One sentence describing the decision-grade evidence this study will generate and the methods used to triangulate it.

> Example: This study will generate decision-grade evidence on where and why new users fail to activate, by triangulating funnel analytics, 6-8 moderated usability sessions, and an onboarding survey into confidence-scored recommendations.

### Key research objectives
- [Objective 1: quantify ...]
- [Objective 2: identify ...]
- [Objective 3: validate or reject ...]
- [Objective 4: surface risks/dependencies ...]
- [Objective 5: produce a recommendation set for decision-makers ...]

## 3. Decision scope

List the specific decisions this research must inform. Each should be something a stakeholder will sign off on.

- D1: [decision the findings will drive]
- D2: [decision]
- D3: [decision]
- D4: [decision]
- D5: [launch blockers vs. backlog]

## 4. Research methodology

State the mixed-method approach and justify the combination. For each method include participants, platform, duration, and expected output. (See `research-methodologies.md` for pros/cons/tradeoffs.)

| Method | Why this method | Participants (N) | Platform | Duration | Expected output |
|---|---|---|---|---|---|
| Analytics review | Size and locate drop-off objectively | full traffic | {tool} | n/a | Funnel + drop-off baseline |
| Moderated usability testing | Diagnose why users stall | 6-8 per segment | {tool} | 45 min | Prioritized issue list + severity |
| Survey | Quantify attitudes and segment | 200+ | {tool} | n/a | Satisfaction, intent, segment sizes |

Triangulation note: state how the methods cross-check each other (e.g., analytics locates the where, usability explains the why, survey sizes the attitude). Assign a confidence tag per finding.

## 5. Key research questions
- [What are realistic ranges / rates for ...?]
- [How do patterns differ by segment ...?]
- [Which behaviors most strongly drive {outcome}?]
- [Which thresholds trigger {customer-impacting event}?]
- [What confidence can be assigned to each input?]

## 6. Hypotheses to test
- H1: [testable statement the data can confirm or reject]
- H2: [...]
- H3: [...]
- H4: [...]

## 7. Screening criteria

Define who qualifies. Include must-haves and disqualifiers.

- [Role / segment requirement]
- [Experience or exposure requirement, e.g., used the product in last 30 days]
- [Ability to speak to the relevant tasks/metrics]
- Disqualifiers: [employees of competitors, prior session participants, etc.]

## 8. Recruiting and logistics
- Source: [panel, customer list, internal SE/SA, etc.]
- Incentive: [amount / type]
- Sessions: [count, schedule window]
- Roles: moderator, notetaker, observer(s)
- Consent and data handling: [recording consent, PII handling, storage location]

## 9. Outputs and deliverables
- [Synthesis of findings mapped to D1-D5]
- [Prioritized issue/opportunity list with severity and confidence]
- [Segment or archetype model, if applicable]
- [Recommendation matrix for decision-makers]
- [Readout deck + raw evidence appendix]
- [Measurement/backlog follow-ups]

## 10. Timeline (illustrative)

| Phase | Activity | Duration |
|---|---|---|
| Week 1 | Finalize plan, recruit, instrument analytics | 1 week |
| Week 2 | Run sessions + field survey | 1 week |
| Week 3 | Synthesis + triangulation | 1 week |
| Week 4 | Readout + recommendations | 0.5 week |

## 11. Risks and assumptions
- [Access/recruiting risk and mitigation]
- [Confounds: campaigns, seasonality, instrumentation gaps]
- [Labeled assumptions where evidence is incomplete]

---

### Notes on using this template
- Keep every objective tied to a decision in section 3. If an objective maps to no decision, cut it.
- Label assumptions explicitly when data is missing rather than presenting them as findings.
- Attach a confidence level (e.g., high/medium/low) to each recommendation in the readout.
- Prefer the lowest-effort method mix that answers the decision; do not over-scope.
