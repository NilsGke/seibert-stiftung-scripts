import { defineConfig } from "vite";
import monkey, {
  MonkeyOption,
  TampermonkeyUserScript,
} from "vite-plugin-monkey";

export const monkeyConfig = {
  entry: "src/index.ts",
  build: {
    fileName: "seibert-stiftung-global.user.js",
    metaFileName: "seibert-stiftung-global.meta.js",
  },
} satisfies MonkeyOption;

const userscriptOptions = {
  name: "Seibert Stiftung Global",
  namespace: "https://github.com/NilsGke/seibert-stiftung-scripts",
  description: "general purpose script for Seibert Stiftung Chromebooks",
  author: "NilsGke",
  match: "*://*/*",
  downloadURL: `https://github.com/NilsGke/seibert-stiftung-scripts/releases/latest/download/${monkeyConfig.build.fileName}`,
  updateURL: `https://github.com/NilsGke/seibert-stiftung-scripts/releases/latest/download/${monkeyConfig.build.metaFileName}`,
  version: "{{version}}",
} satisfies TampermonkeyUserScript;

export const viteConfig = {
  build: {
    rollupOptions: {
      output: { dir: "dist" },
    },
    minify: false,
    sourcemap: true,
  },
  plugins: [
    monkey({
      ...monkeyConfig,
      userscript: userscriptOptions,
    }),
  ],
};

export default defineConfig(viteConfig);
