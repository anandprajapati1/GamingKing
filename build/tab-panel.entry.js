import { r as registerInstance, c as createEvent, h } from './core-4323e4e0.js';
import { U as UUID, r as rewardData, s as setUserData, g as getUserData } from './utils-b91b8543.js';

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
            h("div", { class: "previous-coupon" }, h("ul", null, h("li", null, h("div", { class: "heading serial-number" }, "Sl"), h("div", { class: "heading coupon-code" }, "Coupons Code"), h("div", { class: "heading coins" }, "Coins")), this._userData.couponList.length ? this._userData.couponList.map((couponCoin, index) => h("li", null, h("div", { class: "serial-number" }, index + 1), h("div", { class: "coupon-code" }, couponCoin.code), h("div", { class: "coins" }, couponCoin.reward.coin > 0 ? couponCoin.reward.coin :
                h("a", { href: couponCoin.reward.product.url, target: "_blank" }, h("img", { src: couponCoin.reward.product.image, alt: "product image" }))))) : h("li", { class: "no-coupons" }, "No Coupons"))))))));
    }
    static get style() { return ".hide {\n  display: none !important;\n}\n\n.tab-panel {\n  width: calc(100% - 40px);\n  margin: 20px auto;\n}\n.tab-panel * {\n  margin: 0 0 0.5px 0;\n  padding: 0;\n}\n.tab-panel :focus {\n  outline: none;\n}\n.tab-panel-navigation {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  list-style: none;\n}\n.tab-panel-navigation li {\n  padding: 10px 15px;\n  -ms-flex: 1 1 50%;\n  flex: 1 1 50%;\n  background: #9e18a9;\n  cursor: pointer;\n  text-align: center;\n  font-size: 20px;\n  text-transform: uppercase;\n}\n\@media (min-width: 768px) {\n  .tab-panel-navigation li {\n    font-size: 27px;\n  }\n}\n\@media (min-width: 992px) {\n  .tab-panel-navigation li {\n    font-size: 40px;\n  }\n}\n.tab-panel-navigation li:first-child {\n  border-top-left-radius: 10px;\n}\n.tab-panel-navigation li:last-child {\n  border-top-right-radius: 10px;\n}\n.tab-panel-navigation li.active {\n  background: #d4264b;\n}\n.tab-panel-content {\n  display: none;\n  background: #9e18a9;\n  padding: 20px 10px;\n  border-bottom-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n}\n\@media (min-width: 992px) {\n  .tab-panel-content {\n    padding: 20px;\n  }\n}\n.tab-panel-content.open {\n  background: #d4264b;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column-reverse;\n  flex-direction: column-reverse;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n\@media (min-width: 992px) {\n  .tab-panel-content.open {\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n}\n.tab-panel .redeem {\n  margin: 30px auto 0;\n  width: 150px;\n  -ms-flex: 0 0 150px;\n  flex: 0 0 150px;\n  height: 150px;\n  border-radius: 50%;\n  background: #75205f;\n  -webkit-box-shadow: inset 0px 0px 35px 20px white;\n  -moz-box-shadow: inset 0px 0px 35px 20px white;\n  box-shadow: inset 0px 0px 35px 20px white;\n  opacity: 1;\n  cursor: auto;\n  overflow: hidden;\n}\n\@media (min-width: 992px) {\n  .tab-panel .redeem {\n    margin: 0 0 0 30px;\n    width: 200px;\n    -ms-flex: 0 0 200px;\n    flex: 0 0 200px;\n    height: 200px;\n  }\n}\n.tab-panel .redeem.disabled {\n  pointer-events: none;\n  background: #A7A8AA;\n}\n.tab-panel .redeem-button {\n  background: none;\n  width: 100%;\n  border: 0;\n  height: 100%;\n  display: none;\n  color: white;\n  cursor: pointer;\n  font-size: 20px;\n  text-transform: uppercase;\n  font-family: \'cargoD\', Trebuchet MS, Arial,sans-serif;\n}\n\@media (min-width: 992px) {\n  .tab-panel .redeem-button {\n    font-size: 30px;\n  }\n}\n.tab-panel .redeem-coupon {\n  text-align: center;\n  display: none;\n  text-transform: uppercase;\n  font-size: 20px;\n  font-family: \'cargoD\', Trebuchet MS, Arial,sans-serif;\n  width: 100%;\n  height: 100%;\n}\n\@media (min-width: 992px) {\n  .tab-panel .redeem-coupon {\n    font-size: 30px;\n  }\n}\n.tab-panel .redeem-coupon-code {\n  width: 100%;\n  background: black;\n  font-size: 16px;\n  padding: 5px;\n  margin-top: 5px;\n  -webkit-box-shadow: inset 0px 0px 8px 0px white;\n  -moz-box-shadow: inset 0px 0px 8px 0px white;\n  box-shadow: inset 0px 0px 8px 0px white;\n}\n\@media (min-width: 992px) {\n  .tab-panel .redeem-coupon-code {\n    font-size: 23px;\n  }\n}\n.tab-panel .previous-coupon {\n  background: white;\n  color: #40026d;\n  width: 100%;\n  max-height: 150px;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.tab-panel .previous-coupon::-webkit-scrollbar {\n  width: 0.6em;\n}\n.tab-panel .previous-coupon::-webkit-scrollbar-track {\n  box-shadow: inset 0 0 6px black;\n  -webkit-box-shadow: inset 0 0 6px black;\n}\n.tab-panel .previous-coupon::-webkit-scrollbar-thumb {\n  background-color: black;\n  outline: 1px solid black;\n}\n.tab-panel .previous-coupon ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.tab-panel .previous-coupon ul li {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -ms-flex-align: center;\n  align-items: center;\n  border-bottom: 1px solid black;\n}\n.tab-panel .previous-coupon ul li .serial-number,\n.tab-panel .previous-coupon ul li .coupon-code,\n.tab-panel .previous-coupon ul li .coins {\n  border-right: 1px solid black;\n  padding: 5px;\n  font-size: 18px;\n  text-transform: uppercase;\n}\n\@media (min-width: 992px) {\n  .tab-panel .previous-coupon ul li .serial-number,\n.tab-panel .previous-coupon ul li .coupon-code,\n.tab-panel .previous-coupon ul li .coins {\n    font-size: 20px;\n    padding: 10px;\n  }\n}\n.tab-panel .previous-coupon ul li .serial-number.heading,\n.tab-panel .previous-coupon ul li .coupon-code.heading,\n.tab-panel .previous-coupon ul li .coins.heading {\n  font-size: 18px;\n}\n\@media (min-width: 992px) {\n  .tab-panel .previous-coupon ul li .serial-number.heading,\n.tab-panel .previous-coupon ul li .coupon-code.heading,\n.tab-panel .previous-coupon ul li .coins.heading {\n    font-size: 27px;\n  }\n}\n.tab-panel .previous-coupon ul li .serial-number {\n  -ms-flex: 0 0 10%;\n  flex: 0 0 10%;\n}\n\@media (min-width: 992px) {\n  .tab-panel .previous-coupon ul li .serial-number {\n    -ms-flex: 0 0 6%;\n    flex: 0 0 6%;\n  }\n}\n.tab-panel .previous-coupon ul li .coupon-code {\n  -ms-flex: 0 0 57%;\n  flex: 0 0 57%;\n}\n\@media (min-width: 992px) {\n  .tab-panel .previous-coupon ul li .coupon-code {\n    -ms-flex: 0 0 63%;\n    flex: 0 0 63%;\n  }\n}\n.tab-panel .previous-coupon ul li .coins {\n  -ms-flex: 0 0 21%;\n  flex: 0 0 21%;\n}\n\@media (min-width: 992px) {\n  .tab-panel .previous-coupon ul li .coins {\n    -ms-flex: 0 0 24%;\n    flex: 0 0 24%;\n  }\n}\n.tab-panel .points {\n  background: white;\n  width: 100%;\n  -ms-flex: 0 0 100%;\n  flex: 0 0 100%;\n  max-height: 130px;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.tab-panel .points::-webkit-scrollbar {\n  width: 0.6em;\n}\n.tab-panel .points::-webkit-scrollbar-track {\n  box-shadow: inset 0 0 6px black;\n  -webkit-box-shadow: inset 0 0 6px black;\n}\n.tab-panel .points::-webkit-scrollbar-thumb {\n  background-color: black;\n  outline: 1px solid black;\n}\n\@media (min-width: 992px) {\n  .tab-panel .points {\n    max-height: 180px;\n    width: 50%;\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n  }\n}\n.tab-panel .points ul {\n  list-style: none;\n}\n.tab-panel .points ul li label {\n  cursor: pointer;\n  position: relative;\n  width: 100%;\n  display: block;\n  padding: 5px;\n  color: #40026d;\n  font-size: 18px;\n  border-bottom: 1px solid black;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\@media (min-width: 992px) {\n  .tab-panel .points ul li label {\n    font-size: 27px;\n  }\n}\n.tab-panel .points ul li label:hover, .tab-panel .points ul li label.active {\n  background: #A7A8AA;\n}\n.tab-panel .points ul li input {\n  margin: 0 5px 0 0;\n  position: absolute;\n  opacity: 0;\n  cursor: pointer;\n  height: 0;\n  width: 0;\n}\n.tab-panel .points ul li input:checked ~ .checkmark {\n  background-color: black;\n}\n.tab-panel .points ul li input:checked ~ .checkmark:after {\n  display: block;\n}\n.tab-panel .points ul li .checkmark {\n  position: absolute;\n  top: calc((100% - 15px) /2);\n  left: 20px;\n  height: 10px;\n  width: 10px;\n  background-color: white;\n  border: 3px solid #d4264b;\n  border-radius: 50%;\n}\n.tab-panel .points ul li .checkmark:after {\n  content: \"\";\n  position: absolute;\n  display: none;\n}\n.tab-panel .show {\n  display: -ms-flexbox !important;\n  display: flex !important;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}"; }
};

export { TabPanel as tab_panel };
