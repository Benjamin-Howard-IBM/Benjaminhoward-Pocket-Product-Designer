# [Research Findings] MCSP FedRAMP Adoption - Session #2 Answered Script

> Summary: Research script questions answered with responses captured from MCSP Research Session #2. This is an additional document; the original script (`07. Research/[Research Script] MCSP FedRAMP Adoption - Internal Interview.md`) and the original session transcript (`06. Raw Documents/MCSP Research Session 2.md`) are preserved unchanged.
> Session duration: ~44m 44s (transcript runtime)
> Session date: not captured in transcript
> Moderator: Benjamin Howard
> Participant: Luke McCleary (Solutions Engineer, Public Sector; covers DHS, FAA, DOJ; formerly Department of Energy; largest federal renewal base, ~$6M ARR)
> Product: Vault on MCSP
> Owner: benjamin.howard@ibm.com

Answers are transcribed from the participant's responses. Where a question was not asked or not answered with usable content, the answer is left blank per instruction. Per-claim blocks follow the script's capture template (Segment / Role / Basis / Confidence). No claim leaves this interview above Medium confidence on its own; High confidence requires telemetry corroboration during synthesis. Note: this participant is explicitly advisory ("We don't really do hands-on in our role... We're advisory"), so most claims are secondhand or estimate rather than direct-operated, which caps confidence lower per the rubric.

---

## Section 2: Warm-up and exposure

### "In a sentence, what's your role and how you work with Vault in federal accounts?"

- **Luke McCleary:** Solutions Engineer. Works Department of Homeland Security, FAA, and Department of Justice; largest accounts are the FAA and some Homeland Security accounts. States he has the largest renewal base in the federal business and works with the longest-tenured federal rep, supporting roughly $6M ARR across many contracts. Role is to support existing business and help customers acquire and expand.

### "Over the last year, which federal segments have you worked with directly - DoD, civilian, IC, or systems integrators? Direct vs secondhand?"

- **Answer:** Sticks to assigned territory: DHS, FAA, DOJ (civilian). Historically held Department of Energy for years (knows it well, no longer his account set). Current account set is what he knows best.

  > Segment: Civilian (DHS, FAA, DOJ); DoE (historical) - mixed civilian
  > Role of source: SE (McCleary)
  > Basis: direct (account ownership) for current set; secondhand for DoE now
  > Confidence note: recent and ongoing on current civilian accounts; IC referenced only secondhand/deferred to Tim Olson

### "Were you hands-on with the deployment, or going off what the customer told you?"

- **Luke McCleary:** No hands-on. "We don't really do hands-on in our role. We're advisory." Leans heavily on professional services. Has design knowledge of where customers ended up and makes recommendations, but did not do the design work himself for the most part.

  > Basis: advisory/secondhand (not operator). Screening flag: no hands-on deployment - treat quantitative claims as secondhand/estimate at best.

---

## Section 3: Core questions

### Q1 - Human users (D1, H1)
"Roughly how many human users actually log in - daily active, or total provisioned? Low, typical, largest?"

- **Answer:** Even the biggest agencies have **fewer than ~100 people** logging in. Historically customers architected the platform to minimize the number of humans who log in. He flags that this will change with the licensing shift from application-based to **secret-based licensing**: removing the per-identity penalty will open the platform to many more human identities. Current deals are being sized so that every application owner can have an identity and manage secrets for their apps, so today's low number is expected to rise over the next year or two.

  > Claim: human logins <100 even at largest agencies today; expected to rise under secret-based licensing
  > Segment: civilian federal (DHS/FAA/DOJ)
  > Role of source: SE (McCleary)
  > Basis: secondhand/estimate; forward-looking on licensing change
  > Confidence note: directional; licensing-model change makes today's number a moving baseline; not telemetry-confirmed -> Low/Medium

### Q2 - Machines/apps (D1, H1)
"Separately, how many machines, applications, services, or workloads authenticate to that same Vault - low, typical, high?"

- **Answer:** Much higher than humans. His biggest single Vault account (referred to as "CIS") has **3,000 clients** with **several thousand application pods** hitting Vault. Typical ratio he sees is **1 human user to ~10-20 application identities**. He did not have per-day hit stats in front of him.

  > Claim: machine/app auth far exceeds human; largest ~3,000 clients / several thousand pods; ratio ~10-20:1 apps:human
  > Segment: civilian federal (largest single account)
  > Role of source: SE (McCleary)
  > Basis: secondhand (customer scale he sells/renews), ratio is a general observation
  > Confidence note: one large account cited; ratio not measured; must be telemetry-anchored -> Low/Medium

### Q3 - Secrets / namespaces (D1, directional)
"How many secrets entries live in a typical secrets engine, and how many namespaces does a large account carve out?"

- **Secrets entries per engine:** Deferred. Varies wildly by product maturity and age of the customer; does not have hard information. *[Left blank - no number given; participant deferred.]*
- **Namespaces:** No count given, but pattern described: an 8-year customer accumulates "a ton of sprawl" and many namespaces. Customers use **more namespaces now than previously**, because legacy ACL restrictions that made granular namespace policy hard (auth engines had to live in the same namespace) were fixed several releases ago.

  > Claim: namespace use trending up since ACL/auth-engine limitation fixed; counts scale with product-tenure maturity; no hard numbers
  > Segment: mixed civilian federal
  > Role of source: SE (McCleary)
  > Basis: secondhand/observation
  > Confidence note: explicitly deferred on entries-per-engine; directional on namespace growth -> Low

### Q4 - Peak auth rate + spikes (D1, D2, H1)
"For a busy federal Vault, what's the authentication rate at peak? Steady or spiky - what drives spikes?"

- **Answer:** "Absolutely spiky." Not a Windows-logon-style 8 AM mass-login pattern. Spikes are **application-driven, mostly Kubernetes**: customers commonly bounce all Kubernetes pods on a fixed cadence (e.g., every two weeks) for a rolling restart, pulling a fresh secret with a ~30-day TTL so pods always hold a valid secret. That hits the system hard at those intervals. No specific requests-per-second/minute peak value or peak-over-baseline multiple produced.

  > Claim: load is spiky, application/Kubernetes-driven at scheduled pod-restart intervals; no numeric peak given
  > Segment: civilian federal
  > Role of source: SE (McCleary)
  > Basis: secondhand/observation
  > Confidence note: qualitative driver only; no peak value or multiple -> Low/Medium

### Q5 - Heaviest load-driving feature (D1, D2)
"Of the heavy features - PKI, KMIP, dynamic DB/cloud creds, transit, SSH CA - which drives the most requests?"

- **Answer:** **Dynamic database credentials, by far.** Database credential rotation is the biggest pain point and the top use case ("the thing we sell it on"), because the service credential is a database ~8 out of 10 times and there are many databases with accounts that must be rotated. He expects **PKI** could overtake database in a couple of years given the growing need for certificates, if the right product moves are made. Notably, he says **none of his customers use the transit engine** (see Q6).

  > Claim: primary load = dynamic DB creds (rotation); PKI is the rising future driver; transit unused in his base
  > Segment: civilian federal
  > Role of source: SE (McCleary)
  > Basis: secondhand (top sales/use case)
  > Confidence note: consistent framing; PKI ascendancy is aspirational -> Medium

### Q6 - What saturates first (D2, H3)
"When a cluster struggles under load, what runs out first?"

- **Answer:** He has **never had a customer hit performance limits** on their cluster at any scale. He attributes this largely to **none of them using the transit engine** - his rule of thumb to customers: if you are not using transit, you will not see a performance limit on this cluster. Example: a customer with **30,000 Vault licenses runs a 5-node cluster** (with performance read standbys he is not sure they need). He adds that many customers may not be instrumented enough (no Grafana/Prometheus queue metrics) to even know if there is a performance issue, but in practice latency differences of 50-500 ms are meaningless for their application deployment use cases. *[No first-saturating resource named - none observed.]*

  > Claim: no observed performance saturation at any scale; transit-engine absence cited as the reason; customers often under-instrumented
  > Segment: civilian federal
  > Role of source: SE (McCleary)
  > Basis: direct-observed (absence of events), explicitly "empirical, not tested"
  > Confidence note: strong "no saturation" signal but self-describes as not rigorously tested; contrasts with H3 premise -> Medium

### Q7 - Early-warning threshold (D2, D3, H3)
"Was there an early-warning signal before it got customer-impacting, and at what level did you start worrying?"

- **Answer:** Hasn't happened in his accounts, so he cannot describe a trigger or early-warning signal. Some customers worry about it (buy performance standbys because they "know" they are high-performance), but he does not believe they did real performance analysis to justify it. *[Threshold metric/value: left blank - no event observed.]*

  > Claim: no customer-impacting load event observed; standby purchases driven by perception, not analysis
  > Segment: civilian federal
  > Role of source: SE (McCleary)
  > Basis: direct (absence of events) + secondhand on customer motivation
  > Confidence note: no metric threshold available -> Low/Medium

### Q8 - Add capacity vs new cluster + ceiling (D3, H5)
"When a customer outgrows their setup, what's the right move? Is there a ceiling forcing a second cluster?"

- **Answer:** Hasn't hit these challenges. His customers are not big financials doing heavy work and generally are not doing the analysis to know when they would hit headroom or a ceiling. Default guidance is generic architectural recommendations; if a customer did hit something, he would **add memory and a CPU or two to the nodes** - it "scales up, not out." Order of operations: **up first, then out** only if up is insufficient, because more nodes are less fun to manage. No hard ceiling / forced-second-cluster scenario reported.

  > Claim: default = scale-up (RAM/CPU) existing cluster; scale-out only as fallback; no ceiling encountered
  > Segment: civilian federal
  > Role of source: SE (McCleary)
  > Basis: secondhand/guidance
  > Confidence note: MCSP ~500-worker-node/Hypershift ceiling not raised; no sharding discussion -> Medium

### Q9 - Demand concentration (D1, H2)
"How concentrated is demand? Largest vs typical - how many times bigger?"

- **Answer:** Very wide spread: customers range from **25 licenses to 3,000 licenses**. He tries not to engage the very small ones (points them to open source) and tries not to sell anything under **100 client licenses**, though legacy contracts occasionally slip through. He did not quantify a concentration ratio and asked the moderator how to slice it.

  > Claim: license spread ~25 to ~3,000; floor of engagement ~100 client licenses; wide variety
  > Segment: civilian federal
  > Role of source: SE (McCleary)
  > Basis: secondhand (book of business)
  > Confidence note: spread given, but no explicit concentration multiple -> Medium

### Q10 - Growth over 12 months (D1, D2)
"How fast does usage grow once in production - flat, steady, step-changes? Over 12 months, how much larger?"

- **Answer:** Mostly **flat**. Only a small percentage of federal accounts are capable of becoming enormous; most never really grow because agency size is fixed (unlike commercial accounts with new products/revenue). Example framing: "NASA is the size that NASA is," and budgets often shrink rather than grow. Exceptions: DHS and DoD/"war" occasionally get big budget influxes / new projects; civilian growth is rarer. The high end is usually **known up front** - a customer is scoped for their full environment (e.g., start at 300-400 Vault licenses) and is expected to land near the pre-scoped mature size and stay there.
- **Expediting growth (probe):** With on-prem, he has "never had to grow a cluster" - it is sized on day one for expected need. If a customer grows, they add a few gigs of RAM and CPUs per node via a quick helm redeployment ("pretty painless"). He gives small customers the same minimum architecture sizing guidance as medium ones.

  > Claim: growth generally flat; high-end pre-scoped at deal time; expansion is a light in-place resize
  > Segment: civilian federal
  > Role of source: SE (McCleary)
  > Basis: secondhand/observation
  > Confidence note: consistent, no telemetry; agency-budget dynamics drive the exceptions -> Medium

### Q11 - Availability + RTO/RPO (D4)
"What availability do federal customers expect, and what recovery time / data-loss window after a region or zone failure? Differ by segment?"

- **Answer:** Availability expectations differ **within tiers inside a single agency**, not just by segment. Example: the FAA has three tiers - **mission critical** (e.g., flight systems), **mission essential**, and **mission support** (support can go down with little consequence). As you move up the tiers, availability matters more. He architects to keep Vault **out of a true tier-0 dependency** so that if Vault goes down, applications do not immediately break - ideally leases carry a grace period (he would like a day or two of runway). This is not always possible (e.g., Lambda-style spawn services that call Vault on every spawn will break). Figures given: **RPO/RTO under ~2 hours for most agencies**; for critical services like the FAA, roughly **10 minutes** with push-button DR failover. Caveat: he would not build the SaaS offering for those mission-critical cases, because those customers will not use a SaaS service for mission-critical workloads - they will engineer and manage it themselves.

  > Claim: RTO/RPO < ~2h typical; ~10 min for mission-critical (FAA); architect Vault out of tier-0; mission-critical stays self-managed
  > Segment: civilian federal (FAA tiering)
  > Role of source: SE (McCleary)
  > Basis: secondhand/design guidance
  > Confidence note: first concrete RTO/RPO signal in the study, but design-intent not measured SLA -> Medium

### Q12 - RFP/RFI vs production (D1, D4, H4)
"When a customer states sizing/load in an RFP or RFI, how does that compare to production - which way, by how much?"

- **Answer:** Framed around **licensing**. Customers **run below or at their licensing**, effectively never outpacing it. At year end, the team looks at where they actually are and adds a growth ramp (e.g., ~10%). Drivers pushing a customer to a higher license tier are **available budget** (end-of-year money) and **new initiatives** - folding in another agency, or shifting to a new platform/architecture. No customer over-consuming beyond entitlement was reported.

  > Claim: consumption tracks at-or-below licensed entitlement; expansion driven by budget and new initiatives, not organic overrun
  > Segment: civilian federal
  > Role of source: SE (McCleary)
  > Basis: secondhand (renewal/true-up)
  > Confidence note: addresses the licensing dimension, not raw dynamic-load over/under-statement -> Medium

### Q13 - Launch blocker + platform worry (D5)
"What's most likely to make a federal customer walk away on day one? What's deal-dead vs live-without at launch?"

- **Answer:** No feature-gap deal-killer. Customers can **live without key management and transit** at launch (same features left out of early HCP revs), as long as the offering has **all authentication methods, the base secrets engines, and policy management**. Nothing he expects to be omitted would stop a customer. The likelier launch blocker is **networking / cloud peering**: how the customer interconnect is set up. He has done essentially zero HCP deals and wants **custom interviews** to validate whether the HCP customer-interconnect architecture is acceptable and easy enough to implement.
- **Friction / trust probe:** Much of the friction is internal to the agency and hard for the vendor to mitigate. HCP already does a good job (Terraform/CloudFormation out the connection info), but some agencies **distrust automation** and may want to set it up manually. Suggested mitigation idea: a way to **bypass the public clouds and do a direct customer interconnect** (e.g., site-to-site VPN).

  > Claim: no feature deal-breaker (KM/transit deferrable); primary risk is network/cloud-peering + automation distrust; recommends interconnect interviews
  > Segment: civilian federal
  > Role of source: SE (McCleary)
  > Basis: estimate/secondhand; self-flagged low HCP exposure
  > Confidence note: networking concern is a hypothesis he wants tested, not observed -> Low/Medium

### Q14 - Archetype grouping (D1, D5, H5)
"If you sorted federal Vault customers into groups by how they use and scale Vault, how many groups, what separates the most demanding from a modest one, and does heavy load concentrate in one group?"

- **Answer:** The **primary driver of how much Vault a customer uses is how much EKS they run** - "it's almost all EKS." Residual VMware exists but is expected to largely disappear within a couple of years due to Broadcom pricing. Some **OpenShift** remains, concentrated in **energy and sciences divisions**, which he calls some of the **best SaaS candidates** (more open to SaaS). Openness to SaaS decreases the closer a customer sits to the military-industrial complex: **DoD is less SaaS-open than civilian**. He did not enumerate a fixed number of groups; the separation is platform-driven (EKS footprint) and culture-driven (SaaS openness by distance from DoD).
- **Deployment-model exercise (three tenancy options shown, cost rising ~10x left to right):** Most federal customers land on the **middle option (tenant-dedicated nodes)** because they will not share a compute node with another tenant ("I don't want to worry about memory leaks... I want single-tenant nodes"). They will generally **not mandate a single-tenant cluster (option 3)**, but the **IC and financials (IRS, Federal Reserve) will want option 3** on "vibes and budget" - more money, less risk tolerance. Some low-budget **sciences agencies would accept option 1**. He suggests maybe shipping option 2 with a **low-resource node model** to approximate option 1 for cost-sensitive customers, rather than maintaining all three. (For IC/financials specifics he deferred to Tim Olson.)

  > Claim: usage scales with EKS footprint; tenancy preference = dedicated nodes (option 2) default, option 3 for IC/financials, option 1 for low-budget sciences; SaaS openness inversely tied to DoD proximity
  > Segment: civilian federal (IC/financials secondhand, deferred to Olson)
  > Role of source: SE (McCleary)
  > Basis: secondhand/estimate; tenancy read is "vibe"-based by his own description
  > Confidence note: strong platform-driver signal (EKS); tenancy preferences self-labeled as vibes -> Medium

---

## Section 4: Wrap-up

### "Anything I should have asked and didn't?" / strategic reframe
- **Luke McCleary's central message:** The biggest customer challenges **all come from initial deployment and onboarding, not from limits, features, performance, or architecture.** He has sold deals (e.g., Department of Energy, ~5 years ago) that keep renewing without ever being deployed. His recommendation: spend the study's energy on **customer interviews about onboarding workflows** and making it easier to get customers live. "This is all fixable, but if your onboarding workflow sucks, no one will ever join your service."
- **Usability gap:** HashiCorp has never focused on product usability - only console capability and flexibility. Customers "want to be told what to do"; the product needs **more UIs, wizards, and maturity nudges** that currently do not exist ("a free-for-all choose-your-own-adventure").
- **Migration concern (unprompted):** He is worried about **migration workflows** for existing on-prem workloads. To make the service successful, it must pull in existing workloads with incentives and low friction. Migration is hard ("pick up a namespace and all its associated artifacts and drag it into the cloud"). The ideal is a near-instant cutover: duplicate an on-prem deployment (or a fragment), then flip a pointer to the cloud with no endpoint reconfiguration.
- **Dev/staging pattern (response to a "branching" onboarding idea):** Nearly all his customers - especially at scale - already run a **dev cluster** for a dev/QA/upgrade-test cycle. A scaled-down "playground" environment that lets customers test failover/cutover to the cloud should be **included in the contract** and would be a step in the right direction, but only if the **tooling is rock solid** ("otherwise they won't do it, it's just too much work").
- **Communication cadence:** Status calls with all major customers at least every other week; security/config changes on the customer side would surface to him through those calls.

### "Which one number would you most want validated before we bet a launch limit on it?"
- Not answered with a single named metric. His stance reframes away from limits: he does not see capacity limits as the pressing risk given the near-total absence of performance issues in his base. *[Left blank - participant redirected to onboarding as the priority.]*

### Recommended additional participants
- **Tim Olson** - long-tenured, covers Fed financials (IRS, Federal Reserve) and has significant IC/Intel experience; best source for IC and financial-segment tenancy/availability expectations that Luke deferred on.

---

## Session Summary

Session #2 was a ~45-minute internal interview with Luke McCleary (Solutions Engineer, public-sector civilian: DHS, FAA, DOJ; formerly DoE), moderated by Benjamin Howard. Unlike Session #1, this participant is explicitly advisory (no hands-on deployment), so nearly every quantitative claim is secondhand or estimate and caps at Low/Medium confidence. The session's dominant contribution is qualitative and strategic: it challenges the premise that capacity limits are the launch-critical problem and redirects toward onboarding and migration.

**Quantitative picture captured:**

| Dimension | Low / typical | Largest-seen | Basis |
|---|---|---|---|
| Human users (logins) | <100 even at large agencies (rising under secret-based licensing) | <100 today | secondhand/estimate |
| Machines / apps auth | thousands of pods at scale; ~10-20:1 apps:human | ~3,000 clients / several thousand pods | secondhand |
| Namespaces | trending up (post ACL fix); scales with tenure | many (8-yr "sprawl") | secondhand |
| Secrets engines / entries | deferred - no number | - | deferred |
| Auth rate | spiky, Kubernetes pod-restart driven; no numeric peak | - | secondhand |
| Client licenses | ~25 to ~3,000; sell-floor ~100 | ~3,000 (30,000-license customer on 5-node cluster) | secondhand |
| Growth | flat; pre-scoped at deal time (~300-400 start) | small subset can grow large | secondhand |
| RTO/RPO | < ~2h most agencies | ~10 min mission-critical (FAA) | secondhand/design intent |

**Key qualitative findings:**

- **No observed performance saturation at any scale**, attributed to none of his customers using the transit engine; a 30,000-license customer runs a 5-node cluster. Many customers are under-instrumented and would not detect a problem anyway. This reinforces Session #1's "resource exhaustion is rare" and further undercuts H3 (memory-first bottleneck).
- **Dynamic database credential rotation is the dominant load driver and top sales use case** (~8/10 service credentials are database); PKI is the expected future driver. This differs from Session #1 (KV + Kubernetes auth as primary) but agrees on PKI/cert-lifecycle as the rising demand signal.
- **Scale-up-first, scale-out-as-fallback**, consistent with Session #1. No cluster ceiling encountered; growth is a light in-place RAM/CPU resize via helm.
- **First concrete RTO/RPO signal in the study:** < ~2h generally, ~10 min for mission-critical, with the caveat that true mission-critical workloads will stay self-managed and not adopt SaaS.
- **Tenancy preference is dedicated nodes (middle option) by default**, single-tenant clusters (highest option) for IC and financials on "vibes and budget," and a low-resource variant to reach cost-sensitive sciences agencies. Usage scales with EKS footprint; SaaS openness falls with proximity to DoD.
- **Strategic reframe: onboarding and migration, not limits, are the launch-critical problem.** Deals renew without ever deploying; the product lacks usability, wizards, and migration tooling. A contract-included, scaled-down dev/cutover "playground" plus near-instant on-prem-to-cloud cutover would move the needle - contingent on rock-solid tooling.

**Not captured / gaps to close:** No secrets-entries-per-engine number (Q3, deferred), no numeric peak auth rate or peak-over-baseline multiple (Q4), no explicit concentration multiple (Q9), no single most-wanted validated metric (wrap-up), limited HCP/interconnect knowledge (Q13, self-flagged), IC/financial specifics deferred to Tim Olson (Q14).

**Next steps surfaced:** Interview Tim Olson for IC/financial tenancy and availability expectations; run customer interviews on onboarding and on HCP customer-interconnect acceptability; scope migration/cutover tooling and a contract-included dev playground; anchor all ranges above against Sigma telemetry before they enter the tier matrix.

---

## Detailed Analysis: Mapping Session #2 to Context Documents

This section maps Session #2 evidence against the three context documents: the 5/20 Research Sync, the 6/04 Research Sync, and the Research Plan. Confidence follows the Research Plan rubric (High/Medium/Low); interview-only claims cap at Medium, and this advisory-only participant caps mostly at Low/Medium.

### A. Mapping to `MCSP_Research_Sync_5:20` (Scope, Limits, Connections)

| 5/20 discussion point | Session #2 evidence | Assessment |
|---|---|---|
| Define "number of connections" = machines/apps hitting Vault + users logging in (5/20 core need) | Humans <100 even at large agencies; machines several thousand pods; ~10-20:1 apps:human ratio | **Validated directionally, machine-heavy.** Agrees with Session #1 shape; secondhand and pre-licensing-change, so treat as a moving baseline. Anchor to Sigma. |
| Adoption curve: early = higher logins, lower machines; later = higher machines, lower logins (5/20) | Customers historically architected to minimize logins; secret-based licensing will raise human identities going forward | **Nuanced.** The licensing model change may partially reverse the "minimize logins" pattern; the curve's human-login floor could lift. Flag for re-baselining. |
| High-RAM pressure is the known bottleneck; compute pressure easing (5/20) | Never observed a performance limit at any scale; ties absence to no transit-engine use; 30k-license customer on 5 nodes | **Conflict reinforced.** Second independent source says resource saturation is effectively a non-event in this base. Strengthens the case to reconcile the RAM-first assumption against telemetry. |
| Managed-service capacity is finite (AWS/OpenShift limits); need per-offering limits and above-threshold policy (5/20) | Scale-up (RAM/CPU) default; no ceiling hit; on-prem sizing done on day one | **Partially informs D3.** Self-managed "size once, resize in place" behavior is an upper-bound reference; it does not exercise the finite managed envelope 5/20 is scoping. |
| Use public-sector / self-managed data because federal is almost all self-managed (5/20) | All accounts self-managed on-prem; SaaS openness lowest near DoD, higher in civilian/sciences | **Consistent.** Confirms sampling rationale and adds a SaaS-readiness gradient useful for targeting. |
| Segment by federal agency type, not commercial industry (5/20) | Evidence organized by DHS/FAA/DOJ, DoE, plus IC/financials (deferred) | **Consistent.** Supports segment-tagged claims; note IC/financials are secondhand here. |
| Fitara / executive mandates drive cloud adoption + security (5/20) | Database-rotation pain and cert need drive demand; budget/new-initiative cycles drive expansion | **Reinforced.** Adds concrete demand mechanisms (DB cred rotation now, PKI next) to the mandate thesis. |
| Client counts are a rough, inaccurate proxy alone (5/20) | 25-3,000 license spread; a 30k-license customer runs only 5 nodes; consumption at/below entitlement | **Strongly reinforced.** License count clearly decouples from live load here - keep them separate in the tier matrix. |

### B. Mapping to `MCSP_Research_Sync_6:04` (Root Namespace, Sandbox, RFI)

| 6/04 discussion point | Session #2 evidence | Assessment |
|---|---|---|
| Root-namespace retention blocks self-managed -> cloud migration; migrations took ~3 years (6/04) | Unprompted migration concern: pulling in existing workloads is hard; wants near-instant duplicate-and-repoint cutover | **Strongly corroborates the stakes.** Independent, unprompted confirmation that migration friction is a top adoption risk; supports prioritizing migration tooling / the "hack." |
| Namespaces carry global policies inherited by child namespaces (6/04) | Namespace use rose after ACL/auth-engine-per-namespace limitation was fixed; mature customers have namespace sprawl | **Validated + mechanism added.** Explains a historical driver of namespace proliferation and why deep structures persist. |
| Federal (IC/DoD) requires FedRAMP; won't put secrets in cloud "willy-nilly" (6/04) | SaaS openness decreases toward DoD; mission-critical stays self-managed; IC wants highest-isolation tenancy | **Validated.** Confirms the compliance/isolation gradient and that the offering targets less-sensitive, more-SaaS-open segments. |
| Cloud is not for theater/edge; value is faster enablement of less-sensitive data (6/04) | Best SaaS candidates are OpenShift-heavy energy/sciences divisions; mission-critical excluded | **Consistent.** Reinforces targeting less-sensitive workloads for the managed offering. |
| Sandbox / dev environment concept (6/04) | Nearly all customers already run a dev cluster (dev/QA/upgrade-test); a contract-included scaled-down playground would help onboarding/cutover | **New supporting evidence.** Field confirmation that a bundled dev/staging "playground" matches existing customer behavior - concrete input for the sandbox idea. |
| Project reframing: Vault is the star, MCSP is the platform (6/04) | Entire conversation is Vault-centric; concerns are Vault onboarding, migration, tooling | **Consistent.** Frame findings as Vault FedRAMP offering, not "MCSP" limits. |
| RFI/RFP ingestion ("Bob") to extract required answers incl. SLAs (6/04) | Provided design-intent RTO/RPO (<2h; ~10 min mission-critical) but framed RFP-vs-production purely as licensing at/below entitlement | **Partial fill + gap.** First RTO/RPO signal, but it is design intent, not measured SLA; still route SLA confirmation to RFI ingestion + telemetry. |

### C. Mapping to `[Research Plan] MCSP FedRAMP Adoption Exploration` (Decisions & Hypotheses)

**Decision coverage:**

| Decision | Session #2 contribution | Confidence (interview-only) |
|---|---|---|
| **D1** Limit envelope by tier (users/apps/throughput/secrets) | Humans <100; apps thousands (~10-20:1); license spread 25-3,000; secrets/entries deferred | Low/Medium (advisory, needs telemetry) |
| **D2** Default sizing / guardrail thresholds (CPU/RAM/network) | No saturation observed at any scale; transit-absence cited; scale-up via RAM/CPU | Medium; further challenges RAM-first assumption |
| **D3** Scale response policy | Scale-up first, scale-out fallback; no ceiling; sized on day one | Medium |
| **D4** SLA / reliability by segment | RTO/RPO < ~2h typical, ~10 min mission-critical; architect out of tier-0; mission-critical stays self-managed | Low/Medium (design intent, not measured) |
| **D5** Launch blockers vs backlog | No feature deal-breaker (KM/transit deferrable); risk is networking/interconnect + automation distrust; onboarding is the real blocker | Medium |

**Hypothesis testing:**

| Hypothesis | Session #2 signal | Status (interview-level) |
|---|---|---|
| **H1** Federal workloads are machine-heavy, sustained auth pressure | Supported on machine-heavy (thousands of pods, ~10-20:1); but load is spiky (Kubernetes pod-restart) not sustained; humans may rise under secret-based licensing | **Partially supported.** Machine dominance yes; "sustained" is contradicted (spiky, interval-driven). Confirm with telemetry. |
| **H2** Few high-scale orgs drive disproportionate demand | Wide spread (25-3,000 licenses) with only a small subset able to grow large; most agencies flat/fixed by budget | **Weakly supportive.** Some concentration by capability to grow, but no explicit multiple; telemetry-dependent. |
| **H3** Memory pressure is an earlier bottleneck than CPU | No saturation observed at all; when resized, RAM+CPU added together; transit-absence cited as why | **Challenged again.** Second source finds saturation effectively absent; if anything, no resource is the "first" limiter in this base. Priority telemetry reconciliation. |
| **H4** RFP/RFI understate dynamic load | Consumption runs at/below licensed entitlement; expansion driven by budget/new initiatives, not organic overrun | **Not supported (licensing lens).** No under-statement of run-rate vs entitlement observed; dynamic-load over/under-statement still untested - route to telemetry. |
| **H5** One global limit set too coarse; >=3 tiers needed | Distinct behavior by EKS footprint and by tenancy preference (dedicated nodes default; single-tenant for IC/financials; low-resource for sciences) | **Supported, directional.** Natural segmentation by platform footprint and tenancy/budget supports multi-tier limits and multi-tier tenancy models. |

**Research-plan method alignment:**

- **Confidence rubric honored, capped lower:** The participant is advisory (no hands-on), so his numbers are secondhand/estimate; per the rubric these cannot exceed Medium and mostly sit at Low/Medium until Sigma-anchored.
- **Bias watch:** He self-labels key reads as "empirical, not tested" (saturation) and tenancy preferences as "vibes and budget," and flags near-zero HCP experience (interconnect). Treat those as candidate signals, not settled findings. His book-of-business is civilian-weighted, so IC/financial claims are secondhand and deferred to Tim Olson - watch for civilian-segment skew.
- **Telemetry tie-breaker triggered:** The no-saturation / transit-absence claim (H3, D2) and the machine-heavy-but-spiky pattern (H1) are the highest-value items to resolve against Sigma.
- **Screening caveat:** Meets recency and role screening (SE, direct civilian federal ownership in last 12 months), but fails the "hands-on/behavioral source" bar for High confidence - explicitly advisory.

### D. Cross-document synthesis takeaways

1. **The "no saturation" signal is now double-sourced.** Both Session #1 (network-first, resource exhaustion rare) and Session #2 (no performance limit at any scale, tied to transit-absence) undercut the RAM-first bottleneck belief (5/20, H3). This is the single most important assumption to reconcile against telemetry before setting D2 guardrails.
2. **Load driver differs but rhymes on PKI.** Session #1 named KV + Kubernetes auth; Session #2 names dynamic database credentials. Both converge on **PKI / cert-lifecycle as the rising demand signal** - a consistent, Vault-native story to route to product/marketing.
3. **Migration and onboarding rise to launch-critical.** Session #2 reframes the study: limits are not the pressing risk in this base; **onboarding usability and migration tooling** are. This aligns with the 6/04 root-namespace-migration difficulty and the sandbox concept, and argues for a bundled dev/staging "playground" plus near-instant cutover tooling.
4. **First RTO/RPO numbers, with a boundary.** < ~2h typical and ~10 min mission-critical give D4 a starting anchor, but the mission-critical tier explicitly will not adopt SaaS - so the managed offering's SLA target should serve mission-essential and below, not tier-0.
5. **Tenancy tiering has field support.** Dedicated-node (middle) default, single-tenant (high) for IC/financials, and a low-resource variant for budget-constrained sciences agencies supports a **multi-tier tenancy model** (H5, D5), with IC/financial specifics to be confirmed via Tim Olson.
6. **Persistent gaps** (secrets-per-engine, numeric peak auth rate, explicit concentration multiple, measured SLA vs design intent, HCP interconnect acceptability) confirm continued reliance on RFI ingestion (6/04 "Bob"), telemetry, and targeted follow-up interviews rather than this advisory interview alone.
