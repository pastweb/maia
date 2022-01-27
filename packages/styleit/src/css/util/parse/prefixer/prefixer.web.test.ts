import { prefixer } from './prefixer';

const prop = 'transition';
const value = 'all 4s ease';

const EXPECTED_LINE = `${prop}:${value};`;

describe('prefixer', () => {
  it('should not render any vendor prefix.', () => {
    expect(prefixer(prop, value)).toBe(EXPECTED_LINE);
  });
});
