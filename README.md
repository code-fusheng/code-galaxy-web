# code-galaxy-web 

```
(2021/04/27 16:30 --- 2021/04/27 16:51) init : 项目初始化 nuxt.js + vue3.0 基础框架搭建
(2021/04/27 17:00 --- 2021/04/27 23:43) config : 配置封装axios,proxy代理,后端Api调试
```

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


### 常用说明
#### 1、别名用法
| 别名       | 含义        |
| ---------- | ----------- |
| `~`或`@`   | [srcDir]()  |
| `~~`或`@@` | [rootDir]() |

#### 文件夹描述
nuxt/views 下的 app.template.html 其中 `{{ APP }}` 就是 pages 下面的页面组件

#### plugins 插件配置
```js
  plugins: [
    // '~/plugins/test-inject.js'
    {src: '~/plugins/test-inject.js', mode: 'client'},  // 插件只会在客户端运行
    {src: '~/plugins/test-inject.js', mode: 'server'},  // 插件只会在服务端运行
    {src: '~/plugins/test-inject.js'}
  ],
```
```vue
  asyncData(context) {
    context.app.testFunctionToContext('context-test')
    context.app.$testFunctionToContextAndVue('context-vue-test')
  },
  mounted() {
    this.$testFunctionToVue('test')
    this.$testFunctionToContextAndVue('context-vue-test')
  }
```

#### 异步加载数据 asyncData
> Nuxt.js 拓展了 Vue.js ,增加 asyncData 方法，可以在渲染组件之前异步获取数据
> 调用后台数据是需要用到 axios  https://axios.nuxtjs.org/setup
```shell
npm install @nuxtjs/axios
```
```
# nuxt.cinfig.js
export default {
  modules: ['@nuxtjs/axios']
}
```

#### 代理转发解决跨域


#### UI 框架配置 主题配置
```shell
# 安装 element-ui
$ npm i element-ui -S
```