import { EventCallback, EmitterSubscribeObject } from './types';

const events = Symbol();
const keys = Symbol();
const unsubscribe = Symbol();

export class EventEmitter {
  constructor() {
    (this as any)[events] = {};
    (this as any)[keys] = {};
    (this as any)[unsubscribe] = this[unsubscribe].bind(this);
    this.emit = this.emit.bind(this);
    this.on = this.on.bind(this);
    this.removeListener = this.removeListener.bind(this);
  }

  emit(eventName: string, ...args: any[]): void {
    if ((this as any)[events][eventName]) {
      const callBackCache = new Set();

      (this as any)[events][eventName].forEach(
        (eventCallback: EventCallback) => {
          if (!callBackCache.has(eventCallback)) {
            callBackCache.add(eventCallback);
            eventCallback(...args);
          }
        }
      );
    }
  }

  on(eventName: string, eventCallback: EventCallback): EmitterSubscribeObject {
    if (!(this as any)[events][eventName]) {
      (this as any)[events][eventName] = new Map();
    }

    const eventCallbackKey = Symbol();
    (this as any)[events][eventName].set(eventCallbackKey, eventCallback);
    (this as any)[keys][eventCallbackKey] = eventName;

    return {
      eventCallbackKey,
      removeListener: () => this[unsubscribe](eventName, eventCallbackKey)
    };
  }

  removeListener(eventCallbackKey: symbol): void {
    const event = (this as any)[keys][eventCallbackKey];
    if (event) {
      this[unsubscribe](event, eventCallbackKey);
    }
  }

  [unsubscribe](eventName: string, eventCallbackKey: symbol): void {
    (this as any)[events][eventName].delete(eventCallbackKey);
    delete (this as any)[keys][eventCallbackKey];
  }
}
