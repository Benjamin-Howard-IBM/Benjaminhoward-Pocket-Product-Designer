import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import {
  HdsFormSelectField,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';
import type { GatewayFlow } from './flow';

interface PrototypeBarSignature {
  Args: { flow: GatewayFlow };
}

const PrototypeBar: TOC<PrototypeBarSignature> = <template>
  <div class="gw-proto" role="group" aria-label="Prototype controls">
    <HdsTextBody @tag="p" @size="100" @weight="semibold" @color="faint">
      Prototype controls
    </HdsTextBody>

    <HdsFormSelectField {{on "change" @flow.onStartStateChange}} as |F|>
      <F.Label>Start state (resets the flow)</F.Label>
      <F.Options>
        {{#each @flow.startStateOptions as |opt|}}
          <option
            value={{opt.value}}
            selected={{opt.selected}}
          >{{opt.label}}</option>
        {{/each}}
      </F.Options>
    </HdsFormSelectField>

    <HdsFormSelectField {{on "change" @flow.onVerifyOutcomeChange}} as |F|>
      <F.Label>Verification result (S7)</F.Label>
      <F.Options>
        {{#each @flow.verifyOutcomeOptions as |opt|}}
          <option
            value={{opt.value}}
            selected={{opt.selected}}
          >{{opt.label}}</option>
        {{/each}}
      </F.Options>
    </HdsFormSelectField>

    <HdsFormSelectField {{on "change" @flow.onHealthChange}} as |F|>
      <F.Label>Site health (S8, S9)</F.Label>
      <F.Options>
        {{#each @flow.healthOptions as |opt|}}
          <option
            value={{opt.value}}
            selected={{opt.selected}}
          >{{opt.label}}</option>
        {{/each}}
      </F.Options>
    </HdsFormSelectField>
  </div>
</template>;

export default PrototypeBar;
