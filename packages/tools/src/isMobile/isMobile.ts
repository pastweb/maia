import { isSSR } from '../isSSR';
import { IisMobile } from './types';

export const uaRegex = /iP(hone|ad|od)|blackberry|Android|(W|w)indows (P|p)hone/g;

function checkWithMediaQuery(mql: MediaQueryListEvent | MediaQueryList): boolean {
  const { matches } = mql;
  return uaRegex.test(window.navigator.userAgent) || matches ? true : false;
}

export function isMobile(params: IisMobile = {}): boolean {
  const { isMobile, mediaQueryString, onMediaQueryChange } = params;
  if (typeof isMobile !== 'undefined') return isMobile;
  if (isSSR) return false;

  if (!mediaQueryString) {
    return uaRegex.test(window.navigator.userAgent);
  }

  function _onMediaQueryChange(event: MediaQueryListEvent): void {
    const isMobile = checkWithMediaQuery(event);

    if (onMediaQueryChange) {
      onMediaQueryChange({...event, isMobile });
    }
  }

  const mql: MediaQueryList = window.matchMedia(mediaQueryString);

  if (onMediaQueryChange) {
    mql.addEventListener('change', _onMediaQueryChange);
  }

  return checkWithMediaQuery(mql);
}
