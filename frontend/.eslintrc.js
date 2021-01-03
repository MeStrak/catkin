module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/prettier',
    '@vue/typescript',
    'prettier',
    'prettier/vue',
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/rule-name': 'error',
    },
  },
};
