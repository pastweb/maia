// inspirated to lodash.get
import { isObject } from '../isObject';
import { ObjectValue, DefaultValue } from './types';

export function getObjectValue (target: ObjectValue, path: string | string[], defaultValue: DefaultValue = null): any {
  if (!isObject(target)) {
    return defaultValue;
  }

  if (!Array.isArray(path) && typeof path !== 'string') {
    return defaultValue;
  }

  let pathArray = [];

  if (!Array.isArray(path)) {
    let newKey = '';
    let currChar = '';
    for(let i=path.length -1; i>=0; i--) {
      currChar = path.charAt(i);
      
      if (currChar !== '.') {
        newKey = `${currChar}${newKey}`;
        if (i === 0) pathArray.push(newKey);
      } else {
        pathArray.push(newKey);
        newKey = '';
      }
    }
  } else {
    pathArray = path;
  }

  const key = pathArray.pop();

  if (typeof key !== 'string') {
    return defaultValue;
  }

  if (!pathArray.length && target[key]) {
    return target[key];
  }

  if (target[key] && isObject(target[key])) {
    return getObjectValue(target[key], pathArray, defaultValue);
  }

  return defaultValue;
}
