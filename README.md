# Pocket Product Designer v2

Pocket Product Designer is an agent-first design workspace that moves raw product context to code-ready design artifacts through four stages: **Frame**, **Map**, **Design**, and **Ship**. It can run the full process from transcript to reviewable showcase, or you can pull in only the parts you need: skills, templates, QMD search, Storybook wireframes, reference docs, or OpenCode settings.

Designer-facing process:

```text
Frame -> Map -> Design -> Ship
```

Artifact pipeline underneath it:

```text
Transcript -> Meeting Notes -> Strategy -> Journey Map -> PDR Chain -> Wireframe Stories -> Showcase HTML
```

| Stage | Goal | PPD artifacts |
|---|---|---|
| **Frame** | Define the problem, user needs, and product intent. | Notes ingest, meeting notes, strategy, personas, JTBDs, CUJs, problem statement |
| **Map** | Define how users move through the current and future experience. | Current journey, future journey, scenarios, flow maps, screen inventory, data contracts |
| **Design** | Turn mapped concepts into low-fidelity visual execution. | Ideation, ASCII wireframes, wire flows, Storybook wireframes, gray mockups, wireframe showcases |
| **Ship** | Convert approved designs into implementation-ready assets. | Design-system-backed prototypes, high-fidelity HTML mocks, developer handoff docs |

# ->> 🌴😎 Easy Designer Install 😎🌴 <<-
1. Copy the URL Repo or Download this Repo
2. Open VSCode or coding tool of choice
3. Open up LLM, point it at this repo and ask to get setup.
4. Once completed setup ask it how to use it or if you want to use a template or getting started guide.
5. DONE Enjoy Your Agentic Design Kit

Reference mural: [Agentic Design Process](https://app.mural.co/t/hashicorpproductexperience7582/m/hashicorpproductexperience7582/1777398713052/0b3dc382c730992bed2078b303aa121ce6c25a4f) explains the four-stage story and how the process flows from framing to shipping.

## Features

- Four-stage design workflow: **Frame -> Map -> Design -> Ship**.
- Chat-first `notes ingest` for transcripts, meeting notes, interview notes, and project briefs.
- Modular skills: `designer`, `product-designer`, `design-method-finder`, optional `microinteractions-expert`, and compatibility `hashi-designer`.
- Dual critique mode for fast supportive + skeptical review of a design artifact.
- App-specific UI capture flow for turning websites/screenshots into ASCII page maps, zones, routes, and clickable-element docs.
- Optional HCP Terraform/TFC reference docs for Terraform-specific IA and placement grounding.
- Storybook wireframe handoff plus single-file showcase builds.
- Standalone gray mockup mode for quick review artifacts without the full showcase page.
- Agent-neutral instructions in `AGENTS.md`; OpenCode is supported but not required.

## Pro tips

### Use dual critique to raise the quality bar

Use `dual critique` to run an adversarial design analysis. It gives you both a supportive read and a skeptical read, which helps the agent preserve what is working while finding gaps, weak assumptions, and unclear interactions.

A strong iteration loop:

1. Ask the agent to make the desired design changes.
2. Have it visually check its work with Playwright or another browser tool if available.
3. Run one or more dual critiques.
4. Ask the agent to integrate its own feedback before handing the result back for human review.

Prompt:

```text
Run a dual critique on this design, then integrate the highest-impact fixes before handing it back to me.
```

### Use methodology analysis for structured iteration

Ask the design agent to run a design-methodologies analysis when you want to pressure-test requirements, gaps, personas, or definitions. You can use the recommendation yourself in a real workshop, or ask the agent to role-play personas and run a lightweight workshop-style analysis on its own work.

Prompt:

```text
Run a design methodologies analysis on this concept. Identify which method would best expose gaps, then use that method to improve the product requirements for the next iteration.
```

Agent role-play can help generate ideas and expose weak spots, but it is not a replacement for real research, real users, or an actual workshop.

## Requirements by use case

Minimum:

- A bash-compatible shell for `./setup.sh`.
- Any LLM/coding agent that can read and edit files.

Recommended:

- A repo-aware agent such as OpenCode, Claude Code, Cursor, Copilot agent, or similar. OpenCode is supported, but PPD does not require it.

Only needed for specific features:

- Node/npm: Storybook, showcase, mockup builds, and `npx` installs.
- git: optional HCP Terraform/TFC UI reference sync.
- qmd: optional local search.
- Browser automation: live website UI capture.
- just: shortcut commands only. Direct shell/npm commands are documented.

If a tool is missing, ask your agent to check what is installed and tell you the smallest command needed for the path you chose.

## Quick start

Install everything:

```bash
./setup.sh
```

Install only the core design skills:

```bash
./setup.sh --core
```

Install one useful part:

```bash
./setup.sh --module qmd
./setup.sh --module product-designer
./setup.sh --module hcp-ref
./setup.sh --module impeccable
```

Then open the repo in your preferred agent and ask:

```text
Read this repo and onboard me to PPD.
```

The agent should offer three starting paths:

1. Walk through the included incident response example.
2. Start with your own transcript, notes, or project idea.
3. Do a practice run with a fictional example.

You can also ask for a quick overview of all three before choosing.

For a guided first run, read `ONBOARDING.md`. For agent behavior, read `AGENTS.md`; `CLAUDE.md` is only a compatibility pointer for tools that expect that filename.

If you already have notes or a transcript, start with:

```text
notes ingest
```

Paste the raw transcript, meeting notes, interview notes, or project brief. The agent will create the first artifact under `output/01.meetings/` and preserve the pasted source.

## Pick the smallest useful setup

| If you want... | Run | What you get |
|---|---|---|
| Front-door design routing | `./setup.sh --module designer` | `designer` skill only |
| Product design artifacts | `./setup.sh --module product-designer` | Personas, JTBD, CUJ, OOUX, flows, PDRs, wireframes |
| Method/process help | `./setup.sh --module design-method-finder` | Method recommendation catalog and routing |
| Search generated design artifacts | `./setup.sh --module qmd` | Repo-aware QMD config |
| HCP Terraform/TFC IA/reference docs | `./setup.sh --module hcp-ref` | Local `reference/hcp-tf-ui-for-agents/` checkout |
| Interaction behavior detail | `./setup.sh --module micro` | Micro specs, critiques, copy, local pattern corpus |
| Polished UI craft | `./setup.sh --module impeccable` | External `pbakaus/impeccable` install |
| Full transcript-to-showcase pipeline | `./setup.sh` | Everything above except external tools that are unavailable locally |

See `MODULES.md` for copy/paste bundles and source paths.

Available modules:

```bash
./setup.sh --help
```

Optional shortcut:

```bash
just modules
```

## Skill architecture

Use `designer` when the route is unclear.

| Need | Route | Packaged? |
|---|---|---|
| What method should I use? | `design-method-finder` | yes |
| Personas, JTBD, CUJ, OOUX, IA, PDR, wireframes | `product-designer` | yes |
| Trigger, state, validation, timing, recovery, accessibility behavior | `microinteractions-expert` | optional packaged module |
| Polished UI/frontend craft | `impeccable` | external |
| Existing artifact review or dual critique | `critique` if installed; product-designer fallback | external/fallback |

The orchestrator creates a compact context package and hands off to one specialist. It should not blend every specialist into a single large answer.

## How to work with the agent

Useful prompts:

```text
Use designer to route this: <request>
```

```text
Use design-method-finder. We need to validate <decision>, have <participants>, and only have <time>.
```

```text
Use product-designer to create a JTBD, CUJ, flow, and low-fidelity wireframe for <feature>.
```

```text
Use microinteractions-expert to specify loading, success, warning, error, retry, focus, and screen reader behavior for <component>.
```

```text
Run a dual critique on this artifact: <link or pasted content>
```

```text
notes ingest
```

```text
Here is a transcript from a meeting. Turn it into PPD meeting notes.
```

```text
Synthesize these meetings into strategy, then produce the journey map and first PDR.
```

## Repository map

```text
pocket-product-designer/
    ├── AGENTS.md                    canonical agent instructions
    ├── CLAUDE.md                    compatibility pointer to AGENTS.md
├── README.md                    human setup and repo guide
├── setup.sh                     modular installer
├── justfile                     task runner
├── skill/                       maintained skill sources
│   ├── designer/                macro router
│   ├── design-method-finder/    method/process selection
│   ├── product-designer/        product structure artifacts
│   ├── hashi-designer/          compatibility alias
│   ├── microinteractions-expert/ optional interaction module
│   ├── commit/                  commit helper
│   └── helios-design-system/    optional HashiCorp design-system reference
├── templates/                   meeting, strategy, journey, PDR, showcase templates
├── example/                     complete reference project
├── output/                      generated artifacts
├── storybook/                   wireframe stories
├── showcase/                    single-file showcase builder
├── reference/                   synced external docs
└── .opencode/                   OpenCode agents/plugins; skills generated by setup
```

Write zones:

- `output/`
- `storybook/stories/`
- `showcase/showcases/`

Everything else is source or reference material unless you are changing the template itself.

## Optional QMD search

QMD lets you search generated notes and design artifacts by keyword and meaning.

Bootstrap config only:

```bash
just qmd-bootstrap
```

Direct command:

```bash
./scripts/qmd-bootstrap.sh
```

Refresh index and embeddings:

```bash
just qmd-refresh
```

Direct command:

```bash
./scripts/qmd-refresh.sh
```

Refresh without embeddings:

```bash
just qmd-refresh-no-embed
```

Example query:

```bash
qmd --index ppd query $'lex:persona JTBD CUJ\nvec:What did we decide for persona scope?' -c meetings -c strategy -c pdr -n 8 --json
```

The config is generated at `~/.config/qmd/ppd.yml` by default. It indexes workspace docs, skills, templates, examples, and generated output. Override with:

```bash
QMD_INDEX_NAME=my-index QMD_CONFIG_DIR=/path/to/config just qmd-bootstrap
```

QMD is the default retrieval layer for this template.

## Notes ingest and notesctl

The first-time path is chat-first:

```text
notes ingest
```

Paste source material after that prompt. The agent should turn it into `output/01.meetings/{NNN}.{YY}.{MM}.{DD}.{Slug}.md` using `templates/meeting-notes.template.md`, then offer the next pipeline step.

If you already use `notesctl` from another workspace, you can wire it later for batch raw-note promotion. Keep the output contract the same: generated meeting notes go under `output/01.meetings/`, raw source is retained, and QMD is refreshed with `just qmd-refresh` when you want retrieval.

## Optional HCP Terraform/TFC UI reference

Use this when placement decisions need existing HCP Terraform IA or page-zone grounding.

```bash
just hcp-ui-ref-sync
```

Read in this order:

1. `reference/hcp-tf-ui-for-agents/quick-reference.md`
2. `reference/hcp-tf-ui-for-agents/pages/_index.md`
3. Relevant files in `reference/hcp-tf-ui-for-agents/pages/*.md`

This reference is optional and Terraform-specific. It is included because the example project uses HCP Terraform/TFC. For another product, ask the agent to crawl or capture that product's UI and generate an app-specific UI reference in the same spirit:

```text
Use product-designer to create an app-specific UI reference from this website: <url>
```

Provide an app URL, screenshots, notes, or a rough workflow. If browser capture is available, the agent should use the website crawler/UI capture flow from `skill/product-designer/resources/ui-capture-spec.md` to document routes, layout zones, clickable elements, and ASCII page maps. If capture is not available, it can create first-pass ASCII wireframes from `skill/product-designer/resources/wireframing.md` with labeled assumptions.

## Optional polished UI craft

`impeccable` is external and not maintained here.

Install it when needed:

```bash
npx skills add pbakaus/impeccable
```

Use it only after product structure is stable, or when the user explicitly asks for high-fidelity UI/frontend execution.

## Four-stage process and artifact pipeline

The public story is four stages. The implementation still uses smaller artifacts so each decision has a traceable input and output.

### Frame

Goal: define the core problem and user needs.

Typical inputs:

- Raw meeting notes
- Interview notes
- Project briefs
- PRDs and RFCs

Typical outputs:

- Meeting notes
- Strategy synthesis
- Personas
- JTBDs
- CUJs
- Problem statement

### Map

Goal: define how the user navigates the solution.

Typical outputs:

- Current journey
- Future journey
- Persona-based scenarios
- Flow maps or Mermaid diagrams
- Required screens grouped by category
- Data contracts and state boundaries

### Design

Goal: translate planned concepts into visual execution without making the work look more final than it is.

Typical outputs:

- Ideation variations
- Layout prompts
- ASCII wireframes
- Wire flows
- Storybook wireframes
- Gray mockups and wireframe showcases

### Ship

Goal: turn approved designs into code-ready prototypes and handoff assets.

Typical outputs:

- Design-system-backed prototypes
- High-fidelity HTML mocks
- Developer-ready assets
- Final showcase or handoff docs

## Detailed artifact stages

### 1. Meeting notes

Input: transcript.

Output:

- TL;DR
- Key discussion points
- Decisions and action items
- Open questions
- Raw transcript preserved

### 2. Strategy synthesis

Input: two or more related meeting notes.

Output:

- Scope boundaries
- Personas grounded in real roles
- Critical user journeys
- Technical context
- Downstream deliverables plan

### 3. Journey map

Input: strategy document with CUJs.

Output:

- Full journey stages
- Persona actions by stage
- Touchpoints, system calls, data in and out
- Failure modes and durations

### 4. PDR chain

Input: completed journey map.

Default output sequence:

- PDR-001 Architecture
- PDR-002 Scenario
- PDR-003 JourneyMap Data Contracts
- PDR-004 Wireframe Plan

Each PDR depends on the prior artifact. No circular dependencies.

### 5. Storybook wireframes

Input: PDR-004.

Output:

- `.stories.tsx` files
- Fixture data files
- One story set per component or view in the plan

Preview:

```bash
cd storybook && npm run storybook
```

Optional shortcut:

```bash
just storybook
```

### 6. Showcase build

Input: completed wireframe stories.

Output: single-file HTML showcase suitable for review.

```bash
cd showcase && npm run dev
cd showcase && npm run build
```

Optional shortcuts:

```bash
just showcase-dev
just showcase-build
```

For standalone gray HTML mockups without the landing page, create a mockup config under `showcase/showcases/<project>/mockup.config.tsx` and point the showcase at it:

```bash
cd showcase && VITE_SHOWCASE_CONFIG=<project>/mockup.config npm run dev
cd showcase && VITE_SHOWCASE_CONFIG=<project>/mockup.config npm run build
```

Configure large or scrollable frames in the showcase config:

```ts
layout: {
  mode: 'mockup',
  contentMaxWidth: 'none',
  frame: {
    height: 'calc(100vh - 96px)',
    minWidth: 1440,
    overflow: 'auto',
    frameOverflow: 'auto',
  },
}
```

## Optional `just` shortcuts

The direct shell/npm commands are shown in the sections above. Use these shortcuts only if `just` is installed.

| Command | What it does |
|---|---|
| `just setup` | Full default setup |
| `just setup-core` | Install only core PPD v2 skills |
| `just setup-module <name>` | Install one module |
| `just modules` | List modules |
| `just install` | Install Storybook/showcase npm dependencies |
| `just storybook` | Run Storybook dev server |
| `just storybook-build` | Build static Storybook |
| `just showcase-dev` | Run showcase dev server |
| `just showcase-build` | Build single-file HTML showcase |
| `just build` | Build Storybook and showcase |
| `just clean` | Remove build artifacts |
| `just reset` | Clear generated output and wireframe stories |
| `just micro-query "..."` | Retrieve local microinteraction pattern cards |
| `just micro-lint-no-refs` | Lint microinteraction corpus source-reference policy |
| `just hcp-ui-ref-sync` | Clone/update HCP Terraform UI reference docs |
| `just qmd-bootstrap` | Generate repo-aware QMD config |
| `just qmd-refresh` | Refresh QMD index and embeddings |

## Quality gates

Nothing advances without passing its gate.

- Meeting Notes -> Strategy: every decision captured, attendee list complete, no unlinked meeting references.
- Strategy -> Journey Map: CUJs are specific and grounded, personas map to real roles, scope boundaries explicit.
- Journey Map -> PDR-001: stages populated, technical grounding references real systems, each persona has actions.
- PDR-001 -> PDR-002: JTBD clear, design pattern named, responsibilities and rollback defined.
- PDR-002 -> PDR-003: environment is exact, each stage has operator action, agent response, and concrete payloads.
- PDR-003 -> PDR-004: contracts, state machine, service dependencies, and timing budget are complete.
- PDR-004 -> Stories: file manifest lists every component, fixtures match contracts, stories render.
- Stories -> Showcase: build succeeds and HTML works standalone.

## Naming convention

Generated docs use:

```text
{NNN}.{YY}.{MM}.{DD}.{Slug}
```

This keeps chronology and dependencies readable.

## First teammate onboarding path

1. Ask the agent to onboard you to the repo.
2. Read `example/` artifacts in pipeline order.
3. Ask the agent how each artifact depends on the previous one.
4. Give the agent one short transcript and ask for artifact step 1 output: meeting notes.
5. Continue through artifact step 4, the PDR chain, before creating Storybook stories.
6. Build one end-to-end mini showcase.

## What changed in v2

PPD v2 is modular and uses the four-stage **Frame -> Map -> Design -> Ship** story as the top-level process.

- `designer` is the macro-level front door. It routes requests by intent and fidelity.
- `product-designer` replaces `hashi-designer` for product structure work.
- `design-method-finder` owns method, workshop, research, and prototype selection.
- `microinteractions-expert` remains an optional packaged module for interaction behavior.
- `impeccable` is not vendored. Install it externally only when you want polished UI/frontend craft.
- QMD search can be installed by itself and used without the full showcase pipeline.
- `.opencode/skills/` is generated by setup and ignored; `skill/` is the maintained source.
- `AGENTS.md` is the canonical multi-agent instruction file; `CLAUDE.md` is a compatibility pointer.
- HCP Terraform/TFC docs are optional reference material, not the default IA for unrelated apps.

`hashi-designer` remains as a compatibility alias for old prompts.
