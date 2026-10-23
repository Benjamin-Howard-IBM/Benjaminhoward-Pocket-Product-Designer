import { tracked } from '@glimmer/tracking';

export type Screen =
  's0' | 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7' | 's8' | 's9';
export type Health = 'healthy' | 'degraded' | 'not_connected';
export type StartState = 'day0' | 'dayN';
export type VerifyState = 'pending' | 'connected' | 'failed';
export type VerifyOutcome = 'connected' | 'failed';
export type StatusColor = 'success' | 'warning' | 'neutral';

export interface Crumb {
  text: string;
  screen?: Screen;
  current?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  selected: boolean;
}

export interface Prerequisite {
  id: string;
  label: string;
  detail: string;
}

export interface SiteView {
  name: string;
  clientId: string;
  cidrs: string[];
  health: Health;
  healthClass: string;
  statusLabel: string;
  statusColor: StatusColor;
  statusIcon: 'check-circle' | 'alert-triangle' | 'dot';
  siteGatewayLabel: string;
  siteGatewayColor: StatusColor;
  dataplaneLabel: string;
  lastSeen: string;
  lastHeard: string | null;
}

export const PREREQUISITES: Prerequisite[] = [
  {
    id: 'docker',
    label: 'Docker with host networking and elevated capabilities',
    detail:
      'The gateway agent runs as a container with NET_ADMIN and SYS_MODULE capabilities.',
  },
  {
    id: 'kernel',
    label: 'Linux kernel 5.8 or later',
    detail: 'Required for the encrypted tunnel interface.',
  },
  {
    id: 'compute',
    label: '8 GB RAM and 20 GB storage',
    detail: 'A lower-end compute instance is sufficient.',
  },
  {
    id: 'dns',
    label: 'Public DNS resolution',
    detail: 'The host must resolve HCP platform endpoints.',
  },
  {
    id: 'https',
    label: 'Outbound HTTPS (443) to HCP',
    detail: 'Works through a configured HTTP(S) proxy.',
  },
  {
    id: 'udp',
    label: 'Outbound UDP 51820 to the dataplane gateway public IP',
    detail: 'The tunnel cannot be carried over an HTTP proxy.',
  },
  {
    id: 'forwarding',
    label: 'IP forwarding enabled on the host',
    detail: 'Docker usually enables this. Confirm it on hardened hosts.',
  },
  {
    id: 's3',
    label: 'Reachability to Amazon S3 disaster recovery signal endpoints',
    detail: 'Used by the agent to detect dataplane gateway failover.',
  },
  {
    id: 'principal',
    label: 'Service principal credentials stored securely',
    detail:
      'You create and rotate these in HCP. Treat the secret like a password.',
  },
  {
    id: 'workloads',
    label: 'Connectivity to the private workloads Vault needs',
    detail: 'For example databases, LDAP servers, or DNS servers.',
  },
];

export const ZONES = ['us-east-1a', 'us-east-1b', 'us-east-1c', 'us-east-1d'];

export const DOCKER_PULL =
  '# Pull the gateway agent image\ndocker pull hashicorp/hcp-vault-gateway:v1.2.1';

export function dockerRun(siteName: string, clientId: string): string {
  return [
    '# Run the gateway agent container',
    'docker run -d --name hcp-vault-gateway \\',
    '  --network host \\',
    '  --cap-add NET_ADMIN \\',
    '  --cap-add SYS_MODULE \\',
    `  -e HCP_GATEWAY_SITE=${siteName || '<site-name>'} \\`,
    `  -e HCP_CLIENT_ID=${clientId || '<client-id>'} \\`,
    '  -e HCP_CLIENT_SECRET=<client-secret> \\',
    '  hashicorp/hcp-vault-gateway:v1.2.1',
  ].join('\n');
}

const CIDR_PATTERN = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;

export function isValidCidr(value: string): boolean {
  if (!CIDR_PATTERN.test(value)) return false;
  const [address, prefix] = value.split('/') as [string, string];
  return (
    address.split('.').every((octet) => Number(octet) <= 255) &&
    Number(prefix) <= 32
  );
}

const SEEDED_SITE = 'nyc-prod';
const SEEDED_CLIENT_ID = 'nyc-prod-deployer';
const SEEDED_CIDRS = ['192.168.0.0/24'];
const VERIFY_DELAY_MS = 2500;

export class GatewayFlow {
  @tracked screen: Screen = 's0';
  @tracked gatewaysEnabled = false;
  @tracked siteAdded = false;
  @tracked health: Health = 'healthy';
  @tracked startState: StartState = 'day0';
  @tracked verifyOutcome: VerifyOutcome = 'connected';
  @tracked verifyState: VerifyState = 'pending';
  @tracked removeModalOpen = false;
  @tracked installFlyoutOpen = false;

  // S2: HCP-side routing table entry
  @tracked networkName = 'office-network';
  @tracked networkCidr = '192.168.0.0/24';
  @tracked primaryZone = ZONES[0]!;
  @tracked backupZone = ZONES[1]!;
  @tracked routingErrors: Record<string, string> = {};

  // S4: advisory prerequisites
  @tracked checkedPrereqs: string[] = [];

  // S5: site configuration (peer registration)
  @tracked siteName = '';
  @tracked clientId = '';
  @tracked clientSecret = '';
  @tracked siteCidrs = '';
  @tracked siteErrors: Record<string, string> = {};

  @tracked addedSiteName = '';
  @tracked addedClientId = '';
  @tracked addedSiteCidrs: string[] = [];

  // S9: edit site slide-over draft
  @tracked editOpen = false;
  @tracked editConfirmPending = false;
  @tracked editName = '';
  @tracked editClientId = '';
  @tracked editClientSecret = '';
  @tracked editCidrs = '';
  @tracked editErrors: Record<string, string> = {};

  private timer: ReturnType<typeof setTimeout> | undefined;

  get uncheckedPrereqCount(): number {
    return PREREQUISITES.length - this.checkedPrereqs.length;
  }

  get hasUncheckedPrereqs(): boolean {
    return this.uncheckedPrereqCount > 0;
  }

  get zoneConflict(): boolean {
    return this.primaryZone === this.backupZone;
  }

  get gatewaysEntryScreen(): Screen {
    return this.gatewaysEnabled ? 's8' : 's1';
  }

  get isNetworkingActive(): boolean {
    return this.screen === 's0';
  }

  get isGatewaysActive(): boolean {
    return this.screen !== 's0';
  }

  get gatewaysNavBadge(): string | undefined {
    return this.gatewaysEnabled ? 'On' : undefined;
  }

  get gatewaysCardBadge(): string {
    if (!this.gatewaysEnabled) return 'Disabled';
    return this.siteAdded ? 'Enabled · 1 site' : 'Enabled · no sites';
  }

  get startStateOptions(): SelectOption[] {
    return [
      {
        value: 'day0',
        label: 'Day 0 - gateways disabled',
        selected: this.startState === 'day0',
      },
      {
        value: 'dayN',
        label: 'Day N - enabled, 1 site',
        selected: this.startState === 'dayN',
      },
    ];
  }

  get verifyOutcomeOptions(): SelectOption[] {
    return [
      {
        value: 'connected',
        label: 'Connected',
        selected: this.verifyOutcome === 'connected',
      },
      {
        value: 'failed',
        label: 'Failed',
        selected: this.verifyOutcome === 'failed',
      },
    ];
  }

  get healthOptions(): SelectOption[] {
    return [
      {
        value: 'healthy',
        label: 'Healthy',
        selected: this.health === 'healthy',
      },
      {
        value: 'degraded',
        label: 'Degraded',
        selected: this.health === 'degraded',
      },
      {
        value: 'not_connected',
        label: 'Not connected',
        selected: this.health === 'not_connected',
      },
    ];
  }

  get primaryZoneOptions(): SelectOption[] {
    return ZONES.map((zone) => ({
      value: zone,
      label: zone,
      selected: zone === this.primaryZone,
    }));
  }

  get backupZoneOptions(): SelectOption[] {
    return ZONES.map((zone) => ({
      value: zone,
      label: zone,
      selected: zone === this.backupZone,
    }));
  }

  get routingTableCidr(): string {
    return this.networkCidr.trim();
  }

  get parsedSiteCidrs(): string[] {
    return this.siteCidrs
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }

  get parsedEditCidrs(): string[] {
    return this.editCidrs
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }

  // CIDRs without a matching S2 routing table entry. Traffic to them is dropped.
  get editUnroutedCidrs(): string[] {
    return this.parsedEditCidrs.filter(
      (cidr) => isValidCidr(cidr) && cidr !== this.routingTableCidr,
    );
  }

  get editRestartNeeded(): boolean {
    const cidrsChanged =
      this.parsedEditCidrs.join('\n') !== this.addedSiteCidrs.join('\n');
    return (
      cidrsChanged ||
      this.editClientId.trim() !== this.addedClientId ||
      this.editClientSecret.trim() !== ''
    );
  }

  get canUseRoutingCidr(): boolean {
    return (
      this.gatewaysEnabled &&
      isValidCidr(this.routingTableCidr) &&
      !this.parsedSiteCidrs.includes(this.routingTableCidr)
    );
  }

  get isDegraded(): boolean {
    return this.siteAdded && this.health === 'degraded';
  }

  get isNotConnected(): boolean {
    return this.siteAdded && this.health === 'not_connected';
  }

  get siteRows(): SiteView[] {
    const site = this.site;
    return site ? [site] : [];
  }

  get site(): SiteView | null {
    if (!this.siteAdded) return null;
    const base = {
      name: this.addedSiteName,
      clientId: this.addedClientId,
      cidrs: this.addedSiteCidrs,
    };
    switch (this.health) {
      case 'degraded':
        return {
          ...base,
          health: 'degraded',
          healthClass: 'degraded',
          statusLabel: 'Degraded',
          statusColor: 'warning',
          statusIcon: 'alert-triangle',
          siteGatewayLabel: 'Unresponsive',
          siteGatewayColor: 'warning',
          dataplaneLabel: 'Healthy',
          lastSeen: '8 min ago',
          lastHeard: '2026-10-22 14:41:00 UTC',
        };
      case 'not_connected':
        return {
          ...base,
          health: 'not_connected',
          healthClass: 'not-connected',
          statusLabel: 'Not connected',
          statusColor: 'neutral',
          statusIcon: 'dot',
          siteGatewayLabel: 'Not connected',
          siteGatewayColor: 'neutral',
          dataplaneLabel: 'Healthy',
          lastSeen: 'Never',
          lastHeard: null,
        };
      default:
        return {
          ...base,
          health: 'healthy',
          healthClass: 'healthy',
          statusLabel: 'Healthy',
          statusColor: 'success',
          statusIcon: 'check-circle',
          siteGatewayLabel: 'Connected',
          siteGatewayColor: 'success',
          dataplaneLabel: 'Healthy',
          lastSeen: '2 min ago',
          lastHeard: null,
        };
    }
  }

  get crumbs(): Crumb[] {
    const root: Crumb[] = [
      { text: 'cizh-org' },
      { text: 'default-project' },
      { text: 'Vault Dedicated' },
      { text: 'vault-cluster' },
    ];
    const networking: Crumb = { text: 'Cluster networking', screen: 's0' };
    const gateways: Crumb = {
      text: 'Gateways',
      screen: this.gatewaysEntryScreen,
    };
    switch (this.screen) {
      case 's0':
        return [...root, { ...networking, current: true }];
      case 's1':
      case 's3':
      case 's8':
        return [...root, networking, { ...gateways, current: true }];
      case 's2':
        return [
          ...root,
          networking,
          gateways,
          { text: 'Enable gateways', current: true },
        ];
      case 's9':
        return [
          ...root,
          networking,
          gateways,
          { text: this.addedSiteName || 'Site', current: true },
        ];
      default:
        return [
          ...root,
          networking,
          gateways,
          { text: 'Add site', current: true },
        ];
    }
  }

  go = (screen: Screen | undefined, event?: Event): void => {
    event?.preventDefault();
    if (!screen) return;
    this.clearTimer();
    this.screen = screen;
  };

  // Day 0 lands on S1 (disabled). Day N lands on S8 (sites table).
  goToGateways = (event?: Event): void => {
    this.go(this.gatewaysEntryScreen, event);
  };

  setStartState = (state: StartState): void => {
    this.clearTimer();
    this.startState = state;
    this.screen = 's0';
    this.health = 'healthy';
    this.removeModalOpen = false;
    this.installFlyoutOpen = false;
    this.editOpen = false;
    this.editConfirmPending = false;
    this.checkedPrereqs = [];
    this.resetSiteDraft();
    this.routingErrors = {};
    this.gatewaysEnabled = state === 'dayN';
    this.siteAdded = state === 'dayN';
    this.addedSiteName = state === 'dayN' ? SEEDED_SITE : '';
    this.addedClientId = state === 'dayN' ? SEEDED_CLIENT_ID : '';
    this.addedSiteCidrs = state === 'dayN' ? SEEDED_CIDRS : [];
  };

  onStartStateChange = (event: Event): void => {
    this.setStartState((event.target as HTMLSelectElement).value as StartState);
  };

  onVerifyOutcomeChange = (event: Event): void => {
    this.verifyOutcome = (event.target as HTMLSelectElement)
      .value as VerifyOutcome;
  };

  onHealthChange = (event: Event): void => {
    this.health = (event.target as HTMLSelectElement).value as Health;
  };

  noop = (event?: Event): void => {
    event?.preventDefault();
  };

  // S2
  updateNetworkName = (event: Event): void => {
    this.networkName = (event.target as HTMLInputElement).value;
  };

  updateNetworkCidr = (event: Event): void => {
    this.networkCidr = (event.target as HTMLInputElement).value;
  };

  updatePrimaryZone = (event: Event): void => {
    this.primaryZone = (event.target as HTMLSelectElement).value;
  };

  updateBackupZone = (event: Event): void => {
    this.backupZone = (event.target as HTMLSelectElement).value;
  };

  deployGateways = (event: Event): void => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (!this.networkName.trim()) {
      errors['networkName'] = 'Network name is required.';
    }
    if (!isValidCidr(this.routingTableCidr)) {
      errors['networkCidr'] =
        'Enter a valid CIDR block, for example 192.168.0.0/24.';
    }
    if (this.zoneConflict) {
      errors['backupZone'] = 'Backup zone must differ from the primary zone.';
    }
    this.routingErrors = errors;
    if (Object.keys(errors).length > 0) return;
    this.gatewaysEnabled = true;
    this.screen = 's3';
  };

  // S4
  isPrereqChecked = (id: string): boolean => this.checkedPrereqs.includes(id);

  togglePrereq = (id: string): void => {
    this.checkedPrereqs = this.checkedPrereqs.includes(id)
      ? this.checkedPrereqs.filter((item) => item !== id)
      : [...this.checkedPrereqs, id];
  };

  startAddSite = (event?: Event): void => {
    event?.preventDefault();
    this.checkedPrereqs = [];
    this.resetSiteDraft();
    this.go('s4');
  };

  // S5
  updateSiteName = (event: Event): void => {
    this.siteName = (event.target as HTMLInputElement).value;
  };

  updateClientId = (event: Event): void => {
    this.clientId = (event.target as HTMLInputElement).value;
  };

  updateClientSecret = (event: Event): void => {
    this.clientSecret = (event.target as HTMLInputElement).value;
  };

  updateSiteCidrs = (event: Event): void => {
    this.siteCidrs = (event.target as HTMLTextAreaElement).value;
  };

  useRoutingCidr = (): void => {
    this.siteCidrs = [...this.parsedSiteCidrs, this.routingTableCidr].join(
      '\n',
    );
  };

  continueToInstall = (event: Event): void => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (!this.siteName.trim()) errors['siteName'] = 'Site name is required.';
    if (!this.clientId.trim()) errors['clientId'] = 'Client ID is required.';
    if (!this.clientSecret.trim()) {
      errors['clientSecret'] = 'Client secret is required.';
    }
    const cidrs = this.parsedSiteCidrs;
    if (cidrs.length === 0) {
      errors['siteCidrs'] = 'Enter at least one network site CIDR.';
    } else if (!cidrs.every(isValidCidr)) {
      errors['siteCidrs'] =
        'One or more CIDRs are not valid. Use CIDR notation, for example 10.0.0.0/24.';
    }
    this.siteErrors = errors;
    if (Object.keys(errors).length > 0) return;
    this.screen = 's6';
  };

  // S6 -> S7: the verify outcome is chosen from the prototype controls
  startVerification = (): void => {
    this.clearTimer();
    this.verifyState = 'pending';
    this.screen = 's7';
    this.timer = setTimeout(() => {
      this.verifyState = this.verifyOutcome;
      if (this.verifyOutcome === 'connected') {
        this.addedSiteName = this.siteName.trim();
        this.addedClientId = this.clientId.trim();
        this.addedSiteCidrs = this.parsedSiteCidrs;
        this.health = 'healthy';
        this.siteAdded = true;
      }
    }, VERIFY_DELAY_MS);
  };

  viewAddedSite = (): void => {
    this.go('s9');
  };

  // S9
  openRemoveModal = (): void => {
    this.removeModalOpen = true;
  };

  closeRemoveModal = (): void => {
    this.removeModalOpen = false;
  };

  // The open dialog closes through HDS (see RemoveSiteModal), which then
  // clears removeModalOpen via onClose.
  confirmRemoveSite = (): void => {
    this.siteAdded = false;
    this.addedSiteName = '';
    this.addedClientId = '';
    this.addedSiteCidrs = [];
    this.health = 'healthy';
    this.editOpen = false;
    this.editConfirmPending = false;
    this.go('s3');
  };

  openInstallFlyout = (): void => {
    this.installFlyoutOpen = true;
  };

  closeInstallFlyout = (): void => {
    this.installFlyoutOpen = false;
  };

  openEditSite = (): void => {
    this.editName = this.addedSiteName;
    this.editClientId = this.addedClientId;
    this.editClientSecret = '';
    this.editCidrs = this.addedSiteCidrs.join('\n');
    this.editErrors = {};
    this.editConfirmPending = false;
    this.editOpen = true;
  };

  closeEditSite = (): void => {
    this.editOpen = false;
    this.editConfirmPending = false;
  };

  updateEditName = (event: Event): void => {
    this.editName = (event.target as HTMLInputElement).value;
    this.editConfirmPending = false;
  };

  updateEditClientId = (event: Event): void => {
    this.editClientId = (event.target as HTMLInputElement).value;
    this.editConfirmPending = false;
  };

  updateEditClientSecret = (event: Event): void => {
    this.editClientSecret = (event.target as HTMLInputElement).value;
    this.editConfirmPending = false;
  };

  updateEditCidrs = (event: Event): void => {
    this.editCidrs = (event.target as HTMLTextAreaElement).value;
    this.editConfirmPending = false;
  };

  cancelEditConfirm = (): void => {
    this.editConfirmPending = false;
  };

  // Save runs in two steps when the change restarts the tunnel: the first
  // save asks for confirmation, the second applies the change.
  submitEdit = (event?: Event): void => {
    event?.preventDefault();
    const errors: Record<string, string> = {};
    if (!this.editName.trim()) errors['name'] = 'Site name is required.';
    if (!this.editClientId.trim()) {
      errors['clientId'] = 'Client ID is required.';
    }
    const cidrs = this.parsedEditCidrs;
    if (cidrs.length === 0) {
      errors['cidrs'] = 'Enter at least one network site CIDR.';
    } else if (!cidrs.every(isValidCidr)) {
      errors['cidrs'] =
        'One or more CIDRs are not valid. Use CIDR notation, for example 10.0.0.0/24.';
    }
    this.editErrors = errors;
    if (Object.keys(errors).length > 0) return;
    if (this.editRestartNeeded && !this.editConfirmPending) {
      this.editConfirmPending = true;
      return;
    }
    this.addedSiteName = this.editName.trim();
    this.addedClientId = this.editClientId.trim();
    this.addedSiteCidrs = cidrs;
    this.editOpen = false;
    this.editConfirmPending = false;
  };

  destroy(): void {
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.timer !== undefined) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  private resetSiteDraft(): void {
    this.siteName = '';
    this.clientId = '';
    this.clientSecret = '';
    this.siteCidrs = '';
    this.siteErrors = {};
  }
}
