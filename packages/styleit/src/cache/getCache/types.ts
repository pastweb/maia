export type StyleCache = {
  counter: number;
  css: string;
  fontFamily: { [name: string]: string };
  styleKey: string;
  keyframes: { [name: string]: string };
};

export type StyleMap = {
  [styleKey: string]: StyleCache;
};

export interface StyleMapper {
  has: (styleKey: string) => boolean,
  get: (styleKey: string) => StyleCache,
  getStyleMap: () => StyleMap;
  setStyleMap: (newStyleMap: StyleMap) => void;
  add: (styleKey: string, styleCache: StyleCache) => void;
  update: (styleKey: string, styleCache: StyleCache) => void;
  remove: (styleKey: string, styleCache: StyleCache) => void;
  size: number;
  css: string;
}

export interface Cache {
  ids: Set<string>;
  style: StyleMapper;
};
