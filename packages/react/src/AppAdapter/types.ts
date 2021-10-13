export const EXCLUDE_PROPS = [
  'tagName',
  'tagClass',
	'tagStyle',
	'app',
];


export interface AppAdapterProps {
  tagName?: string;
  tagClass?: string;
  tagStyle?: { [styleProp: string]: string | number };
  app: any;
};