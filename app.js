const regeneratorRuntime = require('./libs/runtime');
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
    success: function (title, duration) {
        title = title || '';
        if (typeof title !== 'string') {
            title = JSON.stringify(title);
        }
        wx.showToast({
            title: title,
            icon: 'success',
            duration: duration || 1500
        });
    },
    info: function (title, duration) {
        title = title || '';
        if (typeof title !== 'string') {
            title = JSON.stringify(title);
        }
        wx.showToast({
            title: title,
            icon: 'none',
            duration: duration || 1500
        });
    },
    err: function (title, duration) {
        title = title || '';
        if (typeof title !== 'string') {
            title = JSON.stringify(title);
        }
        wx.showToast({
            title: title,
            icon: 'none',
            duration: duration || 1500
        });
    },
    loading: function (title) {
        title = title || '';
        if (typeof title !== 'string') {
            title = JSON.stringify(title);
        }
        wx.showLoading({
            title: title || "请求中",
        });
    },
    hideLoading: function () {
        wx.hideLoading();
    },
    doWithCatch: async (func, showToast = true, onErr) => {
        try {
            wx.showNavigationBarLoading();
            func && await func();
            wx.hideNavigationBarLoading();
        } catch (e) {
            console.error(e);
            onErr && await onErr(e);
            showToast && getApp().err(e);
            wx.hideNavigationBarLoading();
        }
    },
    doWithLoading: async (func, msg, showErrToast = false, onErr, afterSuccess) => {
        try {
            getApp().loading(msg);
            // wx.showNavigationBarLoading();
            await func();
            getApp().hideLoading();
            // wx.hideNavigationBarLoading();
            afterSuccess && await afterSuccess();
        } catch (e) {
            console.error(e);
            getApp().hideLoading();
            // wx.hideNavigationBarLoading();
            showErrToast && getApp().err(e);
            onErr && onErr(e)
        }
    },
}));