import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Your configuration options here
  site: 'https://everest-expedition.com',
  compressHTML: true,
  build: {
    assets: 'assets'
  },
  vite: {
    ssr: {
      external: ['svgo']
    }
  }
});
