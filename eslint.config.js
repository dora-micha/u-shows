import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  prettierConfig,
  {
    ignores: ['dist/', 'node_modules/', 'coverage/']
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'vue/multi-word-component-names': 'off'
    }
  }
]
