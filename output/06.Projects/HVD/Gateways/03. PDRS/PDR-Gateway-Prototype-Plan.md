# Gateway Prototype Plan

**Status**: Approved - ready for implementation
**Date**: 2026-08
**Author**: Benjamin Howard
**Depends on**:
- [Gateway RFC](../02.%20Strategy/Gateway-RFC.md)
- [HVD Gateway Memo Analysis](../02.%20Strategy/HVD-Gateway-Memo-Analysis.md)
- [HVD Gateway Technical Primer](../07.%20Research/001.26.08.05.HVD-Gateway-Technical-Primer.md)

---

## Overview

Build three deliverables for the HVD Gateway feature:

1. **Architecture Flow document** - Markdown stakeholder alignment artifact showing the full Gateway setup flow as a decision/state diagram. Produced first, standalone from the prototype.
2. **Storybook prototype** - Working interactive wireframe in this repo for local preview and usability testing. Uses the same inline-CSS + React pattern established in `audit-logging.stories.tsx`. Helios visual language (not Carbon).
3. **Figma Make spec** - Full visual wireframe spec as a markdown file, screen-by-screen with layout, component annotations, copy, and interaction notes. Taken to Figma Make after Storybook review.

**Screen scope** (customer-facing setup flow inside HCP portal UI):

| Screen | Entry point |
|---|---|
| S0: Networking overview | Existing page - Gateway card shown as Disabled |
| S1: Gateways landing (disabled state) | After clicking Gateway card Edit link |
| S2: Enable Gateways confirmation | After clicking Enable Gateways |
| S3: Gateways overview (enabled, no sites) | Post-enable empty state |
| S4: Create site - deployment model | Radio card: Binary vs Docker |
| S5: Create site - configure | Site name, service principal, allowed CIDRs |
| S6: Create site - install instructions | Code block + copy, deployment-model-specific |
| S7: Create site - verify connection | Polling state: pending → connected |
| S8: Gateways overview (enabled, with sites) | Table of sites with status badges |
| S9: Site detail | Status, config summary, version, HA pairing, actions |

**Confirmed assumptions:**
- A1: Prototype is customer-facing HCP portal UI, not Gateway agent CLI
- A2: HA/DR pairing shown as a step in create flow, not a separate flow (PoC stage)
- A3: Both Binary and Docker deployment options in scope
- A4: Source IP preservation treated as a hard constraint; surfaced in the config step

**Design system:** Helios visual language (HashiCorp gold/black/white palette, Inter font, Helios token shapes). Implemented as inline-CSS React components following the established `_hds-primitives.tsx` pattern - no Helios runtime dependency in Storybook.

---

## Sub-Task 1: Architecture Flow Document

**Status**: [ ] pending

### Intent
Produce a standalone markdown document that stakeholders can read to understand the full Gateway setup flow: what the system does at each stage, what decisions branch the flow, and what state the system is in at each point. This is the alignment artifact - it precedes wireframes and anchors the prototype screen order.

### Expected Outcomes
- A markdown file at `output/06.Projects/HVD/Gateways/02. Strategy/003.26.Gateway-Architecture-Flow.md`
- A Mermaid state/flow diagram covering: Gateways disabled → Enable → No sites → Create site (Binary vs Docker branch) → Configure → Install → Verify → Site active → HA pairing
- A stage-by-stage table: stage name, user action, system response, resulting state, error/edge conditions
- Open questions from the RFC flagged inline where they affect the flow

### Todo List
1. Read `Gateway-RFC.md` and `HVD-Gateway-Memo-Analysis.md` for stage and decision inputs
2. Draft the Mermaid state diagram covering all 9 screens plus error branches
3. Write the stage-by-stage table (10 rows minimum)
4. Flag open questions from the memo (binary vs Docker decision, source IP, peer limits) inline at the stages they affect
5. Add a Design Decisions section recording the forks taken (mirrors the pattern in the Memo Analysis)
6. Save to `output/06.Projects/HVD/Gateways/02. Strategy/003.26.Gateway-Architecture-Flow.md`

### Relevant Context
- [`Gateway-RFC.md`](../02.%20Strategy/Gateway-RFC.md) - step-by-step setup requirements
- [`HVD-Gateway-Memo-Analysis.md`](../02.%20Strategy/HVD-Gateway-Memo-Analysis.md) - open questions table, design decisions format
- [`HVD-Gateway-Technical-Primer.md`](../07.%20Research/001.26.08.05.HVD-Gateway-Technical-Primer.md) - technical concept to UI mapping table

---

## Sub-Task 2: Storybook Wireframe Stories

**Status**: [ ] pending

### Intent
Build the interactive Storybook wireframe for all 10 screens. This is the usability test artifact - it must be clickable (state transitions between screens), realistic in layout, and low-fidelity (gray, no color fills beyond Helios status badges). Follows the exact code pattern in `audit-logging.stories.tsx`.

### Expected Outcomes
- File: `storybook/stories/wireframes/hvd-gateways/gateway.stories.tsx`
- File: `storybook/stories/wireframes/hvd-gateways/_gateway-fixtures.ts` (fixture data)
- 10 named story exports matching the screen inventory
- 1 `InteractiveFlow` story with full state machine (useState transitions between all screens)
- Helios-faithful color palette: `#1A1A1A` header, white main, `#F5F5F5` background, `#FFDE5A` gold for active/enabled status, Inter font
- Breadcrumb updates per screen: `cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking / Gateways`
- Side nav: Overview, Replication active=false, Integrations active=false, Networking active=true
- All code blocks use `HdsCodeBlock` shape (dark bg, mono font, copy button placeholder)
- Architecture diagram on S1 rendered as inline SVG (simplified version of the gateway-routing-diagram.svg pattern)

### Screen-level story specs

**S0: Networking overview (Disabled Gateway card)**
- Renders existing Networking page layout from screenshot reference
- Gateway card shows `Disabled` badge (neutral/gray), `Edit →` link
- Clicking `Edit →` transitions to S1
- Other cards (Cluster accessibility, IP Allow list, Proxy, HVN, Private link, Custom DNS, Custom domain) shown as static read-only cards

**S1: Gateways landing - disabled state**
- Page title: `Gateways` with `Enable Gateways` primary button top-right
- Subtitle + learn more link
- `Set up gateways` section heading + 2-sentence description
- Inline SVG architecture diagram: Vault Dataplane Network (left box) containing Vault Node → Dataplane Gateway (wg0) / Wireguard tunnel → Site Gateway (wg1) → Database in Your Network Site (right box)
- Numbered setup steps list (3 items matching RFC)
- Clicking `Enable Gateways` → S2

**S2: Enable Gateways modal/confirmation**
- Modal: title `Enable gateways`, description explaining dataplane gateway deployment per AZ, active/passive HA
- Alert (neutral): `One gateway will be deployed per availability zone. This cannot be undone.`
- Footer: `Cancel` (secondary) + `Enable` (primary)
- Cancel → S1, Enable → S3

**S3: Gateways overview - enabled, no sites**
- Page title: `Gateways`, badge: `Enabled` (success/green-tinted in Helios = `#1A7F4B` border, keep muted for low-fi)
- `Add site` primary button top-right
- Empty state below: icon placeholder + `No sites configured` heading + `Add your first gateway site to connect a private network.` body + `Add site` button
- Clicking `Add site` → S4

**S4: Create site - deployment model**
- Step indicator: Step 1 of 4 - `Deployment model`
- Section heading: `Choose how to run the gateway agent`
- Two Radio Cards side by side:
  - `Binary` - `Single compiled executable. No dependencies. Preferred by security teams.`
  - `Docker` - `Container image. Preferred for teams already running container platforms.`
- Both options selectable; Binary pre-selected
- `Next` (primary) + `Cancel` (tertiary)
- Next → S5

**S5: Create site - configure**
- Step indicator: Step 2 of 4 - `Configure`
- Form fields:
  - `Site name` (text input, required, helper: `A label for this network site, e.g. nyc-prod`)
  - `Service principal client ID` (text input, required, mono)
  - `Service principal client secret` (password input, required, mono)
  - `Allowed CIDRs` (textarea, helper: `One CIDR per line. Traffic from these ranges will be routed through this gateway.`)
- Inline Alert (neutral, below CIDRs): `Source IP addresses from your network will be preserved in Vault audit logs. Ensure allowed CIDRs reflect your actual workload IP ranges.`
- `Back` (secondary) + `Next` (primary)
- Next → S6

**S6: Create site - install instructions**
- Step indicator: Step 3 of 4 - `Install`
- Tabs: `Binary` | `Docker` (matches selection from S4, Binary active by default)
- Binary tab content:
  - Section: `1. Download the gateway agent` - CodeBlock with download curl command
  - Section: `2. Create the config file` - CodeBlock with HCL config (role, site, cred_file, log_level)
  - Section: `3. Run the gateway` - CodeBlock with run command
- Docker tab: equivalent docker pull + docker run commands
- `Back` (secondary) + `Start verification` (primary)
- Start verification → S7

**S7: Create site - verify connection**
- Step indicator: Step 4 of 4 - `Verify`
- Status card: spinner + `Waiting for connection...` heading + `Keep the gateway agent running. This page will update when a connection is established.` body
- After 3s simulated delay (useState + useEffect timeout): transitions to success state
- Success state: checkmark icon + `Connected` heading + site name + `View site` button
- `View site` → S9, or `Done` → S8

**S8: Gateways overview - enabled, with sites**
- Page title: `Gateways`, badge: `Enabled`
- `Add site` button top-right
- Table: columns `Site`, `Status`, `Gateways`, `Version`, `Last seen`, `Actions`
- Fixture rows: `nyc-prod` (Healthy, 2/2, v1.2.1, 2 min ago), `nj-dr` (Degraded, 1/2, v1.2.1, 8 min ago)
- Clicking a site row → S9

**S9: Site detail**
- Breadcrumb extends: `... / Gateways / nyc-prod`
- Page title: `nyc-prod`, badge: `Healthy`
- Two columns:
  - Left: Description list - Site name, Status, Gateways active (2/2), Deployment model (Binary), Agent version, Last seen, Allowed CIDRs
  - Right: HA pairing card - `High availability` section heading, paired site: `nj-dr`, failover status: `Ready`
- Actions: `Edit` (secondary), `Remove site` (critical/destructive button)

### Relevant Context
- [`storybook/stories/wireframes/mcsp-audit-logging/audit-logging.stories.tsx`](../../../storybook/stories/wireframes/mcsp-audit-logging/audit-logging.stories.tsx) - exact code pattern to follow
- [`storybook/stories/wireframes/_hds-primitives.tsx`](../../../storybook/stories/wireframes/_hds-primitives.tsx) - available primitive components
- [`output/06.Projects/HVD/Gateways/02. Strategy/media/gateway-routing-diagram.svg`](../02.%20Strategy/media/gateway-routing-diagram.svg) - reference for inline SVG diagram on S1

### Fixture data for `_gateway-fixtures.ts`
```
SITES = [
  { name: 'nyc-prod', status: 'healthy', gatewaysActive: 2, gatewaysTotal: 2, version: 'v1.2.1', lastSeen: '2 min ago', deploymentModel: 'binary', cidrs: ['192.168.0.0/24', '192.168.10.99/32'] },
  { name: 'nj-dr', status: 'degraded', gatewaysActive: 1, gatewaysTotal: 2, version: 'v1.2.1', lastSeen: '8 min ago', deploymentModel: 'binary', cidrs: ['10.99.0.0/24', '10.99.1.0/24'] },
]
SETUP_STEPS = [
  'Enable gateways to be deployed to each dataplane availability zone (AZ).',
  'Set up a routing table to direct traffic from each AZ to specific sites.',
  'Prepare your network to communicate with the Vault Dataplane and deploy a gateway for each site.',
]
```

---

## Sub-Task 3: Figma Make Spec (Markdown)

**Status**: [ ] pending

### Intent
Produce a full visual wireframe spec markdown file that is detailed enough for Figma Make to generate accurate layouts. Screen-by-screen, each screen describes: page structure, layout columns, every visible component with its Helios component type, exact copy, state, and any interaction annotations. This is the design handoff reference.

### Expected Outcomes
- File: `output/06.Projects/HVD/Gateways/04. Wireframes/Gateway-Figma-Make-Spec.md`
- 10 screens, each with:
  - Screen title, breadcrumb path, page dimensions note (1280px desktop)
  - Shell annotations (header content, active side nav item)
  - Layout description (single column, two column, modal overlay)
  - Component-by-component inventory with Helios component name, variant, copy, and state
  - Interaction annotations (what clicking X does)
  - Edge/error states called out per screen where they exist
- A Helios component key at the top of the document for Figma Make context

### Todo List
1. Complete Sub-Task 2 first - use the implemented stories as the source of truth for copy and layout
2. Write the Helios component key section
3. Write each screen spec in order S0-S9
4. Add a final section: `Usability test scenarios` - 3 task prompts with success criteria, keyed to screen paths

### Relevant Context
- Sub-Task 2 stories are the source of truth - spec should match what was built
- [`skill/helios-design-system/03-Components-Catalog.md`](../../../skill/helios-design-system/03-Components-Catalog.md) - Helios component names for the key section
- [`skill/helios-design-system/04-Design-Patterns.md`](../../../skill/helios-design-system/04-Design-Patterns.md) - Form patterns, table patterns to reference

---

## Implementation Order

```
Sub-Task 1 (Architecture Flow) → Sub-Task 2 (Storybook) → Sub-Task 3 (Figma Make Spec)
```

Sub-Task 3 depends on Sub-Task 2 being complete - the spec is derived from the implemented stories, not the other way around. Sub-Task 1 is independent and produces the stakeholder alignment artifact before any screen work begins.

---

## Open Questions (carried from Memo Analysis)

| # | Question | Design impact | Blocks |
|---|---|---|---|
| Q1 | Binary vs Docker - both confirmed? | S4 Radio Card, S6 tab structure | Does not block prototype; assumed both |
| Q2 | Source IP preservation mandatory? | S5 inline Alert copy | Does not block prototype; treated as required |
| Q3 | Peer limits - documented ceiling? | S8 table, S9 detail - scale warning copy | Post-prototype; placeholder copy used |
| Q4 | HA/DR pairing - automatic or configured? | S9 HA pairing section | Does not block prototype; shown as configured |
