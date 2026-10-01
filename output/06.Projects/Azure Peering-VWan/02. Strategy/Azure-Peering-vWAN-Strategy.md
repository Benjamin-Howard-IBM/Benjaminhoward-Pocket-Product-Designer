# Azure Peering - vWAN: Strategy

> Foundational strategy document for this project.
> Primary source: [HCPV-Azure-Peering-Complete-vWAN-Support.md](HCPV-Azure-Peering-Complete-vWAN-Support.md) ([HCPV-2005] PRD, created Jul 15, 2026, owner durgesh.shukla@ibm.com)
> Status: Draft - synthesizing a WIP PRD. The source PRD has no approver checkmarks yet; nothing below should be read as finalized.
> Created: Sep 29, 2026

## What it is

HCP Vault Dedicated supports Azure private connectivity today primarily through HVN-to-VNet peering (Gateway). This project adds native Azure Virtual WAN (vWAN) and Secure Virtual Hub connectivity as a first-class HCP Vault networking capability, so Vault can integrate into the hub-and-spoke, centrally-governed network architecture that many enterprise Azure customers have already standardized on - without customers building bridge/transit infrastructure solely to reach Vault.

## Why it matters

Enterprise Azure customers running Virtual WAN expect every private service, including Vault, to be a native spoke of that topology. Without it, customers must stand up workaround architectures (transit VNet + VPN gateway + VPN site connection, or bridge VNet + Secure Virtual Hub) that add infrastructure, routing complexity, and security-approval overhead - and some customers cannot adopt HCP Vault at all as a result.

This has already surfaced as a concrete adoption blocker, not a hypothetical one:

- **NextEra Energy** - deployment blocked; standard VNet peering does not fit their Virtual WAN + Secure Virtual Hub architecture, and existing workarounds are not acceptable long-term.
- **CSX** - adoption has been reported as blocked by its vWAN architecture and policy requirements. In the Sep 30, 2026 discovery, CSX preferred direct vWAN hub attachment, while participants disagreed about whether a VNet-based interim/alternate path is prohibited or could be approved. The policy owner and permitted path remain unconfirmed; see [CSX-Hashicorp-Discovery-Summary.md](CSX-Hashicorp-Discovery-Summary.md).
- **Multiple additional enterprise POCs** - consistently report routing as the primary challenge, peering workflows as hard to troubleshoot, and security approval as a source of deployment friction.

## Personas

| Persona | Responsible for | Pain points today |
|---|---|---|
| **Enterprise Cloud Network Architect / Platform Engineer** | Defining, deploying, and operating Azure networking architectures for enterprise applications and services | Cannot integrate HCP Vault into Virtual WAN natively; must deploy transit VNets/VPN gateways solely for Vault; must deviate from Microsoft-recommended architecture; increased deployment complexity onboarding Vault |
| **Enterprise Security Architect / Platform Engineer** | Enforcing centralized security, inspection, routing, and governance controls across Azure environments | Secure Virtual Hub architectures not supported directly; workaround architectures may not meet inspection requirements; public endpoint alternatives not acceptable for production; Vault connectivity doesn't integrate cleanly with Azure Firewall / centralized governance |

## JTBDs and CUJs (summary)

Full acceptance criteria live in the PRD; summarized here as intent only.

**JTBD 1** - When an organization has standardized on Virtual WAN and Secure Virtual Hubs, connect HCP Vault into that architecture without introducing additional networking infrastructure or deviating from enterprise standards.
- CUJ 1.1: Establish native HVN <-> Azure Virtual WAN connectivity (no transit VNet, VPN gateway, or VPN site connection required solely for this purpose; fully Terraform-provisionable).
- CUJ 1.2: Workloads in spoke VNets connected to that Virtual WAN reach Vault, across multiple spokes, without a separate HVN connectivity construct per spoke.

**JTBD 2** - When an organization uses Secure Virtual Hubs, Azure Firewall, and centralized routing to govern all traffic, Vault traffic should traverse those same controls.
- CUJ 2.1: HCP Vault connectivity operates with Secure Virtual Hubs (Azure Firewall inspection paths, centralized routing policy) without requiring customers to bypass those controls.
- CUJ 2.2: Connectivity stays private end-to-end; public endpoint + IP allowlist is not the primary architecture, and existing network-security controls remain enforceable.

## Key decisions and hypotheses

| Hypothesis | Supporting KPIs |
|---|---|
| **H1** - Native Virtual WAN connectivity removes adoption blockers for enterprise Azure customers | # opportunities citing Virtual WAN as a blocker; # feature requests for Virtual WAN support; # customers onboarded using the feature |
| **H2** - Native Virtual WAN support reduces deployment complexity | # support escalations involving Azure Virtual WAN; # support escalations involving Azure networking workarounds; onboarding CSAT / customer interviews |

## How this relates to Gateway and Private Link

These three solve different, complementary problems - not competing approaches:

| Dimension | Gateway (HVN Peering) | Azure Private Link | Azure vWAN (this project) |
|---|---|---|---|
| What it solves | Basic private connectivity | Private access to the Vault service | Network governance and architecture fit |
| Layer | L3 routing | Service access endpoint | Enterprise network topology |
| Who cares | Dev teams, small orgs | Security-focused orgs | Enterprise Platform / Network teams |
| Analogy | A road to your house | A private mailbox | Being part of the city's official road network |

**One-liner:** Gateway lets customers connect to Vault. PrivateLink lets customers access Vault privately. vWAN lets Vault belong to their enterprise architecture - subject to the same firewall policies, routing controls, and DNS governance as every other service they run on Azure.

Native vWAN support makes Vault a trusted spoke: Azure Firewall (L7) policy applies to Vault traffic automatically, DNS/route propagation to new spokes is automatic instead of manual-per-VNet, Secure Virtual Hub inspection applies without workaround architectures bypassing it, and one vWAN connection serves all spokes on that hub rather than a separate construct per spoke.

## CSX discovery validation (Sep 30, 2026)

The CSX discovery supports direct connection of the Azure VNet hosting the HVN to CSX's Secure Virtual Hub as the preferred target: CSX wants traffic to enter its centrally governed firewall path without a customer-side bridge VNet. It does not describe a VNet-free attachment; the Azure VNet remains part of the HCP topology.

The target is not yet approved or technically validated for CSX. HCP described a cross-tenant Azure API flow requiring a service principal and role assignment. CSX requested exact permissions, assignment scope, and whether the identity is temporary or persistent; CSX does not want unnecessary hub-delete access. IBM security review and CSX leadership/security approval remain pending.

A VNet-based interim or alternate path was discussed, but CSX's policy authority did not confirm it is allowed. The participants also did not establish whether the earlier failed attempt used standard HVN-to-VNet peering or a bridge/transit VNet. Derrick estimated a future cutover could interrupt connectivity for about five minutes; treat this as an unverified estimate. IP and routing impacts depend on the selected CIDR and whether access must extend beyond Azure, potentially requiring Verizon routing.

This discovery does not validate the strategy's Terraform end-to-end, multi-spoke, automatic route/DNS propagation, or firewall-enforcement claims. Confirm these against the selected topology and test evidence before treating them as acceptance criteria already met.

## Stakeholders

| Person | Role |
|---|---|
| durgesh.shukla@ibm.com | Owner |
| Dante.Okoh@ibm.com | Approver (Product Management) |
| harini.murugan@ibm.com | Approver (Engineering Manager) |
| Sudeep.Desai@ibm.com | Approver (Engineering Manager) |

## Open questions / status

- PRD is still WIP - approvals section has no confirmed approvers yet (Sudeep + Harini, Dante Okoh all pending).
- Relationship/sequencing against Gateway and Azure PrivateLink (both currently in progress) is asserted as complementary, not competing, but not yet formally reconciled in a combined roadmap.
- CSX architecture decision is pending: confirm direct vWAN approval, whether any interim VNet path is permitted, least-privilege identity requirements, CIDR/reachability scope, and the migration plan. The discovery did not establish why the prior attempt failed or validate the route/firewall behavior.

## Supporting references

These remain the deep technical reference for this project and are not duplicated here:

- [CSX-Hashicorp-Discovery-Summary.md](CSX-Hashicorp-Discovery-Summary.md) - Sep 30 discovery summary, explicit owner-qualified action items, unresolved questions, and transcript-to-strategy alignment checks.
- [Azure-Virtual-WAN-Overview-and-Architecture.md](Azure-Virtual-WAN-Overview-and-Architecture.md) - Microsoft Learn reference on Virtual WAN fundamentals: hub-and-spoke/global transit architecture, core resources (Virtual WAN, Virtual Hub, Hub Connections, Route Tables), Basic vs. Standard SKU capability differences, routing/transit mechanics, and hub router scale limits (50 Gbps aggregate throughput, ~2,000 VM workloads per hub by default).
- [Migrate-to-Azure-Virtual-WAN-Architecture-and-Guide.md](Migrate-to-Azure-Virtual-WAN-Architecture-and-Guide.md) - Microsoft Learn migration guide from a customer-managed hub-and-spoke topology to Virtual WAN: phased cutover steps (deploy hub, connect ExpressRoute/VPN, validate via test spoke, cut over production spokes, convert legacy hub to a shared-services spoke, decommission), end-state traffic flow paths, and Secured Virtual Hub / Azure Firewall Manager setup for centralized inspection.

## Repo folder map (this project)

| Folder | What lives there |
|---|---|
| `01. Meetings/` | Meeting summaries |
| `02. Strategy/` | This document, the PRD, CSX discovery summary, and the two Azure vWAN reference docs |
| `03. PDRS/` | Product Design Records |
| `04. Wireframes/` | Wireframes |
| `05. Showcases/` | Showcase HTML artifacts |
| `07. Research/` | Research session findings |
| `References/` | Additional reference material |
