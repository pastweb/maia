import { App } from './';
import { AppOptions } from './types';

const INITIAL_VALUE = 'this is the initial value';

const functions = {
  update: jest.fn()
};

class MyApp extends App {
  node?: HTMLElement;

  constructor(options: AppOptions) {
    super(options);
  }

  mount() {
    const node = document.createElement('div');
    node.className = 'firstApp';
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

class MyApp2 extends App {
  node?: HTMLElement;

  constructor(options: AppOptions) {
    super(options);
  }

  mount() {
    const node = document.createElement('div');
    node.className = 'secondApp';
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

describe('App', () => {
  const domElement = document.querySelector('body') as HTMLElement;
  const firstApp = new MyApp({ domElement });
  const secondApp = new MyApp2({ domElement });
  const { body } = document;

  describe('mount', () => {
    firstApp.mount();
    const node = document.querySelector('.firstApp') as HTMLElement;

    it('the body element should contains a single node', () => {
      expect(body.childNodes.length).toBeGreaterThanOrEqual(1);
    });

    it('the html node should be not null', () => {
      expect(node !== null).toBe(true);
    });

    it('the body node element be a div', () => {
      expect(node.tagName).toBe('DIV');
    });

    it('the div element must have the class "firstApp"', () => {
      expect(node.className).toBe('firstApp');
    });

    it('the div element content should be equal to INITIAL_VALUE constant', () => {
      expect(node.innerHTML).toBe(INITIAL_VALUE);
    });
  });

  describe('update', () => {
    const spyEvent = jest.spyOn(functions, 'update');
    const spyMethod = jest.spyOn(secondApp, 'update');
    secondApp.on('update', functions.update);

    secondApp.mount();
    const node = document.querySelector('.secondApp') as HTMLElement;
    secondApp.emit('update', 'newValue');

    it('the html node should be not null', () => {
      expect(node !== null).toBe(true);
    });

    it('the body node element be a div', () => {
      expect(node.tagName).toBe('DIV');
    });

    it('the div element must have the class "secondApp"', () => {
      expect(node.className).toBe('secondApp');
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
    secondApp.unmount();
    const node = document.querySelector('.secondApp');

    it('the div element with the class "secondApp" should not exists', () => {
      expect(node).toBe(null);
    });
  });
});
