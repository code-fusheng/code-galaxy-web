export default ({ store, redirect }) => {
  console.log('auth.js 认证中间件被执行!')
  if(!store || !store.state.userInfo) {
    // window.location.href = `${process.env.authURL}?redirectURL=${window.location.href}`
  }
}
