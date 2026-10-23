import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import {
  HdsAppFrame,
  HdsAppHeader,
  HdsAppHeaderHomeLink,
  HdsAppSideNav,
  HdsAppSideNavList,
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';
import type { GatewayFlow } from './flow';
import PrototypeBar from './prototype-bar';

interface ShellSignature {
  Args: { flow: GatewayFlow };
  Blocks: { default: [] };
}

const Shell: TOC<ShellSignature> = <template>
  <HdsAppFrame as |Frame|>
    <Frame.Header>
      <HdsAppHeader>
        <:logo>
          <HdsAppHeaderHomeLink
            @icon="hashicorp"
            @text="HashiCorp Cloud Platform"
            {{on "click" (fn @flow.go "s0")}}
          />
        </:logo>
        <:globalActions>
          <HdsDropdown @listPosition="bottom-left" as |dd|>
            <dd.ToggleButton @text="default-project" @color="secondary" />
            <dd.Title @text="Project" />
            <dd.Interactive>default-project</dd.Interactive>
          </HdsDropdown>
        </:globalActions>
        <:utilityActions>
          <HdsDropdown @listPosition="bottom-right" as |dd|>
            <dd.ToggleIcon @icon="user" @text="User menu" />
            <dd.Title @text="Signed in as" />
            <dd.Description @text="designer@cizh-org.example" />
            <dd.Separator />
            <dd.Interactive>Sign out</dd.Interactive>
          </HdsDropdown>
        </:utilityActions>
      </HdsAppHeader>
    </Frame.Header>

    <Frame.Sidebar>
      <HdsAppSideNav>
        <HdsAppSideNavList as |S|>
          <S.BackLink @text="Back to Vault Dedicated" />
          <S.Title>vault-cluster</S.Title>
          <S.Link @text="Overview" @icon="dashboard" />
          <S.Link @text="Replication" @icon="replication-direct" />
          <S.Title>Manage</S.Title>
          <S.Link @text="Integrations" @icon="plug" />
          <S.Link
            @text="Networking"
            @icon="network"
            @isActive={{@flow.isNetworkingActive}}
            {{on "click" (fn @flow.go "s0")}}
          />
          <S.Link
            @text="Gateways"
            @icon="connection-gateway"
            @isActive={{@flow.isGatewaysActive}}
            @badge={{@flow.gatewaysNavBadge}}
            class="gw-sidenav-sub"
            {{on "click" @flow.goToGateways}}
          />
        </HdsAppSideNavList>
      </HdsAppSideNav>
    </Frame.Sidebar>

    <Frame.Main>
      <div class="gw-main">
        <HdsBreadcrumb class="gw-breadcrumb">
          {{#each @flow.crumbs as |crumb|}}
            <HdsBreadcrumbItem
              @text={{crumb.text}}
              @current={{crumb.current}}
              {{on "click" (fn @flow.go crumb.screen)}}
            />
          {{/each}}
        </HdsBreadcrumb>
        {{yield}}
      </div>
    </Frame.Main>

    <Frame.Footer>
      <PrototypeBar @flow={{@flow}} />
    </Frame.Footer>
  </HdsAppFrame>
</template>;

export default Shell;
