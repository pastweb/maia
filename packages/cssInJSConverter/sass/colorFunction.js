const sass = require('sass');

module.exports = function colorFunction(functnioName, options) {
  const {
    source,
    args = [],
    syntax = 'indented',
  } = options;

  const sassOptions = { syntax };

  const { css } = sass.compileString(`
${source ? source : ''}

div${syntax === 'scss' ? ' {' : ''}
  color: ${functnioName}(${args.join(', ')})${syntax === 'scss' ? ';' : ''}
${syntax === 'scss' ? ' {' : ''}
`, sassOptions);
  
  return css.substring(css.indexOf(':') + 2, css.indexOf(';'));
}
