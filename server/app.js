const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redis = require('redis')
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const cors = require('cors');
const passport = require('passport');
const flash = require('connect-flash');
const consts = require('./common/consts.js');
const utils = require('./common/utils.js');
// 
var index = require('./routes/index');
var explorer = require('./routes/explorer');
var calculator = require('./routes/calculator');
var activity = require('./routes/activity');
var system = require('./routes/system');

const app = express();
// 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 格式化日志
app.use(utils.logger('format-logger'));

// 跨域中间件
app.use(cors())



var redisClient = redis.createClient({
  'host': consts.REDIS.host,
  'port': consts.REDIS.port,
  'db': consts.REDIS.db,
  'pass': consts.REDIS.password,
});
if (consts.REDIS.password) {
  redisClient.auth(consts.REDIS.password);
}
app.use(
  session({
    store: new RedisStore({
      client: redisClient
    }),
    secret: '79e3c8c0bf9d11e79baca45e60bb9305',
    resave: true, // 是否每次都重新保存会话，建议false
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }
  })
);



// 设置认证中间件
// require('./api/user_passport.js');
// app.use(passport.initialize());
// app.use(passport.session());
app.use(flash());
// 全局变量
app.locals = { 'static_url': '', 'year': new Date().getFullYear() }

// 挂载路由
app.use('/', index);
app.use('/explorer', explorer);
app.use('/calculator', calculator);
app.use('/activity', activity);
app.use('/system', system);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  console.log('error---99904-->', err)
  res.send(utils.formatReturn(99904, {}));
});

module.exports = {
  path: '/api',
  handler: app
};