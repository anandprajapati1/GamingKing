var __awaiter=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))(function(o,s){function r(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n["throw"](e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new i(function(t){t(e.value)}).then(r,a)}u((n=n.apply(e,t||[])).next())})};var __generator=this&&this.__generator||function(e,t){var i={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},n,o,s,r;return r={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(r[Symbol.iterator]=function(){return this}),r;function a(e){return function(t){return u([e,t])}}function u(r){if(n)throw new TypeError("Generator is already executing.");while(i)try{if(n=1,o&&(s=r[0]&2?o["return"]:r[0]?o["throw"]||((s=o["return"])&&s.call(o),0):o.next)&&!(s=s.call(o,r[1])).done)return s;if(o=0,s)r=[r[0]&2,s.value];switch(r[0]){case 0:case 1:s=r;break;case 4:i.label++;return{value:r[1],done:false};case 5:i.label++;o=r[1];r=[0];continue;case 7:r=i.ops.pop();i.trys.pop();continue;default:if(!(s=i.trys,s=s.length>0&&s[s.length-1])&&(r[0]===6||r[0]===2)){i=0;continue}if(r[0]===3&&(!s||r[1]>s[0]&&r[1]<s[3])){i.label=r[1];break}if(r[0]===6&&i.label<s[1]){i.label=s[1];s=r;break}if(s&&i.label<s[2]){i.label=s[2];i.ops.push(r);break}if(s[2])i.ops.pop();i.trys.pop();continue}r=t.call(e,i)}catch(e){r=[6,e];o=0}finally{n=s=0}if(r[0]&5)throw r[1];return{value:r[0]?r[1]:void 0,done:true}}};System.register(["./p-9c067a18.system.js"],function(e){"use strict";var t,i,n,o;return{setters:[function(e){t=e.r;i=e.c;n=e.h;o=e.H}],execute:function(){function s(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var r;(function(e){e[e["INTRO"]=0]="INTRO";e[e["GAME"]=1]="GAME";e[e["RESULT"]=2]="RESULT";e[e["REDEEM"]=3]="REDEEM"})(r||(r={}));function a(){var e;e=JSON.parse(localStorage.getItem("user_data"));return e||new l}function u(e){localStorage.setItem("user_data",JSON.stringify(e))}var l=function(){function e(){this.points=0;this.couponList=[]}return e}();var c=e("bubble_item",function(){function e(e){t(this,e);this.isPaused=false;this.size=75;this.speed=1;this.val=5;this.bubbleDisappeared=i(this,"bubbleDisappeared",7);this.bubbleBurst=i(this,"bubbleBurst",7)}e.prototype.popBubble=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){if(!this.bubbleEl.classList.contains("burst")){this.bubbleEl.classList.add("burst");this.bubbleBurst.emit(this.val)}return[2]})})};e.prototype.togglePause=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){this.isPaused=e;if(!this.isPaused)this.rise(600,this.yPos);return[2]})})};e.prototype.rise=function(e,t){if(e===void 0){e=600}if(t===void 0){t=0}this.yPos=t;this.rafId=requestAnimationFrame(i.bind(this));function i(){if(this.isPaused){cancelAnimationFrame(this.rafId);return}if(this.yPos>=e){cancelAnimationFrame(this.rafId);this.bubbleEl.classList.add("burst");this.bubbleDisappeared.emit()}else{this.yPos+=2;this.bubbleEl.style.bottom=this.yPos+"px";this.rafId=requestAnimationFrame(i.bind(this))}}};e.prototype.reset=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){this.bubbleEl.style.bottom=0+"px";return[2]})})};e.prototype.componentDidLoad=function(){this.bubbleEl.style.left=s(1,90)+"%";this.bubbleEl.style.width=this.size+"px";this.bubbleEl.style.height=this.size+"px";this.rise()};e.prototype.render=function(){var e=this;return n("span",{class:"bubble",ref:function(t){e.bubbleEl=t},onClick:this.popBubble.bind(this)},n("span",{class:"bubble-point"},this.val))};Object.defineProperty(e,"style",{get:function(){return".hide{display:none!important}:host{font-family:cargoD,Trebuchet MS,Arial,sans-serif}.bubble{border-radius:50%;position:absolute;background:#2b28c4;bottom:0;left:calc(50% - 100px);top:auto;-webkit-transition:opacity .3s ease;transition:opacity .3s ease;opacity:1;cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-box-shadow:inset -25px -25px 40px rgba(0,0,0,.5);box-shadow:inset -25px -25px 40px rgba(0,0,0,.5)}.bubble-point{color:#fff;text-align:center}.bubble.burst{opacity:0}"},enumerable:true,configurable:true});return e}());var p=e("game_item",function(){function e(e){t(this,e);this.score=0;this.currentLevelNo=0;this.isPaused=false;this.isGameOver=false;this.currentLevelBubbleCounter=0;this.levels=[{speed:1e3,count:5,value:10,isLevelPassed:false},{speed:1e3,count:10,value:15,isLevelPassed:false}];this.exitingGame=i(this,"exitingGame",7)}e.prototype.startGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){this.resetLevel();this.currentLevel=this.levels[this.currentLevelNo];this.startLevel();return[2]})})};e.prototype.bubbleDisappearedHandler=function(){this.currentLevelBubbleCounter++;if(this.currentLevelBubbleCounter>=this.currentLevel.count){if(this.currentLevelNo+1<this.levels.length){this.levelUp()}else{this.saveScore()}}};e.prototype.saveScore=function(){this.isGameOver=true;this.gameElement.innerHTML="";this._userSavedData.points+=this.score;u(this._userSavedData)};e.prototype.onBubbleBurst=function(e){this.score+=e.detail};e.prototype.onNavigatedHandler=function(e){switch(e.detail){case r.GAME.toString():this.startGame();e.stopImmediatePropagation();break;case r.INTRO.toString():this.exitGame();break;default:this.exitGame();break}};e.prototype.resetLevel=function(){this.score=0;this.currentLevelNo=0;this.currentLevelBubbleCounter=0;this.isPaused=false;this.isGameOver=false};e.prototype.startLevel=function(){var e=this;this.levelAnim.classList.add("show");setTimeout(function(){e.levelAnim.classList.remove("show");e.gameElement.innerHTML="";var t=0;var i=setInterval(function(){if(!e.isPaused){var n=document.createElement("bubble-item");n.setAttribute("val",e.currentLevel.value.toString());e.gameElement.appendChild(n);t++}if(t>=e.currentLevel.count){clearInterval(i)}},e.currentLevel.speed)},1e3)};e.prototype.levelUp=function(){this.currentLevelBubbleCounter=0;this.levels[this.currentLevelNo].isLevelPassed=true;this.currentLevelNo++;this.currentLevel=this.levels[this.currentLevelNo];this.startLevel()};e.prototype.pauseGame=function(){this.isPaused=!this.isPaused;var e=0;do{this.gameElement.children[e].togglePause(this.isPaused);e++}while(e<this.gameElement.children.length)};e.prototype.exitGame=function(){this.gameElement.innerHTML="";this.exitingGame.emit()};e.prototype.componentWillLoad=function(){this._userSavedData=a()};e.prototype.render=function(){var e=this;return[n("div",{class:"score"},n("span",{class:"score-label"},"POINTS"),n("span",{class:"score-text"},this.score)),n("button",{class:(this.isPaused?"paused":"")+" pause-btn",onClick:this.pauseGame.bind(this)},"Pause"),n("div",{class:(this.isPaused?"paused":"")+" game-item",ref:function(t){return e.gameElement=t}}),function(){if(e.isPaused){return n("div",{class:"pause-overlay"},n("div",{class:e.isPaused?"":"hide"},n("button",{class:"resume-btn",onClick:e.pauseGame.bind(e)},"Resume"),n("button",{class:"home-btn",onClick:e.exitGame.bind(e)},"Home")))}else if(e.isGameOver)return n("score-board",{score:e.score})}(),n("span",{class:"level-start-anim",ref:function(t){return e.levelAnim=t}},this.currentLevelNo+1)]};Object.defineProperty(e,"style",{get:function(){return".hide{display:none!important}:host{display:block}.score{width:30%;height:auto;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row}.score .score-label,.score .score-text{color:#fff;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:20px;padding:0 5px}\@media (min-width:992px){.score .score-label,.score .score-text{font-size:20px}}.pause-btn{background:url(../../assets/img/close.png);background-size:contain;cursor:pointer;border:0;padding:0;z-index:9999;width:25px;height:25px;text-indent:9999px;position:absolute;right:10px;top:10px}\@media (min-width:768px){.pause-btn{width:30px;height:30px}}\@media (min-width:992px){.pause-btn{width:40px;height:40px}}.level-start-anim{visibility:hidden;width:100px;height:100px;padding:22px;position:absolute;left:50%;top:50%;border-radius:50%;background:#c5e86c;font-size:50px;color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transition:all 1s ease;transition:all 1s ease;opacity:0}.level-start-anim.show{visibility:visible;-webkit-transform:translate(-50%,-50%) scale(1.5);transform:translate(-50%,-50%) scale(1.5);opacity:1}.pause-overlay{background:rgba(0,0,0,.75);-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;height:100%;display:-ms-flexbox;display:flex;text-align:center;position:absolute;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.pause-overlay button{width:50px;height:50px;border-radius:50%;display:inline-block;margin:0 15px}"},enumerable:true,configurable:true});return e}());var h=e("nav_item",function(){function e(e){t(this,e);this.tooltipOpened=false;this.onNavigated=i(this,"onNavigated",7)}e.prototype.goHome=function(){this.onNavigated.emit(r.INTRO.toString())};e.prototype.replay=function(){this.onNavigated.emit(r.GAME.toString())};e.prototype.share=function(){this.tooltipOpened=!this.tooltipOpened};e.prototype.render=function(){return n("div",{class:"nav-item"},n("ul",null,n("li",{class:"home"},n("button",{onClick:this.goHome.bind(this)})),n("li",{class:"replay"},n("button",{onClick:this.replay.bind(this)})),n("li",{class:"share"},n("button",{onClick:this.share.bind(this)}),n("div",{class:(this.tooltipOpened?"open":"")+"tooltip"},n("span",{class:"social-icon facebook",onClick:function(){window.open("https://www.facebook.com/sharer/sharer.php?title=I won redeemable points to purchase the amazing unilever products on great discount!!&u="+encodeURIComponent(location.href),"width=320,height=320");return false}},"Facebook"),n("br",null),n("span",{class:"social-icon twitter",onClick:function(){window.open("http://twitter.com/share?url="+encodeURIComponent(location.href)+"&text=I won redeemable points to purchase the amazing unilever products on great discount!!","left=0,top=0,width=320,height=320,personalbar=0,toolbar=0,scrollbars=0,resizable=0");return false}},"Twitter")))))};Object.defineProperty(e,"style",{get:function(){return".hide{display:none!important}:host{font-family:cargoD,Trebuchet MS,Arial,sans-serif}:host .tooltip{display:none}:host .tooltip .open{display:block}.nav-item ul{list-style:none;width:100%;margin:0;padding:0}.nav-item ul li{position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;margin:15px 10px 25px}.nav-item ul li button{display:block;height:60px;width:60px;font-size:20px;color:#5f1f64;text-transform:uppercase;border-radius:50%;background:#fff;cursor:pointer;border:none}.nav-item ul li button:hover{-webkit-box-shadow:0 0 14px 0 #fff;box-shadow:0 0 14px 0 #fff}.nav-item ul li button:before{content:\"\";width:75%;display:block;position:relative;margin:0 auto}.nav-item ul li.home button:before{content:url(assets/svg/home.svg)}.nav-item ul li.replay button:before{content:url(assets/svg/replay.svg)}.nav-item ul li.share button:before{content:url(assets/svg/share.svg);margin-top:7px}"},enumerable:true,configurable:true});return e}());var d=e("popup_model",function(){function e(e){t(this,e);this.isOpened=false;this.currentPopup=r.INTRO;this.totalPoints=0}e.prototype.skipIntro=function(){this.currentPopup=r.GAME;this._gameItem.startGame()};e.prototype.openRedemption=function(){this.currentPopup=r.REDEEM};e.prototype.closePopup=function(){this.isOpened=false};e.prototype.openPopup=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){this.isOpened=true;this.currentPopup=r.INTRO;return[2]})})};e.prototype.onGameOver=function(){this._userData=a();this.totalPoints=this._userData.points;this.currentPopup=r.INTRO};e.prototype.onNavigatedHandler=function(e){switch(e.detail){case r.INTRO.toString():this.openPopup();break;default:this.openPopup();break}};e.prototype.componentWillLoad=function(){this._userData=a();this.totalPoints=this._userData.points};e.prototype.render=function(){var e=this;return n("div",{class:(this.isOpened?"open":"")+" popup-model"},n("div",{class:"popup-model-container"},n("button",{class:(this.currentPopup==r.INTRO||this.currentPopup==r.REDEEM?"":"hide")+" popup-model-close",onClick:this.closePopup.bind(this)}),n("div",{class:"popup-model-content"},n("div",{class:(this.currentPopup==r.INTRO?"":"hide")+" intro-panel"},n("div",{class:"white-circle"},n("h1",null,"Welcome to game zone!"),n("h2",null,"You can play game and get coupons everyday"),n("button",{class:"skip-intro-btn",onClick:this.skipIntro.bind(this)},"Play Game"),n("div",{class:"points"},n("span",{class:"points-label"},"Points : "),n("span",{class:"points-text"},this.totalPoints)),n("button",{class:"redeem-btn",onClick:this.openRedemption.bind(this)},"Redeem Now")),n("div",{class:"disclaimer-note"},n("p",null,"The winning points are being saved in your machine local storage, so please be conscious before remove the system cache."))),n("div",{class:(this.currentPopup==r.GAME?"":"hide")+" first-screen"},n("game-item",{ref:function(t){return e._gameItem=t}})),n("div",{class:(this.currentPopup==r.REDEEM?"":"hide")+" redeem-screen"},n("redeem-panel",{ref:function(t){return e._redeemPanel=t}})))))};Object.defineProperty(e,"style",{get:function(){return".hide{display:none!important}.popup-model{font-family:cargoD,Trebuchet MS,Arial,sans-serif;color:#fff;display:none;position:fixed;left:0;top:0;background:rgba(0,0,0,.5);width:100%;height:100%;z-index:9999}.popup-model.open{display:block}.popup-model-close{background:url(assets/img/close.png);background-size:contain;cursor:pointer;border:0;padding:0;z-index:9999;width:25px;height:25px;text-indent:9999px;position:absolute;right:10px;top:10px}\@media (min-width:768px){.popup-model-close{width:30px;height:30px}}\@media (min-width:992px){.popup-model-close{width:40px;height:40px}}.popup-model-container{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;width:95%;height:95vh;max-width:95%;max-height:95vh;overflow:hidden;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);position:absolute;left:50%;top:50%;border-radius:10px;max-width:355px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:10px 7px;background:url(assets/img/gameBg.png) no-repeat;background-color:#eaa041;background-size:125%;background-position:50%}\@media (min-width:768px){.popup-model-container{background-size:cover;background-position:50%;max-width:600px}}\@media (min-width:992px){.popup-model-container{background-size:cover;background-position:50%;max-width:930px}}.popup-model-container .intro-panel{border:0 solid #97d700}.popup-model-container .intro-panel .white-circle{border:0 solid #fff;width:310px;height:auto;padding:20px 20px 15px;box-shadow:inset 0 0 35px 15px #fff!important;-webkit-box-shadow:inset 0 0 35px 15px #fff!important;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:25% 25% 25% 25%;background:rgba(63,1,108,.71);position:absolute;top:calc(50% - 35px);left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}\@media (min-width:768px){.popup-model-container .intro-panel .white-circle{width:450px;padding:50px 50px 30px}}\@media (min-width:992px){.popup-model-container .intro-panel .white-circle{width:620px;padding:75px 70px 20px;min-height:420px;top:calc(50% - 55px)}}.popup-model-container .intro-panel .disclaimer-note{position:fixed;bottom:0;top:auto;left:10px;right:10px;height:50px}\@media (min-width:768px){.popup-model-container .intro-panel .disclaimer-note{left:20px;right:20px;height:50px}}\@media (min-width:992px){.popup-model-container .intro-panel .disclaimer-note{left:30px;right:30px;height:30px}}.popup-model-container .intro-panel .disclaimer-note p{font:normal 10px arial}.popup-model-container .first-screen{background:#5f1f64;padding:10px;border-radius:10px;-webkit-box-sizing:border-box;box-sizing:border-box;box-shadow:inset 0 0 5px 3px #fff!important;-webkit-box-shadow:inset 0 0 5px 3px #fff!important}.popup-model-content{text-align:center;position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex:1 0;flex:1 0}.popup-model-content>div{-ms-flex:1 0 100%;flex:1 0 100%;width:100%}.popup-model h1{font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-weight:400;font-size:20px;margin:0 0 15px;padding:0;line-height:1;text-transform:uppercase}\@media (min-width:768px){.popup-model h1{font-size:27px}}\@media (min-width:992px){.popup-model h1{font-size:40px}}.popup-model h2{font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-weight:400;font-size:14px;text-transform:uppercase;margin:0 0 20px;padding:0;line-height:1;padding:0 35px}\@media (min-width:768px){.popup-model h2{font-size:20px;padding:0 35px}}.popup-model .skip-intro-btn{background:url(assets/img/gamePlay.png) transparent no-repeat;background-size:contain;cursor:pointer;color:#fff;font-size:14px;width:67px;height:46px;padding:0;border:0;text-indent:-2000px;margin:10px 0}\@media (min-width:768px){.popup-model .skip-intro-btn{width:100px;height:80px;margin:10px 0 20px}}\@media (min-width:992px){.popup-model .skip-intro-btn{width:134px;height:92px;margin:10px 0 30px}}.popup-model .points{margin-bottom:10px}.popup-model .points span{color:#fff;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:14px;text-transform:uppercase}\@media (min-width:768px){.popup-model .points span{font-size:27px}}\@media (min-width:992px){.popup-model .points span{font-size:27px}}.popup-model .redeem-btn{background:#d2264e;border-radius:10px;border-style:solid;border-width:3px;border-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;cursor:pointer;text-transform:none;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:14px;line-height:1;padding:5px 10px;text-transform:uppercase}\@media (min-width:992px){.popup-model .redeem-btn{font-size:27px}}.popup-model .redeem-screen{background:url(assets/img/gameBg.png) no-repeat;background-size:110%;background-position:50%;width:100%;overflow:scroll;margin:0 auto;padding:7px 0 7px 8px}.popup-model .redeem-screen::-webkit-scrollbar{width:1em}.popup-model .redeem-screen::-webkit-scrollbar-track{box-shadow:inset 0 0 6px #d4264b;-webkit-box-shadow:inset 0 0 6px #d4264b}.popup-model .redeem-screen::-webkit-scrollbar-thumb{background-color:#d4264b;outline:1px solid #d4264b}:focus{outline:none}"},enumerable:true,configurable:true});return e}());var b=e("redeem_panel",function(){function e(e){t(this,e);this.dataUpdated=false;this.productJson=[]}e.prototype.refreshScore=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){this._userData=a();return[2]})})};e.prototype.componentWillLoad=function(){this.refreshScore()};e.prototype.componentDidLoad=function(){var e=this;var t=window.location+"home.productfeed.json";if(window.location.hostname==="localhost"){t=window.location+"/assets/demo.json"}fetch(t).then(function(e){return e.json()}).then(function(t){for(var i=0;i<4;i++){e.productJson.push({name:t.locales[0].products.product[i].name,image:t.locales[0].products.product[i].imageUrl,url:t.locales[0].products.product[i].productPageUrl})}e.dataUpdated=true})};e.prototype.render=function(){return n("div",{class:"redeem-panel"},n("div",{class:"redeem-point"},"Points:- ",n("span",{class:""},this._userData.points)),n("tab-panel",null),n("div",{class:"product-section"},n("div",{class:"title"},"You can use coupon code in below product also"),this.dataUpdated&&this.productJson.map(function(e){return n("div",{class:"product-item"},n("a",{href:e.url,target:"_black"},n("img",{src:e.image,title:e.name,alt:e.name}),n("span",null,e.name)))})),n("nav-item",null))};Object.defineProperty(e,"style",{get:function(){return".hide{display:none!important}.redeem-panel{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-direction:column;flex-direction:column;width:100%;border-radius:10px;background:rgba(95,31,100,.9);-webkit-box-shadow:inset 0 0 14px 0 #fff;-moz-box-shadow:inset 0 0 14px 0 #fff;box-shadow:inset 0 0 14px 0 #fff}.redeem-point{font-size:27px;line-height:30px;text-transform:uppercase;margin:25px auto 5px}\@media (min-width:992px){.redeem-point{font-size:40px}}.product-section{background:rgba(50,16,53,.7)}.product-section .title{font-size:30px;text-transform:uppercase;text-align:center;margin:30px 0}.product-section .product-item{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;width:calc((100% - 20px)/ 5);margin:0 20px 30px}.product-section .product-item a{color:#fff;text-transform:uppercase;text-decoration:none;font-size:20px}.product-section .product-item img{max-width:100%;border:2px solid #fff;border-radius:10px}"},enumerable:true,configurable:true});return e}());var f=e("score_board",function(){function e(e){t(this,e);this.isVisible=false;this.score=0}e.prototype.render=function(){return n(o,null,n("div",{class:"score-board-parent"},n("div",{class:"white-circle"},n("div",{class:"score-board"},n("h1",null,"Game Over"),n("h2",null,n("span",null,"Points : "),this.score),n("nav-item",null)))))};Object.defineProperty(e,"style",{get:function(){return".hide{display:none!important}.score-board-parent{width:calc(100% + 20px);height:calc(100% + 20px);margin:-42px -18px -20px;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;text-align:center;position:absolute;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;background:url(assets/img/gameBg.png) no-repeat;background-color:#eaa041;background-size:125%;background-position:50%}\@media (min-width:768px){.score-board-parent{background-size:cover;background-position:50%;max-width:600px}}\@media (min-width:992px){.score-board-parent{background-size:cover;background-position:50%;max-width:930px}}.score-board-parent .white-circle{border:0 solid #fff;width:310px;height:auto;padding:20px 20px 15px;box-shadow:inset 0 0 35px 15px #fff!important;-webkit-box-shadow:inset 0 0 35px 15px #fff!important;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:25% 25% 25% 25%;background:rgba(63,1,108,.71);position:absolute;top:calc(50% - 35px);left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}\@media (min-width:768px){.score-board-parent .white-circle{width:450px;padding:50px 50px 30px}}\@media (min-width:992px){.score-board-parent .white-circle{width:620px;padding:75px 70px 20px;min-height:420px;top:calc(50% - 55px)}}.score-board-parent .white-circle .nav-item{background:none}.score-board-parent h1{color:#fff;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:40px;font-weight:400}\@media (min-width:992px){.score-board-parent h1{font-size:40px}}.score-board-parent h2{color:#fff;font-family:cargoD,Trebuchet MS,Arial,sans-serif;font-size:14px;font-weight:400}\@media (min-width:768px){.score-board-parent h2{font-size:27px}}\@media (min-width:992px){.score-board-parent h2{font-size:27px}}"},enumerable:true,configurable:true});return e}());var m=e("tab_panel",function(){function e(e){t(this,e);this.isDisabled=true;this.isCouponVisible=false;this.tabs=[{tid:1,title:"Redeem coupon"},{tid:2,title:"Earned coupons"}];this.point_CoinMapper=[{point:100,coin:10},{point:200,coin:20},{point:300,coin:30},{point:400,coin:40},{point:500,coin:50}];this.activePanel=1}e.prototype.pointSelected=function(e){this.pointSelectedInput=e;this.isDisabled=this._userData.points<this.pointSelectedInput.point;this.isCouponVisible=false};e.prototype.tabClicked=function(e){this.activePanel=e};e.prototype.createCoupon=function(){var e=(new Date).getTime();var t="xxxxxxxxxxxx".replace(/[xy]/g,function(t){var i=(e+Math.random()*16)%16|0;e=Math.floor(e/16);return(t=="x"?i:i&3|8).toString(16)});this._userData.couponList.push({code:t,coin:this.pointSelectedInput.coin});this.isCouponVisible=true;this.redeemCouponCode.innerHTML=t;this._userData.points-=this.pointSelectedInput.point;u(this._userData)};e.prototype.componentWillLoad=function(){this._userData=a()};e.prototype.render=function(){var e=this;return n("div",{class:"tab-panel"},n("ul",{class:"tab-panel-navigation"},this.tabs.map(function(t){return n("li",{"data-link":t.tid,class:(e.activePanel==t.tid?"active":"")+" tab-panel-item",onClick:e.tabClicked.bind(e,t.tid)},t.title)})),n("div",{class:"tab-panel-container"},this.tabs.map(function(t){return n("div",{"data-tab-id":t.tid,class:(e.activePanel==t.tid?"open":"")+" tab-panel-content"},t.tid==1?[n("div",{class:(e.isDisabled?"disabled":"")+" redeem"},n("button",{class:(e.isCouponVisible?"":"show")+" redeem-button",onClick:e.createCoupon.bind(e)},"Click to redeem"),n("div",{class:(e.isCouponVisible?"show":"")+" redeem-coupon"},n("span",null,"Coupon"),n("div",{class:"redeem-coupon-code",ref:function(t){return e.redeemCouponCode=t}}))),n("div",{class:"points"},n("ul",null,e.point_CoinMapper.map(function(t){return n("li",null,n("label",null,n("input",{type:"radio",name:"point",onChange:e.pointSelected.bind(e,t)}),t.point," Points = ",t.coin," Coins",n("span",{class:"checkmark"})))})))]:n("div",{class:"previous-coupon"},n("ul",null,n("li",null,n("div",{class:"heading serial-number"},"Sl"),n("div",{class:"heading coupon-code"},"Coupons Code"),n("div",{class:"heading coins"},"Coins")),e._userData.couponList.length?e._userData.couponList.map(function(e,t){return n("li",null,n("div",{class:"serial-number"},t),n("div",{class:"coupon-code"},e.code),n("div",{class:"coins"},e.coin))}):n("li",{class:"no-coupons"},"No Coupons"))))})))};Object.defineProperty(e,"style",{get:function(){return".hide{display:none!important}.tab-panel{width:calc(100% - 40px);margin:20px auto}.tab-panel *{margin:0 0 .5px 0;padding:0}.tab-panel :focus{outline:none}.tab-panel-navigation{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;list-style:none}.tab-panel-navigation li{padding:10px 15px;-ms-flex:1 1 50%;flex:1 1 50%;background:#9e18a9;cursor:pointer;text-align:center;font-size:20px;text-transform:uppercase}\@media (min-width:768px){.tab-panel-navigation li{font-size:27px}}\@media (min-width:992px){.tab-panel-navigation li{font-size:40px}}.tab-panel-navigation li:first-child{border-top-left-radius:10px}.tab-panel-navigation li:last-child{border-top-right-radius:10px}.tab-panel-navigation li.active{background:#d4264b}.tab-panel-content{display:none;background:#9e18a9;padding:20px;border-bottom-left-radius:10px;border-bottom-right-radius:10px}.tab-panel-content.open{background:#d4264b;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between}.tab-panel .redeem{margin:0 0 0 30px;width:200px;-ms-flex:0 0 200px;flex:0 0 200px;height:200px;border-radius:50%;background:#75205f;-webkit-box-shadow:inset 0 0 35px 20px #fff;-moz-box-shadow:inset 0 0 35px 20px #fff;box-shadow:inset 0 0 35px 20px #fff;opacity:1;cursor:auto;overflow:hidden}.tab-panel .redeem.disabled{pointer-events:none;background:#a7a8aa}.tab-panel .redeem-button{background:none;border:0;color:#fff;cursor:pointer}.tab-panel .redeem-button,.tab-panel .redeem-coupon{width:100%;height:100%;display:none;font-size:30px;text-transform:uppercase;font-family:cargoD,Trebuchet MS,Arial,sans-serif}.tab-panel .redeem-coupon{text-align:center}.tab-panel .redeem-coupon-code{width:100%;background:#000;padding:5px;margin-top:5px;-webkit-box-shadow:inset 0 0 8px 0 #fff;-moz-box-shadow:inset 0 0 8px 0 #fff;box-shadow:inset 0 0 8px 0 #fff}.tab-panel .previous-coupon{background:#fff;color:#40026d;width:100%;max-height:150px;overflow-x:hidden;overflow-y:auto}.tab-panel .previous-coupon::-webkit-scrollbar{width:.6em}.tab-panel .previous-coupon::-webkit-scrollbar-track{box-shadow:inset 0 0 6px #000;-webkit-box-shadow:inset 0 0 6px #000}.tab-panel .previous-coupon::-webkit-scrollbar-thumb{background-color:#000;outline:1px solid #000}.tab-panel .previous-coupon ul{list-style:none;margin:0;padding:0}.tab-panel .previous-coupon ul li{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;border-bottom:1px solid #000}.tab-panel .previous-coupon ul li .coins,.tab-panel .previous-coupon ul li .coupon-code,.tab-panel .previous-coupon ul li .serial-number{border-right:1px solid #000;padding:10px;font-size:20px;text-transform:uppercase}.tab-panel .previous-coupon ul li .coins.heading,.tab-panel .previous-coupon ul li .coupon-code.heading,.tab-panel .previous-coupon ul li .serial-number.heading{font-size:27px}.tab-panel .previous-coupon ul li .serial-number{-ms-flex:0 0 6%;flex:0 0 6%}.tab-panel .previous-coupon ul li .coupon-code{-ms-flex:0 0 63%;flex:0 0 63%}.tab-panel .previous-coupon ul li .coins{-ms-flex:0 0 24%;flex:0 0 24%}.tab-panel .points{background:#fff;width:50%;-ms-flex:0 0 50%;flex:0 0 50%;max-height:150px;overflow-x:hidden;overflow-y:auto}.tab-panel .points::-webkit-scrollbar{width:.6em}.tab-panel .points::-webkit-scrollbar-track{box-shadow:inset 0 0 6px #000;-webkit-box-shadow:inset 0 0 6px #000}.tab-panel .points::-webkit-scrollbar-thumb{background-color:#000;outline:1px solid #000}\@media (min-width:992px){.tab-panel .points{max-height:180px}}.tab-panel .points ul{list-style:none}.tab-panel .points ul li label{cursor:pointer;position:relative;width:100%;display:block;padding:5px;color:#40026d;font-size:20px;border-bottom:1px solid #000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}\@media (min-width:992px){.tab-panel .points ul li label{font-size:27px}}.tab-panel .points ul li label.active,.tab-panel .points ul li label:hover{background:#a7a8aa}.tab-panel .points ul li label .checkmark:after{top:0;left:1px;width:8px;height:8px;border-radius:50%;background:#000}.tab-panel .points ul li input{margin:0 5px 0 0;position:absolute;opacity:0;cursor:pointer;height:0;width:0}.tab-panel .points ul li input:checked~.checkmark{background-color:#000}.tab-panel .points ul li input:checked~.checkmark:after{display:block}.tab-panel .points ul li .checkmark{position:absolute;top:calc((100% - 15px) /2);left:20px;height:10px;width:10px;background-color:#fff;border:3px solid #d4264b;border-radius:50%}.tab-panel .points ul li .checkmark:after{content:\"\";position:absolute;display:none}.tab-panel .show{display:-ms-flexbox!important;display:flex!important;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;-ms-flex-direction:column;flex-direction:column}"},enumerable:true,configurable:true});return e}());var v=e("va_util",function(){function e(e){t(this,e);this.isDisabled=false;this.isCollapsed=false;this.openState=false}e.prototype.initMyComponent=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})};e.prototype.toggleState=function(){this.isCollapsed=!this.isCollapsed};e.prototype.popupOpenTrigger=function(){this.popupElement.openPopup()};e.prototype.render=function(){var e=this;return n("div",{class:"va-util"+(this.isCollapsed?" collapsed":"")},n("popup-model",{ref:function(t){e.popupElement=t}}),n("div",{class:"content",onClick:this.popupOpenTrigger.bind(this)},n("p",null,"PLAY GAME WIN COUPONS")),n("button",{class:"btn btn-minimize"+(!this.isCollapsed?" active":""),onClick:this.toggleState.bind(this)},"-"),n("button",{class:"btn btn-maximize"+(!this.isCollapsed?"":" active"),onClick:this.toggleState.bind(this)},"^"))};Object.defineProperty(e,"style",{get:function(){return".hide{display:none!important}.va-util{position:fixed;right:20px;bottom:15px;z-index:99999;background:url(assets/img/game-joystic.png);width:100px;height:66px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;background-size:contain}\@media (min-width:768px){.va-util{width:200px;height:132px}}.va-util.collapsed{height:18px;bottom:0;background:#5f1f64;border-radius:3px;-ms-flex-pack:start;justify-content:flex-start;padding-left:15px;border-radius:20px 20px 0 0}.va-util.collapsed .content{display:none}.va-util.collapsed .btn-maximize{top:5px;background:none;right:8px}.va-util .content{height:100%;width:100%;padding:9px 15px 30px;-webkit-box-sizing:border-box;box-sizing:border-box;text-shadow:0 0 5px #333;text-align:center;cursor:pointer}\@media (min-width:768px){.va-util .content{padding:17px 30px 55px}}.va-util .content p{color:#fff;font-size:10px;line-height:1.4;font-family:cargoD,Trebuchet MS,Arial,sans-serif;margin:0;padding:0;text-align:center}\@media (min-width:768px){.va-util .content p{font-size:20px;line-height:1.4}}.va-util .btn{display:inline-block;-webkit-box-shadow:none;box-shadow:none;border:0;width:20px;height:20px;color:#fff;border-radius:50%;background:#5f1f64;margin-right:5px;position:absolute;top:-22px;right:0;display:none;cursor:pointer;font-size:20px;line-height:11px}\@media (min-width:768px){.va-util .btn{top:-20px}}.va-util .btn.active{display:inline-block}:focus{outline:none}"},enumerable:true,configurable:true});return e}())}}});