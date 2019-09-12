System.register([], function (exports) {
    'use strict';
    return {
        execute: function () {
            exports({
                U: UUID,
                a: getProductJson,
                b: randomIntFromInterval,
                e: void 0,
                g: getUserData,
                s: setUserData
            });
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
            })(enumModuleState || (enumModuleState = exports('e', {})));
            function getUserData() {
                var _ud;
                _ud = JSON.parse(localStorage.getItem("user_data"));
                return _ud || new userData();
            }
            function setUserData(_ud) {
                localStorage.setItem("user_data", JSON.stringify(_ud));
            }
            var userData = /** @class */ (function () {
                function userData() {
                    this.points = 0;
                    this.couponList = [];
                }
                return userData;
            }());
            var rewardData = /** @class */ (function () {
                function rewardData(coin, product) {
                    if (product === void 0) { product = null; }
                    this.coin = 0;
                    this.product = null;
                    this.coin = coin;
                    this.product = product;
                }
                rewardData.prototype.getReward = function () {
                    return this.coin > 0 ? this.coin : this.product;
                };
                return rewardData;
            }());
            exports('r', rewardData);
            // Product get through JSON
            function getProductJson(limit) {
                if (limit === void 0) { limit = 0; }
                var productJson = [];
                // get json response
                var productJsonUrl = window.location.origin + window.location.pathname + "home.productfeed.json";
                if (window.location.hostname === "localhost" || window.location.hostname.indexOf("github.io") > 0) {
                    productJsonUrl = window.location.origin + window.location.pathname + "assets/demo.json";
                }
                return fetch(productJsonUrl)
                    .then(function (response) { return response.json(); })
                    .then(function (response) {
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
        }
    };
});
