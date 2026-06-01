import type { CSSProperties, ReactNode } from 'react';

/* =============================================================
   Vault Next Secrets Dashboard - Wireframe components
   Day 0 and Day 1 fidelity. Carbon Design System component shapes
   rendered as grayscale wireframes (no Carbon runtime dependency).
   Token slots map to: $background, $layer-01, $layer-02,
   $border-subtle-01, $text-primary, $text-secondary, $text-helper,
   $spacing-05, $spacing-07.
   ============================================================= */

/* ── Carbon token palette (grayscale wireframe) ──────────────── */
const C = {
  background: '#f4f4f4',       // $background (Carbon Gray 10)
  layer01: '#ffffff',          // $layer-01
  layer02: '#f4f4f4',          // $layer-02
  layerAccent: '#e8e8e8',
  borderSubtle: '#e0e0e0',     // $border-subtle-01
  borderStrong: '#8d8d8d',
  textPrimary: '#161616',      // $text-primary
  textSecondary: '#525252',    // $text-secondary
  textHelper: '#6f6f6f',       // $text-helper
  textPlaceholder: '#a8a8a8',
  inverseText: '#ffffff',
  focus: '#0f62fe',            // $focus (rendered desaturated below)
  navActive: '#393939',
  navBg: '#262626',            // UI Shell header (Carbon Gray 90)
  sideNavBg: '#ffffff',
  tagBg: '#e0e0e0',
  shadow: 'rgba(0,0,0,0.08)',
};

const FONT_SANS = "'IBM Plex Sans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
const FONT_MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

/* ── Reusable primitive styles ───────────────────────────────── */

const shellStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: FONT_SANS,
  fontSize: 13,
  color: C.textPrimary,
  background: C.background,
  overflow: 'hidden',
};

const headerStyle: CSSProperties = {
  height: 48,
  background: C.navBg,
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  flexShrink: 0,
  fontSize: 14,
  fontWeight: 400,
  gap: 16,
};

const headerActionStyle: CSSProperties = {
  width: 28,
  height: 28,
  border: '1px solid #4d4d4d',
  borderRadius: 0,
  marginLeft: 'auto',
  background: 'transparent',
};

const bodyStyle: CSSProperties = {
  display: 'flex',
  flex: 1,
  minHeight: 0,
};

const sideNavStyle: CSSProperties = {
  width: 224,
  background: C.sideNavBg,
  borderRight: `1px solid ${C.borderSubtle}`,
  padding: '8px 0',
  flexShrink: 0,
  overflowY: 'auto',
};

const navItemStyle = (active = false, indent = 0): CSSProperties => ({
  padding: `12px 16px 12px ${16 + indent * 16}px`,
  fontSize: 14,
  color: active ? C.textPrimary : C.textSecondary,
  fontWeight: active ? 600 : 400,
  background: active ? C.layer02 : 'transparent',
  borderLeft: active ? `3px solid ${C.textPrimary}` : '3px solid transparent',
  cursor: 'default',
});

const mainStyle: CSSProperties = {
  flex: 1,
  padding: '24px 32px 32px',
  overflow: 'auto',
  background: C.background,
};

const breadcrumbStyle: CSSProperties = {
  fontSize: 12,
  color: C.textSecondary,
  marginBottom: 8,
};

const pageTitleStyle: CSSProperties = {
  fontSize: 28,
  fontWeight: 400,
  color: C.textPrimary,
  margin: '0 0 24px',
  lineHeight: 1.2,
};

const filterBarStyle: CSSProperties = {
  display: 'flex',
  gap: 1,
  marginBottom: 12,
  flexWrap: 'wrap',
};

const dropdownStyle: CSSProperties = {
  background: C.layer01,
  border: `1px solid ${C.borderSubtle}`,
  borderBottom: `1px solid ${C.borderStrong}`,
  padding: '11px 16px',
  fontSize: 14,
  color: C.textPrimary,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  minWidth: 200,
  fontFamily: FONT_SANS,
};

const caretStyle: CSSProperties = {
  marginLeft: 'auto',
  fontSize: 10,
  color: C.textHelper,
};

const tagRowStyle: CSSProperties = {
  display: 'flex',
  gap: 8,
  marginBottom: 24,
  flexWrap: 'wrap',
};

const tagStyle: CSSProperties = {
  background: C.tagBg,
  padding: '4px 8px 4px 12px',
  borderRadius: 12,
  fontSize: 12,
  color: C.textPrimary,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
};

const closeBtn: CSSProperties = {
  width: 14,
  height: 14,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 12,
  color: C.textSecondary,
};

const gridStyle = (cols: string): CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: cols,
  gap: 1,
  background: C.borderSubtle,
  marginBottom: 1,
});

const tileStyle: CSSProperties = {
  background: C.layer01,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 132,
};

const tileLabel: CSSProperties = {
  fontSize: 14,
  color: C.textSecondary,
  fontWeight: 400,
  marginBottom: 8,
};

const tileValue: CSSProperties = {
  fontSize: 42,
  fontWeight: 300,
  color: C.textPrimary,
  lineHeight: 1.1,
  fontFamily: FONT_SANS,
};

const tileSub: CSSProperties = {
  fontSize: 12,
  color: C.textHelper,
  marginTop: 'auto',
  paddingTop: 8,
};

const tileDelta: CSSProperties = {
  fontSize: 13,
  color: C.textSecondary,
  marginLeft: 8,
};

/* ── Sparkline (faux SVG line) ───────────────────────────────── */
function Sparkline({ direction = 'up', points = '0,18 12,14 24,16 36,10 48,12 60,6 72,8 84,4' }: {
  direction?: 'up' | 'down';
  points?: string;
}) {
  const pts = direction === 'down'
    ? '0,4 12,6 24,8 36,12 48,10 60,14 72,18 84,16'
    : points;
  return (
    <svg width="100%" height="24" viewBox="0 0 84 22" preserveAspectRatio="none" style={{ marginTop: 8 }}>
      <polyline
        fill="none"
        stroke={C.textSecondary}
        strokeWidth={1.25}
        points={pts}
      />
    </svg>
  );
}

/* ── Section wrappers ────────────────────────────────────────── */

const panelStyle: CSSProperties = {
  background: C.layer01,
  padding: '16px 16px 20px',
};

const panelHeader: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: C.textPrimary,
  marginBottom: 16,
};

const panelSub: CSSProperties = {
  fontSize: 12,
  color: C.textHelper,
  marginTop: -10,
  marginBottom: 12,
};

/* ── DataTable ───────────────────────────────────────────────── */

const tableWrap: CSSProperties = {
  background: C.layer01,
  marginBottom: 24,
};

const tableToolbar: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${C.borderSubtle}`,
  background: C.layer01,
};

const toolbarTitle: CSSProperties = {
  padding: '16px 16px 12px',
  fontSize: 16,
  fontWeight: 600,
  color: C.textPrimary,
  flex: 1,
};

const toolbarSearch: CSSProperties = {
  height: 48,
  width: 240,
  borderLeft: `1px solid ${C.borderSubtle}`,
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  fontSize: 14,
  color: C.textPlaceholder,
};

const toolbarBtn: CSSProperties = {
  height: 48,
  width: 48,
  borderLeft: `1px solid ${C.borderSubtle}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: C.textSecondary,
  fontSize: 14,
};

const tableBase: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 14,
  color: C.textPrimary,
};

const thStyle: CSSProperties = {
  textAlign: 'left',
  padding: '12px 16px',
  background: C.layer02,
  borderBottom: `1px solid ${C.borderSubtle}`,
  fontWeight: 600,
  fontSize: 14,
  color: C.textPrimary,
};

const tdStyle: CSSProperties = {
  padding: '12px 16px',
  borderBottom: `1px solid ${C.borderSubtle}`,
  fontWeight: 400,
};

const paginationStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTop: `1px solid ${C.borderSubtle}`,
  padding: '8px 16px',
  fontSize: 12,
  color: C.textSecondary,
};

/* ── Bar chart (Carbon SimpleBarChart shape) ─────────────────── */

interface BarRow { label: string; value: number; }

function BarChart({ rows, max }: { rows: BarRow[]; max?: number }) {
  const m = max ?? Math.max(...rows.map(r => r.value), 1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 60px', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 12, color: C.textSecondary }}>{r.label}</div>
          <div style={{ height: 16, background: C.layer02, position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              width: `${(r.value / m) * 100}%`,
              background: C.textSecondary,
            }} />
          </div>
          <div style={{ fontSize: 12, color: C.textPrimary, textAlign: 'right', fontFamily: FONT_MONO }}>
            {r.value.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Histogram (vertical bars) ───────────────────────────────── */

function Histogram({ bins }: { bins: { label: string; value: number }[] }) {
  const max = Math.max(...bins.map(b => b.value), 1);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 110, padding: '8px 0' }}>
        {bins.map((b, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ fontSize: 11, color: C.textHelper, fontFamily: FONT_MONO }}>{b.value}</div>
            <div style={{
              width: '100%',
              height: `${(b.value / max) * 80}px`,
              background: C.textSecondary,
              minHeight: 4,
            }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, borderTop: `1px solid ${C.borderSubtle}`, paddingTop: 4 }}>
        {bins.map((b, i) => (
          <div key={i} style={{ flex: 1, fontSize: 11, color: C.textHelper, textAlign: 'center' }}>{b.label}</div>
        ))}
      </div>
    </div>
  );
}

/* ── InlineNotification ──────────────────────────────────────── */

function InlineNotification({ kind = 'info', title, body }: { kind?: 'info' | 'warning'; title: string; body: string }) {
  return (
    <div style={{
      background: C.layer01,
      borderLeft: `3px solid ${kind === 'warning' ? '#8d8d8d' : '#525252'}`,
      padding: '12px 16px',
      marginBottom: 16,
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
    }}>
      <div style={{
        width: 16, height: 16, borderRadius: '50%', border: `1.5px solid ${C.textSecondary}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
        color: C.textSecondary, flexShrink: 0, marginTop: 2, fontFamily: FONT_MONO, fontWeight: 600,
      }}>i</div>
      <div style={{ fontSize: 13, lineHeight: 1.5 }}>
        <div style={{ fontWeight: 600, color: C.textPrimary, marginBottom: 2 }}>{title}</div>
        <div style={{ color: C.textSecondary }}>{body}</div>
      </div>
    </div>
  );
}

/* ── Shared shell ────────────────────────────────────────────── */

function SideNav({ section }: { section: 'secrets' | 'crypto' }) {
  return (
    <aside style={sideNavStyle}>
      <div style={{ ...navItemStyle(section === 'secrets'), fontWeight: 600 }}>Secrets</div>
      <div style={navItemStyle(false, 1)}>Secrets</div>
      <div style={navItemStyle(false, 1)}>Secret Stores</div>
      <div style={navItemStyle(section === 'crypto')}>Cryptography</div>
      <div style={navItemStyle(false)}>Access control</div>
      <div style={navItemStyle(false)}>Manage scopes</div>
      <div style={navItemStyle(false)}>Support</div>
    </aside>
  );
}

function Header() {
  return (
    <header style={headerStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div style={{ width: 16, height: 1.5, background: '#fff' }} />
        <div style={{ width: 16, height: 1.5, background: '#fff' }} />
        <div style={{ width: 16, height: 1.5, background: '#fff' }} />
      </div>
      <div style={{ fontSize: 14 }}>
        <span style={{ fontWeight: 400, opacity: 0.7 }}>IBM </span>
        <span style={{ fontWeight: 600 }}>Vault Next</span>
      </div>
      <div style={headerActionStyle} />
    </header>
  );
}

/* ── Carbon Button primitives (grayscale wireframe) ──────────── */

const buttonBase: CSSProperties = {
  height: 40,
  padding: '0 16px',
  border: 'none',
  borderRadius: 0,
  fontFamily: FONT_SANS,
  fontSize: 14,
  fontWeight: 400,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'default',
  lineHeight: 1,
};

const primaryButtonStyle: CSSProperties = {
  ...buttonBase,
  background: C.textPrimary,
  color: C.inverseText,
};

const secondaryButtonStyle: CSSProperties = {
  ...buttonBase,
  background: 'transparent',
  color: C.textPrimary,
  border: `1px solid ${C.textPrimary}`,
  height: 38, // -2 to compensate for border so visual rhythm matches primary
};

function PrimaryButton({ children }: { children: ReactNode }) {
  return <button style={primaryButtonStyle}>{children}</button>;
}

function SecondaryButton({ children }: { children: ReactNode }) {
  return <button style={secondaryButtonStyle}>{children}</button>;
}

function PageHeading({ children, actions }: { children: ReactNode; actions?: ReactNode }) {
  return (
    <>
      <div style={breadcrumbStyle}>Organization: acme-corp / Secrets</div>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 16,
        margin: '0 0 24px',
      }}>
        <h1 style={{ ...pageTitleStyle, margin: 0 }}>{children}</h1>
        {actions && (
          <div style={{ display: 'flex', gap: 1, flexShrink: 0 }}>
            {actions}
          </div>
        )}
      </div>
    </>
  );
}

/* Standard action set for the Secrets dashboard.
   Order intent: Carbon places primary action rightmost so it sits closest
   to the user's typical mouse-resting position on a wide screen. */
function SecretsHeaderActions() {
  return (
    <>
      <SecondaryButton>Create secret store</SecondaryButton>
      <PrimaryButton>Create secret</PrimaryButton>
    </>
  );
}

function Dropdown({ label, value, width }: { label: string; value: string; width?: number }) {
  return (
    <div style={{ ...dropdownStyle, minWidth: width ?? 200 }}>
      <span style={{ color: C.textHelper, fontSize: 12 }}>{label}</span>
      <span style={{ color: C.textPrimary }}>{value}</span>
      <span style={caretStyle}>▼</span>
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span style={tagStyle}>
      {children}
      <span style={closeBtn}>×</span>
    </span>
  );
}

/* ── Tile ────────────────────────────────────────────────────── */

interface TileProps {
  label: string;
  value: string;
  sub?: ReactNode;
  delta?: string;
  sparkDirection?: 'up' | 'down';
  showSpark?: boolean;
}

function Tile({ label, value, sub, delta, sparkDirection, showSpark }: TileProps) {
  return (
    <div style={tileStyle}>
      <div style={tileLabel}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span style={tileValue}>{value}</span>
        {delta && <span style={tileDelta}>{delta}</span>}
      </div>
      {showSpark && <Sparkline direction={sparkDirection} />}
      {sub && <div style={tileSub}>{sub}</div>}
    </div>
  );
}

/* =============================================================
   DAY 0 WIREFRAME
   ============================================================= */

export function SecretsDashboardDay0() {
  return (
    <div style={shellStyle}>
      <Header />
      <div style={bodyStyle}>
        <SideNav section="secrets" />
        <main style={mainStyle}>
          <PageHeading actions={<SecretsHeaderActions />}>Secrets dashboard</PageHeading>

          {/* Filter bar */}
          <div style={filterBarStyle}>
            <Dropdown label="Org" value="acme-corp" />
            <Dropdown label="Project" value="payments-prd" />
            <Dropdown label="Store" value="All stores" />
            <Dropdown label="Type" value="All types (5)" width={240} />
          </div>
          <div style={tagRowStyle}>
            <Tag>Project: payments-prd</Tag>
          </div>

          {/* Tile row 4 / 4 / 4 / 4 */}
          <div style={gridStyle('repeat(4, 1fr)')}>
            <Tile label="Secrets" value="1,284" sub="scope: project" />
            <Tile label="Secret Stores" value="18" sub="available: 17  ·  pending del: 1" />
            <Tile label="Clients (consuming)" value="754" sub="human / NHI / agent (combined)" />
            <Tile label="Pending deletion" value="74" sub="71 secrets  ·  3 stores" />
          </div>

          {/* Data table */}
          <div style={{ height: 24 }} />
          <div style={tableWrap}>
            <div style={tableToolbar}>
              <div style={toolbarTitle}>Secret Stores</div>
              <div style={toolbarSearch}>🔍  Search</div>
              <div style={toolbarBtn}>⌄</div>
            </div>
            <table style={tableBase}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Project</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}># Secrets</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['payments-app-store', 'payments-prd', 412, 'available'],
                  ['payments-ci-store', 'payments-prd', 108, 'available'],
                  ['checkout-store', 'payments-prd', 220, 'available'],
                  ['analytics-etl-store', 'analytics', 96, 'available'],
                  ['retired-legacy-kv', 'payments-prd', 0, 'pending deletion'],
                  ['fraud-ml-store', 'analytics', 162, 'available'],
                  ['gateway-keys', 'payments-prd', 88, 'available'],
                  ['mobile-bff-store', 'payments-prd', 76, 'available'],
                  ['ops-bot-store', 'analytics', 44, 'available'],
                  ['internal-svc-store', 'payments-prd', 78, 'available'],
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={tdStyle}>{row[0]}</td>
                    <td style={tdStyle}>{row[1]}</td>
                    <td style={{ ...tdStyle, textAlign: 'right', fontFamily: FONT_MONO }}>{row[2]}</td>
                    <td style={tdStyle}>
                      <span style={{
                        display: 'inline-block',
                        width: 8, height: 8, borderRadius: '50%',
                        background: row[3] === 'available' ? C.textSecondary : C.textPlaceholder,
                        marginRight: 8, verticalAlign: 'middle',
                      }} />
                      {row[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={paginationStyle}>
              <div>Items per page: 10 ▼</div>
              <div>1–10 of 18 items</div>
            </div>
          </div>

          {/* Breakdown panels */}
          <div style={gridStyle('1fr 1fr')}>
            <div style={panelStyle}>
              <div style={panelHeader}>Secrets by type</div>
              <BarChart rows={[
                { label: 'login', value: 812 },
                { label: 'aws-iam', value: 220 },
                { label: 'pg-password', value: 96 },
                { label: 'pg-cert', value: 84 },
                { label: 'json', value: 72 },
              ]} />
            </div>
            <div style={panelStyle}>
              <div style={panelHeader}>Secrets by status</div>
              <BarChart rows={[
                { label: 'active', value: 1210 },
                { label: 'pending deletion', value: 74 },
              ]} max={1284} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =============================================================
   DAY 1 WIREFRAME
   ============================================================= */

export function SecretsDashboardDay1() {
  return (
    <div style={shellStyle}>
      <Header />
      <div style={bodyStyle}>
        <SideNav section="secrets" />
        <main style={mainStyle}>
          <PageHeading actions={<SecretsHeaderActions />}>Secrets dashboard</PageHeading>

          <div style={filterBarStyle}>
            <Dropdown label="Org" value="acme-corp" />
            <Dropdown label="Project" value="payments-prd" />
            <Dropdown label="Store" value="All stores" />
            <Dropdown label="Type" value="All types (5)" width={220} />
            <Dropdown label="Auth method" value="All" width={180} />
            <Dropdown label="Range" value="Last 30 days" width={180} />
          </div>

          <InlineNotification
            kind="info"
            title="Time-range and age data require a time-series datastore"
            body="Sparklines, age histograms, and TTL counts are derived from a Prometheus-compatible store. Configure under Manage scopes > Observability."
          />

          <div style={tagRowStyle}>
            <Tag>Project: payments-prd</Tag>
            <Tag>Range: Last 30 days</Tag>
          </div>

          {/* Tile row with deltas + sparklines */}
          <div style={gridStyle('repeat(4, 1fr)')}>
            <Tile label="Secrets" value="1,284" delta="+24" showSpark sparkDirection="up" sub="across 1 project" />
            <Tile label="Secret Stores" value="18" delta="+1" showSpark sparkDirection="up" sub="available: 17 · pending del: 1" />
            <Tile label="Clients (consuming)" value="754" delta="+21" showSpark sparkDirection="up" sub="combined: human / NHI / agent" />
            <Tile label="Pending deletion" value="74" delta="-3" showSpark sparkDirection="down" sub="71 secrets · 3 stores" />
          </div>

          <div style={{ height: 24 }} />

          {/* Stores table with Age column */}
          <div style={tableWrap}>
            <div style={tableToolbar}>
              <div style={toolbarTitle}>Secret Stores</div>
              <div style={toolbarSearch}>🔍  Search</div>
              <div style={toolbarBtn}>⚙</div>
              <div style={toolbarBtn}>⌄</div>
            </div>
            <table style={tableBase}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Project</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}># Secrets</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Age (median)</th>
                  <th style={{ ...thStyle, width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['payments-app-store', 'payments-prd', 412, 'available', '14d'],
                  ['payments-ci-store', 'payments-prd', 108, 'available', '9d'],
                  ['checkout-store', 'payments-prd', 220, 'available', '21d'],
                  ['analytics-etl-store', 'analytics', 96, 'available', '38d'],
                  ['retired-legacy-kv', 'payments-prd', 0, 'pending deletion', '–'],
                  ['fraud-ml-store', 'analytics', 162, 'available', '6d'],
                  ['gateway-keys', 'payments-prd', 88, 'available', '52d'],
                  ['mobile-bff-store', 'payments-prd', 76, 'available', '18d'],
                ].map((row, i) => (
                  <tr key={i} style={i === 0 ? { background: C.layer02 } : undefined}>
                    <td style={{ ...tdStyle, fontWeight: i === 0 ? 600 : 400 }}>{row[0]}</td>
                    <td style={tdStyle}>{row[1]}</td>
                    <td style={{ ...tdStyle, textAlign: 'right', fontFamily: FONT_MONO }}>{row[2]}</td>
                    <td style={tdStyle}>
                      <span style={{
                        display: 'inline-block',
                        width: 8, height: 8, borderRadius: '50%',
                        background: row[3] === 'available' ? C.textSecondary : C.textPlaceholder,
                        marginRight: 8, verticalAlign: 'middle',
                      }} />
                      {row[3]}
                    </td>
                    <td style={{ ...tdStyle, fontFamily: FONT_MONO, color: C.textSecondary }}>{row[4]}</td>
                    <td style={{ ...tdStyle, color: C.textHelper, textAlign: 'center' }}>⋮</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={paginationStyle}>
              <div>Items per page: 10 ▼</div>
              <div>1–8 of 18 items</div>
            </div>
          </div>

          {/* Age histogram + TTL approaching */}
          <div style={gridStyle('1fr 1fr')}>
            <div style={panelStyle}>
              <div style={panelHeader}>Secrets by age</div>
              <div style={panelSub}>Distribution across selected range</div>
              <Histogram bins={[
                { label: '0–1d', value: 38 },
                { label: '1–7d', value: 142 },
                { label: '7–30d', value: 486 },
                { label: '30–90d', value: 412 },
                { label: '90d+', value: 206 },
              ]} />
            </div>
            <div style={panelStyle}>
              <div style={panelHeader}>TTL approaching</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 0', borderBottom: `1px solid ${C.borderSubtle}`,
                }}>
                  <div style={{ fontSize: 14, color: C.textPrimary }}>Next 7 days</div>
                  <div style={{ fontSize: 18, fontWeight: 400, color: C.textPrimary, fontFamily: FONT_MONO }}>18</div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 0', borderBottom: `1px solid ${C.borderSubtle}`,
                }}>
                  <div style={{ fontSize: 14, color: C.textPrimary }}>Next 30 days</div>
                  <div style={{ fontSize: 18, fontWeight: 400, color: C.textPrimary, fontFamily: FONT_MONO }}>42</div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <button style={{
                    background: 'transparent',
                    border: 'none',
                    padding: '12px 16px',
                    fontSize: 14,
                    color: C.textPrimary,
                    fontFamily: FONT_SANS,
                    cursor: 'default',
                  }}>View list →</button>
                </div>
              </div>
            </div>
          </div>

          {/* Recently rotated + Auth methods */}
          <div style={{ height: 1 }} />
          <div style={gridStyle('1fr 1fr')}>
            <div style={panelStyle}>
              <div style={panelHeader}>Recently rotated</div>
              <div style={panelSub}>Last 7 days</div>
              <div>
                {[
                  ['checkout-store / db-creds', '2h ago'],
                  ['payments-app-store / api-key', '8h ago'],
                  ['analytics-etl-store / svc-acct', '1d ago'],
                  ['fraud-ml-store / model-token', '2d ago'],
                  ['payments-ci-store / build-key', '3d ago'],
                ].map(([label, time], i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: `1px solid ${C.borderSubtle}`,
                    fontSize: 13,
                  }}>
                    <span style={{ color: C.textPrimary }}>{label}</span>
                    <span style={{ color: C.textHelper, fontFamily: FONT_MONO }}>{time}</span>
                  </div>
                ))}
                <button style={{
                  background: 'transparent', border: 'none', padding: '12px 0 0',
                  fontSize: 14, color: C.textPrimary, fontFamily: FONT_SANS,
                }}>View all →</button>
              </div>
            </div>
            <div style={panelStyle}>
              <div style={panelHeader}>Auth methods used to access secrets</div>
              <div style={panelSub}>Gated on access-log instrumentation</div>
              <BarChart rows={[
                { label: 'oidc', value: 612 },
                { label: 'approle', value: 180 },
                { label: 'kubernetes', value: 96 },
                { label: 'userpass', value: 54 },
              ]} />
            </div>
          </div>

          <div style={{ height: 1 }} />
          <div style={gridStyle('1fr 1fr')}>
            <div style={panelStyle}>
              <div style={panelHeader}>Secrets by type</div>
              <BarChart rows={[
                { label: 'login', value: 812 },
                { label: 'aws-iam', value: 220 },
                { label: 'pg-password', value: 96 },
                { label: 'pg-cert', value: 84 },
                { label: 'json', value: 72 },
              ]} />
            </div>
            <div style={panelStyle}>
              <div style={panelHeader}>Secrets by status</div>
              <BarChart rows={[
                { label: 'active', value: 1210 },
                { label: 'pending deletion', value: 74 },
              ]} max={1284} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
