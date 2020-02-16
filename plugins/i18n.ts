import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from '@/locale'

Vue.use(VueI18n)

export default ({ app }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: locale.messages
  })

  app.i18n.path = (link: string) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
