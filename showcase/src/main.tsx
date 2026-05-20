import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ShowcasePage } from './ShowcasePage';
import { loadShowcaseConfig } from './configLoader';

// Grayscale wireframe design tokens (provides var(--z-*) custom properties)
import '@z/ds/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShowcasePage config={loadShowcaseConfig()} />
  </StrictMode>,
);
