import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
        port: 5173,
        clientPort: 5173,
        host: 'localhost'
    }
},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
