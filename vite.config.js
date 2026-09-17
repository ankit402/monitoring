import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",
    port: 5173,

    proxy: {
      "/api": {
        target: "http://localhost:5072",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  define: {
    __APP_NAME__: JSON.stringify("NanoPerso"),
  },
});