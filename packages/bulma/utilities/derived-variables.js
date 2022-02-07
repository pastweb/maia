const {
  findColorInvert,
  findLightColor,
  findDarkColor,
  darken,
} = require('./functions');

module.exports = ({ bulma: b }) => {
  return {
  bulma: {
    primary: b.turquoise,

    info: b.cyan,
    success: b.green,
    warning: b.yellow,
    danger: b.red,

    light: b.whiteTer,
    dark: b.greyDarker,

    // Invert colors

    orangeInvert: findColorInvert(b.orange),
    yellowInvert: findColorInvert(b.yellow),
    greenInvert: findColorInvert(b.green),
    turquoiseInvert: findColorInvert(b.turquoise),
    cyanInvert: findColorInvert(b.cyan),
    blueInvert: findColorInvert(b.blue),
    purpleInvert: findColorInvert(b.purple),
    redInvert: findColorInvert(b.red),

    primaryInvert: ({ bulma: b }) => findColorInvert(b.primary),
    primaryLight: ({ bulma: b }) => findLightColor(b.primary, b.background),
    primaryDark: ({ bulma: b }) => findDarkColor(b.primary, b.textStrong),
    infoInvert: ({ bulma: b }) => findColorInvert(b.info),
    infoLight: ({ bulma: b }) => findLightColor(b.info, b.background),
    infoDark: ({ bulma: b }) => findDarkColor(b.info, b.textStrong),
    successInvert: ({ bulma: b }) => findColorInvert(b.success),
    successLight: ({ bulma: b }) => findLightColor(b.success, b.background),
    successDark: ({ bulma: b }) => findDarkColor(b.success, b.textStrong),
    warningInvert: ({ bulma: b }) => findColorInvert(b.warning),
    warningLight: ({ bulma: b }) => findLightColor(b.warning, b.background),
    warningDark: ({ bulma: b }) => findDarkColor(b.warning, b.textStrong),
    dangerInvert: ({ bulma: b }) => findColorInvert(b.danger),
    dangerLight: ({ bulma: b }) => findLightColor(b.danger, b.background),
    dangerDark: ({ bulma: b }) => findDarkColor(b.danger, b.textStrong),
    lightInvert: ({ bulma: b }) => findColorInvert(b.light),
    darkInvert: ({ bulma: b }) => findColorInvert(b.dark),

    // General colors

    schemeMain: b.white,
    schemeMainBis: b.whiteBis,
    schemeMainTer: b.whiteTer,
    schemeInvert: b.black,
    schemeInvertBis: b.blackBis,
    schemeInvertTer: b.blackTer,

    background: b.whiteTer,

    border: b.greyLighter,
    borderHover: b.greyLight,
    borderLight: b.greyLightest,
    borderLightHover: b.greyLight,

    // Text colors

    text: b.greyDark,
    textInvert: ({ bulma: b }) => findColorInvert(b.text),
    textLight: b.grey,
    textStrong: b.greyDarker,

    // Code colors
    code: darken(b.red, 15),
    codeBackground: b.background,

    pre: b.text,
    preBackground: b.background,

    // Link colors

    link: b.blue,
    linkInvert: ({ bulma: b }) => findColorInvert(b.link),
    linkLight: ({ bulma: b }) => findLightColor(b.link, b.background),
    linkDark: ({ bulma: b }) => findDarkColor(b.link, b.textStrong),
    linkVisited: b.purple,

    linkHover: b.greyDarker,
    linkHoverBorder: b.greyLight,

    linkFocus: b.greyDarker,
    linkFocusBorder: b.blue,

    linkActive: b.greyDarker,
    linkActiveBorder: b.greyDark,

    // Typography

    familyPrimary: b.familySansSerif,
    familySecondary: b.familySansSerif,
    familyCode: b.familyMonospace,

    sizeSmall: b.size7,
    sizeNormal: b.size6,
    sizeMedium: b.size5,
    sizeLarge: b.size4,

    // Lists and maps
    customColors: null,
    customShades: null,
  },
}};
