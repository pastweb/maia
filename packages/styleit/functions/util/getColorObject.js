const { getColorType } = require('./getColorType');
const { colorsMap } = require('./colorsMap');

function getColorObject(color) {
  const type = getColorType(color);
  if (type === 'hex') {
    return { type, value: color };
  }

  if (type === 'text') color = colorsMap[color].rgb;

  const compNames = type.split('');
  const compValues = color.substring(color.indexOf('(') + 1, color.length - 1)
  .split(',')
  .map((num) => parseInt(num.trim()));

  return compNames.reduce((acc, curr, i) => {
    return { ...acc, [curr]: compValues[i] };
  }, {
    type,
    value: `${type}(${compValues.join(', ')})`,
  });
}

module.exports = { getColorObject };
