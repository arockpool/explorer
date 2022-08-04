// 错误信息汇总
const ERR_CODE = {
  0: 'ok',
  99901: '参数缺失',
  99902: '参数异常',
  99903: '参数重复',
  99904: '系统错误',
  99905: '会话已失效，需要重新登录',
  99906: '权限不足',
  99907: '图形验证码错误',
}

// appid appversion
const APP_ID = 'app_id';
const APP_VERSION = '1.0.0';
const APP_SECRET = 'app_secret';

// api业务服务器地址
const SERVER_API = process.env.SERVER_API || "http://testapi-explorer.arockpool.com";
// const SERVER_API = process.env.SERVER_API || "http://192.168.88.150:13000";
// const SERVER_API = process.env.SERVER_API || "http://192.168.88.120:8000";


// redis配置 
const REDIS = {
  host: process.env.REDIS_HOST || 'explorer_redis',
  port: process.env.REDIS_PORT || 6379,
  db: process.env.REDIS_DB || 1,
  password: process.env.REDIS_PASSWORD == undefined ? 'redispassword' : process.env.REDIS_PASSWORD
}

/*
  获取对应环境下的配置
*/
var getEnvConfig = function(envDict) {
  return envDict[process.env.NODE_ENV] || envDict['dev'];
}

module.exports = {
  ERR_CODE,
  APP_ID,
  APP_VERSION,
  APP_SECRET,
  SERVER_API,
  REDIS
}