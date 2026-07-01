# MCSP Sync 6:9 - Meeting Summary

**Date:** June 9, 2026, 3:33PM
**Duration:** 47m 52s
**Attendees:** Benjamin Howard, Sara Snowden
**Source:** `06. Raw Documents/MCSP Sync 6:9.md`

## TL;DR

Benjamin and Sara synced on the MCSP FedRAMP research, reviewing what the RFP/RFI documents actually yield and where the interview script needs to change. They concluded the field and customers are unlikely to provide granular quantitative or log-level data, so the research should reframe around the use case each customer is solving plus whatever volume signals are available, and the script should be simplified to match. They agreed to hold a working session at 3 PM the same day to prioritize the questions together.

## Context

- The sync supports the MCSP FedRAMP / Vault capacity research: understanding how public sector customers use Vault and at what scale so HashiCorp can size a cloud offering.
- Benjamin had run an analysis across the downloaded RFP documents and Sara had reviewed the script and left comments. The working discussion was concentrated in two stretches, with extended informal conversation in between.

## Key Discussion Points

- **RFP/RFX data yield:** Benjamin analyzed the RFPs he downloaded; 8 of 11 were true RFPs. They carried little numeric signal and described infrastructure more than counts. A couple gave good numbers (apps connecting, users); most spoke broadly about usage.
- **Public sector RFP process:** Unlike commercial, which gives exact specs, public sector/military RFPs are proposals for the right to later bid. The folder documents are one-way submissions to DoD/government entities with no responses back, so they show how RFPs are structured and what FedRAMP-level questions get asked. That is useful for structuring proposals rather than for usage numbers.
- **Original hypothesis framing:** Benjamin clarified the script's intent for Sara: read RFPs qualitatively for cost/scaling signals, playing off TJ's earlier research with three tiers (separating everything could cost about 10x) to find the realistic acceptable range.
- **Data limits:** Sara expects no log data and little sense of numbers from the field. Field reps know how customers use Vault but not volumes. HashiCorp reporting was only rolled out to a small set and may not capture what is needed, and customers may not have good metrics either.
- **Reframe around use case:** Rather than requiring infrastructure detail (on-prem setups address different use cases than cloud, for example a large Army deployment versus a specific cloud division doing one task), focus on the problem each customer is solving, then layer in any volume data such as app count, active connections, and possibly user count.
- **Script simplification:** Adjust the script to simpler questions and accept large gaps. Some questions (for example human login counts and Q4) are detailed and unlikely to be answered, but rough-estimate questions are still worth asking. Pre-send questions so interviewees can look information up.
- **Sigma and data sharing:** Benjamin sees only high-level data in Sigma and wants to go deeper, but it is owned on the back end. Less than half of customers agreed to share data, only some of it, and not at fine granularity. Cloud has more granular data because it is a managed service and HashiCorp owns the root namespace, but cloud has no public sector customers, so the study stays public-sector-specific.
- **Field as middleman:** Field reps can run interference and gather qualitative information, but would have to go to their customer points of contact for quantitative numbers.

## Decisions

- Reframe the research around the customer's use case/problem plus available volume signals, not infrastructure or log-level detail.
- Accept large data gaps; do not expect granular quantitative data from field interviews.
- Simplify and reprioritize the script; deprioritize low-yield questions such as Q4 while still asking rough-estimate questions.
- Keep the study specific to public sector and exclude commercial/cloud, which has no public sector customers.
- Pre-send questions to interviewees so they have time to look up information.
- Hold a working session at 3 PM the same day to prioritize the script together rather than doing it asynchronously.

## Action Items

- **Benjamin:** Rework and simplify the script, add a focused set of quantitative questions (app counts, connections), pre-send questions to interviewees, and Slack Sara the framing (deem questions at a P0 level).
- **Benjamin:** Shared the Word doc via a generic "people in IBM" link so Sara has access.
- **Sara:** In the working session, review and prioritize the script questions (P0 level) and flag the low-yield ones.
- **Sara:** Prompt the team about what usage data is actually captured, since the relevant data owner is on extended personal leave (about 6 months), and check whether the Sigma report is cherry-picked.
- **Both:** Meet at 3 PM the same day for the working session; Benjamin to fit his FedEx run into the midday gap.

## Open Questions

- Can they obtain accepted RFP proposal responses/returns, which are not in the current folders?
- Who owns Sigma on the back end, and can they get past the high-level view to deeper data?
- What usage data does HashiCorp actually capture beyond the Sigma report, given the data owner is on leave?
- Will field interviewees or their customer points of contact provide any quantitative numbers, or only qualitative input?
