export type StyleCache = {
  counter: number;
  css: string;
  fontFamily: { [name: string]: string };
  id: string;
  keyframes: { [name: string]: string };
};

export type StyleMap = {
  [rule: string]: StyleCache;
};

export interface StyleMapper {
  has: (rules: string) => boolean,
  get: (rules: string) => StyleCache,
  getStyleMap: () => StyleMap;
  setStyleMap: (newStyleMap: StyleMap) => void;
  add: (rules: string, styleCache: StyleCache) => void;
  update: (rules: string, styleCache: StyleCache) => void;
  remove: (rules: string, styleCache: StyleCache) => void;
  size: number;
  css: string;
}

export interface Cache {
  ids: Set<string>;
  style: StyleMapper;
};
