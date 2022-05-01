import { useRef, useCallback, useState } from 'react';
import { StyleIt } from '@maia/react-styleit';
import { useWillUnmount } from '@maia/react';
import SimpleBar from 'simplebar-react';
import { ScrollbarsProps } from './types';
import styles from './styles';

export function Scrollbars({ children, ...rest }: ScrollbarsProps) {
	const parentElement = useRef<null | HTMLElement>(null);
	const [size, setSize] = useState({});

	function calcHeight(): void {
		const element = parentElement.current as HTMLElement;
		const { width, height } = element.getBoundingClientRect();
		setSize({ width, height });
	}

	const ro = useRef<ResizeObserver | null>(null);

	const scrollbarsRef = useCallback((node: HTMLElement) => {
    if (node) {
			parentElement.current = node.parentElement as HTMLElement;
			ro.current = new ResizeObserver(() => {
				calcHeight();
			});
			ro.current.observe(parentElement.current);
      calcHeight();
    }
  }, []);

	useWillUnmount(() => {
		(ro.current as ResizeObserver).disconnect();
		ro.current = null;
		parentElement.current = null;
	});

	return (
		<StyleIt styles={styles} ref={scrollbarsRef} style={size} defer={true}>
			<SimpleBar style={size} {...rest}>
				{children}
			</SimpleBar>
		</StyleIt>
	);
}
