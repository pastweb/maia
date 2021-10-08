export declare type ThrottleCallback = (...args: any[]) => any;
export declare function throttle(fn: ThrottleCallback, timeout?: number): ThrottleCallback;
