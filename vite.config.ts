import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    plugins: [
      tanstackStart({
        server: { entry: "server" },
      }),
      react(),
      tsconfigPaths(),
      tailwindcss(),
      ...(isBuild ? [cloudflare()] : []),
    ],
  };
});
