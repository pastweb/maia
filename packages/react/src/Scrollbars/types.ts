import { ReactNode, MutableRefObject, HTMLAttributes } from 'react';
import SimpleBarJS from 'simplebar';

interface ChildrenProps {
  scrollableNodeRef: MutableRefObject<HTMLElement>;
  contentNodeRef: MutableRefObject<HTMLElement>;
}

export interface ScrollbarsProps extends SimpleBarJS.Options, HTMLAttributes<HTMLElement> {
  scrollableNodeProps?: object;
  children?: ReactNode | ((props: ChildrenProps) => ReactNode);
}
