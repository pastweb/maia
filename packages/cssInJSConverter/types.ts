export type ColorMap = {
  [color: string]: {
    hex: string;
    rgb: string;
  };
}

export type HEX = {
  type: 'hex';
  value: string;
}

export type RGB = {
  type: 'rgb';
  r: number;
  g: number;
  b: number;
  value: string;
}

export type RGBA = {
  type: 'rgba';
  r: number;
  g: number;
  b: number;
  a: number;
  value: string;
}

export type HSL = {
  type: 'hsl';
  h: number;
  s: number;
  l: number;
  value: string;
}

export type HSV = {
  type: 'hsv';
  h: number;
  s: number;
  v: number;
  value: string;
}
