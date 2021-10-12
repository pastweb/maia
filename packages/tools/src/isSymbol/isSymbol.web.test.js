import { isSymbol } from './';

const types = {
  Object: {},
  Class: class {},
  Array: [],
  Function: function () {},
  Function: () => {},
  Function: class {},
  Set: new Set(),
  Map: new Map(),
  Symbol: Symbol(),
  String: '',
  Number: 0,
  Boolean: false
};

const target = 'Symbol';
const testFunc = isSymbol;

describe('isSymbol', () => {
  Object.entries(types).forEach(([key, value]) => {
    it(`should return ${
      target === key ? 'true' : 'false'
    } for a target "${target}"`, () => {
      expect(testFunc(value)).toBe(target === key ? true : false);
    });
  });
});
