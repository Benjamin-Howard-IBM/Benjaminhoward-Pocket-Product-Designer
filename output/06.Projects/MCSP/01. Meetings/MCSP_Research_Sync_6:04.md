---
title: "MCSP Research Sync - Root Namespace, Sandbox Vision, and RFI Ingestion"
date: "2026-06-04"
attendees: [Benjamin Howard, Sara Snowden]
tags: [MCSP, Vault, HCP, FedRAMP, root-namespace, migration, sandbox, RFI, research-plan, discovery]
---

# 002.26.06.04-MCSP-Research-Sync

## TL;DR

Sara walked Benjamin through the core technical blocker for the MCSP Vault offering: the root namespace. Vault Enterprise customers get root access on self-managed clusters, but Vault Cloud retains root namespace so HashiCorp can manage upgrades, patching, snapshots, and DR. Customers operating in a different namespace cannot migrate to cloud without losing functionality - a pain point that has taken some customers up to three years. The team found a "hack" to hide sensitive protected endpoints (like replication) while still giving customers root, which would unblock self-managed and enterprise migration to cloud. This matters most in federal, where ICs and DoD agencies require FedRAMP. Sara reframed the project context: MCSP is just the underlying platform - Vault launching a FedRAMP-high offering is the star. Benjamin shared his research plan progress (quantitative focus, analysis of TJ's six prior sessions, an IBM "Bob" program for ingesting RFIs/RFPs). Sara will review the research study plan and provide feedback so recruiting can begin. Logging design was flagged as upcoming work.

## Context

Working sync between Benjamin (designer) and Sara (product owner for MCSP Vault), following the earlier 5/22 discovery session. This conversation went deeper on the namespace/migration technical constraint, surfaced a future sandbox/digital-twin opportunity, corrected the project's framing (Vault, not MCSP, is the product), and reviewed the state of Benjamin's research plan and RFI ingestion work. A significant portion was rapport-building drawing on Benjamin's military background, which informed shared understanding of air-gapped federal networks (NIPR, SIPR, JWICS).

## Key Discussion Points

### The root namespace problem

- Vault Enterprise customers get **root access** when they set up their own cluster because they have to do all the configuration. The root namespace has many things tied directly to it - permissions, global policies that all child namespaces inherit.
- In **Vault Cloud**, HashiCorp retains the root namespace so it can manage the customer environment: upgrade clusters, patch, enable snapshots, enable DR. Customers are given an **admin namespace** instead.
- HashiCorp withholds sensitive APIs (e.g., DR setup) but builds the solution and extends scoped permissions so customers can execute those actions while HashiCorp retains ownership behind the scenes - effectively giving customers visibility and limited capability without risk.

### Why retaining root is dangerous (the replication endpoint)

- Because of how namespaces are situated, a customer could hit the **replication endpoint** and inherently pick up everything in the environment if not restricted - including what HashiCorp controls and even other customers' data. So those endpoints must be hidden.
- The team found a "brilliant hack" to hide the over-powered protected endpoints while still giving customers root namespace and most Enterprise functionality (not everything). HashiCorp retains the sensitive pieces.
- A cleaner long-term solution is in design: customers turn on a listener just for HashiCorp, create a namespace, and place protected endpoints into it - more elegant and efficient.
- Blocker: building the cleaner solution requires a different team that lacks capacity, because it is the same team working on **NHI** (the most critical vault-wide priority).

### Migration pain today

- Giving customers root means any self-managed or enterprise customer **could migrate to cloud**.
- Today, migration requires running a script to bring the namespace down to admin, losing a lot of functionality, then manually updating every connection and integration.
- Sara knows of only ~2 customers who attempted it: one's setup flattened everything and failed because they were far over capacity (cloud has very different limits); another took roughly **3 years** to migrate. It has been a major blocker for cloud adoption.

### Federal importance

- In the federal environment this is critically important. ICs and DoD agencies will not put secrets "willy-nilly" in cloud - they require **FedRAMP**.

### Future opportunity: sandbox / digital twin

- Standing up Vault is a lot of work (networking, compute, storage, databases). In cloud, HashiCorp handles that.
- If customers operate in the same namespace with on-prem-equivalent controls, they could create a **sandbox environment** to test any configuration - spin up a cluster, test, tear down in minutes instead of weeks/months - without real secrets or live data.
- Use cases beyond a digital twin: testing brand-new ideas/concepts, and running actual non-sensitive workloads (data not requiring IL5/IL6).
- Benjamin proposed an automatic/one-click model: a customer deploys on-prem, clicks a button, and a cloud version is created (analogous to a Git branch you can later sync). Sara found this a compelling, better UX than she'd imagined, but flagged it as **way future** and enormously complicated - core team would own the bulk of the work, and it would need strong demand to justify.
- Entering the FedRAMP space is expected to raise public-sector visibility, generate pipeline, and build the demand case.

### Federal networks and air-gapped context

- Discussion of contained/air-gapped networks from Benjamin's military experience: SIPR (classified) vs NIPR (open), Toughbooks, Merk Chat (private cadence-based comms), and JWICS (intelligence community, used heavily by air units for coordination, target dumps, aircraft).
- Enterprise already supports these self-contained use cases; cloud cannot connect in or out of NIPR/SIPR.
- The cloud version is **not** for theater/edge situations. Its value is getting people enabled faster and giving cheaper, easier access for less-sensitive federal data (e.g., HR systems) under zero-trust and modernization mandates. GovCloud is cheaper and easier than the bureaucratic NIPR/SIPR process.
- The "vault in a box" example: Air Force/Navy edge units where soldiers off-grid pull credentials for 30 days at a time from self-contained units, refreshed on set cadences - showing how complex and varied customer Vault setups are, and why they're hard to duplicate.

### Federal adoption is slow

- The military moves slowly because of legacy systems, scale (DoD), and everything being interdependent ("right now, it's all paper").
- Change must bubble up from squadron level upward; it is a 24/7/365 machine where downtime has serious consequences ("people die... people lose their pay"), unlike commercial email outages.

### Project reframing: Vault is the star, MCSP is the platform

- Sara corrected the research plan's opening line. It should **not** say "MCSP needs to launch a FedRAMP-ready managed vault offering."
- MCSP is the underlying platform the offering runs on - it provisions some services with a little UI, but is "not really a platform" and is not the star.
- Correct framing: **Vault wants to launch a FedRAMP-high offering**; MCSP is just the platform it runs on. Benjamin will update the research plan accordingly.

### Research plan and RFI ingestion progress

- Benjamin's research plan focuses on the **quantitative** side, since qualitative ground was covered in TJ's prior sessions.
- He analyzed all **six** of TJ's sessions (Sara thought there were four; two were ~1 hour, the rest 30-45 min) and cross-referenced them to derive questions.
- He is building an **IBM "Bob" program** to ingest RFI/RFP content. He is going through public-sector RFI folders (e.g., an Army one), extracting the questions agencies ask plus HashiCorp's existing answers, to identify what must be answered (including SLAs) and future-proof a queryable knowledge source.
- Sara strongly endorsed this as "forward thinking" - it helps define limits now and answers future questions later. She advised just dumping documents in rather than reading each one. She is separately hitting RFP folders with Gemini queries in the background.

## Decisions & Action Items

- [x] Reframe the offering: Vault is launching a FedRAMP-high offering; MCSP is the underlying platform, not the product -- Sara
- [ ] Update the research plan's opening context to reflect the Vault-not-MCSP framing -- Benjamin
- [ ] Review the research study plan and provide feedback -- Sara -- this afternoon / evening
- [ ] Continue building/ingesting RFIs and RFPs into the IBM "Bob" program -- Benjamin
- [ ] Begin recruiting and next research phase once the study plan feedback lands -- Benjamin + Sara
- [ ] Schedule a follow-up to discuss logging design (simple, single-pane, not multi-pane) -- Sara + Benjamin -- next
- [ ] Continue Gemini-based RFP folder queries to gather intel -- Sara -- ongoing

## Open Questions

- Can a cleaner protected-endpoint solution (listener + dedicated namespace) be prioritized given the NHI team's capacity constraints? -- raised by Sara
- Is there a viable path to an automatic / one-click "create a cloud version" sandbox from an on-prem deployment, and what demand threshold would justify it? -- raised by Benjamin / Sara
- How does retaining root namespace for customers scale safely across many tenants without cross-customer data exposure? -- raised by Sara
- What SLAs and answers do federal RFIs/RFPs require, and which can existing HashiCorp responses already satisfy? -- raised by Benjamin
- What will the logging design need to support, and what is the scope of design help required? -- raised by Sara

## Raw Transcript

The verbatim source (converted from the original `.docx`) is preserved at `output/06.Projects/MCSP/01. Meetings/MCSP Research Sync.md` and in the original `output/06.Projects/MCSP/06. Raw Documents/MCSP Research Sync.docx`.

Excerpted highlights below; full transcript in the sibling file above.

> **[0:15] Sara:** the root namespace is the issue. So customers that are Vault Enterprise customers, they cannot migrate to Vault Cloud because they operate in different namespaces... they get root access because they've got to do all the configurations.

> **[0:56] Sara:** In Vault Cloud, we retain root namespace for us to be able to manage the customer's environment. So that allows us to upgrade their clusters... patch things... enable snapshots, enable DR. So we give them admin namespace.

> **[2:11] Sara:** a customer can hit the replication endpoint, and it would inherently pick up everything within that environment if it wasn't restricted... our team found a brilliant hack... to hide those and still give them the root namespace.

> **[2:11] Sara:** another customer... it took them like 3 years to migrate over. So it's been a very big pain point. It's been a blocker for a cloud. Now, in the federal environment in particular, this is so, so critically important.

> **[4:42] Sara:** can I create some sort of digital twin of their enterprise environment? And they can test things in this environment, not with real secrets, not with live data, but they can set up different configurations.

> **[8:48] Sara:** That'd be difficult though... that would definitely be our core team would have to do the bulk of the development work... a customer deploys their on-prem, gets it set up, and maybe they click a button and say... create a cloud version for me... a much better user experience.

> **[17:33] Sara:** it says MCSP, very top, MCSP needs to launch a FedRAMP ready managed vault offering. So it's not quite it. MCSP is the underlying platform... it's really Vault wants to launch a FedRAMP high offering. MCSP is kind of just... the platform that we're on. But it's not the star of the show.

> **[18:27] Benjamin:** I really focus on the quantitative aspects of it because a lot of the qualitative information was covered during the sessions that TJ had conducted... I watched all six of them.

> **[19:43] Benjamin:** we're actually going to enter the IBM Bob program... going through each one of these file folders and taking these RFIs... looking at the questions that they're asking... so that we can know... these are the certain things that need to be answered.

> **[21:22] Sara:** That's so freaking ****** and forward thinking... some of that will help for what we have to do with us figuring out what our limits need to be... but that also helps future proof us.

> **[27:09] Sara:** we're going to need to talk about logging because you might have to help with build out some designs for logging... It's going to be an easy, squeezy, nothing like multi-pane... It'll be very simple.
