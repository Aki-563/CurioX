import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://curiox.in',
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'never' },
  devToolbar: { enabled: false },
});
