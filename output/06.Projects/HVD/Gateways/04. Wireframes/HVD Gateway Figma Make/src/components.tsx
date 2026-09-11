import React, { useState, ReactNode } from 'react'

// ─── BADGE ───────────────────────────────────────────────────────────────────

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'critical' | 'offline'

const BADGE_CLS: Record<BadgeVariant, string> = {
  neutral:  'text-[#595959] border-[#CCCCCC] bg-white',
  success:  'text-[#1A7F4B] border-[#1A7F4B] bg-[#F0FAF4]',
  warning:  'text-[#8A4F00] border-[#8A4F00] bg-[#FFF8EE]',
  critical: 'text-[#5C1111] border-[#5C1111] bg-[#FFF0F0]',
  offline:  'text-[#5C1111] border-[#CCCCCC] bg-[#F9F9F9]',
}

export function Badge({ variant = 'neutral', children }: { variant?: BadgeVariant; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium border rounded-[3px] leading-none whitespace-nowrap ${BADGE_CLS[variant]}`}>
      {children}
    </span>
  )
}

// ─── BUTTON ──────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'critical' | 'tertiary'

const BTN_CLS: Record<ButtonVariant, string> = {
  primary:   'bg-[#1060FF] text-white border border-[#0C56E9] hover:bg-[#0A52E0] active:bg-[#0847C7]',
  secondary: 'bg-[#FAFAFA] text-[#3B3D45] border border-[#3B3D45]/40 hover:bg-[#F0F0F0] active:bg-[#E8E8E8]',
  critical:  'bg-[#fff5f5] text-[#c00005] border border-[#c00005] hover:bg-[#ffe8e8] active:bg-[#ffd6d6]',
  tertiary:  'bg-transparent text-[#1060D0] border-none hover:underline !px-0 !py-0',
}

export function Button({
  variant = 'primary',
  onClick,
  children,
  className = '',
  size = 'default',
}: {
  variant?: ButtonVariant
  onClick?: () => void
  children: ReactNode
  className?: string
  size?: 'default' | 'sm'
}) {
  const pad = size === 'sm' ? 'px-3 py-1.5 text-[12px]' : 'px-[18px] py-[10px] text-[14px]'
  return (
    <button
      className={`${pad} rounded-[5px] font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${BTN_CLS[variant]} ${className}`}
      style={variant === 'critical' ? { boxShadow: '0px 1px 0.5px rgba(101,106,118,0.05), 0px 2px 1px rgba(101,106,118,0.05)' } : undefined}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// ─── ALERT ───────────────────────────────────────────────────────────────────

export type AlertVariant = 'neutral' | 'warning' | 'success'

const ALERT_CFG: Record<AlertVariant, { borderColor: string; iconColor: string; iconPath: string }> = {
  neutral: {
    borderColor: 'rgba(59,61,69,0.4)',
    iconColor: '#656A76',
    iconPath: 'M9.166 0C14.229 0 18.333 4.104 18.333 9.166c0 5.063-4.104 9.167-9.167 9.167C4.104 18.333 0 14.229 0 9.166.0002 4.104 4.104.0002 9.166 0zm0 1.25C4.794 1.25 1.25 4.794 1.25 9.166c0 4.372 3.544 7.917 7.916 7.917 4.372 0 7.917-3.545 7.917-7.917C17.083 4.794 13.538 1.25 9.166 1.25zm0 6.666c.345 0 .625.28.625.625v4.584a.625.625 0 0 1-1.25 0V8.541c0-.345.28-.625.625-.625zm.009-2.916c.46 0 .833.372.833.833 0 .46-.373.833-.833.833h-.009a.833.833 0 0 1 0-1.666h.009z',
  },
  warning: {
    borderColor: '#8A4F00',
    iconColor: '#8A4F00',
    iconPath: 'M9.166 0C14.229 0 18.333 4.104 18.333 9.166c0 5.063-4.104 9.167-9.167 9.167C4.104 18.333 0 14.229 0 9.166.0002 4.104 4.104.0002 9.166 0zm0 1.25C4.794 1.25 1.25 4.794 1.25 9.166c0 4.372 3.544 7.917 7.916 7.917 4.372 0 7.917-3.545 7.917-7.917C17.083 4.794 13.538 1.25 9.166 1.25zm0 6.666c.345 0 .625.28.625.625v4.584a.625.625 0 0 1-1.25 0V8.541c0-.345.28-.625.625-.625zm.009-2.916c.46 0 .833.372.833.833 0 .46-.373.833-.833.833h-.009a.833.833 0 0 1 0-1.666h.009z',
  },
  success: {
    borderColor: '#1A7F4B',
    iconColor: '#1A7F4B',
    iconPath: 'M9.166 0C14.229 0 18.333 4.104 18.333 9.166c0 5.063-4.104 9.167-9.167 9.167C4.104 18.333 0 14.229 0 9.166.0002 4.104 4.104.0002 9.166 0zm0 1.25C4.794 1.25 1.25 4.794 1.25 9.166c0 4.372 3.544 7.917 7.916 7.917 4.372 0 7.917-3.545 7.917-7.917C17.083 4.794 13.538 1.25 9.166 1.25zm4.03 4.72a.625.625 0 0 1 0 .884L8.02 12.02a.625.625 0 0 1-.884 0L4.97 9.854a.625.625 0 0 1 .884-.884l1.724 1.724 4.734-4.724a.625.625 0 0 1 .884 0z',
  },
}

export function Alert({
  variant = 'neutral',
  title,
  description,
}: {
  variant?: AlertVariant
  title: string
  description?: string
}) {
  const c = ALERT_CFG[variant]
  return (
    <div
      className="relative flex gap-3 items-start pl-12 pr-4 py-4 w-full"
      style={{ background: '#FAFAFA', borderBottom: `1px solid ${c.borderColor}` }}
    >
      <div className="flex-shrink-0 w-5 h-5 mt-px">
        <svg viewBox="0 0 18.333 18.333" fill="none" width="20" height="20">
          <path d={c.iconPath} fill={c.iconColor} />
        </svg>
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-[#3B3D45] leading-5">{title}</p>
        {description && (
          <p className="text-[14px] text-[#3B3D45] leading-5">{description}</p>
        )}
      </div>
    </div>
  )
}

// ─── CARD ─────────────────────────────────────────────────────────────────────

export function Card({
  children,
  className = '',
  padding = 'p-5',
}: {
  children: ReactNode
  className?: string
  padding?: string
}) {
  return (
    <div className={`bg-white border border-[#E5E5E5] rounded-[6px] ${padding} ${className}`}>
      {children}
    </div>
  )
}

// ─── FORM FIELD ───────────────────────────────────────────────────────────────

export function FormField({
  label,
  required,
  type = 'text',
  placeholder,
  helper,
  mono,
  value = '',
  onChange,
}: {
  label: string
  required?: boolean
  type?: 'text' | 'password' | 'textarea'
  placeholder?: string
  helper?: string
  mono?: boolean
  value?: string
  onChange?: (v: string) => void
}) {
  const inputCls = `w-full bg-[#F9F9F9] border border-[#CCCCCC] rounded-[4px] px-3 py-[9px] text-[14px] text-[#1A1A1A] placeholder-[#AAAAAA] focus:outline-none focus:border-[#1A1A1A] transition-colors ${mono ? 'font-mono text-[13px]' : ''}`
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#1A1A1A] flex items-center gap-0.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          className={`${inputCls} resize-none`}
          placeholder={placeholder}
          style={{ height: 88 }}
          value={value}
          onChange={e => onChange?.(e.target.value)}
        />
      ) : (
        <input
          type={type === 'password' ? 'password' : 'text'}
          className={inputCls}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
        />
      )}
      {helper && (
        <p className="text-[12px] text-[#737373] leading-[1.5]">{helper}</p>
      )}
    </div>
  )
}

// ─── RADIO CARD ───────────────────────────────────────────────────────────────

export function RadioCard({
  title,
  description,
  selected,
  onClick,
}: {
  title: string
  description: string
  selected?: boolean
  onClick?: () => void
}) {
  return (
    <div
      className={`flex-1 p-4 rounded-[6px] cursor-pointer transition-all ${selected ? 'border-2 border-[#1A1A1A] bg-[#F8F8F8]' : 'border-2 border-[#CCCCCC] bg-white hover:border-[#999]'}`}
      onClick={onClick}
    >
      <div className="flex gap-3">
        <div
          className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selected ? 'border-[#1A1A1A]' : 'border-[#CCCCCC]'}`}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-[#1A1A1A]" />}
        </div>
        <div>
          <p className="text-[14px] font-semibold text-[#1A1A1A] mb-1">{title}</p>
          <p className="text-[13px] text-[#595959] leading-[1.6]">{description}</p>
        </div>
      </div>
    </div>
  )
}

// ─── CODE BLOCK ───────────────────────────────────────────────────────────────

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="relative bg-[#1A1A1A] rounded-[6px] px-4 py-3.5 mb-5">
      <button
        className="absolute top-2.5 right-3.5 text-[11px] text-[#888] hover:text-white transition-colors cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(code).catch(() => {})
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="text-[#F0F0F0] text-[12.5px] font-mono leading-[1.7] overflow-x-auto whitespace-pre">
        {code}
      </pre>
    </div>
  )
}

// ─── TABS ─────────────────────────────────────────────────────────────────────

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
}) {
  return (
    <div className="flex border-b border-[#E5E5E5] mb-5">
      {tabs.map(t => (
        <button
          key={t.id}
          className={`px-4 py-2.5 text-[14px] cursor-pointer border-b-2 -mb-px transition-all ${active === t.id ? 'border-[#1A1A1A] font-semibold text-[#1A1A1A]' : 'border-transparent font-normal text-[#595959] hover:text-[#1A1A1A]'}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

// ─── STEP INDICATOR ───────────────────────────────────────────────────────────

const TRACK_GRAY = "linear-gradient(90deg, rgba(101,106,118,0.2) 0%, rgba(101,106,118,0.2) 100%), linear-gradient(90deg, rgb(255,255,255) 0%, rgb(255,255,255) 100%)"
const HEX_A_FILL = "M4.16383 5.80716L11.1537 1.38703C11.9689 0.871533 13.0079 0.870949 13.8236 1.38553L20.8338 5.80749C21.5597 6.2654 22 7.06368 22 7.92196V15.1643C22 16.0226 21.5597 16.8208 20.8338 17.2788L13.8236 21.7007C13.0079 22.2153 11.9689 22.2147 11.1537 21.6992L4.16383 17.2791C3.43926 16.8209 3 16.0234 3 15.1661V7.92013C3 7.06284 3.43927 6.26535 4.16383 5.80716Z"
const HEX_A_STROKE = "M10.8867 0.964031C11.8649 0.345675 13.112 0.345639 14.0908 0.963054L21.1006 5.38493C21.9716 5.93444 22.5 6.89217 22.5 7.92204V15.1642C22.5 16.1941 21.9716 17.1518 21.1006 17.7013L14.0908 22.1232C13.112 22.7406 11.8649 22.7406 10.8867 22.1222L3.89648 17.7013C3.02716 17.1515 2.50002 16.1948 2.5 15.1662V7.92009C2.50001 6.89146 3.02716 5.93478 3.89648 5.38493L10.8867 0.964031Z"
const HEX_I_FILL = "M2.16383 5.80716L9.15368 1.38703C9.96887 0.871533 11.0079 0.870949 11.8236 1.38553L18.8338 5.80749C19.5597 6.2654 20 7.06368 20 7.92196V15.1643C20 16.0226 19.5597 16.8208 18.8338 17.2788L11.8236 21.7007C11.0079 22.2153 9.96887 22.2147 9.15368 21.6992L2.16383 17.2791C1.43926 16.8209 1 16.0234 1 15.1661V7.92013C1 7.06284 1.43927 6.26535 2.16383 5.80716Z"
const HEX_I_STROKE = "M8.88672 0.964031C9.86488 0.345675 11.112 0.345639 12.0908 0.963054L19.1006 5.38493C19.9716 5.93444 20.5 6.89217 20.5 7.92204V15.1642C20.5 16.1941 19.9716 17.1518 19.1006 17.7013L12.0908 22.1232C11.112 22.7406 9.86489 22.7406 8.88672 22.1222L1.89648 17.7013C1.02716 17.1515 0.500022 16.1948 0.5 15.1662V7.92009C0.500015 6.89146 1.02716 5.93478 1.89648 5.38493L8.88672 0.964031Z"

export function StepIndicator({
  current,
  steps = [],
}: {
  current: number
  steps?: string[]
}) {
  const total = steps.length
  return (
    <div className="pb-4 mb-6" style={{ borderBottom: '1px solid #E5E5E5' }}>
      <div className="content-stretch flex isolate items-start relative">
        {steps.map((label, i) => {
          const n = i + 1
          const isActive = n === current
          const isDone = n < current
          const zIndex = total - i + 2
          return (
            <div key={i} className="flex-[1_0_0] min-w-px relative self-stretch" style={{ zIndex }}>
              <div className="flex flex-col items-center size-full">
                <div className="content-stretch flex flex-col gap-[4px] items-center relative size-full">
                  {/* Label contents */}
                  <div className="relative rounded-bl-[6px] rounded-br-[6px] shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[4px] items-start pb-[12px] pt-[16px] px-[8px] relative size-full">
                      <p
                        className="text-[14px] font-semibold leading-5 text-center w-full"
                        style={{ color: isActive ? '#1060FF' : '#656A76' }}
                      >
                        {label}
                      </p>
                    </div>
                  </div>

                  {/* Track */}
                  {isActive ? (
                    <div
                      className="absolute content-stretch flex items-start left-[-3px] right-[-3px] rounded-[3px] top-[-2px]"
                      style={{ backgroundImage: TRACK_GRAY }}
                    >
                      <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative">
                        <div className="bg-[#1060ff] flex-[1_0_0] h-[4px] min-w-px relative rounded-[3px]" />
                        <div className="h-[4px] relative rounded-[3px] shrink-0 w-[16px]" />
                      </div>
                      <div className="flex-[1_0_0] h-[4px] min-w-px relative" />
                    </div>
                  ) : isDone ? (
                    <div className="absolute h-[4px] left-[-3px] right-[-3px] rounded-[3px] top-[-2px] bg-[#1060FF]" />
                  ) : (
                    <div
                      className="absolute h-[4px] left-[-3px] right-[-3px] rounded-[3px] top-[-2px]"
                      style={{ backgroundImage: TRACK_GRAY }}
                    />
                  )}

                  {/* Badge */}
                  <div
                    className="-translate-x-1/2 absolute drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)] left-[calc(50%-0.5px)] size-[24px] top-[-12px]"
                  >
                    <div className="absolute inset-[4.17%_10.42%]">
                      {(isActive || isDone) ? (
                        <div className="absolute inset-[-2.47%_-15.79%_-20.65%_-15.79%]">
                          <svg className="block size-full" fill="none" height="27.0863" preserveAspectRatio="none" viewBox="0 0 25 27.0863" width="25">
                            <g filter={`url(#hex-filter-${n})`}>
                              <path d={HEX_A_FILL} fill="#1060FF" />
                              <path d={HEX_A_STROKE} stroke="#0C56E9" />
                            </g>
                            <defs>
                              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="27.0863" id={`hex-filter-${n}`} width="25" x="0" y="0">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feOffset dy="2" /><feGaussianBlur stdDeviation="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.396078 0 0 0 0 0.415686 0 0 0 0 0.462745 0 0 0 0.05 0" />
                                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
                                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feOffset dy="1" /><feGaussianBlur stdDeviation="0.5" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.396078 0 0 0 0 0.415686 0 0 0 0 0.462745 0 0 0 0.05 0" />
                                <feBlend in2="effect1_dropShadow" mode="normal" result="effect2_dropShadow" />
                                <feBlend in="SourceGraphic" in2="effect2_dropShadow" mode="normal" result="shape" />
                              </filter>
                            </defs>
                          </svg>
                        </div>
                      ) : (
                        <div className="absolute inset-[-2.47%_-5.26%]">
                          <svg className="block size-full" fill="none" height="23.0863" preserveAspectRatio="none" viewBox="0 0 21 23.0863" width="21">
                            <path d={HEX_I_FILL} fill="white" />
                            <path d={HEX_I_STROKE} stroke="#3B3D45" strokeOpacity="0.4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div
                      className="absolute flex flex-col inset-[12.5%_35.42%] justify-center leading-none text-[13px] font-medium text-center whitespace-nowrap"
                      style={{ color: isActive || isDone ? 'white' : '#3B3D45' }}
                    >
                      <p className="leading-[18px]">{n}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── NETWORK CARD ─────────────────────────────────────────────────────────────

export function NetworkCard({
  title,
  badge,
  description,
  onEdit,
}: {
  title: string
  badge: { variant: BadgeVariant; label: string }
  description: string
  onEdit?: () => void
}) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[6px] p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[14px] font-semibold text-[#1A1A1A]">{title}</span>
        <Badge variant={badge.variant}>{badge.label}</Badge>
      </div>
      <p className="text-[13px] text-[#595959] leading-[1.6]">{description}</p>
      {onEdit && (
        <button
          className="text-[13px] text-[#1060D0] hover:underline cursor-pointer mt-2"
          onClick={onEdit}
        >
          Edit →
        </button>
      )}
    </div>
  )
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────

export function EmptyState({
  icon = '⬡',
  title,
  description,
  cta,
}: {
  icon?: string
  title: string
  description: string
  cta?: { label: string; onClick?: () => void }
}) {
  return (
    <div className="border border-dashed border-[#CCCCCC] rounded-[6px] bg-white flex flex-col items-center justify-center py-16 px-8 text-center mt-2">
      <div className="w-12 h-12 border border-[#E5E5E5] rounded-[6px] flex items-center justify-center text-[22px] text-[#737373] mb-4">
        {icon}
      </div>
      <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-2">{title}</h3>
      <p className="text-[14px] text-[#595959] max-w-[360px] mb-5 leading-[1.6]">{description}</p>
      {cta && <Button variant="primary" onClick={cta.onClick}>{cta.label}</Button>}
    </div>
  )
}

// ─── DATAPLANE HEALTH STRIP ───────────────────────────────────────────────────

export function DataplaneHealthStrip({ azs }: { azs: string[] }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[6px] px-4 py-2.5 flex flex-wrap items-center gap-2">
      <span className="text-[12px] font-semibold text-[#737373] mr-1">
        Dataplane Gateways
      </span>
      {azs.map(az => (
        <div
          key={az}
          className="flex items-center gap-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded-[4px] px-2.5 py-1 text-[12px]"
        >
          <span className="text-[11px] font-bold text-[#1A7F4B]">✓</span>
          <span className="text-[#595959]">{az}</span>
        </div>
      ))}
    </div>
  )
}

// ─── DESCRIPTION LIST ─────────────────────────────────────────────────────────

export function DescriptionList({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <div className="divide-y divide-[#E5E5E5]">
      {items.map((item, i) => (
        <div key={i} className="grid py-3" style={{ gridTemplateColumns: '160px 1fr', gap: 8 }}>
          <span className="text-[12px] text-[#737373] leading-[1.6]">{item.label}</span>
          <div className="text-[13px] text-[#1A1A1A]">{item.value}</div>
        </div>
      ))}
    </div>
  )
}

// ─── VIEW TOGGLE ──────────────────────────────────────────────────────────────

export function ViewToggle({
  options,
  active,
  onChange,
}: {
  options: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
}) {
  return (
    <div className="flex border border-[#CCCCCC] rounded-[5px] overflow-hidden">
      {options.map((opt, i) => (
        <button
          key={opt.id}
          className={`px-3.5 py-[7px] text-[13px] font-medium cursor-pointer transition-colors ${active === opt.id ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#595959] hover:bg-[#F5F5F5]'} ${i > 0 ? 'border-l border-[#CCCCCC]' : ''}`}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ─── DISCLOSURE ───────────────────────────────────────────────────────────────

export function Disclosure({
  label = 'Show advanced options',
  children,
}: {
  label?: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        className="text-[13px] text-[#1060D0] hover:underline cursor-pointer flex items-center gap-1"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[10px]">{open ? '▾' : '▸'}</span>
        <span>{open ? 'Hide advanced options' : label}</span>
      </button>
      {open && (
        <div className="mt-4 border border-[#E5E5E5] rounded-[6px] px-5 py-4">
          {children}
        </div>
      )}
    </div>
  )
}

// ─── BREADCRUMB ───────────────────────────────────────────────────────────────

export function Breadcrumb({
  items,
}: {
  items: { label: string; onClick?: () => void }[]
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 text-[12px] mb-4">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="text-[#999]">/</span>}
          {i === items.length - 1 ? (
            <span className="text-[#1A1A1A]">{item.label}</span>
          ) : (
            <button
              className="text-[#1060D0] hover:underline cursor-pointer"
              onClick={item.onClick}
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

export function Modal({
  title,
  topBorderColor,
  children,
  onClose,
}: {
  title: string
  topBorderColor?: string
  children: ReactNode
  onClose?: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative rounded-[8px] max-h-[90vh] overflow-y-auto flex flex-col items-start"
        style={{
          width: 600,
          minWidth: 600,
          maxWidth: 600,
          padding: 0,
          gap: 0,
          background: '#FFFFFF',
          boxShadow: '0 12px 24px rgba(59,61,69,0.35), 0 2px 3px rgba(59,61,69,0.25), 0 0 0 1px rgba(59,61,69,0.25)',
          ...(topBorderColor ? { borderTop: `3px solid ${topBorderColor}` } : {}),
        }}
      >
        <div
          className="w-full flex items-center justify-between px-6 py-4"
          style={{ background: '#FAFAFA', borderBottom: '1px solid rgba(101,106,118,0.2)' }}
        >
          <h2 className="text-[18px] font-bold text-[#0C0C0E]">{title}</h2>
          <button
            className="text-[#656A76] hover:text-[#0C0C0E] cursor-pointer leading-none flex items-center justify-center w-6 h-6"
            onClick={onClose}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
