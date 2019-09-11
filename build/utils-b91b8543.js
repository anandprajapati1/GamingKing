function format(first, middle, last) {
    return ((first || '') +
        (middle ? ` ${middle}` : '') +
        (last ? ` ${last}` : ''));
}
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
class couponData {
    constructor() {
        this.code = "";
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
    var productJsonUrl = window.location + "home.productfeed.json";
    if (window.location.hostname === "localhost" || window.location.hostname.indexOf("github.io") > 0) {
        productJsonUrl = window.location + "assets/demo.json";
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
class productDetail {
    constructor(name, image, url) {
        this.name = name;
        this.image = image;
        this.url = url;
    }
}
;

export { UUID as U, getProductJson as a, randomIntFromInterval as b, enumModuleState as e, getUserData as g, rewardData as r, setUserData as s };
