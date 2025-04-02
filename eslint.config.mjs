import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
  {
    files: ['src/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: globals.browser,
    },
  },
  {
    files: ['webpack.config.js'],
    languageOptions: {
      sourceType: 'script',
      globals: globals.node,
    },
  },
  {
    files: ['**/*.js'],
    plugins: { js },
    extends: ['js/recommended'],
  },
]);
