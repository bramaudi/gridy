import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import tsconfigPaths from "vite-tsconfig-paths"
import Pages from "vite-plugin-pages"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    VitePWA({
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],  
      manifest: {
        name: 'Gridy',
        short_name: 'Gridy',
        description: 'Add grid line overlay to image',
        theme_color: '#fde68a',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    }),
    Pages({
      react: true,
      importMode: 'async',
    }),
    solidPlugin(),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  server: {
    host: '0.0.0.0'
  }
});
