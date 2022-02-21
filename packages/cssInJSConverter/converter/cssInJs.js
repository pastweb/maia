const { VAR_NAME_REGEXP, camelize } = require('./util');

function cssInJs(css, frameworkKey, frameworkName, keyframes) {
  const replacemets = [];
  let cssInJsCode = css;
  const lines = css.split('\n');
  const keyAlias = frameworkKey[0];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('/*{{')) {
      const newLine = line.replace(/[\/\*{}]/g, '')
        .replace(VAR_NAME_REGEXP, varName => `\${${keyAlias}.${camelize(varName.slice(1))}}`);
      
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

  // replace keyframes
  const animations = cssInJsCode.match(/animation(-name)?:.*/g);
  if (animations) {
    animations.forEach(animation => {
      let newAnimationLine = animation;
      
      Array.from(keyframes).forEach(keyframe => {
        if (new RegExp(keyframe, 'g').test(animation)) {
          newAnimationLine = newAnimationLine.replace(keyframe, `\${keyframes['${keyframe}']}`);
        }
      });

      if (animation !== newAnimationLine) {
        cssInJsCode = cssInJsCode.replace(animation, newAnimationLine);
      }
    });
  }

  // remove all the other comments
  // cssInJsCode = cssInJsCode.replace(/\/\*.*\*\//g, '');

  return `import { setOptions, css } from '@maia/styleit';

export default ({ theme: { ${frameworkKey}: ${keyAlias} }${animations ? ', keyframes ' : ''}}) => setOptions({
  frameworkName: '${frameworkName}',
  useFrameworkClassId: true,
}, css\`
${cssInJsCode}
\`);
`;
}

module.exports = { cssInJs };
