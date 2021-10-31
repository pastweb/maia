import { StyleOptions, StyleObject } from '../css';

export function setOptions(styleOptions: StyleOptions, css: StyleObject): StyleObject {
  return css.setOptions(styleOptions);
}
