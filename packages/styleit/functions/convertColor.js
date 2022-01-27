const {
  getColorType,
  hexToRgb,
  rgbToHsl,
  rgbToHex,
  rgbToRgba,
  rgbaToRgb,
  rgbToHsv,
  hslToRgb,
  hsvToRgb,
  colorsMap,
} = require('./util');

module.exports = function convertColor(color, format, rgbaBackground) {
  let type = getColorType(color);
  if (type === format) return color;
  if (format === 'rgba' && !rgbaBackground) {
    throw new Error(`convertColor error: to convert rgba color need a background color in "rgbaBackground" paramenter.`);
  }
  if (type === 'text') {
    if (!colorsMap[color]) {
      throw new Error(`convertColor error: the color text "${color}" it is not a valie w3c css color.`);
    }
    color = colorsMap[color].rgb;
    type = 'rgb';
  }

  const from = {
    hex: to => {
      const formats = {
        rgb: () => hexToRgb(color).value,
        rgba: () => hexToRgb(color, 1).value,
        hsl: () => rgbToHsl(hexToRgb(color).value).value,
        hsv: () => rgbToHsv(hexToRgb(color).value).value,
      };
      return formats[to]();
    },
    rgb: to => {
      const formats = {
        hex: () => rgbToHex(color).value,
        rgba: () => rgbToRgba(color).value,
        hsl: () => rgbToHsl(color).value,
        hsv: () => rgbToHsv(color).value,
      };
      return formats[to]();
    },
    rgba: to => {
      const formats = {
        hex: () => rgbToHex(rgbaToRgb(color, rgbaBackground).value).value,
        rgb: () => rgbaToRgb(color, rgbaBackground).value,
        hsl: () => rgbToHsl(rgbaToRgb(color, rgbaBackground).value).value,
        hsv: () => rgbToHsv(rgbaToRgb(color, rgbaBackground).value).value,
      };
      return formats[to]();
    },
    hsl: to => {
      const formats = {
        hex: () => rgbToHex(color).value,
        rgb: () => hslToRgb(color).value,
        rgba: () => rgbToRgba(hslToRgb(color).value).value,
        hsv: () => rgbToHsv(hslToRgb(color).value).value,
      };
      return formats[to]();
    },
    hsv: to => {
      const formats = {
        hex: () => rgbToHex(hsvToRgb(color).value).value,
        rgb: () => hsvToRgb(color).value,
        rgba: () => rgbToRgba(hsvToRgb(color).value).value,
        hsl: () => rgbToHsl(hsvToRgb(color).value).value,
      };
      return formats[to]();
    },
  };

  return from[type](format);
}