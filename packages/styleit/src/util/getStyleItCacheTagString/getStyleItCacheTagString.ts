import {
  MINIRESET,
  SCRIPT_TAG_NAME,
  STYLE_TAG_NAME,
  GLOBAL_IDS_CACHE_NAME,
  GLOBAL_STYLE_CACHE_NAME
} from '../constants';
import { Cache } from '../getCache';

export function getStyleItCacheTagString(cache: Cache): string {
  if (!cache.style) return '';

  return `
  <script id="${SCRIPT_TAG_NAME}" type="text/javascript">
    window["${GLOBAL_IDS_CACHE_NAME}"] = ${JSON.stringify(Array.from(cache.ids))}
    window["${GLOBAL_STYLE_CACHE_NAME}"] = ${JSON.stringify(cache.style.getStyleMap())}
  </script>
  <style id="${STYLE_TAG_NAME}">
    ${MINIRESET}${cache.style.css}
  </style>
`;
}
