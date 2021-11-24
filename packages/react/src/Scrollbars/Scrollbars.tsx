import { useRef, useCallback, useState } from 'react';
import { StyleIt } from '../StyleIt';
import SimpleBar from 'simplebar-react';
import { ScrollbarsProps } from './types';
import styles from './styles';

export function Scrollbars({ children, ...rest }: ScrollbarsProps) {
	const parentElement = useRef<null | HTMLElement>(null);
	const [scrollbarsHeight, setScrollbarsHeight] = useState(0);

	function calcHeight(): void {
		const { height } = parentElement.current!.getBoundingClientRect();
		if (height !== scrollbarsHeight) {
			setScrollbarsHeight(height);
		}
	}

	const ro = useRef(new ResizeObserver(() => {
		calcHeight();
	}));

	const scrollbarsRef = useCallback((node: HTMLDivElement) => {
    if (node) {
			parentElement.current = node.parentElement as HTMLElement;
			ro.current.observe(parentElement.current);
      calcHeight();
    }
  }, []);

	return (
		<StyleIt styles={styles} ref={scrollbarsRef} style={{ height: scrollbarsHeight }}>
			<SimpleBar style={{ height: scrollbarsHeight }} {...rest}>
				{children}
			</SimpleBar>
		</StyleIt>
	);
}
