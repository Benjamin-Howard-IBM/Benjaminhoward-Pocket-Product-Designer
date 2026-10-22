import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import {
  HdsAlert,
  HdsButton,
  HdsForm,
  HdsFormRadioCardGroup,
  HdsFormRadioGroup,
  HdsFormSelectField,
  HdsFormTextInputField,
} from '@hashicorp/design-system-components/components';

type Format = 'text' | 'json';
type Delivery = 'download' | 'clipboard' | 'webhook';

interface FormatOption {
  value: Format;
  label: string;
  helperText: string;
}

interface DeliveryOption {
  value: Delivery;
  label: string;
  description: string;
  icon: 'download' | 'clipboard-copy' | 'webhook';
  badge?: string;
}

const FORMAT_OPTIONS: FormatOption[] = [
  { value: 'text', label: 'Text', helperText: 'Plain text, easy to read.' },
  {
    value: 'json',
    label: 'JSON',
    helperText: 'Structured data for tools and integrations.',
  },
];

const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    value: 'download',
    label: 'Download file',
    description: 'Save the output to your computer.',
    icon: 'download',
  },
  {
    value: 'clipboard',
    label: 'Copy to clipboard',
    description: 'Paste the output wherever you need it.',
    icon: 'clipboard-copy',
  },
  {
    value: 'webhook',
    label: 'Send to webhook',
    description: 'Post the output to an HTTPS endpoint.',
    icon: 'webhook',
    badge: 'Beta',
  },
];

const REGIONS = ['us-east-1', 'us-west-2', 'eu-central-1', 'ap-southeast-1'];

export default class FormatStartup extends Component {
  formatOptions = FORMAT_OPTIONS;
  deliveryOptions = DELIVERY_OPTIONS;
  regions = REGIONS;

  @tracked format: Format = 'text';
  @tracked delivery: Delivery = 'download';
  @tracked sessionName = '';
  @tracked region = REGIONS[0]!;
  @tracked confirmation: string | null = null;

  isFormat = (value: Format): boolean => this.format === value;
  isDelivery = (value: Delivery): boolean => this.delivery === value;

  @action selectFormat(value: Format): void {
    this.format = value;
  }

  // HDS Radio Cards do not manage mutual exclusivity, so checked state lives here.
  @action selectDelivery(value: Delivery): void {
    this.delivery = value;
  }

  @action updateSessionName(event: Event): void {
    this.sessionName = (event.target as HTMLInputElement).value;
  }

  @action updateRegion(event: Event): void {
    this.region = (event.target as HTMLSelectElement).value;
  }

  @action continue(event: Event): void {
    event.preventDefault();
    const format = FORMAT_OPTIONS.find((o) => o.value === this.format)!.label;
    const delivery = DELIVERY_OPTIONS.find(
      (o) => o.value === this.delivery,
    )!.label;
    const session = this.sessionName.trim() || 'Untitled session';
    this.confirmation = `${format} format, ${delivery}, ${this.region} - ${session}`;
  }

  <template>
    <main class="playground">
      <HdsForm {{on "submit" this.continue}} as |FORM|>
        <FORM.Header as |H|>
          <H.Title @tag="h1" @size="500">Choose a format</H.Title>
          <H.Description>
            Select how you want this session's output to be formatted and
            delivered.
          </H.Description>
        </FORM.Header>

        <FORM.Section>
          <HdsAlert @type="inline" @color="highlight" as |A|>
            <A.Title>HDS v7 component test page</A.Title>
            <A.Description>
              Every control on this page is a real Helios Design System
              component.
            </A.Description>
          </HdsAlert>
        </FORM.Section>

        <FORM.Section>
          <HdsFormRadioGroup @name="output-format" as |G|>
            <G.Legend>Output format</G.Legend>
            {{#each this.formatOptions as |option|}}
              <G.RadioField
                @value={{option.value}}
                checked={{this.isFormat option.value}}
                {{on "change" (fn this.selectFormat option.value)}}
                as |F|
              >
                <F.Label>{{option.label}}</F.Label>
                <F.HelperText>{{option.helperText}}</F.HelperText>
              </G.RadioField>
            {{/each}}
          </HdsFormRadioGroup>
        </FORM.Section>

        <FORM.Section @isFullWidth={{true}}>
          <HdsFormRadioCardGroup
            @name="delivery-method"
            @layout="horizontal"
            as |G|
          >
            <G.Legend>Delivery method</G.Legend>
            {{#each this.deliveryOptions as |option|}}
              <G.RadioCard
                @value={{option.value}}
                @checked={{this.isDelivery option.value}}
                {{on "change" (fn this.selectDelivery option.value)}}
                as |R|
              >
                <R.Icon @name={{option.icon}} />
                <R.Label>{{option.label}}</R.Label>
                {{#if option.badge}}
                  <R.Badge @text={{option.badge}} @color="highlight" />
                {{/if}}
                <R.Description>{{option.description}}</R.Description>
              </G.RadioCard>
            {{/each}}
          </HdsFormRadioCardGroup>
        </FORM.Section>

        <FORM.Section>
          <HdsFormTextInputField
            @isOptional={{true}}
            @value={{this.sessionName}}
            {{on "input" this.updateSessionName}}
            as |F|
          >
            <F.Label>Session name</F.Label>
            <F.HelperText>Shown in the output header.</F.HelperText>
          </HdsFormTextInputField>

          <HdsFormSelectField {{on "change" this.updateRegion}} as |F|>
            <F.Label>Region</F.Label>
            <F.Options>
              {{#each this.regions as |region|}}
                <option value={{region}}>{{region}}</option>
              {{/each}}
            </F.Options>
          </HdsFormSelectField>
        </FORM.Section>

        <FORM.Footer as |FF|>
          <FF.ButtonSet>
            <HdsButton
              @text="Continue"
              @icon="arrow-right"
              @iconPosition="trailing"
              type="submit"
            />
          </FF.ButtonSet>
        </FORM.Footer>
      </HdsForm>

      <div class="playground__status">
        {{#if this.confirmation}}
          <HdsAlert @type="inline" @color="success" as |A|>
            <A.Title>Selection confirmed</A.Title>
            <A.Description>{{this.confirmation}}</A.Description>
          </HdsAlert>
        {{/if}}
      </div>
    </main>
  </template>
}
