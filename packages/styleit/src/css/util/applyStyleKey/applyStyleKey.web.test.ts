import { cssToObject } from '../cssToObject';
import { applyStyleKey } from './applyStyleKey';

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

const styleKey = '_id';

describe('applyStyleKey', () => {
  it('the style string should not be changed.', () => {
    expect(JSON.stringify(applyStyleKey(NESTED, styleKey).scoped)).toBe(JSON.stringify(cssToObject(NESTED)));
  });
});
