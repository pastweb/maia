import { getFromBreakPoints, BreakPointsConfig } from './';
import { windowResize } from '../../../../test/util';

const breaks: BreakPointsConfig = {
  450: 'tablet',
  320: 'phone',
  1025: 'desktop'
};

const expectations: BreakPointsConfig = {
  0: 'phone',
  10: 'phone',
  200: 'phone',
  319: 'phone',
  320: 'phone',
  321: 'tablet',
  350: 'tablet',
  449: 'tablet',
  450: 'tablet',
  451: 'desktop',
  700: 'desktop',
  1024: 'desktop',
  1025: 'desktop',
  1026: 'desktop',
  2000: 'desktop'
};

afterAll(() => {
  // reset the window dimentions to the original
  windowResize();
});

describe('getBreakpoint', () => {
  Object.entries(expectations).forEach(([_break, value]: [string, any]) => {
    it(`for break = ${_break} should have the value "${value}"`, () => {
      windowResize(parseFloat(_break));
      expect(getFromBreakPoints(breaks)).toBe(value);
    });
  });
});
