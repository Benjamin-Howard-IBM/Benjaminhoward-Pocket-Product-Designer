# HCP Vault Dedicated — Cluster Networking / Gateways
## V1 Prototype Specification

> **Version:** V1
> **Generated from:** `src/App.tsx` + `src/components.tsx`
> **Framework:** React 19 + Vite + Tailwind CSS v4
> **Font:** Inter (Google Fonts)
> **Background:** `#F5F5F5`
> **Primary text:** `#1A1A1A`

---

## Navigation Model

The prototype is a flat state machine. A single `AppState` object drives all rendering. The `navigate()` function merges partial updates into the current state — no URL routing, no page reloads.

```ts
interface AppState {
  screen:          'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8' | 'S9'
  s7State:         'pending' | 'connected' | 'failed'
  s8View:          'table' | 'topology'
  s9Site:          'nyc-prod' | 'nj-dr' | 'fl-branch'
  gatewaysEnabled: boolean
  siteAdded:       boolean
}
```

### Scenario presets

| Preset | `gatewaysEnabled` | `siteAdded` | Start screen | Use case |
|--------|-------------------|-------------|--------------|----------|
| **Day 0** | `false` | `false` | S0 | First-time setup; Gateways not yet enabled |
| **Day N** | `true` | `true` | S8 | Returning user; Gateways enabled with 1 site |

The **Scenario** toggle in the header (top-right) switches instantly between presets.

### Happy-path flow

```
S0 (Networking overview)
 └─ Gateway card "Edit →"
     ├─ [Day 0] → S1 (Gateways landing)
     │    └─ "Enable Gateways" → S2 (Enable form)
     │         └─ "Deploy gateways" → S3 (Enabled, no sites)
     │              └─ "Add site" → S4
     └─ [Day N] → S8 (Gateways overview)

S4 (Step 1 – Prerequisites)
 └─ "Next →" → S5

S5 (Step 2 – Configure)
 └─ "Next →" → S6

S6 (Step 3 – Install)
 └─ "Start verification →" → S7 (pending)

S7 (Step 4 – Verify)
 ├─ [auto, 3 s] pending → connected
 ├─ "Done" → S8
 └─ "View site →" → S9 (nyc-prod)

S8 (Gateways overview)
 └─ Table row click → S9 (site-specific)

S9 (Site detail)
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
| **Scenario switcher** | "Day 0 / Day N" button pair; active state highlighted `#FFDE5A` |
| User avatar | Red circle, initials "AB", top-right |

### Side Navigation

Fixed left rail (`width: 224 px`, white, `border-right: #E5E5E5`), below header.

| Section | Items |
|---------|-------|
| *(back link)* | ← Back to Vault Dedicated |
| vault-cluster | Overview, Replication |
| Manage | Integrations, **Networking** (active on all gateway screens) |

---

## Screens

---

### S0 — Networking Overview

**Breadcrumb:** cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking

**Heading:** Networking (with vault hex icon)

**Layout:** Two-column grid (`max-width: 1100 px`).

#### Left column — Connection security

| Card title | Badge | Description | Edit |
|------------|-------|-------------|------|
| Cluster accessibility | `success` Public | Cluster is accessible over the public internet. | Edit → (no-op) |
| IP Allow list | `success` 13 IP addresses allowed | Allow only specific source IP(s) to connect to the cluster's public network endpoint. | Edit → (no-op) |
| Proxy | `success` Enabled | Identity-based public proxy address managed by HCP. | Edit → (no-op) |
| **Gateway** | Day 0: `neutral` Disabled / Day N: `success` Enabled · 1 site | Connect your private network to HCP Vault using an encrypted tunnel. | Edit → → **S1** (Day 0) or **S8** (Day N) |

#### Right column — Communication setup

| Card title | Badge | Description | Edit |
|------------|-------|-------------|------|
| HVN | `success` Active | HashiCorp Virtual Network is in use for this cluster. | Edit → (no-op) |
| Private link | `success` 2/2 Active | Private link connections are active. | Edit → (no-op) |
| Custom DNS forwarding | `warning` 3/4 Active | Your own DNS server(s) are used for name resolution. | Edit → (no-op) |
| Custom domain | `success` Enabled | Domain name customized to "databucks.com". | Edit → (no-op) |

---

### S1 — Gateways Landing

**Breadcrumb:** … / Cluster networking / Gateways

**Heading:** Gateways

**Top-right CTA:** `Enable Gateways` button (background `#0C56E9`, white text) → S2

**Body:**
- Introductory paragraph: "Connect your private network to HCP Vault using outbound encrypted tunnels. No inbound ports are required on your network."
- "Learn more about HVD Gateways" link.
- **Architecture diagram** — inline SVG (`643 × 262 px`), two bordered regions ("Vault Dataplane Network" left, "Your Network Site" right) connected by an "Encrypted tunnel" label.
  - Left: Vault Node → Dataplane Gateway
  - Right: Site Gateway → Database
  - No WireGuard terminology. No interface names.

**Setup stepper** (hexagon stepper, 3 steps):

| Step | Title | Description |
|------|-------|-------------|
| 1 (active) | Enable gateways | Deploy one dataplane gateway to each availability zone. |
| 2 | Configure routing | Set up a routing table to direct traffic from each AZ to specific sites. |
| 3 | Connect your network | Deploy a site gateway in your private network. |

---

### S2 — Enable Gateways Form

**Breadcrumb:** … / Gateways / Enable gateways

**Heading:** Enable gateways

**Section A — Deploy dataplane gateways:**

- `Disclosure` (collapsed by default) — label: "Availability zones"
  - Expanded content: list of 4 AZs that will receive a dataplane gateway: `us-east-1a`, `us-east-1b`, `us-east-1c`, `us-east-1d`
  - Helper text below list: "Dataplane gateways are deployed and managed by HCP. You cannot modify availability zone selection."

**Section B — Set up gateway routing table:**

- Section heading: "Gateway routing table"
- Helper text: "Define the networks that will route traffic through the gateway. These entries become your dataplane VPC routing table."
- Radio toggle: **Text fields** (default) / **JSON editor**

**Text mode** — one row per network:

| Column | Type | Detail |
|--------|------|--------|
| Name | Text input | Network label, e.g. "nyc" |
| CIDRs | Text input | Comma-separated, e.g. "192.168.0.0/24, 192.168.10.99/32" |
| AZ zone | `<select>` | Options: us-east-1a / us-east-1b / us-east-1c / us-east-1d |
| Delete | Icon button | Removes row |

"+ Add network" link appends a blank row.

**Default rows pre-populated:**

| Name | CIDRs | Zone |
|------|-------|------|
| nyc | 192.168.0.0/24, 192.168.10.99/32 | us-east-1a |
| nj | 10.99.0.0/24, 10.99.1.0/24 | us-east-1a |
| fl | 192.34.0.0/24 | us-east-1b |
| ga | 10.15.0.0/24, 10.15.1.0/24 | us-east-1b |

**JSON mode** — dark code editor with line numbers and `<textarea>`. HCL-style syntax.

**Footer:**

| Button | Action |
|--------|--------|
| Cancel (secondary) | → S1 |
| Deploy gateways (primary) | → S3, sets `gatewaysEnabled: true` |

---

### S3 — Gateways Enabled, No Sites

**Breadcrumb:** … / Cluster networking / Gateways

**Heading:** Gateways + `success` Enabled badge

**Top-right CTA:** `Add site` → S4

**Body (top to bottom):**

1. `success` Alert: "Gateways enabled — Dataplane gateways are active in each availability zone. Add a site to connect your first private network."
2. **Dataplane health strip** — Vault logo tile · "Dataplane Gateways" label · 4 AZ chips each with green `Healthy` pill: `us-east-1a`, `us-east-1b`, `us-east-1c`, `us-east-1d`.
3. **Empty state** — "No sites configured" — "Add your first gateway site to connect a private network to HCP Vault." — `Add site` button → S4.

---

### S4 — Add Site: Step 1 of 4 — Prerequisites

**Breadcrumb:** … / Gateways / Add site

**Heading:** Add site

**Step indicator:** 4 steps — **Prerequisites** (active), Configure, Install, Verify

**Sub-heading:** "Before you begin, confirm your environment meets these requirements."

**Prerequisites checklist:**

| # | Requirement | Learn more |
|---|-------------|------------|
| ☐ | Linux host with kernel version 5.8 or higher | [Learn more →] |
| ☐ | Docker runtime installed and running | [Learn more →] |
| ☐ | Container will run with `--network host` | [Learn more →] |
| ☐ | `NET_ADMIN` capability available | [Learn more →] |
| ☐ | `SYS_MODULE` capability available | [Learn more →] |
| ☐ | Host has at least 8 GB RAM and 20 GB storage | — |
| ☐ | Outbound HTTPS to HCP platform endpoints is open | — |
| ☐ | Outbound UDP port 51820 is open | — |
| ☐ | Public DNS resolution is available | — |
| ☐ | HCP service principal with gateway permissions has been created | [Learn more →] |

**Soft warning** (shown only if user clicks Next with any unchecked items):

`warning` Alert: "You have unconfirmed requirements. Proceeding may result in a failed connection at the verification step."

**Footer:**

| Button | Action |
|--------|--------|
| Cancel (secondary) | → S3 |
| Next → (primary) | → S5 (always enabled) |

---

### S5 — Add Site: Step 2 of 4 — Configure

**Breadcrumb:** … / Gateways / Add site

**Heading:** Add site

**Step indicator:** Step 2 of 4 active.

**Form fields:**

| Field | Type | Required | Helper text |
|-------|------|----------|-------------|
| Site name | Text | Yes | A label for this network site. Used to identify the gateway in routing rules and logs. |
| Service principal client ID | Text (monospace) | Yes | From the HCP service principal created for this gateway. |
| Service principal client secret | Password (monospace) | Yes | Store this value securely. It will not be shown again after setup. |
| Network site CIDRs | Select + textarea | No | Select a network from your routing table to auto-populate, or enter CIDRs manually. One CIDR per line. |

**Network site CIDRs field detail:**
- Dropdown above textarea: "Select from routing table" — lists named networks from S2 (nyc, nj, fl, ga). Selecting one pre-fills the textarea with that network's CIDRs.
- Textarea remains editable after auto-population.

**Alert:** `neutral` — "Source IP addresses are preserved in Vault audit logs."

**Footer:**

| Button | Action |
|--------|--------|
| ← Back (secondary) | → S4 |
| Next → (primary) | → S6 |

---

### S6 — Add Site: Step 3 of 4 — Install

**Breadcrumb:** … / Gateways / Add site

**Heading:** Add site

**Step indicator:** Step 3 of 4 active.

**Sub-heading:** "Run the gateway agent in your environment."

**Install steps — Docker:**

**Step 1 — Pull the gateway image**

```bash
docker pull hashicorp/hcp-vault-gateway:v1.2.1
```

Each code block has a **Copy** button (top-right corner).

**Step 2 — Run the gateway container**

```bash
docker run -d \
  --name vault-gateway \
  --network host \
  --cap-add NET_ADMIN \
  --cap-add SYS_MODULE \
  -e HCP_ORGANIZATION_ID=<your-org-id> \
  -e HCP_PROJECT_ID=<your-project-id> \
  -e HCP_CLUSTER_ID=<your-cluster-id> \
  -e HCP_CLIENT_ID=<your-client-id> \
  -e HCP_CLIENT_SECRET=<your-client-secret> \
  hashicorp/hcp-vault-gateway:v1.2.1
```

Each code block has a **Copy** button (top-right corner).

**Alert:** `neutral` — "Keep the agent running before proceeding to verification."

**Footer:**

| Button | Action |
|--------|--------|
| ← Back (secondary) | → S5 |
| Start verification → (primary) | → S7 (`s7State: pending`) |

---

### S7 — Add Site: Step 4 of 4 — Verify

**Breadcrumb:** … / Gateways / Add site

**Heading:** Add site

**Step indicator:** Step 4 of 4 active.

Card content changes based on `s7State`:

#### State: `pending`

- Spinning ring animation (centred).
- "Waiting for connection…"
- Body: "Keep the gateway agent running. This page will update automatically when a connection is established."
- Facilitator link (small, muted): "Simulate connection failure" → sets `s7State: failed`.
- **Auto-advances to `connected` after 3 seconds.**

#### State: `connected`

- Green checkmark circle (`#E8F7EE` background, `#1A7F4B` border).
- Heading: "Connected"
- "[site-name] is active and healthy."
- Two rows of status:
  - Site gateway: `success` Connected
  - Primary dataplane: `success` Active

| Button | Action |
|--------|--------|
| Done (secondary) | → S8, `gatewaysEnabled: true`, `siteAdded: true` |
| View site → (primary) | → S9 (`s9Site: 'nyc-prod'`), `gatewaysEnabled: true`, `siteAdded: true` |

#### State: `failed`

- Heading: "Connection not established"
- `warning` Alert: "No tunnel detected after 5 minutes."
- Three diagnostic sections:

**Agent not authenticated**
"The gateway agent could not authenticate with HCP. Verify your service principal client ID and secret are correct and have gateway permissions."

**Tunnel interface not established**
"The encrypted tunnel interface may not have started. Verify the container is running with `--network host`, `--cap-add NET_ADMIN`, and `--cap-add SYS_MODULE`. Verify Linux kernel version is 5.8 or higher."

**Network block**
"The tunnel could not reach the dataplane gateway. Verify outbound UDP port 51820 is open to the dataplane gateway public IP."

| Button | Action |
|--------|--------|
| Exit without saving (tertiary) | → S8 |
| Retry verification (secondary) | → S7 (`s7State: pending`) |

---

### S8 — Gateways Overview

**Breadcrumb:** … / Cluster networking / Gateways

**Heading:** Gateways + `success` Enabled badge

**Top-right controls:**
- **ViewToggle:** `≡ Table` | `⬡ Topology` (switches `s8View`)
- `Add site` button → S4 *(visible only when `siteAdded: false`)*

**Dataplane health strip:** Vault logo tile · "Dataplane Gateways" label · 4 AZ chips with green `Healthy` pills.

#### Table view (`s8View: 'table'`)

Columns: Site, Status, Site gateway, Dataplane, Last seen, Actions

| Site | Status | Site gateway | Dataplane | Last seen | Actions |
|------|--------|--------------|-----------|-----------|---------|
| nyc-prod *(link → S9)* | `success` Healthy | `success` Connected | Primary: `success` Active · Backup: `success` Ready | 2 min ago | Edit |
| nj-dr *(link → S9)* | `warning` Degraded | `success` Connected | Primary: `success` Active · Backup: `warning` Down | 2025-07-14 04:59 UTC | Edit |
| fl-branch *(link → S9)* | `offline` Not connected | `offline` Not connected | Primary: `success` Active · Backup: `success` Ready | Never | Edit |

Alerts below table:
- `warning`: "nj-dr is degraded — Backup gateway unreachable. Your tunnel is active but failover protection is unavailable."
- `neutral`: "fl-branch has not connected — The gateway agent has not established a tunnel. Verify the agent is running and outbound UDP port 51820 is open."

#### Topology view (`s8View: 'topology'`)

Three-column layout:

**Left — Site Gateways** (clickable cards → S9):

| Site | CIDRs | Status |
|------|-------|--------|
| nyc-prod | 192.168.0.0/24, 192.168.10.99/32 | `success` Healthy |
| nj-dr | 10.99.0.0/24, 10.99.1.0/24 | `warning` Degraded |
| fl-branch | 192.34.0.0/24 | `offline` Not connected |

**Center — SVG connector lines:**
- nyc-prod → us-east-1a: solid `#CCCCCC` 1.5 px
- nj-dr → us-east-1a: dashed `4 3` `#B08000` 1.5 px
- fl-branch → dangling dashed `5 3` `#CCCCCC` with `?` circle

Line endpoints measured at runtime via `getBoundingClientRect` and `ResizeObserver`.

**Right — Dataplane Gateways:**

| AZ | Status |
|----|--------|
| us-east-1a | `success` Healthy |
| us-east-1b | `success` Healthy |
| us-east-1c | `success` Healthy |
| us-east-1d | `success` Healthy |

---

### S9 — Site Detail

**Breadcrumb:** … / Gateways / {site}

**Heading:** {site} + status badge

**Top-right:**
- Edit (secondary, no-op)
- Remove site (critical) → opens remove confirmation modal

Three site variants share the same layout. Content differences listed below.

#### Variant: `nyc-prod` — Healthy

**Alert:** none

**Main grid (2 columns, `max-width: 980 px`):**

**Left — Site gateway card:**

| Field | Value |
|-------|-------|
| Site name | `nyc-prod` (monospace) |
| Status | `success` Healthy |
| Last seen | 2 min ago |
| Network site CIDRs | `192.168.0.0/24 · 192.168.10.99/32` (monospace) |

**Right — 2 stacked cards:**

**Disaster recovery card:**

| Field | Value |
|-------|-------|
| Primary gateway | us-east-1a · `success` Active |
| Backup gateway | us-east-1b · `success` Ready |
| Failover | Automatic — managed by HCP |

Copy: "Failover is automatic. If the primary gateway becomes unreachable, your connection will route through the backup."

**Gateway agent card:**
- "The gateway agent runs inside your network. You are responsible for deployment and updates."
- View install instructions (secondary sm) → opens Install slide-over
- View update instructions (secondary sm, no-op)
- Version chip: `Current: v1.2.1` with "New version available" notice (amber)

**Site topology diagram (below grid, inside `Card`):**

```
[Site Gateway nyc-prod]  ──────────────  [Dataplane  us-east-1a  Active]
                                          [Dataplane  us-east-1b  Passive]
```

Connector: solid green (`#1A7F4B`).

---

#### Variant: `nj-dr` — Degraded

**Alert:** `warning` — "Backup gateway unreachable — Your tunnel is active but failover protection is unavailable. Contact HCP support if this persists."

**Left — Site gateway card:**

| Field | Value |
|-------|-------|
| Site name | `nj-dr` (monospace) |
| Status | `warning` Degraded |
| Last seen | 2025-07-14 04:59:00 UTC (amber) |
| Network site CIDRs | `10.99.0.0/24 · 10.99.1.0/24` (monospace) |

**Disaster recovery card:**

| Field | Value |
|-------|-------|
| Primary gateway | us-east-1a · `success` Active |
| Backup gateway | us-east-1b · `warning` Down |
| Failover | `warning` Unavailable |

**Site topology diagram:**

```
[Site Gateway nj-dr]  - - - - - - - - -  [Dataplane  us-east-1a  Active]
                                          [Dataplane  us-east-1b  Down]
```

Connector: dashed amber (`#B08000`).

---

#### Variant: `fl-branch` — Not connected

**Alert:** `neutral` — "No tunnel established — The gateway agent has not connected. Verify the agent is running and can reach HCP on outbound UDP port 51820."

**Left — Site gateway card:**

| Field | Value |
|-------|-------|
| Site name | `fl-branch` (monospace) |
| Status | `offline` Not connected |
| Last seen | Never |
| Network site CIDRs | `192.34.0.0/24` (monospace) |

**Disaster recovery card:**

| Field | Value |
|-------|-------|
| Primary gateway | us-east-1b · `success` Active |
| Backup gateway | us-east-1c · `success` Ready |
| Failover | Automatic — managed by HCP |

**Site topology diagram:**

```
[Site Gateway fl-branch]  ? - - - - - -  [Dataplane  us-east-1b  Active]
                                          [Dataplane  us-east-1c  Passive]
```

Connector: dashed grey (`#CCCCCC`) with `?` circle at site gateway end.

---

#### Remove site modal (all variants)

- **Title:** Remove {site}? (top border `#5C1111`)
- `warning` Alert: "This action will tear down the encrypted tunnel. All traffic routed through this site will stop immediately. This cannot be undone."
- Cancel → closes modal
- Remove site (critical) → closes modal → S8

---

#### Install slide-over panel (all variants)

Right-side drawer (`width: 580 px`, overlays content, backdrop closes it).

- Header: "Install instructions" + × close button
- Body: Docker install steps (same content as S6, no tab selector)

---

## Helios Component Reference

| Component | Variants / Props | Used in |
|-----------|-----------------|---------|
| `Badge` | `neutral`, `success`, `warning`, `offline` | All screens |
| `Button` | `primary`, `secondary`, `critical`, `tertiary`; size `default` / `sm` | All screens |
| `Alert` | `neutral`, `warning`, `success` | S1, S2, S3, S4, S5, S6, S7, S8, S9 |
| `Card` | configurable `padding` | S7, S9 |
| `FormField` | `text`, `password`, `textarea`; `mono`, `required` | S5 |
| `CodeBlock` | Copy-to-clipboard button | S6, S9 slide-over |
| `StepIndicator` | `current`, `total`, `label` | S4, S5, S6, S7 |
| `NetworkCard` | `badge`, `description`, optional `onEdit` | S0 |
| `EmptyState` | optional `icon`, optional `cta` | S3 |
| `DataplaneHealthStrip` | array of AZ strings | S3, S8 |
| `DescriptionList` | array of `{label, value}` | S9 |
| `ViewToggle` | array of `{id, label}` | S8 |
| `Disclosure` | collapsible, optional `label` | S2 |
| `Breadcrumb` | array of `{label, onClick?}` | All screens |
| `Modal` | optional `topBorderColor` | S9 remove site |
| `SetupStepper` | 3-step hexagon stepper (Figma import) | S1 |
| `Checkbox` | checked / unchecked | S4 |
| `RadioCard` | `selected` boolean | *(V2 only — S4 deployment model)* |

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Healthy green (text) | `#006619` | Success badge text, checkmark icon |
| Healthy green (bg) | `#CCEEDA` | Success badge / pill background |
| Degraded amber (text) | `#8A4F00` | Warning badge text, degraded connector lines |
| Critical red | `#C00005` | Error connector, critical state icons |
| Offline grey | `#999999` | Offline badge text, unrouted `?` indicator |
| Vault amber (logo) | `#9A6F00` | Vault V-chevron SVG fill |
| AZ icon amber | `#B08000` | Dataplane AZ triangle `▽` |
| Card border | `#E5E5E5` | All card and chip borders |
| Muted label | `#737373` | Secondary labels, CIDR text |
| Primary text | `#1A1A1A` | Body and heading text |
| Link blue | `#1060D0` | Site name links |
| Header bg | `#1A1A1A` | AppHeader background |

**Connector line styles — topology view:**
- Healthy: solid `#CCCCCC`, 1.5 px
- Degraded: dashed `4 3` pattern, `#B08000`, 1.5 px
- Unrouted / not connected: dashed `5 3`, `#CCCCCC`, stub only + `?` circle

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

**Observer notes:** Watch for hesitation on prerequisites checklist (S4), CIDR auto-populate interaction (S5), and Docker run command comprehension (S6).

---

### Task 3 — Diagnose a degraded site (Day N)
**Setup:** Start on S0 in Day N scenario.

**Prompt:** "You've received an alert that one of your gateway sites is degraded. Take a look and tell me what you'd do next."

**Expected path:** S0 → Gateway card Edit → S8 → nj-dr row → S9 (nj-dr) → reads alert, DR card shows backup down.

---

### Task 4 — Remove a site (Day N)
**Setup:** On S8 or S9 for any site.

**Prompt:** "The fl-branch office is closing. Remove that gateway site."

**Expected path:** S8 → fl-branch → S9 (fl-branch) → Remove site → confirm modal → Remove site → S8.

**Observer notes:** Does the participant notice the traffic interruption warning before confirming?

---

*End of specification.*
