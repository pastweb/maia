const common = require('../../.eslintrc');

module.exports = {
  ...common,
  globals: {
    ...common.globals,
    React: 'writable',
    JSX: 'readable',
  },
  settings: {
    ...common.settings,
    react: { version: 'detect' },
  },
};
