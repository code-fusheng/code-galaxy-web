export default {

  mode: 'universal',
  server: {
    port: 8000,
    host: '0.0.0.0'
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
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/test-inject.js'
    // {src: '~/plugins/test-inject.js', mode: 'client'},  // 插件只会在客户端运行
    // {src: '~/plugins/test-inject.js', mode: 'server'},  // 插件只会在服务端运行
    '~/plugins/test-inject.js',
    '~/plugins/interceptor.js',
    // api
    '~/api/test-server/debug.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    proxy: true,  // 开启代理
    prefix: '/dev-api' // 请求前缀
  },

  proxy: {
    '/dev-api': {
      target: 'http://localhost:9999',
      pathRewrite: {'^/dev-api': ''}
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
