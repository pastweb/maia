export class EventEmitter {
    emit(eventName: any, ...args: any[]): void;
    on(eventName: any, eventCallback: any): {
        eventCallbackKey: symbol;
        removeListener: () => any;
    };
    removeListener(eventCallbackKey: any): void;
    [unsubscribe]: any;
    [events]: {};
    [keys]: {};
}
declare const unsubscribe: unique symbol;
declare const events: unique symbol;
declare const keys: unique symbol;
export {};
