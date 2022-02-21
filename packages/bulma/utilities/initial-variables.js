module.exports = {
  bulma: {
    // Colors
    black:        'hsl(0, 0%, 4%)',
    blackBis:     'hsl(0, 0%, 7%)',
    blackTer:     'hsl(0, 0%, 14%)',

    greyDarker:   'hsl(0, 0%, 21%)',
    greyDark:     'hsl(0, 0%, 29%)',
    grey:         'hsl(0, 0%, 48%)',
    greyLight:    'hsl(0, 0%, 71%)',
    greyLighter:  'hsl(0, 0%, 86%)',
    greyLightest: 'hsl(0, 0%, 93%)',

    whiteTer:     'hsl(0, 0%, 96%)',
    whiteBis:     'hsl(0, 0%, 98%)',
    white:        'hsl(0, 0%, 100%)',

    orange:       'hsl(14,  100%, 53%)',
    yellow:       'hsl(44,  100%, 77%)',
    green:        'hsl(153, 53%,  53%)',
    turquoise:    'hsl(171, 100%, 41%)',
    cyan:         'hsl(207, 61%,  53%)',
    blue:         'hsl(229, 53%,  53%)',
    purple:       'hsl(271, 100%, 71%)',
    red:          'hsl(348, 86%, 61%)',

    // Typography

    familySansSerif: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
    familyMonospace: 'monospace',
    renderMode: 'optimizeLegibility',

    size1: '3rem',
    size2: '2.5rem',
    size3: '2rem',
    size4: '1.5rem',
    size5: '1.25rem',
    size6: '1rem',
    size7: '0.75rem',

    weightLight: 300,
    weightNormal: 400,
    weightMedium: 500,
    weightSemibold: 600,
    weightBold: 700,

    // Spacing

    blockSpacing: '1.5rem',

    // Responsiveness

    // The container horizontal gap, which acts as the offset for breakpoints
    gap: 32,
    // 960, 1152, and 1344 have been chosen because they are divisible by both 12 and 16
    tablet: '769px',
    // 960px container + 4rem
    desktop: ({ bulma: b }) => `${960 + (2 * b.gap)}px`,
    // 1152px container + 4rem
    widescreen: ({ bulma: b }) => `${1152 + (2 * b.gap)}px`,
    widescreenEnabled: true,
    // 1344px container + 4rem
    fullhd: ({ bulma: b }) => `${1344 + (2 * b.gap)}px`,
    fullhdEnabled: true,

    // Miscellaneous

    easing: 'ease-out',
    radiusSmall: '2px',
    radius: '4px',
    radiusLarge: '6px',
    radiusRounded: '9999px',
    speed: '86ms',

    // Flags

    variableColumns: true,
    rtl: false,
  },
};
