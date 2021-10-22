import { getScopedCSS } from './';
import { isObject } from '@maia/tools';
import { STYLE_WITH_KEYFRAMES } from '../_mocks';

const id = '_uniqueID';
const rules = STYLE_WITH_KEYFRAMES;

describe('styleIt - getScopedCSS', () => {
  const scoped = getScopedCSS(rules, id);

  it('scoped should be defined', () => {
    expect(scoped).toBeDefined();
  });

  it('scoped should be an Object', () => {
    expect(isObject(scoped)).toBe(true);
  });

  it('scoped.css should be defined', () => {
    expect(scoped.css).toBeDefined();
  });

  it('scoped.css should be a string', () => {
    expect(typeof scoped.css).toBe('string');
  });

  it(`scoped.css should contains the scoped class: .${id}`, () => {
    expect(scoped.css.includes(`.${id}`)).toBe(true);
  });

  it(`scoped class: .${id} inside the css string should be 0`, () => {
    expect(scoped.css.indexOf(`.${id}`)).toBe(0);
  });

  it('scoped.fontFamily should be defined', () => {
    expect(scoped.fontFamily).toBeDefined();
  });

  it('scoped.fontFamily should be an Object', () => {
    expect(isObject(scoped.fontFamily)).toBe(true);
  });

  it('scoped.fontFamily should contains  scoped name', () => {
    expect(Object.keys(scoped.fontFamily).length).toBe(1);
  });
});