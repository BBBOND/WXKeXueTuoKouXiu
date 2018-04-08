let observer = require('./libs/observer').observer;
let stores = require('./store/store');
let {currentMode, MODE} = require('./constants/API');

// if (currentMode === MODE.ONLINE) {
//     console.log = () => {
//     };
//     console.warn = () => {
//     };
//     console.error = () => {
//     };
//     console.debug = () => {
//     };
//     console.info = () => {
//     };
//     console.time = () => {
//     };
//     console.timeEnd = () => {
//     };
// }

App(observer({
    globalData: {
        ...stores
    },
    onLaunch: function () {
        console.log('onLaunch');
        this.globalData.user.authUser();
        this.globalData.user.getUserInfo();
    },
    onShow: () => {
        console.log('onShow')
    },
    onHide: () => {  // 当小程序从前台进入后台
        console.log('onHide')
    },
}));