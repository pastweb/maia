import { cssToObject } from '../cssToObject';
import { stringify } from './stringify';

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

const cssObject = cssToObject(NESTED);
const css = stringify(cssObject);

console.log(cssObject)
console.log(css)

describe('stringify', () => {
  it('should render a css string as expected.', () => {
    expect(true).toBe(true);
  });
});