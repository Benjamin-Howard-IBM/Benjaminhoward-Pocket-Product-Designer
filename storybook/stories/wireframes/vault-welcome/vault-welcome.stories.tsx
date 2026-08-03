import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/* =============================================================
   Vault Welcome Page - Wireframe
   Welcome to Vault landing page with PrivateLink CTA variants.
   Carbon Design System component shapes rendered as grayscale
   wireframes (no Carbon runtime dependency).
   Token slots map to: $background, $layer-01, $layer-02,
   $border-subtle-01, $text-primary, $text-secondary, $text-helper.
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
  focus: '#0f62fe',
  navActive: '#393939',
  navBg: '#262626',            // UI Shell header (Carbon Gray 90)
  sideNavBg: '#1c1c1c',
  tagBg: '#e0e0e0',
  shadow: 'rgba(0,0,0,0.08)',
};

const FONT_SANS = "'IBM Plex Sans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
const FONT_MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

/* ── Shell styles ─────────────────────────────────────────────── */

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

const bodyStyle: CSSProperties = {
  display: 'flex',
  flex: 1,
  minHeight: 0,
};

const sideNavStyle: CSSProperties = {
  width: 48,
  background: C.sideNavBg,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '8px 0',
  gap: 4,
  flexShrink: 0,
};

const mainStyle: CSSProperties = {
  flex: 1,
  padding: '0 0 48px',
  overflow: 'auto',
  background: C.background,
};

/* ── Button primitives ───────────────────────────────────────── */

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
  flexShrink: 0,
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
  height: 38,
};

const ghostButtonStyle: CSSProperties = {
  ...buttonBase,
  background: 'transparent',
  color: C.textPrimary,
  border: `1px solid ${C.borderStrong}`,
  height: 38,
};

const invertedButtonStyle: CSSProperties = {
  ...buttonBase,
  background: C.layer01,
  color: C.textPrimary,
};

function PrimaryButton({ children }: { children: ReactNode }) {
  return <button style={primaryButtonStyle}>{children}</button>;
}

function SecondaryButton({ children }: { children: ReactNode }) {
  return <button style={secondaryButtonStyle}>{children}</button>;
}

function GhostButton({ children }: { children: ReactNode }) {
  return <button style={ghostButtonStyle}>{children}</button>;
}

function InvertedButton({ children }: { children: ReactNode }) {
  return <button style={invertedButtonStyle}>{children}</button>;
}

/* ── Header ──────────────────────────────────────────────────── */

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
        <span style={{ fontWeight: 600 }}>Vault</span>
      </div>
      {/* Right-side icon buttons */}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 0 }}>
        {['?', '●'].map((icon, i) => (
          <div key={i} style={{
            width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: i === 1 ? 20 : 14,
            color: '#ffffff',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
          }}>{icon}</div>
        ))}
      </div>
    </header>
  );
}

/* ── Icon-only side nav ──────────────────────────────────────── */

function SideNav() {
  const icons = ['⊞', '⊹', '☁', '⚙', '≡'];
  return (
    <aside style={sideNavStyle}>
      {icons.map((icon, i) => (
        <div key={i} style={{
          width: 48, height: 48,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
          color: i === 0 ? '#ffffff' : 'rgba(255,255,255,0.5)',
          background: i === 0 ? 'rgba(255,255,255,0.12)' : 'transparent',
          cursor: 'default',
        }}>{icon}</div>
      ))}
    </aside>
  );
}

/* ── Section card wrapper ────────────────────────────────────── */

const sectionStyle: CSSProperties = {
  background: C.layer01,
  border: `1px solid ${C.borderSubtle}`,
  marginBottom: 16,
};

function Section({ children, noPad }: { children: ReactNode; noPad?: boolean }) {
  return (
    <div style={{ ...sectionStyle, padding: noPad ? 0 : '24px 24px 28px' }}>
      {children}
    </div>
  );
}

const sectionTitle: CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: C.textPrimary,
  marginBottom: 8,
};

const sectionDesc: CSSProperties = {
  fontSize: 14,
  color: C.textSecondary,
  marginBottom: 20,
  lineHeight: 1.5,
  maxWidth: 420,
};

/* ── Hero section ────────────────────────────────────────────── */

function HeroSection() {
  return (
    <div style={{
      background: C.layer01,
      border: `1px solid ${C.borderSubtle}`,
      marginBottom: 16,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      minHeight: 160,
    }}>
      {/* Left: heading + subtitle */}
      <div style={{ padding: '40px 40px 36px' }}>
        <h1 style={{
          fontSize: 36,
          fontWeight: 300,
          color: C.textPrimary,
          margin: '0 0 12px',
          lineHeight: 1.15,
          fontFamily: FONT_SANS,
        }}>Welcome to Vault!</h1>
        <p style={{
          fontSize: 14,
          color: C.textSecondary,
          margin: 0,
          lineHeight: 1.6,
          maxWidth: 360,
        }}>
          Manage secrets, control access, and secure your infrastructure — all
          from one place. Your cluster is active and ready.
        </p>
      </div>
      {/* Right: illustration placeholder */}
      <div style={{
        background: C.layerAccent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeft: `1px solid ${C.borderSubtle}`,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: C.textPlaceholder,
        }}>
          {/* Faux isometric grid illustration placeholder */}
          <svg width="80" height="64" viewBox="0 0 80 64" fill="none">
            <rect x="10" y="24" width="24" height="16" fill={C.borderSubtle} />
            <rect x="10" y="12" width="24" height="12" fill={C.layerAccent} stroke={C.borderStrong} strokeWidth="0.5" />
            <rect x="46" y="20" width="20" height="20" fill={C.borderSubtle} />
            <rect x="46" y="10" width="20" height="10" fill={C.layerAccent} stroke={C.borderStrong} strokeWidth="0.5" />
            <rect x="20" y="40" width="36" height="14" fill={C.borderSubtle} />
            <line x1="0" y1="40" x2="80" y2="40" stroke={C.borderSubtle} strokeWidth="0.5" />
          </svg>
          <span style={{ fontSize: 11, fontFamily: FONT_SANS }}>Illustration</span>
        </div>
      </div>
    </div>
  );
}

/* ── Cluster access section ──────────────────────────────────── */

function ClusterAccessSection({ showPrivateLink = false }: { showPrivateLink?: boolean }) {
  return (
    <Section>
      <div style={sectionTitle}>Cluster access</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: showPrivateLink ? '1fr 1fr 1fr' : '1fr auto',
        gap: 0,
        alignItems: 'start',
        borderTop: `1px solid ${C.borderSubtle}`,
        paddingTop: 20,
      }}>
        {/* Open UI */}
        <div style={{ paddingRight: 24 }}>
          <div style={{ fontSize: 14, color: C.textSecondary, marginBottom: 16 }}>
            Access the Vault cluster to manage secrets, policies, and authentication methods.
          </div>
          <SecondaryButton>Open user interface ↗</SecondaryButton>
        </div>
        {/* PrivateLink access — only shown when created */}
        {showPrivateLink && (
          <div style={{
            borderLeft: `1px solid ${C.borderSubtle}`,
            paddingLeft: 24,
            paddingRight: 24,
          }}>
            <div style={{ fontSize: 14, color: C.textSecondary, marginBottom: 16 }}>
              Connect to your cluster over a private network endpoint via AWS PrivateLink.
            </div>
            <SecondaryButton>Access via PrivateLink ↗</SecondaryButton>
          </div>
        )}
        {/* Lock Vault */}
        <div style={{
          borderLeft: `1px solid ${C.borderSubtle}`,
          paddingLeft: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          alignItems: 'flex-start',
        }}>
          <div style={{ fontSize: 14, color: C.textSecondary }}>
            Lock APIs to block all secret access, for emergencies.
          </div>
          <GhostButton>Lock Vault 🔒</GhostButton>
        </div>
      </div>
    </Section>
  );
}

/* ── Cluster network access section ─────────────────────────── */

function ClusterNetworkSection({ privateUrlSlot }: { privateUrlSlot: ReactNode }) {
  return (
    <Section>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32 }}>
        {/* Left */}
        <div>
          <div style={sectionTitle}>Cluster network access</div>
          <div style={sectionDesc}>
            Manage cluster network exposure by selecting private or public access.
          </div>
          <SecondaryButton>Edit access ↗</SecondaryButton>
        </div>
        {/* Right: URL rows */}
        <div style={{ borderLeft: `1px solid ${C.borderSubtle}`, paddingLeft: 32 }}>
          {/* Selection */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary, marginBottom: 4 }}>Selection</div>
            <div style={{ fontSize: 14, color: C.textSecondary }}>Public access enabled</div>
          </div>
          {/* Public URL */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary }}>Public URL</span>
              <span style={{
                fontSize: 11, color: C.textSecondary,
                border: `1px solid ${C.borderSubtle}`, padding: '1px 5px', borderRadius: 2,
              }}>Info</span>
            </div>
            <div style={{
              background: C.layer02,
              border: `1px solid ${C.borderSubtle}`,
              padding: '8px 12px',
              fontSize: 12,
              fontFamily: FONT_MONO,
              color: C.textPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                https://vault-design-cluster-public-vault-ce03f6d1.e200c1eb.z1.hashicorp.cloud:8200
              </span>
              <span style={{ color: C.textSecondary, flexShrink: 0 }}>⎘</span>
            </div>
          </div>
          {/* Private URL — slot for CTA or placeholder */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary }}>Private URL</span>
              <span style={{
                fontSize: 11, color: C.textSecondary,
                border: `1px solid ${C.borderSubtle}`, padding: '1px 5px', borderRadius: 2,
              }}>Info</span>
            </div>
            {privateUrlSlot}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Access data plane section (collapsed accordion) ─────────── */

function AccessDataPlaneSection() {
  return (
    <Section noPad>
      <div style={{
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={sectionTitle}>Access data plane</div>
          <div style={{ fontSize: 14, color: C.textSecondary, maxWidth: 680, lineHeight: 1.5 }}>
            Authenticate and connect to the Vault data plane using the Vault CLI. Install the CLI,
            generate a temporary admin token, and use the provided cluster URL and credentials to
            securely access and manage your Vault instance.
          </div>
        </div>
        <div style={{ fontSize: 18, color: C.textSecondary, flexShrink: 0, paddingLeft: 16 }}>∨</div>
      </div>
    </Section>
  );
}

/* ── Cluster details section ─────────────────────────────────── */

function ClusterDetailsSection() {
  const rows = [
    { label: 'Status', value: '● Active' },
    { label: 'Name', value: 'vault_prod_xyz' },
    { label: 'Region', value: 'N. California (US-west-1)' },
    { label: 'Version', value: 'v.1.23.4' },
  ];
  return (
    <Section noPad>
      <div style={{
        padding: '16px 24px 12px',
        fontSize: 14,
        fontWeight: 600,
        color: C.textPrimary,
        borderBottom: `1px solid ${C.borderSubtle}`,
      }}>
        Cluster details
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td style={{
                padding: '12px 24px',
                color: C.textSecondary,
                borderBottom: i < rows.length - 1 ? `1px solid ${C.borderSubtle}` : 'none',
                width: '50%',
              }}>{row.label}</td>
              <td style={{
                padding: '12px 24px',
                color: row.label === 'Status' ? C.textPrimary : C.textPrimary,
                borderBottom: i < rows.length - 1 ? `1px solid ${C.borderSubtle}` : 'none',
                fontFamily: row.label === 'Version' || row.label === 'Name' ? FONT_MONO : FONT_SANS,
                fontWeight: row.label === 'Status' ? 600 : 400,
                textDecoration: row.label === 'Version' ? 'underline' : 'none',
              }}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

/* ── Resources section ───────────────────────────────────────── */

function ResourcesSection() {
  const cards = [
    {
      icon: '≡',
      title: 'View documentation',
      desc: 'Learn about Vault concepts, commands, and recommended designs.',
    },
    {
      icon: '</>',
      title: 'CLI guide',
      desc: '',
    },
    {
      icon: '⬡',
      title: 'API guide',
      desc: '',
    },
    {
      icon: '☑',
      title: 'Share feedback',
      desc: "Feature requests, bugs, any thoughts you have about Vault we'd love to hear.",
    },
  ];

  return (
    <div>
      <div style={{
        fontSize: 18,
        fontWeight: 400,
        color: C.textPrimary,
        marginBottom: 16,
        padding: '0 0 0 0',
      }}>Resources</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1,
        background: C.borderSubtle,
      }}>
        {/* First card spans the left column fully */}
        <div style={{
          background: C.layer01,
          padding: '24px 24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          gridRow: 'span 2',
        }}>
          <div style={{ fontSize: 24, color: C.textSecondary }}>{cards[0].icon}</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.textPrimary }}>{cards[0].title}</div>
          <div style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.5, flex: 1 }}>{cards[0].desc}</div>
          <div style={{ fontSize: 18, color: C.textSecondary, marginTop: 'auto' }}>→</div>
        </div>
        {/* CLI guide */}
        <div style={{ background: C.layer01, padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 24, color: C.textSecondary }}>{cards[1].icon}</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.textPrimary }}>{cards[1].title}</div>
          <div style={{ fontSize: 18, color: C.textSecondary, marginTop: 'auto' }}>→</div>
        </div>
        {/* Share feedback */}
        <div style={{ background: C.layer01, padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', gap: 12, gridRow: 'span 2' }}>
          <div style={{ fontSize: 24, color: C.textSecondary }}>{cards[3].icon}</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.textPrimary }}>{cards[3].title}</div>
          <div style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.5, flex: 1 }}>{cards[3].desc}</div>
          <div style={{ fontSize: 18, color: C.textSecondary, marginTop: 'auto' }}>→</div>
        </div>
        {/* API guide */}
        <div style={{ background: C.layer01, padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 24, color: C.textSecondary }}>{cards[2].icon}</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.textPrimary }}>{cards[2].title}</div>
          <div style={{ fontSize: 18, color: C.textSecondary, marginTop: 'auto' }}>→</div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   PRIVATELINK CTA VARIANTS
   ============================================================= */

/* ── V1: Inline CTA (replaces "No private URL available" row) ── */

function PrivateLinkInlineCTA() {
  return (
    <div style={{
      border: `1px solid ${C.borderSubtle}`,
      borderTop: `2px solid ${C.borderStrong}`,
      background: C.layer02,
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    }}>
      {/* Lock icon */}
      <div style={{
        width: 36, height: 36,
        border: `1.5px solid ${C.borderStrong}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, color: C.textSecondary,
        flexShrink: 0,
      }}>🔒</div>
      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary, marginBottom: 2 }}>
          Connect via PrivateLink
        </div>
        <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.4 }}>
          Secure your cluster with a private network endpoint. Required for FedRAMP production.
        </div>
      </div>
      {/* CTA */}
      <PrimaryButton>Create PrivateLink →</PrimaryButton>
    </div>
  );
}

/* ── V2: Featured hero card (above Cluster access) ───────────── */

function PrivateLinkFeaturedCard() {
  return (
    <div style={{
      background: C.navBg,
      marginBottom: 16,
      padding: '28px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 32,
    }}>
      {/* Left: text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          color: 'rgba(255,255,255,0.55)',
          marginBottom: 8,
        }}>Recommended</div>
        <div style={{
          fontSize: 22,
          fontWeight: 300,
          color: C.inverseText,
          marginBottom: 8,
          lineHeight: 1.2,
          fontFamily: FONT_SANS,
        }}>Connect Vault</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, maxWidth: 480 }}>
          Create a PrivateLink endpoint to give your applications a secure, private path into
          this cluster — no traffic over the public internet.
        </div>
      </div>
      {/* Right: CTA button */}
      <div style={{ flexShrink: 0 }}>
        <InvertedButton>Create PrivateLink →</InvertedButton>
      </div>
    </div>
  );
}

/* =============================================================
   PLAIN PRIVATE URL PLACEHOLDER
   Used in V2 where the CTA has been promoted out of the section
   ============================================================= */

function PrivateUrlPlaceholder() {
  return (
    <div style={{
      background: C.layer02,
      border: `1px solid ${C.borderSubtle}`,
      padding: '8px 12px',
      fontSize: 13,
      color: C.textPlaceholder,
      fontFamily: FONT_MONO,
    }}>
      No private URL available
    </div>
  );
}

/* ── Populated Private URL row (PrivateLink created state) ───── */

function PrivateUrlPopulated() {
  return (
    <div style={{
      background: C.layer02,
      border: `1px solid ${C.borderSubtle}`,
      padding: '8px 12px',
      fontSize: 12,
      fontFamily: FONT_MONO,
      color: C.textPrimary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    }}>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        https://vault-design-cluster-private-vault-ce03f6d1.e200c1eb.z1.hashicorp.cloud:8200
      </span>
      <span style={{ color: C.textSecondary, flexShrink: 0 }}>⎘</span>
    </div>
  );
}

/* ── PrivateLink active success card (V2 post-creation) ──────── */

function PrivateLinkActiveCard() {
  return (
    <div style={{
      background: C.navBg,
      marginBottom: 16,
      padding: '28px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 32,
    }}>
      {/* Left: status + details */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Status indicator */}
        <div style={{
          width: 48, height: 48,
          border: `1.5px solid rgba(255,255,255,0.25)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, flexShrink: 0,
        }}>🔒</div>
        <div>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.55)',
            marginBottom: 6,
          }}>PrivateLink</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6,
          }}>
            <div style={{
              fontSize: 22,
              fontWeight: 300,
              color: C.inverseText,
              lineHeight: 1.2,
              fontFamily: FONT_SANS,
            }}>Active</div>
            {/* Status dot */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 13, color: 'rgba(255,255,255,0.65)',
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: 'rgba(255,255,255,0.7)',
                display: 'inline-block',
              }} />
              Connected
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: FONT_MONO }}>
            1 endpoint · vpce-0a1b2c3d4e5f
          </div>
        </div>
      </div>
      {/* Right: manage action */}
      <div style={{ flexShrink: 0 }}>
        <InvertedButton>Manage PrivateLink →</InvertedButton>
      </div>
    </div>
  );
}

/* =============================================================
   PAGE COMPOSERS
   ============================================================= */

function WelcomePage({
  featuredCard,
  privateUrlSlot,
  showPrivateLinkInAccess = false,
}: {
  featuredCard?: ReactNode;
  privateUrlSlot: ReactNode;
  showPrivateLinkInAccess?: boolean;
}) {
  return (
    <div style={shellStyle}>
      <Header />
      <div style={bodyStyle}>
        <SideNav />
        <main style={mainStyle}>
          {/* Content width container */}
          <div style={{ maxWidth: 940, margin: '0 auto', padding: '0 32px 32px' }}>
            <HeroSection />
            {featuredCard}
            <ClusterAccessSection showPrivateLink={showPrivateLinkInAccess} />
            <ClusterNetworkSection privateUrlSlot={privateUrlSlot} />
            <AccessDataPlaneSection />
            <ClusterDetailsSection />
            <ResourcesSection />
          </div>
        </main>
      </div>
    </div>
  );
}

/* =============================================================
   STORIES
   ============================================================= */

const meta: Meta = {
  title: 'Wireframes/Welcome to Vault',
};

export default meta;

type Story = StoryObj;

/* Version 1 — Inline PrivateLink CTA inside Cluster network access */
export const PrivateLinkInline: Story = {
  name: 'V1 — Inline PrivateLink CTA',
  render: () => (
    <WelcomePage
      privateUrlSlot={<PrivateLinkInlineCTA />}
    />
  ),
};

/* Version 2 — Featured hero card above Cluster access */
export const PrivateLinkFeatured: Story = {
  name: 'V2 — Featured Connect Vault card',
  render: () => (
    <WelcomePage
      featuredCard={<PrivateLinkFeaturedCard />}
      privateUrlSlot={<PrivateUrlPlaceholder />}
    />
  ),
};

/* =============================================================
   PRIVATELINK CREATED STATES
   ============================================================= */

/* V3a — PrivateLink created, featured card removed (clean hero) */
export const PrivateLinkCreatedClean: Story = {
  name: 'V3a — PrivateLink created · card removed',
  render: () => (
    <WelcomePage
      privateUrlSlot={<PrivateUrlPopulated />}
      showPrivateLinkInAccess
    />
  ),
};

/* V3b — PrivateLink created, featured card shows success state */
export const PrivateLinkCreatedSuccess: Story = {
  name: 'V3b — PrivateLink created · success card',
  render: () => (
    <WelcomePage
      featuredCard={<PrivateLinkActiveCard />}
      privateUrlSlot={<PrivateUrlPopulated />}
      showPrivateLinkInAccess
    />
  ),
};
