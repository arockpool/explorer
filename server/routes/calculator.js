const express = require('express');
var router = express.Router();

var calApi = require('../api/calculator.js');

// 获取基础配置信息
router.post('/get_calculate_info', function(req, res, next) {
  calApi.get_calculate_info(req.body, req).then(data => { res.send(data) });
});

// 获取计算结果
/**
power_per_day: 存储速度，最小2，最大3
total_power：算力，不能小于0
cost: 成本，不能小于0
current_date: 计算起始日期，不能小于2020-10-16
price: 单价美元
*/
router.post('/get_calculate_sum', function(req, res, next) {
  calApi.get_calculate_sum(req.body, req).then(data => { res.send(data) });
});

router.post('/get_calculate_sum_v2', function(req, res, next) {
  calApi.get_calculate_sum_v2(req.body, req).then(data => { res.send(data) });
});

module.exports = router;