import Component from '@glimmer/component';
import { HdsCodeBlock } from '@hashicorp/design-system-components/components';
import { DOCKER_PULL, dockerRun } from './flow';

interface InstallInstructionsSignature {
  Args: { siteName: string; clientId: string };
}

export default class InstallInstructions extends Component<InstallInstructionsSignature> {
  pull = DOCKER_PULL;

  get run(): string {
    return dockerRun(this.args.siteName, this.args.clientId);
  }

  <template>
    <div class="gw-stack">
      <HdsCodeBlock
        @language="bash"
        @value={{this.pull}}
        @hasCopyButton={{true}}
        as |CB|
      >
        <CB.Title>1. Pull the gateway image</CB.Title>
      </HdsCodeBlock>
      <HdsCodeBlock
        @language="bash"
        @value={{this.run}}
        @hasCopyButton={{true}}
        as |CB|
      >
        <CB.Title>2. Run the gateway container</CB.Title>
        <CB.Description>
          Replace the client secret placeholder with the value from your service
          principal.
        </CB.Description>
      </HdsCodeBlock>
    </div>
  </template>
}
