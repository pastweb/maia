export interface IsMobileCallbackEvent extends MediaQueryListEvent {
    isMobile: boolean;
}
export declare type MediaQueryCallback = (isMobileCallbackEvent: IsMobileCallbackEvent) => void;
export interface IisMobile {
    isMobile?: boolean;
    mediaQueryString?: string;
    onMediaQueryChange?: MediaQueryCallback;
}
