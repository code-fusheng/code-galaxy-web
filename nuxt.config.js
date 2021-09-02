const env = require('./env')
export default {

  mode: 'universal',
  server: {
    port: 8000,
    host: 'localhost'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '个人站点 ｜ Code-Galaxy',
    // HTML 属性配置
    htmlAttrs: {
      lang: 'en'
    },
    // BODY 属性配置
    bodyAttrs: {
      style: 'background-color: #FFF'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '微服务技术交流 在线考试 在线阅读 在线问答 网站' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 全局引入样式
    '@/assets/css/global.css',
    // 基础UI样式
    'element-ui/lib/theme-chalk/index.css',
    // 自适应布局样式
    'element-ui/lib/theme-chalk/display.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/test-inject.js'
    // {src: '~/plugins/test-inject.js', mode: 'client'},  // 插件只会在客户端运行
    // {src: '~/plugins/test-inject.js', mode: 'server'},  // 插件只会在服务端运行
    '~/plugins/test-inject.js',
    '~/plugins/interceptor.js',
    '~/plugins/element-ui.js',
    '~/plugins/ant-ui.js',
    {src: '~/plugins/mavon-editor.js', ssr: false},
    // api
    '~/api/test/test.js',
    '~/api/article/category.js',
    '~/api/article/article.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],

  axios: {
    proxy: true,  // 开启代理
    prefix: '/webApi' // 请求前缀
  },

  proxy: {
    '/webApi': {
      target: 'http://localhost:9999',
      pathRewrite: {'^/webApi': ''}
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // 将 node_modules 目录下的匹配到的内容导出
    transplie: [/^element-ui/, /^ant-ui/],
  },

  // 环境变量配置
  env: {
    // 认证客户端 URL
    baseURL: '',
    authURL: env[process.env.NODE_ENV].authURL,
    uploadURL: env[process.env.NODE_ENV].uploadURL,
    webSocketURL: env[process.env.NODE_ENV].webSocketURL
  }
}
