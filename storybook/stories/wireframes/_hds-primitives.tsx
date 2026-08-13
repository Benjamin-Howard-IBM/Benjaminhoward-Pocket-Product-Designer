/**
 * HDS Primitives - Helios Design System Approximations
 *
 * Reusable React components that approximate HDS component shapes
 * for use in HVD wireframe stories. Import from this file in all
 * HVD Storybook stories.
 *
 * These are visual approximations only - not Ember/HDS runtime components.
 * All styling uses --z-* tokens from hds-tokens.css.
 *
 * Components exported:
 *   HdsAppShell         - Full app frame (header + sidenav + main)
 *   HdsAppHeader        - Top navigation bar
 *   HdsAppSideNav       - Left navigation panel
 *   HdsButton           - Action button (primary / secondary / tertiary / critical)
 *   HdsAlert            - Inline / page notification (success / warning / critical / neutral)
 *   HdsBadge            - Status label
 *   HdsTag              - Removable filter tag
 *   HdsModal            - Dialog overlay
 *   HdsTable            - Data table with header row
 *   HdsFormField        - Labeled text input or textarea
 *   HdsTabs             - Tabbed navigation
 *   HdsCodeBlock        - Formatted code display
 *   HdsBreadcrumb       - Page breadcrumb trail
 *   HdsPageHeader       - Page title + description block
 */

import type { CSSProperties, ReactNode } from 'react'

/* ── Token palette (mirrors hds-tokens.css for inline style use) ── */
export const T = {
  bg:               '#ffffff',
  bgHover:          '#e5e7eb',
  layer01:          '#f7f8f8',
  layer02:          '#eef0f3',
  overlay:          'rgba(0,0,0,0.35)',
  borderSubtle:     '#d4d8e1',
  borderStrong:     '#97a0b3',
  textPrimary:      '#1c1c1c',
  textSecondary:    '#656a76',
  textPlaceholder:  '#9ea6b3',
  interactive:      '#1563ff',
  focus:            '#1563ff',
  success:          '#00a550',
  successSurface:   '#e5f7ee',
  error:            '#c8102e',
  errorSurface:     '#fce8eb',
  warning:          '#f7c948',
  warningSurface:   '#fdf6d8',
  info:             '#1563ff',
  infoSurface:      '#e5edff',
  navBg:            '#1c1c1c',
  navText:          '#ffffff',
  navBorder:        '#2e2e2e',
  sidenavBg:        '#ffffff',
  sidenavActiveBg:  '#e5edff',
  sidenavActiveText:'#1563ff',
  white:            '#ffffff',
  radiusSm:         '5px',
  radiusMd:         '6px',
  radiusLg:         '8px',
} as const

export const FONT_SANS = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
export const FONT_MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace"

/* ─────────────────────────────────────────────
   HdsAppShell
   Full application frame: header + sidenav + main content.
   ───────────────────────────────────────────── */
interface HdsAppShellProps {
  header?: ReactNode
  sideNav?: ReactNode
  children: ReactNode
  sideNavWidth?: number
}

export function HdsAppShell({ header, sideNav, children, sideNavWidth = 224 }: HdsAppShellProps) {
  const shellStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: FONT_SANS,
    background: T.layer01,
    color: T.textPrimary,
  }
  const bodyStyle: CSSProperties = { display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }
  const mainStyle: CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 32px',
    background: T.layer01,
  }
  const sideStyle: CSSProperties = {
    width: sideNavWidth,
    minWidth: sideNavWidth,
    background: T.sidenavBg,
    borderRight: `1px solid ${T.borderSubtle}`,
    overflowY: 'auto',
    flexShrink: 0,
  }

  return (
    <div style={shellStyle}>
      {header}
      <div style={bodyStyle}>
        {sideNav && <div style={sideStyle}>{sideNav}</div>}
        <main style={mainStyle}>{children}</main>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   HdsAppHeader
   Top navigation bar with product name and nav items.
   ───────────────────────────────────────────── */
interface HdsAppHeaderProps {
  productName?: string
  orgName?: string
  navItems?: Array<{ label: string; active?: boolean }>
  rightSlot?: ReactNode
}

export function HdsAppHeader({
  productName = 'HCP Vault Dedicated',
  orgName = 'hashicorp-org',
  navItems = [],
  rightSlot,
}: HdsAppHeaderProps) {
  const headerStyle: CSSProperties = {
    height: 60,
    background: T.navBg,
    borderBottom: `1px solid ${T.navBorder}`,
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    gap: 24,
    flexShrink: 0,
    fontFamily: FONT_SANS,
  }
  const logoStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: T.navText,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
  }
  const logoMarkStyle: CSSProperties = {
    width: 28,
    height: 28,
    background: T.interactive,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: T.white,
    fontSize: 11,
    fontWeight: 700,
  }
  const dividerStyle: CSSProperties = {
    width: 1,
    height: 20,
    background: T.navBorder,
  }
  const orgStyle: CSSProperties = {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 13,
    fontWeight: 400,
  }
  const navStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  }
  const navItemStyle = (active = false): CSSProperties => ({
    padding: '0 12px',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    color: active ? T.navText : 'rgba(255,255,255,0.65)',
    fontSize: 13,
    fontWeight: active ? 500 : 400,
    borderBottom: active ? `2px solid ${T.interactive}` : '2px solid transparent',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  })
  const rightStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginLeft: 'auto',
  }

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <div style={logoMarkStyle}>H</div>
        <span>{productName}</span>
      </div>
      <div style={dividerStyle} />
      <span style={orgStyle}>{orgName}</span>
      {navItems.length > 0 && (
        <nav style={navStyle}>
          {navItems.map((item) => (
            <div key={item.label} style={navItemStyle(item.active)}>{item.label}</div>
          ))}
        </nav>
      )}
      {rightSlot && <div style={rightStyle}>{rightSlot}</div>}
    </header>
  )
}

/* ─────────────────────────────────────────────
   HdsAppSideNav
   Left-side navigation with sections and items.
   ───────────────────────────────────────────── */
interface SideNavItem {
  label: string
  active?: boolean
  indent?: number
  icon?: string
}

interface SideNavSection {
  title?: string
  items: SideNavItem[]
}

interface HdsAppSideNavProps {
  sections: SideNavSection[]
  width?: number
}

export function HdsAppSideNav({ sections, width = 224 }: HdsAppSideNavProps) {
  const navStyle: CSSProperties = {
    width,
    fontFamily: FONT_SANS,
    padding: '8px 0',
  }
  const sectionTitleStyle: CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: T.textSecondary,
    padding: '16px 16px 4px',
  }
  const itemStyle = (active = false, indent = 0): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: `8px 16px 8px ${16 + indent * 12}px`,
    fontSize: 14,
    fontWeight: active ? 500 : 400,
    color: active ? T.sidenavActiveText : T.textPrimary,
    background: active ? T.sidenavActiveBg : 'transparent',
    borderRadius: T.radiusMd,
    margin: '0 8px',
    cursor: 'pointer',
  })
  const iconDotStyle: CSSProperties = {
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: T.borderSubtle,
    flexShrink: 0,
  }

  return (
    <nav style={navStyle}>
      {sections.map((section, si) => (
        <div key={si}>
          {section.title && <div style={sectionTitleStyle}>{section.title}</div>}
          {section.items.map((item, ii) => (
            <div key={ii} style={itemStyle(item.active, item.indent)}>
              <div style={iconDotStyle} />
              {item.label}
            </div>
          ))}
        </div>
      ))}
    </nav>
  )
}

/* ─────────────────────────────────────────────
   HdsButton
   Action button with HDS variants and sizes.
   ───────────────────────────────────────────── */
type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'critical'
type ButtonSize  = 'small' | 'medium' | 'large'

interface HdsButtonProps {
  text: string
  color?: ButtonColor
  size?: ButtonSize
  disabled?: boolean
  iconLeading?: boolean
  onClick?: () => void
}

export function HdsButton({
  text,
  color = 'primary',
  size = 'medium',
  disabled = false,
  iconLeading = false,
  onClick,
}: HdsButtonProps) {
  const sizeMap: Record<ButtonSize, { height: number; fontSize: number; padding: string }> = {
    small:  { height: 28, fontSize: 13, padding: '0 12px' },
    medium: { height: 36, fontSize: 14, padding: '0 16px' },
    large:  { height: 44, fontSize: 16, padding: '0 20px' },
  }
  const colorMap: Record<ButtonColor, { bg: string; text: string; border: string }> = {
    primary:  { bg: T.interactive, text: T.white,       border: T.interactive },
    secondary:{ bg: 'transparent', text: T.interactive, border: T.interactive },
    tertiary: { bg: 'transparent', text: T.interactive, border: 'transparent' },
    critical: { bg: T.error,       text: T.white,       border: T.error },
  }
  const s = sizeMap[size]
  const c = colorMap[color]

  const btnStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: s.height,
    padding: s.padding,
    fontSize: s.fontSize,
    fontWeight: 500,
    fontFamily: FONT_SANS,
    color: disabled ? T.textPlaceholder : c.text,
    background: disabled ? T.layer02 : c.bg,
    border: `1px solid ${disabled ? T.borderSubtle : c.border}`,
    borderRadius: T.radiusMd,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    whiteSpace: 'nowrap',
    userSelect: 'none',
  }
  const iconStyle: CSSProperties = {
    width: 14,
    height: 14,
    borderRadius: 2,
    background: disabled ? T.borderSubtle : (color === 'primary' || color === 'critical' ? 'rgba(255,255,255,0.5)' : T.interactive),
  }

  return (
    <button style={btnStyle} disabled={disabled} onClick={onClick}>
      {iconLeading && <span style={iconStyle} />}
      {text}
    </button>
  )
}

/* ─────────────────────────────────────────────
   HdsAlert
   Inline or page-level notification.
   ───────────────────────────────────────────── */
type AlertType = 'neutral' | 'success' | 'warning' | 'critical'

interface HdsAlertProps {
  type?: AlertType
  title: string
  description?: string
  onDismiss?: () => void
}

export function HdsAlert({ type = 'neutral', title, description, onDismiss }: HdsAlertProps) {
  const typeMap: Record<AlertType, { bg: string; border: string; accent: string; icon: string }> = {
    neutral:  { bg: T.layer01,       border: T.borderSubtle, accent: T.textSecondary, icon: 'ℹ' },
    success:  { bg: T.successSurface,border: T.success,      accent: T.success,       icon: '✓' },
    warning:  { bg: T.warningSurface, border: T.warning,     accent: '#b8860b',        icon: '⚠' },
    critical: { bg: T.errorSurface,  border: T.error,        accent: T.error,         icon: '✕' },
  }
  const c = typeMap[type]

  const alertStyle: CSSProperties = {
    display: 'flex',
    gap: 12,
    padding: '12px 16px',
    background: c.bg,
    border: `1px solid ${c.border}`,
    borderLeft: `4px solid ${c.accent}`,
    borderRadius: T.radiusMd,
    fontFamily: FONT_SANS,
  }
  const iconStyle: CSSProperties = {
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: c.accent,
    color: T.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
    flexShrink: 0,
    marginTop: 1,
  }
  const bodyStyle: CSSProperties = { flex: 1 }
  const titleStyle: CSSProperties = { fontSize: 14, fontWeight: 600, color: T.textPrimary, margin: 0 }
  const descStyle: CSSProperties  = { fontSize: 13, color: T.textSecondary, marginTop: 4 }
  const dismissStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: T.textSecondary,
    fontSize: 16,
    padding: 0,
    lineHeight: 1,
    alignSelf: 'flex-start',
  }

  return (
    <div style={alertStyle} role="alert">
      <div style={iconStyle}>{c.icon}</div>
      <div style={bodyStyle}>
        <p style={titleStyle}>{title}</p>
        {description && <p style={descStyle}>{description}</p>}
      </div>
      {onDismiss && <button style={dismissStyle} onClick={onDismiss}>×</button>}
    </div>
  )
}

/* ─────────────────────────────────────────────
   HdsBadge
   Concise status or metadata label.
   ───────────────────────────────────────────── */
type BadgeColor = 'neutral' | 'success' | 'warning' | 'critical' | 'highlight'
type BadgeType  = 'filled' | 'inverted' | 'outlined'

interface HdsBadgeProps {
  text: string
  color?: BadgeColor
  type?: BadgeType
  size?: 'small' | 'medium' | 'large'
  icon?: boolean
}

export function HdsBadge({ text, color = 'neutral', type = 'filled', size = 'medium', icon = false }: HdsBadgeProps) {
  const colorMap: Record<BadgeColor, { bg: string; text: string; border: string }> = {
    neutral:   { bg: T.layer02,        text: T.textSecondary, border: T.borderSubtle },
    success:   { bg: T.successSurface, text: T.success,       border: T.success },
    warning:   { bg: T.warningSurface, text: '#8a6a00',       border: T.warning },
    critical:  { bg: T.errorSurface,   text: T.error,         border: T.error },
    highlight: { bg: T.infoSurface,    text: T.interactive,   border: T.interactive },
  }
  const sizeMap = {
    small:  { fontSize: 11, padding: '0 6px',  height: 18 },
    medium: { fontSize: 12, padding: '0 8px',  height: 22 },
    large:  { fontSize: 13, padding: '0 10px', height: 26 },
  }
  const c = colorMap[color]
  const s = sizeMap[size]

  const badgeStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    height: s.height,
    padding: s.padding,
    fontSize: s.fontSize,
    fontWeight: 500,
    fontFamily: FONT_SANS,
    color: c.text,
    background: type === 'outlined' ? 'transparent' : c.bg,
    border: `1px solid ${c.border}`,
    borderRadius: T.radiusSm,
    whiteSpace: 'nowrap',
  }
  const dotStyle: CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: c.text,
  }

  return (
    <span style={badgeStyle}>
      {icon && <span style={dotStyle} />}
      {text}
    </span>
  )
}

/* ─────────────────────────────────────────────
   HdsTag
   Removable filter/selection tag.
   ───────────────────────────────────────────── */
interface HdsTagProps {
  text: string
  onRemove?: () => void
  color?: 'primary' | 'secondary'
}

export function HdsTag({ text, onRemove, color = 'secondary' }: HdsTagProps) {
  const tagStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    height: 24,
    padding: '0 8px',
    fontSize: 13,
    fontWeight: 400,
    fontFamily: FONT_SANS,
    color: color === 'primary' ? T.interactive : T.textPrimary,
    background: color === 'primary' ? T.infoSurface : T.layer02,
    border: `1px solid ${color === 'primary' ? T.interactive : T.borderSubtle}`,
    borderRadius: T.radiusSm,
    whiteSpace: 'nowrap',
  }
  const removeStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: T.textSecondary,
    fontSize: 14,
    padding: 0,
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <span style={tagStyle}>
      {text}
      {onRemove && <button style={removeStyle} onClick={onRemove}>×</button>}
    </span>
  )
}

/* ─────────────────────────────────────────────
   HdsModal
   Dialog overlay with header, body, footer.
   ───────────────────────────────────────────── */
type ModalColor = 'default' | 'warning' | 'critical'

interface HdsModalProps {
  title: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  onClose?: () => void
  color?: ModalColor
  size?: 'small' | 'medium' | 'large'
}

export function HdsModal({ title, description, children, footer, onClose, color = 'default', size = 'medium' }: HdsModalProps) {
  const widthMap = { small: 400, medium: 600, large: 800 }
  const accentMap: Record<ModalColor, string> = {
    default:  T.interactive,
    warning:  T.warning,
    critical: T.error,
  }

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: T.overlay,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    fontFamily: FONT_SANS,
  }
  const dialogStyle: CSSProperties = {
    background: T.bg,
    borderRadius: T.radiusLg,
    boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
    width: widthMap[size],
    maxWidth: '90vw',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }
  const headerStyle: CSSProperties = {
    padding: '20px 24px 16px',
    borderBottom: `1px solid ${T.borderSubtle}`,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
  }
  const accentBarStyle: CSSProperties = {
    width: 4,
    borderRadius: 2,
    background: accentMap[color],
    alignSelf: 'stretch',
    minHeight: 24,
    flexShrink: 0,
  }
  const titleStyle: CSSProperties = { fontSize: 18, fontWeight: 600, color: T.textPrimary, margin: 0, flex: 1 }
  const descStyle: CSSProperties  = { fontSize: 14, color: T.textSecondary, marginTop: 4 }
  const closeStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: T.textSecondary,
    fontSize: 20,
    padding: 0,
    lineHeight: 1,
  }
  const bodyStyle: CSSProperties  = { padding: '20px 24px', overflowY: 'auto', flex: 1 }
  const footerStyle: CSSProperties = {
    padding: '16px 24px',
    borderTop: `1px solid ${T.borderSubtle}`,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
  }

  return (
    <div style={overlayStyle}>
      <div role="dialog" style={dialogStyle}>
        <div style={headerStyle}>
          <div style={accentBarStyle} />
          <div style={{ flex: 1 }}>
            <h2 style={titleStyle}>{title}</h2>
            {description && <p style={descStyle}>{description}</p>}
          </div>
          {onClose && <button style={closeStyle} onClick={onClose}>×</button>}
        </div>
        {children && <div style={bodyStyle}>{children}</div>}
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   HdsTable
   Data table with column headers and rows.
   ───────────────────────────────────────────── */
interface HdsTableProps {
  columns: string[]
  rows: ReactNode[][]
  caption?: string
}

export function HdsTable({ columns, rows, caption }: HdsTableProps) {
  const tableStyle: CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: FONT_SANS,
    fontSize: 14,
    background: T.bg,
    border: `1px solid ${T.borderSubtle}`,
    borderRadius: T.radiusMd,
    overflow: 'hidden',
  }
  const thStyle: CSSProperties = {
    padding: '10px 16px',
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 600,
    color: T.textSecondary,
    background: T.layer01,
    borderBottom: `1px solid ${T.borderSubtle}`,
    whiteSpace: 'nowrap',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
  }
  const tdStyle: CSSProperties = {
    padding: '12px 16px',
    color: T.textPrimary,
    borderBottom: `1px solid ${T.borderSubtle}`,
    verticalAlign: 'middle',
  }

  return (
    <table style={tableStyle}>
      {caption && <caption style={{ textAlign: 'left', padding: '12px 16px', fontSize: 13, color: T.textSecondary }}>{caption}</caption>}
      <thead>
        <tr>
          {columns.map((col) => <th key={col} style={thStyle}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ background: ri % 2 === 1 ? T.layer01 : T.bg }}>
            {row.map((cell, ci) => <td key={ci} style={tdStyle}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/* ─────────────────────────────────────────────
   HdsFormField
   Labeled input field with helper/error text.
   ───────────────────────────────────────────── */
interface HdsFormFieldProps {
  label: string
  placeholder?: string
  helperText?: string
  errorText?: string
  value?: string
  type?: 'text' | 'textarea' | 'password'
  required?: boolean
  disabled?: boolean
  mono?: boolean
}

export function HdsFormField({
  label,
  placeholder = '',
  helperText,
  errorText,
  value,
  type = 'text',
  required = false,
  disabled = false,
  mono = false,
}: HdsFormFieldProps) {
  const fieldStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 4, fontFamily: FONT_SANS }
  const labelStyle: CSSProperties = {
    fontSize: 13,
    fontWeight: 500,
    color: disabled ? T.textPlaceholder : T.textPrimary,
    display: 'flex',
    gap: 4,
    alignItems: 'center',
  }
  const requiredStyle: CSSProperties = { color: T.error, fontSize: 13 }
  const inputStyle: CSSProperties = {
    width: '100%',
    height: type === 'textarea' ? 'auto' : 36,
    minHeight: type === 'textarea' ? 80 : undefined,
    padding: '8px 12px',
    fontSize: 14,
    fontFamily: mono ? FONT_MONO : FONT_SANS,
    color: disabled ? T.textPlaceholder : T.textPrimary,
    background: disabled ? T.layer01 : T.bg,
    border: `1px solid ${errorText ? T.error : T.borderStrong}`,
    borderRadius: T.radiusSm,
    outline: 'none',
    resize: type === 'textarea' ? 'vertical' : undefined,
    boxSizing: 'border-box',
  }
  const helperStyle: CSSProperties = { fontSize: 12, color: T.textSecondary }
  const errorStyle: CSSProperties  = { fontSize: 12, color: T.error }

  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>
        {label}
        {required && <span style={requiredStyle}>*</span>}
      </label>
      {type === 'textarea'
        ? <textarea style={inputStyle} placeholder={placeholder} defaultValue={value} disabled={disabled} rows={4} />
        : <input style={inputStyle} type={type} placeholder={placeholder} defaultValue={value} disabled={disabled} />
      }
      {helperText && !errorText && <span style={helperStyle}>{helperText}</span>}
      {errorText && <span style={errorStyle}>{errorText}</span>}
    </div>
  )
}

/* ─────────────────────────────────────────────
   HdsTabs
   Tabbed navigation bar.
   ───────────────────────────────────────────── */
interface HdsTabsProps {
  tabs: Array<{ label: string; active?: boolean; count?: number }>
  variant?: 'underline' | 'box'
}

export function HdsTabs({ tabs, variant = 'underline' }: HdsTabsProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    gap: 0,
    borderBottom: `1px solid ${T.borderSubtle}`,
    fontFamily: FONT_SANS,
  }
  const tabStyle = (active = false): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '0 16px',
    height: 40,
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    color: active ? T.textPrimary : T.textSecondary,
    borderBottom: active
      ? `2px solid ${T.interactive}`
      : variant === 'box' ? `1px solid ${T.borderSubtle}` : '2px solid transparent',
    background: variant === 'box' && active ? T.bg : 'transparent',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    marginBottom: active ? -1 : 0,
  })
  const countStyle: CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    background: T.layer02,
    color: T.textSecondary,
    borderRadius: T.radiusSm,
    padding: '1px 5px',
  }

  return (
    <div style={containerStyle} role="tablist">
      {tabs.map((tab) => (
        <div key={tab.label} style={tabStyle(tab.active)} role="tab">
          {tab.label}
          {tab.count !== undefined && <span style={countStyle}>{tab.count}</span>}
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   HdsCodeBlock
   Formatted code display with copy affordance.
   ───────────────────────────────────────────── */
interface HdsCodeBlockProps {
  lines: string[]
  language?: string
  hasLineNumbers?: boolean
}

export function HdsCodeBlock({ lines, language, hasLineNumbers = false }: HdsCodeBlockProps) {
  const wrapperStyle: CSSProperties = {
    background: '#0e0e0e',
    borderRadius: T.radiusMd,
    overflow: 'hidden',
    fontFamily: FONT_MONO,
    fontSize: 13,
  }
  const headerBarStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6px 12px',
    background: '#1a1a1a',
    borderBottom: '1px solid #2a2a2a',
  }
  const langStyle: CSSProperties = {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: FONT_MONO,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  }
  const copyStyle: CSSProperties = {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    background: 'none',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: T.radiusSm,
    padding: '2px 8px',
    cursor: 'pointer',
    fontFamily: FONT_SANS,
  }
  const preStyle: CSSProperties = {
    margin: 0,
    padding: '16px',
    color: '#e8e8e8',
    overflowX: 'auto',
    lineHeight: 1.6,
  }
  const lineNumStyle: CSSProperties = {
    color: 'rgba(255,255,255,0.2)',
    userSelect: 'none',
    marginRight: 16,
    minWidth: 20,
    display: 'inline-block',
    textAlign: 'right',
  }

  return (
    <div style={wrapperStyle}>
      {language && (
        <div style={headerBarStyle}>
          <span style={langStyle}>{language}</span>
          <button style={copyStyle}>Copy</button>
        </div>
      )}
      <pre style={preStyle}>
        {lines.map((line, i) => (
          <div key={i}>
            {hasLineNumbers && <span style={lineNumStyle}>{i + 1}</span>}
            {line}
          </div>
        ))}
      </pre>
    </div>
  )
}

/* ─────────────────────────────────────────────
   HdsBreadcrumb
   Page-level breadcrumb trail.
   ───────────────────────────────────────────── */
interface HdsBreadcrumbProps {
  items: Array<{ label: string; href?: string }>
}

export function HdsBreadcrumb({ items }: HdsBreadcrumbProps) {
  const navStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontFamily: FONT_SANS,
    fontSize: 13,
    color: T.textSecondary,
    marginBottom: 12,
  }
  const linkStyle: CSSProperties = { color: T.interactive, cursor: 'pointer' }
  const sepStyle: CSSProperties  = { color: T.borderStrong, fontSize: 12 }

  return (
    <nav aria-label="breadcrumb" style={navStyle}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && <span style={sepStyle}>/</span>}
          {item.href
            ? <span style={linkStyle}>{item.label}</span>
            : <span style={{ color: T.textPrimary, fontWeight: 500 }}>{item.label}</span>
          }
        </span>
      ))}
    </nav>
  )
}

/* ─────────────────────────────────────────────
   HdsPageHeader
   Standard page title + description block.
   ───────────────────────────────────────────── */
interface HdsPageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  badge?: ReactNode
}

export function HdsPageHeader({ title, description, actions, badge }: HdsPageHeaderProps) {
  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
    fontFamily: FONT_SANS,
    gap: 16,
  }
  const leftStyle: CSSProperties = { flex: 1 }
  const titleRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: description ? 6 : 0,
  }
  const titleStyle: CSSProperties = {
    fontSize: 22,
    fontWeight: 700,
    color: T.textPrimary,
    margin: 0,
    lineHeight: 1.2,
  }
  const descStyle: CSSProperties = {
    fontSize: 14,
    color: T.textSecondary,
    margin: 0,
    lineHeight: 1.5,
    maxWidth: 600,
  }
  const actionsStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  }

  return (
    <div style={headerStyle}>
      <div style={leftStyle}>
        <div style={titleRowStyle}>
          <h1 style={titleStyle}>{title}</h1>
          {badge}
        </div>
        {description && <p style={descStyle}>{description}</p>}
      </div>
      {actions && <div style={actionsStyle}>{actions}</div>}
    </div>
  )
}
