import { CSSObject } from '../../types';
import { prefixer } from './prefixer';
import { isObject } from '@maia/tools';
/**
 * Parses the object into css, scoped, blocks
 * @param {Object} obj
 * @param {String} selector
 */
 export function parse(obj: CSSObject, selector: string): string {
  let outer = '';
  let blocks = '';
  let current = '';
  let next;

  Object.entries(obj).forEach(([key, val]) => {
    // If this is a 'block'
    if (isObject(val)) {
      next = selector
        ? // Go over the selector and replace the matching multiple selectors if any
          selector.replace(/([^,])+/g, (sel) => {
            // Return the current selector with the key matching multiple selectors if any
            return key.replace(/(^:.*)|([^,])+/g, (k) => {
              // If the current `k`(key) has a nested selector replace it
              if (/&/.test(k)) return k.replace(/&/g, sel);

              // If there's a current selector concat it
              return sel ? sel + ' ' + k : k;
            });
          })
        : key;

      // If these are the `@` rule
      if (key[0] == '@') {
        // Handling the `@font-face` where the
        // block doesn't need the brackets wrapped
        if (key[1] == 'f') {
          blocks += parse(val as CSSObject, key);
        } else {
          // Regular rule block
          blocks += key + '{' + parse(val as CSSObject, key[1] == 'k' ? '' : selector) + '}';
        }
      } else {
        // Call the parse for this block
        blocks += parse(val as CSSObject, next);
      }
    } else {
      if (key[0] == '@' && key[1] == 'i') {
        outer = key + ' ' + val + ';';
      } else {
        key = key.replace(/[A-Z]/g, '-$&').toLowerCase();
        // Push the line for this property
        current += prefixer(key, val as string);
      }
    }
  });

  // If we have properties apply standard rule composition
  return outer + (selector && current ? selector + '{' + current + '}' : current) + blocks;
};