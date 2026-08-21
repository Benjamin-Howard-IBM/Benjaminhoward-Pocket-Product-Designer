// Gateway prototype fixture data
// Source: output/06.Projects/HVD/Gateways/03. PDRS/PDR-Gateway-Prototype-Plan.md

export const SITES = [
  {
    name: 'nyc-prod',
    status: 'healthy' as const,
    gatewaysActive: 2,
    gatewaysTotal: 2,
    version: 'v1.2.1',
    lastSeen: '2 min ago',
    deploymentModel: 'binary' as const,
    cidrs: ['192.168.0.0/24', '192.168.10.99/32'],
    haPairedSite: 'nj-dr',
    haStatus: 'ready' as const,
    lastSeenAt: null as string | null,
  },
  {
    name: 'nj-dr',
    status: 'degraded' as const,
    gatewaysActive: 1,
    gatewaysTotal: 2,
    version: 'v1.2.1',
    lastSeen: '8 min ago',
    deploymentModel: 'binary' as const,
    cidrs: ['10.99.0.0/24', '10.99.1.0/24'],
    haPairedSite: 'nyc-prod',
    haStatus: 'degraded' as const,
    lastSeenAt: '2025-07-14 04:59:00 UTC' as string | null,
  },
  {
    name: 'fl-branch',
    status: 'not_connected' as const,
    gatewaysActive: 0,
    gatewaysTotal: 2,
    version: 'v1.2.1',
    lastSeen: 'Never',
    deploymentModel: 'docker' as const,
    cidrs: ['192.34.0.0/24'],
    haPairedSite: null as string | null,
    haStatus: null as 'ready' | 'degraded' | null,
    lastSeenAt: null as string | null,
  },
];

export const SETUP_STEPS = [
  'Enable gateways to be deployed to each dataplane availability zone (AZ).',
  'Set up a routing table to direct traffic from each AZ to specific sites.',
  'Prepare your network to communicate with the Vault Dataplane and deploy a gateway for each site.',
];

export const BINARY_INSTALL_STEPS = {
  download: [
    '# Download the gateway agent binary',
    'curl -fsSL https://releases.hashicorp.com/hcp-vault-gateway/1.2.1/hcp-vault-gateway_1.2.1_linux_amd64.zip \\',
    '  -o hcp-vault-gateway.zip',
    'unzip hcp-vault-gateway.zip',
    'chmod +x hcp-vault-gateway',
  ],
  config: [
    '# gateway.hcl',
    'gateway {',
    '  role      = "customer"',
    '  site      = "nyc-prod"',
    '  cred_file = "/path/to/hcp/cred_file.json"',
    '  log_level = "info"',
    '}',
  ],
  run: [
    '# Run the gateway agent',
    './hcp-vault-gateway -config=gateway.hcl',
  ],
};

export const DOCKER_INSTALL_STEPS = {
  pull: [
    '# Pull the gateway agent image',
    'docker pull hashicorp/hcp-vault-gateway:1.2.1',
  ],
  run: [
    '# Run the gateway agent container',
    'docker run --rm \\',
    '  --cap-add NET_ADMIN \\',
    '  -v /path/to/hcp/cred_file.json:/etc/hcp/cred_file.json \\',
    '  -e HCP_GATEWAY_SITE=nyc-prod \\',
    '  -e HCP_GATEWAY_CRED_FILE=/etc/hcp/cred_file.json \\',
    '  hashicorp/hcp-vault-gateway:1.2.1',
  ],
};
