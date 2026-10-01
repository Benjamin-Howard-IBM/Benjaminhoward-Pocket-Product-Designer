# CSX / HashiCorp Discovery Summary

> **Meeting:** CSX HashiCorp Azure vWAN Peering Discovery (FRB-1813)
> **Date:** September 30, 2026
> **Duration:** 33 minutes 8 seconds
> **Sources:** [Discovery transcript](../01.%20Meetings/CSX-Hashicorp-Discovery.md); [Azure Peering - vWAN Strategy](Azure-Peering-vWAN-Strategy.md)
> **Status:** Discussion summary, not an approved architecture or decision record.

## Executive summary

The discussion explored connecting the Azure VNet hosting HCP Vault Dedicated (HVN) to CSX's Secure Virtual Hub so traffic remains within CSX's centrally governed Azure network and traverses its firewall. CSX's network representative prefers direct attachment to the vWAN hub. The HCP team described a cross-tenant Azure API approach requiring a service principal and a narrowly scoped role assignment. CSX asked for exact permissions, scope, and whether access is temporary or ongoing.

No final architecture was selected. CSX still needs to confirm whether direct vWAN integration or an interim VNet-peering arrangement is permitted by its leadership and security organization. HCP still needs to complete an IBM security review of the proposed identity/access model and assess the feature's delivery effort and timing. A bridge VNet was discussed as a possible path, but participants did not establish whether the previously attempted bridge approach is the same design or why it failed.

The strategy's target of native vWAN support aligns with CSX's stated preference for centralized firewall control. Two qualifications need resolution before the strategy is treated as validated: the Azure vWAN connection is to a VNet (the VNet hosting the HVN), not to the HVN as a VNet-free resource; and the transcript records disagreement about whether a VNet-based interim/alternate path is prohibited or can be approved. The meeting did not validate Terraform provisioning, multi-spoke behavior, route/DNS propagation, or exact firewall enforcement.

## Discussion summary

### Current situation and options

- CSX described its normal vendor pattern as connecting a vendor-provided VNet resource ID to a Secure Virtual Hub, selecting a non-conflicting address range, and applying firewall rules. If access must extend beyond Azure to on-premises or other networks, CSX may need Verizon to route the address range; if access is Azure-only, a non-conflicting Azure range may be sufficient. (Derrick, 0:26-1:11; 20:50-22:22)
- HCP described a target in which the Azure VNet hosting the HVN is connected to the CSX vWAN hub using Azure APIs. HCP said this requires a service principal, a role, and a role assignment to authorize hub-connection operations across the relevant tenants/subscriptions. (Sudeep, 9:16-12:15)
- The preferred path for CSX is direct connection to its Secure Virtual Hub because traffic should reach the CSX firewall immediately. A bridge/ingress VNet connected to the hub and peered with the vendor VNet was discussed as an alternative; Derrick said it can also be routed through the firewall, but it adds a network hop and needs careful configuration. (Derrick, 10:15-11:12; 13:56-14:59; 16:56-17:53)
- Participants used “direct VNet peering,” “direct vWAN,” “VNet-to-vWAN,” and “bridge VNet” inconsistently. They were discussing at least two distinct patterns: the existing HVN-to-customer-VNet peering capability, and attaching the HCP VNet to a CSX vWAN hub. A bridge/transit VNet is a third topology. The meeting did not settle terminology or confirm which pattern had failed in the earlier CSX attempt. (7:56-10:25; 24:25-24:38; 30:39-32:42)

### Security, permissions, and approval

- CSX said it could create a service principal and provide credentials if the permissions were specified. Derrick explicitly asked for the exact role or custom role, permissions, assignment scope, and whether access is one-time or must remain. CSX stated it does not want to grant delete access to its vWAN hub. (Derrick, 6:26-7:15; 12:40-13:25)
- HCP said the vWAN service-principal design needs an IBM-side security review. Sudeep committed to prepare prerequisite/permission documentation. (Durgesh, 14:09; Sudeep, 12:52-13:44)
- CSX participants referenced a prior direction that vWAN must be used, but Derrick said he was not aware of a formal directive and noted that other vendors sometimes use alternatives. Eric said approval from Derrick's leadership and CSX's CISO would be needed before proceeding with the alternative. Therefore, the actual policy and decision authority remain unconfirmed. (15:15-18:27; 23:44-24:09; 28:51-29:52)

### Interim path and migration

- HCP raised existing VNet peering as a potentially faster way to get CSX moving while vWAN support is evaluated. CSX did not give final approval; it asked for validation with leadership/security and for evidence that a later cutover would work. (Durgesh, 15:15-16:10; Eric, 19:57-20:20; 23:44-24:09)
- Derrick estimated a cutover outage of about five minutes while removing the old peering and connecting to the vWAN hub. He said the IP/DNS impact depends on where the address range must be reachable: ranges outside CSX's already-routed networks may require Verizon routing; Azure-only reachability primarily requires avoiding conflicts. This is meeting testimony, not a tested HCP-to-CSX migration guarantee. (20:28-22:22)
- CSX said an earlier workaround did not work, but participants were unsure whether that was the bridge/transit approach or the standard supported HVN-to-VNet peering path. Later discussion distinguished the two, without resolving what was actually tested. (24:25-24:38; 30:39-31:18)

## Agreements, proposals, and unresolved status

| Item | Status grounded in the meeting |
|---|---|
| CSX prefers the HCP VNet to connect to its Secure Virtual Hub so traffic follows the hub's security path. | Clear preference; not an implementation approval. |
| A cross-tenant vWAN connection will need documented identity permissions and CSX review. | Agreed need; exact role, scope, lifecycle, and security approval remain open. |
| Direct vWAN is the strategic target. | Consistent with the HCP strategy and CSX preference, but not approved or scheduled in this meeting. |
| Existing VNet peering or a bridge VNet could be an interim/alternate route. | Discussed as possible; policy approval and technical path are unresolved. Do not treat as an agreed workaround. |
| Cutover can be completed with roughly five minutes of downtime and no IP/DNS change. | Not established. The five-minute estimate is Derrick's expectation; IP/routing impacts depend on reachability and CIDR choice. |
| Prior CSX peering/workaround testing failed. | Failure was reported, but the exact topology, configuration, and failure cause were not identified. |

## Open questions

| Question | Suggested owner to resolve | Why it remains open |
|---|---|---|
| Is direct attachment of the HCP VNet to the CSX Secure Virtual Hub permitted by CSX policy, and who gives final approval? | CSX | Participants cited conflicting interpretations of a “must use vWAN” direction; Derrick's leadership and CSX CISO approval were named as conditions. |
| Is an interim direct HVN-to-VNet peering or a bridge-VNet topology permitted? Are these distinct from the previously rejected/failed workaround? | CSX, with HCP clarification | CSX's prior policy direction and the earlier failed attempt were not sufficiently specific. |
| What exact Azure resources and tenants participate in the vWAN flow, and which party creates each resource/connection? | HashiCorp (IBM) Engineering + CSX | “Direct VNet peering” and “direct vWAN attachment” were used interchangeably despite describing different network paths. |
| What Azure role/actions and assignment scope are required? Can the service principal be temporary, and can delete permissions be excluded? | HashiCorp (IBM) Engineering to specify; CSX Security to approve | CSX requires least-privilege detail before creating credentials; IBM security review is also required. |
| Which CIDR is allocated, and must the range be reachable only from Azure or also from on-premises, field, QTS, AWS, or other networks? | Joint: CSX Network + HCP Product/Engineering | External routing may require Verizon; the customer access scope and non-overlap checks were not finalized. |
| Does direct attachment, and does the bridge alternative, reliably traverse the required Azure Firewall policies and route tables? | Joint: CSX Network/Security + HCP Engineering | Firewall traversal is the reason for CSX's preference, but no route configuration or test evidence was reviewed. |
| What precisely was tested before, and why did that approach fail? | Joint | The transcript does not identify whether the failed path was bridge/transit VNet or standard HVN-to-VNet peering. |
| What is the actual cutover sequence, outage, rollback, and impact on IPs, DNS, and non-Azure routes? | Joint: CSX Network + HCP Engineering | The ~5-minute outage was an estimate, and routing depends on the selected CIDR and consumers. |
| Does the feature meet the strategy's Terraform, multiple-spoke, route/DNS propagation, and Secure Virtual Hub requirements? | HashiCorp (IBM) Product/Engineering, validated with CSX | These are strategy requirements, not outcomes demonstrated during this discovery call. |
| What is the delivery scope, engineering capacity, and timeline for native vWAN support versus an interim route? | HashiCorp (IBM) Product/Engineering | The team explicitly raised capacity and timeline concerns but made no commitment. |

## Action items and next steps

The first table records actions directly stated or volunteered in the transcript. The second table is a recommended follow-up derived from unresolved decisions; it was not committed as a dated plan during the meeting.

### Stated or volunteered

| Action | Owner | Evidence / status |
|---|---|---|
| Prepare and share customer-facing prerequisite documentation for the vWAN service principal, role, permissions, and role assignment. | HashiCorp (IBM) - Sudeep | Sudeep offered to create the document at 12:52-13:44. No delivery date was stated. |
| Review the proposed service-principal approach through IBM security review. | HashiCorp (IBM) - Durgesh / relevant security reviewers | Durgesh explicitly raised this review at 14:09. Outcome is pending. |
| Confirm whether the proposed route is permissible with CSX leadership/security, including the CISO condition. | CSX - Eric / Derrick / relevant approvers | Eric said this needed verification at 23:44 and later conditioned agreement on leadership/CISO approval at 29:19. No approval is recorded. |
| Send the prior SAP/vendor vWAN example, commands, or connection documentation. | CSX - Derrick | Derrick said he would look for the SAP material at 23:55-24:05. Completion is not confirmed in the transcript. |
| Share the prior CSX attempt and the supported VNet-peering documentation with the teams. | Owner to confirm; Nicole and Sudeep both referenced sharing material | Nicole offered to forward prior material (24:38, 26:16); Sudeep shared a document link in the meeting (31:53). The transcript does not establish that all requested artifacts were delivered or their exact owners. |
| Regroup on the vWAN and alternate-path options, then return with a realistic HCP delivery view. | HashiCorp (IBM) - Durgesh with Sudeep / Engineering | Durgesh said he would regroup with Sudeep (26:31), discuss the second option (29:52), and determine realistic timelines (32:00). No date or commitment was given. |
| Provide CSX's decision on whether direct vWAN and/or an interim VNet path can proceed. | CSX - Radesh / Eric / Derrick and approvers | Durgesh said HCP would wait for CSX's answer; Radesh discussed sending an alignment email (29:52-31:18). |

### Recommended follow-up, not yet committed

| Next step | Suggested owner | Completion evidence |
|---|---|---|
| Resolve terminology and draw the three candidate topologies: existing HVN-to-VNet peering, HCP VNet-to-CSX vWAN hub connection, and bridge/transit VNet. | HashiCorp (IBM) Product/Design + Engineering; review with CSX Network | One approved diagram names tenant/resource ownership, connection direction, CIDRs, route tables, firewall path, and the previously attempted pattern. |
| Decide the target and whether an interim path is allowed; document the policy approver and any exception. | CSX Product/Network/Security + HashiCorp (IBM) PM | Written decision, approver, conditions, and whether the interim network will be migrated or retained. |
| Specify and approve least-privilege identity requirements, including exact API actions, scope, secret handling, revocation, and whether the principal is one-time or persistent. | HashiCorp (IBM) Engineering/Security + CSX Security | Reviewed permission matrix and end-to-end credential lifecycle. |
| Validate CIDR selection, route propagation, firewall inspection, and Azure-only versus on-prem/other-network access. | Joint Network/Security/Engineering | Test plan and results for each required traffic source/destination; Verizon dependencies identified if applicable. |
| Define cutover, expected outage, rollback, and any IP/DNS changes for the selected migration path. | Joint Engineering/Network | Reviewed runbook with measured or explicitly qualified downtime and rollback criteria. |
| Convert the chosen path into product scope, Terraform/API work, acceptance criteria, capacity, and dates. | HashiCorp (IBM) PM + Engineering | Roadmap decision and acceptance criteria traceable to the Azure strategy's JTBD/CUJs. |

## Cross-reference: discovery vs. Azure vWAN strategy

The strategy is a draft synthesizing the WIP HCPV-2005 PRD. This comparison checks alignment with that draft; it does not independently verify Azure behavior or convert a meeting proposal into a product commitment.

| Strategy requirement or claim | Discovery evidence | Alignment and remaining check |
|---|---|---|
| Native HVN-to-vWAN connectivity; avoid a transit VNet or VPN gateway solely for Vault (JTBD 1, CUJ 1.1). | HCP described connecting the VNet hosting the HVN to the CSX vWAN hub. CSX prefers direct hub attachment; a bridge VNet was discussed only as an alternative. (7:56-9:16; 10:15-11:12; 13:56-14:59) | Direction aligns, but architecture wording should distinguish the HVN from its Azure VNet. The transcript does not establish whether HCP's direct attachment flow is technically implemented or approved. A bridge VNet would not meet the no-extra-transit-network target. |
| “Without introducing additional networking infrastructure.” | HCP explicitly said a VNet is involved and cannot be avoided. (2:00-2:50) | Potential wording mismatch. If the HCP-managed VNet already exists for the HVN, native vWAN may avoid a *customer-created bridge/transit VNet*; it does not remove the underlying VNet. Clarify which party's added infrastructure the strategy excludes. |
| Secure Virtual Hub, Azure Firewall, and centralized routing remain in the traffic path (JTBD 2, CUJ 2.1-2.2). | CSX prefers direct attachment because the first network hop should be its firewall. Derrick said a bridge path can also traverse the firewall, but it adds a VNet hop and must be configured. (10:52-11:12; 13:56-14:59; 16:56-17:53) | Preference aligns. Actual route-table propagation, inspection behavior, and prevention of bypass were not demonstrated. Validate both candidate topologies before describing firewall enforcement as automatic. |
| Existing security controls and private connectivity remain enforceable. | CSX requires a defined resource ID, non-overlapping IP range, firewall rules, and precise cross-tenant permissions. It does not want broad hub delete permissions. (0:26-1:11; 12:40-13:25) | Strong alignment on customer governance. Strategy should make identity/RBAC approval, CIDR ownership, and firewall configuration explicit requirements, rather than implying the connection is a one-step attach. |
| Fully Terraform-provisionable (CUJ 1.1). | The call discussed Azure APIs, service principals, role assignment, and customer approval; Terraform was not discussed. | Unvalidated by this meeting. Confirm whether both HCP-side provisioning and customer-side consent/role assignment can be safely automated or need operator steps. |
| One hub connection supports multiple spokes; route/DNS propagation is automatic (CUJ 1.2 and strategy narrative). | Derrick said networks connected to CSX's vWAN can communicate, subject to routes, non-overlapping CIDRs, and possible Verizon routing for external networks. The call did not discuss DNS. | Partially consistent but not validated for HCP's exact connection, CSX route tables, or DNS. Test multi-spoke reachability and specify whether DNS is in scope. |
| CSX cannot use workaround architectures and adoption is blocked absent native vWAN (strategy “Why it matters”). | Some participants described vWAN as mandatory based on prior direction. Derrick said a bridge alternative is used for some vendors and may be possible; Eric/Radesh still required leadership/CISO confirmation. (15:15-18:27; 28:51-29:52) | Not a clean contradiction: this is a disagreement about policy authority and permitted exceptions. The strategy should retain the blocker as a reported constraint but qualify the workaround's status until CSX's approver confirms it. |
| CSX adoption blocker and the initial failed connection attempt. | Participants agreed that an earlier attempt did not work, but disagreed or were uncertain whether it was a bridge/transit pattern or the standard HVN-to-VNet peering path. (24:25-24:38; 30:39-31:18) | Strategy's statement that adoption is blocked is consistent with reported outcome, but the technical cause is not established. Do not treat the failed attempt as evidence that all VNet peering is unsupported. |

## Technical requirements to carry forward

These requirements are grounded in statements made during the discovery or are already explicit in the strategy. Items marked **validate** are not yet verified by the meeting.

- **Azure resources and topology:** Keep the HCP VNet hosting the HVN explicit in the architecture. Define whether HCP attaches that VNet to a CSX Secure Virtual Hub through a cross-tenant hub connection or uses an existing VNet-peering pattern. Avoid calling these the same topology.
- **Cross-tenant authorization:** Document the service principal, exact role/actions, assignment scope, tenant/subscription identifiers, approval flow, credential exchange, revocation, and whether access is one-time or persistent. The role must not grant hub deletion if that is not required. **Validate least privilege and IBM/CSX security approval.**
- **Addressing and routing:** Choose a CIDR that does not conflict with CSX Azure or wider enterprise ranges. Establish whether access is Azure-only or must include on-premises/field/QTS/other networks. Identify Verizon route changes when the selected range is not already routed. **Validate route propagation and return paths.**
- **Security path:** Demonstrate that traffic enters the intended Secure Virtual Hub and traverses the required firewall policy. Define the equivalent behavior and risk for any bridge-VNet alternative.
- **Operational transition:** If an interim path is selected, document cutover order, possible service interruption, IP/DNS impact, route changes, rollback, and whether the final direct-vWAN state has been tested. The ~5-minute outage is an estimate from CSX, not a service guarantee.
- **Product acceptance:** Test the strategy's stated multi-spoke access, private connectivity, centralized security controls, and Terraform provisioning against a representative CSX topology. The transcript does not supply evidence for these acceptance criteria.

## Role-based work plan

These workstreams translate the unresolved discovery into practical tasks. They are recommendations, not commitments made in the meeting.

### Design

- Produce a three-option topology diagram that distinguishes existing HVN-to-VNet peering, HCP VNet-to-vWAN hub connection, and bridge/transit VNet; label tenant boundaries, actor/owner, CIDRs, routes, firewall, and identity handoffs.
- Map the customer setup and approval journey: gather CSX resource IDs and CIDR needs, request/create the service principal, review permissions, approve the hub connection, configure routes/firewall, verify connectivity, and recover from denial or misconfiguration.
- If an interim topology remains viable, design the transition and rollback experience, clearly showing outage expectations and the decisions CSX must make. Keep any outage figure qualified until engineering validates it.
- Identify the unknowns that block wireframe or workflow decisions: who initiates each Azure operation, whether credentials persist, who supplies the IP range, which access networks are in scope, and how firewall traversal is verified.

### Engineering

- Verify the Azure API/resource model for attaching the HCP VNet to the CSX Secure Virtual Hub, including tenant/subscription boundaries and the exact least-privilege role. Complete IBM security review before requesting customer credentials.
- Establish whether the supported HVN-to-VNet peering option is a valid interim path for this customer, and reconstruct the earlier failed attempt before prescribing a workaround.
- Implement or estimate the direct vWAN path with Terraform/API support and explicit lifecycle handling for approval, connection state, route propagation, errors, deletion, and credential revocation.
- Test non-overlapping CIDRs, CSX hub routes, firewall inspection, return traffic, multi-spoke access, and any required on-prem routes. Include rollback and migration testing if an interim path is accepted.
- Report measured cutover downtime and IP/DNS behavior; do not rely on the meeting's approximate five-minute estimate as an engineering guarantee.

### Project management

- Obtain CSX's written decision on the required target architecture and whether any interim VNet/bridge path is permitted; identify the policy owner, leadership approver, and CISO/security approval.
- Track Sudeep's permissions/prerequisite document, the CSX SAP/vendor examples and previous test artifacts, and IBM's security review as dependencies with named owners and dates.
- Reconcile the customer requirement with the draft strategy: no customer bridge/transit infrastructure, direct vWAN preference, and any permitted exception. Record what CSX policy actually allows.
- Decide product scope and sequencing based on engineering feasibility and capacity: native vWAN delivery, interim customer-specific path, or neither until requirements are met. No dates or commitments were made in the meeting.
- Convert the strategy's JTBD/CUJs into acceptance criteria and confirm the unvalidated requirements: Terraform end-to-end, multi-spoke routing, Secure Virtual Hub inspection, DNS behavior, and cross-network/on-prem access.

## Source and confidence notes

- The transcript is an automated recording transcript and contains speech-recognition errors (for example, “VNet peering” is sometimes rendered as “VNet pairing,” and “HVN” is inconsistently transcribed). Architecture terms above are normalized only where surrounding context makes the intended term clear.
- Meeting statements about Azure behavior, prior migrations, and the five-minute outage are attributed to participants; this summary does not treat them as independently tested facts.
- The strategy is explicitly marked draft and based on a WIP PRD. This cross-reference identifies alignment questions; it does not update or supersede the strategy or PRD.