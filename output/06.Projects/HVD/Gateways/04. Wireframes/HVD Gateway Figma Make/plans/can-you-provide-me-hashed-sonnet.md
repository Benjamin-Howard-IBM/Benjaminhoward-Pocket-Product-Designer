# Plan: Export Prototype as Markdown Documentation

## Context

The user has built a fully interactive HCP Vault Dedicated — Cluster Networking / Gateways prototype
(screens S0–S9) and wants a standalone markdown document that describes it. The document should be
shareable as a reference for stakeholders, researchers, or developers who didn't participate in the
build session.

## What the output file will contain

A single markdown file at **`/workspaces/default/code/PROTOTYPE.md`** with the following sections:

### 1. Overview
- Product context: HCP Vault Dedicated cluster networking — gateways feature
- Frame size, background color, font stack
- How to run the prototype locally (dev server already running on `$PORT`)

### 2. Navigation map
- State machine shape (`AppState` interface)
- Happy-path flow diagram: S0 → S1 → modal → S3 → S4 → S5 → S6 → S7 → S8 → S9
- Branch paths (S7 failure, S8 topology toggle, S9 site variants)

### 3. Screen-by-screen reference
One section per screen. Each section includes:
- Screen ID and title
- Breadcrumb path
- Key content / components rendered
- All clickable interactions and where they navigate

Screens covered:
| ID | Title |
|----|-------|
| S0 | Networking overview |
| S1 | Gateways landing (disabled) |
| S2 | Enable Gateways modal (overlay on S1) |
| S3 | Gateways enabled — no sites |
| S4 | Add site: Step 1 — Deployment model |
| S5 | Add site: Step 2 — Configure |
| S6 | Add site: Step 3 — Install (Binary + Docker tabs) |
| S7 | Add site: Step 4 — Verify (pending / connected / failed) |
| S8 | Gateways overview — Table view + Topology view |
| S9 | Site detail — nyc-prod (Healthy) / nj-dr (Degraded) / fl-branch (Not connected) |

### 4. Helios component reference
Table listing every component, its variants/props, and where it appears in the prototype.

### 5. Usability test tasks
The four task scenarios (Task 1–4) from the original spec, reproduced verbatim for test facilitators.

## Output file

**`/workspaces/default/code/PROTOTYPE.md`**

No other files will be created or modified.

## Verification

Open the generated file and confirm:
- All 10 screen sections are present (S0, S1, S2 modal, S3–S9)
- All 3 S9 site-detail variants are documented
- The navigation map matches the actual `AppState` transitions in `src/App.tsx`
- Component table matches the exports in `src/components.tsx`
