const regeneratorRuntime = require('../libs/runtime');
let extendObservable = require('../libs/mobx').extendObservable;
let { getCount, searchProgramme, auth, userInfoReq, updateProfileReq } = require('../service/request');

/** ================= 初始化值 ================== **/
const initialState = {
    userInfo: undefined,
};

/** ================= cache白名单 ================== **/
const userWhiteList = [
    'userInfo'
];

const UserStore = function () {
    extendObservable(this, {
        userInfo: this.store && this.store.userInfo || initialState.userInfo,
    });

    this.authUser = () => {
        !this.userInfo && wx.login({
            success: (loginResult) => {
                wx.getUserInfo({
                    success: async (user) => {
                        this.userInfo = (await auth(loginResult.code, user.encryptedData, user.iv));
                    }
                })
            }
        })
    };

    this.getUserInfo = async () => {
        if (this.userInfo) {
            this.userInfo = (await userInfoReq(this.userInfo._id));
        }
    };

    this.updateProfile = async (id, { k_name, k_signature, k_birthday }) => {
        this.userInfo = (await updateProfileReq(id, { k_name, k_signature, k_birthday }))
    }
};

module.exports = {
    UserStore,
    userWhiteList,
};
