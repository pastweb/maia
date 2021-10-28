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
      it('in the styles object "set" should be a function.', () => {
        expect(typeof styleNoVars.set).toBe('function');
      });

      it('in the styles object "getSettings" should be a function.', () => {
        expect(typeof styleNoVars.getSettings).toBe('function');
      });

      it('in the styles object "make" should be a function.', () => {
        expect(typeof styleNoVars.make).toBe('function');
      });
      
      it('"getSettings" function should return a styleSettings Object.', () =>{
        const settings = styleNoVars.getSettings();
        expect(isObject(settings)).toBe(true);
      });

      it('"settings.argsAsArray" should a boolean and false.', () => {
        const settings = styleNoVars.getSettings();
        expect(typeof settings.argsAsArray).toBe('boolean');
        expect(settings.argsAsArray).toBe(false);
      });

      it('"settings.fileName" should an empty string.', () => {
        const settings = styleNoVars.getSettings();
        expect(typeof settings.fileName).toBe('string');
        expect(settings.fileName).toBe('');
      });

      it('"settings.componentName" should an empty string.', () => {
        const settings = styleNoVars.getSettings();
        expect(typeof settings.componentName).toBe('string');
        expect(settings.componentName).toBe('');
      });

      it('"settings.forwardArgs" should an empty Object {}.', () => {
        const settings = styleNoVars.getSettings();
        expect(isObject(settings.forwardArgs)).toBe(true);
        expect(JSON.stringify(settings.forwardArgs)).toBe(JSON.stringify({}));
      });

      it('"styleInfo" should be an Object.', () => {
        const styleInfo = styleNoVars.make();
        expect(isObject(styleInfo)).toBe(true);
      });

      it('"styleInfo.componentName" should be an empty string.', () => {
        const styleInfo = styleNoVars.make();
        expect(styleInfo.componentName).toBe('');
      });

      it('"styleInfo.fileName" should be an empty string.', () => {
        const styleInfo = styleNoVars.make();
        expect(styleInfo.fileName).toBe('');
      });

      it('"styleInfo.styleKey" should be as expected.', () => {
        const styleInfo = styleNoVars.make();
        expect(styleInfo.styleKey).toBe(EXPECTED_STYLE_KEY);
      });

      it('"styleInfo.rules" string should be as expected.', () => {
        const styleInfo = styleNoVars.make();
        expect(styleInfo.rules).toBe(EXPECTED_STYLE);
      });
    });

    describe('with vars', () => {
      it('"settings.argsAsArray" should a boolean and false.', () => {
        const settings = styleWithVars.getSettings();
        expect(settings.argsAsArray).toBe(false);
      });

      it('"settings.fileName" should be as expected.', () => {
        const settings = styleWithVars.getSettings();
        expect(settings.fileName).toBe(filename);
      });

      it('"settings.componentName" should an empty string.', () => {
        const settings = styleWithVars.getSettings();
        expect(settings.componentName).toBe('');
      });

      it('"settings.forwardArgs" should an empty Object {}.', () => {
        const settings = styleWithVars.getSettings();
        expect(isObject(settings.forwardArgs)).toBe(true);
        expect(JSON.stringify(settings.forwardArgs)).toBe(JSON.stringify({}));
      });

      it('"styleInfo.componentName" should be an empty string.', () => {
        const styleInfo = styleWithVars.make();
        expect(styleInfo.componentName).toBe('');
      });

      it('"styleInfo.fileName" should be as expected.', () => {
        const styleInfo = styleWithVars.make();
        expect(styleInfo.fileName).toBe(filename);
      });

      it('"styleInfo.styleKey" should be as expected.', () => {
        const styleInfo = styleWithVars.make();
        expect(styleInfo.styleKey).toBe(EXPECTED_STYLE_KEY);
      });

      it('"styleInfo.rules" string should be as expected.', () => {
        const styleInfo = styleWithVars.make();
        expect(styleInfo.rules).toBe(EXPECTED_STYLE);
      });
    });

    describe('with functions', () => {
      it('"settings.argsAsArray" should a boolean and false.', () => {
        const settings = styleWithFunctions.getSettings();
        expect(settings.argsAsArray).toBe(false);
      });

      it('"settings.fileName" should be as expected.', () => {
        const settings = styleWithFunctions.getSettings();
        expect(settings.fileName).toBe(filename);
      });

      it('"settings.componentName" should be as expected.', () => {
        const settings = styleWithFunctions.getSettings();
        expect(settings.componentName).toBe(component);
      });

      it('"settings.forwardArgs" should be as expected.', () => {
        const settings = styleWithFunctions.getSettings();
        expect(isObject(settings.forwardArgs)).toBe(true);
        expect(JSON.stringify(settings.forwardArgs)).toBe(JSON.stringify(forwardArgs));
      });

      it('"styleInfo.componentName" should as expected.', () => {
        const styleInfo = styleWithFunctions.make();
        expect(styleInfo.componentName).toBe(component);
      });

      it('"styleInfo.fileName" should be as expected.', () => {
        const styleInfo = styleWithFunctions.make();
        expect(styleInfo.fileName).toBe(filename);
      });

      it('"styleInfo.styleKey" should be as expected.', () => {
        const styleInfo = styleWithFunctions.make();
        expect(styleInfo.styleKey).toBe(EXPECTED_STYLE_KEY);
      });

      it('"styleInfo.rules" string should be as expected.', () => {
        const styleInfo = styleWithFunctions.make();
        expect(styleInfo.rules).toBe(EXPECTED_STYLE);
      });
    });
});