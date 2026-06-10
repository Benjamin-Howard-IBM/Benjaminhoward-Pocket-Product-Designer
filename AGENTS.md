# Pocket Product Designer agent instructions

Pocket Product Designer works with any capable LLM coding/design agent that can read and edit files. OpenCode is supported and recommended for this template, but it is not required.

Use these instructions as the canonical agent contract. `CLAUDE.md` is kept as a compatibility pointer for tools that still look for that filename.

## Core model

PPD turns raw product context into traceable product artifacts and reviewable wireframe showcases through four stages:

```text
Frame -> Map -> Design -> Ship
```

The four stages explain the design process. The detailed artifact pipeline is how this repo implements it:

```text
Transcript -> Meeting Notes -> Strategy -> Journey Map -> PDRs -> Storybook -> Showcase HTML
```

| Stage | Goal | Artifact work |
|---|---|---|
| **Frame** | Define the core problem and user needs. | Notes ingest, meeting notes, strategy, personas, JTBDs, CUJs, problem statement |
| **Map** | Define how the user navigates the solution. | Current journey, future journey, scenarios, flow maps, screen inventory, data contracts |
| **Design** | Translate planned concepts into low-fidelity visual execution. | Ideation, layout prompts, ASCII wireframes, wire flows, Storybook wireframes, gray mockups, showcases |
| **Ship** | Turn approved design into implementation-ready assets. | Design-system-backed prototypes, high-fidelity HTML mocks, developer-ready handoff |

Keep designs gray and low fidelity until the user or stakeholders approve the direction. Do not make wireframes look production-ready before the design logic is settled.

## First-run behavior

When the user says `getting started`, `get started`, `I just downloaded this repo`, `onboard me to PPD`, or `Read this repo and onboard me to PPD`:

1. Do not immediately generate artifacts.
2. Verify the workspace is ready enough to continue.
3. State what you checked.
4. Offer three paths.

Readiness checks:

- `setup.sh` exists.
- `skill/` exists.
- `templates/` exists.
- `example/` exists.
- For Storybook/showcase work only: `storybook/package.json` and `showcase/package.json` exist, and Node/npm are available or can be installed by the user.

Use this response shape:

```text
Your setup is ready enough to start. I can help you in three ways:

Option 1: Learn from the example - I'll walk you through the existing incident response dashboard example so you can see how the complete process works: Frame -> Map -> Design -> Ship. Under the hood, that becomes meeting notes -> strategy -> journey map -> PDRs -> wireframes -> showcase.

Option 2: Start fresh with your own project - If you have a meeting transcript, notes, or project idea, I'll guide you through creating the first artifact and building from there.

Option 3: Practice run - I'll help you create a simple practice project with a fictional transcript so you can learn the workflow hands-on.

Which approach would you prefer?
```

If setup is incomplete, put the fix first:

```text
Before we start, run `<specific command>` so the workspace has the pieces needed for the path you choose. After that, pick one of these three paths: example walkthrough, your own project, or practice run.
```

Do not route onboarding through `designer`; it is repo onboarding, not a design-method decision.

## First-time command behavior

When the user says `/help`, `what can you do`, or `what should I do first`, show this compact menu:

```text
Start here:
- getting started - choose example walkthrough, your own project, or practice run
- notes ingest - paste a transcript, meeting notes, interview notes, or project brief
- synthesize - turn ingested notes into strategy
- journey map - map a critical user journey
- PDR - create the design-record chain
- UI capture for my app - crawl or capture a website and create app-specific ASCII UI reference docs
- ASCII wireframe - create a first-pass low-fidelity wireframe when capture is not available
- showcase - build reviewable HTML

Optional helpers:
- help hcp ui reference - use HCP Terraform/TFC reference docs if relevant
- help ui capture - capture a live app through browser automation if installed
- skip questions / just do it - proceed with labeled assumptions
```

When the user says `skip questions`, `don't ask questions`, or `just do it`, do not run a discovery interview. Proceed with explicit assumptions and label them in the artifact.

## Notes ingest behavior

When the user says `notes ingest`, `ingest notes`, `paste notes`, `notes ingerst`, or pastes a transcript/meeting note blob:

1. If no source text is present yet, ask them to paste the transcript, rough notes, interview notes, or project brief.
2. Ask for title/date only if they cannot be inferred and the answer affects the filename.
3. Load `templates/meeting-notes.template.md`.
4. Create `output/01.meetings/{NNN}.{YY}.{MM}.{DD}.{Slug}.md`.
5. Preserve the pasted source verbatim under `## Raw Transcript`. If the source is not a transcript, use `## Raw Source`.
6. Extract TL;DR, context, key discussion points, decisions/action items, and open questions.
7. Offer the next valid pipeline step.

If a `notesctl` workflow is available in the user's environment and already writes the same PPD output shape, it may be used for batch promotion. Do not make notesctl a prerequisite for first-time users; direct `notes ingest` in chat is the default path.

If QMD is installed, suggest `./scripts/qmd-refresh.sh` after saving notes. `just qmd-refresh` is an optional shortcut.

## Routing model

Use `designer` first when the right design route is unclear.

| Need | Route |
|---|---|
| Method, workshop, research, or prototype choice | `design-method-finder` |
| Personas, JTBD, CUJ, OOUX, IA, flows, PDRs, UXDRs, wireframes | `product-designer` |
| Component states, timing, validation, retry, recovery, focus, accessibility behavior | `microinteractions-expert` |
| Polished visual/UI/frontend craft | external `impeccable` |
| Existing artifact critique or dual critique | external `critique`, or product-designer heuristic fallback |
| IBM Carbon components, 2x Grid, Carbon tokens, `@carbon/react` UI | `carbon-design-system` |
| HashiCorp Helios components, tokens, Ember UI | `helios-design-system` |

`hashi-designer` is a compatibility alias. New work should use `product-designer` or `designer`.

Design system references (`carbon-design-system`, `helios-design-system`) are reference skills, not routers. Load one when a task must align to that specific design system; otherwise stay design-system-agnostic.

Do not merge every design skill into one large response. Route to the smallest useful specialist and keep fidelity matched to the next decision.

### Dual critique mode

Trigger this mode when the user asks for `dual critique`, `dual crit`, `dual-lens critique`, `skeptical and supportive critique`, or asks for both a supportive and critical read of a design.

Use external `critique` if installed. If it is not installed, use `product-designer` as a two-pass fallback and keep the output compact:

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

## Write zones

Write generated project work only to:

- `output/`
- `storybook/stories/`
- `showcase/showcases/`

Everything else is source or reference material unless the user is modifying the template repo itself.

Generated artifact filenames use:

```text
{NNN}.{YY}.{MM}.{DD}.{Slug}.md
```

## UI capture and ASCII references for any app

Use `product-designer` and `skill/product-designer/resources/ui-capture-spec.md` when the user wants UI grounding for a non-Terraform app. The preferred path is to crawl or capture the real product surface, then create app-specific reference docs with routes, page zones, clickable elements, and ASCII page maps.

Prompt examples:

```text
Use product-designer to create an app-specific UI reference from this website: <url>
```

```text
Create ASCII page maps and clickable-zone docs from these screenshots and notes.
```

If browser capture is unavailable, fall back to `skill/product-designer/resources/wireframing.md` and create first-pass low-fidelity ASCII wireframes with labeled assumptions. Do not reuse HCP/TFC navigation or page structure unless the user is designing Terraform UI.

## Detailed artifact pipeline

### Stage 1: Meeting notes

Trigger: user pastes a transcript.

1. Load `templates/meeting-notes.template.md`.
2. Extract TL;DR, key points, decisions, action items, and open questions.
3. Preserve the raw transcript verbatim under `## Raw Transcript`.
4. Quality gate: every decision in the transcript appears in `## Decisions`.
5. Save to `output/01.meetings/{NNN}.{YY}.{MM}.{DD}.{Slug}.md`.

### Stage 2: Strategy synthesis

Trigger: user says `synthesize` or `strategy`, or has two or more meeting notes on one topic.

1. Load `templates/strategy.template.md` and `product-designer`.
2. Synthesize scope, personas, CUJ inventory, technical context, and deliverables.
3. Every CUJ must trace to a meeting decision or labeled assumption.
4. Personas must reference real roles from transcripts.
5. Quality gate: explicit scope boundaries.
6. Save to `output/02.strategy/{NNN}.{YY}.{MM}.{DD}.{Slug}-Strategy.md`.

### Stage 3: Journey map

Trigger: user says `journey map` or a strategy doc exists with CUJs.

1. Load `templates/journey-map.template.md` and `product-designer`.
2. Build staged journey structure from trigger to outcome.
3. Include persona actions, tools/touchpoints, system calls, data in/out, validation, and failure modes.
4. Quality gate: no placeholder cells; technical grounding references real systems or labeled assumptions.
5. Save to `output/02.strategy/{NNN}.{YY}.{MM}.{DD}.{Slug}-JourneyMap.md`.

### Stage 4: PDR chain

Trigger: user says `PDR` or `design record`, or a journey map is complete.

1. Load `templates/pdr.template.md`.
2. Follow the default sequence unless the user requests a different chain:
   - PDR-001: Architecture
   - PDR-002: Scenario
   - PDR-003: JourneyMap data contracts
   - PDR-004: WireframePlan
3. Every PDR declares `Depends on:` with links to upstream artifacts.
4. No circular dependencies.
5. Save to `output/03.pdrs/{NNN}.{YY}.{MM}.{DD}.PDR-{Type}-{Subject}.md`.

### Stage 5: Storybook stories

Trigger: user says `stories` or a WireframePlan PDR exists.

1. Generate `.stories.tsx` from PDR-004 specs and fixture data.
2. Put stories in `storybook/stories/wireframes/`.
3. Put fixture data in co-located `_*-fixtures.ts` files.
4. Use CSF3 format.
5. Quality gate: every story in PDR-004 exists and renders.

Direct command:

```bash
cd storybook && npm run storybook
```

Optional shortcut:

```bash
just storybook
```

### Stage 6: Showcase build

Trigger: user says `showcase` or Storybook stories are complete.

1. Build showcase in `showcase/` using Vite and `vite-plugin-singlefile`.
2. Quality gate: built HTML opens in a browser with no network requests and interactions work.

Direct commands:

```bash
cd showcase && npm run dev
cd showcase && npm run build
```

Optional shortcuts:

```bash
just showcase-dev
just showcase-build
```

Use mockup mode for standalone gray HTML artifacts or larger unconstrained wireframes. Point the showcase at your own mockup config:

```bash
cd showcase && VITE_SHOWCASE_CONFIG=<project>/mockup.config npm run dev
cd showcase && VITE_SHOWCASE_CONFIG=<project>/mockup.config npm run build
```

## Quality gates

- Meeting Notes -> Strategy: every decision captured, attendee list complete, no unlinked meeting references.
- Strategy -> Journey Map: CUJs are specific and grounded, personas map to real roles, scope boundaries explicit.
- Journey Map -> PDR-001: stages populated, technical grounding references real systems, each persona has actions.
- PDR-001 -> PDR-002: JTBD clear, design pattern named, responsibilities and rollback defined.
- PDR-002 -> PDR-003: environment exact, every stage has operator action, agent response, and payloads.
- PDR-003 -> PDR-004: contracts, state machine, service dependencies, and timing budget complete.
- PDR-004 -> Stories: file manifest lists every component, fixtures match contracts, stories render.
- Stories -> Showcase: build succeeds and HTML works standalone.

## Writing rules

Apply to every artifact.

- No significance narration.
- No setup-then-payoff.
- No motivational sign-offs.
- No dramatic restatement.
- No superlatives that sell.
- Avoid unicode em dash. Use a regular hyphen.

Test: does this sentence change what someone would do after reading? If not, cut it.
