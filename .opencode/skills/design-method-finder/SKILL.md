---
name: design-method-finder
description: Recommend design methods from situation, uncertainty, access, fidelity, and constraints instead of rigid process stage.
---

# Design Method Finder

Use this skill to recommend design methods, research techniques, workshops, prototype formats, and facilitation moves for a concrete design situation.

The job is not to name a generic design phase. The job is to infer what the designer is trying to learn or decide, then recommend the lowest-fidelity method that can answer the real question.

## Use when

- The user asks what method, workshop, research activity, or prototype format to use.
- The user is stuck and asks what to do next.
- The user needs a remote or low-fidelity variant.
- The user asks for participatory design, co-design, paper prototyping, PICTIVE, The Bridge, Bifocal Tools, CARD, or task-object design.

## Input contract

Capture enough context to recommend a method:

- Decision needed
- Main uncertainty
- Artifact maturity
- Participants available
- Access to target users, proxy users, SMEs, or stakeholders
- Time available
- Fidelity constraint
- Remote, async, or in-person constraint
- Risk level
- Desired output artifact

If the request lacks context, ask one question first:

```text
What decision are you trying to make next?
```

If enough context exists, recommend without asking.

## Situation axes

### Main uncertainty

- User need
- Workflow or task structure
- Object model
- Information architecture
- Concept desirability
- Interaction behavior
- Content comprehension
- Service or operational dependency
- Stakeholder alignment
- Accessibility or inclusion risk
- Visual direction
- Production feasibility
- Post-launch performance

### Artifact maturity

- No artifact
- Notes or assumptions
- Journey or flow
- Rough sketch
- Structural wireframe
- Clickable prototype
- Coded prototype
- Live product

### Access level

- Live target users
- Async target users
- Proxy users or SMEs
- Stakeholders only
- No human access
- Analytics, logs, support tickets, or existing data only

### Participation level

- Observe users
- Interview users
- Users critique
- Users arrange or modify artifacts
- Users co-design directly
- Users run or self-document activities

## Recommendation procedure

1. State the situation in one sentence.
2. Identify the main uncertainty.
3. Select one primary method.
4. Add 1-3 complementary or fallback methods only when they cover a specific gap.
5. Explain why the method fits the constraints.
6. Give a runnable session shape.
7. Name outputs and watchouts.
8. Include a fallback if access is worse than expected and an upgrade if better access becomes available.

## Situation index

| Situation | Strong candidates |
|---|---|
| Users need to actively shape the design | PICTIVE, participatory prototyping, co-creation session |
| Team needs to translate field data into design direction | The Bridge method, task-object design, affinity synthesis |
| Current work and future system behavior must be compared | Bifocal Tools, The Bridge method, journey mapping, service blueprint |
| Workflow sequence and handoffs are unclear | CARD, task analysis, service blueprint |
| Object model is unstable | Task-object design, CARD, OOUX-style object inventory |
| Need quick feedback on rough flow | Paper prototype, digital paper prototype, cognitive walkthrough |
| Need remote low-fidelity prototype work | Digital paper prototype, remote participatory prototyping |
| IA labels or categories are uncertain | Card sorting, tree testing |
| No user access this week | Heuristic evaluation, cognitive walkthrough, support-ticket review, analytics review |
| Automation or AI behavior is risky to build | Wizard of Oz prototype, role play, scenario walkthrough |
| Service depends on teams, policy, or operations | Service blueprint, journey mapping, stakeholder workshop |

## Response template

```markdown
# Method Recommendation

## Situation
- Decision needed:
- Main uncertainty:
- Participants/access:
- Constraints:

## Start with
**Method:**
**Why this fits:**
**Use when:**
**Avoid if:**

## How to run it
| Part | Time | Activity | Output |
|---|---:|---|---|

## Materials
-

## Expected outputs
-

## Complements / fallback
| Method | Use it if | What it adds |
|---|---|---|

## Watch out
-

## Next step
-
```

## Constraints

- Recommend methods by situation, not by fixed design phase.
- Prefer one primary method over a long menu.
- Include tradeoffs. Every method has failure modes.
- Adapt methods to time, participant access, fidelity, and risk.
- Keep outputs practical enough for a designer to run the session.
- Do not over-prescribe workshop theater when a smaller method works.
- Do not turn process questions into high-fidelity UI output.
- Warn when polished prototypes may suppress honest feedback or make the design feel already decided.

## Source anchors

Use these only for compact attribution when useful:

- NN/g UX research method taxonomies and paper prototyping guidance.
- IDEO Design Kit method families for human-centered design and co-creation.
- 18F and GOV.UK service-design/user-research method guidance.
- Participatory design work associated with Muller, Greenbaum, Kyng, Ehn, Brandt, Sanders, Stappers, and Dayton.
- Tom Dayton-associated methods and references: The Bridge method, Bifocal Tools, task-object design, and participatory practices in the software lifecycle.

Use `resources/method-records.yaml` as the local seed method catalog.
