# MCSP Research Study Plan V2

## 1) Study context

- MCSP Vault needs FedRAMP-ready launch limits and scaling policy.
- Current planning inputs are mixed-confidence and partially anecdotal.
- The study must produce evidence strong enough for launch decisions under timeline and compliance constraints.

## 2) Problem statement

- MCSP must define defensible service limits (connections, secrets, throughput, sizing) for federal segments, but lacks validated demand and operational behavior data.
- Incorrect limits create two failure modes: customer-impacting under-capacity or cost-heavy over-capacity.

## 3) Research objective statement

- Build decision-grade, confidence-scored recommendations for launch limit tiers, sizing guardrails, and scaling triggers by triangulating external interviews, RFP/RFS analysis, and available telemetry.

## 4) Decision scope

- D1: Launch limit tiers by segment/archetype.
- D2: Default sizing guardrails (CPU, memory, throughput envelope).
- D3: Scale policy triggers (scale up vs new cluster).
- D4: Reliability envelope and explicit risk acceptance items.
- D5: Launch blockers vs post-launch follow-on backlog.

## 5) Key research questions

- What are realistic demand ranges for users, machine auth, apps/services, peak concurrency, and secrets throughput?
- Which federal workload patterns are distinct enough to require separate launch tiers?
- What thresholds signal customer-impacting performance degradation?
- How well do RFP/RFS demand signals predict production usage?
- Where is evidence high confidence vs medium/low confidence for launch decisions?

## 6) Hypotheses to test

- Federal workloads are predominantly machine-heavy and drive sustained auth/load pressure.
- A minority of high-scale organizations determines upper-tier capacity needs.
- Memory/secret-engine behavior is an earlier bottleneck than CPU for key profiles.
- RFP/RFS values require adjustment factors to represent live operational load.
- A single default limit policy is insufficient for launch.

## 7) Participant and evidence plan

- External interviews: 5-8 participants across 4-6 organizations.
- Internal interviews: none.
- RFP/RFS corpus: 20-30 docs target (minimum acceptable: 15).
- Telemetry/Sigma: include all accessible compliant datasets with quality tags.

### External screening criteria

- Direct Vault/platform operations in federal or contractor context.
- Ability to provide numeric estimates and growth trends.
- Recent operational exposure (last 12 months).

## 8) Methodology (3-stream mixed methods)

### Stream A - RFP/RFS forensics

- Extract explicit and inferred demand, SLA language, and constraint clauses.
- Output: structured dataset with confidence tags per field.

### Stream B - External interviews

- Validate workload reality, bursts, failure modes, and scaling behavior.
- Output: coded themes plus numeric estimate capture with confidence.

### Stream C - Telemetry validation

- Use available Sigma/analytics to anchor ranges and detect outliers.
- Output: directional distributions and percentile bands where feasible.

## 9) Data definitions and instrumentation

### Metric dictionary

- Connected Machines
- Integrated Apps/Services
- Active Human Users
- Auth Request Rate
- Peak Concurrency
- Secrets Throughput
- Growth Rate
- Scale Trigger Threshold

### Instrumentation artifacts

- RFP extraction sheet
- Interview capture template with forced numeric fields
- Evidence register (source, confidence, decision linkage)
- Assumptions and risk log

## 10) Analysis and triangulation rules

- Code qualitative data by workload pattern, scale profile, constraint source, and risk signal.
- Build segment-level ranges and candidate tier boundaries from combined evidence.
- Triangulation rule: each recommendation requires RFP/RFS evidence plus interview or telemetry corroboration.
- For conflicts: source quality ranking, targeted follow-up, then explicit confidence and mitigation annotation.

## 11) Outputs and deliverables

- Workload archetype model (3-5 archetypes)
- Candidate launch tier matrix (limits, rationale, confidence)
- Sizing/scaling decision table with trigger thresholds
- Risk register with owners and mitigations
- Executive readout with decision asks for D1-D5
- Post-launch measurement backlog

## 12) Timeline and milestones (7 weeks)

- Week 1: finalize charter, metric dictionary, templates, confidence rubric; begin recruitment and corpus assembly.
- Week 2: complete first 8-10 RFP extractions; run first 2-3 interviews; confirm telemetry scope.
- Week 3: reach 15+ RFP extractions; complete midpoint interview target; publish interim ranges and gaps memo.
- Week 4: complete 20-30 RFP target; finish interviews (5-8 total); draft archetypes and tier options.
- Week 5: telemetry triangulation and conflict resolution; checkpoint 1 on provisional tier model.
- Week 6: refine recommendations, risk acceptance options, and fallback policies; checkpoint 2 on launch envelope.
- Week 7: final readout and sign-off package; convert outcomes to implementation backlog.

## 13) Risks and mitigations

- External recruiting delay: begin Week 1, use contractor channels, over-recruit by 20%.
- Over-reliance on documents: enforce triangulation for key parameters.
- Telemetry gaps: confidence scoring plus conservative defaults and explicit follow-up plan.
- Timeline compression: phase-gate decisions (provisional Week 5, final Week 7).

## 14) FedRAMP/privacy/security constraints

- Collect minimum necessary data; avoid CUI/PII/PHI unless approved.
- Use approved storage/access controls only.
- De-identify interview and org-level notes for broad sharing.
- Ensure every recommendation links to auditable source evidence and confidence.

## 15) Immediate next steps (first 10 business days)

- Approve metric dictionary and confidence scale.
- Finalize screener and external interview guide.
- Build list of 30+ external prospects to achieve 5-8 completed interviews.
- Stand up RFP tracker and complete first five extractions.
- Confirm telemetry query owners and extraction timeline.
- Schedule Week 3 interim readout to protect decision cadence.
