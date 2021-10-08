// inspirated to https://github.com/JedWatson/classnames#readme
import { getType } from '../getType';

const types: { [key: string]: any } = {
  Number: (arg: number): string => `${arg}`,
  String: (arg: string): string => `${arg}`,
  Object: (arg: { [key: string]: any }): string => fromObject(arg),
  Array: (arg: any[]): string => fromArray(arg),
};

function addSpace (i: number): string {
  return i > 0 ? ' ' : '';
}

function fromObject (obj: { [key: string]: any }): string {
  return Object.keys(obj).reduce((classes, className, i) => {
    if (!obj[className]) return classes;

    return `${classes}${addSpace(i)}${className}`;
  }, '');
}

function fromArray (arr: any[]): string {
  let classString = null;

  return arr.reduce((classes, el, i) => {
    const type: string = getType(el);

    if (!types[type]) return classes;
    classString = types[type](el);
    if (!classString) return classes;

    return `${classes}${addSpace(i)}${classString}`;
  }, '');
}

export function classNames (...args: any[]): string {
  return fromArray(args);
}
