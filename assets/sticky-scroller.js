//sticky scroller class base function collection page filter    
if (!customElements.get("sticky-scroller")) {
    class StickyScroller extends HTMLElement {
        constructor() {
            super(), 
            (this.headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--theme-sticky-header-height"), 10)), 
            (this.parent = this.parentElement);
        }
        connectedCallback() {
            (this.newScrollPosition = 0),
            (this.oldScrollPositon = 0),
            (this.ticking = !1),
            (this.element = this.querySelector(".filters__inner.sticky-content-container")), 
            (this.element.style.overflowY = "hidden"),
            (this.observer = new ResizeObserver(this.onWindowScroll.bind(this))),
            this.observer.observe(this.parent),
            window.addEventListener("scroll", this.onWindowScroll.bind(this), { passive: !0 });
        }
        onWindowScroll() {
            (this.newScrollPosition = window.scrollY),
            this.ticking ||
            (window.requestAnimationFrame(() => {
                this.translate(), (this.ticking = !1), (this.oldScrollPositon = this.newScrollPosition);
            }),
            (this.ticking = !0));
        }
        translate() {
            const parentRect = this.parentElement.getBoundingClientRect(),
            distance = this.newScrollPosition - this.oldScrollPositon;
            (parentRect.top > this.headerHeight && distance > 0) || (parentRect.bottom < window.innerHeight && distance < 0) || (this.element.scrollTop += distance);
        }
    }
    customElements.define("sticky-scroller", StickyScroller);
}