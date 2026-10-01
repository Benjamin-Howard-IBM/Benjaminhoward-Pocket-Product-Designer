# HVD Gateway: Strategy

> Foundational strategy document for this project.
> Backbone source: [HCPV-HCP-Vault-Dedicated-Gateway.md](HCPV-HCP-Vault-Dedicated-Gateway.md) ([RFC] [HCPV-2006], created Jun 12, 2026, status In-Review, owner sivaramakrishnan.jayaraman@ibm.com)
> Also synthesizes: [HVD Gateways Product Design Specs.md](../04.%20Wireframes/docs/HVD%20Gateways%20Product%20Design%20Specs.md) (V1/V2 UI scope, screen flows, design decisions, open questions, author Benjamin Howard, status In Review)
> Also synthesizes: [HVD-WireGuard-Gateway-Connectivity-Assessment.md](HVD-WireGuard-Gateway-Connectivity-Assessment.md) (connectivity blocker assessment and code findings, Abhijeet Lokhande)
> Status: Draft - the RFC and design spec remain in review. Connectivity findings below are reported by the assessment; its recommendations are proposals, not approved product decisions.
> Created: Sep 29, 2026

## What it is

HVD Gateway is a standalone, CSP-agnostic gateway deployed into both HCP's dataplane network and a customer's private network. The two ends establish a secure WireGuard tunnel, letting HCP Vault Dedicated reach private customer workloads (databases, LDAP, DNS) - and vice versa - without cloud-provider-specific peering (no AWS VPC Peering, no Azure VNet peering, no PrivateLink required).

## Problem statement

HVD's existing private-connectivity options (public endpoint + IP allowlist, or AWS Transit Gateway / Azure VNet peering) are provider-specific. Customers with hybrid, multi-cloud, or on-prem workloads need connectivity that:

- Works across network boundaries without native cloud peering
- Can be deployed and operated asynchronously by HCP
- Supports safe rollouts and future low-downtime updates
- Can evolve toward customer-managed peers and future agent-based reconciliation

WireGuard was chosen because it is provider-agnostic, performs well, and supports simple routed topologies (Curve25519 key exchange, ChaCha20-Poly1305 encryption, operates at layer 3).

## Architecture overview

Two components:

- **Control Plane (CP)** - Managed by the Vault Control Plane Service. Uses Cadence workflows to orchestrate gateway lifecycle events (create, update, promote, rollback, delete), manage keys, and expose configuration APIs.
- **Data Plane (DP)** - The `vault-gateway` binary, running in two modes:
  - **Server mode** - on HCP-managed AMI instances (dataplane side)
  - **Client mode** - as a Docker container in the customer's environment

**Communication:** CP-to-DP(server) is orchestrated via a SCADA tunnel + gRPC (JSON codec). Client-to-CP uses an HTTPS REST API for configuration and token management.

Server-side infra is split into three Terraform modules to support blue-green deployments: **Infra** (EIP + Security Group, persistent), **Instance** (ENI + EC2 instance, per-deployment), **Traffic** (EIP association + routing, points the persistent IP at the active instance).

## How it works (routing, condensed)

- The dataplane VPC routing table gets one entry per customer network CIDR pointing at the dataplane gateway IP.
- Each gateway is a Linux host acting as a "mini router": IP forwarding, routes, and firewall forwarding rules carry traffic through the WireGuard tunnel. The connectivity assessment reports no source NAT/masquerade, so customer source addresses are preserved.
- The RFC describes tunnel addressing in the reserved CGNAT range `100.64.0.0/10`. The connectivity assessment reports that the current API accepts caller-supplied, well-formed ranges without allocating them or checking that they belong to that range; it also reports a fixed gateway interface address of `100.64.0.1/20`. Treat allocation and range validation as unresolved implementation/documentation gaps, not guaranteed behavior.
- End-to-end example: a customer app request to Vault is encrypted/wrapped in UDP by the customer gateway, decrypted at the HCP gateway and forwarded to Vault over the local HVN; if Vault then needs to reach a customer DB (e.g. to vend dynamic credentials), the same path runs in reverse back through the tunnel to the customer's private network. Full 19-step packet trace is in the RFC if needed for a debugging conversation.
- **Customer gateways never accept inbound connections** - they initiate outbound HTTPS to HCP and outbound UDP 51820 to the dataplane gateway's fixed public IP. The assessment reports that the customer endpoint IP is optional: the server learns it from an authenticated handshake, supporting NAT and changing customer addresses. Keepalives are sent every 25 seconds.
- The per-gateway public IP is an AWS Elastic IP and persists when its instance is replaced. A customer can allow-list that destination, but the IP is not available until provisioning unless HCP publishes a regional pool or returns it earlier in the workflow.
- Control-plane HTTPS requests use the standard Go HTTP transport and honor `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY`. A conventional HTTP proxy cannot carry the WireGuard UDP tunnel; proxy-only egress therefore remains unsupported without another transport.

## Customer gateway requirements

- Ability to run the customer gateway as a Docker container with host networking and `NET_ADMIN` and `SYS_MODULE` capabilities; the assessed client requires Linux kernel **>= 5.8**
- **8 GB RAM / 20 GB storage** minimum
- Public DNS resolution to reach HCP platform endpoints
- Outbound HTTPS on port 443 to HCP (works through a configured HTTP(S) proxy)
- Outbound UDP 51820 to the dataplane gateway's public IP
- IP forwarding enabled on the customer host. Docker commonly enables this; the assessment reports the gateway binary does not enable it itself, so non-Docker deployments must arrange it explicitly.
- Secure management of deployment service principals
- Connectivity to whatever private targets are needed per enabled feature (BYO-DNS, dynamic DB credentials, LDAP auth)
- Reachability to the Amazon S3 disaster-recovery signal endpoints; this requirement is missing from the current customer prerequisite documentation.

## Limitations (per RFC, current phase)

| Limitation | Current phase | Future phases |
|---|---|---|
| Max gateway per HVN | 1 (CIDR conflict in route table) | 1 |
| Max peers per gateway | 1 | Multiple |
| Tunnel IP allocation | Caller-supplied; assessment reports no automatic allocation or range enforcement | Define allocation and validate against the documented range |
| Customer-side WG client setup | Automatic (Docker command provided) | - |
| Cloud providers | AWS only | Azure |
| WG key rotation | Control-plane rotation is intended, but assessment reports that client reconciliation ignores preshared-key-only changes until restart | Compare and apply the complete configuration |
| HA | Not supported | Not supported |
| DR | Supported, but assessment reports failover trusts HTTP 200 alone and customer S3 signal reachability is undocumented | Validate the signal and document/test endpoint reachability |
| PR (peer redundancy) | Not supported | Needs multi-peer setup |
| UI | API only | API + Portal UI |

This "max 1 peer per gateway, no HA" limitation is the single biggest driver of the design spec's open questions and decisions below (see OQ5, DD-007/008/009, DAR-003) - the design work is actively trying to close this gap.

## Connectivity and security findings

The following current-state findings are from the connectivity assessment's code review. The assessment distinguishes product behavior from customer network policy; it does not establish that the proposed changes have been approved or shipped.

| Area | Current finding | Strategy implication |
|---|---|---|
| Customer egress | The client uses outbound UDP 51820 to one HCP gateway IP and outbound HTTPS 443 for control-plane calls. There is no alternate tunnel transport. | A narrow outbound exception can address many policies. Proxy-only egress, blocked UDP, or WireGuard application blocking needs a transport fallback. |
| Network security tools | A network-edge tunnel or connector can pass UDP if its policy allows it. An endpoint agent is generally not part of a server's egress path. A proxy alone cannot carry UDP. DPI products may identify the WireGuard handshake. | Ask for a destination-specific UDP 51820 allow rule above broad VPN-category blocks. Do not ask customers to disable inspection broadly. Do not use protocol obfuscation; it hides traffic from customer controls and is not recommended by the assessment. |
| NAT and source identity | Symmetric NAT, carrier-grade NAT, and double NAT are compatible with the outbound-initiated design; 25-second keepalives maintain state. No source NAT is applied through the tunnel. | The customer endpoint IP can be omitted for changing or translated addresses, but preserved customer source IPs must be allowed by the Vault cluster firewall. |
| HCP ingress rule | The assessment reports that when no customer endpoint IP is supplied, the HCP gateway security group permits UDP 51820 from `0.0.0.0/0`; WireGuard still requires an authenticated handshake. | Restrict the source when it is stable; treat the open-source fallback as an explicit security decision and document its rationale and residual exposure. |
| Customer allow-lists | The dataplane EIP is stable per gateway but is not known before provisioning. | Publish regional destination IPs or return the EIP as soon as it is allocated so customers can request firewall changes earlier. |
| DR reachability | The client checks DR signal files in Amazon S3, but this destination is absent from the published prerequisite list. | Add the signal endpoints to requirements and include them in preflight/support diagnostics. |

The tunnel is opaque to customer inspection by design, but the assessment reports that its allowed address ranges constrain it to the Vault network and tunnel address; it is not a general-purpose internet route. Customers control which traffic reaches it through their route entries. The firewall exception request should state this scope and ask only for outbound access from the gateway host to the single gateway destination and required transport.

## Implementation gaps from the connectivity assessment

These are reported code findings, not confirmed resolutions. They can make a working tunnel appear to be a customer firewall problem or leave a real failure without an actionable health signal.

| Area | Reported implementation gap | Consequence / required follow-up |
|---|---|---|
| Vault cluster ingress | Gateway peer CIDRs are not added to the Vault cluster firewall rules. | With customer source addresses preserved, the tunnel can connect while Vault drops traffic from a customer CIDR. Add the configured peer ranges to the cluster rules and test with customer allow-lists enabled. |
| Client configuration refresh | Change detection ignores preshared keys, allowed ranges, and interface addresses; the client polls every five minutes. | Key rotation and network-range edits may not take effect until restart. Compare and apply the full configuration. |
| Health and recovery | Health verdicts are logged but do not block promotion or trigger remediation; the restart operation is not called. The assessment also reports forwarding-rule failures can be logged while startup continues. | The current implementation does not support the documented self-healing claim. Gate promotion on actionable health, remediate failures, and fail startup when forwarding setup fails. |
| MTU | HCP defaults to MTU 1420, the customer side uses the system default, and there is no path discovery or TCP segment-size adjustment. | An overlay path can pass handshakes and small requests but stall larger responses. Measure path MTU, expose configuration, and evaluate segment-size adjustment. |
| Customer endpoint ranges | The assessment reports a supplied address range is reduced to one address when constructing the firewall rule. | Multiple egress addresses can produce intermittent connectivity. Preserve the range or use the documented no-endpoint behavior where appropriate. |
| DR signal validation | Any HTTP 200 is treated as a failover instruction; an intercepting proxy can return a block page with status 200. | Validate the signal rather than status code alone and test proxy-interception behavior. |
| Host forwarding | The HCP image enables and verifies IP forwarding; the gateway binary does not enable it. Customer-side Docker typically enables it, but a host/binary deployment may not. | Make forwarding a checked prerequisite or enable and verify it at startup for each supported deployment model. |
| Image updates | The assessment reports a mismatch between the documented 20-day rotation and a workflow threshold expressed in minutes with a default of 10; no rotation occurs if the setting is not changed. | Align the setting's unit, default, semantics, and documentation, then test actual replacement behavior. |
| HCP runtime model | Provisioning enables the host-binary systemd unit. A separate Docker unit is dormant, contains a personal Docker Hub reference, and is what the reported health service inspects. | Select one supported runtime, remove or correct the other path and registry reference, and align provisioning and health checks before release. |
| Health-service scope | The gateway health service is registered on every Vault node, including nodes without gateway components. | Gate registration to hosts where the gateway runs and point it at the selected runtime. |
| Peer count | The client reads only the first peer returned by the API. | This enforces today's one-peer scope in code; a second peer would be ignored without an error. Keep the one-peer limit explicit until multi-peer support is implemented. |

The assessment also identifies documentation/API mismatches to resolve before implementation handoff: peer endpoint IP is optional; gateway creation does not require a peer; `HCP_AUTH_URL` is required; token refresh is five minutes against a ten-minute token lifetime (not a two-hour refresh); the gateway tunnel address is reported as `100.64.0.1/20` rather than `/32`; caller-supplied tunnel ranges are not checked against `100.64.0.0/10`; and the routing diagram must not show source NAT. The assessment reports that the periodic-update and self-healing descriptions also do not match current code.

## Recommended sequence from the assessment

These are assessment recommendations, not approved roadmap commitments.

| Horizon | Recommended work |
|---|---|
| Immediate, no engineering | Publish the narrow firewall request and security rationale; explain when the customer endpoint IP may be omitted; document S3 DR signal reachability; correct API, token, address, routing, update, and health documentation. |
| Short term | Apply full client configuration changes; add customer CIDRs to cluster ingress; make health actionable; address MTU and endpoint-range handling; support an alternate UDP port (4500 is proposed); correct image rotation and runtime selection; remove personal registry references; scope health checks to gateway hosts. |
| Medium term | Evaluate a fallback sequence of UDP 51820, UDP 4500 or 443, then TCP 443 carrying WireGuard over TLS for UDP-restricted and proxy-only networks. Add a pre-deployment connectivity check for transport, path MTU, proxy behavior, DR endpoints, kernel/module availability, and forwarding. The check needs a published or operator-supplied destination before gateway provisioning. |

The TCP/TLS transport is the assessment's proposed durable answer to restrictive egress, not current capability. It requires changes to the client, configuration API, firewall rules, and transport reporting. A transport decision should include expected customer prevalence and performance tradeoffs; keep TCP/TLS as a fallback rather than presenting it as equivalent to UDP.

## V1 vs V2 product scope

**V1** covers the full Day 0 setup flow and Day N management view for one gateway site per cluster:
- Enable gateways flow (S0 -> S1 -> S2 -> S3)
- Add site wizard - 4 steps: Prerequisites, Configure, Install (Docker only), Verify
- Gateways overview - table view only
- Site detail with site gateway health, dataplane gateway health, and DR pairing
- Remove site

**V2** expands to multiple sites per gateway and adds the binary deployment path:
- Deployment model selector (Binary / Docker) replaces the V1 Prerequisites screen
- Install step gets a Binary tab alongside Docker
- Overview adds a topology view; "Add site" always visible (multi-site)
- Site detail gets a full DR card (primary/backup dataplane gateway pair) and shows Active + Standby nodes in the topology

Full screen-by-screen V1/V2 diffs and the mermaid flow diagrams live in the Product Design Specs doc - not duplicated here.

## Gateway enablement process (condensed)

Two configuration events separated by a system boundary:

| Step | Screen | Actor | What happens |
|---|---|---|---|
| 1. Enable gateways | S2 | Operator + HCP | Operator submits routing table entries (network name, CIDR, AZ). HCP deploys the dataplane gateway(s) via Cadence workflow. |
| 2. No sites state | S3 | HCP | Confirmation screen - dataplane gateways live, no WireGuard peers configured yet. |
| 3. Prerequisites | S4 | Operator | Advisory checklist confirming host environment meets requirements (not technically verified). V2 replaces with deployment model selection. |
| 4. Configure site | S5 | Operator | Names the site, provides service principal credentials, enters network CIDRs -> creates a peer record. |
| 5. Install agent | S6 | Operator | Runs the Docker container (V1) or binary (V2) using provided commands/credentials. |
| 6. Verify | S7 | HCP | HCP polls the dataplane gateway health endpoint; connected once the WireGuard handshake is established. |

**Important dependency (DD-006):** S2's routing-table CIDR and S5's site CIDR are different system layers (VPC route table vs. WireGuard `AllowedIPs`) and **both must exist** for traffic to actually flow - if S2 has a route but S5 has no matching peer CIDR, the VPC delivers the packet to the gateway but WireGuard drops it.

## Key design decisions (from Product Design Specs)

| # | Decision | Call |
|---|---|---|
| DD-001 | WireGuard terminology in UI | "Encrypted tunnel" replaces "WireGuard" everywhere in user-facing copy until IBM legal clears the trademark |
| DD-002 | Peer vs. site language | "Site" is user-facing; "peer" stays backend/API-only |
| DD-003 | Deployment model scope | Docker only in V1; Binary deferred to V2 (no RFC backing yet for binary) |
| DD-004 | Prerequisites gating | Advisory checklist, soft warning only - not hard-gated (can't technically verify kernel/Docker/firewall) |
| DD-005 | Prerequisites format | Inline checklist with "Learn more" links, not a doc-link-only screen |
| DD-006 | S2/S5 CIDR relationship | S5 site CIDRs auto-populate from S2 routing table entries; multiple CIDRs per site supported |
| DD-007 | "Degraded" status definition | Backup dataplane gateway unreachable while active tunnel still works - conditional on OQ5 |
| DD-008 | Health model | Top-level badge = site gateway + primary dataplane gateway health; backup health shown only in site detail - conditional on OQ5 |
| DD-009 | DR card scope | Hidden in V1; V2 shows HCP-managed primary/backup pair, failover automatic - conditional on OQ5 |
| DD-010 | "Extend tunnel life" removed | No RFC backing as a setting |
| DD-011 | Active gateway count removed | Meaningless ratio (always 0/1 or 1/1) with 1 peer in V1 |
| DD-012 | Overview table columns | Site, Status, Site gateway, Dataplane, Last seen, Actions - version column removed |
| DD-013 | Diagram labels | Technology-agnostic; no `wg0`/`wg1` interface names shown to users |
| DD-014 | Dataplane HA model recommendation | Recommends Active/Standby (pre-warmed second EC2, ~10-30s failover) over Active/Active NLB (impractical, WireGuard is stateful) or faster self-healing alone (~1-2min, doesn't meet near-zero bar) - blocked on OQ5 |

## Open questions (from Product Design Specs)

| # | Question | Resolution needed by |
|---|---|---|
| OQ1 | Is customer-side site pairing a V2 HA requirement, or is HA always HCP-managed? | Before V2 design begins |
| OQ2 | Can the system distinguish a Docker capability failure from a blocked UDP 51820 port at verify time? | Before V1 engineering kickoff |
| OQ3 | What's the peer-limit ceiling beyond V1's hard 1-peer limit? | Before V2 design begins |
| OQ4 | Should install-instruction version be dynamically injected (LaunchDarkly flag) or is a placeholder OK for V1? | Before V1 launch |
| OQ5 | RFC provisions a single EC2 instance per cluster (7-10 min estimated downtime on failure) - does V1 need a standby instance instead? **This blocks DD-007/008/009 and DAR-003.** | Before V1 engineering kickoff |
| OQ6 | The S2 AZ-zone dropdown has no corresponding field in the RFC's API/DB schema - remove it or is AZ selection a real input? | Before V1 engineering kickoff |
| OQ7 | Which site fields are actually editable post-creation, given `UpdateGatewayPeer`'s field mask can't touch `peer_id`/`gateway_id`? | Before V1 engineering kickoff |
| OQ8 | What's the tunnel disruption window when `endpoint_ip` or `cidr_block` is edited (client poller runs every 5 min)? | Before V1 engineering kickoff |
| OQ9 | What's the right UI pattern for editing a site - inline, slide-over, or reduced wizard? | Before V1 design completion |

## Design-driven architecture requirements (DAR)

| # | Requirement | Why |
|---|---|---|
| DAR-001 | Client startup telemetry endpoint (Docker client POSTs `interface_created: true/false` + error string to CP after WireGuard init) | Without it, S7 (Verify) can't tell a Docker capability failure apart from a blocked firewall port - both look identical (`ever_connected: false`, no handshake) |
| DAR-002 | Multiple CIDRs per peer - schema review | RFC schema has `cidr_block VARCHAR(50)`; V1 design needs multiple CIDRs per site (real customer networks have multiple subnets) - may need `TEXT`/array or a child table |
| DAR-003 | Active/Standby dataplane gateway (RFC architecture change) | RFC's single-EC2-instance model means ~7-10 min downtime on failure. Recommended fix: pre-warmed standby EC2, SCADA health monitor triggers EIP cutover on failure (~10-30s downtime), CP reprovisions a new standby after failover. Blocked on OQ5. |

## Stakeholders

| Person | Role |
|---|---|
| sivaramakrishnan.jayaraman@ibm.com | RFC owner |
| harini.murugan@ibm.com | RFC approver |
| Dante.Okoh@ibm.com | RFC approver |
| Benjamin Howard | Author, Product Design Specs (V1/V2 UI, screen flows, design decisions) |

## Status

- RFC: In-Review, no approvals confirmed yet.
- Product Design Specs: In Review, V1/V2 scope defined but nine open questions remain unresolved, several of which (OQ5 in particular) block finalizing the health/DR model in both documents.

## Supporting references

Deep technical/design detail lives in these documents and is not duplicated here:

- [HCPV-HCP-Vault-Dedicated-Gateway.md](HCPV-HCP-Vault-Dedicated-Gateway.md) - the full RFC: complete packet-level lifecycle trace, all gRPC/REST API specs, Cadence workflow steps, client startup sequence.
- [HVD-WireGuard-Gateway-Connectivity-Assessment.md](HVD-WireGuard-Gateway-Connectivity-Assessment.md) - detailed blocker-by-blocker rationale and code observations behind the connectivity findings and proposed sequence above.
- [HVD Gateways Product Design Specs.md](../04.%20Wireframes/docs/HVD%20Gateways%20Product%20Design%20Specs.md) - full V1/V2 mermaid screen-flow diagrams, complete screen-to-stage mapping, full design decision and open question detail.
- [HVD-Gateway-Memo-Analysis.md](HVD-Gateway-Memo-Analysis.md) - analysis of the earlier requirements memo that preceded this RFC (goals, business outcomes, assumptions log).
- [001.26.08.05.HVD-Gateway-Technical-Primer.md](../07.%20Research/001.26.08.05.HVD-Gateway-Technical-Primer.md) - plain-language domain primer on Gateway concepts (tunnel, fan-in, source IP preservation, HA/DR) for onboarding.
- [V1-Gateway-Design-Spec.md](../04.%20Wireframes/docs/V1-Gateway-Design-Spec.md) - earlier V1-only design spec, superseded in scope by the combined V1/V2 Product Design Specs doc above but retained for history.

## Repo folder map (this project)

| Folder | What lives there |
|---|---|
| `01. Meetings/` | Meeting summaries |
| `02. Strategy/` | This document, the RFC, memo analysis, and connectivity assessment |
| `03. PDRS/` | Product Design Records (prototype plan) |
| `04. Wireframes/` | Wireframes and design specs, including the Product Design Specs doc |
| `05. Showcases/` | Showcase HTML artifacts |
| `06. Raw Documents/` | Original source documents (e.g. Gateway RFC .odt) |
| `07. Research/` | Research findings, technical primer |
| `References/` | Additional reference material |
