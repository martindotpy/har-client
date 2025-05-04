// @ts-check
import react from "@astrojs/react";
import { pluginFramesTexts } from "@expressive-code/plugin-frames";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

pluginFramesTexts.overrideTexts("es", {
  copyButtonTooltip: "Copiar",
  copyButtonCopied: "¡Copiado!",
});

// https://astro.build/config
export default defineConfig({
  site: "https://har.vluepixel.com",

  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  integrations: [
    react(),
    expressiveCode({
      themes: ["tokyo-night"],
      styleOverrides: {
        uiFontFamily: "var(--font-sans)",
        codeFontFamily: "var(--font-mono)",
      },
      defaultLocale: "es",
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
