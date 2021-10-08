export function fireWindowEvent(eventName) {
  if (typeof window !== 'undefined') {
    const event = document.createEvent('Event');
    if (event.initEvent) {
      event.initEvent(eventName, true, true);
    }
    window.dispatchEvent(event);
  }
}
