import { EventCallback, EmitterSubscribeObject } from './types';

export class EventEmitter {
  private events: { [eventName: string]: Map<symbol, EventCallback> };
  private keys: { [eventCallbackKey: symbol]: string };
  
  constructor() {
    this.events = {};
    this.keys = {};

    this.emit = this.emit.bind(this);
    this.on = this.on.bind(this);
    this.removeListener = this.removeListener.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  emit(eventName: string, ...args: any[]): void {
    if (this.events[eventName]) {
      const callBackCache = new Set();

      this.events[eventName].forEach(
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
    if (!this.events[eventName]) {
      this.events[eventName] = new Map();
    }

    const eventCallbackKey = Symbol();
    this.events[eventName].set(eventCallbackKey, eventCallback);
    this.keys[eventCallbackKey] = eventName;

    return {
      eventCallbackKey,
      removeListener: () => this.unsubscribe(eventName, eventCallbackKey)
    };
  }

  removeListener(eventCallbackKey: symbol): void {
    const event = this.keys[eventCallbackKey];
    if (event) {
      this.unsubscribe(event, eventCallbackKey);
    }
  }

  private unsubscribe(eventName: string, eventCallbackKey: symbol): void {
    this.events[eventName].delete(eventCallbackKey);
    delete this.keys[eventCallbackKey];
  }
}
