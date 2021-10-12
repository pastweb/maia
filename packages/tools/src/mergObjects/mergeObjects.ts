import { isObject } from '../isObject';
/**
 * Deep merge two or more objects.
 * @param target
 * @param ...sources
 */

export function mergeObjects(...sources: { [key: string]: any }[]): {
  [key: string]: any;
} {
  if (!sources.length) return {};
  return sources.reduce((acc, curr) => {
    if (isObject(curr)) {
      Object.keys(curr).forEach((key) => {
        const accVal = acc[key];
        const currVal = curr[key];

        if (Array.isArray(accVal) && Array.isArray(currVal)) {
          acc[key] = accVal.concat(...currVal);
        } else if (isObject(accVal) && isObject(currVal)) {
          acc[key] = mergeObjects(accVal, currVal);
        } else {
          acc[key] = currVal;
        }
      });
    }

    return acc;
  }, {});
}
