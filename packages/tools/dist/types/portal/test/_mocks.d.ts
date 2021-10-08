import { App, AppOptions } from '../../App';
import { Portals } from '../types';
export declare const portals: Portals;
export declare const INIT_VALUE = "INIT_VALUE";
export declare class FirstApp extends App {
    node?: HTMLElement;
    constructor(options: AppOptions, domElement: HTMLElement);
    mount(): void;
    unmount(): void;
    update(value?: any): void;
}
export declare class SecondApp extends App {
    node?: HTMLElement;
    constructor(options: AppOptions, domElement: HTMLElement);
    mount(): void;
    unmount(): void;
    update(value?: any): void;
}
