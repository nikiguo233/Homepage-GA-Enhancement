import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { embedShowcasePlugin } from "./vite/embedShowcasePlugin";
import { widgetDataPlugin } from "./vite/widgetDataPlugin";

export default defineConfig({
  base: "./",
  plugins: [react(), embedShowcasePlugin(), widgetDataPlugin()],
});
