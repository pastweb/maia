import { RouterContext, RouterConfig, Routes, Entries, Alias } from './types';

export default class MaiaRouter {
  private alias: Alias;
  private entries: Entries;
  private routes: Routes;
  private contexts: { [domain: string]: any };
  private currentRoute: string;
  private instanciedApps: { [domain: string]: any };
  private mountedApps: { [domain: string]: any };
  private routerContext: RouterContext;
  private routeKeys: string[];

  constructor(config: RouterConfig, context: RouterContext) {
    this.getAppOptions = this.getAppOptions.bind(this);
    this.initContexts = this.initContexts.bind(this);
    this.getRoute = this.getRoute.bind(this);
    this.setCurentRoute = this.setCurentRoute.bind(this);
    this.initApp = this.initApp.bind(this);
    this.getApp = this.getApp.bind(this);
    this.renderApps = this.renderApps.bind(this);
    this.start = this.start.bind(this);

    this.alias = config.alias || {};
    this.routerContext = context;
    this.entries = config.entries;
    this.routes = config.routes;
    this.routeKeys = Object.keys(config.routes);

    this.contexts = {};
    this.instanciedApps = {};
    this.mountedApps = {};
    this.currentRoute = '*';
  }

  public start() {
    // location listener
    let pathname = window.location.pathname;
    setInterval(() => {
      if (pathname !== window.location.pathname) {
        this.setCurentRoute(pathname);
        pathname = window.location.pathname;
      }
    });

    this.initContexts(); 
    this.renderApps('*');
    this.setCurentRoute(pathname);
  }

  private getAppOptions(domain: string) {
    const baseRoute = Object.keys(this.routes[this.currentRoute])
      .includes(domain) ?
        (this.currentRoute !== '/' && this.currentRoute !== '*') ?
          this.currentRoute : ''
        : '';

    const options: { [key: string]: any } = {
      baseRoute,
      routerContext: this.routerContext || undefined,
    };

    const context = this.contexts[domain];
    if (context) {
      options.context = context;
    }

    return options;
  }

  private initContexts() {
    Object.entries(this.entries).forEach(async ([domain, { context }]) => {
      if (context) {
        const { src, name } = context;
        const sm = await window.System.import(src);
        const options = { maiaRouter: this.getAppOptions(domain) };
        this.contexts[domain] = sm[name].default(options);
      }
    });
  }

  private getRoute(pathname: string): string | false {
    let newRoute: string | false = false;

    for (let i = 0; i < this.routeKeys.length; i++) {
      if (pathname.indexOf(this.routeKeys[i]) === 0) {
        newRoute = this.routeKeys[i];
        break;
      }
    }

    if (!newRoute) {
      newRoute = '/';
    }

    if (newRoute !== this.currentRoute) return newRoute;
    return false;
  }

  private setCurentRoute(pathname: string) {
    const newRoute = this.getRoute(pathname);
    
    if (newRoute) {
      this.currentRoute = newRoute;
      this.renderApps(newRoute);  
    }
  }

  private async initApp(domain: string, entry: string) {
    try {
      const { name, src } = this.entries[domain][entry];
      const options = { maiaRouter: this.getAppOptions(domain) };
      const sm = await window.System.import(src);
      const app = sm[name].default;
      app.mergeOptions(options);
      this.instanciedApps[domain][entry] = app;
    } catch (err) {
      console.error(err);
    }
  }

  public async getApp(domainName: string, entryName: string) {
    const domain = this.alias[domainName] ? this.alias[domainName].domain : domainName;
    const entry = this.alias[domainName] && this.alias[domainName].entries[entryName] || entryName;

    this.instanciedApps[domain] = this.instanciedApps[domain] || {};

    if (!this.instanciedApps[domain][entry]) {
      await this.initApp(domain, entry);
    }

    return this.instanciedApps[domain][entry];
  }

  private renderApps(route: string) {
    if (this.routes[route]) {
      Object.entries(this.routes[route]).forEach(([domain, mount]) => {
        mount.forEach(async ({ elementId, entry }) => {
          if (this.entries[domain][entry]) {
            const domElement = document.getElementById(elementId);
            
            if (!domElement) {
              throw new Error(`MaiaRouter Error: The element with id: "${domElement}" is not present in the DOM.`);
            }
  
            const app = await this.getApp(domain, entry);
            app.mergeOptions({ domElement });
  
            if (this.mountedApps[elementId]) {
              this.mountedApps[elementId].unmount();
            }
  
            requestAnimationFrame(() => app.mount());
            this.mountedApps[elementId] = app;
          }
        });
      });
    }
  }
}
