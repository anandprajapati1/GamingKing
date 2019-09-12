import { r as registerInstance, c as createEvent, h } from './p-2e1b2e21.js';

const VaUtil = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * This property can be used by host element to make functionality disabled
         */
        this.isDisabled = false;
        /**
         * Component state: whether it is minimized by user or not
         */
        this.isCollapsed = false;
        this.openState = false;
        this.btnClicked = createEvent(this, "btnClicked", 7);
    }
    /**
     * Exposed method of component
     */
    async initMyComponent() {
    }
    toggleState() {
        this.isCollapsed = !this.isCollapsed;
        this.btnClicked.emit();
    }
    //Before rendering
    componentWillLoad() {
        var linkNode = document.createElement("link");
        linkNode.type = "text/css";
        linkNode.rel = "stylesheet";
        linkNode.href = "https://anandprajapati1.github.io/shipDeploy/assets/fonts/font.css";
        document.head.appendChild(linkNode);
    }
    // //After rendering
    // componentDidLoad() {
    // }
    // //Before updating
    // componentWillUpdate() {
    // }
    // //After updating
    // componentDidUpdate() {
    // }
    // //After unmounting
    // componentDidUnload() {
    // }
    popupOpenTrigger() {
        // call pop up show/hide function
        this.popupElement.openPopup();
        this.btnClicked.emit();
    }
    btnClickedPlay() {
        this.btnClickedTag.playbackRate = 6;
        this.btnClickedTag.play();
    }
    render() {
        return (h("div", { class: "va-util" + (this.isCollapsed ? " collapsed" : "") }, h("audio", { src: "https://anandprajapati1.github.io/shipDeploy/assets/media/btn-click.mp3", ref: (el) => this.btnClickedTag = el, class: "hide" }), h("popup-model", { ref: (el) => { this.popupElement = el; } }), h("div", { class: "content", onClick: this.popupOpenTrigger.bind(this) }, h("p", null, "PLAY GAME WIN COUPONS")), h("button", { class: "btn btn-minimize" + (!this.isCollapsed ? " active" : ""), onClick: this.toggleState.bind(this) }), h("button", { class: "btn btn-maximize" + (!this.isCollapsed ? "" : " active"), onClick: this.toggleState.bind(this) })));
    }
    static get style() { return ".hide{display:none!important}button{outline:none}.va-util{position:fixed;right:20px;bottom:15px;z-index:99999;background:url(https://anandprajapati1.github.io/shipDeploy/assets/img/game-joystic.png);width:100px;height:66px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;background-size:contain}\@media (min-width:768px){.va-util{width:200px;height:132px}}.va-util.collapsed{height:18px;bottom:0;background:#5f1f64;border-radius:3px;-ms-flex-pack:start;justify-content:flex-start;padding-left:15px;border-radius:20px 20px 0 0}.va-util.collapsed .content{display:none}.va-util.collapsed .btn-maximize{top:0;background:none;left:0;font-size:20px;width:100%}.va-util .content{height:100%;width:100%;padding:9px 15px 30px;-webkit-box-sizing:border-box;box-sizing:border-box;text-shadow:0 0 5px #333;text-align:center;cursor:pointer}\@media (min-width:768px){.va-util .content{padding:17px 30px 55px}}.va-util .content p{color:#fff;font-size:10px;line-height:1.4;font-family:cargoD,Trebuchet MS,Arial,sans-serif;margin:0;padding:0;text-align:center}\@media (min-width:768px){.va-util .content p{font-size:20px;line-height:1.4}}.va-util .btn{display:inline-block;-webkit-box-shadow:none;box-shadow:none;border:0;width:20px;height:20px;color:#fff;border-radius:50%;background:#5f1f64;margin-right:5px;position:absolute;top:-22px;right:0;display:none;cursor:pointer;font-size:0}\@media (min-width:768px){.va-util .btn{top:-20px}}.va-util .btn.active{display:inline-block}.va-util .btn-minimize:before{content:\"-\"}.va-util .btn-maximize:before,.va-util .btn-minimize:before{color:#fff;width:20px;height:20px;font-size:20px;line-height:11px}.va-util .btn-maximize:before{content:\"^\";position:absolute;top:8px;right:8px}:focus{outline:none}"; }
};

export { VaUtil as va_util };
