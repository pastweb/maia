import { RouterContext, RouterConfig, Routes, Entries, Alias } from './types';

export default class MaiaRouter {
  private alias: Alias;
  private entries: Entries;
  private routes: Routes;
  private contexts: { [domain: string]: any };
  private currentRoute: string;
  private instanciedEntries: { [domain: string]: any };
  private mountedEntries: { [domain: string]: any };
  private routerContext: RouterContext;
  private routeKeys: string[];

  constructor(config: RouterConfig, context: RouterContext) {
    this.getEntryOptions = this.getEntryOptions.bind(this);
    this.initContexts = this.initContexts.bind(this);
    this.getRoute = this.getRoute.bind(this);
    this.setCurentRoute = this.setCurentRoute.bind(this);
    this.initEntry = this.initEntry.bind(this);
    this.getEntry = this.getEntry.bind(this);
    this.renderEntries = this.renderEntries.bind(this);
    this.start = this.start.bind(this);

    this.alias = config.alias || {};
    this.routerContext = context;
    this.entries = config.entries;
    this.routes = config.routes;
    this.routeKeys = Object.keys(config.routes);

    this.contexts = {};
    this.instanciedEntries = {};
    this.mountedEntries = {};
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
    this.renderEntries('*');
    this.setCurentRoute(pathname);
  }

  private getEntryOptions(domain: string) {
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
        const options = { maiaRouter: this.getEntryOptions(domain) };
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
      this.renderEntries(newRoute);  
    }
  }

  private async initEntry(domain: string, entryName: string) {
    try {
      const { name, src } = this.entries[domain][entryName];
      const options = { maiaRouter: this.getEntryOptions(domain) };
      const sm = await window.System.import(src);
      const entry = sm[name].default;
      entry.mergeOptions(options);
      this.instanciedEntries[domain][entryName] = entry;
    } catch (err) {
      console.error(err);
    }
  }

  public async getEntry(domainName: string, entryName: string) {
    const domain = this.alias[domainName] ? this.alias[domainName].domain : domainName;
    const _entryName = this.alias[domainName] && this.alias[domainName].entries[entryName] || entryName;

    this.instanciedEntries[domain] = this.instanciedEntries[domain] || {};

    if (!this.instanciedEntries[domain][_entryName]) {
      await this.initEntry(domain, _entryName);
    }

    return this.instanciedEntries[domain][_entryName];
  }

  private renderEntries(route: string) {
    if (this.routes[route]) {
      Object.entries(this.routes[route]).forEach(([domain, mount]) => {
        mount.forEach(async ({ elementId, entryName }) => {
          if (this.entries[domain][entryName]) {
            const domElement = document.getElementById(elementId);
            
            if (!domElement) {
              throw new Error(`MaiaRouter Error: The element with id: "${domElement}" is not present in the DOM.`);
            }
  
            const entry = await this.getEntry(domain, entryName);
            entry.mergeOptions({ domElement });
  
            if (this.mountedEntries[elementId]) {
              this.mountedEntries[elementId].unmount();
            }
  
            requestAnimationFrame(() => entry.mount());
            this.mountedEntries[elementId] = entry;
          }
        });
      });
    }
  }
}
