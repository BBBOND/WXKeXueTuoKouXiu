const regeneratorRuntime = require('../libs/runtime');
let extendObservable = require('../libs/mobx').extendObservable;
let {getCount, searchProgramme, auth, userInfoReq, updateProfileReq} = require('../service/request');
const app = getApp();

/** ================= 初始化值 ================== **/
const initialState = {
    programmeList: [],
    isIndexLast: false,
    allCount: 0,
};

/** ================= cache白名单 ================== **/
const indexWhiteList = [
    'programmeList', 'allCount'
];

const doSomething = (pList) => pList.map((item) => {
    item.summary = item.summary.replace(' [&#8230;]', '...');
    return item;
});

const IndexStore = function () {
    extendObservable(this, {
        programmeList: this.store && this.store.programmeList || initialState.programmeList,
        allCount: this.store && this.store.allCount || initialState.allCount,
        isIndexLast: initialState.isIndexLast,
    });

    this.programmePage = async ({search = '', categories = '', type = '', page = 1, size = 20, dateSort = -1}) => {
        let result = (await searchProgramme(search, categories, type, page, size, dateSort));
        let programmeList = doSomething(result.data);
        this.isIndexLast = result.isLast;
        if (page === 1) {
            this.programmeList = programmeList;
        } else {
            programmeList.forEach((item) => {
                if (this.programmeList.indexOf(item) < 0) {
                    this.programmeList.push(item);
                }
            });
        }
    };

    this.countAll = async () => {
        this.allCount = (await getCount()).count;
    };
};

module.exports = {
    IndexStore,
    indexWhiteList,
};
