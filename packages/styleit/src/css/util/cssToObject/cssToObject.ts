import { CSSObject } from '../../types';

const newRule = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g;
const ruleClean = /\/\*[^]*?\*\/|\s\s+|\n/g;

/**
 * Convert a css style string into a object
 * @param {String} rules
 * @returns {Object}
 */
 export function cssToObject (rules: string): CSSObject {
  const normalized = rules.replace(ruleClean, '');

  const rulesToArray = normalized.match(newRule);

  let jsonString = '{';

  rulesToArray?.forEach((el: string) => {
    if (el.includes('{')) {
      const lastChar = jsonString.length && (jsonString.charAt(jsonString.length - 1) === '}') ? ',' :  '';
      const selector = el.replace(/(\s?|\s+){$/i, '')
      jsonString =  `${jsonString}${lastChar}"${selector}":{`;
    } else if (el.includes(':')) {
      const [prop, value] = el.split(':');
      const escaped = value.replace(/\\?["']/g, '\\"');
      jsonString = `${jsonString}"${prop.trim()}":"${escaped.substring(0, escaped.length - 1).trim()}",`;
    } else {
      if (jsonString.charAt(jsonString.length - 1) === ',') {
        jsonString = jsonString.substring(0, jsonString.length - 1);
      }
      jsonString = `${jsonString}${el}`;
    }
  });

  if (jsonString.charAt(jsonString.length - 1) === ',') {
    jsonString = jsonString.substring(0, jsonString.length - 1);
  }

  return JSON.parse(`${jsonString}}`);
};