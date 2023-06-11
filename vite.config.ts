import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import svgr from "vite-plugin-svgr"

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    // To access env vars here use process.env.TEST_VAR
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          // svgr options
        },
      }),
    ],
    build: {
      dynamicImportVarsOptions: {
        exclude: [],
      },
    },
    server: {
      host: true,
      port: 8080, // This is the port which we will use in docker
    },
  })
}
