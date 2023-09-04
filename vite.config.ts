import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";

const pageData = {
  "/index.html": {
    title: "Main Page",
  },
  "/about.html": {
    title: "Sub Page",
  },
};

export default defineConfig({
  build: {
    manifest: true,
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@styles/global.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      // "@styles": resolve(__dirname, "src/styles"),
    },
  },
  plugins: [
    // @ts-ignore
    handlebars({
      partialDirectory: resolve(__dirname, "src/components"),
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
});
