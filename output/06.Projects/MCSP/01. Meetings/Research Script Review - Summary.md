# Research Script Review - Meeting Summary

**Date:** June 11, 2026, 5:02PM
**Duration:** 30m 8s
**Attendees:** Benjamin Howard, Sara Snowden
**Source:** `06. Raw Documents/Research Script Review.md`

## TL;DR

Benjamin and Sara walked through the MCSP FedRAMP research interview script question by question to prioritize, refine, and set expectations on what data is realistically obtainable from field/SE interviews. They agreed the core goal is understanding how federal customers use Vault and what their scale/architecture looks like, then scoped a recruiting and scheduling plan to begin interviews the week of June 18.

## Context

- The research supports the MCSP limits/capacity project: understanding customer usage patterns and scale so HashiCorp can size and support a FedRAMP cloud offering properly.
- The team reviewed the script live, flagging which questions are high-value, which are unlikely to yield data, and where to add or pivot questions.

## Key Discussion Points

- **Usage and scale (Q1-Q2):** Most important to the project but least likely to get precise answers. Getting granular data out of Vault is difficult. Expect high-level, directional answers at best.
- **Secrets measurement (Q3):** Ask in terms of "secrets" generally, not KV entries. Frame as secrets per secrets engine (not per cluster), since usage could be PKI, KV v2, etc. Existing data shows engines in use but not secret volume per engine.
- **Auth rate / steady vs. spiky (Q5):** Strong question. Spiky usage often means the customer hit issues requiring rate limits/quotas, which surfaces good insight. Spiky vs. steady also helps determine memory vs. compute pressure based on the secrets engine involved.
- **Heavy features / load drivers:** Worth asking; answers depend on how well the interviewee knows their customer. Hit or miss across prior recordings.
- **Scaling / what runs out first (Q6):** Natural continuation of load questions. Peak concurrency and storage details unlikely to be known. Suggested adding an architecture probe (OpenShift, node count, bare metal vs. VMs) as a capacity indicator.
- **Customer growth events (Q7):** Identified as a "killer question." Major customer events are well remembered by SEs and yield strong real-world scaling stories.
- **Architecture / deployment (Q8):** All these customers are self-managed, on-prem in their data centers (one possible cloud/federal division case). Deployment varies: OpenShift, bare metal VMs, straight VMs, typically containers/Kubernetes, possibly air-gapped. Pairs well with the "outgrow your setup" question and informs future cloud emulation work.
- **Demand concentration / sizing (Q9):** Identify the largest customers and what their org looks like. Goal is to understand highs and lows to design solutions for common denominators, not outliers. Note: shifting away from "tiers" language (tiers already exist in public cloud); this will be a standard.
- **Onboarding (Q10):** Vault onboarding is a known, notoriously difficult problem (both self-managed and cloud). Federal procurement cycles are slow; customers often arrive ready to go, but shared-services setup can create queues. UI is underused/disliked. Worth capturing the federal-specific perspective.
- **Reliability / availability:** West-to-East region latency not a real concern. Note: AWS GovCloud East has never had a true outage. Curious what customers run in lower environments vs. production.
- **RFP/procurement reality:** Government RFPs are unusual ("bid to get the ability to bid"). Field conversations differ significantly from formal paperwork; field reps likely have valuable informal insight.
- **Open priorities question (Q14):** Intentionally open-ended. Customers may simply want a FedRAMP cloud version, but open framing could surface useful tidbits. Field folks are usually dedicated to one customer, so variety may be limited.

## Decisions

- Prioritize and trim the script; deprioritize or strike out-of-scope questions rather than expecting full data on everything.
- Add an architecture/deployment probe (OpenShift, node count, bare metal vs. VMs) earlier in the flow.
- Pair the architecture question with the "outgrow your setup" question.
- Keep the open-ended priorities question despite uncertain yield.
- Move away from "tiers" terminology toward a single standard.

## Action Items

- **Benjamin:** Rework and reprioritize the script, incorporating discussion notes; remove deprioritized items.
- **Benjamin:** Build a research schedule and an email/intro template for outreach.
- **Sara:** Recruit field participants informally (Tim Wilson, Tim Silk/Tim Olson's boss, Dan the field CTO as partners), and identify additional contacts.
- **Schedule:** One pilot interview on June 18 to test and refine; full batch June 22-26, stacking up to 3/day. Target 5-8 interviews, ideally up to 10.

## Open Questions

- Will field/SE interviewees have any granular usage/scale data, or only directional answers?
- How are the rare cloud/federal-division customers actually running Vault?
- How many participants can realistically be recruited in the target window?
