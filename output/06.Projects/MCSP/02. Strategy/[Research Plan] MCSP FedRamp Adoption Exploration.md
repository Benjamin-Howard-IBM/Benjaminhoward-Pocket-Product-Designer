# [Research Plan] MCSP: FedRAMP Adoption Exploration

> Summary: This document outlines a comprehensive research study plan to provide critical insights to the infrastructure of
> Created: May 26, 2026 Last updated: May 28, 2026
> Status: WIP | In-Review | Approved | Obsolete
> Product: Vault on MCSP
> Owner: benjamin.howard@ibm.com
> Contributors: Sara Snowden (Sr Product Manager)

## Problem

MCSP needs to launch a FedRAMP-ready managed Vault offering with credible, defensible service limits, but current evidence on federal workload behavior is incomplete and fragmented. Without validated data on usage patterns, scale thresholds, and operational constraints, the team risks setting limits that either under-serve high-demand customers or over-provision costly infrastructure, creating launch, reliability, and commercial risk.

## Research Objective

This research will generate decision-grade evidence to define MCSP Vault launch limits, sizing guardrails, and scaling policies for federal customer segments by triangulating external interviews (5-8), RFP/RFS demand signals, and available telemetry into confidence-scored recommendations.

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

Research Methodology

To accomplish the objectives outlined above, a mixed method (qualitative and quantitative) research approach will be utilized involving internal interviews and telemetry validation.

- Internal Interviews: Semi-structured interviews with SE/SA/RTS/Support for deployment patterns and failure modes and to validate reality of workloads, behavior, and scaling through moderated interviews.
  - Participants: N= 3-5
  - Platform: Microsoft Teams
  - Duration: 30-45 minutes
  - Roles: Solutions Engineers (SE), Solutions Architects (SA), Resident Technical Strategists (RTS), Support/SRE handling self-managed federal accounts, Product PM/Eng for Vault capacity behavior
- Telemetry validation: Use available analytics through sigma to anchor ranges and detect possible outliers.
  - Expected output: Directional distributions and percentile bands where feasible.
- RFP (Request for Proposal)/RFI (Request for Information): Extraction explicit and inferred demand, SLA language and constraint clauses
  - Expected output: Structed dataset with confidence tags per field.

Key research questions

- What are realistic ranges for machines/apps, human logins, machine auth rates, and peak concurrency?
- How do patterns differ by federal segment (DoD, civilian, contractors) and maturity?
- Which workload signatures most strongly drive memory and compute pressure?
- Which operational thresholds trigger customer-impacting events?
- What confidence level can be assigned to each input?
- How well do RFP/RFI demand signals predict production usage?

Hypotheses to test

- H1: Federal workloads are predominantly machine-heavy and drive sustained auth/load pressure.
- H2: A small number of high-scale organizations drive disproportionate capacity demand.
- H3: Memory pressure is an earlier bottleneck than CPU for many profiles.
- H4: RFP artifacts understate dynamic load; adjustment factors are required.
- H5: One global limit set is too coarse; at least three launch tiers are needed.
- H6: RFP/RFS values require adjustment factors to represent live operational load.

Screening Criteria

- Public sector Vault Enterprise/self-managed exposure (or equivalent workload).
- Operates in moderate to high compliance environments.
- Can provide quantitative estimates for users, machines, apps, auth load, and growth.
- For internal participants, direct account exposure in the last 12 months.

Outputs and deliverables

- Workload archetype model (3-5 archetypes)
- Candidate launch tier matrix (limits, rationale, confidence)
- Sizing/scaling decision table with trigger thresholds
- Risk register with owners and mitigations
- Executive readout with decision asks for D1-D5
- Post-launch measurement backlog
