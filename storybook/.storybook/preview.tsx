/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react'
import type { Preview, Decorator } from '@storybook/react'
import { breakpoints } from '@carbon/layout'
import { white, g10, g90, g100 } from '@carbon/themes'

// Import design tokens (grayscale wireframe system)
import '@z/ds/index.css'

// Array of controls that should be hidden in all stories
const GLOBAL_EXCLUDED_CONTROLS: (string | RegExp)[] = [
  'className',
  'children',
  'as',
  'ref',
  /^(?:on[A-Z]\w*)$/,
]

/**
 * ArgTypes enhancer that enforces a global control filter across all stories.
 */
export const argTypesEnhancers = [
  (context: { argTypes?: Record<string, unknown>; name?: string }) => {
    const current = context.argTypes || {}
    const next: Record<string, unknown> = { ...current }

    if (context?.name === '__meta') return current

    const strings = new Set<string>()
    const regexes: RegExp[] = []
    for (const p of GLOBAL_EXCLUDED_CONTROLS) {
      if (typeof p === 'string') strings.add(p)
      else if (p instanceof RegExp) regexes.push(p)
    }

    const disable = (name: string) => {
      const prev = (next[name] as Record<string, unknown>) || {}
      next[name] = {
        ...prev,
        table: { ...((prev.table as Record<string, unknown>) || {}), disable: true },
      }
    }

    strings.forEach((name) => {
      if (name in next) disable(name)
    })
    if (regexes.length) {
      Object.keys(next).forEach((name) => {
        if (strings.has(name)) return
        if (regexes.some((re) => re.test(name))) disable(name)
      })
    }

    return next
  },
]

/**
 * Theme decorator: maps the selected background to `data-carbon-theme`
 * and `data-theme-setting` attributes on <html>.
 */
const withCarbonTheme: Decorator = (Story, context) => {
  const backgroundValue = context.globals?.backgrounds?.value

  useEffect(() => {
    let theme = 'system'

    if (backgroundValue === white.background || backgroundValue === 'white') {
      theme = 'white'
    } else if (backgroundValue === g10.background || backgroundValue === 'g10') {
      theme = 'g10'
    } else if (backgroundValue === g90.background || backgroundValue === 'g90') {
      theme = 'g90'
    } else if (backgroundValue === g100.background || backgroundValue === 'g100') {
      theme = 'g100'
    }

    if (theme !== 'system') {
      document.documentElement.setAttribute('data-carbon-theme', theme)
    } else {
      document.documentElement.removeAttribute('data-carbon-theme')
    }

    const themeMapping =
      theme === 'white' || theme === 'g10'
        ? 'light'
        : theme === 'g90' || theme === 'g100'
          ? 'dark'
          : 'system'

    document.documentElement.setAttribute('data-theme-setting', themeMapping)
    document.documentElement.setAttribute('data-header-inverse', 'false')
  }, [backgroundValue])

  return <Story />
}

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      sort: 'alpha',
      hideNoControlsWarning: true,
    },
    viewport: {
      options: {
        sm: {
          name: 'Small',
          styles: { width: breakpoints.sm.width, height: '100%' },
        },
        md: {
          name: 'Medium',
          styles: { width: breakpoints.md.width, height: '100%' },
        },
        lg: {
          name: 'Large',
          styles: { width: breakpoints.lg.width, height: '100%' },
        },
        xlg: {
          name: 'X-Large',
          styles: { width: breakpoints.xlg.width, height: '100%' },
        },
        max: {
          name: 'Max',
          styles: { width: breakpoints.max.width, height: '100%' },
        },
      },
    },
    backgrounds: {
      // 8px grid aligns with Carbon spacing scale
      grid: {
        cellSize: 8,
        opacity: 0.5,
      },
      options: {
        canvas: { name: 'canvas (default)', value: '#f8f8f8' },
        white: { name: 'white', value: white.background },
        g10: { name: 'g10', value: g10.background },
        g90: { name: 'g90', value: g90.background },
        g100: { name: 'g100', value: g100.background },
      },
      default: 'canvas',
    },
  },
  decorators: [withCarbonTheme],
}

export default preview
