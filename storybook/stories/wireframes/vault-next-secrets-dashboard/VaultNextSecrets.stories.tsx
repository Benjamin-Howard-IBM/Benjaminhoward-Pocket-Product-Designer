import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';
import { SecretsDashboardDay0, SecretsDashboardDay1 } from './wireframes';

/* The wireframe components use position:absolute / inset:0 so they fill
   a relative-positioned viewport. Wrap each story in a sized frame that
   matches the showcase frame dimensions (1320 wide, scrollable). */
function Viewport({ children, height = 820 }: { children: ReactNode; height?: number }) {
  const style: CSSProperties = {
    position: 'relative',
    width: '100%',
    minWidth: 1280,
    height,
    background: '#f4f4f4',
    border: '1px solid #e0e0e0',
    overflow: 'auto',
  };
  return <div style={style}>{children}</div>;
}

const meta: Meta = {
  title: 'Wireframes/Vault Next/Secrets Dashboard',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light-gray' },
    docs: {
      description: {
        component:
          'PDR 007 - Vault Next Secrets dashboard wireframes. Day 0 covers MVP inventory (counts, filters, stores table). Day 1 adds temporal depth (DatePicker range, sparklines, age histogram, TTL approaching, recently rotated, auth-method linkage) and row-level drill-down. All data is grayscale and traces to rows in the HashiConf Dashboard Metrics CSVs or to labeled assumptions. See output/03.pdrs/007.26.05.19.PDR-Wireframes-VaultNextSecretsDashboard.md.',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

/* PDR 007 § Day 0 - MVP inventory */
export const Day0: Story = {
  name: 'Day 0 - MVP inventory',
  parameters: {
    docs: {
      description: {
        story:
          'Counts and breakdowns at the selected scope. Project / Store / Type filters. No time-series, no age data. Row click on Stores routes to a store detail page (out of scope for this frame).',
      },
    },
  },
  render: () => (
    <Viewport>
      <SecretsDashboardDay0 />
    </Viewport>
  ),
};

/* PDR 007 § Day 1 - Temporal depth and drill-down */
export const Day1: Story = {
  name: 'Day 1 - Temporal depth',
  parameters: {
    docs: {
      description: {
        story:
          'Adds DatePicker range (gated on Prometheus), tile sparklines and period deltas, Age (median) column, OverflowMenu per row, age histogram, TTL approaching, recently rotated, and auth methods used. The highlighted first row indicates an open side-panel flyout (the flyout itself is rendered as the row-selected state for this static frame).',
      },
    },
  },
  render: () => (
    <Viewport height={1100}>
      <SecretsDashboardDay1 />
    </Viewport>
  ),
};
