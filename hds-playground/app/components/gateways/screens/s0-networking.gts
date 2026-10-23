import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import {
  HdsBadge,
  HdsButton,
  HdsCardContainer,
  HdsLayoutFlex,
  HdsLayoutGrid,
  HdsPageHeader,
  HdsTextBody,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';
import type { GatewayFlow } from '../flow';

interface Signature {
  Args: { flow: GatewayFlow };
}

interface NetworkCardSignature {
  Args: {
    title: string;
    description: string;
    badgeText: string;
    badgeColor: 'success' | 'warning' | 'neutral';
    onEdit: (event: Event) => void;
  };
}

const NetworkCard: TOC<NetworkCardSignature> = <template>
  <HdsCardContainer @hasBorder={{true}} class="gw-card gw-card-padded">
    <HdsLayoutFlex @direction="column" @gap="8">
      <HdsLayoutFlex @justify="space-between" @align="center" @gap="12">
        <HdsTextDisplay @tag="h3" @size="300">{{@title}}</HdsTextDisplay>
        <HdsBadge @text={{@badgeText}} @color={{@badgeColor}} />
      </HdsLayoutFlex>
      <HdsTextBody
        @tag="p"
        @size="200"
        @color="faint"
      >{{@description}}</HdsTextBody>
      <div>
        <HdsButton
          @text="Edit"
          @color="tertiary"
          @size="small"
          @icon="arrow-right"
          @iconPosition="trailing"
          aria-label="Edit {{@title}}"
          {{on "click" @onEdit}}
        />
      </div>
    </HdsLayoutFlex>
  </HdsCardContainer>
</template>;

const S0Networking: TOC<Signature> = <template>
  <HdsPageHeader as |PH|>
    <PH.IconTile @icon="network" />
    <PH.Title>Networking</PH.Title>
  </HdsPageHeader>

  <HdsLayoutGrid @columnMinWidth="380px" @gap="32" class="gw-section">
    <HdsLayoutFlex @direction="column" @gap="16">
      <HdsTextDisplay @tag="h2" @size="400">Connection security</HdsTextDisplay>
      <NetworkCard
        @title="Cluster accessibility"
        @description="Cluster is accessible over the public internet."
        @badgeText="Public"
        @badgeColor="success"
        @onEdit={{@flow.noop}}
      />
      <NetworkCard
        @title="IP allow list"
        @description="Allow only specific source IPs to connect to the cluster's public network endpoint."
        @badgeText="13 IP addresses allowed"
        @badgeColor="success"
        @onEdit={{@flow.noop}}
      />
      <NetworkCard
        @title="Proxy"
        @description="Identity-based public proxy address managed by HCP which only allows connections from authorized HCP identities."
        @badgeText="Enabled"
        @badgeColor="success"
        @onEdit={{@flow.noop}}
      />
      <NetworkCard
        @title="Gateways"
        @description="Connect your private network sites to HCP Vault Dedicated through encrypted tunnels."
        @badgeText={{@flow.gatewaysCardBadge}}
        @badgeColor={{if @flow.gatewaysEnabled "success" "neutral"}}
        @onEdit={{@flow.goToGateways}}
      />
    </HdsLayoutFlex>

    <HdsLayoutFlex @direction="column" @gap="16">
      <HdsTextDisplay @tag="h2" @size="400">Communication setup</HdsTextDisplay>
      <NetworkCard
        @title="HVN"
        @description="HashiCorp Virtual Network is in use for this cluster."
        @badgeText="Active"
        @badgeColor="success"
        @onEdit={{@flow.noop}}
      />
      <NetworkCard
        @title="Private link"
        @description="Private connectivity to services in your cloud account."
        @badgeText="2/2 Active"
        @badgeColor="success"
        @onEdit={{@flow.noop}}
      />
      <NetworkCard
        @title="Custom DNS forwarding"
        @description="Your own DNS servers are used for name resolution for certain domains."
        @badgeText="3/4 Active"
        @badgeColor="warning"
        @onEdit={{@flow.noop}}
      />
      <NetworkCard
        @title="Custom domain"
        @description="Domain name to your clusters is customized to databucks.com."
        @badgeText="Enabled"
        @badgeColor="success"
        @onEdit={{@flow.noop}}
      />
    </HdsLayoutFlex>
  </HdsLayoutGrid>
</template>;

export default S0Networking;
