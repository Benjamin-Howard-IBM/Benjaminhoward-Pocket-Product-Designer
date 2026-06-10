# [Research Script] MCSP FedRAMP Adoption - Internal Interviews

> Moderator's discussion guide for semi-structured internal interviews
> Companion to: [Research Plan] MCSP FedRAMP Adoption Exploration
> Format: 30-45 min, Microsoft Teams, moderated, recorded with consent
> Audience: SE, SA, RTS, Support/SRE, Vault PM/Eng. N = 5-8
> Owner: benjamin.howard@ibm.com
> Status: Draft for fielding

## How to use this guide

This guide elicits federal Vault workload ranges, usage archetypes, scaling thresholds, SLA/DR expectations, and launch risks. It feeds executive sign-off on D1-D5. It does not produce decisions on its own; every number captured here is upper-bound self-report that gets anchored to telemetry before it enters the tier matrix.

Three rules for the moderator:

1. Let the participant produce every number before you react. Never state a hypothesis threshold or a target value. The hypotheses are listed in an appendix the participant never sees.
2. Capture each quantitative answer in the per-claim block (below) with segment, role, basis, and a confidence note. A range with no segment or basis is not usable.
3. Probe the gap between what customers say and what they run. When an estimate sounds like a deal figure or an RFP number, ask for the behavioral version: what did the customer actually run, and how do you know.

Timeboxes are targets for a 35-minute median session. Cut from the lowest-priority section for the participant's role (see role-weighting cheat sheet) rather than rushing consent or the workload core.

## Per-claim capture template

Fill one block for every quantitative answer. Keep it terse; you can complete it from the recording later, but capture segment and basis live because they are hard to reconstruct.

```text
Claim: <metric and value/range, e.g., "machine auth ~2,000-5,000/min peak">
Segment: DoD | Civilian | IC | FSI | mixed/unknown
Role of source: SE | SA | RTS | Support/SRE | PM/Eng
Basis: direct (operated/measured it) | secondhand (customer told me) | estimate (inferred)
Confidence note: <sample size, recency, any say-vs-do flag, "deal/RFP-derived?" yes/no>
```

Basis and the say-vs-do flag matter most. "Direct" plus a behavioral source is the only path to High confidence later; "estimate" or "RFP-derived" is capped lower and must be telemetry-anchored before use.

## Role-weighting cheat sheet

Prioritize the high-weight sections per role. If you are short on time, cut low-weight sections, not consent or the workload core.

| Section | SE | SA | RTS | Support/SRE | PM/Eng |
|---|---|---|---|---|---|
| 2 Warm-up / exposure | Med | Med | Med | Med | Med |
| 3 Workload composition (users/machines/apps) | High | High | High | High | Med |
| 4 Auth load, concurrency, pressure drivers | High | High | Med | High | High |
| 5 Scaling thresholds / failure events | Med | High | Med | High | High |
| 6 Segment archetypes and grouping | High | High | High | Med | Med |
| 7 SLA / DR / reliability expectations | Med | High | High | High | High |
| 8 Launch risks and dependencies | Med | High | High | High | High |
| 9 RFP/RFI vs production reality | High | Med | High | Low | Low |

Guidance: SE/RTS are strongest on what customers ask for and what they actually run (sections 3, 6, 9). SA and PM/Eng are strongest on sizing, thresholds, and platform limits (sections 4, 5, 7, 8). Support/SRE are strongest on failure events and reliability reality (sections 5, 7, 8).

## Section-to-objective-to-decision-to-hypothesis traceability

| Section | Plan objective | Decision(s) | Hypothesis(es) |
|---|---|---|---|
| 2 Warm-up / exposure | Screening, segment coverage | (gates all) | - |
| 3 Workload composition | Quantify workload ranges; identify archetypes | D1 | H1, H2 |
| 4 Auth load, concurrency, pressure drivers | Quantify ranges; which signatures drive pressure | D1, D2 | H1, H3 |
| 5 Scaling thresholds / failure events | Threshold-based scaling guidance | D2, D3 | H3, H5 |
| 6 Segment archetypes and grouping | Archetypes -> tiers; launch dependencies | D1, D5 | H2, H5 |
| 7 SLA / DR / reliability expectations | SLA/reliability by segment | D4 | - |
| 8 Launch risks and dependencies | Launch-critical risks tied to FedRAMP constraints | D5 | - |
| 9 RFP/RFI vs production reality | How well RFP/RFI predicts production | D1, D4 | H4 |

Coverage check: D1 (3,4,6,9), D2 (4,5), D3 (5), D4 (7,9), D5 (6,8). H1 (3,4), H2 (3,6), H3 (4,5), H4 (9), H5 (5,6). All five decisions and all five hypotheses are covered.

---

## Section 1: Consent and framing script (2-3 min, verbatim)

Read this aloud. Do not paraphrase the recording, anonymization, or data-handling clauses.

"Thanks for making time. I'm running a short study to help set realistic launch limits and scaling policies for the FedRAMP Vault offering on MCSP. I want your real-world read on how federal customers actually use and scale Vault.

This is about 30 to 45 minutes. I'd like to record the session so I can focus on the conversation instead of typing. The recording and my notes are used only to synthesize patterns for this study. In anything I share out, your quotes and any account references are anonymized; no individual and no customer is named.

A data-handling note: please keep us to deployment patterns, behaviors, and rough numbers. Do not share identifiable federal customer data, classified specifics, or anything that would fall outside the FedRAMP boundary or IBM data-handling policy. If a question pushes you toward something sensitive, give me the shape of it without the identifying detail.

You can skip any question, ask me to stop recording, or end early, no problem. Anything I treat as a firm number I'll read back so you can correct it.

Is it okay to start recording?"

[Start recording only after a clear verbal yes. Then restate for the record:]

"Recording now. Can you confirm on the record that you consent to being recorded for this study under the terms I just described?"

---

## Section 2: Warm-up and exposure (3 min) - gates all decisions

Purpose: confirm screening (direct federal exposure in last 12 months) and set the segments this participant can speak to. Tag every later claim with the segment.

1. "In a sentence, what's your role and how you work with Vault in federal accounts?"
2. "Over roughly the last year, which federal customers or segments have you worked with directly? Think DoD, civilian agencies, the intelligence community, or systems integrators." [Confirm at least one with direct exposure. Note which segments are direct vs secondhand.]
3. "For the ones you'll talk about today, were you hands-on with the deployment, or going off what the customer told you?" [Sets default basis for the session.]

If the participant has no direct federal exposure in the last 12 months, note it and treat all their numbers as secondhand at best.

---

## Section 3: Workload composition - users, machines, apps (7 min) - D1; tests H1, H2

Purpose: get the raw composition of a federal Vault deployment so workload ranges and concentration can be modeled. Capture a per-claim block for each number.

Ask the counts separately and neutrally. Do not characterize the workload as machine-heavy or human-heavy; let the split fall out of their numbers.

1. "Pick a federal Vault deployment you know well. Roughly how many human users actually log in to it? Daily active, or total provisioned if that's easier, just tell me which." [Capture block.]
2. "Now separately, roughly how many machines, applications, services, or workloads authenticate to that same Vault? Again, your best read." [Capture block. Do not compute or mention any ratio aloud.]
3. "How did you arrive at those two numbers, did you see them in the system, or is it an estimate?" [Set basis on both claims.]
4. "How does that machine and app side break down, what's actually authenticating? Apps, CI/CD pipelines, Kubernetes workloads, Terraform runs, something else?" [Grounding probe: GitLab/Jenkins/Ansible/Terraform and Keycloak/OIDC are common in this space; let them name their own.]
5. "How many distinct applications or namespaces does one Vault typically serve?" [Capture block. Feeds D1 apps/secrets envelope.]

Concentration probe (tests H2 neutrally):

6. "Across the federal accounts you've seen, how concentrated is the demand? Are most accounts roughly the same size, or do a few accounts dwarf the rest?" [Open. Do not suggest any percentage.]
7. "If you think of your largest federal account against a typical one, how many times bigger is it, on users, machines, or load?" [Capture block; this gives the concentration shape for H2.]

---

## Section 4: Auth load, concurrency, and what saturates first (8 min) - D1, D2; tests H1, H3

Purpose: quantify auth rate, concurrency, and throughput, and learn which resource gives out first. This is load-bearing for sizing guardrails (D2). Keep the bottleneck question fully open.

1. "For a busy federal Vault, what does the authentication rate look like at peak, requests or logins per second or per minute? Your best read." [Capture block.]
2. "Is that load steady, or spiky? What causes the spikes, scheduled jobs, token renewals, a deployment window?" [Token TTL / renewal storms and batch jobs are common drivers; let them surface it.]
3. "What's driving most of that machine load in the deployments you know, what Vault features? For example dynamic database or cloud credentials, PKI certificate issuance, SSH CA, KMIP, transit." [Grounding probe. Background shows PKI very prevalent in DoD, KMIP for storage integrations, dynamic secrets via Terraform. Let them rank their own.]
4. "Of those, which one generates the most requests or the most load, in your experience?" [Capture block. Feeds D1/D2 load drivers.]
5. "Peak concurrency, how many clients or connections hitting Vault at the same time at the busy moment?" [Capture block.]

Bottleneck probe (tests H3 neutrally - do not say "memory"):

6. "When one of these federal Vault clusters starts to struggle under load, what runs out first? What's the thing you watch or that pages someone?" [Fully open. Let them name CPU, RAM, network, storage IOPS, file descriptors, whatever it is. Do not prompt a resource.]
7. "How sure are you that's the first thing, did you watch it happen, or is that the general assumption on the team?" [Set basis. Note say-vs-do: assumption vs observed.]
8. [If they run Vault containerized or on Kubernetes/OpenShift:] "In a container or OpenShift deployment, does storage performance, the persistent volume, ever become the limiter before compute does?" [Grounding probe: background flags Vault-on-OpenShift persistent-storage performance as a concern. Capture block if they have a read.]

---

## Section 5: Scaling thresholds and customer-impacting events (7 min) - D2, D3; tests H3, H5

Purpose: find the operational thresholds that trigger trouble and what the right response is (add capacity, new cluster, or hold). Feeds guardrails (D2) and scale policy (D3).

1. "Think of a time a federal Vault deployment hit a wall or had a customer-impacting event under load. What happened, and what was the trigger?" [Capture block: the threshold metric and value if they have it.]
2. "Was there an early warning signal before it became customer-impacting? At what level did you start worrying?" [Capture block: the guardrail threshold for D2.]
3. "When a customer outgrows their setup, what's the right move in your experience, add resources to the existing cluster, stand up a separate cluster, or tell them to split the workload?" [D3. Let them weigh it.]
4. "Is there a point where you'd say one cluster shouldn't go past, a ceiling where you'd insist on a second cluster regardless?" [Capture block. Grounding: MCSP recommends a max of ~500 worker nodes per Hypershift cluster; do not state this number, but if they raise a node or cluster ceiling, probe how they'd shard across clusters.]
5. "Have you seen a single Vault cluster comfortably serve very different customer sizes, or does one configuration start to break down across the range?" [Tests H5 neutrally: probes whether one limit set spans the workload band. Do not mention tiers or any multiple.]

---

## Section 6: Segment archetypes and grouping (6 min) - D1, D5; tests H2, H5

Purpose: get the participant's own grouping of federal customers, which becomes the archetype-to-tier model. Keep the number of groups open (tests H5).

1. "If you had to sort the federal Vault customers you know into a few distinct groups by how they use and scale Vault, how many groups would you draw, and what separates them?" [Do not suggest a number. Capture the boundaries they name.]
2. "What puts a customer in the largest or most demanding group versus a modest one, is it user count, machine load, isolation needs, compliance level?" [Let them define the axis.]
3. "How do the segments differ on isolation? Some customers share infrastructure, others demand a fully dedicated cluster." [Grounding: background describes multi-tenant node, single-tenant node, and dedicated-cluster tiers; DoD/IC often require dedicated. Map segment to isolation expectation. D1/D5.]
4. "Where does HSM and FIPS come in across these groups, who treats hardware-backed keys and FIPS as non-negotiable versus optional?" [Grounding: HSM reportedly required in the large majority of DoD/IC cases; cloud KMS sufficient for many civilian. Affects which tier a segment can use. Capture block.]
5. "For air-gapped or multi-enclave customers, the separate NIPR, SIPR, JWICS networks, how does that change the number and size of Vault clusters they need?" [Grounding: air-gapped enclaves drive multiple isolated clusters. D5 dependency.]
6. "Does the demand concentration you mentioned earlier line up with these groups, is the heavy load coming from one group in particular?" [Reconnects to H2 with the archetypes in view.]

---

## Section 7: SLA, DR, and reliability expectations (5 min) - D4

Purpose: capture what federal customers expect for availability and disaster recovery by segment, to set D4 launch SLA.

1. "What availability do federal customers actually expect from a managed Vault, and does it differ by segment?" [Capture block. Do not state any SLA number; let them produce it.]
2. "Vault tends to be a Tier 0 dependency. For DR, what's the minimum a federal customer will accept, backup and restore, warm standby in another region, or hot-hot active-active?" [Grounding: background says active/passive is the minimum acceptable standard; active/active is the COOP ideal for DoD. Let them place the bar. D4.]
3. "What recovery time and data-loss window do they expect after a region or zone failure?" [Capture block: RTO/RPO expectations. D4.]
4. "The managed platform will start single-region in GovCloud. How big a problem is single-region for the segments you work with, and who pushes back hardest?" [Grounding: MCSP runs in one GovCloud region; single-region breaks the usual multi-region DR story. D4/D5 tension. Capture block.]
5. [If PM/Eng or SRE:] "If the managed offering launched at a meaningfully lower availability target than the current self-managed or HCP experience, where would that bite first?" [Grounding: MCSP metering service is 99.5% vs HCP 99.95%; do not state the figures. Surfaces D4 risk.]

---

## Section 8: Launch risks and dependencies (5 min) - D5

Purpose: separate true launch blockers from post-launch backlog, tied to FedRAMP and MCSP constraints.

1. "If we launched managed FedRAMP Vault in the next couple of quarters, what's the one thing most likely to make a federal customer walk away on day one?" [D5 blocker. Capture.]
2. "What can a federal customer live without at launch and accept on a roadmap, versus what has to be there or the deal is dead?" [Splits blocker vs backlog. D5.]
3. "On the platform side, what worries you, container security for Vault, persistent storage performance, the cluster node ceiling, identity and provisioning gaps like SCIM or claims federation?" [Grounding: background flags Vault-on-OpenShift container/storage concerns, the ~500-node Hypershift cap, and MCSP IAM gaps. Let them prioritize. D5.]
4. "Anything about how customers connect, private link, multi-cloud, Azure presence, or air-gapped reach, that becomes a blocker for your segment?" [Grounding: AWS PrivateLink start, ~50/50 Azure/AWS in DoD, air-gapped enclaves. D5.]
5. "If you could anchor one of today's numbers to real telemetry before we set a limit, which number do you least trust right now?" [Surfaces where the participant's own confidence is lowest; flags for telemetry anchoring.]

---

## Section 9: RFP/RFI versus production reality (4 min) - D1, D4; tests H4

Purpose: learn how well stated procurement demand predicts real production load. This directly tests whether RFP/RFI figures need an adjustment factor (H4). Keep direction and magnitude open.

1. "When a federal customer states sizing or load in an RFP or RFI, how does that compare to what they actually run once in production?" [Open. Do not suggest a direction or a percentage. Capture block.]
2. "Which way does it usually go, and by roughly how much?" [Capture block: direction and magnitude for H4. Let them produce the number.]
3. "What's behind the gap, in your view, padding for procurement, growth they planned for, or genuine surprise once it's live?" [Explains the say-vs-do gap.]
4. "When you've had both the stated figure and the real measured figure, which did you trust, and why?" [Reinforces telemetry-as-tie-breaker; flags whether their RFP numbers are behaviorally corroborated.]

---

## Section 10: Wrap-up (2 min)

1. "Anything about federal Vault scale, reliability, or launch risk I should have asked and didn't?"
2. "Of everything we covered, which one number or claim would you most want validated before we bet a launch limit on it?"
3. [Read back the 2-3 firmest numbers you captured.] "Did I get these right?"

"That's everything. Thanks. To repeat, your input is anonymized in anything I share, and the recording is only used to synthesize patterns for this study. I'll stop the recording now."

[Stop recording.]

---

## Moderator notes: bias mitigation in the moment

- Internal estimates carry recency and deal-positivity bias. When a number sounds like the last big deal or a best case, ask: "Is that a typical account, or your largest?" and "Did you watch that, or is it the customer's claim?"
- RFP/RFI figures carry procurement inflation bias. Treat every RFP-derived number as upper-bound; tag it in the confidence note and route it to Section 9 logic.
- Both biases push the same optimistic direction, so the default failure mode is over-provisioned defaults and unrealistic SLAs. Telemetry is the tie-breaker; the interview's job is to produce candidate ranges and flag the say-vs-do gaps, not to settle them.
- No claim leaves this interview above Medium confidence on its own. High confidence requires telemetry corroboration during synthesis.

## Appendix: hypotheses under test (moderator only, never read aloud)

Do not state any of these thresholds in a question. They exist so you can probe in the right direction after the participant gives a number.

- H1: Federal workloads are machine-heavy and drive sustained auth/load pressure. (Probed in 3-4 by asking human and machine counts separately; never name a ratio.)
- H2: A small number of high-scale organizations drive disproportionate capacity demand. (Probed in 3, 6 via concentration questions; never name a percentage.)
- H3: Memory pressure is an earlier bottleneck than CPU for many profiles. (Probed in 4-5 by asking what saturates first; never say "memory.")
- H4: RFP/RFI values understate dynamic load and require adjustment factors. (Probed in 9 by asking stated vs actual; never name a direction or percentage.)
- H5: One global limit set is too coarse; at least three launch tiers are needed. (Probed in 5-6 by asking how many groups and whether one config spans the range; never name a tier count.)

## Appendix: grounding facts for moderator probes (reference, not to be read)

- Isolation tiers: multi-tenant node (cost-driven, civilian non-sensitive), single-tenant node (the common "sweet spot"), dedicated cluster (mandatory for IC and most sensitive DoD).
- HSM/FIPS: hardware-backed keys and FIPS 140-2/3 required in the large majority of DoD/IC cases; cloud KMS sufficient for many civilian.
- Load drivers: PKI highly prevalent in DoD (~80-90% of some portfolios), KMIP ~50% of DoD for storage integrations, dynamic secrets common via Terraform/database/SSH CA.
- Air-gapped enclaves: NIPR/SIPR/JWICS drive multiple isolated clusters per customer.
- Platform constraints: MCSP recommends max ~500 worker nodes per Hypershift cluster (multi-cluster sharding needed at scale); Vault-on-OpenShift needs container-security and persistent-storage performance work; MCSP IAM gaps include SCIM and limited claims federation.
- Reliability: single GovCloud region (AWS GovCloud us-gov-east) at launch; MCSP metering 99.5% SLA vs HCP 99.95%; active/passive DR is the stated minimum acceptable, active/active is the COOP ideal for DoD.
