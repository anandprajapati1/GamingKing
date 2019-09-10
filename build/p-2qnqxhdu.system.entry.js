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
System.register(['./p-e6f9ecb1.system.js', './p-4a817b49.system.js'], function (exports) {
    'use strict';
    var registerInstance, createEvent, h, randomIntFromInterval;
    return {
        setters: [function (module) {
                registerInstance = module.r;
                createEvent = module.c;
                h = module.h;
            }, function (module) {
                randomIntFromInterval = module.r;
            }],
        execute: function () {
            var BubbleItem = exports('bubble_item', /** @class */ (function () {
                function class_1(hostRef) {
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
                class_1.prototype.popBubble = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (!this.bubbleEl.classList.contains("burst")) {
                                this.bubbleEl.classList.add("burst");
                                this.bubbleBurst.emit(this.val);
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
                            this.bubbleDisappeared.emit(!this.bubbleEl.className.indexOf("burst"));
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
                class_1.prototype.render = function () {
                    var _this = this;
                    return (h("span", { class: "bubble", ref: function (el) { _this.bubbleEl = el; }, onClick: this.popBubble.bind(this), style: { "background": this.color } }, h("span", { class: "bubble-point" }, this.val)));
                };
                Object.defineProperty(class_1, "style", {
                    get: function () { return ".hide{display:none!important}:host{font-family:cargoD,Trebuchet MS,Arial,sans-serif}.bubble{border-radius:50%;position:absolute;background:#2b28c4;bottom:0;left:calc(50% - 100px);top:auto;-webkit-transition:opacity .3s ease;transition:opacity .3s ease;opacity:1;cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-box-shadow:inset -5px -5px 10px rgba(0,0,0,.3);box-shadow:inset -5px -5px 10px rgba(0,0,0,.3)}.bubble-point{color:#fff;text-align:center}.bubble.burst{opacity:0}"; },
                    enumerable: true,
                    configurable: true
                });
                return class_1;
            }()));
        }
    };
});
