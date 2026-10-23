import Component from '@glimmer/component';
import { GatewayFlow } from './flow';
import type { Screen } from './flow';
import { EditSiteFlyout, InstallFlyout, RemoveSiteModal } from './overlays';
import Shell from './shell';
import S0Networking from './screens/s0-networking';
import S1Landing from './screens/s1-landing';
import S2Enable from './screens/s2-enable';
import S3Empty from './screens/s3-empty';
import S4Prerequisites from './screens/s4-prerequisites';
import S5Configure from './screens/s5-configure';
import S6Install from './screens/s6-install';
import S7Verify from './screens/s7-verify';
import S8Overview from './screens/s8-overview';
import S9SiteDetail from './screens/s9-site-detail';

const SCREENS = {
  s0: S0Networking,
  s1: S1Landing,
  s2: S2Enable,
  s3: S3Empty,
  s4: S4Prerequisites,
  s5: S5Configure,
  s6: S6Install,
  s7: S7Verify,
  s8: S8Overview,
  s9: S9SiteDetail,
} satisfies Record<Screen, unknown>;

export default class GatewayPrototype extends Component {
  flow = new GatewayFlow();

  willDestroy(): void {
    super.willDestroy();
    this.flow.destroy();
  }

  get Screen(): (typeof SCREENS)[Screen] {
    return SCREENS[this.flow.screen];
  }

  <template>
    <Shell @flow={{this.flow}}>
      <this.Screen @flow={{this.flow}} />
    </Shell>

    {{#if this.flow.removeModalOpen}}
      <RemoveSiteModal @flow={{this.flow}} />
    {{/if}}

    {{#if this.flow.installFlyoutOpen}}
      <InstallFlyout @flow={{this.flow}} />
    {{/if}}

    {{#if this.flow.editOpen}}
      <EditSiteFlyout @flow={{this.flow}} />
    {{/if}}
  </template>
}
