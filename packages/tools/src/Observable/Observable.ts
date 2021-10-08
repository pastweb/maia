import { SubscriptionObject } from './types';

const observers = Symbol();

export class Observable {
  constructor () {
    (this as any)[observers] = new Set();
  }

  subscribe (f: (...args: any[]) => any): SubscriptionObject | void {
    if (!(this as any)[observers].has(f)) {
      (this as any)[observers].add(f);
      return { unsubscribe: () => this.unsubscribe(f) };
    }
  }

  unsubscribe (f: (...args: any[]) => any): void {
    (this as any)[observers].delete(f);
  }

  next (...args: any[]) {
    (this as any)[observers].forEach((observer: (...args: any[]) => any) => observer(...args));
  }
}
