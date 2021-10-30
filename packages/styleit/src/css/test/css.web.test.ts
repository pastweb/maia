import { isObject } from '@maia/tools';
import {
  styleNoVars,
  styleWithVars,
  styleWithFunctions,
  filename,
  component,
  forwardArgs,
  EXPECTED_STYLE,
  EXPECTED_STYLE_KEY,
} from './util';

describe('css - web', () => {
    describe('without vars', () => {
      it('in the styles object "setOptions" should be a function.', () => {
        expect(typeof styleNoVars.setOptions).toBe('function');
      });

      it('in the styles object "getOptions" should be a function.', () => {
        expect(typeof styleNoVars.getOptions).toBe('function');
      });

      it('in the styles object "interpolate" should be a function.', () => {
        expect(typeof styleNoVars.interpolate).toBe('function');
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

      it('"options.forwardArgs" should an empty Object {}.', () => {
        const options = styleNoVars.getOptions();
        expect(isObject(options.forwardArgs)).toBe(true);
        expect(JSON.stringify(options.forwardArgs)).toBe(JSON.stringify({}));
      });

      it('"styleInfo" should be an Object.', () => {
        const styleInfo = styleNoVars.interpolate();
        expect(isObject(styleInfo)).toBe(true);
      });

      it('"styleInfo.name" should be an empty string.', () => {
        const styleInfo = styleNoVars.interpolate();
        expect(styleInfo.name).toBe('');
      });

      it('"styleInfo.fileName" should be an empty string.', () => {
        const styleInfo = styleNoVars.interpolate();
        expect(styleInfo.fileName).toBe('');
      });

      it('"styleInfo.styleKey" should be as expected.', () => {
        const styleInfo = styleNoVars.interpolate();
        expect(styleInfo.styleKey).toBe(EXPECTED_STYLE_KEY);
      });

      it('"styleInfo.rules" string should be as expected.', () => {
        const styleInfo = styleNoVars.interpolate();
        expect(styleInfo.rules).toBe(EXPECTED_STYLE);
      });
    });

    describe('with vars', () => {
      it('"options.argsAsArray" should a boolean and false.', () => {
        const options = styleWithVars.getOptions();
        expect(options.argsAsArray).toBe(false);
      });

      it('"options.fileName" should be as expected.', () => {
        const options = styleWithVars.getOptions();
        expect(options.fileName).toBe(filename);
      });

      it('"options.name" should an empty string.', () => {
        const options = styleWithVars.getOptions();
        expect(options.name).toBe('');
      });

      it('"options.forwardArgs" should an empty Object {}.', () => {
        const options = styleWithVars.getOptions();
        expect(isObject(options.forwardArgs)).toBe(true);
        expect(JSON.stringify(options.forwardArgs)).toBe(JSON.stringify({}));
      });

      it('"styleInfo.name" should be an empty string.', () => {
        const styleInfo = styleWithVars.interpolate();
        expect(styleInfo.name).toBe('');
      });

      it('"styleInfo.fileName" should be as expected.', () => {
        const styleInfo = styleWithVars.interpolate();
        expect(styleInfo.fileName).toBe(filename);
      });

      it('"styleInfo.styleKey" should be as expected.', () => {
        const styleInfo = styleWithVars.interpolate();
        expect(styleInfo.styleKey).toBe(EXPECTED_STYLE_KEY);
      });

      it('"styleInfo.rules" string should be as expected.', () => {
        const styleInfo = styleWithVars.interpolate();
        expect(styleInfo.rules).toBe(EXPECTED_STYLE);
      });
    });

    describe('with functions', () => {
      it('"options.argsAsArray" should a boolean and false.', () => {
        const options = styleWithFunctions.getOptions();
        expect(options.argsAsArray).toBe(false);
      });

      it('"options.fileName" should be as expected.', () => {
        const options = styleWithFunctions.getOptions();
        expect(options.fileName).toBe(filename);
      });

      it('"options.name" should be as expected.', () => {
        const options = styleWithFunctions.getOptions();
        expect(options.name).toBe(component);
      });

      it('"options.forwardArgs" should be as expected.', () => {
        const options = styleWithFunctions.getOptions();
        expect(isObject(options.forwardArgs)).toBe(true);
        expect(JSON.stringify(options.forwardArgs)).toBe(JSON.stringify(forwardArgs));
      });

      it('"styleInfo.name" should as expected.', () => {
        const styleInfo = styleWithFunctions.interpolate();
        expect(styleInfo.name).toBe(component);
      });

      it('"styleInfo.fileName" should be as expected.', () => {
        const styleInfo = styleWithFunctions.interpolate();
        expect(styleInfo.fileName).toBe(filename);
      });

      it('"styleInfo.styleKey" should be as expected.', () => {
        const styleInfo = styleWithFunctions.interpolate();
        expect(styleInfo.styleKey).toBe(EXPECTED_STYLE_KEY);
      });

      it('"styleInfo.rules" string should be as expected.', () => {
        const styleInfo = styleWithFunctions.interpolate();
        expect(styleInfo.rules).toBe(EXPECTED_STYLE);
      });
    });
});