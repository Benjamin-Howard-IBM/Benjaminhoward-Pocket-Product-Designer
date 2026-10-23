import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import {
  HdsAlert,
  HdsButton,
  HdsIcon,
  HdsPageHeader,
  HdsTextBody,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';
import type { GatewayFlow } from '../flow';
import WizardSteps from '../wizard-steps';

interface Signature {
  Args: { flow: GatewayFlow };
}

const FAILURES = [
  {
    label: 'Agent not started',
    detail: 'Check that the gateway container is running on your host.',
  },
  {
    label: 'Credential error',
    detail:
      'Check that the service principal client ID and secret are correct and have not expired.',
  },
  {
    label: 'Missing container capabilities or blocked UDP 51820',
    detail:
      'HCP cannot tell these apart. Confirm the container has NET_ADMIN and SYS_MODULE, and that outbound UDP 51820 is open to the dataplane gateway IP.',
  },
];

export default class S7Verify extends Component<Signature> {
  failures = FAILURES;

  get isPending(): boolean {
    return this.args.flow.verifyState === 'pending';
  }

  get isConnected(): boolean {
    return this.args.flow.verifyState === 'connected';
  }

  get isFailed(): boolean {
    return this.args.flow.verifyState === 'failed';
  }

  <template>
    <HdsPageHeader as |PH|>
      <PH.Title>Add site</PH.Title>
    </HdsPageHeader>

    <div class="gw-section gw-stack gw-wizard">
      <WizardSteps @current={{3}} />

      <div class="gw-verify" aria-live="polite">
        {{#if this.isPending}}
          <HdsIcon @name="loading" @size="24" />
          <HdsTextDisplay @tag="h2" @size="300">Waiting for connection</HdsTextDisplay>
          <HdsTextBody @tag="p" @size="200" @color="faint">
            Keep the gateway agent running. This page updates when a connection
            is established.
          </HdsTextBody>
        {{/if}}

        {{#if this.isConnected}}
          <HdsIcon
            @name="check-circle-fill"
            @size="24"
            @color="var(--hds-foreground-color-success)"
          />
          <HdsTextDisplay @tag="h2" @size="300">Connected</HdsTextDisplay>
          <HdsTextBody @tag="p" @size="200" @color="faint">
            Site
            <strong>{{@flow.addedSiteName}}</strong>
            is active and healthy.
          </HdsTextBody>
          <div class="gw-actions gw-actions-center">
            <HdsButton
              @text="Done"
              @color="secondary"
              {{on "click" (fn @flow.go "s8")}}
            />
            <HdsButton
              @text="View site"
              @icon="arrow-right"
              @iconPosition="trailing"
              {{on "click" @flow.viewAddedSite}}
            />
          </div>
        {{/if}}

        {{#if this.isFailed}}
          <div class="gw-verify-failed">
            <HdsTextDisplay @tag="h2" @size="300">Connection not established</HdsTextDisplay>
            <HdsAlert @type="inline" @color="warning" as |A|>
              <A.Title>No tunnel detected.</A.Title>
              <A.Description>
                Check each cause below, fix it, then retry.
              </A.Description>
            </HdsAlert>
            <ul class="gw-failures">
              {{#each this.failures as |failure|}}
                <li>
                  <HdsTextBody
                    @tag="p"
                    @size="200"
                    @weight="semibold"
                  >{{failure.label}}</HdsTextBody>
                  <HdsTextBody
                    @tag="p"
                    @size="200"
                    @color="faint"
                  >{{failure.detail}}</HdsTextBody>
                </li>
              {{/each}}
            </ul>
            <div class="gw-actions">
              <HdsButton
                @text="Exit without saving"
                @color="secondary"
                {{on "click" (fn @flow.go "s8")}}
              />
              <HdsButton
                @text="Retry verification"
                @icon="reload"
                {{on "click" @flow.startVerification}}
              />
            </div>
          </div>
        {{/if}}
      </div>
    </div>
  </template>
}
