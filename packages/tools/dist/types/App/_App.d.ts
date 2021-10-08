export class App {
    constructor(options: {} | undefined, domElement: any, privateKeys?: {});
    domElement: any;
    options: {} | undefined;
    on: (eventName: string, eventCallback: import("../EventEmitter").EventCallback) => import("../EventEmitter").EmitterSubscribeObject;
    emit: (eventName: string, ...args: any[]) => void;
    removeListener: (eventCallbackKey: symbol) => void;
    setDomElement(domElement: any, domElementKey: any): void;
    setOptions(options: any, optionsKey: any): void;
    mount: any;
    unmount: any;
    update: any;
    [keys]: {};
    [emitter]: EventEmitter;
}
declare const keys: unique symbol;
declare const emitter: unique symbol;
import { EventEmitter } from "../EventEmitter/EventEmitter";
export {};
