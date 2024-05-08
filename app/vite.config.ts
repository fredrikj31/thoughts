import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: "../",
  plugins: [react()],
  resolve: {
    alias: {
      "@shadcn-ui": path.resolve(__dirname, "./src/shadcn-ui"),
    },
  },
});
