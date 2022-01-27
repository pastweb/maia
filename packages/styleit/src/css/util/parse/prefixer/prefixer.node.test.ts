import { prefixer } from './prefixer';

const prop = 'transition';
const value = 'all 4s ease';

const EXPECTED_LINE = `-webkit-${prop}:-webkit-${value};-moz-${prop}:-moz-${value};-ms-${prop}:-ms-${value};${prop}:${value};`;

describe('prefixer', () => {
  it('should render all vendor prefix.', () => {
    expect(prefixer(prop, value)).toBe(EXPECTED_LINE);
  });
});
