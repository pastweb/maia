export type EmitterSubscribeObject = {
  eventCallbackKey: symbol;
  removeListener: () => void;
};

export type EventCallback = (...args: any[]) => void;
