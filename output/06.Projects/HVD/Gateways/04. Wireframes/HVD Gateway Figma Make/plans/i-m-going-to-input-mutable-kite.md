# Plan: Generate UI Documentation Markdown File

## Context

The user wants a comprehensive markdown document describing the HCP Vault Dedicated "Cluster Networking / Gateways" UI prototype built in `src/App.tsx`. The file should document the full screen flow, state model, navigation map, component inventory, and data constants so the prototype can be understood, shared, or handed off without reading source code.

---

## Output File

Create a new file: **`docs/UI_Overview.md`**
Path: `/workspaces/default/code/docs/UI_Overview.md`

No existing source files are changed.

---

## Document Structure

### 1. Overview
Brief product context — what this prototype represents (HCP Vault Dedicated, Cluster Networking section, Gateways feature), Day 0 vs Day N scenario toggle.

### 2. Screen Flow Diagram
Mermaid `flowchart TD` of the navigation graph (S0–S9 + scenario toggle). Include all navigation targets documented below.

### 3. Global State
Table of all `AppState` fields:

| Field | Type | Default (Day 0) | Purpose |
|---|---|---|---|
| `screen` | `'S0'`–`'S9'` | `'S0'` | Active screen |
| `modal` | `null \| 'enable-gateways'` | `null` | Open modal |
| `deployModel` | `'binary' \| 'docker'` | `'binary'` | Deployment method |
| `s7State` | `'pending' \| 'connected' \| 'failed'` | `'pending'` | Verification step |
| `s8View` | `'table' \| 'topology'` | `'table'` | Gateways list view |
| `s9Site` | `string` | `'nyc-prod'` | Active site detail |
| `gatewaysEnabled` | `boolean` | `false` | Drives S0 badge + routing |

### 4. Screens (one `##` section per screen, S0–S9)

For each screen include:
- **Purpose** — one sentence
- **Breadcrumb path**
- **Key UI elements** — bullet list of major sections/components
- **Local state** (if any)
- **Navigation targets** — where each action goes

Screens to document:
- **S0** — Networking Overview (NetworkCard grid, gateway card dynamic badge)
- **S1** — Gateways Landing (ArchDiagram SVG, SetupStepper, Enable Gateways CTA)
- **S2** — Enable Gateways Form (AZ list, tunnel life dropdown, routing table text/JSON)
- **S3** — Gateways Enabled / No Sites (health strip, EmptyState)
- **S4** — Add Site: Deployment Model (RadioCard step 1)
- **S5** — Add Site: Configure (FormField step 2, tunnel life, Disclosure)
- **S6** — Add Site: Install Instructions (InstallContent tabs step 3)
- **S7** — Add Site: Verify Connection (auto-advance after 3s, three sub-states: pending/connected/failed)
- **S8** — Gateways Overview (dataplane health strip, table view, topology view, ViewToggle)
- **S9** — Site Detail (DescriptionList, HA card, site topology diagram, Remove modal, InstallSlideOver)

### 5. Sub-components
Table of non-trivial sub-components defined in `src/App.tsx`:

| Component | Used in | Purpose |
|---|---|---|
| `SetupStepper` | S1 | 3-step hexagon stepper |
| `ArchDiagram` | S1 | Inline SVG architecture diagram |
| `InstallContent` | S6, InstallSlideOver | Tabbed Binary/Docker install code blocks |
| `InstallSlideOver` | S9 | Right-side slide-over panel wrapping InstallContent |
| `AzGroupRow` | TopologyView | One AZ group: site cards + SVG connector + AZ card (uses DOM measurement) |
| `TopologyView` | S8 | Grouped topology: disconnected sites + per-AZ rows |

### 6. Component Library (from `src/components.tsx`)
Brief table of imported components: `Badge`, `Button`, `Alert`, `Card`, `FormField`, `RadioCard`, `CodeBlock`, `Tabs`, `StepIndicator`, `NetworkCard`, `EmptyState`, `DataplaneHealthStrip`, `DescriptionList`, `ViewToggle`, `Disclosure`, `Breadcrumb`, `Modal`.

### 7. Key Data Constants
- `GATEWAY_AZS` / `AZS` — 4 availability zones
- `DEFAULT_NETWORKS` — 4 pre-filled routing table rows (name, CIDRs, zone)
- `TOPOLOGY_SITES` — 10 sites table (name, CIDRs, health badge, AZ index)
- `DAY0` / `DAYN` — scenario preset objects

### 8. Design Tokens
Notable colours used throughout:
| Token | Hex | Usage |
|---|---|---|
| Healthy green | `#006619` / `#CCEEDA` | Success pill text / background |
| Degraded amber | `#8A4F00` | Warning text, dashed connector |
| Critical red | `#C00005` | Error connector, critical state |
| Vault amber | `#9A6F00` / `#B08000` | Vault logo, AZ triangle icon |
| Border | `#E5E5E5` | Card / chip borders |
| Muted text | `#737373` | Labels, secondary text |

---

## Verification

Open the generated file and confirm:
1. All 10 screens (S0–S9) have their own section
2. The Mermaid flowchart is valid (renders in GitHub / VS Code preview)
3. `TOPOLOGY_SITES` table has all 10 sites with correct AZ assignments and health labels
4. No broken markdown syntax (mismatched backticks, unclosed tables)
