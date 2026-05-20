import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'path'
import fs from 'fs'

// Read the outputName from the active showcase config.
function readOutputName(): string {
  const configEnv = process.env.SHOWCASE_CONFIG || process.env.VITE_SHOWCASE_CONFIG
  if (!configEnv) {
    throw new Error(
      'No showcase config set. Set SHOWCASE_CONFIG or VITE_SHOWCASE_CONFIG to a path under showcases/, e.g. VITE_SHOWCASE_CONFIG=my-project/config',
    )
  }
  const configName = configEnv.replace(/^showcases\//, '').replace(/\.tsx$/, '')
  const configPath = path.resolve(__dirname, `showcases/${configName}.tsx`)

  if (!fs.existsSync(configPath)) {
    throw new Error(`Showcase config not found: ${configPath}`)
  }

  const src = fs.readFileSync(configPath, 'utf-8')
  const outputNamePattern = /outputName:\s*['"]([^'"]+)['"]/
  const match = src.match(outputNamePattern)
  return match?.[1] ?? 'showcase'
}

const outputName = readOutputName()

// Plugin that renames index.html to the configured output name after build
function renameOutput(): import('vite').Plugin {
  return {
    name: 'rename-output',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const src = path.join(distDir, 'index.html')
      const dest = path.join(distDir, `${outputName}.html`)
      if (fs.existsSync(src)) {
        fs.renameSync(src, dest)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    viteSingleFile(),
    renameOutput(),
  ],
  resolve: {
    alias: {
      '@z/ds': path.resolve(__dirname, '../storybook/tokens'),
      '@z/wireframes': path.resolve(__dirname, '../storybook/stories/wireframes'),
    },
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: Infinity,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
})
