import { setUserAgent } from './test/util/setUserAgent/setUserAgent';
import { windowResize } from './test/util/windowResize/windowResize';

if (typeof window !== 'undefined') {
  window.setUserAgent = setUserAgent;
  window.resizeTo = windowResize;
}
