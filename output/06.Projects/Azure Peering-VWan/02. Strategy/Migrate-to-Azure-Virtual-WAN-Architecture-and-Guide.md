# Architecture & Migration Guide: Migrate from Customer-Managed Hub-and-Spoke to Azure Virtual WAN

**Source URL:** https://learn.microsoft.com/en-us/azure/virtual-wan/migrate-from-hub-spoke-topology  
**Article Title:** Migrate to Azure Virtual WAN  
**Last Updated:** 2024-10-25  
**Category:** Azure Networking / Migration & Architecture  

---

## 1. Executive Summary

Azure Virtual WAN allows organizations to simplify global connectivity by adopting Microsoft-managed Virtual WAN hubs in place of complex customer-managed hub-and-spoke virtual networks. This guide details the architecture, migration process, and traffic routing paths for migrating from an existing customer-managed hub-and-spoke topology to Azure Virtual WAN.

---

## 2. Baseline Scenario & Architecture

### Baseline Context (Contoso Enterprise Scenario)
- **Organization:** Global enterprise with primary offices and data centers in Europe and Asia.
- **Pre-Migration State:**
  - Regional customer-managed hub VNets deployed in West Europe and South East Asia.
  - ExpressRoute circuits connect on-premises data centers to customer-managed hub VNets.
  - Remote branch offices connect via IPsec VPN tunnels directly to customer-managed hub VNets.
  - Spokes peer directly with customer-managed hubs using Azure VNet peering and User Defined Routes (UDRs).

### Baseline Challenges
- High operational overhead maintaining third-party NVAs, firewall appliances, routing tables, and gateway scalability in customer hubs.
- Complex routing management for multi-region transit and branch-to-branch communication.
- Need to decommission legacy on-premises data centers while maintaining uninterrupted application and hybrid connectivity.

---

## 3. Migration Requirements & Connectivity Matrix

The target migration topology must satisfy the following enterprise network requirements:

1. **Optimized Cloud Path:** Provide corporate HQ and branch offices with optimized, low-latency access to cloud-hosted workloads.
2. **Decommission On-Premises VPN Dependencies:** Eliminate dependence on on-premises data centers for VPN termination while maintaining all key connectivity paths:
   - **Branch-to-VNet:** Branch offices access cloud workloads in the local Azure region.
   - **Branch-to-Hub-to-Hub-to-VNet:** Branch offices access workloads in remote Azure regions via the Microsoft global backbone.
   - **Branch-to-Branch:** Local branches communicate with each other and local ExpressRoute-connected data centers.
   - **Branch-to-Hub-to-Hub-to-Branch:** Geographically separated branches communicate globally across regions.
   - **Branch-to-Internet:** Branch traffic destined for the internet is centrally inspected, filtered, and logged.
   - **VNet-to-VNet:** Spoke VNets in the same Azure region communicate directly via the Virtual WAN hub router.
   - **VNet-to-Hub-to-Hub-to-VNet:** Spoke VNets in different Azure regions communicate seamlessly across the full-mesh backbone.
3. **Remote User Access (P2S):** Roaming employees on laptops and mobile devices securely connect via OpenVPN/IKEv2 to access both Azure workloads and remaining on-premises resources.
4. **Internet Breakout & Filtering:** Centralized or local breakout options for SaaS services (e.g., Microsoft 365) and general internet traffic.

---

## 4. Target Target Architecture (Azure Virtual WAN)

### Target Design Highlights
- **Standard SKU Virtual WAN:** Standard Virtual WAN deployed to enable full-mesh inter-hub routing, ExpressRoute, and VNet transit.
- **Regional Hubs:** Virtual WAN hubs deployed in target regions (e.g., West Europe and South East Asia).
- **Consolidated Gateways:** Point-to-Site (P2S) OpenVPN gateways, Site-to-Site (S2S) VPN gateways, and ExpressRoute gateways co-located within managed hubs.
- **Decommissioned Customer Hubs:** Customer-managed hubs are repurposed as shared services spokes or decommissioned.
- **Centralized Security:** Azure Firewall integrated into Virtual WAN hubs (Secured Virtual Hub) for uniform policy enforcement and traffic logging.

---

## 5. Phased Step-by-Step Migration Process

### Step 1: Baseline Assessment of Single-Region Customer Hub
Identify all functional components hosted within the customer-managed hub:
- **Shared Services:** Domain controllers, DNS, monitoring agents.
- **Routing & Inspection:** NVAs providing Layer 3 routing and firewall filtering between spokes.
- **Internet Ingress/Egress:** Application Gateways for inbound HTTPS and proxy VMs for outbound traffic.
- **Hybrid Gateways:** Customer-managed ExpressRoute and VPN virtual network gateways.

### Step 2: Deploy Virtual WAN Hubs
- Provision the top-level `Virtual WAN` resource with **Standard SKU**.
- Deploy regional Virtual WAN hubs in West Europe and South East Asia with appropriate IP CIDR allocations.
- Provision Site-to-Site VPN, Point-to-Site VPN, and ExpressRoute gateways inside the virtual hubs.

### Step 3: Connect Remote Sites (ExpressRoute and VPN) to Virtual WAN
- Associate existing ExpressRoute circuits with the new Virtual WAN ExpressRoute gateways.
- Configure S2S VPN tunnels from branch offices to the Virtual WAN VPN gateways.
- *Routing consideration:* On-premises devices will receive BGP routes for the Virtual WAN hub IP space. Maintain existing tunnels to the legacy customer-managed hub as primary during testing to guarantee symmetrical routing.

### Step 4: Validate Hybrid Connectivity via Test Spoke
- Provision a test workload spoke VNet in each region and attach it to the new Virtual WAN hub via a Hub Virtual Network Connection.
- Test and validate end-to-end data paths from on-premises branches (over S2S VPN) and corporate HQ (over ExpressRoute) to the test spoke.
- *Interim Inter-Environment Transit:* Because both the customer hub and Virtual WAN hub share the ExpressRoute circuit, traffic can transit between legacy spokes and Virtual WAN spokes via Microsoft Enterprise Edge (MSEE) routers.

### Step 5: Transition Production Spokes to Virtual WAN Hub
Execute the cutover for each spoke virtual network:
1. **Delete Peering:** Disconnect the VNet peering between the production spoke and the legacy customer-managed hub.
2. **Connect to Virtual WAN:** Create a Hub Virtual Network Connection attaching the spoke VNet to the Virtual WAN hub.
3. **Remove UDRs:** Delete custom User Defined Routes within the spoke that previously directed spoke-to-spoke traffic to NVAs. Dynamic routing in the Virtual WAN hub takes over.
4. **Decommission Gateways:** Decommission legacy VPN and ExpressRoute gateways in the old customer hub.
5. **Connect Old Hub as Spoke:** Attach the legacy customer hub VNet to the Virtual WAN hub as a regular spoke connection.

### Step 6: Convert Legacy Hub into a Shared Services Spoke
- Because Virtual WAN hubs are managed resources that do not permit hosting arbitrary compute instances (e.g., VMs), shared services (Active Directory, DNS, Azure Application Gateways) remain in the former customer hub, which now operates as a standard spoke VNet.
- All spoke-to-shared-services and internet-ingress traffic transits the Virtual WAN hub.

### Step 7: Decommission Legacy Infrastructure & Optimize Routing
- Decommission legacy on-premises VPN hardware and redundant links.
- Branches access all cloud resources and remote sites via the high-speed Microsoft global backbone.
- *(Note: ExpressRoute Global Reach is required if direct ExpressRoute-to-ExpressRoute on-premises transit is needed).*

---

## 6. End-State Architecture & Traffic Flow Paths

### Standard Connectivity Paths (Paths 1–5)

#### Path 1: Branch to Local Regional VNet (Asia S2S Branch -> South East Asia VNet)
- Asia branch connects via resilient BGP-enabled S2S VPN tunnel into South East Asia Virtual WAN hub.
- Virtual WAN hub router routes traffic directly to the connected workload VNet.

#### Path 2: ExpressRoute HQ to Remote Regional VNet (Europe HQ -> South East Asia VNet)
- European HQ connects via ExpressRoute circuit to the West Europe Virtual WAN hub.
- Global hub-to-hub mesh automatically transits traffic across the Microsoft backbone to the South East Asia hub, delivering packets to the destination VNet without custom routing.

#### Path 3: Private WAN Data Center to Remote Branch (Asia DC -> Europe S2S Branch)
- Asia DC connects to local Private WAN terminating into South East Asia Virtual WAN hub via ExpressRoute.
- Traffic transits globally across the hub-to-hub mesh to the West Europe hub and is delivered to the European branch over S2S VPN (requires BGP and Branch-to-Branch transit enabled).

#### Path 4: Inter-Region VNet-to-VNet (South East Asia VNet -> West Europe VNet)
- Source VNet forwards traffic to the local South East Asia virtual hub.
- Full-mesh hub connectivity natively routes traffic across Azure backbone to West Europe virtual hub and into the target VNet without manual global VNet peering.

#### Path 5: Roaming User to Cloud VNet (Remote User P2S -> West Europe VNet)
- Remote user authenticates and connects via OpenVPN/IKEv2 client into the West Europe P2S gateway.
- Virtual hub router delivers traffic directly to local or remote connected VNets and on-premises endpoints.

---

## 7. Security and Policy Control via Secured Virtual Hubs (Paths 6–8)

To enforce zero-trust security policies and traffic inspection, Virtual WAN hubs can be converted into **Secured Virtual Hubs** using **Azure Firewall Manager**.

### Setup Process
1. Create and configure centralized **Azure Firewall Policies** (defining application rules, network rules, and threat intelligence settings).
2. Associate the firewall policy with the Virtual WAN hub, deploying managed Azure Firewall instances directly inside the hub.

### Secured Traffic Flows

#### Path 6: Intra-Region Inter-Spoke Inspection (VNet to VNet via Azure Firewall)
- Workload VNets connected to the Secured Virtual Hub route all spoke-to-spoke traffic through the hub's Azure Firewall instance for L4/L7 inspection and logging before delivery.

#### Path 7: Spoke VNet to Internet Filtering (VNet -> Internet)
- Outbound internet traffic from spoke VMs routes through the Secured Virtual Hub.
- Azure Firewall applies FQDN/URL filtering and outbound SNAT, or forwards traffic to third-party Security-as-a-Service partners.

#### Path 8: Branch Office to Internet Filtering (Branch -> Internet)
- On-premises branch traffic destined for the internet transits the S2S VPN tunnel into the Secured Virtual Hub.
- Azure Firewall inspects and filters outbound traffic centrally before routing to the public internet.
