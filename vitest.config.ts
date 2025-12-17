import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@features': path.resolve(__dirname, './features'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    globals: true,
    css: false,
  },
});

