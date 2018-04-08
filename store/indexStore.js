const regeneratorRuntime = require('../libs/runtime');
let extendObservable = require('../libs/mobx').extendObservable;
let moment = require('../libs/moment');
let {searchProgramme, getProgrammeReq} = require('../service/request');
const app = getApp();

/** ================= 初始化值 ================== **/
const initialState = {
    programmeList: [],
    count: 0,
    currentPage: 0,
    totalPage: 0,
    currentProgramme: undefined,
    playState: 0, // -1错误、0暂停、1播放、2加载中、3结束
};

/** ================= cache白名单 ================== **/
const indexWhiteList = [
    // 'programmeList', 'count', 'currentPage', 'totalPage'
    // 'currentProgramme',
];

const doSomething = (pList) => pList.map((item) => {
    item.summary = item.summary.replace(' [&#8230;]', '...');
    return item;
});

class IndexStore {
    constructor() {
        extendObservable(this, {
            programmeList: this.store && this.store.programmeList || initialState.programmeList,
            count: this.store && this.store.count || initialState.count,
            currentPage: this.store && this.store.currentPage || initialState.currentPage,
            totalPage: this.store && this.store.totalPage || initialState.totalPage,
            currentProgramme: this.store && this.store.currentProgramme || initialState.currentProgramme,
            playState: initialState.playState,
        });
    }

    refresh = async ({search = '', categories = '', type = '', size = 20, dateSort = -1}) => {
        let result = (await searchProgramme(search, categories, type, 1, size, dateSort));
        this.programmeList = doSomething(result.data);
        this.count = result.count;
        this.currentPage = result.page;
        this.totalPage = result.total;
    };

    loadMore = async ({search = '', categories = '', type = '', page = 1, size = 20, dateSort = -1}) => {
        if (page === this.currentPage || (this.totalPage && this.currentPage && this.currentPage === this.totalPage)) {
            return;
        } else {
            let result = (await searchProgramme(search, categories, type, page, size, dateSort));
            let programmeList = doSomething(result.data);
            if (page <= 1) {
                this.programmeList = programmeList;
            } else {
                this.programmeList = this.programmeList.concat(programmeList);
            }
            if (result) {
                this.count = result.count;
                this.currentPage = result.page;
                this.totalPage = result.total;
            }
        }
    };

    getProgramme = async (id) => {
        return await getProgrammeReq(id);
    };

    play = (programme) => {
        const bam = wx.getBackgroundAudioManager();
        if (programme) {
            this.currentProgramme = programme;
            bam.title = programme.title;
            bam.epname = '科学脱口秀';
            bam.singer = programme.author;
            bam.coverImgUrl = 'http://www.kexuetuokouxiu.com/wp-content/uploads/powerpress/kexuetuokouxiu_2014_1400.jpg';
            bam.src = programme.mediaUrl; // 设置了 src 之后会自动播放
            bam.onPlay(() =>{
                this.playState = 1;
                console.log("onPlay");
            });
            bam.onPause(() => {
                this.playState = 0;
                console.log("onPause");
            });
            bam.onStop(() => {
                this.playState = 3;
                console.log("onStop");
            });
            bam.onWaiting(() => {
                this.playState = 2;
                console.log("onWaiting");
            });
            bam.onError((e) => {
                this.playState = -1;
                console.log("onError",e);
            })
        } else {
            bam.play();
        }
    };

    pause = () => {
        const bam = wx.getBackgroundAudioManager();
        bam.pause();
    };
}

module.exports = {
    IndexStore,
    indexWhiteList,
};
