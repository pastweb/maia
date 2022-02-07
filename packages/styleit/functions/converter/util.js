const { readdirSync, writeFileSync } = require('fs');
const { resolve, sep } = require('path');

const PROPERTIES_REGEXP = /[ \t]+?((-+)?[a-z]+)+:/g;
const VAR_NAME_REGEXP = /\$[a-zA-Z-_0-9]+/g;

function camelize (str) {
  return str.replace(/(-|\/)./g, (x) => x.toUpperCase()[1]);
}

function kebabize (str) {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
     ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
     : letter;
  }).join('');
}

function getPathComponents (filePath) {
  const pathArr = filePath.split(/[\\\/]/);
  const [ fileName, ext ] = pathArr.pop().split('.');
  const fileDir = pathArr.join(sep);
  return { fileDir, fileName, ext };
}

function getFilePath (fileDir, fileImport) {
  let filePath = /\.s(a|c)ss$/.test(fileImport) ? resolve(fileDir, fileImport) : null;
  if (!filePath) {
    const pathArr = fileImport.split(/[\\\/]/);
    const fileName = pathArr.pop();
    
    filePath = resolve(fileDir, pathArr.join(sep));
    const files = readdirSync(filePath).filter(file => {
      return new RegExp(`${fileName}\\.s(a|c)ss$`).test(file)
    });
    if (!files.length) {
      throw new Error(`${resolve(fileDir, fileImport)} - not found.`);
    }
    if (files.length > 1) {
      throw new Error(`sass: multiple file extensions present at the path: ${fileDir} - ${files[0]} loaded.`);
    }
    filePath = `${filePath}/${files[0]}`;
  }

  return filePath;
}

function writeImportsMap (fileMap, filePath) {
  const source = `module.exports = ${JSON.stringify(fileMap, null, 2)};\n`;
  writeFileSync(filePath, source);
}

module.exports = {
  PROPERTIES_REGEXP,
  VAR_NAME_REGEXP,
  camelize,
  kebabize,
  getPathComponents,
  getFilePath,
  writeImportsMap,
};
