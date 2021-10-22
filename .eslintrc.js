module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  globals: {
    'jest/globals': true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { 'jsx': true },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  ignorePatterns: [
    '/dist',
    '/doc',
    '**/.eslintrc.js',
    'jest.config.js',
    'rollup.config.js',
    '**/*.test.ts',
    '**/*.test.js'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js','.jsx','.ts','.tsx']
      }
    }
  },
  rules: {
    // disable the rule for all files
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-namespace': ['off']
      }
    }
  ]
}
