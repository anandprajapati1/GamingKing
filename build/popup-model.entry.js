import { r as registerInstance, c as createEvent, h } from './core-4323e4e0.js';
import { e as enumModuleState, g as getUserData } from './utils-b91b8543.js';

const PopupModel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isOpened = false;
        this.currentPopup = enumModuleState.INTRO;
        this.totalPoints = 0;
        this._containerHeight = 575;
        this.btnClicked = createEvent(this, "btnClicked", 7);
    }
    // Skip Intro
    skipIntro() {
        this.currentPopup = enumModuleState.GAME;
        this._gameItem.startGame();
        this.btnClicked.emit();
    }
    openRedemption() {
        this.currentPopup = enumModuleState.REDEEM;
        this._redeemPanel.refreshScore();
        this.btnClicked.emit();
    }
    // Close popup
    closePopup() {
        this.isOpened = false;
        this.btnClicked.emit();
        this.backgroundAudioTag.pause();
    }
    // Open popup
    async openPopup() {
        this.isOpened = true;
        this.currentPopup = enumModuleState.INTRO;
        // Background audio
        this.backgroundAudioTag.volume = 0.05;
        this.backgroundAudioTag.play();
        this.backgroundAudioTag.loop = true;
    }
    onGameOver() {
        // Add new score to total Game score
        this._userData = getUserData();
        this.totalPoints = this._userData.points;
        this.currentPopup = enumModuleState.INTRO;
    }
    onNavigatedHandler(e) {
        switch (e.detail) {
            case enumModuleState.INTRO.toString():
                this.openPopup();
                break;
            default:
                this.openPopup();
                break;
        }
    }
    onCouponPurchased() {
        this._userData = getUserData();
        this.totalPoints = this._userData.points;
    }
    componentWillLoad() {
        this._userData = getUserData();
        this.totalPoints = this._userData.points;
    }
    render() {
        return (h("div", { class: (this.isOpened ? "open" : "") + " popup-model" }, h("audio", { src: "https://anandprajapati1.github.io/shipDeploy/assets/media/bg-music.mp3", ref: (el) => this.backgroundAudioTag = el, class: "hide" }), h("div", { class: "popup-model-container", style: { 'max-height': this._containerHeight + "px" } }, h("button", { class: (this.currentPopup == enumModuleState.INTRO || this.currentPopup == enumModuleState.REDEEM ? "" : "hide") + " popup-model-close", onClick: this.closePopup.bind(this) }), h("div", { class: "popup-model-content" }, h("div", { class: (this.currentPopup == enumModuleState.INTRO ? "" : "hide") + " intro-panel" }, h("div", { class: "white-circle" }, h("h1", null, "Welcome to game zone!"), h("h2", null, "You can play game and get coupons everyday"), h("button", { class: "skip-intro-btn", onClick: this.skipIntro.bind(this) }, "Play Game"), h("div", { class: "points" }, h("span", { class: "points-label" }, "Points : "), h("span", { class: "points-text" }, this.totalPoints)), h("button", { class: "redeem-btn", onClick: this.openRedemption.bind(this) }, "Redeem Now")), h("div", { class: "disclaimer-note" }, h("p", null, "The winning points are being saved in your machine local storage, so please be conscious before remove the system cache."))), h("div", { class: (this.currentPopup == enumModuleState.GAME ? "" : "hide") + " first-screen" }, h("game-item", { ref: el => this._gameItem = el, "container-height": this._containerHeight })), h("div", { class: (this.currentPopup == enumModuleState.REDEEM ? "" : "hide") + " redeem-screen" }, h("redeem-panel", { ref: (el) => this._redeemPanel = el }))))));
    }
    static get style() { return ".hide {\n  display: none !important;\n}\n\n.popup-model {\n  font-family: \'cargoD\', Trebuchet MS, Arial,sans-serif;\n  color: white;\n  display: none;\n  position: fixed;\n  left: 0;\n  top: 0;\n  background: rgba(0, 0, 0, 0.5);\n  width: 100%;\n  height: 100%;\n  z-index: 9999;\n}\n.popup-model.open {\n  display: block;\n}\n.popup-model-close {\n  background: url(https://anandprajapati1.github.io/shipDeploy/assets/img/close.png);\n  background-size: contain;\n  cursor: pointer;\n  border: 0;\n  padding: 0;\n  z-index: 9999;\n  width: 25px;\n  height: 25px;\n  text-indent: 9999px;\n  position: absolute;\n  right: 10px;\n  top: 10px;\n}\n\@media (min-width: 768px) {\n  .popup-model-close {\n    width: 30px;\n    height: 30px;\n  }\n}\n\@media (min-width: 992px) {\n  .popup-model-close {\n    width: 40px;\n    height: 40px;\n  }\n}\n.popup-model-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: calc(100vw - 30px);\n  height: calc(100vh - 30px);\n  overflow: hidden;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  border-radius: 10px;\n  max-width: 500px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 10px;\n  background: url(https://anandprajapati1.github.io/shipDeploy/assets/img/gameBg.png) no-repeat;\n  background-color: #eaa041;\n  background-size: 125%;\n  background-position: center;\n}\n\@media (min-width: 768px) {\n  .popup-model-container {\n    background-size: cover;\n    background-position: center;\n    max-width: 600px;\n  }\n}\n\@media (min-width: 992px) {\n  .popup-model-container {\n    background-size: cover;\n    background-position: center;\n    max-width: 750px;\n  }\n}\n.popup-model-container .intro-panel {\n  border: 0px solid #97D700;\n}\n.popup-model-container .intro-panel .white-circle {\n  border: 0px solid white;\n  height: auto;\n  padding: 25px 20px 10px;\n  box-shadow: inset 0px 0px 35px 15px white;\n  -webkit-box-shadow: inset 0px 0px 35px 15px white;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  border-radius: 50px;\n  background: rgba(63, 1, 108, 0.8);\n  position: absolute;\n  top: calc(50% - 35px);\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  width: 90%;\n  max-width: 350px;\n}\n\@media (min-width: 768px) {\n  .popup-model-container .intro-panel .white-circle {\n    padding: 30px 30px 10px;\n    max-width: 400px;\n  }\n}\n\@media (min-width: 992px) {\n  .popup-model-container .intro-panel .white-circle {\n    max-width: 600px;\n    padding: 40px 50px 20px;\n    top: calc(50% - 55px);\n  }\n}\n.popup-model-container .intro-panel .disclaimer-note {\n  position: fixed;\n  bottom: 0;\n  top: auto;\n  left: 10px;\n  right: 10px;\n  height: 50px;\n}\n\@media (min-width: 768px) {\n  .popup-model-container .intro-panel .disclaimer-note {\n    left: 20px;\n    right: 20px;\n    height: 50px;\n  }\n}\n\@media (min-width: 992px) {\n  .popup-model-container .intro-panel .disclaimer-note {\n    left: 30px;\n    right: 30px;\n    height: 30px;\n  }\n}\n.popup-model-container .intro-panel .disclaimer-note p {\n  font: normal 11px arial;\n}\n.popup-model-content {\n  text-align: center;\n  position: relative;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex: 1 0;\n  flex: 1 0;\n  overflow: hidden;\n}\n.popup-model-content > div {\n  -ms-flex: 1 0 100%;\n  flex: 1 0 100%;\n  width: 100%;\n}\n.popup-model h1 {\n  font-family: \'cargoD\', Trebuchet MS, Arial,sans-serif;\n  font-weight: 400;\n  font-size: 20px;\n  line-height: 1;\n  margin: 0 0 10px;\n  padding: 0;\n  text-transform: uppercase;\n}\n\@media (min-width: 768px) {\n  .popup-model h1 {\n    font-size: 27px;\n  }\n}\n\@media (min-width: 992px) {\n  .popup-model h1 {\n    font-size: 40px;\n  }\n}\n\@media (min-width: 768px) {\n  .popup-model h1 {\n    margin: 0 0 10px;\n  }\n}\n\@media (min-width: 992px) {\n  .popup-model h1 {\n    margin: 0 0 15px;\n  }\n}\n.popup-model h2 {\n  font-family: \'cargoD\', Trebuchet MS, Arial,sans-serif;\n  font-weight: 400;\n  font-size: 14px;\n  line-height: 1;\n  text-transform: uppercase;\n  margin: 0 0 5px;\n  padding: 0;\n  padding: 0 35px;\n}\n\@media (min-width: 768px) {\n  .popup-model h2 {\n    font-size: 20px;\n  }\n}\n\@media (min-width: 992px) {\n  .popup-model h2 {\n    font-size: 20px;\n  }\n}\n\@media (min-width: 768px) {\n  .popup-model h2 {\n    margin: 0 0 5px;\n    padding: 0 35px;\n  }\n}\n\@media (min-width: 992px) {\n  .popup-model h2 {\n    margin: 0 0 10px;\n    padding: 0 35px;\n  }\n}\n.popup-model .skip-intro-btn {\n  background: url(https://anandprajapati1.github.io/shipDeploy/assets/img/gamePlay.png) transparent no-repeat;\n  background-size: contain;\n  cursor: pointer;\n  color: white;\n  font-size: 14px;\n  width: 67px;\n  height: 46px;\n  padding: 0;\n  border: 0;\n  text-indent: -2000px;\n  margin: 10px 0;\n}\n\@media (min-width: 768px) {\n  .popup-model .skip-intro-btn {\n    width: 100px;\n    height: 70px;\n    margin: 10px 0 10px;\n  }\n}\n\@media (min-width: 992px) {\n  .popup-model .skip-intro-btn {\n    width: 134px;\n    height: 92px;\n    margin: 10px 0 30px;\n  }\n}\n.popup-model .points {\n  margin-bottom: 10px;\n}\n.popup-model .points span {\n  font-family: \'cargoD\', Trebuchet MS, Arial,sans-serif;\n  font-weight: 400;\n  font-size: 14px;\n  line-height: 1;\n  text-transform: uppercase;\n}\n\@media (min-width: 768px) {\n  .popup-model .points span {\n    font-size: 20px;\n  }\n}\n\@media (min-width: 992px) {\n  .popup-model .points span {\n    font-size: 20px;\n  }\n}\n.popup-model .redeem-btn {\n  background: #d2264e;\n  border-radius: 10px;\n  border-style: solid;\n  border-width: 3px;\n  border-color: white;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  color: white;\n  cursor: pointer;\n  text-transform: none;\n  font-family: \'cargoD\', Trebuchet MS, Arial,sans-serif;\n  font-size: 14px;\n  line-height: 1;\n  padding: 5px 10px;\n  text-transform: uppercase;\n}\n\@media (min-width: 992px) {\n  .popup-model .redeem-btn {\n    font-size: 27px;\n  }\n}\n.popup-model .redeem-screen {\n  background: url(\"https://anandprajapati1.github.io/shipDeploy/assets/img/gameBg.png\") no-repeat;\n  background-size: 110%;\n  background-position: center;\n  width: 100%;\n  overflow: scroll;\n  margin: 0 auto;\n  padding: 7px 0;\n}\n.popup-model .redeem-screen::-webkit-scrollbar {\n  width: 0.6em;\n}\n.popup-model .redeem-screen::-webkit-scrollbar-track {\n  box-shadow: inset 0 0 6px #d4264b;\n  -webkit-box-shadow: inset 0 0 6px #d4264b;\n}\n.popup-model .redeem-screen::-webkit-scrollbar-thumb {\n  background-color: #d4264b;\n  outline: 1px solid #d4264b;\n}\n\n:focus {\n  outline: none;\n}"; }
};

export { PopupModel as popup_model };
