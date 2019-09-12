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
System.register(['./p-e6f9ecb1.system.js'], function (exports) {
    'use strict';
    var registerInstance, createEvent, h;
    return {
        setters: [function (module) {
                registerInstance = module.r;
                createEvent = module.c;
                h = module.h;
            }],
        execute: function () {
            var VaUtil = exports('va_util', /** @class */ (function () {
                function class_1(hostRef) {
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
                class_1.prototype.initMyComponent = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/];
                        });
                    });
                };
                class_1.prototype.toggleState = function () {
                    this.isCollapsed = !this.isCollapsed;
                    this.btnClicked.emit();
                };
                //Before rendering
                class_1.prototype.componentWillLoad = function () {
                    var linkNode = document.createElement("link");
                    linkNode.type = "text/css";
                    linkNode.rel = "stylesheet";
                    linkNode.href = "https://anandprajapati1.github.io/shipDeploy/assets/fonts/font.css";
                    document.head.appendChild(linkNode);
                };
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
                class_1.prototype.popupOpenTrigger = function () {
                    // call pop up show/hide function
                    this.popupElement.openPopup();
                    this.btnClicked.emit();
                };
                class_1.prototype.btnClickedPlay = function () {
                    this.btnClickedTag.playbackRate = 6;
                    this.btnClickedTag.play();
                };
                class_1.prototype.render = function () {
                    var _this = this;
                    return (h("div", { class: "va-util" + (this.isCollapsed ? " collapsed" : "") }, h("audio", { src: "https://anandprajapati1.github.io/shipDeploy/assets/media/btn-click.mp3", ref: function (el) { return _this.btnClickedTag = el; }, class: "hide" }), h("popup-model", { ref: function (el) { _this.popupElement = el; } }), h("div", { class: "content", onClick: this.popupOpenTrigger.bind(this) }, h("p", null, "PLAY GAME WIN COUPONS")), h("button", { class: "btn btn-minimize" + (!this.isCollapsed ? " active" : ""), onClick: this.toggleState.bind(this) }), h("button", { class: "btn btn-maximize" + (!this.isCollapsed ? "" : " active"), onClick: this.toggleState.bind(this) })));
                };
                Object.defineProperty(class_1, "style", {
                    get: function () { return ".hide{display:none!important}button{outline:none}.va-util{position:fixed;right:20px;bottom:15px;z-index:99999;background:url(https://anandprajapati1.github.io/shipDeploy/assets/img/game-joystic.png);width:100px;height:66px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;background-size:contain}\@media (min-width:768px){.va-util{width:200px;height:132px}}.va-util.collapsed{height:18px;bottom:0;background:#5f1f64;border-radius:3px;-ms-flex-pack:start;justify-content:flex-start;padding-left:15px;border-radius:20px 20px 0 0}.va-util.collapsed .content{display:none}.va-util.collapsed .btn-maximize{top:0;background:none;left:0;font-size:20px;width:100%}.va-util .content{height:100%;width:100%;padding:9px 15px 30px;-webkit-box-sizing:border-box;box-sizing:border-box;text-shadow:0 0 5px #333;text-align:center;cursor:pointer}\@media (min-width:768px){.va-util .content{padding:17px 30px 55px}}.va-util .content p{color:#fff;font-size:10px;line-height:1.4;font-family:cargoD,Trebuchet MS,Arial,sans-serif;margin:0;padding:0;text-align:center}\@media (min-width:768px){.va-util .content p{font-size:20px;line-height:1.4}}.va-util .btn{display:inline-block;-webkit-box-shadow:none;box-shadow:none;border:0;width:20px;height:20px;color:#fff;border-radius:50%;background:#5f1f64;margin-right:5px;position:absolute;top:-22px;right:0;display:none;cursor:pointer;font-size:0}\@media (min-width:768px){.va-util .btn{top:-20px}}.va-util .btn.active{display:inline-block}.va-util .btn-minimize:before{content:\"-\"}.va-util .btn-maximize:before,.va-util .btn-minimize:before{color:#fff;width:20px;height:20px;font-size:20px;line-height:11px}.va-util .btn-maximize:before{content:\"^\";position:absolute;top:8px;right:8px}:focus{outline:none}"; },
                    enumerable: true,
                    configurable: true
                });
                return class_1;
            }()));
        }
    };
});
