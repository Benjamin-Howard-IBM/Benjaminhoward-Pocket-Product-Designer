import type { CSSProperties, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  SITES,
  SETUP_STEPS,
  BINARY_INSTALL_STEPS,
  DOCKER_INSTALL_STEPS,
} from './_gateway-fixtures';

/* =============================================================
   HVD Gateway - Setup Flow Wireframes
   Low-fidelity wireframes using Helios visual language.
   No Helios runtime dependency - token values mapped inline.

   Source:
   - output/06.Projects/HVD/Gateways/03. PDRS/PDR-Gateway-Prototype-Plan.md
   - output/06.Projects/HVD/Gateways/02. Strategy/003.26.Gateway-Architecture-Flow.md
   - output/06.Projects/HVD/Gateways/02. Strategy/Gateway-RFC.md

   Screens:
   S0 - Networking overview (Gateway: Disabled)
   S1 - Gateways landing (disabled state)
   S2 - Enable Gateways modal
   S3 - Gateways overview (enabled, no sites)
   S4 - Create site: deployment model
   S5 - Create site: configure
   S6 - Create site: install instructions
   S7 - Create site: verify connection
   S8 - Gateways overview (enabled, with sites)
   S9 - Site detail
   ============================================================= */

/* ── Helios token palette (grayscale wireframe) ──────────────── */
const H = {
  // Surfaces
  background:    '#F5F5F5',
  surface:       '#FFFFFF',
  surfaceRaised: '#FFFFFF',
  field:         '#F9F9F9',

  // Borders
  borderFaint:   '#E5E5E5',
  border:        '#CCCCCC',
  borderStrong:  '#999999',

  // Text
  textPrimary:   '#1A1A1A',
  textSecondary: '#595959',
  textHelper:    '#737373',
  textDisabled:  '#ADADAD',
  textInverse:   '#FFFFFF',
  textLink:      '#1060D0',

  // Shell (HashiCorp black header)
  navBg:         '#1A1A1A',
  sideNavBg:     '#FFFFFF',

  // Status - muted for low-fidelity
  statusHealthy:  '#1A7F4B',
  statusDegraded: '#8A4F00',
  statusDisabled: '#595959',
  statusPending:  '#595959',

  // Actions
  btnPrimary:     '#1A1A1A',
  btnCritical:    '#5C1111',
  btnSecondary:   '#FFFFFF',

  // Gold accent (Helios brand - used only for architecture diagram)
  gold:           '#FFDE5A',
  goldDark:       '#B08000',

  // Code
  codeBg:         '#1A1A1A',
  codeText:       '#F0F0F0',
};

const FONT_SANS = "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";
const FONT_MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

/* ── Shell layout ─────────────────────────────────────────────── */

function AppShell({
  children,
  sideNavActive = 'Networking',
  gatewaysEnabled = false,
  onGatewayNav,
}: {
  children: ReactNode;
  sideNavActive?: string;
  gatewaysEnabled?: boolean;
  onGatewayNav?: () => void;
}) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: FONT_SANS,
      fontSize: 14,
      color: H.textPrimary,
      background: H.background,
      overflow: 'hidden',
    }}>
      {/* App Header */}
      <div style={{
        height: 48,
        background: H.navBg,
        color: H.textInverse,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        flexShrink: 0,
        gap: 12,
      }}>
        {/* HCP logo placeholder */}
        <div style={{
          width: 24,
          height: 24,
          background: H.gold,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          fontWeight: 700,
          color: H.navBg,
        }}>HC</div>
        {/* Project selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 4,
          padding: '4px 10px',
          fontSize: 13,
        }}>
          <span style={{ fontSize: 10, opacity: 0.6 }}>▪</span>
          default-project
          <span style={{ opacity: 0.5, fontSize: 11 }}>▾</span>
        </div>
        {/* Right slot */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 20, height: 20, border: '1px solid rgba(255,255,255,0.3)', borderRadius: 3 }} />
          <div style={{ width: 20, height: 20, border: '1px solid rgba(255,255,255,0.3)', borderRadius: 3 }} />
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#C84034',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
          }}>AB</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Side nav */}
        <nav style={{
          width: 224,
          background: H.sideNavBg,
          borderRight: `1px solid ${H.borderFaint}`,
          padding: '16px 0',
          flexShrink: 0,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}>
          <div style={navBackStyle}>← Back to Vault Dedicated</div>
          <div style={navClusterLabel}>vault-cluster</div>
          {['Overview', 'Replication'].map(item => (
            <div key={item} style={navItemStyle(false)}>{item}</div>
          ))}
          <div style={navSectionLabel}>Manage</div>
          {['Integrations', 'Networking'].map(item => (
            <div key={item} style={navItemStyle(item === sideNavActive && sideNavActive !== 'Gateways')}>{item}</div>
          ))}
          {/* Gateways sub-item */}
          <div
            onClick={onGatewayNav}
            style={{
              ...navItemStyle(sideNavActive === 'Gateways'),
              paddingLeft: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: onGatewayNav ? 'pointer' : 'default',
            }}
          >
            <span style={{ color: H.textHelper, fontSize: 12 }}>└</span>
            Gateways
            {gatewaysEnabled && (
              <span style={{
                marginLeft: 'auto',
                fontSize: 10,
                fontWeight: 700,
                color: H.statusHealthy,
                background: '#F0FAF4',
                border: `1px solid ${H.statusHealthy}`,
                borderRadius: 3,
                padding: '1px 5px',
                letterSpacing: 0.3,
              }}>On</span>
            )}
          </div>
        </nav>

        {/* Main */}
        {children}
      </div>
    </div>
  );
}

const navBackStyle: CSSProperties = {
  fontSize: 13,
  color: H.textLink,
  padding: '8px 16px 16px',
  cursor: 'default',
  borderBottom: `1px solid ${H.borderFaint}`,
  marginBottom: 8,
};

const navClusterLabel: CSSProperties = {
  fontSize: 11,
  color: H.textHelper,
  padding: '0 16px 4px',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
};

const navItemStyle = (active: boolean): CSSProperties => ({
  padding: '9px 16px',
  fontSize: 14,
  color: active ? H.textPrimary : H.textSecondary,
  fontWeight: active ? 600 : 400,
  background: active ? H.borderFaint : 'transparent',
  borderLeft: active ? `3px solid ${H.textPrimary}` : '3px solid transparent',
  cursor: 'default',
});

const navSectionLabel: CSSProperties = {
  fontSize: 11,
  color: H.textHelper,
  padding: '12px 16px 4px',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
};

const mainStyle: CSSProperties = {
  flex: 1,
  padding: '24px 40px 48px',
  overflowY: 'auto',
  background: H.background,
};

/* ── Shared primitives ────────────────────────────────────────── */

function Breadcrumb({ items }: { items: string[] }) {
  return (
    <div style={{ fontSize: 12, color: H.textSecondary, marginBottom: 16, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', gap: 4 }}>
          {i > 0 && <span style={{ color: H.textDisabled }}>/</span>}
          <span style={{ color: i === items.length - 1 ? H.textPrimary : H.textLink, cursor: 'default' }}>
            {item}
          </span>
        </span>
      ))}
    </div>
  );
}

function PageTitle({
  title,
  actions,
  badge,
}: {
  title: string;
  actions?: ReactNode;
  badge?: ReactNode;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: H.textPrimary, lineHeight: 1.2 }}>{title}</h1>
        {badge}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}

function Badge({
  text,
  color = 'neutral',
}: {
  text: string;
  color?: 'neutral' | 'success' | 'warning' | 'critical' | 'offline';
}) {
  const colors: Record<string, CSSProperties> = {
    neutral:  { color: H.textSecondary, border: `1px solid ${H.border}`, background: H.surface },
    success:  { color: H.statusHealthy, border: `1px solid ${H.statusHealthy}`, background: '#F0FAF4' },
    warning:  { color: H.statusDegraded, border: `1px solid ${H.statusDegraded}`, background: '#FFF8EE' },
    critical: { color: H.btnCritical, border: `1px solid ${H.btnCritical}`, background: '#FFF0F0' },
    // "Not connected" — neutral-red; tunnel was never established (distinct from degraded = tunnel exists but unresponsive)
    offline:  { color: '#5C1111', border: `1px solid #CCCCCC`, background: '#F9F9F9' },
  };
  return (
    <span style={{
      ...colors[color],
      fontSize: 11,
      fontWeight: 600,
      padding: '3px 8px',
      borderRadius: 3,
      letterSpacing: 0.3,
      display: 'inline-flex',
      alignItems: 'center',
    }}>
      {text}
    </span>
  );
}

function Btn({
  children,
  kind = 'primary',
  size = 'medium',
  onClick,
}: {
  children: ReactNode;
  kind?: 'primary' | 'secondary' | 'critical' | 'tertiary';
  size?: 'small' | 'medium';
  onClick?: () => void;
}) {
  const base: CSSProperties = {
    fontFamily: FONT_SANS,
    fontSize: size === 'small' ? 13 : 14,
    fontWeight: 500,
    padding: size === 'small' ? '7px 14px' : '10px 18px',
    borderRadius: 5,
    border: '1px solid transparent',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    whiteSpace: 'nowrap' as const,
  };
  const variants: Record<string, CSSProperties> = {
    primary:   { background: H.btnPrimary, color: H.textInverse, borderColor: H.btnPrimary },
    secondary: { background: H.btnSecondary, color: H.textPrimary, borderColor: H.border },
    critical:  { background: H.btnCritical, color: H.textInverse, borderColor: H.btnCritical },
    tertiary:  { background: 'transparent', color: H.textLink, borderColor: 'transparent' },
  };
  return (
    <button style={{ ...base, ...variants[kind] }} onClick={onClick}>
      {children}
    </button>
  );
}

function Alert({
  type = 'neutral',
  title,
  description,
}: {
  type?: 'neutral' | 'success' | 'warning';
  title: string;
  description?: string;
}) {
  const borderColors = { neutral: H.border, success: H.statusHealthy, warning: H.statusDegraded };
  const glyphs = { neutral: 'i', success: '✓', warning: '!' };
  return (
    <div style={{
      display: 'flex',
      gap: 12,
      padding: '14px 16px',
      background: H.surface,
      border: `1px solid ${H.borderFaint}`,
      borderLeft: `3px solid ${borderColors[type]}`,
      borderRadius: 5,
      marginBottom: 20,
    }}>
      <div style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: `1px solid ${borderColors[type]}`,
        fontSize: 11,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: borderColors[type],
        fontWeight: 700,
      }}>{glyphs[type]}</div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 13, color: H.textPrimary }}>{title}</div>
        {description && <div style={{ fontSize: 13, color: H.textSecondary, marginTop: 3, lineHeight: 1.5 }}>{description}</div>}
      </div>
    </div>
  );
}

function Card({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{
      background: H.surface,
      border: `1px solid ${H.borderFaint}`,
      borderRadius: 6,
      padding: 20,
      ...style,
    }}>
      {children}
    </div>
  );
}

function FormField({
  label,
  placeholder,
  helper,
  type = 'text',
  required,
}: {
  label: string;
  placeholder?: string;
  helper?: string;
  type?: 'text' | 'password' | 'textarea';
  required?: boolean;
}) {
  const inputStyle: CSSProperties = {
    fontFamily: type === 'text' || type === 'password' ? FONT_MONO : FONT_SANS,
    fontSize: 13,
    color: H.textDisabled,
    background: H.field,
    border: `1px solid ${H.border}`,
    borderRadius: 4,
    padding: '9px 12px',
    width: '100%',
    boxSizing: 'border-box',
    ...(type === 'textarea' ? { height: 88, display: 'block', resize: 'none' } : {}),
  };
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: H.textPrimary, marginBottom: 5 }}>
        {label}
        {required && <span style={{ color: '#C84034', marginLeft: 3 }}>*</span>}
      </div>
      {type === 'textarea'
        ? <div style={inputStyle}>{placeholder}</div>
        : <div style={inputStyle}>{type === 'password' ? '••••••••••••' : placeholder}</div>
      }
      {helper && <div style={{ fontSize: 12, color: H.textHelper, marginTop: 5 }}>{helper}</div>}
    </div>
  );
}

function CodeBlock({ lines }: { lines: string[] }) {
  return (
    <div style={{
      background: H.codeBg,
      color: H.codeText,
      fontFamily: FONT_MONO,
      fontSize: 12.5,
      lineHeight: 1.7,
      padding: '14px 16px',
      borderRadius: 5,
      overflowX: 'auto',
      marginBottom: 20,
      position: 'relative',
    }}>
      <span style={{
        position: 'absolute',
        top: 8,
        right: 12,
        fontSize: 11,
        color: '#888',
        cursor: 'default',
      }}>Copy</span>
      {lines.map((l, i) => (
        <div key={i} style={{ whiteSpace: 'pre' }}>{l}</div>
      ))}
    </div>
  );
}

function DescriptionList({ items }: { items: Array<{ label: string; value: ReactNode }> }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', rowGap: 0 }}>
      {items.map(({ label, value }, i) => (
        <>
          <div key={`l-${i}`} style={{
            fontSize: 12,
            color: H.textHelper,
            padding: '10px 0',
            borderBottom: `1px solid ${H.borderFaint}`,
            fontWeight: 500,
          }}>{label}</div>
          <div key={`v-${i}`} style={{
            fontSize: 13,
            color: H.textPrimary,
            padding: '10px 0',
            borderBottom: `1px solid ${H.borderFaint}`,
          }}>{value}</div>
        </>
      ))}
    </div>
  );
}

function StepIndicator({ current, total, label }: { current: number; total: number; label: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 24,
      padding: '10px 0',
      borderBottom: `1px solid ${H.borderFaint}`,
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} style={{
            width: i + 1 === current ? 24 : 8,
            height: 8,
            borderRadius: 4,
            background: i + 1 === current ? H.textPrimary : (i + 1 < current ? H.textSecondary : H.borderStrong),
            transition: 'width 0.2s',
          }} />
        ))}
      </div>
      <span style={{ fontSize: 12, color: H.textHelper }}>Step {current} of {total} - {label}</span>
    </div>
  );
}

function RadioCard({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        padding: 20,
        border: `2px solid ${selected ? H.textPrimary : H.border}`,
        borderRadius: 6,
        background: selected ? '#F8F8F8' : H.surface,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: `2px solid ${selected ? H.textPrimary : H.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {selected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: H.textPrimary }} />}
        </div>
        <span style={{ fontWeight: 600, fontSize: 14, color: H.textPrimary }}>{label}</span>
      </div>
      <p style={{ fontSize: 13, color: H.textSecondary, margin: 0, lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}

function Modal({
  title,
  children,
  footer,
  onClose,
  color = 'default',
}: {
  title: string;
  children: ReactNode;
  footer: ReactNode;
  onClose?: () => void;
  color?: 'default' | 'critical';
}) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
    }}>
      <div style={{
        background: H.surface,
        borderRadius: 6,
        width: 520,
        maxWidth: '90vw',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: `3px solid ${color === 'critical' ? H.btnCritical : H.textPrimary}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: H.textPrimary }}>{title}</h2>
          {onClose && (
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: H.textHelper, padding: 0 }}
            >×</button>
          )}
        </div>
        <div style={{ padding: '20px 24px' }}>{children}</div>
        <div style={{
          padding: '16px 24px',
          borderTop: `1px solid ${H.borderFaint}`,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 8,
        }}>{footer}</div>
      </div>
    </div>
  );
}

/* ── Architecture diagram (S1) ────────────────────────────────── */

function GatewayArchDiagram() {
  const boxStyle = (selected = false): CSSProperties => ({
    border: `1.5px solid ${selected ? H.goldDark : H.border}`,
    borderRadius: 5,
    padding: '10px 14px',
    background: selected ? '#FFFBE6' : H.surface,
    textAlign: 'center',
    minWidth: 90,
  });
  const labelStyle: CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    color: H.textHelper,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 6,
  };
  const regionStyle = (right = false): CSSProperties => ({
    flex: 1,
    border: `1.5px dashed ${right ? '#5B9BD5' : H.borderStrong}`,
    borderRadius: 6,
    padding: '16px 20px',
    position: 'relative',
  });
  const regionLabel: CSSProperties = {
    position: 'absolute',
    bottom: -10,
    left: 16,
    fontSize: 10,
    fontWeight: 600,
    color: H.textHelper,
    background: H.background,
    padding: '0 6px',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  };
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 28, maxWidth: 740 }}>
      {/* Left: Vault Dataplane Network */}
      <div style={regionStyle()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Vault Node */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={boxStyle()}>
              <div style={{ fontSize: 18 }}>▽</div>
            </div>
            <div style={labelStyle}>Vault Node</div>
          </div>

          {/* Arrow */}
          <div style={{ fontSize: 16, color: H.goldDark, marginBottom: 18 }}>→</div>

          {/* Dataplane Gateway */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ ...boxStyle(true), minWidth: 110 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: H.goldDark }}>Dataplane</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: H.goldDark }}>Gateway</div>
              <div style={{
                marginTop: 8,
                background: '#C6E8FF',
                border: `1px solid #5B9BD5`,
                borderRadius: 3,
                padding: '4px 8px',
                fontSize: 10,
                fontWeight: 600,
                color: '#1A4A80',
              }}>wg0</div>
            </div>
            <div style={labelStyle}>Dataplane GW</div>
          </div>
        </div>
        <div style={regionLabel}>Vault Dataplane Network</div>
      </div>

      {/* Wireguard tunnel connector */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        flexShrink: 0,
        paddingBottom: 18,
      }}>
        <div style={{
          fontSize: 11,
          fontWeight: 700,
          color: H.goldDark,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
        }}>⬡</div>
        <div style={{
          width: 60,
          height: 2,
          background: `repeating-linear-gradient(90deg, ${H.goldDark} 0, ${H.goldDark} 6px, transparent 6px, transparent 10px)`,
        }} />
        <div style={{ fontSize: 9, color: H.goldDark, fontWeight: 700, letterSpacing: 0.3, textTransform: 'uppercase' }}>
          Wireguard<br />Tunnel
        </div>
      </div>

      {/* Right: Your Network Site */}
      <div style={regionStyle(true)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Site Gateway */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ ...boxStyle(true), minWidth: 110 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: H.goldDark }}>Site</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: H.goldDark }}>Gateway</div>
              <div style={{
                marginTop: 8,
                background: '#C6E8FF',
                border: '1px solid #5B9BD5',
                borderRadius: 3,
                padding: '4px 8px',
                fontSize: 10,
                fontWeight: 600,
                color: '#1A4A80',
              }}>wg1</div>
            </div>
            <div style={labelStyle}>Site GW</div>
          </div>

          {/* Arrow */}
          <div style={{ fontSize: 16, color: H.textSecondary, marginBottom: 18 }}>→</div>

          {/* Database */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={boxStyle()}>
              <div style={{ fontSize: 18 }}>⊞</div>
            </div>
            <div style={labelStyle}>Database</div>
          </div>
        </div>
        <div style={regionLabel}>Your Network Site</div>
      </div>
    </div>
  );
}

/* ── Network card primitive (Networking overview) ─────────────── */

function NetworkCard({
  title,
  description,
  status,
  statusColor = 'neutral',
  onClick,
}: {
  title: string;
  description: string;
  status: string;
  statusColor?: 'neutral' | 'success' | 'warning';
  onClick?: () => void;
}) {
  return (
    <Card style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: H.textPrimary }}>{title}</span>
        <Badge
          text={status}
          color={statusColor === 'success' ? 'success' : statusColor === 'warning' ? 'warning' : 'neutral'}
        />
      </div>
      <p style={{ fontSize: 13, color: H.textSecondary, margin: '0 0 10px', lineHeight: 1.5 }}>{description}</p>
      <span
        onClick={onClick}
        style={{ fontSize: 13, color: H.textLink, cursor: onClick ? 'pointer' : 'default' }}
      >
        Edit →
      </span>
    </Card>
  );
}

/* ── Table ────────────────────────────────────────────────────── */

function Table({
  columns,
  rows,
}: {
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <div style={{ border: `1px solid ${H.borderFaint}`, borderRadius: 6, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: H.field, borderBottom: `1px solid ${H.border}` }}>
            {columns.map((col, i) => (
              <th key={i} style={{
                padding: '10px 16px',
                textAlign: 'left',
                fontWeight: 600,
                fontSize: 12,
                color: H.textSecondary,
                letterSpacing: 0.3,
                textTransform: 'uppercase',
                borderRight: i < columns.length - 1 ? `1px solid ${H.borderFaint}` : 'none',
              }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{
              borderBottom: ri < rows.length - 1 ? `1px solid ${H.borderFaint}` : 'none',
              background: H.surface,
            }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '12px 16px',
                  color: H.textPrimary,
                  borderRight: ci < row.length - 1 ? `1px solid ${H.borderFaint}` : 'none',
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Tabs ─────────────────────────────────────────────────────── */

function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange?: (tab: string) => void;
}) {
  return (
    <div style={{
      display: 'flex',
      borderBottom: `1px solid ${H.border}`,
      marginBottom: 24,
      gap: 0,
    }}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange?.(tab)}
          style={{
            fontFamily: FONT_SANS,
            fontSize: 14,
            fontWeight: tab === active ? 600 : 400,
            color: tab === active ? H.textPrimary : H.textSecondary,
            background: 'none',
            border: 'none',
            borderBottom: `2px solid ${tab === active ? H.textPrimary : 'transparent'}`,
            padding: '10px 18px',
            cursor: 'pointer',
            marginBottom: -1,
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

/* ── Verify spinner ───────────────────────────────────────────── */

function VerifySpinner() {
  return (
    <div style={{
      width: 48,
      height: 48,
      border: `4px solid ${H.borderFaint}`,
      borderTop: `4px solid ${H.textPrimary}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ── Section heading ──────────────────────────────────────────── */
function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 style={{ fontSize: 17, fontWeight: 600, color: H.textPrimary, margin: '0 0 16px' }}>{children}</h2>
  );
}

/* ══════════════════════════════════════════════════════════════
   SCREEN VIEWS
   ═══════════════════════════════════════════════════════════ */

/* S0 - Networking overview */
function S0_NetworkingOverview({
  onGatewayEdit,
  gatewaysEnabled = false,
  onGatewayNav,
}: {
  onGatewayEdit?: () => void;
  gatewaysEnabled?: boolean;
  onGatewayNav?: () => void;
}) {
  return (
    <AppShell sideNavActive="Networking" gatewaysEnabled={gatewaysEnabled} onGatewayNav={onGatewayNav}>
      <main style={mainStyle}>
        <Breadcrumb items={['cizh-org', 'default-project', 'Vault Dedicated', 'vault-cluster', 'Cluster networking']} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{
            width: 36,
            height: 36,
            background: '#FFF5CC',
            border: `1px solid ${H.goldDark}`,
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}>⬡</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Networking</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, maxWidth: 1100 }}>
          {/* Connection security */}
          <div>
            <SectionHeading>Connection security</SectionHeading>
            <NetworkCard title="Cluster accessibility" description="Cluster is accessible over the public internet." status="Public" statusColor="success" />
            <NetworkCard title="IP Allow list" description="Allow only specific source IP(s) to connect to the cluster's public network endpoint." status="13 IP addresses allowed" statusColor="success" />
            <NetworkCard title="Proxy" description="Identity-based public proxy address managed by HCP which only allows connections to the cluster from authorized HCP identities." status="Enabled" statusColor="success" />
            <NetworkCard
              title="Gateway"
              description="Connect your private network sites to HCP Vault using encrypted tunnels."
              status={gatewaysEnabled ? 'Enabled · 2 sites' : 'Disabled'}
              statusColor={gatewaysEnabled ? 'success' : 'neutral'}
              onClick={gatewaysEnabled ? onGatewayNav : onGatewayEdit}
            />
          </div>

          {/* Communication setup */}
          <div>
            <SectionHeading>Communication setup</SectionHeading>
            <NetworkCard title="HVN" description="HashiCorp Virtual Network is in use for this cluster, you can check the peering connections, transit gateways here." status="Active" statusColor="success" />
            <NetworkCard title="Private link" description="Your own DNS server(s) are used for name resolution for certain domains." status="2/2 Active" statusColor="success" />
            <NetworkCard title="Custom DNS forwarding" description="Your own DNS server(s) are used for name resolution for certain domains." status="3/4 Active" statusColor="warning" />
            <NetworkCard title="Custom domain" description={`Domain name to your clusters is customized to "databucks.com"`} status="Enabled" statusColor="success" />
          </div>
        </div>
      </main>
    </AppShell>
  );
}

/* S1 - Gateways landing (disabled) */
function S1_GatewaysDisabled({
  onEnable,
  onGatewayNav,
}: {
  onEnable?: () => void;
  onGatewayNav?: () => void;
}) {
  return (
    <AppShell sideNavActive="Gateways" gatewaysEnabled={false} onGatewayNav={onGatewayNav}>
      <main style={mainStyle}>
        <Breadcrumb items={['cizh-org', 'default-project', 'Vault Dedicated', 'vault-cluster', 'Cluster networking', 'Gateways']} />
        <PageTitle
          title="Gateways"
          actions={<Btn kind="primary" onClick={onEnable}>Enable Gateways</Btn>}
        />

        <p style={{ fontSize: 14, color: H.textSecondary, margin: '0 0 28px', maxWidth: 680, lineHeight: 1.6 }}>
          Information about gateways and how they work...{' '}
          <span style={{ color: H.textLink, cursor: 'default' }}>Learn more about HVD gateways.</span>
        </p>

        <SectionHeading>Set up gateways</SectionHeading>
        <p style={{ fontSize: 14, color: H.textSecondary, margin: '0 0 24px', maxWidth: 680, lineHeight: 1.6 }}>
          Configure gateways to allow encrypted communication between HCP Vault nodes and your private network sites. Direct your Vault traffic through Wireguard® tunnels to each of your cloud environments and datacenters.
        </p>

        <GatewayArchDiagram />

        <SectionHeading>Set up steps:</SectionHeading>
        <ol style={{ paddingLeft: 20, margin: '0 0 32px' }}>
          {SETUP_STEPS.map((step, i) => (
            <li key={i} style={{ fontSize: 14, color: H.textPrimary, marginBottom: 10, lineHeight: 1.6 }}>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </main>
    </AppShell>
  );
}

/* S2 - Enable modal */
function S2_EnableModal({ onCancel, onConfirm }: { onCancel?: () => void; onConfirm?: () => void }) {
  return (
    <AppShell sideNavActive="Gateways" gatewaysEnabled={false}>
      <main style={{ ...mainStyle, filter: 'blur(1px)', pointerEvents: 'none' }}>
        <Breadcrumb items={['cizh-org', 'default-project', 'Vault Dedicated', 'vault-cluster', 'Cluster networking', 'Gateways']} />
        <PageTitle title="Gateways" actions={<Btn kind="primary">Enable Gateways</Btn>} />
      </main>
      <Modal
        title="Enable gateways"
        footer={<>
          <Btn kind="secondary" onClick={onCancel}>Cancel</Btn>
          <Btn kind="primary" onClick={onConfirm}>Enable</Btn>
        </>}
        onClose={onCancel}
      >
        <p style={{ fontSize: 14, color: H.textSecondary, margin: '0 0 16px', lineHeight: 1.6 }}>
          Enabling gateways will deploy one dataplane gateway per availability zone for this cluster. Gateways operate in an active/passive configuration to enable rapid failover.
        </p>
        <Alert
          type="neutral"
          title="One gateway will be deployed per availability zone."
          description="Dataplane gateways are managed by HCP and cannot be removed individually. Disabling gateways at the cluster level removes all dataplane gateways."
        />
      </Modal>
    </AppShell>
  );
}

/* ── Dataplane AZ health strip (S3 + topology view) ──────────── */
const DATAPLANE_AZS = [
  { name: 'us-east-1a', status: 'healthy' as const },
  { name: 'us-east-1b', status: 'healthy' as const },
  { name: 'us-east-1c', status: 'healthy' as const },
  { name: 'us-east-1d', status: 'healthy' as const },
];

function DataplaneHealthStrip() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 16px',
      background: H.surface,
      border: `1px solid ${H.borderFaint}`,
      borderRadius: 6,
      marginBottom: 16,
      flexWrap: 'wrap',
    }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: H.textHelper, textTransform: 'uppercase', letterSpacing: 0.4, marginRight: 4 }}>
        Dataplane gateways
      </span>
      {DATAPLANE_AZS.map(az => (
        <div key={az.name} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '4px 10px',
          border: `1px solid ${H.borderFaint}`,
          borderRadius: 4,
          background: H.background,
          fontSize: 12,
        }}>
          <span style={{ color: H.statusHealthy, fontWeight: 700, fontSize: 11 }}>✓</span>
          <span style={{ color: H.textSecondary }}>{az.name}</span>
        </div>
      ))}
    </div>
  );
}

/* S3 - Gateways enabled, no sites */
function S3_GatewaysEmpty({ onAddSite }: { onAddSite?: () => void }) {
  return (
    <AppShell sideNavActive="Gateways" gatewaysEnabled={true}>
      <main style={mainStyle}>
        <Breadcrumb items={['cizh-org', 'default-project', 'Vault Dedicated', 'vault-cluster', 'Cluster networking', 'Gateways']} />
        <PageTitle
          title="Gateways"
          badge={<Badge text="Enabled" color="success" />}
          actions={<Btn kind="primary" onClick={onAddSite}>Add site</Btn>}
        />

        <Alert
          type="success"
          title="Gateways enabled"
          description="Dataplane gateways are active in each availability zone. Add a site to connect your first private network."
        />

        {/* Dataplane health strip — shows HCP infrastructure is live before user sets up their first site */}
        <DataplaneHealthStrip />

        {/* Empty state */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px 0',
          border: `1px dashed ${H.border}`,
          borderRadius: 6,
          background: H.surface,
          marginTop: 8,
        }}>
          <div style={{
            width: 48,
            height: 48,
            border: `1.5px solid ${H.border}`,
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            color: H.textHelper,
            marginBottom: 16,
          }}>⬡</div>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px', color: H.textPrimary }}>No sites configured</h3>
          <p style={{ fontSize: 14, color: H.textSecondary, margin: '0 0 24px', textAlign: 'center', maxWidth: 360 }}>
            Add your first gateway site to connect a private network to HCP Vault.
          </p>
          <Btn kind="primary" onClick={onAddSite}>Add site</Btn>
        </div>
      </main>
    </AppShell>
  );
}

/* S4 - Create site: deployment model */
function S4_DeploymentModel({
  onNext,
  onCancel,
}: {
  onNext?: (model: 'binary' | 'docker') => void;
  onCancel?: () => void;
}) {
  const [selected, setSelected] = useState<'binary' | 'docker'>('binary');
  return (
    <AppShell sideNavActive="Gateways" gatewaysEnabled={true}>
      <main style={mainStyle}>
        <Breadcrumb items={['cizh-org', 'default-project', 'Vault Dedicated', 'vault-cluster', 'Cluster networking', 'Gateways', 'Add site']} />
        <PageTitle title="Add site" />
        <StepIndicator current={1} total={4} label="Deployment model" />

        <div style={{ maxWidth: 680 }}>
          <SectionHeading>Choose how to run the gateway agent</SectionHeading>
          <p style={{ fontSize: 14, color: H.textSecondary, margin: '0 0 24px', lineHeight: 1.6 }}>
            The gateway agent runs inside your network and establishes an encrypted tunnel to HCP Vault. Select the deployment format that fits your environment.
          </p>

          <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
            <RadioCard
              label="Binary"
              description="Single compiled executable. No container runtime required. Preferred by security teams for its minimal dependency footprint."
              selected={selected === 'binary'}
              onClick={() => setSelected('binary')}
            />
            <RadioCard
              label="Docker"
              description="Container image. Preferred for teams already running container platforms. Pull from the HashiCorp registry and run with standard Docker flags."
              selected={selected === 'docker'}
              onClick={() => setSelected('docker')}
            />
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Btn kind="tertiary" onClick={onCancel}>Cancel</Btn>
            <Btn kind="primary" onClick={() => onNext?.(selected)}>Next →</Btn>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

/* S5 - Create site: configure */
function S5_Configure({
  onNext,
  onBack,
}: {
  onNext?: () => void;
  onBack?: () => void;
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <AppShell sideNavActive="Gateways" gatewaysEnabled={true}>
      <main style={mainStyle}>
        <Breadcrumb items={['cizh-org', 'default-project', 'Vault Dedicated', 'vault-cluster', 'Cluster networking', 'Gateways', 'Add site']} />
        <PageTitle title="Add site" />
        <StepIndicator current={2} total={4} label="Configure" />

        <div style={{ maxWidth: 560 }}>
          <FormField
            label="Site name"
            placeholder="e.g. nyc-prod"
            helper="A label for this network site. Used to identify the gateway in routing rules and logs."
            required
          />
          <FormField
            label="Service principal client ID"
            placeholder="client_id"
            helper="From the HCP service principal created for this gateway."
            type="text"
            required
          />
          <FormField
            label="Service principal client secret"
            placeholder=""
            helper="Store this value securely. It will not be shown again after setup."
            type="password"
            required
          />
          <FormField
            label="Network site CIDRs"
            placeholder={'192.168.0.0/24\n10.99.0.0/24'}
            helper="One CIDR per line. These become your VPC routing table entries — traffic from these ranges is directed through this gateway to HCP Vault."
            type="textarea"
          />

          <Alert
            type="neutral"
            title="Source IP addresses are preserved in Vault audit logs."
            description="Ensure network site CIDRs reflect your actual workload IP ranges. Source IPs from these ranges will appear in Vault audit log entries for all requests routed through this site."
          />

          {/* Advanced options disclosure */}
          <div style={{ marginBottom: 20 }}>
            <button
              onClick={() => setShowAdvanced(v => !v)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                color: H.textLink,
                fontFamily: FONT_SANS,
              }}
            >
              <span style={{ fontSize: 11 }}>{showAdvanced ? '▾' : '▸'}</span>
              {showAdvanced ? 'Hide advanced options' : 'Show advanced options'}
            </button>

            {showAdvanced && (
              <div style={{
                marginTop: 16,
                padding: '16px 20px',
                background: H.surface,
                border: `1px solid ${H.borderFaint}`,
                borderRadius: 6,
              }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: H.textPrimary, marginBottom: 5 }}>
                  Extend tunnel life
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 8,
                }}>
                  {['0 min', '15 min', '30 min', '60 min'].map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, cursor: 'pointer', color: H.textPrimary }}>
                      <div style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        border: `2px solid ${opt === '0 min' ? H.textPrimary : H.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {opt === '0 min' && <div style={{ width: 6, height: 6, borderRadius: '50%', background: H.textPrimary }} />}
                      </div>
                      {opt}
                    </label>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: H.textHelper, lineHeight: 1.5 }}>
                  Keep tunnels open for this duration after credential expiration to allow continuity during unexpected outages. Default is 0 (tunnels close immediately on expiration).
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <Btn kind="secondary" onClick={onBack}>← Back</Btn>
            <Btn kind="primary" onClick={onNext}>Next →</Btn>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

/* S6 - Create site: install instructions */
function S6_Install({
  deploymentModel = 'binary',
  onBack,
  onStartVerify,
}: {
  deploymentModel?: 'binary' | 'docker';
  onBack?: () => void;
  onStartVerify?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<string>(
    deploymentModel === 'docker' ? 'Docker' : 'Binary'
  );

  return (
    <AppShell sideNavActive="Gateways" gatewaysEnabled={true}>
      <main style={mainStyle}>
        <Breadcrumb items={['cizh-org', 'default-project', 'Vault Dedicated', 'vault-cluster', 'Cluster networking', 'Gateways', 'Add site']} />
        <PageTitle title="Add site" />
        <StepIndicator current={3} total={4} label="Install" />

        <div style={{ maxWidth: 680 }}>
          <p style={{ fontSize: 14, color: H.textSecondary, margin: '0 0 20px', lineHeight: 1.6 }}>
            Run the gateway agent in your environment. The agent will initiate an outbound connection to HCP - no inbound ports are required.
          </p>

          <Tabs tabs={['Binary', 'Docker']} active={activeTab} onChange={setActiveTab} />

          {activeTab === 'Binary' ? (
            <>
              <p style={{ fontSize: 13, fontWeight: 600, color: H.textPrimary, margin: '0 0 8px' }}>
                1. Download the gateway agent
              </p>
              <CodeBlock lines={BINARY_INSTALL_STEPS.download} />

              <p style={{ fontSize: 13, fontWeight: 600, color: H.textPrimary, margin: '0 0 8px' }}>
                2. Create the config file
              </p>
              <CodeBlock lines={BINARY_INSTALL_STEPS.config} />

              <p style={{ fontSize: 13, fontWeight: 600, color: H.textPrimary, margin: '0 0 8px' }}>
                3. Run the gateway agent
              </p>
              <CodeBlock lines={BINARY_INSTALL_STEPS.run} />
            </>
          ) : (
            <>
              <p style={{ fontSize: 13, fontWeight: 600, color: H.textPrimary, margin: '0 0 8px' }}>
                1. Pull the gateway image
              </p>
              <CodeBlock lines={DOCKER_INSTALL_STEPS.pull} />

              <p style={{ fontSize: 13, fontWeight: 600, color: H.textPrimary, margin: '0 0 8px' }}>
                2. Run the gateway container
              </p>
              <CodeBlock lines={DOCKER_INSTALL_STEPS.run} />
            </>
          )}

          <Alert
            type="neutral"
            title="Keep the agent running before proceeding."
            description="The next step verifies the tunnel connection. Start the agent first, then click Start verification."
          />

          <div style={{ display: 'flex', gap: 8 }}>
            <Btn kind="secondary" onClick={onBack}>← Back</Btn>
            <Btn kind="primary" onClick={onStartVerify}>Start verification →</Btn>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

/* S7 - Verify connection */
function S7_Verify({
  onDone,
  onViewSite,
}: {
  onDone?: () => void;
  onViewSite?: () => void;
}) {
  const [verifyState, setVerifyState] = useState<'pending' | 'connected' | 'failed'>('pending');

  useEffect(() => {
    if (verifyState === 'pending') {
      const t = setTimeout(() => setVerifyState('connected'), 3500);
      return () => clearTimeout(t);
    }
  }, [verifyState]);

  return (
    <AppShell sideNavActive="Gateways" gatewaysEnabled={true}>
      <main style={mainStyle}>
        <Breadcrumb items={['cizh-org', 'default-project', 'Vault Dedicated', 'vault-cluster', 'Cluster networking', 'Gateways', 'Add site']} />
        <PageTitle title="Add site" />
        <StepIndicator current={4} total={4} label="Verify" />

        <div style={{ maxWidth: 560 }}>
          {verifyState === 'pending' && (
            <Card style={{ padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
              <VerifySpinner />
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px', color: H.textPrimary }}>Waiting for connection...</h3>
                <p style={{ fontSize: 14, color: H.textSecondary, margin: 0, lineHeight: 1.6 }}>
                  Keep the gateway agent running. This page will update automatically when a connection is established.
                </p>
              </div>
              <Btn kind="tertiary" onClick={() => setVerifyState('failed')}>Simulate timeout</Btn>
            </Card>
          )}

          {verifyState === 'connected' && (
            <Card style={{ padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#E8F7EE',
                border: `2px solid ${H.statusHealthy}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                color: H.statusHealthy,
              }}>✓</div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px', color: H.textPrimary }}>Connected</h3>
                <p style={{ fontSize: 14, color: H.textSecondary, margin: '0 0 4px' }}>Site <strong>nyc-prod</strong> is active and healthy.</p>
                <p style={{ fontSize: 13, color: H.textHelper, margin: 0 }}>2/2 gateways active · v1.2.1</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn kind="secondary" onClick={onDone}>Done</Btn>
                <Btn kind="primary" onClick={onViewSite}>View site →</Btn>
              </div>
            </Card>
          )}

          {verifyState === 'failed' && (
            <Card style={{ padding: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px', color: H.textPrimary }}>Connection not established</h3>
              <Alert
                type="warning"
                title="No tunnel detected after 5 minutes."
                description="Check the failure category below and resolve before retrying."
              />
              <div style={{ marginBottom: 20 }}>
                {[
                  { label: 'Agent not started', detail: 'Verify the gateway binary or container is running in your environment.' },
                  { label: 'Credential error', detail: 'Check that the service principal client ID and secret are correct and have not expired.' },
                  { label: 'Network block', detail: 'Ensure outbound UDP port 51820 is open to HCP dataplane gateway IP addresses.' },
                ].map(({ label, detail }) => (
                  <div key={label} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${H.borderFaint}` }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: H.textPrimary, marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 13, color: H.textSecondary }}>{detail}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn kind="tertiary" onClick={onDone}>Exit without saving</Btn>
                <Btn kind="secondary" onClick={() => setVerifyState('pending')}>Retry verification</Btn>
              </div>
            </Card>
          )}
        </div>
      </main>
    </AppShell>
  );
}

/* ── Topology view (S8 alternate) ────────────────────────────── */
function TopologyView({ onSelectSite }: { onSelectSite?: (name: string) => void }) {
  const statusColor = (s: string) => s === 'healthy' ? H.statusHealthy : s === 'degraded' ? H.statusDegraded : '#999999';
  const lineColor   = (s: string) => s === 'healthy' ? '#CCCCCC' : s === 'degraded' ? H.statusDegraded : '#CCCCCC';
  const lineDash    = (s: string) => s === 'not_connected' ? '6,4' : s === 'degraded' ? '4,3' : 'none';

  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', marginTop: 8 }}>
      {/* Site gateways */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: H.textHelper, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 12 }}>
          Site gateways
        </div>
        <div style={{ fontSize: 12, color: H.textHelper, marginBottom: 16 }}>Private network sites defined in the VPC routing table</div>
        {SITES.map(site => (
          <div
            key={site.name}
            onClick={() => onSelectSite?.(site.name)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: H.surface,
              border: `1px solid ${H.borderFaint}`,
              borderRadius: 6,
              marginBottom: 10,
              cursor: 'pointer',
            }}
          >
            <div>
              <div style={{ fontWeight: 500, fontSize: 13, color: H.textLink, marginBottom: 4 }}>{site.name}</div>
              <div style={{ fontSize: 12, color: H.textHelper, fontFamily: FONT_MONO }}>{site.cidrs.join(', ')}</div>
              {site.status === 'degraded' && site.lastSeenAt && (
                <div style={{ fontSize: 11, color: H.statusDegraded, marginTop: 4 }}>
                  ◆ Gateway unresponsive, last heard {site.lastSeenAt}
                </div>
              )}
              {site.status === 'not_connected' && (
                <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>
                  ◆ No routing set up for this gateway
                </div>
              )}
            </div>
            <Badge
              text={site.status === 'healthy' ? 'Healthy' : site.status === 'degraded' ? 'Degraded' : 'Not connected'}
              color={site.status === 'healthy' ? 'success' : site.status === 'degraded' ? 'warning' : 'offline'}
            />
          </div>
        ))}
      </div>

      {/* Connection lines (SVG) */}
      <div style={{ width: 80, alignSelf: 'stretch', position: 'relative', flexShrink: 0 }}>
        <svg width="80" height="360" style={{ position: 'absolute', top: 36, left: 0 }}>
          {/* nyc-prod → us-east-1a */}
          <line x1="0" y1="52" x2="80" y2="100" stroke={lineColor('healthy')} strokeWidth="1.5" strokeDasharray={lineDash('healthy')} />
          {/* nj-dr → us-east-1b */}
          <line x1="0" y1="148" x2="80" y2="200" stroke={lineColor('degraded')} strokeWidth="1.5" strokeDasharray={lineDash('degraded')} />
          {/* fl-branch → no destination */}
          <line x1="0" y1="248" x2="60" y2="248" stroke={lineColor('not_connected')} strokeWidth="1.5" strokeDasharray={lineDash('not_connected')} />
          <circle cx="60" cy="248" r="7" fill="white" stroke="#CCCCCC" strokeWidth="1.5" />
          <text x="60" y="252" textAnchor="middle" fontSize="9" fill="#999">?</text>
        </svg>
      </div>

      {/* Dataplane gateways */}
      <div style={{ width: 260, flexShrink: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: H.textHelper, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 12 }}>
          Dataplane gateways
        </div>
        <div style={{ fontSize: 12, color: H.textHelper, marginBottom: 16 }}>Gateways in the Vault HCP Dataplane</div>
        {DATAPLANE_AZS.map(az => (
          <div key={az.name} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: H.surface,
            border: `1px solid ${H.borderFaint}`,
            borderRadius: 6,
            marginBottom: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, color: H.goldDark }}>▽</span>
              <span style={{ fontSize: 13, color: H.textPrimary }}>{az.name}</span>
            </div>
            <Badge text="Healthy" color="success" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* S8 - Gateways overview with sites */
function S8_SitesTable({
  onAddSite,
  onSelectSite,
}: {
  onAddSite?: () => void;
  onSelectSite?: (name: string) => void;
}) {
  const [view, setView] = useState<'table' | 'topology'>('table');

  const statusBadge = (site: typeof SITES[0]) => {
    if (site.status === 'healthy') return <Badge text="Healthy" color="success" />;
    if (site.status === 'degraded') return <Badge text="Degraded" color="warning" />;
    return <Badge text="Not connected" color="offline" />;
  };

  const gatewaysCell = (site: typeof SITES[0]) => {
    if (site.status === 'not_connected') return <span style={{ color: H.textHelper }}>—</span>;
    return (
      <span style={{ color: site.gatewaysActive < site.gatewaysTotal ? H.statusDegraded : H.textPrimary }}>
        {site.gatewaysActive}/{site.gatewaysTotal}
      </span>
    );
  };

  return (
    <AppShell sideNavActive="Gateways" gatewaysEnabled={true}>
      <main style={mainStyle}>
        <Breadcrumb items={['cizh-org', 'default-project', 'Vault Dedicated', 'vault-cluster', 'Cluster networking', 'Gateways']} />
        <PageTitle
          title="Gateways"
          badge={<Badge text="Enabled" color="success" />}
          actions={
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {/* View toggle */}
              <div style={{
                display: 'flex',
                border: `1px solid ${H.border}`,
                borderRadius: 5,
                overflow: 'hidden',
              }}>
                {(['table', 'topology'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: 13,
                      fontWeight: 500,
                      padding: '7px 14px',
                      background: view === v ? H.textPrimary : H.surface,
                      color: view === v ? H.textInverse : H.textSecondary,
                      border: 'none',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >{v === 'table' ? '≡ Table' : '⬡ Topology'}</button>
                ))}
              </div>
              <Btn kind="primary" onClick={onAddSite}>Add site</Btn>
            </div>
          }
        />

        {view === 'table' ? (
          <>
            <Table
              columns={['Site', 'Status', 'Gateways', 'Version', 'Last seen', 'Actions']}
              rows={SITES.map(site => [
                <span
                  onClick={() => onSelectSite?.(site.name)}
                  style={{ color: H.textLink, cursor: 'pointer', fontWeight: 500 }}
                >{site.name}</span>,
                statusBadge(site),
                gatewaysCell(site),
                <span style={{ fontFamily: FONT_MONO, fontSize: 12 }}>{site.version}</span>,
                <span style={{ color: site.status === 'degraded' ? H.statusDegraded : H.textSecondary }}>{site.lastSeen}</span>,
                <span style={{ color: H.textLink, cursor: 'pointer', fontSize: 13 }}>Edit</span>,
              ])}
            />

            {/* Inline alerts for non-healthy states */}
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 0 }}>
              <Alert
                type="warning"
                title="nj-dr is degraded."
                description="1 of 2 gateways is active. Gateway unresponsive — last heard 2025-07-14 04:59:00 UTC. Check that the gateway agent is running in all configured availability zones."
              />
              <Alert
                type="neutral"
                title="fl-branch has not connected."
                description="No tunnel has been established. Verify the gateway agent is running and outbound UDP port 51820 is open."
              />
            </div>
          </>
        ) : (
          <TopologyView onSelectSite={onSelectSite} />
        )}
      </main>
    </AppShell>
  );
}

/* S9 - Site detail */
function S9_SiteDetail({
  siteName = 'nyc-prod',
  onBack,
}: {
  siteName?: string;
  onBack?: () => void;
}) {
  const site = SITES.find(s => s.name === siteName) ?? SITES[0];
  const isDegraded = site.status === 'degraded';
  const isNotConnected = site.status === 'not_connected';

  const statusBadgeColor = site.status === 'healthy' ? 'success' : site.status === 'degraded' ? 'warning' : 'offline';
  const statusLabel = site.status === 'healthy' ? 'Healthy' : site.status === 'degraded' ? 'Degraded' : 'Not connected';

  return (
    <AppShell sideNavActive="Gateways" gatewaysEnabled={true}>
      <main style={mainStyle}>
        <Breadcrumb items={['cizh-org', 'default-project', 'Vault Dedicated', 'vault-cluster', 'Cluster networking', 'Gateways', site.name]} />
        <PageTitle
          title={site.name}
          badge={<Badge text={statusLabel} color={statusBadgeColor} />}
          actions={<>
            <Btn kind="secondary">Edit</Btn>
            <Btn kind="critical">Remove site</Btn>
          </>}
        />

        {/* Prominent degraded / not-connected callout */}
        {isDegraded && site.lastSeenAt && (
          <Alert
            type="warning"
            title={`Gateway unresponsive — last heard ${site.lastSeenAt}`}
            description={`${site.gatewaysActive} of ${site.gatewaysTotal} gateways active. Check that the gateway agent is running in all configured availability zones. Verify outbound UDP port 51820 is open.`}
          />
        )}
        {isNotConnected && (
          <Alert
            type="neutral"
            title="No tunnel established."
            description="The gateway agent has not connected yet. Verify the agent is running and can reach HCP on outbound UDP port 51820."
          />
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28, maxWidth: 980 }}>
          {/* Left: description list */}
          <Card>
            <SectionHeading>Configuration</SectionHeading>
            <DescriptionList items={[
              { label: 'Site name', value: <span style={{ fontFamily: FONT_MONO, fontSize: 13 }}>{site.name}</span> },
              { label: 'Status', value: <Badge text={statusLabel} color={statusBadgeColor} /> },
              { label: 'Active gateways', value: (
                <span style={{ color: site.gatewaysActive < site.gatewaysTotal ? H.statusDegraded : H.textPrimary, fontWeight: isDegraded ? 600 : 400 }}>
                  {site.gatewaysActive} of {site.gatewaysTotal}
                  {isDegraded && <span style={{ fontSize: 11, fontWeight: 400, color: H.statusDegraded, marginLeft: 6 }}>↓ 1 unresponsive</span>}
                </span>
              )},
              { label: 'Last seen', value: (
                <span style={{ color: isDegraded ? H.statusDegraded : H.textPrimary, fontWeight: isDegraded ? 600 : 400 }}>
                  {site.lastSeenAt ?? site.lastSeen}
                </span>
              )},
              { label: 'Deployment model', value: site.deploymentModel === 'binary' ? 'Binary' : 'Docker' },
              { label: 'Agent version', value: <span style={{ fontFamily: FONT_MONO, fontSize: 13 }}>{site.version}</span> },
              { label: 'Network site CIDRs', value: (
                <div>
                  {site.cidrs.map(c => (
                    <div key={c} style={{ fontFamily: FONT_MONO, fontSize: 12, marginBottom: 2 }}>{c}</div>
                  ))}
                </div>
              )},
            ]} />
          </Card>

          {/* Right: HA pairing + gateway agent */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {site.haPairedSite && (
              <Card>
                <SectionHeading>High availability</SectionHeading>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: H.textHelper, marginBottom: 4 }}>Paired DR site</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: H.textPrimary, fontFamily: FONT_MONO }}>{site.haPairedSite}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: H.textHelper, marginBottom: 4 }}>Failover status</div>
                  <Badge
                    text={site.haStatus === 'ready' ? 'Ready' : 'Degraded'}
                    color={site.haStatus === 'ready' ? 'success' : 'warning'}
                  />
                </div>
                <p style={{ fontSize: 12, color: H.textHelper, margin: '14px 0 0', lineHeight: 1.5 }}>
                  Failover is automatic. If this site becomes unreachable, traffic will route through {site.haPairedSite}.
                </p>
              </Card>
            )}

            {/* Gateway agent card — replaces "Update gateway", surfaces both install + update */}
            <Card>
              <SectionHeading>Gateway agent</SectionHeading>
              <p style={{ fontSize: 13, color: H.textSecondary, margin: '0 0 14px', lineHeight: 1.5 }}>
                The gateway agent runs inside your network. You are responsible for deployment and updates.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Btn kind="secondary" size="small">View install instructions</Btn>
                <Btn kind="secondary" size="small">View update instructions</Btn>
              </div>
              <div style={{ marginTop: 12, padding: '8px 10px', background: H.background, borderRadius: 4, fontSize: 12, color: H.textHelper }}>
                Current: <span style={{ fontFamily: FONT_MONO }}>{site.version}</span>
                <span style={{ marginLeft: 8, color: H.statusDegraded }}>New version available</span>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

/* ══════════════════════════════════════════════════════════════
   INTERACTIVE FLOW
   ═══════════════════════════════════════════════════════════ */

type Screen =
  | 'S0' | 'S1' | 'S2' | 'S3'
  | 'S4' | 'S5' | 'S6' | 'S7'
  | 'S8' | 'S9';

function GatewayFlow({
  initial = 'S0',
  startEnabled = false,
}: {
  initial?: Screen;
  startEnabled?: boolean;
}) {
  const [screen, setScreen] = useState<Screen>(initial);
  const [deployModel, setDeployModel] = useState<'binary' | 'docker'>('binary');
  const [selectedSite, setSelectedSite] = useState('nyc-prod');
  // Flips to true after S2 confirm; can be pre-seeded via startEnabled
  const [gatewaysEnabled, setGatewaysEnabled] = useState(startEnabled);

  // Side nav "Gateways" click — routes based on current enabled state
  const handleGatewayNav = () => setScreen(gatewaysEnabled ? 'S8' : 'S1');

  switch (screen) {
    case 'S0': return (
      <S0_NetworkingOverview
        onGatewayEdit={() => setScreen('S1')}
        gatewaysEnabled={gatewaysEnabled}
        onGatewayNav={handleGatewayNav}
      />
    );
    case 'S1': return (
      <S1_GatewaysDisabled
        onEnable={() => setScreen('S2')}
        onGatewayNav={handleGatewayNav}
      />
    );
    case 'S2': return (
      <S2_EnableModal
        onCancel={() => setScreen('S1')}
        onConfirm={() => { setGatewaysEnabled(true); setScreen('S3'); }}
      />
    );
    case 'S3': return <S3_GatewaysEmpty onAddSite={() => setScreen('S4')} />;
    case 'S4': return <S4_DeploymentModel onNext={(m) => { setDeployModel(m); setScreen('S5'); }} onCancel={() => setScreen('S3')} />;
    case 'S5': return <S5_Configure onNext={() => setScreen('S6')} onBack={() => setScreen('S4')} />;
    case 'S6': return <S6_Install deploymentModel={deployModel} onBack={() => setScreen('S5')} onStartVerify={() => setScreen('S7')} />;
    case 'S7': return <S7_Verify onDone={() => setScreen('S8')} onViewSite={() => setScreen('S9')} />;
    case 'S8': return <S8_SitesTable onAddSite={() => setScreen('S4')} onSelectSite={(name) => { setSelectedSite(name); setScreen('S9'); }} />;
    case 'S9': return <S9_SiteDetail siteName={selectedSite} onBack={() => setScreen('S8')} />;
    default: return <S0_NetworkingOverview />;
  }
}

/* ══════════════════════════════════════════════════════════════
   STORYBOOK EXPORTS
   ═══════════════════════════════════════════════════════════ */

const meta: Meta<typeof GatewayFlow> = {
  title: 'Wireframes/HVD Gateways',
  component: GatewayFlow,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HVD Gateway setup flow wireframes. Helios visual language, inline-CSS, no runtime dependency.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GatewayFlow>;

/** Day 0: gateways not yet enabled. Flow: S0 → S1 → S2 → S3 → ... → S8 */
export const InteractiveFlow_Day0: Story = {
  name: 'Interactive Flow — Day 0 (gateways disabled)',
  render: () => <GatewayFlow initial="S0" startEnabled={false} />,
};

/** Day N: gateways already enabled. Side nav "Gateways" goes straight to S8. */
export const InteractiveFlow_DayN: Story = {
  name: 'Interactive Flow — Day N (gateways enabled)',
  render: () => <GatewayFlow initial="S0" startEnabled={true} />,
};

export const S0_Day0: Story = {
  name: 'S0 - Networking overview (Day 0, gateway disabled)',
  render: () => <S0_NetworkingOverview gatewaysEnabled={false} />,
};

export const S0_DayN: Story = {
  name: 'S0 - Networking overview (Day N, gateway enabled)',
  render: () => <S0_NetworkingOverview gatewaysEnabled={true} />,
};

export const S1_Disabled: Story = {
  name: 'S1 - Gateways landing (disabled)',
  render: () => <S1_GatewaysDisabled />,
};

export const S2_Enable: Story = {
  name: 'S2 - Enable modal',
  render: () => <S2_EnableModal />,
};

export const S3_Empty: Story = {
  name: 'S3 - Gateways enabled, no sites',
  render: () => <S3_GatewaysEmpty />,
};

export const S4_Deployment: Story = {
  name: 'S4 - Create site: deployment model',
  render: () => <S4_DeploymentModel />,
};

export const S5_Config: Story = {
  name: 'S5 - Create site: configure',
  render: () => <S5_Configure />,
};

export const S6_BinaryInstall: Story = {
  name: 'S6 - Install instructions (Binary)',
  render: () => <S6_Install deploymentModel="binary" />,
};

export const S6_DockerInstall: Story = {
  name: 'S6 - Install instructions (Docker)',
  render: () => <S6_Install deploymentModel="docker" />,
};

export const S7_Verification: Story = {
  name: 'S7 - Verify connection',
  render: () => <S7_Verify />,
};

export const S8_Sites: Story = {
  name: 'S8 - Gateways overview with sites',
  render: () => <S8_SitesTable />,
};

export const S9_Detail: Story = {
  name: 'S9 - Site detail (nyc-prod)',
  render: () => <S9_SiteDetail siteName="nyc-prod" />,
};

export const S9_DetailDegraded: Story = {
  name: 'S9 - Site detail (nj-dr, degraded)',
  render: () => <S9_SiteDetail siteName="nj-dr" />,
};

export const S9_DetailNotConnected: Story = {
  name: 'S9 - Site detail (fl-branch, not connected)',
  render: () => <S9_SiteDetail siteName="fl-branch" />,
};

export const S8_SitesTopology: Story = {
  name: 'S8 - Gateways overview (topology view)',
  render: () => <S8_SitesTable />,
};
