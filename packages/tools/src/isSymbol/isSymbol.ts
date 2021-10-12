import { isType } from '../isType';

/**
 * Simple Symbol check.
 * @param target
 * @returns {boolean}
 */

export function isSymbol(target: any): boolean {
  return isType('Symbol', target);
}
