const { PROPERTIES_REGEXP, VAR_NAME_REGEXP } = require('../util');

module.exports = function(source, globalVars, keyframes) {
  const keyframesMatch = source.match(/@keyframes\s+[a-zA-z_0-9]+/g);

  if (keyframesMatch) {
    keyframesMatch.forEach(keyframe => {
      keyframes.add(keyframe.replace(/@keyframes\s+/, ''));
    });
  }

  source.split('\n').forEach(line => {
    const lineIndent = line.match(/^[ \t]+/);
    if (PROPERTIES_REGEXP.test(line)) {
      const matchVars = line.match(VAR_NAME_REGEXP);
    
      if (matchVars) {
        matchVars.forEach(varName => {
          if (globalVars.has(varName)) {
            const commentLine = `${lineIndent ? lineIndent[0] : ''}/*{{${line.trim()}}}*/\n`;
            source = source.replace(line, `${commentLine}${line}`);
          }  
        });
      }
    }
    
    if (/(\+|extend %)[a-zA-z-_0-9]/.test(line)) {
      const commentLine = `${lineIndent ? lineIndent[0] : ''}/*[[${line.trim()}]]*/\n`;
      source = source.replace(line, `${commentLine}${line}\n${commentLine}`);
    } 
  });

  return source;
}
