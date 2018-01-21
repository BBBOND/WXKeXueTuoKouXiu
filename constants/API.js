export const MODE = {
    ONLINE: "ONLINE",
    LOCAL: 'LOCAL',
};
export const currentMode = MODE.ONLINE;

let domain;
if (currentMode === MODE.LOCAL) {
    // domain = 'http://127.0.0.1:4001';
    // domain = 'http://192.168.31.140:4001';
    domain = 'http://192.168.1.12:4001';
} else if (currentMode === MODE.ONLINE) {
    domain = 'http://www.bbbond.com:4001';
}

export const API = {
    API_AUTH: `${domain}/auth`,
    API_COUNT: `${domain}/count?{query}`,
    API_SEARCH: `${domain}/search?search={search}&page={page}&size={size}&categories={categories}&type={type}&dateSort={dateSort}`,
    API_USERINFO: `${domain}/userInfo`,
    API_UPDATE_PROFILE: `${domain}/updateProfile`,
};