import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import {
  HdsAlert,
  HdsBadge,
  HdsButton,
  HdsDropdown,
  HdsLinkInline,
  HdsPageHeader,
  HdsTable,
} from '@hashicorp/design-system-components/components';
import type { GatewayFlow } from '../flow';
import { DataplaneStrip, NoSitesState } from './s3-empty';

interface Signature {
  Args: { flow: GatewayFlow };
}

const COLUMNS = [
  { key: 'name', label: 'Site' },
  { key: 'status', label: 'Status' },
  { key: 'siteGateway', label: 'Site gateway' },
  { key: 'dataplane', label: 'Dataplane' },
  { key: 'lastSeen', label: 'Last seen' },
  { key: 'actions', label: 'Actions', isVisuallyHidden: true },
];

const S8Overview: TOC<Signature> = <template>
  <HdsPageHeader as |PH|>
    <PH.Title>Gateways</PH.Title>
    <PH.Badges>
      <HdsBadge @text="Enabled" @color="success" @icon="check-circle" />
    </PH.Badges>
    {{#unless @flow.siteAdded}}
      <PH.Actions>
        <HdsButton
          @text="Add site"
          @icon="plus"
          {{on "click" @flow.startAddSite}}
        />
      </PH.Actions>
    {{/unless}}
  </HdsPageHeader>

  <div class="gw-section gw-stack">
    <DataplaneStrip @flow={{@flow}} />

    {{#let @flow.site as |site|}}
      {{#if site}}
        <HdsTable
          @caption="Gateway sites"
          @model={{@flow.siteRows}}
          @columns={{COLUMNS}}
        >
          <:body as |B|>
            <B.Tr>
              <B.Td>
                <HdsLinkInline
                  @href="#"
                  {{on "click" (fn @flow.go "s9")}}
                >{{site.name}}</HdsLinkInline>
              </B.Td>
              <B.Td>
                <HdsBadge
                  @text={{site.statusLabel}}
                  @color={{site.statusColor}}
                  @icon={{site.statusIcon}}
                />
              </B.Td>
              <B.Td>
                <HdsBadge
                  @text={{site.siteGatewayLabel}}
                  @color={{site.siteGatewayColor}}
                  @type="outlined"
                />
              </B.Td>
              <B.Td>
                <HdsBadge
                  @text={{site.dataplaneLabel}}
                  @color="success"
                  @type="outlined"
                />
              </B.Td>
              <B.Td>{{site.lastSeen}}</B.Td>
              <B.Td>
                <HdsDropdown @listPosition="bottom-right" as |dd|>
                  <dd.ToggleIcon
                    @icon="more-horizontal"
                    @text="Actions for {{site.name}}"
                  />
                  <dd.Interactive {{on "click" (fn @flow.go "s9")}}>View site</dd.Interactive>
                  <dd.Separator />
                  <dd.Interactive
                    @color="critical"
                    {{on "click" @flow.openRemoveModal}}
                  >Remove site</dd.Interactive>
                </HdsDropdown>
              </B.Td>
            </B.Tr>
          </:body>
        </HdsTable>

        {{#if @flow.isDegraded}}
          <HdsAlert @type="inline" @color="warning" as |A|>
            <A.Title>{{site.name}} is degraded.</A.Title>
            <A.Description>
              The site gateway is unresponsive. Last heard
              {{site.lastHeard}}. Check that the gateway agent is running.
            </A.Description>
          </HdsAlert>
        {{/if}}

        {{#if @flow.isNotConnected}}
          <HdsAlert @type="inline" @color="neutral" as |A|>
            <A.Title>{{site.name}} has not connected.</A.Title>
            <A.Description>
              No tunnel has been established. Verify the gateway agent is
              running and outbound UDP port 51820 is open.
            </A.Description>
          </HdsAlert>
        {{/if}}
      {{else}}
        <div class="gw-empty">
          <NoSitesState @flow={{@flow}} />
        </div>
      {{/if}}
    {{/let}}
  </div>
</template>;

export default S8Overview;
