import { EventEmitter, EventCallback } from '../EventEmitter';
import { noop } from '../noop';
import { AppOptions, PrivateKeys } from './types';

const emitter = Symbol();
const keys = Symbol();

export class App {
  domElement: HTMLElement | undefined;
  options: AppOptions | undefined;
  on: (eventName: string, eventCallback: EventCallback) => void;
  emit: (eventName: string, ...args: any[]) => void;
  removeListener: (eventCallbackKey: symbol) => void;

  constructor(
    options: AppOptions = {},
    domElement?: HTMLElement,
    privateKeys: PrivateKeys = {}
  ) {
    const { optionsKey, domElementKey } = privateKeys;
    (this as any)[keys] = privateKeys;
    (this as any)[emitter] = new EventEmitter();

    if (domElementKey) {
      (this as any)[domElementKey] = domElement;
    } else {
      this.domElement = domElement;
    }

    if (optionsKey) {
      (this as any)[optionsKey] = options;
    } else {
      this.options = options;
    }

    this.on = (this as any)[emitter].on;
    this.emit = (this as any)[emitter].emit;
    this.removeListener = (this as any)[emitter].removeListener;

    if ((this as any).mount && typeof (this as any).mount === 'function') {
      (this as any).mount = (this as any).mount.bind(this);
    } else {
      (this as any).mount = noop;
    }

    if ((this as any).unmount && typeof (this as any).unmount === 'function') {
      (this as any).unmount = (this as any).unmount.bind(this);
    } else {
      (this as any).unmount = noop;
    }

    if ((this as any).update && typeof (this as any).update === 'function') {
      (this as any).update = (this as any).update.bind(this);
    } else {
      (this as any).update = noop;
    }
  }

  public setDomElement(domElement: HTMLElement, domElementKey?: symbol): void {
    if (domElementKey) {
      (this as any)[domElementKey] = domElement;
    } else if ((this as any)[keys].domElementKey) {
      (this as any)[keys].domElementKey = domElement;
    } else {
      this.domElement = domElement;
    }
  }

  public setOptions(options: AppOptions, optionsKey?: symbol): void {
    if (optionsKey) {
      (this as any)[optionsKey] = options;
    } else if ((this as any)[keys].optionsKey) {
      (this as any)[(this as any)[keys].optionsKey] = options;
    } else {
      this.options = options;
    }
  }
}
