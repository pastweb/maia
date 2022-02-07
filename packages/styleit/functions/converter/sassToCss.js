const sass = require('sass');

function getSyntax(ext) {
  return ext === 'sass' ? 'indented' : 'scss';
}

let _exclude;

function getImpotsMap(imports, map = {}) {
  Object.entries(imports).forEach(([key, val]) => {
    const { ext, source } = val;
    const contents = _exclude.has(key) ? '' : source;
    map[key] = {
      contents,
      syntax: getSyntax(ext),
    };
    getImpotsMap(val.imports, map);
  });
}

module.exports = function(importMap, exclude = []) {
  _exclude = new Set(exclude.map(ex => `db:${ex}`));
  const { ext, source } = importMap;
  const syntax = getSyntax(ext);

  const importsMap = {};
  getImpotsMap(importMap.imports, importsMap);
  
  const  options = {
    style: 'expanded',
    syntax,
    importers: [
      {
        canonicalize(url) {
          return new URL(url.includes('db:') ? url : `db:${url}`);
        },
        load(canonicalUrl) {
          const { href } = canonicalUrl;
          const { contents, syntax } = importsMap[href];
          return { contents, syntax };
        },
      },
    ],
  };

  return sass.compileString(source, options).css;
}