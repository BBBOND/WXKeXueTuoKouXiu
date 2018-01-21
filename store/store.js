let { IndexStore, indexWhiteList } = require('./indexStore');
let { UserStore, userWhiteList } = require('./userStore');
let mobx = require('../libs/mobx');

const settingStoreAutoRun = (key, store, whiteList) => {
  // 将缓存塞入store
  store.prototype.store = JSON.parse(wx.getStorageSync(key) || '{}') || {};
  let storeObj = new store();
  mobx.autorun(() => {
    let app = mobx.toJS(storeObj);
    let temp = {};
    whiteList.map((key) => {
      temp[key] = app[key];
    });
    wx.setStorage({
      key: key,
      data: JSON.stringify(temp)
    });
  });
  return storeObj;
};

const getCacheKey = (key) => `mobxCache:KXTKX-${key}`;

const stores = {
  index: settingStoreAutoRun(getCacheKey('INDEX'), IndexStore, indexWhiteList),
  user: settingStoreAutoRun(getCacheKey('USER'), UserStore, userWhiteList),
};

module.exports = stores;