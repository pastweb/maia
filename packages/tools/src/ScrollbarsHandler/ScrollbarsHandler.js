// inspirated to https://github.com/Grsmto/simplebar

function calcScrollbarWidth() {
  if (!document) return 0;
  const body = document.body;
  const box = document.createElement('div');
  const boxStyle = box.style;

  boxStyle.position = 'absolute';
  boxStyle.top = boxStyle.left = '-9999px';
  boxStyle.width = boxStyle.height = '100px';
  boxStyle.overflow = 'scroll';

  body.appendChild(box);
  const width = box.offsetWidth - box.clientWidth;
  body.removeChild(box);
  return width;
};

const DEFAULT_OPTIONS = {
  autoHide: true,
  show: 'both',
  forceVisible: false,
  scrollbarMinSize: 25,
  scrollbarMaxSize: 0,
  direction: 'ltr',
  timeout: 1000,
  visibleClass: 'visible'
};

export class ScrollbarsHandler {
  constructor (elements, options) {
    this.setOptions = this.setOptions.bind(this);
    this.init = this.init.bind(this);
    this.initListeners = this.initListeners.bind(this);
    this.recalculate = this.recalculate.bind(this);
    this.render = this.render.bind(this);
    this.resizeScrollbar = this.resizeScrollbar.bind(this);
    this.positionScrollbar = this.positionScrollbar.bind(this);
    this.toggleTrackVisibility = this.toggleTrackVisibility.bind(this);
    this.hideNativeScrollbar = this.hideNativeScrollbar.bind(this);
    this.onScrollX = this.onScrollX.bind(this);
    this.onScrollY = this.onScrollY.bind(this);
    this.scrollX = this.scrollX.bind(this);
    this.scrollY = this.scrollY.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.showScrollbar = this.showScrollbar.bind(this);
    this.hideScrollbars = this.hideScrollbars.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.drag = this.drag.bind(this);
    this.onEndDrag = this.onEndDrag.bind(this);
    this.isWithinBounds = this.isWithinBounds.bind(this);

    const {
      scrollbars,
      scrollContent,
      content,
      trackY,
      scrollbarY,
      trackX,
      scrollbarX
    } = elements;

    this.el = scrollbars;
    this.contentEl = content;
    this.scrollContentEl = scrollContent;
    this.trackX = trackX;
    this.scrollbarX = scrollbarX;
    this.trackY = trackY;
    this.scrollbarY = scrollbarY;

    this.flashTimeout = null;
    this.dragOffset = { x: 0, y: 0 };
    this.isEnabled = { x: true, y: true };
    this.isVisible = { x: false, y: false };
    this.scrollOffsetAttr = { x: 'scrollLeft', y: 'scrollTop' };
    this.sizeAttr = { x: 'offsetWidth', y: 'offsetHeight' };
    this.scrollSizeAttr = { x: 'scrollWidth', y: 'scrollHeight' };
    this.offsetAttr = { x: 'left', y: 'top' };
    this.handleSize = { x: 0, y: 0 };

    this.currentAxis = null;
    this.scrollbarWidth = null;
    this.options = { ...DEFAULT_OPTIONS, options };
    this.isRtl = this.options.direction === 'rtl';
    this.offsetSize = 20;

    this.contentElWidth = null;
    this.contentElHeight = null;

    this.init();
  }

  setOptions (options) {
    this.options = Object.assign(this.options, options);
    this.recalculate();
  }

  init () {
    // We stop here on server-side
    if (window) {
      // Calculate content size
      this.hideNativeScrollbar();
      this.render();
      this.recalculate();
      this.initListeners();
    }
  }

  initListeners () {
    // Event listeners
    if (this.options.autoHide) {
      this.el.addEventListener('mouseenter', this.onMouseEnter);
    }

    this.el.addEventListener('mousedown', this.onMouseDown);
    this.el.addEventListener('mousemove', this.onMouseMove);

    this.contentEl.addEventListener('scroll', this.onScrollX);
    this.scrollContentEl.addEventListener('scroll', this.onScrollY);

    // Browser zoom triggers a window resize
    // window.addEventListener('resize', this.onWindowResize);
  }

  /**
     * Recalculate scrollbar
     */
  recalculate () { this.render(); }

  render () {
    this.contentSizeX = this.contentEl[this.scrollSizeAttr.x];
    this.contentSizeY = this.contentEl[this.scrollSizeAttr.y] - (this.scrollbarWidth || this.offsetSize);
    this.trackXSize = this.trackX[this.sizeAttr.x];
    this.trackYSize = this.trackY[this.sizeAttr.y];

    // Set isEnabled to false if scrollbar is not necessary (content is shorter than wrapper)
    this.isEnabled.x = this.trackXSize < this.contentSizeX;
    this.isEnabled.y = this.trackYSize < this.contentSizeY;

    this.resizeScrollbar('x');
    this.resizeScrollbar('y');

    this.positionScrollbar('x');
    this.positionScrollbar('y');

    this.toggleTrackVisibility('x');
    this.toggleTrackVisibility('y');
  }

  /**
     * Resize scrollbar
     */
  resizeScrollbar (axis = 'y') {
    let scrollbar;
    let contentSize;
    let trackSize;

    if (!this.isEnabled[axis] && !this.options.forceVisible) return;

    if (axis === 'x') {
      scrollbar = this.scrollbarX;
      contentSize = this.contentSizeX;
      trackSize = this.trackXSize;
    } else {
      // 'y'
      scrollbar = this.scrollbarY;
      contentSize = this.contentSizeY;
      trackSize = this.trackYSize;
    }

    const scrollbarRatio = trackSize / contentSize;

    // Calculate new height/position of drag handle.
    this.handleSize[axis] = Math.max(
      (scrollbarRatio * trackSize),
      this.options.scrollbarMinSize
    );

    if (this.options.scrollbarMaxSize) {
      this.handleSize[axis] = Math.min(
        this.handleSize[axis],
        this.options.scrollbarMaxSize
      );
    }

    if (axis === 'x') {
      scrollbar.style.width = `${this.handleSize[axis]}px`;
    } else {
      scrollbar.style.height = `${this.handleSize[axis]}px`;
    }
  }

  positionScrollbar (axis = 'y') {
    let scrollbar;
    let scrollOffset;
    let contentSize;
    let trackSize;

    if (axis === 'x') {
      scrollbar = this.scrollbarX;
      scrollOffset = this.contentEl[this.scrollOffsetAttr[axis]]; // Either scrollTop() or scrollLeft().
      contentSize = this.contentSizeX;
      trackSize = this.trackXSize;
    } else {
      // 'y'
      scrollbar = this.scrollbarY;
      scrollOffset = this.scrollContentEl[this.scrollOffsetAttr[axis]]; // Either scrollTop() or scrollLeft().
      contentSize = this.contentSizeY;
      trackSize = this.trackYSize;
    }

    const scrollPourcent = scrollOffset / (contentSize - trackSize);
    const handleOffset = ((trackSize - this.handleSize[axis]) * scrollPourcent);

    if (this.isEnabled[axis] || this.options.forceVisible) {
      if (axis === 'x') {
        scrollbar.style.transform = `translate3d(${handleOffset}px, 0, 0)`;
      } else {
        scrollbar.style.transform = `translate3d(0, ${handleOffset}px, 0)`;
      }
    }
  }

  toggleTrackVisibility (axis = 'y') {
    const track = axis === 'y' ? this.trackY : this.trackX;
    const scrollbar = axis === 'y' ? this.scrollbarY : this.scrollbarX;

    if (this.isEnabled[axis] || this.options.forceVisible) {
      track.style.visibility = 'visible';
    } else {
      track.style.visibility = 'hidden';
    }

    // Even if forceVisible is enabled, scrollbar itself should be hidden
    if (this.options.forceVisible) {
      if (this.isEnabled[axis]) {
        scrollbar.style.visibility = 'visible';
      } else {
        scrollbar.style.visibility = 'hidden';
      }
    }
  }

  hideNativeScrollbar () {
    // Recalculate scrollbarWidth in case it's a zoom
    this.scrollbarWidth = calcScrollbarWidth();

    this.scrollContentEl.style[this.isRtl ? 'paddingLeft' : 'paddingRight'] = `${this.scrollbarWidth || this.offsetSize}px`;
    this.scrollContentEl.style.marginBottom = `-${this.scrollbarWidth * 2 || this.offsetSize}px`;
    // this.contentEl.style.paddingBottom = `${this.scrollbarWidth || this.offsetSize}px`

    if (this.scrollbarWidth !== 0) {
      this.contentEl.style[this.isRtl ? 'marginLeft' : 'marginRight'] = `-${this.scrollbarWidth}px`;
    }
  }

  /**
     * On scroll event handling
     */
  onScrollX () {
    if (!this.scrollXTicking) {
      window.requestAnimationFrame(this.scrollX);
      this.scrollXTicking = true;
    }
  }

  onScrollY () {
    if (!this.scrollYTicking) {
      window.requestAnimationFrame(this.scrollY);
      this.scrollYTicking = true;
    }
  }

  scrollX () {
    this.showScrollbar('x');
    this.positionScrollbar('x');
    this.scrollXTicking = false;
  }

  scrollY () {
    this.showScrollbar('y');
    this.positionScrollbar('y');
    this.scrollYTicking = false;
  }

  onMouseEnter () {
    this.showScrollbar('x');
    this.showScrollbar('y');
  }

  onMouseMove (e) {
    if (
      (this.contentEl.clientWidth !== this.contentElWidth) ||
        (this.contentEl.clientHeight !== this.contentElHeight)
    ) { this.recalculate(); }
    const bboxY = this.trackY.getBoundingClientRect();
    const bboxX = this.trackX.getBoundingClientRect();

    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    if (this.isWithinBounds(bboxY)) {
      this.showScrollbar('y');
    }

    if (this.isWithinBounds(bboxX)) {
      this.showScrollbar('x');
    }
  }

  /**
     * Show scrollbar
     */
  showScrollbar (axis = 'y') {
    let scrollbar;
    const { show } = this.options;
    // Scrollbar already visible
    if (this.isVisible[axis]) return;

    if (show && (show !== 'none')) {
      if ((axis === 'x') && ((show === 'both') || (show === 'x'))) scrollbar = this.scrollbarX;
      else if ((axis === 'y') && ((show === 'both') || (show === 'y'))) scrollbar = this.scrollbarY;
    }

    if (this.isEnabled[axis] && scrollbar) {
      scrollbar.classList.add(this.options.visibleClass);
      this.isVisible[axis] = true;
    }

    if (!this.options.autoHide) return;

    window.clearInterval(this.flashTimeout);
    this.flashTimeout = window.setInterval(this.hideScrollbars, this.options.timeout);
  }

  /**
     * Hide Scrollbar
     */
  hideScrollbars () {
    const bboxY = this.trackY.getBoundingClientRect();
    const bboxX = this.trackX.getBoundingClientRect();

    if (!this.isWithinBounds(bboxY)) {
      this.scrollbarY.classList.remove(this.options.visibleClass);
      this.isVisible.y = false;
    }

    if (!this.isWithinBounds(bboxX)) {
      this.scrollbarX.classList.remove(this.options.visibleClass);
      this.isVisible.x = false;
    }
  }

  onMouseDown (e) {
    const bboxY = this.scrollbarY.getBoundingClientRect();
    const bboxX = this.scrollbarX.getBoundingClientRect();

    if (this.isWithinBounds(bboxY)) {
      e.preventDefault();
      this.onDrag(e, 'y');
    }

    if (this.isWithinBounds(bboxX)) {
      e.preventDefault();
      this.onDrag(e, 'x');
    }
  }

  /**
     * on scrollbar handle drag
     */
  onDrag (e, axis = 'y') {
    // Preventing the event's default action stops text being
    // selectable during the drag.
    e.preventDefault();

    const scrollbar = axis === 'y' ? this.scrollbarY : this.scrollbarX;

    // Measure how far the user's mouse is from the top of the scrollbar drag handle.
    const eventOffset = axis === 'y' ? e.pageY : e.pageX;

    this.dragOffset[axis] =
        eventOffset - scrollbar.getBoundingClientRect()[this.offsetAttr[axis]];
    this.currentAxis = axis;

    this.el.addEventListener('mousemove', this.drag);
    this.el.addEventListener('mouseup', this.onEndDrag);
  }

  /**
     * Drag scrollbar handle
     */
  drag (e) {
    let eventOffset, track, scrollEl;

    e.preventDefault();

    if (this.currentAxis === 'y') {
      eventOffset = e.pageY;
      track = this.trackY;
      scrollEl = this.scrollContentEl;
    } else {
      eventOffset = e.pageX;
      track = this.trackX;
      scrollEl = this.contentEl;
    }

    // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
    const dragPos =
        eventOffset -
        track.getBoundingClientRect()[this.offsetAttr[this.currentAxis]] -
        this.dragOffset[this.currentAxis];

    // Convert the mouse position into a percentage of the scrollbar height/width.
    const dragPerc = dragPos / track[this.sizeAttr[this.currentAxis]];

    // Scroll the content by the same percentage.
    const scrollPos = dragPerc * this.contentEl[this.scrollSizeAttr[this.currentAxis]];

    scrollEl[this.scrollOffsetAttr[this.currentAxis]] = scrollPos;
  }

  /**
     * End scroll handle drag
     */
  onEndDrag () {
    this.el.removeEventListener('mousemove', this.drag);
    this.el.removeEventListener('mouseup', this.onEndDrag);
  }

  /**
     * Check if mouse is within bounds
     */
  isWithinBounds (bbox) {
    return this.mouseX >= bbox.left && this.mouseX <= bbox.left + bbox.width && this.mouseY >= bbox.top && this.mouseY <= bbox.top + bbox.height;
  }
}
