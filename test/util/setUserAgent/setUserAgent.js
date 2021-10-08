let storedUserAgent;

if (typeof window !== 'undefined') {
  storedUserAgent = window.navigator.userAgent;

  Object.defineProperty(window.navigator, "userAgent", ((value) => ({
    get() { return value; },
    set(v) { value = v; }
  }))(window.navigator['userAgent']));
}

export function setUserAgent (newUserAgent) {
  if (typeof window !== 'undefined') {
    window.navigator.userAgent = newUserAgent || storedUserAgent;
  }
};
