import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ensure proper base path for all environments
  base: "./",
  // Configure server for development
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  // Optimize build output
  build: {
    outDir: "dist",
    sourcemap: false,
    // Roll up options
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["framer-motion", "@radix-ui/react-avatar", "@radix-ui/react-dropdown-menu"],
        },
      },
    },
  },
});
