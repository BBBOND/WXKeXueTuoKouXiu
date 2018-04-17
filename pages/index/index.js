const regeneratorRuntime = require('../../libs/runtime');
let observer = require('../../libs/observer').observer;
let toJS = require('../../libs/mobx.min').toJS;
let {combine} = require('../../libs/combine');
let mediaController = require('../../components/mediaController/mediaController');
const app = getApp();

let page = {
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

    onReachBottom: async function () {
        if (!this.data.isLoading && this.props.index.currentPage <= this.props.index.totalPage) {
            app.doWithCatch(async () => {
                this.setData({isLoading: true});
                await this.props.loadMore({page: (this.props.index.currentPage + 1)});
                this.setData({isLoading: false});
            }, true, (e) => {
                console.log(e);
                this.setData({isLoading: false});
            });
        }
    },

    onPullDownRefresh: async function (e) {
        app.doWithCatch(async () => {
            await this.props.refresh({});
            setTimeout(wx.stopPullDownRefresh, 500);
        }, true, () => {
            setTimeout(wx.stopPullDownRefresh, 500);
        });
    },

    onLoad: function () {
        app.doWithLoading(async () => {
            await this.props.refresh({});
        }, "稍等一下", true, undefined, this.showWelcome);
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
};

combine(page, mediaController);

Page(observer(page));