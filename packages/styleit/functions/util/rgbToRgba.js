const { getColorObject } = require('./getColorObject');

function rgbToRgba(color) {
  const { r, g, b } = getColorObject(color);
  const a = 1;
  return { type: 'rgba', r, g, b, a, value: `rgba(${r}, ${g}, ${b}, ${a})` };
}

module.exports = { rgbToRgba };
