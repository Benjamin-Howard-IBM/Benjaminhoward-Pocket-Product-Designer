# [Research Script] MCSP FedRAMP Adoption - Internal Interviews

**Summary:** Moderator's discussion guide for semi-structured internal interviews
**Companion to:** [Research Plan] MCSP FedRAMP Adoption Exploration
**Product:** Vault on MCSP
**Owner:** benjamin.howard@ibm.com
**Contributors:** Sara Snowden (Sr Product Manager)
**Created:** June 2, 2026
**Last updated:** June 2, 2026
**Status:** WIP | In-Review | Approved | Obsolete
**Source:** `06. Raw Documents/[Research Script] MCSP FedRAMP Adoption - Internal Interview.odt`

---

#### Problem

Vault is preparing to launch a FedRAMP ready version hosted on MCSP credible, defensible service limits, but current evidence on federal workload behavior is incomplete and fragmented. Without validated data on usage patterns, scale thresholds, and operational constraints, the team risks setting limits that either under-serve high-demand customers or over-provision costly infrastructure, creating launch, reliability, and commercial risk.

#### Research objective

This research will generate decision-grade evidence to define MCSP Vault launch limits, sizing guardrails, and scaling policies for federal customer segments by triangulating external interviews (5-8), RFP/RFS demand signals, and available telemetry into confidence-scored recommendations.
Key Research Objectives
- Quantify realistic workload ranges for federal Vault use (users, machines, apps, auth rate, concurrency, throughput).
- Identify distinct federal usage archetypes and map them to launch capacity tiers.
- Define threshold-based scaling guidance (when to add capacity vs create new clusters).
- Validate or reject current anecdotal assumptions with traceable evidence and confidence levels.
- Surface launch-critical risks, dependencies, and mitigation actions tied to FedRAMP operating constraints.
- Provide a clear recommendation matrix that supports executive sign-off on initial service limits.

#### How to use this guide

Three rules for the moderator:
- Let the participant produce every number before you react. Never state a hypothesis threshold or target value. Hypotheses live in a moderator-only appendix the participant never sees.
- Capture each quantitative answer in the per-claim block with segment, role, basis, and a confidence note. A range with no segment or basis is not usable.
- Probe the gap between what customers say and what they run. When an estimate sounds like a deal figure or RFP number, ask for the behavioral version: what did the customer actually run, and how do you know.
For every count, push for low / typical / largest-seen rather than a single point. Timeboxes target a 35-minute median.

#### Per-claim capture template

Claim: <metric and value/range, e.g., "machine auth ~2,000-5,000/min peak">
Segment: DoD | Civilian | IC | FSI | mixed/unknown
Role of source: SE | SA | RTS | Support/SRE | PM/Eng
Basis: direct (operated/measured it) | secondhand (customer told me) | estimate (inferred)
Confidence note: <sample size, recency, say-vs-do flag, "deal/RFP-derived?" yes/no>
"Direct" plus a behavioral source is the only path to High confidence later. "Estimate" or "RFP-derived" is capped lower and must be telemetry-anchored before use.

#### Role-weighting template

If short on time, drop the lowest-weight core questions for the role, not consent or the workload counts (Q1-Q4).

| Core question group | SE | SA | RTS | Support/SRE | PM/Eng |
|---|---|---|---|---|---|
| Q1-Q3 Composition (users/machines/secrets) | High | High | High | High | Med |
| Q4-Q5 Auth load and drivers | High | High | Med | High | High |
| Q6-Q8 Saturation and scaling | Med | High | Med | High | High |
| Q9-Q10 Concentration and growth | High | High | High | Med | Med |
| Q11 SLA / RTO / RPO | Med | High | High | High | High |
| Q12 RFP vs production | High | Med | High | Low | Low |
| Q13 Launch risk | Med | High | High | High | High |
| Q14 Archetypes | High | High | High | Med | Med |

### Question-to-decision-to-hypothesis traceability

| # | Decision(s) | Hypothesis(es) |
|---|---|---|
| 1 Human users | D1 | H1 |
| 2 Machines/apps | D1 | H1 |
| 3 Secrets/namespaces | D1 | - |
| 4 Peak auth rate + spikes | D1, D2 | H1 |
| 5 Heaviest load-driving feature | D1, D2 | - |
| 6 What saturates first | D2 | H3 |
| 7 Early-warning threshold | D2, D3 | H3 |
| 8 Add capacity vs new cluster + ceiling | D3 | H5 |
| 9 Demand concentration | D1 | H2 |
| 10 Growth over 12 months | D1, D2 | - |
| 11 Availability + RTO/RPO | D4 | - |
| 12 RFP/RFI vs production | D1, D4 | H4 |
| 13 Launch blocker + platform worry | D5 | - |
| 14 Archetype grouping | D1, D5 | H5 |

Coverage: D1 (1,2,3,4,9,12,14), D2 (4,5,6,7,10), D3 (7,8), D4 (11,12), D5 (13,14). H1 (1+2,4), H2 (9), H3 (6,7), H4 (12), H5 (8,14). All decisions and hypotheses covered.

#### Section 1: Consent and framing script (2-3 min)

Read aloud. Do not paraphrase the recording, anonymization, or data-handling clauses.
"Thanks for making time. I'm running a short study to set realistic launch limits and scaling policies for the FedRAMP Vault offering on MCSP. We already have a good qualitative picture of the federal market from earlier interviews. Today I'm after the numbers: how big these deployments get, how hard they get hit, and where they break.
This is about 30 to 45 minutes. I'd like to record so I can focus on the conversation instead of typing. The recording and my notes are used only to synthesize patterns for this study. In anything I share out, your quotes and any account references are anonymized; no individual and no customer is named.
A data-handling note: keep us to deployment patterns, behaviors, and rough numbers. Do not share identifiable federal customer data, classified specifics, or anything outside the FedRAMP boundary or IBM data-handling policy. If a question pushes toward something sensitive, give me the shape of it without the identifying detail.
You can skip any question, ask me to stop recording, or end early. Anything I treat as a firm number I'll read back so you can correct it.
Is it okay to start recording?"
[Start recording only after a clear verbal yes, then:]
"Recording now. Can you confirm on the record that you consent to being recorded for this study under the terms I just described?"

#### Section 2: Warm-up and exposure (2-3 mins) - gates all decisions

Confirm screening (direct federal exposure in last 12 months) and set the segments this participant can speak to. Tag every later claim with the segment.
- "In a sentence, what's your role and how you work with Vault in federal accounts?"
- "Over roughly the last year, which federal segments have you worked with directly - DoD, civilian agencies, the intelligence community, or systems integrators? Which are direct vs secondhand?"
- "For the accounts you'll talk about today, were you hands-on with the deployment, or going off what the customer told you?"
If no direct federal exposure in the last 12 months, note it and treat all numbers as secondhand at best.

#### Section 3: Core questions (25-30 mins)

Ask counts separately and neutrally. Do not characterize the workload as machine-heavy or human-heavy; do not name a ratio, percentage, resource, or tier count. Capture a per-claim block for every number.

#### Workload composition - D1; tests H1, H2 (LIKELY UNKNOWN)

Q1. "Pick a federal Vault deployment you know well. Roughly how many human users actually log in - daily active, or total provisioned if that's easier? Give me low, typical, and the largest you've seen." [D1, H1]
Q2. "Separately, roughly how many machines, applications, services, or workloads authenticate to that same Vault - low, typical, high?" [D1, H1. Do not compute or mention any ratio aloud. Pairing Q1 and Q2 yields the machine: human picture.]
Q3. "How many secrets entries live in a typical secrets engine, and how many namespaces does a large account carve out?" [D1] (Directional)

#### Auth load and drivers - D1, D2; tests H1, H3

Q4. "For a busy federal Vault, what's the authentication rate at peak - requests or logins per second or per minute? And is that load steady or spiky - what drives the spikes: scheduled jobs, token renewals, a deployment window, autoscaling?" [D1, D2, H1. Capture peak value and the peak-over-baseline multiple if they have it.] - If Spikey what secret engine
- Autho sides  50-90 per minute per hour high hundreds
- Spikes depand on expansion of information being transmitted.
Q5. "Of the heavy features - PKI issuance, KMIP, dynamic database or cloud credentials, transit, SSH CA - which one drives the most requests or load in your accounts?" [D1, D2. Confirms which prevalent feature is the load driver, not just present.] (secrets engine usage)
- Most with standdard valut capabilites

#### Saturation and scaling - D2, D3; tests H3, H5

Q6. "When one of these clusters starts to struggle under load, what runs out first - the thing you watch or that pages someone?" [D2, H3. Fully open. Let them name CPU, RAM, network, storage IOPS, file descriptors. Do not prompt a resource. Probes if not volunteered: peak concurrency at that moment; and for containerized/OpenShift deployments, whether persistent-volume storage performance becomes the limiter before compute. Follow with: "Did you watch that happen, or is it the team's assumption?"] (High level understanding of the architecture – understanding capacity)
Q7. "Think of a federal Vault deployment that hit a wall or had a customer-impacting event under load. What was the trigger, and was there an early-warning signal before it got customer-impacting - at what level did you start worrying?" [D2, D3, H3. Capture the threshold metric and value if known.]
Q8. "What does your set up look like and when a customer outgrows their setup, what's the right move - add resources to the existing cluster, stand up a separate cluster, or split the workload? And is there a ceiling where you'd insist on a second cluster regardless of headroom?" [D3, H5. Grounding: MCSP recommends ~500 worker nodes max per Hypershift cluster - do not state it, but if they raise a node/cluster ceiling, probe how they'd shard.]

#### Concentration and growth - D1, D2; tests H2

Q9. "Across the federal accounts you've seen, how concentrated is demand - are most accounts roughly the same size, or do a few dwarf the rest? Your largest vs a typical one, how many times bigger on users, machines, or load?" [D1, H2. Open. Do not suggest any percentage.]
Q10. "How fast does a federal account's Vault usage grow once in production - flat, steady, or step-changes when new programs onboard? Over 12 months, how much larger?" [D1, D2. Feeds headroom.] (How can we expedite the process)
Growth

#### Reliability - D4

Q11. "What availability do federal customers actually expect from a managed Vault, and what recovery time and data-loss window after a region or zone failure - does it differ by segment?" [D4. Do not state any SLA, RTO, or RPO number; let them produce it. Probe if relevant: how big a problem is a single GovCloud region for their segment, and who pushes back hardest.]

#### RFP vs reality - D1, D4; tests H4

Q12. "When a federal customer states sizing or load in an RFP or RFI, how does that compare to what they actually run in production - which way does it go, and by roughly how much?" [D1, D4, H4. Open. Do not suggest direction or percentage. Follow with: "When you've had both the stated and the measured figure, which did you trust, and why?"]

#### Launch risk - D5

Q13. "If we launched managed FedRAMP Vault in the next couple of quarters, what's the one thing most likely to make a federal customer walk away on day one - and what can they live without at launch versus what's deal-dead?" [D5. Probe platform worries if not raised: container security for Vault, persistent-storage performance, the cluster node ceiling, identity/provisioning gaps like SCIM or claims federation, lower availability target than self-managed/HCP.]

#### Archetypes - D1, D5; tests H5

Q14. "If you sorted the federal Vault customers you know into a few groups by how they use and scale Vault, how many groups would you draw, what separates the most demanding from a modest one, and does the heavy load concentrate in one group?" [D1, D5, H5. Do not suggest a number of groups.] (more about use)

### Section 4: Wrap-up (2 min)

- "Anything about federal Vault scale, reliability, or launch risk I should have asked and didn't?"
- "Of everything we covered, which one number would you most want validated before we bet a launch limit on it?" [Flags the lowest-confidence input for telemetry anchoring.]
- [Read back the 2-3 firmest numbers captured.] "Did I get these right?"
"That's everything. Thanks. Your input is anonymized in anything I share, and the recording is only used to synthesize patterns for this study. I'll stop the recording now."
[Stop recording.]

### Moderator notes: bias mitigation in the moment

- Internal estimates carry recency and deal-positivity bias. When a number sounds like the last big deal or a best case, ask: "Is that a typical account, or your largest?" and "Did you watch that, or is it the customer's claim?"
- RFP/RFI figures carry procurement inflation bias. Treat every RFP-derived number as upper-bound; tag it in the confidence note and route it to Q12 logic.
- Both biases push the same optimistic direction, so the default failure mode is over-provisioned defaults and unrealistic SLAs. Telemetry is the tie-breaker; the interview produces candidate ranges and flags say-vs-do gaps, not settled numbers.
- No claim leaves this interview above Medium confidence on its own. High confidence requires telemetry corroboration during synthesis.

### Appendix: hypotheses under test (moderator only, never read aloud)

Do not state any threshold in a question. These let you probe in the right direction after the participant gives a number.
- H1: Federal workloads are machine-heavy and drive sustained auth/load pressure. (Probed in Q1-Q2, Q4 by asking human and machine counts separately; never name a ratio.)
- H2: A small number o9f high-scale organizations drive disproportionate capacity demand. (Probed in Q9, Q14 via concentration; never name a percentage.)
- H3: Memory pressure is an earlier bottleneck than CPU for many profiles. (Probed in Q6-Q7 by asking what saturates first; never say "memory.")
- H4: RFP/RFI values understate dynamic load and require adjustment factors. (Probed in Q12 by asking stated vs actual; never name a direction or percentage.)
- H5: One global limit set is too coarse; at least three launch tiers are needed. (Probed in Q8, Q14 by asking about a single-config ceiling and how many groups; never name a tier count.)