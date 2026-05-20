# Pocket Product Designer v2 Modules

PPD can be used as a full design-production workspace or as a source repo for individual parts.

Use the smallest module that helps. Add the next module only when the work needs it.

OpenCode is supported, but modules are plain repo files. A different agent can still use the skills and templates if it can read and edit the workspace.

The full workflow is organized around four stages:

```text
Frame -> Map -> Design -> Ship
```

- **Frame**: notes, strategy, personas, JTBDs, CUJs, and problem framing.
- **Map**: current/future journeys, scenarios, flow maps, screen inventory, and contracts.
- **Design**: ideation, ASCII wireframes, wire flows, Storybook wireframes, gray mockups, and showcases.
- **Ship**: approved prototypes, high-fidelity HTML mocks, and developer-ready handoff.

## Module map

| Module | Install command | Source paths | Use when |
|---|---|---|---|
| `designer` | `./setup.sh --module designer` | `skill/designer/`, `.opencode/agents/designer.md` | You want a front door that routes design requests. |
| `product-designer` | `./setup.sh --module product-designer` | `skill/product-designer/`, `.opencode/agents/product-designer.md` | You need personas, JTBD, CUJ, OOUX, flows, PDRs, UXDRs, or wireframes. |
| `design-method-finder` | `./setup.sh --module design-method-finder` | `skill/design-method-finder/`, `.opencode/agents/design-method-finder.md` | You need method, workshop, research, or prototype selection. |
| `hashi-designer` | `./setup.sh --module hashi-designer` | `skill/hashi-designer/`, `.opencode/agents/hashi-designer.md` | You need compatibility for old prompts. |
| `micro` | `./setup.sh --module micro` | `skill/microinteractions-expert/`, `.opencode/agents/microinteractions-expert.md` | You need component-level behavior, states, timing, validation, recovery, or accessibility specs. |
| `qmd` | `./setup.sh --module qmd` | `scripts/qmd-bootstrap.sh`, `scripts/qmd-refresh.sh` | You want local search across workspace docs, skills, templates, examples, and generated output. |
| `hcp-ref` | `./setup.sh --module hcp-ref` | `reference/hcp-tf-ui-for-agents/` | You need optional HCP Terraform/TFC IA/page-zone grounding. |
| `helios` | `./setup.sh --module helios` | `skill/helios-design-system/` | You need HashiCorp design-system reference material. |
| `opencode-plugin` | `./setup.sh --module opencode-plugin` | `.opencode/plugins/sound.js` | You want OpenCode completion sounds. |
| `impeccable` | `./setup.sh --module impeccable` | external install | You want polished visual/UI/frontend craft. Not vendored here. |

## Showcase and mockup modes

The showcase builder has two presentation modes:

- `showcase` - full review page with title, navigation, preamble, annotations, and footer.
- `mockup` - standalone gray HTML mockups with minimal wrapper and configurable frame sizing.

Use `mockup` mode when wireframes need more space than the review page allows or when you want a quick gray HTML artifact without the whole landing page.

Commands:

```bash
just showcase-dev
just showcase-build
```

To run a mockup-mode config, set `VITE_SHOWCASE_CONFIG` to its path under `showcase/showcases/`:

```bash
cd showcase && VITE_SHOWCASE_CONFIG=<project>/mockup.config npm run dev
cd showcase && VITE_SHOWCASE_CONFIG=<project>/mockup.config npm run build
```

Direct npm equivalents are available in `README.md` if `just` is not installed.

Configure sizing in a showcase config:

```ts
export const config: ShowcaseConfig = {
  // ...
  layout: {
    mode: 'mockup',
    contentMaxWidth: 'none',
    contentPadding: 24,
    frame: {
      chrome: true,
      height: 'calc(100vh - 96px)',
      minWidth: 1440,
      overflow: 'auto',
      frameOverflow: 'auto',
    },
  },
}
```

Per-section overrides are available when one wireframe needs different sizing:

```ts
{
  id: 'wide-flow',
  title: 'Wide flow',
  states: { Default: WideFlowWireframe },
  frame: {
    height: 1100,
    contentMinWidth: 1800,
    overflow: 'auto',
  },
}
```

## Recommended bundles

### Routing-only bundle

Use when another repo already has its own design system and templates.

```bash
./setup.sh --module designer
```

Copy only:

```text
skill/designer/
.opencode/agents/designer.md
```

### Product structure bundle

Use when a repo needs design artifacts but not Storybook/showcase.

```bash
./setup.sh --core
```

Copy:

```text
skill/designer/
skill/design-method-finder/
skill/product-designer/
skill/hashi-designer/
skill/commit/
.opencode/agents/
```

### Search-only bundle

Use when a repo only needs QMD indexing.

```bash
./setup.sh --module qmd
```

Copy:

```text
scripts/qmd-bootstrap.sh
scripts/qmd-refresh.sh
```

Then update `qmd-bootstrap.sh` collections for the target repo's folders.

### Interaction behavior bundle

Use when a repo needs implementation-ready state, timing, validation, recovery, and accessibility specs.

```bash
./setup.sh --module micro
```

Copy:

```text
skill/microinteractions-expert/
.opencode/agents/microinteractions-expert.md
```

### Full pipeline bundle

Use when a repo should support transcript-to-showcase production.

```bash
./setup.sh
```

Keep:

```text
templates/
skill/
storybook/
showcase/
scripts/
example/
```

## External skill policy

Do not vendor `impeccable`. It is external and independently maintained.

Use this install path when needed:

```bash
npx skills add pbakaus/impeccable
```

The `designer` skill should route to `impeccable` only when the user asks for polished visual/UI/frontend craft or high-fidelity execution.

## QMD collections

`./scripts/qmd-bootstrap.sh` writes a repo-aware config with these collections. `just qmd-bootstrap` is an optional shortcut.

- `workspace` - root markdown docs such as `README.md`, `AGENTS.md`, `CLAUDE.md`, and this module guide
- `skills` - skill instructions and resources under `skill/`
- `templates` - artifact templates under `templates/`
- `example` - example pipeline artifacts under `example/`
- `meetings` - generated meeting notes under `output/01.meetings/`
- `strategy` - generated strategy/journey artifacts under `output/02.strategy/`
- `pdr` - generated PDRs under `output/03.pdrs/`
- `wireframes` - generated wireframe notes under `output/04.wireframes/`

This makes the repo useful even before any new output exists: agents can search the template itself, not just generated project artifacts.

## Notes ingest

The default notes workflow is agent-led:

```text
notes ingest
```

Paste a transcript, notes, or project brief. The agent should write the first structured artifact to `output/01.meetings/` and keep the pasted source in the file.

`notesctl` can be added later for batch promotion if your environment already has it. It is not required for first-time use.

## Retrieval scope

- QMD is the bundled local search path.

## App-specific UI capture and ASCII references

The HCP Terraform/TFC reference is optional and Terraform-specific. For any other product, create an app-specific UI reference from the actual product surface when possible:

```text
Use product-designer to create an app-specific UI reference from this website: <url>
```

Useful inputs are a URL, screenshots, a workflow, existing IA, or rough notes. The preferred output follows `skill/product-designer/resources/ui-capture-spec.md`: route docs, ASCII page maps, zone definitions, clickable-element maps, and notes about observed states.

If live capture is unavailable, use `skill/product-designer/resources/wireframing.md` to create first-pass ASCII wireframes with labeled assumptions. The output should be specific to that app, not adapted from the Terraform reference unless the user asks for Terraform placement grounding.
