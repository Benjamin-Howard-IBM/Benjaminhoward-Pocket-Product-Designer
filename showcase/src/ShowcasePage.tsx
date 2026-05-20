import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { CssLength, ShowcaseConfig, ShowcaseLayoutConfig } from './types';
import { ShowcaseNav } from './ShowcaseNav';
import { ShowcaseSection } from './ShowcaseSection';

/* ── Styles (uses var(--z-*) wireframe tokens from index.css) ── */

const pageStyle: CSSProperties = {
  background: 'var(--z-bg)',
  minHeight: '100vh',
  fontFamily: 'var(--z-font-sans)',
  margin: 0,
};

const mainContent: CSSProperties = {
  marginLeft: 220,
  padding: '48px 64px',
  maxWidth: 1200,
  boxSizing: 'border-box',
};

const metaLine: CSSProperties = {
  fontFamily: 'var(--z-font-mono)',
  fontSize: 'var(--z-text-sm)',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--z-text-helper)',
  marginBottom: 12,
};

const titleStyle: CSSProperties = {
  fontFamily: 'var(--z-font-sans)',
  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
  color: 'var(--z-text-primary)',
  margin: 0,
  lineHeight: 1.15,
  fontWeight: 600,
};

const subtitleStyle: CSSProperties = {
  fontFamily: 'var(--z-font-sans)',
  fontSize: 'var(--z-text-lg)',
  color: 'var(--z-text-secondary)',
  fontWeight: 400,
  marginTop: 12,
  marginBottom: 0,
  lineHeight: 'var(--z-leading-relaxed)',
};

const separator: CSSProperties = {
  height: 1,
  background: 'var(--z-border-subtle)',
  margin: '40px 0',
  border: 'none',
};

const sectionWrapper: CSSProperties = {
  marginBottom: 80,
};

const footerStyle: CSSProperties = {
  fontFamily: 'var(--z-font-mono)',
  fontSize: 'var(--z-text-sm)',
  color: 'var(--z-text-helper)',
  marginTop: 48,
  paddingTop: 24,
  borderTop: '1px solid var(--z-border-subtle)',
};

function cssLength(value: CssLength | 'none' | undefined): string | number | undefined {
  return value;
}

function getLayout(config: ShowcaseConfig): Required<Pick<ShowcaseLayoutConfig,
  'mode' | 'nav' | 'header' | 'footer' | 'preamble' | 'sectionHeader' | 'annotations' | 'stateToggles'
>> & ShowcaseLayoutConfig {
  const mode = config.layout?.mode ?? 'showcase';
  const isMockup = mode === 'mockup';

  return {
    ...config.layout,
    mode,
    nav: config.layout?.nav ?? !isMockup,
    header: config.layout?.header ?? !isMockup,
    footer: config.layout?.footer ?? !isMockup,
    preamble: config.layout?.preamble ?? !isMockup,
    sectionHeader: config.layout?.sectionHeader ?? !isMockup,
    annotations: config.layout?.annotations ?? !isMockup,
    stateToggles: config.layout?.stateToggles ?? true,
  };
}

/* ── Component ──────────────────────────────────────────────── */

export interface ShowcasePageProps {
  config: ShowcaseConfig;
}

export function ShowcasePage({ config }: ShowcasePageProps) {
  const layout = getLayout(config);
  const navWidth = layout.navWidth ?? 220;
  const mainStyle: CSSProperties = {
    ...mainContent,
    marginLeft: layout.nav ? cssLength(navWidth) : 0,
    padding: cssLength(layout.contentPadding) ?? (layout.mode === 'mockup' ? 24 : '48px 64px'),
    maxWidth: layout.contentMaxWidth === 'none'
      ? 'none'
      : (cssLength(layout.contentMaxWidth) ?? (layout.mode === 'mockup' ? 'none' : 1200)),
  };
  const perSectionWrapper: CSSProperties = {
    ...sectionWrapper,
    marginBottom: cssLength(layout.sectionGap) ?? (layout.mode === 'mockup' ? 32 : 80),
  };
  const showPreamble = layout.preamble && Boolean(config.preamble);
  const showWireframesHeading = layout.wireframesHeading ?? (Boolean(showPreamble) && layout.mode === 'showcase');

  const [activeId, setActiveId] = useState<string | undefined>(
    config.sections[0]?.id,
  );
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  /* ── Intersection observer for active nav tracking ──────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );

    for (const el of sectionRefs.current.values()) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [config.sections]);

  function registerRef(id: string, el: HTMLElement | null) {
    if (el) {
      sectionRefs.current.set(id, el);
    } else {
      sectionRefs.current.delete(id);
    }
  }

  return (
    <div style={pageStyle}>
      {layout.nav && (
        <ShowcaseNav
          sections={config.sections}
          activeId={activeId}
          preambleNav={showPreamble ? config.preambleNav : undefined}
          width={navWidth}
        />
      )}

      <main style={mainStyle}>
        {/* Hero header */}
        {layout.header && (
          <header>
            <div style={metaLine}>
              {config.meta.pdr} &middot; {config.meta.date}
            </div>
            <h1 style={titleStyle}>{config.title}</h1>
            <p style={subtitleStyle}>{config.subtitle}</p>
          </header>
        )}

        {layout.header && <hr style={separator} />}

        {/* Preamble (e.g., PDR journey context) */}
        {showPreamble && (
          <div
            id="preamble"
            ref={(el) => registerRef('preamble', el)}
            style={{ marginBottom: 80 }}
            dangerouslySetInnerHTML={{ __html: config.preamble }}
          />
        )}

        {/* Wireframes heading */}
        {showWireframesHeading && (
          <>
            <hr style={separator} />
            <h2 style={{
              fontFamily: 'var(--z-font-sans)',
              fontSize: 'var(--z-text-2xl)',
              fontWeight: 600,
              color: 'var(--z-text-primary)',
              marginBottom: 40,
            }}>Wireframes</h2>
          </>
        )}

        {/* Sections */}
        {config.sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            ref={(el) => registerRef(section.id, el)}
            style={perSectionWrapper}
          >
            <ShowcaseSection
              section={section}
              layout={layout}
              showHeader={layout.sectionHeader}
              showAnnotation={layout.annotations}
              showStateToggle={layout.stateToggles}
            />
          </div>
        ))}

        {/* Footer */}
        {layout.footer && (
          <footer style={footerStyle}>
            Generated {config.meta.date} from {config.meta.pdr}
          </footer>
        )}
      </main>
    </div>
  );
}
