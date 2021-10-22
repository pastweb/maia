import { isSet } from '@maia/tools';
import { getStyleMapper } from './getStyleMapper';
import { getEmitter } from '../getEmitter';
import {
  MAIA_STYLEIT_CACHE_UPDATE_EVENT,
  MAIA_STYLEIT_GET_CACHE_EVENT,
} from '../../../constants';
import { tsObjectKeyword } from '@babel/types';

const emitter = getEmitter();
const cache = getStyleMapper({}, emitter);

describe('getStyleMapper', () => {
  it('cache should be defined', () => {
    expect(cache).toBeDefined();
  });

  it('cache.ids should be defined ad should be a Set', () => {
    expect(cache.ids).toBeDefined();
    expect(isSet(cache.ids)).toBe(true);
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
    const cache = getStyleMapper(styleMap, emitter);
    expect(typeof cache.style.getStyleMap).toBe('function');
    expect(cache.style.getStyleMap()).toBe(styleMap);
  });

  it('cache.style.setStyleMap should be a function and set a new styleMap.', () => {
    const styleMap = {};
    const cache = getStyleMapper({}, emitter);
    expect(typeof cache.style.setStyleMap).toBe('function');
    cache.style.setStyleMap(styleMap);
    expect(cache.style.getStyleMap()).toBe(styleMap);
  });

  it('cache.style.add should be a function.', () => {
    expect(typeof cache.style.add).toBe('function');
  });

  it('cache.style.update should be a function.', () => {
    expect(typeof cache.style.update).toBe('function');
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

  it('cache.style.has("div { background: black; }") should return false.', () => {
    const cache = getStyleMapper({}, emitter);
    expect(cache.style.has('div { background: black; }')).toBe(false);
  });
});