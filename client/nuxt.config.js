import pkg from './package'
const ip = require('ip')
export default {
  mode: 'universal',
  server: {
      port: 8080, // default: 3000
      host: ip.address(), // default: localhost
    },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css'},
      // { rel: 'stylesheet', href: '/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/css/icons.css' },
      { rel: 'stylesheet', href: '/css/style.css' },

    ],
    script: [
      {src: '/js/modernizr.js'},
      {src: '/js/jquery.js', body: true},
      {src: '/js/popper.js', body: true},
      {src: '/js/bootstrap.js', body: true},
      {src: '/js/waves.js', body: true},
      {src: '/js/jquery.slimscroll.js', body: true},
      {src: '/js/jquery.scrollTo.js', body: true},
      {src: '/js/jquery.core.js', body: true},
      {src: '/js/jquery.app.js', body: true},
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: 'plugins/mqtt.js',mode: 'client'},
    // 'plugins/highcharts.js'
    'plugins/mixins/user.js',
    'plugins/axios.js',
    'plugins/mixins/validation.js',
    // 'plugins/vue-js-modal.js',
    'plugins/mixins/notification.js',
    'plugins/moment.js',
    'plugins/vue-notification.js',
    'plugins/vuetify.js',
    // 'plugins/izitoast.js',
    { src: '~/plugins/izitoast.js', ssr: false , mode: 'client'},
    { src: 'plugins/vue-highcharts.js', ssr: false, mode: 'client' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt',
    '@nuxtjs/toast',
    [
      'nuxt-sweetalert2',
      {
        confirmButtonColor: '#007bff'
      }
    ],
    // ['nuxt-mqtt-module', { uri: `ws://${ip.address()}:8000` }],
    'nuxt-izitoast',
    
  ],
  izitoast: {
    position: 'bottomRight',
    transitionIn: 'bounceInLeft',
    transitionOut: 'fadeOutRight',
  },
  toast: {
    position: 'bottom-left'
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    //  baseURL: 'http://127.0.0.1:8000/api',
    baseURL: `http://${ip.address()}:8000`,
     
  },
  auth: {
    resetOnError : true,
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/authenticate', method: 'post', propertyName: 'token' },
          user: { url: '/api/userProfile', method: 'get', propertyName: 'user' },
          logout: {url: '/api/logout', method: 'post'},
          
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: '/',
      callback: '/'
  },
  watchLoggedIn: true,
  rewriteRedirects: true
  },
    /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
