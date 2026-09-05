import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname) },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", "e2e"],
    restoreMocks: true,
    clearMocks: true,
    unstubEnvs: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html", "lcov"],
      include: [
        "components/tools/calculators/logic/**/*.ts",
        "lib/content/**/*.ts",
        "lib/contact/**/*.ts",
        "lib/search-index.ts",
      ],
      exclude: ["**/*.test.*", "**/*.spec.*", "test/**", "e2e/**"],
    },
  },
});
