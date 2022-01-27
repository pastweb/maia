function hexToRgb (color, alpha) {
  if (color.indexOf('#') !== 0) {
    throw new Error('Invalid HEX color.');
  }

  let hex = color.slice(1);
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }

  const components = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
    .exec(hex)
    .slice(1)
    .map(num => parseInt(num, 16));
  
  const a = alpha ? parseFloat(alpha.toFixed(2)) : -1;

  if (a !== -1) components.push(a);

  const [ r, g, b ] = components;

  if (a) return { type: 'rgba', r, g, b, a, value: `rgba(${components.join(', ')})` };
  return { type: 'rgb', r, g, b, value: `rgb(${components.join(', ')})` }
}

module.exports = { hexToRgb };