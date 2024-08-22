import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: [
      'dist',
      'tailwind.config.cjs',
      'vite.config.ts',
      'postcss.config.cjs',
      'src/components/ui/*'
    ] 
  },
  {
    extends: [
      js.configs.recommended, 
      ...tseslint.configs.recommended,
      'airbnb',
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 0,
      'react/no-array-index-key': 0,
      'react/require-default-props': 0,
      'no-param-reassign': 0,
      'jsx-a11y/label-has-associated-control': 0,
      '@typescript-eslint/no-explicit-any': 'off',
      'react/jsx-props-no-spreading': 'off',
      'no-nested-ternary': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'import/no-mutable-exports': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'react/no-unstable-nested-components': 'off',
      'react/function-component-definition': 'off',
      'no-unsafe-optional-chaining': 'off',
      'react/destructuring-assignment': 'off',
      'prefer-destructuring': 'off',
      'react/prop-types': 'off',
      'react/button-has-type': 'off',
      'react/no-unused-prop-types': 'off',
      'react/display-name': 'off',
      'import/no-duplicates': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react-hooks/no-new': 'off',
      'no-new': 'off',
      'import/extensions': 'off',
      'import/order': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'es5',
          tabWidth: 2,
          semi: true,
          singleQuote: true,
          endOfLine: 'auto',
        },
      ],
    },
  },
)
