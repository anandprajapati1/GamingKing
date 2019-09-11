import { r as registerInstance, c as createEvent, h } from './core-4323e4e0.js';

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
    static get style() { return ".hide {\n  display: none !important;\n}\n\n.va-util {\n  position: fixed;\n  right: 20px;\n  bottom: 15px;\n  z-index: 99999;\n  background: url(https://anandprajapati1.github.io/shipDeploy/assets/img/game-joystic.png);\n  width: 100px;\n  height: 66px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -ms-flex-align: center;\n  align-items: center;\n  background-size: contain;\n}\n\@media (min-width: 768px) {\n  .va-util {\n    width: 200px;\n    height: 132px;\n  }\n}\n.va-util.collapsed {\n  height: 18px;\n  bottom: 0px;\n  background: #5f1f64;\n  border-radius: 3px;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  padding-left: 15px;\n  border-radius: 20px 20px 0 0;\n}\n.va-util.collapsed .content {\n  display: none;\n}\n.va-util.collapsed .btn-maximize {\n  top: 0px;\n  background: none;\n  left: 0px;\n  font-size: 20px;\n  width: 100%;\n}\n.va-util .content {\n  height: 100%;\n  width: 100%;\n  padding: 9px 15px 30px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  text-shadow: 0 0 5px #333;\n  text-align: center;\n  cursor: pointer;\n}\n\@media (min-width: 768px) {\n  .va-util .content {\n    padding: 17px 30px 55px;\n  }\n}\n.va-util .content p {\n  color: white;\n  font-size: 10px;\n  line-height: 1.4;\n  font-family: \'cargoD\', Trebuchet MS, Arial,sans-serif;\n  margin: 0;\n  padding: 0;\n  text-align: center;\n}\n\@media (min-width: 768px) {\n  .va-util .content p {\n    font-size: 20px;\n    line-height: 1.4;\n  }\n}\n.va-util .btn {\n  display: inline-block;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  border: 0;\n  width: 20px;\n  height: 20px;\n  color: white;\n  border-radius: 50%;\n  background: #5f1f64;\n  margin-right: 5px;\n  position: absolute;\n  top: -22px;\n  right: 0;\n  display: none;\n  cursor: pointer;\n  font-size: 0px;\n}\n\@media (min-width: 768px) {\n  .va-util .btn {\n    top: -20px;\n  }\n}\n.va-util .btn.active {\n  display: inline-block;\n}\n.va-util .btn-minimize:before {\n  content: \"-\";\n  color: white;\n  width: 20px;\n  height: 20px;\n  font-size: 20px;\n  line-height: 11px;\n}\n.va-util .btn-maximize:before {\n  content: \"^\";\n  color: white;\n  width: 20px;\n  height: 20px;\n  font-size: 20px;\n  line-height: 11px;\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}\n\n:focus {\n  outline: none;\n}"; }
};

export { VaUtil as va_util };
