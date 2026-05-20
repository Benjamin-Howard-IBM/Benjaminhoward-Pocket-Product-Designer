import type { ShowcaseConfig } from '../../src/types';
import { SecretsDashboardDay0, SecretsDashboardDay1 } from './wireframes';

export const config: ShowcaseConfig = {
  title: 'Vault Next - Secrets Dashboard',
  subtitle:
    'Wireframes for the Vault Next Secrets dashboard. Day 0 covers inventory and project-scoped filters. Day 1 adds temporal context, drill-down patterns, and the auth-method linkage.',
  meta: {
    pdr: '007.26.05.19.PDR-Wireframes-VaultNextSecretsDashboard',
    date: 'May 19, 2026',
  },
  outputName: '007.VaultNextSecretsDashboard-Draft01',
  theme: 'grayscale',
  preamble: `
    <section id="context">
      <h2 style="font-family: var(--z-font-sans); font-size: var(--z-text-2xl); color: var(--z-text-primary); margin: 0 0 16px; font-weight: 600;">Context</h2>
      <p style="font-family: var(--z-font-sans); font-size: var(--z-text-base); color: var(--z-text-secondary); line-height: 1.65; margin: 0 0 16px;">
        Vault Next replaces the current k/v engine with a strongly-typed Secrets service organized by Scope > Project > Secret Store > Secret. The Secrets dashboard is the inventory and posture surface for the Platform Engineer persona, with a secondary read-only view for App Developers.
      </p>
      <p style="font-family: var(--z-font-sans); font-size: var(--z-text-base); color: var(--z-text-secondary); line-height: 1.65; margin: 0;">
        Day 0 is MVP - counts and breakdowns at the selected scope, no time-series. Day 1 adds temporal context (age, TTL), the side-panel drill-down from a Secret Store row, and the auth-method-to-secret access linkage. Both fidelities use the IBM Carbon Design System.
      </p>
    </section>
    <section id="personas" style="margin-top: 40px;">
      <h2 style="font-family: var(--z-font-sans); font-size: var(--z-text-2xl); color: var(--z-text-primary); margin: 0 0 16px; font-weight: 600;">Personas</h2>
      <div style="font-family: var(--z-font-sans); font-size: var(--z-text-base); color: var(--z-text-secondary); line-height: 1.65;">
        <p style="margin: 0 0 12px;"><strong style="color: var(--z-text-primary);">Platform Engineer (primary).</strong> Owns secret store configuration, project-level inventory, and remediation of secrets approaching TTL.</p>
        <p style="margin: 0;"><strong style="color: var(--z-text-primary);">Application Developer (secondary).</strong> Read-only view of which stores and secret types are available in their projects.</p>
      </div>
    </section>
    <section id="metrics-source" style="margin-top: 40px;">
      <h2 style="font-family: var(--z-font-sans); font-size: var(--z-text-2xl); color: var(--z-text-primary); margin: 0 0 16px; font-weight: 600;">Metric sources</h2>
      <p style="font-family: var(--z-font-sans); font-size: var(--z-text-base); color: var(--z-text-secondary); line-height: 1.65; margin: 0;">
        Tiles and panels trace back to rows in the HashiConf Dashboard Metrics CSVs (Secrets Metrics; Users / Entities / Identities; Filtering Requirements). Out-of-scope items (CREATED BY, LAST ACCESSED, all operational traffic metrics) are not shown at either fidelity.
      </p>
    </section>
  `,
  preambleNav: [
    { id: 'context', label: 'Context' },
    { id: 'personas', label: 'Personas' },
    { id: 'metrics-source', label: 'Metric sources' },
  ],
  layout: {
    mode: 'showcase',
    contentMaxWidth: 1320,
    frame: {
      height: 820,
      overflow: 'auto',
      contentMinHeight: 1200,
    },
  },
  sections: [
    {
      id: 'day-0',
      title: 'Day 0 — MVP inventory',
      subtitle:
        'Counts and breakdowns at the selected scope. Project / Store / Type filters. No time-series. Row click on Stores navigates to a store detail page (out of scope here).',
      stageNumber: 'Day 0',
      phase: 'interactive',
      states: {
        'Default': SecretsDashboardDay0,
      },
      frame: {
        title: 'Vault Next · Secrets',
      },
      annotation: `
        <div class="ann-block">
          <h3>Region → Metric</h3>
          <ul>
            <li><strong># Secrets tile</strong> ← Secrets Metrics > # of Secrets</li>
            <li><strong># Secret Stores tile</strong> ← Secrets Metrics > # Stores (available / pending deletion)</li>
            <li><strong># Clients tile</strong> ← # Clients by type, combined at Day 0</li>
            <li><strong># Pending deletion tile</strong> ← # Secrets by status + # Stores pending deletion</li>
            <li><strong>Stores table</strong> ← # Secrets by store</li>
            <li><strong>Secrets by type / status</strong> ← # Secrets by type, by status</li>
          </ul>
        </div>
        <div class="ann-block">
          <h3>Interactions</h3>
          <ul>
            <li>Project dropdown scopes every region.</li>
            <li>Store dropdown collapses the table to one row and recomputes breakdowns.</li>
            <li>Type multi-select filters breakdown panels only (rows are stores).</li>
            <li>Row click → navigate to store detail page. No inline drill at Day 0.</li>
            <li>Empty state: Carbon <strong>EmptyState</strong> + ghost <strong>Button</strong> "Create a secret store".</li>
          </ul>
          <h3 style="margin-top: 16px;">Out of scope at Day 0</h3>
          <ul>
            <li>CREATED BY and LAST ACCESSED columns (Secrets CSV).</li>
            <li>All operational traffic metrics.</li>
            <li>Time-range filtering and age data.</li>
          </ul>
        </div>
      `,
    },
    {
      id: 'day-1',
      title: 'Day 1 — Temporal depth and drill-down',
      subtitle:
        'Adds DatePicker range (gated on Prometheus), tile sparklines + deltas, age histogram, TTL approaching, recently rotated, auth-method linkage, and per-row overflow menu. Row click opens a side-panel flyout instead of routing away.',
      stageNumber: 'Day 1',
      phase: 'execution',
      states: {
        'Default': SecretsDashboardDay1,
      },
      frame: {
        title: 'Vault Next · Secrets',
        height: 1100,
        contentMinHeight: 1900,
        overflow: 'auto',
      },
      annotation: `
        <div class="ann-block">
          <h3>What is new vs Day 0</h3>
          <ul>
            <li><strong>DatePicker range</strong> in the filter bar (Last 30 days).</li>
            <li><strong>InlineNotification</strong> stating Prometheus gating.</li>
            <li><strong>Tile sparklines + period delta</strong> (e.g., +24 vs previous range).</li>
            <li><strong>Auth method</strong> dropdown filter (Secrets-dashboard only).</li>
            <li><strong>Age (median)</strong> column on the Stores table.</li>
            <li><strong>OverflowMenu</strong> per row: Open store, Schedule deletion, Export inventory.</li>
            <li><strong>Side flyout</strong> on row click - in this static frame, the first row is highlighted to indicate the open state.</li>
            <li><strong>Age histogram</strong>, <strong>TTL approaching</strong>, <strong>Recently rotated</strong>, <strong>Auth methods used</strong> panels.</li>
          </ul>
        </div>
        <div class="ann-block">
          <h3>Gating</h3>
          <ul>
            <li><strong>DatePicker + sparklines + age histogram</strong> gated on Prometheus availability.</li>
            <li><strong>Auth methods used</strong> panel gated on access-log instrumentation.</li>
            <li><strong>Recently rotated</strong> sources from Secret Version state transitions (labeled assumption).</li>
          </ul>
          <h3 style="margin-top: 16px;">Carbon mapping</h3>
          <ul>
            <li>UI Shell, SideNav, Breadcrumb, page title.</li>
            <li>Dropdown × 5, DatePicker range, Tag, FilterableMultiSelect.</li>
            <li>Tile × 4 (with sparkline + delta).</li>
            <li>DataTable + Toolbar + Pagination + OverflowMenu.</li>
            <li>SimpleBarChart × 4, HistogramChart × 1.</li>
            <li>InlineNotification (info), EmptyState, Button (ghost).</li>
          </ul>
        </div>
      `,
    },
  ],
};
