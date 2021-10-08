import { EventCallback } from '../EventEmitter';
import { AppOptions, PrivateKeys } from './types';
export declare class App {
    domElement: HTMLElement | undefined;
    options: AppOptions | undefined;
    on: (eventName: string, eventCallback: EventCallback) => void;
    emit: (eventName: string, ...args: any[]) => void;
    removeListener: (eventCallbackKey: symbol) => void;
    constructor(options?: AppOptions, domElement?: HTMLElement, privateKeys?: PrivateKeys);
    setDomElement(domElement: HTMLElement, domElementKey?: symbol): void;
    setOptions(options: AppOptions, optionsKey?: symbol): void;
}
