import type { Preview } from '@storybook/react'

// Import design tokens (grayscale wireframe system)
import '@z/ds/index.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#f8f8f8' },
        { name: 'white', value: '#ffffff' },
        { name: 'light-gray', value: '#f4f4f4' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
