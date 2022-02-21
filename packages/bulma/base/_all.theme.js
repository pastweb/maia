const { createTheme } = require('../../styleit');
const initialVariables = require('../utilities/initial-variables');
const derivedVariables = require('../utilities/derived-variables');

const theme = ({ bulma: b }) => ({
  bulma : {
    bodyBackgroundColor: b.schemeMain,
    bodySize: '16px',
    bodyMinWidth: '300px',
    bodyRendering: 'optimizeLegibility',
    bodyFamily: b.familyPrimary,
    bodyOverflowX: 'hidden',
    bodyOverflowY: 'scroll',

    bodyColor: b.text,
    bodyFontSize: '1em',
    bodyWeight: b.weightNormal,
    bodyLineHeight: 1.5,

    codeFamily: b.familyCode,
    codePadding: '0.25em 0.5em 0.25em',
    codeWeight: 'normal',
    codeSize: '0.875em',

    smallFontSize: '0.875em',

    hrBackgroundColor: b.background,
    hrHeight: '2px',
    hrMargin: '1.5rem 0',

    strongColor: b.textStrong,
    strongWeight: b.weightBold,

    preFontSize: '0.875em',
    prePadding: '1.25rem 1.5rem',
    preCodeFontSize: '1em',
  },
});

module.exports = createTheme([
  initialVariables,
  derivedVariables,
  theme,
]);
