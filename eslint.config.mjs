import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ─── Next.js foundation (includes React, hooks, TypeScript recommended) ───
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ─── Prettier: disable all formatting-related lint rules ───
  ...compat.extends("prettier"),

  // ─── Project-wide strict rules ───
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      // ── Import hygiene ──────────────────────────────────────
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // Delegate unused-vars entirely to unused-imports plugin
      "@typescript-eslint/no-unused-vars": "off",
      "no-duplicate-imports": "error",

      // ── TypeScript strict ────────────────────────────────────
      // No escape hatches to unsafe `any`
      "@typescript-eslint/no-explicit-any": "error",
      // Enforce `import type` for type-only imports (enables better tree-shaking)
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      // Prefer `as Type` over `<Type>` assertions (JSX-safe)
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "as" },
      ],
      // Non-null assertions should be intentional — warn to force a review
      "@typescript-eslint/no-non-null-assertion": "warn",
      // Ban `require()` in TS files; use ESM imports
      "@typescript-eslint/no-require-imports": "error",
      // No `namespace` keyword in modern TS
      "@typescript-eslint/no-namespace": "error",
      // No floating promises (fire-and-forget without handling)
      "@typescript-eslint/no-floating-promises": "off", // needs parserOptions.project; opt-in later

      // ── General code quality ─────────────────────────────────
      // Allow console.warn / console.error only (no leftover debug logs)
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      // Always use strict equality
      eqeqeq: ["error", "always", { null: "ignore" }],
      // No ambiguous negation
      "no-unsafe-negation": "error",
      // No useless assignments
      "no-useless-assignment": "error",

      // ── React ───────────────────────────────────────────────
      // Enforce using <img> via next/image
      "@next/next/no-img-element": "error",
      // Avoid unnecessary JSX string literals wrapped in curlies
      "react/jsx-curly-brace-presence": [
        "warn",
        { props: "never", children: "never" },
      ],
      // Ensure hook dependency arrays are complete
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // ─── Relaxed rules for generated / third-party-copied UI components ───
  {
    files: ["src/components/ui/**/*.tsx", "src/components/ui/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "react/jsx-curly-brace-presence": "off",
    },
  },

  // ─── Config files: allow require() and looser rules ───
  {
    files: ["*.config.{js,mjs,cjs}", "next.config.*"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // ─── Ignore patterns ───
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "public/**",
      "*.d.ts",
    ],
  },
];

export default eslintConfig;
