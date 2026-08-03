# Project

## What is Pocket Product Designer (PPD)

PPD is a personal scaffold Benjamin built to run structured product design work end-to-end. It is not a product with external users - it is a personal productivity system.

The pipeline it implements:

```
Frame -> Map -> Design -> Ship
```

Which translates into a concrete artifact chain:

```
Transcript -> Meeting Notes -> Strategy -> Journey Map -> PDRs -> Storybook -> Showcase HTML
```

Everything in this repo is either source/reference material or generated output under `output/`. MCSP is the first live project running inside it.

---

## Active project: Vault on MCSP (FedRAMP)

### What it is

A managed, FedRAMP-compliant Vault offering running on IBM's Multi-Cloud SaaS Platform (MCSP). MCSP is IBM's application platform built on OpenShift (hub-and-spoke architecture across AWS, Azure, IBM Cloud). HashiCorp was acquired by IBM, creating an opportunity to migrate HCP products onto MCSP.

Vault on MCSP is distinct from HCP Vault. The FedRAMP release is more constrained than a planned commercial release - for example, log/metric streaming is CloudWatch-only at launch, and production clusters are private-only via AWS PrivateLink.

### Why it matters

FedRAMP certification is the non-negotiable prerequisite for the federal SaaS market. Without it, no federal agency will use a cloud Vault offering. The goal is to get to FedRAMP Moderate at minimum (viable for most civilian agencies), with FedRAMP High as the target for broad DoD adoption.

### Main goals and objectives

- Ship a FedRAMP-ready managed Vault offering with credible, defensible service limits (decisions D1-D5)
- Define launch capacity tiers, sizing guardrails, and scaling policies grounded in real federal workload behavior
- Ship the product UI - designs have been submitted; ongoing design work continues
- Resolve open design problems such as the shared PrivateLink endpoint issue (current shared endpoint creates a security edge case; unique-endpoint-per-cluster redesign is the longer-term fix)

### Key decisions being driven (D1-D5)

| Decision | What it covers |
|---|---|
| D1 | Initial MCSP Vault limit envelope by customer tier (connections, users, apps, throughput, secrets) |
| D2 | Default cluster sizing and guardrail thresholds (CPU / RAM / network) |
| D3 | Scale response policy (add capacity vs new cluster vs disallow) |
| D4 | SLA and reliability expectations by segment at launch |
| D5 | Launch blockers vs post-launch backlog dependencies |

### Key stakeholders

| Person | Role |
|---|---|
| Benjamin Howard | Product Designer - solo, owns research and UI design end-to-end |
| Sara Snowden | Senior Product Manager - collaborator and accountable for exec sign-off |
| TJ Koines | Design - handed off the Vault on MCSP FedRAMP UI to Benjamin |
| Jeff Mitchell | Approver on the MCSP Discovery Meta-RFC |
| Cameron Etezadi | Approver on the MCSP Discovery Meta-RFC |
| Harini | Manager, PrivateLink engineering team (India) |
| Shivali | Team lead, PrivateLink engineering team |
| Sean | Engineering contact for PrivateLink scoping |
| Tim Silk | Manager, Public Sector Pre-Sales Engineering (research participant) |
| Tim Olson | Solutions Engineer, Public Sector (research participant) |

### Federal customer segments

| Segment | Key notes |
|---|---|
| Civilian agencies (FAA, IRS, CIS) | FedRAMP Moderate sufficient; slower adoption cycles; strong SaaS candidates |
| DoD / DoW | FedRAMP High required for most production; NIPR/SIPR/JWICS air-gapping; PKI and KMIP heavy users |
| Intelligence Community (IC) | Highest requirements (IL-5, TSSCI+); use FedRAMP High for low-side dev / ATO validation only |
| Federal Systems Integrators (FSIs) | Lockheed Martin, Raytheon, Leidos; mirror their government customers' requirements |

### Important research findings (to date)

- Human Vault logins are very low: ~3-5 typical, up to ~10-15 for large mature accounts. Vault is accessed via API/SSO, not direct human login.
- Machine/app auth is dominant: hundreds typical (~300-500), thousands at peak for DoW/IC events.
- Namespaces: ~2-3 typical, 12+ for large mature accounts. Secrets engines: ~2-6, starting with KV then SSH.
- FedRAMP is the absolute #1 blocker - its absence is the only reason federal customers don't use cloud Vault today.
- HSM integration is near-universal for DoD/IC (FIPS 140-2/3 compliance).
- Tiered isolation is required: shared-node, single-tenant node, and dedicated cluster options are all needed.
- Data from RFIs is sparse and coarse - sizing signals are static headcount, not dynamic load. Telemetry must anchor any workload claim before it enters a launch decision.

### Key modules / workflows in this repo

| Folder | What lives there |
|---|---|
| `output/06.Projects/MCSP/01. Meetings/` | Meeting summaries |
| `output/06.Projects/MCSP/02. Strategy/` | Strategy docs, research plan, RFI analysis, journey maps |
| `output/06.Projects/MCSP/03. PDRS/` | Product Design Records |
| `output/06.Projects/MCSP/04. Wireframes/` | Wireframes |
| `output/06.Projects/MCSP/05. Showcases/` | Showcase HTML artifacts |
| `output/06.Projects/MCSP/07. Research/` | Research session findings |
| `output/06.Projects/MCSP/06. Raw Documents/RFI/` | Federal RFI source documents |
| `storybook/stories/` | Storybook component stories |
| `showcase/` | Vite-built standalone HTML showcases |
| `templates/` | PPD artifact templates |

### Open design problems

- **Shared PrivateLink endpoint:** All clusters currently share one endpoint service; deleting a principal from one cluster does not remove it if it is on another. Short-term fix: warning on delete. Long-term fix: unique endpoint per cluster. Benjamin owns this redesign. Pending Sean/Harini confirmation on whether it lands before or after GA.
- **Duplicate test cluster (branch/merge model):** Concept to spin up a test cluster, make changes, then merge - raised by Sara and Benjamin. Front-end heavy; direction Sara intends to pursue.
- **Monitoring depth:** FedRAMP is CloudWatch-only at launch. Only an external link out to CloudWatch is currently viable. Richer monitoring deferred to commercial release.
