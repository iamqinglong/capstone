import pkg from './package'

export default {
  mode: 'universal',

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
      { rel: 'stylesheet', href: '/css/bootstrap.min.css' },
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
    'plugins/mqtt.js',
    // 'plugins/highcharts.js'
    'plugins/mixins/user.js',
    'plugins/axios.js',
    'plugins/mixins/validation.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt',
    [
      'nuxt-sweetalert2',
      {
        confirmButtonColor: '#007bff'
      }
    ],
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
     baseURL: 'http://127.0.0.1:8000/api',
     
  },
  auth: {
    resetOnError : true,
    strategies: {
      local: {
        endpoints: {
          login: { url: '/authenticate', method: 'post', propertyName: 'token' },
          user: { url: '/userProfile', method: 'get', propertyName: 'user' },
          logout: {url: '/logout', method: 'post'},
          
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
