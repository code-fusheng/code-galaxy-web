export default({ $axios }, inject) => {
  // getPort 方法注入 context/vue/store 中
  inject('getPort', () => $axios.$get('/test-server/debug/getPort'))
}
