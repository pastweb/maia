import { getScopedStyle } from './getScopedStyle';
import { isObject } from '@maia/tools';
import { STYLE_WITH_KEYFRAMES } from '../_mocks';

const id = '_suffixID';
const suffix = id;

describe('styleIt - getScopedStyle', () => {
  const scoped = getScopedStyle(STYLE_WITH_KEYFRAMES, id);

  it('scoped should be defined', () => {
    expect(scoped).toBeDefined();
  });

  it('scoped should be an Object', () => {
    expect(isObject(scoped)).toBe(true);
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

  it('scoped.fontFamily should contains 1 scoped name', () => {

    expect(Object.keys(scoped.fontFamily).length).toBe(1);
  });

  const [fontFamilyName] = Object.keys(scoped.fontFamily);
  it(`scoped.fontFamily.${fontFamilyName} should be defined`, () => {
    expect(scoped.fontFamily[fontFamilyName]).toBeDefined();
  });

  it(`scoped.fontFamily.${fontFamilyName} should be a string`, () => {
    expect(typeof scoped.fontFamily[fontFamilyName]).toBe('string');
  });

  it(`scoped.fontFamily.${fontFamilyName} should be ${fontFamilyName}${id}`, () => {
    expect(scoped.fontFamily[fontFamilyName]).toBe(`${fontFamilyName}${id}`);
  });

  it('scoped.keyframes should be defined', () => {
    expect(scoped.keyframes).toBeDefined();
  });

  it('scoped.keyframes should be an Object', () => {
    expect(isObject(scoped.keyframes)).toBe(true);
  });

  it('scoped.keyframes should contains 2 scoped name', () => {
    expect(Object.keys(scoped.keyframes).length).toBe(2);
  });

  const [keyframesName1, keyframesName2] = Object.keys(scoped.keyframes);
  it(`scoped.keyframes.${keyframesName1} should be defined`, () => {
    expect(scoped.keyframes[keyframesName1]).toBeDefined();
  });

  it(`scoped.keyframes.${keyframesName1} should be a string`, () => {
    expect(typeof scoped.keyframes[keyframesName1]).toBe('string');
  });

  it(`scoped.keyframes.${keyframesName1} should be ${keyframesName1}${id}`, () => {
    expect(scoped.keyframes[keyframesName1]).toBe(`${keyframesName1}${id}`);
  });

  it(`scoped.keyframes.${keyframesName2} should be defined`, () => {
    expect(scoped.keyframes[keyframesName2]).toBeDefined();
  });

  it(`scoped.keyframes.${keyframesName2} should be a string`, () => {
    expect(typeof scoped.keyframes[keyframesName2]).toBe('string');
  });

  it(`scoped.keyframes.${keyframesName2} should be ${keyframesName2}${id}`, () => {
    expect(scoped.keyframes[keyframesName2]).toBe(`${keyframesName2}${id}`);
  });

  it('scoped.rules should be defined', () => {
    expect(scoped.rules).toBeDefined();
  });

  it('scoped.rules should be a string', () => {
    expect(typeof scoped.rules).toBe('string');
  });

  it(`scoped.rules should contains the scoped class: .${id}`, () => {
    expect(scoped.rules.includes(`.${id}`)).toBe(true);
  });

  it(`scoped class: .${id} inside the scoped.rules string should be 0`, () => {
    expect(scoped.rules.indexOf(`.${id}`)).toBe(0);
  });

  it(`should not modify any className`, () => {
    expect(scoped.rules.includes(`.expample${suffix}`)).toBe(false);
  });

  it(`scoped font-family: ${scoped.fontFamily[fontFamilyName]} inside the scoped.rules string should be present`, () => {
    expect(scoped.rules.indexOf(scoped.fontFamily[fontFamilyName]) !== -1).toBe(true);
  });

  it(`should render a scoped animation-name value: expample${suffix}`, () => {
    expect(scoped.rules.includes(`animation-name: expample${suffix}`)).toBe(true);
  });

  it(`should render a scoped keyframes name: expample${suffix}`, () => {
    expect(scoped.rules.includes(`@keyframes expample${suffix}`)).toBe(true);
  });

  it(`should render a scoped animation name value: expample${suffix}`, () => {
    expect(scoped.rules.includes(`animation: expample${suffix}`)).toBe(true);
  });

  it(`should render a scoped keyframes name: example-2${suffix}`, () => {
    expect(scoped.rules.includes(`@keyframes example-2${suffix}`)).toBe(true);
  });
});