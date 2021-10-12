import { createPortal } from '../';
import { isObject } from '../../isObject';
import { FirstApp } from './_mocks';

describe('createPortal', () => {
  const rootPortal = document.createElement('div');
  const portalId = 'rootPortal';
  rootPortal.id = portalId;
  document.body.appendChild(rootPortal);

  const portalConfig = { portalId, app: { AppClass: FirstApp } };
  const portal = createPortal(portalConfig);

  it('portal shuold be al object', () => {
    expect(isObject(portal)).toBe(true);
  });

  it('open should be fefined and should be a function', () => {
    const type = typeof portal.open;
    expect(type !== 'undefined').toBe(true);
    expect(type === 'function').toBe(true);
  });

  it('update should be fefined and should be a function', () => {
    const type = typeof portal.update;
    expect(type !== 'undefined').toBe(true);
    expect(type === 'function').toBe(true);
  });

  it('close should be fefined and should be a function', () => {
    const type = typeof portal.close;
    expect(type !== 'undefined').toBe(true);
    expect(type === 'function').toBe(true);
  });
});
