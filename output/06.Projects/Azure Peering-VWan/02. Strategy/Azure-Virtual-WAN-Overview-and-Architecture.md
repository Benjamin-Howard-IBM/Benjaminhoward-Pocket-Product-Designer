# Azure Virtual WAN - Overview and Architecture

**Source URL:** https://learn.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about  
**Article Title:** What is Azure Virtual WAN?  
**Last Updated:** 2025-03-26  
**Category:** Azure Networking / Hybrid Connectivity  

---

## 1. Overview

Azure Virtual WAN is a networking service that brings many networking, security, and routing functionalities together to provide a single operational interface. 

Main features include:
- **Branch connectivity:** Connectivity automation from Virtual WAN Partner devices such as SD-WAN or VPN Customer Premises Equipment (CPE).
- **Site-to-site VPN connectivity:** Resilient IPsec/IKE (IKEv2) connections for branch offices.
- **Remote user VPN connectivity (Point-to-Site):** Transparent client connections via OpenVPN or IPsec/IKEv2.
- **Private connectivity (ExpressRoute):** Direct, private connectivity to on-premises data centers with optional IPsec over ExpressRoute encryption.
- **Intra-cloud connectivity:** Transitive connectivity for Azure Virtual Networks (VNets).
- **VPN ExpressRoute inter-connectivity:** Native transit between VPN-connected branches and ExpressRoute-connected locations.
- **Integrated security and routing:** Routing control, Azure Firewall integration (Secured Virtual Hub), Network Virtual Appliances (NVAs), and encryption for private connectivity.

Organizations do not need to implement every use case to start using Virtual WAN; deployments can start with a single connectivity pattern and scale as networking needs expand.

---

## 2. Architecture and Global Transit Network

Virtual WAN utilizes a **hub-and-spoke architecture** engineered with built-in scale and performance for branches (VPN/SD-WAN), users (Azure VPN/OpenVPN/IKEv2 clients), ExpressRoute circuits, and virtual networks.

It establishes a **global transit network architecture** where the cloud-hosted Microsoft network hub enables transitive connectivity between endpoints distributed across diverse spoke types.

### Key Architectural Characteristics
- **Regional Hubs with Full Mesh:** Azure regions serve as hubs. In a Standard Virtual WAN, all virtual hubs are interconnected in a full mesh over the Microsoft global backbone, enabling any-to-any (any spoke to any spoke) communication across regions.
- **Automated Spoke Setup and Configuration:** Workload VNets connect seamlessly to the regional virtual hub.
- **At-Scale Spoke Onboarding with Azure Virtual Network Manager (AVNM):** AVNM network groups and connectivity configurations can be used to attach multiple VNets to a Virtual WAN hub and apply consistent connection and routing policies.
- **Partner Automation:** SD-WAN and VPN CPE partner solutions support automated device info export, Azure configuration download, and tunnel establishment.
- **Intuitive Troubleshooting:** Provides end-to-end visibility across Azure routing and data paths.

---

## 3. Core Virtual WAN Resources

Configuring an end-to-end Virtual WAN topology involves the following Azure resources:

### Virtual WAN (`virtualWAN`)
The top-level resource representing a virtual overlay of the Azure network. It acts as a container linking all virtual hubs. Virtual WAN resources are isolated from each other and cannot contain a common hub; virtual hubs in different Virtual WAN instances cannot communicate directly.

### Virtual Hub (`virtualHub`)
A Microsoft-managed virtual network instantiated in an Azure region. The hub hosts service endpoints and gateways:
- Site-to-Site VPN Gateways
- ExpressRoute Gateways
- Point-to-Site (User VPN) Gateways
- Azure Firewall and third-party Network Virtual Appliances (NVAs)
- Integrated Virtual Hub Router

*Hub Gateway vs. Standalone VNet Gateway:* Hub gateways replace standard customer-managed Virtual Network Gateways. Workload VNets do not deploy their own gateways; instead, traffic transits through the hub gateway and benefits from the hub's automated scaling.

### Hub Virtual Network Connection
The dedicated connection resource attaching a workload virtual network to a virtual hub. A virtual network can connect to only one virtual hub at a time.

### Hub-to-Hub Connection
In Standard Virtual WAN, all virtual hubs connect automatically in a full mesh. Traffic from a branch, remote user, or VNet in one region can transit across hubs to reach resources in any other region via the Microsoft global backbone.

### Hub Route Table
Route tables managed within the virtual hub. Administrators can configure custom routing, route propagation, and route association to segment and direct traffic across spokes, hubs, on-premises networks, and firewalls.

### VPN Site (`vpnsite`)
Used for Site-to-Site connectivity. Represents on-premises VPN/SD-WAN equipment, IP addressing, BGP configurations, and link properties.

---

## 4. Virtual WAN Types: Basic vs. Standard

Azure Virtual WAN is available in two distinct SKUs:

| Capability / Configuration | Basic Virtual WAN | Standard Virtual WAN |
|---|---|---|
| **Hub Type** | Basic | Standard |
| **Site-to-Site VPN** | Supported | Supported |
| **ExpressRoute** | Not Supported | Supported |
| **User VPN (Point-to-Site)** | Not Supported | Supported |
| **VNet-to-VNet Transit Routing** | Not Supported | Supported |
| **Inter-Hub (Hub-to-Hub) Transit** | Not Supported | Supported |
| **Azure Firewall / Secured Hub** | Not Supported | Supported |
| **NVA in Virtual Hub** | Not Supported | Supported |
| **Custom Route Tables** | Not Supported | Supported |
| **Gateway Scale Units** | Fixed | Dynamic / Adjustable |

### Upgrade Rules
- Basic Virtual WAN can be upgraded to Standard Virtual WAN.
- Standard Virtual WAN cannot be downgraded to Basic Virtual WAN.
- Basic Virtual WAN does not support adjusting gateway scale units to increase aggregate throughput.

---

## 5. Connectivity Options

### Site-to-Site VPN
- Uses IPsec/IKE (IKEv2) tunnels.
- Supported via partner device automation or manual IPsec configuration.
- Enables branch offices to route to local hub VNets, remote hub VNets, other branches, and ExpressRoute circuits.

### User VPN (Point-to-Site)
- Connects remote mobile and teleworker clients using IPsec/IKE (IKEv2) or OpenVPN.
- Requires VPN client software installed on endpoints.

### ExpressRoute
- Connects on-premises private WANs / data centers directly to the Azure Virtual WAN hub via ExpressRoute circuits.
- **ExpressRoute Encryption:** Supports IPsec over ExpressRoute for secure, encrypted transit without traversing the public internet or requiring public IP addresses.

### Hub-to-VNet Connections
- Workload VNets attach directly to regional virtual hubs.
- Eliminates the need for point-to-point VNet peering meshes.

---

## 6. Routing and Transit Mechanics

### Transit Between VNets
- Standard Virtual WAN provisions a built-in virtual hub router when the hub is created.
- **Router Statuses:**
  - `Provisioned`: Router is active and routing traffic.
  - `Provisioning`: Router is currently creating or updating.
  - `Failed`: Router failed instantiation; can be recovered using the "Reset Router" option on the Virtual Hub Overview page in the Azure portal.
  - `None`: Router is not provisioned (Basic SKU or legacy hub).
- **Scale and Limits:**
  - Each virtual hub router supports up to **50 Gbps aggregate throughput**.
  - Default connection capacity assumes up to **2,000 VM workloads** across all VNets connected to a single virtual hub.
  - Hub Infrastructure Units can be scaled to support larger VM capacities.

### Transit Between VPN and ExpressRoute
- Enables seamless transit between VPN branches / remote users and ExpressRoute-connected private data centers.
- Requires enabling the **Branch-to-branch flag** in Virtual WAN settings and configuring BGP across all connections.

### Custom Routing (Association & Propagation)
- **Association:** Specifies the single route table a VNet connection uses to determine where to forward outbound traffic.
- **Propagation:** Specifies one or more route tables that will dynamically learn the routes of the connected VNet.
- Supports complex traffic isolation, shared services routing, and central inspection topologies.

### Global VNet Peering Mechanics
- Virtual network connections handle routing automatically without manual global VNet peering configuration.
- VNets connected to a virtual hub in the same region incur local VNet peering rates.
- VNets connected to a virtual hub in a different region incur Global VNet peering rates.

---

## 7. Operational & Migration Notes
- When migrating preexisting routes from legacy hub configurations, delete existing route table entries before creating new custom route tables.
- For Basic SKU environments with preexisting routes, upgrade to Standard SKU prior to configuring custom route tables.
