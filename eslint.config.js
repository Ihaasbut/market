import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      // FSD правила через compat-обёртку
      ...fixupConfigRules(compat.extends('@feature-sliced')),
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.app.json', './tsconfig.node.json', './tsconfig.json'],
        },
      },
    },
    rules: {
      'import/no-internal-modules': 'off',
    },
  },
])