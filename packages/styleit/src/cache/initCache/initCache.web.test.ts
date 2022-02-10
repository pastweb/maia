import { isObject } from '@maia/tools';
import { initCache } from './InitCache';

const cache = initCache();

describe('getStyleMapper', () => {
  it('cache should be defined', () => {
    expect(cache).toBeDefined();
  });

  it('cache.frameworks should be defined ad should be a Set', () => {
    expect(cache.frameworks).toBeDefined();
    expect(isObject(cache.frameworks)).toBe(true);
  });

  it('cache.style should be defined.', () => {
    expect(cache.style).toBeDefined();
  });

  it('cache.style.has should be a function.', () => {
    expect(typeof cache.style.has).toBe('function');
  });

  it('cache.style.get should be a function.', () => {
    expect(typeof cache.style.get).toBe('function');
  });

  it('cache.style.getStyleMap should be a function and return the current styleMap.', () => {
    const styleMap = {};
    expect(typeof cache.style.getStyleMap).toBe('function');
    expect(cache.style.getStyleMap()).toBe(styleMap);
  });

  it('cache.style.setStyleMap should be a function and set a new styleMap.', () => {
    const styleMap = {};
    expect(typeof cache.style.setStyleMap).toBe('function');
    cache.style.setStyleMap(styleMap);
    expect(cache.style.getStyleMap()).toBe(styleMap);
  });

  it('cache.style.add should be a function.', () => {
    expect(typeof cache.style.add).toBe('function');
  });

  it('cache.style.replace should be a function.', () => {
    expect(typeof cache.style.replace).toBe('function');
  });

  it('cache.style.remove should be a function.', () => {
    expect(typeof cache.style.remove).toBe('function');
  });

  it('cache.style.size should be a number and should be 0.', () => {
    expect(typeof cache.style.size).toBe('number');
    expect(cache.style.size).toBe(0);
  });

  it('cache.style.css should be a string and should return empty string.', () => {
    expect(typeof cache.style.css).toBe('string');
    expect(cache.style.css).toBe('');
  });

  it('cache.style.has("_23424") should return false.', () => {
    expect(cache.style.has('_23424')).toBe(false);
  });
});