# Onboarding

Use this when you just cloned Pocket Product Designer and want the shortest path to useful output.

You can use any LLM/coding agent that can read and edit files. OpenCode is supported, but it is not required.

PPD's design process has four stages:

```text
Frame -> Map -> Design -> Ship
```

- **Frame**: define the problem, user needs, personas, JTBDs, CUJs, and product intent.
- **Map**: describe current and future journeys, scenarios, flow maps, and required screens.
- **Design**: create ideation variants, ASCII wireframes, wire flows, Storybook wireframes, and gray showcases.
- **Ship**: turn approved direction into design-system-backed prototypes, HTML mocks, and developer-ready handoff assets.

## Five-minute path

1. Run setup:

   ```bash
   ./setup.sh
   ```

   If you only want the design skills, run:

   ```bash
   ./setup.sh --core
   ```

2. Open this repo in your agent and ask:

   ```text
   Read this repo and onboard me to PPD.
   ```

3. Pick one path:

   - Start with your own transcript, notes, or product idea.
   - Do a practice run with a fictional example.

## Start by pasting notes

Use this prompt when you already have raw material:

```text
notes ingest
```

Then paste a transcript, rough meeting notes, interview notes, or a project brief.

If you typo the command as `notes ingerst`, the agent should treat it as `notes ingest`.

The agent should:

1. Ask for a title/date only if it cannot infer them.
2. Create `output/01.meetings/{NNN}.{YY}.{MM}.{DD}.{Slug}.md`.
3. Use `templates/meeting-notes.template.md`.
4. Preserve the pasted source verbatim under `## Raw Transcript` or `## Raw Source`.
5. Offer the next step: strategy synthesis, journey map, PDR chain, wireframes, or showcase.

QMD search is optional. If QMD is installed, run `./scripts/qmd-refresh.sh` after ingesting notes so future prompts can retrieve prior decisions. `just qmd-refresh` is an optional shortcut.

## Use it for any app

The repo can sync HCP Terraform UI reference docs. That reference is optional grounding for Terraform UI work, not a constraint on other products.

For another app, ask:

```text
Use product-designer to create an app-specific UI reference from this website: <url>
```

Give the agent whatever you have: an app URL, screenshots, rough notes, a feature idea, or a workflow. The preferred path is to use the website crawler/UI capture flow from `skill/product-designer/resources/ui-capture-spec.md` to produce route docs, ASCII page maps, zone definitions, and clickable-element maps. This creates the same kind of app-specific grounding that the included Terraform UI reference provides for the example project.

If capture is not available, the agent can still create first-pass ASCII wireframes from `skill/product-designer/resources/wireframing.md`, but it should label assumptions and avoid forcing the HCP/TFC structure onto unrelated products.

## What is not required

- HCP/TFC reference docs are optional and only useful when the product surface is Terraform-related.
- `impeccable` is external; install it only when you want polished UI/frontend craft.
