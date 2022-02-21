import { App, AppOptions } from '../../App';
import { Portals } from '../types';

export const portals: Portals = {};

export const INIT_VALUE = 'INIT_VALUE';

export class FirstApp extends App {
  node?: HTMLElement;

  constructor(options?: AppOptions) {
    super(options);
  }

  mount() {
    const node = document.createElement('div');
    node.className = 'firstApp';
    node.innerHTML = INIT_VALUE;
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

  update(value?: any) {
    if (this.node) {
      this.node.innerHTML = value;
    }
  }
}

export class SecondApp extends App {
  node?: HTMLElement;
  constructor(options: AppOptions) {
    super(options);
  }

  mount() {
    const node = document.createElement('div');
    node.className = 'secondApp';
    if (this.options) {
      node.innerHTML = (this.options.initData as any).initValue || INIT_VALUE;
    }
    this.node = node;
    if (this.domElement && this.node) {
      this.domElement.appendChild(this.node);
    }
  }

  unmount() {
    if (this.node) {
      this.node.remove();
    }
  }

  update(value?: any) {
    if (this.node) {
      this.node.innerHTML = value;
    }
  }
}
