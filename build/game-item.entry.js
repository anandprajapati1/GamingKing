import { r as registerInstance, c as createEvent, h } from './core-4323e4e0.js';
import { U as UUID, r as rewardData, s as setUserData, e as enumModuleState, a as getProductJson, g as getUserData } from './utils-b91b8543.js';

const GameItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // Popped counting per level
        this.score = 0;
        this.currentLevelNo = 0;
        this.containerHeight = 600;
        this.isPaused = false;
        this.isGameOver = false;
        this.life = 5;
        this.showLuckyPopup = false;
        this.currentLevelBubbleCounter = 0;
        /**Game levels */
        this.levels = [
            {
                speed: 3,
                count: 25,
                value: 10,
                color: "#41C4FF",
                isLevelPassed: false
            },
            {
                speed: 4,
                count: 30,
                value: 15,
                color: "#FFD500",
                isLevelPassed: false
            },
            {
                speed: 4.5,
                count: 40,
                value: 20,
                color: "#3DD94A",
                isLevelPassed: false
            },
            {
                speed: 5,
                count: 50,
                value: 30,
                color: "#F262D3",
                isLevelPassed: false
            },
            {
                speed: 5,
                count: 50,
                value: 50,
                color: "#9574EA",
                isLevelPassed: false
            }
        ];
        this.btnClicked = createEvent(this, "btnClicked", 7);
        this.exitingGame = createEvent(this, "exitingGame", 7);
    }
    /** To trigger game start from popup module while switching to game screen */
    async startGame() {
        this.resetLevel();
        this.currentLevel = this.levels[this.currentLevelNo];
        this.startLevel();
    }
    bubbleDisappearedHandler(e) {
        this.currentLevelBubbleCounter++;
        this.life -= e.detail ? 1 : 0;
        if (this.life > 0) {
            if (this.currentLevelBubbleCounter >= this.currentLevel.count) {
                if (this.currentLevelNo + 1 < this.levels.length) {
                    this.levelUp();
                }
                else {
                    //Game over
                    this.saveScore();
                }
            }
        }
        else {
            //Game over
            this.saveScore();
        }
    }
    onBubbleBurst(e) {
        this.score += e.detail.val;
        this.popedAudioTag.play();
        this.checkLuckyProduct(e.detail.productData);
    }
    checkLuckyProduct(_product) {
        if (_product) {
            this.showLuckyPopup = true;
            setTimeout(() => { this.showLuckyPopup = false; }, 2500);
            // Save lucky coupon
            this._userSavedData.couponList.push({ code: UUID(), reward: new rewardData(0, _product) });
            setUserData(this._userSavedData);
        }
    }
    onNavigatedHandler(e) {
        switch (e.detail) {
            case enumModuleState.GAME.toString():
                this.startGame();
                e.stopImmediatePropagation();
                break;
            case enumModuleState.INTRO.toString():
                this.exitGame();
                break;
            default:
                this.exitGame();
                break;
        }
    }
    resetLevel() {
        this.life = 5;
        this.score = 0;
        this.currentLevelNo = 0;
        this.currentLevelBubbleCounter = 0;
        this.isPaused = false;
        this.isGameOver = false;
    }
    // Product get through JSON
    componentDidLoad() {
        getProductJson(this.levels.length).then((d) => {
            this._luckyProductList = d;
        });
    }
    /** To initialize alevel data.
     * Will be called on start of each level */
    startLevel() {
        //Level start animation
        this._luckyProductData = this._luckyProductList[this.currentLevelNo];
        this.gameElement.innerHTML = "";
        this.levelAnim.classList.add("show");
        setTimeout(() => {
            this.levelAnim.classList.remove("show");
            var j = 0;
            var luckyBubble = Math.floor(Math.random() * this.currentLevel.count) - 1;
            this.bubbleGenIntId = setInterval(() => {
                if (!this.isPaused) {
                    let _item = document.createElement("bubble-item");
                    _item.setAttribute("val", this.currentLevel.value.toString());
                    _item.setAttribute("speed", this.currentLevel.speed.toString());
                    _item.setAttribute("height-limit", this.containerHeight.toString());
                    _item.setAttribute("color", this.currentLevel.color.toString());
                    this.gameElement.appendChild(_item);
                    if (j == luckyBubble) {
                        _item.setAttribute("lucky-product-data", JSON.stringify(this._luckyProductData));
                    }
                    j++;
                }
                if (j >= this.currentLevel.count) {
                    clearInterval(this.bubbleGenIntId);
                }
            }, 3000 / this.currentLevel.speed);
        }, 1000);
    }
    levelUp() {
        this.currentLevelBubbleCounter = 0;
        this.levels[this.currentLevelNo].isLevelPassed = true;
        this.currentLevelNo++;
        this.currentLevel = this.levels[this.currentLevelNo];
        this.startLevel();
    }
    /**Pause game */
    pauseGame() {
        this.btnClicked.emit();
        this.isPaused = !this.isPaused;
        let i = 0;
        while (i < this.gameElement.children.length) {
            this.gameElement.children[i].togglePause(this.isPaused);
            i++;
        }
    }
    /**To exit and clear garbage html */
    exitGame() {
        this.gameElement.innerHTML = "";
        this.exitingGame.emit();
        this.btnClicked.emit();
        clearInterval(this.bubbleGenIntId);
    }
    // Game over
    saveScore() {
        this.isGameOver = true;
        this.gameElement.innerHTML = "";
        clearInterval(this.bubbleGenIntId);
        // Save score in local storage
        this._userSavedData.points += this.score;
        setUserData(this._userSavedData);
    }
    componentWillLoad() {
        this._userSavedData = getUserData();
    }
    render() {
        return [
            h("div", { class: (this.isGameOver ? "hide" : "") + " score" }, h("audio", { src: "https://anandprajapati1.github.io/shipDeploy/assets/media/poped.mp3", ref: (el) => this.popedAudioTag = el, class: "hide" }), h("span", { class: "life life-" + this.life }, h("span", null), h("span", null), h("span", null), h("span", null), h("span", null)), h("span", { class: "score-label" }, "POINTS"), h("span", { class: "score-text" }, this.score), h("div", { class: (this.showLuckyPopup ? "show" : "") + " product-win " }, "You got one free product")),
            h("button", { class: (this.isPaused || this.isGameOver ? "hide" : "") + " pause-btn", onClick: this.pauseGame.bind(this) }, "Pause"),
            h("div", { class: (this.isPaused ? "paused" : "") + " game-item " + (this.isGameOver ? "game-over" : "game-playing"), ref: (el) => this.gameElement = el }),
            (() => {
                if (this.isPaused) {
                    return h("div", { class: "pause-overlay" }, h("div", { class: this.isPaused ? "" : "hide" }, h("ul", { class: "cta-item" }, h("li", { class: "replay" }, h("button", { class: "resume-btn", onClick: this.pauseGame.bind(this) })), h("li", { class: "home" }, h("button", { class: "home-btn", onClick: this.exitGame.bind(this) })))));
                }
                else if (this.isGameOver)
                    return h("score-board", { score: this.score });
            })(),
            h("span", { class: "level-start-anim", ref: (el) => this.levelAnim = el }, this.currentLevelNo + 1)
        ];
    }
    static get style() { return ".hide {\n  display: none !important;\n}\n\n:host {\n  display: block;\n}\n\n.game-item.game-playing:before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  display: block;\n  background: rgba(255, 255, 255, 0.9);\n  padding: 10px;\n  border-radius: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  box-shadow: inset 0px 0px 35px 15px #5f1f64;\n  -webkit-box-shadow: inset 0px 0px 5px 3px #5f1f64;\n  z-index: -1;\n}\n\n.product-win {\n  position: absolute;\n  left: 0;\n  top: -80px;\n  -webkit-transition: all 0.5s;\n  transition: all 0.5s;\n  background: #5f1f64 url(https://anandprajapati1.github.io/shipDeploy/assets/img/firework.gif) repeat-x center;\n  width: 100%;\n  height: 40px;\n  border-radius: 10px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -ms-flex-align: center;\n  align-items: center;\n  color: white;\n  text-transform: uppercase;\n  z-index: 90;\n  overflow: hidden;\n}\n.product-win:before {\n  background: black;\n  content: \"\";\n  width: 100%;\n  height: 27px;\n  display: block;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  z-index: -1;\n}\n.product-win.show {\n  top: 0;\n}\n\n.score {\n  position: relative;\n  width: calc(100% - 20px);\n  height: auto;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-pack: center;\n  justify-content: center;\n  z-index: 5;\n  margin: 10px;\n}\n.score .score-label,\n.score .score-text {\n  color: white;\n  font-family: \'cargoD\', Trebuchet MS, Arial,sans-serif;\n  font-size: 20px;\n  padding: 0 5px;\n  color: #5f1f64;\n}\n\@media (min-width: 992px) {\n  .score .score-label,\n.score .score-text {\n    font-size: 20px;\n  }\n}\n.score .score-label {\n  margin: 0 0px 0 10px;\n}\n\n.life {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100px;\n  -ms-flex: 0 0 100px;\n  flex: 0 0 100px;\n}\n.life > span {\n  display: inline-block;\n  width: 20%;\n  height: 20px;\n  border-radius: 50%;\n  border: 1px solid #d2264e;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.life > span:before {\n  content: \"\";\n  background: #d2264e;\n  display: block;\n  width: 0;\n  height: 20px;\n  -webkit-transition: width 0.3s ease;\n  transition: width 0.3s ease;\n}\n.life.life-1 > span:nth-child(1):before {\n  width: 100%;\n}\n.life.life-2 > span:nth-child(1):before {\n  width: 100%;\n}\n.life.life-2 > span:nth-child(2):before {\n  width: 100%;\n}\n.life.life-3 > span:nth-child(1):before {\n  width: 100%;\n}\n.life.life-3 > span:nth-child(2):before {\n  width: 100%;\n}\n.life.life-3 > span:nth-child(3):before {\n  width: 100%;\n}\n.life.life-4 > span:nth-child(1):before {\n  width: 100%;\n}\n.life.life-4 > span:nth-child(2):before {\n  width: 100%;\n}\n.life.life-4 > span:nth-child(3):before {\n  width: 100%;\n}\n.life.life-4 > span:nth-child(4):before {\n  width: 100%;\n}\n.life.life-5 > span:nth-child(1):before {\n  width: 100%;\n}\n.life.life-5 > span:nth-child(2):before {\n  width: 100%;\n}\n.life.life-5 > span:nth-child(3):before {\n  width: 100%;\n}\n.life.life-5 > span:nth-child(4):before {\n  width: 100%;\n}\n.life.life-5 > span:nth-child(5):before {\n  width: 100%;\n}\n\n.pause-btn {\n  background: url(https://anandprajapati1.github.io/shipDeploy/assets/img/close.png);\n  background-size: contain;\n  cursor: pointer;\n  border: 0;\n  padding: 0;\n  z-index: 9999;\n  width: 25px;\n  height: 25px;\n  text-indent: 9999px;\n  position: absolute;\n  right: 10px;\n  top: 10px;\n}\n\@media (min-width: 768px) {\n  .pause-btn {\n    width: 30px;\n    height: 30px;\n  }\n}\n\@media (min-width: 992px) {\n  .pause-btn {\n    width: 40px;\n    height: 40px;\n  }\n}\n\n.level-start-anim {\n  visibility: hidden;\n  width: 100px;\n  height: 100px;\n  padding: 22px;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  border-radius: 50%;\n  background: #C5E86C;\n  -webkit-box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.5);\n  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.5);\n  font-size: 50px;\n  color: white;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  -webkit-transition: all 1s ease;\n  transition: all 1s ease;\n  opacity: 0;\n}\n.level-start-anim.show {\n  visibility: visible;\n  -webkit-transform: translate(-50%, -50%) scale(1.5, 1.5);\n  transform: translate(-50%, -50%) scale(1.5, 1.5);\n  opacity: 1;\n}\n\n.pause-overlay {\n  padding: 0px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: -ms-flexbox;\n  display: flex;\n  text-align: center;\n  position: relative;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -ms-flex-align: center;\n  align-items: center;\n  z-index: 7;\n  width: 100%;\n  height: 100vh;\n  margin: -50px auto 0;\n  background: rgba(255, 255, 255, 0.8);\n}\n.pause-overlay:before {\n  content: \"\";\n  width: 80%;\n  height: 30vh;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  box-shadow: inset 0px 0px 35px 15px #3f016c;\n  -webkit-box-shadow: inset 0px 0px 35px 15px #3f016c;\n  background: rgba(63, 1, 108, 0.8);\n  position: absolute;\n  border-radius: 50px;\n}\n.pause-overlay ul.cta-item {\n  list-style: none;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n.pause-overlay ul.cta-item li {\n  position: relative;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -ms-flex-align: center;\n  align-items: center;\n  margin: 15px 10px 25px;\n}\n.pause-overlay ul.cta-item li button {\n  display: block;\n  height: 60px;\n  width: 60px;\n  font-size: 20px;\n  color: #5f1f64;\n  text-transform: uppercase;\n  border-radius: 50%;\n  background: white;\n  cursor: pointer;\n  border: none;\n}\n.pause-overlay ul.cta-item li button:hover {\n  -webkit-box-shadow: 0px 0px 14px 0px white;\n  box-shadow: 0px 0px 14px 0px white;\n}\n.pause-overlay ul.cta-item li button:before {\n  content: \"\";\n  width: 75%;\n  display: block;\n  position: relative;\n  margin: 0 auto;\n}\n.pause-overlay ul.cta-item li.home button:before {\n  content: url(\"https://anandprajapati1.github.io/shipDeploy/assets/svg/home.svg\");\n}\n.pause-overlay ul.cta-item li.replay button:before {\n  content: url(\"https://anandprajapati1.github.io/shipDeploy/assets/svg/replay.svg\");\n}"; }
};
class levelClass {
}

export { GameItem as game_item };
