import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    target: 'es2019',
    cssCodeSplit: false,
    cssMinify: false,
  },
  test: {
    include: ['tests/unit/**/*.test.js'],
    environment: 'node',
  },
});
