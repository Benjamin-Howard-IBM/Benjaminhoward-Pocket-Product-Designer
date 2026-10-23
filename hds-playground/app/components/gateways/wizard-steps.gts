import type { TOC } from '@ember/component/template-only';
import { HdsStepperNav } from '@hashicorp/design-system-components/components';

interface WizardStepsSignature {
  Args: { current: number };
}

const STEPS = [
  { title: 'Prerequisites' },
  { title: 'Configure' },
  { title: 'Install' },
  { title: 'Verify' },
];

const WizardSteps: TOC<WizardStepsSignature> = <template>
  <HdsStepperNav
    @ariaLabel="Add site progress"
    @steps={{STEPS}}
    @currentStep={{@current}}
    @isInteractive={{false}}
    class="gw-steps"
  />
</template>;

export default WizardSteps;
