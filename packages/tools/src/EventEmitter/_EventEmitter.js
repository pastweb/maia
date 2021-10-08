const events = Symbol();
const keys = Symbol();
const unsubscribe = Symbol();

export class EventEmitter {
  constructor () {
    this[events] = {};
    this[keys] = {};
    this[unsubscribe] = this[unsubscribe].bind(this);
    this.emit = this.emit.bind(this);
    this.on = this.on.bind(this);
    this.removeListener = this.removeListener.bind(this);
  }

  emit (eventName, ...args) {
    if (this[events][eventName]) {
      const callBackCache = new Set();
      
      this[events][eventName].forEach(eventCallback => {
        if (!callBackCache.has(eventCallback)) {
          callBackCache.add(eventCallback);
          eventCallback(...args);
        }
      });
    }
  }

  on (eventName, eventCallback) {
    if (!this[events][eventName]) {
      this[events][eventName] = new Map();
    }

    const eventCallbackKey = Symbol();
    this[events][eventName].set(eventCallbackKey, eventCallback);
    this[keys][eventCallbackKey] = eventName;

    return {
      eventCallbackKey,
      removeListener: () => this[unsubscribe](eventName, eventCallbackKey),
    };
  }

  removeListener (eventCallbackKey) {
    const event = this[keys][eventCallbackKey];
    if (event) {
      this[unsubscribe](event, eventCallbackKey);
    }
  }

  [unsubscribe] (eventName, eventCallbackKey) {
    this[events][eventName].delete(eventCallbackKey);
    delete this[keys][eventCallbackKey];
  }
}
