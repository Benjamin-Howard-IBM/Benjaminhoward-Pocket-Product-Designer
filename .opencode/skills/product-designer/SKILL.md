---
name: product-designer
description: Product design specialist for personas, JTBD, CUJ, OOUX, flows, PDRs, UXDRs, wireframes, ASCII specimens, and Storybook handoff.
---

# Product Designer

Use this skill for product design structure.

This skill replaces the older `hashi-designer` name. The capability is product design: personas, jobs, critical journeys, object models, product flows, wireframes, PDRs, UXDRs, and implementation handoff. HashiCorp-specific material is retained as optional domain context, not the skill identity.

Use when the user asks for:

- Personas
- JTBD
- CUJ
- Journey maps
- OOUX or task-object modeling
- Information architecture
- Product flows
- Low-fidelity wireframes
- ASCII mocks or specimen sheets
- PDRs or UXDRs
- Storybook wireframe handoff
- HCP Terraform UI placement or IA grounding

Do not use this skill for pure visual craft. Route polished UI and frontend aesthetic work to `impeccable` when installed. Route component-level states, timing, validation, and recovery to `microinteractions-expert`. Route method selection to `design-method-finder`.

## Context contract

Capture these before creating product design artifacts:

- Target persona or assumed user
- User job or task
- Product/domain context
- Scope boundary, including what is out of scope
- Current artifact maturity
- Quality gate for acceptance

If these are missing and the user did not ask to skip questions, ask one or two focused questions. If speed matters, proceed with explicit assumptions and record them.

## Artifact modes

### Personas

Use `resources/personas-frameworks.md`.

Required sections:

- Quote
- Context
- Goals
- Pain points
- Behaviors / mental model
- Design implications

### JTBD

Use this format:

```text
When [circumstance],
I want to [goal],
so that [outcome].
```

### CUJ

Required sections:

- Persona
- Trigger
- Steps
- Success criteria
- Failure modes

### OOUX / task-object model

Use when the product has complex nouns, resources, states, permissions, or relationships.

Map:

```text
Object -> relationships -> actions/CTAs -> attributes -> states -> screen implications
```

Use `resources/ooux-methodology.md` for deeper ORCA guidance.

### Product flow

Produce:

- Entry point
- User goal
- Numbered steps
- Decision points
- Error/recovery paths
- Completion criteria
- Open questions

### PDR

Use `templates/pdr.template.md` for the repo pipeline or `resources/research-synthesis.md` for evidence framing.

Minimum structure:

- Problem statement
- User evidence or labeled assumptions
- Persona/JTBD mapping
- Options considered
- Decision with tradeoffs
- Risks and mitigations
- Acceptance and rollout criteria

### UXDR

Use for focused design decisions.

```markdown
# UXDR: <Decision>

## Context
## Decision
## Alternatives considered
## Consequences
## Follow-up
```

### Wireframe spec

Use structural fidelity unless the user explicitly asks for polish.

Required sections:

- Purpose
- Target persona
- JTBD or CUJ reference
- Layout zones
- States
- Transitions
- Status language
- Test IDs when handing to implementation

Use `resources/wireframing.md` for ASCII component patterns.

### ASCII specimen mode

Use when the user asks for ASCII mocks, plain-text wireframes, or state specimen sheets.

This mode works for any app. Do not require HCP/TFC context unless the user is designing HCP Terraform. For another product, prefer observed UI grounding: use `resources/ui-capture-spec.md` with browser capture or screenshots to document routes, zones, clickable elements, and ASCII page maps. If capture is unavailable, infer or ask for the app type, primary user, core task, and screen set, then create app-specific ASCII specimens from `resources/wireframing.md` with labeled assumptions.

Defaults:

1. Plain text first.
2. No card chrome or bordered containers unless explicitly requested.
3. One heading plus one monospace specimen per state.
4. Preserve exact source copy before adapting it.

### Storybook handoff mode

Use when the output is intended for Storybook or implementation.

Include:

- Story title and scenario name
- State fixtures
- Deterministic status labels
- Documented transitions
- `data-testid` markers for critical actions
- Traceability to acceptance criteria

## Optional domain/reference modes

### HCP Terraform UI reference

Use `reference/hcp-tf-ui-for-agents/` when the work needs HCP Terraform IA, page-zone, or placement grounding.

This is optional Terraform-specific grounding, not the default structure for unrelated products. For another app, create or request an app-specific UI capture reference instead of borrowing HCP/TFC navigation.

Recommended load order:

1. `reference/hcp-tf-ui-for-agents/quick-reference.md`
2. `reference/hcp-tf-ui-for-agents/pages/_index.md`
3. Relevant `reference/hcp-tf-ui-for-agents/pages/*.md`

If missing, tell the user to run:

```bash
./setup.sh --module hcp-ref
```

### UI capture add-on

Use `resources/ui-capture-spec.md` when the user asks for live-page capture. This requires a separate browser automation skill such as `dev-browser`; do not auto-start browser automation.

## Quality gates

Before declaring an artifact complete, check:

1. Traceability: each major UI decision maps to a persona pain point, JTBD, CUJ, evidence source, or explicit assumption.
2. Handoff readiness: implementation team can build from the artifact without inventing missing logic.
3. Fidelity fit: the artifact does not look more final than the decision it is meant to support.
4. Scope: out-of-scope items and open questions are explicit.

## Writing constraints

- Be concise and implementation-oriented.
- Avoid marketing language.
- Mark assumptions.
- Preserve exact source terms when adapting product docs.
- Use plain tables and headings for handoff artifacts.

## Compatibility

If the user says `hashi-designer`, treat it as `product-designer` unless they specifically need legacy HashiCorp-only context.
