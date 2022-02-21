import { parse } from './parse';
import { cssToObject } from '../cssToObject';

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

const selector = '._id';

const EXPECTED_CSS = `${selector} .columns{display:flex;flex-direction:row;align-items:stretch;height:calc(100% - 55px);}${selector} .columns .leftSide{color:white;background-color:green;width:220px;border-right:1px solid lightgrey;transition:all .2s ease;}${selector} .columns .leftSide.isClosed{width:50px;}${selector} .columns .viewsContainer{color:white;background-color:blue;flex:1;}`;

describe('parse', () => {
  it('sould render a valid scoped css string', () => {
    expect(parse(cssToObject(NESTED), selector)).toBe(EXPECTED_CSS);
  });
});