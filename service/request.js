let { baseGetRequest, basePostRequest } = require('./baseRequest.js');
let { API } = require('../constants/API.js');

export const auth = (code, encryptedData, iv) => basePostRequest(
  API.API_AUTH, { code, encryptedData, iv }
);

export const userInfoReq = (id) => basePostRequest(
  API.API_USERINFO, { id }
);

export const searchProgramme = (search = '', categories = '', type = '', page = 1, size = 20, dateSort = -1) => baseGetRequest(
  API.API_SEARCH, { search, page, size, categories, type, dateSort }
);

export const getCount = (query = '') => baseGetRequest(
  API.API_COUNT, { query }
);

export const updateProfileReq = (id, profile) => basePostRequest(
  API.API_UPDATE_PROFILE, {id, profile}
);

export const getProgrammeReq = (id) => baseGetRequest(
    API.API_PROGRAMME, {id}
);