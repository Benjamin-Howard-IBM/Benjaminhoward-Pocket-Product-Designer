import type { ComponentType } from 'react';

export type CssLength = number | string;
export type ShowcaseMode = 'showcase' | 'mockup';
export type FrameOverflow = 'hidden' | 'auto' | 'visible';

export interface WireframeFrameConfig {
  /** Browser chrome title. Defaults to 'Platform'. */
  title?: string;
  /** Show browser chrome around the wireframe. Defaults to true. */
  chrome?: boolean;
  /** Outer frame height. Defaults to 700. Use larger values for tall wireframes. */
  height?: CssLength;
  /** Outer frame width. Defaults to 100%. */
  width?: CssLength;
  /** Optional outer frame max width. */
  maxWidth?: CssLength;
  /** Optional outer frame min width. */
  minWidth?: CssLength;
  /** Inner rendered content width. Use this for wide wireframes inside a scrollable frame. */
  contentWidth?: CssLength;
  /** Inner rendered content minimum width. */
  contentMinWidth?: CssLength;
  /** Inner rendered content height. Defaults to 100%. */
  contentHeight?: CssLength;
  /** Inner rendered content minimum height. */
  contentMinHeight?: CssLength;
  /** Overflow behavior for rendered wireframe content. Defaults to hidden. */
  overflow?: FrameOverflow;
  /** Overflow behavior for the outer frame shell. Defaults to hidden. */
  frameOverflow?: FrameOverflow;
  /** Content background. Defaults to var(--z-bg). */
  background?: string;
  /** Disable outer border. Defaults to true. */
  border?: boolean;
  /** Disable outer shadow. Defaults to true. */
  shadow?: boolean;
  /** Outer frame radius. Defaults to var(--z-radius-xl). */
  radius?: CssLength;
}

export interface ShowcaseLayoutConfig {
  /** Full narrative showcase or standalone gray mockup mode. */
  mode?: ShowcaseMode;
  /** Show fixed left navigation. Defaults to true in showcase mode, false in mockup mode. */
  nav?: boolean;
  /** Show title/subtitle header. Defaults to true in showcase mode, false in mockup mode. */
  header?: boolean;
  /** Show generated footer. Defaults to true in showcase mode, false in mockup mode. */
  footer?: boolean;
  /** Show preamble HTML when present. Defaults to true in showcase mode, false in mockup mode. */
  preamble?: boolean;
  /** Show the generated Wireframes heading after preamble. Defaults to showcase behavior. */
  wireframesHeading?: boolean;
  /** Show per-section title/subtitle headers. Defaults to true in showcase mode, false in mockup mode. */
  sectionHeader?: boolean;
  /** Show annotations. Defaults to true in showcase mode, false in mockup mode. */
  annotations?: boolean;
  /** Show state toggle controls. Defaults to true. */
  stateToggles?: boolean;
  /** Main content max width. Use 'none' for unconstrained wide mockups. */
  contentMaxWidth?: CssLength | 'none';
  /** Main content padding. */
  contentPadding?: CssLength;
  /** Left nav width. */
  navWidth?: CssLength;
  /** Spacing between sections. */
  sectionGap?: CssLength;
  /** Global frame defaults, overridable per section. */
  frame?: WireframeFrameConfig;
}

export interface ShowcaseSection {
  id: string;
  title: string;
  subtitle?: string;
  stageNumber?: string;
  phase?: 'interactive' | 'execution' | 'gate';
  states: Record<string, ComponentType>;
  annotation?: string;
  /** Per-section frame overrides. */
  frame?: WireframeFrameConfig;
}

export interface PreambleNavItem {
  id: string;
  label: string;
}

export interface ShowcaseConfig {
  title: string;
  subtitle: string;
  meta: { pdr: string; date: string };
  /** Output filename. Format: {seq}.{FeatureName}-{DraftVersion} (e.g., '001.IncidentResponse-Draft01') */
  outputName: string;
  /** 'grayscale' applies white-bg wireframe token overrides. 'dark' uses default dark tokens. */
  theme?: 'grayscale' | 'dark';
  /** Raw HTML rendered as context before wireframe sections (e.g., PDR journey content). */
  preamble?: string;
  /** Nav items for the preamble section. Each id must match an anchor in the preamble HTML. */
  preambleNav?: PreambleNavItem[];
  /** Presentation and sizing controls. */
  layout?: ShowcaseLayoutConfig;
  sections: ShowcaseSection[];
}
