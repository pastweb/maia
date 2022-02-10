import {
  MINIRESET,
  SCRIPT_TAG_NAME,
  STYLE_TAG_NAME,
  GLOBAL_STYLE_CACHE_NAME,
} from '../../constants';
import { cache } from '../../cache';

export function getStyleItCacheTagString(): string {
  if (!cache.style) return '';

  const globalCahe = JSON.stringify({
    frameworks: cache.frameworks,
    styleMap: cache.style.getStyleMap(),
  });

  return `
  <script id="${SCRIPT_TAG_NAME}" type="text/javascript">
    window["${GLOBAL_STYLE_CACHE_NAME}"] = ${globalCahe}
  </script>
  <style id="${STYLE_TAG_NAME}">
    ${MINIRESET}${cache.style.css}
  </style>
`;
}
