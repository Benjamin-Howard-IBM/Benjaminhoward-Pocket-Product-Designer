S

C

HashiCorp FedRamp Product Strategy

| HashiCorp FedRAMP Product Strategy Summary: This document outlines HashiCorp's strategy to accelerate FedRAMP compliance by leveraging IBM's pre-authorized MCSP platform, reducing the time-to-market from 3-5 years to an Tyler Yarborough2025-07-18T18:20:35Anecdotal - Needs to be confirmed by Product Teams.This is anecdotal and requires a deeper technical analysis by product teams. Vault plans on conducting an assessment and provide an estimated roadmap by mid-August with a potential start date in CY25Q4.A more detailed roadmap and timeline will become available after the Product teams conduct the Discovery & Initial documentation exercise with the MCSP Federal CoE, in conjunction with 38North (vendor that assists). MCSP Federal CoE have provided an initial timeline that includes the milestones & actions required to achieve the milestones. There were four primary milestones covered (we Hashi requested an additional one), (1) Gap Analysis & Initial Documentation, (2) Deployment to MCSP, (3) Deployment to MCSP@Federal (GovCloud), (4) FedRAMP Moderate Submission, (5) FedRAMP Moderate Approval.estimated 12-18 months. The plan focuses on initially authorizing the highest-demand products, Terraform and Vault, to capture a projected $72.9M federal revenue opportunity by CY2028. |  |
|---|---|
| Created: Jul 17, 2025 Context: | Status: WIP \| In-Review \| Approved \| Obsolete Owner: Tyler Yarborough Contributors: Other stakeholders: Ella Anh Thu Hoang Nguyen, Asvin Ramesh Approvers: Rose Jen, Chris Audie, Cameron Etezadi, Melina McLarty, Will Bengtson, Daniel Savage, Prakash Linga, Anubhav Mishra, George Simmons, Camille Premont |

Tickets: RDPR-1064, PLCC-13741, PLCC-13738

1.0 Executive Summary

HashiCorp's lack of FedRAMP certification for our managed cloud services (HCP) presents a significant barrier to the market, directly limiting our ability to sell to U.S. federal agencies and shrinking our public sector market share. This compliance gap extends sales cycles and pushes customers toward authorized competitors. Achieving FedRAMP authorization is projected to unlock an additional $72.9M in revenue by CY2028.

Attempting to certify the existing HCP platform would take an estimated 3-5 years, which is not a feasible time-to-market. This document outlines a holistic product management strategy to accelerate this timeline by leveraging IBM's FedRAMP Moderate authorized MultiCloud SaaS Platform (MCSP). This strategic pivot reduces the estimated time to achieve compliance to Tyler Yarborough2025-07-17T22:27:30This is anecdotal and requires a deeper technical analysis by product teams.12-18 months.

Our strategy will initially focus on our two products with the highest known federal demand, Terraform and Vault, establishing a SaaS offering in the federal market. This document defines the market opportunity, details the necessary product and roadmap adjustments for the MCSP platform, establishes a go-to-market plan, and addresses the critical organizational alignment and post-authorization management required for long-term success.

2.0 Market Analysis & Business Case

The business case for pursuing FedRAMP is clear and compelling, supported by strong market indicators and significant revenue potential.

2.1 Market Opportunity & Financial Impact

- Simon Genzer2025-07-28T19:16:37Do we have a sense for how much appetite Federal agencies have for hosting Enterprise self-managed TF and Vault vs desire to access cloud?Tyler Yarborough2025-07-28T20:43:17Great question! The Federal Government has directed agencies to adopt SaaS services and it's a cornerstone of FedRAMP. These agencies are directed by Office of Management and Budget (OMB) policy and federal law to use FedRAMP compliant SaaS offerings. A Federal Agency could deploy a self-managed version of Vault or Terraform in their FedRAMP compliant CSP. However, that agency would itself be responsible for the security and compliance of the entire system, a process that culminates in an Authority to Operate (ATO). We (as Hashi/IBM) would be required to provide a Vault/Terraform version that meets FedRAMP compliant requirements. However, even with this option, there is a strong preference among the Federal Government to use SaaS as a mechanism to reduce their overhead cost (i.e. managing infrastructure), compliance-as-a-service (i.e. HCP FedRAMP compliance removes their need to take on that overhead), lower maintenance costs and faster deployment models. Lastly, offering our SaaS services as FedRAMP compliant also adds our services to the government managed FedRAMP marketplace, the centralized, online repository designed to streamline the U.S. government's adoption of secure cloud computing services. It serves as a one-stop shop for federal agencies to discover and procure cloud service offerings (CSOs) that have met the rigorous security standards established by the FedRAMP program.Massive Market Size: The FedRAMP solutions market, valued at $9.3 billion in 2023, is expected to reach $15.3 billion by 2028. This growth could accelerate further with the federal market's increasing exploration of emerging technologies like AI/ML, HPC, and Quantum Computing. For HashiCorp Terraform & Vault, the serviceable-addressable market (SAM) is projected to be ~$1 billion by 2028.
- Immediate Pipeline Impact: Achieving "In Process" status is projected to add $25M in new pipeline within the first quarter. Full authorization will expand RFI/RFP eligibility by 50% in Civilian agencies and 75% in the Department of Defense (DoD).
- Target Customers & Industries: U.S. Federal Agencies, Aerospace & Defense Contractors, Management & Technology Consulting Contractors, & IBM/HashiCorp Partners.

Projected FedRAMP Sales

| FedRAMP Sales Est. | Terraform ACV | Vault ACV | ACV Total | Non-FedRAMP NACV | Projected FedRAMP NACV |
|---|---|---|---|---|---|
| CY 2026 FedRAMP (2H CY) | $14.8M | $22.5M | $37.3M | $9.4M | $1.8M |
| CY 2027 Y1 FedRAMP | $19.1M | $28.6M | $47.7M | - | $7.5M |
| CY 2028 Y2 FedRAMP | $29.3M | $43.6M | $72.9M | - | $21.5M |
| CY 2029 Y3 FedRAMP | $47.6M | $70.3M | $117.9M | - | $30.1M |

Table Guidance

- The ACV Total is for Federal Sector Only
- Estimates are based on estimates with expectations 2H of 2026 will achieve FedRAMP
- Non-FedRAMP NACV (i.e. $9.4M) is expected government NACV prior to FedRAMP, post-FedRAMP, it is expected that these contracts will shift to the FedRAMP offering.

Table Source / Detailed Analysis on Projected Sales

2.1.1 Targeted Customers

Analysis of SFDC HCP product gap data indicates that eight of our top ten customers, representing a total of ~$9.7M in ARR, are U.S. Agencies, including the (1) United States Airforce (USAF-ABMS), (2) Department of Transportation Federal Aviation Administration, (4) Citizenship Immigration Service, (6) Transportation Security Administration, (7) Federal Reserve Bank of Boston FRB BOS, (8) Internal Revenue Service, (9) United States Air Force GBSD Sentinel, and (10) Cybersecurity Infrastructure Security Agency. Our other top customers are (3) UKG Ultimate Kronos Group and (5) Lockheed Martin.

2.2 Strategic Objectives & Risks of Inaction

Strategic Objectives

- Revenue Growth: Capture the projected $72.9M in federal revenue by CY2028.
- Market Leadership: Establish HashiCorp as a trusted, compliant leader in the public sector.
- Competitive Moat: Create a significant barrier to entry for non-compliant competitors.

Risks of Remaining Non-Compliant

- Market Exclusion: Many RFPs now mandate FedRAMP Moderate or High, making us ineligible to bid.
- Loss of Credibility: Federal customers will doubt our commitment to the public sector if we fail to offer compliant SaaS solutions.
- Increased Sales Friction: Without FedRAMP, the security and compliance burden shifts entirely to the agency, adding cost, liability, and delays that few agency CIOs will accept when alternatives exist.

2.3 Guiding Tenets

This strategy is underpinned by five core tenets that will guide our decision-making throughout the product lifecycle.

Tenets are intentionally set to have potential contradictions & tensions to help force a more rigorous thought process, prevent one-dimensional thinking, and promote long-term, innovative solutions.

- Bruce Ashtiani2025-11-25T16:58:21What I understand from the description of the bullet point is a call to ensure cohesion between FedRamp and non-FedRamp experience. So basically it seems to suggest FedRamp customers should not get a lower-quality experience than non-FedRamp customers which means if TF+Vault work in a certain way currently for commercial customers, they should continue working that way for FedRamp at the very least.Richard Rundle2025-10-31T18:26:51"unified" seems like an overloaded/ambiguous term. The conversation in the comments seems to be around presenting multiple products in a single UI / integrating products, although the bullet point description can also be interpreted as wanting to ship the same code to both commercial and government. As an analogy for the later interpretation, when building mobile apps for android/iOS developers choose from having separate code bases and then implementing features in each code base, or using cross platform tools to ship the same code to both platforms. Unified in this latter sense could be seen as us being explicit about not wanting to have a "Commercial team and code base" and a "Gov team and code base" and instead using feature / environment flags to handle any differences between Gov and Commercial.  It would be good to be unambiguous about what "unified" is intended to convey.1 total reactionBruce Ashtiani reacted with ➕ at 2025-11-25 16:51 PMTyler Yarborough2025-07-28T23:25:56That is one factor that should be considered as part of the unified UX, i.e. how can we build for the long-term vision of better together while working within the boundaries of MCSP architecture and FedRAMP compliance. The significance and importance of this to Federal clients is not fully understood (yet) and should be investigated further. Maybe @tolson@hashicorp.com or @tsilk@hashicorp.com could help us understand the customer experience at the Federal level?Simon Genzer2025-07-28T19:19:53What is the definition of unified UX in this context? Unified across which products: TF+Vault? TF+Vault+Boundary? How significant of a factor is the unified UX in driving adoption in Federal space? (relative to other tenets)Unified Customer Experience: Customers that purchase FedRAMP-compliant software should have the same high-quality experience as our commercial customers.
- Secure & Compliant: HashiCorp Products will adhere to all MCSP controls and maintain continuous FedRAMP compliance requirements.
- Unified Tooling: HashiCorp Products will have a unified tooling experience between Commercial and FedRAMP deployments, minimizing friction for users.
- Willingness to Pay (WTP): We will price and package HashiCorp Products to cover the additional infrastructure and support overhead of FedRAMP-compliant offerings.
- Long-term Supporability: We will update our organizational alignment and staffing to properly support FedRAMP deployments for the long term.

3.0 Product & Roadmap Strategy

FedRAMP fundamentally redefines the product roadmap. Our strategy prioritizes speed-to-market by leveraging a pre-authorized platform.

3.1 Platform & Architectural Strategy

The chosen strategy is to adopt IBM's FedRAMP Moderate Authorized platform, MultiCloud SaaS Platform (MCSP), while maintaining the existing HCP Platform as the commercial platform offering. MCSP simplifies compliance by offering a standardized platform that centralizes services like logging, monitoring, metering, and security. MCSP satisfies a notable portion of compliance controls: 96 of 314 FedRAMP controls are MCSP-managed, and 183 are MCSP-assisted, meaning the product team's effort is reduced. This decision accelerates our time-to-market from 3-5 years to an achievable Tyler Yarborough2025-07-17T22:32:56anecdotal, needs to be confirmed by Engineering.12-18 months.

The strategy is underpinned by guiding tenets, including a Tyler Yarborough2025-07-21T16:40:01Agreed, it is something that I believe we should strive to achieve as part of our efforts. There will be trade-offs, however, these trade-offs should be taken into account as either a one-way door or two-way door decision (i.e. hard to change in the future vs easy to change in the future).Rose Jen2025-07-18T19:48:01I have yet to see this, both for MCSP and broader IBM. It may not be something we will get immediately.unified customer experience and unified tooling between commercial and FedRAMP deployments, abstracting platform differences. It also emphasizes secure and compliant operations, pricing to cover additional overhead, and long-term supportability.

- Note 1: The MCSP Platform is FedRAMP Moderate Authorized as of June 2025. The Curt Bushko2026-04-13T14:37:36Is there a reference/location for this information or a project plan?Tyler Yarborough2026-04-13T21:51:33No, it has been verbally stated as a roadmap item for the IBM Federal COE team. This team is in need of a DISA/DoW sponsor to move from IL2 to IL4. This has been shared with HashiCorp PubSec and it's estimated to take ~6-9 months from initial review to accreditation. As part of the GTM workstream for Vault, this group has started very early conversations about identifying a potential agency candidate that could sponsor this move to IL4.MCSP Platform is actively working on obtaining FedRAMP High IL4 & IL5.
- Note 2: This strategy addresses FedRAMP-ONLY, commercial migrations to MCSP and/or regional deployments are not covered in this strategy.

3.1.1 U.S. Persons Requirements & Organizational Updates

A critical component of our FedRAMP strategy is adhering to the strict Richard Rundle2025-10-31T18:31:46Is there an option to either use existing teams within IBM that meet these requirements or work with a defense contractor partner that meets these requirements? The HashiCorp products would then be run at an arm's length by the team/company that meets these requirements.personnel requirements for accessing and managing the government environment.

- Personnel Restrictions: For FedRAMP Moderate and High environments, there are strict legal requirements regarding the personnel who can access the system. System administrators and any personnel with privileged access to government data must be "U.S. Persons," which typically includes U.S. citizens and lawful permanent residents. This is a standard contractual clause in government agreements.
- Organizational Alignment and Staffing: To meet these requirements, HashiCorp must make significant organizational and staffing updates. This includes:
  - Segregated Teams: Creating segregated, U.S.-based support and operations teams to ensure no privileged access can be obtained from overseas locations.
  - Dedicated Roles: Funding and staffing specific roles as required by FedRAMP, such as a System Owner and an Information System Security Officer (ISSO).
  - Hiring and Screening: Establishing a hiring process to staff U.S.-based support, SRE, and other necessary roles with individuals who have access to the environment and customer data, particularly to support DoD Impact Level 4 (IL4) and Impact Level 5 (IL5) requirements. All team members with access to the environment must be validated to meet the U.S. person and background screening requirements.
  - Specialized Expertise: Funding a U.S.-based technical writer team to author and maintain the system security plan for each FedRAMP-compliant product.
  - Training: Implementing annual FedRAMP security training for all team members involved.
- Isolated Release Pipeline: A new, separate deployment pipeline for FedRAMP will be necessary. Access to this pipeline and its code will be strictly limited to U.S. Persons. This isolated and independently audited pipeline is mandatory to comply with FedRAMP principles of Authorization Boundary, Rigorous Change Management & Control, and Hardened and Monitored Tooling.

3.2 Phased Go-to-Market Roadmap

| Phase | Title | Duration | Key Activities & Deliverables |
|---|---|---|---|
| Phase-1 | Tyler Yarborough2025-07-28T21:25:27That is a really great suggestion and something I hadn't considered due to lack of pipeline opportunities (Boundary has no demand indicators in SFDC). This would be better together story and something that should be looked into further. I can reach out to that team to see the level of interests from them and how it would align with their product roadmap.Simon Genzer2025-07-28T19:23:25Would TF+Vault+Boundary be an even better bundle to go out with?Terraform & Vault on MCSP - FedRAMP Moderate | Tyler Yarborough2025-07-18T18:21:16anecdotal, needs to be confirmed by Engineering.12-18 months | MSCP Platform Integration: Integrate Terraform & Vault with MCSP, inheriting security controls + updating product security controls to be FedRAMP Moderate compliant. Documentation: Develop System Security Plan (SSP) & appendices, with a focus on controls specific to the product and shared responsibility model with IBM. Assessment & Authorization: Partner with IBM for 3rd Party Assessment Organization - 38North (3PAO), conduct assessment, remediate findings, and achieve Authority to Operate (ATO) for Terraform & Vault Product Deliverable: Achieve FedRAMP Moderate Authorization and allow IBM Sellers to transact the offering. |
| Phase-2 | Terraform & Vault on MCSP - FedRAMP High | Post-ATO | Security Update: Update product security controls to be FedRAMP High compliant. Documentation: Update System Security Plan (SSP) & appendices, with a focus on controls specific to the product and shared responsibility model with IBM. Assessment & Authorization: Partner with IBM for 3PAO - 38North, conduct assessment, remediate findings, and achieve ATO for Terraform & Vault Product Deliverable: Achieve FedRAMP High Authorization and allow IBM Sellers to transact the offering. |
| Phase-3 | Portfolio Expansion | Post-ATO | Market Validation: Validate market demand and prioritize next product for FedRAMP Authorization (i.e. Boundary, Consul, Packer, Vault Radar). Onboard Next Product: Follow integration patterns & documentation from Phase-1 to create a repeatable model for subsequent product authorizations. |

3.3 Tyler Yarborough2025-07-18T19:02:34There might be additional considerations for services that will need to be uncovered in discovery and might be product specific issues that product teams will need to adjust their cloud deployment.MCSP Platform Limitations & Considerations

While MCSP accelerates our FedRAMP timeline, product teams must address several platform limitations and considerations during onboarding. These represent key technical risks and dependencies for our FedRAMP initiative.

FedRAMP won't be achieved until on MCSP, specifically MCSP GovCloud

- The first step to FedRAMP compliance is onboarding to the MCSP Platform. There are known limitations and rearchitecting requirements for products to onboard to MCSP, these will be discovered as teams review onboarding requirements in the discovery, during the Gap Analysis & Initial Documentation milestone. After onboarding to MCSP , teams will need to onboard to the specific regionalized deployment with Tyler Yarborough2025-07-28T21:25:58That is correct.Edit; diving a bit deeper here, this goes into the overall multi-dr strategy that we have in place on HCP. As the current deployment model is within a singular region, breaking our strategy around reliability. Now, within FedRAMP, there aren't hard requirements around the 9s, however, the FedRAMP controls favor HA and there are expectations from customers around this.Simon Genzer2025-07-28T20:00:51MCSP runs in one GovCloud region : AWS GovCloud us-gov-east. I am assuming we must deploy there to have a path to FedRAMP for HCP?AWS GovCloud. This deployment will provide platform specific security controls that are FedRAMP Moderate compliant, product teams will need to work in partnership with MCSP Federal CoE to meet the remaining security controls that are not covered by the MCSP Platform.

Scaling Limitations for OpenShift Clusters:

- MCSP recommends a maximum of 500 worker nodes per Hypershift cluster.
- This limit will require a multi-cluster architecture for HCP Vault Dedicated (currently 4119 instances) and HCP Terraform (currently 523 instances) to scale effectively.
  - This limit might not be an issue on day-1 of service as MCSP will only serve FedRAMP customers and will not migrate existing commercial customers. However, this is something that should be carefully considered while technical analysis and planning are done, with a contingency plan for how to scale if needed.

Identity and Access Management (IAM) Trevor Powell2025-07-28T21:57:53I see . So not needed for any level of FedRAMP.  These items are nice-to-have items?Trevor Powell2025-07-23T18:44:05Is any of this related to FedRAMP? Meaning we could not pass certification or customers would not buy our offering without these? If not, it would be good to call out that that there are not hard dependencies with the FedRAMP initiative.Tyler Yarborough2025-07-23T22:43:48Short answer is No. The MCSP Platform is FedRAMP Moderate, these gaps were identified prior to MCSP Platform receiving Moderate ATO. There might be a need for Product Teams to rearchitect or build their own workflows that work within the boundaries and offerings of MCSP, this requires deeper investigation. I'll add this as a note for future readers.Tyler Yarborough2025-07-28T23:38:38Rephrasing this answer. MCSP Platform had to have addressed these gaps to achieve FedRAMP Moderate. The MCSP Platform would not have received FedRAMP authorization without addressing them.Diving a bit deeper into the details, the MCSP Platform most likely addressed the following gaps.(1) Blocker - Must Fix: No Rate Limiting. This is a critical vulnerability and a direct failure of a required control (SC−5).(2) Blocker - Must Fix: No SCIM Support. The inability to perform timely, automated account management at scale fails the intent of AC−2 and presents an unacceptable operational risk.(3) Significant Hurdle - Must Address: Insufficient Constant Verification. This points to a failure in the overall continuous monitoring strategy (CA−7) and a misalignment with modern security principles.(4) Potential Finding - Must Clarify: Limited Claims Federation. This is less of a security control failure and more of a functionality gap. It becomes a blocker only if a sponsoring agency's specific needs cannot be met.Gaps:

The MCSP Platform is FedRAMP Moderate, the gaps listed within IAM were identified prior to MCSP Platform receiving Moderate ATO. There might be a need for Product Teams to rearchitect or build their own workflows that work within the boundaries and offerings of MCSP, this requires deeper investigation.

- Limited Claims Federation: MCSP has limited support for federating upstream IdP claims, which may impact customers relying on extensive claims for authorization.
- No SCIM Support: The lack of SCIM support complicates automated user provisioning and de-provisioning for customers.
- No IAM SLOs or Rate Limiting: The absence of defined SLOs and rate limiting for MCSP's IAM services introduces performance and availability risks for critical user journeys.
- Insufficient Constant Verification: There appears to be no constant verification initiative for MCSP's IAM, a potential security gap.

Reliability and Availability Concerns:

- Lower Availability SLA: The MCSP metering service has a 99.5% SLA, below HCP's 99.95% target. Products may need to implement buffering to prevent usage data loss. FedRAMP does not have mandated SLAs, but there are strong foundations for availability. FedRAMP controls do include sections that cover availability of systems and data. For example, the Contingency Planning (CP) control family, mandates that CSPs develop, implement, and test plans to recover from service disruptions. Federal Agencies are responsible for negotiating specific terms of their SLAs, these are legally binding agreements.
- Cadence Integration for Boundary: A solution must be engineered for HCP Boundary's reliance on Cadence workflows, which may involve running a Cadence/Temporal cluster within the product plane or migrating to a Kubernetes controller architecture.

Product-Specific Service Compatibility and Requirements:

- Vault on OpenShift: Requires explicit work to address container security concerns and ensure persistent storage has sufficient performance.
- Terraform Enterprise (TFE) Redis Reliability: The high cost of a Amy Brown2025-08-04T16:45:37Okay, well, Redis Cluster is only supported when deployed with a single-shard database - no replicated. So a "multi-AZ Redis cluster" actually doesn't make a ton of sense and wouldn't provide any value. I think there's also some misunderstanding in that doc around Redis and databases. This is totally expected, given the terrible vocabulary around Redis. But, you can create multiple databases in a single Redis Enterprise Cluster deployment. But, again, Redis clustering provides zero value to TFE because we cannot have a sharded/replicated redis database.Tyler Yarborough2025-07-31T18:00:02This is covered in the MSCP analysis by the CAG, specifically in this section here: https://docs.google.com/document/d/1X4dwQs8fgiTR_g1pfH027KS-HCoc3pnQ34HHTx9mro8/edit?tab=t.0#heading=h.an1i668e6rh7Link to Meta RFC: https://docs.google.com/document/d/1J-OP98gAruIF9GEg9lGRpc1rHUn0UMPacZvqUgK2HgQ/edit?tab=t.0#heading=h.m61z144jfa02Amy Brown2025-07-31T15:52:30Where did this requirement come from?dedicated, multi-AZ Redis cluster for TFE may not be financially viable, requiring alternative solutions for high availability.
- Sidekiq Job Loss Risk: Amy Brown2025-08-04T16:57:05I'm also curious where this came from? Kubernetes isn't unique in this regard - any orchestrator will kill things under specific resource contention scenarios. Running TFE on k8s has not resulted in any customer complaints about this situation, that I am aware of. Additionally, sidekiq itself doesn't store anything - sidekiq pushes work into/out of Redis. If Redis is lost, the application simply needs to be restarted when Redis is available again and in the worse case scenario, terraform jobs may need to be manually re-triggered. But nothing is corrupted or lost in away that requires more than just running plans/applies.The risk of job loss in Sidekiq due to forceful process termination in Kubernetes needs to be mitigated.
- Terraform Isolation (Kata/gVisor): The long startup times and potential high costs of OpenShift's "peer pods" mode for sandboxed containers present a challenge. We may need to advocate for native gVisor support.

Rose Jen2025-07-18T19:51:21Current IBM pricing model also lacks flexibility in supporting deploy-specific parts # and pricing.Billing and Metering Integration:

- Flex Contract Incompatibility: MCSP Brandon Hsieh2025-08-21T15:37:43Have we confirmed this will stay true for the foreseeable future? I thought there is a Flex equivalent in development at IBM currently? Not sure if that effort includes products on MCSP.Tyler Yarborough2025-08-21T16:56:47@brandon.hsieh@hashicorp.com - this was the latest from @jkirschner@hashicorp.com "The general intent is for all of HashiCorp's cloud offerings to be available through our consumptive commercial offers (either PAYG or "Flex").IBM is working on a "Committed Spend" model that can be applied to different subsets of their overall portfolio, including HashiCorp.However, it's not yet known when there will be a version of "Flex" (aka IBM "Committed Spend") implemented within IBM's systems that MCSP supports (and can therefore be leveraged by services on MCSP and HCP). I expect that will take at least a year." @jkirschner@hashicorp.com - this was from a few weeks ago, has it become more clear on the timing here?Jared Kirschner2025-08-21T17:14:16IBM intends to have their "Strategic Committed Spend" model available in Feb 2026. I have no insight into the timeline on when MCSP will be able to leverage that "Strategic Committed Spend" model - I'd have to ask the MCSP team.That said, even when MCSP itself is integrated with the "Strategic Committed Spend" model, that's a separate topic from:- When can HCP transition Flex 2.0 to IBM's "Strategic Committed Spend" backend? (Not yet known)- Will HashiCorp SaaS offerings on MCSP and HCP be able to leverage the same "Strategic Committed Spend" contract? If so, when? (I'm not aware of any progress on this front.)does not support an equivalent to HCP's "Flex contracts," requiring a new approach to contract structuring.
- Pricing Model Fit: It is an open question whether HCP's current pricing models (e.g., volume discounting) can be supported by IBM's underlying billing systems.
- Usage Synthesis: The MCSP orchestration layer will need to be enhanced to track hourly usage for products like Vault, a function currently handled by HCP Billing.

Platform Philosophy and User Experience:

- Tyler Yarborough2025-07-28T21:28:34This goes back to the tenets of a unified experience for our customers. So while it shouldn't be an adoption barrier for our Federal customers, it does remove the better to together story we have on the HCP Platform.Simon Genzer2025-07-28T20:03:42Do we know that this is a real adoption barrier for Federal?Decentralized UX: MCSP's separation between platform and product UX may lead to a less coherent customer experience compared to the unified HCP portal.
- Simon Genzer2025-07-28T20:05:23AFAIK MCSP does not really have a resource model for products to inherit. The approach is to let erach product manage its own appropriate resource model. Which is what we do with TFC and Boundary and HVD anyway.1 total reactionTyler Yarborough reacted with 👍 at 2025-07-28 21:33 PMResource Model Discrepancy: The difference between MCSP and HCP resource models may force teams to build new, product-specific authorization capabilities.

Compliance Readiness (FedRAMP):

- Significant product-specific control implementation and documentation will still be required from HashiCorp, and we cannot assume automatic compliance by moving to the platform.

Eventing/Pub-Sub Maturity:

- MCSP's eventing capabilities are in a very early stage, with a mature Pub/Sub service not expected to be available for some time, impacting service intercommunication.

New Isolated Release Pipeline Requirement:

- Isolated Release Pipeline: A new, separate deployment pipeline for FedRAMP will be necessary. Access to this pipeline and its code will be strictly limited to U.S. Persons. To achieve FedRAMP compliance, customers will need to be onboarded to the MCSP Platform. This necessitates an isolated and independently audited pipeline, crucial for adhering to FedRAMP principles regarding Authorization Boundary, Rigorous Change Management & Control, and Hardened and Monitored Tooling. This represents a significant shift in development and resource allocation, requiring dedicated U.S. Persons headcount for product development and maintenance. Existing commercial pipelines on HCP will continue to serve our commercial customers.

4.0 Go-to-Market (GTM) & Sales Enablement

A FedRAMP ATO is a license to sell, but it does not sell itself.

4.1 Pricing & Packaging

This is a Business Planning led activity and should be reviewed by that team and the Pricing & Packaging team to confirm the overall PnP strategy.

- Separate SKU: The FedRAMP-compliant offering will be a distinct product on our price list (e.g., "HashiCorp [Product Name] for Government").
- Value-Based Pricing: Pricing will be higher than our commercial offering to reflect the significant investment in security, compliance, and ongoing monitoring. At minimum, it should retain the same or higher COGs margin as commercial.
- Tiered by Impact Level: If we pursue multiple impact levels (e.g., Moderate and High), pricing will scale accordingly.
- Clear Units: Pricing will be based on clear units (per user, per instance) that align with government procurement practices.

4.2 Marketing & Positioning

This is a Product Marketing led activity and should be reviewed. This team should confirm the messaging and relevant materials that are used to position the HashiCorp portfolio.

- Core Message: "Secure, Compliant, and Mission-Ready."
- FedRAMP Marketplace: Our Marketplace listing is a primary lead-generation tool. It must be kept up-to-date with clear descriptions and contact information.
- Targeted Collateral: Develop government-specific content, including whitepapers, case studies, and a dedicated "Trust & Compliance" section on our website.
- Public Relations: Issue a press release, (1) Commitment to FedRAMP, (2) Achieving "In Process" and (3) Achieving "Authorized" status to signal momentum to the market.

4.3 Sales Enablement

This is a Value Engineering led activity as it relates to FedRAMP readiness. This team should confirm all the relevant materials required to enable the Sales Organization.

- FedRAMP Playbook: Create a dedicated playbook for the sales team covering the federal sales cycle, key terminology, personas, and competitive battle cards.
- Training: Conduct mandatory training for all sales and solution engineering staff on how to speak confidently about our security posture and the value of our FedRAMP authorization.

5.0 Post-Authorization & Lifecycle Management

FedRAMP is not a one-time event; it is an ongoing commitment.

5.1 Ongoing Personnel Security & Lifecycle Management

Maintaining the integrity of our FedRAMP authorized products is critically dependent on HashiCorp's BU established and ongoing personnel security protocols. These processes ensure that all management and access to the government environment strictly adheres to FedRAMP requirements throughout the lifecycle.

- U.S. Person Requirement: Access to FedRAMP environment is strictly controlled. All personnel with privileged access, including system administrators and support staff, are confirmed to be U.S. Persons (U.S. citizens or lawful permanent residents), fulfilling a key contractual and security requirement.
- Dedicated & Segregated Teams: The FedRAMP environment is exclusively managed and supported by segregated, U.S.-based operations and support teams. This operational structure ensures no privileged access can be obtained from non-U.S. locations.
- Maintained FedRAMP Roles: Key roles required for FedRAMP governance, including the system owner and information security officer (ISSO), are actively maintained and staffed by qualified personnel.
- Continuous Vetting & Screening: Our hiring and HR processes include continuous validation to ensure all team members with access to the production environment meet the U.S. person and background screening necessary to support all FedRAMP levels, including DoD IL4/IL5.
- Active Security Documentation: The System Security Plan (SSP) and all associated documentation are actively managed and updated by a dedicated, U.S.-based technical writing team to reflect the system's current state.
- Annual Security Training: All personnel with access to the environment undergo mandatory annual FedRAMP security training to ensure they remain current on security policies, procedures, and emerging threats.

5.2 Continuous Monitoring (ConMon)

- Product Requirement: ConMon is a core feature of our government product. Platform & Product PMs must own the ConMon roadmap.
- Activities: This includes monthly vulnerability scans, Plan of Actions and Milestones (POA&M) updates, and annual reassessments by a 3PAO.
- Resource Allocation: A portion of the engineering and security team must be permanently allocated to ConMon activities.

5.3 Change Management

- Impact Assessment: Every new feature or significant change to the government product must undergo a security impact assessment before being approved for the roadmap. Product Management can determine if a feature will be available in commercial-only offering, government-only offering, or in both. The existing Security Assessment workflow will take this into consideration when a new feature is under review.
- Slower Release Cadence: The release cycle for the government product may be slower and more deliberate than the commercial offering to ensure compliance is maintained. This trade-off must be clearly communicated to all stakeholders.

6.0 Success Metrics & KPIs

| Category | Key Performance Indicator (KPI) |
|---|---|
| Compliance Process | Time to achieve ATO vs planCost of Authorization vs budgetNumber of critical findings in 3PAO assessment |
| Business & Revenue | Annual recurring revenue (ARR) from federal agencies, tracking against the projected sales forecastPipeline value of FedRAMP gated opportunitiesWin rate for deals where FedRAMP is a requirementCOGs remain equal or higher than HCP@Commercial |
| Market Penetration | Percent of TAM obtained/wonNumber of Federal Government Agencies obtained/won |

Note: This strategy also feeds into the future of the HCP Platform as MCSP may become the preferred platform for regional deployments (once MCSP has feature parity, scalability issues are addressed, and reliability is able to achieve existing HCP Platform offerings).

PRFAQ

REPLACED - SEE HCP-006

[PR/FAQ] HashiCorp, an IBM Company, Announces FedRAMP Moderate Authorization for HCP Terraform and HCP Vault

| Created: Jul 17, 2025 Reviewed: | Status: WIP \| In Review \| Approved \| Obsolete Owner: Tyler Yarborough Contributors: Approver: Rose Jen, Chris Audie, Cameron Etezadi, Melina McLarty, Will Bengtson, Daniel Savage, Prakash Linga, Anubhav Mishra, George Simmons, Camille Premont |
|---|---|

Problem Statement

HashiCorp's lack of FedRAMP certification for our managed cloud services (HCP) presents a significant barrier to the market, directly limiting our ability to sell to U.S. federal agencies and shrinking our public sector market share. This compliance gap extends sales cycles and pushes customers toward authorized competitors. Achieving FedRAMP authorization is projected to unlock an additional $72.9M in revenue by CY2028.

Press Release

HashiCorp Announces FedRAMP Moderate Authorization for HCP Terraform and HCP Vault

SAN FRANCISCO, [March. 16, 2023] (GLOBE NEWSWIRE) -- HashiCorp, an IBM Company (NYSE: IBM), a leader in multi-cloud infrastructure automation software, today announced it has achieved Federal Risk and Authorization Management Program (FedRAMP) Moderate authorization for two of its flagship cloud offerings; HCP Terraform and HCP Vault. This milestone makes HashiCorp's critical infrastructure automation and secrets management tools available to a broad spectrum of government agencies, addressing stringent security and compliance requirements for handling sensitive government data.

FedRAMP is a government-wide program that provides a standardized approach to security for cloud services. By achieving FedRAMP Moderate authorization for HCP Vault and HCP Terraform, IBM is making these critical tools available to a broad spectrum of government agencies, addressing the stringent security requirements for managing Controlled Unclassified Information (CUI) and other sensitive, non-public data.

Tyler Yarborough2025-07-25T17:49:34Potential people to get quote from - Rob Thomas, Armon, Michael W, Dinesh, others?Tyler Yarborough2025-07-17T22:55:43Example quote, need to get a real one"Government agencies are at a critical juncture in their modernization journey, requiring secure and scalable hybrid cloud solutions," said Arvind Krishna, Chairman and CEO of IBM. "HashiCorp's tools are the standard for infrastructure and security automation. Bringing them into our FedRAMP portfolio is a key step in providing a comprehensive platform for our public sector clients to accelerate their digital transformation with confidence and control."

A hypothetical federal agency CIO stated, "Having HCP Terraform and Vault available as FedRAMP-authorized services is a game-changer. It allows us to leverage the industry's best automation tools without the added cost, liability, and delays of managing the security and compliance burden ourselves. This will significantly accelerate our cloud adoption and modernization initiatives.

The FedRAMP-compliant offerings will be available as distinct products, such as "HashiCorp Terraform for Government," with value-based pricing to reflect the significant investment in security and continuous monitoring. Building on our commitment to the public sector, HashiCorp, an IBM Company, is actively pursuing FedRAMP High authorization. This is a crucial step to meet the rigorous Department of Defense (DoD) Impact Level 4 (IL4) and Impact Level 5 (IL5) security controls, which are required to handle sensitive Controlled Unclassified Information (CUI) and support mission-critical national security systems.

External FAQs

Q. What is FedRAMP and why is it important?

A. The Federal Risk and Authorization Management Program (FedRAMP) is a U.S. government-wide program that provides a standardized approach to security assessment, authorization, and continuous monitoring for cloud products and services. It ensures that cloud solutions used by federal agencies meet stringent security requirements. Many federal RFPs now mandate FedRAMP Moderate or High, making this authorization essential for any company wanting to provide cloud services to the U.S. government.

Q. Which HashiCorp products are now FedRAMP Moderate authorized?

A. HashiCorp has successfully achieved FedRAMP Moderate authorization for two of its products, HCP Terraform and HCP Vault. This prioritization was driven by significant demand from federal agencies. Looking ahead, HashiCorp intends to assess market interest for additional products, including Boundary, Consul, and Packer, to determine their potential for future authorizations.

Q. How can my agency procure these FedRAMP-authorized offerings?

A. The offerings will be available as a distinct SKU on our price list (e.g., "HashiCorp [Product Name] for Government") and can be transacted through IBM Sellers. These services are also listed on the FedRAMP Marketplace.

Q. Will the user experience be different from the commercial versions of HCP Terraform and HCP Vault?

A. A core tenet of our strategy is to provide a unified customer experience. While the underlying platform is different to ensure compliance, we aim for the FedRAMP-compliant software to have the same high-quality experience and unified tooling as our commercial offerings, abstracting platform differences wherever possible.

Q. Are you planning to achieve a higher level of FedRAMP authorization?

A. Yes. IBM and HashiCorp are committed to achieving FedRAMP High authorization for both HCP Vault and HCP Terraform to serve agencies with more sensitive data needs. We are actively working toward FedRAMP High IL4 & IL5 certifications.

Q. If I am a current HCP Terraform/Vault customer, is my current deployment automatically FedRAMP-compliant?

A. No. FedRAMP compliance is not automatically conferred on commercial accounts. Our FedRAMP-authorized products operate in a distinct environment separate from our commercial cloud. This is necessary to meet federal requirements, including:

- A Dedicated Authorization Boundary: All FedRAMP services are hosted in a physically and logically separate environment built for the U.S. public sector.
- NIST Security Controls: The platform has been specifically hardened and audited against the stringent set of security controls required by FedRAMP.
- Restricted Personnel Access: Operations and support for the FedRAMP environment are handled exclusively by screened U.S. persons.

Q. How do I get access to the FedRAMP-compliant version? A. You will need to procure a new subscription specifically for our FedRAMP offerings. To begin this process, please contact our public sector sales team.

Q. Can my HCP Terraform/Vault be migrated to the FedRAMP-compliant environment?A. No. To protect the security posture and strict compliance of our FedRAMP-authorized environment, direct migration from the commercial HCP platform is not supported. The process is instead a re-deployment of your configurations into the new environment.

This policy is rooted in foundational FedRAMP principles:

- Protecting the Authorization Boundary: The FedRAMP environment is a strictly controlled "island." All data, configurations, and operations must remain within this boundary to be considered compliant. Migrating data from an external, non-audited commercial platform would constitute a boundary breach and compromise the integrity of the environment.
- Ensuring Data Integrity and Provenance: FedRAMP requires a clear and unbroken chain of custody for all government data. Configurations and state files from the commercial platform have not been subject to FedRAMP's rigorous controls and monitoring throughout their lifecycle. To ensure compliance, your configurations must be established natively within the FedRAMP platform.
- Validating Configuration Compliance: A configuration that is perfectly acceptable in a commercial context may not be compliant with FedRAMP's stricter security requirements. Re-deploying your configurations provides a critical opportunity to review and validate them against FedRAMP security controls, ensuring they are compliant from day one.

Internal FAQs

[For internal FAQs, list hard questions internal stakeholders may ask-including concerns, challenges, and potential risks. For guidance on key topics / areas see: Internal FAQs]

Q. What was the primary problem this initiative solves?

A. HashiCorp's lack of FedRAMP certification for our managed cloud services (HCP) was a significant barrier to the public sector market. It directly limited our ability to sell to U.S. federal agencies, extended sales cycles, increased friction, and pushed potential customers to already-compliant competitors, threatening our market share and credibility in the federal space.

Q. How large is the estimated customer demand for FedRAMP? What is the TAM (total addressable market)? How many customers have this need or problem?

A. The total addressable market (TAM) for FedRAMP solutions was $9.3 billion in 2023 and is projected to grow to $15.3 billion by 2028. For HashiCorp specifically, achieving FedRAMP authorization is projected to unlock an additional $72.9 million in revenue by CY2028. We project that achieving "In Process" status alone will add $25 million in new pipeline within the first quarter. Our SFDC Product Gaps have identified 73 HCP Terraform customers and 64 HCP Vault customers.

Tyler Yarborough2025-07-17T23:28:50This is a proposal - need to sync w/ PnP on pricing strategy.Q. What is the rationale for the price point chosen? (link to Pricing Proposal)

A. There will be a separate SKU for FedRAMP. The FedRAMP-compliant offering will be a distinct product on our price list (e.g., "HashiCorp [Product Name] for Government"). It will be priced higher than our commercial offering to reflect the significant investment in security, compliance, and ongoing monitoring. As we obtain higher certification, (e.g. High, IL4, IL5), pricing will scale accordingly. It will be priced on clear units (per user, per instance, etc.) that aligns with government procurement requirements.

Jared Kirschner2025-07-28T16:32:52The general intent is for all of HashiCorp's cloud offerings to be available through our consumptive commercial offers (either PAYG or "Flex").IBM is working on a "Committed Spend" model that can be applied to different subsets of their overall portfolio, including HashiCorp.However, it's not yet known when there will be a version of "Flex" (aka IBM "Committed Spend") implemented within IBM's systems that MCSP supports (and can therefore be leveraged by services on MCSP and HCP). I expect that will take at least a year.Tyler Yarborough2025-07-25T18:07:39This needs deeper discussion and research with Billing (Hashi+IBM)@jkirschner@hashicorp.com - do you have any insight into how IBM plans to handle Flex and offerings moving forward?_Assigned to jkirschner@hashicorp.com_Q. How would Flex Contracts be impacted by this new FedRAMP offering?A. MCSP does not support an equivalent to HCP's "Flex contracts," requiring a new approach to contract structuring. For the "HashiCorp [Product Name] for Government product, it will need to be purchased via IBM Paper as a contractual offering that grants access to the particular product.

Q. What/who are the current competitors for this product?

A. The FedRAMP landscape is highly competitive, the market is multifaceted with pressure from native tools embedded in the major cloud platforms (AWS, Azure, GCP - all with FedRAMP High) and from specialized enterprise vendors.

The primary challenge for HashiCorp is to convince federal agencies that the benefits of a multi-cloud, platform-agnostic approach with HCP Terraform and HCP Vault outweigh the convenience and perceived simplicity of using the free, native tools provided by their primary CSP.

The secondary challenge for HashiCorp is specialized enterprise vendors. For HCP Terraform, there is the internal competition of RedHat Ansible Automation Platform and external competition of Puppet & Chef. For HCP Vault, there are several major competitors, including; CyberArk, BeyondTrust, and Delinea.

In summary, the main competitor for HCP Terraform is not another multi-cloud IaC tool, rather the native IaC services of AWS & Azure. The main competitor for HCP Vault is two-pronged, the native secret management offering by AWS & Azure and the enterprise PAM vendors, CyberArk & BeyondTrust. It is pertinent that we position HashiCorp on the value of a unified, platform agnostic approach to cloud automation and security.

Q. Why did we choose to partner with IBM and use the MCSP platform instead of certifying our own HCP platform?

A. Certifying the existing HCP platform would have taken an estimated 3-5 years and cost between $500M-$900M, which was not a feasible time-to-market. Leveraging IBM's pre-authorized MultiCloud SaaS Platform (MCSP) reduces the timeline to an Tyler Yarborough2025-07-18T18:20:15Needs to be confirmed by Product Teams.achievable 12-18 months. MCSP also simplifies compliance by managing a significant portion of the required FedRAMP controls (96 of 314 are MCSP-managed, and 183 are MCSP-assisted).

Q. What about using Managed Service Providers (MSPs) to improve our time-to-market? Was that considered as part of the assessment & strategy?

A. Yes, it was reviewed by the Partner Alliance Team, Portfolio Strategy, and Product PMs. It was determined that MSPs were not a viable option for time-to-market and advised that MCSP should be prioritized.

Q. What are the key technical challenges or limitations with the MCSP platform?

A. While MCSP accelerates our timeline, it presents several limitations. These include potential scaling issues for OpenShift clusters, gaps in Identity and Access Management (IAM) such as a lack of SCIM support, a lower SLA (99.5%) for the metering service, and incompatibility with HCP's "Flex contract" billing models. Product teams must engineer solutions to address these and other product-specific compatibility requirements during onboarding.

Q. Will we need a new release pipeline for FedRAMP?

A. Yes, products that onboard MCSP for FedRAMP will need to create a new deployment pipeline and access to the FedRAMP deployment pipeline and its code is strictly limited to U.S. Persons. Maintaining a separate, isolated, and independently audited pipeline for FedRAMP is mandatory and is driven by three FedRAMP principles, (1) Authorization Boundary, (2) Rigorous Change Management & Control, and (3) Hardened and Monitored Tooling. Restrictions to U.S. Persons are non-negotiable for individuals who operate, maintain, and deploy FedRAMP environments.

Q. How will this affect our product roadmap and release cycles?

A. FedRAMP requires a more deliberate approach to change management. The release cycle for the government product may be slower than the commercial offering to ensure compliance is maintained. Every new feature or significant change must undergo a security impact assessment before being approved for the government product's roadmap. Continuous monitoring activities, such as monthly vulnerability scans and annual reassessments, will also be a permanent allocation for engineering and security teams.

Q. How are we enabling our sales and marketing teams for this launch?

A. We are launching a comprehensive go-to-market plan. This includes creating a dedicated FedRAMP sales playbook, conducting mandatory training for all sales and solution engineering staff, and developing government-specific marketing collateral under the core message "Secure, Compliant, and Mission-Ready." We will also issue press releases at key milestones to signal momentum to the market, including our commitment to FedRAMP, our "In Process" status, and "Authorized" status.

Q. How do we retain product telemetry within our Snowflake & Sigma systems?

A. We will not build a new FedRAMP compliant pipeline and/or deploy a FedRAMP compliant Snowflake/Sigma offering. Teams will adopt the existing telemetry systems that exist within the boundaries of MCSP. Note; the existing MCSP FedRAMP deployment does not support business telemetry and it is a backlog item that the MCSP team is exploring implementing in the future (date not set, ref1, ref2).

Q. If you look a the current Maturity Model where does your product/feature sit? Does it align to an existing use case/sub use case? Or is it a net new product/feature that would require a new use case (see FY25 MM Use Case Mapping sheet).

A. This would require a new use case. The initial FedRAMP target products are Terraform & Vault, however, it can extend to cover all products if there is a market need.

Q. Who are the most relevant launch partners for this new service/feature?

A. HashiCorp will need to partner with IBM MCSP teams, including the Federal Center of Excellence (CoE) team and external vendors for Third-Party Assessment Organization (3PAO).

Q. Are there any unique opportunities for our partners to integrate or extend the functionality of this product or feature?

A. Not at the moment, FedRAMP would be hosted on MCSP. There could be long-term opportunity to incorporate MSPs as another channel for selling FedRAMP products, however, this would require Product Engineering adjustments and a separate plan for how it would be supported and maintained in the long-term.

Q. What happens if a customer encounters issues with FedRAMP products?

A. Customers should follow our existing support ticketing system workflow. These tickets will need to be routed to the U.S. Persons based in the United States.

Q. Do we have any third-party dependencies to build this? If so, what are they and why will they be willing to partner with us?

A. Yes, HashiCorp product teams will need to onboard MCSP and partner with the MCSP Federal CoE to achieve FedRAMP compliance.

Q. What third-party technologies are we dependent on to function properly for product analytics and operational data to work as promised?

A. We will leverage the MCSP offerings for product analytics & operational data. While our existing 3rd-party services offer FedRAMP, it will not be pursued due to the overhead required to support these services, associated service costs, and personnel cost to maintain the service.

Q. Are there any potential regulatory or legal issues to consider?

A. Achieving FedRAMP Authority to Operate (ATO) is a major accomplishment, however this is not a one-time event; it is an ongoing commitment. There is a continuous compliance, heightened scrutiny, and significant legal exposure. Failure to comply with ongoing obligations can lead to severe contractual, financial, and reputational damage to HashiCorp products & IBM. There are six primary areas to be understood and followed to ensure that we maintain a FedRAMP compliant environment & product offering.

Note: The listed items below may overlap with ownership by the MCSP Platform, however, these are included to be thorough in providing an understanding of how to operate in a FedRAMP environment.

(1) Continuous Monitoring & Reporting

The cornerstone of post-authorization is continuous monitoring (ConMon), which includes the following.

- Mandatory Reporting that includes vulnerability scan reports from all system components, failure to report is considered a contractual breach.
- Strict remediation timeline: High-risk vulnerabilities must be remediated within 30-days and moderate within 90-days, failure to meet deadlines can trigger formal escalation procedures which can result in suspension or revocation of ATO.
- Annual Assessment: An independent third-party assessment organization (3PAO) must be conducted annually to verify systems security posture. The findings are scrutinized by the sponsoring agency or the Joint Authorization Board (JAB) and can directly impact the continuation of the ATO.

Legal Implication: Each report and Plan of Actions and Milestones (POA&M) are a legally binding attestation to the security state of the system. Inaccuracies or failures in this reporting can create significant liability.

(2) False Claims Act (FCA) Liability

Perhaps the most significant legal risk for a government contractor is the False Claims Act. The Department of Justice has explicitly targeted cybersecurity as a key enforcement area, holding contractors liable for failing to meet their contractual security obligations.

- Implied Certification: When a Cloud Service Provider (CSP) submits invoices for services provided under its FedRAMP ATO, it is implicitly certifying that it is upholding the required security controls and continuous monitoring activities.
- Knowingly Submitting False Claims: If the company is aware of significant security deficiencies, is not performing the required monitoring, or is misrepresenting its security posture in reports while continuing to bill the government, it could face staggering FCA liability. This can include treble damages (three times the government's losses) plus substantial per-claim penalties. Landmark settlements have demonstrated that the government is actively pursuing cases against contractors for cybersecurity failures.

(3) Incident & Data Breach Notifications

A FedRAMP environment is subject to some of the most demanding breach notification rules, which vary based on the type of data handled.

- FISMA Reporting: Under the Federal Information Security Modernization Act (FISMA), agencies must report cyber incidents to the U.S. Computer Emergency Readiness Team (US-CERT) within one hour of detection. This requirement flows down to the CSP.
- Controlled Unclassified Information (CUI): A proposed Federal Acquisition Regulation (FAR) rule mandates that contractors report any suspected CUI incident within 8 hours of discovery. A failure to safeguard CUI can also result in the contractor being held financially liable for the government's incident response and mitigation costs.
- Personally Identifiable Information (PII) and Protected Health Information (PHI): If the system handles PII or PHI, breach notification is also governed by regulations like the Privacy Act and the Health Insurance Portability and Accountability Act (HIPAA). HIPAA, for example, has its own 60-day notification deadline for individuals and can impose significant financial penalties for violations.

Legal Implication: Failure to meet these rapid notification timelines can result in contractual penalties, regulatory fines, and a severe loss of trust with government partners.

(4) Change Control

The federal government must have assurance that the security posture that was authorized is the one that is maintained. Any "significant change"-such as adding a new service, changing cryptographic modules, or moving to a new data center-triggers a formal review process.

- Formal Approval Required: A CSP cannot unilaterally implement a significant change. It must submit a Significant Change Request (SCR) to its sponsoring agency or the JAB for approval, often requiring a security impact analysis from a 3PAO.
- Contractual and Operational Delays: This process can be lengthy and legally complex. Proceeding with a change without approval is a serious violation that can jeopardize the ATO. The FedRAMP PMO has been working on reforms to streamline this process, but for now, it remains a major legal and operational hurdle that must be carefully managed.

(5) Data Sovereignty

For FedRAMP Moderate and High environments, there are strict legal requirements regarding data residency and the personnel who can access the system.

- Data Must Reside in the U.S.: The cloud service and all government data must be stored within the physical borders of the United States.
- Personnel Restrictions: System administrators and any personnel with privileged access to the government's data must be "U.S. Persons" (typically U.S. citizens or lawful permanent residents). This is a standard contractual clause in government agreements.
- Challenges for Global Companies: This poses significant legal and operational challenges for global technology companies, who must create segregated, U.S.-based support and operations teams, often at a much higher cost, and ensure no privileged access can be obtained from overseas locations. This is one of the cornerstone reasons for selecting the MCSP Platform, Organizational Structure of Personal, and 3rd Party Vendor FedRAMP Requirements.

(6) Contractual and Service Level Agreement (SLA) Disputes

FedRAMP requirements are embedded within government contracts and SLAs. These legally binding documents specify uptime, availability, and security performance.

- Financial Penalties: Failing to meet the agreed-upon SLAs can result in financial penalties, reduced payments, or other contractual remedies.
- Termination for Default: A serious or persistent failure to maintain the required security posture can be grounds for the government to terminate the contract "for default." This is a catastrophic outcome for a contractor, as it severely damages their reputation and ability to win future government work.

Q. How will we manage the risk of up-front investment required?

A. Achieving FedRAMP compliance demands a substantial commitment of resources, extensive technical proficiency, and modifications to HashiCorp SaaS products to align with stringent security controls. To mitigate initial investment risks, HashiCorp will utilize the MCSP Platform and collaborate with the MCSP Federal CoE. This partnership minimizes the need for in-depth internal FedRAMP technical knowledge by leveraging the specialized expertise of the dedicated MCSP Federal CoE team. Additionally, employing the MCSP Platform accelerates time to market and eliminates the need for re-architecting the existing HCP Platform to satisfy strict FedRAMP requirements.

Q. What are the key security / privacy concerns that a customer may raise regarding FedRAMP, and how do we address them?

A. We can provide several pieces of official evidence to customers, (1) Direct link to the Official FedRAMP Marketplace Listing, (2) Copy of Authority to Operate (ATO) Letter, (3) Security Package Documentation (with NDA).

- The FedRAMP Marketplace is the official government registry of all authorized Cloud Service Providers. It is the source of truth managed by the government and should be considered the incontrovertible proof of status.
- Authority to Operate (ATO) Letter is the most direct piece of evidence. The ATO letter is the formal document that grants CSPs the authority to operate. It is a signed, official document that serves as the certificate of authorization.
- The most definitive and authoritative proof can be provided with the Security Package Documentation, that documentation includes the System Security Plan (SSP), Security Assessment Report (SAR), and Plan of Action and Milestone (POA&M) document. These documents contain highly sensitive information about security architecture and operations and should never be shared publicly.

The quickest inquiry for initial discussion can be covered by the FedRAMP Marketplace listing. A formal due diligence process or a federal agency customer may request Security Package Documentation.

Appendix

- FedRAMP 26
- MCSP Discovery Meta-RFC
- MCSP Discovery (Radar) - Notebook LM
- HCP FedRAMP Assessment - Notebook LM
- Zoom CVE SLA Executive Summary
- Customer Gap Dashboard
- The Federal CoE (IBM)
- Regulatory Compliance (IBM)
- MSCP Onboarding (IBM)
- HC CCF
- Product Gap Report
- Portfolio Strategy TAM Analysis
- MSP Research
- FedRAMP in a Box
- Hashistack FedRAMP / STIG Request Tracker
- MCSP W3 Program Page
- MCSP GitHub Page
- Aha Roadmap (Links coming) (SAASPLAT, SAASPLAT-E, SAASPLAT) - Cut ticket for access - request viewer access!
- MCSP Supported Regions
- HCP Platform Capabilties and Impact
- HCP ARR
- Snowflake - FedRAMP Support
- Splunk - FedRAMP Support
- Datadog - Moderate FedRAMP Support
- Datadog - Commitment to FedRAMP High including IL5
- AWS CloudWatch offers FedRAMP support (GovCloud) - Moderate + High
- Six products on MCSP are FedRAMP authorized (July 2025)
- IBM Federal Center of Excellence (CoE)

Review Tracking

List the designated 'Contributors' who will review and provide feedback on this PR FAQ (as outlined in the Discovery DACI).

Core Team for FedRAMP

| Function | Contributor Name |
|---|---|
| Platform PM (Driver) | Tyler Yarborough, Rose Jen |
| Product PM | Terraform: Daniel Savage Vault: Paul Stamp |
| Product Engineering | Terraform: Chris Steinmeyer Vault: Rob Richard |
| Product Design | Terraform: Bruce Ashtiani Vault: Hans Kao |
| Security & GRC | Luka Trbojevic, Jessica Capaldi |
| CAG | Matthew Keeler, Tobias Meyer |
| [IBM] Senior Director Federal Risk and Compliance | Anthony Campbell |
| [IBM] Federal Compliance - DE | David Jenkins |
| [IBM] MCSP PM | Dave Sudlik |
| [IBM] Security Architect | Michael James (Anthony Team) |
| [IBM] FedRAMP CoE Project Mgmt | Tina Bell (Anthony Team) |
| [IBM] Distinguished Engineer MCSP | Shikha Srivastava |
| [IBM] FedRAMP FinOps | Nicholas Navarro |

HashiCorp Contacts

| Function | Contributor Name |
|---|---|
| Platform PM (Driver) | Tyler Yarborough, Rose Jen |
| Approvers | Michael Weingartner, Chris Audie, Freddy Vaquero, Cameron Etezadi |
| Product Engineering | Vault: Vinithra Varadharajan Terraform: Brandon Hays |
| Product PM | Vault: Paul Stamp Terraform: Daniel Savage |
| Product Design | Vault: Hans Kao Terraform: Bruce Ashtiani |
| Platform Engineering | Matthew Keeler |
| Product Marketing | Meghan Liese |
| Support Enablement | Stephane Morali |
| Value Engineering | Adam Cavaliere |
| WTFO (FedRAMP) | Tim Silk, Tim Olson |
| Sales | Melissa Palmer, Jen Grijalva |
| Security | Brandon Hsieh, Luka Trbojevic |
| Partner Alliances | Asvin Ramesh |
| Portfolio Strategy | George Simmons, Ella Anh Thu Hoang Nguyen |
| CAG | Jeff Mitchell, Jim Lambert, Matthew Keeler |
| Business Planning | Shawn Collins, Kristy Long, Andrew LaPrade, Ni Vasuviwat, Mason Cabot |
| Education | Judith Malnick |
| Legal | Lawrence Drewry |

IBM Contacts

| Function | Contributor Name |
|---|---|
| FedRAMP Owner on MCSP | Anthony Campbell |
| Federal Compliance - DE | David Jenkins |
| MCSP PM | Dave Sudlik |
| Security Architect | Michael James (Anthony Team) |
| FedRAMP COE | Tina Bell (Anthony Team) |
| Distinguished Engineer MCSP | Shikha Srivastava |
| FedRAMP FinOps | Nicholas Navarro |

PRD

See Product specific PRDs in their respective PLCC Tickets

Tickets: RDPR-1064, PLCC-13741, PLCC-13738

DRAFT DRAFT - NOT READY FOR REVIEW

| [PRD] HashiCorp FedRamp Product Strategy Summary: Community members struggle to finish the final step in releasing widgets. |  |
|---|---|
| Created: Jan 22, 2010 Owner: email@hashicorp.com Contributors: person1@hashicorp.com, person2@hashicorp.com | Status: WIP \| In Review \| Approved \| Obsolete RFC: Link to RFC when created |

The Problem Requirements Document (PRD) begins with a brief introduction that explains the goal of the PRD. While the introduction section is read first, it should be authored last. Writing the overview last allows the author to summarize the final content of the PRD, rather than write an introduction without knowing the end result.

Background

The goal of the background section is to provide the reader with helpful context before diving into the problem domain. Provide sufficient details to properly educate the reader on the problem domain. In order for a reader to understand the content of the PRD, they must first understand the context. That context setting is the goal of the background section. Visual explanations are encouraged if applicable.

Problem

This is the heart of the PRD as it simplifies the user research into clear problem statements. Each of the problems should clearly map to the problems identified by the user research and the corresponding personas defined below. The personas should be generalized versions of the actual interviewed users.

Personas

- Affected Persona 1 has troubles developing with this problem
- Affected Persona 2 has troubles operating with this problem
- Affected Persona 3 has troubles securing with this problem

Requirements and Phases

|  | Requirements |
|---|---|
| Phase 1: Improve Widget Creation tooling | Must be easy for widget creators to create widgets with local dev environment |
| Widget creators must have testing tooling workflow in development |  |
| Phase 2: Better publishing workflow for widgets | Publishing widgets should be a clear documented workflow |
| Phase 3: Automated widget publishing | Widget tooling will automate published updates for widgets |

The problem is broken down into phases to enable iterative implementation. Each phase:

- Builds value on the previous phase and therefore they are defined in sequential order of value. There is no need to define priority as that's inferred from ordering.
- Is not considered complete until all of the requirements are fulfilled.
- Should provide end-to-end value. That is, even if only the phase can be addressed then this should provide value and feel like a new feature/solution for the user:

Some PRDs will only have one phase, that is completely fine.

<Phase 1>

The title defines the objective for solving the problem and references the persona (e.g. "Must be easier for policy writers to create Terraform mock data for sentinel tests").

<Requirement 1>

While each phase focuses on a single problem from the users perspective, it may need to be broken down into multiple requirements to address specific problems with individual components, features, docs, etc. There are a few things to consider when writing the requirement:

- Priority should not be defined for the requirements as they are all considered to be required for the phase.
- If a requirement is not considered to be of equal priority then consider splitting it into a separate phase.
- Each requirement may necessitate one or more RFCs.

Acceptance Criteria

The acceptance criteria should be written like test cases for the requirement. This should be written objectively so anybody can validate the criteria is met prior to release.

- 

Considerations

Each requirement should have a "Considerations" section which is a consideration for the RFC writer. It should almost always be a question, not a suggestion. They could be dismissed outright or answered within the RFC to call back to the consideration itself. During the review process it is likely that most comments will target the considerations; in most cases these comments will need to be deflected to the RFC.

- <Consideration>

<Phase 2>

<Description>

<Requirement 1>

<description>

Acceptance Criteria

- 

Considerations

- 

User Research

This section is the most important as it grounds the PRD in real, experienced user problems. For the author the goal of this section is to collect high-quality research which will be used to identify common patterns across users. The better the research, the easier it is to determine patterns, and the simpler the problem statement can be. For readers this section sets a concrete context for understanding the core problem.

<Customer>

For each customer include a link to the interview notes, a short paragraph explaining the state of their workflow today, and key takeaways

- <Problem/Takeaway>

- <Problem/Takeaway>

Approvals

Red names still require approval, green names with a checkmark have approved.

Each of the representative stakeholders must approve the PRD before it proceeds to kick-off and RFC writing. Sign-off by stakeholders requires these to be satisfied:

- The release summary defines which acceptance criteria are in scope.
- Engineering and Product Management agree on the target release.
- Provides sufficient clarity to author the RFC.
- Schedule a meeting with engineering and design to review the PRD.

Approved names will have a ✅

Project Engineering Lead: XX

Product Manager: ✅ XX

VP of Product: XX

Sales Engineer Lead: XX

ProductDesign Lead: XXX

[Add other approvers as necessary]

Style Notes

All PRDs should follow similar styling and structure to ease reading. "Beautiful is better" is a core principle of HashiCorp and we care about the details.

Heading Styles

"Heading 2" should be used for section titles. We do not use "Heading 1" because aesthetically the text is too large. Google Docs will use Heading 2 as the outermost headers in the generated outline.

"Heading 3" should be used for sub-sections.

Further heading styles can be used for nested sections.

Lists

When making lists, it is common to bold the first phrase/sentence/word to bring some category or point to attention. For example, a list of API considerations:

- Format should be widgets
- Protocol should be widgets-rpc
- Backwards compatibility should be considered.

Typeface

Type size should use this template's default configuration (11pt for body text, larger for headings), and the type family should be Arial. No other typeface customization (eg color, highlight) should be made other than italics, bold, and underline.

Code Samples

Code samples should be indented (tab or spaces are fine as long as it is consistent) text using the Courier New font. If syntax highlighting is included, please ensure the highlighted syntax is the proper font size and using Courier New font so non-highlighted samples aren't out of place.

CLI output samples are similar to code samples but should be highlighted with the color they'll output if it is known so that the RFC could also cover formatting as part of the user experience.

func example() {

<-make(chan struct{})

}

FedRamp Commitment Blog

NOTE: This is a draft. Please do not release or share (internally or externally) it until the strategy is aligned and the level of effort to achieve FedRAMP is confirmed. We want to avoid announcing FedRAMP until we have a higher confidence on when we can deliver it.

FOR IMMEDIATE RELEASE

IBM Announces Commitment to FedRAMP Moderate Authorizations for HashiCorp's Vault

ARMONK, N.Y. - $DATE, 2025 - IBM (NYSE: IBM) today announced its commitment to achieving both Federal Risk and Authorization Management Program (FedRAMP) Moderate authorizations for Vault, a flagship cloud offering from HashiCorp, an IBM company. This initiative will integrate HashiCorp's leading automation technologies into IBM's secure and compliant hybrid cloud portfolio for the U.S. public sector.

FedRAMP is a government-wide program that provides a standardized approach to security for cloud services. By pursuing Moderate authorizations for Vault, IBM is making this critical tool available to the full spectrum of government agencies. This effort addresses the stringent security requirements of agencies managing everything from public data to highly sensitive, unclassified information.

Tyler Yarborough2025-07-16T17:49:15Need to get quotes to include in announcement. Maybe Michael as the BU owner of HashiCorp, Rob as the Software leader, Armon for Hashi, and potentially Arvind?"Government agencies are at a critical juncture in their modernization journey, requiring secure and scalable hybrid cloud solutions," said Arvind Krishna, Chairman and CEO of IBM. "HashiCorp's tools are the standard for infrastructure and security automation. Bringing them into our FedRAMP portfolio is a key step in providing a comprehensive platform for our public sector clients to accelerate their digital transformation with confidence and control."

This initiative integrates HashiCorp's widely adopted tool Vault for secrets management-into IBM's robust ecosystem of trusted cloud solutions for government. It compliments IBM's extensive portfolio of existing FedRAMP-authorized offerings, providing public sector clients with a more comprehensive toolset to automate and secure their mission-critical applications across any environment-from on-premises data centers to multiple public clouds.

IBM, with its deep expertise in security and long history of partnership with the federal government, will manage the authorization process. The company is actively working with a third-party assessment organization (3PAO) to complete the readiness assessments for both FedRAMP Moderate impact levels and is on track to achieve "In Process" designations.

About IBM

IBM is a leading provider of global hybrid cloud and AI, and consulting expertise. We help clients in more than 175 countries capitalize on insights from their data, streamline business processes, reduce costs and gain the competitive edge in their industries. Thousands of governments and corporate entities in critical infrastructure areas such as financial services, telecommunications and healthcare rely on IBM's hybrid cloud platform and Red Hat OpenShift to affect their digital transformations quickly, efficiently and securely. IBM's breakthrough innovations in AI, quantum computing, industry-specific cloud solutions and consulting deliver open and flexible options to our clients. All of this is backed by IBM's long-standing commitment to trust, transparency, responsibility, inclusivity and service.

About HashiCorp, an IBM company

HashiCorp is a leader in multi-cloud infrastructure automation software. The HashiCorp software suite enables organizations to adopt a common cloud operating model to provision, secure, connect, and run any application in any environment. The company's open-source tools are downloaded tens of millions of times each year and are broadly adopted by the Global 2000.

Contact:

IBM Communications

press@us.ibm.com

Projected Sales

HashiCorp FedRAMP Market Size and Revenue Projection

Author: Ella Anh Thu Hoang Nguyen

Reviewer: Tyler Yarborough, Tim Olson, Tim Silk, George Simmons, Jen Grijalva

Summary

This analysis forecasts HashiCorp's potential revenue growth in the federal sector following FedRAMP compliance certification for Terraform and Vault. The study combines market-wide federal spending analysis with HashiCorp's historical sales performance data to project future revenue opportunities.

Key Projections

- HashiCorp's federal sector Annual Contract Value (ACV) could reach $72.9 million by 2028
- This represents 213% growth from the current baseline of $23.3 million
- Vault is projected to generate $43.6 million, while Terraform could reach $29.3 million by 2028
- Growth will be driven by expanded market access, federal policy mandates, and streamlined procurement processes

Federal Market Opportunity

Total Addressable Market (TAM)

The federal government allocated $111 billion to IT spending in 2023, with $16 billion dedicated to cloud services. Within cloud spending, $9.3 billion went specifically to FedRAMP-certified solutions, representing 50.5% of total federal cloud expenditure.

Based on federal spending growth projections from Deltek1 Deltek Federal Cloud Computing Market, 2024-2028.pptx and Canalys2 canalys_20250422_260425_Support for IBM.pdf, the total FedRAMP market is expected to reach $15.3 billion by 2028. This growth is supported by several policy drivers:

- DoD Software Factory Initiative: The Department of Defense now mandates Infrastructure as Code (IaC) for all capabilities delivered through the Joint Warfighting Cloud Capability (JWCC) contract, directly benefiting Terraform adoption.3 https://hybridcloud.disa.mil/
- Multi-Cloud Innovation and Advancement Act: This proposed legislation (S. 2871) promotes SaaS solutions that enable seamless multi-cloud operations, aligning with HashiCorp's core product capabilities.4 https://www.congress.gov/bill/118th-congress/senate-bill/2871/text
- Technology Modernization Fund: The fund's reauthorization through fiscal year 2030 provides federal agencies with dedicated funding to adopt modern infrastructure solutions.5 https://tmf.cio.gov/

Figure 1: Projected FedRAMP Spend Growth (2025-2028)6 MSP Analysis

Based on Deltek's projected Federal cloud budget for 2024-2028 and the assumption that FedRAMP solutions will consistently capture 50.5% of cloud spending, the total addressable market is estimated at $15.3 billion by 2028.

Chart

HashiCorp's Serviceable Addressable Market (SAM)

HashiCorp's addressable portion of the federal market focuses on infrastructure automation and secrets management spending. According to GLG's Portfolio Study7 HashiCorp Portfolio Study_Final Report May 20.pptx, companies typically invest:

- 0.2% of total revenue on infrastructure automation (growing 20% annually)
- 0.21% of total revenue on secrets management (growing 22% annually)

Applying these percentages to the federal IT budget projects HashiCorp's total serviceable market at $872.3 million by 2028, split between:

- Infrastructure Automation (Terraform): $414.7 million
- Secrets Management (Vault): $457.6 million

Figure 2: HashiCorp FedRAMP SAM for Terraform and Vault

Chart

Revenue Projections

Historical Performance Baseline

HashiCorp's federal sector performance since 2018 provides the foundation for growth projections:

- Average annual pipeline growth: 66%
- Average win rate: 26%
- Average renewal rate: 83%

FedRAMP Impact Assumptions

FedRAMP certification is expected to significantly expand HashiCorp's federal market access:

- Market Expansion: FedRAMP compliance will increase eligibility for Request for Information (RFI) and Request for Proposal (RFP) opportunities by 50% in civilian agencies and 75% in Department of Defense contracts.
- Pipeline Acceleration: Achieving "In Process" status (expected H2 2026) could generate $25 million in new pipeline opportunities within one quarter.
- DoD/Intelligence Community Access: Full Moderate and High/IL4+ certifications could unlock an additional $50-75 M in specialized government pipeline.
- Trevor Powell2025-08-15T18:59:00Are there any more thoughts or data about how   FedRAMP for our Saas based TF/vault products may cannibalize our enterprise product revenue?Revenue Conversion: Current enterprise license revenue from federal customers will transition to SaaS-based contracts, providing a stable foundation for growth.

Figure 3: Projected Vault and Terraform ACV

By 2028, the analysis projects HashiCorp will capture $72.9 million in federal ACV, representing 8.4% of SAM. This market share aligns with Terraform and Vault's current performance in the broader market, assuming the federal sector follows similar adoption patterns.8 HashiCorp Market Sizing - June 2025 Notably, 55% of this revenue is expected to come from new federal contracts made possible specifically by FedRAMP compliance, demonstrating the certification's significant business impact.

Chart

Critical Success Factors

- Pipeline Growth Realization: HashiCorp must successfully convert the projected 50% increase in civilian agency opportunities and 75% increase in DoD opportunities into actual contract wins.
- Market Share Maintenance: The company needs to maintain its current market positions (18.5% for infrastructure automation, 14.1% for secrets management) despite increased competition from newly FedRAMP-certified rivals.
- Win Rate Consistency: HashiCorp must sustain its 26% historical win rate even as the addressable market expands and competition intensifies.

Risk Factors

- Competitive Response: New entrants achieving FedRAMP certification could erode HashiCorp's market share and pricing power.
- Federal Budget Shifts: Changes in cloud spending priorities or overall federal IT budget allocations could impact demand.
- Implementation Delays: Slower-than-expected progress through the FedRAMP certification process could delay revenue realization and allow competitors to gain market position.

Roadmap & Teams

DRAFT DRAFT - NOT READY FOR REVIEW

Detailed Roadmap to FedRAMP Compliance

PLC Ticket: https://hashicorp.atlassian.net/browse/PLCC-13738

RDPR Ticket: https://hashicorp.atlassian.net/browse/RDPR-1064

[DRAFT] MCSP FedRAMP Onboarding Project Plan

Technical Notes for Roadmap

- Adopt MCSP services for audit logging, incident management, business analytics, etc. - replacing existing 3rd party tools such as Datadog, Splunk, and Snowflake. This is a technical decision that needs to be reviewed & a plan set for how to leverage existing tools and/or adopt new tools for the FedRAMP deployment.
- Organizational Alignment & Staffing: Staff U.S. based support/sre/etc that have access to the environment & customer data to support DoD Impact Level 4 (L4) and Impact Level 5 (IL5) (dependent on contracts). Certain roles are required (such as System Owner, Information System Security Officer - ISSO, etc.).
- Fund a US-based technical writer team to author & maintain the systems security plan for each FedRAMP compliant product
- Validate all team members with access to the environment meet the U.S. person & background screening requirements.
- Annual FedRAMP security training for team members

Team(s)

- To successfully meet the requirements for FedRAMP on the MCSP Platform, a team will need to be assembled that covers areas of expertise required; (1) HashiCorp Product PM, (2) HashiCorp Product Engineering, (3) HashiCorp Product Design, (4) HashiCorp Platform PM, (5) HashiCorp Platform Engineering, (6) HashiCorp Platform SRE, (7) HashiCorp Security - GRC, (8) HashiCorp Business Planning, (9) HashiCorp TPM, (10) IBM MCSP PM, and (11) IBM MCSP Engineering.

Platform Comparison Chart

Consider adding a chart that shows the difference between the HCP@Global Platform and MCSP@Federal Platform. This could be used to show the systematic difference between our commercial offerings and federal (FedRAMP) offerings.

Research

Purpose

The purpose of this document is to capture Discovery, Execution, and Launch/Scale of FedRAMP for the HashiCorp product portfolio. This document takes a holistic approach by examining the available deployment options, which include, (1) HCP Platform, (2) MultiCloud SaaS Platform - MCSP, and (3) Managed Service Provider - MSP.

Problem Statement & Goal

The goal is that HashiCorp SaaS product portfolio is FedRAMP Moderate compliant by Tyler Yarborough2025-07-15T23:59:28Potentially 2HCY26 for Vault+Terraform - other products would need analysis on market opportunity.Tyler Yarborough2025-07-10T17:12:16Need confirmation from LT on this target.$DATE, followed by FedRAMP High compliant by $DATE. This initiative is projected to unlock $35.4M in ARR* for HCP Terraform & HCP Vault, specifically from identified SFDC opportunities. Furthermore, it will open up the $492M TAM for Infrastructure Automation & Secrets Management, potentially generating approximately $72.9M in value through CY2028.

Additionally, onboarding future HashiCorp SaaS offerings will extend market opportunities further, such as FedRAMP Boundary, Consul, Nomad, etc. This research document focuses on Vault & Terraform as these services have these services indicate the highest value potential.

* Financial assessment date: July 2025.

Discovery

FedRAMP Executive Overview

- FedRAMP categorizes security levels into Low, Moderate, and High, per sensitivity and impact of the data handled
- FedRAMP controls are derived from NIST SP 800-53
- There are 125 controls for Low, 325 controls for Moderate, and 421+ controls for High
- There are 18 unique security control families

FedRAMP Financial Opportunity

Financial Snapshot Date: Jul 15, 2025

To set context, the HCP Product Portfolio had ~$453M in ARR in 2024.

The Total Addressable Market (TAM) for FedRAMP at HashiCorp is split into two categories; (1) Federal Infrastructure Automation and (2) Secrets Management market; with a TAM of $492M in 2025 and projected to reach $595M in 2026.

HashiCorp has two inputs for the potential opportunity value of the TAM, (1) SFDC product gaps and (2) forecasted revenue through CY2028. For (1) the HashiCorp SFDC product gap analysis provides a total opportunity of $35.4M, with 73 accounts of HCP Terraform equal to $18.6M and 64 accounts of HCP Vault equal to $16.8M. For (2), the HashiCorp forecasted revenue opportunity has identified a projected $72.9M revenue opportunity through CY2028.

Product FedRAMP Priority

Based on financial data, HCP Terraform should be the first FedRAMP compliant service offering. However, based on resources available, Vault will be the first product to be targeted for FedRAMP, followed by HCP Terraform. The existing SFDC pipeline data does not provide insight into the ordering of products that should target FedRAMP after Vault & Terraform.

HCP Platform

The HashiCorp Cloud Platform (HCP) is a fully managed platform that enables users to provision and consume managed versions of HashiCorp's suite of products, like Terraform and Vault. It allows for deployment across major cloud providers like AWS and Azure, providing a secure, highly-available, and automated experience.

The 2022/2023 HCP FedRAMP Gap assessment identified 235 gaps in documentation, process, and technology. Most of these gaps still exist in the current platform.

- Documentation: 62 gaps (26.4%)
- Process: 6 gaps (2.6%)
- Technology: 39 gaps (16.6%)
- Documentation & Process: 73 gaps (31.1%)
- Documentation & Technology: 20 gaps (8.5%)
- Documentation, Process, Technology: 35 gaps (14.9%)

To achieve FedRAMP on the HCP Platform, the organization would need to (1) create a new regional deployment in the AWS GovCloud, (2) address the 235 identified gaps, (3) rearchitect the platform to meet FedRAMP compliance requirements, and (4) update deployment pipelines to enforce FedRAMP boundaries. Engineering estimates that it would take three to five years to create a FedRAMP compliant platform, costing $500M-$900M USD to build.

List of existing services that are used by product teams on the HCP Platform.

First Party Services (used on HCP Platform)

See HCP Platform Capabilties and Impact. Many of the core services would be replaced and/or managed by MCSP, such as IAM, Auditing & Logging, Billing, Infrastructure, and Compliance.

Sara Snowden2025-07-29T14:59:16Should Cadence be listed here?Tyler Yarborough2025-07-16T17:39:42Are there other 3rd party services that should be included in this list?Third Party Services (used HCP Platform)

The HCP Platform utilizes third-party services for audit logging and operational visibility, the logs are streamed from HCP to an external security information and event management system (SIEM) provider. HCP supports AWS CloudWatch, Splunk, and Datadog. Snowflake is a cloud-based data warehouse and is also used, in combination with Sigma, to build business and data analytics of HCP services. Additionally, the HCP Platform also leverages additional services, including, Stripe, Auth0, SumoLogic, Fivetran, and Incidents.io. The platform also supports Okta and Entra as part of the IDP offering.

The following services offer FedRAMP High Authorization; (1) AWS CloudWatch, (2) Splunk, and (3) Snowflake, (4) Okta, and (5) Entra. The following services offer FedRAMP Moderate Authorization; (1) Datadog, (2) SumoLogic, and (3) Wiz. The following services are not FedRAMP compliant; (1) Stripe, (2) Auth0, (3) Fivetran, and (4) Incidents.io.

Note: The HCP Platform Engineering Teams own the services with support & guidance from Platform Product Management.

| HCP 3P | HCP 3P FedRAMP | MCSP Equivalent |
|---|---|---|
| Splunk | ✅Moderate ✅High |  |
| Snowflake | ✅Moderate ✅High |  |
| Sigma Computing | ⚠️Moderate ⚠️High *Can be used if connected to FedRAMP authorized data warehouse & access permissions are managed. |  |
| AWS CloudWatch | ✅Moderate ✅High |  |
| Okta | ✅Moderate ✅High |  |
| Entra | ✅Moderate ✅High |  |
| Datadog | ✅Moderate ❌High |  |
| SumoLogic | ✅Moderate ❌High |  |
| Wiz | ✅Moderate ❌High |  |
| Stripe | ❌Moderate ❌High |  |
| Auth0 | ❌Moderate ❌High |  |
| Fivetran | ❌Moderate ❌High |  |
| Incidents.io | ❌Moderate ❌High |  |
| Traefik |  |  |
| Cadence |  |  |

MCSP Platform

The MultiCloud SaaS Platform (MCSP) is an IBM Platform designed to help clients adopt and manage SaaS solutions across various cloud environments. It aims to accelerate SaaS development and onboarding, streamline regional expansion, and simplify compliance certifications by providing a standardized, opinionated platform with an open architecture. MCSP centralizes services like logging, monitoring, metering, and security, allowing product teams to focus on core product capabilities rather than non-functional requirements.

MCSP Cloud spokes states that it support a FedRAMP environment with a shared compliance controls; (1) 35 of 314 controls - 12% controls that are product led, (2) 183 of 314 controls - 58% controls that are product owned with MCSP assistance, and (3) 96 of 314 controls - 21% controls satisfied by MCSP Platform. As of July 2025, MCSP Platform has Moderate FedRAMP compliance and is targeting to be High FedRAMP compliant in Q4CY25.

Compared to HCP, the MCSP Platform changes the owner & operating model. At the highest level, MCSP Platform is FedRAMP compliant and products own & operate the product plane, such as Platform and/or SRE services that are not covered by MCSP. This implementation is product specific and a decision point by product management to determine which services/offerings that the product will adopt or not adopt on the MCSP Platform.

MCSP provides a 9-step product onboarding process. HashiCorp products will vary in time to onboard based on current product architecture, implementation of product-led FedRAMP controls, and readiness of HashiCorp Platform Engineering owned 3rd party services that HCP products utilize that MCSP does not have an equivalent offering.

MSP

Managed Service Provider (MSP) is a third-party organization that delivers ongoing IT services and support to clients, typically under a service-level agreement (SLA). MSPs proactively manage and maintain infrastructure, applications, and security - either on-premise, in the cloud, or in a hybrid environment - allowing customers to focus on their core business while ensuring operational efficiency, scalability, and compliance.

MSPs offers HashiCorp the opportunity to expand into new regions and/or government offerings. MSPs and MCSP are similar as they are offerings for products onboard to their service to achieve FedRAMP compliance. MSP will require additional product-led effort to meet FedRAMP controls. HashiCorp products can explore MSPs as an offering, however, the products should consider leveraging the MCSP Platform, followed by HCP Platform offerings, and as a last alternative, MSPs. For FedRAMP specifically, it is advised to leverage MCSP, however, MSPs can be considered for future deployment strategies in other regions & compliance frameworks that are unsupported by MCSP. When entering new markets, an assessment should be done to confirm the preferred approach based on technical feasibility, time to market, and long-term supportability.

Time to Market

MSCP@Federal

Time: 12-18 months

Anecdotally, MCSP takes 12-18 months to onboard & achieve FedRAMP compliance. This is based on three IBM services that are actively seeking Moderate FedRAMP compliance, (1) Instana, (2) Concert, (3) Turbonomic.

HCP@PubSec

Time: 3-5 Years

HCP@PubSec, a non-existent platform, would be HCP Platform public sector platform running on AWS GovCloud. Based on current architecture and tribal knowledge, it is estimated that it would take 3-5 years for HCP to update architecture, deploy to AWS GovCloud, and achieve FedRAMP Authorization.

MSP@Federal

Time: Not applicable, LT determined on 7/29 this is not a path to pursue

Based on anecdotal evidence, the time of deploying HashiCorp services to a MSPs is dependent on whether or not a service requires architectural changes or new external connections, if that is low or non-existent MSPs state ~3-6 months to deploy. However, if transformative changes such as new database type, authentication mechanisms, or integration with external, non-FedRAMP authorized services, it will take 12-24 months.

Deployment Models

Serving software to Commercial & U.S. Federal Government customers creates a new paradigm for HashiCorp. Teams should create two distinct pipelines, which is considered an industry best practice. This separation is primarily centered around enhanced security, accelerated development cycles, streamlined compliance, and mitigated risks. The introduction of a secondary pipeline also allows teams to select the preferred platform of deployment, (1) MCSP@Federal, (2) MCSP@Commercial, (3) MSP@Federal, (4) MSP@Commercial or (4) HCP@Commercial.

COGs Analysis

MCSP@Federal

Hosted on AWS GovCloud, premium cost is dependent on AWS service and ranges between ~22% - ~52% premium. MCSP might have better pricing based on their committed spend on AWS. Based on pricing understanding, there is an uplift, it averages 40% across products, with some products as long as 20% and some as high at 65%. This requires a review by the Business/Finance Analyst team.

MCSP@Commercial

Not data available on COGs. Need to dive deeper into the cost as part of onboarding assessment.

HCP@Commercial

The current AWS spend for HCP@Commercial & HCP@EU is ~$15M-$20M per year. The COGs for individual products are not well understood/known as of July 2025, with the exception of Vault Radar, a product with a COGs reporting dashboard on Sigma.

Support Structure at IBM

We're also transitioning federal client support to IBM Secure Services, with the HashiCorp support team providing backend support. - Ref: https://w3.ibm.com/w3publisher/hashicorp/meet-the-bu-leadership-team/business-unit-blog/35306b30-93d8-11f0-a234-071a47a01394

Contacts

- [IBM] Dave Sudlik: PM MCSP - covers FedRAMP (amongst other things).
- [IBM] Michael James: FedRAMP efforts for MCSP and other SaaS products
- [IBM] Shikha Srivastava: Distinguished Engineer MCSP
- [Hashi]: Jim Lambert: Principal Engineer
- [Hashi] Mike Gaffney: Principal Engineer
- [Hashi] Ella Anh Thu Hoang Nguyen: Portfolio Strategy
- [Hashi] Asvin Ramesh: Partner Alliance Strategy
- [Hashi] Luka Trbojevic: GRC (2022-2023 HCP FedRAMP Assessment)

Next Steps in Discovery

- Conduct reassessment of HCP Platform FedRAMP Gap - Owner: GRC- Luka Trbojevic
- Conduct financial analysis around FedRAMP pipeline, focus on which products have the highest opportunity - Owner: PM - Tyler Yarborough
- Tyler Yarborough meet w/ Asvin Ramesh to understand Partner strategy for FedRAMP / MSP?
- Tyler Yarborough work w/ Portfolio Strategy team to understand TAM
- Tyler Yarborough dive deep on Portfolio Strategy FedRAMP assessment
- Tyler Yarborough update doc to be holistic in providing the different approaches available (HCP Platform, MCSP, MSP, etc.)
- Tyler Yarborough work w/ Value Eng team to understand current pipeline opportunities

Additional Notes

Open Questions

- What are the product COGs if we no longer have a shared cloud service for the FedRAMP deployment? Note: We should adjust for FedRAMP offering.
- Would we retain the HCP Platform with the HCP@Global & HCP@EU offering and have MCSP be the FedRAMP offering?
- What is the Platform PM role in FedRAMP since MCSP is a product-led effort?

Supporting Artifacts & Links

- MCSP Discovery Meta-RFC
- MCSP Discovery (Radar) - Notebook LM
- HCP FedRAMP Assessment - Notebook LM
- Zoom CVE SLA Executive Summary
- Customer Gap Dashboard
- The Federal CoE (IBM)
- Regulatory Compliance (IBM)
- MSCP Onboarding (IBM)
- HC CCF
- Product Gap Report
- Portfolio Strategy TAM Analysis
- MSP Research
- FedRAMP in a Box
- Hashistack FedRAMP / STIG Request Tracker
- MCSP W3 Program Page
- MCSP GitHub Page
- Aha Roadmap (Links coming) (SAASPLAT, SAASPLAT-E, SAASPLAT) - Cut ticket for access - request viewer access!
- MCSP Supported Regions
- HCP Platform Capabilties and Impact
- HCP ARR
- Snowflake - FedRAMP Support
- Splunk - FedRAMP Support
- Datadog - Moderate FedRAMP Support
- Datadog - Commitment to FedRAMP High including IL5
- AWS CloudWatch offers FedRAMP support (GovCloud) - Moderate + High
- Matt Keeler Research
- IBM FedRAMP best practices
- FedRAMP Marketplace

Meeting Notes

2025-07-14: PE Notes

Attendees: Jim Lambert, Mike Gaffney, Tyler Yarborough

Jim/Mike PE Notes

Notes

- MCSP is likely place to plan for regional points of presence & compliance work
- MCSP is supposed to have FedRAMP this year - Platform compliant and product planes are under (Control/Dataplane part of MCSP - stamp out new dataplanes like Identity, audit, metering, products don't run there. The products deploy product planes)
- Product completely owns creating product plane on
- HCP to have PCI this year (in flight)
- FedRAMP on HCP in the long-term? Not likely.
- ARGO CD & Terraform modules with help product plane
- Some control panes of glass that can allow managing via MCSP control plane
  - There are products that are looking to do this (more in development)
  - Product plane under own account - charged for it
- FedRAMP - MCSP is the suggestion

Questions from comments

- Sounds like rearchitecting required per product to meet requirements within the product plane
- Potential dependency gaps (controlled at product plane - they decide level of dependency)
  - Core Services: Billing, Metering, Auditing - Required

FedRAMP

- What is the potential timeline to have the HCP Platform become FedRAMP compliant (i.e. what would we need to rearchitect on the existing platform and could we use AWS GovCloud as a new regional deployment - essentially take our learnings from our HCP@EU deployment).
  - Huge investment - requires rearchitecturing - 3-5 Years, ~$500M-$900M investment
  - 150-200m on people each year
- What is the potential timeline to have the MCSP Platform become FedRAMP compliant? Based on your meta-rfc there is a lift required by IBM service owners on that platform. What about other service gaps for our products to operate?
  - FedRAMP should be achieved this year
- What services do we receive for free under MCSP?
  - There is a chargeback model
    - Cost to run on MCSP vs HCP????
- What does it look like to request new services and/or support for our third-party vendors?
  - You decide on the product plane (responsible for compliance, support, etc.) - i.e. if you run Datadog, you would need to operate at your product level (including any infra costs, sre cost, etc.)
  - Datadog, Incident.io, Snowflake
- Which FedRAMP level are we seeking (Low, Moderate, High)?
  - Not clear - Shikka
- Deployment model with MSCP (FedRAMP) & HCP (Commercial)?
  - Separate deployment offering - different pipeline for deployment
- What do you envision for our long-term strategy for growth & supportability?
- Tyler Yarborough2025-11-14T16:37:45More to come on this, a formal FedRAMP gap assessment is planned for November, which will identify the gaps that require remediation.Lloyd Jones2025-11-11T14:33:21I'd be interested in how enforcing FIPs mode would affect Vault functionality and supported plugins. There are also other considerations for FIPs mode for services that aren't go-based or are third party dependencies.FIPs
  - Any service in Go, wait until 1.24 is certified (Feb 24 released)
  - Need to update toolchain: https://go.dev/doc/security/fips140

Regional Expansion (i.e. beyond EU)

- HCP was not automated - another bespoke effort with tiger time - much of the talent has left - 6-12 month effort for a region
  - What is the plan - how do we request new regional deployment on MCSP?
  - MCSP architecture provides a model that allows deployment to new regions - requires submitting a request for non-supported regions.
- If MCSP - are we OK w/ less regionalized deployment options compared to HCP?
  - Yes, would need to understand workflow to request new regions on MCSP (+time to have it expanded)
- Would MSPs be the alternative option? I.e. are MSP replacing commercial (and potential government) deployments compared to HCP?
  - Not suggested by PEs, contractual issues & competition within the market.
- Cost to run on MCSP vs MSP vs HCP?
  - 
- Time to do regional expansion beyond EU via HCP - Heard 6-12 months
  - Still correct

Extra Notes

- Infragraph being built on HCP, need to move to MCSP
- 3-5 years minimum on HCP support
- FedRAMP on MCSP
- New regional deployments on MCSP

2025-07-15: MCSP

Attendees from Hashi: Asvin Ramesh, Prakash Linga, Rose Jen, Tyler Yarborough

- IBM Introductions
  - Anthony Campbell - Owns all FedRAMP
  - David Jenkins - Federal Compliance - DE
  - Michael James: Security Architect - on Anthony team (2+ FedRAMP)
  - Tina Bell: Anthony Team - COE Work
- US Federal Government is CLOUD 1st for SaaS Products
- Every product is moving to MCSP - it is the SaaS Platform at IBM
- FedRAMP moderate now - High later this year - IL4, discussions on IL5 later this year.
- August 8th - FedRAMP Strategy for IBM+HashiCorp (Anthony to deliver this)
- 65-70% controls inherented from AWS GovCloud, ROSA Control Plane (RedHat), IBM Platform Services
- SRE support is based (Jason team) - US Based
- Vault/Terraform to live in Platform Services (once established)
- Instant, Concert, Turbonomic are actively building for FedRAMP compliance (6-8 months for a planning cycle) (6 months to get on MCSP+FedRAMP)

Questions

- What is NOT inherited? List?
  - The team does a FedRAMP Gap analysis of service
- What are the associated costs for running on the MCSP GovCloud?
  - Costs are reprioritizing engineering resources to do this.
  - Approach today is get on MCSP, costs are handled later

Actions

- Tina is creating a roadmap for FedRAMP, target is Dec 15 (this date is not to be shared outside of this group)

2025-07-16: MSPs

Attendees: Rose Jen, Ella Anh Thu Hoang Nguyen, Tyler Yarborough

2025-07-17: Vault

Attendees: Prakash Linga, Tyler Yarborough

- MSP: No resources are committed to look at this
- MCSP: Product is conducting assessment, they are considering changes to the deployment model on MCSP (such as leveraging OpenShift). Expect to have a rough body of work identified in ~2 weeks, followed by t-shirt sizing the work. Engineering is not staffed for this (yet); expecting resources (including new hires) allocation in Q4 (potential, might be delayed)
- MCSP Platform Limitations: Concerns around availability & scaling. He requested a more detailed analysis on which services would be impacted on day-1 versus services would be a later issue.
- FedRAMP: Prakash wanted clearer indicators on which customers we are seeking and a review of the IBM Roadmap for MCSP (something that IBM - Tina, should be providing).

2025-07-17: Boundary

- MSP
- MCSP

Feasibility

Time

Supportability

What is the unified experience like today across products?

What downstream services does Boundary leverage for it's HCP Product?

Snowflake is needed for Product Analytics

Splunk not used internally for Boundary - offer for audit logging for customers (IBM offering for audit logs would work) - this is customer consumed, not Boundary Eng

Learn more about Traefik - how is it used?

Datadog used for operational data

2025-07-17: Radar

2025-07-24: Terraform

Jul 24, 2025

Attendees: Mark Meredith

Notes

2025-07-30: MCSP FinOps

Meeting with Nicholas Navarro (IBM)

- AWS Comm Cost vs FedRAMP
- MCSP is less mature than we have for COGs reporting (shared Vault Radar COGs reporting)
- MCSP has some homegrown tooling - reporting with grafana visualizations - goes to exec scorecard - rudimentary - looks at the AWS accounts for a product
- Tagging is NOT mature in MCSP - no enforcement of tagging, it's not clean!
- Tooling - KubeCost, Cloudability - can get more granular with KubeCost
- Lots of manual massaging of data - raw costs is in Excel
- Chargeback - there is NO chargeback model, products that use shared services - not charged, it goes back to IBM software, no immediate plan (this year or next year) on MCSP-side
- FedRAMP - look at AWS account, products in AWS account is what
- LOTS of Gaps!
- Our pricing is more mature than MCSP

2025-08-14: WTFO

Attendees: Melissa Palmer, Tim Silk, Jen Grijalva, Jarrod Gazarek

Notes

- NIAP - sits next to FedRAMP (Melissa) - focuses on Enterprise
- We have certifications -
- What is the FedRAMP team?
- Sales - needs a way to formalize our requirements
  - NIAP top of list?
  - FedRAMP
  - Other folks needed to gather for requirements from Sales Reps/SEs
- NIAP - where should we go with this? What is the demand? Which products?
  - We committed to NIAP (Susan/Dave approved)
  - More than FedRAMP, more than NIAP
  - What do you need and what resources
- Set strategy around how we set priority for achieving these compliance
  - Prioritize it, resource it, etc.
- Melissa - PublSec
- Jen: DoD
- Jarrod: SLED
- Tim: SE Team for public sector
- NIAP - Vault as a cert protection profile (we would be 1st)
- Sales (Melissa) would like to be involved in
- What is the addressable market in Moderate & High

- 85% of revenue is enterprise revenue today, not SaaS
- Jarrod's team looking more at HCP

Open questions

- Who at IBM runs these compliance

Actions

- Build strategy around Federal space (on-prem bucket of priority) (Tyler)
- Tyler - Talk to David & Anthony about other compliance requirements beyond FedRAMP
- Create Slack channel in IBM
- Team shares list of customers & opportunity potential (Tim Silk)

2025-08-15: Terraform

Terraform

Meeting Purpose: Kick-off FedRAMP on MCSP Initiative

Agenda

- Confirm roles
- MCSP Gaps (known - IAM, Audit Logging, Reliability, No Flex Billing, OpenShift Scaling, No multi-region DR, others?) - mention Vault's progress in onboarding to MCSP
- Document trade-offs between TFE & HCPt on the MCSP Platform
- Document trade-offs that would need to be made to start work on FedRAMP
- Confirm standing meetings & interlock meetings with IBM
- Confirm next steps & action items
  - Combine MCSP onboarding & FedRAMP RDPR tickets?
  - PLC?

Open Questions

- How does the Terraform team prioritize initiatives? Where does FedRAMP & MCSP fit among this?
  - Based on plan for the year, reliability, security, scalability.
  - FedRAMP - this would be a next year deliverable
- Daniel - Need Platform Plan - Overall goals on MCSP - thinking 2H of next year
  - Know that they want to investigate
  - When are the plans going to be ready w/ MCSP
  - Platform team plan for portfolio - Should this be penned - Platform future and how it's enabled
  - Daniel - Fastest path to FedRAMP is TFE - nature of FedRAMP for personal as well, leds towards - no market opportunity/discovery - What is customer experience for
  - SaaS & Enterprise is almost the same - experience can remain the same - (Bruce)
  - For MCSP - Operational Model - dedicated postgres, SREs, etc.
    - Need to share what the operational model is on MCSP
  - Action: Was there a customer that did FedRAMP with Enterprise offering? Action for Daniel/Mark
- Is there an LT directive to onboard MCSP, Vault has this directive? If not, what are the trade-offs so we can formalize this?
  - No
- Looking at sequential ordering based on Vault's MCSP onboarding experience? Research beforehand?
  - That is Terraform's view, thinking 2H of next year

Between now & end of year

- Review MCSP provided architecture diagrams, data flow diagrams, and templates (including FedRAMP - can grant access - it's on Box)
- Review CAG provided gap assessment of MCSP versus existing HCP Platform
- Conduct Discovery on onboarding to MCSP - determine user experience on the Platform (for Terraform, determine if TFE is an option or if HCPt is needed)
- Develop plan & roadmap to onboard to MCSP
- Conduct Discovery calls with Federal CoE Team (2-4 sessions with HashiCorp Teams on FedRAMP Compliance Gaps)
- Get TFE/HCPt on MCSP (deploy to Australia or other target market), then FedRAMP, then target market compliance (IRAP for Australia).

Notes

- Action: Platform team plan for portfolio - Should this be penned - Platform future and how it's enabled
- Action: TF PMs to ID if any customer(s) have FedRAMP'ed TFE

2025-08-15: Vault

Vault

Meeting Purpose: Kick-off FedRAMP on MCSP Initiative

Agenda

- Confirm roles
- Document known gaps on MCSP Platform (known - IAM, Audit Logging, Reliability, No Flex Billing, OpenShift Scaling, No multi-region DR, others?)
  - Product managed RBAC?
- Document trade-offs that would need to be made to start work on FedRAMP
- Confirm standing meetings (Hashi folks) & interlock meetings with IBM
- Confirm next steps & action items

Open Questions

- LT directive is Vault sellable on MCSP by Jan 1, 2026 and FedRAMP after - Reason behind Vault sellable on MCSP? Is this not a validation of use to enable FedRAMP? Or is there something deeper?
- If MCSP by EoY - can we direct our target region to a new market, such as Europe? When do we need to make a decision on which region to deploy? I'm looking at new markets as well, building out models to help make informed decisions about the target market. Initial indicator for SaaS Vault is Europe with the eventual plan to achieve GDPR via the MCSP Platform.
- Get HVD on MCSP, then FedRAMP, then GDPR (or maybe in parallel)?
  - FedRAMP Pod
  - GDPR Pod
- When do we want to engage the Federal CoE team to set up a sync meeting?
- Interlock meetings?
  - FedRAMP Project HashiCorp (Platform, Product, GRC)
  - FedRAMP Project HashiCorp+IBM (Platform, Product, GRC, IBM Federal CoE)
  - Other?
- OPEX cost - US vs EU deployment? Contact IBM FinOps team to start conversation (started, pending feedback).
  - 
- Should we combine MCSP onboarding & FedRAMP RDPR Ticket?
  - Keep separate from Vault ticket
- Should we combine MCSP onboarding & FedRAMP PLCC Ticket?
  - Keep separate from Vault ticket

Notes

- Focus on MCSP end of Year for Vault
- HVD on MCSP - uncertain how it will function, it might be different, might be harder to sell.
- 

Action

- Send over short-list of actions/milestones to onboard for FedRAMP (done)
- Schedule time w/ Sara to discuss new markets (done)
- Review uplift before we engage Federal CoE (pending)
- Controls for design
- Backchannel around FedRAMP requirements for Design

2025-08-19: Brandon

2025-08-19

- Overall plan for FedRAMP via MCSP
  - Strategy: HashiCorp FedRamp Product Strategy
  - PRFAQ: [HCP-006] HashiCorp FedRAMP - Moderate
- People/Teams

* indicates that Brandon/Tyler should discuss in more detail

| Team | Engaged | Next Steps |
|---|---|---|
| Vault Team | ✅ | HVD Team onboarding to MCSP, planned MVP by EoY, followed by FedRAMP. Working with the team on FedRAMP (and a focus on MCSP regional selection - such as EU or Australia). Contacts: Kartik Lunkad, Sara Snowden, Hafsa Imran, Luis Guzman Verbena, Rob Richard, TJ Koines |
| Terraform Team | ✅* | Terraform team is looking at sequential ordering and would not onboard MCSP until after HVD has onboarded and Platform has provided a plan for Cloud Portfolio. Requested to be included in their CY2026 Planning Cycle, current focus is on 2H 2026 to onboard MCSP & seek FedRAMP. The team has mentioned onboarding TFE, rather than HCPt as a faster time to market + a similar customer experience can be built around HCPt v TFE on MCSP. Contacts: Daniel Savage, Chris Steinmeyer, Bruce Ashtiani, Mark Meredith |
| GRC/Security | ✅* | Engaged w/ Luka Trbojevic - We need to meet with the Federal CoE (IBM) to align on DACI for GRC & Security. They are looking to understand the current Compliance team structure that supports Hashi compliance efforts. Federal CoE will take ongoing compliance infra, documentation, updates, etc - looking to leverage existing Security & Compliance Focals to support that. Contacts: Luka Trbojevic |
| CAG | ✅ | Met and discussed MCSP architecture and identified existing gaps between MCSP & HCP. These members have provided written documentation and verbal conversations about the target platform. Contacts: Matthew Keeler, Tobias Meyer, Jim Lambert, Mike Gaffney |
| WTFO | ✅ | Consulted with the team to validate forecasts of FedRAMP growth numbers and to understand market demand. Contacts: Melissa Palmer, Tim Silk, Tim Olson, Jen Grijalva, Jarrod Gazarek |
| Partners | ✅ | Partners have moved to inform as MSP is not being sought. Contact: Asvin Ramesh |
| Portfolio Strat. | ✅ | Worked with Ella on forecasting estimates for the cloud market. Contact: Ella Anh Thu Hoang Nguyen |
| Biz Plan | ✅* | Started conversation to begin PnP Planning. We have a rudimentary understanding of how PnP works for FedRAMP offerings. Requires partnership with Business/Financial Analyst (Andrew Ferris - IBM). IBM parts need to be priced & ready for quote at Submission/Announcement Date. Contacts: Shawn Collins, Andrew LaPrade, Andrew Ferris (IBM) |
| Legal | ✅ | Initiated conversation to ID correct owner. Contacts: Priyam Bhargava |
| Federal CoE (IBM) | ✅* | The team is ready for us to engage with the first product that will be on MCSP & FedRAMP'ed. There is no interlock meetings (yet)There are core slack channels for FedRAMP that Federal CoE will create and manage for us. The team has shared architect diagrams & dataflow diagrams (via a Box link).The Federal CoE team wants to have a discovery call with the product teams and then follow that with a gap analysis by 38North (3PP) - 2-4 meeting sessions to review the controls and provide a list of gaps.The Federal CoE team would like to meet with the Security/Compliance Team (listed as an action in the GRC/Security Team table row). Shared BU costs for operating in FedRAMP, we need to dive into this more with the team. Contacts: Anthony Campbell, Tina Belani, David Jenkins, Thomas Simmons |
| MCSP FinOps (IBM) | ✅ | Met and discussed FedRAMP costs Contacts: Nicholas Navarro |
| Education | ⛔ | Documentation will be handled by MCSP teams for FedRAMP, do we need to partner with Hashi Education to help enable them? Contact: Judith Malnick |
| Marketing | ⛔ | Not engaged, beyond sharing the PRFAQ Contact: Meghan Liese |
| Support | ⛔ | Not engaged, FedRAMP will be supported by the cleared support team and engineers that can operate the platform. Contact: Stephane Morali |
| Value Eng | ⛔ | Not engaged, beyond sharing the PRFAQ Contact: Adam Cavaliere |

- Milestones & Timelines

- High-Level (see table below - updated to decouple Vault & Terraform)
- Detailed (see [DRAFT] MCSP FedRAMP Onboarding Project Plan)

Milestones, Timelines, and Phases are built on the assumption that product teams have onboarded to one or more commercial regions on the MCSP Platform. Teams should have an understanding of the customer experience on the MCSP Platform.

| Phase | Title | Duration | Key Activities & Deliverables |
|---|---|---|---|
| Phase-1 | Vault on MSCP - FedRAMP Moderate | 12-18 months Target: 2H 2026 | MSCP Platform Integration: Integrate Terraform & Vault with MCSP, inheriting security controls + updating product security controls to be FedRAMP Moderate compliant. Documentation: Develop System Security Plan (SSP) & appendices, with a focus on controls specific to the product and shared responsibility model with IBM. Assessment & Authorization: Partner with IBM for 3rd Party Assessment Organization - 38North (3PAO), conduct assessment, remediate findings, and achieve Authority to Operate (ATO) for Terraform & Vault Product Deliverable: Achieve FedRAMP Moderate Authorization and allow IBM Sellers to transact the offering. |
| Phase-2 | Vault on MSCP - FedRAMP High | Post-ATO | Security Update: Update product security controls to be FedRAMP High compliant. Documentation: Update System Security Plan (SSP) & appendices, with a focus on controls specific to the product and shared responsibility model with IBM. Assessment & Authorization: Partner with IBM for 3PAO - 38North, conduct assessment, remediate findings, and achieve ATO for Terraform & Vault Product Deliverable: Achieve FedRAMP High Authorization and allow IBM Sellers to transact the offering. |
| Phase-3 | Terraform on MSCP - FedRAMP Moderate | Post-ATO | MSCP Platform Integration: Integrate Terraform & Vault with MCSP, inheriting security controls + updating product security controls to be FedRAMP Moderate compliant. Documentation: Develop System Security Plan (SSP) & appendices, with a focus on controls specific to the product and shared responsibility model with IBM. Assessment & Authorization: Partner with IBM for 3rd Party Assessment Organization - 38North (3PAO), conduct assessment, remediate findings, and achieve Authority to Operate (ATO) for Terraform & Vault Product Deliverable: Achieve FedRAMP Moderate Authorization and allow IBM Sellers to transact the offering. |
| Phase-4 | Terraform on MSCP - FedRAMP High | Post-ATO | Security Update: Update product security controls to be FedRAMP High compliant. Documentation: Update System Security Plan (SSP) & appendices, with a focus on controls specific to the product and shared responsibility model with IBM. Assessment & Authorization: Partner with IBM for 3PAO - 38North, conduct assessment, remediate findings, and achieve ATO for Terraform & Vault Product Deliverable: Achieve FedRAMP High Authorization and allow IBM Sellers to transact the offering. |
| Phase-5 | Portfolio Expansion | Post-ATO | Market Validation: Validate market demand and prioritize next product for FedRAMP Authorization (i.e. Boundary, Consul, Packer, Vault Radar). Onboard Next Product: Follow integration patterns & documentation from Phase-1 to create a repeatable model for subsequent product authorizations. |

Notes

- Brandon is Exec sponsor

Actions/Next Steps

- Trade-off between identity, separated per product, decision needed
- What is the IBM sales reach for FedRAMP - Brandon introduce Peter - Tyler dive deeper into this
- Tyler meet with Bryan TPM
- Create proposal for FedRAMP 6 weeks - 2 months - have this drafted in PowerPoint

2025-08-22: Federal CoE + Security

- [Tyler] Provide an update on products onboarding plans to MCSP commercial, and plans for MCSP FedRAMP
  - TOB - Sept 1
  - Annual Planning
  - Vault on MCSP Commercial by EoY
  - Terraform will be after, date TBD
  - 
  - Vault - ADOPT EVERYTHING THAT MCSP OFFERS for Commercial!
  - By end of Q1, next year, onboard products in 2-3 months
    - Current set 4-5 months
    - If already on commercial w/ table stakes around FIPs, Auto-logging, and on commercial, can be added 2-3 months
- [Luka] Provide an overview of how Hashicorp Security/GRC supports products today and plans around how to support FedRAMP
  - Discuss intersect and need for a dedicated role (liaison) between Hashicorp GRC/Security + Federal CoE. Cover roles/responsibilities of the liaison (if one is required) (pre & post authorization)
  - FedRAMP Boundary - own everything Patterns, ConMon, EVERYTHING, some internal controls that we need to do
    - Internal work - support as needed, have HC (defining persona / coverage / sync w/ Antony & open role in the next couple of weeks
- [Tyler] Discuss shared costs for operating in FedRAMP that are charged to the Hashicorp BU (i.e. SRE services & operations support)
  - Associated costs - most is consumed within Federal CoE - what exists from support function - we have external resources for onboarding - most HC costs are covered
    - Tools/tech adopt all of it
    - Not quantified costs today
    - All in Rob Thomas - Dinesh runs all of SW
      - CoE under Dinesh
    - Chargeback - costs associated with security services & runtime services
    - CoE is shared investment around for FedRAMP - efficiency is most important
- 2-3 months
  - Does MCSP review and address gaps from MCSP or on the Product team to do so?
    - Most work is in documentation (major lift by CoE team) - can give example & can duplicate
    - Inherited controls - accept their offering (MCSP onboarding)
  - If there is a deviation - inform CoE immediately to inform them about it

