export declare type EmitterSubscribeObject = {
    eventCallbackKey: symbol;
    removeListener: () => void;
};
export declare type EventCallback = (...args: any[]) => void;
