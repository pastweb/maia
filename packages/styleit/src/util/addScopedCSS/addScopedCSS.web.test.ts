import { addScopedCSS } from './addScopedCSS';
import { isObject } from '@maia/tools';
import { getCache } from '../getCache';
import { getUpdateTarget } from '../getUpdateTarget';
import { MINIRESET } from '../constants';
import {
  STYLE_WITH_KEYFRAMES,
  STYLE_WITHOUT_KEYFRAMES,
} from '../_mocks';
import { hashCode } from '../hashCode';
import { StyleDetail } from '../types';

const updateTarget = getUpdateTarget();
const cache = getCache();

const fileName = 'some/file/path';
const componentName = 'MyComponentName';

const styleDetailWithKeyframes: StyleDetail = {
  rules: STYLE_WITH_KEYFRAMES,
  fileName,
  componentName,
  styleKey: hashCode(STYLE_WITH_KEYFRAMES),
};

const styleDetailWithoutKeyframes: StyleDetail = {
  rules: STYLE_WITHOUT_KEYFRAMES,
  fileName,
  componentName,
  styleKey: hashCode(STYLE_WITHOUT_KEYFRAMES),
};

describe('styleIt - addScopedCSS', () => {
  const scoped = addScopedCSS(styleDetailWithKeyframes, cache, updateTarget);

  it('scoped should be defined', () => {
    expect(scoped).toBeDefined();
  });

  it('scoped should be an Object', () => {
    expect(isObject(scoped)).toBe(true);
  });

  it('scoped.id should be defined', () => {
    expect(scoped.id).toBeDefined();
  });

  it('scoped.id should be a string', () => {
    expect(typeof scoped.id).toBe('string');
  });

  it('cache.ids.size should be 1', () => {
    expect(cache.ids.size).toBe(1);
  });

  it(`cache.ids should contains the id: ${scoped.id}`, () => {
    expect(cache.ids.has(scoped.id)).toBe(true);
  });

  it('cache.style.size should be 1', () => {
    expect(cache.style.size).toBe(1);
  });

  it('styleCache should contains the STYLE_WITH_KEYFRAMES styleKey as key', () => {
      expect(cache.style.has(styleDetailWithKeyframes.styleKey)).toBe(true);
  });


  const styleCache = cache.style.get(styleDetailWithKeyframes.styleKey);

  it('styleCache should be defiled', () => {
    expect(styleCache).toBeDefined();
  });

  it('styleCache should be a plain Object', () => {
    expect(isObject(styleCache)).toBe(true);
  });

  it('styleCache should contains a defined "id" property', () => {
    expect(styleCache.id).toBeDefined();
  });

  it('styleCache "id" property should be a string', () => {
    expect(typeof styleCache.id).toBe('string');
  });

  it('styleCache "id" string should be present in cache.ids', () => {
    expect(cache.ids.has(styleCache.id)).toBe(true);
  });

  it('styleCache should contains a defined "counter" property', () => {
    expect(styleCache.counter).toBeDefined();
  });

  it('styleCache "counter" property should be a number', () => {
    expect(typeof styleCache.counter).toBe('number');
  });

  it('styleCache "counter" property should be 1', () => {
    expect(styleCache.counter).toBe(1);
  });

  it('styleCache "css" property should be a string', () => {
    expect(typeof styleCache.css).toBe('string');
  });

  it('styleCache "css" property value should be present in "updateTarget.textContent" property', () => {
    const { textContent } = updateTarget;
    expect((textContent as string).indexOf(styleCache.css) > 0).toBe(true);
  });

  it('updateTarget.textContent property value should be equal to MINIRESET + styleCache.css', () => {
    const expectation = `${MINIRESET}${styleCache.css}`;
    expect(updateTarget.textContent === expectation).toBe(true);
  });

  let cssTextBeforeUpdate: string = '';

  it('id2 hsould be equal to id', () => {
    cssTextBeforeUpdate = updateTarget.textContent!;
    const { id: id2 } = addScopedCSS(styleDetailWithKeyframes, cache, updateTarget);
    expect(id2 === scoped.id).toBe(true);
  });

  it('styleCache "css" property value should has more then 1 id string occurence', () => {
    console.log(styleCache.css)
    const occurrencies = (styleCache.css.match(new RegExp(scoped.id, 'g')) as Array<string>).length;
    expect(occurrencies).toBeDefined();
    expect(occurrencies > 1).toBe(true);
  });

  it('updateTarget.textContent should be equal to cssTextBeforeUpdate', () => {
    expect(updateTarget.textContent === cssTextBeforeUpdate).toBe(true);
  });

  it('styleCache2 "counter" property should be 2', () => {
    const styleCache2 = cache.style.get(styleDetailWithKeyframes.styleKey);
    expect(styleCache2.counter).toBe(2);
  });

  let id3: string = '';

  it('cache.ids.size should be 2', () => {
    id3 = addScopedCSS(styleDetailWithoutKeyframes, cache, updateTarget).id;
    expect(cache.ids.size).toBe(2);
  });

  it(`the id: ${id3}, shold be into cache.ids`, () => {
    expect(cache.ids.has(id3)).toBe(true);
  });

  it('cache.style.size should be 2', () => {
    expect(cache.style.size).toBe(2);
  });
});