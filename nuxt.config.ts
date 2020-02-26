import { Context } from 'vm'
import locale from './locale'

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

export default {
  /** Build configuration */
  build: {
    extend (config: any, context: Context) {
      if (context.isDev && !process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push({
        test: /\.(postcss)$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader'
          }
        ]
      })
    },
    loaders: {
      // we want to use sass instead of node-sass
      sass: {
        import: ['~assets/style/app.sass'],
        implementation: require('sass')
      }
    },
    modules: [
      'nuxt-i18n',
      {
        locales: ['en'],
        defaultLocale: 'en',
        vueI18n: locale,
      },
      '@nuxtjs/onesignal',
      '@nuxtjs/pwa'
    ],
    plugins: [],
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        autoprefixer: {}
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        }
      }
    },
    transpile: ['vuetify/lib'],
    typescript: {
      // this is required - if set to true the HMR in dev will time out
      typeCheck: false
    }
  },
  /** @see https://typescript.nuxtjs.org/migration.html */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  /** Plugins to load before mounting the App **/
  generate: {
    fallback: true
  },
  plugins: [
    '~/plugins/localstorage',
    '~/plugins/i18n'
  ],
  /** typescript config for nuxt */
  typescript: {
    typeCheck: false,
    ignoreNotFoundWarnings: true
  },
  server: {
    port: process.env.NUXT_ENV_PORT, // default: 3000
    host: '0.0.0.0' // default: localhostw
  },
  modules: [
    ['@nuxtjs/onesignal', {
      cdn: true,
      init: {
        appId: process.env.NUXT_ENV_ONESIGNAL_APP_ID,
        allowLocalhostAsSecureOrigin: true,
        welcomeNotification: {
            disable: true
        },
        autoResubscribe: true,
        autoRegister: false
      }
    }],
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    ['@nuxtjs/toast', {
      position: 'top-center',
      duration: 5000,
      fullWidth: true,
      fitToScreen: true,
      register: []
    }],
    ['@nuxtjs/auth', {
      redirect: {
        login: '/', // redirect user when not connected
        callback: '/callback/'
      },
      strategies: {
        local: false,
        auth0: {
          domain: process.env.NUXT_ENV_OAUTH_CLIENT_DOMAIN,
          client_id: process.env.NUXT_ENV_OAUTH_CLIENT_ID,
          audience: process.env.NUXT_ENV_OAUTH_AUDIENCE
        }
      },
      plugins: [
        '~/plugins/repository'
      ]
    }]
  ],
  head: {
    titleTemplate: '%s - MapTracker',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      {rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Saira+Semi+Condensed&display=swap"}
    ]
  }
}
