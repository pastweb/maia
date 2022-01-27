import { parse } from './parse';
import { cssToObject } from '../cssToObject';

const scss = {
  color: 'blue',
  '.class1': {
    color: 'red',
  },
  '.class2': {
    '.class3': {
      color: 'green',
    }
  },
};

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

const EXPECTED_CSS  = `${selector}{color:blue;}${selector} .class1{color:red;}${selector} .class2 .class3{color:green;}`;

describe('parse', () => {
  it('sould render a valid scoped css string', () => {
    console.log(parse(cssToObject(NESTED), selector))
    expect(parse(cssToObject(NESTED), selector)).toBe(EXPECTED_CSS);
  });
  // it('sould render a valid scoped css string', () => {
  //   expect(parse(scss, selector)).toBe(EXPECTED_CSS);
  // });
});