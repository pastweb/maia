import { EventCallback } from '@maia/tools';

export interface UpdateEntryProps {
  on: (event: string, eventCallback: EventCallback) => void;
  children: React.ReactElement;
  [propName: string]: any;
}
