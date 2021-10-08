import { setUserAgent as _setUserAgent } from './setUserAgent';

export function setUserAgent (newUserAgent?: string): void {
  _setUserAgent(newUserAgent);
}