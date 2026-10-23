import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import {
  HdsButton,
  HdsPageHeader,
  HdsTextBody,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';
import type { GatewayFlow } from '../flow';
import WizardSteps from '../wizard-steps';

interface Signature {
  Args: { flow: GatewayFlow };
}

const S4Prerequisites: TOC<Signature> = <template>
  <HdsPageHeader as |PH|>
    <PH.Title>Add site</PH.Title>
  </HdsPageHeader>

  <div class="gw-section gw-stack gw-wizard">
    <WizardSteps @current={{0}} />

    <HdsTextBody @tag="p" @size="200" @color="faint">
      Complete these four steps before you configure the site.
    </HdsTextBody>

    <div class="gw-stack">
      <HdsTextDisplay @tag="h3" @size="300">1. Check your host</HdsTextDisplay>
      <ul class="gw-steps-list">
        <li>Linux kernel 5.8 or later</li>
        <li>8 GB RAM and 20 GB storage</li>
        <li>Docker installed</li>
      </ul>
    </div>

    <div class="gw-stack">
      <HdsTextDisplay @tag="h3" @size="300">2. Open network access</HdsTextDisplay>
      <ul class="gw-steps-list">
        <li>Outbound HTTPS to HCP</li>
        <li>Outbound UDP 51820 to the dataplane gateway public IPs</li>
        <li>Public DNS that resolves HCP endpoints</li>
      </ul>
    </div>

    <div class="gw-stack">
      <HdsTextDisplay @tag="h3" @size="300">3. Create a service principal</HdsTextDisplay>
      <ul class="gw-steps-list">
        <li>Create a deployment service principal for this gateway</li>
        <li>Store its client secret securely</li>
      </ul>
    </div>

    <div class="gw-stack">
      <HdsTextDisplay @tag="h3" @size="300">4. Confirm workload access</HdsTextDisplay>
      <ul class="gw-steps-list">
        <li>Reach any DNS, database, or LDAP servers your enabled features use</li>
      </ul>
    </div>

    <div class="gw-actions">
      <HdsButton
        @text="Cancel"
        @color="secondary"
        {{on "click" (fn @flow.go "s3")}}
      />
      <HdsButton
        @text="Next"
        @icon="arrow-right"
        @iconPosition="trailing"
        {{on "click" (fn @flow.go "s5")}}
      />
    </div>
  </div>
</template>;

export default S4Prerequisites;
