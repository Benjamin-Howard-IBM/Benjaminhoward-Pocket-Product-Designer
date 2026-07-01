# [Research Findings] MCSP FedRAMP Adoption - Session #1 Answered Script

> Summary: Research script questions answered with responses captured from MCSP Research Session #1 (June 25, 2026). This is an additional document; the original script (`[Research Script] MCSP FedRAMP Adoption - Internal Interview.odt`) and the original session recording/transcript (`MCSP Research Session #1.docx`) are preserved unchanged.
> Session date: June 25, 2026 (1h 7m 35s)
> Moderator: Benjamin Howard
> Participants: Tim Silk (Manager, Public Sector Pre-Sales Engineering, ~5 yrs), Tim Olson (Solutions Engineer, Public Sector, 7+ yrs)
> Product: Vault on MCSP
> Owner: benjamin.howard@ibm.com

Answers are transcribed from the participants' responses. Where a question was not asked or not answered with usable content, the answer is left blank per instruction. Per-claim blocks follow the script's capture template (Segment / Role / Basis / Confidence). No claim leaves this interview above Medium confidence on its own; High confidence requires telemetry corroboration during synthesis.

---

## Section 2: Warm-up and exposure

### "In a sentence, what's your role and how you work with Vault in federal accounts?"

- **Tim Olson:** Pre-sales technical / Solutions Engineer. Associates value of HashiCorp/IBM technology with customer problems; sells enterprise (paid) products. Has called on essentially all federal customers at one point; there is continual interest in cloud-based / SaaS offerings.
- **Tim Silk:** Pre-sales technical from a management perspective. Makes sure SEs have what they need, understands customer use cases/requirements, and funnels market needs back to product. Frames FedRAMP as a market need: FedRAMP is a cloud service like commercial cloud with special requirements; "we don't track customers that don't call us, and if we don't have FedRAMP, they're not calling us."

### "Over the last year, which federal segments have you worked with directly - DoD, civilian, IC, or systems integrators? Direct vs secondhand?"

- **Answer:** All of the above - DoD, civilian agencies, intelligence community - plus state and local. FedRAMP generally covers state requirements (some states have "state ramp," but FedRAMP usually satisfies them).

  > Segment: DoD | Civilian | IC | (state/local) - mixed
  > Role of source: SE (Olson), PM/management (Silk)
  > Basis: direct
  > Confidence note: broad exposure across whole public sector space; recent and ongoing

### "Were you hands-on with the deployment, or going off what the customer told you?"

- **Tim Olson:** Very aware of deployment and architecture as part of the sales process (use cases, sizing, scoping, architecture, can Vault Enterprise run in a fully separated classified environment). Involved through order, license, download of bits, follow-up calls, support tickets, and ongoing cadence calls. Services are sold where possible, though not in IC environments (no cleared resources). Pre-sales SE team stays involved through deployment and onboarding.

  > Basis: direct (SE-operated/observed) plus secondhand where customer-run

**Onboarding friction (follow-on probe, out of core scope):** Frequent friction points are lack of preparation (customers haven't read docs/HVDs), technical skills gaps (first time on Linux/Kubernetes), and environment not prepped (certs, ports, networks, OpenShift pods/namespaces not set up). FIPS 140 requirements often add HSM / auto-unseal transit-cluster connectivity setup issues. Once hurdles clear, the actual install is relatively straightforward. Tim Silk added the pattern is consistent across accounts; some have more stringent lock-down requirements. A standing goal is to drive deeper and broader use cases.

---

## Section 3: Core questions

### Q1 - Human users (D1, H1)
"Roughly how many human users actually log in - daily active, or total provisioned? Low, typical, largest?"

- **Answer:** Human logins are generally **low**. On average ~**3-5** human entities. Rises to **~10-15** for a large, mature account (one customer with Vault Enterprise 7+ years, many namespaces with designated admins per namespace). Human login is infrequent - typically an admin action or setting up a new secrets engine. Federal customers use an existing identity-management / single-sign-on system that reaches back to Vault via API for creds, so people rarely log in directly to pull creds.

  > Claim: human users ~3-5 typical; up to ~10-15 largest-seen
  > Segment: mixed federal (DoD/civilian/IC)
  > Role of source: SE (Olson)
  > Basis: direct/secondhand across established Vault Enterprise customers
  > Confidence note: multiple accounts, years of exposure; ranges not single-point; not telemetry-confirmed -> Medium

### Q2 - Machines/apps (D1, H1)
"Separately, how many machines, applications, services, or workloads authenticate to that same Vault - low, typical, high?"

- **Answer:** Typically in the **hundreds**; can reach **thousands**. When pushed for the typical band within "hundreds," Olson landed on roughly **three to five (hundred)** as typical. High end reaches thousands of transactions hourly/daily for well-established customers (build pipelines, apps, etc.). Department of War / IC events can spike to thousands "in a second" when analytics and workloads spin up around an incident.

  > Claim: machine/app auth ~hundreds typical (~300-500), thousands high/peak
  > Segment: mixed; DoW/IC for the high end
  > Role of source: SE (Olson)
  > Basis: estimate ("completely guesstimated"), varies by customer usage and mission
  > Confidence note: explicitly guesstimated; wide variance; must be telemetry-anchored -> Low/Medium

### Q3 - Secrets / namespaces (D1, directional)
"How many secrets entries live in a typical secrets engine, and how many namespaces does a large account carve out?"

- **Namespaces:** Most clients have **2-3** namespaces, typically not nested. A large, mature account has **a dozen or more**, with nested child namespaces. Namespaces solve organizational problems but add management overhead and complexity when deeply nested.
- **Secrets engines:** Typically between **2 and 6**. Customers usually stand up one or two initially (almost always KV, then often SSH), then expand.
- **Secrets entries per engine:** Not quantified in the session (directional question; no usable number produced). *[Left blank - no number given.]*

  > Claim: namespaces ~2-3 typical, 12+ largest (nested); secrets engines ~2-6
  > Segment: mixed federal
  > Role of source: SE (Olson)
  > Basis: direct/secondhand
  > Confidence note: consistent pattern across accounts; not telemetry-confirmed -> Medium

**Expansion driver (probe):** Secrets-engine expansion is driven by **mission need and security requirements**. Examples: PKI/cert management (government moving toward 75-day cert rotation, not yet formal but coming; today's 3-5 year manual rotation is error-prone), KMIP, new platform adoption (OpenShift -> Kubernetes auth, VSO), and dev-team requests (Rancher, new build pipelines).

### Q4 - Peak auth rate + spikes (D1, D2, H1)
"For a busy federal Vault, what's the authentication rate at peak? Steady or spiky - what drives spikes?"

- **Answer:** Auth requests generally in the **high tens - ~50 to 90 per minute/hour** in many environments; rolls up into the **mid-to-high hundreds** during periods of heavy development activity. Load is **spiky**, not steady. Spike drivers: expansion of information being transmitted / development activity spikes; seasonal operational events (IRS around April, decennial Census); and DoW/IC mission events. Precise operational detail for IC/DoW is not available to the vendor (not shareable even with clearance).

  > Claim: auth ~50-90/min baseline; mid-high hundreds at dev-activity peak
  > Segment: mixed; IRS/Census (civilian), DoW/IC for event spikes
  > Role of source: SE (Olson)
  > Basis: estimate, "it depends" by environment and mission
  > Confidence note: no peak-over-baseline multiple given; operational detail withheld for IC/DoW -> Low/Medium

### Q5 - Heaviest load-driving feature (D1, D2)
"Of the heavy features - PKI, KMIP, dynamic DB/cloud creds, transit, SSH CA - which drives the most requests?"

- **Answer:** Most customers use and stay with **standard Vault capabilities** - KV store, Kubernetes auth ("milk-run" operations) - because those solved the original requirement. PKI is used by some (team wants more); KMIP is used by a minority. Transit is mostly used as an **auto-unseal transit cluster** (a separate cluster whose only job is to auto-unseal the production cluster), not as a primary load driver. Heavy features (PKI, KMIP) are **low** today, not yet high.

  > Claim: primary load = KV + Kubernetes auth; PKI/KMIP low; transit = auto-unseal use
  > Segment: mixed federal
  > Role of source: SE (Olson)
  > Basis: direct/secondhand
  > Confidence note: consistent, but "heavy feature" adoption is aspirational not yet realized -> Medium

### Q6 - What saturates first (D2, H3)
"When a cluster struggles under load, what runs out first?"

- **Answer:** **Network bandwidth** is almost always the first problem. It is **rare** to hit a compute/resource limit. The second common trigger is an external team changing the underlying infrastructure - e.g., another team updates the VMs/OpenShift without notifying the Vault team and takes nodes down.

  > Claim: network bandwidth saturates first; resource (CPU/RAM) rarely the limiter
  > Segment: mixed federal
  > Role of source: SE (Olson)
  > Basis: direct (observed events)
  > Confidence note: **directly contradicts H3 (memory-first)**; flag for telemetry reconciliation -> Medium

### Q7 - Early-warning threshold (D2, D3, H3)
"Was there an early-warning signal before it got customer-impacting, and at what level did you start worrying?"

- **Answer:** No reliable early-warning signal in practice. Ideally there would be maintenance communications, but often there are none. Infra is frequently run by an FSI/subcontractor operating to a contract SLA that does not require notifying tenants; they patch/update without warning, sometimes taking multiple nodes down at once and crashing the HA cluster. Mitigation guidance to those teams: update one VM at a time so the HA cluster can recover. No specific threshold metric/value was produced. *[Threshold metric/value: left blank - none given.]*

  > Claim: no dependable early-warning; failure driven by uncommunicated infra changes
  > Segment: mixed federal (FSI-operated environments)
  > Role of source: SE (Olson)
  > Basis: direct
  > Confidence note: organizational/communication failure mode, not a metric threshold -> Medium

### Q8 - Add capacity vs new cluster + ceiling (D3, H5)
"When a customer outgrows their setup, what's the right move? Is there a ceiling forcing a second cluster?"

- **Answer:** Generally **add resources to the existing cluster**. Standing up a new cluster is usually **planned in advance** (for high transactional requirements, geographic challenges, or performance replication) rather than a reaction to a spike. Vault clusters are performant and usually designed robustly enough; federal customers rarely face millions/tens-of-millions of transactions per hour (not a typical federal profile).
- **Hard ceiling / forced second cluster:** **Classified networks.** Vault does not support cross-domain / MLS, so each classified network requires its own cluster/production environment. Customers cite 24 or 50 classified networks needing support, which forces a separate deployment per network. This is why **Vault CE proliferates** in those environments (no license cost, managed per-network/per-mission).

  > Claim: default = scale-up existing cluster; new cluster planned or forced by classified-network isolation
  > Segment: mixed; DoW/IC for the classified-network ceiling
  > Role of source: SE (Olson)
  > Basis: direct/secondhand
  > Confidence note: MCSP ~500-worker-node/Hypershift ceiling not raised by participant; sharding not discussed -> Medium

### Q9 - Demand concentration (D1, H2)
"How concentrated is demand? Largest vs typical - how many times bigger?"

- **Answer:** Most federal customers **start the same way** - a starter Vault Enterprise cluster around **100-200 clients** - then grow by onboarding workloads/users and "true up" at renewal (e.g., 100 -> 250 or 500). It is **rare** for a customer to arrive needing a 10,000-client cluster. Tim Silk: ~**1,000 clients** is the typical large acquisition. Even smaller accounts tend to ramp up quickly, then ramp back down to control cost. Demand is not heavily concentrated into a few giant accounts in this dataset.

  > Claim: starter ~100-200 clients; typical large ~1,000; 10,000 rare
  > Segment: mixed federal
  > Role of source: SE (Olson), management (Silk)
  > Basis: direct/secondhand (renewal/true-up observations)
  > Confidence note: two agreeing self-report sources, no telemetry -> Medium

### Q10 - Growth over 12 months (D1, D2)
"How fast does usage grow once in production - flat, steady, step-changes? Over 12 months, how much larger?"

- **Answer:** Growth happens **over months**, usually realized at the **annual renewal** rather than as spikes. It is **known and planned** (not spiky) because the field stays engaged via cadence calls, helping the customer adopt/grow so the renewal expansion is expected (e.g., 100 -> 250/500 clients). Off-cycle client purchases happen occasionally but are uncommon.

  > Claim: steady month-over-month growth, realized at annual renewal; ~2-5x starter over first cycle
  > Segment: mixed federal
  > Role of source: SE (Olson), management (Silk)
  > Basis: direct/secondhand
  > Confidence note: consistent, no telemetry -> Medium

### Q11 - Availability + RTO/RPO (D4)
"What availability do federal customers expect, and what recovery time / data-loss window after a region or zone failure? Differ by segment?"

- **Answer:** Not directly asked/answered with SLA/RTO/RPO figures. Related signal only: almost all customers have a **DR requirement** and DR is set up; deployments typically include a main production cluster, sometimes performance replication (PR), and DR. *[No SLA / RTO / RPO numbers given - left blank.]*

### Q12 - RFP/RFI vs production (D1, D4, H4)
"When a customer states sizing/load in an RFP or RFI, how does that compare to production - which way, by how much?"

- **Answer:** Not asked as a direct RFP-vs-production comparison; no explicit direction/magnitude produced. Adjacent signal only: the **"true-up"** pattern (start ~100 clients provisioned, consume ~98, expand at renewal) suggests initial provisioning tracks near actual early usage rather than large over- or under-statement. *[Explicit RFP-vs-production direction and magnitude: left blank - not answered.]*

### Q13 - Launch blocker + platform worry (D5)
"What's most likely to make a federal customer walk away on day one? What's deal-dead vs live-without at launch?"

- **Answer:** No single day-one walk-away feature was named. The dominant framing from Tim Olson: **FedRAMP is a market-penetration issue, not a technical one.** Simply having HCP/Vault at FedRAMP High with an ATO confers **perception and credibility** - it signals that the hard compliance hoops have been cleared, which gets Vault into consideration ("if they don't know, they don't even call us"). IC customers ask whether HCP Vault is FedRAMP compliant even though FedRAMP High is not classified enough for them, because visibility on the FedRAMP marketplace is what earns the first look. *[Specific deal-dead platform feature at launch: left blank - not specified.]*

### Q14 - Archetype grouping (D1, D5, H5)
"If you sorted federal Vault customers into groups by how they use and scale Vault, how many groups, what separates the most demanding from a modest one, and does heavy load concentrate in one group?"

- **Answer:** Not asked as an explicit "how many groups" question, but the session surfaced distinct usage patterns (derived, not enumerated by the participant):
  1. **Established enterprise / agency-wide** - mature (7+ years), many/nested namespaces, designated per-namespace admins, agency-wide offering, higher human logins (10-15) and thousands of machine transactions.
  2. **Edge / embedded ("vault in a box")** - Vault embedded in an application at the edge (two-man carry kit in theater); users never log into Vault, they see only the app; typically a single admin, sometimes two.
  3. **Classified / IC** - per-classified-network isolation, no cross-domain/MLS, drives Vault CE proliferation; operational detail withheld.
  4. **Civilian-secure** - IRS, DHS; "civilian" but highly locked down, seasonal spikes (IRS April, Census).
- **Heavy load concentration:** Heavy/spiky load concentrates in **DoW and IC** during mission events. *[Participant did not state a group count - grouping is analyst-derived.]*

---

## Section 4: Wrap-up

### "Anything I should have asked and didn't?"
- Tim Olson's closing statement: reinforce that **FedRAMP is market penetration, not a technical gate**. Having FedRAMP High + ATO brings perception and credibility even for customers (IC) who cannot consume High directly. Absence from the FedRAMP marketplace means customers never call.

### "Which one number would you most want validated before we bet a launch limit on it?"
- Not answered with a single named metric. *[Left blank.]*

### Recommended additional participants
- **Dan Fedick** - federal field CTO; previously covered the Air Force (one of the largest customers); broad technical depth across the business.
- **Luke Mccleary** - owns some of the largest Vault enterprise customers.

---

## Session Summary

Session #1 was a 67-minute internal interview with Tim Silk (manager, public-sector pre-sales engineering) and Tim Olson (solutions engineer, 7+ years federal), moderated by Benjamin Howard. Both participants have direct exposure across all federal segments (DoD, civilian, IC) plus state/local. The session produced directional quantitative ranges (all self-report / estimate, none telemetry-confirmed) and several strong qualitative signals.

**Quantitative picture captured:**

| Dimension | Low / typical | Largest-seen | Basis |
|---|---|---|---|
| Human users (logins) | 3-5 | 10-15 | estimate/secondhand |
| Machines / apps auth | hundreds (~300-500) | thousands (event-driven) | guesstimate |
| Namespaces | 2-3 (unnested) | 12+ (nested) | direct/secondhand |
| Secrets engines | 2-6 | - | direct/secondhand |
| Auth rate | ~50-90/min | mid-high hundreds/min | estimate |
| Client provisioning | 100-200 starter | ~1,000 typical-large; 10k rare | direct/secondhand |
| Growth | steady over months, realized at annual renewal (~2-5x) | - | direct/secondhand |

**Key qualitative findings:**

- **Machine-heavy pattern confirmed directionally (H1).** Human logins are low and infrequent because federal customers front Vault with existing IdM/SSO and call Vault via API; machine/app auth dominates and scales into the thousands during events.
- **Network bandwidth is the first saturation point, not memory (contradicts H3).** Resource exhaustion is rare; most incidents come from uncommunicated infrastructure changes by separate infra/FSI teams taking cluster nodes down.
- **Scaling is scale-up-first; new clusters are planned, not reactive.** The one hard ceiling forcing multiple clusters is classified-network isolation (no cross-domain/MLS support), which also drives Vault CE proliferation in IC/DoW.
- **PKI / cert-lifecycle automation is the strongest untapped demand signal.** The move toward short-lived certs (an emerging 75-day rotation expectation vs today's manual 3-5 year rotation) is a concrete, Vault-native problem the field wants marketed harder than the ambiguous "zero trust" message.
- **FedRAMP value is market penetration, not a technical checkbox.** FedRAMP High + ATO earns perception, credibility, and marketplace visibility that generates inbound interest, even from IC customers who cannot consume High directly.

**Not captured / gaps to close:** No SLA/RTO/RPO figures (Q11), no explicit RFP-vs-production comparison (Q12), no per-secrets-engine entry counts (Q3), no named single day-one deal-dead feature (Q13), no peak-over-baseline multiple (Q4), no participant-stated archetype count or single most-wanted validated number (Q14 / wrap-up). These remain telemetry- or follow-up-dependent.

**Next steps surfaced:** Recruit Dan Fedick and Luke Mccleary; anchor every range above against Sigma telemetry before it enters the tier matrix.

---

## Detailed Analysis: Mapping Session #1 to Context Documents

This section maps Session #1 evidence against the three context documents: the 5/20 Research Sync, the 6/04 Research Sync, and the Research Plan. Confidence follows the Research Plan rubric (High/Medium/Low); interview-only claims cap at Medium.

### A. Mapping to `MCSP_Research_Sync_5:20` (Scope, Limits, Connections)

| 5/20 discussion point | Session #1 evidence | Assessment |
|---|---|---|
| Define "number of connections" = machines/apps hitting Vault + users logging in (5/20 core need) | Direct answers: users 3-5 typical / 10-15 max; machines hundreds typical / thousands peak | **Validated directionally.** Session #1 delivers the exact metric 5/20 flagged as the must-have. Still self-report; anchor to Sigma. |
| Adoption curve: early = higher logins, lower machines; later = higher machines, lower logins (5/20) | Confirmed: humans rarely log in (IdM/SSO + API); machine/app auth dominates as Vault embeds into workflows | **Validated.** Olson's "vault in a box" / embedded-app examples are the mature end of the same curve Sara described. |
| High-RAM pressure is the known bottleneck; compute pressure easing (5/20) | Contradicted: field says **network bandwidth** saturates first; resource exhaustion is rare | **Conflict flagged.** 5/20 (and H3) expect memory-first; field observes network-first. Telemetry is the tie-breaker (Research Plan rule). High-priority reconciliation item. |
| Managed-service capacity is finite (AWS/OpenShift limits); need per-offering limits and above-threshold policy (5/20) | Field default is scale-up existing cluster; new clusters planned; classified-network isolation forces separate clusters | **Partially informs D3.** Behavior differs on self-managed (customers add machines freely) vs the finite managed model 5/20 is scoping - reinforces that self-managed behavior is an upper-bound reference, not a direct limit. |
| Use public-sector / self-managed data because federal is almost all self-managed (5/20) | All Session #1 accounts are self-managed Vault Enterprise; participants note FedRAMP absence blocks cloud calls | **Consistent.** Confirms the sampling rationale; every number is self-managed behavior needing translation to the MCSP managed envelope. |
| Segment by federal agency type (VA, DoD), not commercial industry (5/20) | Evidence organized by DoD/DoW, IC, civilian (IRS/DHS), state/local | **Consistent.** Supports segment-tagged claims. |
| Fitara / executive mandates drive cloud adoption + security (5/20) | Cert-rotation modernization, zero-trust mandates, and security-org-driven ATO requirements echo the same demand-side push | **Reinforced.** Adds a concrete mechanism (cert lifecycle / short-TTL) to the mandate-driven demand thesis. |
| Client counts are a rough, inaccurate proxy alone (5/20) | Client provisioning (100-200 start, ~1,000 large) given but framed as licensing/true-up, distinct from live machine auth | **Consistent caution.** Client count ≠ live connection load; keep them separate in the tier matrix. |

### B. Mapping to `MCSP_Research_Sync_6:04` (Root Namespace, Sandbox, RFI)

| 6/04 discussion point | Session #1 evidence | Assessment |
|---|---|---|
| Root-namespace retention blocks self-managed -> cloud migration; some migrations took ~3 years (6/04) | Not raised directly; but Session #1 confirms federal is entrenched self-managed with deep namespace structures (12+, nested) and per-namespace admins | **Corroborates the stakes.** The nested-namespace maturity Olson describes is exactly what makes the root-namespace migration hard - supports why the "hack" matters. |
| Namespaces carry global policies inherited by child namespaces (6/04) | Confirmed: large account uses many namespaces with nested children and designated admins | **Validated.** Field-side confirmation of the 6/04 technical framing. |
| Federal (IC/DoD) requires FedRAMP; won't put secrets in cloud "willy-nilly" (6/04) | Confirmed and extended: even IC asks if HCP Vault is FedRAMP-compliant for perception/credibility, though High isn't classified enough for them | **Validated + nuanced.** FedRAMP is a market-entry signal even for segments that can't consume it. |
| Cloud is not for theater/edge; value is faster enablement of less-sensitive data (6/04) | Confirmed: "vault in a box" / two-man-carry edge is embedded self-managed; cloud can't reach NIPR/SIPR | **Consistent.** Edge/embedded archetype stays self-managed; MCSP targets less-sensitive federal workloads. |
| Vault-in-a-box: off-grid units pull creds for 30 days, refreshed on cadence (6/04) | Independently described the same pattern (two-man carry kit, embedded Vault, 30-day cred pulls) | **Strongly corroborated.** Two independent sources describe the identical edge pattern - raises confidence on that archetype. |
| Project reframing: Vault is the star, MCSP is the platform (6/04) | Participants speak in Vault terms; FedRAMP framed as Vault market penetration | **Consistent.** Findings should be framed as Vault FedRAMP offering limits, not "MCSP" limits. |
| RFI/RFP ingestion ("Bob" program) to extract required answers incl. SLAs (6/04) | Session #1 did **not** produce SLA/RTO/RPO figures (Q11 blank) | **Gap confirmed.** Reinforces that SLA data must come from RFI ingestion + telemetry, not internal interviews. |

### C. Mapping to `[Research Plan] MCSP FedRAMP Adoption Exploration` (Decisions & Hypotheses)

**Decision coverage:**

| Decision | Session #1 contribution | Confidence (interview-only) |
|---|---|---|
| **D1** Limit envelope by tier (users/apps/throughput/secrets) | Ranges for users, machines/apps, namespaces, secrets engines, auth rate, client counts | Medium (needs telemetry) |
| **D2** Default sizing / guardrail thresholds (CPU/RAM/network) | Network bandwidth = first limiter; resource rarely limits | Medium; conflicts with RAM-first assumption |
| **D3** Scale response policy | Scale-up existing cluster default; planned new clusters; classified-network isolation forces new clusters | Medium |
| **D4** SLA / reliability by segment | Only "DR is standard / PR+DR present"; no SLA/RTO/RPO numbers | Low (blank on figures) |
| **D5** Launch blockers vs backlog | No single deal-dead feature; FedRAMP presence = market-entry credibility | Low/Medium |

**Hypothesis testing:**

| Hypothesis | Session #1 signal | Status (interview-level) |
|---|---|---|
| **H1** Federal workloads are machine-heavy, sustained auth pressure | Supported: low human logins, hundreds-thousands machine auth, API-fronted | **Supported, directional.** Reject-threshold (machine:human ≥5:1) plausibly met (e.g., hundreds machines vs 3-5 humans) but not measured; confirm in telemetry. |
| **H2** Few high-scale orgs drive disproportionate demand | Weak/mixed: most start similar (100-200), ~1,000 typical-large, 10k rare; one 7-yr outlier | **Not clearly supported.** Demand looks more evenly distributed than concentrated; the "top-20%-drive-50%" test is unresolved - telemetry-dependent. |
| **H3** Memory pressure is an earlier bottleneck than CPU | Contradicted: network bandwidth first; resource exhaustion rare | **Challenged.** Directly conflicts. Flag as priority telemetry reconciliation; may reframe H3 toward network. |
| **H4** RFP/RFI understate dynamic load | Not tested (Q12 blank); only true-up pattern hints provisioning tracks near actual | **Unresolved.** Route to RFI ingestion + Q12 in later sessions. |
| **H5** One global limit set too coarse; ≥3 tiers needed | Supported: distinct archetypes (enterprise agency-wide, edge/embedded, classified/IC, civilian-secure) with different scale/load profiles | **Supported, directional.** ≥3-4 natural groupings emerged; supports multi-tier launch limits. |

**Research-plan method alignment:**

- **Confidence rubric honored:** Every Session #1 claim is single/dual self-report without telemetry -> **Medium cap** per rubric; none should ship as High until Sigma-anchored.
- **Bias watch:** Olson explicitly flagged his machine/app numbers as "completely guesstimated" and event spikes as unpredictable - matches the plan's recency/deal-positivity bias caution. Treat ranges as candidate bands, not settled numbers.
- **Telemetry tie-breaker triggered:** The network-vs-memory conflict (H3) and the concentration question (H2) are the two highest-value items to resolve against Sigma, per the plan's "prefer telemetry, flag the gap" rule.
- **Screening satisfied:** Both participants meet screening (direct federal exposure in last 12 months, SE + management roles, self-managed Vault Enterprise familiarity, able to give quantitative estimates).

### D. Cross-document synthesis takeaways

1. **The core "connections" metric (5/20) is now populated** with directional ranges, but all three documents agree it must be anchored to Sigma telemetry before feeding D1.
2. **One assumption is actively challenged:** the RAM-first bottleneck belief (5/20, H3) versus the field's network-first observation. This is the single most important reconciliation for D2.
3. **Two archetypes are now double-sourced** (edge/embedded "vault in a box" appears in both 6/04 and Session #1), strengthening the case for multi-tier limits (H5, D5).
4. **A marketing/positioning insight** (PKI cert-lifecycle automation and FedRAMP-as-credibility) exceeds the study's sizing scope but is a high-value demand signal to route back to product/marketing.
5. **Persistent gaps** (SLA/RTO/RPO, RFP-vs-production, secrets-per-engine) confirm the plan's reliance on RFI ingestion (6/04 "Bob") and telemetry rather than internal interviews for D4 and H4.
