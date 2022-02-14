const { bulmaRgba } = require('../../utilities/functions');

module.exports = ({ bulma: b }) => ({
  bulma: {
    buttonColor: b.textStrong,
    buttonBackgroundColor: b.schemeMain,
    buttonFamily: false,

    buttonBorderColor: b.border,
    buttonBorderWidth: b.controlBorderWidth,

    buttonPaddingVertical: `calc(0.5em - ${b.buttonBorderWidth})`,
    buttonPaddingHorizontal: '1em',

    buttonHoverColor: b.linkHover,
    buttonHoverBorderColor: b.linkHoverBorder,

    buttonFocusColor: b.linkFocus,
    buttonFocusBorderColor: b.linkFocusBorder,
    buttonFocusBoxShadowSize: '0 0 0 0.125em',
    buttonFocusBoxShadowColor: bulmaRgba(b.link, 0.25),

    buttonActiveColor: b.linkActive,
    buttonActiveBorderColor: b.linkActiveBorder,

    buttonTextColor: b.text,
    buttonTextDecoration: 'underline',
    buttonTextHoverBackgroundColor: b.background,
    buttonTextHoverColor: b.textStrong,

    buttonGhostBackground: 'none',
    buttonGhostBorderColor: 'transparent',
    buttonGhostColor: b.link,
    buttonGhostDecoration: 'none',
    buttonGhostHoverColor: b.link,
    buttonGhostHoverDecoration: 'underline',

    buttonDisabledBackgroundColor: b.schemeMain,
    buttonDisabledBorderColor: b.border,
    buttonDisabledShadow: 'none',
    buttonDisabledOpacity: 0.5,

    buttonStaticColor: b.textLight,
    buttonStaticBackgroundColor: b.schemeMainTer,
    buttonStaticBorderColor: b.border,

    buttonColors: b.colors,
  },
});
