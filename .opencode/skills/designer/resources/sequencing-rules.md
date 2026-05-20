# Designer Sequencing Rules

Use one specialist by default. Sequence only when the request spans design maturity levels.

## Method -> product structure

Use when the user asks what to do next and also wants an artifact afterward.

1. `design-method-finder` chooses the method and validation approach.
2. `product-designer` creates the flow, object model, wireframe, PDR, or UXDR.

## Product structure -> micro behavior

Use when macro UX is mostly stable but component behavior is under-specified.

1. `product-designer` stabilizes the flow, IA, or wireframe.
2. `microinteractions-expert` specifies triggers, states, timing, recovery, and accessibility behavior.

## Product structure -> visual craft

Use when flow and structure are stable enough to make visual decisions.

1. `product-designer` stabilizes product structure.
2. `impeccable` handles polished UI craft or frontend implementation aesthetics.

## Critique -> method

Use when review reveals that the design problem is not ready for UI refinement.

1. `critique` identifies issues and risks.
2. `design-method-finder` recommends the next validation or co-design method.

## Avoid

- Do not route to `impeccable` before macro UX structure is stable unless the user explicitly requests visual execution.
- Do not ask `microinteractions-expert` to solve broad IA or journey problems.
- Do not ask `design-method-finder` to create final UX artifacts.
