# [Research Plan] MCSP: FedRAMP Adoption Exploration

> Summary: A triangulated study (internal SE/SA/RTS/Support interviews, product telemetry, and RFP/RFI demand signals) that produces confidence-scored launch service limits, sizing guardrails, and scaling policies for MCSP FedRAMP Vault, to support executive sign-off on D1-D5.
> Created: May 26, 2026 Last updated: May 28, 2026
> Status: In-Review
> Product: Vault on MCSP
> Owner: benjamin.howard@ibm.com
> Contributors: Sara Snowden (Sr Product Manager)

## Problem

MCSP needs to launch a FedRAMP-ready managed Vault offering with credible, defensible service limits, but current evidence on federal workload behavior is incomplete and fragmented. Without validated data on usage patterns, scale thresholds, and operational constraints, the team risks setting limits that either under-serve high-demand customers or over-provision costly infrastructure, creating launch, reliability, and commercial risk.

## Research Objective

This research will generate decision-grade evidence to define MCSP Vault launch limits, sizing guardrails, and scaling policies for federal customer segments by triangulating internal interviews (5-8), RFP/RFI demand signals, and available telemetry into confidence-scored recommendations. Because the study relies on internal interviews rather than direct federal-customer interviews, every workload range is anchored against telemetry before it enters a recommendation, and claims that cannot be corroborated by telemetry are capped at Medium confidence.

Key Research Objectives

- Quantify realistic workload ranges for federal Vault use (users, machines, apps, auth rate, concurrency, throughput).
- Identify distinct federal usage archetypes and map them to launch capacity tiers.
- Define threshold-based scaling guidance (when to add capacity vs create new clusters).
- Validate or reject current anecdotal assumptions with traceable evidence and confidence levels.
- Surface launch-critical risks, dependencies, and mitigation actions tied to FedRAMP operating constraints.
- Provide a clear recommendation matrix that supports executive sign-off on initial service limits.

Decision Scope

- D1: Initial MCSP Vault limit envelope by customer tier (connections, users, apps, throughput, secrets).
- D2: Default cluster sizing and guardrail thresholds (CPU/RAM/network).
- D3: Scale response policy (add capacity vs new cluster vs disallow).
- D4: SLA and reliability expectations by segment at launch.
- D5: Launch blockers vs post-launch backlog dependencies.

## Research Methodology

To accomplish the objectives outlined above, a mixed method (qualitative and quantitative) research approach will be utilized involving internal interviews, telemetry validation, and RFP/RFI extraction.

- Internal Interviews: Semi-structured interviews with SE/SA/RTS/Support for deployment patterns and failure modes and to validate the reality of workloads, behavior, and scaling through moderated interviews.
  - Participants: N = 5-8
  - Platform: Microsoft Teams
  - Duration: 30-45 minutes
  - Roles: Solutions Engineers (SE), Solutions Architects (SA), Resident Technical Strategists (RTS), Support/SRE handling self-managed federal accounts, Product PM/Eng for Vault capacity behavior
  - Recruiting: Sourced through the Vault field and support org leads; aim for coverage across all five roles and across the named federal segments (DoD, civilian, contractors). Scheduling window: 2 weeks.
  - Sampling rationale: 5-8 internal interviews provide role and segment coverage for directional archetypes. Internal estimates are treated as upper-bound self-report and confirmed against telemetry before use.
- Telemetry validation: Use available analytics through Sigma to anchor ranges and detect possible outliers.
  - Pre-check (gating, Week 1): Confirm Sigma access, that the dataset covers federal/self-managed accounts, that it contains the required fields (per-cluster CPU/RAM/network utilization, auth rate, concurrency, throughput, secret counts), and that querying federal customer telemetry is permissible under the FedRAMP boundary and data-handling rules.
  - Fallback: If resource-utilization fields are absent or access is blocked, D2 and D3 ship at Low confidence and are flagged as post-launch measurement dependencies.
  - Expected output: Directional distributions and percentile bands where feasible.
- RFP (Request for Proposal)/RFI (Request for Information): Extract explicit and inferred demand, SLA language, and constraint clauses.
  - Expected output: Structured dataset with confidence tags per field.

## Key research questions

- What are realistic ranges for machines/apps, human logins, machine auth rates, and peak concurrency?
- How do patterns differ by federal segment (DoD, civilian, contractors) and maturity?
- Which workload signatures most strongly drive memory and compute pressure?
- Which operational thresholds trigger customer-impacting events?
- What confidence level can be assigned to each input?
- How well do RFP/RFI demand signals predict production usage?

## Hypotheses to test

- H1: Federal workloads are machine-heavy and drive sustained auth/load pressure. Reject if machine-to-human auth ratio is below 5:1 in a majority of profiles.
- H2: A small number of high-scale organizations drive disproportionate capacity demand. Reject if the top 20% of accounts do not account for at least 50% of modeled load.
- H3: Memory pressure is an earlier bottleneck than CPU for many profiles. Reject if CPU saturation precedes RAM saturation in a majority of telemetry profiles.
- H4: RFP/RFI values understate dynamic load and require adjustment factors. Reject if live peak auth rate does not exceed RFP/RFI-stated rate by at least 20% in a majority of matched cases.
- H5: One global limit set is too coarse; at least three launch tiers are needed. Reject if a single tier covers the p10-p90 workload band without over-provisioning the median by more than 2x.

## Screening Criteria

- For internal participants: direct federal account exposure in the last 12 months.
- Coverage across SE, SA, RTS, and Support/SRE roles.
- Familiar with public sector Vault Enterprise/self-managed deployments in moderate to high compliance environments.
- Able to provide quantitative estimates for users, machines, apps, auth load, and growth.

## Confidence scoring

Every input that feeds a D1-D5 recommendation is tagged with a confidence level using this rubric.

| Level | Criteria |
|---|---|
| High | Corroborated by two or more independent sources including telemetry (behavioral); telemetry sample adequate; say-vs-do agree. |
| Medium | Single strong source, or multiple self-report sources that agree but lack telemetry confirmation; limited sample. |
| Low | Single self-report source (interview or RFP/RFI) with no behavioral corroboration, or conflicting signals unresolved. |

Rule: when telemetry and self-report disagree, prefer telemetry and flag the gap. No D1-D5 recommendation ships above the confidence of its weakest load-bearing input.

## Analysis and synthesis plan

- Qualitative (interviews): Transcribe sessions and code against a shared codebook organized by workload dimension (users, machines, apps, auth rate, concurrency, throughput), segment, and failure mode. Two passes: open coding on the first 2-3 transcripts to seed the codebook, then consistent coding across the remainder. Capture every quantitative estimate with its source role and segment for later telemetry anchoring.
- Quantitative (telemetry): Compute percentile bands (p10/p50/p90) per workload dimension and per segment where sample size allows. Flag outliers and note sample size next to each band so confidence can be assigned.
- RFP/RFI extraction: Pull explicit and inferred demand, SLA terms, and constraint clauses into a structured dataset with one row per field and a confidence tag per field.
- Triangulation and reconciliation: For each workload dimension, compare the interview range, telemetry band, and RFP/RFI signal. When sources agree, assign confidence per the rubric. When they disagree, prefer behavioral telemetry, record the discrepancy and the adjustment factor applied, and lower the confidence tag accordingly. Self-reported and RFP/RFI numbers are treated as upper-bound claims requiring behavioral corroboration before entering the tier matrix.
- Synthesis to decisions: Cluster reconciled profiles into 3-5 archetypes, map archetypes to candidate tiers, and populate the sizing/scaling decision table with trigger thresholds. Each cell carries a confidence tag and a source trace.

## Bias mitigation

- Internal interview estimates carry recency and deal-positivity bias; anchor every self-reported range against telemetry before it enters the tier matrix.
- RFP/RFI figures carry procurement optimism/inflation bias (H4); treat them as upper-bound claims requiring behavioral corroboration.
- Both biases push estimates in the same optimistic direction, risking over-provisioned defaults or unrealistic SLAs. Telemetry is the tie-breaker in all conflicts.

## Objective-to-method-to-decision traceability

| Objective | Primary method | Supporting method | Decisions | Coverage risk |
|---|---|---|---|---|
| Quantify workload ranges | Telemetry (percentiles) | Interviews, RFP/RFI | D1 | Telemetry field/coverage gap |
| Identify archetypes -> tiers | Interviews | Telemetry clustering | D1, D5 | Small N per segment |
| Scaling thresholds | Telemetry (resource series) | Interviews | D2, D3 | Needs CPU/RAM/auth metrics |
| Validate/reject assumptions | Triangulation | All | D1-D4 | Confidence rubric required |
| Launch risks/dependencies | Interviews | RFP/RFI constraints | D5 | FedRAMP constraint capture |
| SLA/reliability by segment | Interviews + telemetry | RFP/RFI SLA clauses | D4 | Self-report vs behavioral gap |

## Timeline and milestones

| Week | Milestone |
|---|---|
| 1 | Telemetry/compliance pre-check complete; recruiting started; interview guide and codebook drafted |
| 2-3 | Internal interviews conducted; RFP/RFI extraction underway |
| 4 | Interview coding, telemetry percentile analysis, RFP/RFI dataset complete |
| 5 | Triangulation and reconciliation; archetype model and tier matrix drafted |
| 6 | Executive readout with decision asks for D1-D5; post-launch backlog finalized |

## Roles (RACI)

| Activity | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Study design and plan | Owner (B. Howard) | Owner | PM (S. Snowden) | Vault PM/Eng |
| Recruiting | Owner | Owner | Field/Support leads | Participants |
| Interview moderation and notes | Owner | Owner | - | - |
| Telemetry analysis | Owner | Owner | Data/Eng | PM |
| Synthesis and tier matrix | Owner | Owner | PM, Vault Eng | Stakeholders |
| Executive readout | Owner | PM | Vault Eng | Exec sponsors |

## Ethics and consent

- Obtain verbal consent at the start of each interview; state purpose, recording, and how notes will be used.
- Handle any federal customer data within the FedRAMP boundary and per IBM data-handling policy; do not export identifiable customer telemetry outside approved tooling.
- Anonymize quotes and account references in all shared outputs.

## Limitations

- Reliance on internal interviews means workload ranges are secondhand self-report, anchored to telemetry rather than gathered directly from federal customers.
- Telemetry coverage of federal/self-managed accounts and the presence of resource-utilization fields are not yet confirmed (see Week 1 pre-check); D2/D3 confidence depends on the outcome.
- Small per-segment sample sizes may limit segment-differentiated claims to directional rather than precise.

## Success criteria

- Every D1-D5 recommendation carries a confidence tag and a source trace.
- Each hypothesis is confirmed or rejected against its stated threshold.
- Executive sponsors can sign off on the launch limit envelope, or the readout names the specific evidence gaps blocking sign-off.

## Outputs and deliverables

- Workload archetype model (3-5 archetypes)
- Candidate launch tier matrix (limits, rationale, confidence)
- Sizing/scaling decision table with trigger thresholds
- Risk register with owners and mitigations
- Executive readout with decision asks for D1-D5
- Post-launch measurement backlog
