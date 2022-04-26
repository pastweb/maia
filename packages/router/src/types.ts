export type RouterContext = {
  [propName: string] : any;
};

export type MountInfo = {
  elementId: string;
  entryName: string;
};

export type Routes = {
  [route: string]: {
    [domain: string]: MountInfo[];
  }
};

export type Entries = {
  [domain: string]: {
    [entry: string]: {
      name: string;
      src: string;
    }
  }
}

export type Alias = {
  [domainName: string]: {
    domain: string;
    entries: {
      [entryName: string]: string;
    };
  };
}

export type RouterConfig = {
  alias?: Alias;
  entries: Entries;
  routes: Routes;
};
