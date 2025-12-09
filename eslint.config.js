import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["backend/**/*.js"],
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
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        setImmediate: "readonly",
        setTimeout: "readonly",
      },
    },
  },
  {
    files: ["frontend/**/*.js", "frontend/**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        React: "readonly",
        JSX: "readonly",
      },
    },
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
    },
  },
]);
