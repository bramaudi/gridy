import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import tsconfigPaths from "vite-tsconfig-paths"
import Pages from "vite-plugin-pages"
import { VitePWA } from "vite-plugin-pwa"
import PWAConfig from "./src/config/pwa"

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    VitePWA(PWAConfig),
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
});
