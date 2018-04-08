const regeneratorRuntime = require('../../libs/runtime');
let observer = require('../../libs/observer').observer;
let toJS = require('../../libs/mobx').toJS;
const app = getApp();

Page(observer({
    props: {
        index: app.globalData.index,
        user: app.globalData.user,
        refresh: app.globalData.index.refresh,
        loadMore: app.globalData.index.loadMore,
    },
    data: {
        showWelcome: false,
        isLoading: false,
        errorMsg: undefined
    },

    showWelcome: function () {
        this.setData({showWelcome: true});
    },

    hideWelcome: function () {
        this.setData({showWelcome: false});
    },
    onReachBottom: async function (e) {
        if (!this.data.isLoading && this.props.index.currentPage <= this.props.index.totalPage) {
            try {
                this.setData({isLoading: true});
                await this.props.loadMore({page: (this.props.index.currentPage + 1)});
                this.setData({isLoading: false, errorMsg: ""});
            } catch (e) {
                console.log(e);
                this.setData({isLoading: false, errorMsg: e});
            }
        }
    },
    onPullDownRefresh: async function (e) {
        try {
            await this.props.refresh({});
            setTimeout(wx.stopPullDownRefresh, 500);
        } catch (e) {
            wx.showToast({
                title: '好像出了点问题',
                icon: 'none'
            })
        }
    },
    onLoad: function () {
        this.showWelcome();
        this.props.refresh({});
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '珍惜你的每一个为什么',
            path: '/pages/index/index',
            success: function (res) {
                wx.showToast({
                    title: '转发成功',
                })
            },
            fail: function (res) {
                wx.showToast({
                    title: '转发失败',
                    icon: 'none',
                })
            }
        }
    }
}));