import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { concat } from '@ember/helper';
import {
  HdsAlert,
  HdsBadge,
  HdsButton,
  HdsCardContainer,
  HdsIcon,
  HdsLinkStandalone,
  HdsPageHeader,
  HdsTextBody,
  HdsTextCode,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';
import type { GatewayFlow, SiteView } from '../flow';

interface Signature {
  Args: { flow: GatewayFlow };
}

interface SiteSignature {
  Args: { site: SiteView; flow: GatewayFlow };
}

const Topology: TOC<SiteSignature> = <template>
  <HdsCardContainer @hasBorder={{true}} class="gw-card gw-card-padded">
    <HdsTextDisplay @tag="h2" @size="300">Connection topology</HdsTextDisplay>
    <div
      class="gw-topology"
      role="group"
      aria-label="Site gateway {{@site.siteGatewayLabel}}, connected to the active dataplane gateway in {{@flow.primaryZone}}, which serves the Vault cluster."
    >
      <div class="gw-topology-node">
        <HdsIcon @name="gateway" @size="24" />
        <HdsTextBody @tag="span" @size="200" @weight="semibold">Site gateway</HdsTextBody>
        <HdsBadge
          @text={{@site.siteGatewayLabel}}
          @color={{@site.siteGatewayColor}}
          @size="small"
        />
      </div>
      <div
        class={{concat "gw-topology-link gw-topology-link-" @site.healthClass}}
      >
        <span>Encrypted tunnel</span>
      </div>
      <div class="gw-topology-node">
        <HdsIcon @name="gateway" @size="24" />
        <HdsTextBody @tag="span" @size="200" @weight="semibold">Dataplane
          gateway</HdsTextBody>
        <HdsBadge @text="Active" @color="success" @size="small" />
        <HdsTextBody
          @tag="span"
          @size="100"
          @color="faint"
        >{{@flow.primaryZone}}</HdsTextBody>
      </div>
      <div class="gw-topology-link gw-topology-link-healthy">
        <span>Private link</span>
      </div>
      <div class="gw-topology-node">
        <HdsIcon @name="vault" @size="24" />
        <HdsTextBody @tag="span" @size="200" @weight="semibold">Vault cluster</HdsTextBody>
      </div>
    </div>
  </HdsCardContainer>
</template>;

const S9SiteDetail: TOC<Signature> = <template>
  {{#if @flow.site}}
    {{#let @flow.site as |site|}}
      <HdsPageHeader as |PH|>
        <PH.Title>{{site.name}}</PH.Title>
        <PH.Badges>
          <HdsBadge
            @text={{site.statusLabel}}
            @color={{site.statusColor}}
            @icon={{site.statusIcon}}
          />
        </PH.Badges>
        <PH.Actions>
          <HdsButton
            @text="Edit site"
            @color="secondary"
            {{on "click" @flow.openEditSite}}
          />
          <HdsButton
            @text="Remove site"
            @color="critical"
            @icon="trash"
            {{on "click" @flow.openRemoveModal}}
          />
        </PH.Actions>
      </HdsPageHeader>

      <div class="gw-section gw-stack">
        {{#if @flow.isDegraded}}
          <HdsAlert @type="inline" @color="warning" as |A|>
            <A.Title>Site gateway unresponsive. Last heard
              {{site.lastHeard}}.</A.Title>
            <A.Description>
              The tunnel was established but the agent has stopped responding.
              Check that the gateway agent is running and that outbound UDP port
              51820 is open.
            </A.Description>
          </HdsAlert>
        {{/if}}

        {{#if @flow.isNotConnected}}
          <HdsAlert @type="inline" @color="neutral" as |A|>
            <A.Title>No tunnel established.</A.Title>
            <A.Description>
              The gateway agent has not connected yet. Verify the agent is
              running and can reach HCP on outbound UDP port 51820.
            </A.Description>
          </HdsAlert>
        {{/if}}

        <Topology @site={{site}} @flow={{@flow}} />

        <div class="gw-detail-grid">
          <HdsCardContainer @hasBorder={{true}} class="gw-card gw-card-padded">
            <HdsTextDisplay @tag="h2" @size="300">Configuration</HdsTextDisplay>
            <dl class="gw-dl">
              <dt>Site name</dt>
              <dd><HdsTextCode
                  @tag="span"
                  @size="200"
                >{{site.name}}</HdsTextCode></dd>
              <dt>Service principal client ID</dt>
              <dd><HdsTextCode
                  @tag="span"
                  @size="200"
                >{{site.clientId}}</HdsTextCode></dd>
              <dt>Status</dt>
              <dd>
                <HdsBadge
                  @text={{site.statusLabel}}
                  @color={{site.statusColor}}
                  @icon={{site.statusIcon}}
                />
              </dd>
              <dt>Last seen</dt>
              <dd>{{if site.lastHeard site.lastHeard site.lastSeen}}</dd>
              <dt>Deployment model</dt>
              <dd>Docker</dd>
              <dt>Agent version</dt>
              <dd><HdsTextCode @tag="span" @size="200">v1.2.1</HdsTextCode></dd>
              <dt>Network site CIDRs</dt>
              <dd>
                {{#each site.cidrs as |cidr|}}
                  <div><HdsTextCode
                      @tag="span"
                      @size="200"
                    >{{cidr}}</HdsTextCode></div>
                {{/each}}
              </dd>
            </dl>
          </HdsCardContainer>

          <div class="gw-stack">
            <HdsCardContainer
              @hasBorder={{true}}
              class="gw-card gw-card-padded"
            >
              <HdsTextDisplay @tag="h2" @size="300">Connection health</HdsTextDisplay>
              <dl class="gw-dl">
                <dt>Site gateway</dt>
                <dd>
                  <HdsBadge
                    @text={{site.siteGatewayLabel}}
                    @color={{site.siteGatewayColor}}
                    @type="outlined"
                  />
                </dd>
                <dt>Dataplane gateway</dt>
                <dd>
                  <HdsBadge
                    @text={{site.dataplaneLabel}}
                    @color="success"
                    @type="outlined"
                  />
                </dd>
              </dl>
            </HdsCardContainer>

            <HdsCardContainer
              @hasBorder={{true}}
              class="gw-card gw-card-padded"
            >
              <HdsTextDisplay @tag="h2" @size="300">Gateway agent</HdsTextDisplay>
              <HdsTextBody @tag="p" @size="200" @color="faint">
                The gateway agent runs inside your network. You are responsible
                for deployment and updates.
              </HdsTextBody>
              <div class="gw-stack gw-stack-tight">
                <div>
                  <HdsButton
                    @text="View install instructions"
                    @color="secondary"
                    @size="small"
                    {{on "click" @flow.openInstallFlyout}}
                  />
                </div>
                <HdsLinkStandalone
                  @text="View update instructions"
                  @href="#"
                  @icon="external-link"
                  @iconPosition="trailing"
                  {{on "click" @flow.noop}}
                />
              </div>
              <div class="gw-version">
                <HdsTextCode @tag="span" @size="100">Current: v1.2.1</HdsTextCode>
                <HdsBadge
                  @text="New version available"
                  @color="warning"
                  @size="small"
                />
              </div>
            </HdsCardContainer>
          </div>
        </div>
      </div>
    {{/let}}
  {{/if}}
</template>;

export default S9SiteDetail;
