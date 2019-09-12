import { r as registerInstance, c as createEvent, h } from './p-2e1b2e21.js';

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function UUID() {
    return 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var dt = new Date().getTime();
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
var enumModuleState;
(function (enumModuleState) {
    enumModuleState[enumModuleState["INTRO"] = 0] = "INTRO";
    enumModuleState[enumModuleState["GAME"] = 1] = "GAME";
    enumModuleState[enumModuleState["RESULT"] = 2] = "RESULT";
    enumModuleState[enumModuleState["REDEEM"] = 3] = "REDEEM";
})(enumModuleState || (enumModuleState = {}));
function getUserData() {
    let _ud;
    _ud = JSON.parse(localStorage.getItem("user_data"));
    return _ud || new userData();
}
function setUserData(_ud) {
    localStorage.setItem("user_data", JSON.stringify(_ud));
}
class userData {
    constructor() {
        this.points = 0;
        this.couponList = [];
    }
}
class rewardData {
    constructor(coin, product = null) {
        this.coin = 0;
        this.product = null;
        this.coin = coin;
        this.product = product;
    }
    getReward() {
        return this.coin > 0 ? this.coin : this.product;
    }
}
// Product get through JSON
function getProductJson(limit = 0) {
    let productJson = [];
    // get json response
    var productJsonUrl = window.location.origin + window.location.pathname + "home.productfeed.json";
    if (window.location.hostname === "localhost" || window.location.hostname.indexOf("github.io") > 0) {
        productJsonUrl = window.location.origin + window.location.pathname + "assets/demo.json";
    }
    return fetch(productJsonUrl)
        .then((response) => response.json())
        .then(response => {
        limit = limit == 0 ? response.locales[0].products.product.length : limit;
        for (var i = 0; i < limit; i++) {
            productJson.push({
                name: response.locales[0].products.product[i].name,
                image: response.locales[0].products.product[i].imageUrl,
                url: response.locales[0].products.product[i].productPageUrl
            });
        }
        return productJson;
    });
}

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
    static get style() { return ".hide{display:none!important}button{outline:none}:host{font-family:cargoD,Trebuchet MS,Arial,sans-serif}.bubble{bottom:0;left:calc(50% - 100px);top:auto;overflow:hidden}.bubble,.bubble .bubble-box{border-radius:50%;position:absolute;cursor:pointer}.bubble .bubble-box{background:#2b28c4;-webkit-transition:opacity .3s ease;transition:opacity .3s ease;opacity:1;display:block;width:100%;height:100%;left:0;top:0;z-index:-1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-box-shadow:inset -5px -5px 10px rgba(0,0,0,.3);box-shadow:inset -5px -5px 10px rgba(0,0,0,.3)}.bubble-point{color:#fff;text-align:center}.bubble .product-image{visibility:hidden;width:0;height:0;-ms-flex:0 0 0px;flex:0 0 0;overflow:hidden;border-radius:50%;position:absolute;left:0;top:0;cursor:default}.bubble.burst .bubble-box{opacity:0}.bubble.burst .product-image{visibility:visible;width:100%;height:100%;-ms-flex:0 0 100%;flex:0 0 100%}"; }
};

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
            setTimeout(() => { this.showLuckyPopup = false; }, 5000);
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
    static get style() { return ".hide{display:none!important}button{outline:none}:host{display:block}.game-item.game-playing:before{content:\"\";top:0;height:100%;display:block;background:hsla(0,0%,100%,.9);padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box;box-shadow:inset 0 0 35px 15px #5f1f64;-webkit-box-shadow:inset 0 0 5px 3px #5f1f64;z-index:-1}.game-item.game-playing:before,.product-win{position:absolute;left:0;width:100%;border-radius:10px}.product-win{top:-80px;-webkit-transition:all .5s;transition:all .5s;background:#5f1f64 url(https://anandprajapati1.github.io/shipDeploy/assets/img/firework.gif) repeat-x 50%;height:40px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;color:#fff;text-transform:uppercase;z-index:90;overflow:hidden}.product-win:before{background:#000;content:\"\";width:100%;height:27px;display:block;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:-1}.product-win.show{top:0}.score{position:relative;width:calc(100% - 20px);height:auto;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:center;justify-content:center;z-index:5;margin:10px}.score .score-label,.score .score-text{color:#fff;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:20px;padding:0 5px;color:#5f1f64}\@media (min-width:992px){.score .score-label,.score .score-text{font-size:20px}}.score .score-label{margin:0 0 0 10px}.life{position:absolute;left:0;top:2px;width:100px;-ms-flex:0 0 100px;flex:0 0 100px}.life>span{display:inline-block;width:calc(20% - 5px);height:15px;margin-right:5px;border-radius:50%;border:1px solid #d2264e;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.life>span:before{content:\"\";background:#d2264e;display:block;width:0;height:20px;-webkit-transition:width .3s ease;transition:width .3s ease}.life.life-1>span:first-child:before,.life.life-2>span:first-child:before,.life.life-2>span:nth-child(2):before,.life.life-3>span:first-child:before,.life.life-3>span:nth-child(2):before,.life.life-3>span:nth-child(3):before,.life.life-4>span:first-child:before,.life.life-4>span:nth-child(2):before,.life.life-4>span:nth-child(3):before,.life.life-4>span:nth-child(4):before,.life.life-5>span:first-child:before,.life.life-5>span:nth-child(2):before,.life.life-5>span:nth-child(3):before,.life.life-5>span:nth-child(4):before,.life.life-5>span:nth-child(5):before{width:100%}.pause-btn{background:url(https://anandprajapati1.github.io/shipDeploy/assets/img/close.png);background-size:contain;cursor:pointer;border:0;padding:0;z-index:9999;width:25px;height:25px;text-indent:9999px;position:absolute;right:10px;top:10px}\@media (min-width:768px){.pause-btn{width:30px;height:30px}}\@media (min-width:992px){.pause-btn{width:40px;height:40px}}.level-start-anim{visibility:hidden;width:100px;height:100px;padding:22px;position:absolute;left:50%;top:50%;border-radius:50%;background:#c5e86c;-webkit-box-shadow:0 0 10px 0 rgba(0,0,0,.5);box-shadow:0 0 10px 0 rgba(0,0,0,.5);font-size:50px;color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transition:all 1s ease;transition:all 1s ease;opacity:0}.level-start-anim.show{visibility:visible;-webkit-transform:translate(-50%,-50%) scale(1.5);transform:translate(-50%,-50%) scale(1.5);opacity:1}.pause-overlay{padding:0;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;text-align:center;position:relative;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;z-index:7;width:100%;height:100vh;margin:-50px auto 0;background:hsla(0,0%,100%,.8);max-height:575px}.pause-overlay:before{content:\"\";width:80%;height:30vh;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);box-shadow:inset 0 0 35px 15px #3f016c;-webkit-box-shadow:inset 0 0 35px 15px #3f016c;background:rgba(63,1,108,.8);position:absolute;border-radius:50px}.pause-overlay ul.cta-item{list-style:none;width:100%;margin:0;padding:0;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}.pause-overlay ul.cta-item li{position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;margin:15px 10px 25px}.pause-overlay ul.cta-item li button{display:block;height:60px;width:60px;font-size:0;color:#5f1f64;text-transform:uppercase;border-radius:50%;background:#fff;cursor:pointer;border:none}.pause-overlay ul.cta-item li button:hover{-webkit-box-shadow:0 0 14px 0 #fff;box-shadow:0 0 14px 0 #fff}.pause-overlay ul.cta-item li button:before{content:\"\";width:75%;display:block;position:relative;margin:0 auto}.pause-overlay ul.cta-item li.home button:before{content:url(https://anandprajapati1.github.io/shipDeploy/assets/svg/home.svg)}.pause-overlay ul.cta-item li.replay button:before{content:url(https://anandprajapati1.github.io/shipDeploy/assets/svg/replay.svg)}"; }
};

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
        return (h("div", { class: "nav-item" }, h("ul", null, h("li", { class: "home" }, h("button", { onClick: this.goHome.bind(this) })), h("li", { class: (this.replayDisabled ? "hide" : "") + " replay" }, h("button", { onClick: this.replay.bind(this) })), h("li", { class: "share" }, h("button", { onClick: this.share.bind(this) }), h("div", { class: (this.tooltipOpened ? "open" : "") + " tooltip", onClick: () => this.btnClicked.emit() }, h("span", { class: "social-icon facebook", onClick: () => { window.open("https://www.facebook.com/sharer/sharer.php?title=I won redeemable points to purchase the amazing unilever products on great discount!!&u=" + encodeURIComponent(location.href), "width=320,height=320"); return false; } }, "Facebook"), h("span", { class: "social-icon twitter", onClick: () => { window.open('http://twitter.com/share?url=' + encodeURIComponent(location.href) + '&text=I won redeemable points to purchase the amazing unilever products on great discount!!', 'left=0,top=0,width=320,height=320,personalbar=0,toolbar=0,scrollbars=0,resizable=0'); return false; } }, "Twitter"))))));
    }
    static get style() { return ".hide{display:none!important}button{outline:none}:host{font-family:cargoD,Trebuchet MS,Arial,sans-serif}.nav-item ul{list-style:none;width:100%;margin:0;padding:0;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}.nav-item ul li{position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;margin:15px 10px 25px}.nav-item ul li button{display:block;height:50px;width:50px;font-size:0;color:#5f1f64;text-transform:uppercase;border-radius:50%;background:#fff;cursor:pointer;border:none}\@media (min-width:768px){.nav-item ul li button{height:60px;width:60px}}.nav-item ul li button:hover{-webkit-box-shadow:0 0 14px 0 #fff;box-shadow:0 0 14px 0 #fff}.nav-item ul li button:before{content:\"\";display:block;position:relative;margin:0 auto;background-repeat:no-repeat;background-size:cover;background-position:0;width:32px;height:32px}\@media (min-width:768px){.nav-item ul li button:before{height:40px;width:40px}}.nav-item ul li.home button:before{background-image:url(https://anandprajapati1.github.io/shipDeploy/assets/svg/home.svg)}.nav-item ul li.replay button:before{background-image:url(https://anandprajapati1.github.io/shipDeploy/assets/svg/replay.svg)}.nav-item ul li.share button:before{background-image:url(https://anandprajapati1.github.io/shipDeploy/assets/svg/share.svg)}.nav-item .tooltip{display:none;background-color:#fff;border:2px solid #5b1d60;color:#000;border-radius:10px;padding:3px;position:absolute;left:115%}.nav-item .tooltip:after{content:\"\";position:absolute;top:0;height:0;margin:auto;bottom:0;right:100%;border-width:7px;border-style:solid;border-color:transparent #fff transparent transparent}.nav-item .tooltip span{font-size:0;cursor:pointer}.nav-item .tooltip span:before{content:\"\";display:inline-block;position:relative;margin:0 auto;background-repeat:no-repeat;background-size:cover;background-position:0;border-radius:2px;width:30px;height:30px}\@media (min-width:768px){.nav-item .tooltip span:before{width:32px;height:32px}}.nav-item .tooltip span.facebook:before{background-image:url(https://anandprajapati1.github.io/shipDeploy/assets/svg/facebook.svg)}.nav-item .tooltip span.twitter:before{background-image:url(https://anandprajapati1.github.io/shipDeploy/assets/svg/twitter.svg)}.nav-item .tooltip.open{display:block}"; }
};

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

const RedeemPoint = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.dataUpdated = false;
        this.productJson = [];
        this.btnClicked = createEvent(this, "btnClicked", 7);
    }
    async refreshScore() {
        this._userData = getUserData();
        this._tabPanel.refreshScore();
    }
    onCouponPurchased() {
        this._userData = getUserData();
    }
    //Before rendering
    componentWillLoad() {
        // points render
        this._userData = getUserData();
    }
    componentDidLoad() {
        getProductJson(4).then((d) => {
            this.productJson = d;
            this.dataUpdated = true;
        });
        // // get json response
        // var productJsonUrl = window.location + "/home.productfeed.json";
        // if (window.location.hostname === "localhost" || window.location.hostname.indexOf("github.io")>0) {
        //   productJsonUrl = window.location + "/assets/demo.json";
        // }
        // console.log(productJsonUrl);
        // fetch("https://author-starterkit.unileversolutions.com/content/brands/seventh-generation/gb/en/home.productfeed.json",{
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Origin': '',
        //     'Host': 'https://author-starterkit.unileversolutions.com'
        //   },
        //   body: JSON.stringify({
        //     'client_id': 'unilever',
        //     'client_secret': 'unilever',
        //     'grant_type': 'Dr2gaYUM6ch_sPAsw2vEPHaSwEmata3A'
        //   })
        //   })
        //   .then((response: Response) => response.json())
        //   .then(response => {
        //     for (var i = 0; i < 4; i++) {
        //       this.productJson.push({
        //         name: response.locales[0].products.product[i].name,
        //         image: response.locales[0].products.product[i].imageUrl,
        //         url: response.locales[0].products.product[i].productPageUrl
        //       });
        //     }
        //     this.dataUpdated = true;
        //   });
    }
    render() {
        return (h("div", { class: "redeem-panel" }, h("div", { class: "redeem-point" }, "Points : ", h("span", { class: "" }, this._userData.points)), h("tab-panel", { ref: el => this._tabPanel = el }), h("div", { class: "product-section" }, h("div", { class: "title" }, "You can use coupon code in below product also"), (() => {
            if (this.productJson.length) {
                return this.dataUpdated && this.productJson.map(productItem => h("div", { class: "product-item" }, h("a", { href: productItem.url, target: "_black", onClick: () => this.btnClicked.emit() }, h("img", { src: productItem.image, title: productItem.name, alt: productItem.name }), h("span", null, productItem.name))));
            }
            else {
                return h("div", { class: "no-product" }, "No Product Avalable");
            }
        })()), h("nav-item", { "replay-disabled": "true" })));
    }
    static get style() { return ".hide{display:none!important}button{outline:none}.redeem-panel{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-direction:column;flex-direction:column;width:100%;border-radius:10px;background:rgba(95,31,100,.9);-webkit-box-shadow:inset 0 0 14px 0 #fff;-moz-box-shadow:inset 0 0 14px 0 #fff;box-shadow:inset 0 0 14px 0 #fff}.redeem-point{font-size:27px;line-height:30px;text-transform:uppercase;margin:25px auto 5px}\@media (min-width:992px){.redeem-point{font-size:40px}}.no-product{margin:0 0 40px;text-transform:uppercase;border:1px solid rgba(95,31,100,.9);padding:20px;border-left-width:0;border-right-width:0}.product-section{background:rgba(50,16,53,.7)}.product-section .title{font-size:20px;text-transform:uppercase;text-align:center;margin:30px 0;padding:10px}\@media (min-width:992px){.product-section .title{padding:15px;font-size:30px}}.product-section .product-item{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;width:calc((100% - 20px)/ 3);margin:0 20px 30px}\@media (min-width:992px){.product-section .product-item{width:calc((100% - 20px)/ 5)}}.product-section .product-item a{color:#fff;text-transform:uppercase;text-decoration:none;font-size:14px}\@media (min-width:768px){.product-section .product-item a{font-size:20px}}.product-section .product-item img{max-width:100%;border:2px solid #fff;border-radius:10px}"; }
};

const ScoreBoard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isVisible = false;
        this.score = 0;
        this.redeemClick = createEvent(this, "redeemClick", 7);
    }
    render() {
        return (h("div", { class: "score-board-parent" }, h("div", { class: "white-circle" }, h("div", { class: "score-board" }, h("h1", null, "Game Over"), h("h2", null, h("span", null, "Points : "), this.score), h("button", { class: "redeem-btn", onClick: () => this.redeemClick.emit() }, "Redeem Now"), h("nav-item", null)))));
    }
    static get style() { return ".hide{display:none!important}button{outline:none}.score-board-parent{width:calc(100% + 0px);height:calc(100% + 0px);margin:0;display:-ms-flexbox;display:flex;text-align:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.score-board-parent,.score-board-parent .white-circle{-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute}.score-board-parent .white-circle{border:0 solid #fff;height:auto;padding:20px 20px 5px;box-shadow:inset 0 0 35px 15px #fff;-webkit-box-shadow:inset 0 0 35px 15px #fff;border-radius:50px;background:rgba(63,1,108,.8);top:calc(50% - 35px);left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:90%;max-width:350px}\@media (min-width:768px){.score-board-parent .white-circle{padding:20px 30px 5px;max-width:400px}}\@media (min-width:992px){.score-board-parent .white-circle{max-width:600px;padding:75px 50px 10px;top:calc(50% - 55px)}}.score-board-parent .white-circle .nav-item{background:none}.score-board-parent .white-circle h1{font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-weight:400;font-size:20px;line-height:1;margin:0 0 10px;padding:0;text-transform:uppercase}\@media (min-width:768px){.score-board-parent .white-circle h1{font-size:27px}}\@media (min-width:992px){.score-board-parent .white-circle h1{font-size:40px}}\@media (min-width:768px){.score-board-parent .white-circle h1{margin:0 0 10px}}\@media (min-width:992px){.score-board-parent .white-circle h1{margin:0 0 15px}}.score-board-parent .white-circle h2{font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-weight:400;font-size:14px;line-height:1;text-transform:uppercase;margin:0 0 15px;padding:0;padding:0 35px}\@media (min-width:768px){.score-board-parent .white-circle h2{font-size:20px}}\@media (min-width:992px){.score-board-parent .white-circle h2{font-size:20px}}\@media (min-width:768px){.score-board-parent .white-circle h2{margin:0 0 15px;padding:0 35px}}\@media (min-width:992px){.score-board-parent .white-circle h2{margin:0 0 15px;padding:0 35px}}.score-board .redeem-btn{background:#d2264e;border-radius:10px;border-style:solid;border-width:3px;border-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;cursor:pointer;text-transform:none;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:14px;line-height:1;padding:5px 10px;text-transform:uppercase}\@media (min-width:992px){.score-board .redeem-btn{font-size:27px}}"; }
};

const TabPanel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isDisabled = true;
        this.isCouponVisible = false;
        this.activePanel = 1;
        this.tabs = [{ tid: 1, title: "Redeem coupon" }, { tid: 2, title: "Earned coupons" }];
        this.point_CoinMapper = [
            { point: 100, coin: 10 },
            { point: 200, coin: 20 },
            { point: 300, coin: 30 },
            { point: 400, coin: 40 },
            { point: 500, coin: 50 }
        ];
        this.couponPurchased = createEvent(this, "couponPurchased", 7);
        this.btnClicked = createEvent(this, "btnClicked", 7);
    }
    pointSelected(_pt) {
        this.pointSelectedInput = _pt;
        this.isDisabled = this._userData.points < this.pointSelectedInput.point;
        this.isCouponVisible = false;
        this.btnClicked.emit();
    }
    // Tab clicked
    tabClicked(val) {
        this.activePanel = val;
        this.btnClicked.emit();
    }
    createCoupon() {
        var uuid = UUID();
        this._userData.couponList.push({ code: uuid, reward: new rewardData(this.pointSelectedInput.coin) });
        this.isCouponVisible = true;
        this.redeemCouponCode.innerHTML = uuid;
        this._userData.points -= this.pointSelectedInput.point;
        setUserData(this._userData);
        this.couponPurchased.emit();
        this.btnClicked.emit();
    }
    async refreshScore() {
        this._userData = getUserData();
    }
    //Before rendering
    componentWillLoad() {
        // points render
        this.refreshScore();
    }
    render() {
        return (h("div", { class: "tab-panel" }, h("ul", { class: "tab-panel-navigation" }, this.tabs.map(item => h("li", { "data-link": item.tid, class: (this.activePanel == item.tid ? "active" : "") + " tab-panel-item", onClick: this.tabClicked.bind(this, item.tid) }, item.title))), h("div", { class: "tab-panel-container" }, this.tabs.map(el => h("div", { "data-tab-id": el.tid, class: (this.activePanel == el.tid ? "open" : "") + " tab-panel-content" }, el.tid == 1 ?
            [h("div", { class: (this.isDisabled ? "disabled" : "") + " redeem" }, h("button", { class: (this.isCouponVisible ? "" : "show") + " redeem-button", onClick: this.createCoupon.bind(this) }, "Click to redeem"), h("div", { class: (this.isCouponVisible ? "show" : "") + " redeem-coupon" }, h("span", null, "Coupon"), h("div", { class: "redeem-coupon-code", ref: (el) => this.redeemCouponCode = el }))),
                h("div", { class: "points" }, h("ul", null, this.point_CoinMapper.map((pt) => h("li", null, h("label", null, h("input", { type: "radio", name: "point", onChange: this.pointSelected.bind(this, pt) }), pt.point, " Points = ", pt.coin, " Coins", h("span", { class: "checkmark" }))))))] :
            h("div", { class: "previous-coupon" }, h("ul", null, h("li", null, h("div", { class: "heading serial-number" }, "Sl"), h("div", { class: "heading coupon-code" }, "Coupons Code"), h("div", { class: "heading coins" }, "Rewards")), this._userData.couponList.length ? this._userData.couponList.map((couponCoin, index) => h("li", null, h("div", { class: "serial-number" }, index + 1), h("div", { class: "coupon-code" }, couponCoin.code), h("div", { class: "coins" }, couponCoin.reward.coin > 0 ? couponCoin.reward.coin + " coins" :
                h("a", { href: couponCoin.reward.product.url, target: "_blank" }, h("img", { src: couponCoin.reward.product.image, alt: "product image" }))))) : h("li", { class: "no-coupons" }, "No Coupons Avalable"))))))));
    }
    static get style() { return ".hide{display:none!important}button{outline:none}.tab-panel{width:calc(100% - 30px);margin:15px auto}.tab-panel *{margin:0 0 .5px 0;padding:0}.tab-panel :focus{outline:none}.tab-panel-navigation{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;list-style:none}.tab-panel-navigation li{padding:10px 15px;-ms-flex:1 1 50%;flex:1 1 50%;background:#9e18a9;cursor:pointer;text-align:center;font-size:20px;text-transform:uppercase}\@media (min-width:768px){.tab-panel-navigation li{font-size:27px}}\@media (min-width:1200px){.tab-panel-navigation li{font-size:35px}}.tab-panel-navigation li:first-child{border-top-left-radius:10px}.tab-panel-navigation li:last-child{border-top-right-radius:10px}.tab-panel-navigation li.active{background:#d4264b}.tab-panel-content{display:none;background:#9e18a9;padding:20px 10px;border-bottom-left-radius:10px;border-bottom-right-radius:10px}\@media (min-width:992px){.tab-panel-content{padding:20px}}.tab-panel-content.open{background:#d4264b;display:-ms-flexbox;display:flex;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-ms-flex-pack:justify;justify-content:space-between}\@media (min-width:992px){.tab-panel-content.open{-ms-flex-direction:row;flex-direction:row}}.tab-panel .redeem{margin:30px auto 0;width:150px;-ms-flex:0 0 150px;flex:0 0 150px;height:150px;border-radius:50%;background:#75205f;-webkit-box-shadow:inset 0 0 35px 20px #fff;-moz-box-shadow:inset 0 0 35px 20px #fff;box-shadow:inset 0 0 35px 20px #fff;opacity:1;cursor:auto;overflow:hidden}\@media (min-width:992px){.tab-panel .redeem{margin:0 0 0 30px;width:200px;-ms-flex:0 0 200px;flex:0 0 200px;height:200px}}.tab-panel .redeem.disabled{pointer-events:none;background:#a7a8aa}.tab-panel .redeem-button{background:none;width:100%;border:0;height:100%;display:none;color:#fff;cursor:pointer;font-size:20px;text-transform:uppercase;font-family:cargoD,Trebuchet MS,Arial,sans-serif}\@media (min-width:992px){.tab-panel .redeem-button{font-size:30px}}.tab-panel .redeem-coupon{text-align:center;display:none;text-transform:uppercase;font-size:20px;font-family:cargoD,Trebuchet MS,Arial,sans-serif;width:100%;height:100%}\@media (min-width:992px){.tab-panel .redeem-coupon{font-size:30px}}.tab-panel .redeem-coupon-code{width:100%;background:#000;font-size:16px;padding:5px;margin-top:5px;-webkit-box-shadow:inset 0 0 8px 0 #fff;-moz-box-shadow:inset 0 0 8px 0 #fff;box-shadow:inset 0 0 8px 0 #fff}\@media (min-width:992px){.tab-panel .redeem-coupon-code{font-size:23px}}.tab-panel .previous-coupon{background:#fff;color:#40026d;width:100%;max-height:250px;overflow-x:hidden;overflow-y:auto}.tab-panel .previous-coupon::-webkit-scrollbar{width:.6em}.tab-panel .previous-coupon::-webkit-scrollbar-track{box-shadow:inset 0 0 6px #000;-webkit-box-shadow:inset 0 0 6px #000}.tab-panel .previous-coupon::-webkit-scrollbar-thumb{background-color:#000;outline:1px solid #000}.tab-panel .previous-coupon ul{list-style:none;margin:0;padding:0}.tab-panel .previous-coupon ul li{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:center;justify-content:center;-ms-flex-align:stretch;align-items:stretch;border-bottom:1px solid #000}.tab-panel .previous-coupon ul li .coins,.tab-panel .previous-coupon ul li .coupon-code,.tab-panel .previous-coupon ul li .serial-number{border-right:1px solid #000;padding:5px;font-size:16px;-webkit-box-sizing:border-box;box-sizing:border-box;text-transform:uppercase}\@media (min-width:992px){.tab-panel .previous-coupon ul li .coins,.tab-panel .previous-coupon ul li .coupon-code,.tab-panel .previous-coupon ul li .serial-number{font-size:20px;padding:10px}}.tab-panel .previous-coupon ul li .coins.heading,.tab-panel .previous-coupon ul li .coupon-code.heading,.tab-panel .previous-coupon ul li .serial-number.heading{font-size:16px}\@media (min-width:992px){.tab-panel .previous-coupon ul li .coins.heading,.tab-panel .previous-coupon ul li .coupon-code.heading,.tab-panel .previous-coupon ul li .serial-number.heading{font-size:27px}}.tab-panel .previous-coupon ul li .serial-number{-ms-flex:0 0 13%;flex:0 0 13%}\@media (min-width:992px){.tab-panel .previous-coupon ul li .serial-number{-ms-flex:0 0 6%;flex:0 0 6%}}.tab-panel .previous-coupon ul li .coupon-code{-ms-flex:0 0 52%;flex:0 0 52%}\@media (min-width:992px){.tab-panel .previous-coupon ul li .coupon-code{-ms-flex:0 0 63%;flex:0 0 63%}}.tab-panel .previous-coupon ul li .coins{-ms-flex:1 0 35%;flex:1 0 35%}\@media (min-width:992px){.tab-panel .previous-coupon ul li .coins{-ms-flex:0 0 24%;flex:0 0 24%}}.tab-panel .previous-coupon ul li img{width:100%;max-width:70px;height:auto}.tab-panel .points{background:#fff;width:100%;-ms-flex:0 0 100%;flex:0 0 100%;max-height:170px;overflow-x:hidden;overflow-y:auto}.tab-panel .points::-webkit-scrollbar{width:.6em}.tab-panel .points::-webkit-scrollbar-track{box-shadow:inset 0 0 6px #000;-webkit-box-shadow:inset 0 0 6px #000}.tab-panel .points::-webkit-scrollbar-thumb{background-color:#000;outline:1px solid #000}\@media (min-width:992px){.tab-panel .points{max-height:187px;width:50%;-ms-flex:0 0 50%;flex:0 0 50%}}.tab-panel .points ul{list-style:none}.tab-panel .points ul li label{cursor:pointer;position:relative;width:100%;display:block;padding:5px;color:#40026d;font-size:18px;border-bottom:1px solid #000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding-left:50px;text-align:left}\@media (min-width:992px){.tab-panel .points ul li label{font-size:22px}}.tab-panel .points ul li label.active,.tab-panel .points ul li label:hover{background:#a7a8aa}.tab-panel .points ul li input{margin:0 5px 0 0;position:absolute;opacity:0;cursor:pointer;height:0;width:0}.tab-panel .points ul li input:checked~.checkmark{background-color:#000}.tab-panel .points ul li input:checked~.checkmark:after{display:block}.tab-panel .points ul li .checkmark{position:absolute;top:calc((100% - 15px) /2);left:20px;height:10px;width:10px;background-color:#fff;border:3px solid #d4264b;border-radius:50%}.tab-panel .points ul li .checkmark:after{content:\"\";position:absolute;display:none}.tab-panel .show{display:-ms-flexbox!important;display:flex!important;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;-ms-flex-direction:column;flex-direction:column}"; }
};

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

export { BubbleItem as bubble_item, GameItem as game_item, NavItem as nav_item, PopupModel as popup_model, RedeemPoint as redeem_panel, ScoreBoard as score_board, TabPanel as tab_panel, VaUtil as va_util };
