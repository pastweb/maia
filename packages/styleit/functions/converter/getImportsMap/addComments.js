const { kebabize, PROPERTIES_REGEXP, VAR_NAME_REGEXP } = require('../util');

module.exports = function(source, globalVars = []) {
  const varsSet = new Set(globalVars.map(name => `$${kebabize(name)}`));

  const lines = source.split('\n')
    .filter(line => PROPERTIES_REGEXP.test(line))
    .filter(line => VAR_NAME_REGEXP.test(line));

  if (lines.length) {
    lines.forEach(line => {
      const matchVars = line.match(VAR_NAME_REGEXP);

      for(let i=0; i< matchVars.length; i++) {
        const varName = matchVars[i];
        
        if (varsSet.has(varName)) {
          const lineIndent = line.match(/^[ \t]+/);
          const commentLine = `${lineIndent ? lineIndent[0] : ''}/*{{${line.trim()}}}*/\n`;
          source = source.replace(line, `${commentLine}${line}`);
        }
      }
    });   
  }

  return source;
}
