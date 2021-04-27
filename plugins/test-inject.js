// Plugin 插件
import Vue from 'vue'

// 在 vue 原型上挂载一个函数，所有组件都可以访问（不包含服务器端）
Vue.prototype.$testFunctionToVue = string => console.log('绑定到Vue实例的测试方法参数:', string)

export default ({ app }, inject) => {
    // 在 context 中注入 
    app.testFunctionToContext = string => console.log('绑定到Context实例的测试方法参数:', string)

    // 在 context vue vuex 中注入 需要使用 inject 方法，是 plugin 导出函数的第二个参数
    inject('testFunctionToContextAndVue', string => console.log('绑定到Context和Vue实例的测试方法参数:', string))
}


