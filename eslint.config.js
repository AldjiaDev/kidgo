const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const { fixupPluginRules } = require('@eslint/compat');

// const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const reactNative = require('eslint-plugin-react-native');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const storybook = require('eslint-plugin-storybook');
const testingLibrary = require('eslint-plugin-testing-library');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*', '.storybook/storybook.requires.ts', 'node_modules/**/*'],
    plugins: {
      'react-native': fixupPluginRules(reactNative),
      // "@typescript-eslint": fixupPluginRules(typescriptEslint),
      'simple-import-sort': fixupPluginRules(simpleImportSort),
      storybook: fixupPluginRules(storybook),
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          usePrettierrc: true,
        },
      ],
      // Disallow console.log statements
      'no-console': ['warn'],
      // React Native specific rules
      'react-native/no-color-literals': 'error',
      'react-native/no-unused-styles': 'error',
      'react-native/no-raw-text': 'warn',
      'react-native/sort-styles': 'error',
      'react-native/no-single-element-style-arrays': 'error',
      // Typescript specific rules
      // "@typescript-eslint/no-unused-vars": ["warn"],
      // "@typescript-eslint/ban-ts-comment": "off",
      // "@typescript-eslint/no-var-requires": "off",
      // "@typescript-eslint/no-empty-interface": "off",
      // Sort imports
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // Side effect imports.
            ['^\\u0000'],
            // Packages `react` related packages come first.
            ['^react', '^@?\\w'],
            // Environment variables
            ['^(@env)(/.*|$)'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],
    },
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: {
      'testing-library': fixupPluginRules(testingLibrary),
    },
    rules: {
      ...testingLibrary.configs.react.rules,
    },
  },
]);
