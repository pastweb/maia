import { addScopedCSS } from './addScopedCSS';
import { isObject } from '@maia/tools';
import { cache } from '../../cache';
import { updateTarget } from '../updateTarget';
import { MINIRESET } from '../../constants';
import {
  STYLE_WITH_KEYFRAMES,
  STYLE_WITHOUT_KEYFRAMES,
} from '../../testUtil';
import { css, StyleInfo } from '../../css';

const styleDetailWithKeyframes: StyleInfo = css`${STYLE_WITH_KEYFRAMES}`.interpolate();

const styleDetailWithoutKeyframes: StyleInfo = css`${STYLE_WITHOUT_KEYFRAMES}`.interpolate();

describe('styleIt - addScopedCSS', () => {
  const scoped = addScopedCSS(styleDetailWithKeyframes);

  it('scoped should be defined', () => {
    expect(scoped).toBeDefined();
  });

  it('scoped should be an Object', () => {
    expect(isObject(scoped)).toBe(true);
  });

  it('scoped.styleKey should be defined', () => {
    expect(scoped.styleKey).toBeDefined();
  });

  it('scoped.id should be a string', () => {
    expect(typeof scoped.styleKey).toBe('string');
  });

  it('cache.ids.size should be 1', () => {
    expect(cache.ids.size).toBe(1);
  });

  it(`cache.ids should contains the id: ${scoped.styleKey}`, () => {
    expect(cache.ids.has(scoped.styleKey)).toBe(true);
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

  it('styleCache should contains a defined "styleKey" property', () => {
    expect(styleCache.styleKey).toBeDefined();
  });

  it('styleCache "styleKey" property should be a string', () => {
    expect(typeof styleCache.styleKey).toBe('string');
  });

  it('styleCache "styleKey" string should be present in cache.ids', () => {
    expect(cache.ids.has(styleCache.styleKey)).toBe(true);
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
    const { styleKey: id2 } = addScopedCSS(styleDetailWithKeyframes);
    expect(id2 === scoped.styleKey).toBe(true);
  });

  it('styleCache "css" property value should has more then 1 id string occurence', () => {
    const occurrencies = (styleCache.css.match(new RegExp(scoped.styleKey, 'g')) as Array<string>).length;
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
    id3 = addScopedCSS(styleDetailWithoutKeyframes).styleKey;
    expect(cache.ids.size).toBe(2);
  });

  it(`the id: ${id3}, shold be into cache.ids`, () => {
    expect(cache.ids.has(id3)).toBe(true);
  });

  it('cache.style.size should be 2', () => {
    expect(cache.style.size).toBe(2);
  });
});