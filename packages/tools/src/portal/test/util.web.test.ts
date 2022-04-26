import { open, update, close } from '../util';
import { FirstEntry, SecondEntry, portals, INIT_VALUE } from './_mocks';

const rootPortal = document.createElement('div');
const portalId = 'rootPortal';
rootPortal.id = portalId;
document.body.appendChild(rootPortal);
const firstConfig = { portalId, entry: new FirstEntry() };
const secondConfig = {
  portalId,
  entry: new SecondEntry({ initData: { initValue: 'passedValue'} }),
};

const firstEntryId: string | false = open(portals, firstConfig);
const secondEntryId: string | false = open(portals, secondConfig);

describe('portal - util', () => {
  describe('open', () => {
    it('rootPortalElement should contains 2 childNode', () => {
      expect(rootPortal.childNodes.length).toBe(2);
    });

    it('firstEntryId should be inside portals[portalId]', () => {
      expect(
        Object.keys(portals[portalId]).includes(firstEntryId as string)
      ).toBe(true);
    });

    it('secondEntryId should be inside portals[portalId]', () => {
      expect(
        Object.keys(portals[portalId]).includes(secondEntryId as string)
      ).toBe(true);
    });

    it('portals[portalId][firstEntryId] should contains the instance of FirstEntry class', () => {
      expect(portals[portalId][firstEntryId as string] instanceof FirstEntry).toBe(
        true
      );
    });

    it('portals[portalId][secondEntryId] should contains the instance of SecondEntry class', () => {
      expect(
        portals[portalId][secondEntryId as string] instanceof SecondEntry
      ).toBe(true);
    });

    it(`the element with id="${firstEntryId}" should be present into the DOM`, () => {
      expect(
        typeof document.getElementById(firstEntryId as string) !== null
      ).toBe(true);
    });

    it(`the element with id="${secondEntryId}" should be present into the DOM`, () => {
      expect(
        typeof document.getElementById(secondEntryId as string) !== null
      ).toBe(true);
    });

    it(`the element with id="${secondEntryId}" should be present into the DOM.`, () => {
      const element = document.getElementById(secondEntryId as string) as HTMLElement;
      expect(typeof element !== null).toBe(true);
    });

    it('the element with class "firstEntry" should be present and contains the "INIT_VALUE"', () => {
      const element = document.querySelector('.firstEntry') as HTMLElement;
      expect(typeof element !== null).toBe(true);
      expect(element.innerHTML === INIT_VALUE).toBe(true);
    });

    it('the element with class "secontEntry" should be present and contains the "passedValue"', () => {
      const element = document.querySelector('.secondEntry') as HTMLElement;
      expect(typeof element !== null).toBe(true);
      expect(element.innerHTML === 'passedValue').toBe(true);
    });
  });

  describe('update', () => {
    it('the FirstEntry should contains the "newFirstEntryValue"', () => {
      update(portals, {
        portalId,
        entryId: firstEntryId as string,
        entryData: 'newFirstEntryValue'
      });
      const element = document.querySelector('.firstEntry') as HTMLElement;
      expect(typeof element !== null).toBe(true);
      expect(element.innerHTML).toBe('newFirstEntryValue');
    });

    it('the SecondEntry should contains the "newSecondEntryValue".', () => {
      update(portals, { portalId, entryId: secondEntryId as string, entryData: 'newSecondEntryValue' });
      const portalElement = document.getElementById(secondEntryId as string) as HTMLElement;
      const element = document.querySelector('.secondEntry') as HTMLElement;
      expect(typeof portalElement !== null).toBe(true);
      expect(typeof element !== null).toBe(true);
      expect(element.innerHTML).toBe('newSecondEntryValue');
    });
  });

  describe('close', () => {
    it('the firstEntry portal element should be not present', () => {
      close(portals, { portalId, entryId: firstEntryId as string });
      expect(document.getElementById(firstEntryId as string)).toBe(null);
    });

    it('the secondEntry portal element should be not present', () => {
      close(portals, { portalId, entryId: secondEntryId as string });
      expect(document.getElementById(secondEntryId as string)).toBe(null);
    });
  });
});
