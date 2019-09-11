import { r as registerInstance, c as createEvent, h } from './core-4323e4e0.js';
import { e as enumModuleState } from './utils-b91b8543.js';

const NavItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // tooltip opened
        this.tooltipOpened = false;
        // replay-disabled
        this.replayDisabled = false;
        this.onNavigated = createEvent(this, "onNavigated", 7);
        this.btnClicked = createEvent(this, "btnClicked", 7);
    }
    // Go to home
    goHome() {
        this.onNavigated.emit(enumModuleState.INTRO.toString());
        this.btnClicked.emit();
    }
    // replay
    replay() {
        this.onNavigated.emit(enumModuleState.GAME.toString());
        this.btnClicked.emit();
    }
    // tooltip on share button
    share() {
        this.tooltipOpened = !this.tooltipOpened;
        this.btnClicked.emit();
    }
    render() {
        return (h("div", { class: "nav-item" }, h("ul", null, h("li", { class: "home" }, h("button", { onClick: this.goHome.bind(this) })), h("li", { class: (this.replayDisabled ? "hide" : "") + " replay" }, h("button", { onClick: this.replay.bind(this) })), h("li", { class: "share" }, h("button", { onClick: this.share.bind(this) }), h("div", { class: (this.tooltipOpened ? "open" : "") + "tooltip", onClick: () => this.btnClicked.emit() }, h("span", { class: "social-icon facebook", onClick: () => { window.open("https://www.facebook.com/sharer/sharer.php?title=I won redeemable points to purchase the amazing unilever products on great discount!!&u=" + encodeURIComponent(location.href), "width=320,height=320"); return false; } }, "Facebook"), h("br", null), h("span", { class: "social-icon twitter", onClick: () => { window.open('http://twitter.com/share?url=' + encodeURIComponent(location.href) + '&text=I won redeemable points to purchase the amazing unilever products on great discount!!', 'left=0,top=0,width=320,height=320,personalbar=0,toolbar=0,scrollbars=0,resizable=0'); return false; } }, "Twitter"))))));
    }
    static get style() { return ".hide {\n  display: none !important;\n}\n\n:host {\n  font-family: \'cargoD\', Trebuchet MS, Arial,sans-serif;\n}\n:host .tooltip {\n  display: none;\n}\n:host .tooltip .open {\n  display: block;\n}\n\n.nav-item ul {\n  list-style: none;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n.nav-item ul li {\n  position: relative;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -ms-flex-align: center;\n  align-items: center;\n  margin: 15px 10px 25px;\n}\n.nav-item ul li button {\n  display: block;\n  height: 60px;\n  width: 60px;\n  font-size: 20px;\n  color: #5f1f64;\n  text-transform: uppercase;\n  border-radius: 50%;\n  background: white;\n  cursor: pointer;\n  border: none;\n}\n.nav-item ul li button:hover {\n  -webkit-box-shadow: 0px 0px 14px 0px white;\n  box-shadow: 0px 0px 14px 0px white;\n}\n.nav-item ul li button:before {\n  content: \"\";\n  width: 75%;\n  display: block;\n  position: relative;\n  margin: 0 auto;\n}\n.nav-item ul li.home button:before {\n  content: url(\"https://anandprajapati1.github.io/shipDeploy/assets/svg/home.svg\");\n}\n.nav-item ul li.replay button:before {\n  content: url(\"https://anandprajapati1.github.io/shipDeploy/assets/svg/replay.svg\");\n}\n.nav-item ul li.share button:before {\n  content: url(\"https://anandprajapati1.github.io/shipDeploy/assets/svg/share.svg\");\n  margin-top: 7px;\n}"; }
};

export { NavItem as nav_item };
