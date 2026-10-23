import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import {
  HdsAlert,
  HdsButton,
  HdsForm,
  HdsFormSelectField,
  HdsFormTextInputField,
  HdsLayoutGrid,
  HdsPageHeader,
} from '@hashicorp/design-system-components/components';
import type { GatewayFlow } from '../flow';

interface Signature {
  Args: { flow: GatewayFlow };
}

const S2Enable: TOC<Signature> = <template>
  <HdsPageHeader as |PH|>
    <PH.Title>Enable gateways</PH.Title>
    <PH.Description>
      HCP deploys a managed dataplane gateway for this cluster. Add the routing
      table entry that directs Vault traffic for your network to it.
    </PH.Description>
  </HdsPageHeader>

  <div class="gw-section gw-readable">
    <HdsForm {{on "submit" @flow.deployGateways}} as |FORM|>
      <FORM.Section>
        <HdsAlert @type="inline" @color="neutral" as |A|>
          <A.Title>One dataplane gateway pair is deployed for this cluster.</A.Title>
          <A.Description>
            Dataplane gateways are managed by HCP and run active/passive for
            failover. Disabling gateways removes them.
          </A.Description>
        </HdsAlert>
      </FORM.Section>

      <FORM.SectionHeader as |SH|>
        <SH.Title>Routing table</SH.Title>
        <SH.Description>
          This is the HCP-side route. The CIDR you enter here must also be
          listed as a network site CIDR when you add a site.
        </SH.Description>
      </FORM.SectionHeader>

      <FORM.Section @isFullWidth={{true}}>
        <HdsLayoutGrid @columnMinWidth="140px" @gap="16">
          <HdsFormTextInputField
            @value={{@flow.networkName}}
            {{on "input" @flow.updateNetworkName}}
            as |F|
          >
            <F.Label>Network name</F.Label>
            {{#if @flow.routingErrors.networkName}}
              <F.Error as |E|><E.Message
                >{{@flow.routingErrors.networkName}}</E.Message></F.Error>
            {{/if}}
          </HdsFormTextInputField>

          <HdsFormTextInputField
            @value={{@flow.networkCidr}}
            placeholder="192.168.0.0/24"
            {{on "input" @flow.updateNetworkCidr}}
            as |F|
          >
            <F.Label>CIDR block</F.Label>
            {{#if @flow.routingErrors.networkCidr}}
              <F.Error as |E|><E.Message
                >{{@flow.routingErrors.networkCidr}}</E.Message></F.Error>
            {{/if}}
          </HdsFormTextInputField>

          <HdsFormSelectField {{on "change" @flow.updatePrimaryZone}} as |F|>
            <F.Label>Primary zone</F.Label>
            <F.Options>
              {{#each @flow.primaryZoneOptions as |opt|}}
                <option
                  value={{opt.value}}
                  selected={{opt.selected}}
                >{{opt.label}}</option>
              {{/each}}
            </F.Options>
          </HdsFormSelectField>

          <HdsFormSelectField {{on "change" @flow.updateBackupZone}} as |F|>
            <F.Label>Backup zone</F.Label>
            <F.Options>
              {{#each @flow.backupZoneOptions as |opt|}}
                <option
                  value={{opt.value}}
                  selected={{opt.selected}}
                >{{opt.label}}</option>
              {{/each}}
            </F.Options>
            {{#if @flow.routingErrors.backupZone}}
              <F.Error as |E|><E.Message
                >{{@flow.routingErrors.backupZone}}</E.Message></F.Error>
            {{/if}}
          </HdsFormSelectField>
        </HdsLayoutGrid>
      </FORM.Section>

      <FORM.Footer as |FF|>
        <FF.ButtonSet>
          <HdsButton @text="Deploy gateways" type="submit" />
          <HdsButton
            @text="Cancel"
            @color="secondary"
            {{on "click" (fn @flow.go "s1")}}
          />
        </FF.ButtonSet>
      </FORM.Footer>
    </HdsForm>
  </div>
</template>;

export default S2Enable;
