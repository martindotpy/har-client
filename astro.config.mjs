// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
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
  site: "https://har.martindotpy.dev",

  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  integrations: [
    expressiveCode({
      themes: ["tokyo-night"],
      styleOverrides: {
        uiFontFamily: "var(--font-sans)",
        codeFontFamily: "var(--font-mono)",
      },
      defaultLocale: "es",
    }),
    sitemap({
      changefreq: "monthly",
      priority: 0.8,
      serialize(item) {
        if (item.url === "https://har.martindotpy.dev/") item.priority = 1;

        return item;
      },
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
