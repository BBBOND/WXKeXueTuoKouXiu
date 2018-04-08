let { IndexStore, indexWhiteList } = require('./indexStore');
let { UserStore, userWhiteList } = require('./userStore');
const { settingStoreAutoRun, getCacheKey } = require('../libs/storeCache.js');

const stores = {
  index: settingStoreAutoRun(getCacheKey('INDEX'), IndexStore, indexWhiteList),
  user: settingStoreAutoRun(getCacheKey('USER'), UserStore, userWhiteList),
};

module.exports = stores;