import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Second pass of `npm run build`: keeps dist/index.html and adds the self-contained privacy page.
// Two single-entry builds avoid a shared chunk that vite-plugin-singlefile cannot inline.
export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    target: 'es2019',
    cssCodeSplit: false,
    cssMinify: false,
    emptyOutDir: false,
    rollupOptions: {
      input: 'privacidade.html',
    },
  },
});
