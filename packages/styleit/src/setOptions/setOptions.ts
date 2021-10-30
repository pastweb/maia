import { StyleOptions, Style } from '../css';

export function setOptions(styleOptions: StyleOptions, css: Style): Style {
  return css.setOptions(styleOptions);
}
