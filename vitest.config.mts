import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use jsdom environment for DOM testing
    environment: 'jsdom',

    // Global setup file for Testing Library and mocks
    setupFiles: ['./src/test/setup.ts'],

    // Enable global test APIs (describe, it, expect, etc.)
    globals: true,

    // Stable timezone for consistent date tests
    env: {
      TZ: 'UTC',
    },

    // Include pattern for test files
    include: ['src/test/**/*.test.ts', 'src/test/**/*.test.tsx'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/test/**',
        'src/components/ui/**',
        'src/**/*.d.ts',
        'src/**/*.types.ts',
        'src/app/**/layout.tsx',
        'src/app/**/page.tsx',
        'src/app/**/not-found.tsx',
      ],
    },
  },

  resolve: {
    alias: {
      // Path alias: @/ → src/
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
});
