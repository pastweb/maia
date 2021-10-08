import { EventEmitter } from '../EventEmitter/EventEmitter';
import { noop } from '../noop/noop';

const emitter = Symbol();
const keys = Symbol();

export class App {
  constructor (options = {}, domElement, privateKeys = {}) {
    const { optionsKey, domElementKey } = privateKeys;

    if (domElementKey) {
      this[domElementKey] = domElement;
    } else {
      this.domElement = domElement;
    }

    if (optionsKey) {
      this[optionsKey] = options;
    } else {
      this.options = options;
    }
    
    this[keys] = privateKeys;
    this[emitter] = new EventEmitter();
    this.on = this[emitter].on;
    this.emit = this[emitter].emit;
    this.removeListener = this[emitter].removeListener;

    this.setDomElement = this.setDomElement.bind(this);
    this.setOptions = this.setOptions.bind(this);

    this.mount = noop;
    if (this.mount) {
      this.mount = this.mount.bind(this);
    }

    this.unmount = noop;

    if (this.unmount) {
      this.unmount = this.unmount.bind(this);
    }

    this.update = noop;

    if (this.update) {
      this.update = this.update.bind(this);
    }
  }

  setDomElement (domElement, domElementKey) {
    if (domElementKey) {
      this[domElementKey] = domElement;
    } else if (this[keys].domElementKey) {
      this[this[keys].domElementKey] = domElement;
    } else {
      this.domElement = domElement;
    }
  }
  
  setOptions (options, optionsKey) {
    if (optionsKey) {
      this[optionsKey] = options;
    } else if (this[keys].optionsKey) {
      this[this[keys].optionsKey] = options;
    } else {
      this.options = options;
    }
  }
}
