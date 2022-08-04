export const state = () => ({
  // 菜单
  menu: false,
  // 全网矿工tag
  globalMinerTag: {},
  // 全网概览
  globalOverview: {},
  // 定制版传入参数
  openRMDQurey: {},
  // 支持的语言
  // locales: ['ko', 'en','zh','ja'],
  locales: ['ko', 'en','ja'],
  // 默认语言
  locale: 'en',
  // 是否登录
  isSignIn:false,
  // 是否激活pro付费版
  isProActive:false,
  // 用户普通信息
  userList:{},
  // Pro激活用户信息
  proUserList:{},
  // 币价
  filPrice:{},
  // 全景数据
  overviewStat:{},
  // 标签开关
  tagShowFlag:false,
})

export const getters = {
  getMenu: (state) => {
    return state.menu
  },
  getGlobalMinerTag: (state) => {
    return state.globalMinerTag
  },
  getGlobalOverview: (state) => {
    return state.globalOverview
  },
  getFilPrice: (state) => {
    return state.filPrice
  },
  getOverviewStat: (state) => {
    return state.overviewStat
  },
  getOpenRMDQuery: (state) => {
    return state.openRMDQurey
  },
  getIsSignIn: (state) => {
    return state.isSignIn
  },
  getIsProActive: (state) => {
    return state.isProActive
  },
  getUserList: (state) => {
    return state.userList
  },
  getProUserList: (state) => {
    return state.proUserList
  },
  getTagShowFlag: (state) => {
    return state.tagShowFlag
  },
}

export const mutations = {
  setMenu: (state, data) => {
    state.menu = data
  },
  setGlobalMinerTag: (state, data) => {
    state.globalMinerTag = data
  },
  setGlobalOverview: (state, data) => {
    state.globalOverview = data
  },
  setFilPrice: (state, data) => {
    state.filPrice = data
  },
  setOverviewStat: (state, data) => {
    state.overviewStat = data
  },
  setOpenRMDQuery: (state, data) => {
    state.openRMDQurey = data
  },
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_IsSignIn(state, data) {
    state.isSignIn = data
  },
  SET_IsProActive(state, data) {
    state.isProActive = data
  },
  SET_UserList(state, data) {
    state.userList = data
  },
  SET_ProUserList(state, data) {
    state.proUserList = data
  },
  SET_TagShowFlag(state, data) {
    state.tagShowFlag = data
  }
}

export const actions = {
  changeMenu({ commit, state }, data) {
    commit('setMenu', data)
  },
  changeOpenRMDQuery({ commit, state }, data) {
    commit('setOpenRMDQuery', data)
  },
  changeIsSignIn({ commit, state }, data) {
    commit('SET_IsSignIn', data)
  },
  changeIsProActive({ commit, state }, data) {
    commit('SET_IsProActive', data)
  },
  changeUserList({ commit, state }, data) {
    commit('SET_UserList', data)
  },
  changeProUserList({ commit, state }, data) {
    commit('SET_ProUserList', data)
  },
}