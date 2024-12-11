import onlyWarn from "eslint-plugin-only-warn";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/node_modules/", "**/dist/"],
  },
  ...compat.extends("eslint:recommended", "prettier", "eslint-config-turbo"),
  {
    plugins: {
      "only-warn": onlyWarn,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
  {
    files: ["**/*.js?(x)", "**/*.ts?(x)"],
  },
];
