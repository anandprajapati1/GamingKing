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

export { UUID as U, enumModuleState as e, getUserData as g, randomIntFromInterval as r, setUserData as s };
