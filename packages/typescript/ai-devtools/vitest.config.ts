import { defineConfig } from 'vitest/config'
import packageJson from './package.json' with { type: 'json' }

export default defineConfig({
  test: {
    name: packageJson.name,
    dir: './tests',
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
    watch: false,
    coverage: { enabled: true, include: ['src/**/*'] },
    typecheck: { enabled: true },
  },
})
