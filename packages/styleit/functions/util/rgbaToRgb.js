const { getColorType } = require('./getColorType');
const { getColorObject } = require('./getColorObject');
const { hexToRgb } = require('./hexToRgb');
const { hslToRgb } = require('./hslToRgb');
const { hsvToRgb } = require('./hsvToRgb');

function rgbaToRgb(color, bgColor) {
  const type = getColorType(bgColor);
  const formats = {
    hex: () => hexToRgb(bgColor),
    rgb: () => getColorObject(bgColor),
    hsl: () => hslToRgb(bgColor),
    hsv: () => hsvToRgb(bgColor),
  };

  const bg = formats[type]();
  const rgba = getColorObject(color);
  const alpha = 1 - rgba.a;
  const r = Math.round((rgba.a * (rgba.r / 255) + (alpha * (bg.r / 255))) * 255);
  const g = Math.round((rgba.a * (rgba.g / 255) + (alpha * (bg.g / 255))) * 255);
  const b = Math.round((rgba.a * (rgba.b / 255) + (alpha * (bg.b / 255))) * 255);
  return { type: 'rgb', r, g, b, value: `rbg(${r}, ${g}, ${b})` };
}

module.exports = { rgbaToRgb };