const { getColorObject }  = require('./getColorObject');

function rgbToHex(color) {
  const { r, g, b } = getColorObject(color);
  return {
    type: 'hex',
    value: `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`,
  };
}

module.exports = { rgbToHex };
