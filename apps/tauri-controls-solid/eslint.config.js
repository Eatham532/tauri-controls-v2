import js from "@eslint/js"
import ts from "typescript-eslint"
import solid from "eslint-plugin-solid"
import prettier from "eslint-config-prettier"

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      solid,
    },
    rules: {
      ...solid.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
  prettier
)
