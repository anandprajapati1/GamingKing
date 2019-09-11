import { r as registerInstance, c as createEvent, h } from './core-4323e4e0.js';
import { g as getUserData, a as getProductJson } from './utils-b91b8543.js';

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
        return (h("div", { class: "redeem-panel" }, h("div", { class: "redeem-point" }, "Points : ", h("span", { class: "" }, this._userData.points)), h("tab-panel", { ref: el => this._tabPanel = el }), h("div", { class: "product-section" }, h("div", { class: "title" }, "You can use coupon code in below product also"), this.dataUpdated && this.productJson.map(productItem => h("div", { class: "product-item" }, h("a", { href: productItem.url, target: "_black", onClick: () => this.btnClicked.emit() }, h("img", { src: productItem.image, title: productItem.name, alt: productItem.name }), h("span", null, productItem.name))))), h("nav-item", { "replay-disabled": "true" })));
    }
    static get style() { return ".hide {\n  display: none !important;\n}\n\n.redeem-panel {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: 100%;\n  border-radius: 10px;\n  background: rgba(95, 31, 100, 0.9);\n  -webkit-box-shadow: inset 0px 0px 14px 0px white;\n  -moz-box-shadow: inset 0px 0px 14px 0px white;\n  box-shadow: inset 0px 0px 14px 0px white;\n}\n\n.redeem-point {\n  font-size: 27px;\n  line-height: 30px;\n  text-transform: uppercase;\n  margin: 25px auto 5px;\n}\n\@media (min-width: 992px) {\n  .redeem-point {\n    font-size: 40px;\n  }\n}\n\n.product-section {\n  background: rgba(50, 16, 53, 0.7);\n}\n.product-section .title {\n  font-size: 20px;\n  text-transform: uppercase;\n  text-align: center;\n  margin: 30px 0;\n}\n\@media (min-width: 992px) {\n  .product-section .title {\n    font-size: 30px;\n  }\n}\n.product-section .product-item {\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: calc((100% - 20px)/ 3);\n  margin: 0 20px 30px;\n}\n\@media (min-width: 992px) {\n  .product-section .product-item {\n    width: calc((100% - 20px)/ 5);\n  }\n}\n.product-section .product-item a {\n  color: white;\n  text-transform: uppercase;\n  text-decoration: none;\n  font-size: 20px;\n}\n.product-section .product-item img {\n  max-width: 100%;\n  border: 2px solid white;\n  border-radius: 10px;\n}"; }
};

export { RedeemPoint as redeem_panel };
