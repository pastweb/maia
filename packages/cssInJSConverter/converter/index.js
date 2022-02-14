const { writeFileSync } = require('fs');
const { sep, resolve } = require('path');
const {
  CWD,
  getFilePath,
  getPathComponents,
  writeImportsMap: _writeImportsMap,
  getGlobalVars,
} = require('./util');
const getImportsMap = require('./getImportsMap');
const sassToCss = require('./sassToCss');
const { cssInJs } = require('./cssInJs');
const pkg = require(`${CWD}/package.json`);

const frameworkKey = pkg.name;
const frameworkName = `${pkg.name}__${pkg.version.replace(/\./g, '_')}`;

const args = process.argv.slice(2)
  .filter(arg => arg.includes('--'))
  .reduce((acc, curr) => {
    const [ opt, val ] = curr.split('=');
    const option = opt.replace('--', '');
    if (!val) return { ...acc, [option]: true };
    return { ...acc, [option]: val };
}, {});

const configErrorMessage = 'The option --config must be a js or json file path.';

let entries = [];
let exclude = [];
let writeImportsMap = false;

if (!args.config) {
  throw new Error(configErrorMessage);
} else if (/\.js(on)?$/.test(args.config)) {
  const config = require(resolve(CWD, args.config));
  entries = config.entries || [];
  exclude = config.exclude || [];
  writeImportsMap = !!config.writeImportsMap;
}

let theme = {};

const globalVars = getGlobalVars(entries, frameworkKey, theme);
const keyframes = new Set();

entries.forEach(async path => {
  const filePath = getFilePath(CWD, path);
  const { fileDir, fileName } = getPathComponents(filePath);
  const fileMap = getImportsMap(filePath, globalVars, keyframes);
  const writeFilePath = `${fileDir}${sep}${fileName}`;
  
  if (writeImportsMap) {
    _writeImportsMap(fileMap, `${writeFilePath}.map.js`);
  }

  const css = sassToCss(fileMap, exclude);
  writeFileSync(`${writeFilePath}.css`, css);

  const cssInJsCode = cssInJs(css, frameworkKey, frameworkName, keyframes);
  writeFileSync(`${writeFilePath}.js`, cssInJsCode);
});
