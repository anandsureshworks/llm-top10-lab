import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Unit tests for the pure logic in src/lib (slugify, category data/lookups).
// Node environment — no jsdom needed; component/content tests would add it later.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // Velite output (run `npx velite build` first; CI does).
      "#site/content": fileURLToPath(new URL("./.velite/index.js", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
