# VS Code Research Skill and Agent

**Summary:** This document summarizes the use of the Research Skill vs Research Subagent in VScode using Opencode.

**Created:** June 2, 2026 **Last updated:** June 5, 2026

**Owner:** [benjamin.howard@ibm.com](mailto:benjamin.howard@ibm.com)

## Context

The purpose of this document is to provide detailed context on both the research and the research subagent. It offers a comparison of the two, highlighting their key differences, and outlines how each can be effectively used to achieve specific research goals.

## Skill Output

A UX research and strategy specialist (grounded in Nielsen Norman Group guidance). It turns research and strategy questions into decision-grade artifacts rather than naming generic activities. Its job is to infer the underlying decision and the main uncertainty, then recommend the lowest-effort method or artifact that answers the real question.

What it covers

- UX strategy: vision/mission statements, goals and measures (OKRs/KPIs), roadmaps
- Research methodology selection with explicit pros, cons, and tradeoffs
- Decision-grade research plans and discussion guides
- UX benchmarking, analytics measurement plans, roadmap prioritization
Core model (SKILL.md:24): Vision (where and why) -> Goals + measures (how we know) -> Plan (the path).

Bundled resources:

- Resources/ux-strategy-study-guide.md - NN/g strategy takeaways (vision, goals/measurement, roadmapping)
- Resources/research-methodologies.md - method catalog with tradeoffs and a selection cheat sheet
- Resources/sample-research-plan.md - reusable research-plan template
**Operating rules:** recommend by decision and uncertainty (not fixed process phase), prefer one primary method over a long menu, always include tradeoffs and a fallback, and stay at planning fidelity unless higher fidelity is requested.

Prompt used: [@research generate a research script with the questions best suited to address the research objectives outlined in the research plan]

I then provided the research study plan and asked for four files listed under the MCSP strategy section to be referenced.

What it does

It's a moderator's guide for the semi-structured internal interviews the plan specifies (SE/SA/RTS/Support/PM, 30-45 min, Teams), built to feed D1-D5 and test H1-H5 rather than to collect generic opinions.

How it mapped to the plan

- Every section traces to a decision and hypothesis (Section 8 has the full trace table). Sizing -> D1/H1/H2/H5, pressure/failure -> D2/D3/H3, SLA/DR -> D4, FedRAMP constraints -> D5, RFP check -> H4.
- Self-report-as-upper-bound discipline is built in. A per-claim capture template (value, segment, role, basis, confidence note) makes telemetry anchoring and confidence tagging mechanical, matching the plan's rule that nothing ships above Medium without behavioral corroboration.
- Hypotheses are asked neutrally. For H1 (machine:human ratio), H2 (load concentration), H3 (RAM vs CPU first), H5 (tier count) the script deliberately withholds the threshold and lets the participant produce the number, then probes - avoiding the recency/deal-positivity bias the plan flags.
- Role-weighting cheat sheet so each of the five roles gets the sections where their view is strongest.
How the strategy docs were used

- Grounded Section 2/6 in the briefing doc's segment realities (DoD air-gap NIPR/SIPR/JWICS, IC dedicated-cluster mandates, HSM ~97% in high-security, FedRAMP as the gate) and tiered isolation model.
- Pulled concrete pressure points from the runtime/deployment and meta-RFC docs: Vault-on-OpenShift persistent-storage performance, 500-worker Hypershift cap, single-region GovCloud, MCSP 99.5% vs HCP 99.95% SLA - turned into Sections 4 and 5 probes.
- Used the product-strategy doc's heavy features (PKI, KMIP, dynamic secrets, HSM/auto-unseal) as the "what's heaviest on resources" probe list in Section 4.
- One scope note: the script keeps feature-prioritization opinions parked under open questions, since this study is about limits and load, not roadmap features. Want me to also draft the co-located codebook (workload-dimension coding scheme) or the RFP/RFI extraction sheet referenced in the plan?
## Research subagent output

Defined at .opencode/agents/research.md. It's the same specialist packaged as a mode: subagent so the main agent can delegate research/strategy work to it in an isolated context.

- **Tools:** bash is disabled (research.md:4-5) - it's a read/think/write specialist, not a command runner.
- **Behavior:** loads the research skill plus its three resource files, then applies the same contract - infer the decision and main uncertainty first, recommend one primary method (complements only to cover a specific gap), always state tradeoffs and a fallback, keep strategy work at planning fidelity, and ground claims in research or labeled assumptions with confidence attached.

## Skill output vs Research subagent use

Here is exactly what happened:

1. Loaded the research skill (skill tool). That injected the skill's instructions into my context: its core model (Vision -> Goals -> Plan), method-selection guidance, and pointers to three resource files (research-methodologies.md, sample-research-plan.md, ux-strategy-study-guide.md).

2. Read the 5 source docs directly (read tool, in parallel): the research plan plus the four strategy docs.

3. Wrote the script using the plan's own structure (objectives, D1-D5, H1-H5, confidence rubric, bias-mitigation rules) as the scaffold, grounded in details from the strategy docs.

What I want to be precise about:

- The research subagent was not spawned via the Task tool. The work ran in the main context.
- The skill's resource files (sample-research-plan.md, etc.). Relied on the skill's summary guidance plus the existing research plan, which was already a complete, well-formed artifact. So the skill's influence was light - the heavy lifting came from the research plan and strategy docs, not from the skill's templates.
- The skill is a UX-research/strategy skill (NN/g-anchored). This task was a fielded interview-guide build, which the skill covers under "discussion guide" but only at a high level it has no discussion-guide template, so the script's structure is mostly derived from my plan rather than from the skill.

| Dimension | What skill did | What Research subagent does |
| --- | --- | --- |
| Context | Ran in my main thread; I saw every read and the full file contents | Runs in a separate, fresh context I spawn; you do not see its intermediate work |
| Inputs | Read all 5 docs into my own context | Pass a written brief; the agent reads files itself |
| Skill access | Loaded the research skill summary | The subagent is pre-loaded with the research persona/skill and decides which resource files to open |
| Output | The artifact, produced directly by me | A single final report back to me;  then relay/summarizes it to you |
| Autonomy | Made each move, visible step by step | The agent works autonomously, then returns once |
| Token cost to main thread | Higher (all doc text sits in context) | Lower (doc text stays in the subagent's context; only its summary returns) |

What would be different in the result (Skill vs Subagent)

1. **Resource files would more likely get used**. A dedicated research agent starting fresh, with the skill as its core instruction set, is more likely to actually open sample-research-plan.md and the methodologies catalog and apply them, rather than rely on the summary as I did.

2. **You lose visibility into reasoning**. Right now you can see exactly which docs I pulled which claims from. The subagent returns a finished product; the trace of "this probe came from the runtime RFC's OpenShift storage risk" would be compressed into its final message unless I instruct it to show its work.

3. **It is one-shot and detached**. I cannot watch it drift. If it misreads the plan (e.g., treats this as a customer-facing guide instead of internal), I only find out at the end. In the main thread I self-correct continuously and you can interrupt.

4. **Quality is roughly equivalent for this task**. This was a bounded, well-specified build with a strong source plan. Delegation helps most when the work is large, parallelizable, or context-heavy enough to crowd the main thread. Here it would mainly have saved main-context tokens, not improved the script.

When delegation would have been the better call

- If I were producing several artifacts in parallel (script + codebook + RFP/RFI extraction sheet)  multiple subagents would be spawned at once.
- If the source docs were far larger and I wanted to keep my main context clean.
- If I wanted an independent second pass on the script for a critique.
What I would put in the subagent brief (if you want this)

A delegated run would need a self-contained prompt, since the agent starts blind:

- Absolute paths to the research plan + 4 strategy docs, with instruction to read all five.
- The exact deliverable: internal moderator discussion guide, 30-45 min, SE/SA/RTS/Support/PM.
- Hard constraints: map every section to D1-D5 and H1-H5; per-claim capture template; ask hypotheses neutrally without stating thresholds; treat self-report as upper-bound.
- Output path in the write zone.
- A verification instruction: confirms a trace table covers all decisions and hypotheses.
The difference:

The skill is the instruction set and resources; the subagent is a delegate that loads that skill to handle UX strategy and research-planning tasks autonomously in its own context window. Use the skill when working inline; dispatch the subagent (via Task) to offload a self-contained research/strategy deliverable.
