import { useState, type CSSProperties } from 'react';
import type {
  CssLength,
  ShowcaseLayoutConfig,
  ShowcaseSection as SectionType,
  WireframeFrameConfig,
} from './types';
import { StateToggle } from './StateToggle';

/* ── Styles (uses var(--z-*) wireframe tokens from index.css) ── */

const sectionContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
};

const headerArea: CSSProperties = {
  marginBottom: 20,
};

const stageNumberStyle: CSSProperties = {
  fontFamily: 'var(--z-font-mono)',
  fontSize: 'var(--z-text-sm)',
  color: 'var(--z-text-helper)',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: 4,
};

const titleStyle: CSSProperties = {
  fontFamily: 'var(--z-font-sans)',
  fontSize: 'var(--z-text-2xl)',
  color: 'var(--z-text-primary)',
  margin: 0,
  lineHeight: 1.3,
  fontWeight: 600,
};

const subtitleStyle: CSSProperties = {
  fontFamily: 'var(--z-font-sans)',
  fontSize: 'var(--z-text-base)',
  color: 'var(--z-text-secondary)',
  margin: '4px 0 0',
  fontWeight: 400,
  lineHeight: 'var(--z-leading-relaxed)',
};

const wireframeContainer: CSSProperties = {
  position: 'relative',
  height: 700,
  overflow: 'hidden',
  background: 'var(--z-layer-01)',
  borderRadius: 'var(--z-radius-xl)',
  boxShadow: 'var(--z-shadow-lg)',
  border: '1px solid var(--z-border-subtle)',
};

const chromeBar: CSSProperties = {
  height: 36,
  background: 'var(--z-layer-01)',
  borderBottom: '1px solid var(--z-border-subtle)',
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px',
  gap: 8,
  userSelect: 'none',
  flexShrink: 0,
};

function dotStyle(i: number): CSSProperties {
  return {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: 'var(--z-border-subtle)',
    marginLeft: i === 0 ? 0 : 4,
  };
}

const tabStyle: CSSProperties = {
  padding: '4px 12px',
  borderRadius: '6px 6px 0 0',
  fontSize: 11,
  fontFamily: 'var(--z-font-sans)',
  background: 'var(--z-layer-02)',
  color: 'var(--z-text-secondary)',
};

const tabPlusStyle: CSSProperties = {
  padding: '4px 8px',
  fontSize: 11,
  fontFamily: 'var(--z-font-sans)',
  color: 'var(--z-text-placeholder)',
};

const urlBarStyle: CSSProperties = {
  flex: 1,
  maxWidth: 480,
  height: 20,
  borderRadius: 10,
  background: 'var(--z-layer-02)',
  margin: '0 auto',
};

const contentArea: CSSProperties = {
  position: 'relative',
  height: 'calc(100% - 37px)',
  overflow: 'hidden',
  background: 'var(--z-bg)',
};

const contentInner: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

const toggleArea: CSSProperties = {
  marginTop: 16,
};

const annotationArea: CSSProperties = {
  borderTop: '1px solid var(--z-border-subtle)',
  paddingTop: 24,
  marginTop: 24,
  fontFamily: 'var(--z-font-sans)',
  fontSize: 'var(--z-text-base)',
  lineHeight: 1.7,
  color: 'var(--z-text-secondary)',
};

/* ── Component ──────────────────────────────────────────────── */

export interface ShowcaseSectionProps {
  section: SectionType;
  layout?: ShowcaseLayoutConfig;
  showHeader?: boolean;
  showAnnotation?: boolean;
  showStateToggle?: boolean;
}

function cssLength(value: CssLength | undefined): string | number | undefined {
  return value;
}

function mergeFrame(
  globalFrame: WireframeFrameConfig | undefined,
  sectionFrame: WireframeFrameConfig | undefined,
): WireframeFrameConfig {
  return {
    ...globalFrame,
    ...sectionFrame,
  };
}

export function ShowcaseSection({
  section,
  layout,
  showHeader = true,
  showAnnotation = true,
  showStateToggle = true,
}: ShowcaseSectionProps) {
  const stateNames = Object.keys(section.states);
  const [active, setActive] = useState(stateNames[0] ?? '');

  const ActiveComponent = section.states[active];
  const frame = mergeFrame(layout?.frame, section.frame);
  const showChrome = frame.chrome !== false;
  const contentOverflow = frame.overflow ?? 'hidden';
  const frameStyle: CSSProperties = {
    ...wireframeContainer,
    height: cssLength(frame.height) ?? 700,
    width: cssLength(frame.width) ?? '100%',
    maxWidth: frame.maxWidth === 'none' ? 'none' : cssLength(frame.maxWidth),
    minWidth: cssLength(frame.minWidth),
    overflow: frame.frameOverflow ?? 'hidden',
    background: frame.background ?? wireframeContainer.background,
    borderRadius: cssLength(frame.radius) ?? wireframeContainer.borderRadius,
    border: frame.border === false ? 'none' : wireframeContainer.border,
    boxShadow: frame.shadow === false ? 'none' : wireframeContainer.boxShadow,
  };
  const contentAreaStyle: CSSProperties = {
    ...contentArea,
    height: showChrome ? 'calc(100% - 37px)' : '100%',
    overflow: contentOverflow,
    background: frame.background ?? contentArea.background,
  };
  const contentInnerStyle: CSSProperties = {
    ...contentInner,
    width: cssLength(frame.contentWidth) ?? '100%',
    minWidth: cssLength(frame.contentMinWidth),
    height: cssLength(frame.contentHeight) ?? '100%',
    minHeight: cssLength(frame.contentMinHeight),
  };

  return (
    <div style={sectionContainer}>
      {/* Section header */}
      {showHeader && (
        <div style={headerArea}>
          {section.stageNumber && (
            <div style={stageNumberStyle}>{section.stageNumber}</div>
          )}
          <h2 style={titleStyle}>{section.title}</h2>
          {section.subtitle && <p style={subtitleStyle}>{section.subtitle}</p>}
        </div>
      )}

      {/* Wireframe area */}
      <div style={frameStyle}>
        {/* Browser chrome bar */}
        {showChrome && (
          <div style={chromeBar}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={dotStyle(i)} />
            ))}
            <div style={{ width: 12 }} />
            <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <span style={tabStyle}>{frame.title ?? 'Platform'}</span>
              <span style={tabPlusStyle}>+</span>
            </div>
            <div style={urlBarStyle} />
            <div style={{ width: 48 }} />
          </div>
        )}

        {/* Rendered wireframe state */}
        <div style={contentAreaStyle}>
          <div style={contentInnerStyle}>
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </div>

      {/* State toggle pills */}
      {showStateToggle && stateNames.length > 1 && (
        <div style={toggleArea}>
          <StateToggle
            states={stateNames}
            active={active}
            onSelect={setActive}
          />
        </div>
      )}

      {/* Annotation */}
      {showAnnotation && section.annotation && (
        <div style={annotationArea}>
          <style dangerouslySetInnerHTML={{ __html: `
            .ann-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 24px 32px;
            }
            .ann-block h3 {
              font-family: var(--z-font-mono);
              font-size: var(--z-text-sm);
              text-transform: uppercase;
              letter-spacing: 0.12em;
              color: var(--z-text-helper);
              margin: 0 0 8px;
            }
            .ann-block p {
              margin: 0 0 8px;
              font-size: var(--z-text-base);
              line-height: 1.65;
              color: var(--z-text-secondary);
              font-weight: 400;
            }
            .ann-block ul {
              margin: 0; padding: 0; list-style: none;
            }
            .ann-block ul li {
              padding-left: 12px;
              position: relative;
              margin-bottom: 4px;
              font-size: var(--z-text-base);
              line-height: 1.55;
              color: var(--z-text-secondary);
              font-weight: 400;
            }
            .ann-block ul li::before {
              content: '';
              position: absolute;
              left: 0;
              top: 0.55em;
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background: var(--z-text-helper);
            }
            .ann-block ul li strong {
              font-weight: 600;
              color: var(--z-text-primary);
            }
          `}} />
          <div className="ann-grid" dangerouslySetInnerHTML={{ __html: section.annotation }} />
        </div>
      )}
    </div>
  );
}
