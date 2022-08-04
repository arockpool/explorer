var utils = require('../common/utils.js');
var consts = require('../common/consts.js');

module.exports = {

  // 浏览器v2接口
  // 矿工,综合指数信息
  get_miner_index(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/exponent/get_miner_index`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 矿工综合指数_折线图
  get_miner_index_line(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/exponent/get_miner_index_line`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取矿工排行榜
  get_miner_ranking(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/exponent/get_miner_ranking`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_overview_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_miner_overview_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // get_miner_line_chart_by_no(data, req) {
  //   return utils.promiseRequest(
  //     utils.getServerUrl(`/data/api/miner/get_miner_line_chart_by_no`),
  //     data,
  //     utils.getCommonHeaders(req)
  //   )
  // },

  get_transfer_list_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_transfer_list_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_tipsets(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_tipsets`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_tipset_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_tipset_info`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_block_by_cid(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_block_by_cid`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_block_message(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_block_message`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_memory_pool_message(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_memory_pool_message`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_message_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_message_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_message_detail(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_message_detail`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_base_fee_trends(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_base_fee_trends`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // get_gas_stat_all(data, req) {
  //   return utils.promiseRequest(
  //     utils.getServerUrl(`/explorer/api/master_overview/get_gas_stat_all`),
  //     data,
  //     utils.getCommonHeaders(req)
  //   )
  // },


  get_overview(data, req) {
    return utils.promiseRequest(
      // utils.getServerUrl(`/explorer/api/master_overview/get_overview`),
      utils.getServerUrl(`/explorer_v2/homepage/get_overview`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_overview_day_records(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_overview_day_records`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_list_by_raw_power(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_miner_list_by_raw_power`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_list_by_power_inc(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_miner_list_by_power_inc`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_list_by_avg_reward(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_miner_list_by_avg_reward`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_list_by_block(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_miner_list_by_block`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // get_miner_blocks(data, req) {
  //   return utils.promiseRequest(
  //     utils.getServerUrl(`/explorer/api/detail/get_miner_blocks`),
  //     data,
  //     utils.getCommonHeaders(req)
  //   )
  // },

  get_gas_cost_stat(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_gas_cost_stat`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_index_details(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/index/details`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取子维度的数据，若不输入日期则为默认最近七天，传入参数 :start_date end_date 格式 2021-02-25
  get_index_scores(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/index/scores`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取主维度得分 若不输入日期则为默认最近七天 params: start_date end_date
  get_latitude_score(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/index/latitude_score`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 搜索
  new_search(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/search`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // // 判断是矿工还是钱包
  // search_miner_or_wallet(data, req) {
  //   return utils.promiseRequest(
  //     utils.getServerUrl(`/explorer/api/master_overview/search_miner_or_wallet`),
  //     data,
  //     utils.getCommonHeaders(req)
  //   )
  // },

  // 搜索账户信息
  search_miner_type(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/common/search_miner_type`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 搜索钱包变化
  get_miner_wallet_line_chart_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_miner_wallet_line_chart_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取所有的Tag
  get_miner_tag(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_miner_tag`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取订单列表
  get_deal_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_deal_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 订单详情
  get_deal_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_deal_info`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取矿工生产统计 7d 30d
  get_miner_mining_stats_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_miner_mining_stats_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取申领标签 设置申领标签
  get_miner_apply_tag(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_miner_apply_tag`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 设置申领标签
  set_miner_apply_tag(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/set_miner_apply_tag`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 矿工的gas 消耗
  get_miner_gas_chart_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_miner_gas_chart_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 用户登录
  login(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/login'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 用户注册
  register_explorer(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/register_explorer'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取用户注册手机验证码
  get_register_vercode(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/get_register_vercode'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 手机区号
  get_mobile_prefix(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/get_mobile_prefix'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取收藏节点
  get_collectible_miner(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_collectible_miner'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 新增收藏节点
  add_collectible_miner(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/add_collectible_miner'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 获取专业用户信息
  get_pro_user_info(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_pro_user_info'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 获取修改密码验证码
  get_change_password_vercode(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/get_change_password_vercode'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 修改密码
  change_password(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/change_password'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 我的收藏列表（节点收藏）
  get_collectible_miner_list(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_collectible_miner_list'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 删除收藏节点
  del_collectible_miner(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/del_collectible_miner'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 新增收藏钱包
  add_collectible_wallet_address(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/add_collectible_wallet_address'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 我的收藏列表（账户收藏）
  get_collectible_address_list(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_collectible_address_list'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 删除收藏钱包
  del_collectible_wallet_address(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/del_collectible_wallet_address'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 修改手机号验证码
  get_set_mobile_vercode(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/get_set_mobile_vercode'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 修改手机号
  set_mobile(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/set_mobile'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 获取收藏的状态
  get_collectible_status(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_collectible_status'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 更新收藏的（添加备注）
  update_collectible(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/update_collectible'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 矿工的gas 消耗列表
  get_miner_day_gas_list_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/miner/get_miner_day_gas_list_by_no'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 矿工的gas 消耗 7d 30d 90d
  get_miner_gas_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/detail/get_miner_gas_by_no'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取短信登录验证码
  get_sms_login_explorer_vercode(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/get_sms_login_explorer_vercode'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 短信登录
  sms_login(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/sms_login'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 节点健康报告24H详情
  miner_health_report_24h(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/miner_health_report_24h'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 节点健康报告7天列表
  miner_health_report_days(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/miner_health_report_days'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 节点健康报告gas分析
  miner_health_report_gas_stat(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/miner_health_report_gas_stat'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 节点健康报告消息分析
  miner_health_report_messages_stat(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/miner_health_report_messages_stat'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 获取节点健康报告评分统计
  get_miner_health_report_stats(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_miner_health_report_stats'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 节点钱包的预计使用时间
  miner_health_report_wallet_estimated_day(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/miner_health_report_wallet_estimated_day'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 获取监控节点
  get_miner_monitor(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_miner_monitor'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 新增更新监控节点
  create_update_miner_monitor(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/create_update_miner_monitor'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 删除监控节点
  del_miner_monitor(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/del_miner_monitor'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 删除监控手机号码
  del_warn_mobile(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/del_warn_mobile'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 查询监控手机号
  get_warn_mobile(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_warn_mobile'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 添加监控手机号码
  add_warn_mobile(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/add_warn_mobile'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 修改监控手机号码
  set_warn_mobile(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/set_warn_mobile'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 修改监控手机号码验证码
  get_change_mobile_vercode(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_change_mobile_vercode'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 获取邀请信息
  get_invite_info(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_invite_info'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 邀请记录
  get_invite_record_list(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_invite_record_list'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 奖励记录
  get_reward_record_list(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_reward_record_list'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 第一次登陆
  update_pro_tips_flag(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/update_pro_tips_flag'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  // 获取矿池节点
  get_pool_miner_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/data/api/miner/get_miner_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 预测出块奖励
  get_calculate_block_and_reward(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/detail/get_calculate_block_and_reward'),
      data,
      utils.getCommonHeaders(req)
    )
  },
  
  // 3.0新接口
  // 全景数据
  get_overview_stat(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_overview_stat'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 全网每天数据列表
  get_overview_day_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_overview_day_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // gas趋势
  get_gas_trends(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_gas_trends'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取gas24小时统计
  get_gas_stat_all(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_gas_stat_all'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取全网算力趋势图
  get_overview_power_trends(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_overview_power_trends'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 全网每个高度的数据列表
  get_overview_stat_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_overview_stat_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 全网产出效率和质押趋势图
  get_overview_stat_trends(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_overview_stat_trends'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 消息池列表
  get_mpool_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_mpool_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取消息的方法类型列表
  get_message_method_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_message_method_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 钱包列表
  get_wallets_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_wallets_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取消息详情
  get_message_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_message_info'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 区块详情
  get_block_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_block_info'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 钱包详情
  get_wallet_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_wallet_info'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 钱包记录
  get_wallet_record(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_wallet_record'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取价格
  get_price(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/common/get_price'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 排行榜有效算力
  get_miner_ranking_list_by_power(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/homepage/get_miner_ranking_list_by_power'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 排行榜 算力增速/出块数量/产出效率
  get_miner_ranking_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/homepage/get_miner_ranking_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 搜索
  search(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/common/search'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 判断是矿工还是钱包
  search_miner_or_wallet(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/common/search_miner_or_wallet`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 存储者详情
  get_miner_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_miner_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },  

  // 存储者产出统计
  get_miner_stats_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_miner_stats_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 存储者成本统计
  get_miner_gas_stats_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_miner_gas_stats_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 存储者算力变化和出块统计
  get_miner_line_chart_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_miner_line_chart_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 存储者转账列表
  get_transfer_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_transfer_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 存储者转账方法类型列表
  get_transfer_method_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_transfer_method_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 存储者区块列表
  get_miner_blocks(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_miner_blocks`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 钱包名下节点
  get_miners_by_address(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_miners_by_address`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 消息池详情
  get_mpool_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_mpool_info`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // datacap
  // 概览
  get_datacap_dashboard(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/datacap/get_datacap_dashboard`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 活跃统计
  get_datacap_stats(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/datacap/get_datacap_stats`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 公证人列表
  get_notaries_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/datacap/get_notaries_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 客户列表
  get_plus_client_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/datacap/get_plus_client_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 存储矿工列表
  get_provider_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/datacap/get_provider_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 存储池相关
  // 存储矿工列表
  get_miner_pool_ranking_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/homepage/get_miner_pool_ranking_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 存储池详情
  get_miner_pool_by_owner_id(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner_pool/get_miner_pool_by_owner_id`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 存储池产出统计
  get_miner_pool_stats_by_owner_id(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner_pool/get_miner_pool_stats_by_owner_id`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 存储池成本统计
  get_miner_pool_gas_by_owner_id(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner_pool/get_miner_pool_gas_by_owner_id`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 存储池算力变化和出块统计
  get_miner_pool_line_chart_by_owner_id(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner_pool/get_miner_pool_line_chart_by_owner_id`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 钱包流向
  // 查询是否是钱包
  get_is_wallet(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/tool/get_is_wallet`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 钱包详情
  get_wallet_message_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/tool/get_wallet_message_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 获取标签开关状态
  get_tag_status(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_tag_status`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 查询钱包流向
  get_wallet_flow_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/tool/get_wallet_flow_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 新登陆注册
  sms_login_explorer(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/account/api/sms_login_explorer`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  // 生态统计24小统计数据
  get_deal_stat(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/ecology/get_deal_stat`),
      data,
      utils.getCommonHeaders(req)
    )
  },

    // 生态统计按天的数据统计
    get_deal_day(data, req) {
      return utils.promiseRequest(
        utils.getServerUrl(`/explorer_v2/ecology/get_deal_day`),
        data,
        utils.getCommonHeaders(req)
      )
    },


}