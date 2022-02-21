export type Theme = {
  [prop: string]: string | number | Theme | ((theme: Theme) => string | number | Theme);
}

export type ThemeFunction = (theme: Theme) => Theme;
