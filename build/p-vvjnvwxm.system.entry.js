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
            var ScoreBoard = exports('score_board', /** @class */ (function () {
                function class_1(hostRef) {
                    registerInstance(this, hostRef);
                    this.isVisible = false;
                    this.score = 0;
                    this.redeemClick = createEvent(this, "redeemClick", 7);
                }
                class_1.prototype.render = function () {
                    var _this = this;
                    return (h("div", { class: "score-board-parent" }, h("div", { class: "white-circle" }, h("div", { class: "score-board" }, h("h1", null, "Game Over"), h("h2", null, h("span", null, "Points : "), this.score), h("button", { class: "redeem-btn", onClick: function () { return _this.redeemClick.emit(); } }, "Redeem Now"), h("nav-item", null)))));
                };
                Object.defineProperty(class_1, "style", {
                    get: function () { return ".hide{display:none!important}.score-board-parent{width:calc(100% + 0px);height:calc(100% + 0px);margin:0;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;text-align:center;position:absolute;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;background:url(https://anandprajapati1.github.io/shipDeploy/assets/img/gameBg.png) no-repeat;background-color:#eaa041;background-size:125%;background-position:50%}\@media (min-width:768px){.score-board-parent{background-size:cover;background-position:50%;max-width:600px}}\@media (min-width:992px){.score-board-parent{background-size:cover;background-position:50%;max-width:930px}}.score-board-parent .white-circle{border:0 solid #fff;height:auto;padding:20px 20px 5px;box-shadow:inset 0 0 35px 15px #fff;-webkit-box-shadow:inset 0 0 35px 15px #fff;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:50px;background:rgba(63,1,108,.8);position:absolute;top:calc(50% - 35px);left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:90%;max-width:350px}\@media (min-width:768px){.score-board-parent .white-circle{padding:20px 30px 5px;max-width:400px}}\@media (min-width:992px){.score-board-parent .white-circle{max-width:600px;padding:75px 50px 10px;top:calc(50% - 55px)}}.score-board-parent .white-circle .nav-item{background:none}.score-board-parent h1{color:#fff;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:40px;font-weight:400}\@media (min-width:992px){.score-board-parent h1{font-size:40px}}.score-board-parent h2{color:#fff;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:14px;font-weight:400}\@media (min-width:768px){.score-board-parent h2{font-size:27px}}\@media (min-width:992px){.score-board-parent h2{font-size:27px}}.score-board .redeem-btn{background:#d2264e;border-radius:10px;border-style:solid;border-width:3px;border-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;cursor:pointer;text-transform:none;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:14px;line-height:1;padding:5px 10px;text-transform:uppercase}\@media (min-width:992px){.score-board .redeem-btn{font-size:27px}}"; },
                    enumerable: true,
                    configurable: true
                });
                return class_1;
            }()));
        }
    };
});
