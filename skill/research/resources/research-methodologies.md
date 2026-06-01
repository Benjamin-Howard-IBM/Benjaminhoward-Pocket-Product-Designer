# UX and Product Research Methodologies

A working catalog of research methods, organized so you can pick the lowest-effort method that answers the real question. Each method lists what it is, when to use it, pros, cons, tradeoffs, typical effort, and the output it produces.

## The research landscape (how to choose)

Two axes from the NN/g method taxonomy help position any method:

- Attitudinal vs. Behavioral: what people say vs. what people do.
- Qualitative vs. Quantitative: why and how to fix (direct observation) vs. how many and how much (indirect measurement).

A third practical axis is context of use: natural use, scripted/lab use, not using the product (decontextualized), or a hybrid.

```text
                 Qualitative (why / how)        Quantitative (how many / how much)
Attitudinal      interviews, focus groups        surveys, desirability scales
(what they say)  concept tests                   card sorting (quant), opinion polls

Behavioral       usability testing (moderated),  analytics, A/B testing,
(what they do)   field studies, diary studies    unmoderated benchmark testing,
                                                  tree testing, clickstream
```

General selection rules:

- Match the method to the decision and the main uncertainty, not to a process phase.
- Triangulate: combine at least one attitudinal and one behavioral method, or one qual and one quant, to offset each method's blind spots.
- Prefer behavioral evidence over self-report when the two disagree.
- Use qualitative methods to learn what to fix and why; use quantitative methods to size a problem or prove a change.
- Smaller, more frequent studies usually beat one large study.

---

## Discovery and generative methods

### User interviews
- What it is: one-on-one, semi-structured conversation to learn goals, context, mental models, pain points, and language.
- When to use: early discovery; when you need the "why" behind behavior; to build personas, JTBD, and journey inputs.
- Pros: rich depth and nuance; flexible follow-up; fast to start; builds empathy and stakeholder buy-in; surfaces vocabulary.
- Cons: self-reported (people misremember and rationalize); small samples; interviewer and recall bias; not generalizable; time-intensive to analyze.
- Tradeoffs: depth over breadth; what people say over what they do. Pair with observation or analytics to confirm.
- Effort: low-medium setup; medium analysis (transcription, coding).
- Output: themes, quotes, needs, mental models, hypotheses to test.

### Contextual inquiry / field studies
- What it is: observe and interview users in their real environment while they work.
- When to use: when context, workarounds, tools, and environment matter; complex or specialized workflows; B2B and enterprise.
- Pros: reveals real behavior and workarounds self-report misses; uncovers environmental constraints; high ecological validity.
- Cons: expensive and logistically heavy; access is hard; observer presence can alter behavior (Hawthorne effect); small samples.
- Tradeoffs: highest realism but lowest scalability and speed.
- Effort: high.
- Output: workflow maps, environmental constraints, artifacts, deep task understanding.

### Diary studies
- What it is: participants self-document behavior, thoughts, and context over days or weeks.
- When to use: longitudinal behavior; infrequent or distributed events; experiences that span time (onboarding, habit formation).
- Pros: captures behavior over time and in context without an observer; reveals patterns a single session cannot.
- Cons: high participant burden and dropout; relies on self-report discipline; delayed and uneven data; longer calendar time.
- Tradeoffs: temporal richness over immediacy and control.
- Effort: medium-high; long elapsed time.
- Output: timelines, triggers, longitudinal pain points, frequency patterns.

### Focus groups
- What it is: moderated group discussion (about 5-9 people) on perceptions, reactions, and attitudes.
- When to use: early reactions to concepts, messaging, branding; surfacing the range of opinions and language quickly.
- Pros: fast breadth of attitudes; group dynamics surface shared and divergent views; efficient for concept reactions.
- Cons: groupthink and dominant voices; poor for usability or actual behavior; attitudinal only; moderation skill heavy.
- Tradeoffs: do not use to evaluate usability or predict behavior; useful for desirability and language only.
- Effort: medium.
- Output: attitude ranges, language, concept reactions.

### Surveys
- What it is: structured questionnaire to many respondents; can be attitudinal (satisfaction) or descriptive (demographics, frequency).
- When to use: when you need scale, to quantify attitudes, to size segments, or to validate qualitative findings at volume.
- Pros: cheap at scale; statistically projectable with good sampling; fast; good for tracking over time.
- Cons: self-reported; question wording bias; no follow-up; low response rates and non-response bias; poor at "why."
- Tradeoffs: breadth over depth; precision depends entirely on sampling and question design.
- Effort: medium design; low-medium fielding.
- Output: distributions, segment sizes, satisfaction/NPS, trends.

---

## Structure and information-architecture methods

### Card sorting
- What it is: users group and label content/items; open (users name groups) or closed (predefined groups).
- When to use: designing or revising IA, navigation, taxonomy, grouping, and labels.
- Pros: reveals users' mental models; can be qual or quant; cheap with online tools; good for grouping decisions.
- Cons: tests grouping, not findability; results can be ambiguous; needs interpretation; open sorts are messy to analyze.
- Tradeoffs: tells you how users would organize, not whether they can find things later (pair with tree testing).
- Effort: low-medium.
- Output: category structures, label candidates, similarity matrices, dendrograms.

### Tree testing
- What it is: users find items in a text-only version of the IA (no visual design) to test findability.
- When to use: validating a proposed navigation/IA structure before visual design; measuring findability and where users go wrong.
- Pros: isolates IA from UI; quantitative (success, directness, time); cheap and fast; pinpoints failing nodes.
- Cons: abstract (no visual cues, search, or content); tests structure only; needs realistic tasks to be valid.
- Tradeoffs: clean structural signal at the cost of realism; complements card sorting (sort to design, tree test to validate).
- Effort: low-medium.
- Output: findability success rates, paths, problem nodes.

---

## Evaluative methods

### Usability testing - moderated
- What it is: a facilitator gives tasks and observes one participant at a time (in person or remote), probing think-aloud.
- When to use: evaluating whether people can complete real tasks; diagnosing why a design fails; any fidelity from paper to live.
- Pros: finds the majority of severe issues with about 5 users per segment; explains the "why"; flexible probing; works at any fidelity.
- Cons: small samples are not quantitatively projectable; facilitator bias; lab use is somewhat artificial; scheduling overhead.
- Tradeoffs: diagnostic depth over statistical proof; qualitative not generalizable.
- Effort: medium.
- Output: prioritized usability issues, severity ratings, observed behaviors, fixes.

### Usability testing - unmoderated
- What it is: participants complete tasks alone via a remote platform that records screen, clicks, and verbal/written feedback.
- When to use: faster/cheaper validation; larger samples; benchmarking; when you do not need live probing.
- Pros: fast turnaround; larger n; lower cost; less scheduling; can collect metrics for benchmarking.
- Cons: no live probing or clarification; weaker "why"; task/wording must be airtight; quality varies by panel; risk of inattentive participants.
- Tradeoffs: scale and speed over depth and control.
- Effort: low-medium.
- Output: task metrics, recordings, issue lists, benchmark scores.

### Heuristic evaluation / expert review
- What it is: evaluators inspect an interface against usability heuristics (e.g., Nielsen's 10) without users.
- When to use: no user access or budget; quick pre-test cleanup; early triage of obvious problems.
- Pros: fast, cheap, no recruiting; catches many obvious issues; good warm-up before user testing.
- Cons: no real user behavior; expert bias; misses domain-specific and discoverability issues; can over- or under-report.
- Tradeoffs: speed and cost over validity; never a full substitute for user testing.
- Effort: low.
- Output: heuristic-tagged issue list with severity.

### Cognitive walkthrough
- What it is: evaluators step through tasks asking whether a first-time user would know what to do and notice progress at each step.
- When to use: assessing learnability for new users; early designs; when access to users is limited.
- Pros: structured; focuses on learnability; cheap; no users required.
- Cons: ignores expert/return use; evaluator assumptions; narrow to task learnability.
- Tradeoffs: targeted learnability signal, not broad usability.
- Effort: low.
- Output: step-by-step learnability gaps.

---

## Quantitative and behavioral-at-scale methods

### Analytics review (clickstream / product analytics)
- What it is: analyze existing behavioral data - funnels, paths, drop-off, feature adoption, retention.
- When to use: to size problems, find where users drop, prioritize, and set baselines; ongoing monitoring.
- Pros: real behavior at full scale; cheap once instrumented; continuous; good for trends and triage.
- Cons: tells what/where, not why; instrumentation gaps; correlation not causation; easy to track vanity metrics.
- Tradeoffs: scale and objectivity over explanation; must define goals first (see analytics measurement-plan guidance).
- Effort: low-medium (if instrumented).
- Output: funnels, drop-off points, adoption/retention curves, baselines.

### A/B and multivariate testing
- What it is: randomized live experiment comparing variants on a metric.
- When to use: causal proof for a specific change at sufficient traffic; optimization; settling design debates with data.
- Pros: causal evidence; quantitative; measures real impact on real users; reduces opinion-based decisions.
- Cons: needs high traffic for significance; only compares options you build; explains what won, not why; local optima; slow for low-traffic surfaces.
- Tradeoffs: rigorous proof for narrow changes; poor for novel/large redesigns or low-traffic products.
- Effort: medium-high (engineering + statistics).
- Output: conversion/metric deltas with significance, winning variant.

### Benchmarking (quantitative UX)
- What it is: measure UX metrics (success rate, time on task, SEQ, NPS) against a standard, repeated across releases.
- When to use: tracking UX progress over time; comparing to competitors/industry; proving UX value/ROI.
- Pros: comparable trend data; ties UX to business KPIs; objective evidence of improvement.
- Cons: needs a fixed methodology and statistics; setup cost; a single measurement is meaningless without a comparator.
- Tradeoffs: long-term comparability over fast one-off insight; see the 7-step benchmarking method in the study guide.
- Effort: medium-high; recurring.
- Output: metric baselines and trends, competitive/industry comparison, ROI.

---

## Triangulation and mixed methods

- What it is: deliberately combining methods (e.g., interviews + analytics + RFP/telemetry, or surveys + usability tests) to converge on confidence-scored findings.
- When to use: high-stakes decisions where no single method is trustworthy alone; when access or data is fragmented.
- Pros: offsets individual method bias; raises confidence; lets you attach confidence levels to each claim; reconciles "say vs. do."
- Cons: more planning, cost, and synthesis effort; conflicting signals require judgment to resolve.
- Tradeoffs: higher confidence and defensibility for more effort and coordination.
- Effort: high.
- Output: confidence-scored recommendations, reconciled findings, evidence trail.

---

## Quick selection cheat sheet

| If you need to... | Strong candidates | Avoid relying on |
|---|---|---|
| Understand needs and motivations | Interviews, contextual inquiry | Surveys alone, analytics |
| See real behavior in context | Field studies, diary studies, analytics | Focus groups, interviews |
| Decide IA grouping and labels | Card sorting | Tree testing alone |
| Validate navigation/findability | Tree testing | Card sorting alone |
| Diagnose why a design fails | Moderated usability testing | A/B testing, analytics |
| Validate a design quickly at scale | Unmoderated usability testing | Moderated only |
| Size a problem or segment | Analytics, surveys | Interviews |
| Prove a specific change works | A/B testing, benchmarking | Heuristic review |
| Work with no user access | Heuristic eval, cognitive walkthrough, analytics, support tickets | Anything claiming user truth |
| Make a high-stakes, defensible call | Triangulation (mixed methods) | Any single method |

## Effort vs. confidence (rough guide)

- Fast and cheap, lower certainty: heuristic eval, cognitive walkthrough, unmoderated tests, surveys, analytics review.
- Medium: moderated usability testing, interviews, card sorting, tree testing, benchmarking.
- Slow and expensive, higher certainty for the right question: contextual inquiry, diary studies, A/B testing at scale, full triangulation.

## Common pitfalls

- Choosing a method because it is familiar rather than because it fits the decision.
- Trusting self-report (interviews, surveys, focus groups) for behavior questions.
- Running one large study instead of several small, faster ones.
- Measuring vanity metrics (clicks, page views) instead of outcome metrics.
- Skipping a pilot; not accounting for confounds; over-generalizing small qualitative samples.
- Treating a single benchmark number as meaningful without a comparator.
