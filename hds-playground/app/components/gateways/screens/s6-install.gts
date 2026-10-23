import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import {
  HdsAlert,
  HdsButton,
  HdsPageHeader,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';
import type { GatewayFlow } from '../flow';
import InstallInstructions from '../install-instructions';
import WizardSteps from '../wizard-steps';

interface Signature {
  Args: { flow: GatewayFlow };
}

const S6Install: TOC<Signature> = <template>
  <HdsPageHeader as |PH|>
    <PH.Title>Add site</PH.Title>
  </HdsPageHeader>

  <div class="gw-section gw-stack gw-wizard">
    <WizardSteps @current={{2}} />

    <HdsTextBody @tag="p" @size="200" @color="faint">
      Run the gateway agent in your environment. The agent starts an outbound
      connection to HCP. No inbound ports are required.
    </HdsTextBody>

    <InstallInstructions
      @siteName={{@flow.siteName}}
      @clientId={{@flow.clientId}}
    />

    <HdsAlert @type="inline" @color="neutral" as |A|>
      <A.Title>Keep the agent running before you continue.</A.Title>
      <A.Description>
        The next step verifies the connection. Start the agent first, then
        select Start verification.
      </A.Description>
    </HdsAlert>

    <div class="gw-actions">
      <HdsButton
        @text="Back"
        @color="secondary"
        @icon="arrow-left"
        {{on "click" (fn @flow.go "s5")}}
      />
      <HdsButton
        @text="Start verification"
        @icon="arrow-right"
        @iconPosition="trailing"
        {{on "click" @flow.startVerification}}
      />
    </div>
  </div>
</template>;

export default S6Install;
