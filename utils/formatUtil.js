//校验手机正则
export const PHONE_REGEX = /^1([34578])\d{9}$/;

/**
 * 校验手机格式
 * @param phone
 * @return {*|boolean}
 */
export const checkPhone = (phone) => phone && PHONE_REGEX.test(phone);

/**
 * 格式化手机号
 * @param PhoneNo 手机号
 */
export const formatPhoneNo = (PhoneNo) => {
  let afterFilter = PhoneNo.replace(/\D/g, '');
  // PhoneNo = PhoneNo.replace(/\s/g,'');
  if (afterFilter.length < 4) {
    return afterFilter
  } else if (afterFilter.length < 8) {
    return afterFilter.replace(/(\d{3})(\d*)/g, '$1 $2')
  } else {
    return afterFilter.replace(/(\d{3})(\d{4})(\d*)/g, '$1 $2 $3')
  }
};

/**
 * 格式化数字
 * @param number 数字
 * @param places 小数位数 默认2
 * @param symbol 数字前的符号
 * @param thousand 千分符样式
 * @param decimal 小数点样式 默认.
 */
export const formatNumber = (number, places, symbol, thousand, decimal) => {
  number = number || 0;
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : "";
  //     symbol = symbol !== undefined ? symbol : "¥";
  thousand = thousand || "";
  decimal = decimal || ".";
  let negative = number < 0 ? "-" : "",
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

/**
 * 去除字符串的文字，只留下数字
 * @param text
 * @return {string|XML|*|void}
 */
export const toNumberString = (text) => text.replace(/\D/g, '');

/**
 * 去除字符串中的空格
 * @param text
 */
export const trim = (text) => text.replace(/\s/g, '');

//校验密码正则
export const PASSWORD_REGEX = /^[a-zA-Z0-9]{4,}$/;
/**
 * 校验密码格式
 * @param pwd
 */
export const checkPassword = (pwd) => pwd && PASSWORD_REGEX.test(pwd);

//服务密码正则
export const CARRIER_PWD_REGEX = /^\d{6}$/;

/**
 * 校验服务密码
 * @param pwd
 * @return {*|boolean}
 */
export const checkCarrierPwd = (pwd) => pwd && CARRIER_PWD_REGEX.test(pwd);

//验证码正则
export const VERIFY_CODE_REGEX = /^\d{6}$/;
/**
 * 校验验证码格式
 * @param verifyCode
 */
export const checkVerifyCode = (verifyCode) => verifyCode && VERIFY_CODE_REGEX.test(verifyCode);

/**
 * 脱敏手机号
 * @param phone
 */
export const desensitizationPhone = (phone) => phone && phone.substring(0, 3) + "****" + phone.substring(7, 11) || '';

/**
 * 格式化流量
 * @param kb
 * @return {*}
 */
export const formatByte = (kb) => {
  let absKB = Math.abs(kb);
  if (absKB < 1024) {
    return { num: kb, unit: 'KB' };
  } else if ((absKB >> 10) < 1024) {
    return { num: formatNumber(kb >> 10, 0), unit: 'MB' };
  } else if ((absKB >> 20) < 1024) {
    return { num: formatNumber(kb >> 20, 0), unit: 'GB' };
  } else if ((absKB >> 30) < 1024) {
    return { num: formatNumber(kb >> 30, 0), unit: 'TB' };
  } else {
    return { num: '无限制', unit: '' };
  }
};

/**
 * 格式化语音
 * @param minute
 * @return {*}
 */
export const formatMinute = (minute) => {
  let absMinute = Math.abs(minute);
  if (absMinute < 60) {
    return { num: minute, unit: '分钟' };
  } else {
    return { num: formatNumber(minute / 60, 0), unit: '小时' }
  }
};

/**
 * 随机从列表中取出一定数量项
 * @param list
 * @param num
 */
export const getRandomItems = (list, num) => {
    if (!list || list.length === 0) return [];
    let randomArr = [];
    let length = list.length;
    for (let i = 0; i < num; i++) {
        let random = Math.floor(Math.random() * length);
        if (randomArr.indexOf(random) >= 0) {
            i--;
        } else {
            randomArr.push(random);
        }
    }
    return randomArr.map(item => list[item]);
};