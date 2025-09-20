import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.ts", "src/**/__tests__/**/*.ts"],
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
    coverage: {
      reporter: ["text", "lcov"],
    },
    exclude: ["tests/e2e/**"],
  },
});
