import { open, update, close } from '../util';
import { FirstApp, SecondApp, portals, INIT_VALUE } from './_mocks';

const rootPortal = document.createElement('div');
const portalId = 'rootPortal';
rootPortal.id = portalId;
document.body.appendChild(rootPortal);
const firstConfig = { portalId, app: new FirstApp() };
const secondConfig = {
  portalId,
  app: new SecondApp({ initData: { initValue: 'passedValue'} }),
};

const firstAppId: string | false = open(portals, firstConfig);
const secondAppId: string | false = open(portals, secondConfig);

describe('portal - util', () => {
  describe('open', () => {
    it('rootPortalElement should contains 2 childNode', () => {
      expect(rootPortal.childNodes.length).toBe(2);
    });

    it('firstAppId should be inside portals[portalId]', () => {
      expect(
        Object.keys(portals[portalId]).includes(firstAppId as string)
      ).toBe(true);
    });

    it('secondAppId should be inside portals[portalId]', () => {
      expect(
        Object.keys(portals[portalId]).includes(secondAppId as string)
      ).toBe(true);
    });

    it('portals[portalId][firstAppId] should contains the instance of FirstApp class', () => {
      expect(portals[portalId][firstAppId as string] instanceof FirstApp).toBe(
        true
      );
    });

    it('portals[portalId][secondAppId] should contains the instance of SecondApp class', () => {
      expect(
        portals[portalId][secondAppId as string] instanceof SecondApp
      ).toBe(true);
    });

    it(`the element with id="${firstAppId}" should be present into the DOM`, () => {
      expect(
        typeof document.getElementById(firstAppId as string) !== null
      ).toBe(true);
    });

    it(`the element with id="${secondAppId}" should be present into the DOM`, () => {
      expect(
        typeof document.getElementById(secondAppId as string) !== null
      ).toBe(true);
    });

    it(`the element with id="${secondAppId}" should be present into the DOM.`, () => {
      const element = document.getElementById(secondAppId as string) as HTMLElement;
      expect(typeof element !== null).toBe(true);
    });

    it('the element with class "firstApp" should be present and contains the "INIT_VALUE"', () => {
      const element = document.querySelector('.firstApp') as HTMLElement;
      expect(typeof element !== null).toBe(true);
      expect(element.innerHTML === INIT_VALUE).toBe(true);
    });

    it('the element with class "secontApp" should be present and contains the "passedValue"', () => {
      const element = document.querySelector('.secondApp') as HTMLElement;
      expect(typeof element !== null).toBe(true);
      expect(element.innerHTML === 'passedValue').toBe(true);
    });
  });

  describe('update', () => {
    it('the FirstApp should contains the "newFirstAppValue"', () => {
      update(portals, {
        portalId,
        appId: firstAppId as string,
        appData: 'newFirstAppValue'
      });
      const element = document.querySelector('.firstApp') as HTMLElement;
      expect(typeof element !== null).toBe(true);
      expect(element.innerHTML).toBe('newFirstAppValue');
    });

    it('the SecondApp should contains the "newSecondAppValue".', () => {
      update(portals, { portalId, appId: secondAppId as string, appData: 'newSecondAppValue' });
      const portalElement = document.getElementById(secondAppId as string) as HTMLElement;
      const element = document.querySelector('.secondApp') as HTMLElement;
      expect(typeof portalElement !== null).toBe(true);
      expect(typeof element !== null).toBe(true);
      expect(element.innerHTML).toBe('newSecondAppValue');
    });
  });

  describe('close', () => {
    it('the firstApp portal element should be not present', () => {
      close(portals, { portalId, appId: firstAppId as string });
      expect(document.getElementById(firstAppId as string)).toBe(null);
    });

    it('the secondApp portal element should be not present', () => {
      close(portals, { portalId, appId: secondAppId as string });
      expect(document.getElementById(secondAppId as string)).toBe(null);
    });
  });
});
