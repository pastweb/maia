import { fireWindowEvent as _fireWindowEvent } from './fireWindowEvent';

export function fireWindowEvent(eventName: string) : void {
  _fireWindowEvent(eventName);
}
