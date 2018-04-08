const regeneratorRuntime = require('../../libs/runtime');
let observer = require('../../libs/observer').observer;
let toJS = require('../../libs/mobx').toJS;
let {combine} = require('../../libs/combine');
let mediaController = require('../../components/mediaController/mediaController');
const app = getApp();

let page = {

    props: {
        getProgramme: app.globalData.index.getProgramme,
    },
    data: {},

    onLoad: async function (options) {
        console.log(options);
        this.setData({
            id: options.id
        });
        try {
            let programme = await this.props.getProgramme(options.id);
            wx.setNavigationBarTitle({
              title: programme.title
            });
            this.setData({
                programme
            });
            this.showMediaController && this.showMediaController(programme);
        } catch (e) {
            wx.showToast({
                title: '节目获取失败',
                icon: 'none',
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: this.data.programme.title,
            path: `/pages/detail/detail?id=${this.data.id}`,
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
    },

    back: function (e) {
        wx.navigateBack();
    }
};

combine(page, mediaController);

Page(observer(page));