/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: { node: true },
  extends: ['eslint:recommended', 'plugin:unicorn/recommended', 'prettier'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
      },
      rules: {},
    },
  ],
  plugins: ['import', 'simple-import-sort', 'sort-keys-fix'],
  root: true,
  rules: {
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys-fix/sort-keys-fix': 'error',
    'unicorn/filename-case': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
};
