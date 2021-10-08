export class ScrollbarsHandler {
    constructor(elements: any, options: any);
    setOptions(options: any): void;
    init(): void;
    initListeners(): void;
    recalculate(): void;
    render(): void;
    resizeScrollbar(axis?: string): void;
    positionScrollbar(axis?: string): void;
    toggleTrackVisibility(axis?: string): void;
    hideNativeScrollbar(): void;
    onScrollX(): void;
    onScrollY(): void;
    scrollX(): void;
    scrollY(): void;
    onMouseEnter(): void;
    onMouseMove(e: any): void;
    showScrollbar(axis?: string): void;
    hideScrollbars(): void;
    onMouseDown(e: any): void;
    onDrag(e: any, axis?: string): void;
    drag(e: any): void;
    onEndDrag(): void;
    isWithinBounds(bbox: any): boolean;
    el: any;
    contentEl: any;
    scrollContentEl: any;
    trackX: any;
    scrollbarX: any;
    trackY: any;
    scrollbarY: any;
    flashTimeout: number | null;
    dragOffset: {
        x: number;
        y: number;
    };
    isEnabled: {
        x: boolean;
        y: boolean;
    };
    isVisible: {
        x: boolean;
        y: boolean;
    };
    scrollOffsetAttr: {
        x: string;
        y: string;
    };
    sizeAttr: {
        x: string;
        y: string;
    };
    scrollSizeAttr: {
        x: string;
        y: string;
    };
    offsetAttr: {
        x: string;
        y: string;
    };
    handleSize: {
        x: number;
        y: number;
    };
    currentAxis: string | null;
    scrollbarWidth: number | null;
    options: {
        options: any;
        autoHide: boolean;
        show: string;
        forceVisible: boolean;
        scrollbarMinSize: number;
        scrollbarMaxSize: number;
        direction: string;
        timeout: number;
        visibleClass: string;
    };
    isRtl: boolean;
    offsetSize: number;
    contentElWidth: any;
    contentElHeight: any;
    contentSizeX: any;
    contentSizeY: number | undefined;
    trackXSize: any;
    trackYSize: any;
    scrollXTicking: boolean | undefined;
    scrollYTicking: boolean | undefined;
    mouseX: any;
    mouseY: any;
}
