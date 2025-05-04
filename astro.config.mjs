// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://har.vluepixel.com",

  integrations: [
    react(),
    expressiveCode({
      themes: ["tokyo-night"],
      styleOverrides: {
        uiFontFamily: "var(--font-sans)",
        codeFontFamily: "var(--font-mono)",
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
