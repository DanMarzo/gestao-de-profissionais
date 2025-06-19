import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import path from "path";

// Obter o diretório atual do arquivo de configuração
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = Number.parseInt(env.VITE_APP_PORT);
  return {
    root: path.resolve(__dirname, "./"),
    server: { port },
    preview: { port },
    resolve: {
      alias: {
        "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      },
    },
    plugins: [],
  };
});
