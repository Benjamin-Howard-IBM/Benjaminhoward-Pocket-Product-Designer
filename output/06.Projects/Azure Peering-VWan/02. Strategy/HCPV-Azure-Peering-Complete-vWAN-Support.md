# [PRD] [HCPV-2005]: Azure Peering - complete vWAN Support

| Attribute | Value |
| --- | --- |
| **Document Title** | [PRD] [HCPV-2005]: Azure Peering - complete vWAN Support |
| **Summary** | Go beyond the temporary workaround in place and provide complete Azure Peering vWan support for HCP Vault. |
| **Created** | Jul 15, 2026 |
| **Status** | WIP \| In-Review \| Approved \| Obsolete |
| **Product** | HCP Vault |
| **Owners** | durgesh.shukla@ibm.com |
| **Contributors** | N/A |
| **Approvers** | Dante.Okoh@ibm.com, harini.murugan@ibm.com, Sudeep.Desai@ibm.com |
| **Projects** | N/A |
| **RFC** | N/A |
| **Stakeholders** | N/A |

*NOTE: This document is managed by Hermes and this header will be overwritten using document metadata.*

---

Azure Virtual WAN has become a foundational networking architecture for many enterprise Azure customers. While HCP Vault Dedicated supports traditional Azure VNet peering, it lacks native support for Virtual WAN and Secure Virtual Hub environments, forcing customers into operationally expensive workaround architectures. This PRD introduces native Azure Virtual WAN connectivity as a first-class HCP Vault networking capability, enabling customers to integrate Vault into Microsoft-recommended networking topologies while reducing deployment complexity, improving security alignment, and removing a growing adoption blocker for enterprise Azure customers.

> **Discussion & Context Notes:**
> - **Harini M (2026-07-15):** "Hey @Durgesh Shukla - Thanks for creating this. Can you also please explain why we need VWan based connectivity on top of Gateway and Azure PL (which are currently being worked upon)?"
> - **Durgesh Shukla (2026-07-16):** "Customer feedback (NextEra, CSX) to us on Gateway is that it is allowing their users to connect with Vault; but it does not necessarily align with how enterprises will architect their Azure network. Azure PL and Azure vWan are solving parallel and complementary problems - PL from a customer angle is for privately 'accessing' Vault service. vWan is solving for 'governing' standardization so that Vault becomes a first-class citizen in their standard Azure architecture comprised of Azure FW, Secure virtual hubs, vWan and centralized governance policy sets."
> - **Durgesh Shukla (2026-07-16):** "How I understand it from a benefit standpoint is vWan will lead to HCP Vault being a trusted spoke of the vWan natively, giving customers layer 7 policy control, and DNS auto-propagation. These steps are manual for them with the PL and sometimes introduce drift in the FW rules. Happy to understand and add more reasoning."

---

## Background

Today HCP Vault Dedicated supports Azure private connectivity primarily through HVN-to-VNet peering.

This works well for customers whose Azure environments are built around traditional VNet architectures. However, many enterprise Azure customers have standardized on Azure Virtual WAN (vWAN) & Secure Virtual Hubs as the central networking control plane for their Azure estate.

Azure Virtual WAN centralizes connectivity between:
- Spoke VNets
- Shared Services VNets
- Datacenters
- Branch locations
- VPN connectivity
- ExpressRoute connectivity

In these architectures, customers expect all private services to integrate through the Virtual WAN ecosystem. Today HCP Vault cannot connect natively into Azure Virtual WAN.

Customers must instead deploy workaround architectures such as:

```text
HVN ↔ VNet Peering ↔ Transit VNet ↔ VPN Gateway ↔ VPN Site Connection ↔ Virtual WAN Hub ↔ Spoke VNets
```
or
```text
HVN ↔ VNet Peering ↔ Bridge VNet ↔ Virtual WAN Hub ↔ Secure Virtual Hub ↔ Spoke VNets
```

These workarounds introduce:
- Additional Azure infrastructure
- Additional routing complexity
- Security approval overhead
- Operational burden
- Deployment delays

Several customers have reported deployment blockers or purchasing friction due to the absence of native Virtual WAN support. Customer feedback on Gateway is that it allows users to connect with Vault, but does not necessarily align with how enterprises architect their Azure network. Azure Private Link (PL) and Azure vWAN solve parallel and complementary problems: PL is for privately *accessing* the Vault service, whereas vWAN is for *governing* standardization so Vault becomes a first-class citizen in standard Azure architectures comprised of Azure Firewall, Secure Virtual Hubs, vWAN, and centralized governance policy sets.

**Customer Examples:**
- NextEra Energy
- CSX
- Sitecore related feature requests
- Multiple proof-of-concept customers attempting hub-and-spoke deployments

---

## Problem

Enterprise Azure customers increasingly standardize Azure Virtual WAN and Secure Virtual Hubs as the foundation of their network architecture. HCP Vault networking is currently centered around Azure VNet peering, creating a mismatch between customer architecture standards and HCP's connectivity model for customers standardized on Azure Virtual WAN and Secure Virtual Hubs.

As a result:
- Customers must build transit architectures solely for HCP Vault.
- Customers struggle with route configuration and troubleshooting.
- Secure Virtual Hub architectures are not supported directly.
- Deployments become operationally expensive.
- Some customers are unable to adopt HCP Vault.
- Some evaluations and purchase decisions are negatively impacted.

---

## Personas

### Enterprise Cloud Network Architect / Platform Engineer
Responsible for defining, deploying, and operating Azure networking architectures used by enterprise applications and services.

**Pain Points:**
- Cannot integrate HCP Vault into Azure Virtual WAN architectures using native connectivity.
- Must deploy additional networking infrastructure such as transit VNets, VPN gateways, or other workaround architectures solely to establish Vault connectivity.
- Must deviate from Microsoft-recommended Azure networking architectures to use HCP Vault.
- Experiences increased deployment complexity and operational overhead when onboarding HCP Vault.

### Enterprise Security Architect / Platform Engineer
Responsible for enforcing centralized security, inspection, routing, and governance controls across Azure environments.

**Pain Points:**
- Secure Virtual Hub architectures are not supported directly by HCP Vault.
- Existing workaround architectures may not align with established security and inspection requirements.
- Public endpoint alternatives are not acceptable for production deployments requiring private connectivity.
- Vault connectivity cannot be integrated cleanly into existing Azure Firewall and centralized governance models.

---

## Requirements and Phases

### Phase 1: Native Azure Virtual WAN and Secure Virtual Hub Connectivity

#### JTBD 1
> **When** my organization has standardized on Azure Virtual WAN and Secure Virtual Hubs as the foundation of our Azure networking architecture,  
> **I want to** connect HCP Vault Dedicated into that architecture,  
> **So that** I can consume Vault without introducing additional networking infrastructure or deviating from established enterprise networking standards.

##### CUJ 1.1
As an Azure Network Architect/Platform Engineer, I want to establish connectivity between an HVN and an Azure Virtual WAN deployment so that HCP Vault becomes a private and routable destination within my existing Virtual WAN environment.

**Acceptance Criteria:**
- **1.1.1** Customers can establish native connectivity between an HVN and Azure Virtual WAN.
- **1.1.2** Customers are not required to deploy a transit VNet solely for Virtual WAN connectivity.
- **1.1.3** Customers are not required to deploy a VPN Gateway solely for Virtual WAN connectivity.
- **1.1.4** Customers are not required to deploy VPN Site Connections solely for Virtual WAN connectivity.
- **1.1.5** The connectivity model is fully supported and documented by HashiCorp.
- **1.1.6** Connectivity can be provisioned, updated, and removed through Terraform.
- **1.1.7** Terraform resources expose connectivity state and operational status.
- **1.1.8** Customers are not required to deploy additional customer-managed networking infrastructure solely to establish production HCP Vault connectivity.

##### CUJ 1.2
As an Azure Network Architect/Platform Engineer, I want workloads deployed in spoke VNets connected to Azure Virtual WAN to access HCP Vault so that applications throughout the Azure estate can consume Vault using existing networking paths.

**Acceptance Criteria:**
- **1.2.1** Workloads deployed within spoke VNets can access Vault using private connectivity.
- **1.2.2** Multiple spoke VNets connected to the same Virtual WAN deployment are supported.
- **1.2.3** Connectivity remains functional as customers add additional spoke VNets.
- **1.2.4** Customers are not required to establish separate HVN connectivity constructs for every spoke VNet.

---

#### JTBD 2
> **When** my organization uses Secure Virtual Hubs, Azure Firewall, and centralized routing controls to govern all network traffic,  
> **I want** HCP Vault traffic to traverse those controls,  
> **So that** Vault complies with existing security, inspection, and governance requirements.

##### CUJ 2.1
As a Security Architect/Platform Engineer, I want HCP Vault connectivity to operate with Secure Virtual Hubs so that Vault traffic remains subject to centralized inspection and policy enforcement.

**Acceptance Criteria:**
- **2.1.1** Secure Virtual Hub architectures are officially supported.
- **2.1.2** Connectivity supports Azure Firewall-based inspection paths.
- **2.1.3** Connectivity functions with centralized routing policies managed by Secure Virtual Hubs.
- **2.1.4** Customers are not required to bypass Secure Virtual Hub controls to access Vault.

##### CUJ 2.2
As a Security Architect/Platform Engineer, I want to maintain private connectivity between workloads and HCP Vault so that production deployments do not require public internet exposure.

**Acceptance Criteria:**
- **2.2.1** The supported architecture provides private connectivity between customer workloads and Vault.
- **2.2.2** Public endpoint access with IP allowlists is not required as the primary architecture.
- **2.2.3** Existing customer network-security controls remain enforceable.

---

## Hypothesis Outcomes & KPIs

### Hypothesis 1
Native Virtual WAN connectivity will remove adoption blockers for enterprise Azure customers.

**Supporting KPIs:**
- Number of opportunities citing Virtual WAN as a blocker.
- Number of FRs requesting Virtual WAN support.
- Number of customers onboarded using the feature.

### Hypothesis 2
Native Virtual WAN support will reduce deployment complexity.

**Supporting KPIs:**
- Number of support escalations involving Azure Virtual WAN.
- Number of support escalations involving Azure networking workarounds.
- Customer onboarding satisfaction collected through CSAT and customer interviews.

---

## User Research

### NextEra Energy
- **Current State:** NextEra Energy is attempting to deploy HCP Vault Dedicated within an Azure hub-and-spoke architecture built around Azure Virtual WAN and Secure Virtual Hubs.
- **Key Takeaways:**
  - Deployment is currently blocked.
  - Standard VNet peering does not align with their architecture.
  - Secure Virtual Hubs are part of their required networking model.
  - Existing workaround architectures are not considered acceptable for a long-term solution.

### CSX
- **Current State:** CSX operates Azure hub-and-spoke networking backed by Azure Virtual WAN. Customer standards prohibit appliances, VPN, and ExpressRoute-based alternatives.
- **Key Takeaways:**
  - Adoption is blocked by lack of native Virtual WAN support.
  - Corporate standards prohibit several workaround approaches including network appliances and VPN-based alternatives.
  - Public endpoint alternatives are considered temporary mitigation only.

### Additional Enterprise POCs
- **Current State:** Multiple customers attempted workaround architectures involving HVN peering, transit VNets, VPN gateways, and Virtual WAN.
- **Key Takeaways:**
  - Routing is consistently reported as the primary challenge.
  - Peering workflows are difficult to understand and troubleshoot.
  - Security approval processes create deployment friction.
  - Customers have identified Virtual WAN support as a purchasing consideration.

---

## Approvals

*Approved names will have a ✅*

- Engineering Manager – Sudeep AND Harini:
- Product Management Reviewer – Dante Okoh:
- [Add other approvers as necessary]

---

## Appendix

*(Durgesh Shukla, 2026-09-03: "@Benjamin Howard, @Harini M FYI note for us.")*

### Azure vWAN vs PrivateLink vs Gateway — Why Each Matters

#### The Core Mental Model
Think of these as solving three different problems at different layers:

| Dimension | Gateway (HVN Peering) | Azure Private Link | Azure vWAN |
| --- | --- | --- | --- |
| **What it solves** | Basic private connectivity | Private access to the Vault service | Network governance & architecture fit |
| **Layer** | L3 routing | Service access endpoint | Enterprise network topology |
| **Who cares** | Dev teams, small orgs | Security-focused orgs | Enterprise Platform / Network teams |
| **Analogy** | A road to your house | A private mailbox | Being part of the city's official road network |

---

### Why Gateway alone isn't enough
Gateway (HVN ↔ VNet peering) works — customers can reach Vault — but it doesn't fit how enterprise Azure is actually architected. The feedback from NextEra and CSX is exactly this: *"It connects, but it doesn't belong."*

Enterprise customers have standardized on hub-and-spoke architectures. In that model:
- All traffic flows through a central hub
- Azure Firewall sits in the hub and inspects everything
- Spoke VNets get connectivity automatically via the hub

With Gateway/VNet peering, Vault sits outside this topology entirely. Customers have to bolt on transit VNets, VPN gateways, and manual routing just to get Vault reachable — infrastructure that exists only to work around the gap.

---

### Why Private Link doesn't replace vWAN either
PrivateLink solves a different problem. It lets customers create a private endpoint inside their VNet that routes to Vault without traversing the public internet. That's great for:
- Removing public IP exposure
- Satisfying compliance requirements around private access

But PrivateLink doesn't make Vault a citizen of the vWAN topology. Customers still have to:
- Manually configure DNS propagation for each spoke
- Manually update Azure Firewall rules as the network evolves — introducing policy drift over time
- Manage PrivateLink endpoints per-VNet (doesn't scale across a large hub-and-spoke)

As summarized: *"PL is for privately accessing Vault. vWAN is for governing standardization."*

---

### What vWAN actually gives customers
When Vault has native vWAN support, it becomes a **trusted spoke** of the Virtual WAN. The enterprise benefits are:
1. **L7 policy control:** Azure Firewall policies apply to Vault traffic automatically, the same way they apply to every other service in the estate without special carve-outs.
2. **DNS auto-propagation:** Route tables and DNS resolution update automatically as new spoke VNets are added. With PrivateLink, this is manual per-VNet and a common source of drift.
3. **Secure Virtual Hub support:** Vault traffic flows through centralized inspection. For security architects, this is non-negotiable. Workaround architectures often bypass the Secure Hub, failing security review.
4. **No bespoke infrastructure:** Customers eliminate the transit VNet + VPN gateway + VPN site connection stack maintained solely to bridge Vault into vWAN, removing real Azure cost and operational overhead.
5. **Scales across the estate:** One vWAN connection serves all spoke VNets connected to that hub, without customers creating separate peering constructs per spoke (directly addressing AC 1.2.4).

---

### Why this is a purchasing blocker specifically
For NextEra and CSX, the issue isn't that they cannot technically reach Vault — they can via workarounds. The issue is:
- CSX corporate standards prohibit workaround approaches (no VPN appliances, no ExpressRoute workarounds).
- Workaround architectures fail security review because they bypass Secure Virtual Hub inspection.
- The operational cost of maintaining workaround infrastructure is high enough that teams choose not to adopt HCP Vault rather than carry the burden.

### The One-Liner Summary
> **Gateway lets customers connect to Vault. PrivateLink lets customers access Vault privately. vWAN lets Vault belong to their enterprise architecture — subject to the same firewall policies, routing controls, and DNS governance as every other service they run on Azure.**
