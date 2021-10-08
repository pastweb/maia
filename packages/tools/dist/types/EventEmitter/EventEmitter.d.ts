import { EventCallback, EmitterSubscribeObject } from './types';
declare const unsubscribe: unique symbol;
export declare class EventEmitter {
    constructor();
    emit(eventName: string, ...args: any[]): void;
    on(eventName: string, eventCallback: EventCallback): EmitterSubscribeObject;
    removeListener(eventCallbackKey: symbol): void;
    [unsubscribe](eventName: string, eventCallbackKey: symbol): void;
}
export {};
