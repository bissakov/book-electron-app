import { defineConfig } from "electron-vite";

export default defineConfig({
  main: {
    minWidth: 800,
    minHeight: 600,
  },
  preload: {},
  renderer: {},
});
