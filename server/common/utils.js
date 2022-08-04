var logger = require('morgan');
var request = require('request');
var consts = require('./consts');
var CryptoJS = require('crypto-js');

// 加密 
var getAesString = function(data,key,iv){//加密
  var key  = CryptoJS.enc.Utf8.parse(key);
  var iv   = CryptoJS.enc.Utf8.parse(iv);
  var encrypted =CryptoJS.AES.encrypt(data,key,
      {
          iv:iv,
          mode:CryptoJS.mode.CBC,
          padding:CryptoJS.pad.Pkcs7
      });
  return encrypted.toString();    //返回的是base64格式的密文
}
var getAES = function (data){ //加密
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  //密钥
  var iv   = 'abcdefghijklmnopqrstuvwxyz23456789';
  var encrypted =getAesString(data,key,iv); //密文
  return encrypted;
}
// 解密
var getDAesString = function(encrypted,key,iv){//解密
  var key  = CryptoJS.enc.Utf8.parse(key);
  var iv   = CryptoJS.enc.Utf8.parse(iv);
  var decrypted =CryptoJS.AES.decrypt(encrypted,key,
      {
          iv:iv,
          mode:CryptoJS.mode.CBC,
          padding:CryptoJS.pad.Pkcs7
      });
  return decrypted.toString(CryptoJS.enc.Utf8);     
}
var getDAes = function(data){//解密
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  //密钥
  var iv   = 'abcdefghijklmnopqrstuvwxyz23456789';
  var decryptedStr =getDAesString(data,key,iv);
  return decryptedStr;
}

/*
  获取真实IP
*/
var getClientIp = function(req) {
  return (req.headers['x-forwarded-for'] && req.headers['x-forwarded-for'].split(',')[0]) ||
    req.ip ||
    req._remoteAddress ||
    (req.connection && req.connection.remoteAddress) ||
    undefined;
};

/*
  格式化日志
*/
logger.token('local-date', function(req, res) {
  return new Date().toLocaleString('en', { hour12: false });
});
logger.token('real-ip', function(req, res) {
  return getClientIp(req);
});
logger.format(
  'format-logger',
  ':real-ip - :remote-user [:local-date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
);

/* 
  根据url获取对应的请求域名
*/
var getServerUrl = function(url) {
  var serverName = url.split('/')[1].replace('_', '');
  return consts.SERVER_API + url;
};

/* 
  格式化返回值 
*/
var formatReturn = function(code, data = {}, msg = "") {
  var msg = msg ? msg : (consts.ERR_CODE[code] || "");
  return { code, data, msg };
};


// 是否生产环境
var isProd = function() {
  return process.env.DEVCODE == "prod";
}

// 记录日志
var log = function() {
  if (process.env.DEVCODE != 'prod') {
    console.info(...arguments);
  }
};

/*
  获取签名
*/
function getSignature() {
  let nonce = Math.round(Math.random() * 9000000000 + 1000000000).toString(),
    timestamp = Math.round(new Date().getTime() / 1000).toString(),
    sortedParamsStr = [nonce, timestamp, consts.APP_SECRET].sort().join(''),
    sign = CryptoJS.SHA1(sortedParamsStr).toString(CryptoJS.enc.Hex);

  return `signature=${sign}&timestamp=${timestamp}&nonce=${nonce}`;
};

/*
  获取 headers
*/
function getCommonHeaders(req, token = '') {
  console.log(token)
  let headers = {
    'AppId': consts.APP_ID,
    'AppVersion': consts.APP_VERSION,
    'Signature': getSignature(),
    'Content-type': 'application/x-www-form-urlencoded',
    'X-Forwarded-For': getClientIp(req)
  }

  // 如果token有值则带上
  if (token) {
    headers = Object.assign({}, headers, {
      'Authorization': 'Bearer ' + token
    });
  }

  return headers;
};

/* 
  通用 promise 
*/
var promiseRequest = function(url, form = {}, headers = {}, method = "POST") {
  log('request params===>', url, form, headers);
  return new Promise((resolve, reject) => {
    request({
      method: method,
      url: url,
      form: form,
      headers: headers
    }, function(err, response, body) {
      if (err) {
        log('err==>', err);
        resolve(formatReturn(99904, {}, '请求接口系统错误'));
      } else {
        log('response body==>', body);
        if (response.statusCode == 200) {
          resolve(JSON.parse(body));
        } else {
          resolve(formatReturn(99904, {}, `服务器 ${response.statusCode} 错误`));
        }
      }
    });
  });
};

// UUID
var S4 = function() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

// Generate a pseudo-GUID by concatenating random hexadecimal. 
var uuid = function() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

module.exports = {
  logger,
  formatReturn,
  isProd,
  promiseRequest,
  log,
  getServerUrl,
  getCommonHeaders,
  uuid,
  getAES,
  getDAes
}