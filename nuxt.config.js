import colors from 'vuetify/es5/util/colors'
import locale from "./src/locale"

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - app',
    title: 'app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: "preconnect", href: "https://fonts.googleapis.com"},
      {rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true},
      {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap"},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/localstorage", "~/plugins/vuebar"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      "@nuxtjs/i18n",
      {
        locales: ["en"],
        defaultLocale: "en",
        vueI18n: locale,
        strategy: "no_prefix",
      },
    ],
    [
      "@nuxtjs/onesignal",
      {
        init: {
          appId: process.env.NUXT_ENV_ONESIGNAL_APP_ID,
          allowLocalhostAsSecureOrigin: true,
          welcomeNotification: {
            disable: true,
          },
          autoResubscribe: true,
          autoRegister: false,
        },
      },
    ],
    ["@nuxtjs/axios", {}],
    [
      "@nuxtjs/toast",
      {
        position: "top-center",
        duration: 5000,
        fullWidth: true,
        fitToScreen: true,
        register: [],
      },
    ],
    [
      "@nuxtjs/auth-next",
    ]
  ],
  auth: {
    redirect: {
      login: "/login",
      callback: "/auth/callback/",
      home: "/admin/feed"
    },
    strategies: {
      local: true,
      auth0: {
        domain: process.env.NUXT_ENV_OAUTH_CLIENT_DOMAIN || "",
        clientId: process.env.NUXT_ENV_OAUTH_CLIENT_ID || "",
        audience: process.env.NUXT_ENV_OAUTH_AUDIENCE || ""
      },
    },
    plugins: ["~/plugins/repository"]
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'defu'
    ]
  },
  srcDir: "src/"
}
