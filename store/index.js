const state = () => ({
  userInfo: null, // 用户信息对象
  accessToken: null, // 访问令牌字符串
  refreshToken: null, // 刷新令牌字符串
})

// 改变状态值
const mutations = {

  // 重置用户状态
  REST_USER_STATE (state) {
    state.userInfo = null
    state.accessToken = null
    state.refreshToken = null
  },

  // 刷新页面之后，重新更新用户状态
  UPDATE_ALL_STATE (state, data) {
    state.userInfo = data.userInfo
    state.accessToken = data.accessToken
    state.refreshToken = data.refreshToken
  }

}

// 定义行为
const actions = {

  // 服务端条调用 Cookie 操作
  nuxtServerInit({ commit }, { app }) {
    const data = {}
    data.userInfo = app.$cookies.get('userInfo')
    data.accessToken = app.$cookies.get('accessToken')
    data.refreshToken = app.$cookies.get('refreshToken')
    // data.redirectURL = app.$cookies.get(Key.redirectURL)
    commit('UPDATE_ALL_STATE', data)
  },

  // 跳转登录
  LoginPage({ commit }) {
    // 重置用户状态
    commit('REST_USER_STATE')
    // 跳转统一认证登录页
    window.location.href = `${process.env.authURL}?redirectURL=${window.location.href}`
  }

}

export default {
  state,
  mutations,
  actions
}
