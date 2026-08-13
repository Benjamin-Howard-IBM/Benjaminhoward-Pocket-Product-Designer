# HVD Q3 Planning and Transition

**Date:** August 5, 2026
**Duration:** 20 minutes
**Type:** Video transcript
**Speakers:** Benjamin Howard, Luis Guzman, Dante Okoh, Kamil Zal

---

## Summary

Dante Okoh walks Luis, Benjamin, and Kamil through the Q3 design workload for HVD. Five work items are identified: Azure Peering (V1 for Azure customers), Gateway (pickup existing Shana design), Azure Private Link (mirror AWS Private Link UI), GCP project (on hold - IBM/HTP team politics), and an Agentic release (agent registry + auth method, scope TBD, Q4 target). Design work for items 1-3 is expected to complete in Q3 so engineering can build in Q4. Benjamin is confirmed as the designer joining HVD, with all work done in Helios - not Carbon. Immediate next steps are set: Benjamin to meet Kamil first to download AWS Private Link knowledge, then meet Dante, then touch base with Durgesh on Azure Peering.

---

## Context

This is an introductory planning call bringing Benjamin Howard onto the HVD (HashiCorp Vault Dedicated) design team. Benjamin is transitioning from MCSP work, which is largely complete. His background includes cloud UI work at Google (Anthos, vSphere) and AWS (Marketplace). Luis Guzman manages the design team; Dante Okoh is the primary engineering PM for HVD items; Kamil Zal is the engineer POC for Private Link and runtime; Durgesh is the engineering owner for Azure Peering.

---

## Key discussion points

### Work items for Q3

Five items were discussed. Priority order for design start:

| # | Item | Status | Engineering Owner | Design Owner | Timeline |
|---|------|--------|-------------------|--------------|----------|
| 1 | Azure Peering | No prior design; Durgesh has a PRDR memo | Durgesh | Benjamin | Q4 release; discovery in Q3 |
| 2 | Gateway | Existing design (Shana, 7-8 months ago); needs rethink of connections UI; engineering already started; UI is a blocker | Dante | Benjamin (pick up from existing) | Q4 release; design needed now |
| 3 | Azure Private Link | No prior design; mirror AWS Private Link UI (Kamil owns AWS PL) | Dante | Benjamin | Q4 discovery; may slip |
| 4 | GCP project | Blocked on IBM/HTP team capacity negotiation; business case submitted | Dante | TBD | TBD - political hold |
| 5 | Agentic release | Agent registry + auth method; just surfaced Monday; releasing on self-managed first, then HVD; Q4 target | Dante | TBD | Q4; still in discovery |

### Design system

All HVD design work is done in **Helios**, not Carbon. A Gateway component does not exist natively in Helios - a custom design will be needed. Carbon has an analogous component but cannot be pulled directly.

### Benjamin's time split

Benjamin is splitting time between HVD design and Research Ops work under Kristin (research manager). The Research Ops scope includes establishing templates and aligning with Kristin's existing resources. MCSP design work is largely complete with only minor incremental changes. A clearer time allocation will be available after a meeting with Kristin the following day (August 6).

### Agentic angle for HVD

Confirmed: there is an agentic angle for HVD. It will not be picked up until Q4. Pattern mirrors use case consumption - release on self-managed first, then HVD. Scope includes agent registry and an auth method component. Details still being digested by Dante as of the meeting date.

### GCP project

Ongoing negotiation between HVD team and IBM/HTP team. HVD team argues significant business value; HTP team cites capacity constraints. Status: waiting. Not actionable for design this quarter.

---

## Decisions

- **Priority 1 for design start: Azure Peering** - Durgesh has existing documentation (PRDR memo); most ready to begin.
- **Priority 2: Gateway** - Pick up from Shana's existing Figma design; engineering already started; UI is actively blocking. Benjamin to review existing design before meeting Dante.
- **Azure Private Link** - lower urgency this quarter; Dante and Kamil are POCs; mirrors AWS Private Link flow.
- **Design work for items 1-3 must complete in Q3** so engineering builds in Q4.
- **All design work uses Helios**, not Carbon. Custom design required for Gateway connections component.
- **Agentic work is Q4** - no design action needed in Q3.
- **GCP project is on hold** - not actionable until IBM/HTP team negotiation resolves.
- **Dante is the engineering POC** for Gateway, Azure Private Link, and Agentic. Durgesh is the POC for Azure Peering.

---

## Action items

- **Benjamin Howard** - Set up meeting with Kamil next week to review AWS Private Link design and download context before meeting Dante.
- **Benjamin Howard** - Set up meeting with Dante next week to go over Private Link and Gateway together.
- **Benjamin Howard** - Touch base with Durgesh on Azure Peering PRDR memo to start discovery.
- **Benjamin Howard** - Meet with Kristin (August 6) to align on Research Ops templates and determine time split; provide Luis a time-block breakdown after.
- **Kamil Zal** - Share Figma link to Shana's Gateway design with Benjamin.
- **Dante Okoh** - Dig deeper into agentic scope (agent registry + auth method); update team when details are clear.
- **Luis Guzman** - Note: Benjamin is on vacation August 7-10; meetings with Dante/Kamil/Durgesh will start the week of the 11th.
- **Dante Okoh** - Note: Dante is likely off first two weeks of September.

---

## Open questions

- What is the exact scope of the agentic HVD work (agent registry + auth method details)? - *Dante still digesting as of Aug 5*
- Will the GCP project negotiations with IBM/HTP team resolve in time for any Q3 or Q4 action?
- What is the precise time split between Benjamin's HVD design work and Research Ops support for Kristin? - *To be determined after Aug 6 meeting*
- Does Azure Private Link design need to start in Q3, or does it wait until next quarter? - *Depends on engineering capacity*

---

## Raw Transcript

Source: `output/06.Projects/HVD/06. Raw Documents/HVD Q3 planning and transition.md`
