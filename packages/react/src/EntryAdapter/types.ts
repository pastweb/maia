import { EntryExtension } from '@maia/tools';

export interface EntryAdapterProps {
  entry: EntryExtension;
  [propName: string]: any;
};