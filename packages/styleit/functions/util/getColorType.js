const { colorsMap } = require('./colorsMap');

function getColorType(color) {
  if (colorsMap[color]) return 'text';
  return color.indexOf('#') === 0 ? 'hex' : color.substring(0, color.indexOf('('));
}

module.exports = { getColorType };
