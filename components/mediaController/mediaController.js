const regeneratorRuntime = require('../../libs/runtime');
let app = getApp();
let toJS = require('../../libs/mobx').toJS;

module.exports = {
    props: {
        index: app.globalData.index,
        play: app.globalData.index.play,
        pause: app.globalData.index.pause,
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
            }
        } else if (mediaController._id && !currentProgramme) {
            this.props.play(mediaController);
            console.log("play mediaController");
        }
    },
};