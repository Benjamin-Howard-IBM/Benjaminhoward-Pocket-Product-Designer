/**
 * HDS Component Gallery
 *
 * Visual validation story for all HDS primitive approximations.
 * Open this story first when setting up a new HVD wireframe to
 * confirm all component shapes look correct before building screens.
 *
 * Source: storybook/stories/wireframes/_hds-primitives.tsx
 * Tokens: storybook/tokens/hds-tokens.css
 */

import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import '../../tokens/hds-tokens.css'

import {
  T,
  FONT_SANS,
  HdsAppShell,
  HdsAppHeader,
  HdsAppSideNav,
  HdsButton,
  HdsAlert,
  HdsBadge,
  HdsTag,
  HdsModal,
  HdsTable,
  HdsFormField,
  HdsTabs,
  HdsCodeBlock,
  HdsBreadcrumb,
  HdsPageHeader,
} from './_hds-primitives'

/* ── Layout helpers ────────────────────────────────────────── */
const galleryStyle: CSSProperties = {
  fontFamily: FONT_SANS,
  padding: 32,
  background: T.layer01,
  minHeight: '100vh',
}
const sectionStyle: CSSProperties = {
  marginBottom: 48,
}
const sectionTitleStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: T.textSecondary,
  borderBottom: `1px solid ${T.borderSubtle}`,
  paddingBottom: 8,
  marginBottom: 20,
}
const rowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  gap: 12,
  marginBottom: 16,
}
const labelStyle: CSSProperties = {
  fontSize: 11,
  color: T.textSecondary,
  marginBottom: 6,
  display: 'block',
}
const itemStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}
const cardStyle: CSSProperties = {
  background: T.bg,
  border: `1px solid ${T.borderSubtle}`,
  borderRadius: 8,
  padding: '20px 24px',
  marginBottom: 16,
}

/* ── Token Swatch helper ───────────────────────────────────── */
function Swatch({ color, name, value }: { color: string; name: string; value: string }) {
  return (
    <div style={{ ...itemStyle, width: 120 }}>
      <div style={{
        width: 120,
        height: 40,
        background: color,
        border: `1px solid ${T.borderSubtle}`,
        borderRadius: 6,
        marginBottom: 6,
      }} />
      <span style={{ fontSize: 12, fontWeight: 500, color: T.textPrimary }}>{name}</span>
      <span style={{ fontSize: 11, color: T.textSecondary, fontFamily: 'monospace' }}>{value}</span>
    </div>
  )
}

/* ── Main gallery component ────────────────────────────────── */
function HdsGallery() {
  return (
    <div style={galleryStyle}>

      {/* ── Color Tokens ── */}
      <section style={sectionStyle}>
        <div style={sectionTitleStyle}>Color Tokens</div>
        <div style={rowStyle}>
          <Swatch color={T.interactive}    name="interactive"    value="#1563ff" />
          <Swatch color={T.textPrimary}    name="text-primary"   value="#1c1c1c" />
          <Swatch color={T.textSecondary}  name="text-secondary" value="#656a76" />
          <Swatch color={T.borderSubtle}   name="border-subtle"  value="#d4d8e1" />
          <Swatch color={T.borderStrong}   name="border-strong"  value="#97a0b3" />
          <Swatch color={T.layer01}        name="layer-01"       value="#f7f8f8" />
          <Swatch color={T.layer02}        name="layer-02"       value="#eef0f3" />
        </div>
        <div style={rowStyle}>
          <Swatch color={T.success}        name="success"        value="#00a550" />
          <Swatch color={T.successSurface} name="success-surface"value="#e5f7ee" />
          <Swatch color={T.error}          name="critical"       value="#c8102e" />
          <Swatch color={T.errorSurface}   name="critical-surface"value="#fce8eb" />
          <Swatch color={T.warning}        name="warning"        value="#f7c948" />
          <Swatch color={T.warningSurface} name="warning-surface"value="#fdf6d8" />
          <Swatch color={T.infoSurface}    name="highlight-surface"value="#e5edff" />
        </div>
        <div style={rowStyle}>
          <Swatch color={T.navBg}          name="nav-bg"         value="#1c1c1c" />
          <Swatch color={T.sidenavActiveBg}name="sidenav-active" value="#e5edff" />
        </div>
      </section>

      {/* ── Buttons ── */}
      <section style={sectionStyle}>
        <div style={sectionTitleStyle}>Hds::Button</div>
        <div style={cardStyle}>
          <div style={{ marginBottom: 16 }}>
            <span style={labelStyle}>Colors</span>
            <div style={rowStyle}>
              <HdsButton text="Primary" color="primary" />
              <HdsButton text="Secondary" color="secondary" />
              <HdsButton text="Tertiary" color="tertiary" />
              <HdsButton text="Critical" color="critical" />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <span style={labelStyle}>Sizes</span>
            <div style={rowStyle}>
              <HdsButton text="Small" size="small" />
              <HdsButton text="Medium" size="medium" />
              <HdsButton text="Large" size="large" />
            </div>
          </div>
          <div>
            <span style={labelStyle}>States</span>
            <div style={rowStyle}>
              <HdsButton text="With Icon" iconLeading />
              <HdsButton text="Disabled" disabled />
              <HdsButton text="Disabled Critical" color="critical" disabled />
            </div>
          </div>
        </div>
      </section>

      {/* ── Alerts ── */}
      <section style={sectionStyle}>
        <div style={sectionTitleStyle}>Hds::Alert</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <HdsAlert type="neutral"  title="Neutral alert" description="This is informational content for the user." />
          <HdsAlert type="success"  title="Success alert" description="The operation completed successfully." onDismiss={() => {}} />
          <HdsAlert type="warning"  title="Warning alert" description="This action may have unintended consequences." />
          <HdsAlert type="critical" title="Critical alert" description="Something went wrong. Please try again." onDismiss={() => {}} />
        </div>
      </section>

      {/* ── Badges ── */}
      <section style={sectionStyle}>
        <div style={sectionTitleStyle}>Hds::Badge</div>
        <div style={cardStyle}>
          <div style={{ marginBottom: 16 }}>
            <span style={labelStyle}>Colors (filled)</span>
            <div style={rowStyle}>
              <HdsBadge text="Neutral"   color="neutral" />
              <HdsBadge text="Success"   color="success"   icon />
              <HdsBadge text="Warning"   color="warning"   icon />
              <HdsBadge text="Critical"  color="critical"  icon />
              <HdsBadge text="Highlight" color="highlight" icon />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <span style={labelStyle}>Types</span>
            <div style={rowStyle}>
              <HdsBadge text="Filled"   type="filled"   />
              <HdsBadge text="Outlined" type="outlined" />
            </div>
          </div>
          <div>
            <span style={labelStyle}>Sizes</span>
            <div style={rowStyle}>
              <HdsBadge text="Small"  size="small"  />
              <HdsBadge text="Medium" size="medium" />
              <HdsBadge text="Large"  size="large"  />
            </div>
          </div>
        </div>
      </section>

      {/* ── Tags ── */}
      <section style={sectionStyle}>
        <div style={sectionTitleStyle}>Hds::Tag</div>
        <div style={cardStyle}>
          <div style={rowStyle}>
            <HdsTag text="azure-peering"   color="primary" onRemove={() => {}} />
            <HdsTag text="gateway"         color="primary" onRemove={() => {}} />
            <HdsTag text="private-link"    color="secondary" />
            <HdsTag text="Q3"              color="secondary" onRemove={() => {}} />
          </div>
        </div>
      </section>

      {/* ── Tabs ── */}
      <section style={sectionStyle}>
        <div style={sectionTitleStyle}>Hds::Tabs</div>
        <div style={cardStyle}>
          <div style={{ marginBottom: 24 }}>
            <span style={labelStyle}>Underline variant</span>
            <HdsTabs
              variant="underline"
              tabs={[
                { label: 'Overview', active: true },
                { label: 'Connections', count: 3 },
                { label: 'Logs' },
                { label: 'Settings' },
              ]}
            />
          </div>
          <div>
            <span style={labelStyle}>Box variant</span>
            <HdsTabs
              variant="box"
              tabs={[
                { label: 'Enabled' },
                { label: 'Disabled', active: true },
                { label: 'Pending', count: 2 },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Form Fields ── */}
      <section style={sectionStyle}>
        <div style={sectionTitleStyle}>Hds::Form components</div>
        <div style={{ ...cardStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <HdsFormField
            label="Cluster name"
            placeholder="my-vault-cluster"
            helperText="Must be lowercase, alphanumeric, and hyphens only."
            required
          />
          <HdsFormField
            label="Role ARN"
            placeholder="arn:aws:iam::123456789:role/my-role"
            helperText="The IAM role ARN from your AWS account."
            mono
          />
          <HdsFormField
            label="Description"
            type="textarea"
            placeholder="Describe the purpose of this peering connection..."
          />
          <HdsFormField
            label="VPC ID"
            value="vpc-0a1b2c3d4e5f"
            errorText="VPC ID format is invalid."
          />
          <HdsFormField
            label="Disabled field"
            value="read-only-value"
            disabled
            helperText="This field cannot be edited."
          />
        </div>
      </section>

      {/* ── Table ── */}
      <section style={sectionStyle}>
        <div style={sectionTitleStyle}>Hds::Table</div>
        <HdsTable
          columns={['Name', 'Status', 'Region', 'Created', 'Actions']}
          rows={[
            ['vault-cluster-prod',  <HdsBadge key="r0" text="Running"  color="success" icon />,  'us-east-1',    '2025-01-12', <HdsButton key="a0" text="Manage" size="small" color="secondary" />],
            ['vault-cluster-stage', <HdsBadge key="r1" text="Starting" color="warning" icon />,  'us-west-2',    '2025-03-08', <HdsButton key="a1" text="Manage" size="small" color="secondary" />],
            ['vault-cluster-dev',   <HdsBadge key="r2" text="Stopped"  color="neutral" />,       'eu-central-1', '2025-04-01', <HdsButton key="a2" text="Manage" size="small" color="secondary" />],
          ]}
        />
      </section>

      {/* ── Code Block ── */}
      <section style={sectionStyle}>
        <div style={sectionTitleStyle}>Hds::CodeBlock</div>
        <HdsCodeBlock
          language="bash"
          hasLineNumbers
          lines={[
            '$ aws s3 ls s3://instance-i-9f3c1a7b-audit-logs \\',
            '    --profile vault-log-reader',
            '',
            '2025-01-12 12:34:56   4096 vault_audit_2025_01_12.log.gz',
            '2025-01-13 08:22:11   8192 vault_audit_2025_01_13.log.gz',
          ]}
        />
      </section>

      {/* ── Breadcrumb ── */}
      <section style={sectionStyle}>
        <div style={sectionTitleStyle}>Hds::Breadcrumb</div>
        <div style={cardStyle}>
          <HdsBreadcrumb
            items={[
              { label: 'HCP', href: '#' },
              { label: 'Vault Dedicated', href: '#' },
              { label: 'Clusters', href: '#' },
              { label: 'vault-cluster-prod' },
            ]}
          />
          <HdsBreadcrumb
            items={[
              { label: 'Vault Dedicated', href: '#' },
              { label: 'Networking' },
            ]}
          />
        </div>
      </section>

      {/* ── Page Header ── */}
      <section style={sectionStyle}>
        <div style={sectionTitleStyle}>Page header pattern</div>
        <div style={cardStyle}>
          <HdsPageHeader
            title="Azure Peering Connections"
            description="Manage peering connections between HCP and your Azure Virtual Networks."
            badge={<HdsBadge text="Beta" color="highlight" />}
            actions={
              <>
                <HdsButton text="Documentation" color="tertiary" />
                <HdsButton text="Create peering" color="primary" iconLeading />
              </>
            }
          />
        </div>
      </section>

      {/* ── Modal (inline preview) ── */}
      <section style={sectionStyle}>
        <div style={sectionTitleStyle}>Hds::Modal (static preview — no overlay)</div>
        <div style={{ position: 'relative', background: T.layer02, borderRadius: 8, padding: 32 }}>
          <div style={{
            background: T.bg,
            borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
            width: 560,
            margin: '0 auto',
          }}>
            <HdsModal
              title="Delete peering connection"
              description="This action cannot be undone."
              color="critical"
              footer={
                <>
                  <HdsButton text="Cancel"    color="secondary" />
                  <HdsButton text="Delete"    color="critical" />
                </>
              }
            >
              <p style={{ fontSize: 14, color: T.textPrimary, margin: 0 }}>
                Are you sure you want to delete <strong>peering-azure-eastus</strong>? This will permanently
                remove the connection and any associated routes. Connected workloads may lose access.
              </p>
            </HdsModal>
          </div>
        </div>
      </section>

      {/* ── App Shell preview ── */}
      <section style={sectionStyle}>
        <div style={sectionTitleStyle}>HdsAppShell — shell layout preview</div>
        <div style={{ border: `1px solid ${T.borderSubtle}`, borderRadius: 8, overflow: 'hidden', height: 360 }}>
          <HdsAppShell
            header={
              <HdsAppHeader
                productName="HCP Vault Dedicated"
                orgName="hashicorp-org"
                navItems={[
                  { label: 'Overview' },
                  { label: 'Clusters', active: true },
                  { label: 'Access Control' },
                  { label: 'Audit Logs' },
                ]}
              />
            }
            sideNav={
              <HdsAppSideNav
                sections={[
                  {
                    title: 'vault-cluster-prod',
                    items: [
                      { label: 'Overview' },
                      { label: 'Networking', active: true },
                      { label: 'Secrets Engines' },
                      { label: 'Auth Methods' },
                      { label: 'Audit Devices' },
                    ],
                  },
                ]}
              />
            }
          >
            <HdsBreadcrumb items={[{ label: 'Clusters', href: '#' }, { label: 'vault-cluster-prod', href: '#' }, { label: 'Networking' }]} />
            <HdsPageHeader
              title="Networking"
              description="Manage peering connections and private links for this cluster."
              actions={<HdsButton text="Create connection" color="primary" iconLeading />}
            />
            <HdsTabs tabs={[
              { label: 'Peering', active: true, count: 2 },
              { label: 'Private Link' },
              { label: 'Routes' },
            ]} />
          </HdsAppShell>
        </div>
      </section>

    </div>
  )
}

/* ── Storybook meta ──────────────────────────────────────────── */
const meta: Meta<typeof HdsGallery> = {
  title: 'HVD / HDS Component Gallery',
  component: HdsGallery,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Visual validation gallery for all HDS primitive approximations used in HVD wireframes. Review this story before building screens to confirm shapes are accurate.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof HdsGallery>

export const Gallery: Story = {
  name: 'All Components',
  render: () => <HdsGallery />,
}
