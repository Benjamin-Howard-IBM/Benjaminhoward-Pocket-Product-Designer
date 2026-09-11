import { useState, useEffect, useRef } from 'react'
import svgPaths from '@/imports/StepperList/svg-hvu7a3g4se'
import {
  Badge, BadgeVariant, Button, Alert, Card, FormField, RadioCard,
  CodeBlock, Tabs, StepIndicator, NetworkCard, EmptyState,
  DataplaneHealthStrip, DescriptionList, ViewToggle, Disclosure,
  Breadcrumb, Modal,
} from './components'

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = 'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8' | 'S9'
type ModalKind = null | 'enable-gateways'
type S7State = 'pending' | 'connected' | 'failed'
type S8View = 'table' | 'topology'
type S9Site = string
type DeployModel = 'binary' | 'docker'

interface AppState {
  screen: Screen
  modal: ModalKind
  deployModel: DeployModel
  s7State: S7State
  s8View: S8View
  s9Site: S9Site
  gatewaysEnabled: boolean
}

const DAY0: AppState = {
  screen: 'S0',
  modal: null,
  deployModel: 'binary',
  s7State: 'pending',
  s8View: 'table',
  s9Site: 'nyc-prod',
  gatewaysEnabled: false,
}

const DAYN: AppState = {
  screen: 'S0',
  modal: null,
  deployModel: 'binary',
  s7State: 'connected',
  s8View: 'table',
  s9Site: 'nyc-prod',
  gatewaysEnabled: true,
}

type Nav = (updates: Partial<AppState>) => void

// ─── Shell: AppHeader ─────────────────────────────────────────────────────────

function AppHeader({ gatewaysEnabled, onScenario }: { gatewaysEnabled: boolean; onScenario: (enabled: boolean) => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-12 flex items-center px-4 gap-3" style={{ background: '#1A1A1A' }}>
      <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0" style={{ background: '#FFDE5A' }}>
        <span className="text-[11px] font-bold text-[#1A1A1A]">HC</span>
      </div>
      <div className="px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer" style={{ background: '#333', color: '#fff', fontSize: 13 }}>
        default-project <span style={{ color: '#999' }}>▾</span>
      </div>
      <div className="flex-1" />
      {/* Prototype scenario switcher */}
      <div className="flex items-center gap-1.5 mr-3">
        <span className="text-[11px] text-[#777]">Scenario</span>
        <div className="flex border border-[#444] rounded overflow-hidden">
          <button
            onClick={() => onScenario(false)}
            className={`px-2.5 py-1 text-[11px] font-medium cursor-pointer transition-colors ${!gatewaysEnabled ? 'bg-[#FFDE5A] text-[#1A1A1A]' : 'bg-transparent text-[#999] hover:text-white'}`}
          >
            Day 0
          </button>
          <button
            onClick={() => onScenario(true)}
            className={`px-2.5 py-1 text-[11px] font-medium cursor-pointer transition-colors border-l border-[#444] ${gatewaysEnabled ? 'bg-[#FFDE5A] text-[#1A1A1A]' : 'bg-transparent text-[#999] hover:text-white'}`}
          >
            Day N
          </button>
        </div>
      </div>
      <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-[11px] font-bold text-white cursor-pointer select-none">
        AB
      </div>
    </header>
  )
}

// ─── Shell: AppSideNav ────────────────────────────────────────────────────────

function NavItem({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left py-2.5 text-[14px] rounded cursor-pointer transition-colors ${
        active
          ? 'font-semibold text-[#1A1A1A] bg-[#F5F5F5] border-l-[3px] border-l-[#1A1A1A] pl-[9px] pr-3'
          : 'text-[#595959] hover:bg-[#F5F5F5] hover:text-[#1A1A1A] px-3'
      }`}
    >
      {label}
    </button>
  )
}

function AppSideNav({ navigate, screen }: { navigate: Nav; screen: Screen }) {
  const networkingScreens: Screen[] = ['S0', 'S1', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9']
  const isNetworking = networkingScreens.includes(screen)
  return (
    <nav className="fixed top-12 left-0 bottom-0 w-56 bg-white border-r border-[#E5E5E5] flex flex-col overflow-y-auto z-30">
      <div className="p-4">
        <button className="text-[13px] text-[#1060D0] hover:underline cursor-pointer mb-3 block text-left">
          ← Back to Vault Dedicated
        </button>
        <p className="text-[11px] text-[#737373] font-medium mb-2 px-3">
          vault-cluster
        </p>
        <NavItem label="Overview" active={false} onClick={() => {}} />
        <NavItem label="Replication" active={false} onClick={() => {}} />
        <p className="text-[11px] text-[#737373] font-medium mt-4 mb-2 px-3">
          Manage
        </p>
        <NavItem label="Integrations" active={false} onClick={() => {}} />
        <NavItem label="Networking" active={isNetworking} onClick={() => navigate({ screen: 'S0' })} />
      </div>
    </nav>
  )
}

// ─── Layout wrapper ───────────────────────────────────────────────────────────

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ marginLeft: 224, paddingTop: 48, background: '#FFFFFF' }}>
      <div className="px-10 py-6">{children}</div>
    </div>
  )
}

// ─── S0: Networking overview ──────────────────────────────────────────────────

function S0({ navigate, state }: { navigate: Nav; state: AppState }) {
  return (
    <Layout>
      <Breadcrumb items={[
        { label: 'cizh-org' }, { label: 'default-project' }, { label: 'Vault Dedicated' },
        { label: 'vault-cluster' }, { label: 'Cluster networking' },
      ]} />

      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-[6px] relative" style={{ background: '#fff9cf' }}>
          <div className="absolute inset-[8px]">
            <svg viewBox="0 0 19.5 19" fill="none" className="absolute inset-0 w-full h-full">
              <path clipRule="evenodd" fillRule="evenodd" fill="#9A6F00" d="M8 0C7.0335 0 6.25 0.783502 6.25 1.75V5.25C6.25 6.2165 7.0335 7 8 7H8.75V8.5H0.75C0.335786 8.5 0 8.83579 0 9.25C0 9.66421 0.335786 10 0.75 10H4.25V12H3C2.0335 12 1.25 12.7835 1.25 13.75V17.25C1.25 18.2165 2.0335 19 3 19H6.5C7.4665 19 8.25 18.2165 8.25 17.25V13.75C8.25 12.7835 7.4665 12 6.5 12H5.75V10H13.75V12H13C12.0335 12 11.25 12.7835 11.25 13.75V17.25C11.25 18.2165 12.0335 19 13 19H16.5C17.4665 19 18.25 18.2165 18.25 17.25V13.75C18.25 12.7835 17.4665 12 16.5 12H15.25V10H18.75C19.1642 10 19.5 9.66421 19.5 9.25C19.5 8.83579 19.1642 8.5 18.75 8.5H10.25V7H11.5C12.4665 7 13.25 6.2165 13.25 5.25V1.75C13.25 0.783502 12.4665 0 11.5 0H8ZM7.75 1.75C7.75 1.61193 7.86193 1.5 8 1.5H11.5C11.6381 1.5 11.75 1.61193 11.75 1.75V5.25C11.75 5.38807 11.6381 5.5 11.5 5.5H8C7.86193 5.5 7.75 5.38807 7.75 5.25V1.75ZM2.75 13.75C2.75 13.6119 2.86193 13.5 3 13.5H6.5C6.63807 13.5 6.75 13.6119 6.75 13.75V17.25C6.75 17.3881 6.63807 17.5 6.5 17.5H3C2.86193 17.5 2.75 17.3881 2.75 17.25V13.75ZM13 13.5C12.8619 13.5 12.75 13.6119 12.75 13.75V17.25C12.75 17.3881 12.8619 17.5 13 17.5H16.5C16.6381 17.5 16.75 17.3881 16.75 17.25V13.75C16.75 13.6119 16.6381 13.5 16.5 13.5H13Z" />
            </svg>
          </div>
        </div>
        <h1 className="text-[28px] font-bold text-[#1A1A1A]">Networking</h1>
      </div>

      <div className="grid gap-8" style={{ gridTemplateColumns: '1fr 1fr', maxWidth: 1100 }}>
        <div>
          <h2 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">Connection security</h2>
          <div className="flex flex-col gap-3">
            <NetworkCard title="Cluster accessibility" badge={{ variant: 'success', label: 'Public' }} description="Cluster is accessible over the public internet." onEdit={() => {}} />
            <NetworkCard title="IP Allow list" badge={{ variant: 'success', label: '13 IP addresses allowed' }} description="Allow only specific source IP(s) to connect to the cluster's public network endpoint." onEdit={() => {}} />
            <NetworkCard title="Proxy" badge={{ variant: 'success', label: 'Enabled' }} description="Identity-based public proxy address managed by HCP which only allows connections to the cluster from authorized HCP identities." onEdit={() => {}} />
            <NetworkCard
              title="Gateway"
              badge={state.gatewaysEnabled
                ? { variant: 'success', label: 'Enabled • 3 sites' }
                : { variant: 'neutral', label: 'Disabled' }}
              description="Connect your private network sites to HCP Vault using encrypted tunnels."
              onEdit={() => navigate({ screen: state.gatewaysEnabled ? 'S8' : 'S1' })}
            />
          </div>
        </div>
        <div>
          <h2 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">Communication setup</h2>
          <div className="flex flex-col gap-3">
            <NetworkCard title="HVN" badge={{ variant: 'success', label: 'Active' }} description="HashiCorp Virtual Network is in use for this cluster." onEdit={() => {}} />
            <NetworkCard title="Private link" badge={{ variant: 'success', label: '2/2 Active' }} description="Your own DNS server(s) are used for name resolution for certain domains." onEdit={() => {}} />
            <NetworkCard title="Custom DNS forwarding" badge={{ variant: 'warning', label: '3/4 Active' }} description="Your own DNS server(s) are used for name resolution for certain domains." onEdit={() => {}} />
            <NetworkCard title="Custom domain" badge={{ variant: 'success', label: 'Enabled' }} description={'Domain name to your cluster is customized to "databucks.com"'} onEdit={() => {}} />
          </div>
        </div>
      </div>

    </Layout>
  )
}

// ─── SetupStepper (uses StepperList import design) ───────────────────────────

const SETUP_STEPS = [
  {
    title: 'Enable gateways',
    description: 'Deploy one dataplane gateway to each availability zone (AZ).',
  },
  {
    title: 'Configure routing',
    description: 'Set up a routing table to direct traffic from each AZ to specific sites.',
  },
  {
    title: 'Connect your network',
    description: 'Prepare your network and deploy a site gateway for each private network.',
  },
]

function SetupStepper() {
  return (
    <div className="relative w-full" style={{ maxWidth: 480 }}>
      <div className="flex flex-col items-start">
        {SETUP_STEPS.map((step, i) => {
          const isFirst = i === 0
          const isLast = i === SETUP_STEPS.length - 1
          const num = String(i + 1)
          return (
            <div key={i} className="relative shrink-0 w-full">
              <div className="content-stretch flex gap-[8px] items-start relative w-full">
                {/* Vertical connector line running down through the step */}
                {!isLast && (
                  <div
                    className="absolute bottom-[-2px] left-[11px] rounded-[3px] top-px w-[2px]"
                    style={{ backgroundImage: 'linear-gradient(90deg, rgba(101, 106, 118, 0.2) 0%, rgba(101, 106, 118, 0.2) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)' }}
                  />
                )}

                {/* Hexagon indicator */}
                <div className="drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)] relative shrink-0 size-[24px]">
                  <div className="absolute inset-[4.17%_10.42%]">
                    {isFirst ? (
                      <div className="absolute inset-[-2.47%_-15.79%_-20.65%_-15.79%]">
                        <svg className="block size-full" fill="none" height="27.0863" preserveAspectRatio="none" viewBox="0 0 25 27.0863" width="25">
                          <g filter="url(#stepper-filter-active)" id="HexagonActive">
                            <path d={svgPaths.p11434d00} fill="#0C0C0E" />
                            <path d={svgPaths.p37381df0} stroke="#0C0C0E" />
                          </g>
                          <defs>
                            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="27.0863" id="stepper-filter-active" width="25" x="0" y="0">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                              <feOffset dy="2" />
                              <feGaussianBlur stdDeviation="1" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.396078 0 0 0 0 0.415686 0 0 0 0 0.462745 0 0 0 0.05 0" />
                              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
                              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                              <feOffset dy="1" />
                              <feGaussianBlur stdDeviation="0.5" />
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
                          <g id="HexagonInactive">
                            <path d={svgPaths.p10abff70} fill="white" />
                            <path d={svgPaths.p18b5c000} stroke="#3B3D45" strokeOpacity="0.4" />
                          </g>
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Step number */}
                  <div
                    className={`[word-break:break-word] absolute flex flex-col inset-[12.5%_35.42%] justify-center leading-[0] not-italic text-[13px] text-center whitespace-nowrap ${isFirst ? 'text-white' : 'text-[#3b3d45]'}`}
                    style={{ fontFamily: "'SF UI Text', Inter, sans-serif", fontWeight: 500 }}
                  >
                    <p className="leading-[18px]">{num}</p>
                  </div>
                </div>

                {/* Step content */}
                <div className={`content-stretch flex flex-1 flex-col gap-[8px] items-start min-w-px pt-[2px] relative ${isLast ? '' : 'pb-[16px]'}`}>
                  <div className="flex flex-col gap-[4px] items-start w-full">
                    <p className="text-[#0c0c0e] text-[14px] leading-[20px]" style={{ fontWeight: 600 }}>
                      {step.title}
                    </p>
                    <p className="text-[#3b3d45] text-[13px] leading-[18px]" style={{ fontWeight: 400 }}>
                      {step.description}
                    </p>
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

// ─── S1: Gateways landing (disabled) ─────────────────────────────────────────

function DiagramNode({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-14 h-14 bg-white border border-[#E5E5E5] rounded-[6px] flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <span className="text-[10px] font-semibold text-[#737373] text-center leading-tight">{label}</span>
    </div>
  )
}

function DiagramArrow({ dashed = false, color = '#B08000' }: { dashed?: boolean; color?: string }) {
  const w = 64;
  return (
    <div className="flex items-center flex-shrink-0" style={{ width: w }}>
      <svg width={w} height="12" viewBox={`0 0 ${w} 12`} fill="none">
        <line x1="0" y1="6" x2={w - 8} y2="6" stroke={color} strokeWidth="1.5"
          strokeDasharray={dashed ? '4 3' : undefined} />
        <path d={`M${w - 10} 2 L${w - 4} 6 L${w - 10} 10`} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function DiagramArrowVertical({ dashed = false, color = '#CCCCCC' }: { dashed?: boolean; color?: string }) {
  const h = 52;
  return (
    <div className="flex justify-center flex-shrink-0" style={{ height: h }}>
      <svg width="12" height={h} viewBox={`0 0 12 ${h}`} fill="none">
        <line x1="6" y1="0" x2="6" y2={h - 8} stroke={color} strokeWidth="1.5"
          strokeDasharray={dashed ? '4 3' : undefined} />
        <path d={`M2 ${h - 10} L6 ${h - 4} L10 ${h - 10}`} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function ArchDiagram() {
  return (
    <svg viewBox="0 0 643 262" width="100%" style={{ display: 'block' }} className="select-none">

        {/* ── Panel borders ── */}
        <rect x="0.75" y="0.75" width="342.5" height="248.5" rx="3.25" stroke="#D2D4DB" strokeWidth="1.5" fill="none" />
        <rect x="363.25" y="0.75" width="278.5" height="248.5" rx="3.25" stroke="#D2D4DB" strokeWidth="1.5" fill="none" />

        {/* ── Panel labels at bottom ── */}
        <rect x="12" y="239" width="192" height="12" fill="white" />
        <path d="M21.5 246.5L18 244.5L21.5 242.5L25 244.5L21.5 246.5Z M18 248.5L21.5 250.5L25 248.5 M18 246.5L21.5 248.5L25 246.5" stroke="#9194A0" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="30" y="249" fontSize="8.5" fontWeight="700" fill="#9194A0" letterSpacing="1.2" fontFamily="system-ui,sans-serif">VAULT DATAPLANE NETWORK</text>

        <rect x="374.5" y="239" width="143" height="12" fill="white" />
        <path d="M383.5 246.5L380.5 244.5L383.5 242.5L386.5 244.5L383.5 246.5Z M380.5 248.5L383.5 250.5L386.5 248.5 M380.5 246.5L383.5 248.5L386.5 246.5" stroke="#9194A0" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="392.5" y="249" fontSize="8.5" fontWeight="700" fill="#9194A0" letterSpacing="1.2" fontFamily="system-ui,sans-serif">YOUR NETWORK SITE</text>

        {/* ── Arrows ── */}

        {/* L-shaped: Vault Node top-center → UP → RIGHT → VPC Default Gateways (FFCF25 yellow dashed) */}
        <path d="M46 147 V56 H118" stroke="#FFCF25" strokeWidth="1.5" strokeDasharray="4 3" fill="none" strokeLinejoin="round" />
        <path d="M108 50 L118 56 L108 62" stroke="#FFCF25" strokeWidth="1.5" fill="none" strokeLinejoin="round" />

        {/* VPC Default Gateways → Dataplane Gateway (exits right side just below VPC RT arrow, goes right then down) */}
        <path d="M174 67 H226 V147" stroke="#FFCF25" strokeWidth="1.5" strokeDasharray="4 3" fill="none" strokeLinejoin="round" />
        <path d="M220 137 L226 147 L232 137" stroke="#FFCF25" strokeWidth="1.5" fill="none" strokeLinejoin="round" />

        {/* VPC Default Gateways → VPC Routing Table */}
        <path d="M174 56 H262" stroke="#FFCF25" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        <path d="M252 50 L262 56 L252 62" stroke="#FFCF25" strokeWidth="1.5" fill="none" strokeLinejoin="round" />

        {/* Dataplane Gateway → WireGuard → Site Gateway (gold dashed, circular endpoints) */}
        <path d="M264 171 H417.5" stroke="#B08000" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        <circle cx="264" cy="171" r="4" fill="white" stroke="#B08000" strokeWidth="1.5" />
        <circle cx="417.5" cy="171" r="4" fill="white" stroke="#B08000" strokeWidth="1.5" />

        {/* Site Gateway → Database */}
        <path d="M479.5 171 H556.5" stroke="#FFCF25" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        <path d="M546.5 165 L556.5 171 L546.5 177" stroke="#FFCF25" strokeWidth="1.5" fill="none" strokeLinejoin="round" />

        {/* ── WireGuard connector (centered between Dataplane GW right edge and new Site GW left edge) ── */}
        <circle cx="340.75" cy="171" r="16" fill="#FFF8EE" stroke="#B08000" strokeWidth="1.5" />
        <rect x="334.75" y="173" width="12" height="9" rx="1.5" stroke="#B08000" strokeWidth="1.2" fill="white" />
        <path d="M336.75 173 V170.5 a4 4 0 0 1 8 0 V173" stroke="#B08000" strokeWidth="1.2" fill="none" />
        <rect x="334" y="187" width="18" height="24" fill="white" />
        <text x="340.75" y="197" textAnchor="middle" fontSize="8" fontWeight="700" fill="#B08000" letterSpacing="0.3" fontFamily="system-ui,sans-serif">WireGuard®</text>
        <text x="340.75" y="208" textAnchor="middle" fontSize="8" fontWeight="700" fill="#B08000" letterSpacing="0.3" fontFamily="system-ui,sans-serif">Tunnel</text>

        {/* ── Left panel nodes ── */}

        {/* VAULT NODE (x=22, y=147) — white bg, Vault icon */}
        <rect x="22" y="147" width="48" height="48" rx="6" fill="white" />
        <rect x="22.5" y="147.5" width="47" height="47" rx="5.5" stroke="#656A76" strokeOpacity="0.2" fill="none" />
        <path d="M31.333 156.333L45.947 184.779L60.667 156.333H31.333Z M43.674 167.625H41.346V165.297H43.674V167.625Z M43.674 164.132H41.346V161.806H43.674V164.132Z M47.165 171.116H44.837V168.788H47.165V171.116Z M47.165 167.625H44.837V165.297H47.165V167.625Z M47.165 164.132H44.837V161.806H47.165V164.132Z M50.638 167.625H48.310V165.297H50.638V167.625Z M48.310 164.132V161.806H50.638V164.132H48.310Z" fill="#FFCF25" fillRule="evenodd" />
        <text x="46" y="207" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#9A6F00" letterSpacing="0.5" fontFamily="system-ui,sans-serif">VAULT</text>
        <text x="46" y="218" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#9A6F00" letterSpacing="0.5" fontFamily="system-ui,sans-serif">NODE</text>

        {/* VPC DEFAULT GATEWAYS (x=126, y=32) — gray bg, routing icon */}
        <rect x="126" y="32" width="48" height="48" rx="6" fill="#F1F2F3" />
        <path fillRule="evenodd" clipRule="evenodd" d="M158.5 45.75C156.843 45.75 155.5 47.093 155.5 48.75C155.5 49.247 155.621 49.716 155.835 50.128L153.394 52.312C153.059 52.114 152.668 52 152.25 52H149.25C148.007 52 147 53.007 147 54.25V55L144.405 55C144.072 53.706 142.898 52.75 141.5 52.75C139.843 52.75 138.5 54.093 138.5 55.75C138.5 57.407 139.843 58.75 141.5 58.75C142.898 58.75 144.072 57.794 144.405 56.5L147 56.5V57.25C147 58.493 148.007 59.5 149.25 59.5H152.25C152.668 59.5 153.059 59.386 153.394 59.188L155.835 61.372C155.621 61.784 155.5 62.253 155.5 62.75C155.5 64.407 156.843 65.75 158.5 65.75C160.157 65.75 161.5 64.407 161.5 62.75C161.5 61.093 160.157 59.75 158.5 59.75C157.884 59.75 157.311 59.936 156.835 60.254L154.358 58.038C154.45 57.793 154.5 57.527 154.5 57.25V54.25C154.5 53.973 154.45 53.707 154.358 53.462L156.835 51.246C157.311 51.564 157.884 51.75 158.5 51.75C160.157 51.75 161.5 50.407 161.5 48.75C161.5 47.093 160.157 45.75 158.5 45.75ZM157 48.75C157 47.922 157.672 47.25 158.5 47.25C159.328 47.25 160 47.922 160 48.75C160 49.578 159.328 50.25 158.5 50.25C157.672 50.25 157 49.578 157 48.75ZM149.25 53.5C148.836 53.5 148.5 53.836 148.5 54.25V57.25C148.5 57.664 148.836 58 149.25 58H152.25C152.664 58 153 57.664 153 57.25V54.25C153 53.836 152.664 53.5 152.25 53.5H149.25ZM158.5 61.25C157.672 61.25 157 61.922 157 62.75C157 63.578 157.672 64.25 158.5 64.25C159.328 64.25 160 63.578 160 62.75C160 61.922 159.328 61.25 158.5 61.25ZM140 55.75C140 54.922 140.672 54.25 141.5 54.25C142.328 54.25 143 54.922 143 55.75C143 56.578 142.328 57.25 141.5 57.25C140.672 57.25 140 56.578 140 55.75Z" fill="#656A76" />
        <text x="150" y="91" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#9194A0" letterSpacing="0.5" fontFamily="system-ui,sans-serif">VPC DEFAULT</text>
        <text x="150" y="102" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#9194A0" letterSpacing="0.5" fontFamily="system-ui,sans-serif">GATEWAYS</text>

        {/* VPC ROUTING TABLE (x=270, y=32) — gray bg, table icon */}
        <rect x="270" y="32" width="48" height="48" rx="6" fill="#F1F2F3" />
        <rect x="280" y="42" width="28" height="28" rx="2.5" fill="white" stroke="#D2D4DB" strokeWidth="1" />
        <line x1="284" y1="50" x2="304" y2="50" stroke="#9194A0" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="284" y1="56" x2="304" y2="56" stroke="#9194A0" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="284" y1="62" x2="297" y2="62" stroke="#9194A0" strokeWidth="1.5" strokeLinecap="round" />
        <text x="294" y="91" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#9194A0" letterSpacing="0.5" fontFamily="system-ui,sans-serif">VPC ROUTING</text>
        <text x="294" y="102" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#9194A0" letterSpacing="0.5" fontFamily="system-ui,sans-serif">TABLE</text>

        {/* DATAPLANE GATEWAY (x=202, y=147) — gray bg, gateway+arrow icon */}
        <rect x="202" y="147" width="48" height="48" rx="6" fill="#F1F2F3" />
        <path d="M219.052 167.165C219.676 165.511 220.521 164.093 221.645 163.094C222.753 162.108 224.164 161.5 226 161.5C228.06 161.5 229.592 162.265 230.763 163.487C231.953 164.729 232.794 166.471 233.371 168.433C234.526 172.362 234.561 176.936 234.467 179.418C234.444 180.018 233.944 180.5 233.294 180.5H218.706C218.058 180.5 217.556 180.016 217.533 179.414C217.495 178.412 217.478 177.057 217.549 175.535C217.568 175.121 217.249 174.77 216.835 174.751C216.421 174.731 216.07 175.051 216.051 175.465C215.977 177.038 215.995 178.436 216.034 179.47C216.089 180.924 217.297 182 218.706 182H233.294C234.7 182 235.91 180.93 235.966 179.475C236.062 176.952 236.036 172.178 234.81 168.01C234.196 165.924 233.265 163.93 231.845 162.449C230.406 160.946 228.488 160 226 160C223.793 160 222.029 160.745 220.648 161.973C219.283 163.187 218.324 164.844 217.649 166.635C217.503 167.023 217.698 167.456 218.086 167.602C218.474 167.748 218.906 167.552 219.052 167.165Z" fill="#656A76" />
        <path d="M223.207 165.482C223.493 165.183 223.968 165.171 224.268 165.457L229.767 170.706C229.908 170.84 229.997 171.029 230 171.238V171.262C229.997 171.447 229.926 171.624 229.8 171.76L224.268 177.043C223.968 177.329 223.493 177.317 223.207 177.018C222.921 176.718 222.933 176.243 223.232 175.957L227.378 172H215.75C215.336 172 215 171.664 215 171.25C215 170.836 215.336 170.5 215.75 170.5H227.378L223.232 166.543C222.933 166.257 222.921 165.782 223.207 165.482Z" fill="#656A76" />
        <text x="226" y="207" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#9194A0" letterSpacing="0.5" fontFamily="system-ui,sans-serif">DATAPLANE</text>
        <text x="226" y="218" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#9194A0" letterSpacing="0.5" fontFamily="system-ui,sans-serif">GATEWAY</text>

        {/* ── Right panel nodes (all shifted +13.5 from previous positions) ── */}

        {/* SITE GATEWAY (x=431.5, y=147) — gray bg, gateway icon */}
        <rect x="431.5" y="147" width="48" height="48" rx="6" fill="#F1F2F3" />
        <rect x="437.5" y="157" width="36" height="26" rx="3" fill="white" stroke="#D2D4DB" strokeWidth="1" />
        <path d="M443.5 170 H462.5 M456.5 164 L462.5 170 L456.5 176" stroke="#656A76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="455.5" y="207" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#9194A0" letterSpacing="0.5" fontFamily="system-ui,sans-serif">SITE</text>
        <text x="455.5" y="218" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#9194A0" letterSpacing="0.5" fontFamily="system-ui,sans-serif">GATEWAY</text>

        {/* DATABASE (x=564.5, y=147) — gray bg, cylinder icon */}
        <rect x="564.5" y="147" width="48" height="48" rx="6" fill="#F1F2F3" />
        <ellipse cx="588.5" cy="159" rx="11" ry="4" stroke="#9194A0" strokeWidth="1.2" fill="white" />
        <path d="M577.5 159 V177 c0 2.2 4.9 4 11 4 s11-1.8 11-4 V159" stroke="#9194A0" strokeWidth="1.2" fill="none" />
        <path d="M577.5 167 c0 2.2 4.9 4 11 4 s11-1.8 11-4" stroke="#9194A0" strokeWidth="1.2" fill="none" />
        <text x="588.5" y="207" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#9194A0" letterSpacing="0.5" fontFamily="system-ui,sans-serif">DATABASE</text>

    </svg>
  )
}

function S1({ navigate }: { navigate: Nav }) {
  return (
    <Layout>
      <Breadcrumb items={[
        { label: 'cizh-org' }, { label: 'default-project' }, { label: 'Vault Dedicated' },
        { label: 'vault-cluster' },
        { label: 'Cluster networking', onClick: () => navigate({ screen: 'S0' }) },
        { label: 'Gateways' },
      ]} />

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[28px] font-bold text-[#1A1A1A]">Gateways</h1>
        <Button
          variant="primary"
          onClick={() => navigate({ screen: 'S2' })}
          className="!bg-[#0C56E9] !border-[#0C56E9] !text-white hover:!bg-[#0A48C5]"
        >
          Enable Gateways
        </Button>
      </div>

      <p className="text-[14px] text-[#595959] leading-[1.6] max-w-[680px] mb-6">
        Connect your private networks to HCP Vault without opening inbound ports. Gateways establish an outbound encrypted tunnel from your environment to HCP — no firewall changes required.
      </p>

      <h2 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">Set up gateways</h2>
      <p className="text-[14px] text-[#595959] leading-[1.6] max-w-[680px] mb-7">
        Configure gateways to allow encrypted communication between HCP Vault nodes and your private network sites. Direct your Vault traffic through WireGuard® tunnels to each of your cloud environments and datacenters.
      </p>

      <div className="max-w-[740px] mb-7">
        <ArchDiagram />
      </div>

      <h2 className="text-[17px] font-semibold text-[#1A1A1A] mb-4">Set up steps:</h2>
      <SetupStepper />
    </Layout>
  )
}

// ─── S2: Enable Gateways — configuration form ────────────────────────────────

const GATEWAY_AZS = ['us-east-1a', 'us-east-1b', 'us-east-1c', 'us-east-1d']

const DEFAULT_NETWORKS = [
  { name: 'nyc', cidrs: '192.168.0.0/24, 192.168.10.99/32', zone: 'us-east-1a' },
  { name: 'nj',  cidrs: '10.99.0.0/24, 10.99.1.0/24',       zone: 'us-east-1a' },
  { name: 'fl',  cidrs: '192.34.0.0/24',                     zone: 'us-east-1b' },
  { name: 'ga',  cidrs: '10.15.0.0/24, 10.15.1.0/24',        zone: 'us-east-1b' },
]

const DEFAULT_JSON = `"us-east-1a" {
  "nyc" = ["192.168.0.0/24", "192.168.10.99/32"]
  "nj" = ["10.99.0.0/24", "10.99.1.0/24"]
}
"us-east-1b" {
  "fl" = ["192.34.0.0/24", "192.34.13.99/32"]
  "ga" = ["10.15.0.0/24"]
}`

type Network = { name: string; cidrs: string; zone: string }

function S2({ navigate }: { navigate: Nav }) {
  const [gatewayListOpen, setGatewayListOpen] = useState(false)
  const [tunnelLife, setTunnelLife] = useState('0 minutes')
  const [inputMethod, setInputMethod] = useState<'text' | 'json'>('text')
  const [networks, setNetworks] = useState<Network[]>(DEFAULT_NETWORKS)
  const [jsonValue, setJsonValue] = useState(DEFAULT_JSON)

  const lineCount = jsonValue.split('\n').length

  const updateNetwork = (i: number, patch: Partial<Network>) => {
    const updated = [...networks]
    updated[i] = { ...updated[i], ...patch }
    setNetworks(updated)
  }

  const removeNetwork = (i: number) => setNetworks(networks.filter((_, j) => j !== i))

  const addNetwork = () => setNetworks([...networks, { name: '', cidrs: '', zone: 'us-east-1a' }])

  const inputCls = "bg-[#F9F9F9] border border-[#CCCCCC] rounded-[4px] px-3 py-[9px] text-[14px] text-[#1A1A1A] placeholder-[#AAAAAA] focus:outline-none focus:border-[#1A1A1A] transition-colors w-full"

  return (
    <Layout>
      <Breadcrumb items={[
        { label: 'cizh-org' }, { label: 'default-project' }, { label: 'Vault Dedicated' },
        { label: 'vault-cluster' },
        { label: 'Cluster networking', onClick: () => navigate({ screen: 'S0' }) },
        { label: 'Gateways', onClick: () => navigate({ screen: 'S1' }) },
        { label: 'Enable gateways' },
      ]} />

      <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-1">Enable gateways</h1>
      <p className="text-[14px] text-[#595959] leading-[1.6] mb-7 max-w-[680px]">
        Enabling gateways deploys one dataplane gateway per availability zone and sets up a VPC routing table that directs traffic from your private networks to the appropriate zone's gateway.
      </p>

      {/* ── Section A: Deploy dataplane gateways ── */}
      <h2 className="text-[20px] font-semibold text-[#1A1A1A] mb-2">Deploy dataplane gateways</h2>
      <p className="text-[14px] text-[#595959] leading-[1.6] mb-3 max-w-[680px]">
        A gateway will be created in each availability zone in which this cluster is running.
      </p>

      <button
        className="flex items-center gap-1.5 text-[14px] text-[#1060D0] hover:underline cursor-pointer mb-2"
        onClick={() => setGatewayListOpen(!gatewayListOpen)}
      >
        <span className="text-[11px]">{gatewayListOpen ? '▾' : '▸'}</span>
        {gatewayListOpen ? 'Hide list of gateways' : 'Show list of gateways'}
      </button>

      {gatewayListOpen && (
        <ul className="mb-4 pl-5 flex flex-col gap-1">
          {GATEWAY_AZS.map(az => (
            <li key={az} className="text-[14px] text-[#1A1A1A] list-disc">{az}</li>
          ))}
        </ul>
      )}

      <div className="mt-5 mb-8" style={{ maxWidth: 560 }}>
        <p className="text-[14px] font-semibold text-[#1A1A1A] mb-1">Extend tunnel life</p>
        <p className="text-[13px] text-[#595959] leading-[1.5] mb-3">
          Select a length of time for tunnels to remain open after credential expiration to allow continuity during unexpected outages.
        </p>
        <div className="relative inline-block">
          <select
            className="bg-[#F9F9F9] border border-[#CCCCCC] rounded-[4px] pl-3 pr-8 py-[9px] text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] cursor-pointer appearance-none"
            style={{ minWidth: 220 }}
            value={tunnelLife}
            onChange={e => setTunnelLife(e.target.value)}
          >
            {['0 minutes', '15 minutes', '30 minutes', '60 minutes', '4 hours', '8 hours'].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <hr className="border-[#E5E5E5] mb-8" />

      {/* ── Section B: Gateway routing table ── */}
      <h2 className="text-[20px] font-semibold text-[#1A1A1A] mb-2">Set up gateway routing table</h2>
      <p className="text-[14px] text-[#595959] leading-[1.6] mb-2 max-w-[680px]">
        Prescribe which gateway to direct traffic to each of your private networks. This will populate the VPC routing table and direct HashiCorp Vault Dedicated to use a specific zone's gateway for each network. Configuring each of your networks to use the most localized gateway can reduce cloud costs.
      </p>
      <a
        href="#"
        className="text-[14px] text-[#1060D0] hover:underline inline-flex items-center gap-1 mb-5"
        onClick={e => e.preventDefault()}
      >
        Learn more about gateway routing
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      {/* Input method radios */}
      <div className="mb-5">
        <p className="text-[13px] font-semibold text-[#1A1A1A] mb-2">Input method</p>
        <div className="flex items-center gap-5">
          {(['text', 'json'] as const).map(method => (
            <label
              key={method}
              className="flex items-center gap-2 cursor-pointer text-[14px] text-[#1A1A1A] select-none"
              onClick={() => setInputMethod(method)}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${inputMethod === method ? 'border-[#1A1A1A]' : 'border-[#AAAAAA]'}`}>
                {inputMethod === method && <div className="w-2 h-2 rounded-full bg-[#1A1A1A]" />}
              </div>
              {method === 'text' ? 'Text fields' : 'JSON editor'}
            </label>
          ))}
        </div>
      </div>

      {inputMethod === 'text' ? (
        <div style={{ maxWidth: 800 }}>
          <p className="text-[14px] font-semibold text-[#1A1A1A] mb-1">Provide all private networks</p>
          <p className="text-[13px] text-[#595959] leading-[1.5] mb-4">
            Provide a descriptive name for each of your network sites and the network's CIDR blocks separated by commas. Then select a gateway availability zone to route traffic to that network.
          </p>
          {/* Column headers */}
          <div className="grid gap-2 mb-2 px-1" style={{ gridTemplateColumns: '1fr 1fr 180px 36px' }}>
            <span className="text-[12px] font-semibold text-[#595959]">Network site name</span>
            <span className="text-[12px] font-semibold text-[#595959]">CIDR blocks</span>
            <span className="text-[12px] font-semibold text-[#595959]">Gateway zone</span>
            <span />
          </div>
          {/* Rows */}
          <div className="flex flex-col gap-2 mb-4">
            {networks.map((row, i) => (
              <div key={i} className="grid gap-2 items-center" style={{ gridTemplateColumns: '1fr 1fr 180px 36px' }}>
                <input
                  type="text"
                  className={inputCls}
                  value={row.name}
                  placeholder="e.g. nyc"
                  onChange={e => updateNetwork(i, { name: e.target.value })}
                />
                <input
                  type="text"
                  className={inputCls}
                  value={row.cidrs}
                  placeholder="192.168.0.0/24, 10.0.0.1/32"
                  onChange={e => updateNetwork(i, { cidrs: e.target.value })}
                />
                <div className="relative">
                  <select
                    className="bg-[#F9F9F9] border border-[#CCCCCC] rounded-[4px] pl-3 pr-7 py-[9px] text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] cursor-pointer appearance-none w-full"
                    value={row.zone}
                    onChange={e => updateNetwork(i, { zone: e.target.value })}
                  >
                    {GATEWAY_AZS.map(az => <option key={az} value={az}>{az}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
                    <svg width="9" height="5" viewBox="0 0 9 5" fill="none">
                      <path d="M1 1L4.5 4L8 1" stroke="#595959" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <button
                  className="w-9 h-9 flex items-center justify-center text-[#AAAAAA] hover:text-[#c00005] cursor-pointer rounded transition-colors"
                  onClick={() => removeNetwork(i)}
                  title="Remove network"
                >
                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
                    <path d="M1 3.5h12M4.5 3.5V2h5V3.5M5.5 6.5V12M8.5 6.5V12M2 3.5l.7 10h8.6l.7-10H2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button
            className="flex items-center gap-1.5 text-[14px] text-[#1060D0] hover:underline cursor-pointer"
            onClick={addNetwork}
          >
            <span className="text-[18px] leading-none font-light">+</span> Add network
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: 580 }}>
          <p className="text-[14px] font-semibold text-[#1A1A1A] mb-1">Provide all private networks</p>
          <p className="text-[13px] text-[#595959] leading-[1.5] mb-3">
            List each private network with a descriptive name and an array of CIDR blocks under the gateway availability zone to use for that network.
          </p>
          <div className="rounded-[6px] overflow-hidden" style={{ background: '#1A1A1A', border: '1px solid #2E2E2E' }}>
            <div className="flex">
              {/* Line numbers */}
              <div
                className="flex flex-col items-end py-3 pl-3 pr-3 select-none border-r"
                style={{ color: '#555', fontSize: 13, fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace", lineHeight: '1.7', borderColor: '#2E2E2E', minWidth: 36 }}
              >
                {Array.from({ length: lineCount }, (_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              {/* Textarea */}
              <textarea
                className="flex-1 text-[#F0F0F0] text-[13px] py-3 px-4 resize-none focus:outline-none bg-transparent"
                style={{ fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace", lineHeight: '1.7', minHeight: 176 }}
                value={jsonValue}
                onChange={e => setJsonValue(e.target.value)}
                spellCheck={false}
                rows={lineCount}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-3 mt-10">
        <Button variant="primary" onClick={() => navigate({ screen: 'S3', gatewaysEnabled: true })}>
          Deploy gateways
        </Button>
        <Button variant="secondary" onClick={() => navigate({ screen: 'S1' })}>Cancel</Button>
      </div>
    </Layout>
  )
}

// ─── S3: Gateways enabled, no sites ──────────────────────────────────────────

function S3({ navigate }: { navigate: Nav }) {
  return (
    <Layout>
      <Breadcrumb items={[
        { label: 'cizh-org' }, { label: 'default-project' }, { label: 'Vault Dedicated' },
        { label: 'vault-cluster' },
        { label: 'Cluster networking', onClick: () => navigate({ screen: 'S0' }) },
        { label: 'Gateways' },
      ]} />

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h1 className="text-[28px] font-bold text-[#1A1A1A]">Gateways</h1>
          <Badge variant="success">Enabled</Badge>
        </div>
        <Button variant="primary" onClick={() => navigate({ screen: 'S4' })}>Add site</Button>
      </div>

      <div className="flex flex-col gap-4">
        <Alert
          variant="success"
          title="Gateways enabled"
          description="Dataplane gateways are active in each availability zone. Add a site to connect your first private network."
        />
        <div className="bg-white border border-[#E5E5E5] rounded-[6px] px-4 py-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[4px] flex items-center justify-center flex-shrink-0" style={{ background: '#fff9cf' }}>
              <svg viewBox="22 147 38 37" width="18" height="18">
                <path clipRule="evenodd" fillRule="evenodd" fill="#9A6F00" d="M31.333 156.333L45.947 184.779L60.667 156.333H31.333Z M43.674 167.625H41.346V165.297H43.674V167.625Z M43.674 164.132H41.346V161.806H43.674V164.132Z M47.165 171.116H44.837V168.788H47.165V171.116Z M47.165 167.625H44.837V165.297H47.165V167.625Z M47.165 164.132H44.837V161.806H47.165V164.132Z M50.638 167.625H48.310V165.297H50.638V167.625Z M48.310 164.132V161.806H50.638V164.132H48.310Z" />
              </svg>
            </div>
            <span className="text-[12px] font-semibold text-[#737373]">Dataplane Gateways</span>
          </div>
          <div className="w-px self-stretch bg-[#E5E5E5] mx-1" />
          {['us-east-1a', 'us-east-1b', 'us-east-1c', 'us-east-1d'].map(az => (
            <div key={az} className="flex items-center gap-2 bg-[#F5F5F5] border border-[#E5E5E5] rounded-[4px] px-2.5 py-1.5">
              <span className="text-[12px] text-[#1A1A1A]">{az}</span>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-[3px]" style={{ background: '#CCEEDA' }}>
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                  <path d="M13.53 4.28C13.823 3.987 13.823 3.513 13.53 3.22C13.237 2.927 12.763 2.927 12.47 3.22L5.5 10.189L3.03 7.72C2.737 7.427 2.263 7.427 1.97 7.72C1.677 8.013 1.677 8.487 1.97 8.78L4.97 11.78C5.263 12.073 5.737 12.073 6.03 11.78L13.53 4.28Z" fill="#006619" />
                </svg>
                <span className="text-[11px] font-medium" style={{ color: '#006619' }}>Healthy</span>
              </div>
            </div>
          ))}
        </div>
        <EmptyState
          title="No sites configured"
          description="Add your first gateway site to connect a private network to HCP Vault."
          cta={{ label: 'Add site', onClick: () => navigate({ screen: 'S4' }) }}
        />
      </div>
    </Layout>
  )
}

// ─── S4: Create site — deployment model ──────────────────────────────────────

function S4({ navigate, state }: { navigate: Nav; state: AppState }) {
  return (
    <Layout>
      <Breadcrumb items={[
        { label: 'cizh-org' }, { label: 'default-project' }, { label: 'Vault Dedicated' },
        { label: 'vault-cluster' },
        { label: 'Cluster networking', onClick: () => navigate({ screen: 'S0' }) },
        { label: 'Gateways', onClick: () => navigate({ screen: 'S8' }) },
        { label: 'Add site' },
      ]} />

      <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-5">Add site</h1>

      <div style={{ maxWidth: 680 }}>
        <StepIndicator current={1} steps={["Deployment model", "Configure", "Install", "Verify"]} />

        <h2 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">Choose how to run the gateway agent</h2>
        <p className="text-[14px] text-[#595959] leading-[1.6] mb-6">
          The gateway agent runs inside your network and establishes an encrypted tunnel to HCP Vault. Select the deployment format that fits your environment.
        </p>

        <div className="flex gap-4 mb-8">
          <RadioCard
            title="Binary"
            description="Single compiled executable. No container runtime required. Preferred by security teams for its minimal dependency footprint."
            selected={state.deployModel === 'binary'}
            onClick={() => navigate({ deployModel: 'binary' })}
          />
          <RadioCard
            title="Docker"
            description="Container image. Preferred for teams already running container platforms. Pull from the HashiCorp registry and run with standard Docker flags."
            selected={state.deployModel === 'docker'}
            onClick={() => navigate({ deployModel: 'docker' })}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="tertiary" onClick={() => navigate({ screen: 'S3' })}>Cancel</Button>
          <Button variant="primary" onClick={() => navigate({ screen: 'S5' })}>Next →</Button>
        </div>
      </div>
    </Layout>
  )
}

// ─── S5: Create site — configure ─────────────────────────────────────────────

function S5({ navigate }: { navigate: Nav }) {
  const [siteName, setSiteName] = useState('')
  const [clientId, setClientId] = useState('')
  const [tunnelLife, setTunnelLife] = useState('0 min')

  return (
    <Layout>
      <Breadcrumb items={[
        { label: 'cizh-org' }, { label: 'default-project' }, { label: 'Vault Dedicated' },
        { label: 'vault-cluster' },
        { label: 'Cluster networking', onClick: () => navigate({ screen: 'S0' }) },
        { label: 'Gateways', onClick: () => navigate({ screen: 'S8' }) },
        { label: 'Add site' },
      ]} />

      <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-5">Add site</h1>

      <div style={{ maxWidth: 560 }}>
        <StepIndicator current={2} steps={["Deployment model", "Configure", "Install", "Verify"]} />

        <div className="flex flex-col gap-5 mb-5">
          <FormField
            label="Site name" required
            placeholder="e.g. nyc-prod"
            helper="A label for this network site. Used to identify the gateway in routing rules and logs."
            value={siteName}
            onChange={setSiteName}
          />
          <FormField
            label="Service principal client ID" required
            placeholder="client_id"
            mono
            helper="From the HCP service principal created for this gateway."
            value={clientId}
            onChange={setClientId}
          />
          <FormField
            label="Service principal client secret" required
            type="password"
            mono
            helper="Store this value securely. It will not be shown again after setup."
          />
          <FormField
            label="Network site CIDRs"
            type="textarea"
            placeholder={"192.168.0.0/24\n10.99.0.0/24"}
            helper="One CIDR per line. These become your VPC routing table entries — traffic from these ranges is directed through this gateway to HCP Vault."
          />
        </div>

        <Alert
          variant="neutral"
          title="Source IP addresses are preserved in Vault audit logs."
          description="Ensure network site CIDRs reflect your actual workload IP ranges. Source IPs from these ranges will appear in Vault audit log entries for all requests routed through this site."
        />

        <div className="mt-5">
          <Disclosure>
            <div>
              <p className="text-[13px] font-medium text-[#1A1A1A] mb-2">Extend tunnel life</p>
              <div className="flex gap-4 mb-2">
                {['0 min', '15 min', '30 min', '60 min'].map(opt => (
                  <label key={opt} className="flex items-center gap-1.5 cursor-pointer text-[13px] text-[#1A1A1A]">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${tunnelLife === opt ? 'border-[#1A1A1A]' : 'border-[#CCCCCC]'}`}
                      onClick={() => setTunnelLife(opt)}
                    >
                      {tunnelLife === opt && <div className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />}
                    </div>
                    {opt}
                  </label>
                ))}
              </div>
              <p className="text-[12px] text-[#737373] leading-[1.5]">
                Keep tunnels open for this duration after credential expiration to allow continuity during unexpected outages. Default is 0 (tunnels close immediately on expiration).
              </p>
            </div>
          </Disclosure>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <Button variant="secondary" onClick={() => navigate({ screen: 'S4' })}>← Back</Button>
          <Button variant="primary" onClick={() => navigate({ screen: 'S6' })}>Next →</Button>
        </div>
      </div>
    </Layout>
  )
}

// ─── S6: Install instructions ─────────────────────────────────────────────────

const BINARY_CODE = {
  download: `# Download the gateway agent binary
curl -fsSL https://releases.hashicorp.com/hcp-vault-gateway/1.2.1/hcp-vault-gateway_1.2.1_linux_amd64.zip \\
  -o hcp-vault-gateway.zip
unzip hcp-vault-gateway.zip
chmod +x hcp-vault-gateway`,
  config: `# gateway.hcl
gateway {
  role      = "customer"
  site      = "nyc-prod"
  cred_file = "/path/to/hcp/cred_file.json"
  log_level = "info"
}`,
  run: `# Run the gateway agent
./hcp-vault-gateway -config=gateway.hcl`,
}

const DOCKER_CODE = {
  pull: `# Pull the gateway agent image
docker pull hashicorp/hcp-vault-gateway:1.2.1`,
  run: `# Run the gateway agent container
docker run --rm \\
  --cap-add NET_ADMIN \\
  -v /path/to/hcp/cred_file.json:/etc/hcp/cred_file.json \\
  -e HCP_GATEWAY_SITE=nyc-prod \\
  -e HCP_GATEWAY_CRED_FILE=/etc/hcp/cred_file.json \\
  hashicorp/hcp-vault-gateway:1.2.1`,
}

function InstallContent({ defaultTab }: { defaultTab: 'binary' | 'docker' }) {
  const [tab, setTab] = useState<'binary' | 'docker'>(defaultTab)
  return (
    <>
      <Tabs
        tabs={[{ id: 'binary', label: 'Binary' }, { id: 'docker', label: 'Docker' }]}
        active={tab}
        onChange={id => setTab(id as 'binary' | 'docker')}
      />
      {tab === 'binary' ? (
        <>
          <p className="text-[13px] font-semibold text-[#1A1A1A] mb-2">1. Download the gateway agent</p>
          <CodeBlock code={BINARY_CODE.download} />
          <p className="text-[13px] font-semibold text-[#1A1A1A] mb-2">2. Create the config file</p>
          <CodeBlock code={BINARY_CODE.config} />
          <p className="text-[13px] font-semibold text-[#1A1A1A] mb-2">3. Run the gateway agent</p>
          <CodeBlock code={BINARY_CODE.run} />
        </>
      ) : (
        <>
          <p className="text-[13px] font-semibold text-[#1A1A1A] mb-2">1. Pull the gateway image</p>
          <CodeBlock code={DOCKER_CODE.pull} />
          <p className="text-[13px] font-semibold text-[#1A1A1A] mb-2">2. Run the gateway container</p>
          <CodeBlock code={DOCKER_CODE.run} />
        </>
      )}
    </>
  )
}

function S6({ navigate, state }: { navigate: Nav; state: AppState }) {
  return (
    <Layout>
      <Breadcrumb items={[
        { label: 'cizh-org' }, { label: 'default-project' }, { label: 'Vault Dedicated' },
        { label: 'vault-cluster' },
        { label: 'Cluster networking', onClick: () => navigate({ screen: 'S0' }) },
        { label: 'Gateways', onClick: () => navigate({ screen: 'S8' }) },
        { label: 'Add site' },
      ]} />

      <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-5">Add site</h1>

      <div style={{ maxWidth: 680 }}>
        <StepIndicator current={3} steps={["Deployment model", "Configure", "Install", "Verify"]} />

        <p className="text-[14px] text-[#595959] leading-[1.6] mb-5">
          Run the gateway agent in your environment. The agent will initiate an outbound connection to HCP — no inbound ports are required.
        </p>

        <InstallContent defaultTab={state.deployModel} />

        <Alert
          variant="neutral"
          title="Keep the agent running before proceeding."
          description="The next step verifies the tunnel connection. Start the agent first, then click Start verification."
        />

        <div className="flex items-center gap-2 mt-5">
          <Button variant="secondary" onClick={() => navigate({ screen: 'S5' })}>← Back</Button>
          <Button variant="primary" onClick={() => navigate({ screen: 'S7', s7State: 'pending' })}>Start verification →</Button>
        </div>
      </div>
    </Layout>
  )
}

// ─── S7: Verify connection ────────────────────────────────────────────────────

function S7({ navigate, state }: { navigate: Nav; state: AppState }) {
  useEffect(() => {
    if (state.s7State !== 'pending') return
    const id = setTimeout(() => navigate({ s7State: 'connected' }), 3000)
    return () => clearTimeout(id)
  }, [state.s7State])

  return (
    <Layout>
      <Breadcrumb items={[
        { label: 'cizh-org' }, { label: 'default-project' }, { label: 'Vault Dedicated' },
        { label: 'vault-cluster' },
        { label: 'Cluster networking', onClick: () => navigate({ screen: 'S0' }) },
        { label: 'Gateways', onClick: () => navigate({ screen: 'S8' }) },
        { label: 'Add site' },
      ]} />

      <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-5">Add site</h1>

      <div style={{ maxWidth: 560 }}>
        <StepIndicator current={4} steps={["Deployment model", "Configure", "Install", "Verify"]} />

        <Card padding="px-8 py-10">
          <div className="flex flex-col items-center text-center">

            {state.s7State === 'pending' && (
              <>
                <div className="w-12 h-12 rounded-full border-4 border-[#E5E5E5] border-t-[#1A1A1A] animate-spin mb-5" />
                <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-3">Waiting for connection...</h3>
                <p className="text-[14px] text-[#595959] leading-[1.6] max-w-xs mb-4">
                  Keep the gateway agent running. This page will update automatically when a connection is established.
                </p>
                <button
                  className="text-[11px] text-[#AAAAAA] hover:text-[#737373] underline cursor-pointer mt-1"
                  onClick={() => navigate({ s7State: 'failed' })}
                >
                  Simulate connection failure
                </button>
              </>
            )}

            {state.s7State === 'connected' && (
              <>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-[26px] mb-5"
                  style={{ background: '#E8F7EE', border: '2px solid #1A7F4B', color: '#1A7F4B' }}
                >
                  ✓
                </div>
                <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-2">Connected</h3>
                <p className="text-[14px] text-[#1A1A1A] mb-1">
                  Site <strong>nyc-prod</strong> is active and healthy.
                </p>
                <p className="text-[13px] text-[#737373] mb-5">2/2 gateways active · v1.2.1</p>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => navigate({ screen: 'S8', gatewaysEnabled: true })}>Done</Button>
                  <Button variant="primary" onClick={() => navigate({ screen: 'S9', s9Site: 'nyc-prod', gatewaysEnabled: true })}>View site →</Button>
                </div>
              </>
            )}

            {state.s7State === 'failed' && (
              <div className="w-full text-left">
                <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">Connection not established</h3>
                <Alert
                  variant="warning"
                  title="No tunnel detected after 5 minutes."
                  description="Check the failure category below and resolve before retrying."
                />
                <div className="mt-4 divide-y divide-[#E5E5E5] pb-2">
                  {[
                    { label: 'Agent not started', detail: 'Verify the gateway binary or container is running in your environment.' },
                    { label: 'Credential error', detail: 'Check that the service principal client ID and secret are correct and have not expired.' },
                    { label: 'Network block', detail: 'Ensure outbound UDP port 51820 is open to HCP dataplane gateway IP addresses.' },
                  ].map(item => (
                    <div key={item.label} className="py-3">
                      <p className="text-[13px] font-semibold text-[#1A1A1A] mb-0.5">{item.label}</p>
                      <p className="text-[13px] text-[#595959]">{item.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Button variant="tertiary" onClick={() => navigate({ screen: 'S8' })}>Exit without saving</Button>
                  <Button variant="secondary" onClick={() => navigate({ s7State: 'pending' })}>Retry verification</Button>
                </div>
              </div>
            )}

          </div>
        </Card>
      </div>
    </Layout>
  )
}

// ─── S8: Gateways overview ────────────────────────────────────────────────────

const AZS = ['us-east-1a', 'us-east-1b', 'us-east-1c', 'us-east-1d']

type TopoSite = {
  name: string
  cidrs: string
  badge: BadgeVariant
  label: string
  az: number
  sub: string | null
  subColor?: string
}

const TOPOLOGY_SITES: TopoSite[] = [
  { name: 'nyc-prod',  cidrs: '192.168.0.0/24, 192.168.10.99/32', badge: 'success', label: 'Healthy',       az: 0,  sub: null },
  { name: 'nj-dr',    cidrs: '10.99.0.0/24, 10.99.1.0/24',        badge: 'warning', label: 'Degraded',      az: 0,  sub: '◆ Gateway unresponsive, last heard 2026-07-14 04:59 UTC', subColor: '#8A4F00' },
  { name: 'bos-dev',  cidrs: '10.10.0.0/24',                       badge: 'success', label: 'Healthy',       az: 0,  sub: null },
  { name: 'atl-corp', cidrs: '172.16.0.0/20',                      badge: 'success', label: 'Healthy',       az: 1,  sub: null },
  { name: 'fl-branch',cidrs: '192.34.0.0/24',                      badge: 'success', label: 'Healthy',       az: 1,  sub: null },
  { name: 'chi-hq',   cidrs: '10.20.0.0/16',                       badge: 'warning', label: 'Degraded',      az: 1,  sub: '◆ Packet loss detected on tunnel interface', subColor: '#8A4F00' },
  { name: 'dal-dc',   cidrs: '10.50.0.0/16',                       badge: 'success', label: 'Healthy',       az: 2,  sub: null },
  { name: 'la-west',  cidrs: '172.20.0.0/14',                      badge: 'success', label: 'Healthy',       az: 2,  sub: null },
  { name: 'sea-edge', cidrs: '10.80.0.0/24',                       badge: 'success', label: 'Healthy',       az: 3,  sub: null },
  { name: 'mia-dr',   cidrs: '10.90.0.0/24',                       badge: 'offline', label: 'Not connected', az: -1, sub: '◆ No routing configured for this site', subColor: '#999999' },
]

const CONN_W = 80

function AzGroupRow({ az, sites, navigate }: { az: string; sites: TopoSite[]; navigate: Nav }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const siteRefs = useRef<(HTMLDivElement | null)[]>([])
  const azCardRef = useRef<HTMLDivElement>(null)
  const [connData, setConnData] = useState<{
    lines: Array<{ sy: number; ay: number; isDegraded: boolean }>
    h: number
  }>({ lines: [], h: 0 })

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !azCardRef.current) return
      const outer = containerRef.current.getBoundingClientRect()
      const azRect = azCardRef.current.getBoundingClientRect()
      const ay = azRect.top - outer.top + azRect.height / 2
      const lines = siteRefs.current
        .map((el, i) => {
          if (!el || !sites[i]) return null
          const rect = el.getBoundingClientRect()
          return { sy: rect.top - outer.top + rect.height / 2, ay, isDegraded: sites[i].badge === 'warning' }
        })
        .filter((l): l is NonNullable<typeof l> => l !== null)
      setConnData({ lines, h: outer.height })
    }
    measure()
    const id = setTimeout(measure, 80)
    window.addEventListener('resize', measure)
    return () => { clearTimeout(id); window.removeEventListener('resize', measure) }
  }, [sites])

  const degradedCount = sites.filter(s => s.badge === 'warning').length
  const { lines, h } = connData

  return (
    <div ref={containerRef} className="flex items-stretch mb-4">
      {/* Site cards */}
      <div className="flex-1 min-w-0 flex flex-col gap-2 justify-center">
        {sites.map((site, i) => (
          <div
            key={site.name}
            ref={el => { siteRefs.current[i] = el }}
            className="bg-white border border-[#E5E5E5] rounded-[6px] px-4 py-2.5 flex items-center justify-between gap-3 cursor-pointer hover:border-[#AAAAAA] transition-colors"
            onClick={() => navigate({ screen: 'S9', s9Site: site.name })}
          >
            <div>
              <p className="text-[13px] font-medium text-[#1060D0]">{site.name}</p>
              <p className="text-[11px] font-mono text-[#737373]">{site.cidrs}</p>
              {site.sub && <p className="text-[11px] mt-0.5" style={{ color: site.subColor }}>{site.sub}</p>}
            </div>
            <Badge variant={site.badge}>{site.label}</Badge>
          </div>
        ))}
      </div>

      {/* SVG connector — absolutely positioned so it never inflates the flex row height */}
      <div style={{ width: CONN_W, flexShrink: 0, position: 'relative' }}>
        {h > 0 && (
          <svg
            width={CONN_W} height={h} viewBox={`0 0 ${CONN_W} ${h}`}
            style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
          >
            {lines.map(({ sy, ay, isDegraded }, i) => {
              const color = isDegraded ? '#B08000' : '#CCCCCC'
              return (
                <g key={i}>
                  <circle cx="4" cy={sy} r="3.5" fill={color} />
                  <line
                    x1="7" y1={sy} x2={CONN_W - 2} y2={ay}
                    stroke={color} strokeWidth="1.5"
                    strokeDasharray={isDegraded ? '4 3' : undefined}
                  />
                </g>
              )
            })}
            {lines.length > 0 && (
              <polygon
                points={`${CONN_W},${lines[0].ay} ${CONN_W - 7},${lines[0].ay - 4} ${CONN_W - 7},${lines[0].ay + 4}`}
                fill="#CCCCCC"
              />
            )}
          </svg>
        )}
        {/* Invisible spacer keeps the column width without contributing height */}
        <div style={{ width: CONN_W, height: 0 }} />
      </div>

      {/* AZ card — vertically centered in the group */}
      <div style={{ width: 256, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <div ref={azCardRef} className="w-full bg-white border border-[#E5E5E5] rounded-[6px] px-4 py-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span style={{ color: '#B08000', fontSize: 14 }}>▽</span>
              <span className="text-[13px] text-[#1A1A1A]">{az}</span>
            </div>
            <Badge variant="success">Healthy</Badge>
          </div>
          <p className="text-[11px] text-[#737373] pl-5">
            {sites.length} site{sites.length !== 1 ? 's' : ''} routed
            {degradedCount > 0 && <span className="text-[#8A4F00]"> · {degradedCount} degraded</span>}
          </p>
        </div>
      </div>
    </div>
  )
}

function TopologyView({ navigate }: { navigate: Nav }) {
  const disconnected = TOPOLOGY_SITES.filter(s => s.az === -1)
  const groups = AZS
    .map((az, i) => ({ az, sites: TOPOLOGY_SITES.filter(s => s.az === i) }))
    .filter(g => g.sites.length > 0)

  return (
    <div className="mt-2">
      {/* Column headers */}
      <div className="flex items-end mb-5">
        <div className="flex-1">
          <p className="text-[12px] font-semibold text-[#737373] mb-0.5">Site Gateways</p>
          <p className="text-[12px] text-[#737373]">Private network sites defined in the VPC routing table</p>
        </div>
        <div style={{ width: CONN_W, flexShrink: 0 }} />
        <div style={{ width: 256, flexShrink: 0 }}>
          <p className="text-[12px] font-semibold text-[#737373] mb-0.5">Dataplane Gateways</p>
          <p className="text-[12px] text-[#737373]">Gateways in the Vault HCP Dataplane</p>
        </div>
      </div>

      {/* Unrouted / not connected sites */}
      {disconnected.length > 0 && (
        <div className="mb-5">
          {disconnected.map(site => (
            <div key={site.name} className="flex items-center mb-2">
              <div
                className="flex-1 bg-white border border-[#E5E5E5] rounded-[6px] px-4 py-2.5 flex items-center justify-between gap-3 cursor-pointer hover:border-[#AAAAAA] transition-colors"
                onClick={() => navigate({ screen: 'S9', s9Site: site.name })}
              >
                <div>
                  <p className="text-[13px] font-medium text-[#1060D0]">{site.name}</p>
                  <p className="text-[11px] font-mono text-[#737373]">{site.cidrs}</p>
                  {site.sub && <p className="text-[11px] mt-0.5" style={{ color: site.subColor }}>{site.sub}</p>}
                </div>
                <Badge variant={site.badge}>{site.label}</Badge>
              </div>
              <div style={{ width: CONN_W, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <svg width={CONN_W} height="44" viewBox={`0 0 ${CONN_W} 44`}>
                  <line x1="0" y1="22" x2="52" y2="22" stroke="#CCCCCC" strokeWidth="1.5" strokeDasharray="5 3" />
                  <circle cx="61" cy="22" r="8" fill="white" stroke="#CCCCCC" strokeWidth="1.5" />
                  <text x="61" y="26" textAnchor="middle" fontSize="10" fill="#999999">?</text>
                </svg>
              </div>
              <div style={{ width: 256, flexShrink: 0 }} />
            </div>
          ))}
        </div>
      )}

      {/* AZ groups — sites adjacent to their dataplane gateway */}
      {groups.map(group => (
        <AzGroupRow key={group.az} az={group.az} sites={group.sites} navigate={navigate} />
      ))}
    </div>
  )
}

function S8({ navigate, state }: { navigate: Nav; state: AppState }) {
  return (
    <Layout>
      <Breadcrumb items={[
        { label: 'cizh-org' }, { label: 'default-project' }, { label: 'Vault Dedicated' },
        { label: 'vault-cluster' },
        { label: 'Cluster networking', onClick: () => navigate({ screen: 'S0' }) },
        { label: 'Gateways' },
      ]} />

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h1 className="text-[28px] font-bold text-[#1A1A1A]">Gateways</h1>
          <Badge variant="success">Enabled</Badge>
        </div>
        <div className="flex items-center gap-2">
          <ViewToggle
            options={[{ id: 'table', label: '≡ Table' }, { id: 'topology', label: '⬡ Topology' }]}
            active={state.s8View}
            onChange={id => navigate({ s8View: id as S8View })}
          />
          <Button variant="primary" onClick={() => navigate({ screen: 'S4' })}>Add site</Button>
        </div>
      </div>

      {/* ── Dataplane Gateway Health Strip ── */}
      <div className="bg-white border border-[#E5E5E5] rounded-[6px] px-4 py-3 flex flex-wrap items-center gap-3 mb-5">
        {/* Vault logo + label */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-[4px] flex items-center justify-center flex-shrink-0" style={{ background: '#fff9cf' }}>
            <svg viewBox="22 147 38 37" width="18" height="18">
              <path clipRule="evenodd" fillRule="evenodd" fill="#9A6F00" d="M31.333 156.333L45.947 184.779L60.667 156.333H31.333Z M43.674 167.625H41.346V165.297H43.674V167.625Z M43.674 164.132H41.346V161.806H43.674V164.132Z M47.165 171.116H44.837V168.788H47.165V171.116Z M47.165 167.625H44.837V165.297H47.165V167.625Z M47.165 164.132H44.837V161.806H47.165V164.132Z M50.638 167.625H48.310V165.297H50.638V167.625Z M48.310 164.132V161.806H50.638V164.132H48.310Z" />
            </svg>
          </div>
          <span className="text-[12px] font-semibold text-[#737373]">Dataplane Gateways</span>
        </div>
        <div className="w-px self-stretch bg-[#E5E5E5] mx-1" />
        {/* AZ chips: name + Healthy pill */}
        {['us-east-1a', 'us-east-1b', 'us-east-1c', 'us-east-1d'].map(az => (
          <div key={az} className="flex items-center gap-2 bg-[#F5F5F5] border border-[#E5E5E5] rounded-[4px] px-2.5 py-1.5">
            <span className="text-[12px] text-[#1A1A1A]">{az}</span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-[3px]" style={{ background: '#CCEEDA' }}>
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M13.53 4.28C13.823 3.987 13.823 3.513 13.53 3.22C13.237 2.927 12.763 2.927 12.47 3.22L5.5 10.189L3.03 7.72C2.737 7.427 2.263 7.427 1.97 7.72C1.677 8.013 1.677 8.487 1.97 8.78L4.97 11.78C5.263 12.073 5.737 12.073 6.03 11.78L13.53 4.28Z" fill="#006619" />
              </svg>
              <span className="text-[11px] font-medium" style={{ color: '#006619' }}>Healthy</span>
            </div>
          </div>
        ))}
      </div>

      {state.s8View === 'table' ? (
        <>
          <div className="border border-[#E5E5E5] rounded-[6px] overflow-hidden mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F9F9F9] border-b border-[#E5E5E5]">
                  {['Site gateways', 'Status', 'Gateways', 'Version', 'Last seen', 'Actions'].map(col => (
                    <th key={col} className="text-left px-4 py-3 text-[12px] font-semibold text-[#595959]">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3">
                    <button className="text-[13px] text-[#1060D0] hover:underline" onClick={() => navigate({ screen: 'S9', s9Site: 'nyc-prod' })}>nyc-prod</button>
                  </td>
                  <td className="px-4 py-3"><Badge variant="success">Healthy</Badge></td>
                  <td className="px-4 py-3 text-[13px] text-[#1A1A1A]">2/2</td>
                  <td className="px-4 py-3 text-[12px] font-mono text-[#1A1A1A]">v1.2.1</td>
                  <td className="px-4 py-3 text-[13px] text-[#595959]">2 min ago</td>
                  <td className="px-4 py-3"><button className="text-[13px] text-[#1060D0] hover:underline">Edit</button></td>
                </tr>
                <tr className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3">
                    <button className="text-[13px] text-[#1060D0] hover:underline" onClick={() => navigate({ screen: 'S9', s9Site: 'nj-dr' })}>nj-dr</button>
                  </td>
                  <td className="px-4 py-3"><Badge variant="warning">Degraded</Badge></td>
                  <td className="px-4 py-3 text-[13px] font-semibold text-[#8A4F00]">1/2</td>
                  <td className="px-4 py-3 text-[12px] font-mono text-[#1A1A1A]">v1.2.1</td>
                  <td className="px-4 py-3 text-[13px] font-semibold text-[#8A4F00]">8 min ago</td>
                  <td className="px-4 py-3"><button className="text-[13px] text-[#1060D0] hover:underline">Edit</button></td>
                </tr>
                <tr className="hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3">
                    <button className="text-[13px] text-[#1060D0] hover:underline" onClick={() => navigate({ screen: 'S9', s9Site: 'fl-branch' })}>fl-branch</button>
                  </td>
                  <td className="px-4 py-3"><Badge variant="offline">Not connected</Badge></td>
                  <td className="px-4 py-3 text-[13px] text-[#737373]">—</td>
                  <td className="px-4 py-3 text-[12px] font-mono text-[#1A1A1A]">v1.2.1</td>
                  <td className="px-4 py-3 text-[13px] text-[#595959]">Never</td>
                  <td className="px-4 py-3"><button className="text-[13px] text-[#1060D0] hover:underline">Edit</button></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3">
            <Alert
              variant="warning"
              title="nj-dr is degraded."
              description="1 of 2 gateways is active. Gateway unresponsive — last heard 2025-07-14 04:59:00 UTC. Check that the gateway agent is running in all configured availability zones."
            />
            <Alert
              variant="neutral"
              title="fl-branch has not connected."
              description="No tunnel has been established. Verify the gateway agent is running and outbound UDP port 51820 is open."
            />
          </div>
        </>
      ) : (
        <TopologyView navigate={navigate} />
      )}
    </Layout>
  )
}

// ─── S9: Site detail ──────────────────────────────────────────────────────────

function InstallSlideOver({ onClose, defaultTab }: { onClose: () => void; defaultTab: 'binary' | 'docker' }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-12 right-0 bottom-0 z-50 bg-white shadow-2xl overflow-y-auto border-l border-[#E5E5E5]" style={{ width: 580 }}>
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-[17px] font-semibold text-[#1A1A1A]">Install instructions</h2>
          <button className="text-[#737373] hover:text-[#1A1A1A] cursor-pointer text-xl" onClick={onClose}>×</button>
        </div>
        <div className="px-6 py-5">
          <InstallContent defaultTab={defaultTab} />
        </div>
      </div>
    </>
  )
}

function S9({ navigate, state }: { navigate: Nav; state: AppState }) {
  const [showRemove, setShowRemove] = useState(false)
  const [showInstall, setShowInstall] = useState(false)
  const site = state.s9Site

  const isNyc = site === 'nyc-prod'
  const isNj = site === 'nj-dr'
  const isFl = site === 'fl-branch'

  const badgeVariant: BadgeVariant = isNyc ? 'success' : isNj ? 'warning' : 'offline'
  const badgeLabel = isNyc ? 'Healthy' : isNj ? 'Degraded' : 'Not connected'

  const descItems = isNyc
    ? [
        { label: 'Site name', value: <span className="font-mono">nyc-prod</span> },
        { label: 'Status', value: <Badge variant="success">Healthy</Badge> },
        { label: 'Active gateways', value: '2 of 2' },
        { label: 'Last seen', value: '2 min ago' },
        { label: 'Deployment model', value: 'Binary' },
        { label: 'Agent version', value: <span className="font-mono">v1.2.1</span> },
        { label: 'Network site CIDRs', value: <span className="font-mono text-[12px]">192.168.0.0/24 · 192.168.10.99/32</span> },
      ]
    : isNj
    ? [
        { label: 'Site name', value: <span className="font-mono">nj-dr</span> },
        { label: 'Status', value: <Badge variant="warning">Degraded</Badge> },
        { label: 'Active gateways', value: <span><span className="font-semibold text-[#8A4F00]">1 of 2</span>{' '}<span className="text-[11px] text-[#8A4F00]">↓ 1 unresponsive</span></span> },
        { label: 'Last seen', value: <span className="font-semibold text-[#8A4F00]">2025-07-14 04:59:00 UTC</span> },
        { label: 'Deployment model', value: 'Binary' },
        { label: 'Agent version', value: <span className="font-mono">v1.2.1</span> },
        { label: 'Network site CIDRs', value: <span className="font-mono text-[12px]">10.99.0.0/24 · 10.99.1.0/24</span> },
      ]
    : [
        { label: 'Site name', value: <span className="font-mono">fl-branch</span> },
        { label: 'Status', value: <Badge variant="offline">Not connected</Badge> },
        { label: 'Active gateways', value: <span className="text-[#737373]">0 of 2</span> },
        { label: 'Last seen', value: 'Never' },
        { label: 'Deployment model', value: 'Docker' },
        { label: 'Agent version', value: <span className="font-mono">v1.2.1</span> },
        { label: 'Network site CIDRs', value: <span className="font-mono text-[12px]">192.34.0.0/24</span> },
      ]

  return (
    <Layout>
      {showRemove && (
        <Modal title={`Remove ${site}?`} topBorderColor="#5C1111" onClose={() => setShowRemove(false)}>
          <div className="px-6 py-5">
            <Alert
              variant="warning"
              title="This action will tear down the WireGuard tunnel."
              description="All traffic routed through this site will be interrupted immediately. This cannot be undone."
            />
          </div>
          <div className="w-full flex items-center justify-start gap-2 px-6 py-4" style={{ background: '#FAFAFA', borderTop: '1px solid rgba(101,106,118,0.2)' }}>
            <Button variant="critical" onClick={() => { setShowRemove(false); navigate({ screen: 'S8' }) }}>
              Remove site
            </Button>
            <Button variant="secondary" onClick={() => setShowRemove(false)}>Cancel</Button>
          </div>
        </Modal>
      )}

      {showInstall && (
        <InstallSlideOver
          onClose={() => setShowInstall(false)}
          defaultTab={isFl ? 'docker' : 'binary'}
        />
      )}

      <Breadcrumb items={[
        { label: 'cizh-org' }, { label: 'default-project' }, { label: 'Vault Dedicated' },
        { label: 'vault-cluster' },
        { label: 'Cluster networking', onClick: () => navigate({ screen: 'S0' }) },
        { label: 'Gateways', onClick: () => navigate({ screen: 'S8' }) },
        { label: site },
      ]} />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h1 className="text-[28px] font-bold text-[#1A1A1A]">{site}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Edit</Button>
          <Button variant="secondary" onClick={() => navigate({ screen: 'S8' })}>← Gateways</Button>
          <Button variant="critical" onClick={() => setShowRemove(true)}>Remove site</Button>
        </div>
      </div>

      {isNj && (
        <div className="mb-5">
          <Alert
            variant="warning"
            title="Gateway unresponsive — last heard 2025-07-14 04:59:00 UTC"
            description="1 of 2 gateways active. Check that the gateway agent is running in all configured availability zones. Verify outbound UDP port 51820 is open."
          />
        </div>
      )}
      {isFl && (
        <div className="mb-5">
          <Alert
            variant="neutral"
            title="No tunnel established."
            description="The gateway agent has not connected yet. Verify the agent is running and can reach HCP on outbound UDP port 51820."
          />
        </div>
      )}

      <div className="grid mt-2" style={{ gridTemplateColumns: '1fr 320px', gap: 28, maxWidth: 980 }}>
        {/* Left: Configuration */}
        <Card>
          <h2 className="text-[17px] font-semibold text-[#1A1A1A] mb-4">Configuration</h2>
          <DescriptionList items={descItems} />
        </Card>

        {/* Right: HA + Agent */}
        <div className="flex flex-col gap-4">
          {!isFl && (
            <Card>
              <h2 className="text-[17px] font-semibold text-[#1A1A1A] mb-4">High availability</h2>
              <div className="divide-y divide-[#E5E5E5]">
                <div className="grid pb-3" style={{ gridTemplateColumns: '130px 1fr', gap: 8 }}>
                  <span className="text-[12px] text-[#737373]">Paired DR site</span>
                  <span className="text-[14px] font-medium font-mono">{isNyc ? 'nj-dr' : 'nyc-prod'}</span>
                </div>
                <div className="grid pt-3" style={{ gridTemplateColumns: '130px 1fr', gap: 8 }}>
                  <span className="text-[12px] text-[#737373]">Failover status</span>
                  <Badge variant={isNyc ? 'success' : 'warning'}>{isNyc ? 'Ready' : 'Degraded'}</Badge>
                </div>
              </div>
              <p className="text-[12px] text-[#737373] mt-3 leading-[1.5]">
                Failover is automatic. If this site becomes unreachable, traffic will route through {isNyc ? 'nj-dr' : 'nyc-prod'}.
              </p>
            </Card>
          )}

          <Card>
            <h2 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">Gateway agent</h2>
            <p className="text-[13px] text-[#595959] leading-[1.5] mb-3">
              The gateway agent runs inside your network. You are responsible for deployment and updates.
            </p>
            <div className="flex flex-col gap-2">
              <Button variant="secondary" size="sm" onClick={() => setShowInstall(true)}>
                View install instructions
              </Button>
              <Button variant="secondary" size="sm">View update instructions</Button>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-[4px] px-3 py-2" style={{ background: '#F5F5F5' }}>
              <span className="text-[12px] text-[#737373] font-mono">Current: v1.2.1</span>
              <span className="text-[12px] text-[#8A4F00] ml-1">New version available</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Site topology */}
      <div className="mt-6" style={{ maxWidth: 980 }}>
        <h2 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">Topology</h2>
        <Card>
          {/* nyc-prod: active tunnel to us-east-1a, us-east-1b passive standby */}
          {/* nj-dr: active tunnel to us-east-1a, us-east-1b passive but unresponsive */}
          {/* fl-branch: no tunnel established */}
          <div className="flex items-center gap-0" style={{ minHeight: 140 }}>

            {/* Left: site gateway */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0" style={{ width: 172 }}>
              <div className="w-full rounded-[6px] border px-4 py-3 flex flex-col gap-1"
                style={{ borderColor: isNyc ? '#1A7F4B' : isNj ? '#8A4F00' : '#CCCCCC', background: isNyc ? '#F0FAF4' : isNj ? '#FFF8EE' : '#F9F9F9' }}>
                <p className="text-[11px] font-semibold text-[#737373]">Site Gateway</p>
                <p className="text-[13px] font-medium text-[#1A1A1A] font-mono">{site}</p>
              </div>
              <p className="text-[11px] text-[#737373]">Your network</p>
            </div>

            {/* Center: tunnel */}
            <div className="flex-1 flex flex-col items-center justify-center gap-1 px-2" style={{ minHeight: 100 }}>
              {isFl ? (
                <>
                  <div className="flex items-center gap-1 w-full">
                    <div className="flex-1 border-t-2 border-dashed border-[#CCCCCC]" />
                    <div className="w-6 h-6 rounded-full bg-white border border-[#CCCCCC] flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] text-[#999]">?</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#AAAAAA]">No tunnel established</p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5 w-full">
                    <div className="flex-1 border-t-2 border-[#1A7F4B]" style={{ borderStyle: 'solid' }} />
                    <div className="w-2 h-2 rounded-full bg-[#1A7F4B] flex-shrink-0" />
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded border"
                    style={{ color: '#B08000', borderColor: '#E5C84A', background: 'white' }}>
                    WireGuard® Tunnel
                  </span>
                </>
              )}
            </div>

            {/* Right: dataplane gateways — active on top, passive below */}
            <div className="flex flex-col gap-2 flex-shrink-0" style={{ width: 220 }}>
              <p className="text-[11px] font-semibold text-[#737373]">Dataplane Gateways</p>

              {/* Active gateway */}
              {!isFl && (
                <div className="rounded-[4px] px-3 py-2 border flex items-center justify-between"
                  style={{ borderColor: '#1A7F4B', background: '#F0FAF4' }}>
                  <div>
                    <p className="text-[12px] text-[#1A1A1A]">{isNyc ? 'us-east-1a' : 'us-east-1a'}</p>
                    <p className="text-[11px] text-[#737373]">Active tunnel</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              )}

              {/* Passive gateway */}
              <div className="rounded-[4px] px-3 py-2 border flex items-center justify-between"
                style={{ borderColor: isNj ? '#8A4F00' : '#E5E5E5', background: isNj ? '#FFF8EE' : '#F9F9F9' }}>
                <div>
                  <p className="text-[12px] text-[#1A1A1A]">us-east-1b</p>
                  <p className="text-[11px] text-[#737373]">{isFl ? 'No tunnel' : 'Passive standby'}</p>
                </div>
                <Badge variant={isNj ? 'warning' : isFl ? 'neutral' : 'neutral'}>
                  {isNj ? 'Unresponsive' : isFl ? 'Idle' : 'Standby'}
                </Badge>
              </div>

              {isFl && (
                <p className="text-[11px] text-[#737373] mt-1">
                  No active tunnel. Start the gateway agent to establish a connection.
                </p>
              )}
            </div>

          </div>
        </Card>
      </div>
    </Layout>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [state, setState] = useState<AppState>(DAY0)

  const navigate: Nav = updates =>
    setState(prev => ({ ...prev, ...updates }))

  const handleScenario = (enabled: boolean) =>
    setState(enabled ? DAYN : DAY0)

  const renderScreen = () => {
    switch (state.screen) {
      case 'S0': return <S0 navigate={navigate} state={state} />
      case 'S1': return <S1 navigate={navigate} />
      case 'S2': return <S2 navigate={navigate} />
      case 'S3': return <S3 navigate={navigate} />
      case 'S4': return <S4 navigate={navigate} state={state} />
      case 'S5': return <S5 navigate={navigate} />
      case 'S6': return <S6 navigate={navigate} state={state} />
      case 'S7': return <S7 navigate={navigate} state={state} />
      case 'S8': return <S8 navigate={navigate} state={state} />
      case 'S9': return <S9 navigate={navigate} state={state} />
      default:   return <S0 navigate={navigate} state={state} />
    }
  }

  return (
    <div style={{ fontFamily: "Inter, -apple-system, 'Segoe UI', sans-serif" }}>
      <AppHeader gatewaysEnabled={state.gatewaysEnabled} onScenario={handleScenario} />
      <AppSideNav navigate={navigate} screen={state.screen} />
      {renderScreen()}
    </div>
  )
}
