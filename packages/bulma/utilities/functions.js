const { colorFunction } = require('../../styleit/functions/sass');

// Custom divide function by @mdo from https://github.com/twbs/bootstrap/pull/34245
// Replaces old slash division deprecated in Dart Sass
const _divide = `
@function divide($dividend, $divisor, $precision: 10)
  $sign: if($dividend > 0 and $divisor > 0, 1, -1)
  $dividend: abs($dividend)
  $divisor: abs($divisor)
  $quotient: 0
  $remainder: $dividend
  @if $dividend == 0
    @return 0
  @if $divisor == 0
    @error "Cannot divide by 0"
  @if $divisor == 1
    @return $dividend
  @while $remainder >= $divisor
    $quotient: $quotient + 1
    $remainder: $remainder - $divisor
  @if $remainder > 0 and $precision > 0
    $remainder: divide($remainder * 10, $divisor, $precision - 1) * .1
  @return ($quotient + $remainder) * $sign
`;


const _powerNumber = `
${_divide}
@function powerNumber($number, $exp)
  $value: 1
  @if $exp > 0
    @for $i from 1 through $exp
      $value: $value * $number
  @else if $exp < 0
    @for $i from 1 through -$exp
      $value: divide($value, $number)
  @return $value
`;

const _colorLuminance = `
${_powerNumber}
@function colorLuminance($color)
  @if type-of($color) != 'color'
    @return 0.55
  $color-rgb: ('red': red($color),'green': green($color),'blue': blue($color))
  @each $name, $value in $color-rgb
    $adjusted: 0
    $value: divide($value, 255)
    @if $value < 0.03928
      $value: divide($value, 12.92)
    @else
      $value: divide(($value + .055), 1.055)
      $value: powerNumber($value, 2)
    $color-rgb: map-merge($color-rgb, ($name: $value))
  @return (map-get($color-rgb, 'red') * .2126) + (map-get($color-rgb, 'green') * .7152) + (map-get($color-rgb, 'blue') * .0722)
`;

const _findColorInvert = `
${_colorLuminance}
@function findColorInvert($color)
  @if (colorLuminance($color) > 0.55)
    @return rgba(#000, 0.7)
  @else
    @return #fff
`;

const _mergeColorMaps = `
${_findColorInvert}
@function mergeColorMaps($bulma-colors, $custom-colors)
  // We return at least Bulma's hard-coded colors
  $merged-colors: $bulma-colors

  // We want a map as input
  @if type-of($custom-colors) == 'map'
    @each $name, $components in $custom-colors
      // The color name should be a string
      // and the components either a single color
      // or a colors list with at least one element
      @if type-of($name) == 'string' and (type-of($components) == 'list' or type-of($components) == 'color') and length($components) >= 1
        $color-base: null
        $color-invert: null
        $color-light: null
        $color-dark: null
        $value: null

        // The param can either be a single color
        // or a list of 2 colors
        @if type-of($components) == 'color'
          $color-base: $components
          $color-invert: findColorInvert($color-base)
          $color-light: findLightColor($color-base)
          $color-dark: findDarkColor($color-base)
        @else if type-of($components) == 'list'
          $color-base: nth($components, 1)
          // If Invert, Light and Dark are provided
          @if length($components) > 3
            $color-invert: nth($components, 2)
            $color-light: nth($components, 3)
            $color-dark: nth($components, 4)
            // If only Invert and Light are provided
          @else if length($components) > 2
            $color-invert: nth($components, 2)
            $color-light: nth($components, 3)
            $color-dark: findDarkColor($color-base)
            // If only Invert is provided
          @else
            $color-invert: nth($components, 2)
            $color-light: findLightColor($color-base)
            $color-dark: findDarkColor($color-base)

        $value: ($color-base, $color-invert, $color-light, $color-dark)

        // We only want to merge the map if the color base is an actual color
        @if type-of($color-base) == 'color'
          // We merge this colors elements as map with Bulma's colors map
          // (we can override them this way, no multiple definition for the same name)
          // $merged-colors: map_merge($merged-colors, ($name: ($color-base, $color-invert, $color-light, $color-dark)))
          $merged-colors: map_merge($merged-colors, ($name: $value))

  @return $merged-colors
`;



const _findLightColor = `
@function findLightColor($color, $background)
  @if type-of($color) == 'color'
    $l: 96%
    @if lightness($color) > 96%
      $l: lightness($color)
    @return change-color($color, $lightness: $l)
  @return $background
`;

const _findDarkColor = `
${_colorLuminance}
@function findDarkColor($color, $text-strong)
  @if type-of($color) == 'color'
    $base-l: 29%
    $luminance: colorLuminance($color)
    $luminance-delta: (0.53 - $luminance)
    $target-l: round($base-l + ($luminance-delta * 53))
    @return change-color($color, $lightness: max($base-l, $target-l))
  @return $text-strong
`;

const _bulmaRgba = `
@function bulmaRgba($color, $alpha)
  @if type-of($color) != 'color'
    @return $color
  @return rgba($color, $alpha)
`;

const _bulmaDarken = `
@function bulmaDarken($color, $amount)
  @if type-of($color) != 'color'
    @return $color
  @return darken($color, $amount)
`;

const _bulmaLighten = `
@function bulmaLighten($color, $amount)
  @if type-of($color) != 'color'
    @return $color
  @return lighten($color, $amount)
`;

const sources = {
  _findColorInvert,
  _findLightColor,
  _findDarkColor,
  _bulmaRgba,
};

function getFunction(functionName, ...args) {
  const options = { args };
  if (sources[`_${functionName}`]) {
    options.source = sources[`_${functionName}`];
  }

  return colorFunction(functionName, options);
}

function findColorInvert(color) {
  return getFunction('findColorInvert', color);
}

function findLightColor(color, background) {
  return getFunction('findLightColor', color, background);
}

function findDarkColor(color, textStrong) {
  return getFunction('findDarkColor', color, textStrong);
}

function darken(color, percent) {
  return getFunction('darken', color, `${percent}%`);
}

function bulmaRgba(color, alpha) {
  return getFunction('bulmaRgba', color, alpha);
}

module.exports = {
  findColorInvert,
  findLightColor,
  findDarkColor,
  darken,
  bulmaRgba,
};
