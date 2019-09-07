import{r as s,c as t,h as i,H as e}from"./p-4955f739.js";var a;function n(){let s;return(s=JSON.parse(localStorage.getItem("user_data")))||new h}function o(s){localStorage.setItem("user_data",JSON.stringify(s))}!function(s){s[s.INTRO=0]="INTRO",s[s.GAME=1]="GAME",s[s.RESULT=2]="RESULT",s[s.REDEEM=3]="REDEEM"}(a||(a={}));class h{constructor(){this.points=0,this.couponList=[]}}const l=class{constructor(i){s(this,i),this.isPaused=!1,this.size=75,this.speed=1,this.val=5,this.bubbleDisappeared=t(this,"bubbleDisappeared",7),this.bubbleBurst=t(this,"bubbleBurst",7)}async popBubble(){this.bubbleEl.classList.contains("burst")||(this.bubbleEl.classList.add("burst"),this.bubbleBurst.emit(this.val))}async togglePause(s){this.isPaused=s,this.isPaused||this.rise(600,this.yPos)}rise(s=600,t=0){this.yPos=t,this.rafId=requestAnimationFrame(function t(){this.isPaused?cancelAnimationFrame(this.rafId):this.yPos>=s?(cancelAnimationFrame(this.rafId),this.bubbleEl.classList.add("burst"),this.bubbleDisappeared.emit()):(this.yPos+=2,this.bubbleEl.style.bottom=this.yPos+"px",this.rafId=requestAnimationFrame(t.bind(this)))}.bind(this))}async reset(){this.bubbleEl.style.bottom="0px"}componentDidLoad(){this.bubbleEl.style.left=(1,90,Math.floor(90*Math.random()+1)+"%"),this.bubbleEl.style.width=this.size+"px",this.bubbleEl.style.height=this.size+"px",this.rise()}render(){return i("span",{class:"bubble",ref:s=>{this.bubbleEl=s},onClick:this.popBubble.bind(this)},i("span",{class:"bubble-point"},this.val))}static get style(){return".hide{display:none!important}:host{font-family:cargoD,Trebuchet MS,Arial,sans-serif}.bubble{border-radius:50%;position:absolute;background:#2b28c4;bottom:0;left:calc(50% - 100px);top:auto;-webkit-transition:opacity .3s ease;transition:opacity .3s ease;opacity:1;cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-box-shadow:inset -25px -25px 40px rgba(0,0,0,.5);box-shadow:inset -25px -25px 40px rgba(0,0,0,.5)}.bubble-point{color:#fff;text-align:center}.bubble.burst{opacity:0}"}},c=class{constructor(i){s(this,i),this.score=0,this.currentLevelNo=0,this.isPaused=!1,this.isGameOver=!1,this.currentLevelBubbleCounter=0,this.levels=[{speed:1e3,count:5,value:10,isLevelPassed:!1},{speed:1e3,count:10,value:15,isLevelPassed:!1}],this.exitingGame=t(this,"exitingGame",7)}async startGame(){this.resetLevel(),this.currentLevel=this.levels[this.currentLevelNo],this.startLevel()}bubbleDisappearedHandler(){this.currentLevelBubbleCounter++,this.currentLevelBubbleCounter>=this.currentLevel.count&&(this.currentLevelNo+1<this.levels.length?this.levelUp():this.saveScore())}saveScore(){this.isGameOver=!0,this.gameElement.innerHTML="",this._userSavedData.points+=this.score,o(this._userSavedData)}onBubbleBurst(s){this.score+=s.detail}onNavigatedHandler(s){switch(s.detail){case a.GAME.toString():this.startGame(),s.stopImmediatePropagation();break;case a.INTRO.toString():default:this.exitGame()}}resetLevel(){this.score=0,this.currentLevelNo=0,this.currentLevelBubbleCounter=0,this.isPaused=!1,this.isGameOver=!1}startLevel(){this.levelAnim.classList.add("show"),setTimeout(()=>{this.levelAnim.classList.remove("show"),this.gameElement.innerHTML="";var s=0,t=setInterval(()=>{if(!this.isPaused){let t=document.createElement("bubble-item");t.setAttribute("val",this.currentLevel.value.toString()),this.gameElement.appendChild(t),s++}s>=this.currentLevel.count&&clearInterval(t)},this.currentLevel.speed)},1e3)}levelUp(){this.currentLevelBubbleCounter=0,this.levels[this.currentLevelNo].isLevelPassed=!0,this.currentLevelNo++,this.currentLevel=this.levels[this.currentLevelNo],this.startLevel()}pauseGame(){this.isPaused=!this.isPaused;let s=0;do{this.gameElement.children[s].togglePause(this.isPaused),s++}while(s<this.gameElement.children.length)}exitGame(){this.gameElement.innerHTML="",this.exitingGame.emit()}componentWillLoad(){this._userSavedData=n()}render(){return[i("div",{class:"score"},i("span",{class:"score-label"},"POINTS"),i("span",{class:"score-text"},this.score)),i("button",{class:(this.isPaused?"paused":"")+" pause-btn",onClick:this.pauseGame.bind(this)},"Pause"),i("div",{class:(this.isPaused?"paused":"")+" game-item",ref:s=>this.gameElement=s}),(()=>this.isPaused?i("div",{class:"pause-overlay"},i("div",{class:this.isPaused?"":"hide"},i("button",{class:"resume-btn",onClick:this.pauseGame.bind(this)},"Resume"),i("button",{class:"home-btn",onClick:this.exitGame.bind(this)},"Home"))):this.isGameOver?i("score-board",{score:this.score}):void 0)(),i("span",{class:"level-start-anim",ref:s=>this.levelAnim=s},this.currentLevelNo+1)]}static get style(){return".hide{display:none!important}:host{display:block}.score{width:30%;height:auto;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row}.score .score-label,.score .score-text{color:#fff;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:20px;padding:0 5px}\@media (min-width:992px){.score .score-label,.score .score-text{font-size:20px}}.pause-btn{background:url(../../assets/img/close.png);background-size:contain;cursor:pointer;border:0;padding:0;z-index:9999;width:25px;height:25px;text-indent:9999px;position:absolute;right:10px;top:10px}\@media (min-width:768px){.pause-btn{width:30px;height:30px}}\@media (min-width:992px){.pause-btn{width:40px;height:40px}}.level-start-anim{visibility:hidden;width:100px;height:100px;padding:22px;position:absolute;left:50%;top:50%;border-radius:50%;background:#c5e86c;font-size:50px;color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transition:all 1s ease;transition:all 1s ease;opacity:0}.level-start-anim.show{visibility:visible;-webkit-transform:translate(-50%,-50%) scale(1.5);transform:translate(-50%,-50%) scale(1.5);opacity:1}.pause-overlay{background:rgba(0,0,0,.75);-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;height:100%;display:-ms-flexbox;display:flex;text-align:center;position:absolute;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.pause-overlay button{width:50px;height:50px;border-radius:50%;display:inline-block;margin:0 15px}"}},r=class{constructor(i){s(this,i),this.tooltipOpened=!1,this.onNavigated=t(this,"onNavigated",7)}goHome(){this.onNavigated.emit(a.INTRO.toString())}replay(){this.onNavigated.emit(a.GAME.toString())}share(){this.tooltipOpened=!this.tooltipOpened}render(){return i("div",{class:"nav-item"},i("ul",null,i("li",{class:"home"},i("button",{onClick:this.goHome.bind(this)})),i("li",{class:"replay"},i("button",{onClick:this.replay.bind(this)})),i("li",{class:"share"},i("button",{onClick:this.share.bind(this)}),i("div",{class:(this.tooltipOpened?"open":"")+"tooltip"},i("span",{class:"social-icon facebook",onClick:()=>(window.open("https://www.facebook.com/sharer/sharer.php?title=I won redeemable points to purchase the amazing unilever products on great discount!!&u="+encodeURIComponent(location.href),"width=320,height=320"),!1)},"Facebook"),i("br",null),i("span",{class:"social-icon twitter",onClick:()=>(window.open("http://twitter.com/share?url="+encodeURIComponent(location.href)+"&text=I won redeemable points to purchase the amazing unilever products on great discount!!","left=0,top=0,width=320,height=320,personalbar=0,toolbar=0,scrollbars=0,resizable=0"),!1)},"Twitter")))))}static get style(){return".hide{display:none!important}:host{font-family:cargoD,Trebuchet MS,Arial,sans-serif}:host .tooltip{display:none}:host .tooltip .open{display:block}.nav-item ul{list-style:none;width:100%;margin:0;padding:0}.nav-item ul li{position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;margin:15px 10px 25px}.nav-item ul li button{display:block;height:60px;width:60px;font-size:20px;color:#5f1f64;text-transform:uppercase;border-radius:50%;background:#fff;cursor:pointer;border:none}.nav-item ul li button:hover{-webkit-box-shadow:0 0 14px 0 #fff;box-shadow:0 0 14px 0 #fff}.nav-item ul li button:before{content:\"\";width:75%;display:block;position:relative;margin:0 auto}.nav-item ul li.home button:before{content:url(assets/svg/home.svg)}.nav-item ul li.replay button:before{content:url(assets/svg/replay.svg)}.nav-item ul li.share button:before{content:url(assets/svg/share.svg);margin-top:7px}"}},u=class{constructor(t){s(this,t),this.isOpened=!1,this.currentPopup=a.INTRO,this.totalPoints=0}skipIntro(){this.currentPopup=a.GAME,this._gameItem.startGame()}openRedemption(){this.currentPopup=a.REDEEM}closePopup(){this.isOpened=!1}async openPopup(){this.isOpened=!0,this.currentPopup=a.INTRO}onGameOver(){this._userData=n(),this.totalPoints=this._userData.points,this.currentPopup=a.INTRO}onNavigatedHandler(s){switch(s.detail){case a.INTRO.toString():default:this.openPopup()}}componentWillLoad(){this._userData=n(),this.totalPoints=this._userData.points}render(){return i("div",{class:(this.isOpened?"open":"")+" popup-model"},i("div",{class:"popup-model-container"},i("button",{class:(this.currentPopup==a.INTRO||this.currentPopup==a.REDEEM?"":"hide")+" popup-model-close",onClick:this.closePopup.bind(this)}),i("div",{class:"popup-model-content"},i("div",{class:(this.currentPopup==a.INTRO?"":"hide")+" intro-panel"},i("div",{class:"white-circle"},i("h1",null,"Welcome to game zone!"),i("h2",null,"You can play game and get coupons everyday"),i("button",{class:"skip-intro-btn",onClick:this.skipIntro.bind(this)},"Play Game"),i("div",{class:"points"},i("span",{class:"points-label"},"Points : "),i("span",{class:"points-text"},this.totalPoints)),i("button",{class:"redeem-btn",onClick:this.openRedemption.bind(this)},"Redeem Now")),i("div",{class:"disclaimer-note"},i("p",null,"The winning points are being saved in your machine local storage, so please be conscious before remove the system cache."))),i("div",{class:(this.currentPopup==a.GAME?"":"hide")+" first-screen"},i("game-item",{ref:s=>this._gameItem=s})),i("div",{class:(this.currentPopup==a.REDEEM?"":"hide")+" redeem-screen"},i("redeem-panel",null)))))}static get style(){return".hide{display:none!important}.popup-model{font-family:cargoD,Trebuchet MS,Arial,sans-serif;color:#fff;display:none;position:fixed;left:0;top:0;background:rgba(0,0,0,.5);width:100%;height:100%;z-index:9999}.popup-model.open{display:block}.popup-model-close{background:url(assets/img/close.png);background-size:contain;cursor:pointer;border:0;padding:0;z-index:9999;width:25px;height:25px;text-indent:9999px;position:absolute;right:10px;top:10px}\@media (min-width:768px){.popup-model-close{width:30px;height:30px}}\@media (min-width:992px){.popup-model-close{width:40px;height:40px}}.popup-model-container{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;width:95%;height:95vh;max-width:95%;max-height:95vh;overflow:hidden;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);position:absolute;left:50%;top:50%;border-radius:10px;max-width:355px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:10px 7px;background:url(assets/img/gameBg.png) no-repeat;background-color:#eaa041;background-size:125%;background-position:50%}\@media (min-width:768px){.popup-model-container{background-size:cover;background-position:50%;max-width:600px}}\@media (min-width:992px){.popup-model-container{background-size:cover;background-position:50%;max-width:930px}}.popup-model-container .intro-panel{border:0 solid #97d700}.popup-model-container .intro-panel .white-circle{border:0 solid #fff;width:310px;height:auto;padding:20px 20px 15px;box-shadow:inset 0 0 35px 15px #fff!important;-webkit-box-shadow:inset 0 0 35px 15px #fff!important;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:25% 25% 25% 25%;background:rgba(63,1,108,.71);position:absolute;top:calc(50% - 35px);left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}\@media (min-width:768px){.popup-model-container .intro-panel .white-circle{width:450px;padding:50px 50px 30px}}\@media (min-width:992px){.popup-model-container .intro-panel .white-circle{width:620px;padding:75px 70px 20px;min-height:420px;top:calc(50% - 55px)}}.popup-model-container .intro-panel .disclaimer-note{position:fixed;bottom:0;top:auto;left:10px;right:10px;height:50px}\@media (min-width:768px){.popup-model-container .intro-panel .disclaimer-note{left:20px;right:20px;height:50px}}\@media (min-width:992px){.popup-model-container .intro-panel .disclaimer-note{left:30px;right:30px;height:30px}}.popup-model-container .intro-panel .disclaimer-note p{font:normal 10px arial}.popup-model-container .first-screen{background:#5f1f64;padding:10px;border-radius:10px;-webkit-box-sizing:border-box;box-sizing:border-box;box-shadow:inset 0 0 5px 3px #fff!important;-webkit-box-shadow:inset 0 0 5px 3px #fff!important}.popup-model-content{text-align:center;position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex:1 0;flex:1 0}.popup-model-content>div{-ms-flex:1 0 100%;flex:1 0 100%;width:100%}.popup-model h1{font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-weight:400;font-size:20px;margin:0 0 15px;padding:0;line-height:1;text-transform:uppercase}\@media (min-width:768px){.popup-model h1{font-size:27px}}\@media (min-width:992px){.popup-model h1{font-size:41px}}.popup-model h2{font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-weight:400;font-size:14px;text-transform:uppercase;margin:0 0 20px;padding:0;line-height:1;padding:0 35px}\@media (min-width:768px){.popup-model h2{font-size:20px;padding:0 35px}}.popup-model .skip-intro-btn{background:url(assets/img/gamePlay.png) transparent no-repeat;background-size:contain;cursor:pointer;color:#fff;font-size:14px;width:67px;height:46px;padding:0;border:0;text-indent:-2000px;margin:10px 0}\@media (min-width:768px){.popup-model .skip-intro-btn{width:100px;height:80px;margin:10px 0 20px}}\@media (min-width:992px){.popup-model .skip-intro-btn{width:134px;height:92px;margin:10px 0 30px}}.popup-model .points{margin-bottom:10px}.popup-model .points span{color:#fff;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:14px;text-transform:uppercase}\@media (min-width:768px){.popup-model .points span{font-size:27px}}\@media (min-width:992px){.popup-model .points span{font-size:27px}}.popup-model .redeem-btn{background:#d2264e;border-radius:10px;border-style:solid;border-width:3px;border-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;cursor:pointer;text-transform:none;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:14px;line-height:1;padding:5px 10px;text-transform:uppercase}\@media (min-width:992px){.popup-model .redeem-btn{font-size:27px}}.popup-model .redeem-screen{background:url(../../assets/img/gameBg.png) no-repeat;background-size:110%;background-position:50%;width:100%;overflow:scroll;margin:0 auto;padding:7px 0 7px 8px}.popup-model .redeem-screen::-webkit-scrollbar{width:1em}.popup-model .redeem-screen::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px #d4264b}.popup-model .redeem-screen::-webkit-scrollbar-thumb{background-color:#d4264b;outline:1px solid #d4264b}:focus{outline:none}"}},d=class{constructor(t){s(this,t),this.dataUpdated=!1,this.productJson=[]}componentDidLoad(){this._userData=n(),this.redeemPoint.innerHTML=this._userData.points.toString();var s=window.location+"home.productfeed.json";"localhost"===window.location.hostname&&(s=window.location+"/assets/demo.json"),fetch(s).then(s=>s.json()).then(s=>{for(var t=0;t<4;t++)this.productJson.push({name:s.locales[0].products.product[t].name,image:s.locales[0].products.product[t].imageUrl,url:s.locales[0].products.product[t].productPageUrl});this.dataUpdated=!0})}render(){return i("div",{class:"redeem-panel"},i("div",{class:"redeem-point"},"Points:- ",i("span",{class:"",ref:s=>this.redeemPoint=s})),i("tab-panel",null),i("div",{class:"product-section"},i("div",{class:"title"},"You can use coupon code in below product also"),this.dataUpdated&&this.productJson.map(s=>i("div",{class:"product-item"},i("a",{href:s.url,target:"_black"},i("img",{src:s.image,title:s.name,alt:s.name}),i("span",null,s.name))))),i("nav-item",null))}static get style(){return".hide{display:none!important}.redeem-panel{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-direction:column;flex-direction:column;width:100%;border-radius:10px;background:rgba(95,31,100,.9);-webkit-box-shadow:inset 0 0 14px 0 #fff;-moz-box-shadow:inset 0 0 14px 0 #fff;box-shadow:inset 0 0 14px 0 #fff}.redeem-point{font-size:27px;line-height:30px;text-transform:uppercase;margin:25px auto 5px}\@media (min-width:992px){.redeem-point{font-size:39px}}.product-section{background:rgba(50,16,53,.7)}.product-section .title{font-size:30px;text-transform:uppercase;text-align:center;margin:30px 0}.product-section .product-item{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;width:calc((100% - 20px)/ 5);margin:0 20px 30px}.product-section .product-item a{color:#fff;text-transform:uppercase;text-decoration:none;font-size:20px}.product-section .product-item img{max-width:100%;border:2px solid #fff;border-radius:10px}"}},p=class{constructor(t){s(this,t),this.isVisible=!1,this.score=0}render(){return i(e,null,i("div",{class:"score-board-parent"},i("div",{class:"white-circle"},i("div",{class:"score-board"},i("h1",null,"Game Over"),i("h2",null,i("span",null,"Points : "),this.score),i("nav-item",null)))))}static get style(){return".hide{display:none!important}.score-board-parent{width:calc(100% + 20px);height:calc(100% + 20px);margin:-42px -18px -20px;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;text-align:center;position:absolute;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;background:url(assets/img/gameBg.png) no-repeat;background-color:#eaa041;background-size:125%;background-position:50%}\@media (min-width:768px){.score-board-parent{background-size:cover;background-position:50%;max-width:600px}}\@media (min-width:992px){.score-board-parent{background-size:cover;background-position:50%;max-width:930px}}.score-board-parent .white-circle{border:0 solid #fff;width:310px;height:auto;padding:20px 20px 15px;box-shadow:inset 0 0 35px 15px #fff!important;-webkit-box-shadow:inset 0 0 35px 15px #fff!important;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:25% 25% 25% 25%;background:rgba(63,1,108,.71);position:absolute;top:calc(50% - 35px);left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}\@media (min-width:768px){.score-board-parent .white-circle{width:450px;padding:50px 50px 30px}}\@media (min-width:992px){.score-board-parent .white-circle{width:620px;padding:75px 70px 20px;min-height:420px;top:calc(50% - 55px)}}.score-board-parent .white-circle .nav-item{background:none}.score-board-parent h1{color:#fff;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:41px;font-weight:400}\@media (min-width:992px){.score-board-parent h1{font-size:41px}}.score-board-parent h2{color:#fff;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:14px;font-weight:400}\@media (min-width:768px){.score-board-parent h2{font-size:27px}}\@media (min-width:992px){.score-board-parent h2{font-size:27px}}"}},m=class{constructor(t){s(this,t),this.isDisabled=!1,this.isCouponVisible=!1,this.tabs=[{tid:1,title:"Redeem coupon"},{tid:2,title:"Earned coupons"}],this.point_CoinMapper=[{point:100,coin:10},{point:200,coin:20},{point:300,coin:30},{point:400,coin:40},{point:500,coin:50}],this.activePanel=1}pointSelected(s){this.pointSelectedInput=s,this.isDisabled=this._userData.points<this.pointSelectedInput.point,this.isCouponVisible=!1}tabClicked(s){this.activePanel=s}createCoupon(){var s=(new Date).getTime(),t="xxxxxxxxxxxx".replace(/[xy]/g,function(t){var i=(s+16*Math.random())%16|0;return s=Math.floor(s/16),("x"==t?i:3&i|8).toString(16)});this._userData.couponList.push({code:t,coin:this.pointSelectedInput.coin}),this.isCouponVisible=!0,this.redeemCouponCode.innerHTML=t,this._userData.points-=this.pointSelectedInput.point,o(this._userData)}componentWillLoad(){this._userData=n()}render(){return i("div",{class:"tab-panel"},i("ul",{class:"tab-panel-navigation"},this.tabs.map(s=>i("li",{"data-link":s.tid,class:(this.activePanel==s.tid?"active":"")+" tab-panel-item",onClick:this.tabClicked.bind(this,s.tid)},s.title))),i("div",{class:"tab-panel-container"},this.tabs.map(s=>i("div",{"data-tab-id":s.tid,class:(this.activePanel==s.tid?"open":"")+" tab-panel-content"},1==s.tid?[i("div",{class:(this.isDisabled?"disabled":"")+" redeem"},i("button",{class:(this.isCouponVisible?"":"show")+" redeem-button",onClick:this.createCoupon.bind(this)},"Click to redeem"),i("div",{class:(this.isCouponVisible?"show":"")+" redeem-coupon"},i("span",null,"Coupon"),i("div",{class:"redeem-coupon-code",ref:s=>this.redeemCouponCode=s}))),i("div",{class:"points"},i("ul",null,this.point_CoinMapper.map(s=>i("li",null,i("label",null,i("input",{type:"radio",name:"point",onChange:this.pointSelected.bind(this,s)}),s.point," Points = ",s.coin," Coins",i("span",{class:"checkmark"}))))))]:i("div",{class:"previous-coupon"},i("ul",null,i("li",null,i("div",{class:"heading serial-number"},"Sl"),i("div",{class:"heading coupon-code"},"Coupons Code"),i("div",{class:"heading coins"},"Coins")),this._userData.couponList.length?this._userData.couponList.map((s,t)=>i("li",null,i("div",{class:"serial-number"},t),i("div",{class:"coupon-code"},s.code),i("div",{class:"coins"},s.coin))):i("li",{class:"no-coupons"},"No Coupons")))))))}static get style(){return".hide{display:none!important}.tab-panel{width:calc(100% - 40px);margin:20px auto}.tab-panel *{margin:0 0 .5px 0;padding:0}.tab-panel :focus{outline:none}.tab-panel-navigation{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;list-style:none}.tab-panel-navigation li{padding:10px 15px;-ms-flex:1 1 50%;flex:1 1 50%;background:#9e18a9;cursor:pointer;text-align:center;font-size:20px;text-transform:uppercase}\@media (min-width:768px){.tab-panel-navigation li{font-size:27px}}\@media (min-width:992px){.tab-panel-navigation li{font-size:39px}}.tab-panel-navigation li:first-child{border-top-left-radius:10px}.tab-panel-navigation li:last-child{border-top-right-radius:10px}.tab-panel-navigation li.active{background:#d4264b}.tab-panel-content{display:none;background:#9e18a9;padding:20px;border-bottom-left-radius:10px;border-bottom-right-radius:10px}.tab-panel-content.open{background:#d4264b;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between}.tab-panel .redeem{margin:0 0 0 30px;width:200px;-ms-flex:0 0 200px;flex:0 0 200px;height:200px;border-radius:50%;background:#75205f;-webkit-box-shadow:inset 0 0 35px 20px #fff;-moz-box-shadow:inset 0 0 35px 20px #fff;box-shadow:inset 0 0 35px 20px #fff;opacity:1;cursor:auto;overflow:hidden}.tab-panel .redeem.disabled{pointer-events:none;background:#a7a8aa}.tab-panel .redeem-button{background:none;border:0;color:#fff;cursor:pointer}.tab-panel .redeem-button,.tab-panel .redeem-coupon{width:100%;height:100%;display:none;font-size:30px;text-transform:uppercase;font-family:cargoD,Trebuchet MS,Arial,sans-serif}.tab-panel .redeem-coupon{text-align:center}.tab-panel .redeem-coupon-code{width:100%;background:#000;padding:5px;margin-top:5px;-webkit-box-shadow:inset 0 0 8px 0 #fff;-moz-box-shadow:inset 0 0 8px 0 #fff;box-shadow:inset 0 0 8px 0 #fff}.tab-panel .previous-coupon{background:#fff;color:#40026d;width:100%;max-height:150px;overflow-x:hidden;overflow-y:auto}.tab-panel .previous-coupon::-webkit-scrollbar{width:.6em}.tab-panel .previous-coupon::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px #000}.tab-panel .previous-coupon::-webkit-scrollbar-thumb{background-color:#000;outline:1px solid #000}.tab-panel .previous-coupon ul{list-style:none;margin:0;padding:0}.tab-panel .previous-coupon ul li{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;border-bottom:1px solid #000}.tab-panel .previous-coupon ul li .coins,.tab-panel .previous-coupon ul li .coupon-code,.tab-panel .previous-coupon ul li .serial-number{border-right:1px solid #000;padding:10px;font-size:20px;text-transform:uppercase}.tab-panel .previous-coupon ul li .coins.heading,.tab-panel .previous-coupon ul li .coupon-code.heading,.tab-panel .previous-coupon ul li .serial-number.heading{font-size:27px}.tab-panel .previous-coupon ul li .serial-number{-ms-flex:0 0 6%;flex:0 0 6%}.tab-panel .previous-coupon ul li .coupon-code{-ms-flex:0 0 63%;flex:0 0 63%}.tab-panel .previous-coupon ul li .coins{-ms-flex:0 0 24%;flex:0 0 24%}.tab-panel .points{background:#fff;width:50%;-ms-flex:0 0 50%;flex:0 0 50%;max-height:150px;overflow-x:hidden;overflow-y:auto}.tab-panel .points::-webkit-scrollbar{width:.6em}.tab-panel .points::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px #000}.tab-panel .points::-webkit-scrollbar-thumb{background-color:#000;outline:1px solid #000}\@media (min-width:992px){.tab-panel .points{max-height:180px}}.tab-panel .points ul{list-style:none}.tab-panel .points ul li label{cursor:pointer;position:relative;width:100%;display:block;padding:5px;color:#40026d;font-size:20px;border-bottom:1px solid #000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}\@media (min-width:992px){.tab-panel .points ul li label{font-size:27px}}.tab-panel .points ul li label.active,.tab-panel .points ul li label:hover{background:#a7a8aa}.tab-panel .points ul li label .checkmark:after{top:0;left:1px;width:8px;height:8px;border-radius:50%;background:#000}.tab-panel .points ul li input{margin:0 5px 0 0;position:absolute;opacity:0;cursor:pointer;height:0;width:0}.tab-panel .points ul li input:checked~.checkmark{background-color:#000}.tab-panel .points ul li input:checked~.checkmark:after{display:block}.tab-panel .points ul li .checkmark{position:absolute;top:calc((100% - 15px) /2);left:20px;height:10px;width:10px;background-color:#fff;border:3px solid #d4264b;border-radius:50%}.tab-panel .points ul li .checkmark:after{content:\"\";position:absolute;display:none}.tab-panel .show{display:-ms-flexbox!important;display:flex!important;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;-ms-flex-direction:column;flex-direction:column}"}},b=class{constructor(t){s(this,t),this.isDisabled=!1,this.isCollapsed=!1,this.openState=!1}async initMyComponent(){}toggleState(){this.isCollapsed=!this.isCollapsed}popupOpenTrigger(){this.popupElement.openPopup()}render(){return i("div",{class:"va-util"+(this.isCollapsed?" collapsed":"")},i("popup-model",{ref:s=>{this.popupElement=s}}),i("div",{class:"content",onClick:this.popupOpenTrigger.bind(this)},i("p",null,"PLAY GAME WIN COUPONS")),i("button",{class:"btn btn-minimize"+(this.isCollapsed?"":" active"),onClick:this.toggleState.bind(this)},"-"),i("button",{class:"btn btn-maximize"+(this.isCollapsed?" active":""),onClick:this.toggleState.bind(this)},"^"))}static get style(){return".hide{display:none!important}.va-util{position:fixed;right:20px;bottom:15px;z-index:99999;background:url(assets/img/game-joystic.png);width:100px;height:66px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;background-size:contain}\@media (min-width:768px){.va-util{width:200px;height:132px}}.va-util.collapsed{height:18px;bottom:0;background:#5f1f64;border-radius:3px;-ms-flex-pack:start;justify-content:flex-start;padding-left:15px;border-radius:20px 20px 0 0}.va-util.collapsed .content{display:none}.va-util.collapsed .btn-maximize{top:5px;background:none;right:8px}.va-util .content{height:100%;width:100%;padding:9px 15px 30px;-webkit-box-sizing:border-box;box-sizing:border-box;text-shadow:0 0 5px #333;text-align:center;cursor:pointer}\@media (min-width:768px){.va-util .content{padding:17px 30px 55px}}.va-util .content p{color:#fff;font-size:10px;line-height:1.4;font-family:cargoD,Trebuchet MS,Arial,sans-serif;margin:0;padding:0;text-align:center}\@media (min-width:768px){.va-util .content p{font-size:20px;line-height:1.4}}.va-util .btn{display:inline-block;-webkit-box-shadow:none;box-shadow:none;border:0;width:20px;height:20px;color:#fff;border-radius:50%;background:#5f1f64;margin-right:5px;position:absolute;top:-22px;right:0;display:none;cursor:pointer;font-size:20px;line-height:11px}\@media (min-width:768px){.va-util .btn{top:-20px}}.va-util .btn.active{display:inline-block}:focus{outline:none}"}};export{l as bubble_item,c as game_item,r as nav_item,u as popup_model,d as redeem_panel,p as score_board,m as tab_panel,b as va_util};