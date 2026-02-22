// import resolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import { sveltekit } from "@sveltejs/kit/vite"
import tailwindcss from "@tailwindcss/vite"
// import svelte from "rollup-plugin-svelte"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), terser()],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"]
  },
  build: {
    rollupOptions: {
      plugins: [
        // svelte({}),
        // resolve({ browser: true }),
        terser()
      ]
    }
  },

  clearScreen: false,
  server: {
    port: 1422,
    strictPort: true
  },
  envPrefix: ["VITE_", "TAURI_"]
})
