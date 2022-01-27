import { cssPropertyAlias, cssPropertyPrefixFlags, cssValuePrefixFlags } from 'style-vendorizer';
import { isSSR } from '@maia/tools';

const vendors = {
  '-webkit-': 0b001,
  '-moz-': 0b010,
  '-ms-': 0b100,
};

export function prefixer(property: string, value: string): string {
  let cssText = '';

  /* Resolve aliases, e.g. `gap` -> `grid-gap` */
  const propertyAlias = cssPropertyAlias(property);
  if (propertyAlias) cssText += `${propertyAlias}:${value};`;

  Object.entries(vendors).forEach(([vendor, flag]) => {
    let newLine = '';
    /* Prefix properties, e.g. `backdrop-filter` -> `-webkit-backdrop-filter` */
    const propertyFlags = cssPropertyPrefixFlags(property);
    
    if ((propertyFlags & flag) || isSSR) {
      newLine += `${vendor}${property}:`;
      /* Prefix values, e.g. `position: "sticky"` -> `position: "-webkit-sticky"` */
      /* Notice that flags don't overlap and property prefixing isn't needed here */
      const valueFlags = cssValuePrefixFlags(property, value);
      if ((valueFlags & flag) || isSSR) newLine += `${vendor}${value};`;
      else newLine += `${value};`;
    }

    if (newLine) {
      cssText += newLine;
    }
  });

  /* Include the standardized declaration last */
  /* https://css-tricks.com/ordering-css3-properties/ */
  cssText += `${property}:${value};`;

  return cssText;
}
