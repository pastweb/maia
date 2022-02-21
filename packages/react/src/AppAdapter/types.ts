import { AppExtension } from '@maia/tools';

export interface AppAdapterProps {
  app: AppExtension;
  [propName: string]: any;
};