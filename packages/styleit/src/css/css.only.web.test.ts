import { isObject } from '@maia/tools';
import {
  styleNoVars,
  styleWithVars,
  styleWithFunctions,
  filename,
  component,
  forward,
  EXPECTED_STYLE,
  EXPECTED_STYLE_KEY,
} from '../testUtil';

describe('css - web', () => {
  describe('without vars', () => {
    it('in the styles object "setOptions" should be a function.', () => {
      expect(typeof styleNoVars.setOptions).toBe('function');
    });

    it('in the styles object "getOptions" should be a function.', () => {
      expect(typeof styleNoVars.getOptions).toBe('function');
    });

    it('in the styles object "getStyleInfo" should be a function.', () => {
      expect(typeof styleNoVars.getStyleInfo).toBe('function');
    });
    
    it('"getOptions" function should return a styleOptions Object.', () =>{
      const options = styleNoVars.getOptions();
      expect(isObject(options)).toBe(true);
    });

    it('"options.argsAsArray" should a boolean and false.', () => {
      const options = styleNoVars.getOptions();
      expect(typeof options.argsAsArray).toBe('boolean');
      expect(options.argsAsArray).toBe(false);
    });

    it('"options.fileName" should an empty string.', () => {
      const options = styleNoVars.getOptions();
      expect(typeof options.fileName).toBe('string');
      expect(options.fileName).toBe('');
    });

    it('"options.name" should an empty string.', () => {
      const options = styleNoVars.getOptions();
      expect(typeof options.name).toBe('string');
      expect(options.name).toBe('');
    });

    it('"options.forward" should an empty Object {}.', () => {
      const options = styleNoVars.getOptions();
      expect(isObject(options.forward)).toBe(true);
      expect(JSON.stringify(options.forward)).toBe(JSON.stringify({}));
    });

    it('"styleInfo" should be an Object.', () => {
      const styleInfo = styleNoVars.getStyleInfo();
      expect(isObject(styleInfo)).toBe(true);
    });

    it('"styleInfo.name" should be an empty string.', () => {
      const styleInfo = styleNoVars.getStyleInfo();
      expect(styleInfo.name).toBe('');
    });

    it('"styleInfo.fileName" should be an empty string.', () => {
      const styleInfo = styleNoVars.getStyleInfo();
      expect(styleInfo.fileName).toBe('');
    });

    it('"styleInfo.styleKey" should be a string.', () => {
      const styleInfo = styleNoVars.getStyleInfo();
      expect(typeof styleInfo.styleKey).toBe('string');
    });
  });

  describe('with vars', () => {
    const options = styleWithVars.getOptions();
    const styleInfo = styleWithVars.getStyleInfo();

    it('"options.argsAsArray" should a boolean and false.', () => {  
      expect(options.argsAsArray).toBe(false);
    });

    it('"options.fileName" should be as expected.', () => {
      expect(options.fileName).toBe(filename);
    });

    it('"options.name" should an empty string.', () => {
      expect(options.name).toBe('');
    });

    it('"options.forward" should an empty Object {}.', () => {
      expect(isObject(options.forward)).toBe(true);
      expect(JSON.stringify(options.forward)).toBe(JSON.stringify({}));
    });

    it('"styleInfo.name" should be an empty string.', () => {
      expect(styleInfo.name).toBe('');
    });

    it('"styleInfo.fileName" should be as expected.', () => {
      expect(styleInfo.fileName).toBe(filename);
    });

    it('"styleInfo.styleKey" should be a string.', () => {
      expect(typeof styleInfo.styleKey === 'string').toBe(true);
    });

  });

  describe('with functions', () => {
    const options = styleWithFunctions.getOptions();
    const styleInfo = styleWithFunctions.getStyleInfo();

    it('"options.argsAsArray" should a boolean and false.', () => {
      expect(options.argsAsArray).toBe(false);
    });

    it('"options.fileName" should be as expected.', () => {
      expect(options.fileName).toBe(filename);
    });

    it('"options.name" should be as expected.', () => {
      expect(options.name).toBe(component);
    });

    it('"options.forward" should be as expected.', () => {
      expect(isObject(options.forward)).toBe(true);
      expect(JSON.stringify(options.forward)).toBe(JSON.stringify(forward));
    });

    it('"styleInfo.name" should as expected.', () => {
      expect(styleInfo.name).toBe(component);
    });

    it('"styleInfo.fileName" should be as expected.', () => {
      expect(styleInfo.fileName).toBe(filename);
    });

    it('"styleInfo.styleKey" should be a string.', () => {
      expect(typeof styleInfo.styleKey === 'string').toBe(true);
    });
  });
});