import { r as registerInstance, c as createEvent, h } from './p-2e1b2e21.js';
import { e as enumModuleState, g as getUserData } from './p-8e4bc9a7.js';

const PopupModel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isOpened = false;
        this.currentPopup = enumModuleState.INTRO;
        this.isPopupModelQuit = false;
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
        this.isPopupModelQuit = false;
        this.isOpened = false;
        this.btnClicked.emit();
        this.backgroundAudioTag.pause();
    }
    // Open popup
    async openPopup() {
        this.isOpened = true;
        this.currentPopup = enumModuleState.INTRO;
        // Background audio
        this.backgroundAudioTag.volume = 0.02;
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
    popupModelQuit() {
        if (this.isPopupModelQuit) {
            this.isPopupModelQuit = false;
        }
        else {
            this.isPopupModelQuit = true;
        }
    }
    render() {
        return (h("div", { class: (this.isOpened ? "open" : "") + " popup-model" }, h("audio", { src: "https://anandprajapati1.github.io/shipDeploy/assets/media/bg-music.mp3", ref: (el) => this.backgroundAudioTag = el, class: "hide" }), h("div", { class: "popup-model-container", style: { 'max-height': this._containerHeight + "px" } }, h("button", { class: (this.currentPopup == enumModuleState.INTRO || this.currentPopup == enumModuleState.REDEEM ? "" : "hide") + " popup-model-close", onClick: this.popupModelQuit.bind(this) }), h("div", { class: (this.isPopupModelQuit ? "" : "hide") + " popup-model-quit " }, h("div", { class: "white-circle" }, h("span", { class: "popup-model-quit-heading" }, " Are you sure you want to Exit?"), h("button", { class: "popup-model-quit-btn yes", onClick: this.closePopup.bind(this) }, "Yes"), h("button", { class: "popup-model-quit-btn no", onClick: this.popupModelQuit.bind(this) }, "No"))), h("div", { class: "popup-model-content" }, h("div", { class: (this.currentPopup == enumModuleState.INTRO ? "" : "hide") + " intro-panel" }, h("div", { class: "white-circle" }, h("h1", null, "Welcome to game zone!"), h("h2", null, "You can play game and get coupons everyday"), h("button", { class: "skip-intro-btn", onClick: this.skipIntro.bind(this) }, "Play Game"), h("div", { class: "points" }, h("span", { class: "points-label" }, "Points : "), h("span", { class: "points-text" }, this.totalPoints)), h("button", { class: "redeem-btn", onClick: this.openRedemption.bind(this) }, "Redeem Now")), h("div", { class: "disclaimer-note" }, h("p", null, "The winning points are being saved in your machine local storage, so please be conscious before remove the system cache."))), h("div", { class: (this.currentPopup == enumModuleState.GAME ? "" : "hide") + " first-screen" }, h("game-item", { ref: el => this._gameItem = el, "container-height": this._containerHeight })), h("div", { class: (this.currentPopup == enumModuleState.REDEEM ? "" : "hide") + " redeem-screen" }, h("redeem-panel", { ref: (el) => this._redeemPanel = el }))))));
    }
    static get style() { return ".hide{display:none!important}button{outline:none}.popup-model{font-family:cargoD,Trebuchet MS,Arial,sans-serif;color:#fff;display:none;position:fixed;left:0;top:0;background:rgba(0,0,0,.5);width:100%;height:100%;z-index:9999}.popup-model.open{display:block}.popup-model-close{background:url(https://anandprajapati1.github.io/shipDeploy/assets/img/close.png);background-size:contain;cursor:pointer;border:0;padding:0;z-index:9999;width:25px;height:25px;text-indent:9999px;position:absolute;right:10px;top:10px}\@media (min-width:768px){.popup-model-close{width:30px;height:30px}}\@media (min-width:992px){.popup-model-close{width:40px;height:40px}}.popup-model-container{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;width:calc(100vw - 30px);height:calc(100vh - 30px);overflow:hidden;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);position:absolute;left:50%;top:50%;border-radius:10px;max-width:500px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:10px;background:url(https://anandprajapati1.github.io/shipDeploy/assets/img/gameBg.png) no-repeat;background-color:#eaa041;background-size:125%;background-position:50%}\@media (min-width:768px){.popup-model-container{background-size:cover;background-position:50%;max-width:600px}}\@media (min-width:992px){.popup-model-container{background-size:cover;background-position:50%;max-width:750px}}.popup-model-container .intro-panel{border:0 solid #97d700}.popup-model-container .intro-panel .white-circle{border:0 solid #fff;height:auto;padding:25px 20px 10px;box-shadow:inset 0 0 35px 15px #fff;-webkit-box-shadow:inset 0 0 35px 15px #fff;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:50px;background:rgba(63,1,108,.8);position:absolute;top:calc(50% - 35px);left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:90%;max-width:350px}\@media (min-width:768px){.popup-model-container .intro-panel .white-circle{padding:30px 30px 10px;max-width:400px}}\@media (min-width:992px){.popup-model-container .intro-panel .white-circle{max-width:600px;padding:40px 50px 20px;top:calc(50% - 55px)}}.popup-model-container .intro-panel .disclaimer-note{position:fixed;bottom:0;top:auto;left:10px;right:10px;height:50px}\@media (min-width:768px){.popup-model-container .intro-panel .disclaimer-note{left:20px;right:20px;height:50px}}\@media (min-width:992px){.popup-model-container .intro-panel .disclaimer-note{left:30px;right:30px;height:30px}}.popup-model-container .intro-panel .disclaimer-note p{font:normal 11px arial}.popup-model-content{text-align:center;position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex:1 0;flex:1 0;overflow:hidden}.popup-model-content>div{-ms-flex:1 0 100%;flex:1 0 100%;width:100%}.popup-model h1{font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-weight:400;font-size:20px;line-height:1;margin:0 0 10px;padding:0;text-transform:uppercase}\@media (min-width:768px){.popup-model h1{font-size:27px}}\@media (min-width:992px){.popup-model h1{font-size:40px}}\@media (min-width:768px){.popup-model h1{margin:0 0 10px}}\@media (min-width:992px){.popup-model h1{margin:0 0 15px}}.popup-model h2{font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-weight:400;font-size:14px;line-height:1;text-transform:uppercase;margin:0 0 5px;padding:0;padding:0 35px}\@media (min-width:768px){.popup-model h2{font-size:20px}}\@media (min-width:992px){.popup-model h2{font-size:20px}}\@media (min-width:768px){.popup-model h2{margin:0 0 5px;padding:0 35px}}\@media (min-width:992px){.popup-model h2{margin:0 0 10px;padding:0 35px}}.popup-model .skip-intro-btn{background:url(https://anandprajapati1.github.io/shipDeploy/assets/img/gamePlay.png) transparent no-repeat;background-size:contain;cursor:pointer;color:#fff;font-size:14px;width:67px;height:46px;padding:0;border:0;text-indent:-2000px;margin:10px 0}\@media (min-width:768px){.popup-model .skip-intro-btn{width:100px;height:70px;margin:10px 0 10px}}\@media (min-width:992px){.popup-model .skip-intro-btn{width:134px;height:92px;margin:10px 0 30px}}.popup-model .points{margin-bottom:10px}.popup-model .points span{font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-weight:400;font-size:14px;line-height:1;text-transform:uppercase}\@media (min-width:768px){.popup-model .points span{font-size:20px}}\@media (min-width:992px){.popup-model .points span{font-size:20px}}.popup-model .redeem-btn{background:#d2264e;border-radius:10px;border-style:solid;border-width:3px;border-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;cursor:pointer;text-transform:none;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:14px;line-height:1;padding:5px 10px;text-transform:uppercase}\@media (min-width:992px){.popup-model .redeem-btn{font-size:27px}}.popup-model .popup-model-quit{position:absolute;left:0;top:0;z-index:99999;background:rgba(0,0,0,.9);width:100%;height:100vh;max-height:575px;display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;-ms-flex-align:center;align-items:center;text-align:center;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap}.popup-model .popup-model-quit-heading{margin-bottom:20px;line-height:1.2;font-size:20px;text-transform:uppercase;display:block}\@media (min-width:992px){.popup-model .popup-model-quit-heading{font-size:30px}}.popup-model .popup-model-quit .white-circle{border:0 solid #fff;height:auto;padding:60px 20px;box-shadow:inset 0 0 35px 15px #fff;-webkit-box-shadow:inset 0 0 35px 15px #fff;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:50px;background:rgba(63,1,108,.8);position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:90%;max-width:350px}\@media (min-width:768px){.popup-model .popup-model-quit .white-circle{padding:30px 30px;max-width:400px}}\@media (min-width:992px){.popup-model .popup-model-quit .white-circle{max-width:600px;padding:40px 50px}}.popup-model .popup-model-quit .white-circle .popup-model-quit-btn{background:#d2264e;border-radius:10px;border-style:solid;border-width:3px;border-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;cursor:pointer;text-transform:none;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:14px;line-height:1;padding:5px 10px;min-width:100px;margin:5px}\@media (min-width:992px){.popup-model .popup-model-quit .white-circle .popup-model-quit-btn{font-size:27px}}.popup-model .popup-model-quit .white-circle .popup-model-quit-btn.no{background:#3fae48}.popup-model .redeem-screen{width:100%;overflow:scroll;margin:0 auto;padding:7px 0}.popup-model .redeem-screen::-webkit-scrollbar{width:.6em}.popup-model .redeem-screen::-webkit-scrollbar-track{box-shadow:inset 0 0 6px #d4264b;-webkit-box-shadow:inset 0 0 6px #d4264b}.popup-model .redeem-screen::-webkit-scrollbar-thumb{background-color:#d4264b;outline:1px solid #d4264b}:focus{outline:none}"; }
};

export { PopupModel as popup_model };
