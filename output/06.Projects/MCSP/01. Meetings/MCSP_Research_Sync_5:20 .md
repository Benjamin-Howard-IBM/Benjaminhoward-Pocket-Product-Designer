---
title: "MCSP Discussion - Scope, Limits, and Connections"
date: "2026-05-22"
attendees: [Benjamin Howard, Sara Snowden]
tags: [MCSP, Vault, HVD, HCP, FedRAMP, capacity-planning, discovery]
---

# 001.26.05.22-MCSP-Discussion

## TL;DR

Sara walked Benjamin through the MCSP Vault project: rebuild Vault to run on IBM's MCSP platform (on OpenShift / Kubernetes / AWS), initially targeting FedRAMP customers, with HCP/HVD continuing as the commercial offering for now. The primary near-term need is to determine sizing and operational limits (compute, RAM, networking, connections) by understanding customer behavior - especially how many machines and apps hit Vault. Sara identified RFPs from public sector customers and Sigma data as the most promising sources, and is granting Benjamin access via Doormat / Passport.

## Context

Second working session between Benjamin (designer) and Sara (product owner for MCSP Vault) to align on project scope, requirements, and the analytics work needed to define platform limits. Sara previously sent a deck and FedRAMP document; this meeting framed how those tie together.

## Key Discussion Points

### Project framing: HCP vs MCSP vs HVD vs Vault Enterprise

- **HVD (HashiCorp Vault Dedicated)** runs only on HCP (HashiCorp Cloud Platform). It is a hosted, dedicated managed service.
- **MCSP** is IBM's Multi-Cloud Software Platform. Vault on MCSP runs on shared infrastructure, so it is not "dedicated" - internally referred to as "Vault on MCSP," not HVD.
- **Vault Enterprise / Vault Self-Managed** is the same underlying binary; HVD runs Vault Enterprise but withholds some capabilities so HashiCorp can manage upgrades, etc. Public sector customers cannot use HVD today; they run Vault Enterprise self-managed, and will be able to use MCSP.
- HCP provides shared platform services (license management, billing, etc.) out of the box. MCSP provides only small pieces, so the Vault team has to rebuild most of that themselves.
- Long-term executive guidance: retire HCP and adopt MCSP. Sara has pushed back to wait until the MCSP platform matures further.

### Why limits matter

- In a managed service, capacity is finite (AWS limits, OpenShift limits, layered infra). Customers can't simply add machines like they could on self-managed.
- The team must set parameters per offering ("you can store up to X secrets, run Y connections") and decide what happens above those thresholds: new cluster (customer pays) or allocated additional capacity for small bumps.
- HVD already publishes a set of limits; Sara wants MCSP to meet or exceed them. She copied HVD limits into the deck as a baseline reference.

### What "connections" means

- Not connections between infrastructure layers. Sara means:
  - How many machines/apps are hitting Vault from a given customer.
  - How many users are logging in.
- Typical adoption curve: early on - higher user logins, lower machine counts; later - much higher machine/app traffic, lower interactive logins.
- Ideal grain would be calls per cadence, but Sara doubts that level of detail will be available in RFPs or in SE/AE heads.

### Capacity, sizing, and cost trade-off

- Need to validate current instance sizing (compute + RAM per customer cluster) is sufficient, and define VM density (how many customers per VM size) before increases are required.
- High-RAM pressure is a known issue because the most popular secret engines are memory-heavy. Compute pressure has eased over the past year but still exists.
- Goals: high SLAs and good customer experience without over-provisioning, which is expensive.
- If AWS limits block further scaling, the team needs a defined fallback plan.

### Data sources and customer scope

- Sara is intentionally using **public sector / self-managed** data rather than HVD telemetry, because federal customers (the FedRAMP target) are almost exclusively self-managed today.
- Self-managed customers do not share telemetry by default; some opt in via in-product tooling. This is how Sara pulled the data already captured.
- Sigma is the main analytics tool. Sara found data there but suspects it is only a partial view.
- "We're not looking at AI companies, we're looking at the VA, DoD, and similar." Customer segmentation should be by federal agency type, not commercial industry.
- Fitara and related executive mandates are pushing federal agencies toward cloud adoption, modernization, and improved security - a clear demand-side driver.

### Deliverables and timeline

- Working horizon discussed previously: ~1 month.
- Must-have: a defensible understanding of "number of connections" per customer profile.
- Nice-to-have: cadence/frequency of calls.
- Best path Sara sees: pull 5-10 public sector RFPs / RFSs that describe customer environments and scrape numbers from them.
- Client counts in the deck were offered as a rough proxy but would be very inaccurate alone.

### Access and tooling

- Benjamin needs Sigma view access via Passport (HashiCorp SSO) using his HashiCorp email; Sara is sending the Doormat link via Slack. Approval typically takes 1-2 days. View-only - no data export.
- HashiCorp email will continue to forward for a while as IBM transitions identity to Access Hub.

## Decisions & Action Items

- [x] Use public sector / self-managed data (not HVD telemetry) as the primary input for MCSP capacity planning -- Sara
- [x] Defer MCSP commercial migration; near-term MCSP focus is FedRAMP / federal, with Canadian Protected B as the likely next region -- Sara
- [ ] Send Benjamin the Doormat link and Sigma lookup instructions via Slack -- Sara -- same day
- [ ] Request Sigma access via Passport using HashiCorp email -- Benjamin -- this week
- [ ] Send Benjamin the initial business case doc (drivers, revenue, context) -- Sara
- [ ] Source 5-10 public sector RFPs / RFSs and extract customer environment numbers (machines hitting Vault, user counts, app counts) -- Benjamin (with Sara's help routing through SAs / SEs / RTS) -- ~1 month
- [ ] Schedule a follow-up next week to continue context-building -- Sara + Benjamin -- next week
- [ ] Build an exhaustive (or representative) public sector client list to identify whom to talk to -- Sara -- TBD

## Open Questions

- What is the actual count of machines / apps hitting Vault per customer profile, and at what cadence? -- raised by Sara
- How does HVD's published limit set translate to MCSP given the added OpenShift + MCSP + AWS layering? -- raised by Sara
- If AWS-imposed limits block scaling for a given customer, what is the standard response (new cluster vs. allocate capacity vs. decline)? -- raised by Sara
- Will the existing internal tracker sheet of Sigma-sourced customers be enough, or do we need to engage SEs / RTS directly for environment details? -- raised by Benjamin
- What is the long-term identity / email plan once HashiCorp email is fully migrated to IBM Access Hub? -- raised by Benjamin

## Raw Transcript

The verbatim WebVTT source is preserved at `output/02.strategy/MCSP discussion.vtt`. A speaker-ordered, time-stamped Markdown rendering of the same conversation is at `output/02.strategy/MCSP discussion.md`.

Excerpted highlights below; full transcript in the sibling files above.

> **[00:01:41] Sara:** Okay, so for, and the two are kind of related and overlapping, right? ... So for software, you have to determine what your limits are, what you're telling customers you can do. A customer can't come in and put a million secrets in to vaults [without us having to need to increase our machine size, our underlying infrastructure].

> **[00:02:43] Sara:** So HVD is HashiCorp Vault dedicated... It's a hosted cloud version just like what we're doing, except it's on the HashiCorp Cloud Platform, HCP. And what we're doing is we're rebuilding Vault to run on the multi-cloud software platform, IBM's overarching platform.

> **[00:04:32] Sara:** In a managed service environment, you only have so much capacity. You can only have so many connections... because there are physical limits that AWS has or maybe OpenShift has. Because we are running vaults on OpenShift.

> **[00:08:16] Sara:** [Focus right now is on] federal. There's a lot of challenges of how do we do both and make it clear so sellers know what to sell when. ... The call was made to just bypass that for now and just focus on Fed in the MCSP setting.

> **[00:08:45] Sara:** Long term, we'll end up getting rid of HCP eventually and adopting MCSP. That is the long term executive guidance that's been given. I've put the feelers out... let's wait. We need some advances from the platform before we do that.

> **[00:11:10] Sara:** No, so Vault self-managed is also called Vault Enterprise. To make this really muddy, HVD does run Vault Enterprise, but they don't give customers all of the capabilities... So we can upgrade their software when they need to upgrade.

> **[00:16:22] Sara:** The big need-to-have is understanding how many connections. ... I think the best would be to get a couple RFPs or RFSs ... from public sector customers looking for vault and just seeing what their accounts are.

> **[00:18:54] Sara:** How many machines are hitting [Vault] from a customer? How many users are logging in...? So in the beginning, you have higher user accounts, lower machine counts. ... Over time, it gets more embedded into their workflows. ... You'll see very little login and you'll see a lot of machines.

> **[00:21:27] Sara:** But we're not looking at AI companies, we're looking at like the VA and we're looking at the Department of Defense or we're looking at so on and so forth.

> **[00:21:40] Sara:** There is a lot of push from Fitara. It's a federal initiative that ... agencies need to basically adopt cloud, work on modernization. They need to increase their security. There's an executive mandate.
