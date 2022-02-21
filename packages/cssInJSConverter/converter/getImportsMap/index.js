const { readFileSync } = require('fs');
const { resolve } = require('path');
const { getFilePath, getPathComponents } = require('../util');
const addComments = require('./addComments');

function getImportsMap(filePath, globalVars, keyframes, prefix = '') {
  const source = addComments(readFileSync(filePath, 'utf8'), globalVars, keyframes);

  const { fileDir, ext } = getPathComponents(filePath);

  const map = {
    ext,
    source,
    imports: {},
  };

  const importLines = source.match(/@import\s+["'].*["']/g);

  if (importLines) {
    importLines.filter(line => !line.includes('url('))
      .map(_import => _import.split(' ')[1]
      .replace(/["']/g, ''))
      .forEach(fileImport => {
        const importArr = fileImport.split(/[\\\/]/);
        let importPrefix = prefix;
        
        if (importArr.length > 1) {
          importPrefix = importArr.slice(0, importArr.length - 1).join('/');
        }

        const importFilePath = getFilePath(resolve(fileDir), fileImport);
        const importKey = `${prefix ? `${prefix}/` : ''}${fileImport}`;
        map.imports[importKey] = getImportsMap(importFilePath, globalVars, keyframes, importPrefix);
    });
  }

  map.imports = Object.entries(map.imports).reduce((acc, [fileImport, varName]) => {
    return { ...acc, [`db:${fileImport.replace(/(\.\.\/)+/, '')}`]: varName };
  }, {});

  return map;
}

module.exports = getImportsMap;
