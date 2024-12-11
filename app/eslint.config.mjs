import { fixupConfigRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import sharedEslintConfig from "@thoughts/eslint-config/eslint.config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...sharedEslintConfig,
  {
    ignores: [
      "**/dist",
      "**/.eslintrc",
      "**/postcss.config.js",
      "**/tailwind.config.js",
      "**/.turbo",
      "**/node_modules",
      "**/build",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
    ),
  ),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        React: true,
        JSX: true,
      },

      parser: tsParser,
    },
  },
];
