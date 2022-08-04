export default {
  /*
   ** Headers of the page
   */
  head: {
    title: '一石浏览器 - 专业存储供应商数据服务' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover, user-scalable=no' },
      // { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'description', name: 'description', content: '一石浏览器是专业存储供应商数据服务工具，为用户提供分布式存储激励层相关数据及存储供应商排行，包含存储供应商信息、存储区块奖励指数、最新高度、Gas动态，独创存储区块奖励满存算力产出、存储算力产出预估计算器。' },
      { hid: 'keywords', name: 'keywords', content: 'FIL,一石浏览器,Gas,IPFS,filecoin,一石云池,arockpool,Arockpool Explorer,一石区块链浏览器,Arockpool Filecoin Explorer,扇区质押,fil计算器,fil区块链浏览器,fil价格,f0{参数},fil节点查询,fil算力查询,filgas费查询' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
    script: [
      { src: '/umeng.js' },
      {
        src: '/qrcode.min.js'
      },
      // 手机端调试console.log
      // {
      //   src: '//unpkg.com/vconsole@3.9.1/dist/vconsole.min.js'  
      // }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  serverMiddleware: [
    '~/server/app.js'
  ],
  router: {
    middleware: ['i18n']
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#FFF2AF' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/base.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/element-ui.js', ssr: true },
    { src: '~/plugins/components.js', ssr: true },
    { src: '~/plugins/echarts.js', ssr: true },
    '~/plugins/filter.js',
    '~/plugins/i18n.js',
    '~/plugins/vue-count-to.js',
    '~/plugins/bus-inject.js',
    '~/plugins/vue-json-excel.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
   ** Nuxt.js proxy
   */
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://[::1]:3000',
      changeOrigin: true
    }
  },
  /*
   ** 不允许使用该功能 (未使用的移除未使用的css样式)
   */
  purgeCSS: {
    enabled: false
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ['vue-i18n'],
    babel: {
      plugins: [
        ["component", { "libraryName": "element-ui", "styleLibraryName": "theme-chalk" }]
      ]
    },
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, { ctx, isClient }) {
      if (isClient) {
        config.performance = {
          hints: false
        }
      }
    }
  },
  watch: ['~/server']
}