import { EventEmitter, EventCallback } from '../EventEmitter';
import { mergeDeep } from '../mergeDeep';
import { noop } from '../noop';
import { isSSR } from '../isSSR';
import { hashID } from '../hashID';
import { AppOptions } from './types';

const methods = ['mount', 'update', 'unmount', 'ssr'];

const ssrIds = new Set<string>();
let ssrMap: { [ssrKey: string]: Promise<string> } = {};
let isStaticSSR = true;

export class App {
  private emitter: EventEmitter;
  AppComponent: any;
  ssrId: string | undefined;
  domElement: HTMLElement | undefined;
  options: AppOptions | undefined;
  on: (eventName: string, eventCallback: EventCallback) => void;
  emit: (eventName: string, ...args: any[]) => void;
  removeListener: (eventCallbackKey: symbol) => void;

  constructor(options?: AppOptions) {
    options = options || {};
    options.initData = options.initData || {};

    if (isSSR) {
      const ssrId = hashID.generateUnique(ssrIds);
      ssrIds.add(ssrId);
      this.ssrId = ssrId;
    }

    this.options = options;
    this.domElement = options.domElement;
    this.AppComponent = options.AppComponent;
    
    this.emitter = new EventEmitter();

    this.on = this.emitter.on;
    this.emit = this.emitter.emit;
    this.removeListener = this.emitter.removeListener;

    methods.forEach(method => {
      if ((this as any)[method] && typeof (this as any)[method] === 'function') {
        (this as any)[method] = (this as any)[method].bind(this);
      } else {
        (this as any)[method] = noop;
      }

      this.on(method, (...args: any[]) => {
        (this as any)[method](...args);
      });
    });
  }

  public memoSSR(htmlPromiseFunction: (isStatic: boolean) => Promise<string>): void {
    const htmlPromise = htmlPromiseFunction(isStaticSSR);
    ssrMap[this.ssrId as string] = htmlPromise;
  }

  public async getComposedSSR(isStatic?: boolean): Promise<string> {
    isStatic = typeof isStatic !== 'undefined' ? isStatic : true;

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

  public setDomElement(domElement: HTMLElement): void {
    this.domElement = domElement;
  }

  public setOptions(options: AppOptions): void {
    this.options = options;
  }

  public mergeOptions(newOptions: AppOptions): void {
    this.options = mergeDeep(this.options || {}, newOptions);
  }

  public setAppComponent(Component: any): void {
    this.AppComponent = Component;
  }
}
