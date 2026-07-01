# MCSP Design Sync - Meeting Summary

**Date:** June 19, 2026, 3:42PM
**Duration:** 27m 46s
**Attendees:** Benjamin Howard, TJ Koines
**Source:** `06. Raw Documents/MCSP Design Sync.md`

## TL;DR

TJ walked Benjamin through the Vault on MCSP (FedRAMP) cluster UI as a design handoff, page by page: overview/cluster access, log and metric streaming, ingress, egress, settings, and snapshots. The core technical model is private-only production clusters connected through AWS PrivateLink (ingress = apps requesting secrets from Vault; egress = Vault reaching into customer AWS resources), with an optional public-IP trial instance for faster testing. The biggest open design problem is the shared PrivateLink endpoint service: all clusters currently share one endpoint and one aggregated allowed-principals list, which creates an insecure edge case. A short-term warning-based fix and a longer-term unique-endpoint-per-cluster redesign are both on the table, and the redesign would fall to Benjamin. Benjamin is taking over this design work from TJ.

## Context

- This was a design handoff/walkthrough of the FedRAMP Vault cluster management UI from TJ Koines to Benjamin Howard.
- The FedRAMP release is more constrained than the planned commercial release (for example, log/metric streaming is CloudWatch-only for now).
- Several screens are still placeholder or have features that may be cut from GA scope (settings page, public IP, snapshot cadence).

## Key Discussion Points

- **Production vs. trial instances:** Production clusters turn off the public address and are reachable only over private networking via AWS PrivateLink. The trial instance is the opposite (public IP enabled) so customers can test Vault without setting up private connectivity; it is not secure and not for production.
- **Ingress vs. egress:** Ingress is applications/services/agents requesting secrets from Vault. Egress is Vault reaching out into the customer's private AWS resources to generate or rotate credentials (for example dynamic database credentials, auto-rotating secrets).
- **Cluster access tile:** Surfaces "open cluster" (opens Vault core to manage secrets) and "lock Vault" (locks all APIs so no secrets can be read during a suspected breach), with a confirmation step, a locked banner, and an unlock action.
- **Duplicate test cluster idea:** Benjamin raised a prior idea (originated with Sara) to spin up a duplicate cluster as a test environment, GitHub-branch style, where changes can be tested then merged. Acknowledged as front-end-heavy but a promising direction Sara intends to pursue.
- **Log and metric streaming:** FedRAMP supports CloudWatch only. Audit logs and metrics currently must be configured as two separate CloudWatch streaming setups. No API call back from CloudWatch is possible, so an external link out to CloudWatch is likely the only viable monitoring affordance.
- **Allowed principals (ingress):** Customer names their AWS account and adds a principal ID; Vault accepts connection requests from that account. The customer then creates the PrivateLink connection in AWS using Vault's endpoint service name. The "pending" state may be unnecessary since connections auto-accept.
- **Egress flow:** The reverse process - customer allows Vault as a principal, names the connection, provides the endpoint service name (a resource the customer creates in their own AWS account; cannot be auto-generated) and a port. Connection names are purely organizational and are not linked between ingress and egress. Depending on AWS policy, egress connections may auto-accept or require a manual accept step with guidance.
- **Endpoint topology:** Ingress is typically one per AWS account that needs Vault access; egress can be one-per-account or more granular per resource, based on the customer's network policy. One ingress point can map to multiple egress points.
- **Terraform snippet removed:** An earlier design offered a Terraform snippet to help create the endpoint service, but the dev team rejected creating resources in customer accounts due to config and policy assumptions.
- **Settings and snapshots:** Settings (public IP toggle, snapshot cadence) are minimal and may be cut or descoped for GA. Snapshots page lists automatic snapshots and allows manual creation and restore for disaster recovery.
- **Shared PrivateLink endpoint problem:** For development speed, all customer clusters currently share one Vault endpoint service, so allowed principals aggregate into one list in HashiCorp's AWS account. If a customer adds the same principal to two clusters and deletes it from one, it is not actually removed (the other cluster still uses it), so a deleted principal can still connect and be auto-accepted - unintuitive and insecure.

## Decisions

- Vault on MCSP FedRAMP production clusters are private-only via AWS PrivateLink; the public trial instance is the testing path.
- Log/metric streaming is CloudWatch-only for FedRAMP, with more options deferred to the commercial release.
- The endpoint service name must be created by the customer in their AWS account; HashiCorp will not auto-generate it or provision resources in customer accounts.
- Connection names are organizational only and are intentionally not tethered between ingress and egress.
- Benjamin is taking over ownership of this design area from TJ, including any PrivateLink redesign.

## Action Items

- **TJ:** Note that audit-log vs. metric CloudWatch streaming may need to be shown as two distinct cards instead of one combined card.
- **TJ:** Revisit whether the ingress "pending" state is still needed given auto-accept behavior.
- **TJ:** Send Benjamin the names/contacts for the PrivateLink team - Harini (manager, India) and Shivali (team lead) - plus existing contacts Sara, Sean, and Manish.
- **Benjamin:** Digest the walkthrough, then send follow-up questions to TJ offline.
- **Benjamin:** Explore the duplicate-test-cluster (branch/merge) concept further with Sara.
- **Benjamin:** Investigate whether the lock action restricts anything beyond reading secrets, and whether allowed principals could support active/inactive filtering for deleted/past principals.
- **Pending (Sean):** Sean to ask Harini's team whether unique-endpoint-per-cluster can land before GA or must be a fast follow, which determines the urgency of Benjamin's redesign.

## Open Questions

- Will the PrivateLink fix be the short-term warning-on-delete approach or the cleaner unique-endpoint-per-cluster redesign, and will it land before or after GA?
- Can monitoring offer anything richer than an external link out to CloudWatch?
- Will the settings page (public IP, snapshot cadence) survive GA scoping, or be cut?
- Should allowed principals support active/inactive states or filtering for previously deleted principals?
- Does locking Vault restrict any functionality beyond reading secrets?
