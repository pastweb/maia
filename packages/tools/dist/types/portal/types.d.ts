import { App, AppOptions, PrivateKeys } from '../App';
export declare type Portals = {
    [portalId: string]: {
        [appId: string]: App;
    };
};
export declare type AppConfig = {
    AppClass?: any;
    options?: AppOptions;
    privateKeys?: PrivateKeys;
};
export declare type StyleConfig = {
    [prop: string]: string;
};
export declare type HTMLElementAttrs = {
    [attr: string]: string | StyleConfig;
};
export declare type OpenPortalConfig = {
    portalId: string;
    tagName?: string;
    tagAttrs?: HTMLElementAttrs;
    app?: AppConfig;
};
export declare type UpdatePortalConfig = {
    portalId: string;
    appId: string;
    tagAttrs?: {
        [attr: string]: any;
    };
    appData: any;
};
export declare type ClosePortalConfig = {
    portalId: string;
    appId: string;
};
export declare type Portal = {
    open: (portalConfig: OpenPortalConfig) => string | false;
    update: (portalConfig: UpdatePortalConfig) => boolean;
    close: (portalConfig: ClosePortalConfig) => boolean;
};
export declare type CreatePortalConfig = {
    portalId: string;
    tagName?: string;
    tagAttrs?: HTMLElementAttrs;
    app?: AppConfig;
};
export declare type CreatedPortal = {
    open: (component: any, initData?: {
        [key: string]: any;
    }) => string | false;
    update: (appId: string, appData?: any, tagAttrs?: HTMLElementAttrs) => boolean;
    close: (appId: string) => boolean;
};
