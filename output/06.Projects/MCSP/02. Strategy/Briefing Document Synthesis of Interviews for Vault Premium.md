# Briefing Document: Synthesis of Interviews for Vault Premium Federal Offering

## Executive Summary

This document synthesizes findings from interviews with solutions engineers covering the U.S. federal market to inform the strategy for a new Vault Premium offering. The analysis reveals that while the market opportunity is substantial, success is contingent upon meeting a stringent and complex set of security, compliance, and architectural requirements that differ significantly from the commercial sector.

The single most critical takeaway is that **FedRAMP compliance is the non-negotiable prerequisite for market entry**. Without it, a SaaS offering is a non-starter for virtually all federal agencies. The consensus indicates that FedRAMP Moderate is the minimum viable level for launch, sufficient for many civilian agencies, while FedRAMP High is essential for broader adoption, particularly within the Department of Defense (DoD).

Key product requirements diverge based on the specific federal segment. For data isolation, a tiered architectural offering is necessary: a low-cost shared-node model may appeal to some civilian agencies, but dedicated nodes and fully dedicated clusters are mandatory for security-conscious DoD and Intelligence Community (IC) customers. Similarly, Bring Your Own Key (BYOK) capabilities must be dual-faceted, with cloud KMS support being adequate for some, while Hardware Security Module (HSM) integration is a hard requirement for high-security environments. Finally, a robust disaster recovery (DR) strategy, minimally offering an active-passive configuration, is considered table stakes for these mission-critical deployments.

## The Federal Customer Landscape

The federal market is not monolithic. It comprises distinct segments with vastly different operational realities, security postures, and technology adoption cycles. Understanding these segments is critical to tailoring the product offering effectively.

| Customer Segment | Key Characteristics | Primary Vault Environment |
| --- | --- | --- |
| **Civilian Agencies** | Includes FAA, CIS, IRS. Slower adoption cycles (often over a year to first use case). Operations are mostly unclassified. Security needs are typically met by FedRAMP Moderate. Often lack deep technical expertise, making a SaaS offering highly desirable. | Primarily on-premise due to lack of a FedRAMP SaaS option. Would be strong candidates for a cloud offering. |
| **Dept. of Defense (DoD/DOW)** | Includes Air Force, Space Force, DISA, and Combatant Commands. Operates mission-critical and weapon systems. Requires a mix of unclassified (NIPR) and classified (SIPR, JWICS) air-gapped networks, necessitating multiple isolated Vault clusters. Security needs often demand FedRAMP High. | Self-hosted on-premise, often in disconnected or tactical edge environments. A cloud offering would be used for unclassified development ("low-side") and administrative systems (e.g., HR, legal). |
| **Intelligence Community (IC)** | Three-letter agencies (names abstracted for security). Highest security requirements, exceeding FedRAMP High (requiring IL-5, TSSCI, etc.). Production workloads run in specialized, highly secure clouds (C2S/C2E). | Exclusively self-hosted on highly secure "high-side" networks. A FedRAMP High cloud offering would not be used for production but is valuable for development on the "low-side" and serves as a crucial validation of the product's security rigor. |
| **Federal Systems Integrators (FSIs)** | Includes Lockheed Martin, Raytheon, Leidos. Build and manage systems on behalf of government agencies, primarily DoD. Their requirements mirror those of their end customers, spanning both unclassified and highly classified environments. | Self-hosted, mirroring the deployment patterns of their government partners. |

## Core Product Requirements & Strategic Imperatives

Federal customers have a distinct hierarchy of needs that must be addressed for a SaaS product to be considered viable.

### 1. FedRAMP Compliance: The Primary Blocker

FedRAMP certification is the universal gatekeeper to the federal SaaS market. Without it, conversations with potential customers cannot even begin.

- **The Absolute #1 Requirement:** Every interviewee confirmed that the lack of FedRAMP certification is the sole reason federal customers do not use existing Vault cloud services. As one expert stated, "It's 100% FedRAMP... when they deploy it on Prem... we've already done a lot of the legwork for securing that on Prem environment."
- Required Levels:
  - **FedRAMP Low:** Considered "useless" and not worth the effort.
  - **FedRAMP Moderate:** The minimum viable level for a GA release. It would make the product acceptable for most civilian agencies and some unclassified DoD workloads.
  - **FedRAMP High:** The target for broad market acceptance. It is required for most production environments in the DoD and is seen as the standard they expect.
- **A "Stamp of Approval":** Even for the Intelligence Community, which cannot use a public SaaS offering for its classified "high-side" missions, achieving FedRAMP High certification is critical. It provides them with the confidence that the product has undergone rigorous security validation, making it easier for them to grant their own internal Authority to Operate (ATO) for self-hosted deployments.

### 2. Data Isolation Architecture: A Tiered Approach

A one-size-fits-all tenancy model will fail in the federal market. The offering must provide tiered options that balance cost against the stringent isolation demands of different agencies.

- **Option 1 (Multi-Tenant Node):** Customers share worker nodes but are separated by namespaces. This is the most cost-effective model but is viewed as unacceptable by most security-conscious agencies. It may be viable for non-sensitive civilian workloads (e.g., HR systems) where budget is the primary driver.
- **Option 2 (Single-Tenant Node):** Customers are allocated dedicated worker nodes but share a broader control plane and cluster infrastructure. This is viewed as the "sweet spot" and a likely acceptable configuration for a majority of federal customers, including many DoD use cases.
- **Option 3 (Dedicated Cluster):** Customers receive a completely isolated cluster. This is the most expensive option but is a **mandatory requirement** for the most sensitive customers in the IC and DoD, who will not accept any shared infrastructure. These customers have the budget and will pay for complete physical and logical separation.

### 3. Bring Your Own Key (BYOK): Differentiated Needs

The ability for customers to control their own encryption keys is fundamental, but the implementation method must cater to different security levels.

- **Cloud KMS (e.g., AWS KMS):** This is a sufficient and practical solution for a significant portion of the market, particularly civilian agencies. One expert noted, "Almost zero. I have like a one customer with their own HSM... they're a lot less common than maybe you'd think."
- **Hardware Security Module (HSM):** This is a **non-negotiable, hard requirement** for the DoD and IC. Their security mandates require FIPS 140-2/3 Level 2 (or higher) compliance, which can only be achieved with a hardware-based solution. As one SE stated, "In most cases they require an HSM like 97% of the time, if not more."

### 4. Disaster Recovery (DR) and Continuity of Operations (COOP)

Because Vault is considered a "Tier 0" service in mission-critical environments, a robust and tested DR strategy is essential.

- **Backup and Restore:** This basic approach is insufficient and would be considered a "downgrade" from current self-hosted capabilities.
- **Active/Passive (Warm Standby):** This is the **minimum acceptable standard**. Customers expect the ability to fail over to a passive cluster in a separate geographical region.
- **Active/Active (Hot-Hot):** This is the ideal state, especially for DoD customers who plan for "Continuity of Operations" (COOP), which requires near-instantaneous failover to maintain mission functions during a disaster.

### 5. Connectivity and Networking

Secure and flexible networking is a foundational requirement, especially given the prevalence of isolated and on-premise environments.

- **Initial AWS Focus:** Launching with AWS Private Link is considered a viable and secure starting point for connecting to customer VPCs and on-premise systems.
- **Multi-Cloud Reality:** The federal government is actively multi-cloud. While AWS is a safe bet, Azure has a significant presence (described as a "50/50 Azure to AWS" split in the DoD), and future support will be necessary.
- **Air-Gapped Networks:** A defining feature of DoD and IC environments is the use of multiple, disconnected networks (e.g., Nipper, Sipper, JWICS). The architecture must account for customers needing to connect to and manage Vault instances across these isolated enclaves.

## Prevalent Use Cases and Technology Stacks

The technology landscape and primary use cases within the federal sector show a distinct emphasis on security and open-source tooling.

### Key Vault Use Cases

While basic static secrets management is a common starting point, advanced features are heavily utilized, particularly in the DoD.

| Use Case | Prevalence & Notes |
| --- | --- |
| **PKI** | **Highly prevalent in the DoD**, with one expert estimating "80 to 90%" of their customers use it. This is in stark contrast to civilian agencies, where usage is reportedly very low due to centralized control of root CAs. |
| **Dynamic Secrets** | Widely used for database credentials (Postgres), SSH certificate authorities for short-lived keys, and cloud credentials (especially via Terraform integration). |
| **KMIP** | A key use case for approximately 50% of DoD customers, used for integrating with storage systems like NetApp and VMware for higher-level encryption. |
| **HSM Integration** | A critical feature for DoD/IC customers to achieve auto-unseal and meet FIPS compliance for managed keys. |
| **Static Secrets (KVv2)** | Serves as the foundational entry point for many agencies as they begin their secrets management journey. |
| **Password Manager** | An unexpected but recurring request for a simple, user-facing password manager feature, as personnel are often prohibited from installing commercial tools like 1Password on government systems. |

### Common Technology Stacks

| Category | Technologies |
| --- | --- |
| **Cloud Platforms** | AWS GovCloud, Azure Government. The IC uses specialized environments like C2S and C2E. |
| **Orchestration** | Kubernetes is dominant. Common distributions include **OpenShift**, **Rancher**, Spectral Cloud, EKS, and AKS. |
| **Identity Providers** | **Keycloak** is a widely used open-source IdP in the DoD. Standard protocols are OIDC, SAML, and LDAP. |
| **CI/CD & Automation** | GitLab, Jenkins, Ansible, and Terraform are all in common use. |
