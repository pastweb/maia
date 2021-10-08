import { SubscriptionObject } from './types';
export declare class Observable {
    constructor();
    subscribe(f: (...args: any[]) => any): SubscriptionObject | void;
    unsubscribe(f: (...args: any[]) => any): void;
    next(...args: any[]): void;
}
