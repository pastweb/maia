const { getColorObject } = require('./util');
const convertColor = require('./convertColor');

module.exports = function invertColor(color, format = 'hex') {
  const rgb = getColorObject(convertColor(color, 'rgb'));

  // invert color components
  const r = (255 - rgb.r).toString(16),
        g = (255 - rgb.g).toString(16),
        b = (255 - rgb.b).toString(16);
  // pad each with zeros and return
  function padZero(str, len = 2) {
    const zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }
  const hexColor = `#${padZero(r)}${padZero(g)}${padZero(b)}`;
  return convertColor(hexColor, format);
}
