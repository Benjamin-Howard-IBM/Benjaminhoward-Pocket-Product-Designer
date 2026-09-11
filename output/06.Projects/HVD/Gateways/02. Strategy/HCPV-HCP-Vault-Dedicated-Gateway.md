---
title: "[RFC] [HCPV-2006]: HCP Vault Dedicated Gateway"
summary: "This RFC introduces HVD Gateway which can be deployed into customer networks to facilitate connections between HVD and a customer's private workloads using a site to site VPN (WireGuard)"
created: "Jun 12, 2026"
status: "In-Review"
product: "HCP Vault"
owners: "sivaramakrishnan.jayaraman@ibm.com"
contributors: "N/A"
approvers: "harini.murugan@ibm.com, Dante.Okoh@ibm.com"
source: "https://hermes-sharepoint.hashicorp.services/document/01XOO7K4JGHWX64R7SM5CLNL4IU5CX3I4X"
---

# [RFC] [HCPV-2006]: HCP Vault Dedicated Gateway

This RFC introduces HVD Gateway using WireGuard which can be deployed into customer networks to facilitate connections between HVD and customer's private workloads.

## Problem Statement

HVD currently has strong connectivity options for cloud-native private networking, but those options are provider-specific. Customers with hybrid, multi-cloud, or on-prem workloads need a connectivity model that:

0.  Works across network boundaries without native peering
1.  Can be deployed and operated asynchronously by HCP
2.  Supports safe rollouts and future low-downtime updates
3.  Can evolve toward customer-managed peers and future agent-based reconciliation

WireGuard is a good fit because it is provider-agnostic, performs well and supports simple routed topologies.

## Background

HCP Vault Dedicated (HVD) allows users to secure, store, and tightly control access to tokens, passwords, certificates, and encryption keys within one unified cloud-based platform. HVD supports two connectivity models for customer workloads. Vault is accessible via a public internet endpoint, typically secured through IP to allow lists for restricted access. Alternatively, customers can use AWS Transit Gateway or private cloud peering with either AWS VPCs or Azure VNets ensuring secure, low-latency connections isolated from public internet traffic. However, these models present limitations in their only support AWS and Azure for private peering, excluding other cloud service providers (e.g., GCP) and on-premises networks. To maximize HVD\'s potential, organizations need solutions that transcend cloud provider dependencies and enable bidirectional connectivity, allowing seamless integration with hybrid or multi-cloud workloads while maintaining security and operational simplicity.

## Proposal 

We propose deploying standalone gateways to customer environments and the HVD dataplane network. These gateways establish a secure, CSP (Cloud Service Provider) agnostic [WireGuard](https://en.wikipedia.org/wiki/WireGuard) tunnel between environments, enabling seamless communication between Vault and customer workloads. Unlike provider-specific solutions like AWS VPC Peering or PrivateLink, this approach uses WireGuard's open-source framework leveraging modern cryptographic primitives such as Curve25519 for key exchange and ChaCha20-Poly1305 for encryption to deliver high-performance connectivity independent of cloud provider limitations. The tunnel operates at layer 3, mimicking traditional peering architectures while eliminating dependency on proprietary cloud networking constructs.

*[Architecture diagrams - see source document]*

## System Overview

The HCP WireGuard Gateway provides secure, private connectivity between HCP Vault clusters and customer environments. The architecture is split into two primary components:

- **Control Plane (CP)**: Managed by Vault Control Plane Service. It uses Cadence workflows to orchestrate gateway lifecycle events, manage keys and provide configuration APIs.

- **Data Plane (DP)**: Managed by the vault-gateway binary running. This binary operates in two modes:

  - Server Mode: Runs on HCP-managed AMI instances.
  - Client Mode: Runs as a Docker container in the customer environment.

**Communication Channels:**

- CP to DP (Server): Orchestrated via a SCADA tunnel and gRPC using a JSON codec.
- Client to CP: Communicates via an HTTPS REST API for configuration and token management.

## Infrastructure Architecture

The server-side infrastructure is managed through three distinct Terraform modules to support blue-green deployments:

- **Infra Module**: Manages the Elastic IP (EIP) and Security Group. These resources are shared across deployments and persist during updates.
- **Instance Module**: Manages the Elastic Network Interface (ENI) and the EC2 Instance. These are per-deployment resources that enable blue-green transitions.
- **Traffic Module**: Manages the EIP Association and Routing. It points the persistent public IP to the active instance.

**Deployment Packages**:

- **AMI**: A pre-built image containing WireGuard, the vault-gateway binary, systemd service definitions and a Vector agent for logging.
- **Docker**: An Alpine-based image containing **wireguard-tools**, **iptables**, **iproute2** and the vault-gateway binary.

### Proposed Architecture

### Public API Layer

The CRUD APIs accept desired gateway state for a cluster and return a long-running operation.

### Control-Plane Service Layer

The vault service owns persistence, validation and transactional state transitions for:

- Gateway meta
- Current Deployment details
- Peer details

### Workflow Layer

Cadence workflows orchestrate create, update, and delete. They are responsible for:

- Key generation or key reuse
- Config rendering
- Secret storage
- Terraform apply or destroy
- Promotion and state transitions

### Dataplane Layer

The managed gateway VM runs:

- The vault-gateway process
- The WireGuard interface and service
- cloud-init bootstrap generated by the workflow
- Service in WG Instance to interact with the GW process.

## Implementation

- Provide one logical gateway per HVD cluster in the control plane.
- Manage the dataplane-side WireGuard gateway lifecycle through asynchronous Cadence workflows.
- Persist enough state to support create, blue-green update, promotion, rollback handling, and delete.
- Generate the runtime artifacts required by the gateway VM and by customer peers.
- Introduce Gateway instance host managers to perform local instance operations.

### Control Plane

Gateways initially authenticate with HCP using a service principal to establish a secure, trusted session. Once authenticated, they enter a continuous synchronization control loop with the cloud-vault-service to set up and maintain a secure WireGuard tunnel. During this loop, gateways transmit their current WireGuard state and operational health metrics. The service analyzes the aggregate state of all connected gateways to dynamically compute an optimized target configuration, or desired state. If discrepancies arise between a gateway's actual state and the service desired state, the gateway automatically applies the updated configuration to restore alignment. This synchronization process ensures that gateways maintain connectivity between Vault and customer workloads, even in the face of expected events like gateway upgrades or unexpected disruptions such as loss of connectivity to an availability zone. By proactively detecting and resolving external connectivity concerns, this architecture enables self-healing infrastructure, maintaining secure tunnels without manual intervention.

### Routing

#### Vault Initiated Connection

*[Vault Initiated Connection diagram - see source document]*

[Source](https://whimsical.com/hcp-vault-gateways-2PaaM3z9LCZY8nh4hreuBV@5q5DGgrhCmDRG4rid76guZhKj2y65zyV)

#### Customer Initiated Connection

[diagram - see source document]

[Source](https://whimsical.com/hcp-vault-gateways-2PaaM3z9LCZY8nh4hreuBV@5q5DGgrhCmDRLKucyZNoUP7YqM2kMvPZ)

### Lifecycle of a request

Assume that HCP Vault cluster is running on 172.18.x.x and customer triggers a request to vend DB cred.

30. The Customer app sends a request with dst=172.18.22.80:8200, src=172.31.29.173

31. Since wg interface is running on the instance, the entry for route: "172.18.16.0/20 dev wg0 scope link src 172.31.29.173" will send the packet to interface wg0

32. WG encrypts packet, wraps in UDP.

    j.  Outer: src=52.39.127.75:51820, dst=54.190.104.245:51820
    k.  Inner: src=172.31.29.173, dst=172.18.22.80

33. UDP packet travels over internet (encrypted, looks like random UDP traffic)

34. The Public IP 54.190.104.245 belongs to the HVD Gateway. UDP arrives at WG Gateway.

35. WG decrypts and reveals inner packet.

    l.  src=172.31.29.173, dst=172.18.22.80

36. Decision based on kernel route: 172.18.16.0/22 dev ens5 (local HVN)

37. Packet forwarded to Vault.

38. Since this is a DB cred vend request, vault must create a POST request to PSQL DB to create a temp user with access creds.

39. Vault initiates TCP connection to PSQL Instance (based on DB config)

    m.  src=172.18.22.80, dst=172.31.50.100

40. Based on IP Routes: 172.31.50.100 via 172.18.16.1 dev eth0 (default VPC Gateway)

41. Based on the VPC route table entry for 172.31.0.0/16 which targets the HCP WG Gateway, the packet will be forwarded there.

42. On HCP WG Gateway, ip route to get 172.31.50.100, will route through wg0 interface.

43. WG now encrypts the inner packet with peer\'s public key and wrap in UDP sends to public endpoint of the customer gateway interface.

44. UDP packet arrives on public interface port 51820 on Customer GW.

45. WireGuard interface verifies sender matches known peer and decrypts.

46.  The destination on the inner packet is of ip route to get 172.31.50.100.

    n.  This will be pointed to the default VPC gateway.

47. VPC routes packet to PSQL subnet, packet arrives at PSQL instance.

    o.  Note: pg_hba.conf must allow HVN CIDR to access it.

48. Runs a create command, and a successful response is returned to vault. Once vault receives a successful response on this request, it returns the vended credentials of username and password back to the original request.

#### Network to Gateway Routing

To deliver dataplane network traffic to the dataplane gateway, routes for the customer network are added to the dataplane VPC routing table. Each route includes a pair of the customer network CIDR and the dataplane gateway IP address, ensuring that only matching traffic is sent to the dataplane gateway. If there is no match, the existing routing table entries are used.

#### Gateway to Gateway Routing

Each gateway operates on a Linux host with three network interfaces:

- **Private network interface:** Connects to hosts within the gateway's private network.
- **Wireguard network interface:** Provides a secure tunnel to the Wireguard interface of the gateway in the opposing network.
- **Publicly accessible network interface:** Encapsulates the Wireguard tunnel over the public internet.

To route traffic to the opposing network through the WG interface, the gateway acts as a \"mini router.\" By setting the kernel variable **net.ipv4.ip_forward=1**, the gateway is allowed to forward packets not meant for itself. A combination of routing rules and IP tables for network address translation are used so that a packet from Vault headed for a customer's private IP address travels through the Wireguard tunnel and exits from the gateway in the opposing network.

#### Wireguard Address Space

We propose using IP addresses from the reserved [CGNAT range 100.64.0.0/10](https://datatracker.ietf.org/doc/html/rfc6598) for Wireguard network interfaces. This reduces the risk of overlapping with customer network CIDRs and has proven effective in [large-scale Wireguard deployments](https://tailscale.com/kb/1015/100.x-addresses).

### Customer Gateway

This is deployed and managed by the customer within their own network. The customer must meet the following requirements:

52. **Containers**: Ability to run the Gateway executable as a **Docker container** with sufficient privileges to create network interfaces and manage IP tables rules.

53. **Operating System**: Linux variant with **kernel version \>= 5.8**

54. **Hardware**: Lower-end compute instance with **8 GB RAM** and **20 GB** of storage.

55. **DNS**: Allow **public DNS resolution to** resolve HCP platform endpoints.

56. **HCP Platform Access**: Ensure **outbound HTTPS** connectivity to the HCP platform.

57. **Dataplane Gateway Access**: Ensure **outbound UDP** on port 51820 (Wireguard) to dataplane gateway public IP addresses.

58. Securely manage deployment **service principals** to prevent unauthorized access.

59. Allow connectivity to private workloads based on enabled features. Examples include:

    s.  BYO-DNS: Ensure connectivity to the customer's designated DNS servers.
    t.  Dynamic Database Credentials: Ensure connectivity to target databases.
    u.  LDAP Auth Method: Ensure connectivity to the customer's designated LDAP server.

It's important to understand that customer gateways do not need to accept inbound connections to connect to HCP or set up a Wireguard tunnel. Instead, customer gateways always initiate the connection to dataplane gateways.

### Gateway Deployment

For the initial release, the gateway deployment to dataplane will be automated. This deployment would require a customer's CIDR as the primary input. This is required to setup the route table entries. In this phase, the gateway deployment in customer's client side would be manual, but we will be providing steps and exact commands to setup the gateway.

### Limitations

  ------------------------------- ------------------------------------------------------------------ -----------------------------------------------------
  Limitation                      Current Phase                                                      Future Phases
  Max gateway per HVN             1(due to CIDR Conflict in route table )                            1
  Max peers per gateway           1                                                                  Multiple
  Tunnel IP allocation            Can be specific based on some hash logic for the cluster.          Should be more dynamic and error redundant approach
  Customer side WG Client setup   Automatic. The command to run Docker Container will be provided.   
  Cloud providers                 AWS only                                                           Azure
  WG Key rotation                 Automated                                                          
  HA                              Not supported                                                      Not supported
  DR                              Supported                                                          
  PR                              Not supported                                                      Needs Multi peer setup
  UI                              Only API Driven                                                    API and Portal UI driven
  ------------------------------- ------------------------------------------------------------------ -----------------------------------------------------

### Provisioning

Provisioning of gateway instances in the dataplane network and their ongoing maintenance will be performed asynchronously by Cadence workflows. With gateway configuration present, existing workflows to create and update Vault clusters will be extended to launch gateway instances based on the latest gateway image and configure them to authenticate with HCP.

## Gateway Creation

[diagram - see source document]

60. **Key Generation**: Generate WireGuard server private, public, and preshared keys.
61. **Secret Storage**: Encrypt and store the server secret in Vault Transit.
62. **Peer Configuration**: For each network peer, generate client keypairs and store them in Vault Transit.
63. **CIDR Assignment**: Derive tunnel CIDR addresses. The server is assigned .1 and the client is assigned .2 within a /30 subnet.
64. **Deployment**: Trigger the Deploy child workflow.
65. **Schedules**: Start the health monitor (Actor) and AMI update check workflows, both running every 5 minutes.
66. **DR Replication**: If a DR link exists, execute the creation workflow for the secondary cluster. Failure in the DR region triggers a warning but does not stop the primary creation.
67. **Completion**: Mark the operation as complete in the database.

## The Cloud Resource Deployment

68. **Information Gathering**: Fetch HVN details (VPC ID, CIDR) and reserve a dataplane AWS account.

69. **State Management**: Secure a Terraform state storage account.

70. **AMI Resolution**: Determine the gateway AMI using a LaunchDarkly feature flag which provides the apt version.

71. **Record Creation**: Ensure gateway and deployment records exist in the database.

72. **Secret Loading**: Retrieve the WireGuard server secret from Vault Transit.

73. **Peer List Construction**: Build the server-side peer list using each peer\'s public key and AllowedIPs (tunnel IP plus customer CIDR).

74. **Authentication**: Derive the JWT public key for gateway authentication and generate the gateway JSON config.

75. **WireGuard Templating**: Generate the wg0.conf file.

    x.  Interface: Set address (100.64.0.1/32), private key, and MTU (1420).
    y.  Policy: Add iptables FORWARD rules in PostUp and PreDown.

76. **Logging**: Generate the Vector (DataDog) configuration.

77. **cloud-init**: Build a YAML file that writes the gateway config, wg0.conf, vector config, and JWT public key. It also starts the **vector-dataplane** and **vault-gateway** services.

78. **Infra Apply**: Execute the Infra Terraform module to get the EIP and Security Group.

79. **Instance Apply**: Execute the Instance Terraform module to provision the EC2 instance and ENI.

80. **Boot Wait**: Wait 60 seconds for the instance to initialize.

81. **SCADA Verification**: Generate a JWT for SCADA authentication and perform a health check to verify the gateway is registered and WireGuard is active. **Note**: Peers that have never connected (no handshake data) are excluded from the health verdict, this handles the case where the gateway is deployed but the customer hasn\'t started their Docker client yet.

82. **Traffic Apply**: Execute the Traffic Terraform module to associate the EIP with the new ENI and update routes.

83. **Activation**: Promote the deployment to the LIVE state and update the gateway record with the public EIP.

[diagram - see source document]

## Server Runtime

The server binary runs on the AMI and maintains the WireGuard interface and SCADA connection.

Startup Sequence:

84. **Configuration**: Load JSON config from **/etc/vault-gateway.d/config.json**
85. **WireGuard**: Initialize the WireGuard manager, find existing configs, and bring up wg0.
86. **Health Server**: Start a health check server on port 8080.
87. **Security**: Load the JWT public key for request validation.
88. **SCADA**: Connect to the SCADA broker and register as the vault-gateway service.
89. **gRPC**: Start the gRPC server over the SCADA tunnel using the JSON codec.

**gRPC Services:**

90. **GetHealthStatus**: Returns overall health verdict, interface state (active, public key, listen port), per-peer diagnostics (handshake freshness, transfer bytes, tunnel reachability via ICMP ping), and uptime.
91. **RestartWireGuard**: Cycles the specified interface down and up.

## Client Setup (Docker: vault-gateway client)

**Environment Variables**:

- **HCP_PROJECT_ID**: UUID of the HCP Project.
- **HCP_ORGANIZATION_ID**: UUID of the HCP Organization
- **HCP_CLUSTER_ID**: Vault cluster ID.
- **HCP_CLIENT_ID**: Service principal client ID.
- **HCP_CLIENT_SECRET**: Service principal client secret.

**Optional Variables:**

- **HCP_API_URL**: API endpoint (defaults to production).
- **HCP_CONFIG_DIR**: Path for WireGuard files (defaults to **/etc/wireguard**).
- **HCP_TOKEN_RENEW_CRON**: Frequency for token refresh (defaults to 2 hours).
- **HCP_CONFIG_REFETCH_CRON**: Frequency for config updates (defaults to 5 minutes).

## Client Startup Sequence

[diagram - see source document]

101. Initialization of JSON logging and the token provider occurs first.
102. After this, the client performs an initial config fetch from the HCP API.
103. When the fetch succeeds, the client writes wg0.conf (and wg1.conf for DR) and brings up wg0.
104. If the fetch fails, it attempts to load a cached configuration from disk.
105. Sentinel poller initialization uses URLs from the API response.
106. The health server starts on port 8080.
107. Finally, the cron scheduler begins for token renewal and configuration refetching.

## APIs

### Public gRPC APIs

#### Gateway CRUD

  --------------- ---------------------------------------------------- -------------------------------------------------------
  **Method**      **Description**                                      **Notes**
  CreateGateway   Creates gateway record + peers                       Requires at least one peer
  GetGateway      Returns gateway with current state and endpoint IP   
  DeleteGateway   Deletes gateway and all cascaded resources           Peers, deployments, ingress rules all cascade-deleted
  --------------- ---------------------------------------------------- -------------------------------------------------------

#### Peer CRUD

  ------------------- ------------------------------------ -----------------------------------------------------
  **Method**          **Description**                      **Notes**
  CreateGatewayPeer   Adds a peer network to the gateway   Requires name, cidr_block, tunnel_cidr, endpoint_ip
  ListGatewayPeers    Lists all peers for a gateway        
  UpdateGatewayPeer   Updates peer fields via field mask   Cannot update peer_id, gateway_id
  DeleteGatewayPeer   Removes a peer from the gateway      
  ------------------- ------------------------------------ -----------------------------------------------------

### REST APIs (Client-Facing, Data Plane)

#### GET /client-configs

Returns structured WireGuard configuration for primary and DR clusters.

  ----------- -----------------------------------
  **Field**   **Description**
  Auth        Bearer token (from /client-token)
  Response    Gateway Config Response JSON
  ----------- -----------------------------------

Response body:

*{*\
*\"config\": \[*\
*{*\
*\"cluster_type\": \"primary\",*\
*\"cluster_id\": \"vault-cluster-wg-dr\",*\
*\"endpoint\": \"32.184.81.212:51820\",*\
*\"peers\": \[*\
*{*\
*\"peer_id\": \"79dc482f-8b4d-4e15-ae20-a5d1258f8c7f\",*\
*\"name\": \"Peer network 172.23.16.0/20\",*\
*\"interface_address\": \"10.10.0.2/30\",*\
*\"private_key\": \"gA29pXer/aUJAmxybNseGt45mWaqq4nD76J01mjEl1s=\",*\
*\"server_public_key\": \"0jv1KHdnGcUonxikkJA2JGj9NjqY1kjA6i2Yprp0Pnc=\",*\
*\"preshared_key\": \"5rtCahv72Z/NzV0QHxpM/XjAFX5E9FRc940TDhMdhEs=\",*\
*\"allowed_ips\": \[*\
*\"100.64.0.1/32\",*\
*\"172.19.16.0/20\"*\
*\],*\
*\"tunnel_cidr\": \"10.10.0.0/30\",*\
*\"hvn_cidr\": \"172.19.16.0/20\"*\
*}*\
*\]*\
*},*\
*{*\
*\"cluster_type\": \"dr\",*\
*\"cluster_id\": \"DR-vault-cluster-wg-dr8ea\",*\
*\"endpoint\": \"3.209.121.36:51820\",*\
*\"peers\": \[*\
*{\...//same as previous}*\
*\],*\
*\"health_check_urls\": \[*\
*{*\
*\"url\": \"https://hcp-dr-us-east-1.s3.us-east-1.amazonaws.com/dev/vault/us-west-2-failover.txt\",*\
*\"type\": \"regional\"*\
*},*\
*{*\
*\"url\": \"https://hcp-dr-us-east-1.s3.us-east-1.amazonaws.com/dev/vault/cluster-dr/654fdb40-48ee-4141-ad36-8bf47f0b6072-us-west-2-failover.txt\",*\
*\"type\": \"cluster\"*\
*}*\
*\]*\
*}*\
*\],*\
*\"shutdown\": **false***\
*}*

**Interface Config Construction:**

108. Check and return *shutdown = true* if the Kill Switch is on.
109. Fetch cluster + gateway record (get endpoint IP)
110. List gateway peers from DB
111. Fetch HVN CIDR from network service (live, not cached)
112. Read WG server secret from Vault Transit (public key + preshared key)
113. Read each peer secret from Vault Transit (private key)
114. Derive client interface address from tunnel CIDR (.2 in /30)
115. Build AllowedIPs = \[gateway host CIDR, HVN CIDR\]
116. Look up DR replication link; if exists, repeat for DR cluster
117. Build sentinel URLs from primary/DR regions + internal IDs

#### POST /client-token

Issues a short-lived JWT for gateway client authentication.

  ----------- --------------------------------
  **Field**   **Description**
  Auth        Service Principal OAuth2 token
  Response    GatewayTokenResponse JSON
  ----------- --------------------------------

**Response body**:

*{*

*\"token\": \"eyJhbG\...\",*

*\"expires_at\": 1717345200*

*}*

**Token claims**:

  ------------ ---------------------------
  **Claim**    **Description**
  iss          hcp-vault-service
  exp          Current time + 10 minutes
  project_id   HCP project UUID
  cluster_id   Vault cluster ID
  gateway_id   Internal gateway UUID
  peer_id      Optional peer identifier
  ------------ ---------------------------

#### POST /client-token/renew

Renews an existing (still valid) gateway token. Issues a fresh token with new expiry.

  ------------ ------------------------------------------------------------------
  **Field**    **Description**
  Auth         Bearer \<existing-gateway-token\>
  Validation   Token must be valid, not expired, and match path project/cluster
  Response     Same as /client-token (new token + expiry)
  ------------ ------------------------------------------------------------------

### gRPC APIs (DP Server, via SCADA)

**Transport**: SCADA tunnel (CP connects to DP **via cloud-scada-broker**)

**Auth**: JWT interceptor (validates token signed by CP)

#### GetHealthStatus Called by CP health check activity (via SCADA) to verify the gateway instance is alive and tunnel connectivity is healthy.

Request: {}

Response:

*{*

*\"healthy\": true,*

*\"uptime\": \"2h15m30s\",*

*\"interface\": {*

*\"active\": true,*

*\"public_key\": \"aB3dEfGhIjKlMnOpQrStUvWxYz1234567890abc=\",*

*\"listen_port\": 51820*

*},*

*\"peers\": \[*

*{*

*\"public_key\": \"xY9zAbCdEfGhIjKlMnOpQrStUvWxYz1234567890=\",*

*\"endpoint\": \"203.0.113.50:48921\",*

*\"last_handshake\": \"2025-06-01T10:30:00Z\",*

*\"handshake_fresh\": true,*

*\"rx_bytes\": 1048576,*

*\"tx_bytes\": 524288,*

*\"allowed_ips\": \"172.16.0.0/16\",*

*\"tunnel_reachable\": true,*

*\"tunnel_ip\": \"172.16.0.0\",*

*\"ever_connected\": true*

*}*

*\]*

*}*

Health verdict logic:

- **healthy = true** when interface is active AND all ever-connected peers have a fresh handshake AND tunnel ping succeeds
- Peers that have never connected (ever_connected: false) are excluded from the health verdict, this handles the case where the gateway is deployed but the customer hasn\'t started their Docker client yet
- handshake_fresh = last handshake was within 150 seconds
- tunnel_reachable = ICMP ping to the first IP in the peer\'s AllowedIPs succeeded (2s timeout)
- If no peers are configured, healthy = true (gateway just deployed, waiting for peers)

#### RestartWireGuard Called by CP to restart a WireGuard interface on the gateway.

**Request**:

*{*

*\"interface_name\": \"wg0\"*

*}*

**Response**:

*{*

*\"success\": true,*

*\"message\": \"interface wg0 restarted\"*

*}*

## DR Failover System

The failover system is designed to operate even if the Control Plane region is completely unavailable.

**Architecture**:

- The client maintains two configurations: wg0.conf (Primary) and wg1.conf (DR).
- Only one interface is active at any time.
- A sentinel poller checks for failover signals every 30 seconds.

**Sentinel URL Pattern**: Failover signals are stored as files in S3 buckets located in the DR region.

- Region-level: [*https://\[BUCKET\]/vault/{primary_region}-failover.txt*](https://[BUCKET]/vault/%7bprimary_region%7d-failover.txt)
- Cluster-level: [*https://\[BUCKET\]/vault/cluster-dr/{primary_internal_id}-{primary_region}-failover.txt*](https://[BUCKET]/vault/cluster-dr/%7bprimary_internal_id%7d-%7bprimary_region%7d-failover.txt)

The poller interprets an HTTP 200 response as a failover trigger. Since these buckets are public, a non-existent file returns an HTTP 403, which the poller treats as a normal primary state.

### Failover Sequence

[diagram - see source document]

Logic:

- **Failover**: If either sentinel returns 200 and the primary is active, switch to DR (wg1).
- **Failback**: If both sentinels are unavailable (not 200) and the DR is active, switch back to primary (wg0).

### Config Refresh Sequence

[diagram - see source document]

- Config Poller (Client): Every 5 minutes, the client fetches the latest configuration, updates sentinel URLs, and restarts the interface if keys or endpoints have changed.

### Token Renewal Sequence

[diagram - see source document]

#### How Gateway Auth Works?

The gateway client (Docker container in customer\'s network) needs to periodically fetch its WireGuard configuration from our server (vault-service in HCP). This needs an authentication mechanism and asking the customer to persist the Service Principals as env variables on instance is not the right approach and has its own security risks. So, we have setup

#### The Two Tokens Setup

There are two different tokens involved, each serving a different purpose:

131. Token 1: HCP Access Token
132. Token 2: Gateway JWT

*Sequence*

133. The Docker container starts. It has two env vars: **HCP_CLIENT_ID** and **HCP_CLIENT_SECRET**. These are the service principals of HCP Account. The IAM validates these and returns an HCP Access Token. This is standard OAuth2 pattern.

134. Now the client has an HCP access token, but []{#anchor}vault-service doesn\'t trust that token directly. Because CP Service doesn\'t want to call HCP auth on every single request. So, the client calls **POST /gateway/client-token** with the access token and requests a Gateway specific token.

135. The CP vault-service receives the HCP access token and asks the IAM Service to validate the token. IAM checks the token\'s signature, expiry, and scope then responds with validation.

136. Now the CP []{#anchor-1}vault-service knows the caller is legitimate. It will now

     l.  Looks at the URL to know which project and cluster they\'re asking about
     m.  Creates a small token, the gateway JWT which has: \"Bearer is authorized for org=X, project=Y, cluster=Z, gateway=W\"
     n.  Signs it with a secret key only vault-service knows (HMAC-SHA256)
     o.  Sends it back with a "n" minute expiry

137. Now, the client calls **GET /gateway/client-configs** with the gateway JWT. Vault-service receives it and

     p.  []{#anchor-2}Checks the signature (was this token signed by me? or is it forged?)
     q.  []{#anchor-3}Checks the expiry (is it still valid?)
     r.  Checks the claims match the URL (is this token for this project and cluster?)
     s.  If all checks pass, return the WireGuard configuration.
     t.  No call to IAM is needed here. The IAM verification only happens once, then the lightweight local JWT check handles the rest.

138. Before a gateway token expires, the client calls **POST /gateway/client-token/renew** with its current gateway JWT.

     u.  The CP []{#anchor-4}vault-service validates the existing token and if it\'s still valid, issues a fresh one with a new expiry window.
     v.  This is a sliding window as long as the client keeps renewing within "**n minutes**", it never needs to go back to HCP auth (Step 1).
     w.  If the client goes offline for \> **n minutes**, the gateway JWT expires and it must redo the full flow from step 1.

## Blue-Green Update (HCP Side)

Updates are performed without disrupting existing connections:

139. **Preparation**: Create a new deployment record with an incremented ID.
140. **Provisioning**: Apply the Instance module using the new AMI to create a new EC2 instance and ENI.
141. **Validation**: Perform SCADA health checks on the new instance.
142. **Cutover**: Apply the Traffic module to move the persistent EIP to the new ENI.
143. **Activation**: Promote the new deployment to **LIVE**.

**Note**: A cluster update might bring a \~ 30s connection disruption due to the traffic transfer to new ENI and client application to complete a new handshake.

## 

## Security Model

Security is built into every layer of the gateway:

- **Credentials**: Service Principal secrets are provided via environment variables and never written to disk.
- **Tokens**: Authentication tokens are stored only in memory and rotated every 5 minutes.
- **Encryption**: All WireGuard keys are stored in Vault Transit and encrypted at rest.
- **Authentication**: The server validates CP requests using a JWT signed by the Control Plane. SCADA communication is secured via mutual TLS.
- **Permissions**: Configuration files on disk use 0600 permissions and are owned by root.
- **Cloud-Init**: No raw secrets are embedded in cloud-init. All sensitive data is encrypted via Vault Transit before being passed to the instance.

## Networking Details

- **Tunneling**: Uses /30 networks for point-to-point connections.

- **Addressing**:

  - **Server**: Always .1 in the tunnel subnet.
  - **Client**: Always .2 in the tunnel subnet.
  - **Fixed Gateway IP**: 100.64.0.1/32 (CGNAT range).

- **Protocols**: WireGuard uses UDP port 51820.

- **MTU**: Fixed at 1420 bytes.

- **NAT Traversal**: Clients send persistent keepalives every 25 seconds to maintain firewall sessions.

## Logging & Observability

Comprehensive logging provides visibility into gateway operations:

- **Format**: Both client and server use hclog with JSON formatting.
- **Server Collection**: A Vector agent runs as a systemd service, shipping logs to DataDog.
- **Client Collection**: Logs are emitted to stdout and collected by the Docker log driver.
- **Monitoring**: Port 8080 provides a local health endpoint reporting interface status, active connections, and DR failover state.

## 

## Database Schema

### vault_gateways

One row per cluster. DR cluster gets its own separate gateway record.

  --------------------- ------------------------------------------- --------------------------------------------------------------------------
  **Column**            **Type**                                    **Purpose**
  gateway_id            UUID (PK)                                   Stable logical gateway identifier
  cluster_internal_id   VARCHAR(36) (UNIQUE, FK → vault_clusters)   Owning Vault cluster; at most one gateway per cluster
  endpoint_ip           VARCHAR(255)                                Static EIP public IP that clients connect to
  state                 SMALLINT                                    Lifecycle state (0=pending, 1=creating, 2=running, 3=failed, 4=deleting)
  created_at            TIMESTAMP                                   Record creation time
  updated_at            TIMESTAMP                                   Last modification time
  --------------------- ------------------------------------------- --------------------------------------------------------------------------

### vault_gateway_deployments

Tracks blue-green deployment attempts. Each deployment is a new EC2 instance.

  ------------ -------------------------------- ----------------------------------------------------------------------------
  **Column**   **Type**                         **Purpose**
  gateway_id   UUID (PK, FK → vault_gateways)   Parent gateway
  number       INT (PK)                         Sequential deployment number
  image_id     UUID                             AMI image ID used for this deployment
  version      VARCHAR(255)                     Product version string
  state        SMALLINT                         Deployment state (pending/creating/running/failed/deleting)
  dataplane    JSONB                            Provider-specific TF outputs (EIP ID, ENI ID, instance ID, security group)
  created_at   TIMESTAMP                        Deployment creation time
  updated_at   TIMESTAMP                        Last state change
  ------------ -------------------------------- ----------------------------------------------------------------------------

### vault_gateway_peers

Peer records representing customer networks connected through the gateway.

  ------------- -------------------------------- --------------------------------------------------------------
  **Column**    **Type**                         **Purpose**
  peer_id       UUID (PK)                        Peer identifier
  gateway_id    UUID (PK, FK → vault_gateways)   Parent gateway (composite PK with peer_id)
  name          VARCHAR(255)                     Optional display name for the peer
  endpoint_ip   VARCHAR(255)                     Customer\'s public IP (used in server-side WG config)
  cidr_block    VARCHAR(50)                      Customer VPC subnet CIDR (goes into AllowedIPs on server)
  tunnel_cidr   VARCHAR(50)                      /30 tunnel subnet; .1=server, .2=client (derived at runtime)
  state         SMALLINT                         Peer lifecycle state (pending/active/failed/deleting)
  created_at    TIMESTAMP                        Record creation time
  updated_at    TIMESTAMP                        Last modification time
  ------------- -------------------------------- --------------------------------------------------------------

### Design Notes

- All tables cascade on delete from parent gateway
- Composite PK on vault_gateway_peers (peer_id, gateway_id) enforces uniqueness within a gateway
- Composite PK on vault_gateway_deployments (gateway_id, number) enables sequential rollouts
- No client config table exists; configs are derived at API fetch time from these tables + network service + Vault Transit secrets

## 

## The Client docker image

*FROM golang:1.25-alpine AS builder*

*WORKDIR /build*

*COPY . .*

*RUN CGO_ENABLED=0 GOOS=linux go build -mod=vendor -o vault-gateway ./cmd/vault-gateway*

*FROM alpine:3.20*

*RUN apk add \--no-cache \\*

*wireguard-tools \\*

*iptables \\*

*ip6tables \\*

*iproute2 \\*

*bash \\*

*curl \\*

*&& rm -rf /var/cache/apk/\**

*COPY \--from=builder /build/vault-gateway /usr/local/bin/vault-gateway*

*VOLUME /config*

*EXPOSE 8080*

*EXPOSE 51820/udp*

*HEALTHCHECK \--interval=30s \--timeout=5s \--start-period=10s \--retries=3 \\*

*CMD curl -sf* [*http://localhost:8080/health*](http://localhost:8080/health) *\|\| exit 1*

*ENTRYPOINT \[\"/usr/local/bin/vault-gateway\", \"client\"\]*

**Build and push:**

*docker buildx build \--platform linux/amd64,linux/arm64 -f Dockerfile.gateway \\*

*-t \<DockerHub\>/vault-gateway:latest \--push .*

**Run**:

docker run -d \--name vault-gateway \\

\--network host \\

\--cap-add NET_ADMIN \\

\--cap-add SYS_MODULE \\

-e HCP_ORGANIZATION_ID=70d781cc-c0ec-4278-b499-f8b475095542 \\

-e HCP_PROJECT_ID=5378adec-cc4f-4338-9f27-a0483c21accf \\

-e HCP_CLUSTER_ID=vault-cluster-wg-dr \\

-e HCP_CLIENT_ID=\*\*\*\\

-e HCP_CLIENT_SECRET=\*\*\*\\

\<DockerHub\>/vault-gateway:latest

**Required capabilities:**

- Network: host - The container must use **\`\--network host\`** so that WireGuard traffic originates from the host\'s real IP address. This is required for site-to-site routing, without it, traffic would use the Docker bridge network\'s internal IP, which is not routable from the customer\'s VPC or the HVN. The gateway EC2 security group restricts UDP 51820 to the peer\'s \`endpoint_ip\`, so the source IP must match.
- **NET_ADMIN**: WireGuard interface creation, iptables rules, ip route manipulation
- **SYS_MODULE**: Loading the WireGuard kernel module (if not already loaded on host)

**Image details:**

- Multi-stage build (Go compile + minimal Alpine runtime)
- Static binary (CGO_ENABLED=0)
- \~30MB final image size
- Health check built-in (curl to /health every 30s)

## LaunchDarkly Feature Flags

  -------------------------------------------------- --------- -------------------------------------------------------------------------------------------------------------------
  Flag Key                                           Type      Purpose
  hcpv-wireguard-gateway-enabled                     Boolean   Feature gate for the gateway APIs. When false, gateway APIs return feature-disabled errors.
  hcpv-wireguard-gateway-kill-client-process         Boolean   Kill switch. When true, the config API returns **shutdown: true** , causing the client to gracefully terminate.
  hcpv-wireguard-gateway-version                     String    Controls which GW version is deployed. The periodic update workflow reads this flag to determine the apt version.
  hcpv-wireguard-gateway-periodic-update-enabled     Boolean   Decides if a periodic update is required. Defaults to true.
  hcpv-wireguard-gateway-periodic-update-threshold   Boolean   Decides the frequency of periodic updates. Defaults to 20 days,
  -------------------------------------------------- --------- -------------------------------------------------------------------------------------------------------------------

## Kill Switch Design

The kill switch provides a server-side mechanism to shut down all gateway clients without requiring direct access to customer infrastructure.

170. Flag: **hcpv-wireguard-gateway-kill-client-process**
171. **Evaluation**: Server-side, in the config API
172. **Response**: When **flag=true**, the config API returns {\"shutdown\": true, \...} with reason \"disabled by operator\"
173. **Client behavior**: On receiving shutdown: true, the client logs \"shutdown signal received from control plane\", tears down the WireGuard interface, and exits gracefully

The kill switch provides a stable, explicit signal independent of gateway lifecycle state.

Flag defaults to false on LD outage, clients continue running

## IAM Permissions

### Gateway Permissions

  ----------------------- ----------------
  Permission ID           Required For
  vault.gateways.create   Create Gateway
  vault.gateways.get      Get Gateway
  vault.gateways.list     List Gateways
  vault.gateways.delete   Delete Gateway
  ----------------------- ----------------

### Peer Permissions

  ---------------------------- ---------------------
  Permission ID                Required For
  vault.gateway-peers.create   Create Gateway Peer
  vault.gateway-peers.list     List Gateway Peers
  vault.gateway-peers.update   Update Gateway Peer
  vault.gateway-peers.delete   Delete Gateway Peer
  ---------------------------- ---------------------
