import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { pluginFramesTexts } from "@expressive-code/plugin-frames";
import tailwindcss from "@tailwindcss/vite";
import compress from "astro-compress";
import expressiveCode from "astro-expressive-code";
import { defineConfig, fontProviders } from "astro/config";
import babelPluginReactCompiler from "babel-plugin-react-compiler";
import { site } from "./src/config";

// Marked
pluginFramesTexts.overrideTexts("es", {
  copyButtonTooltip: "Copiar",
  copyButtonCopied: "¡Copiado!",
});

// https://astro.build/config
export default defineConfig({
  site,

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
        if (item.url === `${site}/`) item.priority = 1;

        return item;
      },
    }),
    react({
      babel: {
        plugins: [babelPluginReactCompiler],
      },
    }),
    compress({ HTML: false }),
  ],

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-inter",
        subsets: ["latin"],
        weights: ["100 900"],
      },
      {
        provider: fontProviders.google(),
        name: "Cascadia Mono",
        cssVariable: "--font-cascadia-mono",
        subsets: ["latin"],
        weights: ["200 700"],
      },
    ],
  },

  vite: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["react-number-format"],
    },
    server: {
      allowedHosts: ["dev.martindotpy.dev"],
    },
  },
});
