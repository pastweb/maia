const { VAR_NAME_REGEXP, camelize } = require('../util');

function cssInJs(css) {
  const replacemets = [];
  let cssInJsCode = css;
  const lines = css.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('/*{{')) {
      const newLine = line.replace(/[\/\*{}]/g, '')
        .replace(VAR_NAME_REGEXP, varName => `\${b.${camelize(varName.slice(1))}}`);
      
      replacemets.push({
        newLine: `${newLine};`,
        oldLine: lines[i + 1],
      });

      cssInJsCode = cssInJsCode.replace(`${line}\n`, '');

      i++;
    }
  }

  replacemets.forEach(({ newLine, oldLine }) => {
    cssInJsCode = cssInJsCode.replace(oldLine, newLine);
  }); 

  return `import { css } from '@maia/styleit';

export default ({ theme: { bulma: b }}) => css\`
${cssInJsCode}
\`;
`;
}

module.exports = { cssInJs };
