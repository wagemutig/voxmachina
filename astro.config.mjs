// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://wagemutig.github.io',
  base: '/voxmachina',
  vite: {
    plugins: [tailwindcss()],
  },
});
