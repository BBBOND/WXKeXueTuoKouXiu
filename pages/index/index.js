const regeneratorRuntime = require('../../libs/runtime');
let observer = require('../../libs/observer').observer;
let toJS = require('../../libs/mobx').toJS;
const app = getApp();

Page(observer({
    props: {
        index: app.globalData.index,
        user: app.globalData.user,
    },
    data: {
        showWelcome: false,
        page: 1,
        isLoading: false,
        errorMsg: undefined
    },

    showWelcome: function () {
        this.setData({showWelcome: true});
    },

    hideWelcome: function () {
        this.setData({showWelcome: false});
    },
    loadMore: async function (e) {
        if (!this.data.isLoading && !this.props.index.isIndexLast) {
            try {
                this.setData({isLoading: true});
                await this.props.index.programmePage({page: (this.data.page + 1)});
                this.setData({isLoading: false, page: this.data.page + 1, errorMsg: undefined});
            } catch (e) {
                console.log(e);
                this.setData({isLoading: false, errorMsg: e});
            }
        }
    },


    onLoad: function () {
        console.log('onLoad');
        this.showWelcome();
        console.log(toJS(this.props.index.programmeList));
        console.log(toJS(this.props.index.userInfo));
    },
}));