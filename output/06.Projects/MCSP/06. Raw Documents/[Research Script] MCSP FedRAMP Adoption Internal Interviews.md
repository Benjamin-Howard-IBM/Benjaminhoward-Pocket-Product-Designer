# [Research Script] MCSP FedRAMP: Internal Interview Discussion Guide

> Companion to: [Research Plan] MCSP FedRAMP Adoption Exploration
> Format: Semi-structured, moderated, 30-45 min, Microsoft Teams
> Audience: SE, SA, RTS, Support/SRE, Vault PM/Eng (N = 5-8)
> Purpose: Elicit federal Vault workload ranges, archetypes, scaling thresholds, and launch risks to feed D1-D5 and test H1-H5
> Owner: benjamin.howard@ibm.com
> Status: Draft

## How to use this guide

- This is a guide, not a checklist. Ask the questions that fit the participant's role and follow the signal. Skip what does not apply.
- Every quantitative answer is treated as upper-bound self-report. For each number, capture: the value (or range), the role giving it, the segment it applies to, and how the participant knows it (direct account exposure, secondhand, or estimate). This metadata drives telemetry anchoring and confidence scoring later.
- When a participant gives a single number, always ask for a range and a "biggest you have seen" so percentile thinking is possible.
- Do not lead toward the hypotheses. Ask neutrally, then probe.
- Target 30-45 min. Section time budgets are suggestions; prioritize Sections 3-5 if time is short, since they carry D1-D3.

### Capture template (fill per quantitative claim)

| Field | Value | Segment (DoD/Civilian/IC/FSI) | Role | Basis (direct/secondhand/estimate) | Confidence note |
|---|---|---|---|---|---|

## Pre-interview moderator checklist

- Confirm participant meets screening: direct federal account exposure in last 12 months; familiar with Vault Enterprise/self-managed in moderate-to-high compliance environments.
- Note participant role and which federal segments they cover, so you can weight role-specific sections.
- Have the confidence rubric and decision list (D1-D5) visible for your own coding.

---

## Section 0: Consent and framing (2-3 min)

> Verbal consent script. Read before recording.

"Thanks for making time. This is a 30-45 minute conversation to help us set launch service limits for the FedRAMP Vault offering on MCSP. I want your real-world view of how federal customers actually run Vault: how big, how busy, where it breaks. There are no wrong answers, and rough numbers are fine as long as you tell me how confident you are.

I would like to record this to keep my notes accurate. The recording stays internal, quotes and any account references will be anonymized, and nothing identifiable leaves approved IBM tooling. Is it OK to record?"

- [ ] Consent to record obtained
- [ ] Confirmed role and segment coverage

Framing question to warm up:
- In one or two sentences, what federal Vault accounts have you worked with most closely in the last year, and in what capacity?

---

## Section 1: Role and segment context (3-5 min)

Goal: establish whose reality we are capturing and which segment each later number maps to.

1. Which federal segments do you touch most: DoD/DOW, civilian agencies, the IC, or systems integrators (FSIs)? Where is your view strongest vs. secondhand?
2. For those accounts, is Vault mostly self-managed/on-prem today, HCP commercial, or a mix? (We expect mostly self-managed given no FedRAMP SaaS exists yet.)
3. When you picture a "typical" federal Vault deployment you support, is there one account that sits in your head as the example? Keep that one in mind; I may ask you to describe it concretely.

Moderator note: anchor later ranges to named (anonymized) accounts where possible. "Account A" descriptions are more codeable than generic averages.

---

## Section 2: Deployment shape and topology (4-6 min) -> D1, D5

Goal: understand cluster counts, isolation expectations, and network reality that bound the limit envelope.

1. For a representative federal account, how many separate Vault clusters do they run, and why that many? What forces a new cluster rather than more capacity in an existing one? (Air-gapped enclaves like NIPR/SIPR/JWICS? Environment separation? Org boundaries?)
2. What isolation level do these customers accept: shared nodes with namespace separation, dedicated nodes on shared control plane, or fully dedicated clusters? Where does each segment land?
   - Probe: which is the floor they will not go below for production?
3. How many environments (dev/test/staging/prod) does a single account typically stand up, and do those run at comparable scale or is prod the only heavy one?
4. For connectivity, are these customers reachable over private networking (PrivateLink-style), public with IP allow-listing, or strictly air-gapped? Roughly what mix?

Listen for: signals that map to tier count (H5) and to D5 launch blockers (air-gap, dedicated-cluster mandates).

---

## Section 3: Workload sizing - the core numbers (8-12 min) -> D1, tests H1, H2, H5

Goal: realistic ranges for the load-bearing dimensions. Push for low / typical / high every time.

For the representative account(s), get ranges (not single points). Use the capture template per answer.

1. Human users
   - How many human users authenticate to Vault? Give me low, typical, and the largest you have seen.
   - Roughly how often do humans log in (per day), and is it steady or bursty (e.g., start of shift)?
2. Machines, apps, and services
   - How many applications, services, or machines authenticate to Vault? Low / typical / high.
   - What is the ratio of machine identities to human users in these environments, as best you can tell? (Do not suggest a number; let them answer.)
3. Authentication rate
   - At peak, how many auth operations per second/minute do you think Vault handles? If they cannot say, ask: how many machines x how often does each re-auth or renew?
   - What drives the spikes: token TTL/renewal, batch jobs, CI/CD pipelines, autoscaling events, cert rotation?
4. Secrets and namespaces
   - Roughly how many secrets, secret paths, or KV entries live in a typical cluster? Low / typical / high.
   - How many namespaces does a large account carve out, and what drives that count?
5. Concurrency and throughput
   - At busy times, how many concurrent clients/connections are active? Any sense of requests per second?
6. Distribution across accounts
   - Thinking across all the federal accounts you know: do a few large accounts dominate the load, or is it fairly even? If you ranked them, would the top handful be far bigger than the rest? (Tests H2 without leading.)
7. Growth
   - How fast does a federal account's Vault usage grow once in production: roughly flat, steady, or step-changes when new programs onboard? Over 12 months, how much larger?

Moderator note: H1 (machine-heavy, >=5:1 machine:human) and H2 (top 20% drive >=50% of load) are tested here. Capture the raw ratio and distribution language; do not validate or reject in the room.

---

## Section 4: Pressure points and failure modes (6-9 min) -> D2, D3, D4, tests H3

Goal: where capacity actually breaks, and what resource saturates first.

1. When a federal Vault cluster gets slow or unstable, what is the usual cause? Walk me through the last real incident you remember.
2. In your experience, what runs out first under load: memory, CPU, network, storage I/O, or something else? (Tests H3. Ask neutrally; do not suggest memory.)
3. Which Vault features or usage patterns are the heaviest on resources? (Probe specifics seen in this market: PKI issuance, KMIP, dynamic secrets/DB creds, transit, high renewal rates, auto-unseal/HSM.)
4. Are there specific operations that cause customer-impacting events - rotations, large batch auth, seal/unseal, upgrades, snapshot/restore?
5. What early-warning signals do you or the customer watch that say "add capacity soon"? Is there a metric or threshold people actually use?
6. When capacity runs out, what is the right response in your view: scale the existing cluster up, add nodes, or stand up a new cluster? When is each appropriate? (Directly feeds D3.)
7. For storage specifically on a containerized/OpenShift deployment, do you foresee performance concerns with persistent volumes vs. today's direct EC2/VM disk? (Grounds the Vault-on-OpenShift risk from the runtime RFC.)

Listen for: a threshold language ("we add a node around X") usable as D2 guardrail input, and the CPU-vs-RAM ordering for H3.

---

## Section 5: SLA, reliability, and DR expectations (4-6 min) -> D4, D5

Goal: reliability bar by segment and what counts as a launch blocker.

1. What availability do these customers expect or contractually require from Vault? Does it differ by segment? (HCP targets 99.95%; MCSP metering is 99.5%. Do not anchor; let them state it.)
2. What disaster recovery posture is the minimum they will accept: backup/restore, active/passive warm standby, or active/active? Which segment demands which?
   - Probe DoD: is Continuity of Operations (COOP) / near-instant failover in scope?
3. What RTO/RPO numbers, if any, show up in their requirements or RFPs?
4. Is a single-region GovCloud deployment acceptable at launch, or is multi-region/cross-region failover a hard requirement for some segments? (Grounds the single-region MCSP GovCloud constraint.)
5. What would make a customer say "this managed offering is a downgrade from what we run ourselves"? (Surfaces D5 launch blockers.)

---

## Section 6: FedRAMP and operating constraints (3-5 min) -> D5

Goal: launch-critical constraints tied to the FedRAMP boundary and personnel model.

1. Beyond the cert itself, what operating constraints do these customers impose that affect how we size or run the service: U.S. Persons access, HSM/FIPS requirements, air-gap, data residency?
2. For BYOK/key management: how often do these customers require a hardware HSM vs. accepting cloud KMS? Which segments insist on HSM?
3. Are there features that are non-negotiable table stakes for federal that commercial customers rarely ask for? (PKI, KMIP, password manager, etc.)
4. What is the one constraint you think we are most likely to underestimate going into launch?

---

## Section 7: RFP/RFI reality check (2-3 min) -> tests H4, supports D1/D4

Ask of SE/SA/RTS who see procurement documents.

1. When you compare what an RFP/RFI says a customer needs versus what they actually run in production, how do they line up? Do stated numbers tend to overshoot, undershoot, or match real usage?
2. Specifically on peak auth rate or load: is the live peak usually higher or lower than the RFP-stated figure, and by roughly how much? (Tests H4; capture direction and magnitude.)
3. Are there SLA or constraint clauses in these RFPs that we should treat as hard launch requirements?

---

## Section 8: Archetypes and tiers (3-4 min) -> D1, D5, tests H5

Goal: let the participant cluster the market in their own words before we model it.

1. If you had to sort federal Vault customers into a few buckets by size and intensity, what buckets would you use and what defines each?
2. Would a single one-size limit work, or do we need distinct tiers? If tiers, how many, and what separates a small from a large? (Tests H5. Ask neutrally.)
3. Where would the representative account you described at the start fall in your own buckets?

---

## Section 9: Wrap and confidence (2-3 min)

1. Of everything you told me, which numbers are you most confident in, and which were closer to an educated guess? (Directly informs confidence tagging.)
2. Is there a colleague or an account I should look at to confirm any of this?
3. Anything I did not ask that would change how we set launch limits?

Close: "This is exactly what I needed. We will anchor these ranges against telemetry before anything becomes a recommendation, and your input stays anonymized. Thank you."

---

## Role-weighting cheat sheet

Prioritize these sections per role when time is tight.

| Role | Lead with | Lighter touch |
|---|---|---|
| Solutions Engineer (SE) | 3, 4, 7 | 5, 6 |
| Solutions Architect (SA) | 2, 4, 5 | 7 |
| Resident Technical Strategist (RTS) | 6, 8, 5 | 3 details |
| Support / SRE | 4, 3, 5 | 7, 8 |
| Vault PM / Eng | 4, 3, 8 | 6, 7 |

## Question-to-objective-to-decision-to-hypothesis trace

| Section | Objective served | Decision | Hypothesis |
|---|---|---|---|
| 2 Topology | Archetypes; launch risks | D1, D5 | H5 |
| 3 Sizing | Quantify workload ranges; archetypes | D1 | H1, H2, H5 |
| 4 Pressure/failure | Scaling thresholds; SLA | D2, D3, D4 | H3 |
| 5 SLA/DR | SLA/reliability by segment; risks | D4, D5 | - |
| 6 FedRAMP constraints | Launch risks and dependencies | D5 | - |
| 7 RFP/RFI check | Validate/reject assumptions | D1, D4 | H4 |
| 8 Archetypes/tiers | Identify archetypes -> tiers | D1, D5 | H5 |

## Probes and traps to keep handy

- Always convert a single number into a range: "low, typical, and the biggest you have seen."
- Always capture segment and basis with each number; an unattributed number cannot be telemetry-anchored.
- For ratios (H1) and distributions (H2), never state the threshold; let the participant produce the figure, then probe.
- For H3, do not say "memory"; ask what saturates first.
- For H4, get both direction and rough magnitude of the RFP-vs-reality gap.
- Flag any place where say-vs-do may diverge so telemetry can be the tie-breaker.
- Park anything that is really a product-requirements opinion (e.g., desired roadmap features) under open questions; this study is about limits and load, not feature prioritization.

## Notes capture and handoff

- Tag every quantitative claim with the capture template fields so coding against the workload-dimension codebook (users, machines, apps, auth rate, concurrency, throughput, secrets) is mechanical.
- Mark each claim provisional until telemetry anchoring; no claim leaves this stage above Medium confidence without behavioral corroboration.
- Record segment-level sample size as you go, so small-N segment claims are labeled directional in the readout.
