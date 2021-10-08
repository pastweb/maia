import { classNames } from './';

describe('classNames', () => {

  it(`should return "class-1" as class string`, () => {
    expect(classNames('class-1')).toBe('class-1');
  });

  it(`should return "class-1 class-2" as class string`, () => {
    expect(classNames('class-1', ['class-2'])).toBe('class-1 class-2');
  });
  
  it(`should return "class-1 class-2 class-3" as class string`, () => {
    expect(classNames('class-1', ['class-2', 'class-3'])).toBe('class-1 class-2 class-3');
  });

  it(`should return "class-1 class-2 class-3 class-4" as class string`, () => {
    expect(classNames(
      'class-1',
      ['class-2', 'class-3', [{ 'class-5': false }]],
      { 'class-4': true })
    ).toBe('class-1 class-2 class-3 class-4');
  });

  it(`should return "class-1 class-2 class-3 class-4 class-6" as class string`, () => {
    expect(classNames(
      'class-1',
      ['class-2', 'class-3', [{ 'class-5': false }]],
      {
        'class-4': true,
        'class-6': [],
      })
    ).toBe('class-1 class-2 class-3 class-4 class-6');
  });

  it(`should return "class-1 class-2 class-3 class-7 class-4 class-6" as class string`, () => {
    expect(classNames(
      'class-1',
      ['class-2', 'class-3', [{ 'class-5': false }], 'class-7'],
      {
        'class-4': true,
        'class-6': [],
      })
    ).toBe('class-1 class-2 class-3 class-7 class-4 class-6');
  });
});