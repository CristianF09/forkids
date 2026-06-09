import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Configurație pentru Backend
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        process: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-console": "warn",
      "prefer-const": "warn",
      "eqeqeq": "warn",
      "semi": ["error", "always"],
      "quotes": ["warn", "single"],
      "indent": ["warn", 2],
      "comma-dangle": ["warn", "always-multiline"],
      "object-curly-spacing": ["warn", "always"],
    },
  },
  // Configurație pentru Frontend (React)
  {
    files: ["frontend/src/**/*.{js,jsx}"],
    plugins: {
      react: pluginReact,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      "react/prop-types": "off", // O poți activa dacă folosești PropTypes
      "react/react-in-jsx-scope": "off", // Nu mai este necesar cu React 17+
      "no-unused-vars": "warn",
      "no-console": "warn",
      "semi": ["error", "always"],
      "quotes": ["warn", "single"],
      "indent": ["warn", 2],
      "comma-dangle": ["warn", "always-multiline"],
      "object-curly-spacing": ["warn", "always"],
    },
    settings: {
      react: {
        version: "detect", // Detectează automat versiunea de React
      },
    },
  },
];