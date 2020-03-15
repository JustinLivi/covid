module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'airbnb',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['jest', 'prettier'],
  rules: {
    'import/no-default-export': 1,
    'import/prefer-default-export': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  env: {
    'jest/globals': true,
    node: true,
  },
  overrides: [
    {
      files: ['src/**/*.test.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'dot-notation': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
