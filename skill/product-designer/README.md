# product-designer

Product design structure skill for Pocket Product Designer v2.

Use it for personas, JTBD, CUJ, OOUX, flows, information architecture, PDRs, UXDRs, low-fidelity wireframes, ASCII specimens, and Storybook handoff.

## What changed from `hashi-designer`

`hashi-designer` is now a compatibility name. New work should use `product-designer`.

The skill is no longer the macro-level entry point. Use `designer` first when the right route is unclear.

## Common prompts

```text
Use product-designer to draft a JTBD and CUJ for <feature>.
```

```text
Use product-designer to create an OOUX model for <domain>.
```

```text
Use product-designer to turn this journey into a PDR chain.
```

```text
Use product-designer to make low-fidelity ASCII wireframes for <flow>.
```

```text
Use product-designer to create an app-specific UI reference from this website: <url>
```

The preferred app-neutral path is capture first, then wireframe: use `resources/ui-capture-spec.md` to document routes, page zones, clickable elements, and ASCII page maps from the real product surface. Use `resources/wireframing.md` for first-pass ASCII wireframes when capture is unavailable. The HCP Terraform/TFC reference is optional grounding only when the product surface is Terraform-related.

## Resources

| File | Contents |
|---|---|
| `resources/personas-frameworks.md` | Personas, JTBD, CUJ formats and examples |
| `resources/ooux-methodology.md` | ORCA/object modeling process |
| `resources/wireframing.md` | ASCII wireframe component library |
| `resources/research-synthesis.md` | Research planning, empathy maps, journey maps |
| `resources/interaction-patterns.md` | Navigation, forms, and data display patterns |
| `resources/design-systems.md` | Atomic design, tokens, documentation |
| `resources/hcp-tf-ui-reference.md` | Optional HCP Terraform UI reference integration |
| `resources/ui-capture-spec.md` | Optional live UI capture output format |

## Installation

Use the repo setup script instead of copying files by hand:

```bash
./setup.sh --core
```

To install only this skill into local OpenCode project skills:

```bash
./setup.sh --module product-designer
```
