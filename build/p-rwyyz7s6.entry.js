import { r as registerInstance, c as createEvent, h } from './p-2e1b2e21.js';
import { r as randomIntFromInterval } from './p-a8a7ac2d.js';

const BubbleItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isPaused = false;
        this.size = 75;
        /**
         * 1000/10*x
         */
        this.speed = 3;
        this.val = 5;
        this.color = "#41C4FF";
        this.bubbleDisappeared = createEvent(this, "bubbleDisappeared", 7);
        this.bubbleBurst = createEvent(this, "bubbleBurst", 7);
    }
    async popBubble() {
        if (!this.bubbleEl.classList.contains("burst")) {
            this.bubbleEl.classList.add("burst");
            this.bubbleBurst.emit(this.val);
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
                this.bubbleDisappeared.emit(!this.bubbleEl.className.indexOf("burst"));
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
    render() {
        return (h("span", { class: "bubble", ref: (el) => { this.bubbleEl = el; }, onClick: this.popBubble.bind(this), style: { "background": this.color } }, h("span", { class: "bubble-point" }, this.val)));
    }
    static get style() { return ".hide{display:none!important}:host{font-family:cargoD,Trebuchet MS,Arial,sans-serif}.bubble{border-radius:50%;position:absolute;background:#2b28c4;bottom:0;left:calc(50% - 100px);top:auto;-webkit-transition:opacity .3s ease;transition:opacity .3s ease;opacity:1;cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-box-shadow:inset -5px -5px 10px rgba(0,0,0,.3);box-shadow:inset -5px -5px 10px rgba(0,0,0,.3)}.bubble-point{color:#fff;text-align:center}.bubble.burst{opacity:0}"; }
};

export { BubbleItem as bubble_item };
