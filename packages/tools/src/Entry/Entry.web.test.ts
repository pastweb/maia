import { Entry } from './';
import { EntryOptions } from './types';

const INITIAL_VALUE = 'this is the initial value';

const functions = {
  update: jest.fn()
};

class MyEntry extends Entry {
  node?: HTMLElement;

  constructor(options: EntryOptions) {
    super(options);
  }

  mount() {
    const node = document.createElement('div');
    node.className = 'firstEntry';
    node.innerHTML = INITIAL_VALUE;
    this.node = node;
    if (this.node && this.domElement) {
      this.domElement.appendChild(this.node);
    }
  }

  unmount() {
    if (this.node) {
      this.node.remove();
    }
  }

  update(value: any) {
    if (this.node) {
      this.node.innerHTML = value;
    }
  }
}

class MyEntry2 extends Entry {
  node?: HTMLElement;

  constructor(options: EntryOptions) {
    super(options);
  }

  mount() {
    const node = document.createElement('div');
    node.className = 'secondEntry';
    node.innerHTML = INITIAL_VALUE;
    this.node = node;
    if (this.node && this.domElement) {
      this.domElement.appendChild(this.node);
    }
  }

  unmount() {
    if (this.node) {
      this.node.remove();
    }
  }

  update(value: any) {
    if (this.node) {
      this.node.innerHTML = value;
    }
  }
}

describe('Entry', () => {
  const domElement = document.querySelector('body') as HTMLElement;
  const firstEntry = new MyEntry({ domElement });
  const secondEntry = new MyEntry2({ domElement });
  const { body } = document;

  describe('mount', () => {
    firstEntry.mount();
    const node = document.querySelector('.firstEntry') as HTMLElement;

    it('the body element should contains a single node', () => {
      expect(body.childNodes.length).toBeGreaterThanOrEqual(1);
    });

    it('the html node should be not null', () => {
      expect(node !== null).toBe(true);
    });

    it('the body node element be a div', () => {
      expect(node.tagName).toBe('DIV');
    });

    it('the div element must have the class "firstEntry"', () => {
      expect(node.className).toBe('firstEntry');
    });

    it('the div element content should be equal to INITIAL_VALUE constant', () => {
      expect(node.innerHTML).toBe(INITIAL_VALUE);
    });
  });

  describe('update', () => {
    const spyEvent = jest.spyOn(functions, 'update');
    const spyMethod = jest.spyOn(secondEntry, 'update');
    secondEntry.on('update', functions.update);

    secondEntry.mount();
    const node = document.querySelector('.secondEntry') as HTMLElement;
    secondEntry.emit('update', 'newValue');

    it('the html node should be not null', () => {
      expect(node !== null).toBe(true);
    });

    it('the body node element be a div', () => {
      expect(node.tagName).toBe('DIV');
    });

    it('the div element must have the class "secondEntry"', () => {
      expect(node.className).toBe('secondEntry');
    });

    it('the div element content should be equal to "newValue" constant', () => {
      expect(node.innerHTML).toBe('newValue');
    });

    it('the function update should be called', () => {
      expect(spyEvent).toBeCalled();
    });

    it('the method update should be called', () => {
      expect(spyMethod).toBeCalled();
    });
  });

  describe('unmount', () => {
    secondEntry.unmount();
    const node = document.querySelector('.secondEntry');

    it('the div element with the class "secondEntry" should not exists', () => {
      expect(node).toBe(null);
    });
  });
});
