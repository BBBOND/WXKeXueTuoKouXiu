let observer = require('./libs/observer').observer;
let stores = require('./store/store');
const Towxml = require('/towxml/main');
let {currentMode, MODE} = require('./constants/API');

if (currentMode === MODE.ONLINE) {
    console.log = () => {
    };
    console.warn = () => {
    };
    console.error = () => {
    };
    console.debug = () => {
    };
    console.info = () => {
    };
    console.time = () => {
    };
    console.timeEnd = () => {
    };
}

App(observer({
    towxml: new Towxml(),
    globalData: {
        ...stores
    },
    onLaunch: function () {
        console.log('onLaunch');
        this.globalData.user.authUser();
        this.globalData.user.getUserInfo();
        this.globalData.index.countAll();
        this.globalData.index.programmePage({page: 1});
    },
    onShow: () => {
        console.log('onShow')
    },
    onHide: () => {  // 当小程序从前台进入后台
        console.log('onHide')
    },
}));