# Context Files

A guide to what context files are, how to structure them, and how AI agents use them to produce better output. Grounded in how this Pocket Product Designer (PPD) repo works.

## What they are

A **context file** is a plain-text/markdown file whose job is to feed an AI agent the durable information it needs to do a task well, so you do not have to re-explain it every prompt. The agent reads it as part of its working context and treats it as ground truth.

There are two broad kinds, and this repo uses both:

1. **Instruction context** - tells the agent *how to behave*: rules, workflow, routing, conventions, write zones.
   - In this repo: `AGENTS.md` (canonical), `CLAUDE.md` (compatibility pointer), the `skill/*/SKILL.md` files, and `templates/*.template.md`.
2. **Knowledge context** - tells the agent *what is true about your project*: decisions, personas, data contracts, prior meetings, reference docs.
   - In this repo: everything under `output/` (meeting notes, strategy, journey maps, PDRs) and `reference/`.

The PPD pipeline is essentially a **context-manufacturing machine**: raw transcript -> meeting notes -> strategy -> journey map -> PDRs. Each artifact is a higher-quality context file that the next stage consumes.

```text
Transcript --> Meeting Notes --> Strategy --> Journey Map --> PDRs --> Stories
  (raw)         (context)        (context)     (context)     (context)  (output)
```

## Why they produce better output

An LLM only knows what is in its context window. Without context files it guesses, and guesses drift. A good context file does three things:

- **Grounds** the agent in real facts (real roles, real systems, real decisions) so it stops hallucinating plausible-but-wrong details.
- **Constrains** scope so the agent does not wander (write zones, "keep it gray and low fidelity," explicit non-goals).
- **Traces** every claim back to a source, so output is auditable. AGENTS.md enforces this with quality gates like "every CUJ must trace to a meeting decision or labeled assumption."

Example: a meeting summary artifact is a context file. The next agent that designs a feature can read it and immediately know the open problems, the contacts, and the decisions, without re-watching the meeting.

## How to structure them

### 1. Instruction context (an AGENTS.md-style file)

Keep it skimmable and imperative. The pattern this repo uses:

```markdown
# <Scope> agent instructions

## Core model            <- the one mental model everything hangs off
## Routing               <- when to use which specialist/skill (a table)
## Write zones           <- where the agent may and may NOT write files
## Pipeline / stages     <- step-by-step triggers and outputs
## Quality gates         <- pass/fail checks between stages
## Writing rules         <- tone, banned patterns
```

Rules that make it effective:

- **Be prescriptive, not aspirational.** "Save to `output/01.meetings/{NNN}.{YY}.{MM}.{DD}.{Slug}.md`" beats "save it somewhere sensible."
- **Use tables for decisions.** A routing table that maps *need -> route* so the agent does not deliberate.
- **State negative space.** Explicit scope boundaries and write zones prevent the most common failure (agent edits the wrong thing).
- **Add a self-check.** AGENTS.md ends each writing rule with: "Does this sentence change what someone would do after reading? If not, cut it."

### 2. Knowledge context (an artifact / template)

Use a fixed template so every instance is shaped the same way, which makes them machine-readable. The `templates/` directory is exactly this. The meeting-notes shape, for example:

```markdown
# <Title>
**Date / Attendees / Source**     <- metadata header (cheap to scan, easy to filter)
## TL;DR                          <- the compressed answer first
## Context
## Key Discussion Points
## Decisions                      <- the load-bearing section other artifacts cite
## Action Items
## Open Questions
## Raw Transcript (verbatim)      <- source of truth preserved for re-derivation
```

Structuring principles:

- **Answer-first.** Put the TL;DR and decisions near the top; agents (and humans) read top-down and may truncate.
- **Separate verbatim source from synthesis.** Keep the raw transcript so any later claim can be re-checked. PPD mandates this (`## Raw Transcript`).
- **Stable headings.** Consistent section names let an agent grep for `## Decisions` across many files.
- **Label assumptions explicitly.** When grounding is missing, write "Assumption:" rather than asserting. This is a hard rule in AGENTS.md.
- **Predictable filenames.** `{NNN}.{YY}.{MM}.{DD}.{Slug}.md` makes ordering, dedup, and retrieval deterministic.
- **Link upstream.** PDRs declare `Depends on:` so the dependency graph is explicit and circular references are caught.

## How agents actually use them

1. **Auto-loaded instruction context.** Files like `AGENTS.md` / `CLAUDE.md` are read at session start and shape every response. This is why an agent follows the `output/...` conventions without being told.
2. **On-demand skills.** `SKILL.md` files are loaded only when a task matches, keeping the base context lean. PPD routes to the smallest useful specialist instead of dumping everything in.
3. **Retrieved knowledge context.** When working a task, the agent reads the relevant artifacts (the strategy doc, the journey map, prior meeting summaries) and uses their Decisions/contracts as facts to build on.
4. **Quality gates as validation.** Before promoting one context file to the next stage, the agent checks the gate (for example, "every decision in the transcript appears in `## Decisions`"). This keeps context from degrading as it flows downstream.

## Practical guidance

- **One concern per file.** A meeting note is not a strategy doc. Mixing them makes retrieval noisy.
- **Right-size fidelity.** Match detail to the next decision. Do not write production specs into a low-fi wireframe context.
- **Keep it current.** Stale context is worse than none; it confidently misleads. Update Decisions when they change.
- **Make it greppable, not just readable.** Consistent headings + metadata headers + predictable filenames = an agent can find and cite it.
- **Prune.** AGENTS.md's test applies to context too: if a line does not change what the agent would do, cut it.

## In this repo specifically

- Put **instruction** context in `AGENTS.md` / skills.
- Put **knowledge** context as templated artifacts under `output/` (and reference material in `reference/`).
- The whole Frame -> Map -> Design -> Ship flow is just progressively refining context until it is concrete enough to ship.
