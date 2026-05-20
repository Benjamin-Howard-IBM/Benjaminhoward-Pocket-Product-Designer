| [RFC] [VLT-???]: Vault Next UX - A User-focused Approach |  |
| --- | --- |
| **Summary: **This document captures the user experience journey of Vault Next centered around its onboarding, adoption, and differentiating value. |  |
| **Created: ** Apr 28, 2026 | **Status: ** **WIP** \| In-Review \| Approved \| Obsolete |
| **Product: ** Vault | **Owner: ** gabi.viana@ibm.com |
| **Contributors: ** [dpullat@ibm.com;](mailto:dpullat@ibm.com) hans.kao@ibm.com | **Approvers: ** emily.leahy@ibm.com, drew.roy@ibm.com, jeff.m@ibm.com |

## Background

Vault Next reimagines Vault’s workflows with a relational database at its core and a strongly-typed resource model. It adopts the shared runtime and solves long-standing customer challenges, pain points, and needs that have been difficult or impossible to deliver with Vault’s current architecture.

Vault Next will bring:

- A new approach to organizing and managing  secrets, certificates, encryption keys, and identities.
- A scalable deployment model built on tried and tested database and application infrastructure technologies.
- Native auditing, reporting, and observability.

The Calistoga: [Vault Next Meta-PRD](https://docs.google.com/document/d/1nFxphVsjdsXRCvuiigaUZfQR76_s9dshfsQnutYl9PM/edit?tab=t.0) includes the full details.

### Vault Next Personas

The [research](https://docs.google.com/presentation/u/0/d/1lOM2UawwYGa3EHer19GOSEIuqCUX_2EL-qlPTVlcusc/edit) shows that Vault usage tends to start with infrastructure or platform teams who manage the implementation and then expands to development teams who are the primary consumers of secrets.

| **Persona** | **Tasks** |
| --- | --- |
| **Platform Engineer** | - Often the primary administrators of Vault<br>- Responsible for installation, configuration, and maintenance<br>- Set up policies, authentication methods, and secret engines<br>- Serve as the centralized team that manages the Vault service<br>- May manage Vault as code (via Terraform) |
| **System Security Engineer** | - Often collaborate with platform teams or take ownership of Vault<br>- Define security policies and governance models<br>- Oversee compliance and audit requirements<br>- Sometimes initiate Vault adoption after security incident |
| **App developer** | - Consume secrets in their applications<br>- May have limited direct access to Vault (often via APIs rather than UI)<br>- Sometimes initiate Vault adoption at grassroots level before security teams get involved |

### Principles

Our mission is to evolve Vault from a powerful tool into a seamless, opinionated partner for both platform engineers and developers. By reimagining the New Domain Model, we are stripping away complexity to ensure that Vault Next is simple and intuitive—accessible across the CLI, API, and UI without the need for extensive documentation. Beyond ease of use, we are reinforcing our commitment to a secure and reliable infrastructure; one that proactively guides users through mitigation, remains resilient against failures, and provides absolute transparency in billing and data.

**Opinionated**

**Moving beyond "it's possible" to "here is the best way to do it," from access control to domain modeling. **Offer guidance to users on how to setup and use Vault. From the New Domain Model to Access Control, Vault should support different user needs, while providing direction on how best to achieve them.

**Simple and intuitive**

**Reducing the "time-to-value" so ****Platform Admins and App ****developers can find what they need, exactly when they need it. **Easy and simple to use -  whether through the CLI, API and UI. Vault Next is so simple that Platform Engs and App developers won’t need to read lots of documents before and while using Vault. They will find what they need when they need it.

**Secure**

**Shifting from silent security to active communication, offering clear impact analysis and mitigation steps.** As a security management solution, the user should feel safe while using Vault. If there is any problem, Vault will notify the user, explain the problem and its impact, and provide guidance on how to mitigate the problem.

**Reliable**

**Ensuring effortless upgrades, high fault tolerance, and absolute clarity in billing and data availability. **Vault Next is easy to upgrade and can maintain its functionality and performance even in the presence of faults or failures. Billing information is clear, and data is available and reliable.

## New structure

Compared to Vault current, Vault Next introduces new levels of scope to the user. The new scopes are:

- Global
- Organizations
- Projects

These levels are inherited from Boundary and will replace the notion of “Namespaces” from Vault current. It will allow users to better represent their organization and better set boundaries.

The assumption is that Platform Admins will concentrate on the Scope, Admin and Store levels. In addition, everything related to Vault Administration - as a platform – should be grouped in the Admin area. For example: Access Control, Report, Cost and Settings.

While the App Developer will concentrate on the Secrets, Certificates, and Cryptography objects.

*This image is a representation of the new structure, but it is not final, and it is under **discovery.*

## Navigation

The new navigation allows the user to quickly navigate many levels of scope to other - a common pain point in Vault current.

For example, the user will be able to see all the secrets that belong to a “Global” level.

*This image is a representation of the new navigation, but it is not final, and it is under discovery.*

## Key concepts

### Secrets

*For more information, please **refer** to *[*Vault Next: Static Secret Types*](https://docs.google.com/document/d/1nYXBRnKf_EVFl1uP-TUBvbp_9a8nqOHdQ0T7FGl5tO8/edit?tab=t.0)* and *[*Vault Next: Static Secret Store)*](https://docs.google.com/document/d/1u7WcgRPPkxWBU-Mv1aBMdRLhZi6P1jIw4QWxk-BgqKM/edit?tab=t.0)

A Secret is a strongly typed resource in Vault Next, designed to be a collection of fields that adheres to a set of standard rules for management and access control.

##### Secret Store

A Secret Store is a key domain object for organizing and managing secrets, acting as a container and a security boundary.

- **Organization and Ownership: **A Secret Store is the domain object under which all Secrets are stored. It is owned by one and only one scope, which must be either an organization or a project.
- **Resource Boundary: **It is an RBAC boundary. Access control can be granted at the Store level, with everything inside inheriting those rules.
- **Lifecycle:** The life of a secret is tied to the life of the Secret Store it is contained in, meaning all Secrets within it are deleted when the Secret Store is deleted, and the soft delete grace period has elapsed. A Secret Store must be deleted before the containing scope can be deleted.
- **Capacity:** It has no limit on the number of Secrets that can be stored.

##### Secret Types

In Vault Next, secrets are typed resources to allow for specific policies and workflows, defining the data format and structure.

**Abstract/Base Secret Type**

- Abstract Secret: Represents shared behavior among all secrets and has a Postgres base table and Go interface.1

**Concrete Secret Types**

- Login Credential Secret: Represents a set of values used to log in to a website or service.
- AWS IAM Access Key: Represents the fields required to log in to an AWS account.
- Postgres Password Credential Secret: Represents a set of values required for username/password authentication with a Postgres database instance.
- Postgres Certificate Credential Secret: Represents a set of values required for mTLS (Mutual TLS) authentication with a Postgres database instance.
- JSON: Arbitrary data formatted as a JSON object, with the only introspection provided being JSON validation.

##### Secret Version

A Secret Version follows a lifecycle strategy that includes different states, primarily supporting graceful credential rotation. The state of a secret version indicates its role in this lifecycle:

- Primary: The default version that consumers receive. Only one primary version may exist per secret at any time.
- Staged: A version being prepared for cutover. Its credentials may be usable simultaneously with the primary version during a rotation window.
- Active: The version is currently active and valid.
- Inactive: A retired version kept for audit or history.

## Platform Engineer Experience

### Setting up Vault

**JTBD: When setting up Vault, I want to quickly define my organization structure and authentication methods, so that app developers can access the secrets, certificates and keys**

CUJ: As a platform engineer, I need to set up Vault, so that I can ensure compliance and protection of sensitive data within my organization

CUJ: As a platform engineer, I need to define my organization connections, stores, root certificates and secrets so that my teams can securely access and manage secrets, keys, and certificates

CUJ: As a platform engineer, I need to define my organization connections, stores and secrets so that my teams can securely access and manage secrets, keys, and certificates

CUJ: As a platform engineer, I want to understand if I properly configured Vault, so that the organization is secure and app developers can access the secrets, certificate and keys

**How might we give Platform engs the information they need when they need it, so they can make sure their organization security posture has not been compromised?**

CUJ: As a platform engineer, I need to quickly understand how Vault has been used so that my organization is secure and we are best leveraging Vault

CUJ: As a platform engineer, I need to quickly understand how Vault has been used so that my organization is secure and we are best leveraging Vault

CUJ: As a platform engineer, I need to access logs in Vault so that I can identify how Vault has been used and if I should make updates

**How might we support Platform engs to manage the right org structure and access level within Vault so app developers can access what they need?**

CUJ: As a platform engineer, I need to manage the projects so that I can address any problem it may exist and unblock app developers to do their work

CUJ: As a platform engineer, I need to define projects so that app developers can access the secrets according to the projects they have access

CUJ: As a platform engineer, I need to configure connectors and stores so that my teams can securely access and manage secrets, keys, and certificates

CUJ: As a platform engineer, I need to define/manage secrets so that app developers can securely access secrets

CUJ: As a platform engineer, I need to secrets details so that I can fix problems related to it

CUJ: As a platform engineer, I need to quickly understand Vault connections, so that I can troubleshoot any problem with secrets, certificates and keys

CUJ: As a platform engineer, I need to easily create policies so that I can control who has access to what

## App Developer Experience

**How might we support App Developers to quickly onboard on Vault so they can securely build apps?**

CUJ: As an app developer, I need to access/create secrets, certificates and keys so that I can build my application

How might we support App developers to quickly access secrets so they can concentrate in building the app?

CUJ: As an app developer, I need to create secrets so that I can build my application

CUJ: As an app developer, I need to access secrets so that I can build my application

CUJ: As an app developer, I need to access secrets so that I can build my application

## Differentiators

### Agentic

Register agents with identity metadata and granular policies

As a Platform Admin, I want to register agents by defining their identity metadata and configuring granular access policies to achieve a baseline of least-privileged execution. AI agents are proliferating but lack standardized identity controls. Without bound identities, a compromised agent can move laterally or escalate privileges.

### Authenticate and authorize agents in real-time (Oauth)

As a Security Engineer, I want Vault to authenticate and authorize agents in real-time to achieve strict enforcement where an agent performs its transaction only within its allowed scope. Agents operate autonomously and can execute thousands of operations per minute — real-time enforcement is essential.

### Audit agent activity

As a Compliance Officer, I want to audit agent activity to achieve a verified record of what an agent was able to do and confirm it remained restricted to its defined boundaries. Regulators will ask 'what did your AI do?' — organizations need auditable answers.

### Secrets management

#### *Use strongly-typed secrets with validators*

As a Platform Engineer, I want to use well-defined secret types with built-in validators to achieve automatic schema enforcement and ensure secret data is valid before stored. Untyped secrets lead to runtime failures, compliance gaps, and difficulty answering 'what do we have?'

#### *View secret lifecycle metadata*

As an Auditor, I want to view a dashboard showing secret lifecycle metadata like 'who created' and 'last accessed' to achieve verified traceability of all secret modifications.

### Pre-Canned Reports or Query Endpoints (numSecrets per scope, etc.)

### Rotated Secrets (inside vault)

## PQC/Crypto Agility

### Translate or Migrate key algorithms across key versions

As a Platform Engineer, I want to 'promote' new algorithms to a single logical key reference without breaking application code to achieve continuous security posture with zero uptime impact. Algorithm changes historically require code changes — decoupling logical key from algorithm enables agility.

### Rotate to PQC algorithm (ML-KEM)

As a Platform Engineer, I want to 'rotate' a logical key to a NIST-approved post-quantum algorithm (such as ML-KEM) to achieve proactive resilience against 'harvest now, decrypt later' attacks without requiring manual code changes. Quantum computers will break current encryption — data encrypted today is vulnerable to future decryption.

### Use stable Key Resource ID

As a Developer, I want to use a stable Key Resource ID to achieve seamless cryptographic agility without needing to update service configuration for every algorithm migration.

## Platform operations

### Deploy Vault Next via infrastructure-as-code

As a Platform Engineer, I want to deploy Vault Next using infrastructure-as-code (Terraform, Helm) to achieve repeatable, auditable, and version-controlled deployments. Manual deployments are error-prone and non-auditable.

### Configure integrations with identity providers

As a Platform Engineer, I want to configure integrations with identity providers (OIDC, SAML, LDAP) to achieve single sign-on and federated identity for operators and applications.

### Send audit logs to disk for administrative operations

As a Compliance Officer, I want to view audit logs for all administrative operations to achieve accountability for configuration changes and access to sensitive operations.

### Authenticate bare-metal workloads using platform-native auth methods

As a Platform Engineer, I want to authenticate bare-metal workloads using platform-native auth methods (e.g., TPM, host-based attestation, machine identity certificates) to achieve secure, credential-free access for infrastructure that cannot leverage cloud-native identity providers. Bare-metal environments lack the metadata services and instance identity available in cloud platforms, creating an identity gap that forces teams to rely on long-lived static credentials.

## References

## Approvers

Collaborators: Dino

Design: Emily Leahy, Hans Kao, Gabi Viana

PM: Dino, Alex
