import { compile } from "../.nuxt/utils"

export default({ store, route, redirect, $axios }) => {

    // 请求之前的拦截器
    $axios.onRequest(config => {
        console.log("请求拦截器")
        // 添加请求头
        const accessToken = store.state.accessToken
        if(accessToken) {
          config.headers.Authorization = 'Bearer ' + accessToken
        }
        return config
    })

    // 响应结果拦截器
    $axios.onResponse(response => {
        console.log("响应拦截器:", response.data)
        const { msg, code } = response.data;
        if ( code == 10004 || code == 401) {
          window.location.href = `${process.env.authURL}?redirectURL=${window.location.href}`
        }
        return response
    })

    // 错误拦截器
    $axios.onError(error => {
        console.log("响应异常:", error.response.status)
    })
}
