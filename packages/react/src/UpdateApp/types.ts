import { EventCallback } from '@maia/tools';

export interface UpdateAppProps {
  on: (event: string, eventCallback: EventCallback) => void;
  children: React.ReactElement;
  [propName: string]: any;
}
