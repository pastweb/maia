import { EventEmitter, EventCallback } from '../EventEmitter';
import { mergeDeep } from '../mergeDeep';
import { noop } from '../noop';
import { isSSR } from '../isSSR';
import { hashID } from '../hashID';
import { AppOptions, PrivateKeys } from './types';

const methods = ['mount', 'hydrate', 'update', 'unmount', 'ssr'];

const ssrIds = new Set<string>();
let ssrMap: { [ssrKey: string]: Promise<string> } = {};
let isStaticSSR = false;

export class App {
  private keys: PrivateKeys;
  private emitter: EventEmitter;
  ssrId: string | undefined;
  domElement: HTMLElement | undefined;
  options: AppOptions | undefined;
  on: (eventName: string, eventCallback: EventCallback) => void;
  emit: (eventName: string, ...args: any[]) => void;
  removeListener: (eventCallbackKey: symbol) => void;

  constructor(options: AppOptions = {}, privateKeys: PrivateKeys = {}) {
    if (isSSR) {
      const ssrId = hashID.generateUnique(ssrIds);
      ssrIds.add(ssrId);
      this.ssrId = ssrId;
    }

    const { domElement } = options;
    const { optionsKey, domElementKey } = privateKeys;
    this.keys = privateKeys;
    this.emitter = new EventEmitter();

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

    this.on = this.emitter.on;
    this.emit = this.emitter.emit;
    this.removeListener = this.emitter.removeListener;

    methods.forEach(method => {
      if ((this as any)[method] && typeof (this as any)[method] === 'function') {
        (this as any)[method] = (this as any)[method].bind(this);
      } else {
        (this as any)[method] = noop;
      }

      if (method !== 'mount') {
        this.on(method, (...args: any[]) => {
          (this as any)[method](...args);
        });
      }
    });
  }

  public memoSSR(htmlPromiseFunction: (isStatic: boolean) => Promise<string>): void {
    const htmlPromise = htmlPromiseFunction(isStaticSSR);
    ssrMap[this.ssrId as string] = htmlPromise;
  }

  public async getComposedSSR(isStatic = false): Promise<string> {
    isStaticSSR = isStatic;
    const rootRender = await (this as any).ssr(isStatic);

    return new Promise((resolve, reject) => {
      try {
        const finalRender = Object.entries(ssrMap).reduce(async (acc, [ssrId, htmlPromise]) => {
          const html = await htmlPromise;
          return acc.replace(ssrId, html);
        }, rootRender);
  
        resolve(finalRender);
        ssrIds.clear();
        ssrMap = {};
        isStaticSSR = false;
      } catch (e) {
        reject(e);
      }
    });
  }

  public setDomElement(domElement: HTMLElement, domElementKey?: symbol): void {
    if (domElementKey) {
      (this as any)[domElementKey] = domElement;
    } else if (this.keys.domElementKey) {
      (this.keys as any).domElementKey = domElement;
    } else {
      this.domElement = domElement;
    }
  }

  public setOptions(options: AppOptions, optionsKey?: symbol): void {
    if (optionsKey) {
      (this as any)[optionsKey] = options;
    } else if (this.keys.optionsKey) {
      (this as any)[(this.keys as any).optionsKey] = options;
    } else {
      this.options = options;
    }
  }

  public mergeOptions(newOptions: AppOptions): void {
    if (this.keys.optionsKey) {
      (this as any)[this.keys.optionsKey] = mergeDeep(
        (this as any)[this.keys.optionsKey],
        newOptions
      );
    } else {
      this.options = mergeDeep((this as any).options, newOptions);
    }
  }
}
