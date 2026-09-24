# HCP Vault Dedicated — Cluster Networking / Gateways
## Prototype Specification

> **Generated from:** `src/App.tsx` + `src/components.tsx`  
> **Framework:** React 19 + Vite + Tailwind CSS v4  
> **Font:** Inter (Google Fonts)  
> **Background:** `#F5F5F5`  
> **Primary text:** `#1A1A1A`

---

## Navigation Model

The prototype is a flat state machine. A single `AppState` object drives all rendering. The `navigate()` function merges partial updates into the current state — no URL routing, no page reloads.

```ts
type AppVersion = 'V1' | 'V2'

interface AppState {
  screen:          'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8' | 'S9'
  s7State:         'pending' | 'connected' | 'failed'
  s8View:          'table' | 'topology'
  s9Site:          'nyc-prod' | 'nj-dr' | 'fl-branch'
  gatewaysEnabled: boolean
  siteAdded:       boolean
  version:         AppVersion   // default 'V2'
}
```

> **Removed fields:** `modal` (modals are rendered inline in screen components) and `deployModel` (deployment model is local state in S4/S6; the "binary" tab is always the default).

### Scenario presets

| Preset | `gatewaysEnabled` | `siteAdded` | Start screen | Use case |
|--------|-------------------|-------------|--------------|----------|
| **Day 0** | `false` | `false` | S0 | First-time setup; Gateways not yet enabled |
| **Day N** | `true`  | `true`  | S8 | Returning user; Gateways already enabled with 3 sites |

The **Scenario** toggle in the header switches instantly between presets. Switching preserves the current **Version** (V1/V2) selection.

### Happy-path flow

```
S0 (Networking overview)
 └─ Gateway card "Edit →"
     ├─ [Day 0] → S1 (Gateways landing, disabled)
     │    └─ "Enable Gateways" button → S2 (Enable gateways form — routing table)
     │              └─ "Deploy gateways" → S3 (Gateways enabled, no sites)
     │                   └─ "Add site" → S4
     └─ [Day N] → S8 (Gateways overview — sites table)
                   └─ "Add site" → S4  [V2 only]

S4 (Step 1 – Prerequisites)
 ├─ "Cancel" → S3
 └─ "Next →" → S5

S5 (Step 2 – Configure)
 ├─ "← Back" → S4
 ├─ "Cancel" → S3
 └─ "Next →" → S6

S6 (Step 3 – Install)
 ├─ "← Back" → S5
 ├─ "Cancel" → S3
 └─ "Start verification →" → S7 (pending)

S7 (Step 4 – Verify)
 ├─ [auto, 3 s] pending → connected
 ├─ "Done" → S8
 └─ "View site →" → S9 (nyc-prod)

S8 (Gateways overview)
 ├─ Table row click → S9 (site-specific)
 └─ Topology site card click → S9 (site-specific)  [V2 only]

S9 (Site detail)
 ├─ "← Gateways" → S8
 └─ "Remove site" → confirm modal → S8
```

---

## Shell

### App Header
Fixed top bar (`height: 48 px`, background `#1A1A1A`).

| Element | Detail |
|---------|--------|
| HC logo mark | Yellow square `#FFDE5A`, top-left |
| Project selector | "default-project" pill, dark `#333` |
| **Version switcher** | "V1 / V2" button pair immediately right of the project pill; active version highlighted `#FFDE5A`. Controls which prototype variant renders in S2 and S8. Switching version is independent of scenario. |
| **Scenario switcher** | "Day 0 / Day N" button pair; active state highlighted `#FFDE5A`. Preserves the current version selection when switching. |
| User avatar | Red circle, initials "AB", top-right |

### Side Navigation
Fixed left rail (`width: 224 px`, white, `border-right: #E5E5E5`), below header.

| Section | Items |
|---------|-------|
| *(back link)* | ← Back to Vault Dedicated |
| vault-cluster | Overview, Replication |
| Manage | Integrations, **Networking** (active when on any screen) |

---

## Screens

---

### S0 — Networking Overview

**Breadcrumb:** cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking

**Heading:** Networking (with vault hex icon)

**Layout:** Two-column grid (max-width 1100 px).

#### Left column — Connection security

| Card title | Badge | Description | Edit |
|------------|-------|-------------|------|
| Cluster accessibility | `success` Public | Cluster is accessible over the public internet. | Edit → (no-op) |
| IP Allow list | `success` 13 IP addresses allowed | Allow only specific source IP(s) to connect to the cluster's public network endpoint. | Edit → (no-op) |
| Proxy | `success` Enabled | Identity-based public proxy address managed by HCP… | Edit → (no-op) |
| **Gateway** | Day 0: `neutral` Disabled / Day N: `success` Enabled • 1 site | Connect your private network sites to HCP Vault using encrypted tunnels. | Edit → → **S1** (Day 0) or **S8** (Day N) |

#### Right column — Communication setup

| Card title | Badge | Description | Edit |
|------------|-------|-------------|------|
| HVN | `success` Active | HashiCorp Virtual Network is in use for this cluster. | Edit → (no-op) |
| Private link | `success` 2/2 Active | Your own DNS server(s) are used for name resolution… | Edit → (no-op) |
| Custom DNS forwarding | `warning` 3/4 Active | Your own DNS server(s) are used for name resolution… | Edit → (no-op) |
| Custom domain | `success` Enabled | Domain name to your cluster is customized to "databucks.com" | Edit → (no-op) |

---

### S1 — Gateways Landing (Disabled)

**Breadcrumb:** … / Cluster networking / Gateways

**Heading:** Gateways

**Top-right CTA:** `Enable Gateways` button (background `#0C56E9`, white text) → S2.

**Body:**
- Introductory paragraph with "Learn more about HVD gateways" link.
- **Architecture diagram** — two bordered regions ("Vault Dataplane Network" left, "Your Network Site" right) connected by a WireGuard® tunnel indicator.
  - Left: Vault Node → Dataplane Gateway (`wg0`)
  - Right: Site Gateway (`wg1`) → Database

**Set up steps** (hexagon stepper, 3 steps):

| Step | Title | Description |
|------|-------|-------------|
| 1 (active) | Enable gateways | Deploy one dataplane gateway to each availability zone (AZ). |
| 2 | Configure routing | Set up a routing table to direct traffic from each AZ to specific sites. |
| 3 | Connect your network | Prepare your network and deploy a site gateway for each private network. |

---

### S2 — Enable Gateways Form (Routing Table)

**Breadcrumb:** … / Cluster networking / Gateways

**Heading:** Enable gateways

**Body:**
- Description paragraph explaining the routing table.
- **Routing table** — editable table of private network entries, with columns and row count that differ by version (see below).

**Footer:**
| Button | Action |
|--------|--------|
| Cancel (secondary) | → S1 |
| Deploy gateways (primary) | → S3, sets `gatewaysEnabled: true` |

#### V1 vs V2 routing table layout

Both V1 and V2 use the same 4-column layout (`1fr 1fr 160px 36px`): Network site name, CIDR blocks, Gateway zone (locked/auto-assigned), delete. The Gateway zone column is read-only for both versions. The differences are:

| Aspect | V1 | V2 |
|--------|----|----|
| Pre-populated rows | **1** (single blank row with zone `us-east-1a`) | 4 (nyc, nj, fl, ga) |
| "Add network" link | **Hidden** | Visible |
| Column count | 4 | 4 |
| Grid template | `1fr 1fr 160px 36px` | `1fr 1fr 160px 36px` |
| Max container width | `800px` | `800px` |

**V1 pre-populated row:**

| Name | CIDRs | Gateway zone |
|------|-------|-------------|
| (blank) | (blank) | us-east-1a (locked) |

**V2 pre-populated rows:**

| Name | CIDRs | Gateway zone |
|------|-------|-------------|
| nyc | 192.168.0.0/24, 192.168.10.99/32 | us-east-1a |
| nj | 10.99.0.0/24, 10.99.1.0/24 | us-east-1a |
| fl | 192.34.0.0/24 | us-east-1b |
| ga | 10.15.0.0/24, 10.15.1.0/24 | us-east-1b |

---

### S3 — Gateways Enabled, No Sites

**Breadcrumb:** … / Cluster networking / Gateways

**Heading:** Gateways + `success` Enabled badge

**Top-right CTA:** `Add site` → S4

**Body (top to bottom):**
1. `success` Alert: "Gateways enabled" — Dataplane gateways are active in each AZ. Add a site to connect your first private network.
2. **Dataplane Health Strip** — V1: 1 AZ pill (`us-east-1a`); V2: 4 pills (`us-east-1a`, `us-east-1b`, `us-east-1c`, `us-east-1d`). Each pill shows a green "Healthy" checkmark.
3. **Empty state** — "No sites configured" — "Add your first gateway site to connect a private network to HCP Vault." — `Add site` → S4.

---

### S4 — Add Site: Step 1 of 4 — Prerequisites

**Breadcrumb:** … / Gateways / Add site

**Heading:** Add site

**Step indicator:** 4-pip progress bar — Prerequisites / Configure / Install / Verify — Step 1 active.

**Body:**
- Sub-heading: "Prerequisites"
- Description: "Confirm your environment meets these requirements before adding a site. The gateway agent runs as a Docker container inside your network."
- 10-item advisory checklist (checkboxes, not hard-gated):

| Requirement | Learn more |
|-------------|-----------|
| Linux host — kernel ≥ 5.8 | Link |
| Docker runtime installed | Link |
| Host networking (--network host) | Link |
| NET_ADMIN capability | Link |
| SYS_MODULE capability | Link |
| Compute: 8 GB RAM, 20 GB storage | — |
| Outbound HTTPS allowed | — |
| Outbound UDP 51820 allowed | — |
| Public DNS resolution | — |
| HCP service principal created | Link |

- If "Next →" is clicked with any unchecked items: a `warning` Alert appears inline — "Some prerequisites are unchecked." with "Continue anyway" secondary button.

**Footer:**
| Button | Action |
|--------|--------|
| Cancel (secondary) | → S3 |
| Next → (primary) | → S5 (or shows warning if items unchecked) |
| Continue anyway (secondary, conditional) | → S5 regardless |

---

### S5 — Add Site: Step 2 of 4 — Configure

**Breadcrumb:** … / Gateways / Add site

**Heading:** Add site

**Step indicator:** Step 2 active.

**Form fields:**

| Field | Type | Required | Helper text |
|-------|------|----------|-------------|
| Site name | Text | Yes | A label for this network site. Used to identify the gateway in routing rules and logs. |
| Service principal client ID | Text (mono) | Yes | From the HCP service principal created for this gateway. |
| Service principal client secret | Password (mono) | Yes | Store this value securely. It will not be shown again after setup. |
| Network site CIDRs | Textarea | No | One CIDR per line. These become your VPC routing table entries… |

**Alert:** `neutral` — "Source IP addresses are preserved in Vault audit logs."

**Footer:**
| Button | Action |
|--------|--------|
| ← Back (text link with left-arrow icon) | → S4 |
| Cancel (secondary) | → S3 |
| Next → (primary) | → S6 |

---

### S6 — Add Site: Step 3 of 4 — Install

**Breadcrumb:** … / Gateways / Add site

**Heading:** Add site

**Step indicator:** Step 3 active.

**Content:** Single section — "Run the gateway container" — one `docker run` `CodeBlock`:

```
docker run -d \
  --name vault-gateway \
  --network host \
  --cap-add NET_ADMIN \
  --cap-add SYS_MODULE \
  -e HCP_ORGANIZATION_ID=[org-id] \
  -e HCP_PROJECT_ID=[project-id] \
  -e HCP_CLUSTER_ID=[cluster-id] \
  -e HCP_CLIENT_ID=[client-id] \
  -e HCP_CLIENT_SECRET=[client-secret] \
  hashicorp/hcp-vault-gateway:[version]
```

Code block has a **Copy** button.

**Alert:** `neutral` — "Keep the agent running before proceeding to verification."

**Footer:**
| Button | Action |
|--------|--------|
| ← Back (text link with left-arrow icon) | → S5 |
| Cancel (secondary) | → S3 |
| Start verification → (primary) | → S7 (s7State: pending) |

---

### S7 — Add Site: Step 4 of 4 — Verify

**Breadcrumb:** … / Gateways / Add site

**Heading:** Add site

**Step indicator:** Step 4 active.

The card content changes based on `s7State`:

#### State: `pending`
- Spinning ring animation.
- "Waiting for connection…"
- Body copy: "Keep the gateway agent running. This page will update automatically when a connection is established."
- Hidden facilitator link: "Simulate connection failure" → sets `s7State: failed`.
- **Auto-advances to `connected` after 3 seconds.**

#### State: `connected`
- Green checkmark circle (`#E8F7EE` bg, `#1A7F4B` border).
- "Connected"
- "Site **nyc-prod** is active and healthy."
- Two-row check list inside a bordered box:
  - Site gateway → `success` Connected
  - Primary dataplane → `success` Active

| Button | Action |
|--------|--------|
| Done (secondary) | → S8, `gatewaysEnabled: true` |
| View site → (primary) | → S9 (nyc-prod), `gatewaysEnabled: true` |

#### State: `failed`
- "Connection not established"
- `warning` Alert: "No tunnel detected after 5 minutes."
- Three failure categories with explanations:
  - Agent not authenticated
  - Tunnel interface not established
  - Network block

| Button | Action |
|--------|--------|
| Exit without saving (tertiary) | → S8 |
| Retry verification (secondary) | → S7 (s7State: pending) |

---

### S8 — Gateways Overview

**Breadcrumb:** … / Cluster networking / Gateways

**Heading:** Gateways + `success` Enabled badge

#### V1 vs V2 top-right controls

| Control | V1 | V2 |
|---------|----|----|
| Table/Topology toggle | **Hidden** | Visible — inline Table / Topology segmented button (switches `s8View`) |
| Add site button | **Hidden** (V1 single-site model) | Visible — `Add site` → S4 |

#### Dataplane Gateways strip (both versions)

An `inline-flex` strip displayed below the header. AZ chips differ by version:

| Version | Chips shown | Labels |
|---------|------------|--------|
| **V1** | **1 chip**: `us-east-1a` | No label |
| **V2** | 4 chips: `us-east-1a`, `us-east-1b`, `us-east-1c`, `us-east-1d` | No labels |

#### Table view (`s8View: 'table'`)

Columns: **Site | Status | Site gateway | Dataplane | Last seen | Actions** (each column separated by a vertical `#E5E5E5` divider). Actions cell shows a horizontal ⋯ kebab trigger in a bordered container.

**V1 table rows (1 row):**

| Site | Status | Site gateway | Dataplane | Last seen | Actions |
|------|--------|-------------|-----------|-----------|---------|
| nyc-prod *(link → S9)* | `success` Healthy | 2/2 | us-east-1a | 2 min ago | ⋯ |

**V2 table rows (3 rows):**

| Site | Status | Site gateway | Dataplane | Last seen | Actions |
|------|--------|-------------|-----------|-----------|---------|
| nyc-prod *(link → S9)* | `success` Healthy | 2/2 | us-east-1a | 2 min ago | ⋯ |
| nj-dr *(link → S9)* | `warning` Degraded | 1/2 | us-east-1b | 8 min ago | ⋯ |
| fl-branch *(link → S9)* | `offline` Not connected | — | — | Never | ⋯ |

Expandable row alerts (V2 only, expanded by default):
- nj-dr row expand → `warning`: "nj-dr is degraded — Backup gateway unreachable." / "Your tunnel is active but failover protection is unavailable."
- fl-branch row expand → `neutral`: "fl-branch has not connected — The gateway agent has not established a tunnel." / "Verify the agent is running and outbound UDP 51820 is open."

**Actions kebab menu** (order: Remove → Edit):

| Item | Style | Action |
|------|-------|--------|
| Remove | Destructive red | Opens remove confirmation modal → navigates to S1 (`gatewaysEnabled: false`) |
| Edit | Default | No-op |

#### Topology view (`s8View: 'topology'`) — V2 only

Three-column layout:

The topology uses `TopologyView` → `AzGroupRow` components. Sites are grouped by AZ. Unrouted/disconnected sites (`az: -1`) appear at the top with a stub dashed connector and `?` indicator.

**Column headers:** "Site Gateways" (left) and "Dataplane Gateways" (right, 256 px fixed width).

**Unrouted sites (top section):** `mia-dr` — `offline` Not connected — "◆ No routing configured for this site"

**AZ groups** (one row per AZ that has connected sites):

| AZ | Sites in group |
|----|---------------|
| us-east-1a | nyc-prod (Healthy), nj-dr (Degraded — "◆ Gateway unresponsive, last heard 2026-07-14 04:59 UTC"), bos-dev (Healthy) |
| us-east-1b | atl-corp (Healthy), fl-branch (Healthy), chi-hq (Degraded — "◆ Packet loss detected on tunnel interface") |
| us-east-1c | dal-dc (Healthy), la-west (Healthy) |
| us-east-1d | sea-edge (Healthy) |

Each AZ card shows: AZ name, `success` Healthy badge, site count, degraded count (amber if > 0).

**Connector lines:** Measured at runtime via `getBoundingClientRect` + `ResizeObserver`. Healthy = solid `#CCCCCC`; Degraded = dashed `#B08000` 4 3 pattern.

---

### S9 — Site Detail

**Breadcrumb:** … / Gateways / {site}

**Heading:** {site} + status badge

**Top-right (left to right):**
- Remove site (critical) → opens remove confirmation modal
- ← Gateways (secondary) → S8
- Edit (secondary, no-op)

Three site variants share the same layout. Content differences below.

The S9 layout is a 2-column grid (max-width 980 px). Column widths: `1fr 320px`. Two rows:
- Row 1: Site gateway card (left) + Disaster recovery card or Gateway agent card (right, version-dependent)
- Row 2: Topology card (left) + Gateway agent card (right, V2 only)

**V1 layout:** Row 1 Right = Gateway agent card (no DR card). Row 2 Right = empty.
**V2 layout:** Row 1 Right = Disaster recovery card (hidden for fl-branch). Row 2 Right = Gateway agent card.

#### Variant: `nyc-prod` — Healthy

**Alert:** none

**Site gateway card (left):**

| Field | Value |
|-------|-------|
| Site name | `nyc-prod` (mono) |
| Status | `success` Healthy |
| Last seen | 2 min ago |
| Network site CIDRs | `192.168.0.0/24 · 192.168.10.99/32` (mono) |

**Disaster recovery card (V2, Row 1 Right):**

| Field | Value |
|-------|-------|
| Primary gateway | us-east-1a — `success` Active |
| Backup gateway | us-east-1b — `neutral` Ready |
| (footer copy) | "Failover is automatic. If the primary gateway becomes unreachable, your connection will route through the backup." |

---

#### Variant: `nj-dr` — Degraded

**Alert:** `warning` — "Gateway unresponsive — last heard 2025-07-14 04:59:00 UTC" — 1 of 2 gateways active. Check that the gateway agent is running in all configured availability zones. Verify outbound UDP port 51820 is open.

**Site gateway card (left):**

| Field | Value |
|-------|-------|
| Site name | `nj-dr` (mono) |
| Status | `warning` Degraded |
| Last seen | **2025-07-14 04:59 UTC** (amber) |
| Network site CIDRs | `10.99.0.0/24 · 10.99.1.0/24` (mono) |

**Disaster recovery card (V2, Row 1 Right):**

| Field | Value |
|-------|-------|
| Primary gateway | us-east-1a — `success` Active |
| Backup gateway | us-east-1b — `warning` Down |
| (footer copy) | "Failover is automatic…" |

---

#### Variant: `fl-branch` — Not connected

**Alert:** `neutral` — "No tunnel established." — The gateway agent has not connected yet. Verify the agent is running and can reach HCP on outbound UDP port 51820.

**Site gateway card (left):**

| Field | Value |
|-------|-------|
| Site name | `fl-branch` (mono) |
| Status | `offline` Not connected |
| Last seen | Never |
| Network site CIDRs | `192.34.0.0/24` (mono) |

**Disaster recovery card:** not shown for fl-branch (replaced by empty `<div />`).

---

#### Topology card (Row 2 Left, all variants)

```
[Site Gateway box]  ──── Encrypted tunnel ────  [Dataplane us-east-1a  Active]
                                                 [Dataplane us-east-1b  Standby]  ← V2 only
```

- fl-branch: dashed grey line with `?` circle and "No tunnel established" label.
- nyc-prod / nj-dr: solid green line to us-east-1a Active; V2 adds dashed grey L-shape to us-east-1b Standby/Unresponsive (rendered behind the solid line, z-index: 1 on solid).
- V1: only Active gateway box shown; Standby/Backup box hidden.

#### Gateway agent card

- "The gateway agent runs inside your network. You are responsible for deployment and updates."
- View install instructions (secondary sm) → opens **Install slide-over** panel.
- View update instructions (secondary sm, no-op).
- Version chip: `Current: v1.2.1` with "New version available" notice (amber).

#### Remove site modal

- **Title:** Remove {site}? (top border `#5C1111`)
- `warning` Alert: "This action will tear down the encrypted tunnel and remove the gateway." — All traffic interrupted immediately. The site gateway agent will be deauthorized and the dataplane gateway removed. Gateways must be re-enabled to reconnect. This cannot be undone.
- Text confirmation input: user must type `remove` (case-insensitive) to enable the Remove button.
- Cancel → closes modal.
- Remove (critical, enabled only after confirmation) → closes modal → **S1** (`gatewaysEnabled: false`, `siteAdded: false`).

#### Install slide-over panel

Right-side drawer (`width: 580 px`, overlays content, backdrop closes it).

- Header: "Install instructions" + × close button.
- Body: same Docker `docker run` install content as S6 (single code block, no tabs).

---

## Helios Component Reference

| Component | Variants / Props | Used in |
|-----------|-----------------|---------|
| `Badge` | `neutral`, `success`, `warning`, `critical`, `offline` | All screens |
| `Button` | `primary`, `secondary`, `critical`, `tertiary`; size `default`/`sm` | All screens |
| `Alert` | `neutral`, `warning`, `success` | S3, S4, S5, S6, S7, S8, S9 |
| `Card` | configurable `padding` prop | S7, S9 |
| `FormField` | `text`, `password`, `textarea`; `mono`, `required` | S5 |
| `CodeBlock` | Copy-to-clipboard button | S6, S9 slide-over |
| `StepIndicator` | `current`, `steps[]`, optional `onStepClick` | S4, S5, S6, S7 |
| `NetworkCard` | `badge`, `description`, optional `onEdit` | S0 |
| `EmptyState` | optional `icon`, optional `image`, optional `cta` | S3 |
| `DataplaneHealthStrip` | array of AZ strings | S3 |
| `DescriptionList` | array of `{label, value}` | S9 |
| View dropdown | Inline dropdown: "Table" / "Topology" (V2 only, replaces ViewToggle) | S8 |
| `Disclosure` | collapsible, optional `label` | S5 |
| `Breadcrumb` | array of `{label, onClick?}` | All screens |
| `Modal` | optional `topBorderColor` | Enable Gateways, Remove site |
| `SetupStepper` | 3-step hexagon stepper (Figma import) | S1 |

---

## Usability Test Scenarios

### Task 1 — Enable Gateways (Day 0)
**Setup:** Start on S0 in Day 0 scenario (Gateway shows "Disabled").

**Prompt:** "Your team wants to connect a private data center to HCP Vault without exposing it to the public internet. Where would you start, and how would you enable that connection?"

**Expected path:** S0 → Gateway card Edit → S1 → Enable Gateways → S2 → Deploy gateways → S3.

---

### Task 2 — Add a site (Day 0, continuing from Task 1)
**Setup:** Continue from S3 (Gateways enabled, no sites).

**Prompt:** "Gateways are now enabled. Go ahead and add your first network site."

**Expected path:** S3 → Add site → S4 → S5 → S6 → S7 (auto-connects) → S8.

**Observer notes:** Watch for hesitation on the prerequisites checklist (S4), CIDR field (S5), and the install command (S6).

---

### Task 3 — Diagnose a degraded site (Day N)
**Setup:** Start on S0 in Day N scenario. Navigate to S8 or enter from Gateway card.

**Prompt:** "You've just received an alert that one of your gateway sites is degraded. Take a look and tell me what you'd do next."

**Expected path:** S0 → Gateway card Edit → S8 → nj-dr row → S9 (nj-dr) → reads alert, HA card.

---

### Task 4 — Remove a site (Day N)
**Setup:** On S8 or S9 for any site.

**Prompt:** "The fl-branch office is closing. Remove that gateway site."

**Expected path:** S8 → fl-branch → S9 (fl-branch) → Remove site → confirm modal → Remove site → S8.

**Observer notes:** Does the participant notice the warning about traffic interruption before confirming?

---

*End of specification.*
