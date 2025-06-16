import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      "no-undef": "error",
      "no-unreachable": "error",
      "no-duplicate-imports": "error",
      "no-const-assign": "error",
      "no-var": "error",
      "prefer-const": "warn",
      "eqeqeq": "warn",
      "no-multiple-empty-lines": ["warn", { "max": 1 }],
      "no-trailing-spaces": "warn",
      "semi": ["error", "always"],
      "quotes": ["warn", "single"],
      "indent": ["warn", 2],
      "comma-dangle": ["warn", "always-multiline"],
      "object-curly-spacing": ["warn", "always"],
      "array-bracket-spacing": ["warn", "never"],
      "arrow-spacing": ["warn", { "before": true, "after": true }],
      "no-multi-spaces": "warn",
      "no-whitespace-before-property": "warn",
      "space-before-blocks": ["warn", "always"],
      "space-before-function-paren": ["warn", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }],
      "space-in-parens": ["warn", "never"],
      "space-infix-ops": "warn",
      "space-unary-ops": ["warn", {
        "words": true,
        "nonwords": false
      }],
      "spaced-comment": ["warn", "always"],
      "template-curly-spacing": ["warn", "never"],
      "yoda": ["warn", "never"],
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/prop-types": "warn",
      "react/react-in-jsx-scope": "error",
      "react/self-closing-comp": "warn",
      "react/jsx-closing-bracket-location": ["warn", "after-props"],
      "react/jsx-first-prop-new-line": ["warn", "multiline"],
      "react/jsx-max-props-per-line": ["warn", { "maximum": 1, "when": "multiline" }],
      "react/jsx-tag-spacing": ["warn", {
        "closingSlash": "never",
        "beforeSelfClosing": "always",
        "afterOpening": "never",
        "beforeClosing": "never"
      }],
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]); 