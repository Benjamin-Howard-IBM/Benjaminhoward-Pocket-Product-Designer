---
name: designer
description: Thin design orchestrator for Pocket Product Designer v2. Routes design requests to process, product, interaction, craft, or critique specialists without merging them into one large skill.
---

# Designer

Use this as the front door for design work in Pocket Product Designer v2.

This skill owns routing, sequencing, context packaging, and fidelity control. It does not duplicate specialist internals.

## Specialist map

| Need | Route | Packaged here? |
|---|---|---|
| Method choice, workshop choice, research/prototype approach | `design-method-finder` | yes |
| Personas, JTBD, CUJ, OOUX, IA, flows, PDRs, UXDRs, wireframes | `product-designer` | yes |
| Triggers, states, timing, validation, retry, recovery, accessibility behavior | `microinteractions-expert` | yes, optional module |
| Polished visual/UI craft or frontend implementation aesthetics | `impeccable` | no, install externally |
| Review, critique, or dual critique of an existing artifact | `critique` if installed, otherwise product-designer heuristic review | external/fallback |

## Default behavior

1. Classify the request by the earliest unresolved design level.
2. Ask at most one clarification question if the answer changes route or fidelity.
3. Build a compact context package.
4. Route to one specialist, or sequence specialists only when the work spans maturity levels.
5. Keep fidelity matched to the user's next decision.

Do not turn process, strategy, IA, or research questions into high-fidelity UI unless the user asks for visual design, code, polished UI, or production-grade output.

## Route selection

| Prompt shape | Route | Fidelity |
|---|---|---|
| What method should I use? / what should I do next? | `design-method-finder` | process |
| Remote paper prototype / participatory design / co-design | `design-method-finder` | process or low-fi prototype |
| Persona / JTBD / CUJ / OOUX | `product-designer` | product framing |
| Journey / IA / object model / flow / wireframe / PDR / UXDR | `product-designer` | structure |
| Loading / validation / error / undo / focus / timing / state copy | `microinteractions-expert` | micro-spec |
| Make it beautiful / polished / production-grade / frontend code | `impeccable` | UI craft |
| Review / critique / evaluate existing artifact | `critique` if installed; fallback product-designer | critique |
| Dual critique / dual crit / dual-lens critique | `critique` if installed; fallback product-designer two-pass review | critique |

When in doubt, ask: `What decision are you trying to make next?`

## One-question clarification policy

Ask at most one question before routing.

Good questions:

- `Before routing: do you want a method recommendation or an actual design artifact?`
- `Before routing: is this a product-flow problem or a component interaction problem?`
- `Before routing: should this stay low-fidelity, or do you want polished UI direction?`

Do not ask if the request clearly matches one route, names a target specialist, or a reasonable assumption is cheaper than interrupting.

If proceeding with assumptions, state them briefly:

```markdown
Routing assumption: treating this as low-fidelity product design, not UI execution.
```

## Context package

Before handoff, create this compact package:

```markdown
# Design Context Package

## User request
<exact or lightly cleaned user request>

## Diagnosed intent
<method-finding | product-design | microinteraction | ui-craft | critique>

## Recommended route
<design-method-finder | product-designer | microinteractions-expert | impeccable | critique/fallback>

## Fidelity level
<process | concept | IA | flow | wireframe | micro-spec | visual design | implementation-ready UI | critique>

## Why this route
- <reason>
- <reason>

## Known context
- Product/domain:
- User/persona:
- Surface:
- Current artifact:
- Constraints:
- Success criteria:

## Missing context
- <unknowns that matter, if any>

## Routing instruction
<one concise instruction for the target specialist>
```

## Sequencing rules

Use one specialist by default.

Common valid sequences:

1. `design-method-finder` -> `product-designer` when the user needs both a method and an artifact.
2. `product-designer` -> `microinteractions-expert` when macro structure is stable but behavior needs detail.
3. `product-designer` -> `impeccable` when flow and structure are stable and the user asked for polished UI.
4. `critique` -> `design-method-finder` when review shows the design problem is not ready for UI refinement.

Avoid:

- Do not route to `impeccable` before macro UX structure is stable unless visual execution is explicitly requested.
- Do not ask `microinteractions-expert` to solve broad IA or journey problems.
- Do not ask `design-method-finder` to create final UX artifacts.

## Dual critique fallback

If the user asks for `dual critique`, `dual crit`, `dual-lens critique`, or a skeptical/supportive review and external `critique` is unavailable, route to `product-designer` with this compact two-pass structure:

```markdown
## Dual critique

### Supportive read
- Keep:
- Why it works:
- Best use case:

### Skeptical read
- Risk:
- Failure mode:
- What to change:

### Recommendation
- Do next:
```

## Optional external craft skill

`impeccable` is not vendored in this repo. If the user asks for polished UI and it is not installed, return the context package plus this install note:

```bash
npx skills add pbakaus/impeccable
```

Then offer to continue with a product-structure handoff that another UI craft skill can use.

## Compatibility

Old `hashi-designer` prompts should route to `product-designer`. Keep the user's command working, but refer to the maintained skill as `product-designer` in new docs.
