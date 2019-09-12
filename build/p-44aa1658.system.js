System.register(['./p-9c067a18.system.js'], function () {
    'use strict';
    var patchBrowser, bootstrapLazy;
    return {
        setters: [function (module) {
                patchBrowser = module.p;
                bootstrapLazy = module.b;
            }],
        execute: function () {
            patchBrowser().then(function (options) {
                return bootstrapLazy([["p-3zvrkuje.system", [[1, "va-util", { "isDisabled": [516, "disabled"], "somePrivate": [1, "some-private"], "dataSrc": [513, "data-src"], "isCollapsed": [32], "openState": [32], "userState": [32], "initMyComponent": [64] }, [[0, "btnClicked", "btnClickedPlay"]]], [1, "popup-model", { "totalPoints": [2, "total-points"], "isOpened": [32], "currentPopup": [32], "isPopupModelQuit": [32], "openPopup": [64] }, [[0, "redeemClick", "openRedemption"], [0, "exitingGame", "onGameOver"], [0, "onNavigated", "onNavigatedHandler"], [0, "couponPurchased", "onCouponPurchased"]]], [1, "game-item", { "score": [2], "currentLevelNo": [2, "current-level-no"], "containerHeight": [514, "container-height"], "isPaused": [32], "isGameOver": [32], "life": [32], "showLuckyPopup": [32], "startGame": [64] }, [[0, "bubbleDisappeared", "bubbleDisappearedHandler"], [0, "bubbleBurst", "onBubbleBurst"], [0, "onNavigated", "onNavigatedHandler"]]], [1, "redeem-panel", { "_userData": [32], "dataUpdated": [32], "init": [64] }, [[0, "couponPurchased", "onCouponPurchased"], [0, "onNavigated", "onNavigatedHandler"]]], [1, "score-board", { "isVisible": [516, "is-visible"], "score": [514] }], [1, "bubble-item", { "heightLimit": [514, "height-limit"], "luckyProductData": [513, "lucky-product-data"], "size": [2], "speed": [2], "val": [2], "color": [1], "popBubble": [64], "togglePause": [64], "reset": [64] }], [1, "tab-panel", { "selectedPointVlaue": [16], "isDisabled": [32], "isCouponVisible": [32], "_userData": [32], "activePanel": [32], "initTabPanel": [64] }], [1, "nav-item", { "replayDisabled": [4, "replay-disabled"], "tooltipOpened": [32] }]]]], options);
            });
        }
    };
});
