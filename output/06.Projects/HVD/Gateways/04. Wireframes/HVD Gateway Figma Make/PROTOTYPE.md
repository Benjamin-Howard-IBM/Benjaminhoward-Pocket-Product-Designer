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
interface AppState {
  screen:        'S0' | 'S1' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8' | 'S9'
  modal:         null | 'enable-gateways'
  deployModel:   'binary' | 'docker'
  s7State:       'pending' | 'connected' | 'failed'
  s8View:        'table' | 'topology'
  s9Site:        'nyc-prod' | 'nj-dr' | 'fl-branch'
  gatewaysEnabled: boolean
}
```

### Scenario presets

| Preset | `gatewaysEnabled` | Start screen | Use case |
|--------|-------------------|--------------|----------|
| **Day 0** | `false` | S0 | First-time setup; Gateways not yet enabled |
| **Day N** | `true`  | S0 | Returning user; Gateways already enabled with 3 sites |

The **Scenario** toggle in the header (top-right) switches instantly between presets.

### Happy-path flow

```
S0 (Networking overview)
 └─ Gateway card "Edit →"
     ├─ [Day 0] → S1 (Gateways landing, disabled)
     │    └─ "Enable Gateways" button → modal: enable-gateways
     │         └─ "Enable" → S3 (Gateways enabled, no sites)
     │              └─ "Add site" → S4
     └─ [Day N] → S8 (Gateways overview — sites table)
                   └─ "Add site" → S4

S4 (Step 1 – Deployment model)
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
 ├─ Table row click → S9 (site-specific)
 └─ Topology site card click → S9 (site-specific)

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
| **Gateway** | Day 0: `neutral` Disabled / Day N: `success` Enabled • 3 sites | Connect your private network sites to HCP Vault using encrypted tunnels. | Edit → → **S1** (Day 0) or **S8** (Day N) |

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

**Top-right CTA:** `Enable Gateways` button (background `#0C56E9`, white text) → opens `enable-gateways` modal.

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

### Modal — Enable Gateways (overlay on S1)

**Trigger:** "Enable Gateways" button on S1.

**Title:** Enable gateways  
**Top border:** `#1A1A1A`

**Body:**
- Paragraph: Enabling gateways will deploy one dataplane gateway per AZ. Gateways operate in active/passive configuration.
- `neutral` Alert: "One gateway will be deployed per availability zone." — Dataplane gateways are managed by HCP and cannot be removed individually.

**Footer:**
| Button | Action |
|--------|--------|
| Cancel (secondary) | Closes modal, returns to S1 |
| Enable (primary) | → S3, sets `gatewaysEnabled: true` |

---

### S3 — Gateways Enabled, No Sites

**Breadcrumb:** … / Cluster networking / Gateways

**Heading:** Gateways + `success` Enabled badge

**Top-right CTA:** `Add site` → S4

**Body (top to bottom):**
1. `success` Alert: "Gateways enabled" — Dataplane gateways are active in each AZ. Add a site to connect your first private network.
2. **Dataplane Health Strip** — four AZ pills, each with a green checkmark: `us-east-1a`, `us-east-1b`, `us-east-1c`, `us-east-1d`.
3. **Empty state** — "No sites configured" — "Add your first gateway site to connect a private network to HCP Vault." — `Add site` → S4.

---

### S4 — Add Site: Step 1 of 4 — Deployment Model

**Breadcrumb:** … / Gateways / Add site

**Heading:** Add site

**Step indicator:** 4-pip progress bar, Step 1 active.

**Body:**
- Sub-heading: "Choose how to run the gateway agent"
- Description paragraph.
- Two **RadioCard** options:

| Option | Description |
|--------|-------------|
| **Binary** (default selected) | Single compiled executable. No container runtime required. Preferred by security teams for its minimal dependency footprint. |
| Docker | Container image. Preferred for teams already running container platforms. Pull from the HashiCorp registry and run with standard Docker flags. |

**Footer:**
| Button | Action |
|--------|--------|
| Cancel (tertiary) | → S3 |
| Next → (primary) | → S5 |

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

**Advanced options** (Disclosure, collapsed by default):
- "Extend tunnel life" radio group: `0 min` (default), `15 min`, `30 min`, `60 min`.
- Helper: "Keep tunnels open for this duration after credential expiration…"

**Footer:**
| Button | Action |
|--------|--------|
| ← Back (secondary) | → S4 |
| Next → (primary) | → S6 |

---

### S6 — Add Site: Step 3 of 4 — Install

**Breadcrumb:** … / Gateways / Add site

**Heading:** Add site

**Step indicator:** Step 3 active.

**Tabs:** Binary | Docker (defaults to whichever `deployModel` was chosen in S4)

**Binary tab content:**

1. Download the gateway agent — `curl` + `unzip` + `chmod` code block.
2. Create the config file — `gateway.hcl` code block (role, site, cred_file, log_level).
3. Run the gateway agent — `./hcp-vault-gateway -config=gateway.hcl` code block.

**Docker tab content:**

1. Pull the gateway image — `docker pull hashicorp/hcp-vault-gateway:1.2.1` code block.
2. Run the gateway container — `docker run` with `--cap-add NET_ADMIN`, volume mount, env vars code block.

Each code block has a **Copy** button (top-right corner).

**Alert:** `neutral` — "Keep the agent running before proceeding."

**Footer:**
| Button | Action |
|--------|--------|
| ← Back (secondary) | → S5 |
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
- "2/2 gateways active · v1.2.1"

| Button | Action |
|--------|--------|
| Done (secondary) | → S8, `gatewaysEnabled: true` |
| View site → (primary) | → S9 (nyc-prod), `gatewaysEnabled: true` |

#### State: `failed`
- "Connection not established"
- `warning` Alert: "No tunnel detected after 5 minutes."
- Three failure categories with explanations:
  - Agent not started
  - Credential error
  - Network block (outbound UDP 51820)

| Button | Action |
|--------|--------|
| Exit without saving (tertiary) | → S8 |
| Retry verification (secondary) | → S7 (s7State: pending) |

---

### S8 — Gateways Overview

**Breadcrumb:** … / Cluster networking / Gateways

**Heading:** Gateways + `success` Enabled badge

**Top-right controls:**
- **ViewToggle:** `≡ Table` | `⬡ Topology` (switches `s8View`)
- `Add site` button → S4

#### Table view (`s8View: 'table'`)

| Site | Status | Gateways | Version | Last seen | Actions |
|------|--------|----------|---------|-----------|---------|
| nyc-prod *(link → S9)* | `success` Healthy | 2/2 | v1.2.1 | 2 min ago | Edit |
| nj-dr *(link → S9)* | `warning` Degraded | 1/2 | v1.2.1 | 8 min ago | Edit |
| fl-branch *(link → S9)* | `offline` Not connected | — | v1.2.1 | Never | Edit |

Alerts below table:
- `warning`: "nj-dr is degraded." — 1 of 2 gateways active. Gateway unresponsive — last heard 2025-07-14 04:59:00 UTC.
- `neutral`: "fl-branch has not connected." — No tunnel has been established. Verify the gateway agent is running and outbound UDP port 51820 is open.

#### Topology view (`s8View: 'topology'`)

Three-column layout:

**Left — Site Gateways** (clickable cards → S9):

| Site | CIDRs | Status |
|------|-------|--------|
| nyc-prod | 192.168.0.0/24, 192.168.10.99/32 | `success` Healthy |
| nj-dr | 10.99.0.0/24, 10.99.1.0/24 | `warning` Degraded — "Gateway unresponsive, last heard 2025-07-14 04:59:00 UTC" |
| fl-branch | 192.34.0.0/24 | `offline` Not connected — "No routing set up for this gateway" |

**Center — SVG connector lines:**
- nyc-prod → us-east-1a (solid gray)
- nj-dr → us-east-1b (dashed amber)
- fl-branch → dangling dashed line with `?` circle (unconnected)

Line endpoints are measured at runtime via `getBoundingClientRect` and a `ResizeObserver`.

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

Three site variants share the same layout. Content differences below.

#### Variant: `nyc-prod` — Healthy

**Alert:** none

**Configuration card:**

| Field | Value |
|-------|-------|
| Site name | `nyc-prod` (mono) |
| Status | `success` Healthy |
| Active gateways | 2 of 2 |
| Last seen | 2 min ago |
| Deployment model | Binary |
| Agent version | `v1.2.1` (mono) |
| Network site CIDRs | `192.168.0.0/24 · 192.168.10.99/32` (mono) |

**High availability card:**

| Field | Value |
|-------|-------|
| Paired DR site | `nj-dr` |
| Failover status | `success` Ready |

Note: "Failover is automatic. If this site becomes unreachable, traffic will route through nj-dr."

---

#### Variant: `nj-dr` — Degraded

**Alert:** `warning` — "Gateway unresponsive — last heard 2025-07-14 04:59:00 UTC" — 1 of 2 gateways active. Check gateway agent in all configured AZs. Verify outbound UDP 51820 is open.

**Configuration card:**

| Field | Value |
|-------|-------|
| Site name | `nj-dr` (mono) |
| Status | `warning` Degraded |
| Active gateways | **1 of 2** ↓ 1 unresponsive (amber) |
| Last seen | **2025-07-14 04:59:00 UTC** (amber) |
| Deployment model | Binary |
| Agent version | `v1.2.1` (mono) |
| Network site CIDRs | `10.99.0.0/24 · 10.99.1.0/24` (mono) |

**High availability card:**

| Field | Value |
|-------|-------|
| Paired DR site | `nyc-prod` |
| Failover status | `warning` Degraded |

---

#### Variant: `fl-branch` — Not connected

**Alert:** `neutral` — "No tunnel established." — The gateway agent has not connected yet. Verify the agent is running and can reach HCP on outbound UDP port 51820.

**Configuration card:**

| Field | Value |
|-------|-------|
| Site name | `fl-branch` (mono) |
| Status | `offline` Not connected |
| Active gateways | 0 of 2 (muted) |
| Last seen | Never |
| Deployment model | Docker |
| Agent version | `v1.2.1` (mono) |
| Network site CIDRs | `192.34.0.0/24` (mono) |

**High availability card:** not shown (fl-branch has no paired site).

---

#### Gateway agent card (all S9 variants)

- "The gateway agent runs inside your network. You are responsible for deployment and updates."
- View install instructions (secondary sm) → opens **Install slide-over** panel.
- View update instructions (secondary sm, no-op).
- Version chip: `Current: v1.2.1` with "New version available" notice (amber).

#### Remove site modal

- **Title:** Remove {site}? (top border `#5C1111`)
- `warning` Alert: "This action will tear down the WireGuard tunnel." — All traffic routed through this site will be interrupted immediately. This cannot be undone.
- Cancel → closes modal.
- Remove site (critical) → closes modal, → S8.

#### Install slide-over panel

Right-side drawer (`width: 580 px`, overlays content, backdrop closes it).

- Header: "Install instructions" + × close button.
- Body: same Binary / Docker tabbed install content as S6, defaulting to the site's deployment model (`docker` for fl-branch, `binary` for others).

---

## Helios Component Reference

| Component | Variants / Props | Used in |
|-----------|-----------------|---------|
| `Badge` | `neutral`, `success`, `warning`, `critical`, `offline` | All screens |
| `Button` | `primary`, `secondary`, `critical`, `tertiary`; size `default`/`sm` | All screens |
| `Alert` | `neutral`, `warning`, `success` | S1 modal, S3, S5, S6, S7, S8, S9 |
| `Card` | configurable `padding` prop | S7, S9 |
| `FormField` | `text`, `password`, `textarea`; `mono`, `required` | S5 |
| `RadioCard` | `selected` boolean | S4 |
| `CodeBlock` | Copy-to-clipboard button | S6, S9 slide-over |
| `Tabs` | array of `{id, label}` | S6, S9 slide-over |
| `StepIndicator` | `current`, `total`, `label` | S4, S5, S6, S7 |
| `NetworkCard` | `badge`, `description`, optional `onEdit` | S0 |
| `EmptyState` | optional `icon`, optional `cta` | S3 |
| `DataplaneHealthStrip` | array of AZ strings | S3 |
| `DescriptionList` | array of `{label, value}` | S9 |
| `ViewToggle` | array of `{id, label}` | S8 |
| `Disclosure` | collapsible, optional `label` | S5 |
| `Breadcrumb` | array of `{label, onClick?}` | All screens |
| `Modal` | optional `topBorderColor` | Enable Gateways, Remove site |
| `SetupStepper` | 3-step hexagon stepper (Figma import) | S1 |

---

## Usability Test Scenarios

### Task 1 — Enable Gateways (Day 0)
**Setup:** Start on S0 in Day 0 scenario (Gateway shows "Disabled").

**Prompt:** "Your team wants to connect a private data center to HCP Vault without exposing it to the public internet. Where would you start, and how would you enable that connection?"

**Expected path:** S0 → Gateway card Edit → S1 → Enable Gateways → modal → Enable → S3.

---

### Task 2 — Add a site (Day 0, continuing from Task 1)
**Setup:** Continue from S3 (Gateways enabled, no sites).

**Prompt:** "Gateways are now enabled. Go ahead and add your first network site."

**Expected path:** S3 → Add site → S4 → S5 → S6 → S7 (auto-connects) → S8.

**Observer notes:** Watch for hesitation on deployment model choice (S4), CIDR field (S5), and install instructions tab default (S6).

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
