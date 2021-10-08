import { getObjectValue, ObjectValue } from './';
import { isObject } from '../isObject';


const testObj: ObjectValue = {
  first: {
    second: {
      other: {}
    },
    third: 'sampleString',
    forth: 1,
    fifth: []
  }
};

describe('getObjectValue', () => {
  it('"notPresent" should return null as default value', () => {
    expect(getObjectValue(testObj, 'notPresent')).toBe(null);
  });

  it('"notPresent" shoulds return 1 as default', () => {
    expect(getObjectValue(testObj, 'notPresent', 1)).toBe(1);
  });

  it('"first" should returns an Object', () => {
    expect(isObject(getObjectValue(testObj, 'first'))).toBe(true);
  });

  it('"first.notPresent" should returns null as default value', () => {
    expect(getObjectValue(testObj, 'first.notPresent')).toBe(null);
  });

  it('"first.notPresent" should returns 2 as default value', () => {
    expect(getObjectValue(testObj, 'first.notPresent', 2)).toBe(2);
  });

  it('"first.second" should returns an object as value', () => {
    expect(isObject(getObjectValue(testObj, 'first.second'))).toBe(true);
  });

  it('"first.second.other" should returns an object as value', () => {
    expect(isObject(getObjectValue(testObj, 'first.second.other'))).toBe(true);
  });

  it('"first.second.notPresent" should returns null as value', () => {
    expect(getObjectValue(testObj, 'first.second.notPresent')).toBe(null);
  });
  
  it('"first.second.other.notPresent" should returns null as value', () => {
    expect(getObjectValue(testObj, 'first.second.other.notPresent')).toBe(null);
  });

  it('"first.third" should returns "sampleString" as value', () => {
    expect(getObjectValue(testObj, 'first.third')).toBe('sampleString');
  });

  it('"first.forth" should returns 1 as value', () => {
    expect(getObjectValue(testObj, 'first.forth')).toBe(1);
  });

  it('"first.fifth" should returns an array as value', () => {
    expect(Array.isArray(getObjectValue(testObj, 'first.fifth'))).toBe(true);
  });
});
