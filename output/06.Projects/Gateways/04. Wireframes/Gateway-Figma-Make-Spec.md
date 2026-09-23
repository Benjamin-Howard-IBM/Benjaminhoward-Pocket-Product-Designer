# HVD Gateway - Figma Make Spec

**Version**: 3.0
**Date**: 2026-08
**Author**: Benjamin Howard
**Source of truth**: `storybook/stories/wireframes/hvd-gateways/gateway.stories.tsx`
**Storybook preview**: `cd storybook && npm run storybook` (port 6007)
**Changelog from v1.0**: S3 dataplane health strip; S5 tunnel life advanced option + CIDR label rename; S8 Table/Topology toggle + `Not connected` badge state; S9 degraded callout, last-seen prominence, Gateway agent card replacing Update gateway; new fixture site `fl-branch` (not connected).
**Changelog from v2.0→v3.0**: Day 0 / Day N navigation model; `AppSideNav` Gateways sub-item (32px indent, `└` prefix, green "On" pill when enabled); S0 Gateway card two-state (Disabled→S1 / "Enabled · 2 sites"→S8); all screens S1–S9 use `sideNavActive="Gateways"`; `GatewayFlow` `startEnabled` prop; `InteractiveFlow` split into `InteractiveFlow_Day0` and `InteractiveFlow_DayN`; `S0_Networking` split into `S0_Day0` and `S0_DayN`.

---

## How to use this file

Paste this document into Figma Make. Each screen section is a self-contained frame spec. Figma Make should generate one frame per screen. The Helios component key below maps component names to their visual shape.

**Canvas settings:**
- Frame width: 1280px
- Frame height: 900px (scroll where content exceeds)
- Background: `#F5F5F5`
- Font: Inter (system fallback: -apple-system, Segoe UI, sans-serif)
- Monospace font: SF Mono / Menlo / Consolas

---

## Helios Component Key

| Component name | Shape description | Notes |
|---|---|---|
| `AppHeader` | 48px tall black bar (`#1A1A1A`), HC logo badge left, project selector pill, avatar circle right | Fixed top |
| `AppSideNav` | 224px white sidebar, 1px `#E5E5E5` right border, nav items 40px tall | Active item: 3px left border `#1A1A1A`, bold label, `#F5F5F5` bg. Gateways sub-item (32px indent, `└` prefix) always visible below Networking; green "On" pill (`#1A7F4B`, `#F0FAF4` bg) shown only when `gatewaysEnabled=true` |
| `Breadcrumb` | 12px text, `/` separators, link items in `#1060D0`, final item in `#1A1A1A` | 16px bottom margin |
| `PageTitle` | 28px bold `#1A1A1A`, flex row with badge and action buttons right-aligned | 20px bottom margin |
| `Badge` (neutral) | 11px, `#595959` text, `#CCCCCC` border, white bg, 3px radius, 3px/8px padding | Status: not active |
| `Badge` (success) | 11px, `#1A7F4B` text, `#1A7F4B` border, `#F0FAF4` bg | Healthy / Enabled |
| `Badge` (warning) | 11px, `#8A4F00` text, `#8A4F00` border, `#FFF8EE` bg | Degraded — tunnel exists but gateway unresponsive |
| `Badge` (critical) | 11px, `#5C1111` text, `#5C1111` border, `#FFF0F0` bg | Error |
| `Badge` (offline) | 11px, `#5C1111` text, `#CCCCCC` border, `#F9F9F9` bg | Not connected — tunnel was never established. Distinct from Degraded. |
| `Button` (primary) | `#1A1A1A` bg, white text, 5px radius, 10px/18px padding, 14px Inter 500 | |
| `Button` (secondary) | White bg, `#1A1A1A` text, `#CCCCCC` border, 5px radius | |
| `Button` (critical) | `#5C1111` bg, white text, 5px radius | Destructive actions only |
| `Button` (tertiary) | No bg/border, `#1060D0` text | Cancel / low-priority |
| `Alert` (neutral) | White bg, `#CCCCCC` left border (3px), `#E5E5E5` full border, 14px radius; icon circle left | |
| `Alert` (warning) | Same shape, `#8A4F00` left border and icon | |
| `Alert` (success) | Same shape, `#1A7F4B` left border and icon | |
| `Card` | White bg, 1px `#E5E5E5` border, 6px radius, 20px padding | |
| `FormField` | Label 13px 500, input `#F9F9F9` bg, `#CCCCCC` border, 4px radius, 9px/12px padding | Required: red asterisk |
| `FormField` (password) | Same shape, value shown as `••••••••••••` | |
| `FormField` (textarea) | Same shape, 88px height | |
| `RadioCard` | Card shape + radio circle top-left, 2px border, `#1A1A1A` border when selected | |
| `CodeBlock` | `#1A1A1A` bg, `#F0F0F0` mono text, 12.5px, 14px/16px padding, `Copy` label top-right | |
| `Table` | Full-width, `#F9F9F9` header row, 12px uppercase column labels, 1px `#E5E5E5` row dividers | |
| `Tabs` | Underline style, 14px, active tab: bold + 2px `#1A1A1A` bottom border | |
| `Modal` | 520px wide, white, 6px radius, dark shadow; 3px top border matches context color | |
| `DescriptionList` | 2-column grid: 160px label col (`#737373`, 12px), value col (`#1A1A1A`, 13px), `#E5E5E5` row dividers | |
| `StepIndicator` | Row of progress pills (8px × 8px, active pill 24px wide) + step label | `#E5E5E5` border-bottom |
| `NetworkCard` | Card with title+badge row, description text, `Edit →` link | Used on Networking overview |
| `EmptyState` | Centered column: icon box, h3, body text, CTA button; dashed `#CCCCCC` border container | |
| `DataplaneHealthStrip` | Horizontal pill row: "DATAPLANE GATEWAYS" label + one pill per AZ (✓ + AZ name); `#E5E5E5` border, white bg, 6px radius | New in v2.0. Used on S3 and S8 topology. |
| `ViewToggle` | Two-segment button group: `≡ Table` / `⬡ Topology`, selected segment `#1A1A1A` bg white text | New in v2.0. Used on S8. |
| `TopologyView` | Three-column layout: Site gateway cards (left) → SVG connection lines → Dataplane AZ cards (right). Lines: solid gray (healthy), dashed amber (degraded), dashed gray + ? circle (not connected) | New in v2.0. S8 alternate view. |
| `Disclosure` | `▸ Show advanced options` link; expands to padded container with `#E5E5E5` border | New in v2.0. Used on S5. |

---

---

## Navigation model

### Two entry-point flows

The "Gateways" sub-item is always visible in the side nav, indented below "Networking". Its click target depends on cluster state:

| State | Side nav "Gateways" → | S0 Gateway card |
|---|---|---|
| **Day 0** — not yet enabled | S1 (disabled landing) | Badge "Disabled" (neutral), `Edit →` → S1 |
| **Day N** — already enabled | S8 (sites table) | Badge "Enabled · 2 sites" (success), `Edit →` → S8 |

### Side nav anatomy

```
Networking             ← inactive when Gateways screen is active
  └ Gateways   [On]   ← 32px indent; "On" pill only visible when enabled
```

- `└` prefix glyph: 12px `#737373`
- "On" pill: 10px 700, `#1A7F4B` text, `#F0FAF4` bg, `#1A7F4B` 1px border, 3px radius, `1px 5px` padding
- `onClick`: routes to S1 (Day 0) or S8 (Day N)

### Story exports

| Story | Storybook name |
|---|---|
| `InteractiveFlow_Day0` | Interactive Flow — Day 0 (gateways disabled) |
| `InteractiveFlow_DayN` | Interactive Flow — Day N (gateways enabled) |
| `S0_Day0` | S0 - Networking overview (Day 0, gateway disabled) |
| `S0_DayN` | S0 - Networking overview (Day N, gateway enabled) |

---

## Screen Specs

---

### S0 - Networking overview

**Breadcrumb:** `cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking`

**Shell:**
- AppHeader: org badge HC (gold `#FFDE5A`), project selector "default-project ▾", avatar "AB" (red circle)
- AppSideNav: back link "← Back to Vault Dedicated" (blue, 13px), cluster label "vault-cluster" (11px uppercase gray), nav items: Overview, Replication (inactive), section label "Manage", Integrations (inactive), **Networking** (active)

**Main content** (`24px 40px` padding, `#F5F5F5` bg):

Page icon: 36×36 yellow badge (`#FFF5CC` bg, `#B08000` border) containing network glyph (⬡). Inline with h1.

`h1`: Networking — 28px bold

**Two-column grid** (`1fr 1fr`, 32px gap, max-width 1100px):

**Left column — "Connection security"** (h2: 17px 600):

Four `NetworkCard` components stacked (12px gap):
1. Title: "Cluster accessibility" | Badge: "Public" (success) | Description: "Cluster is accessible over the public internet." | `Edit →` link
2. Title: "IP Allow list" | Badge: "13 IP addresses allowed" (success) | Description: "Allow only specific source IP(s) to connect to the cluster's public network endpoint." | `Edit →` link
3. Title: "Proxy" | Badge: "Enabled" (success) | Description: "Identity-based public proxy address managed by HCP which only allows connections to the cluster from authorized HCP identities." | `Edit →` link
4. Title: **"Gateway"** | Badge: **state-dependent** | Description: "Connect your private network sites to HCP Vault using encrypted tunnels." | **`Edit →` link (clickable)**
   - **Day 0:** Badge "Disabled" (neutral) · `Edit →` → S1
   - **Day N:** Badge "Enabled · 2 sites" (success) · `Edit →` → S8

**Right column — "Communication setup"** (h2: 17px 600):

Four `NetworkCard` components stacked:
1. Title: "HVN" | Badge: "Active" (success) | Description: "HashiCorp Virtual Network is in use for this cluster..."
2. Title: "Private link" | Badge: "2/2 Active" (success) | Description: "Your own DNS server(s) are used for name resolution for certain domains."
3. Title: "Custom DNS forwarding" | Badge: "3/4 Active" (warning) | Description: "Your own DNS server(s) are used for name resolution for certain domains."
4. Title: "Custom domain" | Badge: "Enabled" (success) | Description: `Domain name to your clusters is customized to "databucks.com"`

**Interactions:**
- Gateway card `Edit →` (Day 0) → S1
- Gateway card `Edit →` (Day N) → S8
- Side nav "Gateways" sub-item → same routing (S1 or S8 depending on state)

---

### S1 - Gateways landing (disabled)

**Breadcrumb:** `cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking / Gateways`

**Shell:** `sideNavActive = "Gateways"`. Gateways sub-item highlighted (bold, left border). Networking parent item inactive. "On" pill is **not** shown (gateways not yet enabled).

**Main content:**

`PageTitle`: "Gateways" | Right action: `Button` (primary) "Enable Gateways"

Body text (14px, `#595959`, max-width 680px, 1.6 line-height):
> "Information about gateways and how they work... [Learn more about HVD gateways.](#)" (link in blue)

`h2`: "Set up gateways" (17px 600)

Body text:
> "Configure gateways to allow encrypted communication between HCP Vault nodes and your private network sites. Direct your Vault traffic through Wireguard® tunnels to each of your cloud environments and datacenters."

**Architecture diagram** (max-width 740px, 28px bottom margin):

Two bordered regions side by side (16px gap):

Left region — dashed `#999999` border, label "VAULT DATAPLANE NETWORK" (10px uppercase, positioned bottom-left):
- Row (flex, center-aligned): Vault Node box → gold arrow → Dataplane Gateway box
- Vault Node: white card, ▽ glyph, label below "VAULT NODE" (10px uppercase)
- Arrow: → in `#B08000`
- Dataplane Gateway: `#FFFBE6` card, `#B08000` border, label "Dataplane / Gateway" (11px 600 gold), sub-box "wg0" (light blue card `#C6E8FF`, `#5B9BD5` border, 10px mono bold)
- Label "DATAPLANE GW" below box

Wireguard connector (between regions, centered):
- Lock glyph ⬡ in `#B08000`
- Dashed line 60px wide, `#B08000` dash pattern
- Label "WIREGUARD® TUNNEL" (9px uppercase, gold) — note registered trademark symbol

Right region — dashed `#5B9BD5` border, label "YOUR NETWORK SITE" (10px uppercase):
- Row: Site Gateway box → arrow → Database box
- Site Gateway: `#FFFBE6` card, `#B08000` border, labels "Site / Gateway" (11px 600 gold), sub-box "wg1" (light blue)
- Arrow: → in `#595959`
- Database: white card, ⊞ glyph (18px), label "DATABASE"

**Setup steps section:**

`h2`: "Set up steps:" (17px 600)

Ordered list (`<ol>`, 14px, bold items):
1. Enable gateways to be deployed to each dataplane availability zone (AZ).
2. Set up a routing table to direct traffic from each AZ to specific sites.
3. Prepare your network to communicate with the Vault Dataplane and deploy a gateway for each site.

**Interactions:**
- "Enable Gateways" button → open S2 (modal overlay on this page)

---

### S2 - Enable Gateways modal

**Background:** S1 rendered behind modal at 50% opacity (blur treatment).

**Modal** (520px wide, centered):
- Top border: 3px solid `#1A1A1A`
- Header: title "Enable gateways" (18px 700), × close button top-right
- Body (20px/24px padding):
  - Body text (14px, `#595959`, 1.6 line-height):
    > "Enabling gateways will deploy one dataplane gateway per availability zone for this cluster. Gateways operate in an active/passive configuration to enable rapid failover."
  - `Alert` (neutral): title "One gateway will be deployed per availability zone." | description "Dataplane gateways are managed by HCP and cannot be removed individually. Disabling gateways at the cluster level removes all dataplane gateways."
- Footer (right-aligned, 8px gap):
  - `Button` (secondary) "Cancel"
  - `Button` (primary) "Enable"

**Interactions:**
- Cancel / × → dismiss modal, return to S1
- Enable → S3

---

### S3 - Gateways enabled, no sites *(updated v2.0)*

**Breadcrumb:** `cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking / Gateways`

**Shell:** `sideNavActive = "Gateways"`. Gateways sub-item active.

**Main content:**

`PageTitle`: "Gateways" + `Badge` (success) "Enabled" inline | Right action: `Button` (primary) "Add site"

`Alert` (success): title "Gateways enabled" | description "Dataplane gateways are active in each availability zone. Add a site to connect your first private network."

**`DataplaneHealthStrip`** *(new in v2.0)*:
- Container: white bg, `#E5E5E5` 1px border, 6px radius, 10px/16px padding, flex row, 8px gap, wraps
- Label: "DATAPLANE GATEWAYS" (12px 600, `#737373`, uppercase, right margin 4px)
- Four AZ pills (one per AZ): `#F5F5F5` bg, `#E5E5E5` border, 4px radius, 4px/10px padding, 12px
  - Each pill: ✓ glyph (`#1A7F4B`, 11px bold) + AZ name (`#595959`)
  - AZs: us-east-1a, us-east-1b, us-east-1c, us-east-1d
- **Design intent:** Reassures the user that HCP infrastructure is running before they configure their first site. Addresses the "is anything working?" anxiety in the empty state.

**Empty state container** (dashed `#CCCCCC` 1px border, 6px radius, white bg, `64px 0` vertical padding, flex column centered, 8px top margin):
- Icon box: 48×48, `#E5E5E5` border, 6px radius, ⬡ glyph (22px, `#737373`)
- `h3`: "No sites configured" (16px 600)
- Body text (14px, `#595959`, max-width 360px, centered):
  > "Add your first gateway site to connect a private network to HCP Vault."
- `Button` (primary) "Add site"

**Interactions:**
- "Add site" (header) → S4
- "Add site" (empty state) → S4

---

### S4 - Create site: deployment model

**Breadcrumb:** `cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking / Gateways / Add site`

**Shell:** `sideNavActive = "Gateways"`. Gateways sub-item active.

**Main content** (max-width 680px):

`PageTitle`: "Add site"

`StepIndicator`: 4 progress pills — pill 1 active (24px wide, `#1A1A1A`), pills 2-4 small (8px, `#999999`) | Label: "Step 1 of 4 - Deployment model" (12px, `#737373`) | `#E5E5E5` border-bottom, 24px margin-bottom

`h2`: "Choose how to run the gateway agent" (17px 600)

Body text (14px, `#595959`, 1.6 line-height, 24px bottom margin):
> "The gateway agent runs inside your network and establishes an encrypted tunnel to HCP Vault. Select the deployment format that fits your environment."

**Radio card row** (flex, 16px gap, 32px bottom margin):

`RadioCard` — **Binary** (pre-selected):
- Radio circle: filled (8px inner dot, `#1A1A1A`)
- Title: "Binary" (14px 600)
- Description: "Single compiled executable. No container runtime required. Preferred by security teams for its minimal dependency footprint." (13px, `#595959`)
- Border: 2px `#1A1A1A`
- Background: `#F8F8F8`

`RadioCard` — **Docker** (unselected):
- Radio circle: empty ring
- Title: "Docker" (14px 600)
- Description: "Container image. Preferred for teams already running container platforms. Pull from the HashiCorp registry and run with standard Docker flags." (13px, `#595959`)
- Border: 2px `#CCCCCC`
- Background: white

**Button row** (flex, 8px gap):
- `Button` (tertiary) "Cancel"
- `Button` (primary) "Next →"

**Interactions:**
- Click Docker card → Docker selected state (borders swap)
- Cancel → S3
- Next → S5 (carries selected deployment model to S6)

---

### S5 - Create site: configure *(updated v2.0)*

**Breadcrumb:** `cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking / Gateways / Add site`

**Shell:** `sideNavActive = "Gateways"`. Gateways sub-item active.

**Main content** (max-width 560px):

`PageTitle`: "Add site"

`StepIndicator`: Pill 2 active, pills 1 filled (`#595959`), pills 3-4 empty | Label: "Step 2 of 4 - Configure"

**Form fields** (stacked, 20px gap):

1. `FormField` — label: "Site name" (required ✱) | placeholder: "e.g. nyc-prod" | helper: "A label for this network site. Used to identify the gateway in routing rules and logs."

2. `FormField` — label: "Service principal client ID" (required ✱) | placeholder: "client_id" | mono font | helper: "From the HCP service principal created for this gateway."

3. `FormField` (password) — label: "Service principal client secret" (required ✱) | value: "••••••••••••" | mono font | helper: "Store this value securely. It will not be shown again after setup."

4. `FormField` (textarea) — label: **"Network site CIDRs"** *(renamed from "Allowed CIDRs" in v2.0)* | placeholder: "192.168.0.0/24\n10.99.0.0/24" | helper: **"One CIDR per line. These become your VPC routing table entries — traffic from these ranges is directed through this gateway to HCP Vault."** *(copy updated to make routing-table relationship explicit)*

`Alert` (neutral, below CIDRs): title "Source IP addresses are preserved in Vault audit logs." | description "Ensure network site CIDRs reflect your actual workload IP ranges. Source IPs from these ranges will appear in Vault audit log entries for all requests routed through this site."

**Advanced options `Disclosure`** *(new in v2.0, below Alert)*:
- Collapsed state: `▸ Show advanced options` link (13px, `#1060D0`)
- Expanded state: `▾ Hide advanced options` link + options container (16px/20px padding, `#E5E5E5` 1px border, 6px radius, 16px top margin)

**Advanced options container (expanded state):**
- Label: "Extend tunnel life" (13px 500, `#1A1A1A`, 5px bottom margin)
- Radio inline group (flex, 12px gap, 8px bottom margin):
  - Four options: "0 min" (pre-selected), "15 min", "30 min", "60 min"
  - Each: 14×14 radio circle + option label (13px)
- Helper text (12px, `#737373`, 1.5 line-height):
  > "Keep tunnels open for this duration after credential expiration to allow continuity during unexpected outages. Default is 0 (tunnels close immediately on expiration)."
- **Design intent:** Surfaced from the old enable-form design. Moved here so it can be set per-site. Collapsed by default to keep the critical path uncluttered.

**Button row** (flex, 8px gap, 8px top margin):
- `Button` (secondary) "← Back"
- `Button` (primary) "Next →"

**Interactions:**
- Back → S4
- Next → S6 (with deployment model from S4 carried through)
- Advanced options disclosure → toggle expanded/collapsed state

**Error states** (not shown in default view, annotated for handoff):
- Site name empty on Next: inline error below field — "Site name is required"
- Site name duplicate: "A site with this name already exists"
- Invalid CIDR format: "One or more CIDRs are not valid. Use CIDR notation, e.g. 10.0.0.0/24"

---

### S6 - Install instructions (Binary)

**Breadcrumb:** `cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking / Gateways / Add site`

**Shell:** `sideNavActive = "Gateways"`. Gateways sub-item active.

**Main content** (max-width 680px):

`PageTitle`: "Add site"

`StepIndicator`: Pill 3 active | Label: "Step 3 of 4 - Install"

Body text (14px, `#595959`, 1.6 line-height, 20px bottom margin):
> "Run the gateway agent in your environment. The agent will initiate an outbound connection to HCP - no inbound ports are required."

`Tabs`: ["Binary", "Docker"] — **Binary active** (2px `#1A1A1A` underline, bold)

**Binary tab content:**

Section label: "1. Download the gateway agent" (13px 600, `#1A1A1A`, 8px bottom margin)

`CodeBlock`:
```
# Download the gateway agent binary
curl -fsSL https://releases.hashicorp.com/hcp-vault-gateway/1.2.1/hcp-vault-gateway_1.2.1_linux_amd64.zip \
  -o hcp-vault-gateway.zip
unzip hcp-vault-gateway.zip
chmod +x hcp-vault-gateway
```

Section label: "2. Create the config file" (13px 600)

`CodeBlock`:
```
# gateway.hcl
gateway {
  role      = "customer"
  site      = "nyc-prod"
  cred_file = "/path/to/hcp/cred_file.json"
  log_level = "info"
}
```

Section label: "3. Run the gateway agent" (13px 600)

`CodeBlock`:
```
# Run the gateway agent
./hcp-vault-gateway -config=gateway.hcl
```

`Alert` (neutral): title "Keep the agent running before proceeding." | description "The next step verifies the tunnel connection. Start the agent first, then click Start verification."

**Button row:**
- `Button` (secondary) "← Back"
- `Button` (primary) "Start verification →"

**Interactions:**
- Docker tab → switch to Docker tab content (same layout, docker pull + docker run commands)
- Back → S5
- Start verification → S7

---

### S6 - Install instructions (Docker tab state)

*Same frame dimensions and shell as Binary. Only tab content changes.*

`Tabs`: ["Binary", "Docker"] — **Docker active**

Section label: "1. Pull the gateway image"

`CodeBlock`:
```
# Pull the gateway agent image
docker pull hashicorp/hcp-vault-gateway:1.2.1
```

Section label: "2. Run the gateway container"

`CodeBlock`:
```
# Run the gateway agent container
docker run --rm \
  --cap-add NET_ADMIN \
  -v /path/to/hcp/cred_file.json:/etc/hcp/cred_file.json \
  -e HCP_GATEWAY_SITE=nyc-prod \
  -e HCP_GATEWAY_CRED_FILE=/etc/hcp/cred_file.json \
  hashicorp/hcp-vault-gateway:1.2.1
```

---

### S7 - Verify connection (pending state)

**Breadcrumb:** `cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking / Gateways / Add site`

**Shell:** `sideNavActive = "Gateways"`. Gateways sub-item active.

**Main content** (max-width 560px):

`PageTitle`: "Add site"

`StepIndicator`: Pill 4 active | Label: "Step 4 of 4 - Verify"

**Status card** (`Card` shape, 40px/32px padding, flex column, centered, text-center):
- Spinner: 48×48 circle, 4px border, top segment `#1A1A1A`, rest `#E5E5E5` (animated)
- `h3`: "Waiting for connection..." (16px 600)
- Body text (14px, `#595959`, 1.6 line-height):
  > "Keep the gateway agent running. This page will update automatically when a connection is established."

---

### S7 - Verify connection (connected state)

*Same frame and shell. Card content replaces spinner.*

**Status card** (centered, flex column, 40px/32px padding):
- Checkmark circle: 56×56, `#E8F7EE` bg, `#1A7F4B` border (2px), ✓ glyph (26px, `#1A7F4B`)
- `h3`: "Connected" (16px 600)
- Body text: "Site **nyc-prod** is active and healthy." (14px)
- Sub-text: "2/2 gateways active · v1.2.1" (13px, `#737373`)
- Button row (flex, 8px gap):
  - `Button` (secondary) "Done"
  - `Button` (primary) "View site →"

**Interactions:**
- Done → S8
- View site → S9 (nyc-prod)

---

### S7 - Verify connection (failed state)

*Same frame and shell. Card shows failure attribution.*

**Card** (28px padding):

`h3`: "Connection not established" (16px 600, 16px bottom margin)

`Alert` (warning): title "No tunnel detected after 5 minutes." | description "Check the failure category below and resolve before retrying."

**Failure attribution list** (3 items, 12px bottom padding, `#E5E5E5` border-bottom each):

1. Label: "Agent not started" (13px 600) | Detail: "Verify the gateway binary or container is running in your environment."
2. Label: "Credential error" (13px 600) | Detail: "Check that the service principal client ID and secret are correct and have not expired."
3. Label: "Network block" (13px 600) | Detail: "Ensure outbound UDP port 51820 is open to HCP dataplane gateway IP addresses."

**Button row** (flex, 8px gap):
- `Button` (tertiary) "Exit without saving"
- `Button` (secondary) "Retry verification"

**Interactions:**
- Exit → S8 (no site added)
- Retry → return to pending state (S7 pending)

---

### S8 - Gateways overview with sites *(updated v2.0)*

**Breadcrumb:** `cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking / Gateways`

**Shell:** `sideNavActive = "Gateways"`. Gateways sub-item active.

**Main content:**

`PageTitle`: "Gateways" + `Badge` (success) "Enabled" | Right actions area:
- **`ViewToggle`** *(new in v2.0)*: two-segment button group, `#CCCCCC` 1px border, 5px radius, overflow hidden
  - Segment 1: "≡ Table" — default active (`#1A1A1A` bg, white text)
  - Segment 2: "⬡ Topology" — inactive (white bg, `#595959` text)
  - 13px 500, 7px/14px padding each segment
- `Button` (primary) "Add site"

---

#### S8 — Table view (default)

`Table` (full-width, 6px radius, `#E5E5E5` outer border):

Columns (12px uppercase, `#595959`, `#F9F9F9` header bg):
`Site` | `Status` | `Gateways` | `Version` | `Last seen` | `Actions`

Row 1 — **nyc-prod**:
- Site: "nyc-prod" (blue link, clickable)
- Status: `Badge` (success) "Healthy"
- Gateways: "2/2" (`#1A1A1A`)
- Version: "v1.2.1" (mono, 12px)
- Last seen: "2 min ago" (`#595959`)
- Actions: "Edit" (blue link)

Row 2 — **nj-dr**:
- Site: "nj-dr" (blue link, clickable)
- Status: `Badge` (warning) "Degraded"
- Gateways: "1/2" (`#8A4F00`)
- Version: "v1.2.1" (mono, 12px)
- Last seen: "8 min ago" (`#8A4F00` — colored to call attention)
- Actions: "Edit" (blue link)

Row 3 — **fl-branch** *(new in v2.0)*:
- Site: "fl-branch" (blue link, clickable)
- Status: `Badge` **(offline)** "Not connected" *(new badge color in v2.0)*
- Gateways: "—" (`#737373`) — tunnel never established, no gateway count
- Version: "v1.2.1" (mono, 12px)
- Last seen: "Never" (`#595959`)
- Actions: "Edit" (blue link)

Below table (16px top margin), two `Alert` stacked:

`Alert` (warning): title "nj-dr is degraded." | description "1 of 2 gateways is active. Gateway unresponsive — last heard 2025-07-14 04:59:00 UTC. Check that the gateway agent is running in all configured availability zones."

`Alert` (neutral): title "fl-branch has not connected." | description "No tunnel has been established. Verify the gateway agent is running and outbound UDP port 51820 is open."

---

#### S8 — Topology view *(new in v2.0)*

Activated via "⬡ Topology" segment of `ViewToggle`. Same breadcrumb and page title area.

**Three-column layout** (flex row, 32px gap, 8px top margin):

**Left column — Site gateways** (flex: 1):
- Column heading: "SITE GATEWAYS" (12px 600 `#737373` uppercase, 12px bottom margin)
- Sub-heading: "Private network sites defined in the VPC routing table" (12px `#737373`, 16px bottom margin)
- Three site cards stacked (10px gap between cards):

  *nyc-prod card* (white bg, `#E5E5E5` border, 6px radius, 12px/16px padding, flex row space-between):
  - Left: site name "nyc-prod" (13px 500, `#1060D0`), CIDRs "192.168.0.0/24, 192.168.10.99/32" (12px mono `#737373`)
  - Right: `Badge` (success) "Healthy"

  *nj-dr card* (same shape):
  - Left: "nj-dr" (13px 500 blue), CIDRs, **sub-line** "◆ Gateway unresponsive, last heard 2025-07-14 04:59:00 UTC" (11px `#8A4F00`)
  - Right: `Badge` (warning) "Degraded"

  *fl-branch card* (same shape):
  - Left: "fl-branch" (13px 500 blue), CIDRs, **sub-line** "◆ No routing set up for this gateway" (11px `#999999`)
  - Right: `Badge` (offline) "Not connected"

**Center column — Connection SVG** (80px wide, fixed):
- SVG 80×360px, position absolute
- Line 1 (nyc-prod → us-east-1a): solid `#CCCCCC` 1.5px, x1=0 y1=52 → x2=80 y2=100
- Line 2 (nj-dr → us-east-1b): dashed `#8A4F00` 1.5px (4,3 pattern), x1=0 y1=148 → x2=80 y2=200
- Line 3 (fl-branch → none): dashed `#CCCCCC` 1.5px (6,4 pattern), x1=0 y1=248 → x2=60 y2=248; terminates in circle (r=7, white fill, `#CCCCCC` stroke) containing "?" (9px `#999`)
- **Design intent:** Line style carries health status — solid gray (healthy), dashed amber (degraded/unresponsive), dashed gray + ? (not connected, no destination AZ yet)

**Right column — Dataplane gateways** (260px fixed):
- Column heading: "DATAPLANE GATEWAYS" (12px 600 `#737373` uppercase)
- Sub-heading: "Gateways in the Vault HCP Dataplane" (12px `#737373`, 16px bottom margin)
- Four AZ cards (10px gap): us-east-1a, us-east-1b, us-east-1c, us-east-1d
  - Each: white bg, `#E5E5E5` border, 6px radius, 12px/16px padding, flex row space-between
  - Left: ▽ glyph (`#B08000` 14px) + AZ name (13px `#1A1A1A`)
  - Right: `Badge` (success) "Healthy"

**Interactions (both views):**
- Site name link (table) or site card click (topology) → S9
- "Add site" → S4
- Toggle segment click → switch view state

---

### S9 - Site detail (nyc-prod, healthy) *(updated v2.0)*

**Breadcrumb:** `cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking / Gateways / nyc-prod`

**Shell:** `sideNavActive = "Gateways"`. Gateways sub-item active.

**Main content:**

`PageTitle`: "nyc-prod" + `Badge` (success) "Healthy" | Right actions: `Button` (secondary) "Edit" · `Button` (critical) "Remove site"

*No alert shown for healthy state.*

**Two-column grid** (1fr + 320px fixed right, 28px gap, max-width 980px):

**Left column — Card** (20px padding):

`h2`: "Configuration" (17px 600)

`DescriptionList` (160px label col, `#737373` 12px; value col `#1A1A1A` 13px; `#E5E5E5` row dividers):

| Label | Value |
|---|---|
| Site name | `nyc-prod` (mono) |
| Status | Badge (success) "Healthy" |
| Active gateways | 2 of 2 |
| Last seen | 2 min ago |
| Deployment model | Binary |
| Agent version | `v1.2.1` (mono) |
| Network site CIDRs | `192.168.0.0/24` (mono, 12px) · `192.168.10.99/32` (mono, 12px) |

**Right column — two stacked Cards:**

**Card 1: High availability** (20px padding):

`h2`: "High availability" (17px 600)

Description row: label "Paired DR site" (12px, `#737373`) · value `nj-dr` (14px 500, mono)

Description row: label "Failover status" (12px, `#737373`) · value `Badge` (success) "Ready"

Footer text (12px, `#737373`, 14px top margin, 1.5 line-height):
> "Failover is automatic. If this site becomes unreachable, traffic will route through nj-dr."

**Card 2: Gateway agent** *(renamed from "Update gateway" in v2.0)* (20px padding):

`h2`: "Gateway agent" (17px 600)

Body text (13px, `#595959`, 1.5 line-height, 14px bottom margin):
> "The gateway agent runs inside your network. You are responsible for deployment and updates."

Two `Button` (secondary, small) stacked (8px gap):
- "View install instructions"
- "View update instructions"

Version strip (12px/10px padding, `#F5F5F5` bg, 4px radius, 12px top margin):
- "Current: `v1.2.1`" (12px `#737373` mono) + "New version available" (12px `#8A4F00`, 8px left margin)

**Interactions:**
- "Remove site" button → confirmation modal (critical color Modal, title "Remove nyc-prod?", warning that tunnel will be torn down, Cancel + Remove site buttons)
- "View install instructions" → slide-over panel with S6 content (Binary/Docker tabs)
- "View update instructions" → external link or slide-over with update steps

---

### S9 - Site detail (nj-dr, degraded) *(updated v2.0)*

**Breadcrumb:** `cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking / Gateways / nj-dr`

`PageTitle`: "nj-dr" + `Badge` (warning) "Degraded"

**`Alert` (warning)** *(new in v2.0 — shown immediately below PageTitle, before the grid)*:
- title: "Gateway unresponsive — last heard 2025-07-14 04:59:00 UTC"
- description: "1 of 2 gateways active. Check that the gateway agent is running in all configured availability zones. Verify outbound UDP port 51820 is open."
- **Design intent:** Surfacing the exact timestamp prominently (carried from old mocks). Operator needs to know *when* it stopped responding, not just that it's unhealthy.

`DescriptionList` value changes from nyc-prod:
- Status: Badge (warning) "Degraded"
- Active gateways: "1 of 2" in `#8A4F00` bold + inline annotation "↓ 1 unresponsive" (11px `#8A4F00`)
- Last seen: "2025-07-14 04:59:00 UTC" — full timestamp in `#8A4F00` bold
- Network site CIDRs: `10.99.0.0/24` · `10.99.1.0/24`

**Card 1: High availability:**
- Paired DR site: `nyc-prod`
- Failover status: Badge (warning) "Degraded"

**Card 2: Gateway agent:** Same as healthy detail. Version strip shows "New version available."

---

### S9 - Site detail (fl-branch, not connected) *(new in v2.0)*

**Breadcrumb:** `cizh-org / default-project / Vault Dedicated / vault-cluster / Cluster networking / Gateways / fl-branch`

`PageTitle`: "fl-branch" + `Badge` **(offline)** "Not connected"

**`Alert` (neutral)** *(shown below PageTitle)*:
- title: "No tunnel established."
- description: "The gateway agent has not connected yet. Verify the agent is running and can reach HCP on outbound UDP port 51820."

`DescriptionList`:
- Status: Badge (offline) "Not connected"
- Active gateways: "0 of 2" (`#737373`) — no annotation (gateway hasn't been heard from)
- Last seen: "Never" (`#1A1A1A`)
- Deployment model: Docker
- Agent version: `v1.2.1` (mono)
- Network site CIDRs: `192.34.0.0/24`

**Right column:**
- No HA pairing card (no paired site configured yet)
- **Card: Gateway agent** (same shape, same two buttons)

---

## Usability test scenarios

These are the three task prompts for moderated usability testing. Success criteria are based on the critical path through the prototype.

---

### Task 1: Enable gateways and add your first site

**Prompt (read to participant):**
> "You're setting up Vault at your company. Your security team needs to connect an internal network - nyc-prod - to HCP Vault using gateways. Starting from the Networking page, enable gateways and add a site called nyc-prod using the Binary deployment option."

**Starting screen:** S0

**Success path:** S0 → S1 → S2 (Enable) → S3 → S4 (Binary) → S5 → S6 → S7 (complete)

**Success criteria:**
- Participant locates the Gateway card without prompting (S0)
- Participant clicks Enable Gateways without confusion about the modal (S2)
- Participant selects Binary without reading the description aloud or asking for clarification
- Participant reaches S7 (Verify) and identifies that the agent must be running before proceeding

**Watch for:**
- Does the DataplaneHealthStrip on S3 reduce anxiety about whether the HCP side is working?
- Does participant hesitate at the S2 modal? Does the irreversibility warning cause concern or confusion?
- Does participant read the source IP alert on S5, or scroll past it?
- Does the step indicator (1 of 4) help orient the participant during the create flow?
- Does participant notice or interact with "Show advanced options" on S5?

---

### Task 2: Find a degraded site and identify the problem

**Prompt:**
> "You've come back to check on your gateways. One of your sites is showing an issue. Can you find it and tell me what you think is wrong?"

**Starting screen:** S8

**Success path:** S8 (identify nj-dr degraded) → S9 (nj-dr detail) → read timestamp callout + active gateways

**Success criteria:**
- Participant identifies nj-dr as degraded within 30 seconds from S8
- Participant clicks through to S9 without prompting
- Participant correctly reads "1 of 2 gateways active" + the timestamp as the root problem
- Participant can articulate *when* the issue started (timestamp visibility test)

**Watch for:**
- Does the Degraded/Not connected badge distinction read correctly — do participants understand these are different problems?
- Does the inline Alert below the table (nj-dr is degraded) help, or is it redundant with the badge?
- Does participant switch to topology view spontaneously to understand the connection layout?
- Does the prominent timestamp in S9 ("last heard 2025-07-14 04:59:00 UTC") satisfy the "what's wrong?" question without additional clicks?

---

### Task 3: Add a second site using Docker

**Prompt:**
> "Your team wants to add a second site called nj-dr using Docker instead of the binary. Can you add it?"

**Starting screen:** S8

**Success path:** S8 → S4 (select Docker) → S5 → S6 (Docker tab active by default) → S7

**Success criteria:**
- Participant locates "Add site" from S8 without going back to the Networking overview
- Participant selects Docker on S4 (not Binary, which is pre-selected)
- Participant notices that S6 opens on the Docker tab (matching their S4 selection)
- Participant reads at least one of the Docker run flags before clicking Start verification

**Watch for:**
- Does pre-selection of Binary on S4 create inertia — does participant click Next without reading the options?
- Does participant notice the tab pre-selection on S6, or switch to Binary tab accidentally?
- Is the install step numbering (1, 2) sufficient to guide the participant through the sequence?

---

### Task 4 (new in v2.0): Investigate a site that never connected

**Prompt:**
> "You set up a site called fl-branch last week using Docker, but it never came online. Can you find it and tell me what you think you'd do next?"

**Starting screen:** S8

**Success path:** S8 (identify fl-branch Not connected) → S9 (fl-branch detail) → read neutral alert → locate "View install instructions"

**Success criteria:**
- Participant distinguishes "Not connected" from "Degraded" without prompting
- Participant navigates to fl-branch S9 without going to nj-dr first
- Participant can locate "View install instructions" on the Gateway agent card as their next action

**Watch for:**
- Is the `offline` badge (neutral border, muted red text) visually distinct enough from `warning` (amber)?
- Does participant expect a different UI treatment for a site that was never connected vs. one that degraded?
- Does the "No tunnel established" alert on S9 make the problem actionable?
