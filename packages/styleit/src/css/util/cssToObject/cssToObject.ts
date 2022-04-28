import { CSSObject } from '../../types';

const newRule = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g;
const ruleClean = /\/\*[^]*?\*\/|\s\s+|\n/g;

/**
 * Convert a css style string into a object
 * @param {String} rules
 * @returns {Object}
 */

function findCloseBraket(rules: string[]): number {
  let counter = 0;

  for(let i=0; i<rules.length; i++) {
    const el = rules[i];
    if (el.includes('{')) counter++;
    if (el.includes('}')) counter--;
    if (!counter) return i;
  }

  return 0;
}

function arrayToObject(rules: string[]) : CSSObject {
  const cssObject: CSSObject = {};

  for (let i=0; i<rules.length; i++){
    const el = rules[i];

    if (el.includes('{')) {
      const selector = el.replace('{', '').trim();
      const endBlock = findCloseBraket(rules.slice(i));
      const block = rules.splice(i, endBlock);
      block.shift();
      cssObject[selector] = arrayToObject(block);
    } else {
      const [ prop, value ] = el.split(':').map(el => el.replace(/[;]/g, '').trim());
      cssObject[prop] = value;
    }
  }
  
  return cssObject;
}

export function cssToObject (rules: string): CSSObject {
  const cssObject: CSSObject = {};
  const normalized = rules.replace(ruleClean, '');
  const rulesArray = normalized.match(newRule);

  if (!rulesArray) return cssObject;

  return arrayToObject(rulesArray);
}
