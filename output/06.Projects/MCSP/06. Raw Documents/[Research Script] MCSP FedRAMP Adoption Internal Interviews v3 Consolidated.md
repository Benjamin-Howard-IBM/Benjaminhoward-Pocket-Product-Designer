# [Research Script] MCSP FedRAMP Adoption - Internal Interviews (v3 Consolidated)

> Moderator's discussion guide for semi-structured internal interviews
> Companion to: [Research Plan] MCSP FedRAMP Adoption Exploration
> Supersedes: v1 (main thread) and v2 (ResearchAgent). Use this one for fielding.
> Format: 30-45 min, Microsoft Teams, moderated, recorded with consent
> Audience: SE, SA, RTS, Support/SRE, Vault PM/Eng. N = 5-8
> Owner: benjamin.howard@ibm.com
> Status: Draft for fielding

## What changed in v3 and why

Prior SE interviews are already synthesized in `Briefing Document Synthesis of Interviews for Vault Premium`. That work settled the qualitative landscape: segment characteristics, the three isolation tiers, HSM/FIPS prevalence, DR posture expectations, connectivity/air-gap reality, and feature prevalence. Re-asking those as open discovery wastes a 30-45 minute session.

v3 does two things:

1. Spends the session on the quantitative core the plan needs and telemetry can anchor: workload counts, auth rate, concurrency, throughput, secrets, scaling thresholds, SLA/RTO/RPO, demand concentration, growth, and RFP-vs-production gaps.
2. Keeps only the grounding items as fast confirmation probes, because new participants are being interviewed and their accounts may differ from the prior sample. A confirmation probe states the known finding and asks "true for your accounts, and what is the number?" It does not re-discover the qualitative fact.

Everything captured here is upper-bound self-report. No number enters the tier matrix until anchored to telemetry; no D1-D5 recommendation ships above the confidence of its weakest load-bearing input.

## How to use this guide

Three rules for the moderator:

1. Let the participant produce every number before you react. Never state a hypothesis threshold or a target value. Hypotheses live in a moderator-only appendix the participant never sees.
2. Capture each quantitative answer in the per-claim block with segment, role, basis, and a confidence note. A range with no segment or basis is not usable.
3. Probe the gap between what customers say and what they run. When an estimate sounds like a deal figure or an RFP number, ask for the behavioral version: what did the customer actually run, and how do you know.

Timeboxes target a 35-minute median. Confirmation probes are deliberately short; if a participant has nothing to add beyond the known finding, accept "matches what you described" and move on. Cut from the lowest-weight section for the role (see cheat sheet) before trimming the workload core.

## Per-claim capture template

Fill one block for every quantitative answer. Capture segment and basis live; they are hard to reconstruct later.

```text
Claim: <metric and value/range, e.g., "machine auth ~2,000-5,000/min peak">
Segment: DoD | Civilian | IC | FSI | mixed/unknown
Role of source: SE | SA | RTS | Support/SRE | PM/Eng
Basis: direct (operated/measured it) | secondhand (customer told me) | estimate (inferred)
Confidence note: <sample size, recency, say-vs-do flag, "deal/RFP-derived?" yes/no>
```

"Direct" plus a behavioral source is the only path to High confidence later. "Estimate" or "RFP-derived" is capped lower and must be telemetry-anchored before use.

## Role-weighting cheat sheet

| Section | SE | SA | RTS | Support/SRE | PM/Eng |
|---|---|---|---|---|---|
| 2 Warm-up / exposure | Med | Med | Med | Med | Med |
| 3 Workload composition (users/machines/apps/secrets) | High | High | High | High | Med |
| 4 Auth load, concurrency, load drivers | High | High | Med | High | High |
| 5 Scaling thresholds / failure events | Med | High | Med | High | High |
| 6 Archetypes, concentration, growth | High | High | High | Med | Med |
| 7 SLA / DR / reliability (quantitative) | Med | High | High | High | High |
| 8 Launch risks and dependencies | Med | High | High | High | High |
| 9 RFP/RFI vs production reality | High | Med | High | Low | Low |

SE/RTS are strongest on what customers ask for vs run (3, 6, 9). SA and PM/Eng are strongest on sizing, thresholds, platform limits (4, 5, 7, 8). Support/SRE are strongest on failure events and reliability reality (5, 7, 8).

## Section-to-objective-to-decision-to-hypothesis traceability

| Section | Plan objective | Decision(s) | Hypothesis(es) |
|---|---|---|---|
| 2 Warm-up / exposure | Screening, segment coverage | (gates all) | - |
| 3 Workload composition | Quantify workload ranges; archetypes | D1 | H1, H2 |
| 4 Auth load and drivers | Quantify ranges; which signatures drive pressure | D1, D2 | H1, H3 |
| 5 Scaling thresholds / failure | Threshold-based scaling guidance | D2, D3 | H3, H5 |
| 6 Archetypes, concentration, growth | Archetypes -> tiers; launch dependencies | D1, D5 | H2, H5 |
| 7 SLA / DR / reliability | SLA/reliability by segment | D4 | - |
| 8 Launch risks and dependencies | Launch-critical risks tied to FedRAMP constraints | D5 | - |
| 9 RFP/RFI vs production | How well RFP/RFI predicts production | D1, D4 | H4 |

Coverage check: D1 (3,4,6,9), D2 (4,5), D3 (5), D4 (7), D5 (6,8). H1 (3,4), H2 (3,6), H3 (4,5), H4 (9), H5 (5,6). All five decisions and all five hypotheses covered.

---

## Section 1: Consent and framing script (2-3 min, verbatim)

Read aloud. Do not paraphrase the recording, anonymization, or data-handling clauses.

"Thanks for making time. I'm running a short study to set realistic launch limits and scaling policies for the FedRAMP Vault offering on MCSP. We already have a good qualitative picture of the federal market from earlier interviews. Today I'm after the numbers: how big these deployments get, how hard they get hit, and where they break.

This is about 30 to 45 minutes. I'd like to record so I can focus on the conversation instead of typing. The recording and my notes are used only to synthesize patterns for this study. In anything I share out, your quotes and any account references are anonymized; no individual and no customer is named.

A data-handling note: keep us to deployment patterns, behaviors, and rough numbers. Do not share identifiable federal customer data, classified specifics, or anything outside the FedRAMP boundary or IBM data-handling policy. If a question pushes toward something sensitive, give me the shape of it without the identifying detail.

You can skip any question, ask me to stop recording, or end early. Anything I treat as a firm number I'll read back so you can correct it.

Is it okay to start recording?"

[Start recording only after a clear verbal yes, then:]

"Recording now. Can you confirm on the record that you consent to being recorded for this study under the terms I just described?"

---

## Section 2: Warm-up and exposure (2-3 min) - gates all decisions

Confirm screening (direct federal exposure in last 12 months) and set the segments this participant can speak to. Tag every later claim with the segment.

1. "In a sentence, what's your role and how you work with Vault in federal accounts?"
2. "Over roughly the last year, which federal segments have you worked with directly - DoD, civilian agencies, the intelligence community, or systems integrators? Which are direct vs secondhand?"
3. "For the accounts you'll talk about today, were you hands-on with the deployment, or going off what the customer told you?" [Sets default basis for the session.]

If no direct federal exposure in the last 12 months, note it and treat all numbers as secondhand at best.

---

## Section 3: Workload composition - users, machines, apps, secrets (8 min) - D1; tests H1, H2

Get the raw composition so workload ranges and concentration can be modeled. Ask counts separately and neutrally; do not characterize the workload as machine-heavy or human-heavy. Capture a per-claim block per number.

1. "Pick a federal Vault deployment you know well. Roughly how many human users actually log in - daily active, or total provisioned if that's easier? Tell me which." [Capture block. Get low / typical / largest seen.]
2. "Separately, roughly how many machines, applications, services, or workloads authenticate to that same Vault? Your best read." [Capture block. Do not compute or mention any ratio aloud. Get low / typical / high.]
3. "How did you arrive at those two numbers - saw them in the system, or estimate?" [Set basis on both claims.]
4. "How many secrets, secret paths, or KV entries live in a typical cluster, and how many namespaces does a large account carve out?" [Capture block. Feeds D1 secrets/namespace envelope. Get low / typical / high.]

Grounding confirmation probe (prior work: CI/CD and orchestration dominate the machine side - GitLab/Jenkins/Ansible/Terraform, Kubernetes, Keycloak/OIDC):
5. "On the machine side, what's actually authenticating in your accounts - does that CI/CD and Kubernetes picture hold, or is the mix different?" [Short. Capture only deltas from the known picture.]

Concentration probe (tests H2 neutrally):
6. "Across the federal accounts you've seen, how concentrated is demand - are most accounts roughly the same size, or do a few dwarf the rest?" [Open. Do not suggest any percentage.]
7. "Your largest federal account vs a typical one - how many times bigger on users, machines, or load?" [Capture block; gives the concentration shape for H2.]

---

## Section 4: Auth load, concurrency, and what saturates first (8 min) - D1, D2; tests H1, H3

Quantify auth rate, concurrency, throughput, and learn which resource gives out first. Load-bearing for sizing guardrails (D2). Keep the bottleneck question fully open.

1. "For a busy federal Vault, what's the authentication rate at peak - requests or logins per second or per minute? Best read." [Capture block.]
2. "Is that load steady or spiky? What causes the spikes - scheduled jobs, token renewals, a deployment window, autoscaling?" [Capture block on peak multiple over baseline if they have it.]
3. "Peak concurrency - how many clients or connections hitting Vault at the same time at the busy moment? Any sense of requests per second sustained?" [Capture block.]

Grounding confirmation probe (prior work: PKI very prevalent in DoD ~80-90%, KMIP ~50% of DoD, dynamic secrets common via Terraform/DB/SSH CA):
4. "Of the heavy features - PKI issuance, KMIP, dynamic database or cloud credentials, transit, SSH CA - which one drives the most requests or load in your accounts?" [Capture block. Confirms which prevalent feature is the load driver, not just present.]

Bottleneck probe (tests H3 neutrally - do not say "memory"):
5. "When one of these clusters starts to struggle under load, what runs out first - the thing you watch or that pages someone?" [Fully open. Let them name CPU, RAM, network, storage IOPS, file descriptors. Do not prompt a resource.]
6. "How sure are you that's first - did you watch it happen, or is it the team's general assumption?" [Set basis. Flag say-vs-do: assumed vs observed.]
7. [If containerized / OpenShift:] "In a container or OpenShift deployment, does persistent-volume storage performance ever become the limiter before compute does?" [Grounding: Vault-on-OpenShift persistent-storage performance is a flagged risk. Capture block if they have a read.]

---

## Section 5: Scaling thresholds and customer-impacting events (7 min) - D2, D3; tests H3, H5

Find the operational thresholds that trigger trouble and the right response. Feeds guardrails (D2) and scale policy (D3).

1. "Think of a time a federal Vault deployment hit a wall or had a customer-impacting event under load. What happened, and what was the trigger?" [Capture block: threshold metric and value if known.]
2. "Was there an early-warning signal before it became customer-impacting? At what level did you start worrying?" [Capture block: the guardrail threshold for D2.]
3. "When a customer outgrows their setup, what's the right move - add resources to the existing cluster, stand up a separate cluster, or split the workload?" [D3. Let them weigh it.]
4. "Is there a ceiling where you'd insist on a second cluster regardless of headroom?" [Capture block. Grounding: MCSP recommends a max of ~500 worker nodes per Hypershift cluster - do not state it, but if they raise a node or cluster ceiling, probe how they'd shard.]
5. "Have you seen one Vault configuration comfortably serve very different customer sizes, or does a single setup start to break down across the range?" [Tests H5 neutrally - probes whether one limit set spans the band. Do not mention tiers or any number.]

---

## Section 6: Archetypes, concentration, and growth (6 min) - D1, D5; tests H2, H5

Get the participant's own grouping of federal customers - the basis for the archetype-to-tier model - plus growth. Keep the number of groups open (tests H5).

1. "If you sorted the federal Vault customers you know into a few groups by how they use and scale Vault, how many groups would you draw, and what separates them?" [Do not suggest a number. Capture the boundaries.]
2. "What puts a customer in the most demanding group vs a modest one - user count, machine load, isolation needs, compliance level?" [Let them define the axis.]
3. "Does the heavy load concentrate in one group in particular?" [Reconnects H2 with archetypes in view.]
4. "How fast does a federal account's Vault usage grow once in production - roughly flat, steady, or step-changes when new programs onboard? Over 12 months, how much larger?" [Capture block: growth rate. Feeds headroom in D1/D2.]

Grounding confirmation probe (prior work: isolation tiers - multi-tenant node, single-tenant node "sweet spot," dedicated cluster mandatory for IC/sensitive DoD; HSM/FIPS required in the large majority of DoD/IC; air-gapped NIPR/SIPR/JWICS drive multiple isolated clusters):
5. "Quick confirmation on your accounts: does the isolation picture hold - dedicated clusters for the most sensitive, single-tenant nodes as the common case - and roughly how many separate clusters does an air-gapped customer end up running?" [Short on isolation tier (known); capture the cluster-count number, which is new.]

---

## Section 7: SLA, DR, and reliability - the numbers (5 min) - D4

Capture quantitative availability and recovery expectations by segment. Prior work established the DR posture ladder; here we want the figures.

1. "What availability do federal customers actually expect from a managed Vault, and does it differ by segment?" [Capture block. Do not state any SLA number; let them produce it.]
2. "What recovery time and data-loss window do they expect after a region or zone failure?" [Capture block: RTO/RPO. D4.]
3. "The managed platform starts single-region in GovCloud. How big a problem is single-region for your segments, and who pushes back hardest?" [Grounding: MCSP runs one GovCloud region; single-region breaks the usual multi-region DR story. Capture block. D4/D5.]
4. [If PM/Eng or SRE:] "If the managed offering launched at a meaningfully lower availability target than the current self-managed or HCP experience, where would that bite first?" [Grounding: MCSP metering 99.5% vs HCP 99.95%; do not state the figures. Surfaces D4 risk.]

Grounding confirmation probe (prior work: backup/restore insufficient, active/passive is the minimum, active/active is the COOP ideal for DoD):
5. "Quick confirmation: is active/passive warm standby still the floor for your accounts, with active/active expected for the DoD COOP cases?" [Short. Capture only deltas and any segment that demands more.]

---

## Section 8: Launch risks and dependencies (5 min) - D5

Separate true launch blockers from post-launch backlog, tied to FedRAMP and MCSP constraints.

1. "If we launched managed FedRAMP Vault in the next couple of quarters, what's the one thing most likely to make a federal customer walk away on day one?" [D5 blocker. Capture.]
2. "What can a federal customer live without at launch and accept on a roadmap, vs what has to be there or the deal is dead?" [Splits blocker vs backlog. D5.]
3. "On the platform side, what worries you - container security for Vault, persistent-storage performance, the cluster node ceiling, identity and provisioning gaps like SCIM or claims federation?" [Grounding: Vault-on-OpenShift container/storage concerns, ~500-node Hypershift cap, MCSP IAM gaps. Let them prioritize. D5.]
4. "If you could anchor one of today's numbers to real telemetry before we set a limit, which number do you least trust right now?" [Surfaces lowest-confidence input; flags for telemetry anchoring.]

Grounding confirmation probe (prior work: AWS PrivateLink start, ~50/50 Azure/AWS in DoD, air-gapped enclaves, HSM ~97% for DoD/IC):
5. "Quick confirmation: on connectivity and keys, does anything in your segment turn into a hard launch blocker - Azure parity, air-gapped reach, or HSM availability?" [Short. Capture only what rises to blocker status.]

---

## Section 9: RFP/RFI versus production reality (4 min) - D1, D4; tests H4

Learn how well stated procurement demand predicts real production load - tests whether RFP/RFI figures need an adjustment factor (H4). Keep direction and magnitude open.

1. "When a federal customer states sizing or load in an RFP or RFI, how does that compare to what they actually run in production?" [Open. Do not suggest direction or percentage. Capture block.]
2. "Which way does it usually go, and by roughly how much?" [Capture block: direction and magnitude for H4. Let them produce the number.]
3. "What's behind the gap - procurement padding, planned growth, or genuine surprise once live?" [Explains the say-vs-do gap.]
4. "When you've had both the stated figure and the real measured figure, which did you trust, and why?" [Reinforces telemetry-as-tie-breaker; flags whether RFP numbers are behaviorally corroborated.]

---

## Section 10: Wrap-up (2 min)

1. "Anything about federal Vault scale, reliability, or launch risk I should have asked and didn't?"
2. "Of everything we covered, which one number would you most want validated before we bet a launch limit on it?"
3. [Read back the 2-3 firmest numbers captured.] "Did I get these right?"

"That's everything. Thanks. Your input is anonymized in anything I share, and the recording is only used to synthesize patterns for this study. I'll stop the recording now."

[Stop recording.]

---

## Moderator notes: bias mitigation in the moment

- Internal estimates carry recency and deal-positivity bias. When a number sounds like the last big deal or a best case, ask: "Is that a typical account, or your largest?" and "Did you watch that, or is it the customer's claim?"
- RFP/RFI figures carry procurement inflation bias. Treat every RFP-derived number as upper-bound; tag it in the confidence note and route it to Section 9 logic.
- Both biases push the same optimistic direction, so the default failure mode is over-provisioned defaults and unrealistic SLAs. Telemetry is the tie-breaker; the interview produces candidate ranges and flags say-vs-do gaps, not settled numbers.
- No claim leaves this interview above Medium confidence on its own. High confidence requires telemetry corroboration during synthesis.

## Appendix: hypotheses under test (moderator only, never read aloud)

Do not state any threshold in a question. These let you probe in the right direction after the participant gives a number.

- H1: Federal workloads are machine-heavy and drive sustained auth/load pressure. (Probed in 3-4 by asking human and machine counts separately; never name a ratio.)
- H2: A small number of high-scale organizations drive disproportionate capacity demand. (Probed in 3, 6 via concentration questions; never name a percentage.)
- H3: Memory pressure is an earlier bottleneck than CPU for many profiles. (Probed in 4-5 by asking what saturates first; never say "memory.")
- H4: RFP/RFI values understate dynamic load and require adjustment factors. (Probed in 9 by asking stated vs actual; never name a direction or percentage.)
- H5: One global limit set is too coarse; at least three launch tiers are needed. (Probed in 5-6 by asking how many groups and whether one config spans the range; never name a tier count.)

## Appendix: grounding facts (moderator reference, not read aloud)

These are established by prior SE interviews (briefing doc) and the MCSP strategy/RFC docs. In v3 they appear only as short confirmation probes, since new participants may diverge. Confirm and quantify; do not re-discover.

- Segments: Civilian (FedRAMP Moderate, slower adoption, less in-house expertise), DoD/DOW (Moderate-to-High, NIPR/SIPR/JWICS air-gap, mission-critical), IC (above High - IL5/TS-SCI, self-hosted high-side), FSIs (mirror their agency customers).
- Isolation tiers: multi-tenant node (cost-driven, civilian non-sensitive), single-tenant node (common "sweet spot"), dedicated cluster (mandatory for IC and most sensitive DoD).
- HSM/FIPS: hardware-backed keys and FIPS 140-2/3 required in the large majority of DoD/IC cases (~97% cited); cloud KMS sufficient for many civilian.
- Load drivers: PKI highly prevalent in DoD (~80-90% of some portfolios), KMIP ~50% of DoD for storage integrations, dynamic secrets common via Terraform/database/SSH CA, static KV as the entry point.
- Connectivity: AWS PrivateLink viable start, ~50/50 Azure/AWS in DoD, air-gapped NIPR/SIPR/JWICS drive multiple isolated clusters per customer.
- DR: backup/restore insufficient ("downgrade"), active/passive warm standby is the minimum acceptable, active/active is the COOP ideal for DoD.
- Platform constraints: MCSP recommends max ~500 worker nodes per Hypershift cluster (multi-cluster sharding needed at scale); single GovCloud region (AWS GovCloud us-gov-east) at launch; Vault-on-OpenShift needs container-security and persistent-storage performance work; MCSP IAM gaps include SCIM and limited claims federation; MCSP metering 99.5% SLA vs HCP 99.95%.
- Tech stacks: AWS GovCloud/Azure Government; OpenShift/Rancher/EKS/AKS; Keycloak/OIDC/SAML/LDAP; GitLab/Jenkins/Ansible/Terraform.
