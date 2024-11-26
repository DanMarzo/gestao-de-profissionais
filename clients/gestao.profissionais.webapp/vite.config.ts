import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import path from "path";

// Obter o diretório atual do arquivo de configuração
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "./dist",
  },
  root: path.resolve(__dirname, "./"),
  server: { port: 5124 },
  preview: { port: 5124 },
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  plugins: [],
});
