import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import {
  HdsButton,
  HdsIcon,
  HdsLinkInline,
  HdsPageHeader,
  HdsTextBody,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';
import type { GatewayFlow } from '../flow';

interface Signature {
  Args: { flow: GatewayFlow };
}

const S1Landing: TOC<Signature> = <template>
  <HdsPageHeader as |PH|>
    <PH.Title>Gateways</PH.Title>
    <PH.Description>
      Gateways connect HCP Vault Dedicated to workloads in your private networks
      without cloud-provider peering.
      <HdsLinkInline @href="#" {{on "click" @flow.noop}}>Learn more about
        gateways</HdsLinkInline>
    </PH.Description>
    <PH.Actions>
      <HdsButton @text="Enable gateways" {{on "click" (fn @flow.go "s2")}} />
    </PH.Actions>
  </HdsPageHeader>

  <div class="gw-section gw-stack gw-readable">
    <HdsTextDisplay @tag="h2" @size="400">Set up gateways</HdsTextDisplay>
    <HdsTextBody @tag="p" @size="200" @color="faint">
      Configure gateways to allow encrypted communication between HCP Vault
      nodes and your private network sites. Vault traffic is directed through an
      encrypted tunnel to each of your cloud environments and datacenters.
    </HdsTextBody>

    <div
      class="gw-diagram"
      role="group"
      aria-label="Vault node connects through a dataplane gateway and an encrypted tunnel to a site gateway and database in your network site."
    >
      <div class="gw-diagram-region">
        <div class="gw-diagram-row">
          <div class="gw-diagram-node">
            <HdsIcon @name="vault" @size="24" />
            <span>Vault node</span>
          </div>
          <HdsIcon @name="arrow-right" />
          <div class="gw-diagram-node gw-diagram-node-gateway">
            <HdsIcon @name="gateway" @size="24" />
            <span>Dataplane gateway</span>
          </div>
        </div>
        <span class="gw-diagram-label">Vault dataplane network</span>
      </div>

      <div class="gw-diagram-tunnel">
        <HdsIcon @name="lock" />
        <span class="gw-diagram-tunnel-line"></span>
        <span class="gw-diagram-label">Encrypted tunnel</span>
      </div>

      <div class="gw-diagram-region gw-diagram-region-site">
        <div class="gw-diagram-row">
          <div class="gw-diagram-node gw-diagram-node-gateway">
            <HdsIcon @name="gateway" @size="24" />
            <span>Site gateway</span>
          </div>
          <HdsIcon @name="arrow-right" />
          <div class="gw-diagram-node">
            <HdsIcon @name="database" @size="24" />
            <span>Database</span>
          </div>
        </div>
        <span class="gw-diagram-label">Your network site</span>
      </div>
    </div>

    <HdsTextDisplay @tag="h2" @size="400">Setup steps</HdsTextDisplay>
    <ol class="gw-steps-list">
      <li>Enable gateways to deploy a dataplane gateway for this cluster.</li>
      <li>Set up a routing table to direct traffic to specific sites.</li>
      <li>Prepare your network to communicate with the Vault dataplane and
        deploy a gateway for each site.</li>
    </ol>
  </div>
</template>;

export default S1Landing;
