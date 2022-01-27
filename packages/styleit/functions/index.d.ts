import { ColorMap, HEX, RGB, RGBA, HSL, HSV } from './types';

export declare function convertColor(color: string, format: string, rgbaBackground?: string): string;

export declare function invertColor(color: string, format?: string): string;

export declare const colorsMap: ColorMap;

export declare function getColorObject(color: string): HEX | RGB | RGBA | HSL | HSV;

export declare function getColorType(color: string): string;

export declare function hexToRgb(color: string, alpha?: number): RGB | RGBA;

export declare function hslToRgb(color: string): RGB;

export declare function hsvToRgb(color: string): RGB;

export declare function rgbaToRgb(color: string, bgColor: string): RGB;

export declare function rgbToHex(color: string): HEX;

export declare function rgbToHsl(color: string): HSL;

export declare function rgbToHsv(color: string): HSV;

export declare function rgbToRgba(color: string): RGBA;
