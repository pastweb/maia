import { isObject } from '@maia/tools';
import { cssToObject } from './cssToObject';
import { STYLE_WITHOUT_KEYFRAMES, STYLE_WITH_KEYFRAMES } from '../../../testUtil';

const JUST_PROPS = `
background-color: white;
height: 100%;
`;

const WITH_RUBISH = `
-ms-overflow-style:none;

[propName] {
  position: relative ;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}
`;

const NESTED = `
.columns {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: calc(100% - 55px);

  .leftSide {
    color: white;
    background-color: green;
    width: 220px;
    border-right: 1px solid lightgrey;
    transition: all .2s ease;

    &.isClosed { width: 50px; }
  }

  .viewsContainer {
    color: white;
    background-color: blue;
    flex: 1;
  }
}
`;

describe('cssObject', () => {
  it('should return an object NESTED', () => {
    const cssObject = cssToObject(NESTED);
    expect(isObject(cssObject)).toBe(true);
  });

  it('should return an object PROPS_SELECTOR', () => {
    const cssObject = cssToObject(WITH_RUBISH);
    expect(isObject(cssObject)).toBe(true);
  });

  it('should return an object JUST_PROPS', () => {
    const cssObject = cssToObject(JUST_PROPS);
    expect(isObject(cssObject)).toBe(true);
  });

  it('should return an object STYLE_WITHOUT_KEYFRAMES', () => {
    const cssObject = cssToObject(STYLE_WITHOUT_KEYFRAMES);
    expect(isObject(cssObject)).toBe(true);
  });

  it('should return an object STYLE_WITH_KEYFRAMES', () => {
    const cssObject = cssToObject(STYLE_WITH_KEYFRAMES);
    expect(isObject(cssObject)).toBe(true);
  });
});