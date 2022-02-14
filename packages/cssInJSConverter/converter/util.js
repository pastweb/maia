const { readdirSync, writeFileSync, existsSync } = require('fs');
const { resolve, sep } = require('path');
const { createTheme } = require('../../dist/maia-styleit.cjs');

const PROPERTIES_REGEXP = /[ \t]+?((-+)?[a-z]+)+:/g;
const VAR_NAME_REGEXP = /\$[a-zA-Z-_0-9]+/g;

const CWD = process.cwd();

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

function getGlobalVars(entries, frameworkKey, theme) {
  entries.forEach(entry => {
    const { fileDir, fileName } = getPathComponents(entry);
    const themeFilePath = resolve(CWD, `${fileDir}/${fileName}.theme.js`);
    if (existsSync(themeFilePath)) {
      theme = createTheme([theme, require(themeFilePath)]);
      if (!theme[frameworkKey]) {
        throw new Error(`Error in: ${themeFile} - The key "${frameworkKey}" must be used as root Object of yours theme variables declarations.`);
      }
    }
  });

  const varNames = Object.keys(theme[frameworkKey]).map(name => `$${kebabize(name)}`);
  return new Set(varNames);
}

module.exports = {
  CWD,
  PROPERTIES_REGEXP,
  VAR_NAME_REGEXP,
  camelize,
  kebabize,
  getPathComponents,
  getFilePath,
  writeImportsMap,
  getGlobalVars,
};
