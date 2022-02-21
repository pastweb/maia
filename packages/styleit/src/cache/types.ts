import { StyleInfo } from '../..';

export type StyleCache = {
  counter: number;
  css: string;
};

export type StyleMap = {
  [styleKey: string]: StyleCache;
};

export interface StyleMapper {
  has: (styleKey: string) => boolean,
  get: (styleKey: string) => StyleCache,
  getStyleMap: () => StyleMap;
  setStyleMap: (newStyleMap: StyleMap) => void;
  add: (styleInfo: StyleInfo) => boolean;
  replace: (removeInfo: StyleInfo, addInfo: StyleInfo) => boolean;
  remove: (styleInfo: StyleInfo) => boolean;
  size: number;
  css: string;
}

export interface Cache {
  [styleMap: symbol]: StyleMap;
  frameworks: { [name: string]: string };
  style: StyleMapper;
};
