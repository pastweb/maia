const base = require('./base/theme');

module.exports = {
  entries: ['base/_all.sass'],
  exclude: ['minireset'],
  globalVars: [
    ...Object.keys(base),
  ],
};
