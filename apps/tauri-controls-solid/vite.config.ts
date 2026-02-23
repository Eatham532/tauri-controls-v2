import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import terser from "@rollup/plugin-terser"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import solidPlugin from "vite-plugin-solid"
import * as packageJson from "./package.json"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    dts({
      include: ["./src/tauri-controls"],
      rollupTypes: true,
    }),
    solidPlugin(),
  ],

  build: {
    lib: {
      entry: resolve("src", "tauri-controls/index.ts"),
      name: "TauriControls",
      formats: ["es"], //"umd"
      fileName: () => `tauri-controls.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      plugins: [terser()],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@tauri-apps/plugin-os": "pluginOs",
          clsx: "clsx",
          "tailwind-merge": "tailwindMerge",
          "@tauri-apps/plugin-window": "pluginWindow",
        },
        intro: 'import "./tauri-controls.css";',
        assetFileNames: (assetInfo) => {
          if (assetInfo?.name && assetInfo.name.endsWith('.css')) return 'tauri-controls.css'
          return 'assets/[name]-[hash][extname]'
        },
        plugins: [terser()],
      },
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1423,
    strictPort: true,
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
})
