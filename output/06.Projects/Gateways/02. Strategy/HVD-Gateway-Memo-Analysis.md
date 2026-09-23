# HVD Gateway - Memo Analysis

**Source:** Memo for HCP Vault Gateway.docx
**Original memo date:** December 16-18, 2025
**Analyzed:** August 2026
**Analyst:** Benjamin Howard

---

## Overall Summary

The HCP Vault Gateway is a CSP-agnostic, managed connectivity layer between HCP Vault and customer private networks. Its core purpose is to abstract away network complexity - eliminating the need for customers to expose inbound ports into their own infrastructure while providing a single, consistent connectivity model across AWS, Azure, GCP, and on-prem.

The memo is a requirements definition document, not a design spec. It establishes six hard requirements (validated customer needs), four explicit non-goals, and a set of open technical and operational questions that remain unresolved at time of writing. Several comment threads in the document - from Ricardo Oliveira and Chris Zembower - indicate active disagreement on deployment model direction, particularly binary vs Docker vs both, and the role of dedicated VMs.

**The central design challenge:** Gateway must handle enterprise-scale fan-in (many customer networks into one Vault cluster), support HA and DR from day one of GA, and do so without forcing opinionated deployment models that create adoption blockers - all while preserving source IP visibility that security teams rely on.

---

## Goals

| Goal | Evidence in memo |
|---|---|
| Abstract customer network complexity | "Eliminate inbound connectivity requirements into customer networks" |
| CSP-agnostic connectivity | Single model across AWS, Azure, GCP, and on-prem |
| Reduce time-to-value for regulated/enterprise customers | Explicitly stated as a primary goal |
| Secure, high-performance tunnels | WireGuard (or equivalent), fully managed HCP side |
| Not a general networking product | Explicitly scoped: Vault-specific connectivity abstraction only |

---

## Tangible Outcomes

These are the outcomes the product must deliver to be considered successful at launch.

| Outcome | Priority | Notes |
|---|---|---|
| Customers can connect private networks to HCP Vault without exposing inbound ports | Launch | Core value proposition |
| Source IP preserved through tunnel - visible in Vault audit logs | Launch | Hard requirement; design-level constraint |
| Deployment artifact available as signed binary or Docker image | Launch | Both options needed per Chris Zembower; not K8s-only |
| Auto-update is configurable, not enforced | Launch | Mirrors TF Cloud Agent lifecycle model |
| Explicit peer limits documented with multi-gateway topology guidance | Launch | Required before GA to avoid security group explosion at scale |
| HA and DR fully supported and seamlessly integrated | GA gate | Explicitly stated: cannot GA without this |
| Clear health signals and failure attribution (Gateway vs Vault vs Network) | GA gate | Customers don't expect log collection; they expect actionable signals |

---

## Business Outcomes

This is where the memo connects to measurable enterprise value. These map directly to the Band 8 requirement to **demonstrate how individual efforts deliver business outcomes.**

| Business Outcome | Mechanism | Signal |
|---|---|---|
| Accelerate enterprise adoption | Removing network complexity as a blocker reduces sales cycle friction for regulated customers | Time-to-first-connection; deal velocity in enterprise segment |
| Expand addressable market | CSP-agnostic model means customers with multi-cloud or on-prem Vault workloads are now reachable | New logo acquisition from non-AWS-only customers |
| Reduce churn risk for regulated customers | HA + DR support at GA makes Gateway viable for production; without it, regulated customers view product as incomplete | Retention in regulated/enterprise tier |
| Reduce support and CSE escalation load | Clear failure attribution and documented peer limits reduce "why is Vault unreachable" tickets | Support ticket volume pre/post Gateway launch |
| Competitive differentiation | CSP-agnostic managed gateway is a meaningful differentiator vs self-managed Vault networking | Win/loss data; competitive deal mentions |

---

## Open Questions (from memo - unresolved at source)

These are decision forks that directly affect design. Each one needs a kill criteria or a call before wireframes finalize.

| Question | Status | Design impact | Decision owner |
|---|---|---|---|
| Binary vs Docker vs both? | Open (Chris Zembower: "should be both") | Affects onboarding UI, artifact download flow | PM / Engineering |
| K8s-only acceptable? | Open (Chris Zembower: "Not acceptable") | Affects deployment model constraints in UI | PM |
| When is dedicated VM acceptable vs not? | Open | Affects setup flow and cost/isolation tradeoff messaging | PM |
| Is source IP preservation mandatory, or is logical identity sufficient? | Open | If mandatory, must be surfaced as a constraint in connectivity setup UI | Engineering + Security |
| What are acceptable documented peer limits? | Open | Drives scale guidance copy and error states in UI | Engineering |
| WireGuard approval from IBM - if not approved, what alternative? | Open | Technology dependency; blocks tunnel implementation | Legal / IBM |
| Where to publish Docker images? Docker Hub or private registry? | Open (TF Agent pattern = Docker Hub) | Affects pull/setup instructions in UI | Engineering |
| Auto-update mechanism and version comms? | Partially answered (mirrors TF Agent: auto-update minor by default, configurable) | Affects update/version UI | Engineering |
| Multi-version support policy? | Partially answered (~2 year supported lifespan, no initial backporting) | Affects version deprecation messaging | PM / Engineering |

---

## Next Steps for Design

These are the actions that move design work forward. Ordered by dependency chain.

1. **Get Shana's existing Gateway Figma + review it against these requirements** - Specifically check: does the existing connections UI account for peer limits, source IP preservation, and the binary/Docker dual-artifact model? Document what to keep, rethink, or cut. [Assumption: Figma received from Kamil - to be reviewed]

2. **Resolve binary vs Docker decision with Dante before wireframes** - This is the highest-impact open question for UI. The onboarding/setup flow branches significantly depending on whether one or both deployment options exist.

3. **Define source IP handling stance** - Design cannot finalize connectivity setup UI until the source IP question is answered. If mandatory, it needs a surfaced constraint; if a tradeoff, it needs documented copy at the point of decision.

4. **Map the HA/DR setup flow** - GA gate requirement. The "DR must exist in both primary and DR environments and failover automatically" requirement implies a multi-environment setup flow. This needs a journey map before wireframes.

5. **Draft scale guidance copy and error states** - Peer limits and multi-gateway topologies are product requirements, not implementation details. These need to appear in the UI as explicit guidance, not silent failures.

---

## Design Decisions Required (Forks Taken / Not Taken)

> *These are explicit calls that will shape the design direction. Documenting the fork taken - not just the questions - is how this work demonstrates Band 8 outcome-focused and courageous behavior.*

| Decision | Call | Rationale | What we are not doing |
|---|---|---|---|
| Deployment model scope for initial wireframes | Design for binary + Docker; exclude K8s-only | Chris Zembower's comment marks K8s-only as not acceptable; TF Agent precedent supports both | Will not design K8s-specific setup flows until requirement changes |
| Source IP in UI | Treat as required constraint until engineering confirms otherwise | Audit log integrity is a hard requirement for enterprise/regulated; designing around it now avoids rework | Will not design a "logical identity only" flow until the PM/engineering call is made |
| HA/DR scope | Required for GA wireframes; out of scope for PoC/Private Beta screens | Memo explicitly states not needed for PoC/Private Beta but GA gate | Will not defer HA/DR flow to post-GA design |

> **Note:** Open questions on WireGuard approval and Docker registry location do not block initial wireframes. Label as assumptions in artifacts until resolved.

---

## Risks and Constraints

| Risk | Impact | Mitigation |
|---|---|---|
| WireGuard IBM approval is unresolved | Could require tunnel technology rethink mid-design | Design tunnel UI generically (connectivity abstraction language, not WireGuard-specific) until resolved |
| Existing Shana design may not reflect current requirements | Rework if design direction changes after review | Review against this memo before Dante meeting; surface gaps explicitly |
| Dedicated VM cost concern is segment-dependent | Inconsistent feedback by customer type; design must not assume one model | Provide optional isolation path, clearly documented as a tradeoff |
| Dante is out first two weeks of September | Decision bottleneck on Gateway + Azure PL scope | Front-load decision-forcing questions before Aug end |

---

## Assumptions (labeled - to be validated or killed)

| # | Assumption | Kill criteria | Review by |
|---|---|---|---|
| A1 | Both binary and Docker deployment options will be supported at GA | Engineering confirms binary-only or Docker-only | Before connections UI wireframe |
| A2 | Source IP preservation is a hard requirement | Engineering confirms logical identity is acceptable alternative | Before setup flow wireframe |
| A3 | HA/DR setup flow is in scope for Q3 design | Dante confirms HA/DR deferred past Q4 | Before journey map |
| A4 | WireGuard is the tunnel technology | IBM legal confirms WireGuard approval | Before implementation; does not block design |

---

## Band 8 Notes

> *These notes are private context - tracking how this work maps to promotion criteria.*

- **Business outcomes:** This analysis makes the business case explicit (adoption, market expansion, churn, support cost) where the source memo did not. Connecting design decisions to measurable signals is the Band 8 requirement.
- **Fail fast posture:** The "Design Decisions Required" section above documents the forks taken, not just open questions. Assumptions are labeled with explicit kill criteria - not left as ambiguous "to be discussed."
- **Courageous behavior:** Source IP and HA/DR are called as constraints now, even though they are technically open questions. That is a clear perspective communicated, not hedged.
- **Data-enabled decision making:** Business outcome signals (time-to-first-connection, support ticket volume, win/loss data) are named as forward metrics. When launch telemetry is available, these become the data layer for design validation.
