const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jasmine: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
    comment: true,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.json'],
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier', 'only-warn'],
  rules: {
    camelcase: [
      'error',
      {
        allow: ['UNSAFE_componentWillReceiveProps', 'UNSAFE_componentWillMount'],
      },
    ],
    'consistent-return': 0,
    'consistent-this': [1, 'that'],
    'default-case': [2],
    'dot-notation': [2],
    eqeqeq: [2, 'allow-null'],
    'guard-for-in': 2,
    'import/no-duplicates': ['error'],

    // Sort imports into groups
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react**',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'never',
      },
    ],

    'max-nested-callbacks': [1, 4],
    'no-alert': 2,
    'no-caller': 2,
    'no-console': 2,
    'no-else-return': ['error'],
    'no-global-strict': 0,
    'no-restricted-imports': [
      'error',
      {
        name: '@patternfly/react-icons',
        message:
          "Don't use group imports. Use @patternfly/react-icons/dist/js/icons/(kebab-case-name) instead.",
      },
      {
        name: 'lodash',
        message: "Don't use group imports. Use lodash/(funcName) instead.",
      },
    ],
    'no-shadow': 'off',
    // '@typescript-eslint/no-shadow': ['error'],
    'no-underscore-dangle': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: 'React', args: 'after-used' },
    ],
    '@typescript-eslint/no-use-before-define': 2,
    'no-var': 2,
    'object-shorthand': ['error', 'properties'],
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-template': 2,
    'prettier/prettier': 'error',
    radix: 2,
    'react/display-name': 0,
    'react/prop-types': 0,
    'react/self-closing-comp': 2,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'require-atomic-updates': 0,
  },
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        project,
      },
    },
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // It will default to "latest" and warn if missing, and to "detect" in the future
    },
  },
  globals: {
    process: 'readonly',
    global: 'readonly',
    React: true,
    JSX: true,
  },
  ignorePatterns: ['node_modules/', 'dist/'],
};
