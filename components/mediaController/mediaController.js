const regeneratorRuntime = require('../../libs/runtime');
let app = getApp();
let toJS = require('../../libs/mobx.min').toJS;

module.exports = {
    props: {
        index: app.globalData.index,
        play: app.globalData.index.play,
        pause: app.globalData.index.pause,
        stop: app.globalData.index.stop,
    },
    data: {
        mediaController: {
            visible: false,
        },
    },

    showMediaController: function (programme) {
        if (programme) {
            this.setData({
                mediaController: {
                    ...programme,
                    visible: true,
                }
            });
        } else {
            this.setData({
                mediaController: {
                    visible: true,
                }
            });
        }
    },

    __clickController: function (e) {
        console.log("__clickController");
        let {currentProgramme, playState} = this.props.index;
        let {mediaController} = this.data;
        if (currentProgramme
            && mediaController._id
            && mediaController._id !== currentProgramme._id) {
            this.props.play(mediaController);
            console.log("play mediaController");
        } else if (currentProgramme
            && mediaController._id
            && mediaController._id === currentProgramme._id) {
            switch (playState) {
                case -1:
                    this.props.play(mediaController);
                    console.log("play mediaController");
                    break;
                case 0:
                    this.props.play();
                    console.log("play");
                    break;
                case 1:
                    this.props.pause();
                    console.log("pause");
                    break;
                case 2:
                    this.props.stop();
                    console.log("stop");
                    break;
                case 3:
                    this.props.play(mediaController);
                    console.log("play");
                    break;
            }
        } else if (!mediaController._id && currentProgramme) {
            switch (playState) {
                case -1:
                    this.props.play(currentProgramme);
                    console.log("play currentProgramme");
                    break;
                case 0:
                    this.props.play();
                    console.log("play");
                    break;
                case 1:
                    this.props.pause();
                    console.log("pause");
                    break;
                case 2:
                    this.props.stop();
                    console.log("stop");
                    break;
            }
        } else if (mediaController._id && !currentProgramme) {
            this.props.play(mediaController);
            console.log("play mediaController");
        }
    },
    __toDetail: function (e) {
        let {_id, type} = this.data.mediaController;
        let {currentProgramme} = this.props.index;
        if (_id && currentProgramme && currentProgramme._id === _id) {
            return;
        } else if (_id && type !== "media" && currentProgramme && currentProgramme._id) {
            wx.redirectTo({
              url: `/pages/detail/detail?id=${_id}`
            });
        } else if (!_id && currentProgramme && currentProgramme._id) {
            wx.navigateTo({
                url: `/pages/detail/detail?id=${currentProgramme._id}`
            });
        }
    }
};