// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
  // Конфигурация для файлов в src/ – они используют ES-модули (import/export) и работают в браузере
  {
    files: ['src/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: globals.browser,
    },
  },
  // Конфигурация для webpack.config.js – он работает в Node.js и использует CommonJS
  {
    files: ['webpack.config.js'],
    languageOptions: {
      sourceType: 'script',
      globals: globals.node,
    },
  },
  // Общая конфигурация для всех JS-файлов – применяем плагин @eslint/js и рекомендуемые правила
  {
    files: ['**/*.js'],
    plugins: { js },
    extends: ['js/recommended'],
  },
]);
