# [Research Findings] MCSP RFI Demand Signal Extraction

> Summary: Structured extraction of demand, sizing, SLA, and constraint signals from 11 federal RFI source documents, feeding decisions D1-D5 and the RFP/RFI stream of the FedRAMP Vault adoption study. Per the research plan's bias-mitigation rule, every RFI-derived figure is treated as a procurement-optimism upper-bound and capped at Low confidence until telemetry-anchored.
> Created: June 5, 2026
> Status: Draft
> Product: Vault on MCSP
> Owner: benjamin.howard@ibm.com
> Companion to: [Research Plan] MCSP FedRAMP Adoption Exploration; [Research Script] MCSP FedRAMP Adoption Internal Interviews v4 Focused

## Executive summary

This extract covers the 11 `.md` files in the RFI source folder. Three of them are not primary agency RFIs and are treated as weaker evidence: the DISA file is a secondhand analytical comparison of an RFI versus an OTA, the Gen AI file is a HashiCorp response draft (its questions are reverse-engineered from section headers), and the PAM file is a Lockheed Martin corporate questionnaire rather than a federal agency notice. Eight are government-issued RFIs.

Findings that change a decision or bound a hypothesis:

- Segment coverage is skewed. By issuing context: 9 DoD and 2 FSI (both Lockheed Martin). There are zero Civilian RFIs and zero Intelligence Community (three-letter agency) RFIs in this corpus. AFTAC is Air Force and IC-adjacent (nuclear treaty monitoring) but its RFI reads as an unclassified procurement, not a high-side IC notice. Any segment-differentiated claim for Civilian or IC cannot be supported from this RFI set.
- Topical relevance is narrow. Only two documents are core secrets/key-management on-topic for Vault: AFTAC KMS and the LM PAM questionnaire. Two more are ICAM/identity (Unified ICAM, T-ICAM), with AFTAC also requiring ICAM integration. The Gen AI response is Vault-centric but is a vendor narrative with no demand figures. The remaining five (Army IaaS, BDP, DISA, ISN-M, IPPS-A) are adjacent infrastructure, orchestration, or ERP modernization.
- Sizing language is sparse and coarse. The only explicit demand figures are: AFTAC "thousands of users and devices" (production) and "a thousand users and devices" (RDT&E); Army IaaS per-post CPU/RAM/storage rollups (160 cores / 708 GB / 38 TB down to 44 cores / 168 GB / 6 TB); IPPS-A "over 1.1 million Soldiers"; and BDP clusters "over 15 petabytes." No RFI states an authentication rate, peak concurrency, secret/KV count, or namespace count. This absence is itself the H4 pattern: stated sizing is static headcount or footprint, not dynamic load.
- The strongest reliability signal is AFTAC: 99.99% uptime, active-active production plus continuity, vendor-stated RPO/RTO, and zero-downtime patching. ISN-M states a support SLA (24/7, 4-hour response, on-site technicians) but not an uptime target. Every other document offers only qualitative "high availability."
- Constraint clauses are the densest and most consistent signal, and they are the most usable extract for D5. Zero Trust is near-universal (NIST SP 800-207 named in several). Air-gap across NIPR/SIPR/JWICS recurs. FIPS 140-2/140-3, the Approved Products List, and NIAP/CCEVS appear where hardware or National Security Systems are in scope. FedRAMP is named explicitly only by the LM PAM questionnaire; IPPS-A names FedRAMP IL-6 once. ATO appears in the tactical Army documents.
- Hypothesis read is weak and directional only. H1 (machine-heavy) gets Low-confidence support from the ICAM and KMS documents treating non-person entities as first-class, but no RFI states a machine-to-human ratio. H5 (tiers needed) gets the corpus's clearest directional support from the heterogeneity of demand shapes and from AFTAC's own internal production/RDT&E/air-gapped tiering. H2 and H3 are effectively silent. H4's premise is consistent with the data but can only be confirmed against telemetry.
- All figures below are tagged Low and labeled upper-bound, per the plan's rule that RFI-derived values carry procurement-inflation bias and require behavioral corroboration before entering the tier matrix.

Task 3 yields 60 deduplicated questions across 7 themes. Groupings are detailed in Task 4.

## Task 1: Per-RFI extracts

### 1. Army Infrastructure as a Service (IaaS)

- Issuing org: DoD, Army, PEO C3N, PM Mission Command, Product Manager Tactical Mission Command (PdM TMC). Notice ID W15P7T-25-R-IaaS. Aberdeen Proving Ground, MD. Special Notice, April 2025.
- Segment: DoD (Army tactical / mission command).
- Summary: Market research, via 10-page white paper, on new approaches to contract for, provision, maintain, and refresh the computing environments that support unit Mission Command across garrison, exercise, training-center, and deployed DDIL operations. Seeks on-demand virtualized compute that travels with the unit and supports COOP, testing, and large-scale combat operations.
- D1 demand/sizing: Explicit per-post software resource rollups. Main Command Post: 160 CPU cores, 708 GB memory, 38 TB storage. Tactical Command Post: 151 CPU cores, 640 GB memory, 30 TB storage. Mobile Command Post: 44 CPU cores, 168 GB memory, 6 TB storage. Four hardware families with size/weight/power/compute sub-variants (BCCSv5, TSIv1, TSIv2 Large/Small, TSIv3 Large/Medium/Small). Inferred: these are envelope footprints for the full mission-command software stack, not secrets-management workloads. Users, machines, secrets, namespaces, auth rate: Not stated.
- D2 auth load / concurrency / performance: Not stated as rates. Qualitative "robust performance," monitoring/dashboards, performance in contested environments.
- D3 scaling / capacity / growth: Explicit but qualitative. "Scalability to meet demand"; remote provision, monitor, and scale infrastructure as mission demands fluctuate; automated infrastructure scaling; seamless garrison-to-deployed transitions. No numeric growth or multi-cluster thresholds.
- D4 SLA / availability / RTO / RPO: Qualitative only. "Applications and data must be continuously available for soldier use, independent of external network connectivity or hardware failure"; high availability; disaster recovery / COOP. No uptime, RTO, or RPO numbers.
- D5 constraints: DDIL environments; Authority to Operate (ATO); data security, encryption, identity management, regulatory compliance, compliance certifications; CUI (32 CFR Part 2002). Air-gap implied via "multiple information domains during coalition operations" and declassification on return. FedRAMP level, FIPS/HSM, explicit IL: Not stated.
- Vault relevance: Adjacent. IaaS for tactical mission command; encryption and identity management named only as security features. Vault could be a sub-component, but the RFI is not a secrets-management ask.
- Confidence: Low. Single RFI self-report; the only hard numbers are a static software-stack footprint, not Vault load. Upper-bound.

### 2. BDP Orchestration Capabilities (Unified Platform Data Value Stream)

- Issuing org: DoD, Department of the Air Force, AFLCMC, Cryptologic and Cyber Systems Division, Joint Base San Antonio-Lackland, TX. RFI under FAR 52.215-3, 2 October 2024. Program supports Unified Platform (UP) DoD cyber operations.
- Segment: DoD (Air Force / cyber operations).
- Summary: Market research for alternatives to the Rapid Analytic Deployment and Management Framework (RADMF) used for UP Big Data Platform orchestration on AWS GovCloud. Seeks automated provisioning of a multi-node cloud platform, CI/CD-driven cluster deployment, elasticity for ingest/normalization/indexing, and PCAP processing for threat hunting.
- D1 demand/sizing: Explicit storage scale: clusters "of over 15 petabytes in size." Multi-node platform supporting "a specific range of numbers of computers or VMs." Inferred: large analytics footprint, not secrets/KV. User, secret, namespace counts: Not stated.
- D2 auth load / concurrency / performance: Not stated as rates. Requirement that orchestration "doesn't impact or degrade existing system performance" and supports partial orchestration without disrupting active services.
- D3 scaling / capacity / growth: Explicit but qualitative. Auto-scaling to maintain a range of VMs; elasticity and scalability of the big-data platform; resource provisioning, configuration, monitoring, scaling, and removal.
- D4 SLA / availability / RTO / RPO: Qualitative. "The system shall be deployed in a high availability architecture." No numbers.
- D5 constraints: Must work across NIPRNet, SIPRNet, and JWICS (full three-network air-gap); web-based remote management with role-based access control; integration with a web-based Enterprise Directory; AWS GovCloud; DoD security compliance. FedRAMP level, FIPS/HSM: Not stated.
- Vault relevance: Adjacent. Orchestration and big-data provisioning (closer to Terraform/Nomad than Vault). RBAC and directory integration are identity-adjacent.
- Confidence: Low. Single RFI; the 15 PB figure is storage capacity, not Vault demand. Upper-bound.

### 3. DISA Distributed Hybrid Multi-Cloud (DHMC): RFI versus OTA comparison

- Issuing org: DoD, Defense Information Systems Agency (DISA). The file itself is an internal analytical report comparing the DHMC RFI Statement of Needs to the DHMC OTA Request for White Papers, not a primary RFI.
- Segment: DoD.
- Summary: A side-by-side comparison concluding that the DHMC RFI is broad and exploratory while the OTA RWP is a specific prototype solicitation. The OTA specifies a centralized management/control plane consolidating x86 environments, with multi-tenancy, Zero-Trust, and commercial cloud integration.
- D1 demand/sizing: Not stated. No counts; references "all current x86 environments," containers, and virtualized assets without quantities.
- D2 auth load / concurrency / performance: Not stated.
- D3 scaling / capacity / growth: Qualitative. Centralized control plane consolidating multiple cloud and on-premises environments; multi-cloud management. No numbers.
- D4 SLA / availability / RTO / RPO: Not stated.
- D5 constraints: Multi-tenancy support, Zero-Trust architecture, integration with commercial cloud service providers (OTA side). FedRAMP level, FIPS, air-gap: Not stated in the comparison.
- Vault relevance: Adjacent. Hybrid multi-cloud management plane. The document's value is methodological: it documents the maturity gradient from exploratory RFI to specific OTA, which informs the maturity segmentation in Task 4.
- Confidence: Low. Secondhand summary, one step further removed from the issuing agency than a primary RFI. Upper-bound.

### 4. Gen AI RFI (Lockheed Martin / Ollivander), HashiCorp response draft

- Issuing org: Lockheed Martin (FSI), internal Ollivander IDIQ program, GED mission. The file is a HashiCorp response draft; the RFI questions are recoverable from the numbered response headers.
- Segment: FSI (Lockheed Martin).
- Summary: HashiCorp's draft answers to an LM RFI on Generative AI capability, covering Nomad/Vault for AI/ML workload orchestration, private and air-gapped LLM deployment, secrets and key management for AI pipelines, Vault Radar for PII/CUI scanning, and a "Better Together" HashiCorp/Red Hat/IBM stack.
- D1 demand/sizing: Not stated. No federal sizing figures; this is a capability narrative.
- D2 auth load / concurrency / performance: Not stated. References GPU-optimized node pools and dynamic resource allocation without quantities.
- D3 scaling / capacity / growth: Qualitative. "Scalable" AI workload orchestration, GPU scheduling. No numbers.
- D4 SLA / availability / RTO / RPO: Not stated.
- D5 constraints: Air-gapped/disconnected operation; RBAC and policy-as-code; PII/PHI/CUI scanning and remediation; "highly regulated environments." FedRAMP level, FIPS, IL: Not stated.
- Vault relevance: On-topic for Vault as a product (secrets, PKI, dynamic secrets injection, encryption-as-a-service, Vault Radar), but it carries no customer demand or sizing signal because it is a vendor response, not an agency requirement statement.
- Confidence: Low, and weaker than a primary RFI for demand purposes because it is self-promotional vendor content. Upper-bound.

### 5. IPPS-A MAHC III (Integrated Personnel and Pay System - Army, Increment II)

- Issuing org: DoD, PEO Enterprise, IPPS-A. RFI and Sources Sought, 14 November 2024.
- Segment: DoD (Army enterprise business system).
- Summary: RFI to identify vendors to support continuous development, integration, and delivery of IPPS-A, the Oracle PeopleSoft ERP for Army personnel and pay. Seeks innovative approaches including modular contracting, CI/CD, and DevSecOps, and migration to a DoD cloud up to FedRAMP IL-6.
- D1 demand/sizing: Explicit user-population scale. "Over 1.1 million Soldiers" integrated across Active Army, National Guard, and Reserve. Self-described as "the largest PeopleSoft implementation of Human Capital Management and Global Payroll." Inferred: 1.1M is the served population, not concurrent Vault users or machine identities. Secrets, namespaces, auth rate: Not stated.
- D2 auth load / concurrency / performance: Not stated.
- D3 scaling / capacity / growth: Qualitative. Incremental SAFe releases, CI/CD. No infrastructure scaling numbers.
- D4 SLA / availability / RTO / RPO: Not stated as numbers. Emphasis on production support, risk reduction, and auditability for a large ERP.
- D5 constraints: Explicit "FedRAMP Impact Level (IL)-6" cloud target (the only IL-6 in the corpus); cleared personnel Secret or higher; DCAA-approved accounting system; DevSecOps/CI-CD. FIPS/HSM, air-gap: Not stated.
- Vault relevance: Adjacent. ERP modernization; secrets management would be a DevSecOps sub-component. The IL-6 target and 1.1M user scale are useful constraint and sizing context.
- Confidence: Low. Single RFI; population figure is an upper-bound headcount, not Vault load.

### 6. ISN-M (Installation Service Node Modernization)

- Issuing org: DoD, USAF, AFLCMC, Data Transport Branch (AFLCMC/HNIB), Enterprise IT and Cyber Infrastructure Division, Hanscom AFB, MA. RFI, 9 April 2026.
- Segment: DoD (Air Force).
- Summary: Market research to bring two separate installation-level network infrastructures (NIPR and SIPR Installation Service Nodes) into a single modern technical architecture, aligned with the DAF Next-Generation Gateway / Zero-Trust effort. ISNs are site-level datacenters providing enterprise services; the future ISN/IPN consolidates shared compute and storage.
- D1 demand/sizing: Not stated. The RFI asks vendors for their own "total number of DoW customers," annual revenue, and years in business, but states no agency-side counts of users, nodes, or secrets.
- D2 auth load / concurrency / performance: Not stated.
- D3 scaling / capacity / growth: Qualitative. Consolidation for economies of scale; compute/storage modernization, cloud migration, data-center optimization; enterprise-wide network consolidation. No numbers.
- D4 SLA / availability / RTO / RPO: Explicit support SLA, not uptime. "24/7 online technical support, 4-hour response times, and the ability to deploy field technicians to all sites in the AF Enterprise." OEM patch and STIG-hardening publication cadence requested.
- D5 constraints: NIPR and SIPR (two-level air-gap); FIPS 140-2 or 140-3 certification and Approved Products List (APL); STIG hardening; Zero-Trust (NGG/ZT); Secret facility clearance; SIPRNet account holders; CUI handling via DoD SAFE; OTA/CSO under consideration. FedRAMP level: Not stated.
- Vault relevance: Adjacent. Infrastructure and datacenter modernization. FIPS, STIG, Zero-Trust, and NIPR/SIPR are relevant D5 constraints but the ask is not secrets-specific.
- Confidence: Low. Single RFI; no agency-side quantities. Upper-bound.

### 7. Unified ICAM Delivery Contract

- Issuing org: DoD, Army Contracting Command-Aberdeen Proving Ground (ACC-APG), supporting PM I2S, Product Lead Enterprise Identity, Credential, and Access Management (PdL E-ICAM). RFI, due 29 August 2025.
- Segment: DoD (Army enterprise ICAM).
- Summary: Market research for ICAM Sustainment and ICAM Modernization of a global integrated ICAM platform that governs logical access for person and non-person entities across cloud, on-premises, and tactical environments on all classification levels (NIPRNet, SIPRNet) under a Zero Trust model, without a prime integrator.
- D1 demand/sizing: Explicit scope of person entities and non-person entities (NPEs) under access governance; no counts. Incumbent tools named: Radiant Logic (identity repository), SailPoint IdentityIQ (IGA), CyberArk (PAM), cryptographic hardware token plus software MFA. Users, machines, secrets counts: Not stated.
- D2 auth load / concurrency / performance: Not stated.
- D3 scaling / capacity / growth: Qualitative. Global integrated platform; expectation that Army Enterprise and Tactical ICAM offices merge into a single Unified ICAM program, requiring integration across both. No numbers.
- D4 SLA / availability / RTO / RPO: Not stated as uptime. Help Desk Tiers 3 and 4; SOC Type I and Type II audit compliance for financial/business applications; ICOFR support.
- D5 constraints: NIPRNet and SIPRNet (air-gap); Zero Trust (NIST SP 800-207); Secret clearance and Secret facility clearance for all but administrative personnel; industry-standard protocols (SAML, OAuth, OIDC); multi-environment (cloud/on-prem/tactical). FedRAMP level, FIPS/HSM: Not stated.
- Vault relevance: ICAM and PAM adjacent. Vault auth methods, identity, and PKI touch this domain; CyberArk PAM incumbency is competitive context. NPE governance is directly relevant to H1.
- Confidence: Low. Single RFI; qualitative scope, no quantities. Upper-bound.

### 8. PAM Tooling Strategy (Lockheed Martin Corporate Information Security)

- Issuing org: Lockheed Martin (FSI), Corporate Information Security. RFI questionnaire, August 2024. Corporate sourcing, not a federal agency notice.
- Segment: FSI (Lockheed Martin).
- Summary: Vendor questionnaire across five Privileged Access Management domains: enterprise vaulting, personal password management, enterprise secrets management, just-in-time administrator rights, and endpoint privilege management. Areas of interest include authentication, high availability, password/secrets management, automation/API integration, privileged session management, and reporting/logging.
- D1 demand/sizing: No agency-side values; the questionnaire instead asks vendors about scale. Explicit questions: "Are there scalability limitations for total supported nodes?" and "What is the largest node count that is currently supported?" These reveal that node-count scalability is a buyer concern. Stated counts: Not stated.
- D2 auth load / concurrency / performance: Asks about authentication methods, high availability, and "data ingest controls/thresholds." No rates stated.
- D3 scaling / capacity / growth: Asks about scalability limits, largest supported node count, network considerations for large-scale deployment, and resiliency/availability per deployment model. No numbers stated.
- D4 SLA / availability / RTO / RPO: Asks about support model, resiliency, and availability per deployment model. No numbers stated.
- D5 constraints: Explicit FedRAMP question ("If a SaaS solution is offered, is the solution FedRAMP certified?"); US-person staffing question for non-FedRAMP SaaS infrastructure; On-Prem/SaaS/Hybrid; IaC deployment; Zero Trust / ZTNA integration; SIEM (Splunk) export/ingest. FIPS/HSM, air-gap, IL: Not stated.
- Vault relevance: On-topic. Enterprise vaulting, enterprise secrets management, password rotation, and secrets storage map directly to Vault's domain (and to the CyberArk competitive set). This is one of two core secrets-management documents in the corpus.
- Confidence: Low. A questionnaire elicits vendor claims and states no buyer demand quantities. Upper-bound.

### 9. RFI for Tactical Data in Use Security

- Issuing org: DoD, U.S. Army DEVCOM, C5ISR Center, Engineering and Systems Integration (ESI) Directorate. Sources Sought / RFI, Approved for Public Release.
- Segment: DoD (Army tactical).
- Summary: Market survey for solutions integrating the DoD Zero Trust Data Pillar into tactical network architectures, focused on data-in-use protection in DDIL contested environments, using encryption, anomaly detection, secure communication protocols, and Privacy Enhancing Technology (PET). Asks respondents to estimate Technology Readiness Level and maturation risk.
- D1 demand/sizing: Not stated.
- D2 auth load / concurrency / performance: Not stated. Asks respondents to categorize PET performance qualitatively.
- D3 scaling / capacity / growth: Not stated.
- D4 SLA / availability / RTO / RPO: Not stated. Solutions must operate within DDIL conditions.
- D5 constraints: Zero Trust (Data Pillar), DDIL tactical environment, CUI markings (DoDI 5200.48), data-in-use encryption, DoD SAFE submission. FedRAMP, FIPS/HSM, air-gap level: Not stated.
- Vault relevance: Adjacent. Data-in-use protection and PET (confidential-computing space) sit outside Vault's core secrets/PKI/KMIP functions, though Vault transit/encryption could touch encryption-in-transit.
- Confidence: Low. Exploratory, prototype-oriented; no quantities. Upper-bound.

### 10. AFTAC Key Management Solutions (KMS)

- Issuing org: DoD, Air Force Technical Applications Center (AFTAC), Patrick Space Force Base, FL. RFI, 25 February 2026. RFQ/RFI reference rfq_370425_4952828.
- Segment: DoD (Air Force); IC-adjacent (AFTAC performs nuclear treaty monitoring). The RFI is written as an unclassified procurement, not a high-side IC notice.
- Summary: RFI for a centralized, API-driven Key Management System to simplify, standardize, and secure key management enterprise-wide. The core KMS must provide full lifecycle management for secrets (keys, certificates, API tokens), authentication and authorization for non-person entities, and comprehensive auditing to a SIEM, deployed as a bi-directionally mirrored production-plus-continuity solution in an active-active architecture, as part of Zero Trust initiatives.
- D1 demand/sizing: Explicit. CLIN 0001 (Production and Continuity) "must be scalable to support thousands of users and devices." CLIN 0002 (RDT&E) "must be scalable to support a thousand users and devices across a single site." Optional CLINs: "up to six (6) additional self-contained, air-gapped instances." Secrets scope is explicit: full lifecycle for keys, certificates, and API tokens; NPE authentication for applications, services, and systems. Secret/KV counts, namespaces, auth rate: Not stated; the "thousands" figure is coarse and the per-instance hardware footprint is left for the vendor to state.
- D2 auth load / concurrency / performance: No stated rates. The system "shall autonomously monitor and log system utilization" and report bottlenecks; the vendor must "detail the minimum virtual hardware footprint (vCPU, RAM, storage)." Patch operations must impose zero downtime on authentication and secrets-retrieval services.
- D3 scaling / capacity / growth: Explicit. Scalable to thousands of users/devices; minimum virtual footprint plus IaC for rapid provisioning and recovery; up to six air-gapped instances (a multi-instance/sharding pattern). Production, RDT&E, and air-gapped instances are distinct deployment classes.
- D4 SLA / availability / RTO / RPO: Strongest in the corpus. "The system shall be designed for 99.99% uptime." The contractor states the guaranteed RPO and RTO for automated failover to the Continuity Environment (values left to the vendor). Active-active production plus continuity; non-interference patch/rollback with zero operational downtime; 24x7 telephone support during warranty.
- D5 constraints: DoD Zero Trust and DISA STIGs; RMF (DoDI 8510.01); NIST SP 800-53 and 800-171; DoD Cloud Computing SRG; NIAP/CCEVS approved-product mandate for National Security Systems (Common Criteria); DoDI 5200.02 personnel security; SCRM; TAA compliance; ICAM integration (Active Directory and commercial identity brokers); letter of volatility and memory purge. Protocols required: LDAP/LDAPS, Kerberos, SSH (certificate-based), TDS, OCI, native PostgreSQL, REST/HTTPS, OIDC, SAML 2.0, RADIUS, TACACS+. FedRAMP level: Not stated explicitly (DoD security stack invoked instead).
- Vault relevance: On-topic and the richest extract. This is a secrets/key-management RFI whose required functions (secret lifecycle, NPE auth, database credential management, identity federation, audit to SIEM, IaC) map directly onto Vault auth methods and secret engines.
- Confidence: Low per the plan's rule, despite specificity; the figures remain procurement statements requiring telemetry anchoring. Upper-bound.

### 11. T-ICAM (Tactical ICAM) Software Licensing

- Issuing org: DoD, Army, W15P7T W6QK ACC-APG. RFI / Sources Sought, Notice ID RFI-T-ICAM-W15P7T. Supports UNO (Unified Network Operations) Tactical ICAM. Due 30 September 2025.
- Segment: DoD (Army tactical).
- Summary: Sources Sought for a mature (TRL-7) commercial software solution and post-deployment software support for UNO Tactical ICAM: distributed, deployable authentication and authorization at the point of need for tactical and warfighter applications in DDIL conditions, for person and non-person entities, with SSO and standard ICAM protocols, fielding in FY26. Explicitly not for hardware and not for new development.
- D1 demand/sizing: Explicit scope, no counts. Supports unique identity records for person entities and non-person entities; must "support all Army CORPS, Divisions and their subordinate units." Secret/KV counts, user counts, auth rate: Not stated.
- D2 auth load / concurrency / performance: Not stated. Must remain resilient to DDIL and SWAP fluctuations.
- D3 scaling / capacity / growth: Qualitative. Modular, lightweight microservices; seamless cloud-edge synchronization; consolidate, synchronize, and disseminate identity records; distributable/deployable at point of need. No numbers.
- D4 SLA / availability / RTO / RPO: Not stated as numbers. Must function regardless of operational conditions, including DDIL.
- D5 constraints: DDIL and SWAP constraints; Zero Trust principles; valid ATO preferred; hardware/product agnostic; all DoD-approved identity credentials; SSO; protocols SAML, OAuth/OIDC, WS-Fed, ADFS, Azure OIDC/SAML; dynamic least-privilege access; interoperability with Mission Partners. FedRAMP, FIPS, classification level beyond tactical: Not stated.
- Vault relevance: ICAM and identity adjacent. Vault auth methods, identity, and PKI/credential issuance touch this; the PE/NPE scope is relevant to H1.
- Confidence: Low. Sources Sought with qualitative requirements, no quantities. Upper-bound.

## Task 2: Consolidated structured dataset

One row per extracted field/signal. Per the research plan's bias-mitigation rule, every RFI-derived value is capped at Low confidence and is an upper-bound claim pending telemetry anchoring; the Confidence column reflects that cap uniformly.

| RFI source | Field/dimension | Value (Explicit/Inferred) | Decision | Hypothesis | Confidence | Note |
|---|---|---|---|---|---|---|
| Army IaaS | Compute footprint, Main Command Post | 160 CPU cores / 708 GB RAM / 38 TB storage (Explicit) | D2, D1 | H3 | Low | Static mission-command stack rollup, not Vault; ~4.4 GB RAM per core. |
| Army IaaS | Compute footprint, Tactical Command Post | 151 cores / 640 GB / 30 TB (Explicit) | D2, D1 | H3 | Low | Same basis; RAM-heavy ratio. |
| Army IaaS | Compute footprint, Mobile Command Post | 44 cores / 168 GB / 6 TB (Explicit) | D2, D1 | H5 | Low | Smallest edge tier; tier-shape signal. |
| Army IaaS | Hardware form factors | 4 families with SWAPC sub-variants (Explicit) | D5, D3 | H5 | Low | Multiple footprints imply multiple deployment tiers. |
| Army IaaS | Availability posture | Continuously available despite network/hardware failure; DR/COOP (Explicit, qualitative) | D4 | - | Low | No numeric SLA/RTO/RPO. |
| Army IaaS | Scaling posture | Remote provision/monitor/scale on demand (Explicit, qualitative) | D3 | - | Low | Direction only. |
| Army IaaS | Constraints | DDIL, ATO, CUI, encryption, identity mgmt, compliance (Explicit) | D5 | - | Low | Air-gap implied; no FedRAMP/FIPS level. |
| BDP Orchestration | Storage scale | Clusters over 15 PB (Explicit) | D1, D2 | - | Low | Big-data capacity, not secrets/KV. |
| BDP Orchestration | Compute scale | Multi-node, range of VMs (Inferred) | D2 | - | Low | No counts. |
| BDP Orchestration | Scaling posture | Auto-scaling, elasticity, provision/scale/remove (Explicit, qualitative) | D3 | - | Low | No thresholds. |
| BDP Orchestration | Availability posture | High-availability architecture (Explicit, qualitative) | D4 | - | Low | No number. |
| BDP Orchestration | Constraints | NIPR/SIPR/JWICS, RBAC, enterprise directory, AWS GovCloud (Explicit) | D5 | - | Low | Full three-network air-gap. |
| DISA RFI vs OTA | Document type | Secondhand comparison, not primary RFI (Explicit) | - | - | Low | Two steps from issuing agency. |
| DISA RFI vs OTA | Maturity gradient | RFI broad/exploratory vs OTA specific prototype (Explicit) | D5 | H5 | Low | Evidence for maturity segmentation. |
| DISA RFI vs OTA | Constraints (OTA) | Centralized control plane, multi-tenancy, Zero Trust, commercial CSP integration (Explicit) | D5 | - | Low | No FedRAMP/FIPS/numbers. |
| DISA RFI vs OTA | Sizing | Not stated | D1 | - | Low | No quantities in comparison. |
| Gen AI response | Document type | Vendor response draft, not the RFI (Explicit) | - | - | Low | Self-promotional; reverse-engineer questions only. |
| Gen AI response | Sizing | Not stated | D1 | - | Low | No demand figures. |
| Gen AI response | Constraints | Air-gapped, RBAC, PII/PHI/CUI scanning, "highly regulated" (Explicit, qualitative) | D5 | - | Low | FedRAMP not named. |
| Gen AI response | Vault relevance | Vault central (secrets, PKI, dynamic secrets, Vault Radar) (Explicit) | - | - | Low | On-topic but no demand signal. |
| IPPS-A | User population | Over 1.1 million Soldiers (Explicit) | D1 | H1, H2 | Low | Served population, not concurrent Vault users; upper bound. |
| IPPS-A | Scale claim | "Largest PeopleSoft HCM and Global Payroll implementation" (Explicit, qualitative) | D1 | H2 | Low | Self-stated superlative. |
| IPPS-A | Compliance target | FedRAMP Impact Level (IL)-6 (Explicit) | D5 | - | Low | Only IL-6 in corpus. |
| IPPS-A | Constraints | Cleared personnel Secret+, DCAA, DevSecOps/CI-CD (Explicit) | D5 | - | Low | No FIPS/air-gap stated. |
| ISN-M | Agency sizing | Not stated; asks vendor's "total DoW customers" (Explicit question) | D1 | - | Low | No agency-side counts. |
| ISN-M | Support SLA | 24/7 support, 4-hour response, on-site technicians enterprise-wide (Explicit) | D4 | - | Low | Support SLA, not uptime. |
| ISN-M | Constraints | NIPR+SIPR air-gap, FIPS 140-2/140-3, APL, STIG, Zero-Trust, Secret FCL, SIPRNet accounts, CUI (Explicit) | D5 | - | Low | Dense constraint set; no FedRAMP level. |
| ISN-M | Scaling posture | Consolidation, economies of scale, cloud/data-center optimization (Explicit, qualitative) | D3 | - | Low | No numbers. |
| Unified ICAM | Identity scope | Person + non-person entity (NPE) governance (Explicit) | D1 | H1 | Low | NPE first-class; no counts. |
| Unified ICAM | Incumbent tools | Radiant Logic, SailPoint, CyberArk, crypto hardware token MFA (Explicit) | D5, D1 | - | Low | Competitive/integration context. |
| Unified ICAM | Constraints | NIPR/SIPR air-gap, Zero Trust (NIST 800-207), Secret clearance+FCL, SAML/OAuth/OIDC, cloud/on-prem/tactical, SOC I/II, ICOFR (Explicit) | D5, D4 | - | Low | No FedRAMP/FIPS level. |
| Unified ICAM | Scaling posture | Global integrated platform; Enterprise+Tactical ICAM merge (Explicit, qualitative) | D3 | - | Low | No numbers. |
| PAM Tooling (LM) | Sizing concern | Asks largest supported node count and node scalability limits (Explicit question) | D1, D3 | - | Low | Reveals node-count concern; no values. |
| PAM Tooling (LM) | Domain scope | Enterprise vaulting, enterprise secrets mgmt, password mgmt, JIT admin, endpoint privilege (Explicit) | D1 | - | Low | Core Vault/PAM domain. |
| PAM Tooling (LM) | Availability | Asks HA and resiliency/availability per deployment model (Explicit question) | D4 | - | Low | No values. |
| PAM Tooling (LM) | Constraints | FedRAMP-if-SaaS, US-person staffing, Zero Trust/ZTNA, SIEM/Splunk, IaC, On-prem/SaaS/Hybrid (Explicit) | D5 | - | Low | Only explicit FedRAMP question in corpus. |
| Tactical Data in Use | Sizing | Not stated | D1 | - | Low | No quantities. |
| Tactical Data in Use | Constraints | Zero Trust Data Pillar, DDIL, CUI, data-in-use encryption, PET (Explicit) | D5 | - | Low | PET sits outside core Vault. |
| Tactical Data in Use | Maturity | Asks TRL + maturation risk (Explicit) | D5 | - | Low | Prototype stage. |
| AFTAC KMS | User/device scale (prod) | Scalable to thousands of users and devices (Explicit) | D1, D3 | H1, H5 | Low | Coarse upper bound; "devices" = NPE. |
| AFTAC KMS | User/device scale (RDT&E) | Scalable to a thousand users and devices, single site (Explicit) | D1 | H5 | Low | Distinct lower tier. |
| AFTAC KMS | Air-gapped instances | Up to six additional self-contained air-gapped instances (Explicit) | D3, D5 | H5 | Low | Multi-instance/sharding + air-gap. |
| AFTAC KMS | Secrets scope | Full lifecycle keys/certs/API tokens; NPE auth; SIEM audit (Explicit) | D1 | H1 | Low | Direct Vault scope. |
| AFTAC KMS | Availability | 99.99% uptime; vendor-stated RPO/RTO; active-active prod+continuity (Explicit) | D4 | - | Low | Strongest SLA in corpus; RPO/RTO values vendor-supplied. |
| AFTAC KMS | Maintenance | Zero-downtime patch/rollback for auth and secrets retrieval (Explicit) | D4 | - | Low | Non-interference requirement. |
| AFTAC KMS | Footprint ask | Vendor states min vCPU/RAM/storage; reports bottlenecks (Explicit question) | D2 | H3 | Low | No values; vendor-supplied. |
| AFTAC KMS | Protocols | LDAP/LDAPS, Kerberos, SSH-cert, TDS, OCI, PostgreSQL, REST/HTTPS, OIDC, SAML 2.0, RADIUS, TACACS+ (Explicit) | D1, D5 | - | Low | Maps to Vault auth/secret engines. |
| AFTAC KMS | Constraints | DoD ZT, DISA STIG, RMF, NIST 800-53/171, Cloud SRG, NIAP/CCEVS (CC) for NSS, DoDI 5200.02, TAA (Explicit) | D5 | - | Low | National Security Systems. |
| T-ICAM | Identity scope | PE + NPE unique identity records; all CORPS/Divisions/subordinate units (Explicit) | D1 | H1, H2 | Low | No counts. |
| T-ICAM | Maturity | TRL-7 mature COTS; fielding FY26 (Explicit) | D5 | - | Low | Near-term, procurement-ready. |
| T-ICAM | Constraints | DDIL, SWAP, Zero Trust, ATO preferred, DoD-approved credentials, SAML/OAuth/OIDC/WS-Fed/ADFS, least-privilege, modular microservices (Explicit) | D5 | - | Low | Tactical edge. |
| T-ICAM | Scaling posture | Cloud-edge sync; consolidate/synchronize/disseminate identity (Explicit, qualitative) | D3 | - | Low | No numbers. |

## Task 3: Consolidated questions posed to industry

The 60 questions below are deduplicated and grouped by theme. Source tags use short names. Two documents contribute no questions: the DISA file is an analytical comparison, and the Gen AI file is a vendor response whose six questions are recovered from its response headers and are listed under theme B. The PAM and AFTAC documents are question-dense; ISN-M, Unified ICAM, and IPPS-A carry explicit numbered question sets.

### A. Company profile, qualification, and past performance (8)

1. Provide company identification: legal name, address, points of contact, CAGE code, UEI/DUNS, NAICS code, and business size/socioeconomic category. [IPPS-A, ISN-M, Unified ICAM, T-ICAM, AFTAC, BDP, Tactical Data, Army IaaS]
2. State years in business, annual revenue, and total number of DoW/Government customers. [ISN-M, Unified ICAM]
3. Provide relevant past performance: similar projects, the service/agency supported, Government program manager names, and at least two case studies from the last three years. [ISN-M, Unified ICAM, T-ICAM, IPPS-A]
4. State personnel and facility clearance status (Secret or higher), SIPRNet account holders, and US-person staffing. [ISN-M, IPPS-A, Unified ICAM, PAM]
5. List existing and relevant contract vehicles (prime or subcontractor), including DoD/GWAC vehicles. [ISN-M, IPPS-A, BDP]
6. Identify key partnerships and certifications relevant to the effort. [ISN-M, Unified ICAM]
7. Identify domestic versus foreign ownership (and country if foreign). [ISN-M]
8. Describe prior delivery of this capability to DoD: to whom, when, and scope of effort. [T-ICAM, Gen AI]

### B. Technical capability and solution architecture (12)

9. Describe your overall solution and capabilities against the stated requirements, as a capability statement addressing each requirement. [T-ICAM, AFTAC, BDP, Tactical Data, ISN-M, Army IaaS]
10. Describe your approach to compute and storage modernization, cloud migration, and data-center optimization. [ISN-M, DISA]
11. Provide an architecture and implementation diagram, indicating On-Premises, SaaS, and Hybrid options. [PAM, AFTAC]
12. Describe identity, credential, and access management: person and non-person entity identity, MFA, SSO, identity governance, PAM, and identity repository/federation. [Unified ICAM, T-ICAM, AFTAC]
13. Describe secrets and key management: full lifecycle for keys, certificates, and API tokens; vaulting; secrets storage and rotation; and non-person-entity authentication. [AFTAC, PAM]
14. Describe privileged access management: enterprise vaulting, personal password management, just-in-time admin rights, endpoint privilege management, and privileged session monitoring/recording. [PAM]
15. State protocol and integration support: SAML, OAuth/OIDC, WS-Fed, ADFS, LDAP/LDAPS, Kerberos, RADIUS/TACACS+, SSH, database protocols (TDS/OCI/PostgreSQL), REST/HTTPS, and storage-system integration. [AFTAC, Unified ICAM, T-ICAM, PAM]
16. Describe automation and orchestration: auto-scaling, CI/CD pipeline provisioning, workflow design, and Infrastructure-as-Code deployment. [BDP, PAM, AFTAC, Army IaaS]
17. Describe monitoring, dashboards, logging, reporting, audit, and SIEM integration (for example Splunk). [Army IaaS, PAM, AFTAC, Unified ICAM]
18. Describe the operator interaction model, including GUI and CLI, and how units customize or tailor the delivered solution. [AFTAC, Army IaaS, T-ICAM]
19. For Generative AI: describe prior GenAI work and outcomes; models/platforms used; candidate automation use cases and their impact; data sourcing, cleaning, preparation, and governance; privacy/security compliance methods; and hallucination detection and mitigation. [Gen AI]
20. Describe data-in-use protection, Privacy Enhancing Technology, encryption, anomaly detection, and secure communications for the Zero Trust Data Pillar. [Tactical Data, AFTAC, Army IaaS]

### C. Sizing, scale, and performance (7)

21. Describe scalability to meet demand and the supported user/device scale (for example, thousands of users and devices). [AFTAC, Army IaaS, BDP]
22. State scalability limitations for total supported nodes and the largest node count currently supported. [PAM]
23. Describe data-ingest controls and thresholds and processing throughput (for example, multi-petabyte clusters, PCAP handling). [PAM, BDP]
24. Describe network considerations for a large-scale deployment. [PAM]
25. Detail the minimum virtual hardware footprint (vCPU, RAM, storage) or physical specifications (RU, power, BTU). [AFTAC]
26. Describe elasticity and auto-scaling behavior to maintain a range of compute/VMs. [BDP, Army IaaS]
27. State the Technology Readiness Level and solution maturity, with maturation risk. [Tactical Data, T-ICAM]

### D. Reliability, availability, SLA, and support (8)

28. Describe the high-availability architecture. [BDP, AFTAC, PAM, Army IaaS]
29. State the uptime target, RPO, RTO, and automated failover behavior (for example, 99.99% and active-active). [AFTAC]
30. Describe zero-downtime / non-interference patch management and rollback. [AFTAC]
31. Describe disaster recovery, COOP, and continuity of operations. [Army IaaS, AFTAC]
32. Describe resiliency and availability for each deployment model. [PAM]
33. Describe the support model, including 24/7 support, response-time targets (for example, 4-hour), field-technician dispatch, and help-desk tiers. [ISN-M, AFTAC, Unified ICAM]
34. Describe OEM patch and STIG-hardening publication cadence as new vulnerabilities are discovered. [ISN-M]
35. Describe service availability and resilience in contested/DDIL and SWAP-constrained environments. [Army IaaS, T-ICAM, Tactical Data]

### E. Security, compliance, and constraint clauses (10)

36. State whether any SaaS offering is FedRAMP certified, and at what impact level (for example IL-6). [PAM, IPPS-A]
37. Describe FIPS 140-2/140-3 certification, Approved Products List status, and NIAP/CCEVS / Common Criteria for National Security Systems. [ISN-M, AFTAC]
38. Describe STIG hardening, RMF, NIST SP 800-53/800-171, and DoD Cloud SRG adherence. [AFTAC, ISN-M]
39. Describe your Zero Trust architecture alignment (for example NIST SP 800-207). [Unified ICAM, T-ICAM, AFTAC, Tactical Data, ISN-M, DISA]
40. Describe air-gap and cross-domain operation across NIPR/SIPR/JWICS and classification handling. [BDP, ISN-M, Unified ICAM, AFTAC, Army IaaS]
41. Describe Authority to Operate status and approach. [Army IaaS, T-ICAM]
42. Describe US-person staffing and personnel security (for example DoDI 5200.02). [PAM, AFTAC]
43. Describe the multi-tenancy / isolation model. [DISA, PAM]
44. Describe SOC Type I/II audit compliance and audit support (for example ICOFR). [Unified ICAM]
45. Describe data export/destruction, letter of volatility, and memory-purge procedures. [AFTAC]

### F. Pricing, cost, and contracting (8)

46. Describe your cost/pricing model: consumption versus flat rate; infrastructure pricing for space, power, network, and support; and license plus renewal/sustainment costs. [Army IaaS, ISN-M, AFTAC, PAM]
47. Provide consumption estimate models. [Army IaaS]
48. Describe the ownership model (Government-provided versus service-provided). [Army IaaS]
49. Recommend a modular contracting approach: what to bundle versus break up, which contract vehicles, and which contract types. [IPPS-A, Unified ICAM, ISN-M]
50. Recommend a rapidly awardable contracting approach, including options without a prime integrator. [Unified ICAM]
51. Identify recommended contractual vehicles, both FAR and non-FAR (OTA, CSO). [ISN-M, IPPS-A, BDP]
52. Address TAA compliance, authorized-reseller status, and refurbished/remanufactured product handling. [AFTAC]
53. Describe technology refresh cycle planning and triggers. [Army IaaS, AFTAC]

### G. Integration, interoperability, and sustainment (7)

54. Describe integration with existing systems, unit-owned hardware, and leased cloud instances. [Army IaaS, DISA, ISN-M]
55. Describe interoperability with mission partners and with other industry partners, including evidence of zero intra-contractor conflict. [T-ICAM, Unified ICAM, DISA, Army IaaS]
56. Describe cloud-edge synchronization and multi-environment (cloud/on-prem/tactical) operation. [T-ICAM, Unified ICAM, Army IaaS]
57. Describe the implementation and sustainment approach: training, fielding/distribution, property accountability, and maintenance/returns. [Army IaaS, IPPS-A]
58. Describe innovative approaches and methodologies, including DevSecOps and CI/CD. [IPPS-A, Unified ICAM, BDP]
59. Estimate the migration effort and Government resources required to adopt or transition to the solution. [BDP, IPPS-A]
60. Open-ended: what other areas should we consider, and what additional recommendations do you have. [Army IaaS, IPPS-A, PAM]

## Task 4: RFI process analysis and segmentation

### Common structure of the federal RFI

Across the eight primary agency RFIs the structure is consistent:

- A non-binding disclaimer block. Every notice states it is not an RFP/IFB/RFQ, that responses are voluntary and unpaid, and that no award follows. This is boilerplate and carries no demand signal.
- A market-research purpose framed as information for acquisition planning, often paired with a Sources Sought.
- A background and problem statement describing the current state and its limitations.
- A requirements or objectives section, ranging from qualitative "shall" statements (BDP, AFTAC) to broad capability themes (Army IaaS, Unified ICAM).
- A response questionnaire and administrative cover-page requirements (CAGE, UEI/DUNS, NAICS, business size, clearances), with a page cap (commonly 10 pages, 15 for Tactical Data).

What agencies consistently ask for is qualification and past performance, a security/compliance posture, a contracting recommendation, and a capability narrative. What they rarely provide is quantitative demand. Sizing, when present, is stated as static headcount or footprint, not as dynamic load.

How agencies frame sizing and scale: weakly. Only AFTAC, Army IaaS, IPPS-A, and BDP carry explicit figures, and each is a static envelope (users/devices, CPU/RAM/storage, served population, storage capacity). Scale more often appears as a question directed back at the vendor ("largest node count supported," "total DoW customers") than as a stated requirement. No RFI states an authentication rate, peak concurrency, secret/KV count, or namespace count.

How agencies frame security: heavily and specifically. Security and compliance are the densest, most consistent content. Zero Trust, air-gap (NIPR/SIPR/JWICS), STIG/RMF/NIST, FIPS/APL/NIAP, and ICAM integration appear repeatedly and in concrete terms. For the study, D5 (launch blockers and constraints) is the dimension these RFIs support best.

Maturity and specificity vary widely. The DISA file makes the point directly: an exploratory RFI states broad needs, while the paired OTA states a specific prototype (centralized control plane, multi-tenancy, Zero-Trust, CSP integration). AFTAC and T-ICAM sit at the mature end, with CLINs, ordering tables, a 99.99% target, named protocols, and a TRL-7/FY26 fielding expectation. Army IaaS, BDP, ISN-M, Unified ICAM, IPPS-A, and Tactical Data sit at the exploratory end.

### Segmentation of the RFIs

By document provenance (this governs how much weight each carries):

- Primary agency RFI (8): Army IaaS, BDP, IPPS-A, ISN-M, Unified ICAM, AFTAC KMS, T-ICAM, Tactical Data in Use.
- Corporate vendor questionnaire (1): LM PAM Tooling. A buyer questionnaire from an FSI, not a federal agency notice.
- Vendor response draft (1): Gen AI (HashiCorp answering LM). Questions are reverse-engineered; no customer demand figures.
- Secondhand analytical comparison (1): DISA RFI vs OTA. One step further from the issuing agency.

By topic:

- Secrets / key management (core Vault): AFTAC KMS, LM PAM. The Gen AI response is Vault-centric but carries no demand signal.
- ICAM / identity: Unified ICAM, T-ICAM, with AFTAC requiring ICAM integration. PE/NPE identity is the shared thread.
- Infrastructure / orchestration / modernization: Army IaaS, BDP, DISA DHMC, ISN-M, IPPS-A.
- Zero Trust data / tactical security: Tactical Data in Use, with T-ICAM and Army IaaS sharing the DDIL framing.
- Generative AI enablement: Gen AI.

By federal segment: DoD 9, FSI 2 (both Lockheed Martin), Civilian 0, IC 0 (AFTAC is IC-adjacent but issued as an unclassified procurement). The absence of Civilian and IC RFIs is a coverage gap that bounds any segment-differentiated claim from this stream.

By maturity: exploratory/broad (Army IaaS, BDP, ISN-M, Unified ICAM, IPPS-A, Tactical Data, and the RFI side of DISA) versus specific/procurement-ready (AFTAC KMS, T-ICAM, and the OTA side of DISA). The maturity split matters because only the procurement-ready documents carry figures precise enough to compare against telemetry later.

### Mapping to hypotheses (weak, Low-confidence, directional only)

- H1 (machine-heavy workloads; reject if machine-to-human auth below 5:1 in most profiles): Directional Low-confidence support that machine/non-person identities are first-class. AFTAC requires NPE authentication for "applications, services, and systems" alongside "thousands of users and devices"; Unified ICAM and T-ICAM both govern PE and NPE identity records. No RFI states a machine-to-human ratio or any auth count, so the 5:1 threshold cannot be tested from RFIs. The signal supports the presence of machine identity, not its magnitude.
- H2 (demand concentration; reject if top 20% of accounts under 50% of load): Largely silent. A single-agency RFI cannot speak to cross-account concentration. The only adjacent signal is the order-of-magnitude spread between documents (IPPS-A 1.1M served population versus AFTAC thousands versus a 44-core mobile post), which is directionally consistent with wide account-size dispersion but is not a concentration measure. Treat as no usable signal.
- H3 (memory before CPU; reject if CPU saturates first in most telemetry profiles): Silent on saturation order. Army IaaS gives static CPU/RAM/storage rollups with RAM-heavy ratios (~4.4 GB/core), and AFTAC asks the vendor to report bottlenecks and minimum vCPU/RAM, but neither indicates which resource saturates first under load. No usable signal; the Army ratios are static provisioning, not bottleneck behavior.
- H4 (RFP/RFI values understate dynamic load; reject if live peak does not exceed stated by 20% in most matched cases): The corpus is consistent with H4's premise but cannot confirm it. Every stated figure (AFTAC "thousands of users and devices," Army IaaS footprints, IPPS-A 1.1M soldiers, BDP 15 PB) is a static headcount, population, or capacity envelope, with no auth-rate, concurrency, or peak language. RFIs supply only the "stated" side of the comparison; confirmation requires the measured telemetry side. See the H4 callout below.
- H5 (one global limit too coarse; at least three tiers; reject if a single tier covers p10-p90 without over-provisioning the median by more than 2x): The clearest directional support in the corpus, at Low confidence. The documents describe at least three distinct demand shapes: tactical/edge (SWAP-constrained, DDIL, footprints as small as 44 cores), enterprise (IPPS-A 1.1M users, IL-6), and dedicated high-assurance KMS (AFTAC thousands of users/devices, 99.99%, six air-gapped instances). AFTAC alone defines internal tiers (production, RDT&E, air-gapped optional instances). A single envelope spanning a 44-core mobile post and a 1.1M-user ERP and a 15 PB analytics cluster is implausible on its face. This does not test the over-provisioning ratio, which needs telemetry, but it is consistent with needing multiple tiers.

Where RFIs are silent, state it plainly: no auth rate, no concurrency, no secret/KV count, no namespace count, no numeric uptime except AFTAC, and no machine-to-human ratio anywhere.

### H4 callout: stated sizing is upper-bound and requires telemetry anchoring

The four RFIs that state sizing all state it as static or population-level quantities, not measured dynamic load:

- AFTAC KMS: "thousands of users and devices" (production), "a thousand users and devices" (RDT&E). Coarse and rounded; no auth rate or concurrency.
- Army IaaS: per-post CPU/RAM/storage rollups for the full mission-command stack, not Vault-specific and not load-indexed.
- IPPS-A: "over 1.1 million Soldiers," a served population rather than concurrent users or machine identities.
- BDP: clusters "over 15 petabytes," a storage capacity rather than a request rate.

Per the research plan's bias-mitigation rule, each is a procurement-optimism upper-bound capped at Low confidence. None can set a launch limit directly. Each must be matched to telemetry before entering the tier matrix, and the H4 adjustment factor (live peak versus stated) can only be computed once a measured peak exists for a comparable account. Until then these figures bound the conversation; they do not decide D1 or D2.

## Limitations

- Provenance dilution. Only 8 of 11 files are primary agency RFIs. The DISA comparison, the Gen AI vendor response, and the LM PAM corporate questionnaire are weaker evidence and are flagged as such throughout.
- Segment skew. No Civilian and no IC (three-letter agency) RFIs are present. Civilian and IC claims cannot be supported from this stream and must come from interviews and telemetry.
- Topical distance. Most documents are adjacent (IaaS, orchestration, ERP, data-in-use, GenAI) rather than core secrets management. Only AFTAC and LM PAM are squarely on-topic for Vault; AFTAC, Unified ICAM, and T-ICAM cover the identity/PKI adjacency.
- Sizing sparsity. The figures that exist are coarse, static, and not load-indexed. The dataset can populate constraint clauses (D5) with reasonable coverage but provides only weak, upper-bound inputs for D1 and D2 and effectively nothing for D3 thresholds beyond AFTAC's multi-instance pattern.
- Confidence cap. Per the plan, every RFI-derived figure is Low and upper-bound until telemetry-anchored. Nothing in this extract should ship in a D1-D5 recommendation above Low on its own, and no figure here is a settled number.
- Extraction basis. The source files are markdown conversions of PDFs and web pages; minor OCR artifacts are present (for example garbled headers) but did not affect the figures cited, which were read in context.
