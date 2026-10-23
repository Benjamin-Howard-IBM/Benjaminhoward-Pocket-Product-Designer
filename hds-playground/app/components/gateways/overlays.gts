import Component from '@glimmer/component';
import type { TOC } from '@ember/component/template-only';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import {
  HdsButton,
  HdsButtonSet,
  HdsFlyout,
  HdsFormMaskedInputField,
  HdsFormTextInputField,
  HdsFormTextareaField,
  HdsModal,
  HdsAlert,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';
import type { GatewayFlow } from './flow';
import InstallInstructions from './install-instructions';

interface Signature {
  Args: { flow: GatewayFlow };
}

export class RemoveSiteModal extends Component<Signature> {
  // Closing through the dialog lets HDS restore body scrolling before unmount.
  @action confirm(close: (event: MouseEvent) => void, event: MouseEvent): void {
    close(event);
    this.args.flow.confirmRemoveSite();
  }

  <template>
    <HdsModal
      @color="critical"
      @onClose={{@flow.closeRemoveModal}}
      id="gw-remove-modal"
      as |M|
    >
      <M.Header>Remove {{@flow.addedSiteName}}?</M.Header>
      <M.Body>
        <HdsAlert @type="inline" @color="critical" as |A|>
          <A.Title>The tunnel is torn down.</A.Title>
          <A.Description>
            Vault loses access to workloads in this network site.
          </A.Description>
        </HdsAlert>
        <HdsTextBody @tag="p" @size="200" class="gw-modal-copy">
          You can add the site again later. Stop the gateway agent on your host
          separately.
        </HdsTextBody>
      </M.Body>
      <M.Footer as |F|>
        <HdsButtonSet>
          <HdsButton
            @text="Remove site"
            @color="critical"
            {{on "click" (fn this.confirm F.close)}}
          />
          <HdsButton @text="Cancel" @color="secondary" {{on "click" F.close}} />
        </HdsButtonSet>
      </M.Footer>
    </HdsModal>
  </template>
}

export const InstallFlyout: TOC<Signature> = <template>
  <HdsFlyout @onClose={{@flow.closeInstallFlyout}} @size="large" as |F|>
    <F.Header>Install instructions</F.Header>
    <F.Body>
      <InstallInstructions @siteName={{@flow.addedSiteName}} @clientId="" />
    </F.Body>
    <F.Footer as |FF|>
      <HdsButton @text="Close" @color="secondary" {{on "click" FF.close}} />
    </F.Footer>
  </HdsFlyout>
</template>;

export const EditSiteFlyout: TOC<Signature> = <template>
  <HdsFlyout
    @onClose={{@flow.closeEditSite}}
    @size="large"
    id="gw-edit-flyout"
    as |F|
  >
    <F.Header>Edit {{@flow.addedSiteName}}</F.Header>
    <F.Body>
      <div class="gw-stack">
        {{#if @flow.editConfirmPending}}
          <HdsAlert @type="inline" @color="warning" as |A|>
            <A.Title>Saving restarts the tunnel</A.Title>
            <A.Description>
              Vault connections in this network site drop until the tunnel
              reconnects.
            </A.Description>
          </HdsAlert>
        {{/if}}

        {{#each @flow.editUnroutedCidrs as |cidr|}}
          <HdsAlert @type="inline" @color="warning" as |A|>
            <A.Title>No routing table entry for {{cidr}}</A.Title>
            <A.Description>
              Traffic to this CIDR is dropped until a matching route exists in
              the gateways routing table. Saving here does not change the
              routing table.
            </A.Description>
          </HdsAlert>
        {{/each}}

        <HdsFormTextInputField
          @isRequired={{true}}
          @value={{@flow.editName}}
          {{on "input" @flow.updateEditName}}
          as |F|
        >
          <F.Label>Site name</F.Label>
          <F.HelperText>A label for this network site in the portal.</F.HelperText>
          {{#if @flow.editErrors.name}}
            <F.Error as |E|><E.Message
              >{{@flow.editErrors.name}}</E.Message></F.Error>
          {{/if}}
        </HdsFormTextInputField>

        <HdsFormTextInputField
          @isRequired={{true}}
          @value={{@flow.editClientId}}
          {{on "input" @flow.updateEditClientId}}
          as |F|
        >
          <F.Label>Service principal client ID</F.Label>
          <F.HelperText>From the HCP service principal created for this gateway.</F.HelperText>
          {{#if @flow.editErrors.clientId}}
            <F.Error as |E|><E.Message
              >{{@flow.editErrors.clientId}}</E.Message></F.Error>
          {{/if}}
        </HdsFormTextInputField>

        <HdsFormMaskedInputField
          @value={{@flow.editClientSecret}}
          {{on "input" @flow.updateEditClientSecret}}
          as |F|
        >
          <F.Label>Service principal client secret</F.Label>
          <F.HelperText>
            Leave blank to keep the current secret. Store a new value securely.
          </F.HelperText>
        </HdsFormMaskedInputField>

        <HdsFormTextareaField
          @isRequired={{true}}
          @value={{@flow.editCidrs}}
          placeholder="192.168.0.0/24"
          rows="4"
          {{on "input" @flow.updateEditCidrs}}
          as |F|
        >
          <F.Label>Network site CIDRs</F.Label>
          <F.HelperText>
            One CIDR per line. Each must match a route in the gateways routing
            table, or traffic is dropped.
          </F.HelperText>
          {{#if @flow.editErrors.cidrs}}
            <F.Error as |E|><E.Message
              >{{@flow.editErrors.cidrs}}</E.Message></F.Error>
          {{/if}}
        </HdsFormTextareaField>
      </div>
    </F.Body>
    <F.Footer as |FF|>
      <HdsButtonSet>
        {{#if @flow.editConfirmPending}}
          <HdsButton
            @text="Confirm and save"
            @color="primary"
            {{on "click" @flow.submitEdit}}
          />
          <HdsButton
            @text="Back"
            @color="secondary"
            {{on "click" @flow.cancelEditConfirm}}
          />
        {{else}}
          <HdsButton
            @text="Save changes"
            @color="primary"
            {{on "click" @flow.submitEdit}}
          />
          <HdsButton
            @text="Cancel"
            @color="secondary"
            {{on "click" FF.close}}
          />
        {{/if}}
      </HdsButtonSet>
    </F.Footer>
  </HdsFlyout>
</template>;
