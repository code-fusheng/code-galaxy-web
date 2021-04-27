export default({ store, route, redirect, $axios }) => {
    
    // 请求之前的拦截器
    $axios.onRequest(config => {
        console.log("请求拦截器")
        return config
    })

    // 响应结果拦截器
    $axios.onResponse(response => {
        console.log("响应拦截器:", response.data)
        return response
    })

    // 错误拦截器
    $axios.onError(error => {
        console.log("响应异常:", error.response.status)
    })
}