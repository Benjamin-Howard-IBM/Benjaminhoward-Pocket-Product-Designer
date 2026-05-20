import type { ShowcaseConfig } from './types';

interface ImportMetaEnv {
  readonly VITE_SHOWCASE_CONFIG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  glob<T>(pattern: string, options: { eager: true }): Record<string, T>;
}

type ShowcaseModule = {
  config: ShowcaseConfig;
};

const modules = import.meta.glob<ShowcaseModule>('../showcases/**/*.tsx', {
  eager: true,
});

function normalizeConfigName(name: string | undefined): string {
  const raw = name?.trim();
  if (!raw) {
    throw new Error(
      'No showcase config set. Set VITE_SHOWCASE_CONFIG to a path under showcases/, e.g. VITE_SHOWCASE_CONFIG=my-project/config',
    );
  }

  return raw
    .replace(/^\.\.\/showcases\//, '')
    .replace(/^showcases\//, '')
    .replace(/\.tsx$/, '');
}

export function loadShowcaseConfig(): ShowcaseConfig {
  const configName = normalizeConfigName(import.meta.env.VITE_SHOWCASE_CONFIG);
  const moduleKey = `../showcases/${configName}.tsx`;
  const mod = modules[moduleKey];

  if (!mod) {
    const available = Object.keys(modules)
      .map((key) => key.replace('../showcases/', '').replace(/\.tsx$/, ''))
      .sort()
      .join(', ');

    throw new Error(
      `Unknown showcase config "${configName}". Available configs: ${available}`,
    );
  }

  return mod.config;
}
