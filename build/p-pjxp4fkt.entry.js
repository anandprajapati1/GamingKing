import { r as registerInstance, c as createEvent, h } from './p-2e1b2e21.js';
import { e as enumModuleState, g as getUserData, a as getProductJson, U as UUID, r as rewardData, s as setUserData } from './p-8e4bc9a7.js';

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
    /**Resets panels on navigated out */
    onNavigatedHandler(e) {
        if (enumModuleState.INTRO.toString() == e.detail) {
            this._parentElement.scrollTop = 0;
        }
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
        return (h("div", { class: "redeem-panel", ref: el => this._parentElement = el }, h("div", { class: "redeem-point" }, "Points : ", h("span", { class: "" }, this._userData.points)), h("tab-panel", { ref: el => this._tabPanel = el }), h("div", { class: "product-section" }, h("div", { class: "title" }, "You can use coupon code in below product also"), (() => {
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

export { NavItem as nav_item, RedeemPoint as redeem_panel, TabPanel as tab_panel };
