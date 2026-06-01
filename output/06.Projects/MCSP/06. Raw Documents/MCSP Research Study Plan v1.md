# MCSP Research Study Plan v1

## 1) Concise context summary

- MCSP Vault is being built as the FedRAMP-first managed Vault offering on IBM MCSP (OpenShift/Kubernetes/AWS), with HCP/HVD as the current commercial baseline.
- Core unresolved decision area: setting defensible service limits (connections, secrets, throughput, sizing) without over- or under-provisioning.
- Known data gap: target segment (federal/public sector, mostly self-managed today) has sparse telemetry; Sigma data is partial and may be view-only.
- Strategic pressure: FedRAMP timeline and revenue goals are aggressive, while several roadmap assumptions are anecdotal and need technical validation.
- Operational risk drivers include multi-layer platform constraints, memory-heavy Vault secret engine behavior, unclear scale policy, and potential UX/platform mismatch.

## 2) Research objectives and key decisions

### Research objectives

1. Quantify federal customer usage patterns relevant to MCSP Vault capacity planning.
2. Build reliable usage archetypes for FedRAMP target segments.
3. Translate usage patterns into limit, sizing, and scaling policy recommendations.
4. Reduce uncertainty in launch-critical assumptions currently marked anecdotal.

### Decisions this study must enable

- D1: Initial MCSP Vault limit envelope by customer tier (connections, users, apps, throughput, secrets).
- D2: Default cluster sizing and guardrail thresholds (CPU/RAM/network).
- D3: Scale response policy (add capacity vs new cluster vs disallow).
- D4: SLA and reliability expectations by segment at launch.
- D5: Launch blockers vs post-launch backlog dependencies.
- D6: Evidence threshold for FedRAMP planning sign-off.

## 3) Primary research questions and hypotheses

### Primary questions

1. What are realistic ranges for machines/apps, human logins, machine auth rates, and peak concurrency?
2. How do patterns differ by federal segment (DoD, civilian, contractors) and maturity?
3. Which workload signatures most strongly drive memory and compute pressure?
4. Which operational thresholds trigger customer-impacting events?
5. Which procurement artifacts are credible proxies for production demand?
6. What confidence level can be assigned to each input?

### Initial hypotheses

- H1: Mature federal deployments skew machine-heavy and increase sustained connection pressure.
- H2: A small number of high-scale organizations drive disproportionate capacity demand.
- H3: Memory pressure is an earlier bottleneck than CPU for many profiles.
- H4: RFP artifacts understate dynamic load; adjustment factors are required.
- H5: One global limit set is too coarse; at least three launch tiers are needed.

## 4) Participant plan

### Segments and roles

#### External

- Federal Vault platform owner/admin
- Federal security architect or IAM lead
- Application platform/SRE operating Vault integrations
- Prime contractor technical lead

#### Internal

- Solutions Engineers (SE)
- Solutions Architects (SA)
- Resident Technical Strategists (RTS)
- Support/SRE handling self-managed federal accounts
- Product PM/Eng for Vault capacity behavior

### Screening criteria

- Public sector Vault Enterprise/self-managed exposure (or equivalent workload).
- Operates in moderate to high compliance environments.
- Can provide quantitative estimates for users, machines, apps, auth load, and growth.
- For internal participants, direct account exposure in last 12 months.

### Sample sizes

- External interviews: 8-12 participants across 6-8 organizations.
- Internal interviews: 12-15 participants.
- RFP/RFS corpus: 15-25 documents (minimum 10).
- Structured internal field survey: 30-50 account-level responses.
- Telemetry extraction: all accessible relevant Sigma cohorts.

## 5) Methodology (qual + quant)

### Stream A - Document forensics (RFP/RFS)

- Extract numeric workload signals and stated performance/security constraints.
- Rationale: fast path to segment-grounded proxies when direct telemetry is limited.

### Stream B - Internal expert interviews

- Semi-structured interviews with SE/SA/RTS/Support for deployment patterns and failure modes.
- Rationale: mitigates external recruitment risk and surfaces practical load edge cases.

### Stream C - External federal/contractor interviews

- Deep context on workload evolution, operations, and procurement reality.
- Rationale: validates whether internal proxies reflect federal behavior.

### Stream D - Quant validation (survey + Sigma)

- Structured account-level capture of key metrics and confidence ratings.
- Rationale: provides directional distributions and tiering confidence bands.

## 6) Discussion guide outline

### Interviews (45-60 min)

1. Role and environment context
2. Vault usage topology (human vs machine, integration count)
3. Load profile (average, peak, burst)
4. Growth trajectory (6-12 months)
5. Reliability and incidents (bottlenecks, degradation indicators)
6. Compliance and operational constraints
7. Procurement and limit expectations
8. Confidence in estimates and follow-up artifacts

### RFP/RFS extraction

- Agency type and mission profile
- Expected users, systems/apps, integrations
- Performance/SLA expectations
- Data sensitivity/compliance notes
- Environment constraints and staffing context
- Confidence tags: explicit numeric, inferred numeric, qualitative only

### Structured survey (15 min)

- Standard numeric prompts (range allowed)
- Workload maturity classification
- Incident/constraint checklist
- Confidence per response (1-5)
- Source type (observed vs estimated)

## 7) Data collection plan and metrics

### Collection infrastructure

- Controlled research tracker (metadata, consent, source quality)
- Standard extraction template for interviews and documents
- Interview note template with forced metric fields
- Evidence register linking recommendations to sources and confidence

### Core metric definitions

- Connected Machines: distinct machine identities/services authenticating in period.
- Integrated Apps/Services: unique active applications with Vault interactions.
- Human Active Users: distinct interactive users in period.
- Auth Request Rate: auth ops per second/minute (avg, p95, p99).
- Peak Concurrency: simultaneous active requests/sessions at peak.
- Secrets Throughput: secret read/write operation rate.
- Growth Rate: month-over-month change across key volumes.
- Memory Pressure Proxy: workload conditions correlated with elevated memory use.
- Scale Trigger Threshold: boundary where policy shifts to add capacity/new cluster.

## 8) Analysis plan

### Coding framework

- Workload pattern: human-heavy, machine-heavy, hybrid
- Scale profile: low, medium, high, bursty
- Risk signal: reliability, compliance, operability, telemetry gap
- Constraint source: platform, product, process, staffing
- Evidence strength: measured, estimate, anecdote

### Quantitative synthesis

- Segment-level distributions for key metrics
- Percentile bands where feasible (P50/P75/P90)
- Documented adjustment factors for low-confidence inputs

### Triangulation approach

- Each key parameter requires at least two independent evidence types.
- Conflict resolution sequence: source quality ranking, follow-up validation, explicit risk flag.

## 9) Timeline (8 weeks)

- Week 1: charter, decision matrix, security/legal constraints, templates.
- Week 2: Sigma scope confirmation, RFP corpus start, internal recruitment.
- Week 3: internal interview wave 1, ongoing extraction, interim findings v0.1.
- Week 4: complete internal interviews, launch survey, begin external scheduling.
- Week 5: external wave 1, preliminary synthesis, checkpoint #1 tier model.
- Week 6: external wave 2, triangulation complete, draft recommendations.
- Week 7: cross-functional review, risk register update, checkpoint #2 sign-off.
- Week 8: final readout and roadmap conversion.

## 10) Risks, assumptions, mitigations

### Key risks

- External participant recruitment delays
- Sigma/telemetry incompleteness and export constraints
- Anecdotal strategy claims not yet engineering-validated
- Conflicting estimates across sources

### Assumptions

- A1: MCSP FedRAMP telemetry is incomplete at present.
- A2: RFP artifacts are accessible in sufficient volume.
- A3: Internal field teams can provide account-level proxy metrics.
- A4: Sanitized/aggregated data use is feasible without CUI/PII exposure.

### Mitigations

- Stage evidence thresholds (launch-ready vs follow-up required)
- Confidence labels on every recommendation
- Use proxy sources when direct access lags
- Pre-approve secure handling and redaction process

## 11) Ethics, privacy, and security

- Collect minimum necessary data and avoid sensitive classes unless approved.
- Use informed consent language appropriate to government/compliance contexts.
- Restrict repository access by least privilege.
- Prefer sanitized notes and remove org identifiers for broad sharing.
- Define retention/deletion schedule before collection starts.
- Keep evidence auditable and avoid unsupported assertions.

## 12) Readout plan

### Artifacts

1. Research brief + decision matrix
2. Participant matrix and recruitment log
3. RFP extraction dataset and schema
4. Interview synthesis report
5. Capacity archetypes
6. Limit recommendation matrix with confidence scores
7. Risk register with owners
8. Executive summary for leadership

### Decision checkpoints

- Checkpoint 1 (Week 5): provisional tier model and missing-data plan
- Checkpoint 2 (Week 7): launch limit envelope and scaling policy
- Checkpoint 3 (Week 8): conversion to product roadmap artifacts

### Stakeholder cadence

- Weekly 30-minute core sync
- Bi-weekly leadership update
- End-of-phase 90-minute readout workshop

## 13) Immediate next steps (first 2 weeks)

### Week 1 backlog

- Create decision log template and confidence rubric.
- Lock metric definitions and scale-trigger terminology.
- Finalize interview guides and extraction schema.
- Confirm legal/security review for outreach and note handling.
- Submit and track all access requests.

### Week 2 backlog

- Build target list of 15-25 RFP/RFS documents.
- Complete first five extractions.
- Conduct four to six internal pilot interviews.
- Launch internal structured survey.
- Publish interim memo with early ranges, evidence gaps, and risks.
