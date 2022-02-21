import { CSSObject } from '../../types';
import { isObject } from '@maia/tools';

/**
 * Stringifies a object structure
 * @param {Object} data
 * @returns {String}
 */
 export function stringify(data: CSSObject): string {
    return Object.entries(data).reduce((acc, [prop, value]) => {
        if (isObject(value)) {
            return `${acc}${prop} {${stringify(value as CSSObject)}}`;
        }
        const unEscaped = (value as string).replace(/\\?["']/g, '"');
        return `${acc}${prop}: ${unEscaped};`;
    }, '');
};
