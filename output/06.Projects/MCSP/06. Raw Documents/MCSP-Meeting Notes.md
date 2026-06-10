# 1. Core Problem Definition

### Primary Problem

The team does not yet understand how to correctly define capacity limits and infrastructure requirements for Vault on MCSP (multi-cloud platform).

This creates a cascading set of risks:

- Inability to define product limits (e.g., secrets, connections, throughput)
- Risk of under-provisioning-> poor performance / SLA failures
- Risk of over-provisioning-> unnecessary infrastructure cost
- Lack of clarity on real customer usage patterns, especially in target segments (federal/public sector)

👉 In short:

They are designing a managed Vault cloud offering without sufficient insight into real-world usage, constraints, and scaling behavior.

### Sub-Problems Identified

- Unknown Customer Behavior
  - How many machines/apps connect to Vault?
  - How frequently?
  - How usage evolves over time (human -> machine-heavy usage)
  - No reliable baseline data
- Data Visibility Gaps
  - Managed (HVD): good telemetry
  - Self-managed (enterprise/public sector): limited or optional data sharing
  - Public sector (key focus) mostly exists in this blind spot
- Platform Transition Complexity
  - Moving from HCP (HashiCorp platform) -> MCSP (IBM multi-cloud)
  - MCSP lacks built-in product infrastructure (billing, licensing, etc.)
  - Requires rebuilding platform-level capabilities
- Multi-layer Infrastructure Constraints
  - Vault runs across:
    - AWS
    - OpenShift
    - Kubernetes
    - MCSP platform
  - Each layer introduces limits (networking, connections, compute)

# 2. Key Aspects of Vault Cloud (MCSP Context)

### A. What "Vault Cloud" Means Here

- Existing:
  - HVD (HashiCorp Vault Dedicated) runs on HCP (fully managed)
- New direction:
  - Vault on MCSP
    - Shared infrastructure (not dedicated)
    - Built for federal / FedRAMP use cases first

### B. Strategic Direction

- Short-term:
  - Focus MCSP Vault on federal compliance (FedRAMP)
- Long-term:
  - Potentially replace HCP with MCSP entirely

👉 This makes MCSP a foundational platform bet, not just an experiment.

### C. Architectural Reality

Vault on MCSP must operate within:

| Layer | Responsibility |
|---|---|
| AWS | Hard infra limits (network, compute) |
| OpenShift/Kubernetes | Orchestration constraints |
| MCSP | Minimal platform services |
| Vault | Core product logic |

👉 Key implication:

Limits are emergent, not defined in one place - they must be discovered.

### D. Capacity & Performance Drivers

Critical variables Sara highlighted:

- Connections (most important)
  - Machines hitting Vault
  - Apps/services integrations
- Memory usage
  - Secret engines are resource-heavy
- Compute
- Networking constraints
- Throughput requirements

👉 These drive:

- Instance sizing
- Cluster scaling
- Cost model
- SLA viability

### E. Customer Usage Lifecycle Insight

A key behavioral pattern:

| Phase | Behavior |
|---|---|
| Early | More human users, fewer machines |
| Mature | Fewer humans, many machines/apps hitting Vault |

👉 UX insight:

- The system shifts from admin-driven -> system-driven usage
- Design must support automation-heavy environments

# 3. Tangible Outcomes the Team Is Driving Toward

### 1. Defined Product Limits

Clear boundaries such as:

- Max secrets
- Max connections
- Max throughput
- Scaling thresholds

### 2. Infrastructure Sizing Model

- Baseline instance sizes (CPU, RAM)
- Cluster scaling strategy
- Mapping usage -> infrastructure cost

### 3. Capacity Planning Framework

- Predict:
  - How many customers per cluster
  - When to scale vs spin up new clusters

### 4. Competitive / Parity Benchmarking

- Meet or exceed HVD limits & expectations

### 5. Federal Market Readiness

- Align with:
  - FedRAMP requirements
  - Government modernization mandates

### 6. Data-Driven Decision Inputs

They want:

- Real-world usage data
- Not estimates or anecdotes

# 4. Research Gaps (Most Important for You)

These are the opportunity areas for UX research:

### A. Missing Behavioral Data

- # of machines per customer

- # of apps hitting Vault
- Request frequency patterns
- Growth curves over time

### B. Lack of Contextual Segmentation

- Differences across:
  - Agencies (DoD vs VA vs others)
  - Use cases
  - org size / complexity

### C. Weak Quantitative Confidence

- Current inputs:
  - Partial Sigma data
  - Anecdotal field feedback
  - Rough estimates ("hundreds", "thousands")

### D. No Usage Archetypes

They do not yet have:

- "Typical customer profiles"
- Standard usage patterns
- Capacity personas (e.g., light / medium / heavy users)

# 5. Recommended Next Steps (UX + Product Strategy)

## 1. Build a Usage Model (Highest Priority)

### Action:

Synthesize:

- Sigma data
- RFP/RFS documents
- Field team input (SEs, SAs, RTS)

### Output:

Create 3-5 canonical usage archetypes, e.g.:

- Small agency
- Large federal system
- High-security / high-frequency system

## 2. Analyze RFPs for Real-World Signals

Sara explicitly called this out as high value.

### Extract:

- # of users

- # of systems/apps
- Expected load
- Compliance constraints

👉 This is your closest proxy to ground truth

## 3. Map "Connections" as a Core Experience Metric

Reframe for design:

Connections =

"Everything interacting with Vault (humans + machines + systems)"

### Deliverable:

Define:

- Connection types
- Typical volumes
- Growth patterns

## 4. Create a Capacity -> Experience Framework

Translate infra constraints into UX-relevant concepts:

| Technical | UX Framing |
|---|---|
| Connections | System activity |
| Throughput | Performance expectations |
| Memory limits | Feature scalability |
| Cluster limits | Tenant isolation / reliability |

## 5. Develop Early Capacity Heuristics

Even rough models help:

- X machines per Y users
- Z requests per app
- Scaling multipliers over time

👉 Replace "wild guesses" with structured assumptions

## 6. Stakeholder Research (Internal First)

Prioritize:

- Solutions Engineers (post-sales insight)
- Solution Architects (pre-sales patterns)
- RTS (deep embedded customer behavior)

Goal:

Build a composite view of customer environments

## 7. Plan Future Customer Validation

(Not immediate)

Once initial model exists:

- Validate with 3-5 federal customers
- Confirm:
  - connection counts
  - scaling assumptions
  - real usage cadence

# 6. Key UX Insight (Most Important Takeaway)

This is not just an infrastructure problem - it's a modeling problem:

The team is trying to design a system without a clear mental model of how customers actually use Vault at scale.

Your role is to:

- Turn fragmented data into coherent behavioral models
- Translate technical constraints into understandable usage patterns
- Help the team move from:
  - guesses -> evidence-informed assumptions

