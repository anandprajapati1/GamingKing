var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
System.register(['./p-e6f9ecb1.system.js', './p-a6d152c2.system.js'], function (exports) {
    'use strict';
    var registerInstance, createEvent, h, randomIntFromInterval, getUserData, UUID, rewardData, setUserData, enumModuleState, getProductJson;
    return {
        setters: [function (module) {
                registerInstance = module.r;
                createEvent = module.c;
                h = module.h;
            }, function (module) {
                randomIntFromInterval = module.b;
                getUserData = module.g;
                UUID = module.U;
                rewardData = module.r;
                setUserData = module.s;
                enumModuleState = module.e;
                getProductJson = module.a;
            }],
        execute: function () {
            var BubbleItem = exports('bubble_item', /** @class */ (function () {
                function class_1(hostRef) {
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
                class_1.prototype.popBubble = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (!this.bubbleEl.classList.contains("burst")) {
                                this.bubbleEl.classList.add("burst");
                                this.bubbleBurst.emit({ val: this.val, productData: this._productData });
                            }
                            return [2 /*return*/];
                        });
                    });
                };
                class_1.prototype.togglePause = function (_isPaused) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.isPaused = _isPaused;
                            if (!this.isPaused)
                                this.rise(this.yPos);
                            return [2 /*return*/];
                        });
                    });
                };
                class_1.prototype.rise = function (pos) {
                    if (pos === void 0) { pos = 0; }
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
                };
                class_1.prototype.reset = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.bubbleEl.style.bottom = 0 + 'px';
                            return [2 /*return*/];
                        });
                    });
                };
                class_1.prototype.componentDidLoad = function () {
                    this.bubbleEl.style.left = window.innerWidth < 767 ? randomIntFromInterval(1, 77) + '%' : randomIntFromInterval(1, 85) + '%';
                    this.bubbleEl.style.width = this.size + 'px';
                    this.bubbleEl.style.height = this.size + 'px';
                    this.rise();
                };
                class_1.prototype.componentWillLoad = function () {
                    this._productData = this.luckyProductData ? JSON.parse(this.luckyProductData) : null;
                };
                class_1.prototype.render = function () {
                    var _this = this;
                    return (h("span", { class: "bubble", ref: function (el) { _this.bubbleEl = el; }, onClick: this.popBubble.bind(this) }, this._productData ? h("img", { src: this._productData.image, alt: "Product Image", class: "product-image" }) : "", h("span", { class: "bubble-box", style: { "background": this.color } }, h("span", { class: "bubble-point" }, this.val))));
                };
                Object.defineProperty(class_1, "style", {
                    get: function () { return ".hide{display:none!important}button{outline:none}:host{font-family:cargoD,Trebuchet MS,Arial,sans-serif}.bubble{bottom:0;left:calc(50% - 100px);top:auto;overflow:hidden}.bubble,.bubble .bubble-box{border-radius:50%;position:absolute;cursor:pointer}.bubble .bubble-box{background:#2b28c4;-webkit-transition:opacity .3s ease;transition:opacity .3s ease;opacity:1;display:block;width:100%;height:100%;left:0;top:0;z-index:-1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-box-shadow:inset -5px -5px 10px rgba(0,0,0,.3);box-shadow:inset -5px -5px 10px rgba(0,0,0,.3)}.bubble-point{color:#fff;text-align:center}.bubble .product-image{visibility:hidden;width:0;height:0;-ms-flex:0 0 0px;flex:0 0 0;overflow:hidden;border-radius:50%;position:absolute;left:0;top:0;cursor:default}.bubble.burst .bubble-box{opacity:0}.bubble.burst .product-image{visibility:visible;width:100%;height:100%;-ms-flex:0 0 100%;flex:0 0 100%}"; },
                    enumerable: true,
                    configurable: true
                });
                return class_1;
            }()));
            var GameItem = exports('game_item', /** @class */ (function () {
                function class_2(hostRef) {
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
                class_2.prototype.startGame = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this._userSavedData = getUserData();
                            this.resetLevel();
                            this.currentLevel = this.levels[this.currentLevelNo];
                            this.startLevel();
                            return [2 /*return*/];
                        });
                    });
                };
                class_2.prototype.bubbleDisappearedHandler = function (e) {
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
                };
                class_2.prototype.onBubbleBurst = function (e) {
                    this.score += e.detail.val;
                    this.popedAudioTag.play();
                    this.checkLuckyProduct(e.detail.productData);
                };
                class_2.prototype.checkLuckyProduct = function (_product) {
                    var _this = this;
                    if (_product) {
                        this.showLuckyPopup = true;
                        setTimeout(function () { _this.showLuckyPopup = false; }, 5000);
                        // Save lucky coupon
                        this._userSavedData.couponList.push({ code: UUID(), reward: new rewardData(0, _product) });
                        setUserData(this._userSavedData);
                    }
                };
                class_2.prototype.onNavigatedHandler = function (e) {
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
                };
                class_2.prototype.resetLevel = function () {
                    this.life = 5;
                    this.score = 0;
                    this.currentLevelNo = 0;
                    this.currentLevelBubbleCounter = 0;
                    this.isPaused = false;
                    this.isGameOver = false;
                };
                // Product get through JSON
                class_2.prototype.componentDidLoad = function () {
                    var _this = this;
                    getProductJson(this.levels.length).then(function (d) {
                        _this._luckyProductList = d;
                    });
                };
                /** To initialize alevel data.
                 * Will be called on start of each level */
                class_2.prototype.startLevel = function () {
                    var _this = this;
                    //Level start animation
                    this._luckyProductData = this._luckyProductList[this.currentLevelNo];
                    this.gameElement.innerHTML = "";
                    this.levelAnim.classList.add("show");
                    setTimeout(function () {
                        _this.levelAnim.classList.remove("show");
                        var j = 0;
                        var luckyBubble = Math.floor(Math.random() * _this.currentLevel.count) - 1;
                        _this.bubbleGenIntId = setInterval(function () {
                            if (!_this.isPaused) {
                                var _item = document.createElement("bubble-item");
                                _item.setAttribute("val", _this.currentLevel.value.toString());
                                _item.setAttribute("speed", _this.currentLevel.speed.toString());
                                _item.setAttribute("height-limit", _this.containerHeight.toString());
                                _item.setAttribute("color", _this.currentLevel.color.toString());
                                _this.gameElement.appendChild(_item);
                                if (j == luckyBubble) {
                                    _item.setAttribute("lucky-product-data", JSON.stringify(_this._luckyProductData));
                                }
                                j++;
                            }
                            if (j >= _this.currentLevel.count) {
                                clearInterval(_this.bubbleGenIntId);
                            }
                        }, 3000 / _this.currentLevel.speed);
                    }, 1000);
                };
                class_2.prototype.levelUp = function () {
                    this.currentLevelBubbleCounter = 0;
                    this.levels[this.currentLevelNo].isLevelPassed = true;
                    this.currentLevelNo++;
                    this.currentLevel = this.levels[this.currentLevelNo];
                    this.startLevel();
                };
                /**Pause game */
                class_2.prototype.pauseGame = function () {
                    this.btnClicked.emit();
                    this.isPaused = !this.isPaused;
                    var i = 0;
                    while (i < this.gameElement.children.length) {
                        this.gameElement.children[i].togglePause(this.isPaused);
                        i++;
                    }
                };
                /**To exit and clear garbage html */
                class_2.prototype.exitGame = function () {
                    this.gameElement.innerHTML = "";
                    this.exitingGame.emit();
                    this.btnClicked.emit();
                    clearInterval(this.bubbleGenIntId);
                };
                // Game over
                class_2.prototype.saveScore = function () {
                    this.isGameOver = true;
                    this.gameElement.innerHTML = "";
                    clearInterval(this.bubbleGenIntId);
                    // Save score in local storage
                    this._userSavedData.points += this.score;
                    setUserData(this._userSavedData);
                };
                class_2.prototype.componentWillLoad = function () {
                    this._userSavedData = getUserData();
                };
                class_2.prototype.render = function () {
                    var _this = this;
                    return [
                        h("div", { class: (this.isGameOver ? "hide" : "") + " score" }, h("audio", { src: "https://anandprajapati1.github.io/shipDeploy/assets/media/poped.mp3", ref: function (el) { return _this.popedAudioTag = el; }, class: "hide" }), h("span", { class: "life life-" + this.life }, h("span", null), h("span", null), h("span", null), h("span", null), h("span", null)), h("span", { class: "score-label" }, "POINTS"), h("span", { class: "score-text" }, this.score), h("div", { class: (this.showLuckyPopup ? "show" : "") + " product-win " }, "You got one free product")),
                        h("button", { class: (this.isPaused || this.isGameOver ? "hide" : "") + " pause-btn", onClick: this.pauseGame.bind(this) }, "Pause"),
                        h("div", { class: (this.isPaused ? "paused" : "") + " game-item " + (this.isGameOver ? "game-over" : "game-playing"), ref: function (el) { return _this.gameElement = el; } }),
                        (function () {
                            if (_this.isPaused) {
                                return h("div", { class: "pause-overlay" }, h("div", { class: _this.isPaused ? "" : "hide" }, h("ul", { class: "cta-item" }, h("li", { class: "replay" }, h("button", { class: "resume-btn", onClick: _this.pauseGame.bind(_this) })), h("li", { class: "home" }, h("button", { class: "home-btn", onClick: _this.exitGame.bind(_this) })))));
                            }
                            else if (_this.isGameOver)
                                return h("score-board", { score: _this.score });
                        })(),
                        h("span", { class: "level-start-anim", ref: function (el) { return _this.levelAnim = el; } }, this.currentLevelNo + 1)
                    ];
                };
                Object.defineProperty(class_2, "style", {
                    get: function () { return ".hide{display:none!important}button{outline:none}:host{display:block}.game-item.game-playing:before{content:\"\";top:0;height:100%;display:block;background:hsla(0,0%,100%,.9);padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box;box-shadow:inset 0 0 35px 15px #5f1f64;-webkit-box-shadow:inset 0 0 5px 3px #5f1f64;z-index:-1}.game-item.game-playing:before,.product-win{position:absolute;left:0;width:100%;border-radius:10px}.product-win{top:-80px;-webkit-transition:all .5s;transition:all .5s;background:#5f1f64 url(https://anandprajapati1.github.io/shipDeploy/assets/img/firework.gif) repeat-x 50%;height:40px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;color:#fff;text-transform:uppercase;z-index:90;overflow:hidden}.product-win:before{background:#000;content:\"\";width:100%;height:27px;display:block;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:-1}.product-win.show{top:0}.score{position:relative;width:calc(100% - 20px);height:auto;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:center;justify-content:center;z-index:5;margin:10px}.score .score-label,.score .score-text{color:#fff;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:20px;padding:0 5px;color:#5f1f64}\@media (min-width:992px){.score .score-label,.score .score-text{font-size:20px}}.score .score-label{margin:0 0 0 10px}.life{position:absolute;left:0;top:2px;width:100px;-ms-flex:0 0 100px;flex:0 0 100px}.life>span{display:inline-block;width:calc(20% - 5px);height:15px;margin-right:5px;border-radius:50%;border:1px solid #d2264e;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.life>span:before{content:\"\";background:#d2264e;display:block;width:0;height:20px;-webkit-transition:width .3s ease;transition:width .3s ease}.life.life-1>span:first-child:before,.life.life-2>span:first-child:before,.life.life-2>span:nth-child(2):before,.life.life-3>span:first-child:before,.life.life-3>span:nth-child(2):before,.life.life-3>span:nth-child(3):before,.life.life-4>span:first-child:before,.life.life-4>span:nth-child(2):before,.life.life-4>span:nth-child(3):before,.life.life-4>span:nth-child(4):before,.life.life-5>span:first-child:before,.life.life-5>span:nth-child(2):before,.life.life-5>span:nth-child(3):before,.life.life-5>span:nth-child(4):before,.life.life-5>span:nth-child(5):before{width:100%}.pause-btn{background:url(https://anandprajapati1.github.io/shipDeploy/assets/img/close.png);background-size:contain;cursor:pointer;border:0;padding:0;z-index:9999;width:25px;height:25px;text-indent:9999px;position:absolute;right:10px;top:10px}\@media (min-width:768px){.pause-btn{width:30px;height:30px}}\@media (min-width:992px){.pause-btn{width:40px;height:40px}}.level-start-anim{visibility:hidden;width:100px;height:100px;padding:22px;position:absolute;left:50%;top:50%;border-radius:50%;background:#c5e86c;-webkit-box-shadow:0 0 10px 0 rgba(0,0,0,.5);box-shadow:0 0 10px 0 rgba(0,0,0,.5);font-size:50px;color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transition:all 1s ease;transition:all 1s ease;opacity:0}.level-start-anim.show{visibility:visible;-webkit-transform:translate(-50%,-50%) scale(1.5);transform:translate(-50%,-50%) scale(1.5);opacity:1}.pause-overlay{padding:0;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;text-align:center;position:relative;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;z-index:7;width:100%;height:100vh;margin:-50px auto 0;background:hsla(0,0%,100%,.8);max-height:575px}.pause-overlay:before{content:\"\";width:80%;height:30vh;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);box-shadow:inset 0 0 35px 15px #3f016c;-webkit-box-shadow:inset 0 0 35px 15px #3f016c;background:rgba(63,1,108,.8);position:absolute;border-radius:50px}.pause-overlay ul.cta-item{list-style:none;width:100%;margin:0;padding:0;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}.pause-overlay ul.cta-item li{position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;margin:15px 10px 25px}.pause-overlay ul.cta-item li button{display:block;height:60px;width:60px;font-size:0;color:#5f1f64;text-transform:uppercase;border-radius:50%;background:#fff;cursor:pointer;border:none}.pause-overlay ul.cta-item li button:hover{-webkit-box-shadow:0 0 14px 0 #fff;box-shadow:0 0 14px 0 #fff}.pause-overlay ul.cta-item li button:before{content:\"\";width:75%;display:block;position:relative;margin:0 auto}.pause-overlay ul.cta-item li.home button:before{content:url(https://anandprajapati1.github.io/shipDeploy/assets/svg/home.svg)}.pause-overlay ul.cta-item li.replay button:before{content:url(https://anandprajapati1.github.io/shipDeploy/assets/svg/replay.svg)}"; },
                    enumerable: true,
                    configurable: true
                });
                return class_2;
            }()));
            var ScoreBoard = exports('score_board', /** @class */ (function () {
                function class_3(hostRef) {
                    registerInstance(this, hostRef);
                    this.isVisible = false;
                    this.score = 0;
                    this.redeemClick = createEvent(this, "redeemClick", 7);
                }
                class_3.prototype.render = function () {
                    var _this = this;
                    return (h("div", { class: "score-board-parent" }, h("div", { class: "white-circle" }, h("div", { class: "score-board" }, h("h1", null, "Game Over"), h("h2", null, h("span", null, "Points : "), this.score), h("button", { class: "redeem-btn", onClick: function () { return _this.redeemClick.emit(); } }, "Redeem Now"), h("nav-item", null)))));
                };
                Object.defineProperty(class_3, "style", {
                    get: function () { return ".hide{display:none!important}button{outline:none}.score-board-parent{width:calc(100% + 0px);height:calc(100% + 0px);margin:0;display:-ms-flexbox;display:flex;text-align:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.score-board-parent,.score-board-parent .white-circle{-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute}.score-board-parent .white-circle{border:0 solid #fff;height:auto;padding:20px 20px 5px;box-shadow:inset 0 0 35px 15px #fff;-webkit-box-shadow:inset 0 0 35px 15px #fff;border-radius:50px;background:rgba(63,1,108,.8);top:calc(50% - 35px);left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:90%;max-width:350px}\@media (min-width:768px){.score-board-parent .white-circle{padding:20px 30px 5px;max-width:400px}}\@media (min-width:992px){.score-board-parent .white-circle{max-width:600px;padding:75px 50px 10px;top:calc(50% - 55px)}}.score-board-parent .white-circle .nav-item{background:none}.score-board-parent .white-circle h1{font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-weight:400;font-size:20px;line-height:1;margin:0 0 10px;padding:0;text-transform:uppercase}\@media (min-width:768px){.score-board-parent .white-circle h1{font-size:27px}}\@media (min-width:992px){.score-board-parent .white-circle h1{font-size:40px}}\@media (min-width:768px){.score-board-parent .white-circle h1{margin:0 0 10px}}\@media (min-width:992px){.score-board-parent .white-circle h1{margin:0 0 15px}}.score-board-parent .white-circle h2{font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-weight:400;font-size:14px;line-height:1;text-transform:uppercase;margin:0 0 15px;padding:0;padding:0 35px}\@media (min-width:768px){.score-board-parent .white-circle h2{font-size:20px}}\@media (min-width:992px){.score-board-parent .white-circle h2{font-size:20px}}\@media (min-width:768px){.score-board-parent .white-circle h2{margin:0 0 15px;padding:0 35px}}\@media (min-width:992px){.score-board-parent .white-circle h2{margin:0 0 15px;padding:0 35px}}.score-board .redeem-btn{background:#d2264e;border-radius:10px;border-style:solid;border-width:3px;border-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;cursor:pointer;text-transform:none;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:14px;line-height:1;padding:5px 10px;text-transform:uppercase}\@media (min-width:992px){.score-board .redeem-btn{font-size:27px}}"; },
                    enumerable: true,
                    configurable: true
                });
                return class_3;
            }()));
        }
    };
});
