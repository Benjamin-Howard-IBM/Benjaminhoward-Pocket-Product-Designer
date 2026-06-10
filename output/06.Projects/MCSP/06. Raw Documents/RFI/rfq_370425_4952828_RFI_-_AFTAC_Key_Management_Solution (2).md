# rfq_370425_4952828_RFI_-_AFTAC_Key_Management_Solution (2)

<!-- Page 1 -->

Request for Information (RFI) 
 
 
 
 
 
Air Force Technical Applications Center (AFTAC) 
Key Management Solutions (KMS) 
 
 
 
 
 
25 February 2026

<!-- Page 2 -->

1. 
Request for Information (RFI) 
AFTAC RFI for a centralized Key Management System. 
 
2. 
Purpose 
THIS IS A REQUEST FOR INFORMATION ONLY. Issuance of this RFI does not constitute a 
commitment to issue a follow-on request for proposals (RFP), contract award, or to pay any 
costs incurred by vendors in preparing responses to this RFI. 
 
This RFI invites vendors to provide detailed information regarding a centralized Key 
Management System (KMS) to enhance security and resilience of AFTAC mission systems 
principally located at Patrick Space Force Base, Florida. The core KMS must support both a 
primary and alternate site in a high-availability, active-active architecture to ensure secure, 
continuous operations. The objective is to obtain information on potential solutions to enable 
AFTAC to simplify, standardize, and secure key management across its enterprise. 
 
Information received in response to this RFI will assist AFTAC in determining KMS requirements 
and scope of work. Submitting a response to this RFI is not a guarantee in any way that a 
vendor will be selected for any subsequent RFP, nor does it preclude any vendor from 
responding to future procurement opportunities. No contract will result from any response to this 
RFI. 
 
2.1 
Responses 
 
Interested parties should respond to this RFI with an explanation of the solution(s) and 
capabilities, including available license models, systems and implementation, and renewal and 
sustainment costs. Responses should NOT be limited to simple affirmations (e.g., ‘yes we can 
do this’). 
 
Respondents should provide diagram(s) illustrating the implementation and offering insight into 
the knowledge and technologies that differentiate their solution. 
 
In addition to direct responses to this request, interested parties may also submit a white paper 
through AFTAC Commercial Solutions Opening (CSO) 2024 under Notice ID FA702224SC001 
posted on sam.gov. Explicit instructions for responding via the CSO are posted on the offering 
page, and responses that do not follow these instructions may not be considered. 
 
Questions related to this RFI must be asked through the Q&A process available on the posting 
site (e.g., NASA SEWP, GSA 2GIT, etc.). Questions received verbally or via email will not be 
accepted nor answered. 
 
Proprietary information, if any, should be minimized and MUST BE CLEARLY MARKED. All 
submissions become Government property and will not be returned. 
 
THIS IS A REQUEST FOR INFORMATION ONLY. This RFI is issued solely for information and 
planning purposes and does not constitute a commitment to issue an invitation for bids, 
request for proposals (RFP), or a contract award. Any information received in response to this 
RFI will assist AFTAC in finalizing scope of work and requirements which may be used in a 
future RFP. Submitting a response to this RFI does not guarantee a vendor will be selected for 
any subsequent RFP, nor does it preclude any vendor from responding to future procurement 
opportunities. The Government will not pay for any costs incurred by a vendor in preparing a

<!-- Page 3 -->

response to this RFI. 
 
3. 
Technical Requirements 
 
The contractor shall ensure that all applicable Commercial-Off-The-Shelf (COTS) Information 
Assurance (IA) and IA-enabled products comply with AFI 17-130, Cybersecurity Program 
Management.  All Information Technology (IT) hardware, firmware, and software components or 
products incorporated into Department of Defense Information Networks (DoDIN) must comply 
with evaluation and validation requirements in DoDI 8500.01. Furthermore, all systems and 
components must adhere to the Risk Management Framework (RMF) as outlined in DoDI 
8510.01 and must be configured and maintained in accordance with applicable Security 
Technical Implementation Guides (STIGs). The contractor shall also participate in the DoD 
Information Assurance Vulnerability Management (IAVM) program, promptly addressing security 
patches and vulnerabilities. Applicable NIST Special Publications, including NIST SP 800-53 
and, if applicable, NIST SP 800-171, must be adhered to. If any systems interact with cloud 
environments, the DoD Cloud Computing Security Requirements Guide (SRG) must be 
followed. All personnel must meet the requirements of DoD Instruction 5200.02, Personnel 
Security Program (PSP). Finally, the contractor must demonstrate adherence to Supply Chain 
Risk Management (SCRM) best practices. 
 
3.1 
KMS Core Requirements 
 
As part of ongoing Zero Trust initiatives, AFTAC requires a consolidated KMS. 
 
3.1.1    General System Requirements 
 
• 
The solution shall integrate into standard Identity Credential & Access Management 
(ICAM) solutions, including Windows Active Directory (AD) and other commercial 
identity brokers. 
• 
The solution shall be a centralized, API-driven Key Management System. The system 
must provide, at a minimum: full lifecycle management for secrets (e.g., keys, 
certificates, API tokens), secure authentication and authorization for non-person 
entities (applications, services, and systems), and comprehensive auditing of all API 
operations and secrets access to an existing Security Information and Event 
Management (SIEM) system. 
• 
Secure DNS and NTP shall be presumed to be available. 
3.1.2    User Interfaces 
 
The solution shall provide dual interfaces for system administration: a Graphical User Interface 
(GUI) and a Command Line Interface (CLI). 
 
• 
Graphical User Interface (GUI): A secure, web-based GUI for routine operations that 
is intuitive for administrators familiar with common directory management paradigms 
(e.g., Active Directory) and includes integrated, context-sensitive help. 
• 
Command Line Interface (CLI): A feature-complete CLI where all administrative 
functions are accessible. The CLI shall provide comprehensive, integrated help (e.g.,

<!-- Page 4 -->

via a --help flag) and be fully scriptable and compatible with BASH and PowerShell, 
utilizing standard input, output, and exit code conventions. 
3.1.3    Client Integration & Protocol Support 
 
The solution shall provide secrets and credentials to a wide variety of clients and endpoints by 
supporting the following standard, industry-recognized protocols at a minimum: 
 
• 
Operating System Authentication: LDAP/LDAPS, Kerberos, SSH (Certificate-
based). 
• 
Database Credential Management: TDS (for Microsoft SQL Server), OCI (for 
Oracle), and native PostgreSQL connection protocols. 
• 
Application & Web Server Integration: REST/HTTPS (for API access), OIDC (for 
application identity). 
• 
Storage System Integration: REST/HTTPS (for modern storage APIs), SSH (for 
legacy CLI management). 
3.1.4    Identity & Authentication Integration 
 
The solution shall integrate with authoritative identity sources and support established 
authentication protocols, including: 
 
• 
Identity Provider Federation: OIDC and SAML 2.0. 
• 
Directory Integration: LDAP / LDAPS. 
• 
Legacy Authentication: RADIUS, TACACS+. 
• 
Single Sign-On: Kerberos protocol. 
3.2 
CLIN 0001: Production and Continuity KMS 
 
This CLIN shall deliver the core KMS, implemented as a bi-directionally mirrored solution 
spanning a Production Environment and a Continuity Environment. 
3.2.1      Availability: The system shall be designed for 99.99% uptime. The contractor shall 
state the guaranteed Recovery Point Objective (RPO) and Recovery Time Objective 
(RTO) for an automated failover to the Continuity Environment. 
3.2.2     Maintenance: The system shall support non-interference patch management. The 
contractor shall describe the process for applying and rolling back patches with zero 
operational downtime for authentication and secrets-retrieval services. 
3.2.3     Scalability: The solution must be scalable to support thousands of users and devices.

<!-- Page 5 -->

3.3 
CLIN 0002: Research, Development, Test & Evaluation (RDT&E) 
 
This CLIN shall deliver a non-redundant implementation for an RDT&E network. This system 
shall replicate the Production system capability while being completely separate and 
independent. It must be scalable to support a thousand users and devices across a single site. 
 
3.4 
General Technical Requirements 
3.4.1     Governing Security Posture: The system shall be architected in alignment with 
Department of Defense (DoD) Zero Trust and data-centric security principles, 
satisfying the security controls and capabilities outlined in the DoD Zero Trust 
Strategy and applicable DISA STIGs. 
3.4.2     Deliverable Documentation: The contractor shall provide a business overview 
diagram of the proposed system configuration and a letter of volatility that identifies 
all components containing memory and provides instructions on how to purge or 
remove them per DoD specifications. 
3.4.3     System Monitoring: The system shall autonomously monitor and log system 
utilization and provide utilities to document and report on the utilization of all sub-
components, including clear guidance on system bottlenecks and recommended 
corrective actions. 
3.4.4     Software-Defined Architecture and Repeatability: The system shall be presumed 
to be virtualized. For solutions delivered primarily as software, vendors shall 
describe how their architecture supports automated, repeatable deployments 
through an Infrastructure as Code (IaC) approach. The response should detail the 
minimum virtual hardware footprint (vCPU, RAM, storage) and outline how the 
proposed IaC methodology would enable rapid provisioning and system recovery. If 
physical hardware is required, its specifications (RU, power, BTU) must be clearly 
detailed. 
 
3.5 
Common Criteria Evaluation & Validation Scheme Mandate 
The contractor shall ensure that products used to protect information on National Security 
Systems are certified by the NIAP/CCEVS approved product list. 
 
4. 
Ordering Table 
 
CLIN 0001: Production and Continuity KMS. One (1) complete, bi-directionally mirrored Key 
Management Solution, spanning a Production Environment and a Continuity Environment, as 
specified in section 3.2. Includes all necessary hardware, software, licenses, installation, 
training, and support. 
 
CLIN 0002: Research, Development, Test & Evaluation (RDT&E) KMS. One (1) complete, non-
redundant Key Management Solution for the RT&DE environment, as specified in section 3.3. 
Includes all necessary hardware, software, licenses, installation, training, and support 
 
Optional CLINs: Air-Gapped Network Instances. Option to procure up to six (6) additional self-
contained, air-gapped instances of the system described in CLIN 0001. Each instance to be 
priced separately

<!-- Page 6 -->

5. 
Technical Contractual Requirements 
5.1 
Technical Refresh 
To ensure new design enhancements and technological updates or advances, the contractor 
shall offer, under this Delivery Order (DO), hardware and software components available to 
the contractor's commercial customers. Furthermore, the contractor shall make available any 
commercially available updates to the hardware and software provided under this DO. If such 
updates are available to other customers without charge, then they shall also be made 
available to the Government without additional charge. The contractor will ship these updates 
to existing customers who have acquired the hardware/software being updated under this 
DO. Vendor commercial product offerings shall include “state of the art” technology, i.e., the 
most current proven level of development available in each product category. 
 
5.2 
Trade Agreement Act (TAA) 
All proposed products must be compliant with the Trade Agreements Act of 1979 (TAA) and 
related clauses in Section I of this contract. In accordance with DFARS 252.225-7021, the 
Trade Agreements Certificate at DFARS 252.225-7020 shall be provided for each end item 
defined and specified in a solicitation that exceeds the TAA threshold subject to the waivers 
and exceptions provided in FAR 25.4, and DFARS 225.4 offered in response to any RFQ 
issued under this contract.  Please note that Federal Acquisition Regulation (FAR) paragraph 
25.103(e) includes an exemption from the Buy American Act (BAA) for acquisition of 
information technology that is commercial items. 
 
5.3 
Authorized Resellers 
The contractor may be an authorized reseller of new and refurbished/remanufactured 
original equipment manufacturer (OEM) equipment proposed under this DO. The contractor 
may also procure directly from OEMs or utilize other legitimate distribution channels to 
provide the required products in accordance with the OEM’s policies on reselling.  Any 
contractor channel relationships with OEM partners (gold, silver, etc.) will be represented in 
the best pricing offered. If the contractor is not an OEM reseller, the contractor shall clearly 
identify this in the submitted proposal and list the OEM resell partner’s registered relationship 
with the OEM. DOs may restrict the use of authorized resellers, specific OEMs, or identify 
required OEMs. The contractor shall ensure all products are genuine and eligible for any 
OEM warranties, maintenance agreements and licensing as offered.  Genuine products are 
those products the OEM, by their policy, considers not “secondary”, destroyed, stolen or 
scrapped. 
 
5.4 
Remanufactured/Refurbished Products 
Any remanufactured or refurbished product offering shall be clearly identified as such by the 
contractor in the submitted proposal. Remanufactured and/or refurbished products shall be 
certified according to the standards set forth in the OEM’s policy. OEM or factory certification 
shall be provided for remanufactured products. 
 
5.5 
Items on Backorder 
In their response to a Request for Quote (RFQ), the contractor shall provide notification, if 
applicable, that a particular item is on back order, the expected lead-time to fulfill the order, 
etc. It shall be implicit that a response to an RFQ with no items identified on backorder is a 
declaration that the items are available at the time of quote submission. 
 
5.6 
Warranty 
The contractor shall provide any OEM pass-through warranty and standard commercial

<!-- Page 7 -->

warranties applicable to the products being purchased at no cost. This shall apply to new, 
refurbished and remanufactured equipment. 
 
5.7 
Hardware and Associated Software and Peripherals 
All hardware delivered under this DO shall include associated software, documentation and 
associated peripherals required for operations (such as controllers, connectors, cables, drivers, 
adapters, etc.) as provided by the OEM. This is true only if the applicable OEM provides such 
items with the product itself. 
 
5.8 
Software 
For all software that is outside of hardware and purchased independently, the contractor shall 
provide the software license registered to the customer’s organization. 
 
5.9 
Customer Support 
The prime contractor shall provide 24x7 live telephone support during the warranty period to 
assist in isolating, identifying, and repairing software and hardware failures, or to act as 
liaison with the manufacturer in the event that the customer requires assistance in contacting 
or dealing with the manufacturer. 
 
5.10 
Product Maintenance 
The contractor shall provide associated maintenance and upgrades to include spares/parts 
and emergency support worldwide, during the warranty period. 
 
6. 
Delivery Requirements 
 
6.1 
Timeframes 
Information Technology orders will be rated under the Defense Priorities and Allocation 
System (DPAS) with timelines identified during the award process. Title 15 Code of Federal 
Regulations (CFR) Part 700 is administered by the Department of Commerce, Bureau of 
Industry and Security. DPAS implements the priorities and allocations authority of the 
Defense Production Act, including use of that authority to support emergency preparedness 
activities pursuant to Title VI of the Robert T. Stafford Disaster Relief and Emergency 
Assistance Act (42 U.S.C. 5195 et seq.), and the priorities authority of the Selective Service 
Act and related statutes, all with respect to industrial resources. The DPAS establishes 
procedures for the placement, acceptance, and performance of priority rated contracts and 
orders and for the allocation of materials, services, and facilities. 
 
6.2 
DO Order Shipping Date 
This will be a DPAS DO-A7 rated order. 
 
6.3 
Delivery Delays 
Contractors are required to meet the timeframes as stated in section 6.1 unless Department 
of Commerce approval and/or review activities prevent the contractor from meeting these 
timeframes. If the contractor determines they are unable to achieve the stated timeframes, 
the contractor shall notify the Contracting Officer within two (2) business days of such 
determination, or immediately upon such determination if operating under the 
Emergency/War Tempo timelines.

<!-- Page 8 -->

6.4 
Shipping Information. All products shall be shipped to: 
 
AFTAC BECO  
1020 S. Patrick Drive, Bldg. 10989  
Patrick SFB, FL 32925-3516  
 
6.5 
Inspection/Acceptance. The following Government officials are responsible for receiving 
the products and performing inspection: 
 
Technical POC: Mr. Keith Mills
