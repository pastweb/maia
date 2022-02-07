const { writeFileSync } = require('fs');
const { sep, resolve } = require('path');
const {
  getFilePath,
  getPathComponents,
  writeImportsMap: _writeImportsMap,
} = require('./util');
const getImportsMap = require('./getImportsMap');
const sassToCss = require('./sassToCss');
const { cssInJs } = require('./cssInJs');


const CWD = process.cwd();

const args = process.argv.slice(2)
  .filter(arg => arg.includes('--'))
  .reduce((acc, curr) => {
    const [ opt, val ] = curr.split('=');
    const option = opt.replace('--', '');
    if (!val) return { ...acc, [option]: true };
    return { ...acc, [option]: val };
}, {});

const entriesErrorMessage = 'The option --entries must be one or multiple sass/scss file path string separated by ",", or an "entries.(js | json)" file path.';

let entries = [];
let exclude = [];
let globalVars = [];
let writeImportsMap = false;

if (!args.entries) {
  throw new Error(entriesErrorMessage);
} else if (/\.js(on)?$/.test(args.entries)) {
  const config = require(resolve(CWD, args.entries));
  entries = config.entries || [];
  exclude = config.exclude || [];
  globalVars = config.globalVars || [];
  writeImportsMap = !!config.writeImportsMap;
} else {
  entries = args.entries.split(',');
  exclude = args.exclude ? args.exclude.split(',') : [];
}

entries.forEach(async path => {
  const filePath = getFilePath(CWD, path);
  const { fileDir, fileName } = getPathComponents(filePath);
  const fileMap = getImportsMap(filePath, globalVars);
  const writeFilePath = `${fileDir}${sep}${fileName}`;
  
  if (writeImportsMap) {
    _writeImportsMap(fileMap, `${writeFilePath}.map.js`);
  }

  const css = sassToCss(fileMap, exclude);

  writeFileSync(`${writeFilePath}.css`, css);

  const cssInJsCode = cssInJs(css);

  writeFileSync(`${writeFilePath}.js`, cssInJsCode);
});
