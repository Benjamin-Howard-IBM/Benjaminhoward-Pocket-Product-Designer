import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import {
  HdsAlert,
  HdsApplicationState,
  HdsBadge,
  HdsButton,
  HdsIconTile,
  HdsLayoutFlex,
  HdsPageHeader,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';
import type { GatewayFlow } from '../flow';

interface Signature {
  Args: { flow: GatewayFlow };
}

export const DataplaneStrip: TOC<Signature> = <template>
  <div class="gw-strip">
    <HdsTextBody @tag="span" @size="100" @weight="semibold" @color="faint">
      DATAPLANE GATEWAY
    </HdsTextBody>
    <HdsLayoutFlex @gap="8" @wrap={{true}}>
      <HdsBadge
        @text={{@flow.primaryZone}}
        @icon="check-circle"
        @color="success"
        @type="outlined"
      />
    </HdsLayoutFlex>
  </div>
</template>;

export const NoSitesState: TOC<Signature> = <template>
  <HdsApplicationState as |A|>
    <A.Media><HdsIconTile @icon="gateway" @size="large" /></A.Media>
    <A.Header @title="No sites configured" />
    <A.Body
      @text="Add your first site to connect a private network to HCP Vault."
    />
    <A.Footer as |F|>
      <F.Button
        @text="Add site"
        @icon="plus"
        {{on "click" @flow.startAddSite}}
      />
    </A.Footer>
  </HdsApplicationState>
</template>;

const S3Empty: TOC<Signature> = <template>
  <HdsPageHeader as |PH|>
    <PH.Title>Gateways</PH.Title>
    <PH.Badges>
      <HdsBadge @text="Enabled" @color="success" @icon="check-circle" />
    </PH.Badges>
    <PH.Actions>
      <HdsButton
        @text="Add site"
        @icon="plus"
        {{on "click" @flow.startAddSite}}
      />
    </PH.Actions>
  </HdsPageHeader>

  <div class="gw-section gw-stack">
    <HdsAlert @type="inline" @color="success" as |A|>
      <A.Title>Gateways enabled</A.Title>
      <A.Description>
        The dataplane gateway is active. Add a site to connect your first
        private network.
      </A.Description>
    </HdsAlert>

    <DataplaneStrip @flow={{@flow}} />

    <div class="gw-empty">
      <NoSitesState @flow={{@flow}} />
    </div>
  </div>
</template>;

export default S3Empty;
