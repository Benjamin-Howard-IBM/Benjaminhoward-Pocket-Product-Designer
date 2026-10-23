import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import {
  HdsAlert,
  HdsButton,
  HdsForm,
  HdsFormMaskedInputField,
  HdsFormTextInputField,
  HdsFormTextareaField,
  HdsPageHeader,
} from '@hashicorp/design-system-components/components';
import type { GatewayFlow } from '../flow';
import WizardSteps from '../wizard-steps';

interface Signature {
  Args: { flow: GatewayFlow };
}

const S5Configure: TOC<Signature> = <template>
  <HdsPageHeader as |PH|>
    <PH.Title>Add site</PH.Title>
  </HdsPageHeader>

  <div class="gw-section gw-stack gw-wizard">
    <WizardSteps @current={{1}} />

    {{#if @flow.hasUncheckedPrereqs}}
      <HdsAlert @type="inline" @color="warning" as |A|>
        <A.Title>
          {{@flow.uncheckedPrereqCount}}
          of 10 prerequisites not confirmed
        </A.Title>
        <A.Description>
          You can continue, but the agent may fail to connect if the host does
          not meet them.
        </A.Description>
        <A.Button
          @text="Review prerequisites"
          @color="secondary"
          {{on "click" (fn @flow.go "s4")}}
        />
      </HdsAlert>
    {{/if}}

    <HdsForm novalidate {{on "submit" @flow.continueToInstall}} as |FORM|>
      <FORM.Section>
        <HdsFormTextInputField
          @isRequired={{true}}
          @value={{@flow.siteName}}
          placeholder="nyc-prod"
          {{on "input" @flow.updateSiteName}}
          as |F|
        >
          <F.Label>Site name</F.Label>
          <F.HelperText>A label for this network site in the portal.</F.HelperText>
          {{#if @flow.siteErrors.siteName}}
            <F.Error as |E|><E.Message
              >{{@flow.siteErrors.siteName}}</E.Message></F.Error>
          {{/if}}
        </HdsFormTextInputField>

        <HdsFormTextInputField
          @isRequired={{true}}
          @value={{@flow.clientId}}
          {{on "input" @flow.updateClientId}}
          as |F|
        >
          <F.Label>Service principal client ID</F.Label>
          <F.HelperText>From the HCP service principal created for this gateway.</F.HelperText>
          {{#if @flow.siteErrors.clientId}}
            <F.Error as |E|><E.Message
              >{{@flow.siteErrors.clientId}}</E.Message></F.Error>
          {{/if}}
        </HdsFormTextInputField>

        <HdsFormMaskedInputField
          @isRequired={{true}}
          @value={{@flow.clientSecret}}
          {{on "input" @flow.updateClientSecret}}
          as |F|
        >
          <F.Label>Service principal client secret</F.Label>
          <F.HelperText>Store this value securely. It is not shown again after
            setup.</F.HelperText>
          {{#if @flow.siteErrors.clientSecret}}
            <F.Error as |E|><E.Message
              >{{@flow.siteErrors.clientSecret}}</E.Message></F.Error>
          {{/if}}
        </HdsFormMaskedInputField>

        <HdsFormTextareaField
          @isRequired={{true}}
          @value={{@flow.siteCidrs}}
          placeholder="192.168.0.0/24"
          rows="4"
          {{on "input" @flow.updateSiteCidrs}}
          as |F|
        >
          <F.Label>Network site CIDRs</F.Label>
          <F.HelperText>
            One CIDR per line. Each must match a route in the gateways routing
            table, or traffic is dropped.
          </F.HelperText>
          {{#if @flow.siteErrors.siteCidrs}}
            <F.Error as |E|><E.Message
              >{{@flow.siteErrors.siteCidrs}}</E.Message></F.Error>
          {{/if}}
        </HdsFormTextareaField>

        {{#if @flow.canUseRoutingCidr}}
          <div>
            <HdsButton
              @text="Use routing table CIDR {{@flow.routingTableCidr}}"
              @color="secondary"
              @size="small"
              @icon="plus"
              {{on "click" @flow.useRoutingCidr}}
            />
          </div>
        {{/if}}

        <HdsAlert @type="inline" @color="neutral" as |A|>
          <A.Title>Source IP addresses are preserved in Vault audit logs.</A.Title>
          <A.Description>
            Enter CIDRs that match your real workload IP ranges. Requests routed
            through this site appear in audit logs with those source IPs.
          </A.Description>
        </HdsAlert>
      </FORM.Section>

      <FORM.Footer as |FF|>
        <FF.ButtonSet>
          <HdsButton
            @text="Back"
            @color="secondary"
            @icon="arrow-left"
            {{on "click" (fn @flow.go "s4")}}
          />
          <HdsButton
            @text="Next"
            @icon="arrow-right"
            @iconPosition="trailing"
            type="submit"
          />
        </FF.ButtonSet>
      </FORM.Footer>
    </HdsForm>
  </div>
</template>;

export default S5Configure;
