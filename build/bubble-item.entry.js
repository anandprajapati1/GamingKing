import { r as registerInstance, c as createEvent, h } from './core-4323e4e0.js';
import { b as randomIntFromInterval } from './utils-b91b8543.js';

const BubbleItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isPaused = false;
        this.size = 75;
        this._productData = null;
        this.speed = 3;
        this.val = 5;
        this.color = "#41C4FF";
        this.bubbleDisappeared = createEvent(this, "bubbleDisappeared", 7);
        this.bubbleBurst = createEvent(this, "bubbleBurst", 7);
    }
    async popBubble() {
        if (!this.bubbleEl.classList.contains("burst")) {
            this.bubbleEl.classList.add("burst");
            this.bubbleBurst.emit({ val: this.val, productData: this._productData });
        }
    }
    async togglePause(_isPaused) {
        this.isPaused = _isPaused;
        if (!this.isPaused)
            this.rise(this.yPos);
    }
    rise(pos = 0) {
        this.yPos = pos;
        this.rafId = requestAnimationFrame(move.bind(this));
        function move() {
            if (this.isPaused) {
                cancelAnimationFrame(this.rafId);
                return;
            }
            if (this.yPos >= this.heightLimit) {
                cancelAnimationFrame(this.rafId);
                this.bubbleEl.classList.add("hide");
                this.bubbleDisappeared.emit(this.bubbleEl.className.indexOf("burst") > -1 ? false : true);
            }
            else {
                this.yPos += this.speed;
                this.bubbleEl.style.bottom = this.yPos + 'px';
                this.rafId = requestAnimationFrame(move.bind(this));
            }
        }
    }
    async reset() {
        this.bubbleEl.style.bottom = 0 + 'px';
    }
    componentDidLoad() {
        this.bubbleEl.style.left = window.innerWidth < 767 ? randomIntFromInterval(1, 77) + '%' : randomIntFromInterval(1, 85) + '%';
        this.bubbleEl.style.width = this.size + 'px';
        this.bubbleEl.style.height = this.size + 'px';
        this.rise();
    }
    componentWillLoad() {
        this._productData = this.luckyProductData ? JSON.parse(this.luckyProductData) : null;
    }
    render() {
        return (h("span", { class: "bubble", ref: (el) => { this.bubbleEl = el; }, onClick: this.popBubble.bind(this) }, this._productData ? h("img", { src: this._productData.image, alt: "Product Image", class: "product-image" }) : "", h("span", { class: "bubble-box", style: { "background": this.color } }, h("span", { class: "bubble-point" }, this.val))));
    }
    static get style() { return ".hide {\n  display: none !important;\n}\n\n:host {\n  font-family: \'cargoD\', Trebuchet MS, Arial,sans-serif;\n}\n\n.bubble {\n  border-radius: 50%;\n  position: absolute;\n  bottom: 0;\n  left: calc(50% - 100px);\n  top: auto;\n  overflow: hidden;\n  cursor: pointer;\n}\n.bubble .bubble-box {\n  border-radius: 50%;\n  background: #2b28c4;\n  -webkit-transition: opacity 0.3s ease;\n  transition: opacity 0.3s ease;\n  opacity: 1;\n  cursor: pointer;\n  display: block;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: -1;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-shadow: inset -5px -5px 10px rgba(0, 0, 0, 0.3);\n  box-shadow: inset -5px -5px 10px rgba(0, 0, 0, 0.3);\n}\n.bubble-point {\n  color: white;\n  text-align: center;\n}\n.bubble .product-image {\n  visibility: hidden;\n  width: 0;\n  height: 0;\n  -ms-flex: 0 0 0px;\n  flex: 0 0 0;\n  overflow: hidden;\n  border-radius: 50%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  cursor: default;\n}\n.bubble.burst .bubble-box {\n  opacity: 0;\n}\n.bubble.burst .product-image {\n  visibility: visible;\n  width: 100%;\n  height: 100%;\n  -ms-flex: 0 0 100%;\n  flex: 0 0 100%;\n}"; }
};

export { BubbleItem as bubble_item };
