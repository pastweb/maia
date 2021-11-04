import { isObject } from '../isObject';
import { mergeDeep } from './mergeDeep';

const targetObj = {
  original: 1,
  array: []
};

const source1 = {
  level1: {
    level2: []
  },
  array: [10]
};

const source2 = {
  first: 1,
  second: 'two',
  original: 10,
  level1: {
    level2: [20]
  },
  array: [1, 2]
};

describe('mergeObjects', () => {
  const result = mergeDeep(targetObj, source1);

  describe('with one source', () => {
    it('result.original sould be 1', () => {
      expect(result.original).toBe(1);
    });

    it('result.level1 sould be an object', () => {
      expect(isObject(result.level1)).toBe(true);
    });

    it('result.level1.level2 sould be an array', () => {
      expect(Array.isArray(result.level1.level2)).toBe(true);
    });

    it('result.array sould be an array', () => {
      expect(Array.isArray(result.array)).toBe(true);
    });

    it('result.array.length sould be 1', () => {
      expect(result.array.length).toBe(1);
    });

    it('result.array[0] sould be 10', () => {
      expect(result.array[0]).toBe(10);
    });
  });

  describe('with two source', () => {
    const result = mergeDeep(targetObj, source1, source2);

    it('result.original sould be 10', () => {
      expect(result.original).toBe(10);
    });

    it('result.level1 sould be an empty string', () => {
      expect(isObject(result.level1)).toBe(true);
    });

    it('result.level1.level2 sould be an array', () => {
      expect(Array.isArray(result.level1.level2)).toBe(true);
    });

    it('result.level1.level2[0] sould 20', () => {
      expect(result.level1.level2[0]).toBe(20);
    });

    it('result.first sould be 1', () => {
      expect(result.first).toBe(1);
    });

    it('result.second sould be "two"', () => {
      expect(result.second).toBe('two');
    });

    it('result.array sould be an array', () => {
      expect(Array.isArray(result.array)).toBe(true);
    });

    it('result.array[0] sould be 10', () => {
      expect(result.array[0]).toBe(10);
    });

    it('result.array[1] sould be 1', () => {
      expect(result.array[1]).toBe(1);
    });

    it('result.array[2] sould be 2', () => {
      expect(result.array[2]).toBe(2);
    });
  });
});
