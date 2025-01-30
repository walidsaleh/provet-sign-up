import { mergeConfig } from 'vite'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, {
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
