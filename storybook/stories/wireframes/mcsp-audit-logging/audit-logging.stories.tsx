import type { CSSProperties, ReactNode } from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/* =============================================================
   MCSP Vault - FedRAMP Audit Logging Access
   Low-fidelity grayscale wireframes using Carbon Design System
   component shapes (UI Shell, structured page, notification,
   code snippet, text input, buttons, danger modal). No Carbon
   runtime dependency - token slots map to Carbon values.

   Source:
   - output/06.Projects/MCSP/01. Meetings/MCSP Audit Logging Discussion.md
   - output/06.Projects/MCSP/02. Strategy/HCPV-MSCP Vault fedramp audit logging.md

   States:
   1. Disabled  - access disabled, instructions to create the customer role
   2. EnableForm - customer supplies their role ARN
   3. Enabled   - access enabled, sample commands, disable action
   4. DisableConfirm - danger modal explaining consequence
   ============================================================= */

/* ── Carbon token palette (grayscale wireframe) ──────────────── */
const C = {
  background: '#f4f4f4', // $background (Gray 10)
  layer01: '#ffffff', // $layer-01
  layer02: '#f4f4f4', // $layer-02
  layerAccent: '#e8e8e8',
  field01: '#f4f4f4', // $field-01
  borderSubtle: '#e0e0e0', // $border-subtle-01
  borderStrong: '#8d8d8d', // $border-strong-01
  textPrimary: '#161616', // $text-primary
  textSecondary: '#525252', // $text-secondary
  textHelper: '#6f6f6f', // $text-helper
  textPlaceholder: '#a8a8a8',
  inverseText: '#ffffff',
  navBg: '#161616', // UI Shell header (Gray 100)
  sideNavBg: '#ffffff',
  codeBg: '#262626', // code snippet surface (Gray 90)
  codeText: '#f4f4f4',
  // desaturated status accents kept muted for low-fidelity
  successBorder: '#8d8d8d',
  warnBorder: '#8d8d8d',
  dangerBorder: '#6f6f6f',
  buttonPrimary: '#393939', // stand-in for $button-primary (kept gray)
  buttonDanger: '#525252',
};

const FONT_SANS = "'IBM Plex Sans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
const FONT_MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

/* ── Shell primitives ────────────────────────────────────────── */

const shellStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: FONT_SANS,
  fontSize: 14,
  color: C.textPrimary,
  background: C.background,
  overflow: 'hidden',
};

const headerStyle: CSSProperties = {
  height: 48,
  background: C.navBg,
  color: C.inverseText,
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  flexShrink: 0,
  fontSize: 14,
  gap: 16,
};

const bodyStyle: CSSProperties = { display: 'flex', flex: 1, minHeight: 0 };

const sideNavStyle: CSSProperties = {
  width: 240,
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
  padding: '24px 32px 48px',
  overflow: 'auto',
  background: C.background,
};

const breadcrumbStyle: CSSProperties = { fontSize: 12, color: C.textSecondary, marginBottom: 8 };

const pageTitleStyle: CSSProperties = {
  fontSize: 28,
  fontWeight: 400,
  color: C.textPrimary,
  margin: '0 0 4px',
  lineHeight: 1.2,
};

const pageSubStyle: CSSProperties = { fontSize: 14, color: C.textSecondary, margin: '0 0 24px', maxWidth: 640 };

const panelStyle: CSSProperties = {
  background: C.layer01,
  border: `1px solid ${C.borderSubtle}`,
  padding: 24,
  maxWidth: 800,
};

const sectionLabel: CSSProperties = {
  fontSize: 12,
  letterSpacing: 0.32,
  textTransform: 'uppercase',
  color: C.textHelper,
  margin: '0 0 12px',
};

/* ── Carbon-shaped components ─────────────────────────────────── */

function AppShell({ children }: { children: ReactNode }) {
  return (
    <div style={shellStyle}>
      <div style={headerStyle}>
        <span style={{ fontWeight: 600 }}>HCP Vault</span>
        <span style={{ color: '#c6c6c6', fontSize: 13 }}>MCSP · FedRAMP (GovCloud)</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <Box w={20} h={20} />
          <Box w={20} h={20} />
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#4d4d4d' }} />
        </div>
      </div>
      <div style={bodyStyle}>
        <nav style={sideNavStyle}>
          <div style={navItemStyle(false)}>Overview</div>
          <div style={navItemStyle(false)}>Secrets engines</div>
          <div style={navItemStyle(false)}>Access</div>
          <div style={navItemStyle(false)}>Snapshots</div>
          <div style={navItemStyle(true)}>Audit logging</div>
          <div style={navItemStyle(false)}>Settings</div>
        </nav>
        {children}
      </div>
    </div>
  );
}

function Box({ w, h }: { w: number; h: number }) {
  return <div style={{ width: w, height: h, border: `1px solid #6f6f6f`, background: 'transparent' }} />;
}

/* Carbon inline notification shape */
function Notification({
  kind,
  title,
  subtitle,
}: {
  kind: 'success' | 'info' | 'warning';
  title: string;
  subtitle: string;
}) {
  const border =
    kind === 'success' ? C.successBorder : kind === 'warning' ? C.warnBorder : C.borderStrong;
  const glyph = kind === 'success' ? '\u2713' : kind === 'warning' ? '!' : 'i';
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        background: C.layer01,
        borderLeft: `3px solid ${border}`,
        border: `1px solid ${C.borderSubtle}`,
        borderLeftWidth: 3,
        padding: '14px 16px',
        maxWidth: 800,
        marginBottom: 24,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: `1px solid ${border}`,
          color: C.textPrimary,
          fontSize: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontFamily: FONT_MONO,
        }}
      >
        {glyph}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: C.textPrimary }}>{title}</div>
        <div style={{ fontSize: 13, color: C.textSecondary, marginTop: 2 }}>{subtitle}</div>
      </div>
    </div>
  );
}

/* Carbon structured "read-only field" (label + value row) */
function Field({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, color: C.textHelper, marginBottom: 6 }}>{label}</div>
      <div
        style={{
          fontFamily: mono ? FONT_MONO : FONT_SANS,
          fontSize: 13,
          color: C.textPrimary,
          background: C.field01,
          border: `1px solid ${C.borderSubtle}`,
          borderBottom: `1px solid ${C.borderStrong}`,
          padding: '10px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          wordBreak: 'break-all',
        }}
      >
        <span>{value}</span>
        <span style={{ color: C.textHelper, fontSize: 12, flexShrink: 0, cursor: 'default' }}>Copy</span>
      </div>
    </div>
  );
}

/* Carbon text input (editable) */
function TextInput({
  label,
  placeholder,
  helper,
  value,
}: {
  label: string;
  placeholder: string;
  helper?: string;
  value?: string;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 6 }}>{label}</div>
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 13,
          color: value ? C.textPrimary : C.textPlaceholder,
          background: C.field01,
          border: `1px solid ${C.borderSubtle}`,
          borderBottom: `1px solid ${C.borderStrong}`,
          padding: '10px 12px',
        }}
      >
        {value || placeholder}
      </div>
      {helper && <div style={{ fontSize: 12, color: C.textHelper, marginTop: 6 }}>{helper}</div>}
    </div>
  );
}

/* Carbon code snippet (multiline) */
function CodeSnippet({ lines }: { lines: string[] }) {
  return (
    <div
      style={{
        background: C.codeBg,
        color: C.codeText,
        fontFamily: FONT_MONO,
        fontSize: 12.5,
        lineHeight: 1.6,
        padding: '14px 16px',
        overflowX: 'auto',
        marginBottom: 24,
        maxWidth: 800,
        position: 'relative',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 8,
          right: 10,
          fontSize: 11,
          color: '#a8a8a8',
          cursor: 'default',
        }}
      >
        Copy
      </span>
      {lines.map((l, i) => (
        <div key={i} style={{ whiteSpace: 'pre' }}>
          {l}
        </div>
      ))}
    </div>
  );
}

/* Carbon buttons */
function Button({
  children,
  kind = 'primary',
  onClick,
}: {
  children: ReactNode;
  kind?: 'primary' | 'secondary' | 'danger' | 'ghost';
  onClick?: () => void;
}) {
  const base: CSSProperties = {
    fontFamily: FONT_SANS,
    fontSize: 14,
    padding: '12px 60px 12px 16px',
    border: '1px solid transparent',
    cursor: 'pointer',
    minWidth: 160,
    textAlign: 'left',
  };
  const styles: Record<string, CSSProperties> = {
    primary: { background: C.buttonPrimary, color: C.inverseText },
    secondary: { background: 'transparent', color: C.textPrimary, borderColor: C.buttonPrimary },
    danger: { background: C.buttonDanger, color: C.inverseText },
    ghost: { background: 'transparent', color: C.textPrimary, padding: '12px 16px', minWidth: 0 },
  };
  return (
    <button style={{ ...base, ...styles[kind] }} onClick={onClick}>
      {children}
    </button>
  );
}

function OrderedSteps({ steps }: { steps: ReactNode[] }) {
  return (
    <ol style={{ margin: '0 0 24px', paddingLeft: 0, listStyle: 'none', counterReset: 'step' }}>
      {steps.map((s, i) => (
        <li
          key={i}
          style={{
            display: 'flex',
            gap: 12,
            marginBottom: 16,
            alignItems: 'flex-start',
          }}
        >
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              border: `1px solid ${C.borderStrong}`,
              fontSize: 12,
              fontFamily: FONT_MONO,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: C.textPrimary,
            }}
          >
            {i + 1}
          </span>
          <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.5, paddingTop: 2 }}>{s}</div>
        </li>
      ))}
    </ol>
  );
}

function PageHead() {
  return (
    <>
      <div style={breadcrumbStyle}>Clusters / vault-prod-01 / Audit logging</div>
      <h1 style={pageTitleStyle}>Audit logging access</h1>
      <p style={pageSubStyle}>
        Audit logs for this cluster are always captured and retained in a dedicated, isolated S3 bucket.
        Enabling access lets a role in your AWS account read those logs directly. Enabling or disabling
        access never deletes or pauses logging.
      </p>
    </>
  );
}

const INSTANCE = 'i-9f3c1a7b';
const LOG_READER_ROLE = `arn:aws:iam::418291056743:role/instance-${INSTANCE}-audit-reader`;
const EXTERNAL_ID = 'fa6050b4-6e45-4cad-89da-4ac621251f1a';
const CUSTOMER_ROLE = 'arn:aws:iam::730fifty...:role/vault-log-reader';
const BUCKET = `instance-${INSTANCE}-audit-logs`;

/* ── State 1: Disabled ────────────────────────────────────────── */
function DisabledView({ onEnable }: { onEnable?: () => void }) {
  return (
    <main style={mainStyle}>
      <PageHead />
      <Notification
        kind="info"
        title="Access disabled"
        subtitle="No external role can currently read this cluster's audit logs. Logs continue to be collected and retained."
      />
      <div style={panelStyle}>
        <p style={sectionLabel}>Step 1 · Create a role in your AWS account</p>
        <OrderedSteps
          steps={[
            <>
              Create an IAM role in your AWS account whose trust policy allows it to assume our log-reader
              role below. Use the external ID exactly as shown.
            </>,
            <>Run the sample AWS CLI command, or apply the trust policy JSON, then copy the resulting role ARN.</>,
            <>Return here, select <strong>Enable access</strong>, and paste your role ARN.</>,
          ]}
        />

        <Field label="Log-reader role (in HashiCorp's AWS account) your role must assume" value={LOG_READER_ROLE} />
        <Field label="External ID" value={EXTERNAL_ID} />

        <p style={{ ...sectionLabel, marginTop: 8 }}>Trust policy for your new role</p>
        <CodeSnippet
          lines={[
            '{',
            '  "Version": "2012-10-17",',
            '  "Statement": [{',
            '    "Sid": "AssumeVendorLogReadRole",',
            '    "Effect": "Allow",',
            '    "Principal": {',
            `      "AWS": "${LOG_READER_ROLE}"`,
            '    },',
            '    "Action": "sts:AssumeRole"',
            '  }]',
            '}',
          ]}
        />

        <div style={{ borderTop: `1px solid ${C.borderSubtle}`, paddingTop: 24, marginTop: 8 }}>
          <p style={sectionLabel}>Step 2 · Enable access</p>
          <Button kind="primary" onClick={onEnable}>
            Enable access
          </Button>
        </div>
      </div>
    </main>
  );
}

/* ── State 2: Enable form ─────────────────────────────────────── */
function EnableFormView({ onSubmit, onCancel }: { onSubmit?: () => void; onCancel?: () => void }) {
  return (
    <main style={mainStyle}>
      <PageHead />
      <div style={panelStyle}>
        <p style={sectionLabel}>Enable access</p>
        <p style={{ fontSize: 13, color: C.textSecondary, margin: '0 0 20px', lineHeight: 1.5 }}>
          Paste the ARN of the role you created in your AWS account. We will add it to the log-reader role's
          trust policy and grant read access to this cluster's audit log bucket.
        </p>
        <TextInput
          label="Your role ARN"
          placeholder="arn:aws:iam::<your-account-id>:role/<role-name>"
          helper="Must be a role whose trust policy allows assuming the log-reader role shown on the previous step."
        />
        <Field label="External ID (unchanged)" value={EXTERNAL_ID} />
        <div style={{ display: 'flex', gap: 1, marginTop: 8 }}>
          <Button kind="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button kind="primary" onClick={onSubmit}>
            Enable access
          </Button>
        </div>
      </div>
    </main>
  );
}

/* ── State 3: Enabled ─────────────────────────────────────────── */
function EnabledView({ onDisable }: { onDisable?: () => void }) {
  return (
    <main style={mainStyle}>
      <PageHead />
      <Notification
        kind="success"
        title="Access enabled"
        subtitle="Your role can now read this cluster's audit logs directly from AWS."
      />
      <div style={panelStyle}>
        <p style={sectionLabel}>Access details</p>
        <Field label="Log-reader role to assume" value={LOG_READER_ROLE} />
        <Field label="Your role (granted access)" value={CUSTOMER_ROLE} />
        <Field label="External ID" value={EXTERNAL_ID} />
        <Field label="Audit log bucket" value={BUCKET} />
        <div style={{ fontSize: 12, color: C.textHelper, marginTop: -8, marginBottom: 20 }}>
          Last assumed: 2 hours ago
        </div>

        <p style={{ ...sectionLabel, marginTop: 8 }}>Sample commands · assume role and read logs</p>
        <CodeSnippet
          lines={[
            '# 1. Assume the log-reader role',
            'aws sts assume-role \\',
            `  --role-arn ${LOG_READER_ROLE} \\`,
            '  --role-session-name vault-audit \\',
            `  --external-id ${EXTERNAL_ID}`,
            '',
            '# 2. List and download objects (with the returned credentials)',
            `aws s3 ls s3://${BUCKET}/`,
            `aws s3 cp s3://${BUCKET}/ ./audit-logs --recursive`,
          ]}
        />

        <div style={{ borderTop: `1px solid ${C.borderSubtle}`, paddingTop: 24, marginTop: 8 }}>
          <p style={sectionLabel}>Manage</p>
          <Button kind="danger" onClick={onDisable}>
            Disable access
          </Button>
        </div>
      </div>
    </main>
  );
}

/* ── State 4: Disable confirmation modal ──────────────────────── */
function DisableModal({ onCancel, onConfirm }: { onCancel?: () => void; onConfirm?: () => void }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(22,22,22,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      <div style={{ width: 480, background: C.layer01, border: `1px solid ${C.borderSubtle}` }}>
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 12, color: C.textHelper, marginBottom: 4 }}>Audit logging access</div>
          <h2 style={{ fontSize: 20, fontWeight: 400, margin: 0, color: C.textPrimary }}>
            Disable access to audit logs?
          </h2>
        </div>
        <div style={{ padding: '16px 20px 24px', fontSize: 14, color: C.textSecondary, lineHeight: 1.5 }}>
          <ul style={{ margin: '0 0 16px', paddingLeft: 18 }}>
            <li style={{ marginBottom: 8 }}>
              Your role{' '}
              <span style={{ fontFamily: FONT_MONO, color: C.textPrimary }}>vault-log-reader</span> will no
              longer be able to access this cluster's audit logs.
            </li>
            <li style={{ marginBottom: 8 }}>
              Audit logging is <strong>not</strong> turned off. Logs keep being collected and retained.
            </li>
            <li>
              You can re-enable access at any time and will still see every log from the beginning of the
              cluster.
            </li>
          </ul>
        </div>
        <div style={{ display: 'flex', gap: 1 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '16px 16px 32px',
              background: 'transparent',
              border: `1px solid ${C.buttonPrimary}`,
              color: C.textPrimary,
              fontFamily: FONT_SANS,
              fontSize: 14,
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '16px 16px 32px',
              background: C.buttonDanger,
              border: '1px solid transparent',
              color: C.inverseText,
              fontFamily: FONT_SANS,
              fontSize: 14,
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            Disable access
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Interactive flow (all states wired together) ─────────────── */
type Step = 'disabled' | 'enableForm' | 'enabled' | 'disableModal';

function AuditLoggingFlow({ initial = 'disabled' }: { initial?: Step }) {
  const [step, setStep] = useState<Step>(initial);
  return (
    <AppShell>
      {step === 'disabled' && <DisabledView onEnable={() => setStep('enableForm')} />}
      {step === 'enableForm' && (
        <EnableFormView onCancel={() => setStep('disabled')} onSubmit={() => setStep('enabled')} />
      )}
      {(step === 'enabled' || step === 'disableModal') && (
        <EnabledView onDisable={() => setStep('disableModal')} />
      )}
      {step === 'disableModal' && (
        <DisableModal onCancel={() => setStep('enabled')} onConfirm={() => setStep('disabled')} />
      )}
    </AppShell>
  );
}

/* ── Storybook meta ───────────────────────────────────────────── */
const meta: Meta<typeof AuditLoggingFlow> = {
  title: 'Wireframes/MCSP Audit Logging',
  component: AuditLoggingFlow,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof AuditLoggingFlow>;

export const InteractiveFlow: Story = {
  name: 'Interactive flow (start to finish)',
  render: () => <AuditLoggingFlow initial="disabled" />,
};

export const AccessDisabled: Story = {
  name: '1. Access disabled',
  render: () => (
    <AppShell>
      <DisabledView />
    </AppShell>
  ),
};

export const EnableForm: Story = {
  name: '2. Enable access form',
  render: () => (
    <AppShell>
      <EnableFormView />
    </AppShell>
  ),
};

export const AccessEnabled: Story = {
  name: '3. Access enabled',
  render: () => (
    <AppShell>
      <EnabledView />
    </AppShell>
  ),
};

export const DisableConfirmation: Story = {
  name: '4. Disable confirmation modal',
  render: () => (
    <AppShell>
      <EnabledView />
      <DisableModal />
    </AppShell>
  ),
};
